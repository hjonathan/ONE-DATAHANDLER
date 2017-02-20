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
    this.addEvent =function (definition, done){            
        if(typeof definition === "object")
            done(null, {});
    };
};     

var Store = proxyquire('./../../repository/eventstore/EventStore.js', { "./MongoDB": mongoStub });

// starting the test suite.
describe('Store - Repository', function () {
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

    describe('#addEvent()', function () {
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

        it('should add event using the respective adapter mongoDB', function (done) {
            InstanceStore.addEvent(EventTest,function (err, result){
                expect(result).to.be.a('object');
                expect(err).to.be.a('null');                                       
                done();
            }); 
        });

        after(function () {

        });
    });
});