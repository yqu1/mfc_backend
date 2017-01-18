var express = require('express');
var bodyParser = require('body-parser');
var requestRouter = express.Router();
var mongoose = require('mongoose');
var Verify = require('./verify');

var Requests = require('../models/request');

requestRouter.use(bodyParser.json())

requestRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	Requests.find({'to': req.decoded._id}, function(err, requests) {
		if(err) throw err;
		console.log(requests);
		res.json(requests)
	})
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
	console.log(req.decoded)
	Requests.findOne({'from': req.decoded._id, 'to': req.body.to, 'date': req.body.date}, function(err, requests) {
		if(err) throw err;
		if(requests === null) {
			Requests.create({
				from: req.decoded._id, 
				to: req.body.to, 
				date: req.body.date, 
				message: req.body.message, 
			}, function(err, request) {
				if(err) throw err;
				console.log(request)
				console.log('request created!');
				var id = request._id;
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Added request with id: ' + id)
			})
		}
		else {
			requests.date = req.body.date;

			requests.save(function(err, r) {
				if(err) throw err;
				console.log('Updated request!')
				console.log(requests)
				res.json(requests)
			});

		}
	})
})

requestRouter.route('/:reqId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
	Requests.findByIdAndRemove(req.params.reqId, function(err, r) {
		var response = {
			message: "request successfully deleted",
			id: r._id
		}
		res.send(response)
	})
})


module.exports = requestRouter