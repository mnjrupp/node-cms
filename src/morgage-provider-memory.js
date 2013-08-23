//morgageprovider-memory.js
//var morgageCounter=1;
var moment = require('moment');
morgageProvider=function(){};
morgageProvider.prototype.dummyData=[];
morgageProvider.prototype.morgageCounter=1;
morgageProvider.prototype.SetCounter=function(indx){
 this.morgageCounter=indx;
};
morgageProvider.prototype.findAll=function(callback){
 callback(null,this.dummyData)
 };
 
 morgageProvider.prototype.findById=function(id,callback){
  var result = null;
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i]._id==id){
    result=this.dummyData[i];
	break;
   }
  }
 callback(null,result);
};
morgageProvider.prototype.findByIssue=function(type,callback){
var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].issue==type){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
morgageProvider.prototype.findByRepAll=function(repid,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].workedby==repid){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
morgageProvider.prototype.findByAcct=function(acct,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].acctnum==acct){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
morgageProvider.prototype.findByContact=function(contact,callback){
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
morgageProvider.prototype.findByPolicy=function(polnum,callback){
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
morgageProvider.prototype.findByCreateDte=function(dte,callback){
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
morgageProvider.prototype.findByCreateModDte=function(dte,callback){
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
morgageProvider.prototype.findByQueue=function(repid,callback){
  var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].escato==repid && this.dummyData[i].issue=='escalated'){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
morgageProvider.prototype.update=function(morgage,callback){
 for (var i in this.dummyData){
    if (this.dummyData[i]._id==morgage._id){
		this.dummyData.splice(i,1);
		break;
     }
}
 this.dummyData[this.dummyData.length]=morgage;
   callback(null,morgage);
};
morgageProvider.prototype.save=function(morgages,callback){
 var morgage=null;
 
 if(typeof(morgages.length)=="undefined")
  morgages = [morgages];

 for(var i=0;i<morgages.length;i++){
  morgage=morgages[i];
	morgage._id=this.morgageCounter++;
	morgage.created_at = moment().format('YYYY-MM-DD h:mm:ss');
	 
		this.dummyData[this.dummyData.length]=morgage;
		//console.log(this.dummyData);
		}
	callback(null,morgages);
	};
	/* bootstrap with dummy data*/
	new morgageProvider().save([
	{morgagename: 'Prudential', morgagephone: '8008035232', addr:{street:'Cty C', city:'Hartford',state:'CT',zip:'35678'},
		contact:'Jerry',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:false,paystatreq:false,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:true,audspreadreq:false,misc:false},comments:'Whatever!',issue:'open',
		callbkdte:'2012-10-10 09:00:00',initcall:false,workedby:'admin',escato:'',type:0,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''},
	{morgagename: 'Lynda',morgagephone: '8005555555', addr:{street:'434 Parklane', city:'Milwaukee',state:'WI',zip:'53530'},
		contact:'John Smythe',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:true,paystatreq:true,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:false,audspreadreq:false,misc:false},comments:'Call John on his cell',issue:'open',
		callbkdte:'2012-10-10 09:00:00',initcall:true,workedby:'admin',escato:'',type:0,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''},
	{morgagename: 'Mike',morgagephone: '8006487656', addr:{street:'34 Orchard Rd', city:'Madison',state:'WI',zip:'53530'},
		contact:'Sarah',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:false,paystatreq:false,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:false,audspreadreq:false,misc:false},comments:'Whatever!',issue:'escalated',
		callbkdte:'2012-10-10 09:00:00',initcall:false,workedby:'admin',escato:'',type:0,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''}],function(error,morgages){});
	exports.morgageProvider=morgageProvider;