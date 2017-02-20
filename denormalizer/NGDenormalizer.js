var Store = require('./store/Store.js');

var NGDenormalizer = function (connectionOptions) {    
    this.store = new Store(connectionOptions);    
};

NGDenormalizer.prototype.connect = function (done) {    
    this.store.connect(function (err, db){        
        done(err, db);
    });
};

NGDenormalizer.prototype.addDefinition = function (definition, done) {    
    var that = this;    
    this.store.addDefinition(definition, function (err, result){
        if(err) throw (err);
        done(err, result);
    });
};

module.exports = NGDenormalizer;