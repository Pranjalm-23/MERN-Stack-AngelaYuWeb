//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB")

const articleSchema = new mongoose.Schema({
  title:String,
  content:String
})

const Article = mongoose.model("Article",articleSchema)
//TODO

app.route("/articles")
.get( (req,res)=>{
  Article.find((err,foundArticles)=>{
    if(!err){
      res.send(foundArticles)
    }else{
      console.log(err);
    }
  })
})
.post((req,res)=>{
    const newArticle =  new Article({
    title:req.body.title,
    content:req.body.content
  })
  newArticle.save((err)=>{
    if(!err){
      res.send("Successfully added a new article.")
    }else{
      res.send(err);
    }
  })
})
.delete((req,res)=>{
  Article.deleteMany((err)=>{
    if(!err){
      res.send("Successfully deleted all articles.");
    }else{
      res.send(err);
    }
  })
});

///////////////////////////////specific articles/////////////////////

app.route("/articles/:articleTitle")

.get((req,res)=>{
  const articleTitle = req.params.articleTitle;
  Article.findOne({title:articleTitle},(err,foundArticle)=>{
  if(foundArticle){
    res.send(foundArticle);
  }else{
    res.send("No match found");
  }

  })
})

.put((req,res)=>{

// in put method we need to overwrite everything instead of overriding
  Article.replaceOne(
    {title:req.params.articleTitle},
    {title:req.body.title,content:req.body.content},
    (err)=>{
      if(!err){
        res.send("Successfully updated article.");
      }
    })
})

.patch((req,res)=>{
  Article.update({title:req.params.articleTitle},req.body,(err)=>{
    if(!err){
      res.send("Successfully updated the contents of article.");
    }else{
      res.send(err);
    }
  })
})

.delete((req,res)=>{
  Article.deleteOne({title:req.params.articleTitle},(err)=>{
    if(!err){
      res.send("Successfully deleted article.");
    }else{
      res.send(err);
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
