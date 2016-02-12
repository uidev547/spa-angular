'use strict';

var mongoose = require('mongoose');

var user = mongoose.Schema({
    id: String,
    password: String,
    name: {
        firstName: String,
        lastName: String
    },
    role: String
});

module.exports = mongoose.model('User',user);