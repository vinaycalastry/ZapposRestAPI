/* ROUTES */

//Base Route
module.exports.root = function(req, res){
	res.status(200).json({message: "Welcome to the Restaurant API V1.0."});
}

/* Restaurant Object routes */
//Get Restaurant details using ID
module.exports.getRestaurant = function(req, res){
	var id = req.params.ID;
	res.status(200).json({ID: id, Name: 'Paradise', Address: 'E.Flamongo Road', Phone: '702-934-3333'});
}

//Add Restaurant details using ID
module.exports.addRestaurant = function(req, res){
	res.status(200).json(req.body.Name);
}


//Delete Restaurant details using ID
module.exports.deleteRestaurant = function(req, res){
	var id = req.params.ID;
	res.status(200).json({"msg": "Restaurant "+id+" deleted from DB"});
}


/* Menu Object routes */


/* MenuItem Object routes */