var mongoose = require('mongoose');


// Private This or That post schema
module.exports.model = mongoose.model('publicPost',
	{
		title: String,
		leftImage: String,  //url pointing to location of image
		rightImage: String,  //url pointing to location of image
		leftVotes: {type: Number, default: 0},
		rightVotes: {type: Number, default: 0},
		location: [Number],  //[lat,lon]
		userId: String,  //mongoose _id of a user
		createdTime: {type: Date, default: new Date()},
		categories: [String],
		rank: Number
	}
);