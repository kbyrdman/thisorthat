var PublicPost = require('../app/models/publicPost.js').model;
var PrivatePost = require('../app/models/privatePost.js').model;
var User = require('../app/models/user.js').model;
var Huddle = require('../app/models/huddle.js').model;
var Events = require('../app/events.js');



//Consuming Huddle removed event
Events.consumeUserHuddleRemovedEvent(function(id){
	PrivatePost.removeHuddle(id, function(err){
		console.log("Error Removing Huddles from existing Private Posts");
		console.log(err);
	});
});

Events.consumeUserHuddleUpdatedEvent(function(huddle){
	User.updateHuddle(huddle, function(err){
		console.log("Error Updating Linked Huddles for existing Users");
		console.log(err);
	});
});




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


var removeDoc = function(type, id, errCallback){

	if (type == 'public'){
		PublicPost.remove({_id: id}, errCallback);
	} else if (type == 'private'){
		PrivatePost.remove({_id: id}, errCallback);
	} else if (type == 'user'){
		User.remove({_id: id}, errCallback);
	}
};
module.exports.removeDoc = removeDoc;




module.exports.incrementPostVotes = function(post, side, errCallback, succCallback){
	if (side == 'left'){
		post.leftVotes = post.leftVotes + 1;
	} else if (side == 'right') {
		post.rightVotes = post.rightVotes + 1;
	}
	saveDoc(post, errCallback, succCallback);
};



module.exports.decrementPostVotes = function(post, side, errCallback, succCallback){
	if (side == 'left'){
		if (post.leftVotes - 1 >= 0){
			post.leftVotes = post.leftVotes - 1;
		}
	} else if (side == 'right') {
		if (post.rightVotes - 1 >= 0){
			post.rightVotes = post.rightVotes - 1;
		}
	}
	saveDoc(post, errCallback, succCallback);
};



module.exports.updatePostImageURI = function(post, side, uri, errCallback, succCallback){

	if (side == 'left'){
		post.leftImage = uri;
	} else if (side == 'right'){
		post.rightImage = uri;
	}
	saveDoc(post, errCallback, succCallback);
};



module.exports.updatePostTitle = function(post, title, errCallback, succCallback){

	post.title = title;
	saveDoc(post, errCallback, succCallback);
};



module.exports.updatePostRank = function(post, rank, errCallback, succCallback){

	post.rank = rank;
	saveDoc(post, errCallback, succCallback);
};



module.exports.addPostCategories = function(post, cats, errCallback, succCallback){

	for (i = 0; i < cats.length; i++){
		var c = cats[i];
		if (post.categories.indexOf(c) < 0){
			post.categories.push(c);
		}
	}
	saveDoc(post, errCallback, succCallback);
};



module.exports.removePostCategories = function(post, cats, errCallback, succCallback){

	for (i = 0; i < cats.length; i++){
		var c = cats[i];
		var index = post.categories.indexOf(c);
		if (index >= 0){
			post.categories.splice(index,1);
		}
	}
	saveDoc(post, errCallback, succCallback);
};



module.exports.addPrivatePostHuddles = function(post, huddles, errCallback, succCallback){

	while (huddles.length > 0){
		var h = huddles.pop();
		//searching for existing huddle
		for (i = 0; i < post.huddles.length; i++){
			if (post.huddles[i].id == h._id){
				continue;
			}
		}
		post.huddles.push(h);
	}
	saveDoc(post, errCallback, succCallback);
};


module.exports.removePrivatePostHuddles = function(post, huddles, errCallback, succCallback){

	while (huddles.length > 0){
		var h = huddles.pop();
		for (i = 0; i < post.huddles.length; i++){
			if (post.huddles[i].id == h._id){
				post.huddles.splice(i, 1);
				continue;
			}
		}
	}
	saveDoc(post, errCallback, succCallback);
};


module.exports.addUsersFriends = function(user, friends, errCallback, succCallback){

	while (friends.length > 0){

		var f = friends.pop();
		if (f._id){
			var ex_f = user.friends.id(f._id);
			if (ex_f){
				continue;
			}
		}
		user.friends.push(f);
	}
	saveDoc(post, errCallback, succCallback);
};


module.exports.updateUserHuddles = function(user, huddles, errCallback, succCallback){

	while (huddles.length > 0){
		var h = huddles.pop();
		if (h._id){
			//searching for existing huddle as embedding doc
			var ex_h = post.huddles.id(h._id);
			if (ex_h){
				ex_h.userId = h.userId;
				ex_h.title = h.title;
				ex_h.save(function(err){
					if (err){
						errCallback(err);
						return false;
					}
				});
				Events.emitUserHuddleUpdated(ex_h);
				continue;
			}
		} else {
			post.huddles.push({title: h.title, userId: h.userId});
		}
	}
	saveDoc(post, errCallback, succCallback);
};


module.exports.removeUsersHuddles = function(user, huddles, errCallback, succCallback){

	while (huddles.length > 0){
		var h = huddles.pop();
		var ex_h = post.huddles.id(h._id);
		if (ex_h != null){
			ex_h.remove();
			Events.emitUserHuddleRemoved(ex_h._id);
		}
	}
	saveDoc(post, errCallback, succCallback);
};


module.exports.addUsersLinkedHuddles = function(user, huddles, errCallback, succCallback){

	while (huddles.length > 0){
		var h = huddles.pop();
		if (h._id){
			//searching for existing huddle as embedding doc
			var ex_h = post.linkedHuddles.id(h._id);
			if (ex_h == null){
				post.linkedHuddles.push({title: h.title, userId: h.userId});
			}
		}
	}
	saveDoc(post, errCallback, succCallback);
};





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
		if (req.param('userId') != null){
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

