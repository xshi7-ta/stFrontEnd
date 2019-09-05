$(function(){
	
	InitRoles();
	InitSapSalesOffice();
	
	$('#roleName').on('change',function(){
		if("1,2".indexOf($(this).val())>-1){
			$('#area').parents('.form-group').show();
		}else{
			$('#area').parents('.form-group').hide();
		}
	});
	
	function InitRoles(){
		$.post('/steigenberger/permission/roleList',null,function(ret){
			if(ret.status==200){
				for(var i in ret.data){
					var item = ret.data[i];
					$('#roleName').append(BuildOption(item.name,item.id));
				}
			}else{
				alert('角色列表请求错误！')
			}
		},'json');
	}
	
	function BuildOption(name,val){
		return "<option value='"+val+"'>"+name+"</option>";
	}
	
	function InitSapSalesOffice(){
		$.post('/steigenberger/permission/sapSalesOfficelist',null,function(ret){
			if(ret.status==200){
				for(var i in ret.data){
					var item = ret.data[i];
					$('#area').append(BuildAreaOption(item.name,item.code));
				}
			}else{
				alert('角色列表请求错误！')
			}
		},'json');
	}
	
	function BuildAreaOption(name,code){
		return "<option value='"+code+"'>"+name+"</option>";
	}
});

//提交表单
function add(){
//	var username = document.getElementById('username').value;
//	var useremil = document.getElementById('useremil').value;
//	var userid = document.getElementById('userid').value;
//	var roleName = document.getElementById('roleName').value;
//	var area = document.getElementById('area').value;
//	var status = document.getElementById('status').value;
	$.ajax({
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "/steigenberger/permission/adduser" ,//url
            data: $('#form1').serialize(),
            success: function (result) {
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.status == 200) {
                    alert("保存成功");
                }
                ;
            },
            error : function() {
                alert("保存失败！");
            }
        });
}