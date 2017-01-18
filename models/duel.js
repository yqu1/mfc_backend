var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var duelSchema = new Schema({
	from: String,
	to: String,
	date: String,
	completed: Boolean,
	winner: String,
	winScore: Number,
	loseScore: Number,
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	}
});

var Duel = mongoose.model('Duel', duelSchema);

module.exports = Duel;