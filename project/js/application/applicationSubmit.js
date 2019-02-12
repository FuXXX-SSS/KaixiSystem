var table = layui.table;
var form = layui.form;
var $ = layui.$
var url = http.config.api
$(function () {
    http.ajax({
        url: "/bloodSampleTest/queryInspectionUnit",
        type: "POST",
        json: false,
        mask: true, //是否有loading,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        }, //是否有loading,
    }).then(function (data) {
            if (data.code == 0) {
                var nuitdata = data.data.rows;
                console.log($("#unit"))
                for (var i = 0; i < nuitdata.length; i++) {
                    $("#unit").append('<option value="' + nuitdata[i].unit_name + '">' + nuitdata[i].unit_name + '</option>')
                }
                form.render()
            } else if (data.code == 500) {
                window.location.href = "../../log.html"
            }
        },function(err){
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
            layer.msg("请上传excel文件！")
            return false
        }
        $.ajax({
            url: "http://47.93.22.122:8104/SSM/bloodSampleTest/importExExcle",
            type: "POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            contentType: false,
            processData: false,
            data: formData,
            success:function (data) {
                if (data.code == 0) {
                    layer.msg("导入成功")
                    var time=setTimeout(function () {
                        table.reload('idTest', {});
                    },1000)
                } else if (data.code == 9999) {
                    layer.msg(data.msg)
                }
            }
            })
            // .then(function (data) {
            //     if (data.code == 0) {
            //         layer.msg("导入成功")
            //         var time=setTimeout(function () {
            //             table.reload('idTest', {});
            //         },1000)
            //     } else if (data.code == 9999) {
            //         layer.msg(data.msg)
            //     }
            // },function(err){
            //     console.log(err);
            //     // 错误回调，err是错误回调参数
            //     // 这里不处理错误也可以，上面都有集中处理错误，会tips
            // })



    })

})

table.render({
    elem: '#test'
    , url: url+'/bloodSampleTest/queryBloodSampleTestList'
    , method: 'post'
    , contentType: 'application/json'
    , parseData: function (res) {
        if (res.code == 9999 ) {
            layer.msg(res.msg);
        }
        if (res.code == 500) {
            window.location.href = "../../log.html"
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
    , cols: [[
        {type: 'checkbox'}
        , {title: '序号', align: 'center', type: 'numbers'}
        , {field: 'bathnumber', title: '批次号', align: 'center'}
        , {field: 'finspectionUnitName', title: '送检单位', align: 'center'}
        , {field: 'inspectionUnitNumber', title: '送检单位编号', minWidth: 140, align: 'center'}
        , {field: 'testerName', title: '姓名', align: 'center'}
        , {field: 'testerSex', title: '性别', align: 'center'}
        , {field: 'testerAge', title: '年龄', align: 'center'}
        , {field: 'phoneNumber', title: '电话号码', align: 'center'}
        , {field: 'fsectionName', title: '科室', align: 'center'}
        , {field: 'takebloodTime', title: '采血时间', align: 'center'}
        , {field: 'inspectionTime', title: '送样时间', align: 'center'}
        , {field: 'buttPeopleFaccountName', title: '对接员', align: 'center'}
        , {field: 'customerSource', title: '客户来源', align: 'center'}
        , {field: 'operation', title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 200, fixed: 'right'}
    ]]
    , page: true
    , limit: 15
    , limits: [15]
    , id: 'idTest'
    , done: function (res, curr, count) {

    }
});

var active = {
    reload: function () {
        var startime = $('#start').val();
        var endtime = $("#end").val();
        var name = $("#name").val();
        var unit = $("#unit").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                finspectionUnitName: unit,
                startTime: startime,
                endTime: endtime,
                testerName: name
            }
        });
    },
    getCheckLength: function () { //批量删除
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
                url: "/bloodSampleTest/batchDeleted",
                type: "POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {ids: ids},
            }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg('删除成功');
                        table.reload('idTest', {});
                    } else if (data.code == 500) {
                        window.location.href = "../home.html"
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                }
            )



        }
    },
    allsubmit: function () {//批量提交
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
                url: "/bloodSampleTest/batchSubmit",
                type: "POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {ids: ids},
            }).then(function (data) {
                if (data.code == 0) {
                    layer.msg('提交成功');
                    table.reload('idTest', {});
                } else if (data.code == 500) {
                    window.location.href = "../home.html"
                }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })


        }
    },
    allout: function () {//批量导出
        var finspectionUnitName = $("#unit").val();
        var testerName = $("#name").val();
        var startTime = $("#start").val();
        var endTime = $("#end").val();
        var param = {}
        param.finspectionUnitName = finspectionUnitName
       // param.inspectionUnitNumber = inspectionUnitNumber
        param.testerName = testerName
       // param.admissionNumber = admissionNumber
        //param.outpatientNumber = outpatientNumber
        param.startTime = startTime
        param.endTime = endTime
        //param.batchNumber = batchNumber
        //param.testState = 0
        http.ajax({
            url: "/out/applicationSubmissionAll",
            type: "POST",
            json: false,
            mask: true,
            contentType: 'application/json',
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data:  JSON.stringify(param),
        }).then(function (data) {
                if (data.code == 0) {
                    var url=http.config.api
                    var url= url+"/"+data.data.filepath
                    console.log(url)
                    window.location.href = url;
                } else if (data.code == 500) {
                 window.location.href = "../home.html"
                }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })


    }
};
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
    obj.tr.css('background-color', 'white')
    if (obj.event === 'detail') {//提交
        layer.confirm('确定吗', {icon: 3, title: '提示'}, function (index) {
            obj.tr.removeClass('layui-table-click');
            http.ajax({
                url: "/bloodSampleTest/submit",
                type: "POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {id: data.id},
            }) .then(function (data) {
                    if (data.code == 0) {
                        layer.msg('提交成功');
                        table.reload('idTest', {});
                    } else if (data.code == 500) {
                        window.location.href = '../home.html'
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })


            layer.close(index);
        })
        // layer.msg('ID：'+ data.id + ' 的查看操作');
    } else if (obj.event === 'del') {
        layer.confirm('确定删除吗', {icon: 3, title: '提示'}, function (index) {
            http.ajax({
                url: "/bloodSampleTest/submit",
                type: "POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {id: data.id},
            }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg('删除成功');
                        table.reload('idTest', {});
                    } else if (data.code == 500) {
                        window.location.href = '../home.html'
                    }
                },function(err){
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
            layer.close(index);
        });
    } else if (obj.event === 'edit') {
        window.location.href = "editApplication.html?id=" + obj.data.id;

    }
});

//日期插件
var laydate = layui.laydate;
laydate.render({
    elem: '#start' //指定元素
});
laydate.render({
    elem: '#end' //指定元素
});

//搜索
$("#search").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//清空
$("#clear").click(function () {
    $("#unit").val("");
    $('#start').val("");
    $("#end").val("")
    $("#name").val("")
    form.render()
})
//批量删除
$("#all").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//批量提交
$("#allsubmit").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//批量导出
$("#allout").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})


//下载模板
$("#loader").click(function () {
    window.location.href = url+"/bloodSampleTest/downloadExcel"
})
