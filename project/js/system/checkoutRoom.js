var table = layui.table;
var form = layui.form;
var $ = layui.$
var url = http.config.api

table.render({
    elem: '#test'
    , url:url+'/information/laboratoryList'
    , method: 'post'
    , contentType: 'application/json'
    , where: {
        laboratoryName: ''
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
    , cols: [[
        {type: 'checkbox'}
        , {title: '序号', align: 'center', type: 'numbers'}
        , {field: 'laboratoryName', title: '检验室名称', align: 'center', minWidth: 140}
        , {field: 'laboratoryNumber', title: '检验室编号', align: 'center', minWidth: 140}
        , {field: 'priorityIndex', title: '优先级', align: 'center'}
        , {field: 'createtime', title: '添加时间', align: 'center'}
        , {field: 'wealth', title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 200, fixed: 'right'}
    ]]
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
var active={
    reload: function () {
        var laboratoryName = $("#laboratoryName2").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                laboratoryName:laboratoryName
            }
        });
    },
}
//监听工具条
table.on('tool(demo)', function (obj) {
    var data = obj.data;
    if (obj.event === 'detail') {
        layer.msg('ID：' + data.id + ' 的查看操作');
    } else if (obj.event === 'del') {
        layer.confirm('您确定要删除这条数据吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            var ids=data.id
            http.ajax({
                url: "/information/deleteLaboratory",
                type: "POST",
                dataType: "JSON",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {id: ids},
                // success: function (data) {
                //     if (data.code == 0) {
                //         layer.msg('删除成功');
                //         var timeout = setTimeout(function () {
                //             table.reload('idTest', {});
                //         }, 1000)
                //     } else if (data.code == 500) {
                //         window.location.href = '../home.html'
                //     }
                // }
            }).then(function (data) {
                if (data.code == 0) {
                    layer.msg('删除成功');
                    var timeout = setTimeout(function () {
                        table.reload('idTest', {});
                    }, 1000)
                } else if (data.code == 500) {
                    window.location.href = '../home.html'
                }
            })
        });
    } else if (obj.event === 'edit') {
        var id = data.id
        $("#InspectionItemunitinp").val(data.laboratoryName)
        $("#InspectionlaboratoryNumber").val(data.laboratoryNumber)
        $("#InspectionItempreve").val(data.priorityIndex)
        layer.open({
            title: '修改检验室',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.InspectionItemunitadd'),
            yes: function (index, layero) {
                var unitName = "", priorityIndex = "",laboratoryNumber=""
                if ($("#InspectionItemunitinp").val()) {
                    unitName = $("#InspectionItemunitinp").val()
                } else {
                    layer.msg("请输入检验室名称")
                    return false
                }
                if ($("#InspectionlaboratoryNumber").val()) {
                    laboratoryNumber = $("#InspectionlaboratoryNumber").val()
                } else {
                    layer.msg("请输入检验室编号")
                    return false
                }
                if ($("#InspectionItempreve").val()) {
                    priorityIndex = parseInt($("#InspectionItempreve").val());
                } else {
                    layer.msg("请输入优先级")
                    return false
                }
                layer.close(index)
                http.ajax({
                    url: "/information/updateLaboratory",
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        laboratoryName: unitName,
                        laboratoryNumber: laboratoryNumber,
                        priorityIndex:priorityIndex,
                        id: id,
                    },
                    // success: function (data) {
                    //     if (data.code == 0) {
                    //         layer.msg("修改检测项目成功")
                    //         var timeout = setTimeout(function () {
                    //             window.location.reload()
                    //         }, 1000)
                    //     }else if (data.code == 9999){
                    //         layer.msg("已存在重复的项目名称")
                    //     }
                    // },
                    // error: function (xml, text) {
                    //
                    //     layer.close(index)
                    // }

                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg("修改成功")
                        var timeout = setTimeout(function () {
                            window.location.reload()
                        }, 1000)
                    }else if (data.code == 9999){
                        layer.msg(data.msg)
                    }
                })

            },
            btn2: function () {
                layer.closeAll();
            },
        });
    }
});
//搜索
$("#search").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});

$(function () {
    var form =layui.form
    $("#unitAdd").click(function () {
        layer.open({
            title: '新增检验室配置',
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
                    layer.msg("请输入检验室名称")
                    return false
                }
                if ($("#laboratoryNumber").val()) {
                    val02 = $("#laboratoryNumber").val()
                } else {
                    layer.msg("请输入检验室编号")
                    return false
                }
                if ($("#preve").val()) {
                    val04 = parseInt($("#preve").val());
                } else {
                    layer.msg("请输入优先级")
                    return false
                }
                http.ajax({
                    url: "/information/addLaboratory",
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        laboratoryName:val01,
                        laboratoryNumber:val02,
                        priorityIndex:val04
                    },
                    // success: function (data) {
                    //     if (data.code == 0) {
                    //         layer.msg("新增成功")
                    //         var time =setTimeout(function () {
                    //             window.location.reload()
                    //
                    //         },1000)
                    //     } else if (data.code == 9999) {
                    //         layer.msg("存在重复信息")
                    //     }
                    // },
                    // error: function (xml, text) {
                    //     if (xml.status == 500) {
                    //         window.location.href = '../../log.html'
                    //     }
                    //     layer.msg(text)
                    //     layer.close(index)
                    // }

                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg("新增成功")
                        var time =setTimeout(function () {
                            window.location.reload()

                        },1000)
                    } else if (data.code == 9999) {
                        layer.msg("存在重复信息")
                    }
                },function (err) {
                    if (err.status == 500) {
                        window.location.href = '../../log.html'
                    }
                    layer.msg(text)
                    layer.close(index)
                })

            }
        });
    })
})
