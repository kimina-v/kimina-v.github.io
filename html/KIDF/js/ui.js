$(function(){
    $('.tab_menu a').on('click',function(e){
        e.preventDefault();
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

    $('.btn_toggle').on('click',function(e){
        e.preventDefault();
        if($(this).hasClass('off')){
            $(this).removeClass('off').siblings('table').show();
        }else{
            $(this).addClass('off').siblings('table').hide();
        }
    });

    $('.view_content ul ul').slideUp();
    $('.view_content .btnToggle').on('click',function(e){
        e.preventDefault();
        $(this).toggleClass('on').siblings('ul').slideToggle();
    });
    $('.academic_list .btn_view').on('click',function(e){
        e.preventDefault();
        $(this).toggleClass('on').closest('.list_item').siblings('.view_content').slideToggle();
    });

    $('.searchWrap .detail_search').on('click',function(e){
        e.preventDefault();
        $('.search_detail').show();
        $('.search_detail .btn_close').on('click',function(e){
            e.preventDefault();
            $('.search_detail').hide();
        });
    });

    $('.searchWrap .entry_language').on('click',function(e){
        e.preventDefault();
        $('.wrod_language').show();
        $('.wrod_language .btn_close').on('click',function(e){
            e.preventDefault();
            $('.wrod_language').hide();
        });
    });
    $('.design_select > a').on('click',function(e){
        e.preventDefault();
        $(this).siblings('ul').slideToggle();
    });
});