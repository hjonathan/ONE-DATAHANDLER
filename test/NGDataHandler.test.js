var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var chai = require('chai');
var expect = chai.expect;
var NGSharedKernel = require('NGSharedKernel');
chai.use(sinonChai);

var configMock = {
    "broker":{
        "type":"rabbitmq",
        "host":"172.17.0.1",
        "port":"5672"
    },
    "db":{
        "type":"mongodb",
        "host":"localhost",
        "port":"27017",
        "db":"eventstore"
    }
};

var configdMock = {
    "broker":{
        "type":"rabbitmq",
        "host":"172.17.0.1",
        "port":"5672"
    },
    "db":{
        "type":"mongodb",
        "host":"localhost",
        "port":"27017",
        "db":"eventstore"
    }
};

var testRecord = {
    "id" : "record-id-893792",
    "event" : "query",
    "type" : "read",
    "version": 1,
    "created_by" : "user-reference-21",
    "creation_date" : "99327498272",
    "modified_by" : "user-reference-21",
    "modification_date" : "99327498272",
    "data" : {
        "first_name" : "Jonathan jonathan",
        "last_name" : "Soto",
        "phone" : "78192221"
    },
    "schema" : {
        "set" : "record-id-02892",
        "version" : 1
    }
};

var DispatcherMock = function (){
    this.subscribe =function (callback){
        callback(null, JSON.stringify(testRecord));
    };
    this.sendMessage =function (string, callback){
        callback(null, {});
    };
};

var StoreMock = function (){
    this.connect =function (callback){
        callback(null, {});
    };
};

var NGSharedKernelMock = function (){
    this.create = function (type, connection){
        if(typeof type === "string" && typeof connection === "object"){
            return new DispatcherMock();
        }
    };
};

var NGDenormalizerMock = function (options){
    this.store  = new StoreMock();
    this.options = options;
    this.addDefinition = function (data, callback){
        if(typeof data === "object")
            callback(null, {});
    };    
};

var NGRepositoryMock = function (options){
    this.eventStore  = new StoreMock();
    this.options = options;    
};

var NGQueryMock = function (options){
    this.store  = new StoreMock();
    this.options = options;
    this.query = function (data, callback){
        if(typeof data === "object")
            callback(null, {});
    };   
};

var moduleMocks = {
    'NGSharedKernel': NGSharedKernelMock,    
    './query/NGQuery': NGQueryMock,
    './denormalizer/NGDenormalizer' : NGDenormalizerMock,    
    './repository/NGRepository' : NGRepositoryMock,    
    './config/config.json' : configMock,
    './config/configd.json' : configdMock
};

var NGDataHandler = proxyquire('../NGDataHandler.js', moduleMocks);

describe('NGDataHandler', function () {
    var dataHandler;
    describe('#startMessageReceiver()', function () {
        beforeEach(function () {
            dataHandler = new NGDataHandler();
        });

        it('should create a object subscriber in a channel', function (done) {
            dataHandler.startMessageReceiver("channeltest", function (err, result) {
                expect(result).to.be.a('string');
                expect(err).to.be.a('null');
                done();
            });
        });

        after(function () {

        });
    });

    describe('#createMessageDispatcher()', function () {
        var testDispatcher;
        beforeEach(function () {
            dataHandler = new NGDataHandler();
        });

        it('should create a object dispatcher in a channel', function (done) {
            testDispatcher = dataHandler.createMessageDispatcher("channeltest", configdMock);
            expect(testDispatcher).to.be.a('object');
            expect(testDispatcher).to.be.a.instanceof(DispatcherMock);
            done();            
        });

        after(function () {

        });
    });

    describe('#start()', function () {
        var testDispatcher;
        beforeEach(function () {
            dataHandler = new NGDataHandler();
        });

        it('should create a object repository', function (done) {
            dataHandler.start(function (){});
            expect(dataHandler.repository).to.be.a('object');            
            done(); 
        });

        it('should create a object query', function (done) {
            dataHandler.start(function (){});
            expect(dataHandler.query).to.be.a('object');            
            done(); 
        });

        it('should create a object denormalizer', function (done) {
            dataHandler.start(function (){});
            expect(dataHandler.denormalizer).to.be.a('object');            
            done(); 
        });

        it('should create a object event receiver/dispatcher', function (done) {
            dataHandler.start(function (){});
            expect(dataHandler.eventDispatcher).to.be.a('object');
            expect(dataHandler.eventReceiver).to.be.a('object');                        
            done(); 
        });

        it('should create a object query receiver/dispatcher', function (done) {
            dataHandler.start(function (){});
            expect(dataHandler.queryDispatcher).to.be.a('object');
            expect(dataHandler.queryReceiver).to.be.a('object');                        
            done(); 
        });        
        
        after(function () {

        });
    });    
});