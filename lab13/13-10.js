const buffer = require('buffer');
const udp = require('dgram');
const client = udp.createSocket('udp4');
client.on('message',(msg,info)=>{
    console.log('client: msg' + msg.toString());

});

let data = Buffer.from('Client message 01');
client.send(data,3000,'localhost',(err)=>{
    if(err) {
        console.log(err.message);
    } else {
        console.log('message is sending');
    }
});
