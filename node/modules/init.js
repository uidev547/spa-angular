'use strict';
var User = require( './../models/user.js' );

class Init {
    init() {
        
        User.findOne( {id:"admin"}, function(err, user) {
            if (!user) {
                var admin = new User( {
                    id: 'admin',
                    password: 'admin',
                    name: {
                        firstName: 'Admin',
                        lastName: 'A'
                    }
                } );
                admin.save();
                console.log( 'admin added now' );
            } else {
                console.log( 'admin already exists' );
            }
            
        })
    }    
}

module.exports = new Init;