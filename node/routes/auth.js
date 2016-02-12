var express = require('express');
var router = express.Router();
var User = require( '../models/user.js' );
var auth = require( '../modules/auth.js' );
var userinfo = require( '../modules/userinfo.js' );

/* GET home page. */
router.post('/login', function( req, res, next ) {
    var obj = {
        id: req.body.id,
        password: req.body.password
    };
    auth.validateCredentails( obj, req, res, next );    
}, function(req, res, next) {
    res.json( userinfo.get( req ) );
});

router.get('/logout', function( req, res, next ) {
    userinfo.removeSession( req );
    res.end();
});

router.get('/current', function( req, res, next ) {
    res.json( userinfo.get( req ) );
});

module.exports = router;
