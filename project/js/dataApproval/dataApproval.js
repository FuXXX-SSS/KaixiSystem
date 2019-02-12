var $ = layui.$
var form = layui.form;
var table = layui.table;
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
table.render({
    elem: '#test'
    ,url: url + '/bloodApprove/queryBloodApprove'
    ,method:'post'
    ,contentType:'application/json'
    ,parseData:function(res){
        if(res.code==500){
            window.location.href="../../log.html"
        }
        if (res.code == 9999 ) {
            layer.msg(res.msg);
        }
        // if(res.code==0){
        //     console.log(123);
        //     $('.layui-none').width($('.layui-table-header table').width()+'px');
        //     $('.empty-data').width($('.layui-table-body').width()+'px');
        // }
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
        ,{field:'batchNumber', title: '批次号',align:'center',rowspan: 2,colspan:1}
        ,{field:'finspectionUnitName', title: '送检单位',align:'center',rowspan: 2}
        ,{field:'inspectionUnitNumber', title: '送检单位编号',align:'center',rowspan: 2,minWidth:140,colspan:1}
        ,{field:'testerName', title: '姓名',align:'center',rowspan: 2,colspan:1}
        ,{field:'testerSex', title: '性别',align:'center',rowspan: 2,colspan:1}
        ,{field:'inspectionTime', title: '送检时间',align:'center',rowspan: 2,colspan:1}
        ,{field:'inspectionOfficeNumber', title: '检验所编号',align:'center',minWidth:140,rowspan: 2,colspan:1}
        ,{field:'clinicalDiagnosis', title: '临床诊断',align:'center',rowspan: 2,colspan:1}
        ,{field:'pastHistory', title: '既往史',align:'center',rowspan: 2,colspan:1}
        ,{field:'beforResul',title: '检验结果',align:'center', colspan:4}
        ,{field:'instrumentModel', title: '仪器型号',align:'center',rowspan: 2,colspan:1}
        ,{field:'testTime', title: '检验日期',align:'center',rowspan: 2,colspan:1}
        ,{field:'whoTest', title: '检验人',align:'center',rowspan: 2,colspan:1}
        ,{field:'bloodSamplePreparation', title: '血样备注',align:'center',rowspan: 2,colspan:1}
        ,{field:'wealth', title: '客户来源',align:'center',rowspan: 2,colspan:1}
        ,{title: '本次检验结果',align:'center',colspan:3}
        ,{title: '操作',align:'center',toolbar: '#barDemo',minWidth:250,rowspan: 2,}
    ]
        ,[
            {title : 'TR值(U/mL)',align : 'center', style:'height:auto;', templet:function (rows){
                var tr ='';
                for(var i=0;i<rows.length;i++){
                        tr += rows.beforResul[i].trValue;
                        if(rows.beforResult.length - i !=1){
                            tr += "<hr/>";
                        }
                }
                return tr;
           }
        },

        { title: 'OMA',align:'center',templet : function (rows){
            var oma ='';
            for(var i=0;i<rows.length;i++){
                    oma += rows.beforResult[i].omaValue;
                    if(rows.beforResult.length - i !=1){
                     oma += "<hr/>";
                    }
            }
            return oma;
       }},

      { title: 'OMA/TR',align:'center',templet : function (rows){
        var omatr ='';
        for(var i=0;i<rows.length;i++){
            omatr += rows.beforResult[i].omaTrValue;
            if(rows.beforResult.length - i !=1){
                omatr += "<hr/>";
            }
        }
        return omatr;
    }
},
{ title: '检验日期',align:'center',
            templet : function (rows){
                var testTime = '';
                for(var i=0;i<rows.length;i++){
                    testTime += rows.beforResult[i].testTime;
                    if(rows.beforResult.length - i !=1){
                        testTime += "<hr/>";
                        }
                }
                return testTime;
            } },


            {field:"trValue" ,title: 'TR值(U/mL)',align : 'center', style:'height:auto;',
        //     templet : function (rows){
        //         var tr ='';
        //         for(var i=0;i<rows.length;i++){
        //                 tr += rows.beforResult[i].trValue;
        //                 if(rows.beforResult.length - i !=1){
        //                     tr += "<hr/>";
        //                 }
        //         }
        //         return tr;
        //    }
        },

        { field:'omaTrValue',title: 'OMA/TR',align:'center',
        // templet : function (rows){
        //     var omatr ='';
        //     for(var i=0;i<rows.length;i++){
        //         omatr += rows.beforResult[i].omaTrValue;
        //         if(rows.beforResult.length - i !=1){
        //             omatr += "<hr/>";
        //         }
        //     }
        //     return omatr;
        // }
    },
    {field:'testTime', title: '检验日期',align:'center',
    // templet : function (rows){
    //     var testTime = '';
    //     for(var i=0;i<rows.length;i++){
    //         testTime += rows.beforResult[i].testTime;
    //         if(rows.beforResult.length - i !=1){
    //             testTime += "<hr/>";
    //             }
    //     }
    //     return testTime;
    // }
},

        ]]
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

//批量
var active = {
    reload: function(){
        var startime = $('#start').val();
        var endtime=$("#end").val();
        var name =$("#name").val();
        var unit =$("#unit").val();
        var number =$("#number").val();
        var number1 =$("#number1").val();
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
                inspectionOfficeNumber:number1,
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
    batchAdopt: function(){ //批量通过
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
                title: '确定吗？',
                area: ['200px', '100px'],
                btn: ['确认', '取消'],
                type: 1,
                content: '',
                yes: function (index, layero) {
                    layer.close(index)
                    http.ajax({
                        url: "/bloodApprove/batchApprove",
                        type: "POST",
                        json: false,
                        mask: true,
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', token);
                        },
                        data:{ids:ids},
                    }).then(function (data) {
                            if (data.code == 0) {
                                layer.msg('已通过');
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
    allout: function () {//批量导出
        var finspectionUnitName = $("#unit").val();
        var testerName = $("#name").val();
        //var startTime = $("#start").val();
        var inspectionOfficeNumber = $("#number").val();//检验所编号
        var inspectionUnitNumber = $("#number1").val();
        //var isaddFinalTestResults = $("#check").val();//选入状态
       // var check =$("#check").val();
        //var room =$("#room").val();

        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.inspectionUnitNumber = inspectionUnitNumber
        param.testerName = testerName

       // param.startTime = startTime
        //param.endTime = endTime
        param.inspectionOfficeNumber = inspectionOfficeNumber
        //param.batchNumber = batchNumber
        //param.testState = 0
        http.ajax({
            url: "/out/outBloodApproveAll",
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
    batchRefuse: function(){ //批量拒绝
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
                title: '未批准原因',
                area: ['500px', '280px'],
                btn: ['确认', '取消'],
                type: 1,
                content: $('.refuse'),
                yes: function (index, layero) {
                    layer.close(index)
                    http.ajax({
                        url: "/bloodApprove/batchRejectApprove",
                        type: "POST",
                        json: false,
                        mask: true,
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', token);
                        },
                        data:{ids:ids},
                    }) .then(function (data) {
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
//批量导出
$("#allout").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
 //批量通过
 $("#batchAdopt").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//批量拒绝
$("#batchRefuse").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//监听工具条
table.on('tool(demo)', function(obj){
    var data = obj.data;
    if(obj.event === 'adopt'){//通过
        layer.open({
            title: '确定吗？',
            area: ['200px', '100px'],
            btn: ['确认', '取消'],
            type: 1,
            content: '',
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodApprove/passApprove",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id:data.id,
                    },
                }) .then(function (data) {
                        if (data.code == 0) {
                            layer.msg('已通过');
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
    } else if(obj.event === 'refuse'){//拒绝
        layer.open({
            title: '未批准原因',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.refuse'),
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodApprove/rejectApprove",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id:data.id,
                        resultsApproveReason:$("#refuse").val(),
                    },
                }) .then(function (data) {
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
    }
});
