var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var requestSchema = new Schema({
	from: String,
	to: String,
	date: String,
	message: String,
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	}
});

var Request = mongoose.model('Request', requestSchema);

module.exports = Request;