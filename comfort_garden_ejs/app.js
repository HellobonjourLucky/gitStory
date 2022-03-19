const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

let texts = ["sad", "alone", "joyful"];
let garden02_texts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('list', {gardenTitle: 'garden01', userTexts: texts});
});

app.post('/', function(req, res){
    let text = req.body.newText;
    if(req.body.button == "garden02"){
        garden02_texts.push(text);
        res.redirect('/garden02');
    }else{
        texts.push(text);
        res.redirect('/');
    }
});

app.get('/garden02', function(req, res){
    res.render('garden02', {gardenTitle: 'garden02', userTexts: garden02_texts});
});


app.listen(3000, function(){
    console.log("Server is on port 3000");
});