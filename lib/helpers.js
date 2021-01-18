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


helpers.createRandomString = function(strLength) {
    if(strLength && typeof(strLength) === 'number'){
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let str = '';
        for(let i = 1; i < strLength ; i++) {
            const character = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            str += character;
        }
        return str;
    }

    return false;
}

module.exports = helpers;