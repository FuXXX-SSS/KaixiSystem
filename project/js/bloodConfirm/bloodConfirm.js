var $ = layui.$
var form = layui.form;
var table = layui.table;
$(function(){//下拉框
    http.ajax({
        url:"/bloodSampleTest/queryInspectionUnit",
        type:"POST",
        json: false,
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization',token);
        },
    }).then(function (data) {
            if(data.code==0){
                var nuitdata=data.data.rows;
                console.log($("#unit"))
                for(var i=0;i<nuitdata.length;i++){
                    $("#unit").append('<option value="'+nuitdata[i].unit_name+'">'+nuitdata[i].unit_name+'</option>')
                }
                form.render()
            }else if(data.code==500){
                window.location.href="../../log.html"
            }
        },function(err){
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        })     
})
$(function(){//弹框下拉选择
    http.ajax({
        url:"/bloodVerify/queryBloodPrepartion",
        type:"POST",
        json: false,
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization',token);
        },
    }).then(function (data) {
            if(data.code==0){
                var nuitdata=data.data.rows;
                console.log($("#Remarks"))
                for(var i=0;i<nuitdata.length;i++){
                    $("#Remarks").append('<option value="'+nuitdata[i].bloodSamplePreparation+'">'+nuitdata[i].bloodSamplePreparation+'</option>')
                }
                form.render()
            }else if(data.code==500){
                window.location.href="../../log.html"
            }
        },function(err){
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        });

      
})



var laydate = layui.laydate;
laydate.render({
    elem: '#start' //指定元素
});
laydate.render({
    elem: '#end' //指定元素
});
table.render({
    elem: '#test'
    ,url:url + '/bloodVerify/queryBloodVerify'
    ,method:'post'
    ,contentType:'application/json'
    ,parseData:function(res){
        if(res.code==500){
            window.location.href="../../log.html"
        }else if(res.code==0){
            http.ajax({
                url:"/bloodVerify/queryBloodPrepartion",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
            }).then(function (data) {
                    if(data.code==0){
                        var nuitdata=data.data.rows;                    
                        var $obj=$('<select name="city" lay-verify="required" id="select"></select>')
                        for(var i=0;i<nuitdata.length;i++){
                            $obj.append('<option value="'+nuitdata[i].bloodSamplePreparation+'">'+nuitdata[i].bloodSamplePreparation+'</option>')
                        }                                                                
                        $('tbody').find('.laytable-cell-1-0-19').append($obj)                
                     form.render()                          
                    }
                    else if(data.code==500){
                        window.location.href="../../log.html"
                    }
                  
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })            
        }
        return{
            'code':res.code,
            "msg":res.msg,
            "count":res.data.total,
            "data": res.data.rows
        }
    }
    ,request:{
        limitName: 'rows'
    }
    ,headers:{Authorization:token}
    ,height:'full-250'
    ,cellMinWidth:100
    ,cols: [[
        {type:'checkbox'}
        ,{ title: '序号',align:'center',type:'numbers'}
        ,{field:'isaddBloodInformation', title: '样本',align:'center'}
        ,{field:'batchNumber', title: '批次号',align:'center',width:140,}
        ,{field:'finspectionUnitName', title: '送检单位',align:'center',width:140}
        ,{field:'inspectionUnitNumber', title: '送检单位编号',align:'center',width:160}
        ,{field:'testerName', title: '姓名',align:'center'}
        ,{field:'testerSex', title: '性别',align:'center'}
        ,{field:'testerAge', title: '年龄',align:'center'}
        ,{field:'phoneNumber', title: '电话号码',align:'center'}
        ,{field:'fsectionName', title: '科室',align:'center'}
        ,{field:'takebloodTime', title: '采血时间',align:'center'}
        ,{field:'inspectionTime', title: '送检时间',align:'center'}
        ,{field:'customerSource', title: '客户来源',align:'center'}
        ,{field:'receiveTime', title: '接受时间',align:'center'}
        ,{field:'inspectionOfficeNumber', title: '检验所编号',align:'center',width:140,}
        ,{field:'sampleStorageLocation', title: '样本存放位置',align:'center',width:140,}
        ,{field:'sampleTemperature', title: '样本温度',align:'center', edit: 'text',width:140,}
      

   
        ,{field:'sampleSize', title: '样本量',align:'center', edit: 'text'}
        ,{field:'bloodSamplePreparation', title: '血样备注',align:'center',width:200, }             
           
                  
               
        ,{field:'sampleConfirmationAccountName', title: '确认员',align:'center'}
        ,{field:'wealth', title: '操作',align:'center',toolbar: '#barDemo',minWidth:250,fixed:'right'}
    ]]   
    ,page: true //是否显示分页
    ,limit: 15
    ,limits:[15]
    ,id:'idTest'
    ,done:function(res){   
       
    }
});

table.on('row(demo)', function(obj){
    if(obj.tr.find("[type='checkbox']").attr('checked')){
        obj.tr.find("[type='checkbox']").attr('checked',false);
        obj.tr.find('.layui-unselect').removeClass('layui-form-checked');
        obj.tr.removeClass('layui-table-click');
    }else{
        obj.tr.find("[type='checkbox']").attr('checked','checked')
        obj.tr.find('.layui-unselect').addClass('layui-form-checked');
        obj.tr.addClass('layui-table-click');
    }

});

//监听工具条
table.on('tool(demo)', function(obj){
    var data = obj.data; 
    var tr=obj.tr; 
    console.log(tr)
    if(obj.event === 'detail'){        
        layer.msg('ID：'+ data.id + ' 的查看操作');
    
    } else if(obj.event === 'edit'){//修改
        window.location.href="editApplication.html?id="+obj.data.id;
    }else if(obj.event === 'confirm'){//通过                
        http.ajax({
            url:"/bloodVerify/passBloodVerify",
            type:"POST",
            json: false,
                mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization',token);
            },
            data:{id:data.id},
        }).then(function (data) {
                if(data.code==0){
                    layer.msg('提交成功');  
                    table.reload('idTest',{});                                     
                    console.log(data)
                }else if(data.code==9999){
                    layer.msg(data.msg)                    
                }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })
                          
    }else if(obj.event === 'rejectBloodVerify'){//拒绝               
        layer.open({
            title: '拒绝原因',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.refuse'),
            yes: function (index, layero) {               
                layer.close(index)
                http.ajax({
                    url: "/bloodVerify/rejectBloodVerify",
                    type: "POST",
                    dson: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id:data.id,                        
                        bloodyRejectReason:$("#refuse").val(),                                                                     
                    }, 
                }).then(function (data) {
                        if (data.code == 0) {                            
                            layer.msg('已拒绝');
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
        
    }else if(obj.event === 'saveBloodVerify'){//添加样本信息   
        var val1 = $("tbody").find('.laytable-cell-1-0-17').text()
        var val2 = $("tbody").find('.laytable-cell-1-0-18').text()                     
        http.ajax({
            url:"/bloodVerify/saveBloodVerify",
            type:"POST",
            json: false,
                mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization',token);
            },
            data:{id:data.id,sampleTemperature:val1,sampleSize:val2,bloodSamplePreparation:$('#select').val()},
        }).then(function (data) {
                if(data.code==0){
                    layer.msg('添加成功');                                       
                    //console.log(data)
                    table.reload('idTest',{});
                }else if(data.code==9999){
                    layer.msg(data.msg)                    
                }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })
        
    }
    
});
var active = {
    reload: function(){
        var startime = $('#start').val();
        var endtime=$("#end").val();
        var name =$("#name").val();
        var unit =$("#unit").val();
        var number =$("#number").val(); 
        var check = $("#check").val()
        //var room =$("#room").val(); 
               

        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            ,where: {
                finspectionUnitName:unit,
                startTime:startime,
                endTime:endtime,
                testerName:name,
                inspectionUnitNumber:number,
                isaddBloodInformation:check

                //flaboratoryId:room
            }
        });
    },
   getCheckLength: function(){ //批量删除
        var checkStatus = table.checkStatus('idTest') ,data = checkStatus.data;
        if(data.length==0){
            layer.open({
                type:1,
                shade:0,
                content:"<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area:['200px','100px'],
                time:700
            })
            return false
        }else{
            var str=[];
            for(var i=0;i<data.length;i++){
                str.push(data[i].id)
            }
            var ids=str.join(',');
            http.ajax({
                url:"/bloodAudit/batchDeletedRequest",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
                data:{ids:ids},                              
            }).then(function (data) {                  
                  if(data.code==0){
                      layer.msg('删除成功');
                      table.reload('idTest',{});
                  }else if(data.code==500){
                      window.location.href="../home.html"
                  }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
                
           
       }
    },
    pladopt: function(){ //批量通过
        var checkStatus = table.checkStatus('idTest') ,data = checkStatus.data;
        if(data.length==0){
            layer.open({
                type:1,
                shade:0,
                content:"<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area:['200px','100px'],
                time:700
            })
            return false
        }else{
            var str=[];
            for(var i=0;i<data.length;i++){
                str.push(data[i].id)
            }
            var ids=str.join(',');
            http.ajax({
                url:"/bloodVerify/verifyBatchSubmit",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
                data:{ids:ids},
            }).then(function (data) {
                  if(data.code==0){
                      layer.msg('已成功');
                      table.reload('idTest',{});
                  }else if(data.code==500){
                      window.location.href="../home.html"
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
        var isaddBloodInformation = $("#check").val();//选入状态     
    
        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.inspectionUnitNumber = inspectionUnitNumber
        param.testerName = testerName
       // param.admissionNumber = admissionNumber
        //param.outpatientNumber = outpatientNumber
        param.startTime = startTime
        param.endTime = endTime        
        param.isaddBloodInformation = isaddBloodInformation
        //param.batchNumber = batchNumber
        //param.testState = 0
        http.ajax({
            url: "/out/outBloodSampleConfirmationAll",
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
    addition: function(){ //批量添加
        console.log($(".laytable-cell-1-0-19").children("select"));

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
                title:'批量添加信息',
                area:['700px','500px'],  
                type:1,                                           
                btn: ['确定','取消'], 
                content:$('.result'),              
                yes: function(index, layero){ 
                    layer.close(index)                                     
                    http.ajax({
                        url:"/bloodVerify/putIn",
                        type:"POST",
                        dataType:"JSON",
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization',token);
                        },
                        data:{ids:ids,sampleTemperature:$('#dh').val(),sampleSize:$('#bh').val(),bloodSamplePreparation:$('#select').val()},
                    }).then(function (data) {
                            console.log(data)
                          if(data.code==0){
                              layer.msg('添加成功');
                              table.reload('idTest',{});
                          }else if(data.code==500){
                              window.location.href="../home.html"
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

//清空
$("#clear").click(function(){
    $("#unit").val("");
    $('#start').val("");
    $("#end").val("")
    $("#name").val("")
    form.render()
});
//搜索
$("#search").click(function(){    
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
 //批量删除
 $("#all").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//批量添加
$("#addition").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//批量导出
$("#allout").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//全部提交
$("#pladopt").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})

//监听select值
form.on('select(check)', function(data){
    if(data.value == "0"){         
        $("#pladopt").css("display","none")        
        $("#addition").css("display","inline-block")          
    }else if(data.value == "1"){       
        $("#pladopt").css("display","inline-block")        
        $("#addition").css("display","none")
        
    }   

});

form.on('select(Remarks1)', function(data){
  
    
  

});

document.getElementById("check").options.selectedIndex = 0; //回到初始状态
//$("#check").selectpicker('refresh');//对searchPayState
