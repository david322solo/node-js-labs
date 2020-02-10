const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
http.createServer((req,resp)=>{
    if(req.url==='/start' && req.method==='GET') {
        fs.readFile('index.html',((err, data) => {
            resp.end(data.toString());
        }));
    } else if(req.url==='/startws' && req.method==='GET'){
        fs.readFile('index2.html',((err, data) => {
            resp.end(data.toString());
        }));
    } else {
        resp.statusCode = 400;
        resp.end();
    }
}).listen(3000,()=>{
    console.log('http://localhost:3000/');
});


const socket = new WebSocket.Server({
    port: 4000,
    host: 'localhost',
    path: '/'
});

socket.on('connection',ws=>{
    console.log('connection');
    let data;
    let k = 1;
    ws.on('message',(message)=>{
        data = JSON.parse(message)['10-01-client'];
    });
    let interval = setInterval(()=>{
        ws.send(JSON.stringify({'10-01-server':`${data}->${k++}`}));
    },7000);
});
const broadcast = new WebSocket.Server({
    port: 5000,
    host: 'localhost',
    path: '/'
});
broadcast.on('connection',ws=>{
    ws.on('message',(message)=>{
            broadcast.clients.forEach((client) => {
                console.log('connect');
                if (client.readyState === WebSocket.OPEN) client.send('broadcast');
            });
    });
});



