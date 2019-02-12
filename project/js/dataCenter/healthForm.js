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
    , url: url+'/datecenter/physicalExaminationCase'
    , method: 'post'
    , contentType: 'application/json'
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
        , {field: 'batchNumber', title: '批次号', align: 'center'}
        , {field: 'finspectionUnitName', title: '送检单位', align: 'center'}
        , {field: 'hospitalNumber', title: '医院编号', align: 'center'}
        , {field: 'testerName', title: '姓名', align: 'center'}
        , {field: 'testerSex', title: '性别', align: 'center'}
        , {field: 'testerAge', title: '年龄', align: 'center'}
        , {field: 'fsectionName', title: '科室', align: 'center'}
        , {field: 'takebloodTimes', title: '采血时间', align: 'center'}
        , {field: 'clinicalDiagnosis', title: '临床诊断', align: 'center'}
        , {field: 'anomalyIndex', title: '异常指标', align: 'center'}
        , {field: 'bloodSamplePreparation', title: '标本状态', align: 'center'}
        , {field: 'trValue', title: 'TR检测结果', align: 'center', minWidth: 140}
        , {field: 'physicalExaminationResult', title: '体检结果', align: 'center'}
        , {field: 'analysis', title: '分析', align: 'center'}
        , {field: 'wealth', title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 150, fixed: 'right'}
    ]]
});
var active = {
    reload: function () {
        var unit = $("#unit").val();
        var clinicalDiagnosis = $("#clinicalDiagnosis").val();
        var clinicalStages = $("#clinicalStages").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                finspectionUnitName: unit,
                clinicalDiagnosis: clinicalDiagnosis,

            }
        });
    },
    batchPhysicalDel: function () { //批量删除
        console.log(123);
        var checkStatus = table.checkStatus('idTest'), data = checkStatus.data;
        if (data.length == 0) {
            layer.open({
                type: 1,
                shade: 0,
                content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area: ['200px', '100px'],
                time: 700
            })
            return false
        } else {
            var str = [];
            for (var i = 0; i < data.length; i++) {
                str.push(data[i].id)
            }
            var ids = str.join(',');
            http.ajax({
                url: "/datecenter/batchPhysicalDel",
                type: "POST",
                dataType: "JSON",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {ids: ids},
                // success: function (data) {
                //     if (data.code == 0) {
                //         layer.msg('删除成功');
                //         table.reload('idTest', {});
                //     } else if (data.code == 500) {
                //         window.location.href = "../home.html"
                //     }
                // }
            }).then(function (data) {
                if (data.code == 0) {
                    layer.msg('删除成功');
                    table.reload('idTest', {});
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            })
        }
    },
    outSystemLog: function () {
        var finspectionUnitName = $("#unit").val();
        var clinicalDiagnosis = $("#clinicalDiagnosis").val();

        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.clinicalDiagnosis = clinicalDiagnosis
        $.ajax({
            url: "http://47.93.22.122:8104/SSM/out/outPhysicalExaminationCaseAll",
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
        //         var urls = url+"/" + data.data
        //         console.log(urls)
        //         window.location.href = urls;
        //     } else if (data.code == 500) {
        //         window.location.href = "../home.html"
        //     }
        // })
    }
}
//搜索
$("#search").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
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
        console.log(data);
        // var anomalyIndex=data.anomalyIndex
        var confirmTime = data.confirmTime
        var treatmentPlan = data.treatmentPlan
        var otherLaboratoryTests = data.otherLaboratoryTests
        var ctTests = data.ctTests
        var therapeuticEvaluation = data.therapeuticEvaluation
        var therapeuticState = data.therapeuticState
        var conformanceMarkers = data.conformanceMarkers
        var trMarkers = data.trMarkers
        var analysis1 = data.analysis1
        var analysis2 = data.analysis2
        var analysis3 = data.analysis3
        var id = data.id

            $("#anomalyIndex").val(data.anomalyIndex),
            $("#physicalExaminationResult").val(data.physicalExaminationResult),
            $("#Analysis").val(data.analysis),

            ID = data.id
        layer.open({
            title: '编辑信息',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.officeadd'),

            yes: function (index, layero) {
                var anomalyIndex=$("#anomalyIndex").val()
                var physicalExaminationResult=$("#physicalExaminationResult").val()
                var Analysis=$("#Analysis").val()

                layer.close(index)
                http.ajax({
                    url: "/datecenter/addAnalysis2",
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        anomalyIndex: anomalyIndex,
                        physicalExaminationResult: physicalExaminationResult,
                        analysis: Analysis,
                        id: id,
                    },
                    // success: function (data) {
                    //     if (data.code == 0) {
                    //         layer.msg("修改信息成功")
                    //         var time=setTimeout(function () {
                    //             window.location.reload()
                    //         },1000)
                    //     }
                    // },
                    // error: function (xml, text) {
                    //
                    //     layer.close(index)
                    // }

                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg("修改信息成功")
                        var time=setTimeout(function () {
                            window.location.reload()
                        },1000)
                    }
                },function (err) {
                    layer.close(index)
                })

            },
            btn2: function () {
                layer.closeAll();
            },
        });
    } else if (obj.event === 'del') {
        layer.confirm('真的删除行么', function (index) {
            obj.del();
            layer.close(index);
        });
    } else if (obj.event === 'edit') {
        layer.alert('编辑行：<br>' + JSON.stringify(data))
    }
});

$("#queryBloodCase").click(function () {
    // window.location.href = "../queryBloodCase.html"
    var selectto = -1 //体检病例
    var url = "queryBloodCase2.html?selectto=" + selectto;
    window.location.href = url
})
//批量导出
$("#outSystemLog").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//批量删除
$("#batchPhysicalDel").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
var laydate = layui.laydate;
laydate.render({
    elem: '#confirmTime' //指定元素
});
laydate.render({
    elem: '#endtime' //指定元素
});
