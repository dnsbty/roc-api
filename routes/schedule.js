var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET schedule page */
router.get('/', function(req, res, next) {
	var content = fs.readFileSync(path.resolve(__dirname, '../public/json/schedule.json'));
	var games = JSON.parse(content);
	res.render('schedule/index', {
		games: games
	});
});

module.exports = router;
