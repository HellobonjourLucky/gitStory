require('dotenv').config();
const express = require('express');
const bodyParser =  require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

const UserModel = new mongoose.model('User', userSchema);

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
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new UserModel({
            email: req.body.username,
            password: hash
        });
    
        newUser.save(function(err){
            if(err){
                console.log(err);
            }else{
                res.render('secrets');
            }
        })
    });
});

app.post('/login', function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    //User in here = collection name
    UserModel.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result === true){
                        res.render('secrets');
                    }
                });
            }else{
                console.log("no matching user");
            }
        }
    })
});



app.listen(3000, function(){
    console.log('server is running on port 3000');
})