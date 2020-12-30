$(function(){

    $('.visual .slider').bxSlider({
        auto: false,
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        controls: true
    });

    //e.preventDefault();
    $('.layerMenu .gnb li a').on('click',function(){
        var $currOn = $(this).parent().attr('class');
        $('.layerMenu .gnb li a').removeClass('on');
        $('.layerMenu .gnbDepth > div').hide();
        $('.'+$currOn+' a').addClass('on');
        $('.'+$currOn+'Depth').show();
    });
    $('.allMenu').on('click',function(){
        $('.layerMenu').css('top','0');
    });
    $('.allMenuClose').on('click',function(){
        var $layHei = $('.layerMenu').height();
        $('.layerMenu').css('top','-'+$layHei+'px');
    });
});