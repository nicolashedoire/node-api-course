const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

const server = http.createServer(function (req, res) {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimPath = path.replace(/^\/|\/$/g, '');

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });

    req.on('end', function(){
        buffer += decoder.end();
        // Choose the handler this request should go to
        const chosenHandler = typeof(router[trimPath]) !== 'undefined' ? router[trimPath] : handlers.error;

        // Construct the data object to send to the handler
        const data = {
            trimPath,
            queryStringObject,
            method,
            headers,
            buffer
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload){

            payload = payload || {};

            // Send the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(JSON.stringify(payload));

            // Log the request path
            console.log(`request received on path ${trimPath} with method ${method} and with parameters: ${JSON.stringify(queryStringObject)}`);
            
            // Log the headers
            console.log(`request received with this headers : ${JSON.stringify(headers)}`);

            // Log the headers
            console.log(`request received with this payload : ${JSON.stringify(buffer)}`);

        });
    });
});

server.listen(config.port, function() {
    console.log(`Server listen on port ${config.port} in ${config.mode} mode`);
});


// Define handlers
let handlers = {}

// Define sample handler
handlers.sample = function(data, callback) {
    // callback an http code and a payload object
    callback(200, {name : 'Sample handler'});
}

// Define error handler
handlers.error = function(data, callback) {
    callback(404);
}

// Define a request router
const router = {
    'sample': handlers.sample
}