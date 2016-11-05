var db = require('../db');

exports.create = function (code, owner, done) {
	var values = [code, owner, new Date().toISOString()];

	db.get().query('INSERT INTO passes (code, owner, saveDate) VALUES(?, ?, ?)', values, function (err, result) {
		if (err) return done(err);
		done(null, result.insertId);
	});
};