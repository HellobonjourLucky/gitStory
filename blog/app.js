const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const posts = [];

const startingContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const contactContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

app.get('/', function(req, res){
  res.render('home', {startingContent, posts});
})

app.get('/about', function(req,res){
  res.render('about', {aboutContent})
})

app.get('/contact', function(req,res){
  res.render('about', {contactContent})
})

app.get('/compose', function(req,res){
  res.render('compose');
})

app.get('/posts/:postId', function(req, res){
  const requestedPostName = _.lowerCase(req.params.postId)
  posts.forEach(post => {
    const storedPostTitle = _.lowerCase(post.title);
    if(storedPostTitle === requestedPostName){
      res.render('post', {post});
    }
  })
})


app.post('/compose', function(req,res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    id: _.lowerCase(req.body.postTitle)
  }
  posts.push(post);
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, function(){
  console.log(200);
})
