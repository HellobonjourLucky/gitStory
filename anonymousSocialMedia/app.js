const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
const posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const covid = new Date(2019, 12, 31);
const today = new Date();

app.get('/', function(req, res){
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    const diffInTime = today.getTime() - covid.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    res.render('index', {Dday: diffInDays, postCollection: posts});
});

app.get('/posts/:postDate', function(req, res){
    const requiredDate = _.lowerCase(req.params.postDate);
    posts.forEach(post => {
        const storedDate = _.lowerCase(post.date);
        console.log("sotred date is..." + storedDate);
        if(storedDate == requiredDate){
            console.log('Match!');
            return res.render('post', {post:post});
        }else{
            console.log("not a match!")
        }
    })
})

app.post('/', function(req, res){
    const post = {
        date : today.toDateString(),
        content : req.body.postBody
      }
    posts.push(post);
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("Server is running on port  3000");
})