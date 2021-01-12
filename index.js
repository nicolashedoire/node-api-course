const http = require('http');
const url = require('url');

const server = http.createServer(function (req, res) {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimPath = path.replace(/^\/÷|\/÷$/g, '');

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Send the response
    res.end('Hello world\n');

    // Log the request path
    console.log(`request received on path ${trimPath} with method ${method}`);
});

server.listen(4500, function() {
    console.log('Server listen on port 4500');
})