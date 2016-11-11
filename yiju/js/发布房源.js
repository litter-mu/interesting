/**
 * Created by Administrator on 2016/10/23 0023.
 */
//出租方式
$('.type-btn1').click(function(){
    $('.circle i').attr('class','');
    $(this).children().children().attr('class','sure-btn');
});


//身份
$('.type-btn-1').click(function(){
    $('.circle-1 i').attr('class','');
    $(this).children().children().attr('class','sure-btn');
});

       //方向
$('#direction').click(function () {
    $('.fangxiang').show();
});
$('.fangxiang').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('.fangxiang p').click(function () {
    $('#direction').html($(this).html());
    $('.fangzi').hide();
});



//装修
$('#hlevel').click(function () {
    $('.zhuangxiu').show();
});
$('.zhuangxiu').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('.zhuangxiu p').click(function () {
    $('#hlevel').html($(this).html());
    $('.zhuangxiu').hide();
});



//租赁方式
$('#paymethod').click(function () {
    $('.rent-style').show();
});
$('.rent-style').hover(function () {
    $(this).show();
}, function () {
    $(this).hide();
});
$('.rent-style p').click(function () {
    $('#paymethod').html($(this).html());
    $('.rent-style').hide();
});

//房屋配置
$('#furniture li').click(function(){
    if($(this).hasClass("sure-green")){
        $(this).removeClass('sure-green');
    }else{
        $(this).addClass('sure-green');
    }
});

//上传图片
var fileIds = [], num = 1;
$('#dv').on('change', 'input[type=file]', function () {
    var reader = new FileReader(), val = $(this).get(0).files[0];
    reader.readAsDataURL(val);
    console.log(typeof reader);
    reader.onload = function () {
        fileIds.push('file' + num);
        $('#' + fileIds[num - 1]).hide();
        num += 1;
        $('#box').append('<img src="' + reader.result + '"/>');
        $('#dv').append('<input type="file" class="shangchuan" name="file" id="file' + num + '">');
    }
});


function AddHouses(){
    var ltype;
    var lrentway;
    var paymethod;
    var direction;
    var furniture='';
    var hlevel;
    var villageName=$('#villageName').val();
    var shi=$('#shi').val();
    var ting=$('#ting').val();
    var wei=$('#wei').val();
    var room=shi+'室'+ting+'厅'+wei+'卫';
    var area=$('#area').val();
    var floor=$('#floor').val();
    var countfloor=$('#countFloor').val();
    var price=$('#price').val();
    var tittle=$('#tittle').val();
    var features=$('#features').val();
    var address=$('#address').val();
    var linkman=$('#linkman').val();
    var linkphone=$('#linkPhone').val();
    var hcondition=villageName+room;


    //出租方式
    for(var i=0;i<$('.type-btn1').length; i++){
        if($('.type-btn1').eq(i).children().eq(0).children().hasClass("sure-btn")){
            ltype = $('.type-btn1').eq(i).children().eq(1).html();
            console.log(ltype);
        }
    }
    //身份
    for(var i=0;i<$('.type-btn-1').length; i++){
        if($('.type-btn-1').eq(i).children().eq(0).children().hasClass("sure-btn")){
            lrentway = $('.type-btn-1').eq(i).children().eq(1).html();
            console.log(lrentway);
        }
    }
   //朝向
    for(var j=0;j<$('.fangxiang p').length;j++){
        direction=$('.fangxiang p').html();
        console.log(direction);
    }
   //装修
    for(var j=0;j<$('.zhuangxiu p').length;j++){
        hlevel=$('.zhuangxiu p').html();
        console.log(hlevel);
    }

    //租赁方式
    for(var j=0;j<$('.rent-style p').length;j++){
        paymethod=$('.rent-style p').html();
        console.log(paymethod);
    }
//房屋配置
    for(var j=0;j<$('#furniture li').length;j++){
        if($('#furniture li').eq(j).hasClass('sure-green')){
            furniture+=$('#furniture li').eq(j).children('span').eq(0).html();
            console.log(furniture);
        }
    }

    var data={
        furniture:furniture,
        type:ltype,
        rentway:lrentway,
        villageName:villageName,
        area:area,
        room:room,
        shi:shi,
        floor:floor,
        countfloor:countfloor,
        direction:direction,
        hlevel:hlevel,
        price:price,
        tittle:tittle,
        features:features,
        address:address,
        linkman:linkman,
        linkphone:linkphone,
        paymethod:paymethod,
        hcondition:hcondition
    };

    $.ajaxFileUpload({
        url: 'http://www.zhijunxing.com/yiju/addHouses.action',
        type: 'post',
        secureuri: false,
        fileElementId:fileIds,
        data:data,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function(data){
            //console.log(data);
           /* if(data.resultCode == '0000'){
                alert('0000');
                //location.href=url+"/landlord.html";
            }*/
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