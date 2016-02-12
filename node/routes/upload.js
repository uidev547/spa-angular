var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require( 'fs' );
var csv = require('fast-csv');
var dest = './uploads/';
var processRequest = function  (req, res, next, settings) {
    var keys;
    var obj;
    var stream;
    var csvStream;
    var len;
    var filename = 'csv_' + Date.now();
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, dest )
      },
      filename: function (req, file, cb) {
        cb(null, filename );
      }
    });
    var upload = multer({ storage: storage }).single('file');
    upload( req, res, function (err) {
        if (err) {
            res.end( 'error occured' );
            return;
        }
        stream = fs.createReadStream( dest + filename );
        csvStream = csv()
        .on( 'data' , function( data ) {
            if( !keys ) {
                keys = data;
            }
            else {
                obj = {};
                for( len = keys.length - 1 ; len>=0 ; len-- ) {
                    obj[ keys[ len ] ] = data[ len ];
                }
                console.log( obj );
            }
        })
        .on("end", function(){
            // deleted the file which uploaded
            fs.unlink( dest + filename);
            res.end( 'successfully uploaded' );
        });
        stream.pipe(csvStream);     

    });

};

router.post('/partners', function ( req, res, next) {
    processRequest(req, res, next);
});


module.exports = router;
