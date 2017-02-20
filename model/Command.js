var Command = function (data) {
    this.event = data.event;
    this.data = data;
};

Command.prototype.execute = function (dbAdapter, done) {
    dbAdapter.create(this.data, done);
};

module.exports = Command;