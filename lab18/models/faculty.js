const Sequelize = require('sequelize');
const db = require('../config/database.js');

const faculty = db.define('Faculty',{
    faculty:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    faculty_name:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    modelName :'Faculty',
    tableName:'Faculty',
    timestamps:false
});

module.exports = faculty;