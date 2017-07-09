var express       = require('express');
var config        = require('./config');
var fs            = require('fs');
var path          = require('path');
var favicon       = require('serve-favicon');
var mysql         = require('mysql');
var multer        = require('multer');
var router        = require('./routes/CMS');
var nodemailer    = require("nodemailer");
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var cookieSession = require('cookie-session');

var app = express();

var con = mysql.createConnection({
    host: 'localhost',
    port: '53306',
    user: 'root',
    password: 'HI123',
    database: 'users'
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to database.');
    }
    console.log('Connection Established');
});

app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));
app.use(bodyParser({uploadDir:'/images'}));

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'spiretch@gmail.com',
        pass: 'Montage@1'
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.post('/api/v1/contact', function(req, res){
    var values = {
        name: req.body.name,
        location: req.body.location
    };
    con.query("INSERT INTO Users2 SET ?", values, function(err, res){
        if(err) throw err;
        console.log('Last insert ID:', res.insertId);
    });
    res.json( { "status": "ok" } );
});

app.get('/api/v1/contact', function(req, res, rows){
    con.query("SELECT * FROM Users2 WHERE id IS NOT NULL", function(err, res){
        if(err) throw err;

        console.log(res);
    });
    res.json( { "status": "ok" } );
});

app.post('/api/v2/contact', function(req, res) {
    var values = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        category: req.body.category,
        question: req.body.question
    };
    con.query("INSERT INTO Contact SET ?", values, function(err, res){
        if(err) throw err;
        console.log('Last Inserted ID:', res.insertId);
    });
    res.json( { "status": "ok" } );
});

/**
 *Sends an email to me.
 * */
app.get('/api/send', function (req, res) {
    var message = {
        from: req.query.from,
        to: 'spiretch@gmail.com',
        subject: 'I forgot my password',
        text: req.query.message
    };
    console.log(message);
    smtpTransport.sendMail(message, function (error, info) {
        if(error) {
            console.log(error);
            console.log(error.message);
            res.send("Error");
        } else {
            console.log("Message Sent Successfully");
            console.log("Message Sent: " + info.response);
            res.end();
            smtpTransport.close();
        }
    });
});

var storage	= multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
    }
});

var upload = multer({ storage : storage }).single('userPhoto');

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

// app.get('/api/send', function (req, res) {
//     var message = {
//         from: req.query.from,
//         to: 'spiretch@gmail.com',
//         subject: 'I forgot my password',
//         text: req.query.text
//     };
//     console.log(message);
//     smtpTransport.sendMail(message, function (error, info) {
//         if(error) {
//             console.log(error);
//             console.log(error.message);
//             res.send("Error");
//         } else {
//             console.log("Message Sent Successfully");
//             console.log("Message Sent: " + info.response);
//             res.end();
//             smtpTransport.close();
//         }
//     });
// });

app.use(express.static(path.join(__dirname, '../app')));

app.listen(config.server.port, function() {
    var open = require('open');
    open('http://localhost:' + config.server.port + '/');
    console.log('Spire Server is listening on: http://localhost:' + config.server.port);
});