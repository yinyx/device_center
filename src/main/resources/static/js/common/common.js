var userMap = {};
var timer;
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
$(document).ready(function(){
	//配置DataTables默认参数
    $.extend(true, $.fn.dataTable.defaults, {
        "language": {
			"sProcessing": "正在加载数据...",
			"sLengthMenu": "_MENU_ 条记录",
			"sZeroRecords": "没有查到记录",
			"sInfo": "第  _START_ 条到第  _END_ 条记录，一共  _TOTAL_ 条记录",
			"sInfoEmpty": "0条记录",
			"emptyTable": "表中没有可用数据",
			"oPaginate": {
				"sPrevious": "<",
				"sNext": ">",
				"sFirst":"<<",
				"sLast":">>",
				"sJump":"确定"
			}
		},
        "dom": '<"top"l<"clear">>rt<"bottom"ip<"clear">>',
		"sScrollY":"350px",
		"scrollCollapse":true,
        "scrollX": true,
    	"serverSide":true,
		"bStateSave" : false,
		"ordering": false,
		"autoWidth":true,
		"lengthMenu" : [ [ 5, 15, 20],[ 5, 15, 20] ],
		"pageLength" : 15,
		/*"initComplete": function(settings, json) {
			
		 },*/
		 "drawCallback": function( settings ) {
			 stopPageLoading()
		 }
    });
    $.fn.dataTable.ext.errMode = function (s, h, m) {
        if (h == 1) {
            alert("连接服务器失败！");
        } else if (h == 7) {
            alert("返回数据错误！");
        }
    };
});



//异步加载content部分内容
function ajaxGetContent(url){
	startPageLoading();
	$("#loadDiv").load("views/"+url,function(){
		stopPageLoading();
		handleSidebarAndContentHeight();
	});
}

//对page-concent的高度重计算
var handleSidebarAndContentHeight = function () {
	var resBreakpointMd = App.getResponsiveBreakpoint('md');
	var content = $('.page-content');
	var sidebar = $('.page-sidebar');
	var height;
	var headerHeight = $('.page-header').outerHeight();
	var footerHeight = $('.page-footer').outerHeight();
	var sidebarHeight = sidebar.outerHeight();
	if (App.getViewPort().width < resBreakpointMd) {
	    height = App.getViewPort().height - headerHeight - footerHeight;
	} else {
	    height = sidebar.height() + 20;
	}
	if ((height + headerHeight + footerHeight) <= App.getViewPort().height) {
	    height = App.getViewPort().height - headerHeight - footerHeight;
	}
	if(sidebarHeight>height){
		height = sidebarHeight;
	}
	content.css('min-height', height);
};
//保存密码
function saveNewPwd() {
	var password_new = $("#password_new").val();
	var newpsd = $("#password_edit").val();
	var data = {
			"id":userMap.id,
			"newPassword" : hex_md5(password_new),
			"oldPassword":hex_md5(newpsd)
		};
	var dataObj = {
			"paramObj":encrypt(JSON.stringify(data),"abcd1234abcd1234")
	}
	$.ajax({
		url : "user/saveNewPassWord",
		type : "post",
		data : dataObj,
		dataType : "text",
		success : function(data) {
			data = $.parseJSON(decrypt(data,"abcd1234abcd1234"));
			console.log(data)
			if (data.result == "success") {
				showSuccessOrErrorModal(data.reason, "success");
				userMap.password = password_new;
				$("#editUserPwd")[0].reset();
				$("#userPwdModal").modal("hide");
			} else {
				showSuccessOrErrorModal(data.reason, "error");
			}
		},
		error : function(e) {
			showSuccessOrErrorModal("保存密码请求出错了", "error");
		}
	})
}
//验证密码
function verifyUserPwd(pwd) {
	var oldPwd = userMap.password;
	if (hex_md5(pwd) == oldPwd) {
		return true;
	} else {
		return false;
	}
}