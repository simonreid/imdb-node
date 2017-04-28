var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config/config');

//Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//set custom server-side headers
app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  // res.set('Access-Control-Allow-Credentials', true);
  // res.set('Access-Control-Allow-Methods', 'GET');
  // res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  //if api_key has been configured in the server, send along to downstream scope
  //req.api_config = config.api_config ? config.api_config : undefined;

  //onward
  next();
});

//Routes
var routes = {};
routes.imdbSearch = require('./app/routes/imdbSearch.js');

//assign route to handler function
app.get('/api/search', routes.imdbSearch.getReq);

app.get('/', function(req,res){
  res.redirect('/');
});


//set up server
var port = process.env.PORT || 3000
var server = app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

//useful for mocha to close servers when done
exports.closeServer = function(){
  server.close();
};
