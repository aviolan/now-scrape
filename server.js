var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var logger = require('morgan');
var request = require('request');
var cheerio = require('cheerio');

var port = process.env.PORT || 3000;

var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(process.cwd() + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

if(process.env.MONGODB_URI){
  mongoose.connect('mongodb://heroku_csxw199c:ov188d6b52pkqecidudadj89hh@ds223685.mlab.com:23685/heroku_csxw199c');
}
else{
  mongoose.connect('mongodb://localhost/mongoHeadlines');
}

mongoose.connect(MONGODB_URI);

var Comment = require('./models/note.js');
var Article = require('./models/articles.js');

var router = require('./controllers/controller.js');
app.use('/', router);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});