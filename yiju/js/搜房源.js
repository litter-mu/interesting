/**
 * Created by Administrator on 2016/10/18 0018.
 */





$('.hot span').eq(1).click(function(){
    $(this).addClass('current1').siblings().removeClass('current1');
    $('.chengxin-resouse').show();
    $('.all-resouse').hide();
    $('.person-resouse').hide();
    $('.people-resouse').hide();
});
$('.hot span').eq(2).click(function(){
    $(this).addClass('current1').siblings().removeClass('current1');
    $('.person-resouse').show();
    $('.all-resouse').hide();
    $('.chengxin-resouse').hide();
    $('.people-resouse').hide();
});
$('.hot span').eq(3).click(function(){
    $(this).addClass('current1').siblings().removeClass('current1');
    $('.people-resouse').show();
    $('.chengxin-resouse').hide();
    $('.person-resouse').hide();
    $('.all-resouse').hide();
});





$('.hot span').eq(0).click(function(){
    var pageNo=1;
    $(this).addClass('current1').siblings().removeClass('current1');
    $('.all-resouse').show();
    $('.chengxin-resouse').hide();
    $('.person-resouse').hide();
    $('.people-resouse').hide();

    Collect(pageNo,Price,Shi);

    $('.page-box').on('click', 'a', function () {
        if ($(this).html() == '上一页') {
            if (!(pageNo == 1)) {
                pageNo -= 1;
                Collect(pageNo,Price,Shi);
            }
        } else if ($(this).html() == '下一页') {
            if (!(pageNo == $('.page-box a').last().prev().html())) {
                pageNo += 1;
                Collect(pageNo,Price,Shi);
            }
        } else {
            pageNo = parseInt($(this).html());
            Collect(pageNo,Price,Shi);
        }

    });
});


var Price;
var pageNo=1;
$('.nav2').on('click','a',function(){
    $(this).addClass('current').siblings().removeClass('current');
    if($(this).html()=='全部'){
        Collect(pageNo);
        Price = '';
    }else{
        Price=$(this).html().slice(0,-1);
        //console.log(Price);
        Collect(pageNo,Price,Shi,Level,Room);
    }

    $('.page-box').on('click', 'a', function () {
        if ($(this).html() == '上一页') {
            if (!(pageNo == 1)) {
                pageNo -= 1;
                Collect(pageNo,Price,Shi);
            }
        } else if ($(this).html() == '下一页') {
            if (!(pageNo == $('.page-box a').last().prev().html())) {
                pageNo += 1;
                Collect(pageNo,Price,Shi);
            }
        } else {
            pageNo = parseInt($(this).html());
            Collect(pageNo,Price,Shi);
        }

    });
});

var Shi;
$('.nav3').on('click','a',function(){
    $(this).addClass('current').siblings().removeClass('current');
    if($(this).html()=='全部'){
        Collect(pageNo);
    }else{
        Shi=$(this).attr('id');
        console.log(Shi);
        Collect(pageNo,Price,Shi,Level,Room);
    }
    $('.page-box').on('click', 'a', function () {
        if ($(this).html() == '上一页') {
            if (!(pageNo == 1)) {
                pageNo -= 1;
                Collect(pageNo,Price,Shi);
            }
        } else if ($(this).html() == '下一页') {
            if (!(pageNo == $('.page-box a').last().prev().html())) {
                pageNo += 1;
                Collect(pageNo,Price,Shi);
            }
        } else {
            pageNo = parseInt($(this).html());
            Collect(pageNo,Price,Shi);
        }

    });
});


//房屋类型

var Room;
$('.area1').eq(0).click(function () {
    $('.house-type').show();
});
$('.house-type').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('.house-type p').click(function () {
    $('.nav4 a').eq(0).html($(this).html());
    Room = $(this).html();
    console.log(Room);
    Collect(pageNo, Price, Shi, Level,Room);
    $('.house-type').hide();
});

//装修
var Level;
$('.area1').eq(1).click(function () {
    $('.decoration').show();
});
$('.decoration').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('.decoration p').click(function () {
    $('.nav4 a').eq(1).html($(this).html());
    Level = $(this).html();
    console.log(Level);
    Collect(pageNo, Price, Shi, Level,Room);
    $('.decoration').hide();
});


function Collect(pageNo,Price,Shi,Level,Room) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryHousesBySql.action',
        dataType: 'jsonp',
        data: {
            pageNo: pageNo,
            price: Price,
            shi:Shi,
            level:Level,
            room:Room
        },
        success: function (data) {
            console.log(pageNo);
            console.log(data);
            console.log(data.rowCount);
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
                $('.all-resouse').html(item);

            } else {
                alert('没有房源!');
            }
        }
    });
}



$.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/loginSession.action',
    dataType: 'jsonp',
    success: function (data) {
        console.log(data.success);
        if(data.success){
            $('.lala').html('欢迎'+data.data[0].lname).attr('href','http://192.168.0.118/个人中心1.0.html');
            $('.haha').html('退出').attr({
                'onclick':'quitLogin()',
                'href':'###'
            });
        }
    }
});

function quitLogin(){
    $.ajax({
        type:'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success:function(data){
            if(data.resultCode=='0000'){
                $('.lala').html('登录').attr('href','http://192.168.0.118/yiju/login.html');
                $('.haha').html('注册').attr('href','http://192.168.0.118/yiju/register.html').removeAttr('onclick');

            }
        }
    })
}