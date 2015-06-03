var PublicPost = require('../app/models/publicPost.js');
var PrivatePost = require('../app/models/privatePost.js');
var User = require('../app/models/user.js');
var Errors = require('../app/errors.js');





/*****************************************
	     Creating New Posts
******************************************/

module.exports.createPublicPost = function(req, res){

	var newPost = new PublicPost(req.body);
	savePost(newPost);
};

module.exports.createPrivatePost = function(req, res){

	var newPost = new PrivatePost(req.body);
	savePost(newPost);
};


/*****************************************
	     Updating Existing Posts
******************************************/

module.exports.updatePublicPost = function(req, res){

	var errorCallback = Errors.internalServerErrorCallback(res);
	var notFoundCallback = Errors.notFoundErrorCallback(res);

	post = getPostById('public', req.body.id, errorCallback, notFoundCallback);
	updatePost(post, req, res);
};



module.exports.updatePrivatePost = function(req, res){

	var errorCallback = Errors.internalServerErrorCallback(res);
	var notFoundCallback = Errors.notFoundErrorCallback(res);

	post = getPostById('private', req.body.id, errorCallback, notFoundCallback);
	updatePost(post, req, res);
};



module.exports.updateCircles = function(req, res){

	var errorCallback = Errors.internalServerErrorCallback(res);
	var notFoundCallback = Errors.notFoundErrorCallback(res);

	post = getPostById('private', req.body.id, errorCallback, notFoundCallback);

	if (post != null){
		post.circles.concat(req);
	}
	savePost(post);
};



module.exports.deleteCircles = function(req, res){

	var errorCallback = Errors.internalServerErrorCallback(res);
	var notFoundCallback = Errors.notFoundErrorCallback(res);

	post = getPostById('public', req.body.id, errorCallback, notFoundCallback);
	if (post == null) return;

	circles_to_delete = req.body;
	while (circles_to_delete.length() > 0){
		c = circles_to_delete.pop;
		var index = indexOfCircleId(post.circles, c['circle_id']);
		if (index >= 0){
			post.circles.splice(index,1);
		}
	}
	updatePost(post, req, res);
};



/*****************************************
	     Getting Existing Posts
******************************************/


module.exports.getPublicPosts = function(req, res){

	var errorCallback = Errors.internalServerErrorCallback(res);
	var notFoundCallback = Errors.notFoundErrorCallback(res);

	var ret = {};

	if (req.body.id != null){
		post = getPostById('public', req.body.id, errorCallback, notFoundCallback);

		if (post != null){
			ret.count = 0;
			ret.results = [];
		}
		res.status(200).send(ret);

	} else if (req.body){
		//TODO
	}
};








/************************************************
	   Helper functions (Avoiding redundancy)
*************************************************/


function savePost(post, res){

	if (post == null) return;

	post.save(function(err) {
		if (err) {
			handleError(err);
		} else {
			res.send("OK");
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

	savePost(post);
}


function getPostById(type, id, error_callback, no_post_callback){

	var notFoundMsg = id + " does not exist in our system";

	if (type == 'public'){

		PublicPost.findById(id, function(err, post){
			return handleQueryResult(err, post, errorCallback, no_post_callback);
		});

	} else if (type == 'private'){

		PrivatePost.findById(id, function(err, post){
			return handleQueryResult(err, post, errorCallback, no_post_callback);
		});

	}
}

function getPostsByUserId(type, user_id, errorCallback){
	//TODO
}

function getPostsWithinRankRange(type, lowRank, highRank, errorCallback){
	//TODO
}

function getPostsWithinCreatedTimeRange(type, startTime, endTime, errorCallback){
	//TODO
}

function getPostsWithinRadiusOf(type, center, radius, errorCallback){
	//TODO
}

function getPostsWithCategories(type, categories, errorCallback){
	//TODO: in a while
}


function getPrivatePostsWithCircleIds(circleIds, errorCallback){
	//TODO
}



function handleQueryResult(err,post,error_callback,no_post_callback){
	if (err) {
		error_callback(err);
	}

	if (post == null){
		no_post_callback(notFoundMsg);
	}

	return post;
}


/*
	Assumes arr is populated with objects structed as follows:

	{'name': 'MyCircle', 'user_id': 1234321, 'circle_id': 8941#$5815}
*/
function indexOfCircleId(arr, id){
	for (i = 0; i < arr.count; i++){
		if (arr[i]['circle_id'] == id){
			return i;
		}
	}
	return -1;
}

