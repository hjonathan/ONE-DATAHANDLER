var QueryModel = function (dbAdapter) {
    this.databaseAdapter = dbAdapter;
};

QueryModel.prototype.query = function (data, done) {
    this.databaseAdapter.read(data, done);
};

module.exports = QueryModel;