const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js");

const categoriesController = require("./categories/CategoriesController.js");
const articlesController = require("./articles/ArticlesController.js");

const Article = require("./articles/Article.js");
const Category = require("./categories/Category.js");

//VIEW ENGINE
app.set('view engine', 'ejs');

// STATIC
app.use(express.static('public'));

// BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DATABASE
connection.authenticate()
  .then(()=>{
    console.log("Conexão realizada com sucesso!");
  }).catch((error)=>{
    console.log(error);
});

// IMPORTANDO ROTAS
app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res)=>{
  res.render("index.ejs");
});

app.listen(4000, ()=>{
  console.log("O servidor está rodando na porta 4000!");
});