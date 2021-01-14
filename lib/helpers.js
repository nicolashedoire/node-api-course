/*
* Helpers for various tasks
*
*/

const crypto = require('crypto');
const config = require('../config');

const helpers = {};

helpers.hash = function(str) {
    if(typeof str === 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256', config.secret).update(str).digest('hex');
        return hash;
    }

    return false;
}

helpers.parseJsonToObject = function(str) {
    try {
        const object = JSON.parse(str);
        return object;
    }catch(e){
        return {};
    }
}

module.exports = helpers;