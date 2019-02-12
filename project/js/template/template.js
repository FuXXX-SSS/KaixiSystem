var table = layui.table;
var form = layui.form;
var $ = layui.$
var url = http.config.api

table.render({
    elem: '#test'
    , url: url+'/information/selectTemplate'
    , method: 'post'
    , contentType: 'application/json'
    , parseData: function (res) {
        if (res.code == 500) {
            window.location.href = "../../log.html"
            console.log(res);
        }
        if (res.code == 9999 ) {
            layer.msg(res.msg);
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
        , {field: 'name', title: '模板名称', align: 'center'}
        , {field: 'createTime', title: '上传时间', align: 'center'}
        , {field: 'wealth', title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 200, fixed: 'right'}
    ]]
});
var active={
    reload: function () {
        var name = $("#name").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            },
            where:{
                name : name
            }
        });
    },
    allsubmit:function () {

    }
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
                url: "/information/delTemplate",
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
        $("#InspectionItemunitinp").val(data.itemName)
        $("#InspectionItempreve").val(data.priorityIndex)
        layer.open({
            title: '修改检测项目',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.InspectionItemunitadd'),
            yes: function (index, layero) {
                var unitName = "", priorityIndex = ""
                if ($("#InspectionItemunitinp").val()) {
                    unitName = $("#InspectionItemunitinp").val()
                } else {
                    layer.msg("请输入送检单位")
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
                    url: "/information/updateInspectionItem",
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        itemName: unitName,
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
$("#allsubmit").change(function (e) {
    var formData = new FormData();
    var File = e.target.files[0];
    formData.append('file', File);
    var filename = File.name;
    var filetype = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
    if (filetype !== "ftl" ) {
        layer.msg("请上传ftl文件！")
        return false
    }
    $.ajax({
        url: "http://192.168.31.212:9003/information/uploadFile",
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
                $("#allsubmit").val('')
                var time=setTimeout(function () {
                    table.reload('idTest', {});
                },1000)
            } else if (data.code == 9999) {
                layer.msg(data.msg)
                $("#allsubmit").val('')
            }
        }
    })
    // }).then(function (data) {
    //         if (data.code == 0) {
    //             layer.msg("导入成功")
    //             $('#allinput').val('')
    //         } else if (data.code == 9999) {
    //             layer.msg(data.msg)
    //             $('#allinput').val('')
    //         }
    //     },function(err){
    //         console.log(err);
    //         // 错误回调，err是错误回调参数
    //         // 这里不处理错误也可以，上面都有集中处理错误，会tips
    //     })



})
