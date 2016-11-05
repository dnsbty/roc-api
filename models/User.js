var db = require('../db');

exports.create = function (facebookId, firstName, lastName, done) {
	var values = [facebookId, firstName, lastName, new Date().toISOString()];

	db.get().query('INSERT INTO users (facebookID, firstName, lastName, joinDate) VALUES(?, ?, ?, ?)', values, function (err, result) {
		if (err) return done(err);
		done(null, result.insertId);
	});
};

exports.get = function (facebookId, done) {
	db.get().query('SELECT * FROM users WHERE facebookID = ? LIMIT 1', [facebookId], function (err, result) {
		if (err) return done(err);
		done(null, result[0]);
	});
}

exports.getAll = function (done) {
	db.get().query('SELECT * FROM users', function(err, rows) {
		if (err) return done(err);
		done(null, rows);
	});
};