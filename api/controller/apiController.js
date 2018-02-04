var dbConnection = require("../models/restaurantModel.js");
var _redis = require("redis");
var redis = _redis.createClient(process.env.REDISPORT, process.env.REDISIP);
var redis_key_exp = process.env.REDISKEYEXP;


/* ROUTES */

//Base Route
module.exports.root = function(req, res){
	res.status(200).json({Message: "Welcome to the Restaurant API V1.0."});
	
}

/* Restaurant Object routes */
//Get all Rest details
//Get Restaurant details using ID
module.exports.getRestaurant = function(req, res){
	var rid = req.params.ID;	
	var key = 'rest.' + rid;
	redis.hgetall(key, function(er, cRes){
		if (er) {throw er;}
		if (cRes) {
                	res.status(200).json(cRes);
		}
		else{
				dbConnection.getConnection(function(err, connection) {

					if(err) throw err;
					// Use the connection
					connection.query('SELECT RID, RNAME, ADDRESS, PHONE FROM `restaurants` where `rid`=?', [rid], function (error, results, fields) {
					
					connection.release();
		
					  // Handle error after the release.
					if (error) {
						res.status(500).json({Error: error});
						throw error;
					  } 
					else if (!results.length){
						res.status(400).json({Error: "No rows found."});
					}
					else{
						redis.hmset(key, "RID", results[0].RID, "RNAME", results[0].RNAME, "ADDRESS",  results[0].ADDRESS, "PHONE",  results[0].PHONE, function (err, reply) {
							if(err) {
								res.status(500).json({"Error": error});
								throw error;
							}
							else{
								redis.expire(key, redis_key_exp);
								result_db = {
									"RID": results[0].RID.toString(),
									"RNAME": results[0].RNAME,
									"ADDRESS": results[0].ADDRESS,
									"PHONE": results[0].PHONE
								};
								res.status(200).json(result_db);
							}
						});						
					}
				});
			});
		}
	});
}
	
//Add Restaurant details using ID
module.exports.addRestaurant = function(req, res){
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		console.log("JSON data empty in the request body");
		return res.status(400).json({Error: "JSON data empty in the request body"});
	}
	else{
		dbConnection.getConnection(function(err, connection) {

			if(err) throw err;
			// Use the connection
			var queryParams = {
				RNAME: req.body.RNAME,
				ADDRESS: req.body.ADDRESS,
				PHONE: req.body.PHONE
			};
			connection.query('INSERT INTO `restaurants` SET ?', queryParams, function (error, results, fields) {
			
			connection.release();

			  // Handle error after the release.
			if (error) {
				res.status(500).json({Error: error});
				throw error;
			  }
			res.status(200).json({Message:"Restaurant with RID: "+results.insertId+" added to Table DB."});
			});
		
		});
	}
}


//Delete Restaurant details using ID
module.exports.deleteRestaurant = function(req, res){
	var rid = req.params.ID;
	var key = 'rest.' + rid;
	dbConnection.getConnection(function(err, connection) {

		if(err) throw err;
		// Use the connection
		
		connection.query('DELETE FROM `restaurants` WHERE `RID`=?', [rid], function (error, results, fields) {
		
		connection.release();
		
		  // Handle error after the release.
		if (error) {
			res.status(500).json({Error: error});
			throw error;
		  }
		else if(results.changedRows === 0){
			res.status(200).json({Message: "Restaurant with RID:"+rid+" not found in DB"});
		}
		else{
			redis.del(key, function(er, cRes){
				if(er) {
					res.status(500).json({Error: er});
					throw er;
				}
				res.status(200).json({Message: "Restaurant with RID:"+rid+" deleted from DB"});
			});
		}	
		
	});
	
	});
	
}


/* Menu Object routes */
//Get all menus for the Restaurant ID
//Get Menu details using Menu ID
module.exports.getMenu = function(req, res){
	var mid = req.params.ID;	
	var key = 'menu.' + mid;
	redis.hgetall(key, function(er, cRes){
		if (er) {throw er;}
		if (cRes) {
                	res.status(200).json(cRes);
		}
		else{
				dbConnection.getConnection(function(err, connection) {

					if(err) throw err;
					// Use the connection
					connection.query('SELECT MID, MNAME, MDETAILS, RID FROM `menus` where `mid`=?', [mid], function (error, results, fields) {
					
					connection.release();
		
					  // Handle error after the release.
					if (error) {
						res.status(500).json({Error: error});
						throw error;
					  } 
					else if (!results.length){
						res.status(400).json({Error: "No rows found."});
					}
					else{
						redis.hmset(key, "MID", results[0].MID, "MNAME", results[0].MNAME, "MDETAILS",  results[0].MDETAILS, "RID",  results[0].RID, function (err, reply) {
							if(err) {
								res.status(500).json({"Error": error});
								throw error;
							}
							else{
								redis.expire(key, redis_key_exp);
								result_db = {
									"MID": results[0].MID.toString(),
									"MNAME": results[0].MNAME,
									"MDETAILS": results[0].MDETAILS,
									"RID": results[0].RID.toString()
								};
								res.status(200).json(result_db);
							}
						});						
					}
				});
			});
		}
	});
}

//Add Menu details using ID
module.exports.addMenu = function(req, res){
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		console.log("JSON data empty in the request body");
		return res.status(400).json({Error: "JSON data empty in the request body"});
	}
	else{
		dbConnection.getConnection(function(err, connection) {

			if(err) throw err;
			// Use the connection
			var queryParams = {
				MNAME: req.body.MNAME,
				MDETAILS: req.body.MDETAILS,
				RID: req.body.RID
			};
			connection.query('INSERT INTO `menus` SET ?', queryParams, function (error, results, fields) {
			
			connection.release();

			  // Handle error after the release.
			if (error) {
				res.status(500).json({Error: error});
				throw error;
			  }
			res.status(200).json({Message:"Menus with ID: "+results.insertId+" of Restaurant with RID: "+req.body.RID+" added to Menus Table in DB."});
			});
		
		});
	}
}


//Delete Menu details using ID
module.exports.deleteMenu = function(req, res){
	var mid = req.params.ID;
	var key = 'menu.' + mid;
	dbConnection.getConnection(function(err, connection) {

		if(err) throw err;
		// Use the connection
		
		connection.query('DELETE FROM `menus` WHERE `mid`=?', [mid], function (error, results, fields) {
		
		connection.release();

		  // Handle error after the release.
		if (error) {
			res.status(500).json({Error: error});
			throw error;
		  }
		else if(results.changedRows === 0){
			res.status(200).json({Message: "Restaurant with MenuID:"+mid+" not found in DB"});
		}
		else{
			redis.del(key, function(er, cRes){
				if(er) {
					res.status(500).json({Error: er});
					throw er;
				}
				res.status(200).json({Message: "Menu with ID:"+mid+" deleted from DB"});
			});
		}	
		
	});
	
	});
}


/* MenuItem Object routes */
//Get all MenuItems for a given MenuID
//Get MenuItem details using ID
module.exports.getMenuItem = function(req, res){
	var miid = req.params.ID;	
	var key = 'mitem.' + miid;
	redis.hgetall(key, function(er, cRes){
		if (er) {throw er;}
		if (cRes) {
                	res.status(200).json(cRes);
		}
		else{
				dbConnection.getConnection(function(err, connection) {

					if(err) throw err;
					// Use the connection
					connection.query('SELECT MIID, MITEMNAME, MITEMDETAILS, MITEMPRICE, MID, RID FROM `menuitems` where `MIID`=?', [miid], function (error, results, fields) {
					
					connection.release();
		
					  // Handle error after the release.
					if (error) {
						res.status(500).json({Error: error});
						throw error;
					  } 
					else if (!results.length){
						res.status(400).json({Error: "No rows found."});
					}
					else{
						redis.hmset(key, "MIID", results[0].MIID, "MITEMNAME", results[0].MITEMNAME, "MITEMDETAILS",  results[0].MITEMDETAILS, "MITEMPRICE",  results[0].MITEMPRICE, "MID", results[0].MID, "RID",  results[0].RID, function (err, reply) {
							if(err) {
								res.status(500).json({"Error": error});
								throw error;
							}
							else{
								redis.expire(key, redis_key_exp);
								result_db = {
									"MIID": results[0].MIID.toString(),
									"MITEMNAME": results[0].MITEMNAME,
									"MITEMDETAILS": results[0].MITEMDETAILS,
									"MITEMPRICE":  results[0].MITEMPRICE.toString(),
									"MID": results[0].MID.toString(),
									"RID": results[0].RID.toString()
								};
								res.status(200).json(result_db);
							}
						});						
					}
				});
			});
		}
	});
}

//Add MenuItem details using ID
module.exports.addMenuItem = function(req, res){
	if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
		console.log("JSON data empty in the request body");
		return res.status(400).json({Error: "JSON data empty in the request body"});
	}
	else{
		dbConnection.getConnection(function(err, connection) {

			if(err) throw err;
			// Use the connection
			var queryParams = {
				MITEMNAME: req.body.MITEMNAME,
				MITEMDETAILS: req.body.MITEMDETAILS,
				MITEMPRICE: req.body.MITEMPRICE,
				MID: req.body.MID,
				RID: req.body.RID
			};
			connection.query('INSERT INTO `menuitems` SET ?', queryParams, function (error, results, fields) {
			
			connection.release();

			  // Handle error after the release.
			if (error) {
				res.status(500).json({Error: error});
				throw error;
			  }
			res.status(200).json({Message:"MenuItem with ID: "+results.insertId+" of Restaurant with RID: "+req.body.RID+" added to Menus Table in DB."});
			});
		
		});
	}
}


//Delete Restaurant details using ID
module.exports.deleteMenuItem = function(req, res){
	var miid = req.params.ID;
	var key = 'mitem.' + miid;
	dbConnection.getConnection(function(err, connection) {

		if(err) throw err;
		// Use the connection
		
		connection.query('DELETE FROM `menuitems` WHERE `miid`=?', [miid], function (error, results, fields) {
		
		connection.release();

		  // Handle error after the release.
		if (error) {
			res.status(500).json({Error: error});
			throw error;
		}
		else if(results.changedRows === 0){
			res.status(200).json({Message: "Restaurant with ID:"+miid+" not found in DB"});
		}
		else{
			redis.del(key, function(er, cRes){
				if(er) {
					res.status(500).json({Error: er});
					throw er;
				}
				res.status(200).json({Message: "MenuItem with ID:"+miid+" deleted from DB"});
			});
		}
		
	});
	
	});
}
