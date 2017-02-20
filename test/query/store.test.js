var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var mongoStub = function (options){
    this.options = options
    this.adapter = 
    this.connect = function (done){            
        done(null, {});
    };
    this.query =function (data, done){                    
        if(typeof data === "object")
            done(null, []);
    };
};     

var Store = proxyquire('./../../query/store/Store.js', { "./MongoDB": mongoStub });

// starting the test suite.
describe('Store - Query', function () {
    describe('#connect()', function () {
        var instanceStore;
        var connection;
        beforeEach(function () {
            connection = { 
                "type": "mongodb", 
                "host":"localhost",
                "port":"27017",
                "db":"eventstore" 
            };
            InstanceStore = new Store(connection);
        });

        it('should connect using the respective adapter mongoDB', function (done) {
            InstanceStore.connect(function (err, db){
                expect(InstanceStore.adapter).to.be.a('object');
                expect(db).to.be.a('object');
                expect(err).to.be.a('null');                                       
                done();
            }); 
        });

        after(function () {

        });
    });

    describe('#query()', function () {
        var instanceStore;
        var connection;
        var EventTest = {};
        beforeEach(function () {
            connection = { 
                "type": "mongodb", 
                "host":"localhost",
                "port":"27017",
                "db":"eventstore" 
            };
            InstanceStore = new Store(connection);
        });

        it('should get docs using the respective adapter mongoDB', function (done) {
            InstanceStore.query(EventTest,function (err, docs){
                //expect(docs).to.be.a('object');
                expect(docs).to.be.a.instanceof(Array);                
                expect(err).to.be.a('null');                                       
                done();
            }); 
        });

        after(function () {

        });
    });
});