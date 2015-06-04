var PublicPost = require('../app/models/publicPost.js');
var PrivatePost = require('../app/models/privatePost.js');
var User = require('../app/models/user.js');
var Errors = require('../app/errors.js');





/*****************************************
	     Creating New Posts
******************************************/

module.exports.createPublicPost = function(req, res){

	var newPost = new PublicPost(req.body);
	saveModel(newPost, errorCallback(res), successCallback(res));
};

module.exports.createPrivatePost = function(req, res){

	var newPost = new PrivatePost(req.body);
	saveModel(newPost, errorCallback(res), successCallback(res));
};

module.exports.createUser = function(req, res){

	var newUser = new User(req.body);
	saveModel(newUser, errorCallback(res), successCallback(res));
};


/*****************************************
	     Updating Existing Posts
******************************************/

module.exports.updatePublicPost = function(req, res){

	post = postById('public', req.body.id, errorCallback(res), notFoundCallback(res));
	updatePost(post, req, res);
};

module.exports.updatePrivatePost = function(req, res){

	post = postById('private', req.body.id, errorCallback(res), notFoundCallback(res));
	updatePost(post, req, res);
};

module.exports.updateUser = function(req, res){

	//TODO
	res.status(200).send("Functionality for Updating a User: Coming soon to a Theater near you!");
};

module.exports.updateHuddles = function(req, res){

	post = postById('private', req.body.id, errorCallback(res), notFoundCallback(res));

	if (post != null){
		post.huddles.concat(req.huddles);
		saveModel(post);
	}
};

module.exports.deleteHuddles = function(req, res){

	post = postById('public', req.body.id, errorCallback(res), notFoundCallback(res));
	if (post == null) return;

	huddles_to_delete = req.body;
	while (huddles_to_delete.length() > 0){
		c = huddles_to_delete.pop;
		var index = indexOfHuddleId(post.huddles, c['huddle_id']);
		if (index >= 0){
			post.huddles.splice(index,1);
		}
	}
	updatePost(post, req, res);
};




/*****************************************
	     Getting Existing Posts
******************************************/

// Public Posts

module.exports.getPublicPost = function(req, res){

	var id = req.param['id'];
	post = postById('public', id, errorCallback(res), notFoundCallback(res));

	if (post != null){
		res.status(200).json(post);
	}
};


module.exports.getAllPublicPosts = function(req, res){

	PublicPost.find({}, function(err, posts){
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

	var query = new Query('public', req, res);
	var query_handler = query.handler;
	if (query_handler != null){
		query_handler(query);
	} else {
		res.status(400).send("Invalid query: " + req.param);
	}

};

// Private Posts

module.exports.getPrivatePost = function(req, res){

	var id = req.param['id'];
	post = postById('private', id, errorCallback(res), notFoundCallback(res));

	if (post != null){
		res.status(200).json(post);
	}
};




module.exports.getPrivatePostsByQuery = function(req, res){

	var query = new Query(req, 'private');
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









/************************************************
	   Helper functions (Avoiding redundancy)
*************************************************/


function saveModel(model, errCallback, successCallback){

	if (model == null) return;

	model.save(function(err) {
		if (err) {
			errCallback(err);
		} else {
			successCallback();
		}
	});
}


function updatePost(post, req, res){

	if (post == null) return;

	if (req.body.votesA != null){
		post.votes_A = req.body.votesA;
	}

	if (req.body.votesB != null){
		post.votes_B = req.body.votesB;
	}

	if (req.body.imageA != null){
		post.image_A = req.body.imageA;
	}

	if (req.body.imageB != null){
		post.image_B = req.body.imageB;
	}

	if (req.body.rank != null){
		post.rank = req.body.rank;
	}

	saveModel(post);
}

function updateUser(user, req, res){

	if (user == null) return;

	//TODO

	saveModel(post);
}


function postById(type, id, error_callback, no_post_callback){

	var notFoundMsg = id + " does not exist in our system";

	if (type == 'public'){

		PublicPost.findById(id, function(err, post){
			return handleDBQueryResult(err, post, errorCallback, no_post_callback);
		});

	} else if (type == 'private'){

		PrivatePost.findById(id, function(err, post){
			return handleDBQueryResult(err, post, errorCallback, no_post_callback);
		});

	}
}

var getPostsByUserId = function(query){
	//TODO
	query.res.status(200).send("Functionality for User Id Queries: Comming soon to a Theater near you!");
};

var getPostsWithinRankRange = function(query){
	//TODO
	query.res.status(200).send("Functionality for Rank Range Queries: Comming soon to a Theater near you!");
};

var getPostsWithinCreatedTimeRange = function(query){
	//TODO
	query.res.status(200).send("Functionality for Created Time Queries: Comming soon to a Theater near you!");
};

var getPostsWithinRadiusOf = function(query){
	//TODO
	query.res.status(200).send("Functionality for Radius Queries: Comming soon to a Theater near you!");
};


var successCallback = function(res){
	return function(){
		res.status(200).send("OK");
	};
};

var errorCallback = function(res) {
	return Errors.internalServerErrorCallback(res);
};

var notFoundCallback = function(res) {
	return Errors.notFoundErrorCallback(res);
};



var handleDBQueryResult = function(err,post,error_callback,no_post_callback){
	if (err) {
		error_callback(err);
	}

	if (post == null){
		no_post_callback(notFoundMsg);
	}

	return post;
};


/*
	Assumes arr is populated with objects structed as follows:

	{'name': 'MyHuddle', 'user_id': 1234321, 'huddle_id': 8941#$5815}
*/
function indexOfHuddleId(arr, id){
	for (i = 0; i < arr.count; i++){
		if (arr[i]['huddle_id'] === id){
			return i;
		}
	}
	return -1;
}



function Query(type, req, res) {

	this.type = type;
	this.req = req;
	this.res = res;

	this.handler = (function(){
		// returning a function to handle certain queries
		if (req.param['user_id'] != null){
			//handling user id query
			return getPostsByUserId;

		} else if (req.param['rangeStart'] != null && this.req.param['rangeEnd'] != null){
			//handling rank range query
			return getPostsWithinRankRange;

		} else if (req.param['createdTimeStart'] != null && this.req.param['createdTimeEnd'] != null){
			//handling create time range query
			return getPostsWithinCreatedTimeRange;

		} else if (req.param['radius'] != null && this.req.param['centerLat'] != null && this.req.param['centerLon'] != null){
			//handling radius query
			return getPostsWithinRadiusOf;

		} else {
			return null;
		}
	})();
};

