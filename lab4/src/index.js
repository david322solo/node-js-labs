var http = require('http');
let data = require('./database');
let fs = require('fs');
let url = require('url');
let db = new data.DB();
let cmd = require('./05-02');
let command = new cmd();
db.on('GET',async (req,res)=>{ console.log('DB.GET'); await res.end(JSON.stringify(db.get()));});

db.on('POST',async(req,res)=> {
    console.log('DB.POST');
    await req.on('data', data=>{
        let r = JSON.parse(data);
        db.post(r);
        res.writeHead(200,{'Content-Type': 'text/json; charset=utf-8'});
        res.end(JSON.stringify(r));
    });
});

db.on('PUT',(req,res)=> {
    req.on('data',data=>{
        let rObj = JSON.parse(data);
        console.log(rObj);
        db.put(rObj);
        res.writeHead(200,{'Content-Type': 'text/json; charset=utf-8'});
        res.end(JSON.stringify(rObj));

    });
});

db.on('DELETE', async (req,res)=> {
    console.log('DB.DELETE');
    await req.on('data',async data=>{

        let id = JSON.parse(data);
       db.delete(id.id);
       await res.end('end');
    }) ;
});

db.on('COMMIT', async (req,resp)=>{db.commit(); });

db.on('STATISTIC',(date,resp) =>{
    resp.end(JSON.stringify(db.startTracking(date)))
});

http.createServer((req, res) =>{
   if ( req.url ==='/') {
       let html = fs.readFileSync('./src/04-02.html','utf-8');
       res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
       res.end(html);
   } else if (req.url==='/api/db') {
       db.emit(req.method,req,res);
   } else if(req.url ==='/api/ss') {
       res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
       let stat = db.emit('STATISTIC',(new Date()).toJSON(),res);
       res.end(stat);
   }

} ).listen(5003,()=>{
    console.log('server started at http://localhost:5003/');
    command.listen(db);
});