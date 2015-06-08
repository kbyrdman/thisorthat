var mongoose = require('mongoose');

// Private This or That post schema
module.exports = mongoose.model('user',
	{
		first_name: String,
		last_name: String,
		username: String,
		password: String, //will move to Auth Service
		friends: Array,   //[{username: '', firstname: '', lastname: '', userId: ''},...]
		huddles: Array,   //[{huddleId: '', name: ''},...]
		friend_huddles: Array  //[{name: '', huddleId: ''}]
	}
);