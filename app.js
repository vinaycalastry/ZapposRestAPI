/* Entry point to webpage */

//Load required environment variables
var dotenv = require('dotenv').config();

//Express for web framework
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');

//Webpage endpoints are defined here
var routes = require('./api/routes/routes');



//Initialize express framework for use as middleware for REST API
var app = express();
app.set('port', (process.env.PORT || 5000)); //Use defined PORT or 5000 as default.
app.use(compression());
app.use(bodyParser.json());

//Listen on specified PORT for server
app.listen(app.get('port'), function(){
    console.log("Running on: "+app.get('port')+" port");
});

//Call the routes function
routes(app);