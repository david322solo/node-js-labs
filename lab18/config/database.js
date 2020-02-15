const Sequelize = require('sequelize');
module.exports = new Sequelize('UNIVERSITIY','artem1','artem1',
    {
        host:'DESKTOP-S21UQE4',
        dialect:'mssql',
        dialectOptions:{
            options:{
                encrypt:true
            }
        }
    });
