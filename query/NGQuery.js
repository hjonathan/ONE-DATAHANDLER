var Store = require('./store/Store.js');

var NGQuery = function (connectionOptions) {    
    this.store = new Store(connectionOptions);   
};

NGQuery.prototype.connect = function (done) {    
    this.store.connect(function (err, db){        
        done(err, db);
    });
};

NGQuery.prototype.query = function (data, done) {    
    var that = this;
    
    this.store.query(data,function (err, result){    	       
        done(err, result);
    });
};

module.exports = NGQuery;