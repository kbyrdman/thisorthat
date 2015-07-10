var mongoose = require('mongoose');
var Events = require('../events.js');


//setting up our schema
var HuddleSchema = new mongoose.Schema({
	title: {type: String, required: true},
	userId: {type: String, required: true},
	linked: {type: Boolean, required: true}
});

module.exports.model = mongoose.model('huddle', HuddleSchema);
module.exports.schema = HuddleSchema;
