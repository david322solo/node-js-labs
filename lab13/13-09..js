const udp = require('dgram');
const PORT = 3000;
let server = udp.createSocket('udp4');
server.on('error',(err)=>{
    console.log(err.message)});
server.on('message',(msg,info)=>{
    console.log('msg' + msg.toString());
    server.send(msg,info.port,info.address,(err)=>{
        if(err){server.close();}
        else {
            console.log('server  data is sending')}
    })
});
server.on('listening',()=>{
    console.log('listen ' +server.address().port);
});
server.on('close',()=>{
    console.log('closed');
});
server.bind(PORT);