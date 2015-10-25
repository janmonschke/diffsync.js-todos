/// <reference path='cust_typings/diffsync-couchdb/diffsync-couchdb.d.ts' />
/// <reference path='cust_typings/cradle/cradle.d.ts' />
/// <reference path='cust_typings/database/database.d.ts' />

import CouchDBDataAdapter = require('diffsync-couchdb');
import createDatabase = require('./database');

module.exports = function(databaseName: string): diffsyncCouchDb.diffsyncCouchDb {
    let database: cradle.Database = createDatabase(databaseName);
    return new CouchDBDataAdapter(database);
};
