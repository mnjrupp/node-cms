/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , user    = require('./routes/user')
  , http    = require('http')
  , path    = require('path')
  , flash   = require('connect-flash')
  , cronJob = require('cron').CronJob
  , fs      = require('fs')
  , csv     = require('csv')
  , moment  = require('moment');


//var EM = require('./public/javascripts/modules/email-dispatcher');
var app = express();
   //assigning session to local res must happen before configure
	// app.use(function(req, res, next) {
	// res.user = req.session.user;
	// next();
	// });

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'super-duper-secret-secret',cookie: { maxAge: null } }));
  app.use(flash());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
 
});

 
app.configure('development', function(){
  app.use(express.errorHandler({dumpExceptions:true,showStack:true}));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var concron = new cronJob('00 00,07,10,20,30,35,40,45,50 * * * *', function(){
    console.log(new Date());
    dumpMemoryArrays(function(e,o){
	});
}, null, true);
