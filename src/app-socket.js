
//socket.io with express 3.x
var app=require('express')()
 ,server=require('http').createServer(app)
 ,io=require('socket.io').listen(server);

  server.listen(3001);

app.get('/',function(req,res){
 res.sendfile(__dirname+'/index.html');
 });


 var chat=io
	.of('/chat')
	.on('connection',function(socket){
		socket.emit('a message',{that:'only','/chat':'will get'});
		 io.sockets.send('user connected');
		 socket.broadcast.json.send('a message', { everyone: 'in', '/chat': 'will get' });
	});

 var news=io
	.of('/news')
	.on('connection',function(socket){
		socket.emit('item',{news:'item'});
	});