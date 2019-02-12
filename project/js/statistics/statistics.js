var $ = layui.$
var form = layui.form;
var table = layui.table;
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
        //         console.log($("#unit"))
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
            console.log($("#unit"))
            for (var i = 0; i < nuitdata.length; i++) {
                $("#unit").append('<option value="' + nuitdata[i].unit_name + '">' + nuitdata[i].unit_name + '</option>')
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
            url: url+"/bloodSampleTest/importExExcle",
            type: "POST",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            contentType: false,
            processData: false,
            data: formData,
            success: function (data) {
                // if (data.code == 0) {
                //     layer.msg("导入成功")
                // } else if (data.code == 9999) {
                //     layer.msg(data.msg)
                // }
            }
        }).then(function (data) {
            if (data.code == 0) {
                layer.msg("导入成功")
            } else if (data.code == 9999) {
                layer.msg(data.msg)
            }
        })

    })

})
table.render({
    elem: '#test'
    , url: url+'/statistic/bloodSampleList'
    , method: 'post'
    , contentType: 'application/json'
    , where: {
        finspectionUnitName: '',
        starttime: '',
        rows: 0
    }
    , parseData: function (res) {
        if (res.code == 500) {
            window.location.href = "../../log.html"
            console.log(res);
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
        , {title: '序号', align: 'center', type: 'numbers'}
        , {field: 'finspectionUnitName', title: '送检单位', align: 'center'}
        , {field: 'fsectionName', title: '科室', align: 'center'}
        , {field: 'testerName', title: '姓名', align: 'center'}
        , {field: 'testerSexs', title: '性别', align: 'center'}
        , {field: 'testerAge', title: '年龄', align: 'center'}
        , {field: 'clinicalDiagnosis', title: '临床诊断', align: 'center'}
        , {field: 'takebloodTimes', title: '采血时间', align: 'center'}
        , {field: 'receiveTimes', title: '接收时间', align: 'center'}
        , {field: 'inspectionUnitNumber', title: '检验所编号', align: 'center', minWidth: 140}
        , {field: 'sampleTemperature', title: '接收温度', align: 'center'}
        , {field: 'bloodSamplePreparation', title: '血样状态', align: 'center'}
        , {field: 'whoTest', title: '检验员', align: 'center'}
        , {field: 'generateReportTimes', title: '出报告时间', align: 'center', minWidth: 140}
        , {field: 'trValue', title: 'TR', align: 'center'}
        , {field: 'omaValue', title: 'OMA', align: 'center'}
        , {field: 'omaTrValue', title: 'OMA/TR', align: 'center'}
    ]]
});
// table.on('row(demo)', function (obj) {
//     if (obj.tr.find("[type='checkbox']").attr('checked')) {
//         obj.tr.find("[type='checkbox']").attr('checked', false);
//         obj.tr.find('.layui-unselect').removeClass('layui-form-checked');
//         obj.tr.removeClass('layui-table-click');
//     } else {
//         obj.tr.find("[type='checkbox']").attr('checked', 'checked')
//         obj.tr.find('.layui-unselect').addClass('layui-form-checked');
//         obj.tr.addClass('layui-table-click');
//     }
//
// });
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
var active = {
    reload: function () {
        var startime = $('#start').val();
        var endtime = $("#end").val();
        var unit = $("#unit").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                finspectionUnitName: unit,
                starttime: startime,
                endTime: endtime,
                rows: 15
            }
        });
    },
    outSystemLog: function () {
        var finspectionUnitName = $("#unit").val();
        var starttime = $("#start").val();
        var endTime = $("#end").val();

        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.starttime = starttime
        param.endTime = endTime
        $.ajax({
            url: url+"/statistic/outInspectionUnitListAll",
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
                    var urls=url+"/"+data.data
                    console.log(urls);
                    window.location.href = urls;
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            }
        })
        //     .then(function (data) {
        //     if (data.code == 0) {
        //         console.log(data);
        //         var url=url+"/"+data.data
        //         console.log(url)
        //         window.location.href = url;
        //     } else if (data.code == 500) {
        //         window.location.href = "../home.html"
        //     }
        // })
    }
};
//日期插件
var laydate = layui.laydate;
laydate.render({
    elem: '#start' //指定元素
});
laydate.render({
    elem: '#end' //指定元素
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
