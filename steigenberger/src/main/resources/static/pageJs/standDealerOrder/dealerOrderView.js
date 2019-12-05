$(function () {
	localStorage.clear()
	var addressTable = new TableInit('addressTable','','',addressColumns)
	addressTable.init();
	
	//初始化毛利率table
	var grossProfitTable = new TableInit("grossProfitTable",'','',grossProfitColumns);
	grossProfitTable.init();
	
	var installationTerm = installationTerms[$("#customerClazzCode").val()];
	$.each(installationTerm, function (key, value) {
		$("#installCode").val(key);
		$("#installName").val(value);
		
	});	
	initMarialsTables();
	$('#first').tab('show');
	$('#shippDate').datepicker();
	
	$("#version").append("<option value='" + currentVersion + "'>" + currentVersion + "</option>");
	fillItems();
	//修改查看订单时,辉县地址数据
	fillOrderAddress();
	initDropDownList();
	disableAll();
});

//初始化购销明细
function fillItems(){
	if(items){
		for(var i=0;i<items.length;i++){
			var countMaterialsTable = $('#materialsTable').bootstrapTable('getData').length;
			var countMaterialsTableall1 = $('#materialsTableall1').bootstrapTable('getData').length;
			var countMaterialsTableall2 = $('#materialsTableall2').bootstrapTable('getData').length;
			var countMaterialsTableall3 = $('#materialsTableall3').bootstrapTable('getData').length;
			var countMaterialsTableall4 = $('#materialsTableall4').bootstrapTable('getData').length;
			var countMaterialsTableall5 = $('#materialsTableall5').bootstrapTable('getData').length;
			var countMaterialsTableall6 = $('#materialsTableall6').bootstrapTable('getData').length;
			var materialType = materialGroupMapGroupOrder[items[i].groupCode];
			if(materialType=='T101'){
				$("#materialsTableall1").bootstrapTable('insertRow', {
				    index: countMaterialsTableall1,
				    row: items[i]
				});
				$("#materialsTable").bootstrapTable('insertRow', {
				    index: countMaterialsTable,
				    row: items[i]
				});
			}else if(materialType=='T102'){
				$("#materialsTableall2").bootstrapTable('insertRow', {
				    index: countMaterialsTableall2,
				    row: items[i]
				});
				$("#materialsTable").bootstrapTable('insertRow', {
				    index: countMaterialsTable,
				    row: items[i]
				});
			}else if(materialType=='T103'){
				$("#materialsTableall3").bootstrapTable('insertRow', {
				    index: countMaterialsTableall3,
				    row: items[i]
				});
				$("#materialsTable").bootstrapTable('insertRow', {
				    index: countMaterialsTable,
				    row: items[i]
				});
			}else if(materialType=='T104'){
				$("#materialsTableall4").bootstrapTable('insertRow', {
				    index: countMaterialsTableall4,
				    row: items[i]
				});
				$("#materialsTable").bootstrapTable('insertRow', {
				    index: countMaterialsTable,
				    row: items[i]
				});
			}else if(materialType=='T105'){
				$("#materialsTableall5").bootstrapTable('insertRow', {
				    index: countMaterialsTableall5,
				    row: items[i]
				});
				$("#materialsTable").bootstrapTable('insertRow', {
				    index: countMaterialsTable,
				    row: item[i]
				});
			}else if(materialType=='T106'){
				$("#materialsTableall6").bootstrapTable('insertRow', {
				    index: countMaterialsTableall6,
				    row: items[i]
				});
				$("#materialsTable").bootstrapTable('insertRow', {
				    index: countMaterialsTable,
				    row: items[i]
				});
			}
		}
	}
	
}

//修改查看订单时,辉县地址数据
function fillOrderAddress(){
	if(orderAddress){
		for(var i=0;i<orderAddress.length;i++){
			var row = orderAddress[i];
			row.index = i+1;
			$("#addressTable").bootstrapTable('insertRow', {
			    index: i,
			    row: orderAddress[i]
			});
		}
	}
}

function initDropDownList(){
	$('#salesType').trigger("change");
	$('#officeSelect').val($('#officeCode').val());
	$('#officeSelect').trigger("change");
	$('#selectGroup').val($('#groupCode').val());
	$("#orignalContractAmount").val($("#contractValue").val());
	$("#contractAmount").val($("#contractRMBValue").val());
	
}

function salesTypeChange(obj,offices,taxRate,exchangeRate){
	$("#orignalContractAmount").val("");
	$("#exchangeRate").val("");
	$("#contractAmount").val("");
	var saleType = $(obj).val();
	getCurrency(saleType,exchangeRate);
	getIncoterm(saleType);
	$("#taxtRate").val(taxRate[saleType]);
	if(saleType=="20"){
		$("#freightDiv").show();
		$('#selectProvince').val('');
		$('#citySelect').val('');
		$('#selectDistrict').val('');
		$('#citySelect').attr("disabled",true);
		$('#selectDistrict').attr("disabled",true);	
		$('#selectProvince').attr("disabled",true);
		$('#currency').attr('disabled',false);
		$('#incoterm').attr("readonly",false);
		$('#incotermContect').attr("readonly",false);
		$('#installCode').val('');
		$('#installCode').attr("readonly",true);
		$('#transferType').attr("disabled",true);
		$('#contactor1Id').attr("readonly",true);
		$('#contactor2Id').attr("readonly",true);
		$('#contactor3Id').attr("readonly",true);
		$('#contactor1Tel').attr("readonly",true);
		$('#contactor2Tel').attr("readonly",true);
		$('#contactor3Tel').attr("readonly",true);
		$('#contactor1Id').val('');
		$('#contactor2Id').val('');
		$('#contactor3Id').val('');
		$('#contactor1Tel').val('');
		$('#contactor2Tel').val('');
		$('#contactor3Tel').val('');
	}else{
		$('#freightDiv').hide();
		$('#citySelect').attr("disabled",false);
		$('#selectDistrict').attr("disabled",false);
		$('#selectProvince').attr("disabled",false);
		
		$('#currency').attr('disabled',true);
		$('#incoterm').attr("readonly",true);
		$('#incotermContect').attr("readonly",true);
		
		$('#installCode').attr("readonly",false);
		$('#transferType').attr("readonly",false);
		$('#contactor1Id').attr("readonly",false);
		$('#contactor2Id').attr("readonly",false);
		$('#contactor3Id').attr("readonly",false);
		$('#contactor1Tel').attr("readonly",false);
		$('#contactor2Tel').attr("readonly",false);
		$('#contactor3Tel').attr("readonly",false);
	}
	if ($(obj).val() == '') {
		$("#officeSelect").html('');
		$("#officeSelect").append("<option value=''>--选择大区--</option>");
		$("#officeSelect").val('');
		
		$("#selectGroup").html('');
		$("#selectGroup").append("<option value=''>--选择中心--</option>");
		$("#selectGroup").val('');
	}else{
		$("#officeSelect").html('');
		$("#selectGroup").html('');
		if($(obj).val() == '10'||$(obj).val() == '30'){
			$("#officeSelect").attr("readonly",false);
			$("#selectGroup").attr("readonly",false);
			$("#officeSelect").append("<option value=''>--选择大区--</option>");
			$("#selectGroup").append("<option value=''>--选择中心--</option>");
		}else{
			$("#officeSelect").attr("readonly",true);
			$("#selectGroup").attr("readonly",true);
		}	
		$("#officeSelect").val('');
		var officesMap = offices[saleType];
		$.each(officesMap, function (key,value) {
				$("#officeSelect").append("<option value='" + key + "' readonly>" + value + "</option>");			
		});
	} 		
}

function getIncoterm(salesType){
	$("#incoterm").html('');
	if(salesType=='20'){
		$.each(intercoms, function (key,value) {
			$("#incoterm").append("<option value=" + key +">" + value + "</option>");			
		});
	}
}
function getCurrency(saleType,exchangeRates){
	$("#currency").html("");
	if(saleType==''){
		$("#currency").html("");
	}else if(saleType=='20'){
		$("#currency").append("<option value=''>--选择币种--</option>");
		var currency = exchangeRates[saleType];
		$.each(currency, function (index,item) {
			$("#currency").append("<option value=" + item.code + ">" + item.name + "</option>");			
		});
	}else{
		var currency = exchangeRates[saleType];
		$.each(currency, function (index,item) {
			$("#currency").append("<option value=" + item.code + ">" + item.name + "</option>");
			$("#exchangeRate").val(item.rate);
		});
	}
	
}
function getGroups(obj,groups){
	var officeCode = $(obj).val();
	if ($(obj).val() == '') {
		$("#selectGroup").html('');
		$("#selectGroup").append("<option value=''>--选择中心--</option>");
		$("#selectGroup").val('');
	}else{
		$("#selectGroup").html('');
		$("#selectGroup").append("<option value=''>--选择中心--</option>");
		$("#selectGroup").val('');
		var groupsMap = groups[officeCode];
		$.each(groupsMap, function (key,value) {
				$("#selectGroup").append("<option value='" + key + "'>" + value + "</option>");			
		});
	} 		
}


function disableAll(){ 
  var form=document.forms[0];
  for(var i=0;i<form.length;i++){
    var element=form.elements[i];
    element.disabled=true;
  }
  $("#back").attr('disabled',false);
  $("#grossClose").attr('disabled',false);
  $("#showGrossProfit").attr('disabled',false);
  $("#grossCloseb").attr('disabled',false);
  $("#grossExport").attr('disabled',false);
  $("#collapseShow").attr('disabled',false);
  $("#collapseClose").attr('disabled',false);
  $("#reject").attr('disabled',false);
  $("#approve").attr('disabled',false);
  $("#version").attr('disabled',false);
  if($("#expenseItem")){
	  $("#expenseItem").find("*").each(function() {
		 $(this).removeAttr("disabled");
	  });
  }
  if(orderModelType=="editB2C"){
	  $("#materialsEdit").attr('disabled',false);
  }
}
//打开调研表
function openConfig(identification){
	$("#materialconfigModal").modal('show');
	var value = identification.split(',')
	$("#materialConfigClazzCode").val(value[2]);
	$("#materialConfigCode").val(value[1]);
	$("#identification").val(value[0]);
	$("#viewPrice").val(value[3]);
	var url = "/steigenberger/order/material/configurations"
	var configTable = new TableInit('configTable','','',configTableColumns);
	configTable.init();
	var configData = localStorage[value[0]];
	if(configData){
		$("#configTable").bootstrapTable("removeAll");
		var jsonObject = JSON.parse(configData);
		for(var i=0;i<jsonObject.configTableData.length;i++){
			$("#configTable").bootstrapTable('insertRow',{
				index:i,
				row:jsonObject.configTableData[i]
			});
		}
		$("#configRemark").val(jsonObject.remark);
		
	}else{
		$("#configTable").bootstrapTable('refresh',{
			url:url,
			query:{'clazzCode':$("#materialConfigClazzCode").val(),
				   'materialCode':$("#materialConfigCode").val()
			}
		});
	}
}
//调研表初始化查询参数
function queryConfigParams(params) {
    params.clazzCode = $("#materialConfigClazzCode").val();
    params.materialCode = $("#materialConfigCode").val();
    return params;
}

//关闭调研表
function closeMaterialConfig(){
	$("#materialconfigModal").modal('hide');
}

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

function initMarialsTables(items){
	var materialsTable = new TableInit('materialsTable','','',materialsColumn);
	materialsTable.init();
	var materialsTableall1 = new TableInit('materialsTableall1','','',materialsColumn);
	materialsTableall1.init();
	var materialsTableall2 = new TableInit('materialsTableall2','','',materialsColumn);
	materialsTableall2.init();
	var materialsTableall3 = new TableInit('materialsTableall3','','',materialsColumn);
	materialsTableall3.init();
	var materialsTableall4 = new TableInit('materialsTableall4','','',materialsColumn);
	materialsTableall4.init();
	var materialsTableall5 = new TableInit('materialsTableall5','','',materialsColumn);
	materialsTableall5.init();
	var materialsTableall6 = new TableInit('materialsTableall6','','',materialsColumn);
	materialsTableall6.init();
}

//调研表查看物料
function viewConfig(){
	var bomCode = $("#materialConfigCode").val();
	var formData = $("#materialConfigForm").serializeObject();
	formData.bomCode = bomCode;
	$.ajax({
	    url: "/steigenberger/order/material/configuration",
	    contentType: "application/json;charset=UTF-8",
	    data: JSON.stringify(formData),
	    type: "POST",
	    dataType: "json",
	    success: function(data) { 
	    	$("#moreConfig").attr("style","display:block;");
	    	$("#viewCode").val($("#materialConfigCode").val());
	    	$("#viewPrice").val($("#viewPrice").val());
	    	$("#configPrice").val(data.priceGap);
	    },
	    error: function(){
	    	$("#viewError").attr("style","display:block;");
	    }
	});
}

//编辑购销明细
function editMaterials(identification){
	$('#subsidiaryModal').modal('show');
	$('#materialsModalType').val('edit');
	var identificationSplit = identification.split(',');
	var materialsType = materialGroupMapGroupOrder[identificationSplit[0]];
	var index = identificationSplit[1];
	debugger
	var tableData;
	if(materialsType=='T101'){
		tableData = $('#materialsTableall1').bootstrapTable('getData')[index];
	}else if(materialsType=='T102'){
		tableData = $('#materialsTableall2').bootstrapTable('getData')[index];
	}else if(materialsType=='T103'){
		tableData = $('#materialsTableall3').bootstrapTable('getData')[index];
	}else if(materialsType=='T104'){
		tableData = $('#materialsTableall4').bootstrapTable('getData')[index];
	}else if(materialsType=='T105'){
		tableData = $('#materialsTableall5').bootstrapTable('getData')[index];
	}else if(materialsType=='T106'){
		tableData = $('#materialsTableall6').bootstrapTable('getData')[index];
	}
	
	fillMaterailValue(tableData);
}

//将查出来的物料信息填充到各个field中
function fillMaterailValue(data){
	if(data.materialName){
		$("#materialTypeName").val(data.materialName);
	}
	if(data.materialCode){
		$("#materialCode").val(data.materialCode);
	}
	if(data.b2cRemark){
		$("#b2cRemark").val(data.b2cRemark);
	}
	if(data.colorComments){
		$("#colorComments").val(data.colorComments);
	}
	if(data.specialRemark){
		$("#specialRemark").val(data.specialRemark);
	}
	if(data.itemCategory){
		$("#itemCategory").val(data.itemCategory)
	}
	$("#groupName").val(data.groupName);
	$("#groupCode").val(data.groupCode);
	$("#isConfigurable").val(data.configurable);
	var materialsType = materialGroupMapGroupOrder[data.groupCode];
	var amount = $("#amount").val();
	$("#materialsType").val(materialsType);
	$("#unitName").val(data.unitName);
	$("#unitName").val(data.unitName);
	$("#materialClazzCode").val(data.clazzCode);
	$("#transcationPrice").val(toDecimal2(data.transcationPrice));
	$("#acturalPricaOfOptional").val(toDecimal2(data.acturalPricaOfOptional));
	$("#acturalPricaOfOptionalAmount").val(toDecimal2(amount*(data.acturalPricaOfOptional)));
	$("#transcationPriceOfOptional").val(toDecimal2(data.transcationPriceOfOptional));
	$("#B2CPriceEstimated").val(toDecimal2(data.b2CPriceEstimated));
	$("#B2CPriceEstimatedAmount").val(toDecimal2((data.b2CPriceEstimated)*amount));
	$("#B2CCostOfEstimated").val(toDecimal2(data.b2CCostOfEstimated));
	$("#transcationPriceTotal").val(toDecimal2(parseFloat($("#transcationPrice").val())+parseFloat($("#transcationPriceOfOptional").val())));
	$("#retailPrice").val(toDecimal2(data.retailPrice));
	$("#retailPriceAmount").val(toDecimal2(amount*(data.retailPrice)));
	var discountValue = $("#discount").val();
	var discount = discountValue.split("%")[0];
	var acturalPrice = (data.retailPrice*discount)
	$("#acturalPrice").val(toDecimal2(acturalPrice));
	$("#acturalPriceAmount").val(toDecimal2(amount*(acturalPrice)));
	$("#acturalPriceTotal").val(toDecimal2(parseFloat($("#acturalPrice").val())+parseFloat($("#acturalPricaOfOptional").val())));
	$("#acturalPriceAmountTotal").val(toDecimal2(($("#acturalPriceTotal").val())*amount));
	if($('#isPurchased').val()=='生产'){
		$("#producePeriod").val(data.period);
	}else{
		$("#purchasePeriod").val(data.period);
	}
	$("#deliveryDate").val(data.deliveryDate);
	$("#produceDate").val(data.produceDate);
	$("#onStoreDate").val(data.onStoreDate);
	$("#standardPrice").val(toDecimal2(data.standardPrice));
	
	
}

//查看毛利率信息
function viewGrossProfit(){
	$("#grossProfit").modal("show");
	var version = $("#version").val();
	var sequenceNumber = $("#sequenceNumber").val();
	$("#grossSeqNum").val(sequenceNumber);
	$("#grossVersion").val(version);
	$("#grossContractRMBValue").val($("#contractAmount").val());
	$("#grossPerson").val($("#salesName").val());
	$("#grossDate").val($("#inputDate").val());
	$("#grossClazz").val($("#customerClazz").val());
	var opt = {
			url: '/steigenberger/order/'+sequenceNumber+'/'+version+'/grossprofit'
	};
	$("#grossProfitTable").bootstrapTable('refresh', opt);	
}


var grossProfitColumns=[
	{
		 field: 'name',
		 title: '产品名称'
	},{
		 field: 'amount',
		 title: '金额'
	},{
		 field: 'excludingTaxAmount',
		 title: '不含税金额'
	},{
		 field: 'cost',
		 title: '成本'
	},{
		 field: 'grossProfit',
		 title: '毛利'
	},
	{
		 field: 'grossProfitMargin',
		 title: '毛利率'
	}
]

var addressColumns = [{
	title:'行号',
    field: 'index',
    width:'5%'
},{
	title : '省市区',
	field : 'pca',
	width:'35%'
}, 
{
	field:'provinceValue',
	visible:false
},
{
	field:'cityValue',
	visible:false
},
{
	field:'areaValue',
	visible:false
},{
	title : '到货地址',
	field : 'address',
	width:'45%'
},{
    title: '<input type="button"  value="+" class="btn btn-primary" onclick="addAddress()"/>',
    align: 'center',
    width:'15%',
    formatter: function(value, row, index) {
    	var actions = [];
		actions.push('<a class="btn" onclick="editAddress(\'' + index + '\')"><i class="fa fa-edit"></i>编辑</a> ');
		actions.push('<a class="btn" onclick="removeAddress(\'' + index + '\')"><i class="fa fa-remove"></i>删除</a>');
		return actions.join('');
    }
}]

var configTableColumns = [
{
	title :'选项',
	field :'optional',
	width:'15%',
	formatter: function(value, row, index) {
    	if(value){
    		return '必选项'
    	}else{
    		return '可选项'
    	}
    }
}, 
{
	title:'配置',
	field:'name',
	width:'35%'
},
{
	title:'',
	visible:false,
	field:'code'
},
{
	title:'test',
	visible:false,
	field:'configValueCode'
},
{
	title:'配置值',
	field:'configs',
	width:'50%',
	formatter: function(value, row, index) {		
    	var start = '<select class="form-control" name="configValueCode" onchange="setConfigValueCode(this,\'' + index + '\')">';
    	var end = '</select>';
    	$.each(value,function(index,item){
    		if(item.code==row.configValueCode){
    			start+='<option value=\'' + item.code + '\' selected = "selected">' + item.name + '</option>'
    		}else{
    			start+='<option value=\'' + item.code + '\'>' + item.name + '</option>'
    		}	
    	})
		return start+end;
    }
}
]

var TableInit = function (id,url,params,tableColumns) {
	var oTableInit = new Object();
	var tableId = '#'+id;
	oTableInit.init = function () {
		$(tableId).bootstrapTable({
			method : 'get',
			url : url,//请求路径
			striped : true, //是否显示行间隔色
			toolbar: '#toolbar',
			uniqueId:'index',
			cache: false,            
		    sortable: true,                     //是否启用排序
		    clickToSelect: true,               //是否启用点击选中行
		    smartDisplay:true,
		    singleSelect: true,
		    sortOrder: "asc",                   //排序方式
			pageNumber : 1, //初始化加载第一页
			sidePagination : 'server',//server:服务器端分页|client：前端分页
			pageSize : 10,//单页记录数,
			showRefresh : false,//刷新按钮
			queryParams : params,
			columns : tableColumns
		})
	};
	return oTableInit;
};