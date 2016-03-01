'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:  String
});

UserSchema.statics.new = function(username){
	this.username = username;
}
module.exports = mongoose.model('User', UserSchema);