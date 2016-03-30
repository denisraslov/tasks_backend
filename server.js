var express = require('express');
var passport = require('passport');
var session = require('cookie-session');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret_key' }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

routes.setup(app, handlers, passportHelper.checkAuth);

app.use(express.static('public'));
app.use(errorHandler);

app.listen(config.get('port'));
