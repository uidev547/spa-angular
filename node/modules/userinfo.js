'use strict';
class UserInfo {
    
    get( req ) {
        return req.session && req.session.userInfo;
    }

    set( req, user ) {
        req.session.userInfo = user;
    }

    isAdmin(req, res) {

    }

    removeSession( req ) {
        this.user = null;
        req.session.destroy(function(err) {
          console.log( 'session deleted' );
        })
    }

}

module.exports = new UserInfo;