const fs = require('fs');
//const file_path = __dirname+'/conf_command.json';
let db = require('./database');
class Command {

    listen(db)
    {

        let input = process.stdin;
        let output = process.stdout;
        output.setEncoding('utf-8');
        input.setEncoding('utf-8');
        let timerSc;
        let timerSd;
        let timerSs;
        input.on('data',(data)=>{
           data = data.slice(0,-1).split(' ');
           let time = parseInt(data[1]);
           switch(data[0]){
               case 'sd':
                   if(!isNaN(time)) {
                       timerSd = setTimeout(() => {
                           process.exit(0);
                            }, time * 1000);
                   } else {
                        clearTimeout(timerSd)
                   }
                   break;
               case 'sc':
                  if(!isNaN(time)){
                      clearTimeout(timerSd);
                      timerSc = setInterval(()=>{
                          db.emit('COMMIT');
                      },time*1000);
                  } else {
                      clearInterval(timerSc);
                  }
                   break;
               case 'ss':
                   if (!isNaN(time)) {
                       clearTimeout(timerSd);
                       let start = Date.now();
                       timerSs = setTimeout(() => {
                           console.log(db.startTracking(start));
                           console.log(`stopped ${Date.now() - start} `);
                       }, time * 1000);

                   } else {
                       clearInterval(timerSs);
                   }
                   break;
               default:
                   console.log('command not found');
              }
        })
    }
}
module.exports = Command;