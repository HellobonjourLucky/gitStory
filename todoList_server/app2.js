const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/tododb');

const todoSchema = new mongoose.Schema({
  name: String
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [todoSchema]
});

const TodoModel = mongoose.model('Todo', todoSchema);
const ListModel = mongoose.model('List', listSchema);

const item1 = new TodoModel({
  name: "Welcome to your todoList"
});
const item2 = new TodoModel({
  name: "Hit the + button to add a new item"
});
const item3 = new TodoModel({
  name: "<--Hit this to delete the item"
});

const defaultItems = [item1, item2, item3];



app.get('/', function(req, res){
  TodoModel.find(function(err, data){
    if(data.length === 0){
      TodoModel.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully saved default items to DB");
        }
        res.redirect('/');
      });
    }else{
      res.render('list2', {listTitle : "Today", items: data});
    }
  })
});


app.get('/:customListName', function(req,res){
  const customListName = req.params.customListName;
  ListModel.findOne({name: customListName}, function(err, data){
    if(!err){
      if(!data){
        //make a new List!
        console.log("Not exist this List! Make new One!");
        const newList = new ListModel({
          name: customListName,
          items: defaultItems
        });
        newList.save();
        res.redirect('/' + customListName);
      }else{
        //showing existing List!
        // console.log(data);
        res.render('list2', {listTitle: data.name , items: data.items});
      }
    }
  })
});


app.post('/', function(req,res){
  const newItem = req.body.newItem;
  const item = new TodoModel({
    name: newItem
  });
  item.save();
  res.redirect('/');
});

app.post('/delete', function(req,res){
  const removeItem = req.body.checkbox;
  TodoModel.deleteOne({_id: removeItem}, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully deleted the item from DB");
    }
  res.redirect('/');
  })
})

app.listen(2000,function(){
  console.log("app2: 200");
});
