function formatDateISO(date){
 if(!date) return date;
 var dayofMonth = date.getDate();
 if(dayofMonth.length==1){dayofMonth='0'+dayofMonth;}
 var tmp = date.getFullYear()+'-'+date.getMonth()+'-'+dayofMonth;
};
function update_qmorg(morgagec){
	var classArr = ['phonepaymnts','paystatreq','morgcalls','eftquestions',
					'endorsements','cancpolreq','reinst','pifdscnt','pymntagrreqs','audspreadreq','misc'];
		
	var inputArr = ['morgname','morgphone','morgaddrstreet','morgaddrcity','morgaddrstate','morgaddrzip','morgcontact',
					'morgcallnum','morgbrand','morgacctnum','morgpolicynum','morgcomment','morgcallbkdte',
					'morgcallbktime','morgescato','morgtype','morgmiscdesc','morgcreatedte'];
					
	var agentArr = ['morgagec.morgagename','morgagec.morgagephone','morgagec.addr.street','morgagec.addr.city',
					'morgagec.addr.state','morgagec.addr.zip','morgagec.contact','morgagec.callnum','morgagec.brand','morgagec.acctnum',
					'morgagec.policynum','morgagec.comments','morgagec.callbkdte.substr(0,10)','morgagec.callbkdte.substr(11,5)',
					'morgagec.escato','morgagec.type','morgagec.miscdesc','morgagec.created_at'];
					
		var _div = jQuery('div.qmorgtab');
		for(i=0;i<classArr.length;i++){
			var evalStr = "morgagec.workcomplete."+classArr[i];
				_div.find(":input[name=morg"+classArr[i]+"]").attr("checked",eval(evalStr));
			}
		for(i=0;i<inputArr.length;i++){
			_div.find(':input[name='+inputArr[i]+']').val(eval(agentArr[i]));
		}
		switch(morgagec.issue){
			case 'open':
				_div.find(":input[value=open]").attr('checked', 'checked'); 
				break;
			case 'escalated':
				_div.find(":input[value=escalated]").attr('checked', 'checked'); 
				break;
			case 'resolved':
				_div.find(":input[value=resolved]").attr('checked', 'checked'); 
				break;
			default:
				_div.find(":input[value=open]").attr('checked', 'checked'); 
		}
	_div.find(":input[type=hidden]").val(morgagec._id);
	_div.find(":button[id=morgupdated]").attr("class","submitted");
    _div.find(":input[id=morgsubmitted]").attr("class","updated");
	jQuery('.qinsurtab').hide();
	jQuery('.qagenttab').hide();
	jQuery('.qmorgtab').show();
};
function update_qinsurer(insurerc){
	var classArr = ['phonepaymnts','paystatreq','morgcalls','eftquestions',
					'endorsements','cancpolreq','reinst','pifdscnt','pymntagrreqs','audspreadreq','misc'];
	var inputArr = ["insuredlname","insuredfname","insuredphone","insaddrstreet","insaddrcity","insaddrstate","insaddrzip",
					"inscomment","inscontact","inscallnum","insacctnum","inspolicynum","inscreatedte","inscallbkdte","inscallbktime",
					"insbrand"];
	var agentArr = ['insurerc.insuredlname','insurerc.insuredfname','insurerc.insuredphone','insurerc.addr.street','insurerc.addr.city'
					,'insurerc.addr.state','insurerc.addr.zip','insurerc.comments','insurerc.contact','insurerc.callnum','insurerc.acctnum',
					'insurerc.policynum','insurerc.created_at','insurerc.callbkdte.substr(0,10)','insurerc.callbkdte.substr(11,5)','insurerc.brand'];

	var _div = jQuery('div.qinsurtab');
		for(i=0;i<classArr.length;i++){
			var evalStr = "insurerc.workcomplete."+classArr[i];
				_div.find(":input[name=ins"+classArr[i]+"]").attr("checked",eval(evalStr));
			}
		for(i=0;i<inputArr.length;i++){
			_div.find(':input[name='+inputArr[i]+']').val(eval(agentArr[i]));
		}
		switch(insurerc.issue){
			case 'open':
				_div.find(":input[value=open]").attr('checked', 'checked'); 
				break;
			case 'escalated':
				_div.find(":input[value=escalated]").attr('checked', 'checked'); 
				break;
			case 'resolved':
				_div.find(":input[value=resolved]").attr('checked', 'checked'); 
				break;
			default:
				_div.find(":input[value=open]").attr('checked', 'checked'); 
		}
	_div.find(":input[type=hidden]").val(insurerc._id);
	_div.find(":button[id=insupdated]").attr("class","submitted");
    _div.find(":input[id=inssubmitted]").attr("class","updated");
	jQuery(".instype").val(insurerc.type);
    jQuery(".insescato").val(insurerc.escato);
    jQuery(".insmiscdesc").val(insurerc.miscdesc);
	jQuery('.qinsurtab').show();
	jQuery('.qagenttab').hide();
	jQuery('.qmorgtab').hide();

};
function update_qagent(agentc){
	var classArr = ['phonepaymnts','paystatreq','morgcalls','eftquestions',
					'endorsements','cancpolreq','reinst','pifdscnt','pymntagrreqs','audspreadreq','misc'];
	var inputArr = ['agentnum','agentname','agentphone','addrstreet','addrcity','addrstate',
					'addrzip','agentcomment','callnum','acctnum','policynum','brand','createdte',
					'callbkdte','callbktime','agentcontact'];
    var agentArr = ['agentc.agentnum','agentc.agentname','agentc.agentphone','agentc.addr.street','agentc.addr.city'
					,'agentc.addr.state','agentc.addr.zip','agentc.comments','agentc.callnum','agentc.acctnum','agentc.policynum',
					'agentc.brand','agentc.created_at','agentc.callbkdte.substr(0,10)','agentc.callbkdte.substr(11,5)','agentc.contact'];

	var _div = jQuery('div.qagenttab');
    for(i=0;i<classArr.length;i++){
		var evalStr = "agentc.workcomplete."+classArr[i];
			_div.find(":input[name="+classArr[i]+"]").attr("checked",eval(evalStr));
		}
	for(i=0;i<inputArr.length;i++){
		_div.find(':input[name='+inputArr[i]+']').val(eval(agentArr[i]));
		

		}
	switch(agentc.issue){
		case 'open':
			_div.find(":input[value=open]").attr('checked', 'checked'); 
			break;
		case 'escalated':
			_div.find(":input[value=escalated]").attr('checked', 'checked'); 
			break;
		case 'resolved':
			_div.find(":input[value=resolved]").attr('checked', 'checked'); 
			break;
		default:
			_div.find(":input[value=open]").attr('checked', 'checked'); 
	}
	_div.find(":input[type=hidden]").val(agentc._id);
	_div.find(":button[id=updated]").attr("class","submitted");
    _div.find(":input[id=submitted]").attr("class","updated");
	jQuery(".agenttype").val(agentc.type);
    jQuery(".agentescato").val(agentc.escato);
    jQuery(".miscdesc").val(agentc.miscdesc);
	jQuery('.qinsurtab').hide();
	jQuery('.qagenttab').show();
	jQuery('.qmorgtab').hide();


};
function update_user(account){
 //console.log(account);
 jQuery(".fname").val(account.fname);
//console.log(account.fname);
 jQuery(".lname").val(account.lname);
//console.log(account.lname);
 jQuery(".email").val(account.email);
 jQuery(".loginid").val(account.user);
 jQuery(".seclevel").val(account.seclevel);
 jQuery(".status").val(account.status);
 jQuery("._id").val(account._id);
 jQuery("div.useradd").show();
 jQuery(".updateuser").show();
 jQuery(".usersubmitted").hide();
 jQuery("div.imports").hide();
 jQuery("div.userlist").hide();
};
function update_worklist_Id(agent){
 var classArr = ['phonepaymnts','paystatreq','morgcalls','eftquestions',
		'endorsements','cancpolreq','reinst','pifdscnt','pymntagrreqs','audspreadreq','misc'];
 var m_div = $('div.agenttab');
  m_div.find(":input[name=agentnum]").val(agent.agentnum);
  m_div.find(":input[name=agentname]").val(agent.agentname);
  m_div.find(":input[name=agentphone]").val(agent.agentphone);
  m_div.find(":input[name=addrstreet]").val(agent.addr.street);
  m_div.find(":input[name=addrcity]").val(agent.addr.city);
  m_div.find(":input[name=addrstate]").val(agent.addr.state);
  m_div.find(":input[name=addrzip]").val(agent.addr.zip);
  m_div.find(":input[name=agentcomment]").val(agent.comments);
  m_div.find(":input[name=callnum]").val(agent.callnum);
  m_div.find(":input[name=acctnum]").val(agent.acctnum);
  m_div.find(":input[name=policynum]").val(agent.policynum);
  m_div.find(":input[name=callbkdte]").val(agent.callbkdte.substr(0,10));
  m_div.find(":input[name=callbktime]").val(agent.callbkdte.substr(11,5));
  m_div.find(":input[name=brand]").val(agent.brand);
  m_div.find(":input[name=createdte]").val(agent.created_at);
  m_div.find(":input[name=initcall]").attr("checked",agent.initcall);
  $(".agenttype").val(agent.type);
  $(".agentescato").val(agent.escato);
  $(".miscdesc").val(agent.miscdesc);
  
  switch(agent.issue){
	case 'open':
		m_div.find(":input[value=open]").attr('checked', 'checked'); 
		break;
    case 'escalated':
		m_div.find(":input[value=escalated]").attr('checked', 'checked'); 
		break;
    case 'resolved':
		m_div.find(":input[value=resolved]").attr('checked', 'checked'); 
		break;
	default:
		m_div.find(":input[value=open]").attr('checked', 'checked'); 
	}
  m_div.find(":input[type=hidden]").val(agent._id);
  m_div.find(":input[name=agentcontact]").val(agent.contact);
  m_div.find(":button[id=updated]").attr("class","submitted");
  m_div.find(":input[id=submitted]").attr("class","updated");
   for(i=0;i<classArr.length;i++){
		var evalStr = "agent.workcomplete."+classArr[i];
			m_div.find(":input[name="+classArr[i]+"]").attr("checked",eval(evalStr));
  }
};
function update_insworklist(insured){
var classArr = ['phonepaymnts','paystatreq','morgcalls','eftquestions',
		'endorsements','cancpolreq','reinst','pifdscnt','pymntagrreqs','audspreadreq','misc'];
 var m_div = $('div.insurtab');
  m_div.find(":input[name=insuredlname]").val(insured.insuredlname);
  m_div.find(":input[name=insuredfname]").val(insured.insuredfname);
  m_div.find(":input[name=insuredphone]").val(insured.insuredphone);
  m_div.find(":input[name=insaddrstreet]").val(insured.addr.street);
  m_div.find(":input[name=insaddrcity]").val(insured.addr.city);
  m_div.find(":input[name=insaddrstate]").val(insured.addr.state);
  m_div.find(":input[name=insaddrzip]").val(insured.addr.zip);
  m_div.find(":input[name=inscomment]").val(insured.comments);
  m_div.find(":input[name=inscontact]").val(insured.contact);
  m_div.find(":input[name=inscallnum]").val(insured.callnum);
  m_div.find(":input[name=insacctnum]").val(insured.acctnum);
  m_div.find(":input[name=inspolicynum]").val(insured.policynum);
  m_div.find(":input[name=inscallbkdte]").val(insured.callbkdte.substr(0,10));
  m_div.find(":input[name=inscallbktime]").val(insured.callbkdte.substr(11,5));
  m_div.find(":input[name=insbrand]").val(insured.brand);
  m_div.find(":input[name=inscreatedte]").val(insured.created_at);
  m_div.find(":input[name=insinitcall]").attr("checked",insured.initcall);
   $(".instype").val(insured.type);
   $(".insescato").val(insured.escato);
   $(".insmiscdesc").val(insured.miscdesc);
  switch(insured.issue){
	case 'open':
		m_div.find(":input[value=open]").attr('checked', 'checked'); 
		break;
    case 'escalated':
		m_div.find(":input[value=escalated]").attr('checked', 'checked'); 
		break;
    case 'resolved':
		m_div.find(":input[value=resolved]").attr('checked', 'checked'); 
		break;
	default:
		m_div.find(":input[value=open]").attr('checked', 'checked'); 
	}
  m_div.find(":input[name=ins_id]").val(insured._id);
  m_div.find(":button[id=insupdated]").attr("class","submitted");
  m_div.find(":input[id=inssubmitted]").attr("class","updated");
   for(i=0;i<classArr.length;i++){
		var evalStr = "insured.workcomplete."+classArr[i];
			m_div.find(":input[name=ins"+classArr[i]+"]").attr("checked",eval(evalStr));
  }
};

function update_morgworklist(morgage){
var classArr = ['phonepaymnts','paystatreq','morgcalls','eftquestions',
		'endorsements','cancpolreq','reinst','pifdscnt','pymntagrreqs','audspreadreq','misc'];
 var m_div = $('div.morgtab');
  m_div.find(":input[name=morgname]").val(morgage.morgagename);
  m_div.find(":input[name=morgphone]").val(morgage.morgagephone);
  m_div.find(":input[name=morgaddrstreet]").val(morgage.addr.street);
  m_div.find(":input[name=morgaddrcity]").val(morgage.addr.city);
  m_div.find(":input[name=morgaddrstate]").val(morgage.addr.state);
  m_div.find(":input[name=morgaddrzip]").val(morgage.addr.zip);
  m_div.find(":input[name=morgcomment]").val(morgage.comments);
  m_div.find(":input[name=morgcontact]").val(morgage.contact);
  m_div.find(":input[name=morgcallnum]").val(morgage.callnum);
  m_div.find(":input[name=morgacctnum]").val(morgage.acctnum);
  m_div.find(":input[name=morgpolicynum]").val(morgage.policynum);
  m_div.find(":input[name=morgcallbkdte]").val(morgage.callbkdte.substr(0,10));
  m_div.find(":input[name=morgcallbktime]").val(morgage.callbkdte.substr(11,5));
  m_div.find(":input[name=morgbrand]").val(morgage.brand);
  m_div.find(":input[name=morgcreatedte]").val(morgage.created_at);
  m_div.find(":input[name=morginitcall]").attr("checked",morgage.initcall);
  $(".morgtype").val(morgage.type);
  $(".morgescato").val(morgage.escato);
  $(".morgmiscdesc").val(morgage.miscdesc);
  switch(morgage.issue){
	case 'open':
		m_div.find(":input[value=open]").attr('checked', 'checked'); 
		break;
    case 'escalated':
		m_div.find(":input[value=escalated]").attr('checked', 'checked'); 
		break;
    case 'resolved':
		m_div.find(":input[value=resolved]").attr('checked', 'checked'); 
		break;
	default:
		m_div.find(":input[value=open]").attr('checked', 'checked'); 
	}
  m_div.find(":input[name=morg_id]").val(morgage._id);
  m_div.find(":button[id=morgupdated]").attr("class","submitted");
  m_div.find(":input[id=morgsubmitted]").attr("class","updated");
   for(i=0;i<classArr.length;i++){
		var evalStr = "morgage.workcomplete."+classArr[i];
			m_div.find(":input[name=morg"+classArr[i]+"]").attr("checked",eval(evalStr));
  }
};
$(function() {$( "#callbkdte" ).datepicker({ dateFormat: "yy-mm-dd" });});
$(function() {$( "#inscallbkdte" ).datepicker({ dateFormat: "yy-mm-dd" });});
$(function() {$( "#morgcallbkdte" ).datepicker({ dateFormat: "yy-mm-dd" });});
$(function() {$("#createdte").datepicker({ dateFormat: "yy-mm-dd" });});
$(function() {$("#inscreatedte").datepicker({ dateFormat: "yy-mm-dd" });});
$(function() {$("#morgcreatedte").datepicker({ dateFormat: "yy-mm-dd" });});

function submitUpdate(id){
	var pForm,hID;
 switch(id){
	case 'form1a':
		pForm = $('form.form1a');
		hID   = $('input._id').val();
		 //pForm.attr('method','put');
		 pForm.attr('action','/agents/'+hID);
      break;
	case 'form1b':
		pForm = $('form.form1b');
		hID   = $('input.ins_id').val();
		 //pForm.attr('method','put');
		 pForm.attr('action','/insured/'+hID);
		break;
    case 'form1c':
        pForm = $('form.form1c');
		hID   = $('input.morg_id').val();
		 //pForm.attr('method','put');
		 pForm.attr('action','/morgage/'+hID);
		break;
    case 'form-user':
		pForm = $('form.form-user');
		hID   = $('.loginid').val();
		 //pForm.attr('method','put');
		 pForm.attr('action','/user/'+hID);
		break;
	}
     pForm.submit();
  
};
function submitSearch(id){
   //console.log('form '+id);
	var url,Str='undefined';
        url='/search/';
			$('form.'+id).find('input').each(function(index,elem){
				switch(this.name){
					case 'acctnum':
						if(this.value.length>3){
							Str=this.value;
							url='/search/agent/'+Str;
						}
						break;
					case 'insacctnum':
						if(this.value.length>3){
							Str=this.value;
							url='/search/insured/'+Str;
						}
						break;
					case 'morgacctnum':
						if(this.value.length>3){
							Str=this.value;
							url='/search/morgage/'+Str;
						}
						break;
                    case 'createdte':
						if(this.value.length>3){
							Str=this.value;
							url='/search/agent/date/'+Str;
                        }
							break;
                    case 'inscreatedte':
						if(this.value.length>3){
							Str=this.value;
							url='/search/insured/date/'+Str;
                        }
							break;
                    case 'morgcreatedte':
						if(this.value.length>3){
							Str=this.value;
							url='/search/morgage/date/'+Str;
                        }
							break;
					case 'agentcontact':
						if(this.value.length>3){
							Str=this.value;
							url='/search/agent/contact/'+Str;
                        }
							break;
					case 'inscontact':
						if(this.value.length>3){
							Str=this.value;
							url='/search/insured/contact/'+Str;
                        }
							break;
					case 'morgcontact':
						if(this.value.length>3){
							Str=this.value;
							url='/search/morgage/contact/'+Str;
                        }
							break;
					case 'policynum':
						if(this.value.length>3){
							Str=this.value;
							url='/search/agent/policy/'+Str;
                        }
							break;
					case 'inspolicynum':
						if(this.value.length>3){
							Str=this.value;
							url='/search/insured/policy/'+Str;
                        }
							break;
					case 'morgpolicynum':
						if(this.value.length>3){
							Str=this.value;
							url='/search/morgage/policy/'+Str;
                        }
							break;
	
				}
					});
				window.open(url,'search','scrollbars=1,width=600,height=400');void(0);
			//$('form.'+id).attr('action',url+Str);
			//$('form.'+id).submit();
  
};
jQuery(document).ready(function() {
 
		// $("#tblmorgages").ingrid({url:'#',
								  // paging:false,
                                  // sorting:true}

			// );

  jQuery(".pclose").click(function()
  {
    jQuery("div.error").hide();
    jQuery("div.info").hide();
  });
  jQuery(".titlenav").click(function()
  {
    jQuery(this).next(".heading").slideToggle(500);
  });
 jQuery(".insur").click(function()
  {
    jQuery(".agenttab").hide();
	jQuery(".insurtab").show();
	jQuery(".morgtab").hide();
   $('li').each(function(index) {
    if($(this).attr('id')=='insur'){
		$(this).toggleClass('cur',true);
     }else{
		$(this).toggleClass('cur',false);
		}
	});
    
  });
jQuery(".cur").click(function()
  {
    jQuery(".insurtab").hide();
	jQuery(".agenttab").show();
	jQuery(".morgtab").hide()
     $('li').each(function(index) {
    if($(this).attr('id')=='liagent'){
		$(this).toggleClass('cur',true);
     }else{
		$(this).toggleClass('cur',false);
		}
	});
  });
 jQuery(".ulist").click(function()
{
 
 jQuery("div.imports").hide();
 jQuery("div.useradd").hide();
 jQuery("div.userlist").show();
 
});
 jQuery(".aimports").click(function()
{
 jQuery("div.imports").show();
 jQuery("div.useradd").hide();
 jQuery("div.userlist").hide();
});
jQuery(".anewuser").click(function()
{ 
  jQuery("div.useradd").show();
  jQuery(".updateuser").hide();
  jQuery(".usersubmitted").show();
  jQuery("div.imports").hide();
  jQuery("div.userlist").hide();
});
 jQuery("#morgage").click(function()
 {
	jQuery(".insurtab").hide();
	jQuery(".agenttab").hide();
    jQuery(".morgtab").show();
	 $('li').each(function(index) {
    if($(this).attr('id')=='morgage'){
		$(this).toggleClass('cur',true);
     }else{
		$(this).toggleClass('cur',false);
		}
	});
  });
jQuery(".canceled").click(function()
{
  jQuery("#updated").attr("class","updated");
  jQuery("#submitted").attr("class","sumitted");

});
jQuery(".morgcanceled").click(function()
{
  jQuery("#morgupdated").attr("class","morgupdated");
  jQuery("#morgsubmitted").attr("class","morgsubmitted");

});
jQuery(".inscanceled").click(function()
{
  jQuery("#insupdated").attr("class","insupdated");
  jQuery("#inssubmitted").attr("class","inssubmitted");

});
jQuery("#lireport").click(function()
  {
  $('li').each(function(index) {
    if($(this).attr('id')=='lireport'){
		$(this).toggleClass('cur',true);
     }else{
		$(this).toggleClass('cur',false);
		}
	});
	
  });
jQuery("#liadm").click(function()
  {
  $('li').each(function(index) {
    if($(this).attr('id')=='liadm'){
		$(this).toggleClass('cur',true);
     }else{
		$(this).toggleClass('cur',false);
		}
	});
	
  });
jQuery(".inscanceled").click(function()
 {
   // Remove the checkbox for the insurance tab
   //jQuery(':checkbox:checked').removeAttr('checked');
  jQuery('.insurtab').find(':checked').each(function() {
   $(this).removeAttr('checked');
		});
 });
jQuery(".qinscanceled").click(function()
 {
   // Remove the checkbox for the insurance tab
   //jQuery(':checkbox:checked').removeAttr('checked');
  jQuery('.qinsurtab').find(':checked').each(function() {
   $(this).removeAttr('checked');
		});
 });

jQuery(".canceled").click(function()
 {
   // Remove the checkbox for the agent tab
   //jQuery(':checkbox:checked').removeAttr('checked');
  jQuery('.agenttab').find(':checked').each(function() {
   $(this).removeAttr('checked');
		});
 });
jQuery(".qcanceled").click(function()
 {
   // Remove the checkbox for the agent tab
   //jQuery(':checkbox:checked').removeAttr('checked');
  jQuery('.qagenttab').find(':checked').each(function() {
   $(this).removeAttr('checked');
		});
 });

jQuery(".morgcanceled").click(function()
 {
   // Remove the checkbox for the morgage tab
   //jQuery(':checkbox:checked').removeAttr('checked');
  jQuery('.morgtab').find(':checked').each(function() {
   $(this).removeAttr('checked');
		});
 });
jQuery(".qmorgcanceled").click(function()
 {

   // Remove the checkbox for the morgage tab
   //jQuery(':checkbox:checked').removeAttr('checked');
  jQuery('.qmorgtab').find(':checked').each(function() {
   $(this).removeAttr('checked');
		});
 });
});
