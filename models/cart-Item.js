const Sequelize = require('sequelize');

const sequelize = require('../util/data');

const CartItem = sequelize.define('cartIem',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  quantity:Sequelize.INTEGER
});

module.exports = CartItem;