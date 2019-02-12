var $ = layui.$
var form = layui.form;
var table = layui.table;
var laydate = layui.laydate;

laydate.render({
    elem: '#start1' //指定元素
});
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
var status =GetUrlParam("status")
console.log(GetUrlParam("status"))
console.log(GetUrlParam("id"))
table.render({//表格
    elem: '#test'
    ,url: url + '/bloodInspect/queryTestResultByBloodSampleTestId'
    ,method:'post'
    ,contentType:'application/json'
    ,parseData:function(res){
        if (res.code == 9999 ) {
            layer.msg(res.msg);
        }
        if(res.code==500){
            window.location.href="../../log.html"
        }
        if(res.code == 0){
            var data = res.data
            if(data.total==0){
                $(".layui-table-header").css("overflow","visible")
                $(".layui-table-box").css("overflow","auto")
            }
        }
        return{
            'code':res.code,
            "msg":res.msg,
            "count":res.data.total,
            "data": res.data.rows
        }
    }
    ,request:{
        limitName: 'rows'
    }
    ,headers:{Authorization:token}
    ,height:'full-250'
    ,cellMinWidth:100
    ,where: {
        bloodSampleTestId:GetUrlParam("id"),
    }
    ,cols: [[
        {type:'checkbox'}
        , {title: '序号', align: 'center', type: 'numbers'}
        ,{field:'trValue', title: 'TR值',align:'center',}
        ,{field:'omaValue', title: 'OMA',align:'center',}
        ,{field:'omaTrValue', title: 'OMA/TR值',align:'center'}
        ,{field:'testTime', title: '检验时间',align:'center'}
        ,{field:'instrumentModel', title: '仪器型号',align:'center',minWidth:140}
        ,{field:'testerNames', title: '检验人员',align:'center'}
        ,{title: '操作',align:'center',toolbar: '#barDemo',minWidth:200}
    ]]


    ,page: true //是否显示分页
    ,limit: 15
    ,limits:[15]
    ,id:'idTest'
    ,done:function(res, curr, count){

    }
});

//监听工具条
table.on('tool(demo)', function(obj){
    var data = obj.data;
    var testResultId=data.testResultId
    console.log(data);
    if(obj.event === 'edit'){//修改
        console.log(testResultId)
        $("#val1").val(data.trValue)
        $("#val2").val(data.omaValue)
        $("#val3").val(data.instrumentModel)
        layer.open({
            title: '修改检验结果',
            area: ['500px', '340px'],
            btn: ['确认', '取消'],
            type: 1,
            content: $('.officeadd'),
            yes: function (index, layero) {
                layer.close(index)
                http.ajax({
                    url: "/bloodInspect/saveTestResult",
                    type: "POST",
                    json: false,
                    mask: true,
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: {
                        testResultId:testResultId,
                        trValue:$("#val1").val(),
                        omaValue:$("#val2").val(),
                        instrumentModel:$("#val3").val(),
                    },
                }).then(function (data) {
                        if (data.code == 0) {
                            layer.msg('添加成功');
                            table.reload('idTest',{});
                        }
                    },function(err){
                        console.log(err);
                        // 错误回调，err是错误回调参数
                        // 这里不处理错误也可以，上面都有集中处理错误，会tips
                    })

            },
            btn2: function(){
            layer.closeAll();
        },
        });
    } else if(obj.event === 'del'){
        layer.confirm('确定要删除吗', function(index){
            http.ajax({
                url: "/bloodInspect/deletedTestResult",
                type: "POST",
                json: false,
                mask: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', token);
                },
                data: {testResultId: testResultId},
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

            })


    }
});

$(".shangyiji").on("click",function(){

    　　      window.history.go(-1);
    window.location.href="bloodTest.html?status="+status


})



