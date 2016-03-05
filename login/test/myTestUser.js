'use strict'
var Promise = require('bluebird');
var User = require('./../models/User');
var mongoose = require('mongoose');
var chai = require("chai");
var expect = require('chai').expect;
var should = chai.should();
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

//SYNTAX: describe (moduleName, testDetails)
describe('.getByUsername(username)', function () {

	it('should be a function', function () {
		expect(User.getByUsername).to.be.a('function');
	});

	before(function(){
		this.user = new User({username:'likun',password:'nonsense'});
	});

	//Working with Promise
	/*
	*  MARK: the test is passed but the console.log is not displayed;
	*  if I don't call done() at all or call done() inside the then(), I would get error:
	*  Ensure the done() callback is being called in this test.
	*/

	it('resolve user if found/Plain', function (done) {
		var self = this;
		var promise = User.getByUsername(this.user.username);

		promise.then(function(user){
			expect(user).to.equal('likun');
			expect(user).to.exist;
			expect(user.username).to.equal(self.user.username);	
		});
		done();
	});

	//Working with Promise & using chaiAsPromised
	/*
	*  MARK: the test is passed but the console.log is not displayed;
	*  didn't call the callback function in then() at all.
	*/
	it('resolve user if found/chaiAsPromised', function (done) {
		var self = this;
		var promise = User.getByUsername(this.user.username);

		promise.should.eventually.exist.then(function(user){
			expect(user.username).to.equal(self.user.username);		
		}); //same as then(){expect(user).to.exist}
		done();
	});

		/*

		promise.should.eventually.exist;
		promise.should.eventually.equal(self.user);
		
		---

		var promise = User.getByUsername(this.user.username);
		return promise.then(function(user){
			console.log('in then');
			expect(user).to.equal('likun');
			expect(user).to.exist;
			expect(user.username).to.equal(self.user.username);	
		});
		*/
});