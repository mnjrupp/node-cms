
   var AgentProvider = require('../agentprovider-memory').AgentProvider
	,InsuredProvider = require('../insured-provider-memory').insuredProvider
	,MorgageProvider = require('../morgage-provider-memory').morgageProvider
	,RptProvider     = require('../report-provider-memory').ReportProvider
	//,CT = require('../public/javascripts/modules/country-list')
	,AM = require('../public/javascripts/modules/account-manager-memory')
        ,moment          = require('moment')
        ,path            = require('path')
        ,fs              = require('fs')
	,agentprovider   = new AgentProvider()
        ,insuredprovider = new InsuredProvider()
        ,morgageprovider = new MorgageProvider()
        ,rptProvider     = new RptProvider();
    
module.exports=function(app,io,sessionStore,sessionSecret){
function retrieveQueue(repID,callback){
	 var response = [];
	 agentprovider.findByQueue(repID,function(error,docs){
	   //res.send(docs);
			if(error){
				console.log(error);
				//res.send(error,400);
				callback(error);
			}else{
				response.push(docs);
				insuredprovider.findByQueue(repID,function(error,insureds){
					if(error){
						console.log(error);
						//res.send(error,400);
						callback(error);
						}else{
							response.push(insureds);
							morgageprovider.findByQueue(repID,function(error,morgages){
								if(error){
									console.log(error);
									//res.send(error,400);
									callback(error);
								}else{
									response.push(morgages);
								}
							});
						}
				});
			callback(null,response);
			}
		});
 };
// Search functions
function retrieveWorkList(repID,callback){
	 var response = [];
	 agentprovider.findByRepAll(repID,function(error,docs){
	   //res.send(docs);
			if(error){
				console.log(error);
				//res.send(error,400);
				callback(error);
			}else{
				response.push(docs);
				insuredprovider.findByRepAll(repID,function(error,insureds){
					if(error){
						console.log(error);
						//res.send(error,400);
						callback(error);
						}else{
							response.push(insureds);
							morgageprovider.findByRepAll(repID,function(error,morgages){
								if(error){
									console.log(error);
									//res.send(error,400);
									callback(error);
								}else{
									response.push(morgages);
								}
							});
						}
				});
			callback(null,response);
			}
		});
 };
function retrieveByIssue(isstype,callback){
	 var response = [];
	 agentprovider.findByIssue(isstype,function(error,docs){
	   //res.send(docs);
			if(error){
				console.log(error);
				//res.send(error,400);
				callback(error);
			}else{
				response.push(docs);
				insuredprovider.findByIssue(isstype,function(error,insureds){
					if(error){
						console.log(error);
						//res.send(error,400);
						callback(error);
						}else{
							response.push(insureds);
							morgageprovider.findByIssue(isstype,function(error,morgages){
								if(error){
									console.log(error);
									//res.send(error,400);
									callback(error);
								}else{
									response.push(morgages);
								}
							});
						}
				});
			callback(null,response);
			}
		});
 };
function retrieveWorkListAll(callback){
	 var response = [];
	 agentprovider.findAll(function(error,docs){
	   //res.send(docs);
			if(error){
				console.log(error);
				//res.send(error,400);
				callback(error);
			}else{
				response.push(docs);
				insuredprovider.findAll(function(error,insureds){
					if(error){
						console.log(error);
						//res.send(error,400);
						callback(error);
						}else{
							response.push(insureds);
							morgageprovider.findAll(function(error,morgages){
								if(error){
									console.log(error);
									//res.send(error,400);
									callback(error);
								}else{
									response.push(morgages);
								}
							})
						}
				});
			callback(null,response);
			}
		});
 };
function retrieveWorkListAllToday(callback){
	 var response = []
     ,dte = moment().format('YYYY-MM-DD');
	 agentprovider.findByCreateModDte(dte,function(error,docs){
	   //res.send(docs);
			if(error){
				console.log(error);
				//res.send(error,400);
				callback(error);
			}else{
				response.push(docs);
				insuredprovider.findByCreateModDte(dte,function(error,insureds){
					if(error){
						console.log(error);
						//res.send(error,400);
						callback(error);
						}else{
							response.push(insureds);
							morgageprovider.findByCreateModDte(dte,function(error,morgages){
								if(error){
									console.log(error);
									//res.send(error,400);
									callback(error);
								}else{
									response.push(morgages);
								}
							})
						}
				});
			callback(null,response);
			}
		});
 };

function dumpUsersArray(callback){
 var bckdir = path.join(__dirname,'../backups')
    ,dte = new Date()
    ,filedte = dte.getFullYear()+''+(dte.getMonth()+1)+''+dte.getDate();
	AM.db.findAll(function(error,users){
	if(users==null){
				console.log('Error writing to users file');
				//res.send(error,400);
				callback('Error writing to users file');
			}else{
				fs.writeFile(bckdir+'/users'+filedte+'.txt', JSON.stringify(users), 
						function (err) {  if (err) {return console.log(err);}});
				}
		callback(null);
	});
	
}
/* use fs to dump the arrays to files for back-up
 * Export out for use in main js*/
this.dumpMemoryArrays=function(callback){
 var bckdir = path.join(__dirname,'../backups')
    ,dte = new Date()
    ,filedte = dte.getFullYear()+''+(dte.getMonth()+1)+''+dte.getDate();
	 agentprovider.findAll(function(error,docs){
	   //res.send(docs);
			if(error){
				console.log(error);
				//res.send(error,400);
				callback(error);
			}else{
				fs.writeFile(bckdir+'/agentprovider'+filedte+'.txt', JSON.stringify(docs), function (err) {
				if (err) {  return console.log(err);  }});
				insuredprovider.findAll(function(error,insureds){
					if(error){
						console.log(error);
						//res.send(error,400);
						callback(error);
						}else{
							fs.writeFile(bckdir+'/insuredprovider'+filedte+'.txt', JSON.stringify(insureds), function (err) {
							if (err) {  return console.log(err);  }});
							morgageprovider.findAll(function(error,morgages){
								if(error){
									console.log(error);
									//res.send(error,400);
									callback(error);
								}else{
									fs.writeFile(bckdir+'/morgprovider'+filedte+'.txt',JSON.stringify(morgages), function (err) { 
									if (err) {  return console.log(err);  }});
								}
							})
						}
				});
			callback(null,null);
			}
		});
};
function sendQueuemsg(socketid,msg){
    io.sockets.socket(socketid).emit('queue',msg);
    
}
function parseSessionCookie(cookie, sid, secret) {
  var cookies = require('express/node_modules/cookie').parse(cookie)
    , parsed = require('express/node_modules/connect/lib/utils').parseSignedCookies(cookies, secret);
  return parsed[sid] || null;
}
io.sockets.on("connection", function(socket) {
  var hs = socket.handshake;
    console.log('A socket with sessionID ' + hs.sessionID 
        + ' connected!');
        AM.db.findbySession(hs.sessionID,function(e,o){
            if(o!=null){
                AM.db.AddSocket(o.user,socket.id,function(e,o){
                    if(o!=null){
                        console.log(socket.id+' was added to user\n#####################'+JSON.stringify(o));
                    }
                });
            }
        });

	socket.on('disconnect', function () {
            
        AM.db.SocketBySessCount(hs.sessionID,function(e,o){
            //console.log('number of sockets '+o)
            if(o==1){
                 //Only 1 socket so remove session
                AM.db.RemoveSession(hs.sessionID,function(e,o){
                    console.log(hs.sessionID+' SessionID removed from\n******************\n'+JSON.stringify(o));
                     });
                     // clear the session from sessionStore
                        sessionStore.destroy(hs.sessionID,function(){
			console.log(sessionStore);
		});
            }
                AM.db.RemoveSocketbysession(hs.sessionID,socket.id,function(e,o){
                    
                //console.log('socket-- '+socket.id+'\nsessionID-- '+hs.sessionID+'\n');
                console.log(socket.id+' removed from user\n$$$$$$$$$$$$$$$$$$$$$$$\n'+JSON.stringify(o));
        })
        
        });
       
        
    });
  });

/* set up sessionID with socket io*/
io.set('authorization', function (data, accept) {
    //console.log('data\n ----------------------------------');
     //console.log(data);
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
         //Set the sessionID in user Data
         AM.db.SetSession(session.user.user,sid,function(e,o){
             console.log('sessionID '+sid+' was added to user '+session.user.user+'\n=================\n'+JSON.stringify(o));});
			data.session = session;
                        //console.log('data=\n----------------------');
                        //console.log(data);
                        console.log('sessionStore after loading of sessionID');
			console.log(sessionStore);
			return accept(null, true);
		 
        });
    } else {
       console.log('No cookie transmitted');
       return accept('No cookie transmitted.', false);
    }
});

// routes begin here 
app.get('/about',function(req,res){
	res.render('about', { title: '' });
});
app.get('/', function(req, res){
// check if the user's credentials are saved in a cookie //
	if (req.cookies.user == 'undefined' || req.cookies.pass == 'undefined'){
                //res.redirect('/login');
		res.render('login', { title: 'Hello - Please Login To Your Account' });
	}	else{
// attempt automatic login //
       // console.log(req.session.cookie.maxAge/1000+" remaining");
		
		AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
			if (o != null){
				req.session.user = o;
				res.redirect('/home');
			}	else{
                                //res.redirect('/login');
				res.render('login', { title: 'Hello - Please Login To Your Account' });
			}
		});
	}
});
app.get('/login',function(req,res){
    res.render('login', { title: 'Hello - Please Login To Your Account' });
})

app.post('/', function(req, res){
		AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
			if (!o){
				//console.log('returned from manualLogin '+e);
				res.send(e, 400);
			}	else{
			    req.session.user = o;
				if (req.param('remember-me') == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					res.cookie('pass', o.pass, { maxAge: 900000 });
				}
				res.send(o, 200);
			}
		});
	});

app.post('/change-password', function(req, res){
				var username,oldpass,newpass;
				username = req.param('username');
				oldpass  = req.param('oldpass');
				newpass  = req.param('newpass');
				AM.changePassword(username,oldpass,newpass,function(e,o){
				if(!o){
					res.send(e,400);
				}else{
				res.send(o, 200);
			}
		});
	});
// logged-in user homepage //
	
app.get('/home', function(req, res) {
		//console.log(req.session.cookie.maxAge/1000+" remaining");
		//console.log(req.sessionStore.sessions);
		//console.log(req.sessionID);
		//console.log(JSON.stringify(req.session));
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		//res.user = req.session.user.user;
		 retrieveWorkList(req.session.user.user,function(error,response){
	  	  res.render('mainframe.jade',
			{title:'Contact Management and tracking',agents:response[0],insurers:response[1],morgages:response[2],user:req.session.user.user,
					security:req.session.user.seclevel})});
			
	}
});
app.get('/user-home',function(req,res){
if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		//res.user = req.session.user.user;
		 retrieveWorkList(req.session.user.user,function(error,response){
	  	  res.render('index-sub.jade',
			{title:'Contact Management and tracking',agents:response[0],insurers:response[1],morgages:response[2],user:req.session.user.user,
					security:req.session.user.seclevel})});
			
	}

	});
   // Reporting page for seclevel==9
app.get('/reporting', function(req, res) {
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		if(req.session.user.seclevel==9){
			var useraccts = AM.accounts;
	  	  retrieveWorkListAllToday(function(error,response){
		   rptProvider.findByRepAll(req.session.user.user,function(error,rpts){
				//console.log(rpts);
				res.render('reporting.jade',
					{title:'Contact Management and tracking',agents:response[0],insurers:response[1],morgages:response[2],user:req.session.user.user,
						security:req.session.user.seclevel,reports:rpts,users:useraccts})
					});
				});
			}else{
				res.redirect('/home');
			}
			
	}
});
app.get('/reporting/select=:type', function(req, res) {
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		if(req.session.user.seclevel==9){
			var useraccts = AM.accounts;
	  	  retrieveByIssue(req.params.type,function(error,response){
			rptProvider.findByRepAll(req.session.user.user,function(error,rpts){
				res.render('reporting.jade',
					{title:'Contact Management and tracking',issuetype:req.params.type,agents:response[0],
						insurers:response[1],morgages:response[2],user:req.session.user.user,
						security:req.session.user.seclevel,reports:rpts,users:useraccts})
					});
				});
			}else{
				res.redirect('/home');
			}
			
	}
});
app.get('/reporting/custom=:type',function(req, res) {
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		if(req.session.user.seclevel==9){
		console.log(req.param('selecttype'));
		var useraccts = AM.accounts;
		rptProvider.findByRepAll(req.session.user.user,function(error,rpts){
	  	  res.render('reporting.jade',
			{title:'Contact Management and tracking',reporttype:req.params.type,user:req.session.user.user,
				security:req.session.user.seclevel,reports:rpts,users:useraccts});
				});
			}else{
				res.redirect('/home');
			}
			
	}
});

app.post('/reporting/custom=:type',function(req, res) {
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		if(req.session.user.seclevel==9){
		console.log(req.param('selecttype'));
		rptProvider.findByRepAll(req.session.user.user,function(error,rpts){
	  	  res.render('reporting.jade',
			{title:'Contact Management and tracking',reporttype:req.params.type,user:req.session.user.user,
				security:req.session.user.seclevel,reports:rpts});
			});
			}else{
				res.redirect('/home');
			}
			
	}
});
app.get('/admin', function(req, res) {
		//console.log(req.session.cookie.maxAge/1000+" remaining");
		//console.log(req.session.user);
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		if(req.session.user.seclevel==9){
           //console.log('accounts = '+JSON.stringify(AM.accounts));
			var useraccts = AM.accounts;
	  	  res.render('admin.jade',
			{title:'Contact Management and tracking',user:req.session.user.user,
					security:req.session.user.seclevel,users:useraccts});
			}else{
				res.redirect('/home');
			}
			
	}
});
app.get('/logout', function(req, res) {
	    req.session.destroy(function(err){
                //console.log('During logout\n^^^^^^^^^^^^^^^^^^^^^\nreq.cookies.user = '
                //    +req.cookies.user);
                if(err){
                    console.log(err);
                }
            });
		res.redirect('/');	
});
 app.get('/crm', function(req, res) {
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		agentprovider.findAll(function(error,docs){
		//res.send(docs);
		res.render('crm.jade',{title:'Contact Management and tracking',agents:docs});
		});
	}
  });
  // DISPLAY
 app.get('/agents', function(req, res) {
		//console.log(req.session.cookie.maxAge/1000+" remaining");
		//console.log(req.session.user);
	if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		var useraccts = AM.accounts;
		retrieveWorkList(req.session.user.user,function(error,response){
	  	  res.render('agents.jade',
			{title:'Contact Management and tracking',agents:response[0],insurers:response[1],morgages:response[2],user:req.session.user.user,
				security:req.session.user.seclevel,users:useraccts})});
		}
  });
//CREATE
 app.post('/agents',function(req,res){
		//console.log(req.session.cookie.maxAge/1000+" remaining");
		console.log(req.session.user);
 if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		//console.log(req.session.user);
		res.redirect('/');
	}   else{
	agentprovider.save({agentnum: req.param('agentnum'),
					agentname: req.param('agentname'),
					agentphone:req.param('agentphone'),
					addr:{street:req.param('addrstreet'),
					city:req.param('addrcity'),
					state:req.param('addrstate'),
					zip:req.param('addrzip')},
					contact:req.param('agentcontact'),
					callnum:req.param('agentphone'),
					brand:req.param('brand'),
					acctnum:req.param('acctnum'),
					policynum:req.param('policynum'),
					workcomplete:{phonepaymnts:req.param('phonepaymnts') || false,
					paystatreq:req.param('paystatreq') || false,
					morgcalls:req.param('morgcalls') || false,
					eftquestions:req.param('eftquestions') || false,
					endorsements:req.param('endorsements') || false,
					cancpolreq:req.param('cancpolreq') || false,
					reinst:req.param('reinst') || false,
					pifdscnt:req.param('pifdscnt') || false,
					pymntagrreqs:req.param('pymntagrreqs') || false,
					audspreadreq:req.param('audspreadreq') || false,
					misc:req.param('misc') || false},
					comments:req.param('agentcomment'),
					issue:req.param('issue'),
					callbkdte:req.param('callbkdte')+' '+req.param('callbktime') || '00:00',
					initcall:req.param('initcall') || false,
					workedby:req.session.user.user,
					escato:req.param('agentescato'),
					type:req.param('agenttype'),
					miscdesc:req.param('miscdesc'),
					escaldte:req.param('issue')=='escalated'? moment().format('YYYY-MM-DD h:mm:ss'):'',
					resolvdte:req.param('issue')=='resolved'? moment().format('YYYY-MM-DD h:mm:ss'):''},
					function( error, docs) {
                           if(docs.escato!=''){
                               AM.db.GetSocketsbyUser(docs[0].escato,function(e,o){
                                   //console.log('sockets for '+docs[0].escato+'\n\t'+o.toString());
                                   //var socket;
                                   if(o.length>0)
                                       for(var i =0;i<o.length;i++){
                                          // socket=o[i];
                                          sendQueuemsg(o[i],
                                      'Agent Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                           //io.sockets.socket(o[i]).emit('queue',
                                           //'Agent Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                       }
                               });
                           }                 
                                        
            //console.log(docs);
			res.redirect('/agents')
		});
	}
}); 
//UPDATE
app.post('/agents/:id',function(req,res){
		//console.log(req.session.cookie.maxAge/1000+" remaining");
		console.log(req.session.user);
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		agentprovider.findById(req.params.id,function(error,agent){
		agent.agentnum=req.body.agentnum;
		agent.agentname=req.body.agentname;
		agent.agentphone=req.body.agentphone;
		agent.addr.street=req.body.addrstreet;
		agent.addr.city=req.body.addrcity;
		agent.addr.state=req.body.addrstate;
		agent.addr.zip=req.body.addrzip;
		agent.contact=req.body.agentcontact;
		agent.callnum=req.body.callnum;
		agent.brand=req.body.brand;
		agent.acctnum=req.body.acctnum;
		agent.policynum=req.body.policynum;
		agent.workcomplete.phonepaymnts=req.body.phonepaymnts || false;
		agent.workcomplete.paystatreq=req.body.paystatreq || false;
		agent.workcomplete.morgcalls=req.body.morgcalls || false;
		agent.workcomplete.eftquestions=req.body.eftquestions || false;
		agent.workcomplete.endorsements=req.body.endorsements || false;
		agent.workcomplete.cancpolreq=req.body.cancpolreq || false;
		agent.workcomplete.reinst=req.body.reinst || false;
		agent.workcomplete.pifdscnt=req.body.pifdscnt || false;
		agent.workcomplete.pymntagrreqs=req.body.pymntagrreqs || false;
		agent.workcomplete.audspreadreq=req.body.audspreadreq || false;
		agent.workcomplete.misc=req.body.misc || false;
		agent.comments=req.body.agentcomment;
		agent.issue=req.body.issue;
        agent.initcall=req.body.initcall || false;
		agent.callbkdte=req.body.callbkdte+' '+req.body.callbktime || '00:00';
        agent.workedby=req.session.user.user;
		agent.escato=req.body.agentescato;
		agent.type = req.body.agenttype;
		agent.miscdesc = req.body.miscdesc;
		agent.escaldte = req.body.issue=='escalated'?agent.escaldte || moment().format('YYYY-MM-DD h:mm:ss'):'';
		agent.resolvdte= req.body.issue=='resolved'? moment().format('YYYY-MM-DD h:mm:ss'):'';
		agent.modifydte= moment().format('YYYY-MM-DD h:mm:ss');
		agent.modifyby = req.session.user.user;
		agent._id = req.params.id;
		agent.created_at=agent.created_at;
		//console.log(agent);
		agentprovider.update(agent,function(err,agents){
			if(err){
				console.log(err);
			}else{
                            
                            if(agents.escato!=''){
                               AM.db.GetSocketsbyUser(agents.escato,function(e,o){
                                   //console.log('sockets for '+docs[0].escato+'\n\t'+o.toString());
                                   //var socket;
                                   if(o.length>0)
                                       for(var i =0;i<o.length;i++){
                                          // socket=o[i];
                                          sendQueuemsg(o[i],
                                      'Agent Call has been placed in Queu by '+agents.workedby+'\n on '+agents.escaldte);
                                           //io.sockets.socket(o[i]).emit('queue',
                                           //'Agent Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                       }
                               });
                           }          
                        }
		  res.redirect('/agents')});

       });
	}
});
app.get('/agents/:id',function(req, res) {
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    agentprovider.findById(req.params.id, function(error, agent) {
        res.render('agent-show.jade',
        {
          title:'Contact Management and Tracking',agents:agent
        });
    });
  }
});
app.get('/insured_detail/:id',function(req, res) {
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    insuredprovider.findById(req.params.id, function(error,insurer) {
        res.render('insured-show.jade',
        {
          title:'Contact Management and Tracking',insured:insurer
        });
    });
  }
});

app.get('/agent_detail/:id',function(req, res) {
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    agentprovider.findById(req.params.id, function(error,agent) {
        res.render('agent-show.jade',
        {
          title:'Contact Management and Tracking',agentDtl:agent
        });
    });
  }
});
app.get('/search/agent/:id',function(req, res) {
//console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    agentprovider.findByAcct(req.params.id, function(error,history) {
        res.render('agent-history.jade',
        {
          title:'Search results for Acct '+req.params.id,historylist:history
        });
    });
  }
});
app.get('/search/agent/contact/:contact',function(req, res) {
//console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    agentprovider.findByContact(req.params.contact, function(error,history) {
        res.render('agent-history.jade',
        {
          title:'Search results for contact '+req.params.contact,historylist:history
        });
    });
  }
});
app.get('/search/agent/policy/:num',function(req, res) {
//console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    agentprovider.findByPolicy(req.params.num, function(error,history) {
        res.render('agent-history.jade',
        {
          title:'Search results for policy '+req.params.policy,historylist:history
        });
    });
  }
});
app.get('/search/agent/date/:dte',function(req, res) {
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    agentprovider.findByCreateDte(req.params.dte, function(error,history) {
        res.render('agent-history.jade',
        {
          title:'Search results for date '+req.params.dte,historylist:history
        });
    });
  }
});
app.get('/search/insured/:id',function(req, res) {
console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    insuredprovider.findByAcct(req.params.id, function(error,history) {
        res.render('insured-history.jade',
        {
          title:'Search results for Insured Acct number '+req.params.id,historylist:history
        });
    });
  }
});
app.get('/search/insured/date/:dte',function(req, res) {
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    insuredprovider.findByCreateDte(req.params.dte, function(error,history) {
        res.render('insured-history.jade',
        {
          title:'Search results for Insured date '+req.params.dte,historylist:history
        });
    });
  }
});
app.get('/search/insured/policy/:num',function(req, res) {
//console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    insuredprovider.findByPolicy(req.params.num, function(error,history) {
        res.render('insured-history.jade',
        {
          title:'Search results for Insured policy '+req.params.policy,historylist:history
        });
    });
  }
});
app.get('/search/insured/contact/:contact',function(req, res) {
//console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    insuredprovider.findByContact(req.params.contact, function(error,history) {
        res.render('insured-history.jade',
        {
          title:'Search results for Insured contact '+req.params.contact,historylist:history
        });
    });
  }
});
app.get('/search/morgage/:id',function(req, res) {
//console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    morgageprovider.findByAcct(req.params.id, function(error,history) {
        res.render('morgage-history.jade',
        {
          title:'Search results for Acct '+req.params.id,historylist:history
        });
    });
  }
});
app.get('/search/morgage/date/:dte',function(req, res) {
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    morgageprovider.findByCreateDte(req.params.dte, function(error,history) {
        res.render('morgage-history.jade',
        {
          title:'Search results for date '+req.params.dte,historylist:history
        });
    });
  }
});
app.get('/search/morgage/contact/:contact',function(req, res) {
//console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    morgageprovider.findByContact(req.params.contact, function(error,history) {
        res.render('morgage-history.jade',
        {
          title:'Search results for contact '+req.params.contact,historylist:history
        });
    });
  }
});
app.get('/search/morgage/policy/:num',function(req, res) {
//console.log(req.session.user);
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    morgageprovider.findByPolicy(req.params.num, function(error,history) {
        res.render('morgage-history.jade',
        {
          title:'Search results for policy '+req.params.policy,historylist:history
        });
    });
  }
});
app.get('/morgage_detail/:id',function(req, res) {
if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
    morgageprovider.findById(req.params.id, function(error,morgage) {
        res.render('morgage-show.jade',
        {
          title:'Contact Management and Tracking',morgDtl:morgage
        });
    });
  }
});
  app.get('/morg-holder', function(req, res) {
		console.log(req.session.cookie.maxAge/1000+" remaining");
		console.log(req.session.user);
	if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
		} else{
			retrieveWorkList(req.session.user.user,function(error,response){
	  	  res.render('morg-holder.jade',
			{title:'Contact Management and tracking',
			 agents:response[0],
			 insurers:response[1],
			 morgages:response[2],
			 user:req.session.user.user,
			 security:req.session.user.seclevel})});
		}
  });
  
 app.get('/insured', function(req, res) {
	    console.log(req.session.cookie.maxAge/1000+" remaining");
		console.log(req.session.user);
	if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		retrieveWorkList(req.session.user.user,function(error,response){
	  	  res.render('insured.jade',
			{title:'Contact Management and tracking',agents:response[0],insurers:response[1],
				user:req.session.user.user,security:req.session.user.seclevel})});
	}
  });
 app.get('/queue', function(req, res) {
	    console.log(req.session.cookie.maxAge/1000+" remaining");
		console.log(req.session.user);
	if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		var useraccts = AM.accounts;
		retrieveQueue(req.session.user.user,function(error,response){
			console.log(response[1]);
	  	  res.render('queue.jade',
			{title:'Contact Management and tracking',agents:response[0],insurers:response[1],
				morgages:response[2],user:req.session.user.user,security:req.session.user.seclevel,users:useraccts})});
	}
  });
app.post('/user',function(req,res){
    if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		console.log(req.session.user);
		res.redirect('/');
	}   else{
			AM.db.findOne({user:req.param('loginid')},function(error,user){
				if(!user){
					AM.db.save({user: req.param('loginid'),
						email: req.param('email'),
						country:'USA',
						pass:req.param('pass'),
						seclevel:req.param('seclevel'),
						fname:req.param('fname'),
						lname:req.param('lname'),
						status:req.param('status'),
                                                sessionID:'',
                                                socketID:[]},
						function(error,accounts){
                        req.flash('info','User added with login '+req.param('loginid'))
                        res.render('admin.jade',{title:'Contact Management and tracking',user:req.session.user.user,
					     security:req.session.user.seclevel,users:accounts,infomsg:req.flash('info'),divVisible:true});
						/*Dump the updated users to file
						  This will be replaced with mongoDB*/
						dumpUsersArray(function (err) {  if (err) {  return console.log(err);  }});
						});
					}else{
                     req.flash('error','User already exists with login '+user.user)
                     res.render('admin.jade',{title:'Contact Management and tracking',user:req.session.user.user,
						security:req.session.user.seclevel,users:AM.accounts,msg:req.flash('error'),divVisible:true});
				}});
		}
});
app.post('/user/:id',function(req,res){
    if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		console.log(req.session.user);
		res.redirect('/');
	}   else{
			AM.db.update({user: req.param('loginid'),
						email: req.param('email'),
						country:'USA',
						pass:req.param('pass'),
						seclevel:req.param('seclevel'),
						fname:req.param('fname'),
						lname:req.param('lname'),
						status:req.param('status'),
                                                sessionID:'',
                                                socketID:[],
						_id:req.param('user_id'),
						created_at:''},
						function(error,accounts){
					if(accounts){
                        req.flash('info','User updated with login '+req.param('loginid'))
                        res.render('admin.jade',{title:'Contact Management and tracking',user:req.session.user.user,
					     security:req.session.user.seclevel,users:accounts,infomsg:req.flash('info'),divVisible:true});
						/*Dump the updated users to file
						  This will be replaced with mongoDB*/
						dumpUsersArray(function (err) {  if (err) {  return console.log(err);  }});
					}else{
                     req.flash('error','User not found with login '+user.user)
                     res.render('admin.jade',{title:'Contact Management and tracking',user:req.session.user.user,
						security:req.session.user.seclevel,users:AM.accounts,msg:req.flash('error'),divVisible:true});
				}});
		}
});


app.post('/insured',function(req,res){
		//console.log(req.param);
		console.log(req.session.user);
 if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		console.log(req.session.user);
		res.redirect('/');
	}   else{
	insuredprovider.save({insuredfname: req.param('insuredfname'),
					insuredlname: req.param('insuredlname'),
					insuredphone:req.param('insuredphone'),
					addr:{street:req.param('insaddrstreet'),
					city:req.param('insaddrcity'),
					state:req.param('insaddrstate'),
					zip:req.param('insaddrzip')},
					contact:req.param('inscontact'),
					callnum:req.param('inscallnum'),
					brand:req.param('insbrand'),
					insacctnum:req.param('insacctnum'),
					policynum:req.param('inspolicynum'),
					workcomplete:{phonepaymnts:req.param('insphonepaymnts')||false,
					paystatreq:req.param('inspaystatreq')||false,
					morgcalls:req.param('insmorgcalls')||false,
					eftquestions:req.param('inseftquestions')||false,
					endorsements:req.param('insendorsements')||false,
					cancpolreq:req.param('inscancpolreq')||false,
					reinst:req.param('insreinst')||false,
					pifdscnt:req.param('inspifdscnt')||false,
					pymntagrreqs:req.param('inspymntagrreqs')||false,
					audspreadreq:req.param('insaudspreadreq')||false,
					misc:req.param('insmisc')||false},
					comments:req.param('inscomment'),
					issue:req.param('insissue'),
					callbkdte:req.param('inscallbkdte')+' '+req.param('inscallbktime') || '00:00',
					initcall:req.param('insinitcall')||false,
					workedby:req.session.user.user,
					escato:req.param('insescato'),
					type:req.param('instype'),
					miscdesc:req.param('insmiscdesc'),
					escaldte:req.param('issue')=='escalated'?moment().format('YYYY-MM-DD h:mm:ss'):'',
					resolvdte:req.param('issue')=='resolved'?moment().format('YYYY-MM-DD h:mm:ss'):''}, 
					function( error, docs) {
                                           if(docs.escato!=''){
                                                AM.db.GetSocketsbyUser(docs[0].escato,function(e,o){
                                                    //console.log('sockets for '+docs[0].escato+'\n\t'+o.toString());
                                                    //var socket;
                                            if(o.length>0){
                                                for(var i =0;i<o.length;i++){
                                                    // socket=o[i];
                                                    sendQueuemsg(o[i],
                                                 'Insurer Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                                 //io.sockets.socket(o[i]).emit('queue',
                                                //'Agent Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                                    }
                                                }
                                            });
                                        }           
                                        
					res.redirect('/agents')
				});
	}
}); 
app.post('/insured/:id',function(req,res){
		console.log(req.session.cookie.maxAge/1000+" remaining");
		console.log(req.session.user);
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		insuredprovider.findById(req.params.id,function(error,insured){
		insured.acctnum=req.body.insacctnum;
		insured.policynum=req.body.inspolicynum;
		insured.insuredfname=req.body.insuredfname;
		insured.insuredlname=req.body.insuredlname;
		insured.insuredphone=req.body.insuredphone;
		insured.addr.street=req.body.insaddrstreet;
		insured.addr.city=req.body.insaddrcity;
		insured.addr.state=req.body.insaddrstate;
		insured.addr.zip=req.body.insaddrzip;
		insured.contact=req.body.inscontact;
		insured.callnum=req.body.inscallnum;
		insured.brand=req.body.insbrand;
		insured.workcomplete.phonepaymnts=req.body.insphonepaymnts || false;
		insured.workcomplete.paystatreq=req.body.inspaystatreq || false;
		insured.workcomplete.morgcalls=req.body.insmorgcalls || false;
		insured.workcomplete.eftquestions=req.body.inseftquestions || false;
		insured.workcomplete.endorsements=req.body.insendorsements || false;
		insured.workcomplete.cancpolreq=req.body.inscancpolreq || false;
		insured.workcomplete.reinst=req.body.insreinst || false;
		insured.workcomplete.pifdscnt=req.body.inspifdscnt || false;
		insured.workcomplete.pymntagrreqs=req.body.inspymntagrreqs || false ;
		insured.workcomplete.audspreadreq=req.body.insaudspreadreq || false;
		insured.workcomplete.misc=req.body.insmisc || false;
		insured.comments=req.body.inscomment;
		insured.issue=req.body.insissue;
        insured.initcall=req.body.insinitcall || false;
		insured.callbkdte=req.body.inscallbkdte+' '+req.body.inscallbktime || '00:00';
        insured.workedby=req.session.user.user;
		insured.escato=req.body.insescato;
		insured.type = req.body.instype;
		insured.miscdesc = req.body.insmiscdesc;
		insured.escaldte = req.body.insissue=='escalated'?insured.escaldte || new Date():'';
		insured.resolvdte= req.body.insissue=='resolved'? new Date():'';
		insured.modifydte= moment().format('YYYY-MM-DD h:mm:ss');
		insured.modifyby = req.session.user.user;
		insured._id = req.params.id
		insured.created_at=insured.created_at
		console.log(insured);
		insuredprovider.update(insured,function(err,docs){
                    if(docs.escato!=''){
                               AM.db.GetSocketsbyUser(docs.escato,function(e,o){
                                   //console.log('sockets for '+docs[0].escato+'\n\t'+o.toString());
                                   //var socket;
                                   if(o.length>0){
                                       for(var i =0;i<o.length;i++){
                                          // socket=o[i];
                                          sendQueuemsg(o[i],
                                      'Insurer Call has been placed in Queu by '+docs.workedby+'\n on '+docs.escaldte);
                                           //io.sockets.socket(o[i]).emit('queue',
                                           //'Agent Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                       }
                                   }
                               });
                           }          
		  res.redirect('/agents')});

       });
	}
});
app.post('/morgage',function(req,res){
		//console.log(req.param);
		console.log(req.session.user);
 if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
		//console.log(req.session.user);
		res.redirect('/');
	}   else{
	morgageprovider.save({
					morgagename: req.param('morgname'),
					morgagephone: req.param('morgphone'),
					addr:{street:req.param('morgaddrstreet'),
					city:req.param('morgaddrcity'),
					state:req.param('morgaddrstate'),
					zip:req.param('morgaddrzip')},
					contact:req.param('morgcontact'),
					callnum:req.param('morgcallnum'),
					brand:req.param('morgbrand'),
					acctnum:req.param('morgacctnum'),
					policynum:req.param('morgpolicynum'),
					workcomplete:{phonepaymnts:req.param('morgphonepaymnts') || false,
					paystatreq:req.param('morgpaystatreq') || false,
					morgcalls:req.param('morgmorgcalls') || false,
					eftquestions:req.param('morgeftquestions') || false,
					endorsements:req.param('morgendorsements') || false,
					cancpolreq:req.param('morgcancpolreq') || false,
					reinst:req.param('morgreinst') || false,
					pifdscnt:req.param('morgpifdscnt') || false,
					pymntagrreqs:req.param('morgpymntagrreqs') || false,
					audspreadreq:req.param('morgaudspreadreq') || false,
					misc:req.param('morgmisc') || false},
					comments:req.param('morgcomment'),
					issue:req.param('morgissue'),
					callbkdte:req.param('morgcallbkdte')+' '+req.param('morgcallbktime') || '00:00',
					initcall:req.param('morginitcall') || false,
					workedby:req.session.user.user,
					escato:req.param('morgescato'),
					type:req.param('morgtype'),
					miscdesc:req.param('morgmiscdesc'),
					escaldte:req.param('morgissue')=='escalated'?moment().format('YYYY-MM-DD h:mm:ss'):'',
					resolvdte:req.param('morgissue')=='resolved'?moment().format('YYYY-MM-DD h:mm:ss'):''},
					function( error, docs) {
                                            if(docs.escato!=''){
                                                AM.db.GetSocketsbyUser(docs[0].escato,function(e,o){
                                                //console.log('sockets for '+docs[0].escato+'\n\t'+o.toString());
                                                //var socket;
                                                if(o.length>0){
                                                    for(var i =0;i<o.length;i++){
                                                     // socket=o[i];
                                                        sendQueuemsg(o[i],
                                                        'Morgage Holder Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                                        //io.sockets.socket(o[i]).emit('queue',
                                                        //'Agent Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                                        }
                                                }
                                                });
                                            }          
                      

			res.redirect('/agents')
		});
	}
});
app.post('/morgage/:id',function(req,res){
		console.log(req.session.cookie.maxAge/1000+" remaining");
		console.log(req.session.user);
	if (req.session.user == null){
// if user is not logged-in redirect back to login page //
		res.redirect('/');
	}   else{
		morgageprovider.findById(req.params.id,function(error,morgage){
		morgage.acctnum=req.body.morgacctnum;
        morgage.policynum=req.body.morgpolicynum;
		morgage.morgagename=req.body.morgname;
		morgage.morgagephone=req.body.morgphone;
		morgage.addr.street=req.body.morgaddrstreet;
		morgage.addr.city=req.body.morgaddrcity;
		morgage.addr.state=req.body.morgaddrstate;
		morgage.addr.zip=req.body.morgaddrzip;
		morgage.contact=req.body.morgcontact;
		morgage.callnum=req.body.morgcallnum;
		morgage.brand=req.body.morgbrand;
		morgage.workcomplete.phonepaymnts=req.body.morgphonepaymnts || false;
		morgage.workcomplete.paystatreq=req.body.morgpaystatreq || false;
		morgage.workcomplete.morgcalls=req.body.morgmorgcalls || false;
		morgage.workcomplete.eftquestions=req.body.morgeftquestions || false;
		morgage.workcomplete.endorsements=req.body.morgendorsements || false;
		morgage.workcomplete.cancpolreq=req.body.morgcancpolreq || false;
		morgage.workcomplete.reinst=req.body.morgreinst || false;
		morgage.workcomplete.pifdscnt=req.body.morgpifdscnt || false;
		morgage.workcomplete.pymntagrreqs=req.body.morgpymntagrreqs || false;
		morgage.workcomplete.audspreadreq=req.body.morgaudspreadreq || false;
		morgage.workcomplete.misc=req.body.morgmisc || false;
		morgage.comments=req.body.morgcomment;
		morgage.issue=req.body.morgissue;
        morgage.initcall=req.body.morginitcall || false;
		morgage.callbkdte=req.body.morgcallbkdte+' '+req.body.morgcallbktime || '00:00';
        morgage.workedby=req.session.user.user;
		morgage.escato=req.body.morgescato;
		morgage.type = req.body.morgtype;
		morgage.miscdesc = req.body.morgmiscdesc;
		morgage.escaldte = req.body.morgissue=='escalated'?morgage.escaldte || moment().format('YYYY-MM-DD h:mm:ss'):'';
		morgage.resolvdte= req.body.morgissue=='resolved'? moment().format('YYYY-MM-DD h:mm:ss'):'';
		morgage.modifydte= moment().format('YYYY-MM-DD h:mm:ss');
		morgage.modifyby = req.session.user.user;
		morgage._id = req.params.id
		morgage.created_at=morgage.created_at
		console.log(morgage);
		morgageprovider.update(morgage,function(err,docs){
                    if(docs.escato!='' && req.body.morgissue=='escalated'){
                               AM.db.GetSocketsbyUser(docs.escato,function(e,o){
                                   //console.log('sockets for '+docs[0].escato+'\n\t'+o.toString());
                                   //var socket;
                                   if(o.length>0){
                                       for(var i =0;i<o.length;i++){
                                          // socket=o[i];
                                          sendQueuemsg(o[i],
                                      'Morgage Holder Call has been placed in Queu by '+docs.workedby+'\n on '+docs.escaldte);
                                           //io.sockets.socket(o[i]).emit('queue',
                                           //'Agent Call has been placed in Queu by '+docs[0].workedby+'\n on '+docs[0].escaldte);
                                       }
                                   }
                               });
                           }          
		  res.redirect('/agents')});

       });
	}
});
app.get('/user-upload',function(req,res){
	if (req.session.user == null){
		// if user is not logged-in redirect back to login page //
		res.redirect('/');
		}else{
		res.render('user-upload.jade',{title:'Contact Management and tracking'});
		}
 });

app.post('/user-upload',function(req,res,next){
     if(!req){
      res.render('404.jade');
     }else{
		if(req.body.ftype=='csv') /*CSV file not implemented yet*/
			{
				req.flash('error','CSV file is not supported in Development');
				res.render('user-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
				return;
			}
			fs.readFile(req.files.userfile.path,'utf8',function(err,data){
				if (err){
					req.flash('error','There was an error with the file; Please verify');
					res.render('user-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
					return console.log(err);
					}
				try{
					var user_upload = JSON.parse(data);
					}catch(e){
						req.flash('error','The file was not valid JSON.Please verify');
						res.render('user-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
						return console.log(e);
						
					}
				if(user_upload.length==0){
				console.log('Error with data in file');
				}else{
					var counter = 1;
					for(var i=0;i<user_upload.length;i++){
						AM.db.updateObj(user_upload[i],function(err,user){
							if(err){
							req.flash('error','Import stopped due to error in record '+counter);
							res.render('user-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
							 return console.log(err);
							}	
						});
						counter++;
					}
					/*Sync the agentprovider counter to the number of records */
					if(AM.db.accountCounter<counter){
						AM.db.SetCounter(counter);
						console.log('agentCounter now set to '+AM.db.accountCounter);
					}
					req.flash('info',counter+' records were imported using backup');
					res.render('user-upload.jade',{title:'Contact Management and tracking',infomsg:req.flash('info')});
				}
			//console.log(data);
			});
		
		
   }
});
app.get('/agent-upload',function(req,res){
	if (req.session.user == null){
		// if user is not logged-in redirect back to login page //
		res.redirect('/');
		}else{
		res.render('agent-upload.jade',{title:'Contact Management and tracking'});
		}
 });
app.post('/agent-upload',function(req,res,next){
   if(!req){
      res.render('404.jade');
     }else{
		if(req.body.ftype=='csv') /*CSV file not implemented yet*/
			{
				req.flash('error','CSV file is not supported in Development');
				res.render('agent-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
				return;
			}
			fs.readFile(req.files.agentfile.path,'utf8',function(err,data){
				if (err){
					req.flash('error','There was an error with the file; Please verify');
					res.render('agent-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
					return console.log(err);
					}
				try{
					var agent_upload = JSON.parse(data);
					}catch(e){
						req.flash('error','The file was not valid JSON.Please verify');
						res.render('agent-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
						return console.log(e);
						
					}
				if(agent_upload.length==0){
				console.log('Error with data in file');
				}else{
					var counter = 1;
					for(var i=0;i<agent_upload.length;i++){
						agentprovider.update(agent_upload[i],function(err,agents){
							if(err){
							req.flash('error','Import stopped due to error in record '+counter);
							res.render('agent-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
							 return console.log(err);
							}	
						});
						counter++;
					}
					/*Sync the agentprovider counter to the number of records */
					if(agentprovider.agentCounter<counter){
						agentprovider.SetCounter(counter);
						console.log('agentCounter now set to '+agentprovider.agentCounter);
					}
					req.flash('info',counter+' records were imported using backup');
					res.render('agent-upload.jade',{title:'Contact Management and tracking',infomsg:req.flash('info')});
				}
			//console.log(data);
			});
		
		
   }
});
app.get('/insured-upload',function(req,res){
	if (req.session.user == null){
		// if user is not logged-in redirect back to login page //
		res.redirect('/');
		}else{
		res.render('insured-upload.jade',{title:'Contact Management and tracking'});
		}
 });
app.post('/insured-upload',function(req,res,next){
   if(!req){
      res.render('404.jade');
     }else{
		if(req.body.ftype=='csv') /*CSV file not implemented yet*/
			{
				req.flash('error','CSV file is not supported in Development');
				res.render('insured-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
				return;
			}
			fs.readFile(req.files.insfile.path,'utf8',function(err,data){
				if (err){
					req.flash('error','There was an error with the file; Please verify');
					res.render('insured-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
					return console.log(err);
					}
				try{
					var ins_upload = JSON.parse(data);
					}catch(e){
						req.flash('error','The file was not valid JSON.Please verify');
						res.render('insured-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
						return console.log(e);
						
					}
				if(ins_upload.length==0){
				console.log('Error with data in file');
				}else{
					var counter = 1;
					for(var i=0;i<ins_upload.length;i++){
						insuredprovider.update(ins_upload[i],function(err,insured){
							if(err){
							req.flash('error','Import stopped due to error in record '+counter);
							res.render('insured-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
							 return console.log(err);
							}	
						});
						counter++;
					}
					/*Sync the agentprovider counter to the number of records */
					if(insuredprovider.insuredCounter<counter){
						insuredprovider.SetCounter(counter);
						console.log('insuredCounter now set to '+insuredprovider.insuredCounter);
					}
					req.flash('info',counter+' records were imported using backup');
					res.render('insured-upload.jade',{title:'Contact Management and tracking',infomsg:req.flash('info')});
				}
			//console.log(data);
			});
		
		
   }
});
app.get('/morgage-upload',function(req,res){
	if (req.session.user == null){
		// if user is not logged-in redirect back to login page //
		res.redirect('/');
		}else{
		res.render('morgage-upload.jade',{title:'Contact Management and tracking'});
		}
 });
app.post('/morgage-upload',function(req,res,next){
  if(!req){
      res.render('404.jade');
     }else{
		if(req.body.ftype=='csv') /*CSV file not implemented yet*/
			{
				req.flash('error','CSV file is not supported in Development');
				res.render('morgage-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
				return;
			}
			fs.readFile(req.files.morgfile.path,'utf8',function(err,data){
				if (err){
					req.flash('error','There was an error with the file; Please verify');
					res.render('morgage-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
					return console.log(err);
					}
				try{
					var morg_upload = JSON.parse(data);
					}catch(e){
						req.flash('error','The file was not valid JSON.Please verify');
						res.render('morgage-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
						return console.log(e);
						
					}
				if(morg_upload.length==0){
				console.log('Error with data in file');
				}else{
					var counter = 1;
					for(var i=0;i<morg_upload.length;i++){
						morgageprovider.update(morg_upload[i],function(err,morgages){
							if(err){
							req.flash('error','Import stopped due to error in record '+counter);
							res.render('morgage-upload.jade',{title:'Contact Management and tracking',msg:req.flash('error')});
							 return console.log(err);
							}	
						});
						counter++;
					}
					/*Sync the agentprovider counter to the number of records */
					if(morgageprovider.morgageCounter<counter){
						morgageprovider.SetCounter(counter);
						console.log('morgageCounter now set to '+morgageprovider.morgageCounter);
					}
					req.flash('info',counter+' records were imported using backup');
					res.render('morgage-upload.jade',{title:'Contact Management and tracking',infomsg:req.flash('info')});
				}
			//console.log(data);
			});
		
		
   }
});


};
