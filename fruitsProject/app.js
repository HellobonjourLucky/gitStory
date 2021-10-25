const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});


const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [1, "please put your name"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitsSchema
})

const Fruit = mongoose.model("Fruit", fruitsSchema);
const Person = mongoose.model("Person", personSchema);

// const apple = new Fruit({
//   rating: 5,
//   review: 'pretty good'
// });
// const kiwi = new  Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "The best fruit"
// });
//
// const orange = new  Fruit({
//   name: "Orange",
//   rating: 4,
//   review: "Too sour for me"
// });
//
// const banana = new  Fruit({
//   name: "Banana",
//   rating: 3,
//   review: "Weird texture"
// });

// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 5,
//   review: "sweeet!"
// })

const mango = new Fruit({
  name: "Mango",
  score: 10,
  review: "Juicy"
})


// const jhon = new Person({
//   name: 'Jhon',
//   age: 35
// })

// const amy = new Person({
//   name: "Amy",
//   age: 21,
//   favoriteFruit: pineapple
// })

// mango.save();
// pineapple.save();
// amy.save();

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log('successfully saved all the fruits to fruitsDB');
//   }
// })

// Fruit.find(function(err, fruits){
//   if(err){
//     console.log(err);
//   }else{
//     // fruits.forEach(fruit => {
//     //   console.log(fruit.name);
//     // })
//     // mongoose.connection.close();
//   }
// })

Person.updateOne({name: "Jhon"}, {favoriteFruit: mango},
  function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully updated the document");
    }
  });
//
// Person.deleteOne({_id: "6173cf3a363b982751b1e4b6"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted the document");
//     mongoose.connection.close();
//   }
// })
