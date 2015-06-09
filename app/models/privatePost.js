var mongoose = require('mongoose');

// Private This or That post schema
module.exports = mongoose.model('privatePost',
	{
		title: String,      //limit this size
		leftImage: String,  //url pointing to location of image
		rightImage: String,  //url pointing to location of image
		leftVotes: {type: Number, default: 0},
		rightVotes: {type: Number, default: 0},
		location: Array,  //[lat,lon]
		userId: String,  //mongoose _id of a user
		createdTime: {type: Date, default: new Date()},
		categories: Array, //predetermined set of categories?
		rank: Number,
		huddles: {type: Array, default: []}    //[{huddleId: id, name: name, user: userId},...]
	}
);