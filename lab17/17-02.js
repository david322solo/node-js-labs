const redis = require('redis');
let {PORT:port,HOST:host} = require('./redisConfig.json');
const client = redis.createClient(port,host);
client.on('connect',()=>{
    console.log('connect');
});
client.on('ready',()=>{
    console.log('ready');
    Promise.resolve().then(()=>{
       set();
        //get(5);
        //del(10000);
    })
});
client.on('error',(err)=>{
    console.log(err.message);
});
client.on('end',()=>{
    console.log('client close connection');
});
function set(){
    const start= new Date().getTime();
    for (let i = 0; i < 10000; i++) {
        client.set(i.toString(),'set'+i,(err,result)=>{
            if(err) console.log(err.message);
        });
    }
    const end = new Date().getTime();
    console.log(`SecondWay: ${end - start}ms`);
}
function get(n){
    const start= new Date().getTime();
    for (let i = 0; i < n; i++) {
        client.get(i.toString(),(err,result)=>{
            if(err) console.log(err);
        });
    }
    const end = new Date().getTime();
    console.log(`SecondWay: ${end - start}ms`);
}
function del(n) {
    const start = new Date().getTime();
    for (let i = 0; i < n; i++) {
        client.del(i.toString(), (err, result) => {
            if (err) console.log(err);
        });
    }
    const end = new Date().getTime();
    console.log(`SecondWay: ${end - start}ms`);
}
//client.quit();