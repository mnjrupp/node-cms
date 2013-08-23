//ReportProvider-memory.js
//var reportCounter=1;
var moment = require('moment');

/*******************************************
  RptEngine Structure
********************************************/
RptEngine = function(){};
RptEngine.prototype.compiledArr=[];
RptEngine.prototype.compileCounter=1;
RptEngine.prototype.Parse=function(query,callback){


};

RptEngine.prototype.Run=function(compiled,array,callback){


};
//Save the parsed query in an Array for faster performance
RptEngine.prototype.Compile=function(query,callback){
	var result=null
		tmpArr=this.compiledArr;
	//console.log(tmpArr);
	this.FindById(query._id,function(item){
		if(item){
			if(JSON.stringify(item)!=JSON.stringify(query)){
				query.modified_dte = moment().format('YYYY-MM-DD h:mm:ss');
				this.compiledArr[this.compiledArr.length]=query;
				result=query;
			}else{
				result=query;
			}
		}else{
			query._id=this.compileCounter++;
			query.created_at = moment().format('YYYY-MM-DD h:mm:ss');
			query.modified_dte=null;
			//this.compiledArr[this.compiledArr.length]=query;
			//console.log(this);
			tmpArr.push(query);
			result=query;
			}
	});
	callback(result);
};

RptEngine.prototype.FindById=function(id,callback){
  var result = null;
  //console.log(this);
  for(var i=0;i<this.compiledArr.length;i++){
   if(this.compiledArr[i]._id==id){
    result=this.compiledArr[i];
	break;
   }
  }
 callback(null,result);
};
/*******************************************
 The End of RptEngine Structure
*******************************************/

ReportProvider=function(){};
ReportProvider.prototype.dummyData=[];
ReportProvider.prototype.reportEngine=new RptEngine();
ReportProvider.prototype.reportCounter=1;
ReportProvider.prototype.SetCounter=function(indx){
 this.reportCounter=indx;
};
ReportProvider.prototype.findAll=function(callback){
 callback(null,this.dummyData);
 };
 
 ReportProvider.prototype.findById=function(id,callback){
  var result = null;
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i]._id==id){
    result=this.dummyData[i];
	break;
   }
  }
 callback(null,result);
};

ReportProvider.prototype.findByCreateDte=function(dte,callback){
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

ReportProvider.prototype.findByName=function(rptname,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
    //console.log(moment(this.dummyData[i].created_at).format('YYYY-MM-DD'));
   if(this.dummyData[i].rptname==rptname){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};
ReportProvider.prototype.findByRepAll=function(repid,callback){
 var result = [];
  for(var i=0;i<this.dummyData.length;i++){
   if(this.dummyData[i].rptuser==repid){
    result.push(this.dummyData[i]);
	//break;
   }
  }
 callback(null,result);
};

ReportProvider.prototype.update=function(report,callback){
 for (var i in this.dummyData){
	if(report._id=='undefined')
		return callback('not a proper report object');
    if (this.dummyData[i]._id==report._id){
		this.dummyData.splice(i,1);
		break;
     }
}
 this.dummyData[this.dummyData.length]=report;
   callback(null,this.dummyData);
};
ReportProvider.prototype.save=function(reports,callback){
 var report=null;
 //console.log(this);
 if(typeof(reports.length)=="undefined")
  reports = [reports];

 for(var i=0;i<reports.length;i++){
  report=reports[i];
	report._id=this.reportCounter++;
	//report.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
	  report.created_at = moment().format('YYYY-MM-DD h:mm:ss');
	// if(report.comments===undefined)
		// report.comments=[];
	// for(var j=0;j<report.comments.length;j++){
		// report.comments[j].created_at = new Date();
		// }
		this.dummyData[this.dummyData.length]=report;
		this.reportEngine.Compile(report,function(e){/*console.log(e);*/});
		}
	callback(null,reports);
	};
	/* bootstrap with dummy data*/
	new ReportProvider().save([
	{selecttype:'agent',criteriafield1:'resolvdte',condition1:'between',criteriavalue1:'10/1/2012',criteriavalue2:'10/31/2012',bool1:'and'
      ,criteriafield2:'modifyby',condition2:'=',criteriavalue3:'vbmrupp',criteriavalue4:'',rptname:'myreport',rptuser:'admin'},
	{selecttype:'agent',criteriafield1:'acctnum',condition1:'contains',criteriavalue1:'BO',criteriavalue2:'',bool1:'and'
      ,criteriafield2:'modifyby',condition2:'=',criteriavalue3:'vbmrupp',criteriavalue4:'',rptname:'myreport2',rptuser:'admin'},
	{selecttype:'agent',criteriafield1:'escaldte',condition1:'between',criteriavalue1:'10/1/2012',criteriavalue2:'10/31/2012',bool1:''
      ,criteriafield2:'',condition2:'',criteriavalue3:'',criteriavalue4:'',rptname:'myreport3',rptuser:'admin'}],function(error,reports){});

exports.ReportProvider=ReportProvider;