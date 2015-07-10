var mongoose = require('mongoose');


//setting up our schema
var FriendSchema = new mongoose.Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	username: {type: String, required: true},
	userId: {type: String, required: true}
});

module.exports.model = mongoose.model('friend', FriendSchema);
module.exports.schema = FriendSchema;
