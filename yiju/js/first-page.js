/**
 * Created by Administrator on 2016/10/9 0009.
 */

$('#rent').click(function(){
    $('#white-sangle').show();
    $('#search').show();
    $('#green-sangle').hide();
    $('#search2').hide();
})
$('#host').click(function(){

    $('#green-sangle').show();
    $('#search2').show();
    $('#white-sangle').hide();
    $('#search').hide();
})

$('.search1').hover(function(){
$('.city').show();
},function(){
    $('.city').hide();
});


$('.city').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});

$('.city p').click(function () {
    $('.font').html($(this).html());
    $('.city').hide();
});


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






$.ajax({
    type:'post',
    url:'http://www.zhijunxing.com/yiju/queryHousesTop.action',
    dataType:'jsonp',
    success:function(data){
        if(data.success){
            console.log(data.data);
            var item='';
            for(var i in data.data){
                item+='<li><img src="http://www.zhijunxing.com/yiju/upload/'+data.data[i].photo.split(',')[0]+' " class="resouse-house"/>' +
                    '<p class="resouse-house-font">'+ data.data[i].villageName +'</p><p class="resouse-house-font1">'+data.data[i].room+'' +
                    '<span class="resouse-house-font2">'+data.data[i].price+'</span><span class="resouse-house-font3">元/月</span></p></li>'
            }
            $('.lunbo-s').append(item);
            console.log(item);


            $('.w-s').carousel({
                element:$('.lunbo'),
                time:2000,
                left:$('.left-sangle'),
                right:$('.right-sangle'),
                oli:4
            },false,false);
        }
    }
})



