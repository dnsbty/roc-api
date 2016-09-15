var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* POST new scheduled game */
router.post('/', function(req, res, next) {
	if (!req.body || req.body.token == '' || req.body.type == '') {
		res.status(400).json({ message: 'Missing required fields' });
	}
	
	var devices = require('../public/json/devices.json');
	req.body.added = Date.now;
	devices.push(req.body);
	fs.writeFileSync(path.resolve(__dirname, '../public/json/devices.json'), JSON.stringify(devices), 'utf-8');
	res.json({ message: 'Success' });
});

module.exports = router;
