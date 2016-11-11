/**
 * Created by Administrator on 2016/10/10 0010.
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

$('.rule-box').attr("checked",'checked');



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



$('form .r2').on({
    focus:function(){
        $(this).parent().css({
            'border-color':'rgb(112,173,70)'
        });
    },
    blur:function(){
        var val=$(this).val();
        isinput(val==''?false:val === $('form input[name=lpassword]').val(),this)
    }
});



$('form input[name=lemail]').on({
    focus: function () {
        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test(val),this);

    }
});


$('form input[name=lphone]').on({
    focus: function () {

        $(this).parent().css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^1[0-9]{10}$/.test(val),this);

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
        /*if(!(/[\w]{6,20}/.test($('form input[name=lname]').val()))){
            $('form input[name=lname]').blur();
        }
        if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
            $('form input[name=lpassword]').blur();
        }
        if (!($('form .r2').val() === $('form input[name=lpassword]').val()) || $('form .r2').val()=='' ) {
            $('form .r2').blur();
        }
        if (!(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test($('form input[name=lemail]').val()))) {
            $('form input[name=lemail]').blur();
        }
        if (!(/^1[0-9]{10}$/.test($('form input[name=lphone]').val()))) {
            $('form input[name=lphone]').blur();
        }*/
        if($('.xieyi').attr('checked')==undefined){
            alert('请选择');
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
            url:'http://www.zhijunxing.com/yiju/saveLandlord.action',
            dataType:'jsonp',
            data:$('form').serialize(),
            success:function(data){
                alert(data.resultCode);
                if(data.resultCode=='0000'){
                    $('.finish').show();
                    $('.body').show();
                    $('.finish-del').click(function(){
                        $('.finish').hide();
                        $('.body').hide();
                    });
                    $('.dl').click(function(){
                        $.ajax({
                            type:'post',
                            url:'http://www.zhijunxing.com/yiju/landlordLogin.action',
                            dataType:'jsonp',
                            data:{
                                lname:$('form input[name=lname]').val(),
                                lpassword:$('form input[name=lpassword]').val()
                            },
                            success:function(data){
                                if(data.resultCode==0000){
                                    location.href='http://192.168.0.118/first.html'
                                }
                            }
                        });
                    });


                    //location.href='http://192.168.0.118/login.html'
                }else {
                    alert('失败');
                }
            }
        })
    }
});








