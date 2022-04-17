//jshint esversion:6

const express = require('express');

const app = express();  // this used to call the express


/*---------this is routing---------------*/
app.get("/",(req,res)=>{
   res.send("<h1>Pranjal</h1>");
})

app.get("/contact",(req,res)=>{
  res.send("Call me : 7999509642")
});

app.get("/about",(req,res)=>{
  res.send("I'm pranjal.")
})

app.get("/hobbies",(req,res)=>{
  res.send(`<ul>
  <li>Coding</li>
  <li>Books</li>
  <li>Engineering</li>
</ul>`)
})

/*---------this was routing---------------*/

app.listen(3000, ()=>console.log("Server started on port 3000"));
