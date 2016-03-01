'use strict'

var User = require('./../models/User');
var mongoose = require('mongoose');
var chai = require('chai');
var expect = require('chai').expect;

//SYNTAX: describe (moduleName, testDetails)
describe('.getByUsername(username)', function () {

	it('should be a function', function () {
		expect(User.getByUsername).to.be.a('function');
	});

	before(function(done){
		this.user = new User({username:'likun',password:'nonsense'});
		done();
	});
	//Working with Promise: return Promise instead of done
	it.only('resolve user if found', function (done) {
		var self = this;
		
		return User.getByUsername(this.user.username)
		.then(function (user) {
			expect(user).to.exist;
			expect(user.username).to.equal(self.user.username);
		},
		function(err){
			done(err);
		});
	});
});