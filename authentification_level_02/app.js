require('dotenv').config();
const express = require('express');
const bodyParser =  require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
const md5 = require('md5');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


// userSchema.plugin(encrypt, {secret : process.env.SECRET, encryptedFields: ['password']});

const userModel = new mongoose.model('User', userSchema);

app.get('/', function(req, res){
    res.render('home');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    const newUser = new userModel({
        email: req.body.username,
        password: md5(req.body.password)
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render('secrets');
        }
    })
});

app.post('/login', function(req, res){
    const username = req.body.username;
    const passport = md5(req.body.passport);

    userModel.findOne({email: username},function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                res.render('secrets')
            }else{
                console.log("no matching useer");
            }
        }
    })
})


app.listen(3000, function(){
    console.log('server is running on port 3000');
})