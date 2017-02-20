// # NGSharedKernel
// ###### Module Dependencies
var NGSharedKernel = require('NGSharedKernel');
var NGQuery = require('./query/NGQuery');
var NGDenormalizer = require('./denormalizer/NGDenormalizer');
var NGRepository = require('./repository/NGRepository.js');
var connDBEventStore = require('./config/config.json').db;
var connDBDenormalizer = require('./config/configd.json').db;
var broker = require('./config/config.json').broker;


// ###### Module Definition
var NGDataHandler = function () {
    this.sharedKernel = new NGSharedKernel();
    
    this.eventReceiver = null;
    this.eventDispatcher = null;
    
    this.queryReceiver = null;
    this.queryDispatcher = null;
    
    this.channelEventReceiver = "channel06";
    this.channelEventDispatcher = "channel05";

    this.channelQueryReceiver = "channel08";
    this.channelQueryDispatcher = "channel07";
    
    this.repository = new NGRepository(connDBEventStore);
    this.denormalizer = new NGDenormalizer(connDBDenormalizer);
    this.query = new NGQuery(connDBEventStore);      
};

NGDataHandler.prototype.start = function (done) {
    var that = this;
    // Connect Stores Modules
    this.repository.connect(function (err, db){
        console.log('[x] - Open connection Repository Module');
    });
    this.denormalizer.connect(function (err, db){
        console.log('[x] - Open connection Denormalizer Module');
    });
    this.query.connect(function (err, db){
        console.log('[x] - Open connection Query Module');    
    });

    // Create Event Dispatcher only events
    this.eventDispatcher = this.createMessageDispatcher(this.channelEventDispatcher, broker);
    
    this.eventReceiver= this.startMessageReceiver(this.channelEventReceiver,function (err,data){
        if(err !== null) throw (err);
        var dataEvent = JSON.parse(data.toString());
            
        that.eventDispatcher.sendMessage('{"random":"'+dataEvent.random+'","data":{"success":true}}', function (err , data){
            console.log('[x] - Transaction send');
        });
        
        delete dataEvent.random;        
        
        that.repository.addEvent(dataEvent, function (err, result){
            console.log('[x] - Add Event in Event Store');    
        });
        
        that.denormalizer.addDefinition(dataEvent, function (err, result){
            console.log('[x] - Add Event in View Store');    
        });         
    });

    // Create Query Dispatcher only queries    
    this.queryDispatcher = this.createMessageDispatcher(this.channelQueryDispatcher, broker);    
    this.queryReceiver = this.startMessageReceiver(this.channelQueryReceiver,function (err,data){
        if(err) throw (err);
        var dataEvent = JSON.parse(data.toString());        
        that.query.query(dataEvent,function (err , data){                        
            that.queryDispatcher.sendMessage('{"random":"'+dataEvent.random+'","data":'+JSON.stringify(data)+'}' , function (err , data){
                console.log('[x] - Transaction send');
            });
        });        
    });
};

// Create a event receiver to use rabbitmqdriver
NGDataHandler.prototype.startMessageReceiver = function (channel, done) {
    var kernel = new NGSharedKernel();
    var connection = {
        'type': 'rabbitmq',
        'connection': {
            'amqp': 'amqp://' + broker.host + ':' + broker.port,
            'type': 'SUB',
            'channel': channel
        }
    };
        
    var eventReceiver = kernel.create('MessageReceiver', connection);    
    eventReceiver.subscribe(function (err, data) {
        done(err,data);
    });
    return eventReceiver;  
};

// Create a event Dispatcher using amqplib
NGDataHandler.prototype.createMessageDispatcher = function (channel, brokeramqp) {
    var kernel = new NGSharedKernel();
    var connection = {
            'amqp'    : 'amqp://'+brokeramqp.host+':'+brokeramqp.port,            
            'channel' : channel,
            'exchange': 'direct'            
        };    
    var dispatcher = kernel.create('MessageDispatcher', connection);    
    return dispatcher;        
};
module.exports = NGDataHandler;