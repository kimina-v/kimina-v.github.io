$(function(){
    $('.tab_menu a').on('click',function(){
        var currOn = $(this);
            currPath = currOn.attr('data-path');

        currOn.closest('.tab_menu').siblings('div[class^="tab"]').hide();
        currOn.parent('li').addClass('on').siblings().removeClass('on');
        currOn.closest('.tab_menu').siblings('div.'+currPath).show();
    });
    $('.aside_menu > li > a').on('click',function(e){
        $(this).parent('li').addClass('on').siblings().removeClass('on');
        e.preventDefault();
    });
    $('.btn_toggle').on('click',function(){
        if($(this).hasClass('off')){
            $(this).removeClass('off').siblings('table').show();
        }else{
            $(this).addClass('off').siblings('table').hide();
        }
    });
});