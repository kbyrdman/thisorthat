var Controllers = require('../app/controllers.js');




/*****************************************
	     Creating New Posts
******************************************/


module.exports.putPublicPost = function(req, res){

	Controllers.createDoc('public', req.body, errorCallback(res), createdCallback(res));
};

module.exports.putPrivatePost = function(req, res){

	Controllers.createDoc('private', req.body, errorCallback(res), createdCallback(res));
};

module.exports.putUser = function(req, res){

	Controllers.createDoc('user', req.body, errorCallback(res), createdCallback(res));
};



/*****************************************
	     Updating Existing Posts
******************************************/


module.exports.postHuddles = function(req, res){

	Controllers.grabDocById('private', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.addPrivatePostHuddles(post, req.body.huddles, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};


module.exports.postPublicPostImageURI = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating Public Posts' image URI: Comming soon to a Theater near you!");
};

module.exports.postPrivatePostImageURI = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating Private Posts' image URI: Comming soon to a Theater near you!");
};

module.exports.postPublicPostVotes = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating Public Posts' votes: Comming soon to a Theater near you!");
};

module.exports.postPrivatePostVotes = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating Private Posts' votes: Comming soon to a Theater near you!");
};

module.exports.postPublicPostCategories = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating Public Posts' categories: Comming soon to a Theater near you!");
};

module.exports.postPrivatePostCategories = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating Private Posts' categories: Comming soon to a Theater near you!");
};

module.exports.postPublicPostRank = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating Public Posts' rank: Comming soon to a Theater near you!");
};

module.exports.postPrivatePostRank = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating Private Posts' rank: Comming soon to a Theater near you!");
};

module.exports.postUserFriends = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating User's friends: Comming soon to a Theater near you!");
};

module.exports.postUserHuddles = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating User's huddles: Comming soon to a Theater near you!");
};

module.exports.postUserLinkedHuddles = function(req, res){
	//TODO
	res.status(200).send("Functionality for updating User's linked huddles: Comming soon to a Theater near you!");
};



/*****************************************
	     Getting Existing Posts
******************************************/

// Public Posts

module.exports.getPublicPost = function(req, res){

	var id = req.param('id');
	var notFoundMsg = "Could not find Public Post " + req.body.id + " in our system";

	Controllers.grabDocById('public', id, getPostCallback(res, notFoundMsg));
};


module.exports.getAllPublicPosts = function(req, res){

	Controllers.grabAllDocs('public', function(err, posts){
		if (err){
			res.status(500).send(err);
		} else {
			res.status(200).json(posts);
		}
	});
};


module.exports.getPublicPostsWithCategories = function(req, res){
	//TODO
	res.status(200).send("Functionality for getting Public Posts by categories: Comming soon to a Theater near you!");
};


module.exports.getPublicPostsByQuery = function(req, res){

	var query = new Controllers.Query('public', req, res);
	var query_handler = query.handler;
	if (query_handler != null){
		query_handler(query);
	} else {
		res.status(400).send("Invalid query: " + req.param);
	}

};

// Private Posts

module.exports.getPrivatePost = function(req, res){

	var id = req.param('id');
	var notFoundMsg = "Could not find Private Post " + req.body.id + " in our system";

	Controllers.grabDocById('private', id, getPostCallback(res, notFoundMsg));
};


module.exports.getAllPrivatePosts = function(req, res){

	Controllers.grabAllDocs('private', function(err, posts){
		if (err){
			res.status(500).send(err);
		} else {
			res.status(200).json(posts);
		}
	});
};



module.exports.getPrivatePostsByQuery = function(req, res){

	var query = new Controllers.Query(req, 'private');
	var query_handler = query.handler;
	if (query_handler != null){
		query_handler(query);
	} else {
		res.status(400).send("Invalid query: " + req.param);
	}

};


module.exports.getPrivatePostsWithHuddleIds = function(req, res){
	//TODO
	res.status(200).send("Functionality for getting Private Posts by huddle ids: Comming soon to a Theater near you!");
};


module.exports.getPrivatePostsWithCategories = function(req, res){
	//TODO
	res.status(200).send("Functionality for getting Private Posts by categories: Comming soon to a Theater near you!");
};


module.exports.getUser = function(req, res){

	//TODO
	var id = req.param('id');
	var notFoundMsg = "Could not find User " + req.body.id + " in our system";

	Controllers.grabDocById('user', id, getUserCallback(res, notFoundMsg));
};


module.exports.getAllUsers = function(req, res){

	Controllers.grabAllDocs('user', function(err, posts){
		if (err){
			res.status(500).send(err);
		} else {
			res.status(200).json(posts);
		}
	});
};



/*****************************************
	     	Deleting stuff
******************************************/


module.exports.deletePublicPost = function(req, res){
	//TODO
};

module.exports.deletePrivatePost = function(req, res){
	//TODO
};

module.exports.deleteHuddles = function(req, res){

	var deleteHuddlesCallback = function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.removePrivatePostHuddles(post, req.body.huddles, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	};

	Controllers.grabDocById('private', req.body.id, deleteHuddlesCallback);
};


module.exports.deletePublicPostCategories = function(req, res){
	//TODO
};

module.exports.deletePrivatePostCategories = function(req, res){
	//TODO
};







/************************************************
	              Callbacks
*************************************************/


var successCallback = function(res){
	return function(doc){
		res.status(200).json(doc);
	};
};

var createdCallback = function(res){
	return function(doc){
		console.log("Created doc: %j", doc);
		res.status(201).json(doc);
	};
};

var updatedCallback = function(res){
	return function(doc){
		console.log("Updated doc: %j", doc);
		res.status(200).json(doc);
	};
};


var noContentCallback = function(res){
	return function(){
		res.status(204).send("No Content");
	};
};

var errorCallback = function(res) {
	return function(err){
		console.log(err);
		res.status(500).send("Internal Server Error");
	};
};

var notFoundCallback = function(res) {
	return function(msg){
		console.log(msg);
		res.status(404).send(msg);
	};
};

var postDocCallback = function(type, res){
	return function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.updatePost(post, res, errorCallback(res), updatedCallback(res));
			} else {
				var newPost = null;
				if (type == 'public'){
					newPost = new PublicPost(req.body);
				} else if (type = 'private'){
					newPost = new PrivatePost(req.body);
				}
				Controllers.saveDoc(newPost, errorCallback(res), createdCallback(res));
			}
		}
	};
};

var getPostCallback = function(res, msg){
	return function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				successCallback(res)(post);
			} else {
				notFoundCallback(res)(msg);
			}
		}
	};
};




