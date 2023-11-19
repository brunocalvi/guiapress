const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/Users");

//VIEW ENGINE
app.set('view engine', 'ejs');

// SESSION

app.use(session({
  secret: "secret-full", cookie: {maxAge: 30000000}
}));

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
app.use("/", usersController);

// ROTA DE TESTE DAS SESSIONS
/*app.get("/session", (req, res) => {
  req.session.treinamento = "Formação Node.js"
  req.session.ano = 2023
  req.session.user = {
    username: "Usuario Teste",
    email: "email@email.com",
    id: 10
  }
  res.send("Sessões Geradas")
});

app.get("/leitura", (req, res) => {
  res.json({
    treinamento: req.session.treinamento,
    ano: req.session.ano,
    usuario: req.session.user
  })
});*/

app.get("/", (req, res)=>{
  Article.findAll({
    order: [
      ['id', 'DESC']
    ], limit: 4
  }).then(articles => {

    Category.findAll().then(categories => {
      res.render("index", {articles: articles, categories: categories});
    });

    
  });
});

app.get("/:slug", (req, res)=>{
  let slug = req.params.slug;

  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if(article != undefined){
      Category.findAll().then(categories => {
        res.render("article", {article: article, categories: categories});
      });
    } else {
      res.redirect("/");
    }
  }).catch( er => {
    res.redirect("/");
  })

});

app.get("/category/:slug", (req, res)=>{
  let slug = req.params.slug;

  Category.findOne({
    where: {
      slug: slug
    },
    include: [{model: Article}]
  }).then( category => {
    if(category != undefined){
      Category.findAll().then(categories =>{
        res.render("index", {articles: category.articles, categories: categories});
      })

    } else {
      res.redirect("/");

    }
  }).catch( err => {
    res.redirect("/");

  })
});

app.listen(4000, ()=>{
  console.log("O servidor está rodando na porta 4000!");
});