const express = require('express')
const app = express();
const bodyParser = require('body-parser');

// App
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// DB
const mongoose = require('mongoose');

// DB connect
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('디비 연결 완료!')
})

mongoose.connect('mongodb://localhost/namwiki');

// Model
const profileModel = require('./models/profile');
const Book = require('./models/book');

// route
const router = require('./routes')(app, profileModel);

// PORT
const port = process.env.port || 8080;

// run
const server = app.listen(port, function() {
    console.log('서버 런!');
})