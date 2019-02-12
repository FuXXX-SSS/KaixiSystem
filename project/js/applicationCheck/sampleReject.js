var $ = layui.$
var form = layui.form;
var table = layui.table;
$(function(){
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


var laydate = layui.laydate;
laydate.render({
    elem: '#start' //指定元素
});
laydate.render({
    elem: '#end' //指定元素
});

table.render({
    elem: '#test'
    ,url:url+'/bloodAudit/bloodyReject'
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
    ,cellMinWidth: 100
    ,cols: [[
        {type:'checkbox'}
        ,{title: '序号',align:'center',type:'numbers'}
        ,{field:'batchNumber', title: '批次号',align:'center'}
        ,{field:'finspectionUnitName', title: '送检单位',align:'center'}
        ,{field:'inspectionUnitNumber', title: '送检单位编号',align:'center',minWidth:140}
        ,{field:'testerName', title: '姓名',align:'center'}
        ,{field:'testerSex', title: '性别',align:'center'}
        ,{field:'testerAge', title: '年龄',align:'center'}
        ,{field:'phoneNumber', title: '电话号码',align:'center'}
        ,{field:'fsectionName', title: '科室',align:'center'}
        ,{field:'inspectionOfficeNumber', title: '检验所编号',align:'center'}
        ,{field:'takebloodTime', title: '采血时间',align:'center'}
        ,{field:'inspectionTime', title: '送检时间',align:'center'}
        ,{field:'bloodyRejectReason', title: '拒绝原因',align:'center'}
        ,{field:'fanticoagulantName', title: '抗凝剂',align:'center'}
        ,{field:'fsendeeAccountName', title: '负责人',align:'center'}
        ,{field:'customerSource', title: '客户来源',align:'center'}
        ,{ title: '操作',align:'center',toolbar: '#barDemo',minWidth:250,fixed:'right'}
    ]]
    ,page: true //是否显示分页
    ,limit: 15
    ,limits:[15]
    ,id:'idTest'
    ,done:function(res, curr, count){

    }
});
var active = {
    reload: function(){
        var startime = $('#start').val();
        var endtime=$("#end").val();
        var name =$("#name").val();
        var unit =$("#unit").val();
        var number =$("#number").val();
        var batch =$("#batch").val();

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
                batchNumber:batch


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
                url:"/bloodSampleTest/batchDeleted",
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
               url:"/bloodSampleTest/batchSubmit",
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
    var batchNumber =$("#batch").val();

    var param = {}
    param.finspectionUnitName = finspectionUnitName
    param.inspectionUnitNumber = inspectionUnitNumber
    param.testerName = testerName
   // param.admissionNumber = admissionNumber
    //param.outpatientNumber = outpatientNumber
    param.startTime = startTime
    param.endTime = endTime
    param.batchNumber = batchNumber
    //param.testState = 0
    http.ajax({
        url: "/out/sampleDenialOfManagementAll",
        type: "POST",
        dataType: "JSON",
        contentType: 'application/json',
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
        data:  JSON.stringify(param),
    }).then(function (data) {
            if (data.code == 0) {
                var url=http.config.api
                var url=url+"/"+data.data.filepath
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


}
};
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
//批量导出
$("#allout").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
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
    var data=obj.data;
     obj.tr.css('background-color','white')
   if(obj.event === 'del'){
        layer.confirm('确定删除吗',{icon: 3, title:'提示'}, function(index){
            http.ajax({
                url:"/bloodAudit/deletedBloodAudit",
                type:"POST",
                dataType:"JSON",
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
                    }else if(data.code==500){
                        window.location.href='../home.html'
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
                layer.close(index);
            })


    } else if(obj.event === 'tongguo'){//重新提交
        layer.confirm('确定吗',{icon: 3, title:'提示'}, function(index){
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
    }
});
