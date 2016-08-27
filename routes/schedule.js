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
	res.render('schedule/new');
});

module.exports = router;
