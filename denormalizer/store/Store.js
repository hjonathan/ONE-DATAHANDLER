var MongoDBAdapter = require('./MongoDB');

var Store = function (options) {
    this.options = options;
    this.adapter = null;   
    
    switch(options.type) {
        case 'mongodb':            
            this.adapter = new MongoDBAdapter(options);
        break;
        case 'redisdb':            
            this.adapter = new RedisDBAdapter(options);
        break;
    }
};

Store.prototype.connect = function (done) {    
    this.adapter.connect(done);
};

Store.prototype.addDefinition = function (definition,done) {    
    this.adapter.addDefinition(definition, done);
};

Store.prototype.disconnect = function (done) {    
    //this.adapter.disconnect(done);
};

module.exports = Store;