const http = require('http');
const fs = require('fs');
const stat = require('./m07-01')('./static');
let server = http.createServer((req, res) => {
    console.log(stat.isStatic('css', req.url));
    if(req.method==='GET') {
            if(stat.isStatic('html', req.url)) stat.sendFile(req,res, {'Content-Type':'text/html; charset=utf-8'});
            else if(stat.isStatic('css', req.url)) stat.sendFile(req,res, {'Content-Type':'text/css; charset=utf-8'});
            else if(stat.isStatic('js', req.url)) stat.sendFile(req,res, {'Content-Type':'text/javascript; charset=utf-8'});
            else if(stat.isStatic('png', req.url)) stat.sendFile(req,res, {'Content-Type':'image/png; charset=utf-8'});
            else if(stat.isStatic('docx', req.url)) stat.sendFile(req,res, {'Content-Type':'application/msword; charset=utf-8'});
            else if(stat.isStatic('json', req.url)) stat.sendFile(req,res, {'Content-Type':'application/json; charset=utf-8'});
            else if(stat.isStatic('xml', req.url)) stat.sendFile(req,res, {'Content-Type':'application/xml; charset=utf-8'});
            else if(stat.isStatic('mp4', req.url)) stat.sendFile(req,res, {'Content-Type':'video/mp4; charset=utf-8'});
            else stat.writeHTTP404(res);
        } else {
            res.statusCode = 405;
            res.statusMessage = 'Invalid method';
            res.end("HTTP ERROR 405: Invalid method");
        }
}).listen(3000,()=>{
    console.log('server started at http://localhost:3000');
});
server.on('error',(err => {
    console.log(err.message);
}));