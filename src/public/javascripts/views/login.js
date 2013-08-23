
$(document).ready(function(){
	
	var lv = new LoginValidator();
	var lc = new LoginController();
	var cpv = new changePassValidator();

// main login form //

	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
			// append 'remember-me' option to formData to write local cookie //
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
				var response = 'TBD';
				/* added the ability for different Login error displays using the responseText*/
			switch(e.responseText){
				case 'acct-disabled':
					response='Account disabled. Contact your administrator';
					break;
				default:
					response='Please check your username and/or password';
				}
            lv.showLoginError('Login Failure',response);
            //lv.showLoginError('Login Failure', 'Please check your username and/or password');
		}
	}); 
	$('#user-tf').focus();
	
// login retrieval form via email //
	
	var ev = new EmailValidator();
	
	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("<b> Error!</b> Please enter a valid email address");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			ev.showEmailSuccess("Check your email on how to reset your password.");
		},
		error : function(){
			ev.showEmailAlert("Sorry. There was a problem, please try again later.");
		}
	});
	$('#change-password-form').ajaxForm({
		url: '/change-password',
		beforeSubmit : function(formData, jqForm, options){
			if (cpv.validatePassword($('#newpass-tf').val(),$('#retypepass-tf').val())){
				cpv.hideAlert();
				return true;
			}	else{
				//cpv.showAlert("<b> Error!</b> Please enter valid password");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			cpv.showSuccess("password changed.");
		},
		error : function(){
			cpv.showAlert("Sorry. There was a problem, please try again later.");
		}
    });
})