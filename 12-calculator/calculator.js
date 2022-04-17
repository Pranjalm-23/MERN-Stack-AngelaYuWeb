//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");

const app=express();  // this is required

//this applies body parser and lets us access the incoming data before handlers
app.use(bodyParser.urlencoded({extended:true}))


/* Simple Adding */
app.post("/",(req,res)=>{

var num1=+(req.body.num1);  // by default they are string
var num2=+(req.body.num2);

var result = num1 + num2;
res.send("Thanks for posting \nThe result is:"+result)
})

app.get("/",(req,res)=>{
   res.sendFile(__dirname+"/index.html");
})

/*BMI Calculator*/

app.get("/bmicalculator",(req,res)=>{
  res.sendFile(__dirname + "/bmicalculator.html")
})

app.post("/bmicalculator",(req,res)=>{
  var weight=parseFloat(req.body.weight);
  var height=parseFloat(req.body.height);

  var bmi=weight/(height*height)

  res.send("The BMI is: "+bmi);
})


app.listen(3000, ()=>console.log("Server started on port 3000"));
