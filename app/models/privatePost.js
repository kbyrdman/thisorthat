var mongoose = require('mongoose');
var huddleSchema = require('../huddle.js').schema;
var Huddle = require('../huddle.js').model;
var events = require('events');
var eventEmitter = new events.EventEmitter();


var PrivatePostSchema = new mongoose.Schema({
	title: {type: String, required: true},  //TODO: limit this size
	leftImage: String,  //url pointing to location of image
	rightImage: String,  //url pointing to location of image
	leftVotes: {type: Number, default: 0},
	rightVotes: {type: Number, default: 0},
	location: {type: [Number], required: true},  //[lat,lon]
	userId: String,  //mongoose _id of a user
	createdTime: {type: Date, default: new Date()},
	categories: [String],
	rank: Number,
	huddles: [huddleSchema]
});
PrivatePostSchema.index({"huddles.huddleId": 1});


module.exports = mongoose.model('privatePost', PrivatePostSchema);