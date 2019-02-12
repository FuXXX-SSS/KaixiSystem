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
    param.id = id

    param = JSON.stringify(param)
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
            id: id
        },
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
            var nuitdata = data.unit;
            var section = data.section;
            var ant = data.ant;
            var test = ""
            var value = ""
            var test2 = ""
            var value2 = ""
            var test3 = ""
            var value3 = ""
            for (var i = 0; i < nuitdata.length; i++) {
                $("#unit").append('<option value="' + nuitdata[i].id + '">' + nuitdata[i].unit_name + '</option>')
                if (nuitdata[i].checked) {
                    test = nuitdata[i].id
                    value = nuitdata[i].unit_name
                }
                form.render()
            }
            if (test) {
                $("#unit").children("option").each(function (index, item) {
                    if ($(this).val() == test) {
                        $(this).prop('selected', true)
                        form.render()
                    }
                })
            }

            for (var i = 0; i < section.length; i++) {
                $("#fsectionName").append('<option value="' + section[i].id + '">' + section[i].sectionName + '</option>')
                if (section[i].checked) {
                    test2 = section[i].id
                    value2 = section[i].sectionName
                }
                form.render()
            }
            if (test2) {
                $("#fsectionName").children("option").each(function (index, item) {
                    if ($(this).val() == test2) {
                        $(this).prop('selected', true)
                        form.render()
                    }
                })
            }

            for (var i = 0; i < ant.length; i++) {
                $("#fanticoagulantName").append('<option value="' + ant[i].id + '">' + ant[i].anticoagulantName + '</option>')
                if (ant[i].checked) {
                    test3 = ant[i].id
                    value3 = ant[i].anticoagulantName
                }
                form.render()
            }
            if (test3) {
                $("#fanticoagulantName").children("option").each(function (index, item) {
                    if ($(this).val() == test3) {
                        $(this).prop('selected', true)
                        form.render()
                    }
                })
            }
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
        var batchNumber = $("#batchNumber").val()
        // var finspectionUnitName = $("#finspectionUnitName").val()
        var inspectionUnitNumber = $("#inspectionUnitNumber").val()
        var testerName = $("#testerName").val()
        var testerSex = $("input[name='sex']").val()
        var testerAge = $("#testerAge").val()
        var phoneNumber = $("#phoneNumber").val()
        var Address = $("#Address").val()
        var outpatientNumber = $("#outpatientNumber").val()
        var admissionNumber = $("#admissionNumber").val()
        var infectedPatch = $("#infectedPatch").val()
        var bedNumber = $("#bedNumber").val()
        // var fsectionName = $("#fsectionName").val()
        var inspectionOfficeNumber = $("#inspectionOfficeNumber").val()
        var trValue = $("#trValue").val()
        var omaValue = $("#omaValue").val()
        var omaTrValue = $("#omaTrValue").val()
        var checkagainTimeType = $("#checkagainTimeType").val()
        var followupTime = $("#followupTime").val()
        var clinicalDiagnosis = $("#clinicalDiagnosis").val()
        var pastHistory = $("#pastHistory").val()
        var clinicalStages = $("#clinicalStages").val()
        var therapeuticMethod = $("#therapeuticMethod").val()
        var customerSource = $("#customerSource").val()
        var inspectionDoctor = $("#inspectionDoctor").val()
        var takebloodTime = $("#takebloodTime").val()
        var receiveTime = $("#receiveTime").val()
        var instrumentModel = $("#instrumentModel").val()
        var generateReportTime = $("#generateReportTime").val()
        var fsendeeAccountName = $("#fsendeeAccountName").val()
        var sampleConfirmationAccountName = $("#sampleConfirmationAccountName").val()
        var whoTest = $("#whoTest").val()
        var bloodSamplePreparation = $("#bloodSamplePreparation").val()
        var sampleStorageLocation = $("#sampleStorageLocation").val()
        var sampleSize = $("#sampleSize").val()
        var sampleTemperature = $("#sampleTemperature").val()
        var courierNumber = $("#courierNumber").val()
        var generateReportTimes = $("#generateReportTime").val()
        var testTime = $("#testTime").val()
        var finspectionUnitName = $("#unit").find("option:selected").text();//送检单位name
        var finspectionUnitId=$("#unit").val();//送检单位id
        var fanticoagulantName = $("#fanticoagulantName").find("option:selected").text();//抗凝剂name
        var fanticoagulantId= $("#fanticoagulantName").val()//抗凝剂ID
        var fsectionName = $("#fsectionName").find("option:selected").text();//科室name
        var fsectionId= $("#fsectionName").val()//科室ID

        http.ajax({
            url: "/bloodCase/updateCase",
            type: "POST",
            dataType: "JSON",
            contentType: 'application/json',
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: {
                sampleSize: sampleSize,
                sampleTemperature: sampleTemperature,
                courierNumber: courierNumber,
                sampleStorageLocation: sampleStorageLocation,
                bloodSamplePreparation: bloodSamplePreparation,
                whoTest: whoTest,
                sampleConfirmationAccountName: sampleConfirmationAccountName,
                fsendeeAccountName: fsendeeAccountName,
                generateReportTimes: generateReportTime,
                instrumentModel: instrumentModel,
                receiveTimes: receiveTime,
                takebloodTimes: takebloodTime,
                inspectionDoctor: inspectionDoctor,
                customerSource: customerSource,
                therapeuticMethod: therapeuticMethod,
                clinicalStages: clinicalStages,
                pastHistory: pastHistory,
                clinicalDiagnosis: clinicalDiagnosis,
                followupTimes: followupTime,
                checkagainTimeType: checkagainTimeType,
                omaTrValue: omaTrValue,
                omaValue: omaValue,
                trValue: trValue,
                inspectionOfficeNumber: inspectionOfficeNumber,
                bedNumber: bedNumber,
                infectedPatch: infectedPatch,
                admissionNumber: admissionNumber,
                outpatientNumber: outpatientNumber,
                Address: Address,
                phoneNumber: phoneNumber,
                testerAge: testerAge,
                testerSex: testerSex,
                testerName: testerName,
                inspectionUnitNumber: inspectionUnitNumber,
                batchNumber: batchNumber,
                testTimes: testTime,
                id: id,
                finspectionUnitId:finspectionUnitId,
                fanticoagulantId:fanticoagulantId,
                fsectionId :fsectionId ,
                finspectionUnitName:finspectionUnitName,
                fsectionName:fsectionName,
                fanticoagulantName:fanticoagulantName,
            },
            success:function (data) {
                if(data.code==0){
                    layer.msg("修改病例成功")
                    var timeout=setTimeout(function () {
                        // window.location.href='noAssociated.html'
                    },1000)
                }
            }
        }).then(function (data) {
            if (data.code == 0) {
                layer.msg("修改病例成功")
                var timeout = setTimeout(function () {
                    // window.location.href = 'noAssociated.html'
                }, 1000)
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
