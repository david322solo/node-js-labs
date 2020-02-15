const Sequelize = require('sequelize');
const sequelize = new Sequelize('UNIVERSITIY','artem1','artem1',{host:'DESKTOP-S21UQE4',dialect:'mssql',dialectOptions:{options:{encrypt:true}}});
const Model = Sequelize.Model;
sequelize.authenticate()
    .then(()=>{
        Faculty.findAll().then(faculties=>{
            console.log('All faculties', JSON.stringify(faculties))
        })
    });

class Faculty extends Model{};
Faculty.init(
    {
        faculty:{type: Sequelize.STRING, allowNull:false,primaryKey:true},
        faculty_name:{type:Sequelize.STRING,allowNull:false}
    },{
        sequelize,
        modelName :'Faculty',
        tableName:'Faculty',
        timestamps:false
    }
)