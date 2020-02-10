const http = require('http');
let h = (r)=>{
    let rc = '';
    for(let key in r.headers) rc+= '<h3>' + key + ':' + r.headers[key]+ '</h3>';
    return rc;
};
http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type':'text/html charset=utf-8;'});
    let b = '01-03 body';
    req.on('data',str=>{
        b+=str;
        console.log('data', b);
    });
    req.on('end',()=>
        res.end(
        '<!doctype html> <html lang="en"><head><title>01-03</title></head>' +
        '<body>' +
        '<h1>STRUCT QUERY</h1>' +
        '<h2> method: ' +req.method + '</h2>' +
        '<h2> uri: ' + req.url + '</h2>' +
        '<h2> version: ' + req.httpVersion+'</h2>' +
        '<h2> HEADER: </h2>' +
        h(req)+
        '<h2> body: ' + b +' </h2>' +
        '</body>' +
        '</html>'
        )
    )
}).listen(3000,()=>{
    console.log('server running at http://localhost:3000');
});