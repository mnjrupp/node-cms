//agentprovider-memory.js
//var agentCounter=1;
var moment = require('moment');
AgentProvider=function(){};
AgentProvider.prototype.dummyData=[];
AgentProvider.prototype.agentCounter=1;
AgentProvider.prototype.SetCounter=function(indx){
 this.agentCounter=indx;
};
AgentProvider.prototype.findAll=function(callback){
 callback(null,this.dummyData);
 };
 
 AgentProvider.prototype.findById=function(id,callback){
  var result = null;
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i]._id==id){
    result=this.dummyData[i];
	break;
   }
  }
 callback(null,result);
};
AgentProvider.prototype.findByQueue=function(repid,callback){
  var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].escato==repid && this.dummyData[i].issue=='escalated'){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
AgentProvider.prototype.findByAcct=function(acct,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].acctnum==acct){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
AgentProvider.prototype.findByCreateDte=function(dte,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
    //console.log(moment(this.dummyData[i].created_at).format('YYYY-MM-DD'));
   if(moment(this.dummyData[i].created_at).format('YYYY-MM-DD')==dte){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
AgentProvider.prototype.findByCreateModDte=function(dte,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
    //console.log(dte);
    //console.log(moment(this.dummyData[i].created_at).format('YYYY-MM-DD')==dte);
    //console.log(moment(this.dummyData[i].modifydte).format('YYYY-MM-DD')==dte);
   if(moment(this.dummyData[i].created_at).format('YYYY-MM-DD')==dte){
    result.push(this.dummyData[i]);
	//break;
   }
   if(this.dummyData[i].modifydte){
	 if(moment(this.dummyData[i].modifydte).format('YYYY-MM-DD')==dte){
     result.push(this.dummyData[i]);
		}
	}
 }
 callback(null,result);
};
AgentProvider.prototype.findByContact=function(contact,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
    //console.log(moment(this.dummyData[i].created_at).format('YYYY-MM-DD'));
   if(this.dummyData[i].contact==contact){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
AgentProvider.prototype.findByPolicy=function(polnum,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
    //console.log(moment(this.dummyData[i].created_at).format('YYYY-MM-DD'));
   if(this.dummyData[i].policynum==polnum){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
AgentProvider.prototype.findByRepAll=function(repid,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].workedby==repid){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
AgentProvider.prototype.findByIssue=function(issuetype,callback){
var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].issue==issuetype){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};

AgentProvider.prototype.update=function(agent,callback){
 for (var i in this.dummyData){
	if(agent._id=='undefined')
		return callback('not a proper agent object');
    if (this.dummyData[i]._id==agent._id){
		this.dummyData.splice(i,1);
		break;
     }
}
 this.dummyData[this.dummyData.length]=agent;
   callback(null,this.dummyData);
};
AgentProvider.prototype.save=function(agents,callback){
 var agent=null;
 
 if(typeof(agents.length)=="undefined")
  agents = [agents];

 for(var i=0;i<agents.length;i++){
  agent=agents[i];
	agent._id=this.agentCounter++;
	//agent.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
	  agent.created_at = moment().format('YYYY-MM-DD h:mm:ss');
	// if(agent.comments===undefined)
		// agent.comments=[];
	// for(var j=0;j<agent.comments.length;j++){
		// agent.comments[j].created_at = new Date();
		// }
		this.dummyData[this.dummyData.length]=agent;
		}
	callback(null,agents);
	};
	/* bootstrap with dummy data*/
	new AgentProvider().save([
	{agentnum: '06578',agentname:'JJ Agency', agentphone: '8008035232', addr:{street:'613 Mockingbird', city:'Sun Prairie',state:'WI',zip:'53530'},
		contact:'Bill',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:false,paystatreq:false,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:true,audspreadreq:false,misc:false},comments:'Whatever!',issue:'open',
		callbkdte:'2012-10-10 09:00:00',initcall:false,workedby:'admin',escato:'',type:0,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''},
	{agentnum: '09999',agentname:'Affinity', agentphone: '8005555555', addr:{street:'434 Parklane', city:'Milwaukee',state:'WI',zip:'53530'},
		contact:'John',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:true,paystatreq:true,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:false,audspreadreq:false,misc:false},comments:'Whatever!',issue:'open',
		callbkdte:'2012-10-10 09:00:00',initcall:true,workedby:'admin',escato:'',type:0,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''},
	{agentnum: '06434',agentname:'Brandon Bros', agentphone: '8006487656', addr:{street:'34 Orchard Rd', city:'Madison',state:'WI',zip:'53530'},
		contact:'Sarah',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:false,paystatreq:false,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:false,audspreadreq:false,misc:false},comments:'Whatever!',issue:'escalated',
		callbkdte:'2012-10-10 09:00:00',initcall:false,workedby:'test',escato:'',type:0,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''}],function(error,agents){});
	exports.AgentProvider=AgentProvider;