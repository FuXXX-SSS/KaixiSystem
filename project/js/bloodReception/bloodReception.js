var table = layui.table;
var form = layui.form;
var $ = layui.$
var url = http.config.api

$(function () {
    http.ajax({
        url: "/bloodSampleTest/queryInspectionUnit",
        type: "POST",
        dataType: "JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
        // success: function (data) {
        //     if (data.code == 0) {
        //         var nuitdata = data.data.rows;
        //         for (var i = 0; i < nuitdata.length; i++) {
        //             $("#unit").append('<option value="' + nuitdata[i].unit_name + '">' + nuitdata[i].unit_name + '</option>')
        //         }
        //         form.render()
        //     } else if (data.code == 500) {
        //         window.location.href = "../../log.html"
        //     }
        // }
    }).then(function (data) {
        if (data.code == 0) {
            var nuitdata = data.data.rows;
            for (var i = 0; i < nuitdata.length; i++) {
                $("#unit").append('<option value="' + nuitdata[i].unit_name + '">' + nuitdata[i].unit_name + '</option>')
            }
            form.render()
        } else if (data.code == 500) {
            window.location.href = "../../log.html"
        }
    })
})
table.render({
    elem: '#test'
    , url: url+'/statistic/bloodSamplebill'
    , method: 'post'
    , contentType: 'application/json;charset=UTF-8'
    , where: {
        finspectionUnitName:'',
        batchNumber:'',
        inspectionTime:'',
    }
    , parseData: function (res) {
        if (res.code == 500) {
            window.location.href = "../../log.html"
            console.log(res);
        }
        return {
            'code': res.code,
            "msg": res.msg,
            "count": res.data.total,
            "data": res.data.rows
        }
    }
    , request: {
        limitName: 'rows'
    }
    , headers: {Authorization: token}
    , height: 'full-250'
    , cellMinWidth: 100
    , page: true //是否显示分页
    , limit: 15
    , limits: [15]
    , id: 'idTest'
    ,cols: [[
        {type:'checkbox'}
        , {title: '序号', align: 'center', type: 'numbers'}
        ,{field:'batchNumber', title: '批次号',align:'center'}
        ,{field:'finspectionUnitName', title: '送检单位', align:'center'}
        ,{field:'takebloodTime', title: '采血日期',align:'center'}
        ,{field:'inspectionTime', title: '送样日期',align:'center'}
        ,{field:'receiveTime', title: '接收日期',align:'center'}
        ,{field:'totalNumber', title: '样本数量',align:'center'}
        ,{field:'yesNumber', title: '合格数量',align:'center'}
        ,{field:'noNumber', title: '不合格数量',align:'center',minWidth:140}
        ,{field:'testName', title: '不合格姓名',align:'center',minWidth:140}
        ,{field:'Reason', title: '不合格原因',align:'center',minWidth:140}
        ,{field:'Source', title: '客户来源',align:'center'}
        ,{field:'Confirms', title: '确认人',align:'center'}
    ]]
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
    if(obj.event === 'detail'){
        layer.msg('ID：'+ data.id + ' 的查看操作');
    } else if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
            obj.del();
            layer.close(index);
        });
    } else if(obj.event === 'edit'){
        layer.alert('编辑行：<br>'+ JSON.stringify(data))
    }
});
var active = {
    reload: function () {
        var finspectionUnitName = $("#unit").val();
        var starttime = $("#starttime").val();
        var batchNumber=$("#batchNumber").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                finspectionUnitName:finspectionUnitName,
                batchNumber:starttime,
                inspectionTime:batchNumber,
            }
        });
    },
    outSystemLog: function () {
        var finspectionUnitName = $("#unit").val();
        var batchNumber = $("#batchNumber").val();
        var inspectionTime = $("#starttime").val();
        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.batchNumber = batchNumber
        param.inspectionTime = inspectionTime
        http.ajax({
            url: "/statistic/outBloodSamplebillAll",
            type: "POST",
            dataType: "JSON",
            contentType: 'application/json',
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data:  JSON.stringify(param),

            // success: function (data) {
            //     if (data.code == 0) {
            //         console.log(data);
            //         var url="http://192.168.31.212:9003/"+data.data
            //         console.log(url)
            //         window.location.href = url;
            //     } else if (data.code == 500) {
            //         window.location.href = "../home.html"
            //     }
            // }
        }).then(function (data) {
            if (data.code == 0) {
                console.log(data);
                var url = http.config.api
                var urls=url+"/"+data.data
                console.log(urls)
                window.location.href = urls;
            } else if (data.code == 500) {
                // window.location.href = "../home.html"
            }
        })
    }
};
var laydate = layui.laydate;
laydate.render({
    elem: '#starttime' //指定元素
});
laydate.render({
    elem: '#endtime' //指定元素
});
//搜索
$("#search").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//批量导出
$("#outSystemLog").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});