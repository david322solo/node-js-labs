const Sequelize = require('sequelize');
const db = require('../config/database.js');
const Auditorium_type = require('./auditorium_type');
const auditorium = db.define('auditorium',{
    Auditorium:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    Auditorium_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Auditorium_capacity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    Auditorium_type:{
        type:Sequelize.STRING,
        allowNull:false,
        references:{model: Auditorium_type,key:'Auditorium_type'}
    },
},{
    modelName :'auditorium',
    tableName:'auditorium',
    timestamps:false
});

module.exports = auditorium;