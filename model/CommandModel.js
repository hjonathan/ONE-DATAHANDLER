var CommandModel = function (dbAdapter) {
    this.databaseAdapter = dbAdapter;
};

CommandModel.prototype.execute = function (command, done) {
    command.execute(this.databaseAdapter, done);
};

module.exports = CommandModel;