const express = require('express');
const bodyParser  = require('body-parser');
// const date =  require(__dirname + '/date.js');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemSchema = {
   name: String
}

const ItemModel = mongoose.model('Item', itemSchema);

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

app.get('/work', function(req, res){
  res.render('list', {listTitle : "Work List", newListItems : workItems});
})

app.get('/about', function(req, res){
  res.render('about');
})



app.post('/', function(req, res){
  const itemName = req.body.newItem;
  // if(req.body.button == "Work List"){
  //   workItems.push(req.body.newItem);
  //   res.redirect('/work');
  // }else{
  //   items.push(req.body.newItem);
  //   res.redirect('/');
  // }

  const item = new ItemModel({
    name: itemName
  })

  item.save();
  res.redirect('/');
})

app.post('/delete', function(req, res){
  // console.log(req.body.checkbox);
  const checkedItemId = req.body.checkbox;
  ItemModel.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted item");
      res.redirect('/');
    }
  })
})


app.listen(2000, function(){
  console.log(200);
})
