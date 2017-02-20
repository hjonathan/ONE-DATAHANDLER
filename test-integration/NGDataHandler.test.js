// This is an integration test that tests the module broad functionality
// this kind of tests require also additional infrastructure and resources
// in this case it requires an active MongoDB database connection and also
// a RabbitMQ active connection.
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var NGSharedKernel = require('NGSharedKernel');
var NGSharedKernelMock = function () { };
var AdapterMock = function () { };
var NGDataHandler = require('../NGDataHandler.js');

describe('NGDataHandler', function () {
    var dataHandler;
    describe('#execute()', function () {
        beforeEach(function () {
            dataHandler = new NGDataHandler();
        });

        it('should create a record entry or event', function (done) {
            var dataMock = { "event": "create", "type": "record", "data": { "name": "Alisson", "last_name": "Trueba" } };
            var kernelMock = sinon.createStubInstance(NGSharedKernel);
            kernelMock.create = function () {
                return {
                    "subscribe": function (done) {
                        done(null, dataMock);
                    },
                    "sendMessage": function (message, done) {
                        done(null, dataMock);
                    }
                };
            };
            dataHandler.kernel = kernelMock;
            var expectedToken = { "event": "create", "type": "record", "data": { "name": "Alisson", "last_name": "Trueba" } };
            dataHandler.execute(dataMock, function (err, result) {
                expect(result).to.be.a('object');
                expect(result.data).to.be.deep.equal(expectedToken.data);
                expect(result.type).to.be.deep.equal(expectedToken.type);
                expect(result.event).to.be.deep.equal(expectedToken.event);
                done();
            });
        });
    });

    describe('#query()', function () {
        beforeEach(function () {
            dataHandler = new NGDataHandler();
        });

        it('should search for record entry', function (done) {
            var dataMock = { "type": "record", "data": { "name": "Alisson", "last_name": "Trueba" } };
            var kernelMock = sinon.createStubInstance(NGSharedKernel);
            kernelMock.create = function () {
                return {
                    "subscribe": function (done) {
                        done(null, dataMock);
                    },
                    "sendMessage": function (message, done) {
                        done(null, dataMock);
                    }
                };
            };
            dataHandler.kernel = kernelMock;
            var expectedToken = { "type": "record", "data": { "name": "Alisson", "last_name": "Trueba" } };
            dataHandler.query(dataMock, function (err, result) {
                expect(result).to.be.a('array');
                expect(result[0].data).to.be.deep.equal(expectedToken.data);
                expect(result[0].type).to.be.deep.equal(expectedToken.type);
                done();
            });
        });
    });
});