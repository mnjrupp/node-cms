/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var AgentProvider = require('./agentprovider-memory').AgentProvider;
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({dumpExceptions:true,showStack:true}));
});
var agentprovider = new AgentProvider();

/* Routes*/
app.get('/', function(req, res) {
agentprovider.findAll(function(error,docs){
   //res.send(docs);
   res.render('index-sub.jade',{title:'Contact Management and tracking',agents:docs});
	});
  });
 app.get('/crm', function(req, res) {
agentprovider.findAll(function(error,docs){
   //res.send(docs);
   res.render('crm.jade',{title:'Contact Management and tracking',agents:docs});
	});
  });
  // DISPLAY
 app.get('/agents', function(req, res) {
agentprovider.findAll(function(error,docs){
   //res.send(docs);
   res.render('agents.jade',{title:'Contact Management and tracking',agents:docs});
	});
  });
//CREATE
 app.post('/agents',function(req,res){
	agentprovider.save({agentnum: req.param('agentnum'),agentname: req.param('agentname'), agentphone:req.param('agentphone'), addr:{street:req.param('addrstreet'), city:req.param('addrcity'),state:req.param('addrstate'),zip:req.param('addrzip')},
contact:req.param('agentcontact'),callnum:req.param('agentphone'),brand:req.param('brand'),acctnum:req.param('acctnum'),workcomplete:{phonepaymnts:req.param('phonepaymnts'),paystatreq:req.param('paystatreq'),morgcalls:req.param('morgcalls'),eftquestions:req.param('eftquestions'),
endorsements:req.param('endorsements'),cancpolreq:req.param('cancpolreq'),reinst:req.param('reinst'),pifdscnt:req.param('pifdscnt'),pymntagrreqs:req.param('pymntagrreqs'),audspreadreq:req.param('audspreadreq'),misc:req.param('misc')},comments:req.param('agentcomment'),issue:req.param('issue'),callbckdte:req.param('callbckdte'),initcall:req.param('initcall')}, function( error, docs) {
			res.redirect('/agents')
		});

}); 
//UPDATE
app.post('/agents/:id',function(req,res){
		agentprovider.findById(req.params.id,function(error,agent){
		agent.agentnum=req.body.agentnum;agent.agentname=req.body.agentname;
		agent.agentphone=req.body.agentphone;
		agent.addr.street=req.body.addrstreet;
		agent.addr.city=req.body.addrcity;
		agent.addr.state=req.body.addrstate;
		agent.addr.zip=req.body.addrzip;
		agent.contact=req.body.agentcontact;
		agent.callnum=req.body.callnum;
		agent.brand=req.body.brand;
		agent.acctnum=req.body.acctnum;
		agent.workcomplete.phonepaymnts=req.body.phonepaymnts;
		agent.workcomplete.paystatreq=req.body.paystatreq;
		agent.workcomplete.morgcalls=req.body.morgcalls;
		agent.workcomplete.eftquestions=req.body.eftquestions;
		agent.workcomplete.endorsements=req.body.endorsements;
		agent.workcomplete.cancpolreq=req.body.cancpolreq;
		agent.workcomplete.reinst=req.body.reinst;
		agent.workcomplete.pifdscnt=req.body.pifdscnt;
		agent.workcomplete.pymntagrreqs=req.body.pymntagrreqs;
		agent.workcomplete.audspreadreq=req.body.audspreadreq;
		agent.workcomplete.misc=req.body.misc;
		agent.comments=req.body.agentcomment;
		agent.issue=req.body.issue;
        agent.initcall=req.body.initcall;
		agent.callbckdte=req.body.callbckdte;
		agent._id = req.params.id
		agent.created_at=agent.created_at
		console.log(agent);
		agentprovider.update(agent,function(err,agents){
		  res.redirect('/agents')});

       });
});
app.get('/agents/:id',function(req, res) {
    agentprovider.findById(req.params.id, function(error, agent) {
        res.render('agent-show.jade',
        {
          title:'Contact Management and Tracking',agents:agent
        });
    });
});
  app.get('/morg-holder', function(req, res) {
agentprovider.findAll(function(error,docs){
   //res.send(docs);
   res.render('morg-holder.jade',{title:'Contact Management and tracking',agents:docs});
	});
  });
  
 app.get('/insured', function(req, res) {
agentprovider.findAll(function(error,docs){
   //res.send(docs);
   res.render('insured.jade',{title:'Contact Management and tracking',agents:docs});
	});
  });


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});