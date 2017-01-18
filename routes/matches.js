var express = require('express');
var bodyParser = require('body-parser');
var matchRouter = express.Router();
var mongoose = require('mongoose');
var Verify = require('./verify');

var Matches = require('../models/match');

matchRouter.use(bodyParser.json())

matchRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	req.query = JSON.parse(req.query.q)
	console.log(req.query)
	Matches.find(req.query, function(err, matches) {
		if(err) throw err;
		console.log(matches);
		res.json(matches)
	})
})


.post(Verify.verifyOrdinaryUser, function(req, res, next) {
	console.log(req.body)
	Matches.findOne({'from': req.body.from, 'to': req.body.to, 'date': req.body.date}, function(err, matches) {
		if(err) throw err;
		if(matches === null) {
			Matches.create({
				from: req.body.from, 
				to: req.body.to, 
				date: req.body.date, 
				status: req.body.status,
				message: req.body.message, 
			}, function(err, match) {
				if(err) throw err;
				console.log(match)
				console.log('match created!');
				var id = match._id;
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Added match with id: ' + id)
			})
		}
		else {
			matches.from = req.body.from;
			matches.to = req.body.to;
			matches.message = req.body.message;
			matches.status = req.body.status;
			matches.record = req.body.record;
			matches.date = req.body.date;

			matches.save(function(err, r) {
				if(err) throw err;
				console.log('Updated match!')
				console.log(matches)
				res.json(matches)
			});

		}
	})
})


module.exports = matchRouter;