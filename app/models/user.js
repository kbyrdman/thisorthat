var mongoose = require('mongoose');

// Private This or That post schema
module.exports = mongoose.model('user',
	{
		first_name: String,
		last_name: String,
		username: String,
		password: String, //will move to Auth Service
		friends: Array,   //this user's friends' mongoose _id's
		huddles: Array,   //this user's circles
		friend_huddles: Array  //circles this user is apart of
	}
);