$(function(){
    $('.tab_menu a').on('click',function(){
        var currOn = $(this);
            currPath = currOn.attr('data-path');

        currOn.closest('.tab_menu').siblings('div[class^=tab]').hide();
        currOn.parent('li').addClass('on').siblings().removeClass('on');
        currOn.closest('.tab_menu').siblings('div.'+currPath).show();
    });
});