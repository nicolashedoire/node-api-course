const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function (req, res) {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimPath = path.replace(/^\/÷|\/÷$/g, '');

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

        // Send the response
        res.end('Hello world\n');

        // Log the request path
        console.log(`request received on path ${trimPath} with method ${method} and with parameters: ${JSON.stringify(queryStringObject)}`);
        
        // Log the headers
        console.log(`request received with this headers : ${JSON.stringify(headers)}`);

        // Log the headers
        console.log(`request received with this payload : ${JSON.stringify(buffer)}`);

    });
});

server.listen(4500, function() {
    console.log('Server listen on port 4500');
})