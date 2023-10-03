const Sequelize = require("sequelize");
const connection = require("../database/database.js");
const Category = require("../categories/Category.js");

const Article = connection.define('articles',{
  title:{
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// RELACIONAMENTO 1 - N
Category.hasMany(Article);

// RELACIONAMENTO 1 - 1
Article.belongsTo(Category);

//Article.sync({force: true});

module.exports = Article;