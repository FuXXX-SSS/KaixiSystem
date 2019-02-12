/*
    Created by name: "FuDi", Date:2019/1/11 ,Time:11:49
*/
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
        testState:-1,
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
        ,{field:'testerSex', title: '性别',align:'center'}
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
        ,{field:'checkagainTimeType', title: '复查',align:'center'}
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
                testState: -1,
            }
        });
    },
    selectToDataCenter:function () {
        function UrlSearch() {
            var name, value;
            var str = location.href; //取得整个地址栏
            var num = str.indexOf("?")
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
            var arr = str.split("&"); //各个参数放到数组里
            for (var i = 0; i < arr.length; i++) {
                num = arr[i].indexOf("=");
                if (num > 0) {
                    name = arr[i].substring(0, num);
                    value = arr[i].substr(num + 1);
                    this[name] = value;
                }
            }
        }
        var Request = new UrlSearch(); //实例化
        var id = Request.selectto
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
                url: "/datecenter/selectToDataCenter",
                type: "POST",
                dataType: "JSON",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {
                    ids: ids,
                    selectto: id
                },
                // success: function (data) {
                //     if (data.code == 0) {
                //         layer.msg('导入成功成功');
                //         var time=setTimeout(function () {
                //             table.reload('idTest', {});
                //         },1000)
                //     } else if (data.code == 500) {
                //         window.location.href = "../home.html"
                //     }
                // }
            }).then(function (data) {
                if (data.code == 0) {
                    layer.msg('导入成功成功');
                    var time=setTimeout(function () {
                        table.reload('idTest', {});
                    },1000)
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            })
        }
        console.log(id);
    }
};
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
        var id = obj.data.id;
        var toUrl = "fixMedic.html?id="+ id;
        console.log(toUrl);
        window.location.href=toUrl;
    }
});
//搜索
$("#search").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//导入数据中心
$("#selectToDataCenter").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
var laydate = layui.laydate;
laydate.render({
    elem: '#starttime' //指定元素
});
laydate.render({
    elem: '#endtime' //指定元素
});
