var express = require('express');
var router = express.Router();
var userinfo = require( '../modules/userinfo.js' );
var User = require( '../models/user.js' );
var auth = require( '../modules/auth.js' );
var mongoError = function( res ) {
    res.statusCode = 500;
    res.json( {
        error: '_mongo_error'
    } );
    return;
};

router.get('/', function(req, res, next) {
    User.find({}, function  ( err, docs ) {
        if( err ) {
            mongoError( res );
            return;
        }
        res.json( docs );
    })
});
/* GET users listing. */
router.post('/create', auth.isAdmin, function(req, res, next) {
    
    var data = req.body;
    if( !data.emailId || !data.password ) {
        res.statusCode = 400;
        res.json( {
            error: '_missing_field'
        } );
        return;
    }

    var obj = {
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.emailId,
        password: data.password,
        role: data.role
    }
    var user = User( obj );
    User.save( function ( err ) {
        if( err ) {
            mongoError( res );
            return;
        }
        res.json( user );
    });
    
});

router.get('/delete', function(req, res, next) {
    var id = req.query.id;
    if( !id ) {
        res.statusCode = 400;
        res.json( {
            error: '_missing_field'
        } );
        return;
    }

    User.find({ _id:id }).remove( function( err ) {
        if( err ) {
            mongoError( res );
            return;
        }
        res.end();
    } );
});

router.get('/update', function(req, res, next) {
    
    var data = req.body;
    if( !data._id ) {
        res.statusCode = 400;
        res.json( {
            error: '_missing_field'
        } );
    } 
    if( !data.emailId || !data.password ) {
        res.statusCode = 400;
        res.json( {
            error: '_missing_field'
        } );
        return;
    }
    var query = { '_id': data._id };
    User.findOneAndUpdate(query, data, {upsert:true}, function(err, doc){
        if (err) {
            mongoError( res );
            return;
        } 
        res.json( doc );
    });

});

module.exports = router;
