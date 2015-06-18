var eventEmitter = require('events').EventEmitter;
var emitter = new eventEmitter();


module.exports.emitHuddleUpdate = function(oldId, newId){
	console.log("Emitting 'privatePosts::updateHuddleId' with %s, %s", oldId, newId);
	emitter.emit('privatePosts::updateHuddleId', oldId, newId);
};

module.exports.consumeHuddleUpdateEvent = function(callback){
	emitter.on('privatePosts::updateHuddleId', callback);
	console.log("Listening for 'privatePosts::updateHuddleId' Event");
};
