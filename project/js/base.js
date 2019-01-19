// var basePath = "http://192.168.31.212:9003";
var $ = layui.$;
var form = layui.form;
var table = layui.table;
var token=JSON.parse(sessionStorage.getItem("user")).token;
var username=JSON.parse(sessionStorage.getItem("user")).username;
console.log(username);
$("#username").html(username)
if (JSON.parse(sessionStorage.getItem("user")).role==2){
    var laboratoryname=JSON.parse(sessionStorage.getItem("user")).laboratoryname;
    var accountName=JSON.parse(sessionStorage.getItem("user")).accountName;

    $("#laboratoryname").show()
    $("#laboratoryname").html(laboratoryname)
    $("#username").html(accountName)
}else{
    $("#laboratoryname").hide()
}

var http;
http = {
    config: {
        api: 'http://47.93.22.122:8104/SSM',
        // api: 'http://192.168.31.212:9003',
        token: token
    },
    /** url: 请求接口地址,
     type: 请求类型 POST GET,
     json: 数据请求方式,
     mask: 是否有loading,
     data: 请求参数
     */
    ajax: function (options) {
        var loading = '';
        let def = $.Deferred();
        if (options.mask) {
            loading = layer.msg('加载中', {
                icon: 16,
                shade: 0.01,
                time: 0
            });
        }
        $.ajax({
            url: 'http://47.93.22.122:8104/SSM' + options.url,
            data: options.data,
            type: options.type,
            headers: {
                'Authorization': token
            },
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', token);
            },
            // contentType: options.json ? 'application/json;charset=utf-8' : 'text/html;charset=utf-8'
            // text/json;charset=utf-8
        }).then(function (rsp) {
            def.resolve(rsp);
            setTimeout(function () {
                layer.close(loading);
            }, 100)
        }, function (error) {
            if (error.status == 500) {
                layer.msg('该账号已在其他地方登录，请重新登录', {
                    icon: 5
                })
                var time =setTimeout(function () {
                    window.location.href="../../log.html"
                },2000)
            } else if (error.responseText) {
                var err = JSON.parse(error.responseText);
                var code = err.code; // 错误码
                var emsg = err.message; // 错误内容提示（字符串）
                switch (code) {
                    case 2022: // 2022 掉线，重新登录
                        layer.msg(emsg, {
                            icon: 5
                        }, function () {
                            location.href = '/login.html';
                        });
                        break;
                }
            }
            def.reject(error);
            setTimeout(function () {
                layer.close(loading);
            }, 100)
        });
        return def;
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) {
            return unescape(r[2]);
        }
        ;
        return null;
    }
};

var url=http.config.api



$(function() {
    var tab = true;
    $("#triggle").click(function () {
        console.log(123);
        if (tab) {
            $("#navbar").children("li").find('span').hide(500);
            $("#navbar").children("li").removeClass('layui-nav-itemed');
            $(".slide").animate({width: '3.2%', minWidth: '60px'}, 500);
            $(".container").animate({marginLeft: '3.2%'}, 500,function(){
                table.resize("idTest")

            })
            tab = false;
        } else {
            $("#navbar").children("li").find('span').show(500);
            $(".slide").animate({width: '14.5%', minWidth: '245px'}, 500);
            $(".container").animate({marginLeft: '14.5%'}, 500,function(){
                table.resize("idTest")
            })
            tab = true;
        }
    })
    // $("#triggle").on('click',function () {
    //     console.log(123);
    //     if (tab) {
    //         $("#navbar").children("li").find('span').hide(500);
    //         $("#navbar").children("li").removeClass('layui-nav-itemed');
    //         $(".slide").animate({width: '3.2%', minWidth: '60px'}, 500);
    //         $(".container").animate({marginLeft: '3.2%'}, 500,function(){
    //             table.resize("idTest")
    //
    //         })
    //         tab = false;
    //     } else {
    //         $("#navbar").children("li").find('span').show(500);
    //         $(".slide").animate({width: '14.5%', minWidth: '245px'}, 500);
    //         $(".container").animate({marginLeft: '14.5%'}, 500,function(){
    //             table.resize("idTest")
    //         })
    //         tab = true;
    //     }
    // })

    layui.use('element', function () {
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        //监听导航点击
        element.on('nav(demo)', function (elem) {
            if (!tab) {
                $("#navbar").children("li").find('span').show(500);
                $(".slide").animate({width: '14.5%', minWidth: '245px'}, 500);
                $(".container").animate({marginLeft: '14.5%'}, 500,function(){
                    table.resize("idTest")
                })
                tab = true;
            }
        });
        element.on('nav(top)',function(elem){
            if(elem.text()=='切换用户'){
                layer.open({
                    title:'切换用户',
                    area: ['500px','280px'],
                    btn:'确定',
                    type: 1,
                    content: $('.modal'),                   
                    yes: function(index, layero){
                        var username = "", password = "";
                        if ($("#username1").val()) {
                            username = $.trim($("#username1").val())
                            console.log(username)
                        } else {
                            layer.open({
                                type: 1,
                                shade: 0,
                                content: "<p style='text-align:center;margin-top: 13px'>请输入用户名</p>",
                                area: ['200px', '100px'],
                                time: 700
                            })
                            return false
                        }if ($("#password").val()) {
                            password = $.trim($("#password").val())
                        } else {
                            layer.open({
                                type: 1,
                                shade: 0,
                                content: "<p style='text-align:center;margin-top: 13px'>请输入密码</p>",
                                area: ['200px', '100px'],
                                time: 700
                            })
                            return false
                        } 
                        var md5RandomKey = "7F4g3kHies";
                        password = MD5(password + md5RandomKey);
                       $.ajax({
                            url: 'http://47.93.22.122:8104/SSM/login/doLogin',
                            type: 'POST',
                            dataType: 'json',
                            data: {'username': username, 'password': password},
                            success: function (data) {

                                if (data.code == 0) {                                    
                                    //data=JSON.parse(data.data)
                                    data=data.data
                                    console.log(data);
                                    layer.open({
                                        type: 1,
                                        shade: 0,
                                        content: "<p style='text-align:center;margin-top: 13px'>登陆成功</p>",
                                        area: ['200px', '100px'],
                                        time: 700
                                    })
                                    if (data.accountInfo.role == 2) {
                                        $(".log1").hide()
                                        var token = data.token
                                        $.ajax({
                                            url: "http://47.93.22.122:8104/SSM/login/laboratory",
                                            type: 'POST',
                                            dataType: 'JSON',
                                            beforeSend: function (XMLHttpRequest) {
                                                XMLHttpRequest.setRequestHeader('Authorization', token);
                                            },
                                            success: function (data) {
                
                                                if (data.code == 0) {
                                                    var nuitdata = data;
                                                    for (var i = 0; i < nuitdata.length; i++) {
                                                        $("#unit1").append('<option value="' + nuitdata[i].id + '">' + nuitdata[i].laboratoryName + '</option>')
                                                    }
                                                    form.render()
                                                    var value = ""
                                                    form.on('select(num)', function (data) {
                                                        value = data.value
                                                        console.log(value);
                                                        if (value >= 1) {
                                                            $(".btn2").click(function () {
                                                                console.log(123);
                                                                $.ajax({
                                                                    url: "http://47.93.22.122:8104/SSM/login/selectLaboratory",
                                                                    type: 'POST',
                                                                    dataType: 'JSON',
                                                                    beforeSend: function (XMLHttpRequest) {
                                                                        XMLHttpRequest.setRequestHeader('Authorization', token);
                                                                    },
                                                                    data: {
                                                                        laboratory: value
                                                                    },
                                                                    success: function (data) {
                                                                        var accountName=data.data.account.accountName
                                                                        var role=data.data.account.role
                                                                        var laboratoryname=data.data.laboratoryname
                                                                        var token=data.data.token
                                                                        var user={}
                                                                        user.accountName=accountName
                                                                        user.laboratoryname=laboratoryname
                                                                        user.token=token
                                                                        user.role=role
                                                                        sessionStorage.clear()
                                                                        sessionStorage.setItem('user', JSON.stringify(user));
                                                                        layer.open({
                                                                            type: 1,
                                                                            shade: 0,
                                                                            content: "<p style='text-align:center;margin-top: 13px'>登陆成功</p>",
                                                                            area: ['200px', '100px'],
                                                                            time: 700
                                                                        })
                                                                        var time=setTimeout(function () {
                                                                            window.location.href = 'control/applicationForm/home.html'
                                                                        },1000)
                                                                    }
                                                                })
                                                            })
                                                        }
                                                    });
                
                                                } else if (data.code == 500) {
                                                    window.location.href = "../../log.html"
                                                }
                                            }
                                        });
                                        $(".log2").show()
                                    } else {
                                        var user={}
                                        user.username=username
                                        user.password=password
                                        // console.log(data);
                                        user.token=data.token
                                        user.role=data.accountInfo.role
                                        console.log(user);
                                        sessionStorage.setItem("user", JSON.stringify(user))
                                        window.location.href = 'home.html'
                                    }
                

                                }else {
                                    layer.open({
                                        type: 1,
                                        shade: 0,
                                        content: "<p style='text-align:center;margin-top: 13px'>用户名或密码错误</p>",
                                        area: ['200px', '100px'],
                                        time: 700
                                    })
                                }
                    }
                })                                               
            }
            })
            
            }else if(elem.text()=='修改密码'){
                layer.open({
                    title:'修改密码',
                    area: ['500px','280px'],
                    btn:'确认',
                    type: 1,
                    content: $('.pwdmodal'),
                    yes: function(index, layero){
                        var old="",newpwd="",renewpwd="";
                        if($("#old").val()){
                            old=$("#old").val()
                        }else{
                            layer.msg("请输入原密码")
                            return false
                        }
                        if($("#new").val()){
                            newpwd=$("#new").val()
                        }else{
                            layer.msg("请输入新密码")
                            return false
                        }
                        if($("#renew").val()){
                            renewpwd=$("#renew").val()
                        }else{
                            layer.msg("请再次确认密码")
                            return false
                        }
                        if(newpwd !=renewpwd){
                            layer.msg("两次密码不一致")
                            return false
                        }else{
                            console.log(token)
 
                            $.ajax({
                                url:"http://47.93.22.122:8104/SSM/authority/updatePassword",
                                type:"POST",
                                dataType:"JSON",
                                beforeSend: function (XMLHttpRequest) {
                                    XMLHttpRequest.setRequestHeader('Authorization',token);
                                },
                                data:{
                                    oldpwd:$("#old").val(),
                                    newpwd:$("#new").val(),
                                },
                                success:function (data) {
                                    if(data.code==0){
                                        layer.msg("修改成功")
                                        window.location.href='../../log.html'
                                    }
                                },
                                error:function(xml,text){
                                    layer.close(index)
                                }

                            })
                        }
                        layer.close(index)
                    }
                });
            }
        })

        function submit(index){
            var val01="",val02="";
            if($("#inpvalue").val()){
                val01=$.trim($("#inpvalue").val())
            }else{
                layer.msg("请输入用户名");
                return false
            }

            if($("#pwdvalue").val()){
                val02=$.trim($("#pwdvalue").val())
            }else{
                layer.msg("请输入密码")
                return false
            }
            layer.close(index)
        }

    });


})
var hex_chr = "0123456789abcdef";

function rhex(num) {
    str = "";
    for (j = 0; j <= 3; j++) {
        str += hex_chr.charAt((num >> (j * 8 + 4)) & 15) + hex_chr.charAt((num >> (j * 8)) & 15);
    }
    return str;
}
function str2blks_MD5(str) {
    nblk = ((str.length + 8) >> 6) + 1;
    blks = new Array(nblk * 16);
    for (i = 0; i < nblk * 16; i++) {
        blks[i] = 0;
    }
    for (i = 0; i < str.length; i++) {
        blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    }
    blks[i >> 2] |= 128 << ((i % 4) * 8);
    blks[nblk * 16 - 2] = str.length * 8;
    return blks;
}
function add(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 65535);
}

function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

function cmn(q, a, b, x, s, t) {
    return add(rol(add(add(a, q), add(x, t)), s), b);
}

function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function MD5(str) {
    x = str2blks_MD5(str);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i + 10], 17, -42063);
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
    }
    return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

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

http.ajax({
    url: "/login/getMenu",
    type: 'POST',
    json: false,
    mask: true,
}).then(function (data) {
    console.log(data);
    //监听选中页签添加样式
    layui.config({
        base: '../../js/'  //navbar组件js所在目录
    }).use('navbar', function () {
        var navbar = layui.navbar();
        navbar.set({
            elem: '#navbar',
            data: data,
        });


        navbar.render();


        //下面的部分不是必须的
        navbar.on('click(demo)', function (data) {
            console.log(data.field.title);//标题
            console.log(data.field.icon);//图标
            console.log(data.field.href);//调转地址
            sessionStorage.setItem("aa", data.field.title)
        });
    });
}, function (err) {
    console.log(err);
})
var time2 = setTimeout(function () {
    var HREF=window.location.href
    var windowHref = window.location.href;
    windowHref = windowHref.replace(/^http:\/\/[^/]+/, "");
    var windowaddr = windowHref.substr(windowHref.lastIndexOf('/', windowHref.lastIndexOf('/') - 1) + 1);
    var windowindex = windowaddr.lastIndexOf("\/");
    var windowaddrLast = decodeURI(windowaddr.substring(windowindex + 1, windowaddr.length));
    var str = decodeURI(windowaddr.substring(0, windowindex));
    var li = $("#navbar li a");
    li.each(function (index1, item) {
        var htmlHref = item.href;
        htmlHref = htmlHref.replace(/^http:\/\/[^/]+/, "");
        var addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1);
        var index = addr.lastIndexOf("\/");
        var addrLast = decodeURI(addr.substring(index + 1, addr.length));
        var str = decodeURI(addr.substring(0, index));
        if (windowaddrLast==addrLast) {
            if (li[index1].href==HREF) {
                console.log($(li[index1]).parent().addClass("layui-this"));
                console.log($(li[index1]).parents(".layui-nav-item").addClass("layui-nav-itemed"));
            }
        }
    })
}, 800)
$(document).keydown(function (ev) {
    if (ev.keyCode == 13) {
        $("#search").click()
    }
})



