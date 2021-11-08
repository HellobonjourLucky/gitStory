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

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Good Stuff"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}





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

app.listen(3000,function(){
  console.log("app2: 200");
});
