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

/* GET edit game page */
router.get('/edit/:id', function(req, res, next) {
	var games = require('../public/json/schedule.json');
	if (isNaN(req.params.id) || req.params.id > games.length) {
		res.redirect('/schedule');
	}

	var game = games[req.params.id];
	res.render('schedule/edit', {
		index: req.params.id,
		game: game
	});
});

/* POST save from edit game page */
router.post('/edit/:id', function(req, res, next) {
	// get the games and make sure our param points to a valid game
	var games = require('../public/json/schedule.json');
	if (isNaN(req.params.id) || req.params.id > games.length) {
		res.redirect('/schedule');
	}

	// get the specified game and make sure all fields have been filled correctly
	var game = games[req.params.id];
	if (!req.body || req.body.datetime == '' || req.body.sport == '' || req.body.opponent == '' || req.body.homeaway == '' || req.body.color == '' || req.body.venue == '' || req.body.city == '' || req.body.winloss == '' || req.body.score_byu == '' || req.body.score_opponent == '') {
		res.render('schedule/edit', {
			error: "Please make sure all fields have been filled out",
			game: req.body,
			index: req.params.id
		});
		return;
	}
	if (isNaN(req.body.datetime) || isNaN(req.body.sport) || isNaN(req.body.homeaway) || isNaN(req.body.color) || isNaN(req.body.winloss) || isNaN(req.body.score_byu) || isNaN(req.body.score_opponent)) {
		res.render('schedule/new', {
			error: "Please make sure all fields are filled out correctly",
			game: req.body,
			index: req.params.id
		});
		return;
	}

	// replace the game fields with the ones from the edit form and save to JSON file
	game.datetime = parseInt(req.body.datetime);
	game.sport = parseInt(req.body.sport);
	game.opponent = req.body.opponent;
	game.homeaway = parseInt(req.body.homeaway);
	game.color = parseInt(req.body.color);
	game.venue = req.body.venue;
	game.city = req.body.city;
	game.winloss = parseInt(req.body.winloss);
	game.score_byu = parseInt(req.body.score_byu);
	game.score_opponent = parseInt(req.body.score_opponent);
	games[req.params.id] = game;
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
