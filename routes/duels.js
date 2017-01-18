var express = require('express');
var bodyParser = require('body-parser');
var duelRouter = express.Router();
var mongoose = require('mongoose');
var Verify = require('./verify');

var Duels = require('../models/duel');

duelRouter.use(bodyParser.json())

duelRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	Duels.find({'to': req.decoded._id}, function(err, duels) {
		if(err) throw err;
		console.log(duels);
		res.json(duels)
	})
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
	console.log(req.decoded)
	Duels.findOne({'from': req.decoded._id, 'to': req.body.to, 'date': req.body.date}, function(err, duels) {
		if(err) throw err;
		if(duels === null) {
			Duels.create({
				from: req.decoded._id, 
				to: req.body.to, 
				date: req.body.date, 
				message: req.body.message, 
				winner: req.body.winner, 
				winScore: req.body.winScore,
				loseScore: req.body.loseScore
			}, function(err, duel) {
				if(err) throw err;
				console.log(duel)
				console.log('duel created!');
				var id = duel._id;
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Added duel with id: ' + id)
			})
		}
		else {
			duels.date = req.body.date;
			duels.completed = req.body.completed;

			duels.save(function(err, r) {
				if(err) throw err;
				console.log('Updated Duel!')
				console.log(duels)
				res.json(duels)
			});

		}
	})
})


module.exports = duelRouter