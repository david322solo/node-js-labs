const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Database
const db = require('./config/database.js');

db.authenticate()
    .then(()=>console.log('connection'))
    .catch(err=>console.log('Error' + err));
const app = express();


app.get('/',(req,res)=>res.send('INDEX'));
app.use(bodyParser.json());
app.use('/api',require('./routes/route.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server started on port ${PORT}`));