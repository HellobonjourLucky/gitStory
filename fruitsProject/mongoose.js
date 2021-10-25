//using Mongoose instead of MongoDB Driver
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB')

const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [1, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String,
});

const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
})

const FruitModel = mongoose.model("Fruit", fruitSchema);
const PersonModel = mongoose.model("Person", personSchema);

const apple = new FruitModel({
  name: "Apple",
  rating: 5,
  review: "Sweet"
});

const kiwi = new  FruitModel({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit"
});

const orange = new  FruitModel({
  name: "Orange",
  rating: 4,
  review: "Too sour for me"
});

const banana = new  FruitModel({
  name: "Banana",
  rating: 3,
  review: "Weird texture"
});

const pineapple = new FruitModel({
  name: "Pineapple",
  score: 9,
  review: "Great Fruit"
});

const jhon = new PersonModel({
  name: "Jhon",
  age: 43
});

const amy = new PersonModel({
  name: 'Amy',
  age: 12,
  favoriteFruit: pineapple
})


// pineapple.save();
// apple.save();
// jhon.save();
// amy.save();

// FruitModel.insertMany([kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log('successfully saved all the fruits to fruitsDB');
//   }
// })

// FruitModel.updateOne({_id: '6173e373256c127e8401a337'}, {name:"Peachh"},
//   function(err){
//     if(err){
//       console.log(err);
//     }else{
//       console.log('successfully updated fruits to fruitsDB');
//     }
//   })

// FruitModel.deleteOne({_id: '6173e373256c127e8401a337'}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log('successfully deleted fruits to fruitsDB');
//   }
// })

// PersonModel.updateOne({name : 'Jhon'}, {favoriteFruit: kiwi}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log('successfully updated data of person to fruitsDB');
//   }
// })
