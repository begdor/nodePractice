'use strict'
var Promise = require('bluebird');
var mongoose = require('mongoose');
var debug = require('debug');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:  String,
  password: String,
}, {
	collection: 'users'
});

UserSchema.statics.getByUsername =  function (username) {
	debug('getByUsername', username);
	var self = this; // TODO: why?

	return new Promise(function (resolve, reject) {
		
		self.findOne({
			username: username
		}, function (err, user) {

			console.log('findOne callback');
			if (err) {
				return reject(err); // why return not else
			}
			return resolve(user);
		});
	});
}

module.exports = mongoose.model('User', UserSchema);