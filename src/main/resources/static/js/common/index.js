var userMap = {};
var timer;

$(document).ready(function() {
//	userMap = isLogined();
//	if(userMap){//成功登录
//		$("#avatarNameId").html(userMap.user_name);
//	}else{
//		parent.location.href = jQuery.getBasePath() + "/login.html";
//	}
	
	$("#baseSetting").click(function(){
			parent.location.href = jQuery.getBasePath() + "/views/base.html";
	});
});

function cancelModifyWavePassword()
{
	$("#password_edit").val("");
	$("#password_new").val("");
	$("#password_new_c").val("");
}

function closeModal(){
	$("#password_edit").val("");
	$("#password_new").val("");
	$("#password_new_c").val("");
}