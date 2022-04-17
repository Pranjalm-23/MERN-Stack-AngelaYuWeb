const express =require("express");
const bodyParser=require("body-parser");
//const request =require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));  // setting up the default static directory
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>{
  var firstName=req.body.fName;
  var lastName=req.body.lName;
  var email=req.body.email;

// data to be sent to mailchimp
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME: lastName
        }
      }
    ]
  };

    var jsonData = JSON.stringify(data);

  const url="https://us4.api.mailchimp.com/3.0/lists/4bcf3cbb34"
const options={
  method:"POST",
  auth:"angela1:fd8d2a94f77b14c7c113e1d4a29c6120-us4"
}



    const request =https.request(url,options,(response)=>{

      if (response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html")
      }


      response.on("data",(data)=>{
          console.log(JSON.parse(data));
      })
    })
    request.write(jsonData)
    request.end()

  console.log(firstName,lastName,email);

})

// on failure page try again when killed this router redirects to the given route
app.post("/failure",(req,res)=>{
  res.redirect("/");
})


app.listen(process.env.PORT || 3000,()=>{
  console.log("Server is running on port 3000");
})




// list id
// 4bcf3cbb34
