node-cms
========

Simple  Contact Management System for call center tracking

  Used with Node.js. It provides a simple web-based call tracking
  utility.
  

      
      Requirements
      Node >= 0.8.9
      npm ; latest version
      Other dependencies which are found in the npm respository. Please see package.json in src folder.
 ..
 
      Installation
      1) Download src file onto your computer in desired path.
      2) cd to dir and run from cmd "npm install -d". This will install dependencies
      3) From cmd prompt in directory "node app-cms-sio-memory"
      4) Use favorite browser go to "http://localhost:3000"
      5) login using username:admin, password:lollipop%&1
 .. 
 
      Data Persistance
      At this time I'm using 3 in-memory Javascript Array of Objects.
      The 3 interfaces are.
       agentprovider-memory.js
       insured-provider-memory.js
       morgage-provider-memory.js
       Interfaces for MongoDB as well as DB2 are coming.
       
       To help in data persistance, it is using the cron for nodejs to schedule a flat file backup
       that can be used to import saved objects after a disaster into.
       The code to implement cron back-up is located in the app-cms-sio-memory.js file and is commented out by default.
       You will have to uncomment the following.
       ----------------------------------------
        var concron = new cronJob('00 00,07,10,20,30,35,40,45,50 * * * *', function(){
          r.dumpMemoryArrays(function(e,o){
	          });
          }, null, true);
       ----------------------------------------
 ..
 
      Client side libraries used.
       JQuery
       Socket IO
 Screen shots of app can be seen in the
     [Wiki](https://github.com/mnjrupp/node-cms/wiki)
    
        
