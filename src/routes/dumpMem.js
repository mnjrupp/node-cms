/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var path    = require('path')
    ,fs      = require('fs');

/* use fs to dump the arrays to files for back-up*/
exports.dumpMemoryArrays=function dumpMemoryArrays(callback){
 var bckdir = path.join(__dirname,'backups')
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
