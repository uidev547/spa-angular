'use strict';

var mongoose = require('mongoose');

var user = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    password: String,
    role: String
});

module.exports = mongoose.model('User',user);