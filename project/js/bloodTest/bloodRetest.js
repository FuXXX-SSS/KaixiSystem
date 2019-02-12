var $ = layui.$
var form = layui.form;
var table = layui.table;


console.log()
$(function(){//下拉框
    http.ajax({
        url:'/bloodSampleTest/queryInspectionUnit',
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
table.render({//检验复测
    elem: '#test'
    ,url: url + '/bloodInspect/queryBloodAgainTest'
    ,method:'post'
    ,contentType:'application/json'
    ,parseData:function(res){
        if(res.code==500){
            window.location.href="../../log.html"
        }
        if (res.code == 9999 ) {
            layer.msg(res.msg);
        }
        if(res.code == 0){
            var data = res.data
            if(data.total==0){
                $(".layui-table-header").css("overflow","visible")
                $(".layui-table-box").css("overflow","auto")
            }
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
        {type:'checkbox',rowspan: 2}
        ,{title: '序号',align:'center',rowspan: 2,type:'numbers'}
        ,{field:'isaddTestresult', title: '状态',align:'center',rowspan: 2,colspan:1}
        ,{field:'batchNumber', title: '批次号',align:'center',rowspan: 2,colspan:1}
        ,{field:'finspectionUnitName', title: '送检单位',align:'center',rowspan: 2,colspan:1}
        ,{field:'testerName', title: '姓名',align:'center',rowspan: 2,colspan:1}
        ,{field:'testerSex', title: '性别',align:'center',rowspan: 2,colspan:1}
        ,{field:'testerAge', title: '年龄',align:'center',rowspan: 2,colspan:1}
        ,{field:'fsectionName', title: '科室',align:'center',rowspan: 2,colspan:1}
        ,{field:'inspectionOfficeNumber', title: '检验所编号',align:'center',minWidth:140,rowspan: 2,colspan:1}
        ,{title: '检验结果',align:'center', colspan:6,rowspan:1}
        ,{field:'bloodSamplePreparation', title: '血样备注',align:'center',rowspan: 2,colspan:1}
        ,{field:'customerSource', title: '客户来源',align:'center',rowspan: 2,colspan:1}
        ,{field:'sampleConfirmationAccountName', title: '样本确认员',align:'center',rowspan: 2,colspan:1}
        ,{field:'againTestReason', title: '复测原因',align:'center',rowspan: 2}
        ,{title: '操作',align:'center',toolbar: '#barDemo',minWidth:280,rowspan: 2,}
    ]
        ,[
            {title : 'TR值(U/mL)',align : 'center', style:'height:auto;', templet :
             function (rows){
                var tr ='';
                for(var i=0;i<rows.testResult.length;i++){
                        tr += rows.testResult[i].trValue;
                        if(rows.testResult.length - i !=1){
                            tr += "<hr/>";
                        }
                }
                return tr;
           }
        },
            //{title: 'TR值(U/ML)',align:'center',minWidth:'130', colspan:1 ,rowspan:2},
            { title: 'OMA',align:'center',templet :
            function (data){
               var oma ='';
               for(var i=0;i<data.testResult.length;i++){
                       oma += data.testResult[i].omaValue;
                       if(data.testResult.length - i !=1){
                        oma += "<hr/>";
                       }
               }
               return oma;
          }},
            { title: 'OMA/TR',align:'center',templet : function (data){
                var omatr ='';
                for(var i=0;i<data.testResult.length;i++){
                    omatr += data.testResult[i].omaTrValue;
                    if(data.testResult.length - i !=1){
                        omatr += "<hr/>";
                    }
                }
                return omatr;
            }
        },
            {title: '仪器型号',align:'center',
            templet : function (data){
                var instrumentModel = '';
                for(var i=0;i<data.testResult.length;i++){
                    instrumentModel += data.testResult[i].instrumentModel;
                    if(data.testResult.length - i !=1){
                        instrumentModel += "<hr/>";
                        }
                }
                return instrumentModel;
            }},
            { title: '检验日期',align:'center',
            templet : function (data){
                var testTime = '';
                for(var i=0;i<data.testResult.length;i++){
                    testTime += data.testResult[i].testTime;
                    if(data.testResult.length - i !=1){
                        testTime += "<hr/>";
                        }
                }
                return testTime;
            } },
            {title: '检验员',align:'center',templet : function (data){
                var testername ="";
                for(var i=0;i<data.testResult.length;i++){
                    testername += data.testResult[i].testerNames;
                    if(data.testResult.length - i !=1){
                        testername += "<hr/>";
                            }
                    }
                    return testername;
            }},
        ]
    ]
    ,page: true //是否显示分页
    ,limit: 15
    ,limits:[15]
    ,id:'idTest'
    ,done:function(res, curr, count){

    }
});

// table.on('row(demo)', function(obj){
//     if(obj.tr.find("[type='checkbox']").attr('checked')){
//         obj.tr.find("[type='checkbox']").attr('checked',false);
//         obj.tr.find('.layui-unselect').removeClass('layui-form-checked');
//         obj.tr.removeClass('layui-table-click');
//     }else{
//         obj.tr.find("[type='checkbox']").attr('checked','checked')
//         obj.tr.find('.layui-unselect').addClass('layui-form-checked');
//         obj.tr.addClass('layui-table-click');
//     }
//
// });
//监听工具条
table.on('tool(demo)', function(obj){
    var data = obj.data;
    if(obj.event === 'detail'){//添加检验结果
        var id=data.id
        console.log(id);
        layer.open({
            title: '添加检验结果',
            area: ['500px', '298px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.officeadd'),
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodInspect/resultVerify",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        trValue: $("#val1").val(),
                        omaValue:$("#val2").val(),
                        instrumentModel:$("#val3").val(),
                        // testTimes:$("#start1").val(),
                        bloodSampelTestId:data.id,
                    },
                }).then(function (data) {
                        if (data.code == 0) {
                            layer.msg('添加成功');
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
    }else if(obj.event === 'xgnumber'){//修改检验所编号
        var id=data.id
        var  id = id
        http.ajax({
            url: "/bloodInspect/findOfficeNumber",
            type: "POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: {
                id:id,
                // inspectionOfficeNumber:data.inspectionOfficeNumber
            },
        }).then(function (data) {
                $("#val4").val(data.data)
                if (data.code == 0) {
                }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })
        layer.open({
            title: '修改检验所编号',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.xgnumber'),
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodInspect/updateOfficeNumber",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id:data.id,inspectionOfficeNumber:$("#val4").val(),
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
    }else if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
            obj.del();
            layer.close(index);
        });
    } else if(obj.event === 'edit'){
        window.location.href = "testResults.html?id=" + obj.data.id;
    }else if(obj.event === 'Submission'){//提交审核
        http.ajax({
            url: "/bloodInspect/submitAudit",
            type: "POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: {id:data.id},
        }).then(function (data) {
                if (data.code == 0) {
                    layer.msg('提交成功');
                    table.reload('idTest', {});
                } else if (data.code == 500) {
                    window.location.href = '../home.html'
                }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })
    }

});
//批量
var active = {
    reload: function(){
        var startime = $('#start').val();
        var endtime=$("#end").val();
        var name =$("#name").val();
        var unit =$("#unit").val();
        var number =$("#number").val();
        var check =$("#check").val();


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
                isaddTestresult:check,
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
    allout: function () {//批量导出
        var finspectionUnitName = $("#unit").val();
        var testerName = $("#name").val();
        var startTime = $("#start").val();
        var endTime = $("#end").val();
        var inspectionUnitNumber = $("#number").val();
        var isaddTestresult = $("#check").val();//选入状态


        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.inspectionUnitNumber = inspectionUnitNumber
        param.testerName = testerName
       // param.admissionNumber = admissionNumber
        //param.outpatientNumber = outpatientNumber
        param.startTime = startTime
        param.endTime = endTime
        param.isaddTestresult = isaddTestresult
        //param.batchNumber = batchNumber
        //param.testState = 0
        http.ajax({
            url: "/out/outBloodAgainTestAll",
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
                    window.location.href = url;
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            })

    },
    batchSubmit: function(){ //批量提交
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
                url:"/bloodInspect/batchSubmit",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
                data:{ids:ids},
            }).then(function (data) {
                  if(data.code==0){
                      layer.msg('提交成功');
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
    toTest: function(){ //标记已检验
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
                url:"/bloodInspect/yetTest",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
                data:{ids:ids},
            }).then(function (data) {
                  if(data.code==0){
                      layer.msg('标记成功');
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
    Unchecked: function(){ //标记未检验
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
                url:basePath+"/bloodInspect/notTest",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
                data:{ids:ids},
            }).then(function (data) {
                  if(data.code==0){
                      layer.msg('标记成功');
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
    omaTr: function(){ //导入omatr
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
                url:"/bloodInspect/importOMATR",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
                data:{ids:ids},
            }).then(function (data) {
                  if(data.code==0){
                      layer.msg('标记成功');
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
};
//清空
$("#clear").click(function(){
    $("#unit").val("");
    $('#start').val("");
    $("#end").val("")
    $("#name").val("")
    $("#check").val("");
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
//批量提交
$("#batchSubmit").click(function(){
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
//标记已检验
$("#toTest").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//标记未检验
$("#Unchecked").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})

//导入
$("#allinput").change(function (e) {
    var formData = new FormData();
    var File = e.target.files[0];
    formData.append('file', File);
    var filename = File.name;
    var filetype = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
    if (filetype !== "xlsx" && filetype !== "xls") {
        layui.msg("请上传excel文件！")
        return false
    }
    http.ajax({
        url: "/bloodInspect/importOMATR",
        type: "POST",
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
        contentType: false,
        processData: false,
        data: formData,
    }).then(function (data) {
            if (data.code == 0) {
                layer.msg("导入成功")
            } else if (data.code == 9999) {
                layer.msg(data.msg)
            }
        },function(err){
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        })

})


//监听select值
form.on('select(check)', function(data){
    if(data.value == "0"){
        $("#toTest").css("display","inline-block")
        $("#Unchecked").css("display","none")
        $("#batchSubmit").css("display","none")


    }else if(data.value == "1"){
        $("#toTest").css("display","none")
        $("#Unchecked").css("display","inline-block")
        $("#batchSubmit").css("display","inline-block")

    }


});

 //下载模板
 $("#loader").click(function(){
    window.location.href=url+"/bloodInspect/downloadExcel"
})
document.getElementById("check").options.selectedIndex = 0; //回到初始状态
//$("#check").selectpicker('refresh');//对searchPayState
