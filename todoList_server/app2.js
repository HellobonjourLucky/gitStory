const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const items = ["book", "cleaning"];


app.get('/', function(req, res){
  res.render('list2', {listTitle : "Today", items: items});
});

app.post('/', function(req,res){
  const newItem = req.body.newItem;
  items.push(newItem);
});

app.listen(3000,function(){
  console.log("app2: 200");
});
