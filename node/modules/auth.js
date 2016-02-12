'use strict';

var User = require( '../models/user.js' );
var userinfo = require( '../modules/userinfo.js' );

class Auth {
    // takes obj = {
    //  id: "username",
    //  password: "password"
    // }
    // if invalid credentails then reply with unauthorized user
    // 
    // 
    validateCredentails( obj, req, res, next ) {
        User.findOne({ 
            'id': obj.id,
            'password': obj.password

         }, function(err, user) {
            if( user ) {
                userinfo.set( req, user );
                next();
            }
            else {
                res.statusCode = 401;
                res.json( {
                    error: '_invalid_login'
                } );    
            }
            
        });
    }

}

module.exports = new Auth;