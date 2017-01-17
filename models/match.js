var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var matchSchema = new Schema({
	from: Schema.Types.ObjectId,
	to: Schema.Types.ObjectId,
	date: Date,
	status: String, 
	record: {
		winner: Schema.Types.ObjectId,
		winScore: Number,
		loseScore: Number
	},
	message: String,
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	}
});

var Match = mongoose.model('Match', matchSchema);

module.exports = Match;