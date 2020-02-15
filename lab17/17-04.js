const redis = require('redis');
let {PORT:port,HOST:host} = require('./redisConfig.json');
const client = redis.createClient(port,host);
client.on('connect',()=>{
    console.log('connect');
});
client.on('ready',()=>{
    console.log('ready');
    Promise.resolve().then(()=>{
        hget(7);
    })
});
client.on('error',(err)=>{
    console.log(err.message);
});
client.on('end',()=>{
    console.log('client close connection');
});
function hset(n){
    const start= new Date().getTime();
    for (let i = 0; i < 10000; i++) {
        client.hset(n.toString(),i.toString(),JSON.stringify({id:n,val:`val-${n}`}),(err,result)=>{
            if(err) console.log(err.message);
            else console.log(result);
        });
    }
    const end = new Date().getTime();
    console.log(`SecondWay: ${end - start}ms`);
}
function hget(n){
    const start= new Date().getTime();
    for (let i = 0; i < n; i++) {
        client.hget('how are',i.toString(),(err,result)=>{
            if(err) console.log(err.message);
            else console.log(result);
        });
    }
    const end = new Date().getTime();
    console.log(`SecondWay: ${end - start}ms`);
}