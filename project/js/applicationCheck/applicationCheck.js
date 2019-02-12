var $ = layui.$
var form = layui.form;
var table = layui.table;
function GetUrlParam(paraName) {
    　　　　var url = document.location.toString();
    　　　　var arrObj = url.split("?");

    　　　　if (arrObj.length > 1) {
    　　　　　　var arrPara = arrObj[1].split("&");
    　　　　　　var arr;

    　　　　　　for (var i = 0; i < arrPara.length; i++) {
    　　　　　　　　arr = arrPara[i].split("=");

    　　　　　　　　if (arr != null && arr[0] == paraName) {
    　　　　　　　　　　return arr[1];
    　　　　　　　　}
    　　　　　　}
    　　　　　　return "";
    　　　　}
    　　　　else {
    　　　　　　return "";
    　　　　}
    　　}

console.log(GetUrlParam("status"))

$(function(){
    if(GetUrlParam("status")==1){
        console.log(111)
        $("#check").val(1)
        $("#adopt1").css("display","inline-block")
        $("#allsubmit1").css("display","none")
        http.ajax({
            url: "/bloodSampleTest/queryLaboratory",
            type:"POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization',token);
            },
        }).then(function (data) {
                if(data.code==0){
                    var nuitdata=data.data.rows;
                    for(var i=0;i<nuitdata.length;i++){
                        $("#room").append('<option value="'+nuitdata[i].id+'">'+nuitdata[i].laboratoryName+'</option>')
                    }
                    form.render()
                }else if(data.code==500){
                    window.location.href="../../log.html"
                }
            })

    }else if(GetUrlParam("status")==0){
        $("#check").val(0)
        $("#adopt1").css("display","none")
        $("#allsubmit1").css("display","inline-block")
        http.ajax({
            url: "/bloodSampleTest/queryLaboratory",
            type:"POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization',token);
            },
        }).then(function (data) {
                if(data.code==0){
                    var nuitdata=data.data.rows;
                    for(var i=0;i<nuitdata.length;i++){
                        $("#room").empty()
                    }
                    form.render()
                }else if(data.code==500){
                    window.location.href="../../log.html"
                }
            })
    }

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
                //console.log($("#unit"))
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
    elem: '#end' //指定元素
});


    if(GetUrlParam("status")==1){
        table.render({
            elem: '#test'
            ,url: url +'/bloodAudit/queryBloodAudit'
            ,method:'post'
            ,contentType:'application/json'
            , where: {
                finspectionUnitName: '',
                inspectionUnitNumber: '',
                testerName: '',
                flaboratoryId:1,
                startTime: '',
                endTime: '',
                chooesStatus: 1,

            }
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
                {type:'checkbox'}
                ,{title: '序号',align:'center',type:'numbers'}
                ,{field:'fanticoagulantName', title: '抗凝剂',align:'center'}
                ,{field:'batchNumber', title: '批次号',align:'center'}
                ,{field:'finspectionUnitName', title: '送检单位',align:'center'}
                ,{field:'inspectionUnitNumber', title: '送检单位编号',align:'center',minWidth:140}
                ,{field:'testerName', title: '姓名',align:'center'} //单元格内容水平居中
                ,{field:'testerSex', title: '性别',align:'center'} //单元格内容水平居中
                ,{field:'phoneNumber', title: '电话号码',align:'center'}
                ,{field:'testerAge',title:'年龄',align:'center'}
                ,{field:'outpatientNumber', title: '门诊号',align:'center'}
                ,{field:'admissionNumber', title: '住院号',align:'center'}
                ,{field:'bedNumber', title: '床号',align:'center'}
                ,{field:'infectedPatch', title: '病区',align:'center'}
                ,{field:'fsectionName', title: '科室',align:'center'}
                ,{field:'takebloodTime', title: '采血时间',align:'center'}
                ,{field:'inspectionTime', title: '送检时间',align:'center'}
                ,{field:'buttPeopleFaccountName', title: '对接员',align:'center'}
                ,{field:'customerSource', title: '客户来源',align:'center'}
                ,{title: '操作',align:'center',toolbar: '#barDemo',minWidth:340,fixed:'right'}
            ]]
            ,page: true //是否显示分页
            ,limit: 15
            ,limits:[15]
            ,id:'idTest'
        });
    }else if(GetUrlParam("status")==0){
        table.render({
            elem: '#test'
            ,url: url +'/bloodAudit/queryBloodAudit'
            ,method:'post'
            ,contentType:'application/json'
            , where: {
                finspectionUnitName: '',
                inspectionUnitNumber: '',
                testerName: '',
                flaboratoryId:0,
                startTime: '',
                endTime: '',
                chooesStatus: 0,

            }
            ,parseData:function(res){
                if(res.code==500){
                    window.location.href="../../log.html"
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
                {type:'checkbox'}
                ,{title: '序号',align:'center',type:'numbers'}
                ,{field:'fanticoagulantName', title: '抗凝剂',align:'center'}
                ,{field:'batchNumber', title: '批次号',align:'center'}
                ,{field:'finspectionUnitName', title: '送检单位',align:'center'}
                ,{field:'inspectionUnitNumber', title: '送检单位编号',align:'center',minWidth:140}
                ,{field:'testerName', title: '姓名',align:'center'} //单元格内容水平居中
                ,{field:'testerSex', title: '性别',align:'center'} //单元格内容水平居中
                ,{field:'phoneNumber', title: '电话号码',align:'center'}
                ,{field:'testerAge',title:'年龄',align:'center'}
                ,{field:'outpatientNumber', title: '门诊号',align:'center'}
                ,{field:'admissionNumber', title: '住院号',align:'center'}
                ,{field:'bedNumber', title: '床号',align:'center'}
                ,{field:'infectedPatch', title: '病区',align:'center'}
                ,{field:'fsectionName', title: '科室',align:'center'}
                ,{field:'takebloodTime', title: '采血时间',align:'center'}
                ,{field:'inspectionTime', title: '送检时间',align:'center'}
                ,{field:'buttPeopleFaccountName', title: '对接员',align:'center'}
                ,{field:'customerSource', title: '客户来源',align:'center'}
                ,{title: '操作',align:'center',toolbar: '#barDemo',minWidth:340,fixed:'right'}
            ]]
            ,page: true //是否显示分页
            ,limit: 15
            ,limits:[15]
            ,id:'idTest'
        });
    }


var active = {
    reload: function(){
        var startime = $('#start').val();
        var endtime=$("#end").val();
        var name =$("#name").val();
        var unit =$("#unit").val();
        var number =$("#number").val();
        var check =$("#check").val();
        var room =$("#room").val();



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
                chooesStatus:check,
                flaboratoryId:room
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
                }, function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })


       }
    },
   allsubmit:function(){
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
               url: "/bloodAudit/chooseInto",
               type:"POST",
               dataType:"JSON",
               beforeSend: function (XMLHttpRequest) {
                   XMLHttpRequest.setRequestHeader('Authorization',token);
               },
               data:{ids:ids},
            }).then(function (data) {
                   if(data.code==0){
                       layer.msg('提交成功');
                       table.reload('idTest',{});
                   }else if(data.code==500){
                    window.location.href='../home.html'
                   }
               },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })


       }
   },
   adopt:function(){//批量通过
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
            url:"/bloodAudit/batchPassRequest",
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
                 window.location.href='../home.html'
                }else if(data.code==9999){
                    layer.msg(data.msg);
                   }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })


    }
},
outApplicationReviewAll: function () {//批量导出
    var finspectionUnitName = $("#unit").val();
    var testerName = $("#name").val();
    var startTime = $("#start").val();
    var endTime = $("#end").val();
    var inspectionUnitNumber = $("#number").val();
    var flaboratoryId = $("#room").val();//检验室id
    var chooesStatus = $("#check").val();//选入状态

    var param = {}
    param.finspectionUnitName = finspectionUnitName
    param.inspectionUnitNumber = inspectionUnitNumber
    param.testerName = testerName
   // param.admissionNumber = admissionNumber
    //param.outpatientNumber = outpatientNumber
    param.startTime = startTime
    param.endTime = endTime
    param.flaboratoryId = flaboratoryId
    param.chooesStatus = chooesStatus
    //param.batchNumber = batchNumber
    //param.testState = 0
    $.ajax({
        url: url + "/out/outApplicationReviewAll",
        type: "POST",
        dataType: "JSON",
        contentType: 'application/json',
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
        data: JSON.stringify(param),

        success: function (data) {
            if (data.code == 0) {
                console.log(data);
                var url = "http://47.93.22.122:8104/SSM/"

                var urls = url + data.data.filepath
                console.log(url)
                window.location.href = urls;
            } else if (data.code == 500) {
                window.location.href = "../home.html"
            }
        }
    })

}
};

//监听工具条
table.on('tool(demo)', function(obj){
    var data = obj.data;
    obj.tr.css('background-color','white')
    if(obj.event === 'choose'){
        http.ajax({
            url:"/bloodAudit/selectedInto",
            type:"POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization',token);
            },
            data:{id:data.id},
        }).then(function (data) {
                if(data.code==0){
                    layer.msg('选入成功');
                    table.reload('idTest',{});
                    layer.close(index);
                }else if(data.code==9999){
                    layer.msg(data.msg)
                    layer.close(index);
                }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })

    } else if(obj.event === 'del'){//删除
        layer.confirm('确定删除吗',{icon: 3, title:'提示'}, function(index){
            http.ajax({
                url:"/bloodAudit/deletedBloodAudit",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
                data:{id:data.id},
            }).then(function (data) {
                    if(data.code==0){
                        layer.msg('删除成功');
                        table.reload('idTest',{});
                        layer.close(index);
                    }else if(data.code==9999){
                        layer.msg(data.msg)
                        layer.close(index);
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })


        });
    } else if(obj.event === 'tongguo'){//通过
        layer.confirm('确定通过吗',{icon: 3, title:'提示'}, function(index){
            http.ajax({
                url:"/bloodAudit/submit",
                type:"POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization',token);
                },
                data:{id:data.id},
            }).then(function (data) {
                    if(data.code==0){
                        layer.msg('已通过');
                        table.reload('idTest',{});
                        layer.close(index);
                    }else if(data.code==9999){
                        layer.msg(data.msg)
                        layer.close(index);
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
        });
    }else if(obj.event === 'jujue'){//拒绝
        layer.open({
            title: '拒绝原因',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.refuse'),
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodAudit/formRejectReason",
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
                }).then(function (data) {
                        if (data.code == 0) {
                            layer.msg('已拒绝');
                            table.reload('idTest',{});
                        }
                    },function (err) {
                        console.log(err);
                    })
            },
            btn2: function(){
            layer.closeAll();
        },
        });

    }else if(obj.event === 'pch'){//修改批次号
        var id=data.id
        var  batchNumber = data.batchNumber
        http.ajax({
            url: "/bloodAudit/findBatchNumber",
            type: "POST",
            json: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: {id:id,batchNumber:data.batchNumber},
        }).then(function (data) {
                $("#val4").val(batchNumber)
                if (data.code == 0) {
                }
            })
        layer.open({
            title: '修改批次号',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.xgnumber'),
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodAudit/updateBatchNumber",
                    type: "POST",
                    json: false,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id:data.id,batchNumber:$("#val4").val(),
                    },
                }).then(function (data) {
                        if (data.code == 0) {
                            layer.msg('修改成功');
                            table.reload('idTest',{});
                        }
                    },function (xml, text) {
                        layer.close(index)
                    })
            },
            btn2: function(){
            layer.closeAll();
        },
        });
    }
    else if(obj.event === 'edit'){//编辑
        var status=$("#check").val()
        console.log(status)
        window.location.href="editApplication.html?id="+obj.data.id+"&status="+status;

    }else if(obj.event=='detail'){//关联信息
        var status=$("#check").val()
        console.log(status)
        window.location.href="related.html?id="+obj.data.id+"&status="+status;
    }
});




//监听复选框
table.on('checkbox(demo)', function(obj){//选中和批量选中
    if(obj.checked){
        obj.tr.addClass('yellow');
    }else{
        obj.tr.removeClass('yellow')
    }
    if(obj.type=="all"){
        if(obj.checked){
            obj.tr.removeClass('yellow');
            $("#specialtable").find('tbody').find("tr").addClass("yellow");
        }else{
            if( $("#specialtable").find('tbody').find("tr").hasClass("yellow")){
                $("#specialtable").find('tbody').find("tr").removeClass("yellow");
            }else{
                $("#specialtable").find('tbody').find("tr").removeClass("yellow");
                $("#specialtable").find('tbody').find("tr").addClass("yellow");
            }
        }

    }
});
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
//批量选入
$("#allsubmit").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//批量导出
$("#outApplicationReviewAll").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//批量通过
$("#adopt").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//监听select值
form.on('select(check)', function(data){
    var chooesStatus = data.value
    console.log(chooesStatus)
    sessionStorage.setItem("chooesStatus", JSON.stringify(chooesStatus))
    if(chooesStatus == 1){
        $("#adopt1").css("display","inline-block")
        $("#allsubmit1").css("display","none")
        http.ajax({
            url: "/bloodSampleTest/queryLaboratory",
            type:"POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization',token);
            },
        }).then(function (data) {
                if(data.code==0){
                    var nuitdata=data.data.rows;
                    for(var i=0;i<nuitdata.length;i++){
                        $("#room").append('<option value="'+nuitdata[i].id+'">'+nuitdata[i].laboratoryName+'</option>')
                    }
                    form.render()
                }else if(data.code==500){
                    window.location.href="../../log.html"
                }
            })
    }else if(chooesStatus ==0){
        http.ajax({
            url: "/bloodSampleTest/queryLaboratory",
            type:"POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization',token);
            },
        }).then(function (data) {
                if(data.code==0){
                    var nuitdata=data.data.rows;
                    for(var i=0;i<nuitdata.length;i++){
                        $("#room").empty()
                    }
                    form.render()
                }else if(data.code==500){
                    window.location.href="../../log.html"
                }
            })

        $("#adopt1").css("display","none")
        $("#allsubmit1").css("display","inline-block")

    };

});









//document.getElementById('check').value='<%=request.getParameter("check")%>';

 //document.getElementById("check").options.selectedIndex = 1; //回到初始状态
// // $("#check").selectpicker('refresh');//对searchPayState
