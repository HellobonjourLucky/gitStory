const express = require('express');
const bodyParser = require('body-parser');
// const _ = require('lodash');
// const { isBuffer } = require('lodash');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

const covid = new Date(2019, 12, 31);
const today = new Date();


//MongoDB connect
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-lucky:loveuthanku@cluster0.jedte.mongodb.net/postsDB');

const postSchema = {
    content: String,
    date: String
 }

const PostModel = mongoose.model('Post', postSchema);

const post1 = {
    content: "Welcome to KABK comfort garden.",
    date: "Sun Mar 06 2022"
}
const post2 = {
    content: "You must be depressed and anxious during this pandemic ",
    date: "Sun Mar 06 2022"
}
const post3 = {
    content: "But you are not alone...",
    date: "Sun Mar 06 2022"
}

const defalutPosts = [post1, post2, post3];



app.get('/', function(req, res){
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    const diffInTime = today.getTime() - covid.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    PostModel.find({}, function(err, foundPosts){
        if(foundPosts.length === 0){
            PostModel.insertMany(defalutPosts, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully saved default posts to DB");
                }
            })
            res.redirect('/');
        }else{
            res.render('index', {Dday: diffInDays, postCollection: foundPosts});
        }
    })
});

app.get('/posts/:postDate', function(req, res){
    const requiredDate = req.params.postDate;

    PostModel.find({}, function(err, foundPosts){
        foundPosts.forEach(post => {
            const storedDate = post._id;
            console.log("sotred date is..." + storedDate);
            if(storedDate == requiredDate){
                console.log('Match!');
                return res.render('post', {post:post});
            }
        })
    })
})


app.post('/', function(req, res){
    const post = new PostModel({
        content: req.body.postBody,
        date: today.toDateString()
    })
    post.save();
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("Server is running on port  3000");
})