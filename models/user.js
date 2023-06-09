const Sequelize = require('sequelize');

const sequelize = require('../util/data');


const User = sequelize.define('user',
{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    userName:Sequelize.STRING,
    email:Sequelize.STRING
});


module.exports = User;