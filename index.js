/***************
 * proxdb:  private module to host mongosafe and the proxibase
 * schemas outside the server lib directory and make them visible
 * to the tools and tests in the same repository.
 *
 * Not meant for public consumption
 *************/

var path = require('path')
var mongo = require('../lib/mongosafe')
var defaultConfig = require('../config/config.js')

mongo._initDb = mongo.initDb
var schemaPath = path.join(__dirname, '../lib/schemas')

mongo.initDb = function(config, cb) {
  if (tipe.isFunction(config)) {
    // caller passed in a callback as the first arg, use the default db config
    cb = config
    config = defaultConfig
  }
  // Tricky: accept either a full proxibase config file or just its db property
  var dbConfig = config.db || config
  mongo._initDb(dbConfig, schemaPath, cb)
}

module.exports = mongo
