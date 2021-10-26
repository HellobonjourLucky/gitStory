const express = require('express');
const bodyParser  = require('body-parser');
// const date =  require(__dirname + '/date.js');
const mongoose = require('mongoose');

const app = express();
let items = [];
let workItems = [];
let hobbyItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

//mongoose connection
mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemSchema = {
  name: String
}

const item1 = new Item({
  name: "Welcome to your todoList"
});
const item2 = new Item({
  name: "Hit the + button to add a new item"
});
const item3 = new Item({
  name: "<--Hit this to delete the item"
});

const defaultItems = [item1, item2, item3];

const ItemModel = mongoose.model("Item", itemSchema);

app.get('/', function(req, res){
  // day = date.getDate();
  res.render('list', {listTitle : "Today", newListItems : items});
})

app.get('/work', function(req, res){
  res.render('list', {listTitle : "Work List", newListItems : workItems});
})

app.get('/about', function(req, res){
  res.render('about');
})

// app.get('/hobby', function(req, res){
//   res.render('list', {listTitle : "Hobby List", newListItems : hobbyItems});
// })

app.post('/', function(req, res){
  if(req.body.button == "Work List"){
    workItems.push(req.body.newItem);
    res.redirect('/work');
  }else{
    items.push(req.body.newItem);
    res.redirect('/');
  }
})

// app.post('/hobby', function(req,res){
//   hobbyItems.push(req.body.newItem);
//   res.redirect('/hobby');
// })

app.listen(2000, function(){
  console.log(200);
})
