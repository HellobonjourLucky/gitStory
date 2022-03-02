const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let items = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    const covid = new Date(2019, 12, 31);
    const today = new Date();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    const diffInTime = today.getTime() - covid.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    res.render('index', {Dday: diffInDays, newTexts: items});
})

app.post('/', function(req, res){
    items.push(req.body.newText);
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("Server is running on port  3000");
})