var eventEmitter = require('events').EventEmitter;
var emitter = new eventEmitter();


module.exports.emitUserHuddleRemoved = function(huddleId){
	console.log("Emitting 'user::removedHuddle' with %s", huddleId);
	emitter.emit('user::removedHuddle', huddleId);
};

module.exports.consumeUserHuddleRemovedEvent = function(callback){
	emitter.on('user::removedHuddle', callback);
	console.log("Listening for 'user::removedHuddle' Event");
};


module.exports.emitUserHuddleUpdated = function(huddleId){
	console.log("Emitting 'user::updatedHuddle' with %s", huddleId);
	emitter.emit('user::updatedHuddle', huddleId);
};

module.exports.consumeUserHuddleUpdatedEvent = function(callback){
	emitter.on('user::updatedHuddle', callback);
	console.log("Listening for 'user::updatedHuddle' Event");
};


module.exports.emitUserHuddleDeleted = function(huddleId){
	console.log("Emitting 'user::updatedHuddle' with %s", huddleId);
	emitter.emit('user::updatedHuddle', huddleId);
};

module.exports.consumeUserHuddleDeletedEvent = function(callback){
	emitter.on('user::updatedHuddle', callback);
	console.log("Listening for 'user::updatedHuddle' Event");
};
