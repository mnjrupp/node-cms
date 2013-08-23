
//var bcrypt = require('bcrypt');
//console.log(__dirname);
var passwordHash = require('../../../node_modules/password-hash/lib/password-hash');
// use moment.js for pretty date-stamping //
var moment = require('moment');

Db = function(){}; //require('mongodb').Db;
//var Server = require('mongodb').Server;

// var dbPort = 27017;
// var dbHost = global.host;
// var dbName = 'login-testing';
Db.prototype.accountCounter=1;
Db.prototype.dummyData = [];
Db.prototype.SetCounter=function(indx){
 this.accountCounter=indx;
};
Db.prototype.findOne = function(o,callback){
	var result = null;
//console.log(o.user);
  for(var i =0;i<this.dummyData.length;i++) {
   //console.log(this.dummyData[i]);
    //console.log(Object.keys(o)=='user');
   if(Object.keys(o)=='user'){
        //console.log(this.dummyData[i]+" == "+o.user);
		if( this.dummyData[i].user == o.user) {
		  result = this.dummyData[i];
			//console.log(result);
		  break;
		}
	}else if(Object.keys(o)=='email'){
		if( this.dummyData[i].email == o.email) {
		  result = this.dummyData[i];
		  break;
		}
  }
}
  callback(null, result);
};
Db.prototype.updatePass = function(o,callback){
	var result = null;
	for(var i =0;i<this.dummyData.length;i++) {
		if( this.dummyData[i].user == o.user) {
			this.dummyData[i].pass = o.pass;
			result = this.dummyData[i];
			break;
		}
	}
	callback(null,result);
};
Db.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};
Db.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(result);
};
Db.prototype.update=function(user,callback){
 var returnedAccts = null;
 for (var i =0;i<this.dummyData.length;i++){
	console.log(this.dummyData[i]);
    if (this.dummyData[i].user==user.user){
      /* Use the same created date when updating*/
      user.created_at = this.dummyData[i].created_at;
      /*Need to check for password in newdata*/
		//console.log('user password == '+user.pass);
      if(user.pass==''){
			//console.log('dummyData[i].pass = '+this.dummyData[i].pass);
			user.pass=this.dummyData[i].pass;
		}else{
			user.pass = passwordHash.generate(user.pass);
		}
		//console.log('user password now == '+user.pass);
		this.dummyData.splice(i,1);
        this.dummyData[this.dummyData.length]=user;
        returnedAccts = this.dummyData;
		break;
     }
}
 
   callback(null,returnedAccts);
};

Db.prototype.updateObj=function(user,callback){
 for (var i in this.dummyData){
    if (this.dummyData[i]._id==user._id){
		this.dummyData.splice(i,1);
		break;
     }
}
 this.dummyData[this.dummyData.length]=user;
   callback(null,user);
};
Db.prototype.save = function(accounts, callback) {
  var account = null;

  if( typeof(accounts.length)=="undefined")
    accounts= [accounts];

  for( var i =0;i< accounts.length;i++ ) {
    account = accounts[i];
   //console.log(account);
    account._id = this.accountCounter++;
    account.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
    // account.name = accounts.name;
    // account.email = accounts.email;
    // account.country = accounts.country;
     hash= passwordHash.generate(account.pass);
     account.pass = hash;
    this.dummyData[this.dummyData.length]= account;
    //console.log(this.dummyData);
  }
  callback( null, this.dummyData );
};
// Bootstrap the admin login and password
var dummyDB = new Db;
dummyDB.save([
  {user: 'admin', email: 'mnjrupp@hotmail.com',country:'USA',pass:'lollipop%&1',seclevel:9,fname:'admin',lname:'admin',status:1,sessionID:'',socketID:''},
	{user:'test',email:'vbmrupp@gmail.com',country:'USA',pass:'test%&1',seclevel:0,fname:'one',lname:'last',status:0,sessionID:'',socketID:''},
    {user:'escalate',email:'vbmrupp@gmail.com',country:'USA',pass:'pass123',seclevel:8,fname:'top',lname:'secret',status:1,sessionID:'',socketID:''} ], function(error, accounts){});
  
//console.log(dummyDB.dummyData);
var AM = {}; 
	AM.db = dummyDB;
	
AM.accounts = AM.db.dummyData;//.collection('accounts');

module.exports = AM;

// logging in //

AM.autoLogin = function(user, pass, callback)
{
	AM.db.findOne({user:user}, function(e, o) {
		if (o){
			o.pass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

AM.manualLogin = function(user, pass, callback)
{
	AM.db.findOne({user:user}, function(e, o) {
		if (o == null){
            console.log('user-not-found');
			callback('user-not-found');
		}	else{
			if(passwordHash.verify(pass,o.pass)){
                if(o.status==1){
					callback(null,o);
				}else{
					callback('acct-disabled');
					}
			}else{
                   callback('invalid-password');
				}
			
		}
	});
}

// record insertion, update & deletion methods //

AM.signup = function(newData, callback)
{
	AM.db.findOne({user:newData.user}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			AM.db.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
					hash = passwordHash.generate(newData.pass)
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						AM.db.insert(newData, callback(null));
				}
			});
		}
	});
}

AM.disableAcct = function(id,callback)
{
  AM.db.findById(id,function(account){
    if(account){
     account.status = 0;
     AM.update(account,function(o){
		callback(o);});
    }else
     callback(account);
   });    
}
// AM.update = function(newData, callback)
// {
	// AM.db.findOne({user:newData.user}, function(e, o){
		// o.user 		= newData.user;
        // o.fname     = newData.fname;
        // o.lname     = newData.lname;
		// o.email 	= newData.email;
		// o.country 	= newData.country;
        // o.seclevel  = newData.seclevel;
        // o.status    = newData.status;
		// if (newData.pass == ''){
			// AM.db.save(o); callback(o);
		// }	else{
			// hash = passwordHash.generate(newData.pass)
				// o.pass = hash;
				// AM.db.save(o); callback(o);
		
		// }
	// });
// }

AM.update = function(newData,callback)
{
   
	AM.db.update(newData,function(e,o){
    callback(o);

  });
}
AM.changePassword = function(userid,oldp,newp,callback){
	AM.db.findOne({user:userid}, function(e, o) {
		if (o == null){
            console.log('user-not-found');
			callback('user-not-found');
			}else{
			if(passwordHash.verify(oldp,o.pass)){
                if(o.status==1){
					 hash= passwordHash.generate(newp);
					 o.pass = hash;
					AM.db.updatePass(o,function(e,o){
						if(o==null){
							callback('user-not-found');
							}else{
							callback(null,o);
							}
						});
				}else{
					callback('acct-disabled');
					}
			}else{
                   callback('invalid-password');
				}
			}
		});

};
AM.setPassword = function(email, newPass, callback)
{
	AM.db.findOne({email:email}, function(e, o){
		hash = passwordHash.generate(newData.pass)
				o.pass = hash;
				AM.db.save(o); callback(o);	
	});
}

AM.validateLink = function(email, passHash, callback)
{
	AM.db.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}


AM.delete = function(id, callback)
{
	AM.accounts.splice(id,1);
	callback(null);
}

// auxiliary methods //

AM.getEmail = function(email, callback)
{
	AM.db.findOne({email:email}, function(e, o){ callback(o); });
}

// AM.getObjectId = function(id)
// {
	// return AM.accounts.db.bson_serializer.ObjectID.createFromHexString(id)
// }

AM.getAllRecords = function(callback)
{
	// AM.accounts.find().toArray(
		// function(e, res) {
		// if (e) callback(e)
		// else callback(null, res)
	// });
   callback(AM.accounts);
};

AM.delAllRecords = function(id, callback)
{
	AM.db.remove(); // reset accounts collection for testing //
	while(AM.db.dummyData.length > 1) {
        //remove the last item:
        myArray.splice(myArray.length - 1, 1);
		
	}
   AM.db.accountCounter = 1;
}

// just for testing - these are not actually being used //

AM.findById = function(id, callback)
{
	return AM.db.findById(id,callback);
};


AM.findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	AM.db.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}
