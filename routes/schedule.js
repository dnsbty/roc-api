var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET schedule page */
router.get('/', function(req, res, next) {
	var games = require('../public/json/schedule.json');
	res.render('schedule/index', {
		games: games
	});
});

/* GET new scheduled game page */
router.get('/new', function(req, res, next) {
	var defaultObj = {
		datetime: '',
		sport: '0',
		homeaway: '0',
		color: '1',
		winloss: '3',
		score_byu: '0',
		score_opponent: '0',
		venue: "Lavell Edwards Stadium",
		city: "Provo, UT",
		opponent: ''
	}
	res.render('schedule/new', {
		input: defaultObj
	});
});

/* POST new scheduled game */
router.post('/new', function(req, res, next) {
	if (!req.body || req.body.datetime == '' || req.body.sport == '' || req.body.opponent == '' || req.body.homeaway == '' || req.body.color == '' || req.body.venue == '' || req.body.city == '' || req.body.winloss == '' || req.body.score_byu == '' || req.body.score_opponent == '') {
		res.render('schedule/new', {
			error: "Please make sure all fields have been filled out",
			input: req.body
		});
		return;
	}
	if (isNaN(req.body.datetime) || isNaN(req.body.sport) || isNaN(req.body.homeaway) || isNaN(req.body.color) || isNaN(req.body.winloss) || isNaN(req.body.score_byu) || isNaN(req.body.score_opponent)) {
		res.render('schedule/new', {
			error: "Please make sure all fields are filled out correctly",
			input: req.body
		});
		return;
	}
	req.body.datetime = parseInt(req.body.datetime);
	req.body.sport = parseInt(req.body.sport);
	req.body.homeaway = parseInt(req.body.homeaway);
	req.body.color = parseInt(req.body.color);
	req.body.winloss = parseInt(req.body.winloss);
	req.body.score_byu = parseInt(req.body.score_byu);
	req.body.score_opponent = parseInt(req.body.score_opponent);
	
	var games = require('../public/json/schedule.json');
	games.push(req.body);
	games.sort(function(a, b){
		return a.datetime - b.datetime;
	});
	fs.writeFileSync(path.resolve(__dirname, '../public/json/schedule.json'), JSON.stringify(games), 'utf-8');
	res.redirect('/schedule');
});

/* DELETE scheduled game */
router.get('/delete/:id', function(req, res, next) {
	var games = require('../public/json/schedule.json');
	games.splice(req.params.id, 1);
	fs.writeFileSync(path.resolve(__dirname, '../public/json/schedule.json'), JSON.stringify(games), 'utf-8');
	res.redirect('/schedule');
});

module.exports = router;
