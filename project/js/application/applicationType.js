//监听选中页签添加样式
layui.config({
    base: '../../js/'  //navbar组件js所在目录
}).use('navbar', function () {
    var navbar = layui.navbar();
    navs = [
        {
            "title": "首页",
            "icon": "icon-shouye",
            "spread": false,
            "href": "home.html"
        },
        {
            "title": "申请单录入",
            "icon": "icon-bi",
            "spread": false,
            "href": "javascript:;",
            "children": [
                {
                    "title": "申请单录入",
                    "icon": "",
                    "href": "applicationType.html",
                    "spread": false
                },
                {
                    "title": "申请单提交",
                    "icon": "",
                    "href": "applicationSubmit.html",
                    "spread": false,
                },
                {
                    "title": "驳回申请单",
                    "icon": "",
                    "href": "rejectApplication.html",
                    "spread": false,
                }
            ]
        },
        {
            "title": "申请单审核",
            "icon": "icon-shenhe",
            "href": "javascript:;",
            "spread": false,
            "children": [
                {
                    "title": "申请单审核",
                    "icon": "",
                    "href": "applicationCheck.html",
                    "spread": false,
                },
                {
                    "title": "样本拒绝管理",
                    "icon": "",
                    "href": "sampleReject.html",
                    "spread": false,
                }
            ]
        },
        {
            "title": "血样确认",
            "icon": "icon-queren",
            "spread": false,
            "href": "bloodConfirm.html"
        },
        {
            "title": "血样检验",
            "icon": "icon-icon",
            "href": "javascript:;",
            "spread": false,
            "children": [
                {
                    "title": "血样检验",
                    "icon": "",
                    "href": "bloodTest.html",
                    "spread": false,
                },
                {
                    "title": "血样复测",
                    "icon": "",
                    "href": "bloodRetest.html",
                    "spread": false,
                }
            ]
        },
        {
            "title": "数据审核",
            "icon": "icon-iconfontpaixingbang",
            "href": "javascript:;",
            "spread": false,
            "children": [
                {
                    "title": "数据审核",
                    "icon": "",
                    "href": "dataCheck.html",
                    "spread": false,
                },
                {
                    "title": "未批准",
                    "icon": "",
                    "href": "unapproved.html",
                    "spread": false,
                }
            ]
        },
        {
            "title": "数据批准",
            "icon": "icon-shenhetongguo1",
            "href": "dataApproval.html",
            "spread": false,
        },
        {
            "title": "生成报告",
            "icon": "icon-baogao-copy",
            "href": "report.html",
            "spread": false,
        },
        {
            "title": "病例",
            "icon": "icon-bingli",
            "href": "javascript:;",
            "spread": false,
            "children": [
                {
                    "title": "未关联",
                    "icon": "",
                    "href": "noAssociated.html",
                    "spread": false,
                },
                {
                    "title": "已关联",
                    "icon": "",
                    "href": "associated.html",
                    "spread": false,
                }
            ]
        },
        {
            "title": "数据中心",
            "icon": "icon-digital",
            "href": "javascript:;",
            "spread": false,
            "children": [
                {
                    "title": "肿瘤病例",
                    "icon": "",
                    "href": "tumour.html",
                    "spread": false,
                },
                {
                    "title": "体检病例",
                    "icon": "",
                    "href": "healthForm.html",
                    "spread": false,
                }
            ]
        },
        {
            "title": "数据部统计",
            "icon": "icon-mianxingtubiao_shujutongji",
            "href": "statistics.html",
            "spread": false,
        },
        {
            "title": "血样接收单",
            "icon": "icon-mianxingtubiao_shujutongji",
            "href": "bloodReception.html",
            "spread": false,
        },
        {
            "title": "公共查询",
            "icon": "icon-chaxun",
            "href": "publicSearch.html",
            "spread": false,
        },
        {
            "title": "系统配置",
            "icon": "icon-xitongpeizhi",
            "spread": false,
            "href": "javascript:;",
            "children": [
                {
                    "title": "信息配置",
                    "icon": "",
                    "href": "javascript:;",
                    "spread": false,
                    "children": [
                        {
                            "title": "送检单位配置",
                            "icon": "",
                            "href": "inspectionUnit.html",
                            "spread": false

                        },
                        {
                            "title": "检测项目配置",
                            "icon": "",
                            "href": "inspectionItem.html",
                            "spread": false,
                        },
                        {
                            "title": "抗凝剂配置",
                            "icon": "",
                            "href": "notSolid.html",
                            "spread": false,
                        },
                        {
                            "title": "科室配置",
                            "icon": "",
                            "href": "officeUnit.html",
                            "spread": false,
                        },
                        {
                            "title": "检测室配置",
                            "icon": "",
                            "href": "checkoutRoom.html",
                            "spread": false,
                        },
                        {
                            "title": "血样备注配置",
                            "icon": "",
                            "href": "bloodNote.html",
                            "spread": false,
                        }
                    ]
                },
                {
                    "title": "系统权限",
                    "icon": "",
                    "href": "authority.html",
                    "spread": false,
                },
                {
                    "title": "系统日志",
                    "icon": "",
                    "href": "dailyLog.html",
                    "spread": false,
                }
            ]
        },
    ];
    navbar.set({
        elem: '#navbar',
        data: navs
    });
    navbar.render();


    //下面的部分不是必须的
    navbar.on('click(demo)', function (data) {
        console.log(data.field.title);//标题
        console.log(data.field.icon);//图标
        console.log(data.field.href);//调转地址
        sessionStorage.setItem("aa", data.field.title)
    });
});


$(function () {
    var form = layui.form;
    var laydate = layui.laydate;

    var unitdata = [];
    var notsolidata = [];
    var ckeckitem = [];
    var checkroom = [];
    http.ajax({
        url: "/bloodSampleTest/queryFomat",
        type: "POST",
        json: false,
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
    }).then(function (data) {
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
                    $("#checkitem").append('<input type="checkbox" value="' + item.id + '-' + item.inspectionItemName + '" lay-skin="primary" lay-filter="check"   title="' + item.inspectionItemName + '">')
                })
                form.render()
            } else {
                layui.msg(data.msg)
            }
        }, function (err) {
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        }
    )


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


    //点击提交
    function submit(){
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
        // if($("#age").val()!==""){
        //     userage=parseInt($("#age").val());
        // }else{
        //     layer.msg("请输入年龄")
        //     return false
        // }

        if ($("#checkroom").val() !== "") {
            checkroomName = $("#checkroom").val();
            checkroom.forEach(function (item) {
                if (checkroomName == item.id) {
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
            url: "/bloodSampleTest/saveBloodSampleTest",
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
                inspectionDoctor: doctor
            },
        }).then(function (data) {
            if (data.code == 0) {
                layer.msg("提交成功")
                if ($(".container").scrollTop()) {
                    $('.container').animate({scrollTop: 0}, 800);
                    document.getElementById("subform").reset();
                    form.render();
                    $("#unit").val(nuit);
                    $("#notsolid").val(notsolid);
                    $("#checkroom").val(checkroomName);
                    $("#send").val(send);
                    $("#blood").val(blood)
                    console.log('检测项目', checkitem)
                    $.each(checkitem, function (index, item) {
                        $("#checkitem").children("input[type='checkbox']").each(function (inde, it) {
                            if ($(this).val() == item) {
                                $(this).prop("checked", true)
                            }
                        })
                    })
                }else{
                    document.getElementById("subform").reset();
                    form.render();
                    $("#unit").val(nuit);
                    $("#notsolid").val(notsolid);
                    $("#checkroom").val(checkroomName);
                    $("#send").val(send);
                    $("#blood").val(blood)
                    console.log('检测项目', checkitem)
                    $.each(checkitem, function (index, item) {
                        $("#checkitem").children("input[type='checkbox']").each(function (inde, it) {
                            if ($(this).val() == item) {
                                $(this).prop("checked", true)
                            }
                        })
                    })
                }
            }
        }, function (xml, text) {
            if (xml.status == 500) {
                window.location.href = "../../log.html"
            }
            layer.msg(text)
        })


    }
    $(document).keydown(function (ev) {
        if (ev.keyCode == 13) {
            submit()
        }
    })
    $("#submit").click(submit)
    var provincedata = null;
    //新增送检单位
    $.ajax({
        url: "address.json",
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
                })
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
                    dataType: "JSON",
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
                    },function (xml, text) {
                        layer.close(index)
                    })
                   
                   

               

            }
        });
    })


})





