var express = require('express'); //routing
var morgan = require('morgan'); // log all the requests
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

// User defined 
var secret = require('./config/secret');
var User = require('./models/user');
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

var app = express();
mongoose.connect(secret.database, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Connected to database");
    }
});

//Middleware
app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey
}));
app.use(flash());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(mainRoutes);
app.use(userRoutes);




app.listen(secret.port, function(err){
    if(err) throw err;
    console.log("Server is running on port " + secret.port);
});