const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extendded: true}));
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = {
    title: String,
    content: String
};

const ArticleModel = mongoose.model('article', articleSchema);


////////////////////////requesting ALL DOCUMENTS////////////////////////
app.route('/articles')
.get(function(req,res){
    ArticleModel.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }else{
            console.log(err);
        }
    })
})
.post(function(req, res){
    const newArticle = new ArticleModel({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send('successfully add a new articles');
        }else{
            res.send(err);
        }
    });
})
.delete(function(req, res){
    ArticleModel.deleteMany(function(err){
        if(!err){
            res.send('successfully deleted all articles');
        }else{
            res.send(err);
        }
    });
});

//////////////requesting targeting a SPECIFIC DOCUMENTS//////////////
app.route('/articles/:articleTitle')
.get(function(req, res){
    ArticleModel.findOne({title:req.params.articleTitle}, function(err, foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("Sorry, no article matching that title was found.");
        }
    })
})
.put(function(req, res){
    ArticleModel.replaceOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err){
            if(!err){
                res.send("Successfully updated article");
            }else{
                res.send(err);
            }
        }
    )
})
.patch(function(req, res){
    ArticleModel.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("Successfully patched article");
            }else{
                res.send(err);
            }
        }
    )
})
.delete(function(req, res){
    ArticleModel.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Successfully deleted article");
            }else{
                res.send(err);
            }
        }
    )
})

app.listen(3000, function(){
    console.log("wikiProject: 200");
})


