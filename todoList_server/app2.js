const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/fruitsDB');

let items = ["book", "cleaning"];
let workItems = [];

const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [1, "Please check your data entry, no name specified!"]
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

const FruitModel = mongoose.model('Fruit', fruitsSchema);
const PersonModel = mongoose.model('Person', personSchema);

const apple = new FruitModel({
  name: 'Apple',
  rating: 5,
  review: 'nice'
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

const john = new PersonModel({
  name: 'John',
  age: 24
})

const ammy = new PersonModel({
  name: "Ammy",
  age: 31,
  favoriteFruit: apple
})

// apple.save();
// john.save();
// ammy.save();

// FruitModel.insertMany([kiwi, banana, apple], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log('successfully saved all the fruits to fruitsDB');
//   }
// })

// FruitModel.updateOne({_id:"618abc0ff17c866247375dd7"}, {name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully updated the document");
//   }
// });
//
// PersonModel.updateOne({name:"John"}, {favoriteFruit: banana}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully updated the document");
//   }
// })
//
// FruitModel.deleteOne({_id: "618abc0ff17c866247375dd8"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted the document");
//   }
// })

// PersonModel.deleteMany({name: "Ammy"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted the document");
//   }
// });

PersonModel.find(function(err, data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
});

app.get('/', function(req, res){
  res.render('list2', {listTitle : "Today", items: items});
});


app.get('/:customListName', function(req,res){
  const customListName = req.params.customListName;
  if(customListName === 'work'){
    res.render('list2', {listTitle : customListName, items: workItems})
  }else{
    res.render('list2', {listTitle : customListName, items: items});
  }
})


app.post('/', function(req,res){
  const newItem = req.body.newItem;
  const listName = req.body.listName;
  if(listName === "Today"){
    items.push(newItem);
    res.redirect('/');
  }else{
    workItems.push(newItem);
    res.redirect('/' + 'work');
  }
});

app.post('/delete', function(req,res){
  const removeItem = req.body.checkbox;
  const listName = req.body.listName;
  if(listName === "Today"){
    items = items.filter(item => {
      return item !== removeItem;
    })
    res.redirect('/');
  }else{
    workItems = workItems.filter(item => {
      return item !== removeItem;
    })
    res.redirect('/' + 'work');
  }
})

app.listen(2000,function(){
  console.log("app2: 200");
});
