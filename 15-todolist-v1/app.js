//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
})); //handling inputs

const items = [];
const workItems = [];

app.get("/", (req, res) => {

  const day=date.getDate()
  // let today = new Date();
  // let options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long"
  // }
  // let day = today.toLocaleDateString("en-US", options);
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", (req, res) => {
  const item = req.body.newItem;

  if (req.body.listName === "Work") {
    workItems.push(item)
    res.redirect("/work") // to app.get("/work")
  } else {
    items.push(item);
    res.redirect("/"); // to app.get ("/")
  }
})

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work",
    newListItems: workItems
  })
})




app.listen(3000, () => console.log("Server is running on port 3000"));
