var $ = layui.$;
var form = layui.form;
var table = layui.table;

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

var status = GetUrlParam("status")
console.log(GetUrlParam("status"))
$(function () {
    if (GetUrlParam("status") == 1) {
        console.log(111)
        $("#check").val(1)
    } else {
        $("#check").val(0)
    }
    //下拉框
    http.ajax({
        url: '/bloodSampleTest/queryInspectionUnit',
        type: 'POST',
        json: false,
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
    }).then(function (data) {
        if (data.code == 0) {
            var nuitdata = data.data.rows;
            // console.log($('#unit'));
            for (var i = 0; i < nuitdata.length; i++) {
                $('#unit').append(
                    '<option value="' + nuitdata[i].unit_name + '">' + nuitdata[i].unit_name + '</option>'
                );
            }
            form.render();
        } else if (data.code == 500) {
            window.location.href = '../../log.html';
        }
    }, function (err) {
        console.log(err);
        // 错误回调，err是错误回调参数
        // 这里不处理错误也可以，上面都有集中处理错误，会tips
    })


});
var laydate = layui.laydate;
laydate.render({
    elem: '#start' //指定元素
});
laydate.render({
    elem: '#start1' //指定元素
});
laydate.render({
    elem: '#end' //指定元素
});
//

if (GetUrlParam("status") == 1) {

    table.render({
        elem: '#test',
        url: url + '/bloodAuduting/queryBloodAuditing',
        method: 'post',
        contentType: 'application/json',
        where: {
            isaddFinalTestResults: 1
        },
        parseData: function (res) {
            if (res.code == 500) {
                window.location.href = '../../log.html';
            }
            if (res.code == 9999) {
                layer.msg(res.msg);
            }
            if (res.code == 0) {
                var data = res.data
                if (data.total == 0) {
                    $(".layui-table-header").css("overflow", "visible")
                    $(".layui-table-box").css("overflow", "auto")
                }
            }
            return {
                code: res.code,
                msg: res.msg,
                count: res.data.total,
                data: res.data.rows
            };

        },
        request: {
            limitName: 'rows'
        },
        headers: {Authorization: token},
        height: 'full-250',
        cellMinWidth: 100,
        cols: [
            [
                {type: 'checkbox', rowspan: 2},
                {title: '序号', align: 'center', rowspan: 2, type: 'numbers'},
                {field: 'isaddFinalTestResults', title: '状态', align: 'center', rowspan: 2, colspan: 1},
                {field: 'batchNumber', title: '批次号', align: 'center', rowspan: 2, colspan: 1},
                {field: 'finspectionUnitName', title: '送检单位', align: 'center', rowspan: 2, colspan: 1},
                {field: 'testerName', title: '姓名', align: 'center', rowspan: 2, colspan: 1},
                {field: 'testSex', title: '性别', align: 'center', rowspan: 2, colspan: 1},
                {field: 'testerAge', title: '年龄', align: 'center', rowspan: 2, colspan: 1},
                {
                    field: 'inspectionOfficeNumber',
                    title: '检验所编号',
                    align: 'center',
                    minWidth: 140,
                    rowspan: 2,
                    colspan: 1
                },
                {field: 'clinicalDiagnosis', title: '临床诊断', align: 'center', rowspan: 2, colspan: 1},
                {field: 'pastHistory', title: '疾病史', align: 'center', rowspan: 2, colspan: 1},
                {field: 'testResulttitle', title: '检验结果', align: 'center', colspan: 7},
                {field: 'bloodSamplePreparation', title: '血样备注', align: 'center', rowspan: 2, colspan: 1},
                {field: 'customerSource', title: '客户来源', align: 'center', rowspan: 2, colspan: 1},
                {title: '本次检验结果', align: 'center', colspan: 3},
                {field: 'beforResult', title: '既往检测结果', align: 'center', colspan: 6},
                {title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 250, rowspan: 2}
            ],
            [
                {
                    title: 'TR值(U/mL)',
                    align: 'center',
                    style: 'height:auto;',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.testResult.length; i++) {
                            tr += rows.testResult[i].trValue;
                            if (rows.testResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },

                {
                    title: 'OMA',
                    align: 'center',
                    templet: function (data) {
                        var oma = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            oma += data.testResult[i].omaValue;
                            if (data.testResult.length - i != 1) {
                                oma += '<hr/>';
                            }
                        }
                        return oma;
                    }
                },
                {
                    title: 'OMA/TR',
                    align: 'center',
                    templet: function (data) {
                        var omatr = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            omatr += data.testResult[i].omaTrValue;
                            if (data.testResult.length - i != 1) {
                                omatr += '<hr/>';
                            }
                        }
                        return omatr;
                    }
                },
                {
                    title: '仪器型号',
                    align: 'center',
                    templet: function (data) {
                        var instrumentModel = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            instrumentModel += data.testResult[i].instrumentModel;
                            if (data.testResult.length - i != 1) {
                                instrumentModel += '<hr/>';
                            }
                        }
                        return instrumentModel;
                    }
                },
                {
                    title: '检验日期',
                    align: 'center',
                    templet: function (data) {
                        var testTime = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            testTime += data.testResult[i].testTime;
                            if (data.testResult.length - i != 1) {
                                testTime += '<hr/>';
                            }
                        }
                        return testTime;
                    }
                },
                {
                    title: '检验员',
                    align: 'center',
                    templet: function (data) {
                        var testername = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            testername += data.testResult[i].testerNames;
                            if (data.testResult.length - i != 1) {
                                testername += '<hr/>';
                            }
                        }
                        return testername;
                    }
                },
                {
                    title: '添加检验结果', align: 'center',//templet: '#switchTpl',
                    templet: (
                        function (data) {
                            if (data.isaddFinalTestResultsType == 1) {
                                var testername = "";
                                for (var i = 0; i < data.testResult.length; i++) {
                                    testername += '<input type="i" lay-skin="primary" name="result" value="' + data.testResult[i].testResultId + '">'
                                    if (data.testResult.length - i != 1) {
                                        testername += "<hr/>";
                                    }
                                }
                                return testername;

                            }
                        })
                },


                //本次检验结果
                {field: 'trValue', title: 'TR值(U/mL)', align: 'center'},
                {field: 'omaTrValue', title: 'OMA/TR', align: 'center'},
                {field: 'testTime', title: '检验日期', align: 'center'},
                //既往检测结果
                {
                    title: 'TR值(U/mL)',
                    align: 'center',
                    style: 'height:auto;',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].trValue;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    title: 'OMA/TR',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].omaTrValue;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    title: '检验日期',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].testTime;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    field: 'fsectionName',
                    title: '科室',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].fsectionName;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    field: 'clinicalDiagnosis',
                    title: '临床诊断',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].clinicalDiagnosis;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    field: 'pastHistory',
                    title: '异常指标',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].pastHistory;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                }
            ]
        ],
        page: true, //是否显示分页
        limit: 15,
        limits: [15],
        id: 'idTest',
        done: function (res, curr, count) {
        }
    });
} else if (GetUrlParam("status") == 0 && GetUrlParam("status") == "") {
    table.render({
        elem: '#test',
        url: url + '/bloodAuduting/queryBloodAuditing',
        method: 'post',
        contentType: 'application/json',
        parseData: function (res) {
            if (res.code == 500) {
                window.location.href = '../../log.html';
            }
            if (res.code == 9999) {
                layer.msg(res.msg);
            }
            if (res.code == 0) {
                var data = res.data
                if (data.total == 0) {
                    $(".layui-table-header").css("overflow", "visible")
                    $(".layui-table-box").css("overflow", "auto")
                }
            }
            return {
                code: res.code,
                msg: res.msg,
                count: res.data.total,
                data: res.data.rows
            };

        },
        request: {
            limitName: 'rows'
        },
        headers: {Authorization: token},
        height: 'full-250',
        cellMinWidth: 100,
        cols: [
            [
                {type: 'checkbox', rowspan: 2},
                {title: '序号', align: 'center', rowspan: 2, type: 'numbers'},
                {field: 'isaddFinalTestResults', title: '状态', align: 'center', rowspan: 2, colspan: 1},
                {field: 'batchNumber', title: '批次号', align: 'center', rowspan: 2, colspan: 1},
                {field: 'finspectionUnitName', title: '送检单位', align: 'center', rowspan: 2, colspan: 1},
                {field: 'testerName', title: '姓名', align: 'center', rowspan: 2, colspan: 1},
                {field: 'testSex', title: '性别', align: 'center', rowspan: 2, colspan: 1},
                {field: 'testerAge', title: '年龄', align: 'center', rowspan: 2, colspan: 1},
                {
                    field: 'inspectionOfficeNumber',
                    title: '检验所编号',
                    align: 'center',
                    minWidth: 140,
                    rowspan: 2,
                    colspan: 1
                },
                {field: 'clinicalDiagnosis', title: '临床诊断', align: 'center', rowspan: 2, colspan: 1},
                {field: 'pastHistory', title: '疾病史', align: 'center', rowspan: 2, colspan: 1},
                {field: 'testResulttitle', title: '检验结果', align: 'center', colspan: 7},
                {field: 'bloodSamplePreparation', title: '血样备注', align: 'center', rowspan: 2, colspan: 1},
                {field: 'customerSource', title: '客户来源', align: 'center', rowspan: 2, colspan: 1},
                {title: '本次检验结果', align: 'center', colspan: 3},
                {field: 'beforResult', title: '既往检测结果', align: 'center', colspan: 6},
                {title: '操作', align: 'center', toolbar: '#barDemo', minWidth: 250, rowspan: 2}
            ],
            [
                // {
                //     title: 'TR值(U/mL)',
                //     align: 'center',
                //     style: 'height:auto;',
                //     templet: function(rows) {
                //         var tr = '';
                //         for (var i = 0; i < rows.beforResult.length; i++) {
                //             tr += rows.beforResult[i].trValue;
                //             if (rows.beforResult.length - i != 1) {
                //                 tr += '<hr/>';
                //             }
                //         }
                //         return tr;
                //     }
                // },
                {
                    title: 'TR值(U/mL)',
                    align: 'center',
                    style: 'height:auto;',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.testResult.length; i++) {
                            tr += rows.testResult[i].trValue;
                            if (rows.testResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },

                {
                    title: 'OMA',
                    align: 'center',
                    templet: function (data) {
                        var oma = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            oma += data.testResult[i].omaValue;
                            if (data.testResult.length - i != 1) {
                                oma += '<hr/>';
                            }
                        }
                        return oma;
                    }
                },
                {
                    title: 'OMA/TR',
                    align: 'center',
                    templet: function (data) {
                        var omatr = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            omatr += data.testResult[i].omaTrValue;
                            if (data.testResult.length - i != 1) {
                                omatr += '<hr/>';
                            }
                        }
                        return omatr;
                    }
                },
                {
                    title: '仪器型号',
                    align: 'center',
                    templet: function (data) {
                        var instrumentModel = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            instrumentModel += data.testResult[i].instrumentModel;
                            if (data.testResult.length - i != 1) {
                                instrumentModel += '<hr/>';
                            }
                        }
                        return instrumentModel;
                    }
                },
                {
                    title: '检验日期',
                    align: 'center',
                    templet: function (data) {
                        var testTime = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            testTime += data.testResult[i].testTime;
                            if (data.testResult.length - i != 1) {
                                testTime += '<hr/>';
                            }
                        }
                        return testTime;
                    }
                },
                {
                    title: '检验员',
                    align: 'center',
                    templet: function (data) {
                        var testername = '';
                        for (var i = 0; i < data.testResult.length; i++) {
                            testername += data.testResult[i].testerNames;
                            if (data.testResult.length - i != 1) {
                                testername += '<hr/>';
                            }
                        }
                        return testername;
                    }
                },
                {
                    title: '添加检验结果', align: 'center',//templet: '#switchTpl',
                    templet: (
                        function (data) {
                            if (data.isaddFinalTestResultsType == 1) {
                                var testername = "";
                                for (var i = 0; i < data.testResult.length; i++) {
                                    testername += '<input type="radio" lay-skin="primary" name="result' + data.id + '" value="' +
                                        data.testResult[i].testResultId + '">'
                                    if (data.testResult.length - i != 1) {
                                        testername += "<hr/>";
                                    }

                                    //testername += '<input type="checkbox" lay-skin="primary" name="result" value="' + data.testResult[i].testResultId + '">'

                                    // if (data.testResult.length > 1) {
                                    //     let length = data.testResult.length
                                    //     console.log(length)
                                    //     for (let p = 0; p < length; p++) {
                                    //         //console.log(123)
                                    //         // testername = '<input type="radio" lay-skin="primary" name="result" value="' +
                                    //         //     data.testResult[p].testResultId + '">' + "<hr/>" +
                                    //         //     '<input type="radio" lay-skin="primary" name="result" value="' + data.testResult[p].testResultId + '">'
                                    //         // //testername = "<hr/>";
                                    //
                                    //
                                    //         if (length - p > 1) {
                                    //             testername += "<hr/>";
                                    //         }
                                    //         $(".laytable-cell-2-1-6 .layui-form-checkbox").hide()
                                    //         form.render()
                                    //     }
                                    // }
                                    // else {
                                    //     if ($(".layui-table-col-special").hasClass("layui-form-radio")) {
                                    //         console.log(9999)
                                    //     }
                                    //     testername += '<input type="checkbox" lay-skin="primary" name="result" value="' + data.testResult[i].testResultId + '">'
                                    // }
                                }
                                return testername;

                            } else {
                                return "-"
                            }
                        })
                },


                //本次检验结果
                {field: 'trValue', title: 'TR值(U/mL)', align: 'center'},
                {field: 'omaTrValue', title: 'OMA/TR', align: 'center'},
                {field: 'testTime', title: '检验日期', align: 'center'},
                // //既往检测结果

                {
                    title: 'TR值(U/mL)',
                    align: 'center',
                    style: 'height:auto;',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].trValue;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    title: 'OMA/TR',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].omaTrValue;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    title: '检验日期',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].testTime;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    field: 'fsectionName',
                    title: '科室',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].fsectionName;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    field: 'clinicalDiagnosis',
                    title: '临床诊断',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].clinicalDiagnosis;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                },
                {
                    field: 'pastHistory',
                    title: '异常指标',
                    align: 'center',
                    templet: function (rows) {
                        var tr = '';
                        for (var i = 0; i < rows.beforResult.length; i++) {
                            tr += rows.beforResult[i].pastHistory;
                            if (rows.beforResult.length - i != 1) {
                                tr += '<hr/>';
                            }
                        }
                        return tr;
                    }
                }
            ],

        ],
        page: true, //是否显示分页
        limit: 15,
        limits: [15],
        id: 'idTest',
        done: function (res, curr, count) {

            $('#div').find('.layui-table-body').find("table" ).find("tbody").children("tr").on('dblclick',function(){
                var id = JSON.stringify($('#div').find('.layui-table-body').find("table" ).find("tbody").find(".layui-table-hover").data('index'));
                var obj = res.data[id];
                fun.openLayer(obj);

            })
        }
    });

}


table.on('row(demo)', function (obj) {
    var form = layui.form;
    if (obj.tr.find("[type='checkbox']").attr('checked')) {
        // if (obj.tr.find('.layui-form-checked').siblings(".layui-unselect")){
        //     obj.tr.find('.layui-form-checked').siblings("div").attr("disabled","disabled");
        //     form.render()
        // }
    	// obj.tr.find("[type='checkbox']").attr('checked', false);
    	// obj.tr.find('.layui-form-checked').siblings("div").removeClass('layui-form-checked');
    	// obj.tr.removeClass('layui-table-click');
        // obj.tr.find('.layui-form-checked').siblings("div").removeClass('layui-form-checked');
    } else {
        if (obj.tr.find('.layui-form-checked').siblings(".layui-unselect")){
            obj.tr.find('.layui-form-checked').prev("input").siblings("input").attr("disabled","disabled");
            form.render()
        }

        // obj.tr.removeClass('layui-table-click');
        // console.log(obj.tr.find('.layui-form-checked').siblings(".layui-unselect"));
        // if (obj.tr.find('.layui-form-checked').siblings(".layui-unselect")){
        //     obj.tr.find('.layui-form-checked').siblings("div").removeClass('layui-form-checked')
        // }
        // obj.tr.find('.layui-form-checked').siblings("div").removeClass('layui-form-checked')
    }
    console.log(obj.tr.find('.layui-form-checked'));
    if (obj.tr.find('.layui-form-checked').length==0){
        console.log(123);
        obj.tr.find("input").removeAttr("disabled")
        form.render()
    }else{

    }
});
// $(document).on("click",".layui-table-body table.layui-table tbody tr", function () {
//     var index = $(this).attr('data-index');
//     var tableBox = $(this).parents('.layui-table-box');
//     //存在固定列
//     if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length>0) {
//         tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
//     } else {
//         tableDiv = tableBox.find(".layui-table-body.layui-table-main");
//     }
//     //获取已选中列并取消选中
//     var trs = tableDiv.find(".layui-unselect.layui-form-checkbox.layui-form-checked").parent().parent().parent();
//     for(var i = 0;i<trs.length;i++){
//         var ind = $(trs[i]).attr("data-index");
//         if(ind!=index){
//             var checkCell = tableDiv.find("tr[data-index=" + ind + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
//             if (checkCell.length>0) {
//                 checkCell.click();
//             }
//         }
//     }
//     //选中单击行
//     var checkCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
//     if (checkCell.length > 0) {
//         checkCell.click();
//     }
// });
// $(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function (e) {
//     e.stopPropagation();
// });
//批量
var active = {
    reload: function () {
        var startime = $('#start').val();
        var endtime = $('#end').val();
        var name = $('#name').val();
        var unit = $('#unit').val();
        var number = $('#number').val();
        var check = $('#check').val();

        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            },
            where: {
                finspectionUnitName: unit,
                startTime: startime,
                endTime: endtime,
                testerName: name,
                inspectionUnitNumber: number,
                isaddFinalTestResults: check
                //flaboratoryId:room
            }
        });
    },
    getCheckLength: function () {
        //批量删除
        var checkStatus = table.checkStatus('idTest'),
            data = checkStatus.data;
        if (data.length == 0) {
            layer.open({
                type: 1,
                shade: 0,
                content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area: ['200px', '100px'],
                time: 700
            });
            return false;
        } else {
            var str = [];
            for (var i = 0; i < data.length; i++) {
                str.push(data[i].id);
            }
            var ids = str.join(',');
            http.ajax({
                url: '/bloodAuduting/batchDeletedAdudting',
                type: 'POST',
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
                    window.location.href = '../home.html';
                }
            }, function (err) {
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })


        }
    },

    batchSubmit: function () {
        //批量提交
        var checkStatus = table.checkStatus('idTest'),
            data = checkStatus.data;
        if (data.length == 0) {
            layer.open({
                type: 1,
                shade: 0,
                content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area: ['200px', '100px'],
                time: 700
            });
            return false;
        } else {
            var str = [];
            for (var i = 0; i < data.length; i++) {
                str.push(data[i].id);
            }
            var ids = str.join(',');
            http.ajax({
                url: '/bloodAuduting/batchSubmitAuduting',
                type: 'POST',
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
                    window.location.href = '../home.html';
                }
            }, function (err) {
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })

        }
    },
    batchMarkAudited: function () {
        //批量标记已审核
        var checkStatus = table.checkStatus('idTest'),
            data = checkStatus.data;
        if (data.length == 0) {
            layer.open({
                type: 1,
                shade: 0,
                content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area: ['200px', '100px'],
                time: 700
            });
            return false;
        } else {
            var str = [];
            for (var i = 0; i < data.length; i++) {
                str.push(data[i].id);
            }
            var ids = str.join(',');
            http.ajax({
                url: '/bloodAuduting/yetAuduting',
                type: 'POST',
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {ids: ids},
            }).then(function (data) {
                if (data.code == 0) {
                    layer.msg('批量审核成功');
                    table.reload('idTest', {});
                } else if (data.code == 500) {
                    window.location.href = '../home.html';
                }
            }, function (err) {
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })


        }
    },
    Unchecked: function () {
        //批量标记未审核
        var checkStatus = table.checkStatus('idTest'),
            data = checkStatus.data;
        if (data.length == 0) {
            layer.open({
                type: 1,
                shade: 0,
                content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area: ['200px', '100px'],
                time: 700
            });
            return false;
        } else {
            var str = [];
            for (var i = 0; i < data.length; i++) {
                str.push(data[i].id);
            }
            var ids = str.join(',');
            http.ajax({
                url: '/bloodAuduting/notAuduting',
                type: 'POST',
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {ids: ids},
            }).then(function (data) {
                if (data.code == 0) {
                    layer.msg('批量标记成功');
                    table.reload('idTest', {});
                } else if (data.code == 500) {
                    window.location.href = '../home.html';
                }
            }, function (err) {
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
        var inspectionUnitNumber = $("#number").val();
        var isaddFinalTestResults = $("#check").val();//选入状态


        var param = {}
        param.finspectionUnitName = finspectionUnitName
        param.inspectionUnitNumber = inspectionUnitNumber
        param.testerName = testerName

        param.startTime = startTime
        param.endTime = endTime
        param.isaddFinalTestResults = isaddFinalTestResults
        //param.batchNumber = batchNumber
        //param.testState = 0
        http.ajax({
            url: "/out/outBloodAuditingAll",
            type: "POST",
            json: false,
            mask: true,
            contentType: 'application/json',
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: JSON.stringify(param),
        }).then(function (data) {
            if (data.code == 0) {
                var url = http.config.api
                var url = url + "/" + data.data.filepath
                console.log(url)
                window.location.href = url;
            } else if (data.code == 500) {
                window.location.href = "../home.html"
            }
        }, function (err) {
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        })

    },
    batchRetest: function () { //批量复测
        var checkStatus = table.checkStatus('idTest'), data = checkStatus.data;
        if (data.length == 0) {
            layer.open({
                type: 1,
                shade: 0,
                content: "<p style='text-align:center;margin-top: 13px'>请选择序号</p>",
                area: ['200px', '100px'],
            })
            return false
        } else {
            var str = [];
            for (var i = 0; i < data.length; i++) {
                str.push(data[i].id)
            }
            var ids = str.join(',');
            layer.open({
                title: '复测原因',
                area: ['500px', '280px'],
                btn: ['确认', '取消'],
                type: 1,
                content: $('.refuse'),
                yes: function (index, layero) {
                    layer.close(index)
                    http.ajax({
                        url: "/bloodAuduting/batchAgainTest",
                        type: "POST",
                        json: false,
                        mask: true,
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', token);
                        },
                        data: {ids: ids, againTestReason: $("#refuse").val(),},
                    }).then(function (data) {
                        if (data.code == 0) {
                            layer.msg('已复测');
                            table.reload('idTest', {});
                        }
                    }, function (err) {
                        console.log(err);
                        // 错误回调，err是错误回调参数
                        // 这里不处理错误也可以，上面都有集中处理错误，会tips
                    })
                },
                btn2: function () {
                    layer.closeAll();
                },
            })
        }
    },

};


//监听工具条
table.on('tool(demo)', function (obj) {
    var data = obj.data;
    if (obj.event === 'markAudited') {//标记已审核
        layer.open({
            title: '确定吗？',
            area: ['200px', '100px'],
            btn: ['确认', '取消'],
            type: 1,
            content: '',
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodAuduting/yetAudutings",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id: data.id,
                    },
                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg('已审核');
                        table.reload('idTest', {});
                    }
                }, function (err) {
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })

            },
            btn2: function () {
                layer.closeAll();
            },
        })

    } else if (obj.event === 'Retest') {//复测
        layer.open({
            title: '复测原因',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.refuse'),
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodAuduting/againTest",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id: data.id,
                        againTestReason: $("#refuse").val(),
                    },
                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg('已提交');
                        table.reload('idTest', {});
                    }
                }, function (err) {
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })

            },
            btn2: function () {
                layer.closeAll();
            },
        });
    } else if (obj.event === 'result') {//修改最终检验结果
        http.ajax({
            url: "/bloodAuduting/getResultById",
            type: "POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            data: {id: data.id},
        }).then(function (data) {
            $("#val1").val(data.data.trValue)
            $("#val2").val(data.data.omaValue)
            $("#val3").val(data.data.omaTrValue)
            if (data.code == 0) {
            }
        }, function (err) {
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        })

        layer.open({
            title: '修改最终检验结果',
            area: ['500px', '280px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.result'),
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodAuduting/updateResult",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id: data.id,
                        trValue: $("#val1").val(),
                        omaValue: $("#val2").val(),
                    },
                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg('修改成功');
                        table.reload('idTest', {});
                    }
                }, function (err) {
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })


            },
            btn2: function () {
                layer.closeAll();
            },
        });
    } else if (obj.event === 'edit') {
        window.location.href = "addingTestResults.html?id=" + obj.data.id;
    } else if (obj.event === 'Submission') {//提交批准
        layer.open({
            title: '确定吗？',
            area: ['200px', '137px'],
            btn: ['确认', '取消'],
            type: 1,
            content: '',
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodAuduting/resultsApprove",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        id: data.id,
                    },
                }).then(function (data) {
                    if (data.code == 0) {
                        layer.msg('已提交');
                        table.reload('idTest', {});
                    }
                }, function (err) {
                    console.log(err);
                    // 错误回调，err是错误回调参数
                    // 这里不处理错误也可以，上面都有集中处理错误，会tips
                })
            },
            btn2: function () {
                layer.closeAll();
            },
        })
    }
});

//清空
$('#clear').click(function () {
    $('#unit').val('');
    $('#start').val('');
    $('#end').val('');
    $('#name').val('');
    $('#check').val('');
    form.render();
});
//搜索
$('#search').click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//批量删除
$('#all').click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//批量提交
$('#batchSubmit').click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//批量导出
$("#allout").click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
})
//批量添加结果
$("#addResult").click(function () {
    var str = [];
    $('input[name="result"]:checked').each(function () {//遍历每一个名字为nodes的复选框，其中选中的执行函数
        str.push($(this).val());
        //将选中的值添加到数组chk_value中
    });
    var ids = str.join(',');
    if (ids.trim() == "") {
        layer.msg("请选择一项");
        return;
    }
    http.ajax({
        url: '/bloodAuduting/addResult',
        type: 'POST',
        json: false,
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token);
        },
        data: {resultId: ids},
    }).then(function (data) {
        if (data.code == 0) {
            layer.msg('添加成功');
            table.reload('idTest', {});
        } else if (data.code == 500) {
            window.location.href = '../home.html';
        }
    }, function (err) {
        console.log(err);
        // 错误回调，err是错误回调参数
        // 这里不处理错误也可以，上面都有集中处理错误，会tips
    })


})
//标记已检验
$('#batchMarkAudited').click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//标记未检验
$('#Unchecked').click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//批量复测
$('#batchRetest').click(function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});
//监听select值
form.on('select(check)', function (data) {
    if (data.value == '0') {
        $('#batchMarkAudited').css('display', 'inline-block');
        $('#Unchecked').css('display', 'none');
        $('#batchRetest').css('display', 'none');
        $('#addResult').css('display', 'none');
        $('#batchSubmit').css('display', 'none');
    } else if (data.value == '1') {
        $('#batchMarkAudited').css('display', 'none');
        $('#Unchecked').css('display', 'inline-block');
        $('#batchSubmit').css('display', 'inline-block');
        $('#batchRetest').css('display', 'inline-block');
        $('#addResult').css('display', 'inline-block');
    }
});
document.getElementById("check").options.selectedIndex = 0; //回到初始状态
//$("#check").selectpicker('refresh');//对searchPayState
$('#search').click(function () {
    if ($("#check").val() == "1") {
        $('.laytable-cell-2-1-6').find('input[type=checkbox]').bind('click', function () {
            console.log(999);
            if (this.checked) {
                console.log(123);
                $(".laytable-cell-2-1-6").find('input[type=checkbox]').not(this).attr("checked", false);
            } else {
            }
        });
    }
})
// $(".table").on("click", ".laytable-cell-2-1-6", function () {
//     console.log($('.laytable-cell-2-1-6').find('layui-form-checkbox'));
//     // var input = $('.laytable-cell-2-1-6').find('layui-form-checked')
//     // if (input) {
//     //     console.log(123);
//     // }
// });

// $('.laytable-cell-2-1-6').find('input[type=checkbox]').click(function () {
//     console.log(888);
// })
// $('.laytable-cell-2-1-6').find('input[type=checkbox]').on('click', function () {
//     console.log(999);
//     if (this.checked) {
//         console.log(123);
//         $(".laytable-cell-2-1-6").find('input[type=checkbox]').not(this).attr("checked", false);
//     }
// });





