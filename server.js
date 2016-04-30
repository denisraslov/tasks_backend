var express = require('express');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db/db');
var routes = require('./routes');
var cors = require('cors');
var passportHelper = require('./passportHelper');
var errorHandler = require('./errorHandler');
var app;
var handlers = require('./handlers/main');
var config = require('./config/config');

db.init(config)
passportHelper.init();

app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret_key',
    name: 'token',
    cookie: {
        httpOnly: false
    }
}));
app.use(cors({
    origin: config.get('origin'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());

routes.setup(app, handlers, passportHelper.checkAuth);

app.use(express.static('public'));
app.use(errorHandler);

app.listen(config.get('port'));
