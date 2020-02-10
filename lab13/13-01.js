let net = require('net');
let server = net.createServer(socket=>{
    socket.on('data',(data => {
        console.log('Server data:',socket.remoteAddress + ':' + data);
        socket.write('Echo: '+data);
    }));
    socket.on('close',(data)=>{
        console.log('Ser closed ',socket.remoteAddress+ '  ' + socket.remotePort);
    })
});
server.listen(5000,'localhost',()=>{
    console.log('server listening');
});


server.maxConnections = 10;