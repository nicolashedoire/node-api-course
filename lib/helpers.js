/*
* Helpers for various tasks
*
*/

const crypto = require('crypto');
const config = require('../config');
const querystring = require('querystring');
const https = require('https');

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

helpers.sendTwilioSms = function(phone, message, callback) {

    const payload = {
        'From': config.twilio.phone,
        'To': '+33'+phone,
        'Body': message
    }

    const stringPayload = querystring.stringify(payload);

    const requestDetails = {
        'protocol': 'https',
        'hostname': 'api.twilio.com',
        'method': 'POST',
        'path': '',
        'auth': `${config.twilio.accountId}:${config.twilio.authToken}`,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(stringPayload)
        }
    }

    https.request(requestDetails, function(res) {
        const status = res.statusCode;
    })
}

module.exports = helpers;