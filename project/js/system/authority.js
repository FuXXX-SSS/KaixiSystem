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
        //             $("#unit").append('<option value="' + nuitdata[i].id + '">' + nuitdata[i].unit_name + '</option>')
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
                $("#unit").append('<option value="' + nuitdata[i].id + '">' + nuitdata[i].unit_name + '</option>')
            }
            form.render()
        } else if (data.code == 500) {
            window.location.href = "../../log.html"
        }
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
        })

    })

})
table.render({
    elem: '#test'
    , url: url + '/authority/queryaccount'
    , method: 'post'
    , contentType: 'application/json'
    , where: {
        accountrealnamelike: '',
        permissiondescriptionlike: '',
    }
    , parseData: function (res) {
        if (res.states == 500) {
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
        , {field: 'accountName', title: '登录账户', align: 'center'}
        , {field: 'accountRealname', title: '真实姓名', align: 'center'}
        , {field: 'permissionDescription', title: '权限描述', align: 'center', minWidth: 400}
        , {field: 'role', title: '角色', align: 'center'}
        , {field: 'inspectionName', title: '所在送检单位', align: 'center', minWidth: 140}
        , {field: 'wealth', title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 200, fixed: 'right'}
    ]]
});
var active = {
    reload: function () {
        var accountrealnamelike = $("#accountrealnamelike").val();
        var permissiondescriptionlike = $("#permissiondescriptionlike").val();
        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            , where: {
                accountrealnamelike: accountrealnamelike,
                permissiondescriptionlike: permissiondescriptionlike,
            }
        });
    },
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
//监听工具条
table.on('tool(demo)', function (obj) {
    var data = obj.data;
    if (obj.event === 'detail') {
        layer.msg('ID：' + data.id + ' 的查看操作');
    } else if (obj.event === 'del') {
        layer.confirm('您确定要删除这条数据吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            var ids = data.id
            http.ajax({
                url: "/authority/updateaccount",
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
        var obj = {}

        layui.config({
            base: '../../layui/lay/mymodules/'
        }).use(['jquery', 'authtree', 'form', 'layer', 'laytpl'], function () {
            var $ = layui.jquery;
            var authtree = layui.authtree;
            // 一般来说，权限数据是异步传递过来的
            http.ajax({
                url: "/authority/querymeun",
                type: "POST",
                dataType: "JSON",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                // success: function (data) {
                //     authtree.render('#LAY-auth-tree-index', data, {
                //         inputname: 'authids[]',
                //         layfilter: 'lay-check-auth',
                //         autowidth: true,
                //     });
                //     authtree.on('change(lay-check-auth)', function (data) {
                //         // 获取所有已选中节点
                //         var checked = authtree.getChecked('#LAY-auth-tree-index');
                //         let test = "";
                //         checked.forEach(function (item, index) {
                //             if(index == 0){
                //                 test +=item
                //             }else{
                //                 test += ","+item
                //             }
                //         })
                //         obj.id = test;
                //         console.log(obj);
                //     });
                // }
            }).then(function (data) {
                authtree.render('#LAY-auth-tree-index', data, {
                    inputname: 'authids[]',
                    layfilter: 'lay-check-auth',
                    autowidth: true,
                });
                if ($(".auth-leaf").css("color", "transparent")) {
                    $(".auth-leaf").css("width", "16px")
                }
                authtree.on('change(lay-check-auth)', function (data) {
                    // 获取所有已选中节点
                    var checked = authtree.getChecked('#LAY-auth-tree-index');
                    let test = "";
                    checked.forEach(function (item, index) {
                        if (index == 0) {
                            test += item
                        } else {
                            test += "," + item
                        }
                    })
                    obj.id = test;
                    console.log(obj);
                });
            })


        });
        val07 = ""
        form.on('select(settings)', function (data) {
            var settings = data.value
            console.log(settings);
            if (settings == 3) {
                $("#role3").show();
                val07 = data.value
                console.log(val07);
            }
            if (settings == 1 || settings == 2) {
                $("#role3").hide();
            }
        });
        layer.open({
            title: '权限设置',
            area: ['500px', '350px'],
            btn: ['确定', '取消'], //按钮
            type: 1,
            content: $('.officeadd'),

            yes: function (index, layero) {

                var val01 = "", val02 = "", val03 = "", val04 = null, val05 = "", val06 = "", val08 = "";
                var val02id = null, val03id = null;

                if ($("#account").val()) {
                    val01 = $("#account").val()
                } else {
                    layer.msg("请输入账号")
                    return false
                }
                if ($("#unit").val()) {
                    val08 = $("#unit").val()
                    console.log(val08);
                } else {
                    layer.msg("请选择送检的单位")
                    return false
                }
                if ($("#password2").val()) {
                    val02 = $("#password2").val()
                } else {
                    layer.msg("请输入密码")
                    return false
                }
                if ($("#Affirmpassword").val()) {
                    val03 = $("#Affirmpassword").val()
                    if (val02 != val03) {
                        layer.msg("请确认密码一致")
                    } else {
                        if ($("#TrueName").val()) {
                            val05 = $("#TrueName").val()
                        } else {
                            layer.msg("请输入真实姓名")
                            return false
                        }
                        if ($("#permissiondescription").val()) {
                            val06 = $("#permissiondescription").val()
                        } else {
                            layer.msg("请输入权限描述")
                            return false
                        }
                    }
                } else {
                    console.log(123);
                    layer.msg("请输入密码")
                    return false
                }

                http.ajax({
                    url: "/authority/addPermissions",
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        accountname: val01,
                        loginpassword: val02,
                        accountrealname: val05,
                        permissiondescription: val06,
                        role: val07,
                        united: val08,
                        menu: obj.id
                    },
                    // success: function (data) {
                    //     if (data.code == 0) {
                    //         layer.msg("新增成功")
                    //         window.location.reload()
                    //     } else if (data.code == 9999) {
                    //         layer.msg("已存在重复送检单位")
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
                        var time = setTimeout(function () {
                            window.location.reload()

                        }, 1000)
                    } else if (data.code == 9999) {
                        layer.msg("已存在重复送检单位")
                    }
                }, function (err) {
                    if (err.status == 500) {
                        window.location.href = '../../log.html'
                    }
                    layer.msg(text)
                    layer.close(index)
                })

            }
        });
    }
});
//搜索
$("#search").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
// 新增管理员

$("#unitAdd").click(function () {
    var obj = {}

    layui.config({
        base: '../../layui/lay/mymodules/'
    }).use(['jquery', 'authtree', 'form', 'layer', 'laytpl'], function () {
        var $ = layui.jquery;
        var authtree = layui.authtree;
        // 一般来说，权限数据是异步传递过来的
        http.ajax({
            url: "/authority/querymeun",
            type: "POST",
            dataType: "JSON",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            // success: function (data) {
            //     authtree.render('#LAY-auth-tree-index', data, {
            //         inputname: 'authids[]',
            //         layfilter: 'lay-check-auth',
            //         autowidth: true,
            //     });
            //     authtree.on('change(lay-check-auth)', function (data) {
            //         // 获取所有已选中节点
            //         var checked = authtree.getChecked('#LAY-auth-tree-index');
            //         let test = "";
            //         checked.forEach(function (item, index) {
            //             if(index == 0){
            //                 test +=item
            //             }else{
            //                 test += ","+item
            //             }
            //         })
            //         obj.id = test;
            //         console.log(obj);
            //     });
            // }
        }).then(function (data) {
            authtree.render('#LAY-auth-tree-index', data, {
                inputname: 'authids[]',
                layfilter: 'lay-check-auth',
                autowidth: true,

            });
            if ($(".auth-leaf").css("color", "transparent")) {
                $(".auth-leaf").css("width", "16px")
            }
            authtree.on('change(lay-check-auth)', function (data) {
                // 获取所有已选中节点
                var checked = authtree.getChecked('#LAY-auth-tree-index');
                let test = "";
                checked.forEach(function (item, index) {
                    if (index == 0) {
                        test += item
                    } else {
                        test += "," + item
                    }
                })
                obj.id = test;
                console.log(obj);
            });
        })


    });
    val07 = ""
    form.on('select(settings)', function (data) {
        var settings = data.value
        console.log(settings);
        if (settings == 3) {
            $("#role3").show();
            val07 = data.value
            console.log(val07);
        }
        if (settings == 1 || settings == 2) {
            $("#role3").hide();
        }
    });
    layer.open({
        title: '权限设置',
        area: ['500px', '150px'],
        btn: ['确定', '取消'], //按钮
        type: 1,
        content: $('.officeadd'),

        yes: function (index, layero) {

            var val01 = "", val02 = "", val03 = "", val04 = null, val05 = "", val06 = "", val08 = "";
            var val02id = null, val03id = null;

            if ($("#account").val()) {
                val01 = $("#account").val()
            } else {
                layer.msg("请输入账号")
                return false
            }
            if ($("#unit").val()) {
                val08 = $("#unit").val()
                console.log(val08);
            } else {
                layer.msg("请选择送检的单位")
                return false
            }
            if ($("#password2").val()) {
                val02 = $("#password2").val()
            } else {
                layer.msg("请输入密码")
                return false
            }
            if ($("#Affirmpassword").val()) {
                val03 = $("#Affirmpassword").val()
                if (val02 != val03) {
                    layer.msg("请确认密码一致")
                } else {
                    if ($("#TrueName").val()) {
                        val05 = $("#TrueName").val()
                    } else {
                        layer.msg("请输入真实姓名")
                        return false
                    }
                    if ($("#permissiondescription").val()) {
                        val06 = $("#permissiondescription").val()
                    } else {
                        layer.msg("请输入权限描述")
                        return false
                    }
                }
            } else {
                layer.msg("请输入密码")
                return false
            }

            http.ajax({
                url: "/authority/addPermissions",
                type: "POST",
                dataType: "JSON",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {
                    accountname: val01,
                    loginpassword: val02,
                    accountrealname: val05,
                    permissiondescription: val06,
                    role: val07,
                    unitid: val08,
                    menu: obj.id
                },
                // success: function (data) {
                //     if (data.code == 0) {
                //         layer.msg("新增成功")
                //         window.location.reload()
                //     } else if (data.code == 9999) {
                //         layer.msg("已存在重复送检单位")
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
                console.log(data);
                if (data.code == 0) {

                    layer.msg("新增成功")
                    var time = setTimeout(function () {
                        // window.location.reload()

                    }, 1000)
                } else if (data.code == 9999) {
                    layer.msg("已存在重复送检单位")
                }
            }, function (err) {
                if (err.status == 500) {
                    window.location.href = '../../log.html'
                }
                layer.msg(text)
                layer.close(index)
            })

        }
    });
})

function checkAll(dst) {
    layui.use(['jquery', 'layer', 'authtree'], function () {
        var layer = layui.layer;
        var authtree = layui.authtree;

        authtree.checkAll(dst);
    });
}

function uncheckAll(dst) {
    layui.use(['jquery', 'layer', 'authtree'], function () {
        var layer = layui.layer;
        var authtree = layui.authtree;

        authtree.uncheckAll(dst);
    });
}

// var test = []
//
// data.forEach(function (item, index) {
//     var obj = {
//         list: [],
//         name: {},
//         href: "",
//         icon: "",
//         parentId: "",
//         id: "",
//         alias: "",
//     }
//     obj.name = item.title
//     let smList = [];
//     obj.list = item.children
//     obj.parentId = item.parentId
//     obj.id = item.id
//     obj.alias = item.id
//     if (item.children != null) {
//         item.children.forEach(function (item2, index) {
//             var obj2 = {
//                 list: [],
//                 name: {},
//                 href: "",
//                 icon: "",
//                 parentId: "",
//                 id: "",
//                 alias: "",
//             }
//             if (item2.parentId == obj.id) {
//                 obj2.name = item2.title
//                 obj2.list = item2.children
//                 obj2.parentId = item2.parentId
//                 obj2.alias = item2.id
//                 smList.push(obj2)
//
//             }
//         })
//     }
//     if (smList.length > 0) {
//         obj.list = smList;
//     }
//     test.push(obj)
// })
// console.log(test);


