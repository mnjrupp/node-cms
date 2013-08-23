//insuredprovider-memory.js
var insuredCounter=1;
var moment = require('moment');
insuredProvider=function(){};
insuredProvider.prototype.dummyData=[];
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
	insured._id=insuredCounter++;
	insured.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
	 
		this.dummyData[this.dummyData.length]=insured;
		console.log(this.dummyData);
		}
	callback(null,insureds);
	};
	/* bootstrap with dummy data*/
	new insuredProvider().save([
	{insuredfname: 'Jerry',insuredlname:'Johnson', insuredphone: '8008035232', addr:{street:'Cty C', city:'Sun Prairie',state:'WI',zip:'53530'},
		contact:'Jerry',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:false,paystatreq:false,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:true,audspreadreq:false,misc:false},comments:'Whatever!',issue:'open',callbckdte:'2012-10-10 09:00:00',initcall:false,workedby:'admin',escato:''},
	{insuredfname: 'Lynda',insuredlname:'Smythe', insuredphone: '8005555555', addr:{street:'434 Parklane', city:'Milwaukee',state:'WI',zip:'53530'},
		contact:'John Smythe',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:true,paystatreq:true,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:false,audspreadreq:false,misc:false},comments:'Call John on his cell',issue:'open',callbckdte:'2012-10-10 09:00:00',initcall:true,workedby:'admin',escato:''},
	{insuredfname: 'Mike',insuredlname:'Brandon', insuredphone: '8006487656', addr:{street:'34 Orchard Rd', city:'Madison',state:'WI',zip:'53530'},
		contact:'Sarah',callnum:'',brand:'',acctnum:'',policynum:'',workcomplete:{phonepaymnts:false,paystatreq:false,morgcalls:false,eftquestions:false,
		endorsements:false,cancpolreq:false,reinst:false,pifdscnt:false,pymntagrreqs:false,audspreadreq:false,misc:false},comments:'Whatever!',issue:'escalated',callbckdte:'2012-10-10 09:00:00',initcall:false,workedby:'admin',escato:''}],function(error,insureds){});
	exports.insuredProvider=insuredProvider;