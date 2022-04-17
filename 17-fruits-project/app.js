//jshint esversion:6

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/fruitsDB');
// ,{useNewUrlParser:true} should be added if required

const fruitSchema  = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "Please check your data entry, no name specified!"] //message when required
  },
  rating:{
    type:Number,
    max:5
  },
  review:String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit ({
  name:"Mango",
  rating:3.6,
  review:"Pretty yummy as fruit."
});

//fruit.save();


/*-------------------personSchema--------------*/
const personSchema  =new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit:fruitSchema
})

const Person = mongoose.model("Person",personSchema);
// here the collection will be people i.e. plural of person ---an intelligent effort by mongo

const orange = new Fruit ({
  name:"Orange",
  rating:4.8,
  review:"tastiest😉😍💕💕💕💕"
});

orange.save();


// const person = new Person({
//   name:"Prasoon",
//   age:18,
//   favouriteFruit:pineapple
// })
//
//  person.save()


//updating person
Person.updateOne({name:"Pranjal"},{favouriteFruit: orange },(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated");
  }
});













/*-------------find or accessing db---*/


//reads fruits db
Fruit.find((err,fruits)=>{
  if(err){
    console.log(err);
  }else{
    console.log(fruits);
  }
});

//reads people/person db
Person.find((err,people)=>{
  if(err){
    console.log(err);
  }else{

    //to close the bd connection
    mongoose.connection.close();

    people.forEach((person)=>console.log(person.name));
    //will print name only
  }
});

// //updating review for banana
// Fruit.updateOne({_id:"61f2f353cf77ac863de03436"},{review: "Very tasty 😍" },(err)=>{
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully updated");
//   }
// });
//
// Person.deleteOne({name:"Palak"},(err)=>{
//   if(err){
//     console.log(err);
//   }else{
//     //to close the bd connection
//     //mongoose.connection.close();
//
//     console.log("Successfully deleted");
//   }
// })
