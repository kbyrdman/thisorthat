var mongoose = require('mongoose');
var huddleSchema = require('./huddle.js').schema;
var friendSchema = require('./friend.js').schema;

// Private This or That post schema
var UserSchema = new mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		password: String,
		friends: [friendSchema],
		huddles: [huddleSchema],
		linkedHuddles: [huddleSchema]
	});

//Setting our multikey index
UserSchema.index({"linkedHuddles.id": 1});


UserSchema.statics.updateHuddle = function updateHuddle(huddle, errorCallback){
	console.log("Updating Users with linked huddle id %s ...", huddle._id);
	this.find({'linkedHuddles.id': huddle._id}, function(err, users){
		if (err){
			errorCallback(err);
		} else {
			for(i = 0; i < users.length; i++){
				var user = users[i];
				var index = indexOfId(user.linkedHuddles, huddle._id);
				user.linkedHuddles.splice(index, 1);
				user.save(function(err){
					if (err){
						errorCallback(err);
					}
				});
			}
			console.log("Removed %s from %s User's linked huddles", huddle._id, users.length.toString());
		}
	});
};


module.exports.model = mongoose.model('user', UserSchema);
module.exports.schema = UserSchema;



function indexOfId(arr, id){
	for (i = 0; i < arr.length; i++){
		if (arr[i].id == id){
			return i;
		}
	}
	return -1;
}