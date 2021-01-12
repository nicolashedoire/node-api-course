const http = require('http');

const server = http.createServer(function (req, res) {
    res.end('Hello world');
});

server.listen(4500, function() {
    console.log('Server listen on port 4500');
})