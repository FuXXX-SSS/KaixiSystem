var $ = layui.$
var form = layui.form;
var table = layui.table;
var ID = ''
var url = http.config.api
var username = JSON.parse(sessionStorage.getItem("user")).username;
console.log(username);
$("#username").html(username)
if (JSON.parse(sessionStorage.getItem("user")).role == 2) {
    var laboratoryname = JSON.parse(sessionStorage.getItem("user")).laboratoryname;
    var accountName = JSON.parse(sessionStorage.getItem("user")).accountName;

    $("#laboratoryname").show()
    $("#laboratoryname").html(laboratoryname)
    $("#username").html(accountName)
} else {
    $("#laboratoryname").hide()
}
console.log($("#username").innerText);
$(function () {



    // $.ajax({
    //     url: "http://192.168.31.212:9003/bloodSampleTest/queryInspectionUnit",
    //     type: "POST",
    //     dataType: "JSON",
    //     beforeSend: function (XMLHttpRequest) {
    //         XMLHttpRequest.setRequestHeader('Authorization', token);
    //     },
    //     success: function (data) {
    //         if (data.code == 0) {
    //             var nuitdata = data.data.rows;
    //             for (var i = 0; i < nuitdata.length; i++) {
    //                 $("#unit").append('<option value="' + nuitdata[i].unit_name + '">' + nuitdata[i].unit_name + '</option>')
    //             }
    //             form.render()
    //         } else if (data.code == 500) {
    //             window.location.href = "../../log.html"
    //         }
    //     }
    // });
    // http.ajax({
    //     url: "/login/getMenu",
    //     type: 'POST',
    //     json: false,
    //     mask: true,
    // }).then(function (data) {
    //     console.log(data);
    //     //监听选中页签添加样式
    //     layui.config({
    //         base: '../../js/'  //navbar组件js所在目录
    //     }).use('navbar', function () {
    //         var navbar = layui.navbar();
    //         navbar.set({
    //             elem: '#navbar',
    //             data: data
    //         });
    //
    //
    //         navbar.render();
    //
    //
    //         //下面的部分不是必须的
    //         navbar.on('click(demo)', function (data) {
    //             console.log(data.field.title);//标题
    //             console.log(data.field.icon);//图标
    //             console.log(data.field.href);//调转地址
    //             sessionStorage.setItem("aa", data.field.title)
    //         });
    //     });
    // }, function (err) {
    //     console.log(err);
    // })
    // var time2 = setTimeout(function () {
    //     var windowHref = window.location.href;
    //     windowHref = windowHref.replace(/^http:\/\/[^/]+/, "");
    //     var windowaddr = windowHref.substr(windowHref.lastIndexOf('/', windowHref.lastIndexOf('/') - 1) + 1);
    //     var windowindex = windowaddr.lastIndexOf("\/");
    //     //js 获取字符串中最后一个斜杠后面的内容
    //     var windowaddrLast = decodeURI(windowaddr.substring(windowindex + 1, windowaddr.length));
    //     //js 获取字符串中最后一个斜杠前面的内容
    //     var str = decodeURI(windowaddr.substring(0, windowindex));
    //     console.log(windowaddrLast);
    //
    //     var li = $("#navbar li a");
    //
    //     li.each(function (index, item) {
    //         // console.log(item);
    //         var htmlHref = item.href;
    //         htmlHref = htmlHref.replace(/^http:\/\/[^/]+/, "");
    //         var addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1);
    //         var index = addr.lastIndexOf("\/");
    //         //js 获取字符串中最后一个斜杠后面的内容
    //         var addrLast = decodeURI(addr.substring(index + 1, addr.length));
    //         //js 获取字符串中最后一个斜杠前面的内容
    //         var str = decodeURI(addr.substring(0, index));
    //         // console.log(addrLast);
    //         // console.log(item.children("a"));
    //
    //         if (windowaddrLast==addrLast) {
    //             console.log(addrLast);
    //             $(li[index+1]).parents(".layui-nav-item:eq(0)").addClass("layui-this")
    //         }
    //     })
    // }, 800)
    http.ajax({
        url: '/bloodSampleTest/queryInspectionUnit',
        type: 'POST',
        json: false,
        mask: true,
    }).then(function (data) {
        if (data.code == 0) {
            console.log(999);
            var nuitdata = data.data.rows;
            for (var i = 0; i < nuitdata.length; i++) {
                $("#unit").append('<option value="' + nuitdata[i].unit_name + '">' + nuitdata[i].unit_name + '</option>')
            }
            form.render()
        } else if (data.code == 500) {
            window.location.href = "../../log.html"
        }
    }, function (err) {
        console.log(err);
        // 错误回调，err是错误回调参数
        // 这里不处理错误也可以，上面都有集中处理错误，会tips
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
            url: "/bloodSampleTest/importExExcle",
            type: "POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            contentType: false,
            processData: false,
            data: formData,
            // success: function (data) {
            //     if (data.code == 0) {
            //         layer.msg("导入成功")
            //     } else if (data.code == 9999) {
            //         layer.msg(data.msg)
            //     }
            // }
        }).then(function (data) {
            if (data.code == 0) {
                layer.msg("导入成功")
            } else if (data.code == 9999) {
                layer.msg(data.msg)
            }
        }, function (err) {
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        })


    })

})
table.render({
    elem: '#test'
    , url: url + '/bloodReport/queryBloodReport'
    , method: 'post'
    , contentType: 'application/json'
    , where: {
        finspectionUnitName: '',
        inspectionUnitNumber: '',
        testerName: '',
        startTime: '',
        endTime: '',
        inspectionOfficeNumber: '',
        isGenerateReport: 0,
    }
    , parseData: function (res) {
        if (res.code == 500) {
            window.location.href = "../../log.html"
            console.log(res);
        }
        // if (res.code==0){
        //     if (res.data.rows[0].isGenerateReport == 1) {
        //         console.log(123);
        //
        //         $(".AddReport1").show();
        //         $(".AddReport2").hide()
        //         $(".right2").show();
        //         $(".right1").hide();
        //         form.render()
        //
        //     }
        // }
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
    // , toolbar: '#barDemo'
    , cols: [[
        {type: 'checkbox'}
        , {field: 'batchNumber', title: '批次号', align: 'center'}
        , {title: '序号', align: 'center', type: 'numbers'}
        , {field: 'inspectionUnitNumber', title: '送检单位编号', minWidth: 140, align: 'center'}
        , {field: 'outpatientNumber', title: '门诊号', align: 'center'}
        , {field: 'admissionNumber', title: '住院号', align: 'center'}
        , {field: 'inspectionOfficeNumber', title: '检验所编号', align: 'center'}
        , {field: 'testerName', title: '姓名', align: 'center'}
        , {field: 'testerSex', title: '性别', align: 'center'}
        , {field: 'testerAge', title: '年龄', align: 'center'}
        , {field: 'phoneNumber', title: '手机号码', align: 'center'}
        , {field: 'clinicalDiagnosis', title: '临床诊断', align: 'center'}
        , {field: 'pastHistory', title: '疾病史', align: 'center', minWidth: 764}
        , {field: 'takebloodTime', title: '采血时间', align: 'center'}
        , {field: 'inspectionTime', title: '送检时间', align: 'center'}
        , {field: 'receiveTime', title: '接收时间', align: 'center'}
        , {field: 'finspectionUnitName', title: '送检单位', align: 'center'}
        , {field: 'testTime', title: '检测时间', align: 'center'}
        , {field: 'whoTest', title: '检验员', align: 'center'}
        , {field: 'bloodSamplePreparation', title: '血样备注', align: 'center'}
        , {field: 'trValue', title: 'TR', align: 'center'}
        , {field: 'omaTrValue', title: 'OMA/TR', align: 'center'}
        , {field: 'fsectionName', title: '科室', align: 'center'}
        , {field: 'infectedPatch', title: '病区', align: 'center'}
        , {field: 'bedNumber', title: '床号', align: 'center'}
        , {field: 'customerSource', title: '客户来源', align: 'center'}
        , {field: 'inspectionDoctor', title: '送检医生', align: 'center'}
        , {field: 'checkagainTime', title: '复查', align: 'center'}
        , {field: 'wealth', title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 200, fixed: 'right'}
        ,
    ]],
    // defaultToolbar: ['filter', 'print', 'exports']
});
var active = {
    reload: function () {
        var unit = $("#unit").val();
        var startTime = $("#starttime").val();
        var endTime = $("#endtime").val();
        var testerName = $("#testerName").val();
        var inspectionOfficeNumber = $("#inspectionOfficeNumber").val();
        var isGenerateReport = $("#isGenerateReport").val();
        var inspectionUnitNumber = $("#inspectionUnitNumber").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                finspectionUnitName: unit,
                inspectionUnitNumber: inspectionUnitNumber,
                testerName: testerName,
                startTime: startTime,
                endTime: endTime,
                inspectionOfficeNumber: inspectionOfficeNumber,
                isGenerateReport: isGenerateReport,
            }
        });
    },
    document:function(){

    },
    getCheckLength: function () { //批量删除
        var checkStatus = table.checkStatus('idTest'), data = checkStatus.data;
        console.log(data);
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
                url: "/bloodReport/batchDeleted",
                type: "POST",
                dataType: "JSON",
                json: false,
                mask: true,
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
    batchAddReport: function () {
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
            layer.open({
                title: '生成报告',
                area: ['500px', '280px'],
                btn: ['确认', '取消'],
                type: 1,
                content: $('.officeadd'),
                yes: function (index, layero) {
                    var val01 = "", val02 = null;
                    if ($("#officename").val()) {
                        val01 = $("#officename").val()
                    } else {
                        layer.msg("请选择复查时间类型")
                        return false
                    }
                    if ($("#prevname").val()) {
                        val02 = parseInt($("#prevname").val());
                    } else {
                        layer.msg("请输入复查时间")
                        return false
                    }
                    layer.close(index)
                    http.ajax({
                        url: "/bloodReport/batchAddReport",
                        type: "POST",
                        dataType: "JSON",
                        json: false,
                        mask: true,
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', token);
                        },
                        data: {
                            checkagainTimeType: val01,
                            checkagainTime: val02,
                            ids: ids,
                        },
                        // success: function (data) {
                        //     if (data.code == 0) {
                        //         layer.msg("生成报告成功")
                        //         window.location.reload()
                        //     }
                        // },
                        // error: function (xml, text) {
                        //
                        //     layer.close(index)
                        // }

                    }).then(function (data) {
                        if (data.code == 0) {
                            layer.msg("生成报告成功")
                            window.location.reload()
                        }
                    })

                },
                btn2: function () {
                    layer.closeAll();
                },
            });

        }
    },
    downloadWord: function () {//批量下载报告
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
            console.log(url + "/bloodReport/batchdownloadWord?ids=" + ids);
            window.location.href = url + "/bloodReport/batchdownloadWord?ids=" + ids

        }
    },
    addCase: function () {//添加病例
        var checkStatus = table.checkStatus('idTest'), data = checkStatus.data;
        console.log(data);
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
                url: "/bloodReport/addCase",
                type: "POST",
                dataType: "JSON",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {ids: ids},
                success: function (data) {
                    // if (data.code == 0) {
                    //     layer.msg('添加病例成功');
                    //     table.reload('idTest', {});
                    // } else if (data.code == 500) {
                    //     window.location.href = "../home.html"
                    // }
                }
            }).then(function (data) {
                if (data.code == 0) {
                    layer.msg('添加病例成功');
                    table.reload('idTest', {});
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            })
        }
    },
    notReport: function () {
        var checkStatus = table.checkStatus('idTest'), data = checkStatus.data;
        console.log(data);
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
                url: "/bloodReport/notReport",
                type: "POST",
                dataType: "JSON",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {ids: ids},
                success: function (data) {
                    if (data.code == 0) {
                        layer.msg('标记未生成');
                        table.reload('idTest', {});
                    } else if (data.code == 500) {
                        window.location.href = "../home.html"
                    }
                }
            })
        }
    },
    outSystemLog: function () {
        var finspectionUnitName = $("#unit").val();
        var inspectionUnitNumber = $("#inspectionUnitNumber").val();
        var testerName = $("#testerName").val();
        var inspectionOfficeNumber = $("#inspectionOfficeNumber").val();
        var isGenerateReport = $("#isGenerateReport").val();
        var startTime = $("#starttime").val();
        var endTime = $("#endtime").val();
        var batchNumber = $("#batchNumber").val();

        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.inspectionUnitNumber = inspectionUnitNumber
        param.testerName = testerName
        param.inspectionOfficeNumber = inspectionOfficeNumber
        param.isGenerateReport = isGenerateReport
        param.startTime = startTime
        param.endTime = endTime
        param.batchNumber = batchNumber
        $.ajax({
            url: url + "/out/outBloodReportAll",
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
                    var url = "http://47.93.22.122:8104/SSM/"

                    var urls = url + data.data.filepath
                    console.log(url)
                    window.location.href = urls;
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            }
        })
    }
}

table.on('row(demo)', function (obj) {
    if (obj.tr.find("[type='checkbox']").attr('checked')) {
        obj.tr.find("[type='checkbox']").attr('checked', false);
        obj.tr.find('.layui-unselect').removeClass('layui-form-checked');
        obj.tr.removeClass('layui-table-click');
    } else {
        obj.tr.find("[type='checkbox']").attr('checked', 'checked')
        obj.tr.find('.layui-unselect').addClass('layui-form-checked');
        obj.tr.addClass('layui-table-click');
    }

});
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

table.on('tool(demo)', function (obj) {
    var data = obj.data;
    if (obj.event === 'detail') {
        var id = data.id
        ID = data.id
        console.log(ID);
        layer.open({
            title: '生成报告',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.officeadd'),
            yes: function (index, layero) {
                var val01 = "", val02 = null;
                if ($("#officename").val()) {
                    val01 = $("#officename").val()
                } else {
                    layer.msg("请选择复查时间类型")
                    return false
                }
                if ($("#prevname").val()) {
                    val02 = parseInt($("#prevname").val());
                } else {
                    layer.msg("请输入复查时间")
                    return false
                }
                layer.close(index)
                $.ajax({
                    url: url + "/bloodReport/createReport",
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        checkagainTimeType: val01,
                        checkagainTime: val02,
                        id: id,
                    },
                    success: function (data) {
                        if (data.code == 0) {
                            layer.msg("生成报告成功")
                            window.location.reload()
                        }
                    },
                    error: function (xml, text) {

                        layer.close(index)
                    }

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
    } else if (obj.event === 'downloadWord') {
        var ids = data.id
        // console.log(url);
        // console.log(url+"/bloodReport/downloadWord?id="+ids);
        window.location.href = "http://47.93.22.122:8104/SSM/bloodReport/downloadWord?id=" + ids

        // http.ajax({
        //     url:"/bloodReport/downloadWord",
        //     type: "POST",
        //     dataType: "JSON",
        //     contentType: 'application/json',
        //     beforeSend: function (XMLHttpRequest) {
        //         XMLHttpRequest.setRequestHeader('Authorization', token);
        //     },
        //     data: {id: ids},
        // }).then(function (data) {
        //     console.log(data);
        //     var url = http.config.api
        //     var urls=url+"/"+data.data
        //     console.log(urls)
        //     // window.location.href = urls;
        // })
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

//批量删除
$("#all").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
// 批量生成报告
$("#batchAddReport").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
// 批量下载报告
$("#downloadWord").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
// 添加病例
$("#addCase").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
// 标记未生成
$("#notReport").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
// 已生成
form.on('select(isGenerateReport)', function (data) {
    var isGenerateReport = data.value
    if (isGenerateReport == 1) {
        $(".AddReport1").show();
        $(".AddReport2").hide()
        $(".right2").show();
        $(".right1").hide();
    }
    if (isGenerateReport == 0) {
        $(".AddReport1").hide()
        $(".AddReport2").show();
        $(".right1").show();
        $(".right2").hide();
    }
});
//批量导出
$("#outSystemLog").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
