//RprtEngine.js
var moment = require('moment');
// var AgentProvider    = require('./agentprovider-memory').AgentProvider
	// ,InsuredProvider = require('./insured-provider-memory').insuredProvider
	// ,MorgageProvider = require('./morgage-provider-memory').morgageProvider
	// ,RptProvider     = require('./report-provider-memory').ReportProvider;

RptEngine = function(){};
RptEngine.prototype.compiledArr=[];
RptEngine.prototype.compileCounter=1;
RptEngine.prototype.Parse=function(query,callback){


};

RptEngine.prototype.Run=function(compiled,array,callback){


};
//Save the parsed query in an Array for faster performance
RptEngine.prototype.Compile=function(query,callback){
	var result=null;
	this.FindById(query._id,function(item){
		if(item){
			if(JSON.stringify(item)!=JSON.stringify(query){
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
			this.compiledArr[this.compiledArr.length]=query;
			result=query;
			}
	});
	callback(result);
};

RptEngine.prototype.FindById=function(id,callback){
  var result = null;
  for(var i=0;i<this.compiledArr.length;i++){
   if(this.compiledArr[i]._id==id){
    result=this.compiledArr[i];
	break;
   }
  }
 callback(null,result);
}