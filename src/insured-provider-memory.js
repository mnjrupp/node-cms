//insuredprovider-memory.js
//var insuredCounter=1;
var moment = require('moment');
insuredProvider=function(){};
insuredProvider.prototype.dummyData=[];
insuredProvider.prototype.insuredCounter=1;
insuredProvider.prototype.SetCounter=function(indx){
 this.insuredCounter=indx;
};
insuredProvider.prototype.findAll=function(callback){
 callback(null,this.dummyData)
 };
 
 insuredProvider.prototype.findById=function(id,callback){
  var result = null;
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i]._id==id){
    result=this.dummyData[i];
	break;
   }
  }
 callback(null,result);
};
insuredProvider.prototype.findByIssue=function(type,callback){
var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].issue==type){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
insuredProvider.prototype.findByRepAll=function(repid,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].workedby==repid){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
insuredProvider.prototype.findByAcct=function(acct,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].acctnum==acct){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
insuredProvider.prototype.findByCreateDte=function(dte,callback){
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
insuredProvider.prototype.findByCreateModDte=function(dte,callback){
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
insuredProvider.prototype.findByContact=function(contact,callback){
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
insuredProvider.prototype.findByPolicy=function(polnum,callback){
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
insuredProvider.prototype.findByQueue=function(repid,callback){
  var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].escato==repid && this.dummyData[i].issue=='escalated'){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
insuredProvider.prototype.update=function(insured,callback){
 for (var i in this.dummyData){
    if (this.dummyData[i]._id==insured._id){
		this.dummyData.splice(i,1);
		break;
     }
}
 this.dummyData[this.dummyData.length]=insured;
   callback(null,this.dummyData);
};
insuredProvider.prototype.save=function(insureds,callback){
 var insured=null;
 
 if(typeof(insureds.length)=="undefined")
  insureds = [insureds];

 for(var i=0;i<insureds.length;i++){
  insured=insureds[i];
	insured._id=this.insuredCounter++;
	insured.created_at = moment().format('YYYY-MM-DD h:mm:ss');
	 
		this.dummyData[this.dummyData.length]=insured;
		//console.log(this.dummyData);
		}
	callback(null,insureds);
	};
	/* bootstrap with dummy data*/
	new insuredProvider().save([
	{insuredfname: 'Jerry',insuredlname:'Johnson', insuredphone: '8008035232', addr:{street:'Cty C', city:'Sun Prairie',state:'WI',zip:'53530'},
		contact:'Jerry',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:false,paystatreq:false,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:true,audspreadreq:false,misc:false},comments:'Whatever!',issue:'open',
		callbkdte:'2012-10-10 09:00:00',initcall:false,workedby:'admin',escato:'',type:0,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''},
	{insuredfname: 'Lynda',insuredlname:'Smythe', insuredphone: '8005555555', addr:{street:'434 Parklane', city:'Milwaukee',state:'WI',zip:'53530'},
		contact:'John Smythe',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:true,paystatreq:true,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:false,audspreadreq:false,misc:false},comments:'Call John on his cell',issue:'open',
		callbkdte:'2012-10-10 09:00:00',initcall:true,workedby:'admin',escato:'',type:1,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''},
	{insuredfname: 'Mike',insuredlname:'Brandon', insuredphone: '8006487656', addr:{street:'34 Orchard Rd', city:'Madison',state:'WI',zip:'53530'},
		contact:'Sarah',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:false,paystatreq:false,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:false,audspreadreq:false,misc:false},comments:'Whatever!',issue:'escalated',
        callbkdte:'2012-10-10 09:00:00',initcall:false,workedby:'admin',escato:'',type:2,miscdesc:'',resolvdte:'',escaldte:'',modifydte:'',modifyby:''}],function(error,insureds){});
	exports.insuredProvider=insuredProvider;