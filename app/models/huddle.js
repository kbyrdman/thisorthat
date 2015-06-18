var mongoose = require('mongoose');
var crypto = require('crypto');
var Events = require('../events.js');


//setting up our schema
var HuddleSchema = new mongoose.Schema({
	title: {type: String, required: true},
	userId: {type: String, required: true},  //mongoose _id of a user
	huddleId: String
});

//creating custom static method that generates huddle ids
HuddleSchema.statics.generateHuddleId = generateHuddleId;

HuddleSchema.pre('save', function(next){
	var newId = generateHuddleId(this.userId, this.title);
	var oldId = this.huddleId;
	if (oldId == null){
		this.huddleId = newId;
		console.log("Set huddleId to: %s", newId);
	} else if (newId != oldId){
		this.huddleId = newId;
		Events.emitHuddleUpdate(oldId, newId);
	}
	next();
});

module.exports.model = mongoose.model('huddle', HuddleSchema);
module.exports.schema = HuddleSchema;





// Private
var generateHuddleId = function(user_id, huddle_name){
	var hash = crypto.createHash('md5').update(user_id + huddle_name).digest('hex');
	return hash;
};