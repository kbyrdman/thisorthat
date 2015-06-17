var mongoose = require('mongoose');
var crypto = require('crypto');
var events = require('events');
var eventEmitter = new events.EventEmitter();


var HuddleSchema = new mongoose.Schema({
	title: {type: String, required: true},
	userId: {type: String, required: true},  //mongoose _id of a user
	huddleId: String
});

HuddleSchema.statics.generateHuddleId = generateHuddleId;

//custom setter to ensure proper huddle ids
HuddleSchema.path('huddleId').set(function(arg){
	return generateHuddleId(this.userId, this.title);
});


huddleSchema.on('save', function(model){
	if (generateHuddleId(model.userId, model.title) != model.huddleId){
		model.huddleId = generateHuddleId(model.userId, model.title);
		eventEmitter.emit('privatePosts::updateHuddleId');
	}
	//make sure huddleId is correct. If not, update it
	//and emit event to update all corresponding private posts
});


module.exports.model = mongoose.model('huddle', HuddleSchema);
module.exports.schema = HuddleSchema;





// Private
var generateHuddleId = function(user_id, huddle_name){
	var hash = crypto.createHash('md5').update(user_id + huddle_name).digest('hex');
	return hash;
};