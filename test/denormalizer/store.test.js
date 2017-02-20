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
    this.addDefinition =function (definition, done){            
        if(typeof definition === "object")
            done(null, {});
    };
};     

var Store = proxyquire('./../../denormalizer/store/Store.js', { "./MongoDB": mongoStub });

// starting the test suite.
describe('Store - Denormalizer', function () {
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

    describe('#addDefinition()', function () {
        var instanceStore;
        var connection;
        var definitionTest = {};
        beforeEach(function () {
            connection = { 
                "type": "mongodb", 
                "host":"localhost",
                "port":"27017",
                "db":"eventstore" 
            };
            InstanceStore = new Store(connection);
        });

        it('should add definition using the respective adapter mongoDB', function (done) {
            InstanceStore.addDefinition(definitionTest,function (err, result){
                expect(result).to.be.a('object');
                expect(err).to.be.a('null');                                       
                done();
            }); 
        });

        after(function () {

        });
    });
});