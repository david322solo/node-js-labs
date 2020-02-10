const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
switch (req.url) {
    case '/':
        let html = fs.readFileSync('./index.html');
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);
        break;
    case '/send':
        req.on('data', data=>{
            let nodemailer = require('nodemailer');
            console.log(typeof data);

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'qwe@gmail.com',
                    pass: 'qwe'
                }
            });
            let dataRes = JSON.parse(data);
            let result = transporter.sendMail(dataRes, (err)=>{
                if(err){
                    console.log(err);
                }
            });
        });
        break;
    case '/sendm0603':
        let m0603 = require('./m0603/m0603');
        req.on('data',(data)=>{
            let dataRes = JSON.parse(data);
            m0603(dataRes['text']);
        });
        break;
}
}).listen(3000,()=>{
    console.log('server started at http://localhost:3000/')
});