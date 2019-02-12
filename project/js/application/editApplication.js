function GetUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;

        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");

            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return "";
    }
    else {
        return "";
    }
}
var pastHistoryId=""
var status = GetUrlParam("status")
console.log(GetUrlParam("status"))
console.log(GetUrlParam("id"))
$(function () {
    var form = layui.form;
    var laydate = layui.laydate;
    var unitdata = [];
    var notsolidata = [];
    var ckeckitem = [];
    var checkroom = [];
    http.ajax({//初始化页面
        url: "/bloodSampleTest/queryFomat",
        type: "POST",
        json: false,
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
    })
        .then(function (data) {
            if (data.code == 0) {
                unitdata = data.data.rows1;
                notsolidata = data.data.rows3;
                ckeckitem = data.data.rows5;
                checkroom = data.data.rows2;
                data.data.rows1.forEach(function (item) {//送检单位
                    $("#unit").append('<option value="' + item.unit_name + '">' + item.unit_name + '</option>')
                });
                data.data.rows3.forEach(function (item) {//抗凝剂
                    $("#notsolid").append('<option value="' + item.anticoagulantName + '">' + item.anticoagulantName + '</option>')
                });
                data.data.rows2.forEach(function (item) {//科室
                    $("#checkroom").append('<option value="' + item.id + '" name="">' + item.sectionName + '</option>')
                })
                data.data.rows5.forEach(function (item) {//检测项目
                    $("#checkitem").append('<input type="checkbox" value="' + item.id + "-"+item.inspectionItemName+'" lay-skin="primary" lay-filter="check"    name="functional"  title="' + item.inspectionItemName + '">')
                })
                form.render()
                if (GetUrlParam("id")) {
                    var uniqueid = GetUrlParam("id");
                    console.log(uniqueid)
                    http.ajax({
                        url: '/bloodSampleTest/queryBloodSampleTestById',
                        type: "POST",
                        json: false,
                        mask: true,
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', token);
                        },
                        data: {id: uniqueid},
                    })
                        .then(function (data) {
                            if (data.data.address) {
                                $("#address").val(data.data.address)
                            }
                            if (data.data.admissionNumber) {
                                $("#roomNumber").val(data.data.admissionNumber)
                            }
                            if (data.data.outpatientNumber) {
                                $("#outpatientNumber").val(data.data.outpatientNumber)
                            }
                            if (data.data.bedNumber) {
                                $("#bednumber").val(data.data.bedNumber)
                            }
                            if (data.data.clinicalDiagnosis) {
                                $("#clinical").val(data.data.clinicalDiagnosis)
                            }
                            if (data.data.pastHistoryId) {
                                pastHistoryId=data.data.pastHistoryId
                            }
                            if (data.data.clinicalStages) {//临床分期阶段
                                $("#cliniStage").children('option').each(function (index, item) {
                                    if ($(this).val() == data.data.clinicalStages) {
                                        $(this).prop('selected', true)
                                    }
                                })
                            }
                            if (data.data.customerSource) {
                                $("#client").val(data.data.customerSource)
                            }
                            if (data.data.fanticoagulantName) {//抗凝剂名称
                                $("#notsolid").children("option").each(function (index, item) {
                                    if ($(this).val() == data.data.fanticoagulantName) {
                                        $(this).prop('selected', true)
                                    }
                                })
                            }
                            if (data.data.finspectionItemName && data.data.finspectionItemId) {//检测项目
                                $("#checkitem").children('input[type="checkbox"]').each(function (index, item) {
                                    if ($(this).val() == data.data.finspectionItemId + '-' + data.data.finspectionItemName) {

                                        $(this).prop('checked', true);
                                    }
                                })
                            }
                            if (data.data.finspectionUnitName) {//送检单位
                                $("#unit").children("option").each(function (index, item) {
                                    if ($(this).val() == data.data.finspectionUnitName) {
                                        $(this).prop('selected', true)
                                    }
                                })
                            }
                            if (data.data.fsectionId) {//科室
                                $("#checkroom").children("option").each(function (index, item) {
                                    if ($(this).val() == data.data.fsectionId) {
                                        $(this).prop('selected', true)
                                    }
                                })
                            }
                            if (data.data.infectedPatch) {
                                $("#sickarea").val(data.data.infectedPatch)
                            }
                            if (data.data.inspectionDoctor) {
                                $("#doctor").val(data.data.inspectionDoctor)
                            }
                            if (data.data.inspectionUnitNumber) {//送检单位编号
                                $("#checkroomNumber").val(data.data.inspectionUnitNumber)
                            }
                            if (data.data.phoneNumber) {
                                $("#phone").val(data.data.phoneNumber)
                            }
                            if (data.data.takebloodTime) {
                                $("#blood").val(data.data.takebloodTime.substring(0, 10))
                            }
                            if (data.data.inspectionTime) {
                                 $("#send").val(data.data.inspectionTime.substring(0, 10))
                            }
                            if (data.data.testerAge) {
                                $("#age").val(data.data.testerAge)
                            }
                            if (data.data.testerName) {
                                $("#name").val(data.data.testerName)
                            }
                            if (data.data.testerSex) {//性别

                                $("#radio").children('input[type="radio"]').each(function (index, item) {
                                    console.log($(this)[0].title);
                                    if ($(this)[0].title == data.data.testerSex) {
                                        $(this).prop('checked', true)
                                    }
                                })
                            }
                            if (data.data.therapeuticMethod) {
                                $("#clinicMethod").children("input[type='checkbox']").each(function (index, item) {
                                    if ($(this).val() == data.data.therapeuticMethod) {
                                        $(this).prop('checked', true)
                                    }
                                })
                            }
                            if (data.data.therapyStage) {
                                $("#treatmentPeriod").children('input[type="radio"]').each(function (index, item) {
                                    if ($(this).val() == data.data.therapyStage) {
                                        $(this).prop('checked', true)
                                    }
                                })
                            }
                            if(data.data.mammaryGlands){//乳腺增生
                                $("#breastAdd").children('input[type="radio"]').each(function (index, item) {
                                    if ($(this).val() == data.data.mammaryGlands) {
                                        $(this).prop('checked', true)
                                    }
                                })
                            }

                            if(data.data.fattyLiver){//脂肪肝
                                $("#fat").children('input[type="radio"]').each(function (index, item) {
                                    if ($(this).val() == data.data.fattyLiver) {
                                        $(this).prop('checked', true)
                                    }
                                })
                            }
                            if(data.data.fibroid){//子宫肌瘤
                                $("#myoma").children('input[type="radio"]').each(function (index, item) {
                                    if ($(this).val() == data.data.fibroid) {
                                        $(this).prop('checked', true)
                                    }
                                })
                            }
                            if(data.data.prostateGland){//前列腺增生
                                $("#prostatitis").children('input[type="radio"]').each(function (index, item) {
                                    if ($(this).val() == data.data.prostateGland) {
                                        $(this).prop('checked', true)
                                    }
                                })
                            }

                            if (data.data.hydatoncusSize) {//囊肿大小
                                $("#tumoursize").val(data.data.hydatoncusSize)
                            }
                            if (data.data.calculusSize) {//结石大小
                                $("#stoneSize").val(data.data.calculusSize)
                            }
                            if (data.data.polyp) {//息肉大小
                                $("#polypSize").val(data.data.polyp)
                            }
                            if (data.data.fibroid) {//子宫肿瘤大小
                                $("#myomaSize").val(data.data.fibroid)
                            }
                            if (data.data.thyroidSize) {//甲状腺大小
                                $("#thyroidSize").val(data.data.thyroidSize)
                            }
                            if (data.data.otherCases) {//其他
                                $("#others").val(data.data.otherCases)
                            }

                            if (data.data.finspectionItemName) {//检测项目
                                var array = []
                                var ary = []
                                var toral = []
                                var finspectionItemId = data.data.finspectionItemId
                                var finspectionItemName = data.data.finspectionItemName
                                array = finspectionItemId.split(",")//id
                                ary = finspectionItemName.split(",")//name
                                for (var p = 0; p < array.length; p++) {
                                    toral[p] = array[p] + "-" + ary[p];
                                    console.log(ary[p]);
                                }
                                console.log(toral);
                                var groupCheckbox = $("input[name='functional']");
                                for (i = 0; i < groupCheckbox.length; i++) {
                                    var val = groupCheckbox[i].value;
                                    if (toral.indexOf(val) != -1) {
                                        groupCheckbox[i].checked = true;
                                    }
                                }
                            }

                            if (data.data.therapeuticMethod){//治疗方法
                                var array2=[]
                                var therapeuticMethod=data.data.therapeuticMethod
                                array2= therapeuticMethod.split(",")
                                var groupCheckbox2 = $("input[name='like1']");
                                for (i = 0; i < groupCheckbox2.length; i++) {
                                    var val =groupCheckbox2[i].value;
                                    if(array2.indexOf(val)!=-1){
                                        groupCheckbox2[i].checked=true;
                                    }
                                }
                            }
                            if (data.data.hydatoncus){//囊肿
                                var array3=[]
                                var Hydatoncus=data.data.hydatoncus
                                array3= Hydatoncus.split(",")
                                var groupCheckbox3 = $("input[name='like2']");
                                for (i = 0; i < groupCheckbox3.length; i++) {
                                    var val =groupCheckbox3[i].value;
                                    if(array3.indexOf(val)!=-1){
                                        groupCheckbox3[i].checked=true;
                                    }
                                }
                            }
                            if (data.data.calculus){//结石
                                var array4=[]
                                var Hydatoncus=data.data.calculus
                                array4= Hydatoncus.split(",")
                                var groupCheckbox4 = $("input[name='like3']");
                                for (i = 0; i < groupCheckbox4.length; i++) {
                                    var val =groupCheckbox4[i].value;
                                    if(array4.indexOf(val)!=-1){
                                        groupCheckbox4[i].checked=true;
                                    }
                                }
                            }
                            if (data.data.polyp){//息肉
                                var array4=[]
                                var Hydatoncus=data.data.polyp
                                array4= Hydatoncus.split(",")
                                var groupCheckbox4 = $("input[name='like4']");
                                for (i = 0; i < groupCheckbox4.length; i++) {
                                    var val =groupCheckbox4[i].value;
                                    if(array4.indexOf(val)!=-1){
                                        groupCheckbox4[i].checked=true;
                                    }
                                }
                            }
                            if (data.data.thyroid){//甲状腺
                                var array5=[]
                                var Hydatoncus=data.data.thyroid
                                array5= Hydatoncus.split(",")
                                var groupCheckbox5 = $("input[name='like5']");
                                for (i = 0; i < groupCheckbox5.length; i++) {
                                    var val =groupCheckbox5[i].value;
                                    if(array5.indexOf(val)!=-1){
                                        groupCheckbox5[i].checked=true;
                                    }
                                }
                            }
                            form.render()

                        }, function (err) {
                            console.log(err);
                            // 错误回调，err是错误回调参数
                            // 这里不处理错误也可以，上面都有集中处理错误，会tips
                        })
                }
            } else {
                layui.msg(data.msg)
            }
        }, function (err) {
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        })


    //日期插件
    laydate.render({
        elem: '#blood',
        value: new Date(),
        max: 0

    });
    laydate.render({
        elem: '#send',
        value: new Date(),
        max: 0
    });


    var provincedata = null;
    //新增送检单位
    $.ajax({
        url: 'address.json',
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, item) {
                provincedata = data;
                $("#provin").append('<option value="' + item.name + '">' + item.name + '</option>')
            })

        },
        error: function (xml, text) {
            layer.msg(text)
        }
    })

    //监听选择省份的事件
    form.on('select(aihao)', function (data) {
        $("#city option").eq(0).nextAll().remove();
        $.each(provincedata, function (index, item) {
            if (item.name == data.value) {
                $.each(item.city, function (aa, it) {
                    $("#city").append('<option value="' + it.name + '">' + it.name + '</option>');
                    form.render()
                })
            }
        })
    });

    form.render(); //更新全部
    $("#unitAdd").click(function () {
        layer.open({
            title: '新增送检单位',
            area: ['500px', '350px'],
            btn: '确认',
            type: 1,
            content: $('.unitadd'),
            yes: function (index, layero) {
                var val01 = "", val02 = "", val03 = "", val04 = null;
                var val02id = null, val03id = null;
                if ($("#unitinp").val()) {
                    val01 = $("#unitinp").val()
                } else {
                    layer.msg("请输入送检单位")
                    return false
                }
                if ($("#provin").val()) {//省份
                    val02 = $("#provin").val();
                    $.each(provincedata, function (index, it) {
                        if (val02 == it.name) {
                            val02id = index;
                        }
                    })
                } else {
                    layer.msg("请选择省")
                    return false
                }
                if ($("#city").val()) {//市
                    val03 = $("#city").val()
                    $.each(provincedata, function (index, item) {
                        if (item.name == val02) {
                            $.each(item.city, function (inde, ite) {
                                if (val03 == ite.name) {
                                    val03id = inde;
                                }
                            })
                        }
                    })
                } else {
                    layer.msg("请选择市")
                    return false
                }
                if ($("#preve").val()) {
                    val04 = parseInt($("#preve").val());
                } else {
                    layer.msg("请选择优先级")
                    return false
                }
                http.ajax({
                    url: "/information/addInspectionUnit",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        unitName: val01,
                        provinceIndex: val02id,
                        localProvince: val02,
                        cityIndex: val03id,
                        localCity: val03,
                        priorityIndex: val04
                    },
                }).then(function (data) {
                        if (data.code == 0) {
                            layer.msg("新增成功")
                            window.location.reload()
                        }
                    }, function (xml, text) {
                        if (xml.status == 500) {
                            window.location.href = '../../log.html'
                        }
                        layer.msg(text)
                        layer.close(index)
                    }
                )

            }
        });
    })

    $("#officeadd").click(function () {
        layer.open({
            title: '新增科室配置',
            area: ['500px', '280px'],
            btn: '确认',
            type: 1,
            content: $('.officeadd'),
            yes: function (index, layero) {
                var val01 = "", val02 = null;
                if ($("#officename").val()) {
                    val01 = $("#officename").val()
                } else {
                    layer.msg("请输入科室名称")
                    return false
                }
                if ($("#prevname").val()) {
                    val02 = parseInt($("#prevname").val());
                } else {
                    layer.msg("请输入优先级")
                    return false
                }
                layer.close(index)
                http.ajax({
                    url: "/information/addSection",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        sectionName: val01,
                        priorityIndex: val02,
                    },
                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg("新增成功")
                        window.location.reload()
                    }
                }, function (xml, text) {

                    layer.close(index)
                })

            }
        });
    })


    //点击提交
    $("#submit").click(function () {
        var nuit = "";
        var unitid = null;
        var notsolid = '';
        var notsolidid = null;
        var checkitem = [];
        var checkitemstr = '';
        var name = "";
        var sex = null;
        var userage = null;
        var checkroomName = "";
        var checkroomid = null;
        var checkroomNumber = "";//送检单位编号
        var roomNumber = "";//住院号
        var bednumber = "";//床号
        var sickarea = "";//病区
        var phone = "";//电话号码
        var address = "";//通讯地址
        var clinical = "";//临床诊断
        var cliniStage = "";//临床分期
        var clinicMethod = "";//治疗方法
        var treatmentPeriod = "";//治疗阶段
        var tumour = "";//囊肿
        var tumoursize = "";//囊肿大小
        var breastAdd = "";//乳腺增生
        var prostatitis = "";//前列腺
        var fat = "";//脂肪肝
        var stone = "";//结石
        var stoneSize = "";//结石大小
        var polyp = "";//息肉
        var polypSize = "";//息肉大小
        var myoma = "";//子宫肌瘤
        var myomaSize = "";//子宫肌瘤大小
        var thyroid = "";//甲状腺
        var thyroidSize = "";//家装大小
        var others = "";//其他
        var client = "";//客户来源
        var blood = "";//采血时间
        var send = "";//送检时间
        var doctor = "";//医生
        var outpatientNumber=""//门诊号
        if ($("#unit").val() !== '') {
            nuit = $("#unit").val();
            unitdata.forEach(function (item) {
                if (nuit == item.unit_name) {
                    unitid = item.id
                }
            })

        } else {
            layer.msg("请选择送检单位")
            return false
        }
        if ($("#notsolid").val() !== '') {
            notsolid = $("#notsolid").val();
            notsolidata.forEach(function (item) {
                if (notsolid == item.anticoagulantName) {
                    notsolidid = item.id;
                }
            })
        } else {
            layer.msg("请选择抗凝剂")
            return false
        }
        var checkarr = $("#checkitem").children('input[type="checkbox"]');
        for (var i = 0; i < checkarr.length; i++) {
            if (checkarr[i].checked) {
                checkitem.push(checkarr[i].value)
            }
        }
        if (checkitem.length !== 0) {
            checkitemstr = checkitem.join(",")
        } else {
            layer.msg("请至少选择一项检测项目")
            return false
        }

        if ($("#name").val() !== "") {//姓名
            name = $("#name").val();
        } else {
            layer.msg("请输入姓名")
            return false
        }

        $("#radio").children('input[type="radio"]').each(function (index, item) {//性别
            if (item.checked) {
                sex = parseInt(item.value);
            }
        });
        userage = ($("#age").val());
        outpatientNumber = ($("#outpatientNumber").val());

        // if ($("#age").val() !== "") {
        //     userage = parseInt($("#age").val());
        // } else {
        //     layer.msg("请输入年龄")
        //     return false
        // }

        if ($("#checkroom").val() !== "") {
            checkroomName = $("#checkroom").val();
            checkroom.forEach(function (item) {
                if (checkroomName == item.laboratoryName) {
                    checkroomid = item.id;
                }
            })
        } else {
            layer.msg("请选择科室")
            return false
        }
        checkroomNumber = $("#checkroomNumber").val();
        roomNumber = $("#roomNumber").val();
        bednumber = $("#bednumber").val();
        sickarea = $("#sickarea").val();
        phone = $("#phone").val();
        address = $("#address").val();
        clinical = $("#clinical").val();
        cliniStage = $("#cliniStage").val();
        var clinicMethodarr = [];
        $("#clinicMethod").children("input[type='checkbox']").each(function (index, item) {
            if (item.checked) {
                clinicMethodarr.push(item.value)
            }
        })
        clinicMethod = clinicMethodarr.join(",");
        $("#treatmentPeriod").children("input[type='radio']").each(function (index, item) {
            if (item.checked) {
                treatmentPeriod = item.value;
            }
        })
        var tumourarr = [];
        $("#tumour").children('input[type="checkbox"]').each(function (index, item) {
            if (item.checked) {
                tumourarr.push(item.value)
            }
        })
        tumour = tumourarr.join(",")
        tumoursize = $("#tumoursize").val();
        $("#breastAdd").children("input[type='radio']").each(function (index, item) {
            if (item.checked) {
                breastAdd = item.value;
            }

        })
        $("#prostatitis").children("input[type='radio']").each(function (index, item) {
            if (item.checked) {
                prostatitis = item.value;
            }

        })
        $("#fat").children("input[type='radio']").each(function (index, item) {
            if (item.checked) {
                fat = item.value;
            }

        })
        var stonearr = [];
        $("#stone").children('input[type="checkbox"]').each(function (index, item) {
            if (item.checked) {
                stonearr.push(item.value)
            }
        })
        stone = stonearr.join(",")
        stoneSize = $("#stoneSize").val();
        var polyparr = [];
        $("#polyp").children('input[type="checkbox"]').each(function (index, item) {
            if (item.checked) {
                polyparr.push(item.value)
            }
        })
        polyp = polyparr.join(",")
        polypSize = $("#polypSize").val();
        $("#myoma").children("input[type='radio']").each(function (index, item) {
            if (item.checked) {
                myoma = item.value;
            }

        })
        myomaSize = $("#myomaSize").val();
        //甲状腺
        var thyroidarr = [];
        $("#thyroid").children('input[type="checkbox"]').each(function (index, item) {
            if (item.checked) {
                thyroidarr.push(item.value)
            }
        })
        thyroid = thyroidarr.join(",")
        thyroidSize = $("#thyroidSize").val();
        others = $("#others").val();
        client = $("#client").val();
        blood = $("#blood").val();
        send = $("#send").val();
        console.log(blood, send)
        doctor = $("#doctor").val();

        http.ajax({
            url: "/bloodSampleTest/updateBloodSampleTest",
            type: "POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: {
                finspectionUnitName: nuit,
                finspectionUnitId: unitid,
                fanticoagulantName: notsolid,
                fanticoagulantId: notsolidid,
                finspectionItemName: checkitemstr,
                testerName: name,
                testerSex: sex,
                testerAge: userage,
                fsectionName: checkroomName,
                fsectionId: checkroomid,
                inspectionUnitNumber: checkroomNumber,
                admissionNumber: roomNumber,
                bedNumber: bednumber,
                infectedPatch: sickarea,
                phoneNumber: phone,
                Address: address,
                clinicalDiagnosis: clinical,
                clinicalStages: cliniStage,
                therapeuticMethod: clinicMethod,
                therapyStage: treatmentPeriod,
                Hydatoncus: tumour,
                hydatoncusSize: tumoursize,
                mammaryGlands: breastAdd,
                prostateGland: prostatitis,
                fattyLiver: fat,
                Calculus: stone,
                calculusSize: stoneSize,
                polyp: polyp,
                polypSize: polypSize,
                fibroid: myoma,
                fibroidSize: myomaSize,
                thyroid: thyroid,
                thyroidSize: thyroidSize,
                otherCases: others,
                customerSource: client,
                takebloodTimes: blood,
                inspectionTimes: send,
                inspectionDoctor: doctor,
                pastHistoryId: pastHistoryId,
                outpatientNumber: outpatientNumber,
                id: GetUrlParam("id")
            },
        })
            .then(function (data) {
                if (data.code == 0) {
                    layer.msg("修改成功")
                    setTimeout(function () {
                        window.history.go(-1);
                    },800)
                    // if($(".container").scrollTop()){
                    //     $('.container').animate({scrollTop:0},800);
                    //     document.getElementById("subform").reset();
                    //     form.render();
                    //     $("#unit").val(nuit);
                    //     $("#notsolid").val(notsolid);
                    //     $("#checkroom").val(checkroomName);
                    //     console.log('检测项目',checkitem)
                    //     $.each(checkitem,function(index,item){
                    //         $("#checkitem").children("input[type='checkbox']").each(function(inde,it){
                    //             if($(this).val()==item){
                    //                 $(this).prop("checked",true)
                    //             }
                    //         })
                    //     })
                    // }


                }
            }, function (xml, text) {
                if (xml.status == 500) {
                    window.location.href = "../../log.html"
                }
                layer.msg(text)
            })


    })


})

$(".shangyiji").on("click", function () {
    if (GetUrlParam("status")) {
        window.location.href = "applicationCheck.html?status=" + status
    } else {
        window.history.go(-1);
    }


    // 　　      window.history.go(-1);


})

form.on('radio(fat)', function (data) {
    var xuanzhong = $(this).attr('data-check');
    if(xuanzhong == "false"){
         $('#fat input').each(function (i, input) {
            $(input).attr('data-check', "false");
        })

        $('#breastAdd input').each(function (i, input) {
            $(input).attr('data-check', "false");
        })

        $('#prostatitis input').each(function (i, input) {
            $(input).attr('data-check', "false");
        })

        $('#myoma input').each(function (i, input) {
            $(input).attr('data-check', "false");
        })

        $(this).attr('data-check', "true");
         $(this).prop('checked', true);
        layui.form.render();
    } else{
        $('#fat input').each(function (i,input) {
            $(input).attr('data-check', "false");
        })
        $('#breastAdd input').each(function (i,input) {
            $(input).attr('data-check', "false");
        })
        $('#prostatitis input').each(function (i, input) {
            $(input).attr('data-check', "false");
        })

        $('#myoma input').each(function (i, input) {
            $(input).attr('data-check', "false");
        })
         $(this).prop('checked', false);
        layui.form.render();
    }

  });
