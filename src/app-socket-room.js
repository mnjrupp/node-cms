
//socket.io with express 3.x
var express = require('express')
		,app = express()
		,MemoryStore = express.session.MemoryStore
	    ,server=require('http').createServer(app)
	    ,io=require('socket.io').listen(server)
		,sessionStore = new MemoryStore()
		,sessionSecret = 'super-duper-secret-secret';
		//,sioCookieParser = express.cookieParser(sessionSecret);
		//,parseCookie = require('./node_modules/express/node_modules/cookie')
        //,Session = require('./node_modules/express/node_modules/connect').middleware.session.Session;

  server.listen(3001);
/* This work around for the signed cookie can from 
  http://stackoverflow.com/questions/12217725/socket-io-cookie-parse-handshake-error
  cookie: the cookie string from the request headers
 * sid: the session 'key' used with express.session()
 * secret: the session 'secret' used with express.session()
 */
function parseSessionCookie(cookie, sid, secret) {
  var cookies = require('express/node_modules/cookie').parse(cookie)
    , parsed = require('express/node_modules/connect/lib/utils').parseSignedCookies(cookies, secret);
  return parsed[sid] || null;
}
 
app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.session({store: sessionStore, secret:sessionSecret,
			key:'express.sid',cookie: { maxAge: null } }));

});
 
app.get('/',function(req,res){
 res.sendfile(__dirname+'/index.html');
 });

io.sockets.on("connection", function(socket) {
  var hs = socket.handshake;
    console.log('A socket with sessionID ' + hs.sessionID 
        + ' connected!');

	socket.on('disconnect', function () {
        console.log('A socket with sessionID ' + hs.sessionID 
            + ' disconnected!');
        // clear the socket interval to stop refreshing the session
        sessionStore.destroy(hs.sessionID,function(){
			console.log(sessionStore);
		});
    });
  });

/* set up sessionID with socket io*/
io.set('authorization', function (data, accept) {
     console.log(data);
    if (data.headers.cookie) {
	var sid = parseSessionCookie(data.headers.cookie, 'express.sid',sessionSecret);
        //data.cookie = parseCookie.parse(data.headers.cookie);
        data.sessionID = sid; //data.cookie['express.sid'];
		console.log('data sessionID = '+data.sessionID);
        // save the session store to the data object 
        // (as required by the Session constructor)
        data.sessionStore = sessionStore;
        sessionStore.load(data.sessionID, function (err, session) {
            if (err || !session) return accept('Error', false);
			data.session = session;
			console.log(sessionStore);
			return accept(null, true);
		 
        });
    } else {
       console.log('No cookie transmitted');
       return accept('No cookie transmitted.', false);
    }
});
//io.set('log level',2);


 var room=io
	.of('/room')
	.on('connection',function(socket){
		var joinedRoom = null;
		//console.log(express.cookieParser);
		socket.on('join room',function(data){
		socket.join(data);
		joinedRoom = data;
		socket.emit('joined',"you've joined "+data);
		 socket.broadcast.to(joinedRoom)
							.send('someone joined room');
	});
	socket.on('fromclient',function(data){
		if(joinedRoom){
			socket.broadcast.to(joinedRoom).send(data);
		}else{
		 socket.send(
			"you're not joined to a room."+
			"select a room and then push join."
				);
			}
		});
	});