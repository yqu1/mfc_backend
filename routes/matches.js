var express = require('express');
var bodyParser = require('body-parser');
var matchRouter = express.Router();
var mongoose = require('mongoose');
var Verify = require('./verify');
var mongodb = require('mongodb');

var Matches = require('../models/match');

matchRouter.use(bodyParser.json())

matchRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	Matches.find(req.query, function(err, matches) {
		if(err) throw err;
		console.log(matches);
		res.json(matches)
	})
})


.post(Verify.verifyOrdinaryUser, function(req, res, next) {
	console.log(req.decoded)
	Matches.findOne({'from': req.decoded._id, 'to': req.body.to, 'date': req.body.date}, function(err, matches) {
		if(err) throw err;
		if(matches === null) {
			Matches.create({
				from: req.decoded._id, 
				to: req.body.to, 
				date: req.body.date, 
				status: req.body.status,
				message: req.body.message, 
			}, function(err, match) {
				if(err) throw err;
				console.log(match)
				console.log('request created!');
				var id = match._id;
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Added request with id: ' + id)
			})
		}
		else {
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