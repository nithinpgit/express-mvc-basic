/************************
config intialization 
*************************/
var CONFIG_PATH 	= 'config/CONFIG.json';
var cert_path, key_path,httpsPort,apiKey,apiSecret;
var express = require('express');
var fs 		= require('fs');
var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');


var port = process.env.PORT || 8042;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
//configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


require('./config/passport')(passport); // pass passport for configuration

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
setConfig();
var options = {
    key: fs.readFileSync(key_path),
    cert: fs.readFileSync(cert_path),
    ca: [fs.readFileSync('cert/bundle1.crt'), fs.readFileSync('cert/bundle2.crt'),fs.readFileSync('cert/bundle3.crt')]
};
var https 			= require('https');
var httpsServer		= https.createServer(options, app).listen(httpsPort);
var io 				= require('socket.io')(httpsServer);
//app.listen(port);
console.log('The magic happens on port ' + httpsPort);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
function setConfig() {
    config_data 	= fs.readFileSync(CONFIG_PATH, 'utf8');
    config_obj 		= JSON.parse(config_data);
    cert_path 		= config_obj['cert_path'];
    key_path 		= config_obj['key_path']; 
    httpsPort		= config_obj['httpsPort'];
    apiKey          = config_obj['apiKey'];
    apiSecret       = config_obj['apiSecret'];

}
exports = module.exports = app;