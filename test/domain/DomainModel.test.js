var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var DomainModel = require('../../domain/DomainModel.js');

describe('DomainModel', function () {
    var domainModel;
    describe('#executeCommand()', function () {
        beforeEach(function () {
            domainModel = new DomainModel();
        });

        it('should execute a command and include the result into the entity event store', function (done) {
            var expectedToken = {};
            domainModel.startReceiver(function (err, result) {
                expect(result).to.be.a('object');
                expect(result).to.be.deep.equal(expectedToken);
                done();
            });
        });
    });
});