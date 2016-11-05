var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Pass = require('../models/Pass');

/* POST new pass */
router.post('/', function(req, res, next) {
	// make sure that all necessary fields were provided
	if (!req.body.code || req.body.code == "")
		return res.status(400).json({ message: 'No pass code was provided.' });
	if (!req.body.owner || req.body.owner == "")
		return res.status(400).json({ message: 'No pass owner ID was provided.' });

	Pass.create(req.body.code, req.body.owner, function (err, result) {
		if (err && err.errno != 1062)
			console.error(err);
		res.json(result);
	});
});

module.exports = router;