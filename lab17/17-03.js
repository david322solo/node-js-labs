const redis = require('redis');
let {PORT:port,HOST:host} = require('./redisConfig.json');
const client = redis.createClient(port,host);
client.on('connect',()=>{
    console.log('connect');
});
client.on('ready',()=>{
    console.log('ready');
    Promise.resolve().then(()=>{
      incr();
    })
});
client.on('error',(err)=>{
    console.log(err.message);
});
client.on('end',()=>{
    console.log('client close connection');
});
function incr(){
    const start= new Date().getTime();
    for (let i = 0; i < 10000; i++) {
        client.incr('incr',(err,result)=>{
            if(err) console.log(err.message);
            else console.log(result);
        });
    }
    const end = new Date().getTime();
    console.log(`SecondWay: ${end - start}ms`);
}
function decr(){
    const start= new Date().getTime();
    for (let i = 0; i < 10000; i++) {
        client.decr('incr',(err,result)=>{
            if(err) console.log(err.message);
            else console.log(result);
        });
    }
    const end = new Date().getTime();
    console.log(`SecondWay: ${end - start}ms`);
}