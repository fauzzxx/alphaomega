const http = require('http');

http.createServer(function(req, res) {
    res.write("Hello from Node.js Server");
    res.end();
}).listen(3000);

console.log("Server running at http://localhost:3000");
