const Sequelize = require("sequelize");
const connection = require("../database/database.js");

const User = connection.define('users',{
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Category.sync({force: true});

module.exports = Category;