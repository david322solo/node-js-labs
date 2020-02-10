const util = require('util');
const ee = require('events');

let db_data = [
    {id:1, name: 'dima', bday:'2000-01-03'},
    {id:2, name: 'sasha', bday:'2002-05-12'},
    {id:3, name: 'vadim', bday:'1997-04-03'},
];
let statVar;
function DB() {
    let start;
    let stop;
    let statVar;
    let count = 0;
    let commit = 0;
    this.startTracking=(date)=>{
            return `start: ${date} stop: ${(new Date()).toJSON()} request: ${count} commit ${commit}`;
    };
    this.stopTracking = ()=>{
        stop = Date.now() - start;
    };
    this.commit = ()=>{
        console.log('commit');
        commit++;
    };
    this.get = () => {
        statVar++;
        count++;
        return db_data;
    };
    this.post = (r) => {
        statVar++;
        count++;
        db_data.push(r);
        return r
    };
    this.put = (strData)=>{
        count++;
        for (let i = 0; i < db_data.length; i++) {
            if(strData.id === db_data[i].id) {
                db_data[i] = strData;
            }
        }
        statVar++;
    };
    this.delete =(id) =>{
        count++;
        for (let i = 0; i < db_data.length; i++) {
            if(db_data[i].id === id) {
                db_data.splice(id-1,1);
            }
        }
        console.log(db_data);
        };
        statVar++;
    }

util.inherits(DB,ee.EventEmitter);
exports.DB = DB;