/************************************************
	        Error definitions
*************************************************/


// Defining callback for use after error
module.exports.internalServerErrorCallback = function(res){

	return function(err){
		res.status(500).send("Internal Server Error");
		console.log(err);
	};
}

// Defining callback for use after empty search
module.exports.notFoundErrorCallback = function(res){

	return function(msg){
		res.status(404).send(msg);
		console.log(msg);
	};
}








