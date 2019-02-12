
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
                    console.log(123);
                    sex = parseInt(item.value);
                }
            });



        // if($("#age").val()!==""){
            userage=($("#age").val());
        outpatientNumber=($("#outpatientNumber").val());

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
        checkroomName=$('#checkroom option:selected').text()

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
        if (sex == null) {
            layer.msg("请选择性别")
        }else{


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
                    inspectionDoctor: doctor,
                    outpatientNumber: outpatientNumber,
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
                    if (!isNaN(parseInt($("#preve").val()))) {
                        val04 = parseInt($("#preve").val());
                    }else {
                        layer.msg("优先级必须为数字")
                        return
                    }
                } else {
                    layer.msg("请选择优先级")
                    return false
                }
                const param={}
                param.unitName=val01
                param.provinceIndex=val02id
                param.localProvince=val02
                param.cityIndex=val03id
                param.localCity=val03
                param.priorityIndex=val04
                $.ajax({
                    url: "http://47.93.22.122:8104/SSM/information/addInspectionUnit",
                    type: "POST",
                    json: false,
                    mask: true,
                    contentType: 'application/json',
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data:JSON.stringify(param),
                    success:function (data) {
                        if (data.code == 0) {
                            layer.msg("新增成功")
                            var time =setTimeout(function () {
                                window.location.reload()

                            },1000)
                        }else if (data.code == 9999) {
                            layer.msg(data.msg)
                        }
                    },
                    error: function (xml, text) {
                        if (xml.status == 500) {
                            window.location.href = '../../log.html'
                        }
                        layer.msg(text)
                        layer.close(index)
                    }
                })
                //     .then(function (data) {
                //     if (data.code == 0) {
                //         layer.msg("新增成功")
                //         window.location.reload()
                //     }
                // }, function (xml, text) {
                //     if (xml.status == 500) {
                //         window.location.href = '../../log.html'
                //     }
                //     layer.msg(text)
                //     layer.close(index)
                // })
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
                    if (!isNaN($("#prevname").val())){
                        val02 = parseInt($("#prevname").val());
                    } else{
                        layer.msg("优先级必须为数字")
                        return
                    }
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
                            var time =setTimeout(function () {
                                window.location.reload()

                            },800)
                        }
                    },function (xml, text) {
                        layer.close(index)
                    })





            }
        });
    })
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


