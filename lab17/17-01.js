const redis = require('redis');
let {PORT:port,HOST:host} = require('./redisConfig.json');
//console.log(port,host);
const client = redis.createClient(port,host);
client.on('connect',()=>{
    console.log("connection to",host,port);
});
client.on('error',(err)=>{
    console.log(err.message);
});
