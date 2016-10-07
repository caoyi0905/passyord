'use strict';

const fs = require('fs'), path = require('path');

module.exports =  class Conf {
    constructor() {
        this.basePath = __dirname;
    }

    get dataPath() {
        return path.join(
            this.basePath,
            'database'
        );
    }

}