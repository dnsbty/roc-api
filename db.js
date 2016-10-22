var mysql = require('mysql'),
	async = require('async');

var state = {
	pool: null
};

exports.connect = function(done) {
	state.pool = mysql.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});
	done();
};

exports.get = function() {
	return state.pool;
};