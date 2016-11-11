/**
 * Created by Administrator on 2016/10/13 0013.
 */



$('.main-l p').eq(2).click(function(){
    $(this).addClass('bj').siblings().removeClass('bj');
    $('.main-r2').show();
    $('.main-r1').hide();
    $('.main-r3').hide();
    $('.main-r4').hide();
});

$('.main-l p').eq(3).click(function(){
    $(this).addClass('bj').siblings().removeClass('bj');
    $('.main-r3').show();
    $('.main-r1').hide();
    $('.main-r2').hide();
    $('.main-r4').hide();
});
$('.main-l p').eq(4).click(function(){
    $(this).addClass('bj').siblings().removeClass('bj');
    $('.main-r4').show();
    $('.main-r1').hide();
    $('.main-r2').hide();
    $('.main-r3').hide();
});




            //我的收藏
//添加收藏
for (var i = 0; i>400&&i>600; i++) {
    $.ajax({
        type: 'get',
        url: 'http://www.zhijunxing.com/yiju/addCollect.action',
        dataType: 'jsonp',
        data: {
            hid: i
        },
        success: function (data) {
            console.log(data);
        }
    });
}






$('.main-l p').eq(1).click(function(){
    var pageNo = 1;
    $(this).addClass('bj').siblings().removeClass('bj');
    $('.main-r1').show();
    $('.main-r2').hide();
    $('.main-r3').hide();
    $('.main-r4').hide();
    Collect(pageNo);

    $('.page-box').on('click', 'a', function () {
        //console.log($('.page-box a').last().prev().html());
        if ($(this).html() == '上一页') {
            if (!(pageNo == 1)) {
                pageNo -= 1;
                Collect(pageNo);
            }
        } else if ($(this).html() == '下一页') {
            if (!(pageNo == $('.page-box a').last().prev().html())) {
                pageNo += 1;
                Collect(pageNo);
            }
        } else {
            pageNo = parseInt($(this).html());
            Collect(pageNo);
        }

    });
});


function Collect(pageNo) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryCollectHouses.action',
        dataType: 'jsonp',
        data: {
            pageNo: pageNo
        },
        success: function (data) {
            // console.log(data.rowCount);
            if (data.success) {
                var a;
                if (Math.ceil(data.rowCount / 2) <= 5) {
                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= Math.ceil(data.rowCount / 2); i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';
                } else if (pageNo <= 3) {
                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= 4; i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<b> ··· </b><a href="###">' + Math.ceil(data.rowCount / 2) + '</a><a href="###">下一页</a>';
                } else if (pageNo + 2 >= Math.ceil(data.rowCount / 2)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b> ··· </b>';
                    for (var i = 3; i >= 0; i--) {
                        if (Math.ceil(data.rowCount / 2) - i == pageNo) {
                            a += '<a href="###" class="page-checked">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                        } else {
                            a += '<a href="###">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';
                } else if (pageNo + 2 < Math.ceil(data.rowCount / 2)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b> ··· </b>' +
                        '<a href="###">' + (parseInt(pageNo) - 1) + '</a>' +
                        '<a href="###" class="page-checked">' + pageNo + '</a>' +
                        '<a href="###">' + (parseInt(pageNo) + 1) + '</a>' +
                        '<b> ··· </b>' +
                        '<a href="###">' + Math.ceil(data.rowCount / 2) + '</a>' +
                        '<a href="###">下一页</a>';
                }
                $('.page-box').html(a);
                var item = '';
                for (var i = 0; i < data.data.length; i++) {
                    item += '<div class="list3" id="' + data.data[i].id + '"><div class="list3-img">' +
                        '<img src="http://www.zhijunxing.com/yiju/upload/' + data.data[i].photo.split(',')[0] + '" /></div>' +
                        '<div class="list3-text">' +
                        '<h2><a href="###" target="_blank" class="msg">' + data.data[i].tittle + '' + data.data[i].room + '</a>' +
                        '<i class="people"></i> <i class="people cheng"></i></h2>' +
                        '<p class="msg1">' + data.data[i].room + ' | ' + data.data[i].rentway + ' | ' + data.data[i].hlevel + ' | ' + data.data[i].floor + '/' + data.data[i].countfloor + '层</p>' +
                        '<p class="msg-address"><a href="###" target="_blank" class="map"></a>' + data.data[i].address + '</p>' +
                        '<div class="msg2">' + data.data[i].hlevel + '</div>' +
                        '<div class="msg2 msg3">' + data.data[i].paymethod + '</div>' +
                        '<div class="msg-del"><a href="#" class="del">删除<span class="del-">×</span></a></div>' +
                        '<div class="money">' + data.data[i].price + '<span class="month">/月</span></div>' +
                        '<p class="time">' + data.data[i].addtime + '</p></div></div>'
                }
                $('.fangzi').html(item);
                $('.list3').on('click', '.msg-del', function () {
                    $('.finish').show();
                    $('.body').show();
                    $('.sure input').eq(0).click(function () {
                        var ID = $('.msg-del').parent().parent().attr('id');
                        console.log(ID);
                        $.ajax({
                            type: 'GET',
                            url: 'http://www.zhijunxing.com/yiju/delCollect.action',
                            dataType: 'jsonp',
                            data: {
                                hid: ID
                            },
                            success: function (data) {
                                console.log(data);
                                if (data.resultCode == 0000) {
                                    $('.list3').remove('#'+ID);

                                }
                            }
                        });
                    });
                    $('.sure input').eq(1).click(function () {
                        $('.finish').hide();
                        $('.body').hide();
                    });
                    $('.finish-del a').click(function(){
                        $('.finish').hide();
                        $('.body').hide();
                    })

                });

            } else {
                alert('没有房源!');
            }
        }
    });
}









                 //编辑资料
$('.list2 li').click(function(){
    $(this).addClass('curr').siblings().removeClass('curr');
    if($(this).index()==0){
        $('.touxiang').show();
        $('.nicheng').hide();
        $('.mima').hide();
    }
    if($(this).index()==1){
        $('.nicheng').show();
        $('.touxiang').hide();
        $('.mima').hide();
    }
    if($(this).index()==2){
        $('.mima').show();
        $('.nicheng').hide();
        $('.touxiang').hide();
    }
});

         //修改昵称
var pass;
$('.nicheng input').on({
    focus:function(){
        $(this).css({
            'border-color':'rgb(112,173,70)'
        });
    },
    blur:function(){
        var val=$(this).val();
        if(/[\w]{6,20}$/.test(val)){
            $('.nicheng .btn1').click(function(){
                $.ajax({
                    type:'post',
                    url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
                    dataType:'jsonp',
                    data:{
                        lname:val
                    },
                    success:function(data){
                        console.log(data);
                        if(data.resultCode=='0000'){
                            login();
                        }
                    }

                })
            })
        }
    }
});


            //修改密码
$('.mima input').focus(function() {
    $(this).css({
        'border-color': 'rgb(112,173,70)'
    });
});
    $('.mima input').eq(0).blur(function () {
        var val = $(this).val();
        //console.log(val == pass);
        if (!(val == pass)) {
            $(this).css({
                'border-color': '#981616'
            });
        }
    });
    $('.mima input').eq(1).blur(function () {
        var val = $(this).val();
        if (!(/^[a-zA-Z0-9][\w]{5,19}/.test(val))) {
            $(this).css({
                'border-color': '#981616'
            });
        }
    });
    $('.mima input').eq(2).blur(function () {
        var val = $(this).val();
        if (!(val == '' ? false : val === $('.mima input').eq(1).val())) {
            $(this).css({
                'border-color': '#981616'
            });
        }
    });


    $('.mima .btn1').click(function(){
        if(
            $('.mima input').eq(0).val() == pass &&
            /^[a-zA-Z0-9][\w]{5,19}/.test($('.mima input').eq(1).val()) &&
            $('.mima input').eq(2).val() === $('.mima input').eq(1).val()
        ){
            $.ajax({
                type: 'post',
                url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
                dataType: 'jsonp',
                data: {
                    lpassword: $('.mima input').eq(2).val()
                },
                success:function(data){
                    console.log(data);
                    if(data.resultCode=='0000'){
                        login();
                    }
                }

            })
        }
    });

  //上传图片
login();
function login(){
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/loginSession.action',
        dataType: 'jsonp',
        success: function (data) {
            //console.log(data);
            if (data.success) {
                alert(data.success);
                 pass = data.data[0].lpassword;
                var a = '<a href="###">' + data.data[0].lname + '</a>  <a href="###" onclick="quitLogin()">退出</a>';
                $('.set').html(a);
                $('.header-font').html(data.data[0].lname);
                if (data.data[0].lphoto) {
                    $('.main-l img').attr('src', 'http://www.zhijunxing.com/yiju/upload/' + data.data[0].lphoto)
                } else {
                    alert('没有图片');
                }
            } else {
                location.href = 'http://192.168.0.118/first.html';

            }

        }
    });
}


$('.list33 input').change(function () {

    if (typeof FileReader == 'undefined') {
        alert("检测到您的浏览器不支持FileReader对象！");
    }
    var reader = new FileReader(),
        val = this.files[0];
    reader.readAsDataURL(val);
    reader.onload = function () {
        $('.list4-picture img').attr('src', reader.result);
    };
});


$('.btn1').click(function () {
    $.ajaxFileUpload({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
        secureuri: false,
        fileElementId: 'uploadPhoto',
        async: true,
        cache: true,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        complete: function (data) {
            console.log(data);
        }
    });
    setTimeout(login, 1000)
});


function quitLogin() {

    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
            //console.log(data);
            if (data.resultCode == '0000') {
                location.href = 'http://192.168.0.118/first.html';
            }

        }
    });

}



