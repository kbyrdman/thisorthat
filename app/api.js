var PublicPost = require('../app/models/publicPost.js');
var PrivatePost = require('../app/models/privatePost.js');
var User = require('../app/models/user.js');





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

	post = getPostById('public', req.body.id, function(err){
		handleError(err, res);
	});

	if (post == null){
		res.status(404).send("Not Found");
		return;
	}

	updatePost(post, req, res);
};



module.exports.updatePrivatePost = function(req, res){

	post = getPostById('private', req.body.id, function(err){
		handleError(err, res);
	});

	if (post == null){
		res.status(404).send("Not Found");
		return;
	}

	updatePost(post, req, res);
};



module.exports.updateCircles = function(req, res){

	post = getPostById('private', req.body.id, function(err){
		handleError(err, res);
	});

	if (post == null){
		res.status(404).send("Not Found");
		return;
	}

	post.circles.concat(req);
	savePost(post);
};



module.exports.deleteCircles = function(req, res){

	post = getPostById('private', req.body.id, function(err){
		handleError(err, res);
	});

	if (post == null){
		res.status(404).send("Not Found");
		return;
	}

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


module.exports.getPublicPost = function(req, res){
	if (req.body.id != null){
		post = getPostById('private', req.body.id, function(err){
			handleError(err, res);
		});

		if (post == null){
			res.status(404).send("Not Found");
			return;
		}

		res.status(200).json(post);
	}
	PublicPost.find({type: "US"}, function(err, flapperPosts){
		if (err) {
			handleError(err);
		} else {
			
		}
	});
};






/************************************************
	   Helper methods (Avoiding redundancy)
*************************************************/


var savePost = function(post, res){

	post.save(function(err) {
		if (err) {
			handleError(err);
		} else {
			res.send("OK");
		}
	});
};


var updatePost = function(post, req, res){

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
};


var getPostById = function(type, id, error_callback, no_post_callback){

	if (type == 'public'){
		PublicPost.findById(id, function(err, post){
			if (err) {
				error_callback(err);
			}

			if (arguments.length() == 4 && post == null){
				no_post_callback();
			}
			return post;
		});
	} else if (type == 'private'){
		PrivatePost.findById(id, function(err, post){
			if (err) {
				error_callback(err);
				return null;
			} else {
				return post;
			}
		});
	}
};


//TODO: make this more robust
var handleError = function(err, res){
	res.status(500).send("Internal Server Error");
	console.log(err);
};

var handleNoPost = function(res, msg){
	res.status(404).send(msg);
	console.log(msg);
};



/*
	Assumes arr is populated with objects structed as follows:

	{'name': 'MyCircle', 'user_id': 1234321, 'circle_id': 8941#$5815}
*/
var indexOfCircleId = function(arr, id){
	for (i = 0; i < arr.count; i++){
		if (arr[i]['circle_id'] == id){
			return i;
		}
	}
	return -1;
};

