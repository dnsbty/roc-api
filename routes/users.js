var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET list of users */
router.get('/', function(req, res, next) {
	User.getAll(function (err, result) {
		res.json(result);
	});
});

/* GET user by facebook ID */
router.get('/:facebookID', function(req, res, next) {
	User.get(req.params.facebookID, function (err, result) {
		res.json(result);
	})
});

/* POST new user */
router.post('/', function(req, res, next) {
	// make sure that all necessary fields were provided
	if (!req.body.firstName || req.body.firstName == "")
		return res.status(400).json({ message: 'No first name was provided.' });
	if (!req.body.lastName || req.body.lastName == "")
		return res.status(400).json({ message: 'No last name was provided.' });
	if (!req.body.facebookId || req.body.facebookId == "")
		return res.status(400).json({ message: 'No Facebook ID was provided.' });
	if (!req.body.joinDate || req.body.joinDate == "")
		return res.status(400).json({ message: 'No join date was provided.' });

	User.create(req.body.facebookId, req.body.firstName, req.body.lastName, function (err, result) {
		if (err && err.errno != 1062)
			console.error(err);
		res.json(result);
	});
});

module.exports = router;
