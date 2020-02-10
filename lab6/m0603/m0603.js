module.exports = (message) =>  {
  const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'qwe@gmail.com',
            pass: 'qwe'
        }
    });
    const data = {
        from: 'qwe@gmail.com',
        to: 'qwe@gmail.com',
        subject: 'test module m063',
        html: message
    };
    transporter.sendMail(data,(err)=>{
        if(err) {
            console.log(err);
        }
    })
};