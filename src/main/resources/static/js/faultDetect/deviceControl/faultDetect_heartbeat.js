var communicateTable = null;

$(document).ready(function () {
    initCommunicateTable();

})

function initCommunicateTable() {
    communicateTable = $('#communicateTable').DataTable({
        // url
        "sAjaxSource" : "state/queryCommunicateState",
        "bLengthChange":false,//取消显示每页条数
        // 服务器回调函数 
        "fnServerData": function retrieveData(sSource, aoData, fnCallback)
        {
            // aoData.push({ "name": "factory", "value": $("#cronFactory").val()});
            // aoData.push({ "name": "device_id", "value": $("#device_id").val()});
            // aoData.push({ "name": "CommState", "value": $("#cronCommState").val()});
            // aoData.push({ "name": "CommLine", "value": $("#cronLine").val()});
            // aoData.push({ "name": "userID",  "value": userId});
            $.ajax({
                type: "POST",
                url: sSource,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(aoData),
                success: function(data)
                {
                    if(data.status == "success")
                    {
                        fnCallback(data.infoData);
                    }else{
                        showSuccessOrErrorModal(data.msg,"error");
                    }
                },
                error:function(e){
                    showSuccessOrErrorModal("获取装置自检数据失败","error");
                }
            });
        },
        // 列属性
        "columns" : [{
            "title" : "所属厂家",
            "defaultContent" : "",
            "data" :"comm_state",
            "width": "10%",
            "class" : "text-center",
            "render": function(data, type, row, meta) {
                var content ="";
                if(data == 0){
                    content = "在线";
                }
                else if(data == 1){
                }
                else {
                    content = "未知";
                }
                return content;
            }
        }
            ,	 {
                "title" : "装置ID编号",
                "defaultContent" : "",
                "data" :"factory",
                "width": "10%",
                "class" : "text-center"
            }
            ,	 {
                "title" : "装置标识",
                "defaultContent" : "",
                "data" :"id",
                "width": "10%",
                "class" : "text-center"
            }
            ,	 {
                "title" : "心跳时间",
                "defaultContent" : "",
                "data" :"name",
                "width": "10%",
                "class" : "text-center"
            }
            /*
            ,	 {
                 "title" : "通信时间",  
                 "defaultContent" : "", 
                 "data" :"commTime",
                 "width": "10%",
                 "class" : "text-center"  
             }
            */
        ]
    });
}
