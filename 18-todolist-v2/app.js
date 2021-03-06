//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ =require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//mongodb+srv://admin-pranjal:admin123@cluster0.fxurg.mongodb.net
//mongodb://localhost:27017
mongoose.connect("mongodb+srv://admin-pranjal:admin123@cluster0.fxurg.mongodb.net/todolistDB", {
  useNewUrlParser: true
});

//schema for the database
const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema= new mongoose.Schema({
  name:String,
  items:[itemsSchema]
});

const List = mongoose.model("List",listSchema);

app.get("/", function(req, res) {

Item.find({},(err,foundItems)=>{


  if(foundItems.length===0){
    Item.insertMany(defaultItems, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesfully added the default items.");
      }
    })
    res.redirect("/");

  }else{
    res.render("list", {
      listTitle: "Today",
      newListItems: foundItems
    });
  }
});
});


app.get("/:customListName",(req,res)=>{
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name:customListName},(err,foundList)=>{
    if(!err){
      if(!foundList){

        //create a new List
        const list = new List({
          name:customListName,
          items:defaultItems
        });
        list.save();
        res.redirect("/"+customListName);

      }else{
        // show the existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
  }
  })
});


app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item=new Item({
    name:itemName
  })

  if(listName==="Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName},(err,foundList)=>{
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })

  }

});

app.post("/delete",(req,res)=>{

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName==="Today"){
    Item.findByIdAndRemove(checkedItemId,(err)=>{
      if(!err){

        res.redirect("/");
      }
    });
  }else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},(err,foundList)=>{
        if(!err){
          res.redirect("/"+listName);
        }
    });
  }
});






app.listen(process.env.PORT || 3001, function() {
  console.log("Server started Succesfully");
});
