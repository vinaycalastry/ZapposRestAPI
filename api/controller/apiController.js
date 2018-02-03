var dbConnection = require("../models/restaurantModel.js");
var _redis = require("redis"),
var redis = _redis.createClient();

/* ROUTES */

//Base Route
module.exports.root = function(req, res){
	res.status(200).json({message: "Welcome to the Restaurant API V1.0."});
	
}

/* Restaurant Object routes */
//Get Restaurant details using ID
module.exports.getRestaurant = function(req, res){
	var rid = req.params.ID;
	dbConnection.getConnection(function(err, connection) {

		if(err) throw err;
		// Use the connection
		connection.query('SELECT RID, RNAME, ADDRESS, PHONE FROM `restaurants` where `rid`=?', [rid], function (error, results, fields) {
			
			connection.release();

		  	// Handle error after the release.
		  	if (error) {
				res.status(500).json({"Error": error});
				throw error;
			  } 
			else if (!results.length){
				res.status(400).json({"Error": "No rows found."});
			}
			else{
				res.status(200).json(results[0]);
			}
			
		});
	  });
}

//Add Restaurant details using ID
module.exports.addRestaurant = function(req, res){
	console.log(req.body);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		console.log("JSON data empty in the request body");
		return res.status(400).json({Error: "JSON data empty in the request body"});
	  }
		res.status(200).json(req.body.Name);
}


//Delete Restaurant details using ID
module.exports.deleteRestaurant = function(req, res){
	var id = req.params.ID;
	res.status(200).json({"msg": "Restaurant "+id+" deleted from DB"});
}


/* Menu Object routes */
//Get Menu details using ID
module.exports.getMenu = function(req, res){
	var id = req.params.ID;
	res.status(200).json({ID: id, Name: 'Paradise', Address: 'E.Flamingo Road', Phone: '702-934-3333'});
}

//Add Menu details using ID
module.exports.addMenu = function(req, res){
	//console.log(req.body);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		console.log("JSON data empty in the request body");
		return res.status(400).json({Error: "JSON data empty in the request body"});
	  }
		res.status(200).json(req.body.Name);
}


//Delete Restaurant details using ID
module.exports.deleteMenu = function(req, res){
	var id = req.params.ID;
	res.status(200).json({"msg": "Restaurant "+id+" deleted from DB"});
}


/* MenuItem Object routes */
//Get MenuItem details using ID
module.exports.getMenuItem = function(req, res){
	var id = req.params.ID;
	res.status(200).json({ID: id, Name: 'Paradise', Address: 'E.Flamingo Road', Phone: '702-934-3333'});
}

//Add MenuItem details using ID
module.exports.addMenuItem = function(req, res){
	console.log(req.body);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		console.log("JSON data empty in the request body");
		return res.status(400).json({Error: "JSON data empty in the request body"});
	  }
		res.status(200).json(req.body.Name);
}


//Delete Restaurant details using ID
module.exports.deleteMenuItem = function(req, res){
	var id = req.params.ID;
	res.status(200).json({"msg": "Restaurant "+id+" deleted from DB"});
}
