var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);


var db = {
    collection: function (data){
        return {
            find: function (){                
                return this;
            },
            limit: function(){
                return this;
            },
            toArray : function (done){
                done(null, []);
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

var MongoDBAdapter = proxyquire('./../../query/store/MongoDB.js', { mongodb: mongodbStub });

// starting the test suite.
describe('MongoDB - Query', function () {
    describe('#connect()', function () {
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

        it('should connect using the respective adapter', function (done) {
            adapter.connect(function (err, db){
                expect(db).to.be.a('object');     
                done();                
            }); 
        });

        after(function () {

        });
    });

    describe('#query()', function () {
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
            adapter.query("data", function (err, docs){
                expect(docs).to.be.instanceof(Array);    
                done();                
            }); 
        });

        after(function () {

        });
    });

});