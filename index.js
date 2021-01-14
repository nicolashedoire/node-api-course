const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const handlers = require('./lib/handlers');

// Instanciate the HTTP server
const httpServer = http.createServer(function (req, res) {
    unifiedServer(req, res);
});

// Start the HTTP server
httpServer.listen(config.httpPort, function() {
    console.log(`Server listen on port ${config.httpPort} in ${config.mode} mode`);
});

// Instanciate the HTTPS server

const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert-pem')
};
const httpsServer = https.createServer(httpsServerOptions, function (req, res) {
    unifiedServer(req, res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function() {
    console.log(`Server listen on port ${config.httpsPort} in ${config.mode} mode`);
});

const unifiedServer = function(req, res) {

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
}



// Define a request router
const router = {
    'hello': handlers.hello,
    'users': handlers.users
}