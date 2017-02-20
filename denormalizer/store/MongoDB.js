'use strict';
/**
 *  OPTIONS EXAMPLE
 *  "host":"localhost",
 *  "port":"27017",
 *  "db":"denormalizer"
 *  Implements for write in event store;
 */
var MongoClient = require('mongodb').MongoClient;
var MongoDB = function (options) {    
    this.options = options || {};  
    this.db = null;
    this.err = null;
};

MongoDB.prototype.connect = function (done) {    
    var that = this,
        host = this.options.host,
        port = this.options.port,
        dbQuery = this.options.db;        

    MongoClient.connect('mongodb://'+host+':'+port+'/'+dbQuery, function (err, db){
        if(err) that.err = err;
        that.db = db;
        done(err,db);
    });    
};

MongoDB.prototype.addDefinition  = function (definition ,done) {
    var that = this,
        host = this.options.host,
        port = this.options.port,
        dbQuery = this.options.db,
        collection = null;

    if(that.db != null){
        collection = that.db.collection(definition.type);                        
        collection.insert([definition], function(err, result) {
            if(err !== null) console.log(err);            
            done(err, result);            
          });
    }else{
        done(null, []);
    }
};

module.exports = MongoDB;