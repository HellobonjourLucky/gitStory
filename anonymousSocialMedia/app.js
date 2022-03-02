const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', function(req, res){
    const today = new Date();
    const currentDay = today.getDay();

    if(currentDay === 6 || currentDay === 0){
        res.sendFile(__dirname + "/index.html");
    }else{
        res.sendFile(__dirname + "/index.html");
    }
})

app.listen(3000, function(){
    console.log("Server is running on port  3000");
})