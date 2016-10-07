'use strict';


var CONF = require('./config');
var {connect,Document} = require('camo');

module.exports = class Database {

  constructor(electron,cb) {
    var _self = this;
    let conf = new CONF();
    var uri = 'nedb://' + conf.dataPath;
    console.log('ok', uri,conf);

    connect(uri).then(function (db) {
      console.log('connected',db);
      _self.db = db;
      _self.Document = Document;
      cb.call(this,_self);
    });
  }
};


