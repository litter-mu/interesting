/**
 * Created by Administrator on 2016/10/12 0012.
 */


$('.rule-font').click(function(){
    $('.register-box').show();
    $('.welcome2').show();
    $('.login-box').hide();
    $('.welcome').hide();
});

$('.rule-font1').click(function(){
    $('.login-box').show();
    $('.welcome').show();
    $('.register-box').hide();
    $('.welcome2').hide();
});




var off={};
$('form input[name=lname]').on({
    focus:function(){
        $(this).parent().css({
            'border-color':'rgb(112,173,70)'
        });
    },
    blur:function(){
        var val=$(this).val();
        isinput(/[\w]{6,20}/.test(val),this);
    }
});


$('form input[name=lpassword]').on({
    focus:function(){
        $(this).parent().css({
            'border-color':'rgb(112,173,70)'
        });
    },
    blur:function(){
        var val=$(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,19}/.test(val),this);
    }
});



function  isinput(put,_this){
    if(put){
        $(_this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        });
        off[_this.className]=true
    }else{
        $(_this).parent().css({
            'border-color': '#981616'
        });
        off[_this.className]=false;
    }
}



$('form .submit').click(function(){
    var isform=true;
    if(isform){

        $('form input').blur();

        if($('.xieyi').attr('checked')==undefined){
            alert('请选择');
            isform=false;
        }
    }
    for(var i in off){
        if(!off[i]){
            isform=false;
        }
    }
    console.log(isform);
    if(isform){
        $.ajax({
            type:'post',
            url:'http://www.zhijunxing.com/yiju/landlordLogin.action',
            dataType:'jsonp',
            data:$('form').serialize(),
            success:function(data){
                alert(data.resultCode);
                if(data.resultCode=='0000'){
                    location.href='http://192.168.0.118/first.html';
                }
            }
        })
    }
});