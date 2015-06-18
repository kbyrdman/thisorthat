var mongoose = require('mongoose');
var huddleSchema = require('./huddle.js').schema;

// Private This or That post schema
module.exports.model = mongoose.model('user',
	{
		firstName: String,
		lastName: String,
		username: String,
		password: String, //will move to Auth Service
		friends: Array,   //[{username: '', firstname: '', lastname: '', userId: ''},...]
		huddles: [huddleSchema],
		friendHuddles: [huddleSchema]
	}
);