const Sequelize = require('sequelize');
const db = require('../config/database.js');
const Pulpit = require('./pulpit');
const Subject = db.define('Subject',{
    Subject:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    Subject_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Pulpit:{
        type:Sequelize.STRING,
        allowNull:false,
        references:{model: Pulpit,key:'Pulpit'}
    },
},{
    modelName :'Subject',
    tableName:'Subject',
    timestamps:false
});

module.exports = Subject;