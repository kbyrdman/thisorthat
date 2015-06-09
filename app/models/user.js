var mongoose = require('mongoose');

// Private This or That post schema
module.exports = mongoose.model('user',
	{
		firstName: String,
		lastName: String,
		username: String,
		password: String, //will move to Auth Service
		friends: Array,   //[{username: '', firstname: '', lastname: '', userId: ''},...]
		huddles: Array,   //[{huddleId: '', name: ''},...]
		friendHuddles: Array  //[{name: '', huddleId: ''}]
	}
);