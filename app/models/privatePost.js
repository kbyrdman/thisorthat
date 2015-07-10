var mongoose = require('mongoose');
var Events = require('../events.js');


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
	huddles: Array
});

//Setting our multikey index
PrivatePostSchema.index({"huddles.id": 1});



PrivatePostSchema.statics.removeHuddle = function removeHuddle(huddleId, errorCallback){

	console.log("Updating Private Posts with _id %s ...", id);
	this.find({'huddles.id': huddleId}, function(err, posts){
		if (err){
			if (err){
				errorCallback(err);
			}
		} else {
			for(i = 0; i < posts.length; i++){
				var post = posts[i];
				var index = indexOfId(post.huddles, huddleId);
				post.huddles.splice(index, 1);
				post.save(function(err){
					if (err){
						errorCallback(err);
					}
				});
			}
			console.log("Removed %s from %s Private Posts", huddeId, posts.length.toString());
		}
	});
};


module.exports.model = mongoose.model('privatePost', PrivatePostSchema);
module.exports.schema = PrivatePostSchema;



function indexOfId(arr, id){
	for (i = 0; i < arr.length; i++){
		if (arr[i].id == id){
			return i;
		}
	}
	return -1;
};
