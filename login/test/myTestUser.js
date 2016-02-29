'use strict'

var User = require('./../models/User');
var mongoose = require('mongoose');
var chai = require('chai');
var expect = chai.expect;

describe('.getByUsername(username)', function () {
	before(function(done){
		this.user = new User();
		done();
	});
	it('should be a function', function () {
		expect(User.getByUsername).to.be.a('function');
	});
});