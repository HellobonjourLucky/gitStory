const express = require('express');
const bodyParser  = require('body-parser');
// const date =  require(__dirname + '/date.js');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect('mongodb+srv://admin-lucky:loveuthanku@cluster0.jedte.mongodb.net/todolistDB');

const itemSchema = {
   name: String
}

const listSchema = {
  name: String,
  items: [itemSchema]
}

const ItemModel = mongoose.model('Item', itemSchema);
const ListModel = mongoose.model('List', listSchema);

const item1 = new ItemModel({
  name: "Welcome to your todoList"
});
const item2 = new ItemModel({
  name: "Hit the + button to add a new item"
});
const item3 = new ItemModel({
  name: "<--Hit this to delete the item"
});

const defaultItems = [item1, item2, item3];






app.get('/', function(req, res){
  ItemModel.find({}, function(err, items){
    if(items.length === 0){
      ItemModel.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully saved default items to DB");
        }
      });
      res.redirect('/');
    }else{
      res.render('list', {listTitle : "Today", newListItems : items});
    }
  })

})

// app.get('/work', function(req, res){
//   res.render('list', {listTitle : "Work List", newListItems : workItems});
// })

app.get('/:customListName', function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  ListModel.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(foundList){
        // console.log("exist");
        res.render('list', {listTitle : customListName, newListItems : foundList.items})
      }else{
        // console.log("not exist");
        const list = new ListModel({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect('/' + customListName);
      }
    }
  })
})


app.post('/', function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.listBtn;

  const item = new ItemModel({
    name: itemName
  })

  if(listName === "Today"){
    item.save();
    res.redirect('/');
  }else{
    ListModel.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect('/' + listName);
    })
  }
})

app.post('/delete', function(req, res){
  // console.log(req.body.checkbox);
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    ItemModel.findByIdAndRemove(checkedItemId, function(err){
      if(!err){
        console.log("Successfully deleted item");
        res.redirect('/');
      }
    })
  }else{
    ListModel.findOneAndUpdate(
      {name: listName},
      {$pull: {items: {_id: checkedItemId}}},
      function(err, foundList){
        if(!err){
          res.redirect('/'+listName);
        }
      }
    )
  }

})


app.listen(3000, function(){
  console.log(200);
})
