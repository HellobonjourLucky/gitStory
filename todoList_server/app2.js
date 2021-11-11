const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect('mongodb+srv://admin-lucky:loveuthanku@cluster0-jedte.mongodb.net/todolistDB');

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
  const customListName = _.capitalize(req.params.customListName);
  ListModel.findOne({name: customListName}, function(err, data){
    if(!err){
      if(!data){
        const newList = new ListModel({
          name: customListName,
          items: defaultItems
        });
        newList.save();
        res.redirect('/' + customListName);
      }else{
        res.render('list2', {listTitle: data.name , items: data.items});
      }
    }
  })
});


app.post('/', function(req,res){
  const newItem = req.body.newItem;
  const listName = req.body.listName;

  const item = new TodoModel({
    name: newItem
  });

  if(listName === "Today"){
    item.save();
    res.redirect('/');
  }else{
    ListModel.findOne({name: listName}, function(err, obj){
      obj.items.push(item);
      obj.save();
      res.redirect('/' + listName);
    })
  }


});

app.post('/delete', function(req,res){
  const removeItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    TodoModel.deleteOne({_id: removeItemId}, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Successfully deleted the item from DB");
      }
    res.redirect('/');
    })
  }else{
    ListModel.findOneAndUpdate(
      {name: listName},
      {$pull: {items: {_id:removeItemId}}},
      function(err, obj){
        if(!err){
          res.redirect('/' + listName);
        }
      }
    )
  }

})


let port = process.env.PORT;
if(port == null || port == ""){
  port = 2000;
}
app.listen(port,function(){
  console.log("app2: 200");
});
