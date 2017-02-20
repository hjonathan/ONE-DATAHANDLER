var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var db = {
    collection: function (data){
        return {
            insert: function (array, callback){                
                callback(null,{});
            }      
        };    
    }
};

var mongodbStub = {     
    MongoClient:{
        connect: function (connection, done){            
            done(null, {});
        }
    } 
};

var MongoDBAdapter = proxyquire('./../../denormalizer/store/MongoDB.js', { mongodb: mongodbStub });

// starting the test suite.
describe('MongoDB - Denormalizer', function () {
    describe('#connect()', function () {
        var adapter;
        var connection;
        beforeEach(function () {
            connection = { 
                "type": "mongodb", 
                "host":"localhost",
                "port":"27017",
                "db":"eventstore" 
            };
            adapter = new MongoDBAdapter(connection);
        });

        it('should connect using the respective adapter', function (done) {
            adapter.connect(function (err, db){
                expect(db).to.be.a('object');     
                done();                
            }); 
        });

        after(function () {

        });
    });

    describe('#addDefinition()', function () {
        var adapter;
        var connection;
        beforeEach(function () {
            connection = { 
                "type": "mongodb", 
                "host":"localhost",
                "port":"27017",
                "db":"denormalizer" 
            };
            adapter = new MongoDBAdapter(connection);
        });

        it('should connect and receive a array from results', function (done) {
            adapter.db = db;
            adapter.addDefinition([], function (err, result){
                expect(db).to.be.a('object');   
                done();                
            }); 
        });

        after(function () {

        });
    });
});