var mongoose = require('mongoose');

// Private This or That post schema
module.exports = mongoose.model('privatePost',
	{
		image_A: String,  //url pointing to location of image
		image_B: String,  //url pointing to location of image
		votes_A: {type: Number, default: 0},
		votes_B: {type: Number, default: 0},
		location: Array,  //[lat,lon]
		user_id: Number,  //mongoose _id of a user
		created_time: {type: Date, default: new Date()},
		rank: Number,
		circles: {type: Array, default: []}    //[{circle_id: id, name: name, user: user_id},...]
	}
);