const http = require('http');
http.createServer(function(req,resp) {
    resp.writeHead(200,{'Content-Type': 'text/html'});
    resp.end('<h1> hello world </h1>\n');
}).listen(3000);
console.log('server running at http://localhost:3000');
