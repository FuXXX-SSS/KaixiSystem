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
    

table.render({//申请单所有结果  
    elem: '#test'
    ,url: url + '/bloodAuduting/queryTestResultByBloodSampleTestId'
    ,method:'post'
    ,contentType:'application/json'
    ,parseData:function(res){
        
        if(res.code==500){
            window.location.href="../../log.html"
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
        id:GetUrlParam("id"),       
    }
    ,cols: [[
          { type: 'checkbox', rowspan: 2 }
        , {title: '序号', align: 'center', type: 'numbers'}
        ,{field:'trValue', title: 'Tr值',align:'center',}
        ,{field:'omaValue', title: 'Oma值',align:'center',}
        ,{field:'omaTrValue', title: 'Omatr值',align:'center'}
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
    var testResultId = data.testResultId
     
    if(obj.event === 'edit'){//添加为最终检验结果                          
        layer.open({
            title: '确定添加为最终检验结果？',
            area: ['200px', '100px'],
            btn: ['确认', '取消'],
            type: 1,
            content:'',
            yes: function (index, layero) {               
                layer.close(index)
                http.ajax({
                    url: "/bloodAuduting/addTestResult",
                    type: "POST",
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', token);
                    },
                    data: { bloodSampleTestId:GetUrlParam("id"),testResultId:testResultId },
                }).then(function (data) {                                                
                        if (data.code == 0) {                                                        
                            layer.msg('添加成功');
                            table.reload('idTest',{});
                            layer.close(index)                        
                        }
                    }, function (xml, text) {
                        layer.close(index)
                    })
                  
                   

              

            },
            btn2: function(){
            layer.closeAll();
        },
        });
    } 
});





