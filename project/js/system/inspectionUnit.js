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
    , url: url + '/information/inspectionUnitList'
    , method: 'post'
    , contentType: 'application/json'
    , where: {
        unitName: '',
    }
    , parseData: function (res) {
        if (res.code == 500) {
            window.location.href = "../../log.html"
            console.log(res);
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
        , {field: 'unitName', title: '送检单位', align: 'center'}
        , {field: 'localProvince', title: '单位所在省', minWidth: 140, align: 'center'}
        , {field: 'localCity', title: '单位所在市', align: 'center', minWidth: 140}
        , {field: 'priorityIndex', title: '优先级', align: 'center'}
        , {field: 'Createtime', title: '添加时间', align: 'center'}
        , {field: 'wealth', title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 200, fixed: 'right'}
    ]]
});
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
//监听工具条
table.on('tool(demo)', function (obj) {
    var form = layui.form;
    var laydate = layui.laydate;
    var provincedata = null;
    var data = obj.data;
    var id = data.id;
    console.log(id)
    if (obj.event === 'detail') {
        layer.msg('ID：' + data.id + ' 的查看操作');
    } else if (obj.event === 'del') {
        layer.confirm('您确定要删除这条数据吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            http.ajax({
                url: "/information/deleteInspectionUnit",
                type: "POST",
                dataType: "JSON",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data:{id:data.id},
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
        var unitName = $('#selectInspectionUnitunitinp').val(data.unitName)
        var localCity = $('#selectInspectionUnitcity').val(data.localCity)
        var priorityIndex = $('#selectInspectionUnitpreve').val(data.priorityIndex)
        var provinceIndex = data.provinceIndex
        var cityIndex = data.cityIndex

        $("#selectInspectionUnitprovin").append('<option value="' + data.localProvince + '">' + data.localProvince + '</option>')
        if (data.localProvince) {//省
            form.render()
            $("#selectInspectionUnitprovin").children("option").each(function (index, item) {
                if ($(this).val() == data.localProvince) {
                    $(this).prop('selected', true)
                    form.render('select')
                }
            })
        }

        $("#selectInspectionUnitcity").append('<option value="' + data.localCity + '">' + data.localCity + '</option>')
        if (data.localProvince) {//省
            form.render()
            $("#selectInspectionUnitcity").children("option").each(function (index, item) {
                if ($(this).val() == data.localCity) {
                    $(this).prop('selected', true)
                    form.render('select')
                }
            })
        }

        //新增送检单位
        $.ajax({
            url: "address.json",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $.each(data, function (index, item) {
                    provincedata = data;
                    $("#selectInspectionUnitprovin").append('<option value="' + item.name + '">' + item.name + '</option>')
                })

            },
            error: function (xml, text) {
                layer.msg(text)
            }
        })
        //监听选择省份的事件
        form.on('select(aihao2)', function (data) {
            $("#selectInspectionUnitcity option").eq(0).nextAll().remove();
            $.each(provincedata, function (index, item) {
                if (item.name == data.value) {
                    $.each(item.city, function (aa, it) {
                        $("#selectInspectionUnitcity").append('<option value="' + it.name + '">' + it.name + '</option>');
                        form.render()
                    })
                }
            })
        });

        layer.open({
            title: '修改送检单位',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.selectInspectionUnit'),
            yes: function (index, layero) {
                var unitName = "", priorityIndex = ""
                if ($("#selectInspectionUnitunitinp").val()) {
                    unitName = $("#selectInspectionUnitunitinp").val()
                } else {
                    layer.msg("请输入送检单位")
                    return false
                }
                if ($("#selectInspectionUnitprovin").val()) {
                    localProvince = $("#selectInspectionUnitprovin").val();
                } else {
                    layer.msg("请选择所在省")
                    return false
                }
                if ($("#selectInspectionUnitcity").val()) {
                    localCity = $("#selectInspectionUnitcity").val();
                } else {
                    layer.msg("请选择所在市")
                    return false
                }
                if ($("#selectInspectionUnitpreve").val()) {
                    priorityIndex = parseInt($("#selectInspectionUnitpreve").val());
                } else {
                    layer.msg("请输入优先级")
                    return false
                }
                layer.close(index)
                http.ajax({
                    url: "/information/selectInspectionUnit",
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        unitName: unitName,
                        localProvince: localProvince,
                        localCity: localCity,
                        priorityIndex: priorityIndex,
                        provinceIndex: provinceIndex,
                        cityIndex: cityIndex,
                        id: id,
                    },
                    // success: function (data) {
                    //     if (data.code == 0) {
                    //         layer.msg("生成报告成功")
                    //         var timeout = setTimeout(function () {
                    //             window.location.reload()
                    //         }, 1000)
                    //     }
                    // },
                    // error: function (xml, text) {
                    //
                    //     layer.close(index)
                    // }

                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg("生成报告成功")
                        var timeout = setTimeout(function () {
                            window.location.reload()
                        }, 1000)
                    }
                }, function (err) {
                    layer.close(index)
                })

            },
            btn2: function () {
                layer.closeAll();
            },
        });
    }
});
$(function () {
    var form = layui.form;
    var laydate = layui.laydate;
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
    //     .then(function (data) {
    //     $.each(data, function (index, item) {
    //         provincedata = data;
    //         $("#provin").append('<option value="' + item.name + '">' + item.name + '</option>')
    //     })
    // },function (err) {
    //     layer.msg(text)
    // })
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
                var param = {}
                param.unitName = val01
                param.provinceIndex = val02id
                param.localProvince = val02
                param.cityIndex = val03id
                param.priorityIndex = val04
                param.localCity = val03
                $.ajax({
                    url: "http://47.93.22.122:8104/SSM/information/addInspectionUnit",
                    type: "POST",
                    dataType: "JSON",
                    contentType: 'application/json',
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: JSON.stringify(param),
                    // data: {
                    //     unitName: val01,
                    //     provinceIndex: val02id,
                    //     localProvince: val02,
                    //     cityIndex: val03id,
                    //     localCity: val03,
                    //     priorityIndex: val04
                    // },
                    success: function (data) {
                        if (data.code == 0) {
                            layer.msg("新增成功")
                            var time=setTimeout(function () {
                                window.location.reload()
                            },1000)
                        } else if (data.code == 9999) {
                            layer.msg("已存在重复送检单位")
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
                //     } else if (data.code == 9999) {
                //         layer.msg("已存在重复送检单位")
                //     }
                // }, function (err) {
                //     // if (xml.status == 500) {
                //     //     window.location.href = '../../log.html'
                //     // }
                //     // layer.msg(text)
                //     // layer.close(index)
                // })

            }
        });
    })
})
//搜索
$("#search").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});


