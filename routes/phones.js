var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* POST new phone number */
router.post('/', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'https://therocapp.com');

	if (!req.body || !req.body.number || !req.body.type || req.body.number == '' || req.body.type == '') {
		return res.status(400).json({ message: 'Missing required fields' });
	}
	
	var phones = require('../public/json/phones.json');
	req.body.added = Date.now;
	phones.push(req.body);
	fs.writeFileSync(path.resolve(__dirname, '../public/json/phones.json'), JSON.stringify(phones), 'utf-8');
	res.json({ message: 'Success' });
});

module.exports = router;
