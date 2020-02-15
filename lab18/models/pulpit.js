const Sequelize = require('sequelize');
const db = require('../config/database.js');
const Faculty = require('./faculty');
const pulpit = db.define('Pulpit',{
    Pulpit:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    Pulpit_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Faculty:{
        type:Sequelize.STRING,
        allowNull:false,
        references:{model: Faculty,key:'Faculty'}
    },
},{
    modelName :'Pulpit',
    tableName:'Pulpit',
    timestamps:false
});

module.exports = pulpit;