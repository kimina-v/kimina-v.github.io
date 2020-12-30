$(function(){
    $('.gnb > li > a').mouseover(function(){
        $(this).addClass('on').parent('li').siblings().children('a').removeClass('on');
        $('.gnb > li .depth').hide();
        $('.gnb > li > a.on').siblings('.depth').show();
    });
});