var $ = layui.$
var form = layui.form;
var table = layui.table;
$(function(){
    http.ajax({//送检单位
        url:"/bloodSampleTest/queryInspectionUnit",
        type:"POST",
        dataType:"JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization',token);
        },
    }).then(function (data) {
            if(data.code==0){
                var nuitdata=data.data.rows;
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
    url:url+'/bloodSampleTest/queryRejectApplication'
    ,method:'post'
    ,contentType:'application/json'
    ,parseData:function(res){
    if(res.code==500){
        window.location.href="../../log.html"
    }
    return{
        'code':res.code,
        "msg":res.msg,
        "count": res.data.total,
        "data": res.data.rows
    }
}
,request:{
    limitName: 'rows'
}
,headers:{Authorization:token}
        ,elem: '#test'
        ,height:'full-250'
        ,cellMinWidth:100
        ,cols: [[
            {type:'checkbox'}
            ,{title: '序号',align:'center',type:'numbers'}
            ,{field:'sex', title: '批次号',align:'center'}
            ,{field:'finspectionUnitName', title: '送检单位',align:'center'}
            ,{field:'inspectionUnitNumber', title: '送检单位编号',minWidth:140, align:'center'}
            ,{field:'testerName', title: '姓名',align:'center'}
            ,{field:'testerSex', title: '性别',align:'center'}
            ,{field:'testerAge', title: '年龄',align:'center'}
            ,{field:'phoneNumber', title: '电话号码',align:'center'}
            ,{field:'fsectionName', title: '科室',align:'center'}
            ,{field:'takebloodTime', title: '采血时间',align:'center'}
            ,{field:'receiveTime', title: '送样时间',align:'center'}
            ,{field:'customerSource', title: '客户来源',align:'center'}
            ,{field:'customerSource', title: '驳回原因',align:'center'}
            ,{ title: '操作',align:'center',toolbar: '#barDemo',minWidth:200,fixed:'right'}
        ]]
        ,page: true //是否显示分页
        ,limit: 15
        ,limits:[15]
        ,id:'idTest'
    });

  
//监听工具条
table.on('tool(demo)', function(obj){
    var data=obj.data;
    if(obj.event === 'detail'){//重新提交
        layer.confirm('确定吗',{icon: 3, title:'提示'},function(index){
            obj.tr.removeClass('layui-table-click');
            http.ajax({
                url:"/bloodSampleTest/submitRejectAppliaction",
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
                    }else if(data.code==500){
                        window.location.href='../home.html'
                    }
                },function(){
                    obj.tr.removeClass('layui-table-click');
                })
        })
        // layer.msg('ID：'+ data.id + ' 的查看操作');
    } else if(obj.event === 'del'){
        layer.confirm('确定删除吗',{icon: 3, title:'提示'}, function(index){
            http.ajax({
                url:"/bloodSampleTest/submit",
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
                    }else if(data.code==500){
                        window.location.href='../home.html'
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
            
        });
    } else if(obj.event === 'edit'){
        window.location.href="editApplication.html?id="+obj.data.id;

    }
});











//日期插件
var laydate = layui.laydate;
laydate.render({
    elem: '#start' //指定元素
});
laydate.render({
    elem: '#end' //指定元素
});

var active = {
    reload: function(){//搜索
        var startime = $('#start').val();
        var endtime=$("#end").val();
        var name =$("#name").val();
        var unit =$("#unit").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            ,where: {
                finspectionUnitName:unit,
                startTime:startime,
                endTime:endtime,
                testerName:name
            }
        });
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
};
//搜索
$("#search").click(function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//清空
$("#clear").click(function(){
    $("#unit").val("");
    $('#start').val("");
    $("#end").val("")
    $("#name").val("")
    form.render()
})

