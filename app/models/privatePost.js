var mongoose = require('mongoose');
var huddleSchema = require('./huddle.js').schema;
var Events = require('../events.js');


//Setting up our event consumer
Events.consumeHuddleUpdateEvent(updateHuddleIds);


//setting up our schema
var PrivatePostSchema = new mongoose.Schema({
	title: {type: String, required: true},  //TODO: limit this size
	leftImage: String,  //url pointing to location of image
	rightImage: String,  //url pointing to location of image
	leftVotes: {type: Number, default: 0},
	rightVotes: {type: Number, default: 0},
	location: [Number],
	userId: String,  //mongoose _id of a user
	createdTime: {type: Date, default: new Date()},
	categories: [String],
	rank: Number,
	huddles: [huddleSchema]
});

//Setting our multikey index
PrivatePostSchema.index({"huddleSchema.huddleId": 1});


PrivatePostSchema.static.findByHuddleId = function(huddleId, callback){
	//TODO
	callback(posts);
};


var PrivatePost = mongoose.model('privatePost', PrivatePostSchema);
module.exports.model = PrivatePost;


function updateHuddleIds(oldId, newId){
	console.log("Updating huddle id %s ...", oldId);

	/*
	PrivatePost.findByHuddleId(oldId, function(posts){
		for (i = 0; i < posts.length; i++){
			posts[i].huddleId = newId;
			posts[i].save(function(err){
				//TODO
			});
		}
	});
	*/
	console.log("Updated huddle id %s ...", newId);
}
