const Sequelize = require('sequelize');
const db = require('../config/database.js');

const auditorium_type = db.define('Auditorium_type',{
    auditorium_type:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    auditorium_typename:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    modelName :'Auditorium_type',
    tableName:'Auditorium_type',
    timestamps:false
});

module.exports = auditorium_type;