var $ = layui.$;
var form = layui.form;
var table = layui.table;

$(function() {
	//下拉框
	http.ajax({
		url: '/bloodSampleTest/queryInspectionUnit',
		type: 'POST',
		json: false,
        mask: true,
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader('Authorization', token);
		},
	}).then(function(data) {
			if (data.code == 0) {
				var nuitdata = data.data.rows;
				// console.log($('#unit'));
				for (var i = 0; i < nuitdata.length; i++) {
					$('#unit').append(
						'<option value="' + nuitdata[i].unit_name + '">' + nuitdata[i].unit_name + '</option>'
					);
				}
				form.render();
			} else if (data.code == 500) {
				window.location.href = '../../log.html';
			}
		},function(err){
			console.log(err);
			// 错误回调，err是错误回调参数
			// 这里不处理错误也可以，上面都有集中处理错误，会tips
		})
		

});
var laydate = layui.laydate;
laydate.render({
	elem: '#start' //指定元素
});
laydate.render({
	elem: '#start1' //指定元素
});
laydate.render({
	elem: '#end' //指定元素
});
table.render({
	elem: '#test',
	url: url + '/bloodAuduting/queryBloodAuditing',
	method: 'post',
	contentType: 'application/json',
	parseData: function(res) {
		if (res.code == 500) {
			window.location.href = '../../log.html';
		}
		        		
		return {
			code: res.code,
			msg: res.msg,
			count: res.data.total,
			data: res.data.rows
        };
    
	},
	request: {
		limitName: 'rows'
	},
	headers: { Authorization: token },
	height: 'full-250',
	cellMinWidth: 100,
	cols: [
		[
			{ type: 'checkbox', rowspan: 2 },
			{ title: '序号', align: 'center', rowspan: 2, type: 'numbers' },
			{ field: 'isaddFinalTestResults', title: '状态', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'batchNumber', title: '批次号', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'finspectionUnitName', title: '送检单位', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'testerName', title: '姓名', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'testSex', title: '性别', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'testerAge', title: '年龄', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'inspectionOfficeNumber', title: '检验所编号', align: 'center', minWidth: 140, rowspan: 2, colspan: 1 },
			{ field: 'clinicalDiagnosis', title: '临床诊断', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'pastHistory', title: '疾病史', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'testResulttitle', title: '检验结果', align: 'center', colspan: 7 },
			{ field: 'bloodSamplePreparation', title: '血样备注', align: 'center', rowspan: 2, colspan: 1 },
			{ field: 'customerSource', title: '客户来源', align: 'center', rowspan: 2, colspan: 1 },
			{ title: '本次检验结果', align: 'center', colspan: 3 },
			{ field: 'beforResult', title: '既往检测结果', align: 'center', colspan: 6 },
			{ title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 250, rowspan: 2 }
		],
		[
			{
				title: 'TR值(U/mL)',
				align: 'center',
				style: 'height:auto;',
				templet: function(rows) {
					var tr = '';
					for (var i = 0; i < rows.testResult.length; i++) {
						tr += rows.testResult[i].trValue;
						if (rows.testResult.length - i != 1) {
							tr += '<hr/>';
						}
					}
					return tr;
				}
			},

			{
				title: 'OMA',
				align: 'center',
				templet: function(data) {
					var oma = '';
					for (var i = 0; i < data.testResult.length; i++) {
						oma += data.testResult[i].omaValue;
						if (data.testResult.length - i != 1) {
							oma += '<hr/>';
						}
					}
					return oma;
				}
			},
			{
				title: 'OMA/TR',
				align: 'center',
				templet: function(data) {
					var omatr = '';
					for (var i = 0; i < data.testResult.length; i++) {
						omatr += data.testResult[i].omaTrValue;
						if (data.testResult.length - i != 1) {
							omatr += '<hr/>';
						}
					}
					return omatr;
				}
			},
			{
				title: '仪器型号',
				align: 'center',
				templet: function(data) {
					var instrumentModel = '';
					for (var i = 0; i < data.testResult.length; i++) {
						instrumentModel += data.testResult[i].instrumentModel;
						if (data.testResult.length - i != 1) {
							instrumentModel += '<hr/>';
						}
					}
					return instrumentModel;
				}
			},
			{
				title: '检验日期',
				align: 'center',
				templet: function(data) {
					var testTime = '';
					for (var i = 0; i < data.testResult.length; i++) {
						testTime += data.testResult[i].testTime;
						if (data.testResult.length - i != 1) {
							testTime += '<hr/>';
						}
					}
					return testTime;
				}
			},
			{
				title: '检验员',
				align: 'center',
				templet: function(data) {
					var testername = '';
					for (var i = 0; i < data.testResult.length; i++) {
						testername += data.testResult[i].testerNames;
						if (data.testResult.length - i != 1) {
							testername += '<hr/>';
						}
					}
					return testername;
				}
			},
			{title: '添加检验结果',align: 'center',//templet: '#switchTpl',
					templet:(
						function (data){							
							if(data.isaddFinalTestResultsType == 1){
							var testername ="";																					
								for(var i=0;i<data.testResult.length;i++){
									testername +='<input type="checkbox" lay-skin="primary" name="result" value="'+data.testResult[i].testResultId+'">'																																										
									if(data.testResult.length - i !=1){
										testername += "<hr/>";										
										}																						
								}															
								return testername;
												
											}								
										})
			},
				
				
			
			//本次检验结果
			{ field: 'trValue', title: 'TR值(U/mL)', align: 'center' },
			{ field: 'omaTrValue', title: 'OMA/TR', align: 'center' },
			{ field: 'testTime', title: '检验日期', align: 'center' },
			//既往检测结果
			{  title: 'TR值(U/mL)', align: 'center' },
			{ title: 'OMA/TR', align: 'center' },
			{ title: '检验日期', align: 'center' },
			{ field: 'fsectionName', title: '科室', align: 'center' },
			{ field: 'clinicalDiagnosis', title: '临床诊断', align: 'center' },
			{ field: 'pastHistory', title: '异常指标', align: 'center' }
		]
	],
	page: true, //是否显示分页
	limit: 15,
	limits: [ 15 ],
	id: 'idTest',
	done: function(res, curr, count) {			
		}
});

table.on('row(demo)', function(obj) {	
	//console.log(obj);
	// if (obj.tr.find("[type='checkbox']").attr('checked')) {
	// 	obj.tr.find("[type='checkbox']").attr('checked', false);
	// 	obj.tr.find('.layui-unselect').removeClass('layui-form-checked');
	// 	obj.tr.removeClass('layui-table-click');
	// } else {
	// 	obj.tr.find("[type='checkbox']").attr('checked', 'checked');
	// 	obj.tr.find('.layui-unselect').addClass('layui-form-checked');
	// 	obj.tr.addClass('layui-table-click');
	// }
});
//批量
var active = {
	reload: function() {
		var startime = $('#start').val();
		var endtime = $('#end').val();
		var name = $('#name').val();
		var unit = $('#unit').val();
		var number = $('#number').val();
		var check = $('#check').val();

		//执行重载
		table.reload('idTest', {
			page: {
				curr: 1
			},
			where: {
				finspectionUnitName: unit,
				startTime: startime,
				endTime: endtime,
				testerName: name,
				inspectionUnitNumber: number,
				isaddFinalTestResults: check
				//flaboratoryId:room
			}
		});
	},
	getCheckLength: function() {
		//批量删除
		var checkStatus = table.checkStatus('idTest'),
			data = checkStatus.data;
		if (data.length == 0) {
			layer.open({
				type: 1,
				shade: 0,
				content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
				area: [ '200px', '100px' ],
				time: 700
			});
			return false;
		} else {
			var str = [];
			for (var i = 0; i < data.length; i++) {
				str.push(data[i].id);
			}
			var ids = str.join(',');
			http.ajax({
				url:'/bloodAuduting/batchDeletedAdudting',
				type: 'POST',
				json: false,
                mask: true,
				beforeSend: function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader('Authorization', token);
				},
				data: { ids: ids },
			}).then(function(data) {
					if (data.code == 0) {
						layer.msg('删除成功');
						table.reload('idTest', {});
					} else if (data.code == 500) {
						window.location.href = '../home.html';
					}
				},function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
				
			
		}
	},

	batchSubmit: function() {
		//批量提交
		var checkStatus = table.checkStatus('idTest'),
			data = checkStatus.data;
		if (data.length == 0) {
			layer.open({
				type: 1,
				shade: 0,
				content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
				area: [ '200px', '100px' ],
				time: 700
			});
			return false;
		} else {
			var str = [];
			for (var i = 0; i < data.length; i++) {
				str.push(data[i].id);
			}
			var ids = str.join(',');
			http.ajax({
				url:'/bloodAuduting/batchSubmitAuduting',
				type: 'POST',
				json: false,
                mask: true,
				beforeSend: function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader('Authorization', token);
				},
				data: { ids: ids },
			}).then(function(data) {
					if (data.code == 0) {
						layer.msg('提交成功');
						table.reload('idTest', {});
					} else if (data.code == 500) {
						window.location.href = '../home.html';
					}
				},function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })			
			
		}
	},
	batchMarkAudited: function() {
		//批量标记已审核
		var checkStatus = table.checkStatus('idTest'),
			data = checkStatus.data;
		if (data.length == 0) {
			layer.open({
				type: 1,
				shade: 0,
				content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
				area: [ '200px', '100px' ],
				time: 700
			});
			return false;
		} else {
			var str = [];
			for (var i = 0; i < data.length; i++) {
				str.push(data[i].id);
			}
			var ids = str.join(',');
			http.ajax({
				url: '/bloodAuduting/yetAuduting',
				type: 'POST',
				json: false,
                mask: true,
				beforeSend: function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader('Authorization', token);
				},
				data: { ids: ids },
			}).then(function(data) {
					if (data.code == 0) {
						layer.msg('批量审核成功');
						table.reload('idTest', {});
					} else if (data.code == 500) {
						window.location.href = '../home.html';
					}
				},function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
				
			
		}
	},
	Unchecked: function() {
		//批量标记未审核
		var checkStatus = table.checkStatus('idTest'),
			data = checkStatus.data;
		if (data.length == 0) {
			layer.open({
				type: 1,
				shade: 0,
				content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
				area: [ '200px', '100px' ],
				time: 700
			});
			return false;
		} else {
			var str = [];
			for (var i = 0; i < data.length; i++) {
				str.push(data[i].id);
			}
			var ids = str.join(',');
			http.ajax({
				url:'/bloodAuduting/notAuduting',
				type: 'POST',
				json: false,
                mask: true,
				beforeSend: function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader('Authorization', token);
				},
				data: { ids: ids },
			}).then(function(data) {
					if (data.code == 0) {
						layer.msg('批量标记成功');
						table.reload('idTest', {});
					} else if (data.code == 500) {
						window.location.href = '../home.html';
					}
				},function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
				
			
		}
	},
	allout: function () {//批量导出
        var finspectionUnitName = $("#unit").val();       
        var testerName = $("#name").val();      
        var startTime = $("#start").val();
        var endTime = $("#end").val();
        var inspectionUnitNumber = $("#number").val();       
        var isaddFinalTestResults = $("#check").val();//选入状态
 
    
        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.inspectionUnitNumber = inspectionUnitNumber
        param.testerName = testerName
      
        param.startTime = startTime
        param.endTime = endTime        
        param.isaddFinalTestResults = isaddFinalTestResults
        //param.batchNumber = batchNumber
        //param.testState = 0
        http.ajax({
            url: "/out/outBloodAuditingAll",
            type: "POST",
			json: false,
			mask: true,
            contentType: 'application/json',
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data:  JSON.stringify(param),
		}).then(function (data) {
                if (data.code == 0) {
                    var url=http.config.api                    
                    var url= url+"/"+data.data.filepath 
                    console.log(url)                  
                    window.location.href = url;
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            },function(err){
				console.log(err);
				// 错误回调，err是错误回调参数
				// 这里不处理错误也可以，上面都有集中处理错误，会tips
			})            
      
    },
    batchRetest: function(){ //批量复测
        var checkStatus = table.checkStatus('idTest') ,data = checkStatus.data;
        if(data.length==0){
            layer.open({
                type:1,
                shade:0,
                content:"<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area:['200px','100px'],               
            })          
            return false
        }else{
            var str=[];
            for(var i=0;i<data.length;i++){
                str.push(data[i].id)
            }
            var ids=str.join(',');
            layer.open({
                title: '复测原因',
                area: ['500px', '280px'],
                btn: ['确认', '取消'],
                type: 1,
                content: $('.refuse'),
                yes: function (index, layero) {               
                    layer.close(index)
                    http.ajax({
                        url: "/bloodAuduting/batchAgainTest",
                        type: "POST",
                        json: false,
                		mask: true,
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', token);
                        },
						data:{ids:ids, againTestReason:$("#refuse").val(),},
					}).then(function (data) {
                            if (data.code == 0) {                            
                                layer.msg('已复测');
                                table.reload('idTest',{});                        
                            }
                        },function(err){
							console.log(err);
							// 错误回调，err是错误回调参数
							// 这里不处理错误也可以，上面都有集中处理错误，会tips
						})    
                },
                btn2: function(){
                layer.closeAll();
            },
            })
       }
    },      
    
};

	
//监听工具条
table.on('tool(demo)', function(obj) {
	var data = obj.data;
    if (obj.event === 'markAudited') {//标记已审核
        layer.open({
            title: '确定吗？',
            area: ['200px', '100px'],
            btn: ['确认', '取消'],
            type: 1,
            content: '',
            yes: function (index, layero) {               
                layer.close(index)
                http.ajax({
                    url: "/bloodAuduting/yetAudutings",
                    type: "POST",
					json: false,
					mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id:data.id,                                                                                                                 
					}, 
				}).then(function (data) {
                        if (data.code == 0) {                            
                            layer.msg('已审核');
                            table.reload('idTest',{});                        
                        }
                    },function(err){
						console.log(err);
						// 错误回调，err是错误回调参数
						// 这里不处理错误也可以，上面都有集中处理错误，会tips
					})

            },
            btn2: function(){
            layer.closeAll();
        },
        })
		
    }else if(obj.event === 'Retest'){//复测
        layer.open({
        title: '复测原因',
        area: ['500px', '280px'],
        btn: ['确认', '取消'],
        type: 1,
        content: $('.refuse'),
        yes: function (index, layero) {               
            layer.close(index)
            http.ajax({
                url: "/bloodAuduting/againTest",
                type: "POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {
                    id:data.id,                        
                    againTestReason:$("#refuse").val(),                                                                     
				}, 
			}).then(function (data) {
                    if (data.code == 0) {                            
                        layer.msg('已提交');
                        table.reload('idTest',{});                        
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })

        },
        btn2: function(){
        layer.closeAll();
    },
    });
}else if(obj.event === 'result'){//修改最终检验结果              
    http.ajax({
        url: "/bloodAuduting/getResultById",
        type: "POST",
        json: false,
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
		data: {id:data.id}, 
	}).then(function (data) {
            $("#val1").val(trValue)
            $("#val2").val(omaValue)
            $("#val3").val(omaTrValue)
            if (data.code == 0) {                                                                     
            }
        },function(err){
			console.log(err);
			// 错误回调，err是错误回调参数
			// 这里不处理错误也可以，上面都有集中处理错误，会tips
		})                                                                                                                                              
   
    layer.open({
    title: '修改最终检验结果',
    area: ['500px', '280px'],
    btn: ['确认', '取消'],
    type: 1,
    content: $('.result'),
    yes: function (index, layero) {               
        layer.close(index)
        http.ajax({
            url: "/bloodAuduting/updateResult",
            type: "POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: {
                id:data.id,                        
                trValue:$("#val1").val(), 
                omaValue:$("#val2").val(),                                                                    
			},  
		}).then(function (data) {
                if (data.code == 0) {                            
                    layer.msg('修改成功');
                    table.reload('idTest',{});                        
                }
            },function(err){
				console.log(err);
				// 错误回调，err是错误回调参数
				// 这里不处理错误也可以，上面都有集中处理错误，会tips
			})


    },
    btn2: function(){
    layer.closeAll();
},
});
}else if(obj.event === 'edit'){
    window.location.href = "addingTestResults.html?id=" + obj.data.id;
}else if(obj.event === 'Submission'){//提交批准
    layer.open({
        title: '确定吗？',
        area: ['200px', '100px'],
        btn: ['确认', '取消'],
        type: 1,
        content: '',
        yes: function (index, layero) {               
            layer.close(index)
            http.ajax({
                url: "/bloodAuduting/resultsApprove",
                type: "POST",
				json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {
                    id:data.id,                                                                                                                 
				},
			}).then(function (data) {
                    if (data.code == 0) {                            
                        layer.msg('已提交');
                        table.reload('idTest',{});                        
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })                                                                    
        },
        btn2: function(){
        layer.closeAll();
    },
    })
}
});

//清空
$('#clear').click(function() {
	$('#unit').val('');
	$('#start').val('');
	$('#end').val('');
	$('#name').val('');
	$('#check').val('');
	form.render();
});
//搜索
$('#search').click(function() {
	var type = $(this).data('type');
	active[type] ? active[type].call(this) : '';
});
//批量删除
$('#all').click(function() {
	var type = $(this).data('type');
	active[type] ? active[type].call(this) : '';
});
//批量提交
$('#batchSubmit').click(function() {
	var type = $(this).data('type');
	active[type] ? active[type].call(this) : '';
});
//批量导出
$("#allout").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//批量添加结果
$("#addResult").click(function(){
	var str=[];									
	$('input[name="result"]:checked').each(function(){//遍历每一个名字为nodes的复选框，其中选中的执行函数   
		str.push($(this).val());
		//将选中的值添加到数组chk_value中      
	});
	var ids=str.join(',');
	if(ids.trim() == ""){
    	layer.msg("请选择一项");
		return;
    }								
	http.ajax({
		url:'/bloodAuduting/addResult',
		type: 'POST',
		json: false,
        mask: true,
		beforeSend: function(XMLHttpRequest) {
				XMLHttpRequest.setRequestHeader('Authorization', token);
		},
		data: {resultId:ids},
	}).then(function(data) {
		if (data.code == 0) {
			layer.msg('添加成功');
			table.reload('idTest', {});
			} else if (data.code == 500) {
			window.location.href = '../home.html';
						}
					},function(err){
						console.log(err);
						// 错误回调，err是错误回调参数
						// 这里不处理错误也可以，上面都有集中处理错误，会tips
					})
				
		
})
//标记已检验
$('#batchMarkAudited').click(function() {
	var type = $(this).data('type');
	active[type] ? active[type].call(this) : '';
});
//标记未检验
$('#Unchecked').click(function() {
	var type = $(this).data('type');
	active[type] ? active[type].call(this) : '';
});
//批量复测
$('#batchRetest').click(function() {
	var type = $(this).data('type');
	active[type] ? active[type].call(this) : '';
});
//监听select值
form.on('select(check)', function(data) {
	if (data.value == '0') {
		$('#batchMarkAudited').css('display', 'inline-block');
		$('#Unchecked').css('display', 'none');
		$('#batchRetest').css('display', 'none');
		$('#addResult').css('display', 'none');
		$('#batchSubmit').css('display', 'none');
	} else if (data.value == '1') {
		$('#batchMarkAudited').css('display', 'none');
		$('#Unchecked').css('display', 'inline-block');
		$('#batchSubmit').css('display', 'inline-block');
		$('#batchRetest').css('display', 'inline-block');
		$('#addResult').css('display', 'inline-block');
	}
});
document.getElementById("check").options.selectedIndex = 0; //回到初始状态
//$("#check").selectpicker('refresh');//对searchPayState
