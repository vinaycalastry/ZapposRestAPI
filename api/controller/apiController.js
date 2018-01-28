/* ROUTES */
module.exports.root = function(req, res){
	res.status(200).json({message: "Welcome to the Restaural API V1.0."});
}