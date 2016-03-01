'use strict'

//Synchronous Code
//======================================================
var assert = require("assert")
var mongoose = require('mongoose');

describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});


//Testing asynchronous code
//======================================================
mongoose.connect('mongodb://localhost/db',function(err){
	console.log(err);
});
var User = require('./User.js');
describe('User', function(){
	describe('#save()', function(){
		it('should save without error', function(done){
			var user = new User({username:'Luna'});
			user.save(done); // done() callback accepts an error
		});
	});
});