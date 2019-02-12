var table = layui.table;
var form = layui.form;
var $ = layui.$
var url = http.config.api
$(function () {
    http.ajax({
        url: "/bloodSampleTest/queryInspectionUnit",
        type: "POST",
        dataType: "JSON",
        json: false,
        mask: true,
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
    , url: url+'/bloodCase/queryBloodCase'
    , method: 'post'
    , contentType: 'application/json'
    , where: {
        finspectionUnitName:'',
        testerName:'',
        inspectionUnitNumber:'',
        starttime:'',
        endtime:'',
        batchNumber:'',
        outpatientNumber:'',
        admissionNumber:'',
        testState:1,
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
    // , toolbar: true
    // ,defaultToolbar: ['filter', 'print', 'exports']
    ,cols: [[
        {type:'checkbox'}
        , {title: '序号', align: 'center', type: 'numbers'}
        ,{field:'batchNumber', title: '批次号',align:'center'}
        ,{field:'finspectionUnitName', title: '送检单位',align:'center'}
        ,{field:'inspectionUnitNumber', title: '送检单位编号',minWidth:140, align:'center'}
        ,{field:'outpatientNumber', title: '门诊号',align:'center'}
        ,{field:'admissionNumber', title: '住院号',align:'center'}
        ,{field:'inspectionOfficeNumber', title: '检验所编号',align:'center'}
        ,{field:'testerName', title: '姓名',align:'center'}
        ,{field:'testerSexs', title: '性别',align:'center'}
        ,{field:'testerAge', title: '年龄',align:'center'}
        ,{field:'phoneNumber', title: '电话号码',align:'center'}
        ,{field:'Address', title: '地址',align:'center'}
        ,{field:'bloodSamplePreparation', title: '血样备注',align:'center'}
        ,{field:'trValue', title: 'TR',align:'center'}
        ,{field:'omaValue', title: 'OMA/TR',align:'center'}
        ,{field:'clinicalDiagnosis', title: '临床诊断',align:'center'}
        ,{field:'pastHistory', title: '既往史',align:'center',minWidth:499}
        ,{field:'clinicalStages', title: '临床分期',align:'center'}
        ,{field:'therapeuticMethod', title: '治疗状态',align:'center'}
        ,{field:'takebloodTime', title: '采血时间',align:'center'}
        ,{field:'inspectionTimes', title: '送检时间',align:'center'}
        ,{field:'receiveTimes', title: '接收时间',align:'center'}
        ,{field:'testTimes', title: '检验日期',align:'center'}
        ,{field:'generateReportTimes', title: '出报告时间',align:'center'}
        ,{field:'checkagainTimeName', title: '复查',align:'center'}
        ,{field:'followupTimes', title: '随访时间',align:'center'}
        ,{field:'courierNumber', title: '快递单号',align:'center'}
        ,{field:'fsectionName', title: '科室',align:'center'}
        ,{field:'infectedPatch', title: '病区',align:'center'}
        ,{field:'customerSource', title: '客户来源',align:'center'}
        ,{field:'bedNumber', title: '床号',align:'center'}
        ,{field:'inspectionDoctor', title: '送检医生',align:'center'}
        ,{field:'fsendeeAccountName', title: '对接员',align:'center'}
        ,{field:'sampleConfirmationAccountName', title: '样本确认员',align:'center'}
        ,{field:'whoTest', title: '检验员',align:'center'}
        // ,{field:'whoTest', title: '申请单审核员',align:'center'}
        ,{field:'sampleStorageLocation', title: '样本存放位置',align:'center'}
        ,{field:'sampleSize', title: '样本量',align:'center'}
        ,{field:'sampleTemperature', title: '样本温度',align:'center'}
        ,{field:'fanticoagulantName', title: '抗凝剂',align:'center'}
        ,{field:'instrumentModel', title: '仪器型号',align:'center'}
        ,{field:'wealth', title: '操作',align:'center',toolbar: '#barDemo',fixed:'right'}
    ]]

});
var active = {
    reload: function () {
        var finspectionUnitName = $("#unit").val();
        var testerName = $("#testerName").val();
        var inspectionUnitNumber = $("#inspectionUnitNumber").val();
        var starttime = $("#starttime").val();
        var endtime = $("#endtime").val();
        var batchNumber = $("#batchNumber").val();
        var outpatientNumber = $("#outpatientNumber").val();
        var admissionNumber = $("#admissionNumber").val();
        var inspectionOfficeNumber = $("#inspectionOfficeNumber").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                finspectionUnitName: finspectionUnitName,
                testerName: testerName,
                inspectionUnitNumber: inspectionUnitNumber,
                starttime: starttime,
                endtime: endtime,
                batchNumber: batchNumber,
                outpatientNumber: outpatientNumber,
                admissionNumber: admissionNumber,
                inspectionOfficeNumber: inspectionOfficeNumber,
                testState: 1,
            }
        });
    },
    addCourierNumber:function () {//添加快递单号
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
            layer.open({
                title: '添加快递单号',
                area: ['500px', '280px'],
                btn: ['确认', '取消'],
                type: 1,
                content: $('.officeadd'),
                yes: function (index, layero) {
                    var val01 = "", val02 = null;
                    if ($("#prevname").val()) {
                        val02 = parseInt($("#prevname").val());
                    } else {
                        layer.msg("请输入快递单号")
                        return false
                    }
                    layer.close(index)
                    http.ajax({
                        url: "/bloodCase/addCourierNumber",
                        type: "POST",
                        dataType: "JSON",
                        json: false,
                        mask: true,
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', token);
                        },
                        data: {
                            courierNumber: val02,
                            ids: ids,
                        },
                        // success: function (data) {
                        //     if (data.code == 0) {
                        //         layer.msg("添加快递单号成功")
                        //         window.location.reload()
                        //     }
                        // },
                        // error: function (xml, text) {
                        //
                        //     layer.close(index)
                        // }

                    }).then(function (data) {
                        if (data.code == 0) {
                            layer.msg("添加快递单号成功")
                            window.location.reload()
                        }
                    },function (err) {
                        layer.close(index)

                    })

                },
                btn2: function () {
                    layer.closeAll();
                },
            });

        }
    },
    delete: function () { //批量删除
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
                url: "http://47.93.22.122:8104/SSM/bloodAudit/batchDeletedRequest",
                type: "POST",
                dataType: "JSON",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                contentType: false,
                processData: false,
                data: {ids: ids},
                // success: function (data) {
                //     if (data.code == 0) {
                //         layer.msg('删除成功');
                //         table.reload('idTest', {});
                //     } else if (data.code == 500) {
                //         window.location.href = "../home.html"
                //     }
                // }
            }).then(function () {
                if (data.code == 0) {
                    layer.msg('删除成功');
                    table.reload('idTest', {});
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            },function (err) {

            })
        }
    },
    outSystemLog: function () {
        var finspectionUnitName = $("#unit").val();
        var inspectionUnitNumber = $("#inspectionUnitNumber").val();
        var testerName = $("#testerName").val();
        var admissionNumber = $("#admissionNumber").val();
        var outpatientNumber = $("#outpatientNumber").val();
        var starttime = $("#starttime").val();
        var endtime = $("#endtime").val();
        var batchNumber = $("#batchNumber").val();

        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.inspectionUnitNumber = inspectionUnitNumber
        param.testerName = testerName
        param.admissionNumber = admissionNumber
        param.outpatientNumber = outpatientNumber
        param.starttime = starttime
        param.endtime = endtime
        param.batchNumber = batchNumber
        param.testState =1
        $.ajax({
            url: "http://47.93.22.122:8104/SSM/out/outBloodCaseAll",
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
        //         var url="http://192.168.31.212:9003/"+data.data
        //         console.log(url)
        //         window.location.href = url;
        //     } else if (data.code == 500) {
        //         window.location.href = "../home.html"
        //     }
        // })
    }
};
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
table.on('checkbox(demo)', function (obj) {//选中和批量选中
    if (obj.checked) {
        obj.tr.addClass('yellow');
    } else {
        obj.tr.removeClass('yellow')
    }
    if (obj.type == "all") {
        if (obj.checked) {
            obj.tr.removeClass('yellow');
            $("#specialtable").find('tbody').find("tr").addClass("yellow");
        } else {
            if ($("#specialtable").find('tbody').find("tr").hasClass("yellow")) {
                $("#specialtable").find('tbody').find("tr").removeClass("yellow");
            } else {
                $("#specialtable").find('tbody').find("tr").removeClass("yellow");
                $("#specialtable").find('tbody').find("tr").addClass("yellow");
            }
        }

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
        var id = obj.data.id;
        var toUrl = "fixMedic.html?id="+ id;
        console.log(toUrl);
        window.location.href=toUrl;
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
// 添加病运单号
$('#add').click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
$('#delete').click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//批量导出
$("#outSystemLog").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
