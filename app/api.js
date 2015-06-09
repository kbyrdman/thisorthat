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

	var side = req.param('side');

	Controllers.grabDocById('public', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.updatePostImageURI(post, side, req.body.uri, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPrivatePostImageURI = function(req, res){

	var side = req.param('side');

	Controllers.grabDocById('private', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.updatePostImageURI(post, side, req.body.uri, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPublicPostVotes = function(req, res){

	var side = req.param('side');

	Controllers.grabDocById('public', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				if (req.body.upvote == true){
					Controllers.incrementPostVotes(post, side, errorCallback(res), successCallback(res));
				} else if (req.body.downvote == true){
					Controllers.decrementPostVotes(post, side, errorCallback(res), successCallback(res));
				}
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPrivatePostVotes = function(req, res){
	var side = req.param('side');

	Controllers.grabDocById('private', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				if (req.body.upvote == true){
					Controllers.incrementPostVotes(post, side, errorCallback(res), successCallback(res));
				} else if (req.body.downvote == true){
					Controllers.decrementPostVotes(post, side, errorCallback(res), successCallback(res));
				}
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPublicPostTitle = function(req, res){

	Controllers.grabDocById('public', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.updatePostTitle(post, req.body.title, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPrivatePostTitle = function(req, res){

	Controllers.grabDocById('private', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.updatePostTitle(post, req.body.title, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPublicPostCategories = function(req, res){

	Controllers.grabDocById('public', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.addPostCategories(post, req.body.categories, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPrivatePostCategories = function(req, res){

	Controllers.grabDocById('private', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.addPostCategories(post, req.body.categories, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPublicPostRank = function(req, res){

	Controllers.grabDocById('public', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.updatePostRank(post, req.body.rank, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.postPrivatePostRank = function(req, res){

	Controllers.grabDocById('private', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.updatePostRank(post, req.body.rank, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
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

	Controllers.grabDocById('public', id, getDocCallback(res, notFoundMsg));
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

	Controllers.grabDocById('private', id, getDocCallback(res, notFoundMsg));
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

	Controllers.grabDocById('user', id, getDocCallback(res, notFoundMsg));
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
	var id = req.param('id');
	Controllers.removeDoc('public', id, function(err){
		if (err){
			console.log("Error removing Public Post %s: " + err, id.toString());
			errorCallback(res)(err);
		} else {
			emptySuccessCallback(res)();
		}
	});
};

module.exports.deletePrivatePost = function(req, res){
	var id = req.param('id');
	Controllers.removeDoc('private', id, function(err){
		if (err){
			console.log("Error removing Private Post %s: " + err, id.toString());
			errorCallback(res)(err);
		} else {
			emptySuccessCallback(res)();
		}
	});
};

module.exports.deleteUser = function(req, res){
	var id = req.param('id');
	Controllers.removeDoc('user', id, function(err){
		if (err){
			console.log("Error removing User %s: " + err, id.toString());
			errorCallback(res)(err);
		} else {
			emptySuccessCallback(res)();
		}
	});
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

	console.log("Entered deletePublicPostCategories");

	Controllers.grabDocById('public', req.body.id, function(err, post){
		if (err){
			errorCallback(res)(err);
		} else {
			if (post){
				Controllers.removePostCategories(post, req.body.categories, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};

module.exports.deletePrivatePostCategories = function(req, res){

	Controllers.grabDocById('private', req.body.id, function(err, post){
		if (err){
			console.log("Found error");
			errorCallback(res)(err);
		} else {
			if (post){
				console.log("Found post");
				Controllers.removePostCategories(post, req.body.categories, errorCallback(res), successCallback(res));
			} else {
				noContentCallback(res)();
			}
		}
	});
};







/************************************************
	              Callbacks
*************************************************/

var emptySuccessCallback = function(res){
	return function(){
		res.status(200).send("OK");
	};
};

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

var getDocCallback = function(res, msg){
	return function(err, doc){
		if (err){
			errorCallback(res)(err);
		} else {
			if (doc){
				successCallback(res)(doc);
			} else {
				notFoundCallback(res)(msg);
			}
		}
	};
};




