var express = require('express');
var router = express.Router();
var userinfo = require( '../modules/userinfo.js' );
var init = require( '../modules/init.js' );
init.init();
router.get('/', function( req, res, next ) {
    console.log( 'userinfo', userinfo.get( req ) );
    res.render('index', { title: 'Express' });
});

module.exports = router;
