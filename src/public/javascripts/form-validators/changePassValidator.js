
function changePassValidator(){
    
// modal window to allow users to reset their password //
    this.changePassword = $('#change-password');
    this.changePassword.modal({ show : false, keyboard : false, backdrop : 'static' });
    this.changePassAlert = $('#change-password .alert');
}

changePassValidator.prototype.validatePassword = function(s,s2)
{
	//console.log('Inside validatePassword with '+s+' and '+s2);
	if (s.length < 6){
		//console.log('Password Should Be At Least 6 Characters');
		this.showAlert('Password Should Be At Least 6 Characters');
		return false;
		}
       if(s!=s2){
		this.showAlert('password does not match what was retyped');
			return false;
		}
		return true;
}

changePassValidator.prototype.showAlert = function(m)
{
	//console.log('showAlert :'+m);
	this.changePassAlert.attr('class', 'alert alert-error');
	this.changePassAlert.html(m);
	this.changePassAlert.show();
}

changePassValidator.prototype.hideAlert = function()
{
    this.changePassAlert.hide();
}

changePassValidator.prototype.showSuccess = function(m)
{
	this.changePassAlert.attr('class', 'alert alert-success');
	this.changePassAlert.html(m);
	this.changePassAlert.fadeIn(500);
}