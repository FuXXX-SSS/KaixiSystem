var table = layui.table;
var form = layui.form;
var $ = layui.$
var url = http.config.api
$(function () {
    http.ajax({
        url: "/systemLog/getOperateType",
        type: "POST",
        dataType: "JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
        data: {
            id: "",
            name: ""
        },
        // success: function (data) {
        //     if (data.code == 0) {
        //         var nuitdata = data.data;
        //         for (var i = 0; i < nuitdata.length; i++) {
        //             $("#operateType").append('<option value="' + nuitdata[i].name + '">' + nuitdata[i].name + '</option>')
        //
        //         }
        //         form.render()
        //     } else if (data.code == 500) {
        //         window.location.href = "../../log.html"
        //     }
        // }
    }).then(function (data) {
        if (data.code == 0) {
            var nuitdata = data.data;
            for (var i = 0; i < nuitdata.length; i++) {
                $("#operateType").append('<option value="' + nuitdata[i].id + '">' + nuitdata[i].name + '</option>')

            }
            form.render()
        } else if (data.code == 500) {
            window.location.href = "../../log.html"
        }
    })

    //批量导入
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
            url: "/bloodSampleTest/importExExcle",
            type: "POST",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            contentType: false,
            processData: false,
            data: formData,
            // success: function (data) {
            //     if (data.code == 0) {
            //         layer.msg("导入成功")
            //     } else if (data.code == 9999) {
            //         layer.msg(data.msg)
            //     }
            // }
        }).then(function (data) {
            if (data.code == 0) {
                layer.msg("导入成功")
            } else if (data.code == 9999) {
                layer.msg(data.msg)
            }
        })

    })
    // 批量导出

})
table.render({
    elem: '#test'
    , url: url+'/systemLog/querySystemLog'
    , method: 'post'
    , contentType: 'application/json'
    , where: {
        accountName: '',
        accountRealname: '',
        operateType: '',
        startTime: '',
        endTime: '',
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
    , cols: [[
        {type: 'checkbox'}
        , {field: 'id', title: '序号', align: 'center'}
        , {field: 'accountName', title: '操作账户', align: 'center'}
        , {field: 'accountRealname', title: '真实姓名', align: 'center'}
        , {field: 'flaboratoryName', title: '检验室', align: 'center'}
        , {field: 'operateType', title: '操作类型', align: 'center'}
        , {field: 'ip', title: 'IP', align: 'center', minWidth: 270}
        , {field: 'operateTime', title: '操作时间', align: 'center', minWidth: 353}
    ]]
});
var operateType=""
form.on('select(operateType)', function(data){
    console.log(data.elem); //得到select原始DOM对象
    console.log(data.value); //得到被选中的值
    console.log(data.othis); //得到美化后的DOM对象
    operateType=data.value
});
var active = {
    reload: function () {


        console.log(operateType);
        var accountName = $("#accountName").val();
        var accountRealname = $("#accountRealname").val();
        // var operateType = $("#operateType").val();
        var startTime = $("#start").val();
        var endTime = $("#end").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                accountName: accountName,
                accountRealname: accountRealname,
                operateType: operateType,
                startTime: startTime,
                endTime: endTime,
            }
        });
    },
    outSystemLog: function () {
        var accountName = $("#accountName").val();
        var accountRealname = $("#accountRealname").val();
        var operateType = $("#operateType").val();
        var startTime = $("#start").val();
        var endTime = $("#end").val();
        var param = {}
        param.accountName = accountName
        param.accountRealname = accountRealname
        param.operateType = operateType
        param.startTime = startTime
        param.endTime = endTime
        $.ajax({
            url: "http://47.93.22.122:8104/SSM/out/outSystemLog",
            type: "POST",
            dataType: "JSON",
            contentType: 'application/json',
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data:  JSON.stringify(param),

            success: function (data) {
                if (data.code == 0) {
                    console.log(data);
                    var url="http://47.93.22.122:8104/SSM/"
                    var urls=url+data.data.filepath
                    console.log(urls)
                    window.location.href = urls;
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            }
        })
        //     .then(function (data) {
        //     if (data.code == 0) {
        //         console.log(data);
        //         var url = http.config.api
        //         var urls=url+"/"+data.data
        //         console.log(urls)
        //         window.location.href = urls;
        //     } else if (data.code == 500) {
        //         window.location.href = "../home.html"
        //     }
        // })
    }
}
table.on('row(demo)', function (obj) {
    if (obj.tr.find("[type='checkbox']").attr('checked')) {
        obj.tr.find("[type='checkbox']").attr('checked', false);
        obj.tr.find('.layui-unselect').removeClass('layui-form-checked');
        obj.tr.removeClass('layui-table-click');
    } else {
        obj.tr.find("[type='checkbox']").attr('checked', 'checked')
        obj.tr.find('.layui-unselect').addClass('layui-form-checked');
        obj.tr.addClass('layui-table-click');
    }

});
//监听工具条
table.on('tool(demo)', function (obj) {
    var data = obj.data;
    if (obj.event === 'detail') {
        layer.msg('ID：' + data.id + ' 的查看操作');
    } else if (obj.event === 'del') {
        layer.confirm('真的删除行么', function (index) {
            obj.del();
            layer.close(index);
        });
    } else if (obj.event === 'edit') {
        layer.alert('编辑行：<br>' + JSON.stringify(data))
    }
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
//日期插件
var laydate = layui.laydate;
laydate.render({
    elem: '#start' //指定元素
});
laydate.render({
    elem: '#end' //指定元素
});