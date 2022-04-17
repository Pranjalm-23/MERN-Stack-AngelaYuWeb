//jshint esversion:6

const express=require("express");
const https=require("http"); // based on api we need to req https or http
const bodyParser=require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
})


app.post("/",(req,res)=>{


  console.log(req.body.cityName);

  const query=req.body.cityName;
  const apiKey="e3ad71deb40f3691b3f687adb5e93f48";
  const url="http://api.weatherstack.com/current?access_key="+apiKey+"&query="+query;

  https.get(url,(response)=>{
    console.log(response.statusCode);


    response.on("data",(data)=>{
      const forecast=JSON.parse(data)
      const temp=forecast.current.temperature
      res.write("<h1> Current Temperataure in "+query+"  is:"+temp+"degree celcius</h1>");
      res.write("<img src='"+forecast.current.weather_icons+"' >");
      res.send();  // this is final and compulsory call
    })
  })

});



app.listen(3000, () => console.log("Server is running on port 3000"))
