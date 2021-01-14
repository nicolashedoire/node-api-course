const lib = require("./data");
const helpers = require("./helpers");

// Define handlers
let handlers = {}

// Define hello handler
handlers.hello = function(data, callback) {
    // callback an http code and a payload object
    callback(200, {message : 'Welcome to the jungle'});
}

// Define error handler
handlers.error = function(data, callback) {
    callback(404);
}

handlers.users = function(data, callback) {
    const methods = ['get', 'post', 'put', 'delete'];
    if(methods.indexOf(data.method) > -1){
        handlers._users[data.method](data, callback);
    }else {
        callback(405);
    }
}

handlers._users = {
    get: function(data, callback) {
        const id = data.queryStringObject.id;

        if(id){
            lib.read({dir: 'users', file: id}, function(res) {
                return res !== undefined && res !== {} ? 
                callback(200, helpers.parseJsonToObject(res)) :
                callback(400)
            });
        }
    },
    post: function(data, callback) {
        const payload = helpers.parseJsonToObject(data.buffer);
        const id = typeof(payload.id) === 'string' 
        && payload.id.trim().length > 0 ?
        payload.id.trim() : false;
        const name = typeof(payload.name) === 'string' 
        && payload.name.trim().length > 0 ?
        payload.name.trim() : false;

        if(name && id){
            lib.create({dir: 'users', file: id, data: { id, name}}, function(res) {
                callback(200);
            });
        }

    },
    put: function(data, callback) {
        const id = data.queryStringObject.id;
        const payload = helpers.parseJsonToObject(data.buffer);

        const name = typeof(payload.name) === 'string' 
        && payload.name.trim().length > 0 ?
        payload.name.trim() : false;

        if(name && id){
            lib.update({dir: 'users', file: id, data: { id, name}}, function(res) {
                if(res.code){
                    callback(400);
                }
                callback(200);
            });
        }
    },
    delete: function(data, callback) {
        const id = data.queryStringObject.id;

        if(id){
            lib.delete({dir: 'users', file: id}, function(res) {
                return res ? 
                callback(200, res) :
                callback(400)
            });
        }
    },
};

module.exports = handlers;