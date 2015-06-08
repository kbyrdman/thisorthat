var PublicPost = require('../app/models/publicPost.js');
var PrivatePost = require('../app/models/privatePost.js');
var User = require('../app/models/user.js');
var crypto = require('crypto');




/*****************************************************
                    Updating Data
 *****************************************************/

var saveDoc = function(doc, errCallback, succCallback){

	if (doc == null) return;

	doc.save(function(err) {
		if (err) {
			errCallback(err);
		} else {
			succCallback(doc);
		}
	});
};
module.exports.saveDoc = saveDoc;

var createDoc = function(type, doc, errCallback, succCallback){

	var newDoc = null;
	if (type == 'public'){
		newDoc = new PublicPost(doc);
	} else if (type == 'private'){
		newDoc = new PrivatePost(doc);
	} else if (type == 'user'){
		newDoc = new User(doc);
	}
	saveDoc(newDoc, errCallback, succCallback);
};
module.exports.createDoc = createDoc;





var incrementPostVotes = function(post, image, errCallback, succCallback){
	//TODO
};
//module.exports.incrementPostVotes = incrementPostVotes;

var decrementPostVotes = function(post, image, errCallback, succCallback){
	//TODO
};
//module.exports.decrementPostVotes = decrementPostVotes;

var updatePostImageURI = function(post, uri, errCallback, succCallback){
	//TODO
};
//module.exports.updatePostImageURI = updatePostImageURI;

var addPostCategories = function(post, cats, errCallback, succCallback){
	//TODO
};
//module.exports.addPostCategories = addPostCategories;

var removePostCategories = function(post, cats, errCallback, succCallback){
	//TODO
};
//module.exports.removePostCategories = removePostCategories;

var addPrivatePostHuddles = function(post, huddles, errCallback, succCallback){

	while (huddles.length > 0){
		var h = huddles.pop();
		var index = indexOfHuddleId(post.huddles, h['huddleId']);
		var newName = h['name'];

		if (index < 0){
			var newHuddleId = generateHuddleId(newName, h['userId']);
			h['huddleId'] = newHuddleId;
			post.huddles.push(h);
		} else {
			var newHuddleId = generateHuddleId(newName, post.huddles[index].user_id);
			post.huddles[index].name = newName;
			post.huddles[index].huddleId = newHuddleId;
		}
	}
	saveDoc(post, errCallback, succCallback);
};
module.exports.addPrivatePostHuddles = addPrivatePostHuddles;


var removePrivatePostHuddles = function(post, huddles, errCallback, succCallback){

	while (huddles.length > 0){
		var h = huddles.pop();
		var index = indexOfHuddleId(post.huddles, h['huddleId']);
		if (index >= 0){
			post.huddles.splice(index,1);
		}
	}
	saveDoc(post, errCallback, succCallback);
};
module.exports.removePrivatePostHuddles = removePrivatePostHuddles;





/*****************************************************
                    Grabbing Data
 *****************************************************/


module.exports.grabDocById = function(type, id, callback){

	if (type == 'public'){
		console.log("Searching for Public post: " + id);
		PublicPost.findById(id, callback);
	} else if (type == 'private'){
		console.log("Searching for Private post: " + id);
		PrivatePost.findById(id, callback);
	} else if (type == 'user'){
		console.log("Searching for User: " + id);
		User.findById(id, callback);
	} else {
		console.error("Type %s not known", type);
	}

};

module.exports.grabAllDocs = function(type, callback){

	if (type == 'public'){
		PublicPost.find({}, callback);
	} else if (type == 'private'){
		PrivatePost.find({}, callback);
	} else if (type == 'user'){
		User.find({}, callback);
	} else {
		console.error("Type %s not known", type);
	}
};


var grabPostsByUserId = function(query){
	//TODO
	query.res.status(200).send("Functionality for User Id Queries: Comming soon to a Theater near you!");
};

var grabPostsWithinRankRange = function(query){
	//TODO
	query.res.status(200).send("Functionality for Rank Range Queries: Comming soon to a Theater near you!");
};

var grabPostsWithinCreatedTimeRange = function(query){
	//TODO
	query.res.status(200).send("Functionality for Created Time Queries: Comming soon to a Theater near you!");
};

var grabPostsWithinRadiusOf = function(query){
	//TODO
	query.res.status(200).send("Functionality for Radius Queries: Comming soon to a Theater near you!");
};



/*****************************************************
                    Query Factory
 *****************************************************/


module.exports.Query = function(type, req, res) {

	this.type = type;
	this.req = req;
	this.res = res;

	this.controller = (function(){
		// returning a function to handle certain queries
		if (req.param('user_id') != null){
			//handling user id query
			return grabPostsByUserId;

		} else if (req.param('rangeStart') != null && this.req.param('rangeEnd') != null){
			//handling rank range query
			return grabPostsWithinRankRange;

		} else if (req.param('createdTimeStart') != null && this.req.param('createdTimeEnd') != null){
			//handling create time range query
			return grabPostsWithinCreatedTimeRange;

		} else if (req.param('radius') != null && this.req.param('centerLat') != null && this.req.param('centerLon') != null){
			//handling radius query
			return grabPostsWithinRadiusOf;

		} else {
			return null;
		}
	})();
};



var generateHuddleId = function(user_id, huddle_name){

	var hash = crypto.createHash('md5').update(user_id + huddle_name).digest('hex');
	console.log(hash);
	return hash;
};
module.exports.generateHuddleId = generateHuddleId;

/*
	Assumes arr is populated with objects structed as follows:

	{'name': 'MyHuddle', 'user_id': 1234321, 'huddle_id': 8941#$5815}
*/
var indexOfHuddleId = function(arr, id){
	for (i = 0; i < arr.length; i++){
		if (arr[i]['huddleId'] == id){
			return i;
		}
	}
	return -1;
};
module.exports.indexOfHuddleId = indexOfHuddleId;


