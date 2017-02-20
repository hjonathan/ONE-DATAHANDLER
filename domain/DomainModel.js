var Repository = require('../repository/Repository.js');
var NGSharedKernel = require('NGSharedKernel');

var DomainModel = function () {
	this.repository = new Repository();
	this.kernel = new NGSharedKernel();
};

DomainModel.prototype.executeCommand = function (commandModel, commandData, done) {
    var self = this;
	this.createCommand(commandData, function (err, command) {
		commandModel.execute(command, function (err, result) {
			var entity = this.kernel.create('Entity', commandData);
			done(null, self);
		});
	});
};

DomainModel.prototype.createCommand = function (data, done) {
	done(null, event);
};

DomainModel.prototype.createEntity = function (data, done) {
	var entity = this.kernel.create('Entity', data);
	done(null, entity);
};

module.exports = DomainModel;