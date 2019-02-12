var $ = layui.$
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
var status =GetUrlParam("status")
console.log(GetUrlParam("status"))
console.log(GetUrlParam("id"))
table.render({
    page: {
        curr: 1
    }
    ,where: {
        bloodSampleTestId: GetUrlParam("id"),
    },
    elem: '#test'
    ,url: url+'/bloodAudit/queryBloodSampleTestById'
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
    ,cols: [[
        {type:'checkbox'}
        ,{title: '序号',align:'center',type:'numbers'}
        ,{field:'enteringTime', title: '采血时间',align:'center',minWidth:140}
        ,{field:'finspectionUnitName', title: '送检单位',align:'center'}
        ,{field:'inspectionTime', title: '送检时间',align:'center'}
        ,{field:'testerName', title: '姓名',align:'center'} //单元格内容水平居中
        ,{field:'testerSex', title: '性别',align:'center'} //单元格内容水平居中
        ,{field:'phoneNumber', title: '电话号码',align:'center'}
        ,{field:'testerAge',title:'年龄',align:'center'}
        ,{field:'omaTrValue', title: 'OMA',align:'center'}
        ,{field:'trValue', title: 'TR',align:'center'}
        ,{field:'testTime', title: '检测时间',align:'center'}
        ,{title: '操作',align:'center',toolbar: '#barDemo',minWidth:250,fixed:'right'}
    ]]
    ,page: true //是否显示分页
    ,limit: 15
    ,limits:[15]
    ,id:'idTest'
});
var active = {
    reload: function(){
        var startime = $('#start').val();
        var endtime=$("#end").val();
        var name =$("#name").val();
        var unit =$("#unit").val();
        var number =$("#number").val();
        //var room =$("#room").val();

        //执行重载
        table.reload('idTest', {
            page: {
                curr: 1
            }
            ,where: {
                finspectionUnitName:unit,
                startTime:startime,
                endTime:endtime,
                testerName:name,
                inspectionUnitNumber:number,
                //flaboratoryId:room
            }
        });
    },

};
table.on('tool(demo)', function(obj){
    var data = obj.data;
    obj.tr.css('background-color','white')
    if(obj.event === 'detail'){
        http.ajax({
            url: "/bloodAudit/relevancyPersonage",
            type:"POST",
            json: false,
            mask: true,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization',token);
            },
            data:{ids:data.id,bloodSampelTestId:GetUrlParam("id")},
        }).then(function (data) {
                if(data.code==0){
                    layer.msg('关联成功');
                    //table.reload('idTest',{});
                    window.history.go(-1);
                }else if(data.code==9999){
                    layer.msg(data.msg)
                    layer.close(index);
                }
            },function(err){
                console.log(err);
                // 错误回调，err是错误回调参数
                // 这里不处理错误也可以，上面都有集中处理错误，会tips
            })



    }
})

//监听复选框
table.on('checkbox(demo)', function(obj){//选中和批量选中
    if(obj.checked){
        obj.tr.addClass('yellow');
    }else{
        obj.tr.removeClass('yellow')
    }
    if(obj.type=="all"){
        if(obj.checked){
            obj.tr.removeClass('yellow');
            $("#specialtable").find('tbody').find("tr").addClass("yellow");
        }else{
            if( $("#specialtable").find('tbody').find("tr").hasClass("yellow")){
                $("#specialtable").find('tbody').find("tr").removeClass("yellow");
            }else{
                $("#specialtable").find('tbody').find("tr").removeClass("yellow");
                $("#specialtable").find('tbody').find("tr").addClass("yellow");
            }
        }

    }
});
$("#queding").click(function(){
    http.ajax({
        url: "/bloodAudit/relevancyPersonage",
        type:"POST",
        json: false,
        mask: true,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization',token);
        },
        data:{ids:'',bloodSampelTestId:GetUrlParam("id")},
    }).then(function (data) {
            if(data.code==0){
                layer.msg('关联成功');
                window.location.href="applicationCheck.html?status="+status
                table.reload('idTest',{});
            }else if(data.code==9999){
                layer.msg(data.msg)
                layer.close(index);
            }
        },function(err){
            console.log(err);
            // 错误回调，err是错误回调参数
            // 这里不处理错误也可以，上面都有集中处理错误，会tips
        })
})

$(".shangyiji").on("click",function(){

    // 　　      window.history.go(-1);
    window.location.href="applicationCheck.html?status="+status

          })






