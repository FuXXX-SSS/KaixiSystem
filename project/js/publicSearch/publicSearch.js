var table = layui.table;
var form = layui.form;
var $ = layui.$
var url = http.config.api
var role = ""
if (sessionStorage.getItem("user")) {
    role = JSON.parse(sessionStorage.getItem("user")).role;
}
console.log(role);
$(function () {
    if (role == 1 || role == 2) {
        console.log(123);
        $("#nuit2").show()
        form.render()
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
    } else {
        console.log(4545);
        $("#nuit2").hide()
        form.render()
    }
})
table.render({
    elem: '#test'
    , url: url + '/public/bloodSampleTestList'
    , method: 'post'
    , contentType: 'application/json'
    , where: {
        batchNumber: '',
        finspectionUnitName: '',
        inspectionTimeStrat: '',
        inspectionTimeEdit: '',
        testerName: '',
        flaboratoryName: '',
        inspectionOfficeNumber: '',
        fsectionName: '',
        rows: 0
    }
    , parseData: function (res) {
        if (res.code == 500) {
            window.location.href = "../../log.html"
            console.log(res);
        }
        if (res.code == 9999) {
            layer.msg(res.msg);
        }
        if (res.code == 0) {
            var data = res.data
            if (data.total == 0) {
                $(".layui-table-header").css("overflow", "visible")
                $(".layui-table-box").css("overflow", "auto")
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
        , {field: 'batchNumber', title: '批次号', align: 'center'}
        , {field: 'finspectionUnitName', title: '送检单位', align: 'center'}
        , {field: 'inspectionUnitNumber', title: '送检单位编号', align: 'center', minWidth: 140}
        , {field: 'testerName', title: '姓名', align: 'center'}
        , {field: 'testerSexs', title: '性别', align: 'center'}
        , {field: 'testerAge', title: '年龄', align: 'center'}
        , {field: 'whoTest', title: '检验员', align: 'center'}
        , {field: 'inspectionOfficeNumber', title: '检验所编号', align: 'center', minWidth: 140}
        , {field: 'takebloodTimes', title: '采血时间', align: 'center'}
        , {field: 'receiveTimes', title: '接收时间', align: 'center'}
        , {field: 'fsectionName', title: '科室', align: 'center'}
        , {field: 'trValue', title: 'TR', align: 'center'}
        , {field: 'omaValue', title: 'OMA', align: 'center'}
        , {field: 'omaTrValue', title: 'OMA/TR', align: 'center', minWidth: 140}
        , {field: 'generateReportTimes', title: '出报告时间', align: 'center', minWidth: 140}
        , {field: 'bloodSamplePreparation', title: '血样备注', align: 'center'}
        , {field: 'customerSource', title: '客户来源', align: 'center'}
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
var active = {
    reload: function () {
        var finspectionUnitName = $("#unit").val();
        var testerName = $("#testerName").val();
        var inspectionOfficeNumber = $("#inspectionOfficeNumber").val();
        var starttime = $("#starttime").val();
        var endtime = $("#endtime").val();
        var batchNumber = $("#batchNumber").val();
        var flaboratoryName = $("#flaboratoryName").val();
        var fsectionName = $("#fsectionName").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                batchNumber: batchNumber,
                finspectionUnitName: finspectionUnitName,
                inspectionTimeStrat: starttime,
                inspectionTimeEdit: endtime,
                testerName: testerName,
                flaboratoryName: flaboratoryName,
                inspectionOfficeNumber: inspectionOfficeNumber,
                fsectionName: fsectionName,
                rows: 15
            }
        });
    },
    outSystemLog: function () {
        var batchNumber = $("#batchNumber").val();
        var finspectionUnitName = $("#unit").val();
        var inspectionTimeStrat = $("#starttime").val();
        var inspectionTimeEdit = $("#endtime").val();
        var flaboratoryName = $("#testerName").val();
        var inspectionOfficeNumber = $("#inspectionOfficeNumber").val();
        var fsectionName = $("#fsectionName").val();
        var param = {}
        param.batchNumber = batchNumber
        param.finspectionUnitName = finspectionUnitName
        param.inspectionTimeStrat = inspectionTimeStrat
        param.inspectionTimeEdit = inspectionTimeEdit
        param.flaboratoryName = flaboratoryName
        param.inspectionOfficeNumber = inspectionOfficeNumber
        param.fsectionName = fsectionName
        // console.log(JSON.parse(param));
        $.ajax({
            url: url+"/public/beachOutAll",
            type: "POST",
            dataType: "JSON",
            contentType: 'application/json',
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: JSON.stringify(param),

            success: function (data) {
                if (data.code == 0) {
                    var url = http.config.api

                    var urls = url + "/" + data.data
                    console.log(urls);
                    window.location.href = urls;
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            }
        })
        //     .then(function (data) {
        //     if (data.code == 0) {
        //         var url = http.config.api
        //
        //         var url=url+"/"+data.data
        //         window.location.href = url;
        //     } else if (data.code == 500) {
        //         window.location.href = "../home.html"
        //     }
        // })
    }
};
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
