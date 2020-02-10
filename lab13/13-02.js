let net = require('net');
let client = new net.Socket();
client.connect(5000,'localhost',()=>{
    console.log(client.remoteAddress + '  ' + client.remotePort);
});
client.write('Client 1');
setInterval(()=>{
    client.write('Client 1');
},2000);
client.on('data',(data)=>{
    console.log('client data:', data.toString());
});
client.on('close', ()=>{
    console.log('client close')
});

client.on('error', ()=>{
    console.log('client error')
});
