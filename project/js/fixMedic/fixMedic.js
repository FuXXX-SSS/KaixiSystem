/*
    Created by name: "FuDi", Date:2019/1/8 ,Time:14:37
*/
var url = http.config.api
$(function () {
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
    var id = Request.id
    var param = {}
    param.id=id

    console.log(JSON.stringify(param));
    param=JSON.stringify(param)
    http.ajax({
        url: "/bloodCase/findBloodById",
        type: "POST",
        dataType: "JSON",
        // contentType: 'application/json',
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
        data: {
            id:id
        },
        // success: function (data) {
        //     if (data.code == 0) {
        //         var data = data.data
        //         $("#batchNumber").val(data.batchNumber)
        //         $("#finspectionUnitName").val(data.finspectionUnitName)
        //         $("#inspectionUnitNumber").val(data.inspectionUnitNumber)
        //         $("#testerName").val(data.testerName)
        //         $("#testerSex").val(data.testerSex)
        //         $("#testerAge").val(data.testerAge)
        //         $("#phoneNumber").val(data.phoneNumber)
        //         $("#Address").val(data.Address)
        //         $("#outpatientNumber").val(data.outpatientNumber)
        //         $("#admissionNumber").val(data.admissionNumber)
        //         $("#infectedPatch").val(data.infectedPatch)
        //         $("#bedNumber").val(data.bedNumber)
        //         $("#fsectionName").val(data.fsectionName)
        //         $("#inspectionOfficeNumber").val(data.inspectionOfficeNumber)
        //         $("#trValue").val(data.trValue)
        //         $("#omaValue").val(data.omaValue)
        //         $("#omaTrValue").val(data.omaTrValue)
        //         $("#checkagainTimeType").val(data.checkagainTimeType)
        //         $("#followupTime").val(data.followupTime)
        //         $("#clinicalDiagnosis").val(data.clinicalDiagnosis)
        //         $("#pastHistory").val(data.pastHistory)
        //         $("#clinicalStages").val(data.clinicalStages)
        //         $("#therapeuticMethod").val(data.therapeuticMethod)
        //         $("#customerSource").val(data.customerSource)
        //         $("#inspectionDoctor").val(data.inspectionDoctor)
        //         $("#takebloodTime").val(data.takebloodTime)
        //         $("#receiveTime").val(data.receiveTime)
        //         $("#instrumentModel").val(data.instrumentModel)
        //         $("#generateReportTime").val(data.generateReportTime)
        //         $("#fsendeeAccountName").val(data.fsendeeAccountName)
        //         $("#sampleConfirmationAccountName").val(data.sampleConfirmationAccountName)
        //         $("#whoTest").val(data.whoTest)
        //         $("#bloodSamplePreparation").val(data.bloodSamplePreparation)
        //         $("#sampleStorageLocation").val(data.sampleStorageLocation)
        //         $("#sampleSize").val(data.sampleSize)
        //         $("#sampleTemperature").val(data.sampleTemperature)
        //         $("#fanticoagulantName").val(data.fanticoagulantName)
        //         $("#courierNumber").val(data.courierNumber)
        //         $("#testTime").val(data.testTime)
        //     }
        // }
    }).then(function (data) {
        if (data.code == 0) {
            var data = data.data
            $("#batchNumber").val(data.batchNumber)
            $("#finspectionUnitName").val(data.finspectionUnitName)
            $("#inspectionUnitNumber").val(data.inspectionUnitNumber)
            $("#testerName").val(data.testerName)
            $("#testerSex").val(data.testerSex)
            $("#testerAge").val(data.testerAge)
            $("#phoneNumber").val(data.phoneNumber)
            $("#Address").val(data.Address)
            $("#outpatientNumber").val(data.outpatientNumber)
            $("#admissionNumber").val(data.admissionNumber)
            $("#infectedPatch").val(data.infectedPatch)
            $("#bedNumber").val(data.bedNumber)
            $("#fsectionName").val(data.fsectionName)
            $("#inspectionOfficeNumber").val(data.inspectionOfficeNumber)
            $("#trValue").val(data.trValue)
            $("#omaValue").val(data.omaValue)
            $("#omaTrValue").val(data.omaTrValue)
            $("#checkagainTimeType").val(data.checkagainTimeType)
            $("#followupTime").val(data.followupTime)
            $("#clinicalDiagnosis").val(data.clinicalDiagnosis)
            $("#pastHistory").val(data.pastHistory)
            $("#clinicalStages").val(data.clinicalStages)
            $("#therapeuticMethod").val(data.therapeuticMethod)
            $("#customerSource").val(data.customerSource)
            $("#inspectionDoctor").val(data.inspectionDoctor)
            $("#takebloodTime").val(data.takebloodTime)
            $("#receiveTime").val(data.receiveTime)
            $("#instrumentModel").val(data.instrumentModel)
            $("#generateReportTime").val(data.generateReportTime)
            $("#fsendeeAccountName").val(data.fsendeeAccountName)
            $("#sampleConfirmationAccountName").val(data.sampleConfirmationAccountName)
            $("#whoTest").val(data.whoTest)
            $("#bloodSamplePreparation").val(data.bloodSamplePreparation)
            $("#sampleStorageLocation").val(data.sampleStorageLocation)
            $("#sampleSize").val(data.sampleSize)
            $("#sampleTemperature").val(data.sampleTemperature)
            $("#fanticoagulantName").val(data.fanticoagulantName)
            $("#courierNumber").val(data.courierNumber)
            $("#testTime").val(data.testTime)
        }
    })


    var form = layui.form;
    var laydate = layui.laydate;
    //日期插件
    laydate.render({
        elem: '#followupTime',
        value: new Date(),
        max: 0

    });
    laydate.render({
        elem: '#takebloodTime',
        value: new Date(),
        max: 0
    });
    laydate.render({
        elem: '#receiveTime',
        value: new Date(),
        max: 0
    });
    ;laydate.render({
        elem: '#testTime',
        value: new Date(),
        max: 0
    });
    ;laydate.render({
        elem: '#generateReportTime',
        value: new Date(),
        max: 0
    });
    $("#updateCase").click(function () {
        var batchNumber=$("#batchNumber").val()
        var finspectionUnitName=$("#finspectionUnitName").val()
        var inspectionUnitNumber=$("#inspectionUnitNumber").val()
        var testerName=$("#testerName").val()
        var testerSex=$("input[name='sex']").val()
        var testerAge=$("#testerAge").val()
        var phoneNumber=$("#phoneNumber").val()
        var Address=$("#Address").val()
        var outpatientNumber=$("#outpatientNumber").val()
        var admissionNumber=$("#admissionNumber").val()
        var infectedPatch=$("#infectedPatch").val()
        var bedNumber=$("#bedNumber").val()
        var fsectionName=$("#fsectionName").val()
        var inspectionOfficeNumber=$("#inspectionOfficeNumber").val()
        var trValue=$("#trValue").val()
        var omaValue=$("#omaValue").val()
        var omaTrValue=$("#omaTrValue").val()
        var checkagainTimeType=$("#checkagainTimeType").val()
        var followupTime=$("#followupTime").val()
        var clinicalDiagnosis=$("#clinicalDiagnosis").val()
        var pastHistory=$("#pastHistory").val()
        var clinicalStages=$("#clinicalStages").val()
        var therapeuticMethod=$("#therapeuticMethod").val()
        var customerSource=$("#customerSource").val()
        var inspectionDoctor=$("#inspectionDoctor").val()
        var takebloodTime=$("#takebloodTime").val()
        var receiveTime=$("#receiveTime").val()
        var instrumentModel=$("#instrumentModel").val()
        var generateReportTime=$("#generateReportTime").val()
        var fsendeeAccountName=$("#fsendeeAccountName").val()
        var sampleConfirmationAccountName=$("#sampleConfirmationAccountName").val()
        var whoTest=$("#whoTest").val()
        var bloodSamplePreparation=$("#bloodSamplePreparation").val()
        var sampleStorageLocation=$("#sampleStorageLocation").val()
        var sampleSize=$("#sampleSize").val()
        var sampleTemperature=$("#sampleTemperature").val()
        var fanticoagulantName=$("#fanticoagulantName").val()
        var courierNumber=$("#courierNumber").val()
        var generateReportTimes=$("#generateReportTime").val()
        var testTime=$("#testTime").val()
        http.ajax({
            url: "/bloodCase/updateCase",
            type: "POST",
            dataType: "JSON",
            contentType: 'application/json',
            json: false,
            mask: true,
            beforeSend:function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data:{
                sampleSize:sampleSize,
                sampleTemperature:sampleTemperature,
                fanticoagulantName:fanticoagulantName,
                courierNumber:courierNumber,
                sampleStorageLocation:sampleStorageLocation,
                bloodSamplePreparation:bloodSamplePreparation,
                whoTest:whoTest,
                sampleConfirmationAccountName:sampleConfirmationAccountName,
                fsendeeAccountName:fsendeeAccountName,
                generateReportTimes:generateReportTime,
                instrumentModel:instrumentModel,
                receiveTimes:receiveTime,
                takebloodTimes:takebloodTime,
                inspectionDoctor:inspectionDoctor,
                customerSource:customerSource,
                therapeuticMethod:therapeuticMethod,
                clinicalStages:clinicalStages,
                pastHistory:pastHistory,
                clinicalDiagnosis:clinicalDiagnosis,
                followupTimes:followupTime,
                checkagainTimeType:checkagainTimeType,
                omaTrValue:omaTrValue,
                omaValue:omaValue,
                trValue:trValue,
                inspectionOfficeNumber:inspectionOfficeNumber,
                fsectionName:fsectionName,
                bedNumber:bedNumber,
                infectedPatch:infectedPatch,
                admissionNumber:admissionNumber,
                outpatientNumber:outpatientNumber,
                Address:Address,
                phoneNumber:phoneNumber,
                testerAge:testerAge,
                testerSex:testerSex,
                testerName:testerName,
                inspectionUnitNumber:inspectionUnitNumber,
                finspectionUnitName:finspectionUnitName,
                batchNumber:batchNumber,
                testTimes:testTime,
                id :id
            },
            // success:function (data) {
            //     if(data.code==0){
            //         layer.msg("修改病例成功")
            //         var timeout=setTimeout(function () {
            //             window.location.href='noAssociated.html'
            //         },1000)
            //     }
            // }
        }).then(function (data) {
            if(data.code==0){
                layer.msg("修改病例成功")
                var timeout=setTimeout(function () {
                    window.location.href='noAssociated.html'
                },1000)
            }
        })
    })
    $("#cancel").click(function () {
        history.back(-1)
    })
    $("#back").click(function () {
        history.back(-1)
    })
})