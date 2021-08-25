$(function () {
    /**
     * BO menu ui 변경으로 주석처리
     * TODO 퍼블 나오면 다시 적용
     */
    // Gnb
    // if ($('.gnb-wrap').length > 0) { gnb(); }

    // Gnb
    // if ($('.gnb-list').length > 0) { gnbMenu();}

    // 검색영역
    if ($('.ui-toggle-content').length > 0) { searchArea (); }

    // Layer popup
    if ($('.ui-open-pop').length > 0) { layerPop(); }

    // Layer popup Height
    if ($('.layer-wrap').is(':visible')) { layerHeight(); } // 팝업html에서 동작 (  )

    // tooltip
    if ($('.ui-tooltip').length > 0) { toolTip(); }

    // mouseover tooltip
    if ($('.tool-over').length > 0) { toolTipOver(); }

    // Table toggle Button
    if ($('.ui-th-toggle').length > 0) { arrToggle(); }

    // Datepicker
    if ($('.datepicker-group').length > 0) { inputDatepicker(); }

    // 파일첨부
    if ($('.filebox').length > 0) { fileAdd(); }

    // Tab
    if ($('.ui-tab').length > 0) { tabMenu();}

    // Tab 사이즈
    if ($('.tab-menu').length > 0) { tabMenuSize();}

    // 체크박스 모두 선택
    if ($('.ui-check-all').length > 0) { checkAll();}

    // Radio Tab
    if ($('.ui-radio-tab').length > 0) { radioTab();}

    // gotop
    if ($('.btn-gotop').length > 0) { goTop();}

    // resizetable
    if ($('.resize-table').length > 0) { resizeTable();}

    //fixed box
    if ($('.fixed-box').length > 0) { fixBox(); }

    //Movable Row
    if ($('.movable-row').length > 0) { moveRow();}

    // 스크롤테이블(가로,세로)
    if ($('.sc-table').length > 0) { scTable ();}

     // mCustomscrollbar
     if ($('.ui-custom-scroll').length > 0) { customScroll ();}

    //공지사항 읽음
    if ($('.notice-read-btn').length > 0) { noticeReadEvent ();}

    //즐겨찾기 초기화
    if ($('.favorite-reset-btn').length > 0) { favoriteResetEvent();}

    //new gnb
    if ($('.gnb-sidebar').length > 0) { gnbController();}

    // menu-search
    if ($('.menu-search').length > 0) { topMenuSearch(); }

    //사용자정보
    if ($('.util-log-wrap').length > 0) { utilToggle(); }

    //test중
    if ( $('.scrollbar-move-area').length > 0) { scrollMove(); }

    // 검색버튼 크기 조절
    if ( $('.board-form').next('.btn-area').find('.btn-basic-md').length > 0) { srchbtnSize(); }

    // btnDropdown
    if ($('.ui-btn-group').length > 0) { btnDropdown(); }
});


function scrollMove () { 
        var divarea = $('.scrollbar-move-area'),
            tableWrap = divarea.find('.board-list'),
            intable = tableWrap.find('table'),
            moveActionBtn = $('.ui-scroll-move'),
            txtGuideDiv = $('.scroll-view-btns'),
            width = intable.outerWidth(),
            leftBtn = $('.ui-scroll-move.left'),
            rightBtn = $('.ui-scroll-move.right');

        if ( tableWrap.scrollLeft() === 0 ) {
            leftBtn.hide();
        } 

        moveActionBtn.on('click', function () {
            $(this).addClass('clicked').siblings().removeClass('clicked')
            if ( $(this).hasClass('right') ) {
                tableWrap.scrollLeft(width);
            } else if ( $(this).hasClass('left') )  {
                tableWrap.scrollLeft(0);
            }
        })

        tableWrap.on('scroll', function(){
            if ( $(this).scrollLeft() === 0 ) {
                leftBtn.hide();
                rightBtn.show();
            } else if ( Math.ceil($(this).scrollLeft() + $(this).width() ) === tableWrap.find('table').width() ) {
                rightBtn.hide();
                leftBtn.show()
            } else {
                rightBtn.show();
                leftBtn.show()
            }
        });


       var divPos =  divarea.offset().top;
       var searchbtn = $('.btn-search-detail');

        $(document).on('scroll', function(){
            docScroll = $(document).scrollTop();

            if( $('.searh-detail-area').css('display') === 'none' ){ 
                if ( docScroll >= divPos ) {
                    txtGuideDiv.addClass('fixed')
                } else  {
                    txtGuideDiv.removeClass('fixed')
                }     
            } else if( searchbtn.hasClass('on') && $('.searh-detail-area').css('display') === 'block' ){   
                if ( docScroll >=  divarea.offset().top ) {
                    txtGuideDiv.addClass('fixed')
                } else  {
                    txtGuideDiv.removeClass('fixed')
                } 
            }
        });
}


function srchbtnSize () {
    // 추후 개발에서 변경예정
    var caseOne = $('.board-form').siblings('.btn-area');
    caseOne.each(function () {

        if ( $(this).find( '.btn-basic-md:contains("검색")' ).length ) {
            $(this).find( '.btn-basic-md:contains("검색")' ).addClass('btn-basic-md2');
            $(this).find( '.btn-basic-md:contains("초기화")' ).addClass('btn-basic-md2');
        }  
    })
}


/****** 검색영역 ******/
function searchArea () {
    var srchBtn = $('.btn-search-detail'),
        srchDetail = $('.ui-toggle-content');

    srchBtn.on('click', function () {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on')
            srchDetail.slideDown(200);
        } else if ( $(this).hasClass('on') ) {
            $(this).removeClass('on')
            srchDetail.slideUp(200);
        }
    });
}


/****** LayerPop ******/
function layerPop (id) {
    var btnAnchor = $('.ui-open-pop'),
        close = $('.ui-close-pop')

    btnAnchor.on('click', function () {
        btnTarget = $(this);
        var popupID;

        if ( btnTarget.is('button') ) {
            popupID = btnTarget.attr('data-layer');
        } else if ( btnTarget.is('a') ) {
            popupID = btnTarget.attr("href")
        }
        
        popLayer = $(popupID);

        if ( !btnTarget.parents('.layer-pop').length ) {
            layerOpen (popLayer);
        } else if ( btnTarget.parents('.layer-pop').length ) {
            innerlayerOpen (popLayer);
        }
        
    })

    var popupElem = $(id);
    if ($(id).hasClass('onload')) {
        layerOpen (popupElem);
    }
    
    close.on('click', function () {
        if ( !popupElem.hasClass('onload')) {
            layerClose($(this), btnTarget)
        } else {
            layerClose($(this))
        }
    })
}

function layerOpen (id) {
    var scrollValue = $('body').scrollTop();

    $('body').css({'overflow':'hidden'}).scrollTop(scrollValue);
    $(id).show().attr('tabIndex','0').focus;

    layerHeight ()
}

function innerlayerOpen (id) {
    var scrollValue = $('body').scrollTop();

    $('body').addClass('layer-dim').scrollTop(scrollValue);
    $(id).show().addClass('layer-index').attr('tabIndex','0').focus;

    layerHeight ()
}

function layerClose (el, btnTarget) {
    var layerWrap = $(el).parents('.layer-wrap');

    if ( !$(el).parents('.layer-index').length ) {
        $('body').removeAttr('style');
    } else if ( $(el).parents('.layer-index').length ) {
        $('body').removeClass('layer-dim');
    }
   
    $('.layer-pop').removeAttr('style');
    layerWrap.hide();

    if ( !layerWrap.hasClass('onload')) {
        btnTarget.focus();
    } 
}

function layerHeight () {
    var layer = $('.layer-inner'),
    layerHeight = layer.outerHeight();
    mathHeight = Math.floor(layerHeight)
  
    if ( layerHeight % 2 == 0 ) {
       // console.log('짝수')
    } else {
        layer.css('min-height',mathHeight + 1);
    }
}

/****** tooltip ******/
function toolTip () {
    var btnTip = $('.ui-tooltip'),
        tipbox = $('.tooltip-box'),
        closebtn = $('.ui-tooltip-close');

    btnTip.on('click',function () {
        targetTipBox = $(this).next(tipbox);
        if ( targetTipBox.is(':visible') ) {
            toolTipClose(this);
        } else {
            offTop = $(this).position().top + $(this).outerHeight() + 10;
            posLeft = $(this).offset().left;
            if ( posLeft + targetTipBox.outerWidth() > $(window).width() ) {
                // var offLeft = $(this).offset().left - ($(this).outerWidth()/2);
                var offLeft = $(window).width() - (posLeft + ($(this).outerWidth()/2 + 30));
                toolTipRightOpen (this, offTop, offLeft);
            } else {
                var offLeft = posLeft + (($(this).outerWidth()/2) - 20);
                toolTipOpen (this, offTop, offLeft);
            }
        }
        console.log(offLeft, $(this).outerWidth())
    });

    closebtn.on('click',function () {
        toolTipClose(this);
    })
}

function toolTipOpen (el, top, left) {
    $(el).next('.tooltip-box').addClass('on').show().css({'top':top+'px', 'left':left+'px'}).focus();
}    

function toolTipRightOpen (el, top, left) {
   // $(el).next('.tooltip-box').addClass('right').show().css({'top':top+'px', 'right':0}).focus();
    $(el).next('.tooltip-box').addClass('right on').show().css({'top':top+'px', 'right':left+'px'}).focus();
}    

function toolTipClose (el) {
    if ( $(el).hasClass('ui-tooltip-close') ) {
        $(el).parents('.tooltip-box').removeClass('on').removeClass('right').removeAttr('style').hide();
    } else {
        $(el).next('.tooltip-box').removeClass('on').removeClass('right').removeAttr('style').hide();
    }
   
}


function toolTipOver () {
    var toolPopup = $('.tool-popup'),
        toolContext = toolPopup.find('.context'),
        layerToolPoup =  $('.layer-wrap .tool-popup'),
        layerToolContext = layerToolPoup.find('.context');

    $('.tool-over').mouseover(function(){
        $('.tool-popup .context').append('');
        var tool = $(this),
            myPosTop = tool.offset().top+50,
            myPosLeft = tool.offset().left,
            currContext = tool.find('.tool-cont').html();

            if(tool.closest('.layer-wrap').hasClass('layer-wrap')){
                var parentPosTop = $('.layer-inner.layer-xlg').offset().top,
                    parentPosLeft = $('.layer-inner.layer-xlg').offset().left;
                    layerToolPoup.css({ left:myPosLeft-parentPosLeft+'px', top:myPosTop-parentPosTop+'px', display:'block'})
                    layerToolContext.html(currContext);
            } else{
                toolPopup.css({ left:myPosLeft+80+'px', top:myPosTop+'px', display:'block'})
                toolContext.html(currContext);
            }
        
            
    });
    $('.tool-over').mouseleave(function(){
        toolPopup.hide();
    });
}

/****** Table toggle Button ******/
function arrToggle () {
    $('.ui-th-toggle').on('click', function () {
        if ( !$(this).hasClass('toggle-on') ) {
            $(this).addClass('toggle-on')
        } else {
            $(this).removeClass('toggle-on')
        }
    })
}


/****** Datepicker ******/
function inputDatepicker () {
    $('.datepicker').each(function () {
        $(this).datepicker({        
            dateFormat: 'yy.mm.dd',
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
            showOtherMonths: false,
            showButtonPanel: true,
            autoClose: false,
            changeMonth: true,
            changeYear: true,
            closeText: '닫기', 
            currentText: '오늘' 
        });
    })
}


/****** 파일첨부 ******/
function fileAdd () {
    var fileTarget = $('.filebox .upload-hidden');

    fileTarget.on('change', function(){
        fileAction (this)
    });

    $(document).on('click','.ui-file-delete', function () {
        fileRemove (this)
    })
}

function fileAction (el) {
    if(window.FileReader){
        var filename = $(el)[0].files[0].name;
    } else {
        var filename = $(el).val().split('/').pop().split('\\').pop();
    }
    // $(this).siblings('.upload-name').val(filename);

    if (  $(el).parent('.filebox').hasClass('on') ) {
        $(el).siblings('.upload-name').find('span').text(filename);
        return false;
    } 
    $(el).parent('.filebox').addClass('on');
    $(el).siblings('.upload-name').find('span').text(filename);
    $(el).siblings('.upload-name').append('<button type="button" class="btn-del-xs ui-file-delete"><i class="ico-x-white"></i><span class="blind">삭제</span></button>');
}

function fileRemove (el) {
    var unselected = $(el).siblings('.upload-name').find('span').text();
    $(el).parents('.filebox').removeClass('on');
    $(el).siblings('.txt').text(unselected);
    $(el).parent('.upload-name').siblings('.upload-hidden').val('');
    $(el).remove();
}



/****** Tab ******/
function tabMenu () {
    var tab = $('.ui-tab'),
        anchor = tab.find('li').children('a');

    anchor.on('click', function (event) {
        /*페이지 이동 방지 추가*/
        event.preventDefault();
        var tabID = $(this).attr("href");
        tabClick(this);
        if ($(this).parents().siblings('.ui-tab-container').length > 0) {
            $(tabID).addClass("active").siblings().removeClass("active");
        }
    });
}

function tabClick (el) {
    $(el).parent('li').addClass('current').siblings('li').removeClass('current');
}

function tabMenuSize () {
    var tabMenu = $('.tab-menu');

    tabMenu.each(function () {
        var tabLength = $(this).find('li').length;
        if ( tabLength >= 6 ) {
            $(this).addClass('flex')
        }
    })
}


/****** 체크박스 모두 선택 ******/
function checkAll () {
    var chkBtn = $('.ui-check-all');
    chkBtn.on('click',function () {
      var checked = $(this).is(':checked'),
          name = $(this).attr('name');
          
        if ( checked ) {
            $('[name="'+name+'"]').prop('checked',true)
        } else {
            $('[name="'+name+'"]').prop('checked',false)
        }    
    });
}


/****** 라디오 탭 ******/
function radioTab () {
    $('.ui-radio-tab').each(function () {
        var uiRadioBtn = $(this).find('.ui-radio'),
            uiRadioExcept = uiRadioBtn.not('.ui-radio-except'),
            uiCont = $(this).next('.ui-radio-content').children('.ui-content');

        uiRadioBtn.on('click', function () {
            if ( !$(this).hasClass('ui-radio-except') ) {
                uiCont.eq( uiRadioExcept.index(this) ).addClass('current').siblings().removeClass('current');
            } else {
                uiCont.removeClass('current')
            }
        })
    })
}


/****** resizeTable ******/
function resizeTable () {
    $('.resize').resizable({
        handles: 'e',
        minWidth: 200,
        maxWidth:1000
    });
}


/****** 화면상단이동 ******/
function goTop(){
    $(window).on('scroll', function(){
        var docScroll = $(document).scrollTop();

        if ( docScroll > 200){
            $('.btn-gotop').stop().fadeIn(200);
        } else{
            $('.btn-gotop').stop().fadeOut(200);
        }

        $('.btn-gotop').on('click', function(){
            $('html, body').stop().animate({ scrollTop : 0 }, 200);
        });
    });
}


/****** textarea 글자수세기 ******/
function txt_cnt(){
    var textarea = $('.textarea');
    textarea.each(function () {
        $(this).on('keyup', function() {
            var limit_txt = $(this).next('.txt-cnt').find(".limit-txt").text();          
            if($(this).val().length > limit_txt) {
                $(this).val($(this).val().substring(0, limit_txt));                
            }  
            $(this).next('.txt-cnt').find("em").html($(this).val().length);                
        });
    })
}   

// 상품진열관리 테이블 option box fixed
function fixBox () {
    var fixBox = $('.fixed-box');
        fixBoxPos = fixBox.offset().top - 145;

    $(document).on('scroll', function(){
        var docScroll = $(document).scrollTop();

            // 스크롤시 option box 고정
        if( docScroll >= fixBoxPos ){
            fixBox.addClass('fixed');

        } else {
            fixBox.removeClass('fixed');

        }
    });
}

  
/****** movable row ******/
function moveRow () {

     var sort = $('.movable-row'); 
     sort.each(function () {
     
         $('.movable-row tr.movable').click(function(event) {
             if( !event.ctrlKey ) {
                 if( $(this).hasClass('delete') ) return false;
                 var $tr = $('.movable-row tr.movable.selected');
                 $tr.removeClass('selected');
                 $(this).addClass('selected');
             }
             else {
                 if( $(this).hasClass('delete') ) return false;
                 $(this).toggleClass('selected');
             }
         });
         $.fn.extend({
         
             // 위로 이동
             upRow: function() {
                     if( this.attr("id") == $(this).siblings('tr.movable:first').attr("id") ){

                     }
                 else{
                     var crtlInput = this.parents('.board-movable-wrap').find('.btn-lst').find('.step');
                     var step = crtlInput.val();
 
                     if(!step) step=1;
                     nstep=$(this).index()-parseInt(step)+1;
                    

                     if ( $(this).parents('.movable-row').find('thead').length ) {
                        if(nstep <= 0) return this.insertBefore( $(this).siblings('tr.movable:first').attr("id") );
                        else return this.insertBefore( $(this).parents('.movable-row').find('tr').eq(nstep) );
                     } else if ( !$(this).parents('.movable-row').find('thead').length ) {
                        if(nstep <= 0) return this.insertBefore( $(this).siblings('tr.movable:first').attr("id") );
                        else return this.insertBefore( $(this).parents('.movable-row').find('tr').eq(nstep - 1) );
                     }
                 }
             },
             // 최상 이동
             firstRow: function() {
                     if( this.attr("id") == $(this).siblings('tr.movable:first').attr("id") ){
                     return;
                 }
                 return this.insertBefore( $(this).siblings('tr.movable:first') );
             },
             
             //아래로 이동
             downRow: function() {
                     if( this.length && this.eq(this.length-1).attr('id') == $(this).siblings('tr.movable:not(.delete):last').attr("id") ){

                     }
                 else{
                     var crtlInput = this.parents('.board-movable-wrap').find('.btn-lst').find('.step');
                     var step = crtlInput.val();
 
                     if(!step) step=1;
                     nstep=this.eq(this.length - 1).next('.movable:not(.delete)').index()+parseInt(step)-1;
 
                     if(nstep >= $(this).parents('.movable-row').find('tr').length) return this.insertAfter( $(this).siblings('tr.movable:not(.delete):last') );
                     else return this.insertAfter( $(this).parents('.movable-row').find('tr.movable:not(.delete)').eq(nstep));
                 }
             },
             //최하 이동
             lastRow: function() {
                     if( this.length && this.eq(this.length-1).attr('id') == $(this).siblings('tr.movable:not(.delete):last').attr("id") ){
                     return;
                 }
                 return this.insertAfter( $(this).siblings('tr.movable:not(.delete):last') );
             }
         });
 
         var wrapDiv = $(this).parents('.board-movable-wrap')
         var moveCtrlBtn = wrapDiv.find('.btn-lst').find('.move');
    
         moveCtrlBtn.click(function() {
             if( $(this).hasClass('all') ) var $tr = wrapDiv.find('tr.movable.selected');
             else {
                 var $tr = $(this).parent('div').parent('td').parent('tr');
                 $tr.trigger('click');
             }
             if( $(this).hasClass('up-row') ) $tr.upRow(); // 위로 이동 upRow 
             if( $(this).hasClass('first-row') ) $tr.firstRow(); // 최상 이동 firstRo
             if( $(this).hasClass('down-row') ) $tr.downRow(); //아래로 이동 downRow
             if( $(this).hasClass('last-row') ) $tr.lastRow(); //최하 이동 lastRow
 
             window.is_change = true;
             return false;
         });
 
         // $('.delete').click(function() {
         // 	if( $(this).hasClass('all') ) var $tr = $('.movable-row tr.movable.selected');
         // 	else var $tr = $(this).parent('div').parent('td').parent('tr');
         // 	$tr.removeClass('selected').addClass('delete').hide().insertAfter($('.movable-row tr.movable:last'));
         // 	window.is_change = true;
         // 	return false;
         // });
     });
 }
 


/****** 스크롤테이블(가로,세로) ******/
function scTable () {
    $('.right-body-tb').scroll(function () {
        var xPoint = $('.right-body-tb').scrollLeft();
        $('.right-head-tb').scrollLeft(xPoint);
    });

    tbHeight();
    $(window).resize( tbHeight);
}

function tbHeight(){    

    var leftTb = $('.grid-left-area').find('.div-body-scroll');
    var rightTb = $('.grid-right-area').find('.div-body-scroll');

    if($(".grid-left-area .btn-area").height() == null){
        rightTb.height($(window).height() - rightTb.offset().top - 46);
    }else if($(!".grid-left-area .btn-area").height() == null){
        rightTb.height($(window).height() - rightTb.offset().top - 104);
    }
    leftTb.height(rightTb.height());
    if($(".input-group-wrap.search-type")){
        var common_height = $(".input-group-wrap.search-type").offset().top + 200;
    }    
    var tb_height_1 = $(window).height() - common_height;    
    var detail_area_h = $(".searh-detail-area").height() + 15;
    var tb_height_2 = $(window).height() - common_height - detail_area_h;

    if($(".searh-detail-area").css("display") == "none"){
        $(".div-body-scroll").css('height',tb_height_1);  
        //$(window).resize(tb_body_height);            
    }
    else if($(".searh-detail-area").css("display") == "block"){            
        $(".div-body-scroll").css('height',tb_height_2);
        //$(window).resize(tb_body_height);  
    }

    $(".btn-search-detail").on('click',function(){
        if($(".btn-search-detail").hasClass("on")){
            $(".div-body-scroll").css('height',tb_height_2);    
        }else if(!$(".btn-search-detail").hasClass("on")){
            $(".div-body-scroll").css('height',tb_height_1);
        }
    })

}


/****** mCustomscrollbar ******/
function customScroll () {
    $('.ui-custom-scroll').mCustomScrollbar({
        scrollInertia: 200,
        scrollEasing: "easeOut",
        mouseWheel:{ deltaFactor: 40 }
    });
}

function noticeReadEvent() {   
    $(".notice-read-btn").on('click', function(e){
        var checkboxes = $('.notice-list-body').find('tr input[type="checkbox"]');
        checkboxes.each(function(idx, el){
            if($(el).is(":checked")) {
                $(el).closest('tr').addClass('checked');
            }
        })
    });
}

function favoriteResetEvent() {
    $(".favorite-reset-btn").on('click', function(e){
        $('.fav').find('input[type="checkbox"]').each(function (idx, el) {
            $(el).prop('checked', false);
        });
    });
}

//new gnb
function gnbController() {
    var header = $('.header');
    var container =  $('.container');
    var gnbActiveClass = 'gnb-open';
    var gnbToggleBtn = $('.gnb-toggle');
    var favoriteEditBtn = $('.favorite-edit-btn .btn-edit');
    var favoriteSaveBtn = $('.favorite-edit-btn .btn-save');
    var rootMenu = $('.nav-tab > li');
    init();

    function init(){
        gnbToggleEvent();
        rootMenuClickEvent();
        subMenuClickEvent();
        favoriteSaveBtn.hide();
    }

    function gnbOpen() {
        header.addClass(gnbActiveClass);
        container.addClass(gnbActiveClass);
        gnbToggleBtn.find('span.blind').html('메뉴 닫기');
        //rootMenu.eq(1).trigger('click');
    }

    function gnbClose() {
        header.removeClass(gnbActiveClass);
        container.removeClass(gnbActiveClass);
        gnbToggleBtn.find('span.blind').html('메뉴 열기');
        //rootMenu.removeClass('current');
    }

    function gnbToggleEvent() {
        $('.gnb-toggle').on('click', function() {
            (!header.hasClass(gnbActiveClass)) ? gnbOpen() : gnbClose();
        });
    }

    function rootMenuClickEvent() {
        var activeClass = 'current';
        rootMenu.on('click', function(){
            var subMenuId = $(this).data('submenu');
            var subMenu = $('#' + subMenuId);
            if(subMenuId !== 'home'){
                if(!header.hasClass(gnbActiveClass)) gnbOpen();
                $(this).addClass(activeClass).siblings().removeClass(activeClass);
                subMenu.show().siblings('.menu-item-wrap').hide();
                if(subMenuId === 'sub-panel-1') {
                    subMenu.show();
                    favoriteEditBtn.show();
                    favoriteSaveBtn.hide();
                    favoriteEditEvent(subMenu);
                }else{
                    favoriteDestroy(false);
                }
            }
            //else{
               // console.log('home클릭했을떄 액션');
            //}
        })
    }

    function subMenuClickEvent(subMenuId) {
        var subMenu = $('.site-depth2 li a');
        var activeClass = 'current';
        subMenu.on('click', function(e){
            var parent = $(this).closest('li');
            $('.site-depth2 li').removeClass(activeClass);
            parent.addClass(activeClass);
           // addToheadTab($(this));
        });
    }

    function favoriteDestroy(isFavorite) {
        var favoriteMenu = $('#sub-panel-1').find('.site-depth2');
        if (isFavorite) { 
            favoriteEditBtn.show();
            favoriteSaveBtn.hide();
        }else{
            favoriteEditBtn.hide();
            favoriteSaveBtn.hide();
            if (favoriteMenu.data('ui-sortable')) favoriteMenu.sortable("cancel");
        }

        if (favoriteMenu.data('ui-sortable')) {
            favoriteMenu.sortable("destroy");
            favoriteMenu.removeClass('sortable');
        }       
    }

    function favoriteEditEvent(subMenu) {
        favoriteEditBtn.on('click', function(){
            var favoriteMenu = subMenu.find('.site-depth2');
            favoriteEditBtn.hide();
            favoriteSaveBtn.show();
            favoriteMenu.addClass('sortable');
            favoriteMenu.sortable();
            favoriteMenu.disableSelection();

            // console.log(myText)

            favoriteSaveBtn.on('click', function(){
                console.log('즐겨찾기 저장');
                // favoriteDestroy(true);
            })
        })
    }

    // var headTabArr = [];
    // function addToheadTab(me) {
    //     var textValue = me.text();
    //     var headTabWrap = $('.head-tab'),
    //         headTab = headTabWrap.find('ul'),
    //         allCloseBtn = headTabWrap.find('.head-tab-close'),
    //         li = $('<li>'),
    //         text  = $('<a>').text(textValue),
    //         closeBtn = $('<button type="button" class="btn-del" title="삭제"><span class="blind">삭제</span></button>');

    //     function allCloseBtnToggle() {
    //         headTabArr.length > 0 ? allCloseBtn.show() : allCloseBtn.hide();
    //     }

    //     if(headTabArr.indexOf(textValue) === -1)  {
    //         headTabArr.push(textValue);
    //         headTab.append(li.append(text).append(closeBtn));
    //         allCloseBtnToggle();
    //     }

    //     li.addClass('current').siblings().removeClass('current');

    //     li.on('click', function(){
    //         li.addClass('current').siblings().removeClass('current');
    //     });

    //     closeBtn.on('click', function(){
    //         $(this).closest('li').remove();
    //         var idx = headTabArr.findIndex(function(item) {return item === textValue}) ;
    //         if (idx > -1) headTabArr.splice(idx, 1);
    //         allCloseBtnToggle();
    //     });

    //     allCloseBtn.on('click', function(){
    //         headTab.find('li').remove();
    //         headTabArr = [];
    //     });    
    // }
}


/****** menu Search ******/
function topMenuSearch () {
    var targetInput = $('.input-search');
    layer = $('.search-layer');
    targetInput.on('keyup',function (e) {
        const keyword = $('#goMenu').val();
        if (e.which == 13 && keyword.length > 1) {
           layer.addClass('on');
        }
        if (e.which == 8 || e.which == 46) {
           layer.removeClass('on');
        }
        $('body').on('click',function(e){
            if($(e.target).closest('.menu-search').length === 0 && layer.hasClass('on')){
              layer.removeClass('on');
            }
        })
    })
}

function utilToggle () {
    var utilWrap = $('.util-log-wrap');
    var toggleEl = utilWrap.find('.log-layer, .ico-arr');
    utilWrap.find('.util-log').on('click', function(){
        if (!toggleEl.hasClass('on')) {
            toggleEl.addClass('on');
        } else {
            toggleEl.removeClass('on');
        }
    });

    $('body').on('click',function(e){
        if($(e.target).closest('.util-log-wrap').length === 0 && toggleEl.hasClass('on')){
          toggleEl.removeClass('on');
        }
    })
}


/****** btnDropdown ******/
function btnDropdown () {
    groupbtn = $('.ui-btn-group');
    
    groupbtn.on('click',function () {
        var groupWrap = $(this).parent('.btn-down-group');
        
        if ( !groupWrap.hasClass('toggle-on') ) {
            groupWrap.addClass('toggle-on');
            groupWrap.siblings('.btn-down-group').removeClass('toggle-on')
        } else if ( groupWrap.hasClass('toggle-on') ) {
            groupWrap.removeClass('toggle-on');
        }

        $('body').on('click',function(e){
            if($(e.target).closest('.btn-down-group').length === 0 && $('.btn-down-group').hasClass('toggle-on')){
                $('.btn-down-group').removeClass('toggle-on');
            }
        }) 

    })
}
