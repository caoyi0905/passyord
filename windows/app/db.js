'use strict';


var CONF = require('./config');
var camo = require('camo');
var {connect,Document} = camo;

module.exports = class Database {

  constructor(electron,cb) {
    var _self = this;
    let conf = new CONF();
    var uri = 'nedb://' + conf.dataPath;
    console.log('ok', uri,conf);

    connect(uri).then(cb);
  }
};


