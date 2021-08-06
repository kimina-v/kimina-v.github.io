$(function () { 
    // lnb
    if ($('.ui-open-lnb').length > 0) { lnbNav (); }

    // Top Banner Close
    if ($('.top-banner').length > 0) { topBnrClose(); }

    // Side banner
    //if ($('.side-quick').length > 0) { sideQuickBnrPos(); }

    // header-search
   // if ($('.header-search').length > 0) { headerSearch(); }

    // Tab
    if ($('.ui-tab').length > 0) { tabMenu();}

    // Custom Select box
    if ($('.ui-select').length > 0) { selectBox(); }

    // Custom Select box
    if ($('.dropdown-box').length > 0) { dropDown(); }

    // Layer popup
    if ($('.ui-open-pop').length > 0) { layerPop(); }

    // Layer popup Height
    //if ($('.layer-wrap').is(':visible')) { testlayerHeight(); } // 팝업html에서 동작 ()

    // tooltip
    if ($('.ui-tooltip').length > 0) { toolTip(); }

    // 체크박스 모두 선택
    if ($('.ui-check-all').length > 0) { checkAll();}

    // Toggle
    if ($('.ui-toggle').length > 0) { toggleCnt();}

    if ($('.ui-toggle-height').length > 0) { toggleHeight();}

    if ($('.ui-toggle-slide').length > 0) { toggleSlide();}
    
    // 주문결제 박스 스크롤 고정
    //if ($('.ui-box-fix').length > 0) { paymentFix();}

    // 아코디언 
    if ($('.ui-accordion').length > 0) { accordionList();}

    // 목록, 내용 더보기
    if ($('.ui-more-list').length > 0) { moreListView(); }

    // 파일첨부
    if ($('.filebox').length > 0) { fileAdd(); }

    // 식단상담 슬라이드
    if ($('.meal-plan-list').length > 0) { planSwiperSlide(); }

    // 상품상세 옵션선택 고정
    if ($('.option-select-fix').length > 0) { optionFix(); } 

    // 상품상세 탭, 옵션선택박스
    if ($('.ui-goods-tab').length > 0) { goodsTab(); } 

    // 상품상세 탭, 옵션선택박스
    if ($('.ui-more-article').length > 0) { moreArticle(); } 

    // 브랜드관 슬라이드
    if ($('.brand-swiper-list').length > 0) { brandSwiperSlide(); }

    if ($('.ui-togglelayer-btn').length > 0) { toggleLayer(); }

    // 브랜드찾기
    if ($('.ui-brand-search').length > 0) { brandSearch(); }

    // review 상세 슬라이드
    if ($('.review-detail-slide').length > 0) { reviewSwiperSlide(); }

    // 식단상담 슬라이드
    if ($('.ranking-swiper-tab').length > 0) { rankTabSwiperSlide(); }

    // 한팩담기 bestPrdSwiperSlide
    if ($('.best-prd-list').length > 0) { bestPrdSwiperSlide(); }

    // 이달의 특가 탭
    if ($('.ui-anchor-tab').length > 0) { anchorMove (); }

    if ($('.scroll-select-bar').length > 0) { selectBarFix (); }

    // 카드등록 목록
    if ($('.card-box-list').length > 0) { cardSwiperSlide (); }
    
    //베스트구매후기 슬라이드
    if ($('.best-review-slide').length > 0) { bestReviewSwiperSlide(); }

    //추천상품
    if ($('.prod-recomm').length > 0) { recommPrdSwiperSlide();}

    //이미지 슬라이드
    if ($('.img-slide').length > 0) { imgSwiper ();}
});


/****** lnb ******/
function lnbNav (id) {
    var btnAnchor = $('.ui-open-lnb'),
        close = $('.ui-close-lnb')
    
    btnAnchor.on('click', function () {
        btnTarget = $(this);
        var lnbID;

        if ( btnTarget.is('button') ) {
            lnbID = btnTarget.attr('data-layer');
        } else if ( btnTarget.is('a') ) {
            lnbID = btnTarget.attr("href")
        }
        
        if ( !btnTarget.hasClass('on') ) {
            btnTarget.addClass('on');
            lnbLayer = $(lnbID);
            lnbOpen (lnbLayer);
        } else if ( btnTarget.hasClass('on') ) {
            lnbClose($(this), btnTarget)
        }
      
    })

    close.on('click', function () {
        lnbClose($(this), btnTarget)
    })

    lnbControl ();
}

function lnbOpen (id) {
    var scrollValue = $('body').scrollTop();
    
    $('body').css({'overflow':'hidden'}).scrollTop(scrollValue);
    $(id).show().attr('tabIndex','0').focus;

    $('.lnb-body').scrollTop(0)

    //layerHeight ( $(id) );
}

function lnbControl () {
    var navWrap =  $('.nav-list').children('li'),
        click = navWrap.children('a');

    click.on('click', function () {
        var list = $(this).parent('li'),
            view = list.find('.depth2')

        if ( !list.hasClass('active') ) {
            list.addClass('active').siblings('li').removeClass('active').find('.depth2').slideUp(200)
            //view.addClass('on');
            view.slideDown(200)
        } else if ( list.hasClass('active') ) {
            list.removeClass('current');
            //view.removeClass('on');
            view.slideUp(200)
        }
    });
}

function  lnbClose (el, btnTarget) {

    if ( $(el).hasClass('ui-open-lnb') ) {
        var lnbWrap = $('.lnb-wrap');
    } else {
        var lnbWrap = $(el).parents('.lnb-wrap');
    }
    
    $('body').removeAttr('style');
    $('.ui-open-lnb').removeClass('on')
    lnbWrap.hide();

    if ( !lnbWrap.hasClass('onload')) {
        btnTarget.focus();
    } 
}


/****** Banner ******/
// Top Banner Close
function topBnrClose () {
    var topBnr = $('.top-banner'),
    closeBtn = topBnr.find(".btn-x-sm");
    
    closeBtn.on('click',function () {
        topBnr.hide();
    })
}

// Side Banner
function sideQuickBnrPos () {
    wrap = $('.wrap');
    sideQuickArea = $('.side-quick-area');
    sideQuickBnr = sideQuickArea.children('.side-quick');
       
    if ( wrap.hasClass('main') ) {
        sideEventArea = $('.side-event-area');
        sideEventBnr = sideEventArea.children('.side-event');
        mainPos = $('.container').find('.main-article').eq(0);
        mainPosTop = mainPos.position().top + 175;

        sideQuickBnr.css('top', mainPosTop); 
        sideEventBnr.css('top', mainPosTop); 
    } else {
        cntPos = $('.container').children('.content-wrap');
        if ( cntPos.children('.scroll-select-bar').length > 0 ) {
            cntPosTop = cntPos.position().top + 125;
        } else {
            cntPosTop = cntPos.position().top + 70;
        }
        sideQuickBnr.css('top', cntPosTop); 
    }

    $(document).on('scroll', function(){
        docScroll = $(document).scrollTop();
        contentHeight = $('.container').height(),
        footHeight = $(".footer").outerHeight() + 275,
        sideQuickHeight = $('.side-quick').height();

        if ( wrap.hasClass('main') ) { 
            if( docScroll > mainPos.offset().top ){
                sideEventArea.addClass('fixed');
                sideEventBnr.removeAttr('style');
                sideQuickScroll ();
            } else {
                sideQuickArea.removeClass('fixed')
                sideQuickBnr.css('top', mainPosTop);
                sideEventArea.removeClass('fixed')
                sideEventBnr.css('top', mainPosTop);
            }
        } else {
            if( docScroll > cntPos.offset().top ){
                sideQuickScroll (); 
            } else {
                sideQuickArea.removeClass('fixed')
                sideQuickBnr.css('top', cntPosTop);
            }
        }
    });

    function sideQuickScroll () {
        cntPos = $('.container').children('.content-wrap');
        if ( cntPos.children('.scroll-select-bar').length > 0 ) { 
            sideQuickArea.addClass('fixed type2');  
        } else { 
            sideQuickArea.addClass('fixed');  
        }
        sideQuickBnr.removeAttr('style');

        if ( docScroll >= contentHeight - footHeight - 100) {
           sideQuickArea.addClass('static').find('.side-quick').css('top',-sideQuickHeight)
        } else {
          sideQuickArea.removeClass('static')
        }
    }
}

/****** 화면 상,하단 이동 ******/
function goTop () {
   // $('html, body').scrollTop(0);
   $('html, body').stop().animate({scrollTop : '0'})
}

function goBottom () {
   // $('html, body').scrollTop( $(document).height() );
   $('html, body').stop().animate({scrollTop : $(document).height()})
}


/****** header Search ******/
// function headerSearch () {
//     var targetInput = $('.input-search');
//     layer = $('.search-layer');
//     targetInput.on('click',function () {
//         layer.addClass('on');
        
//          $('body').on('click',function(e){
//             if($(e.target).closest('.header-search').length === 0 && layer.hasClass('on')){
//               layer.removeClass('on');
//             }
//         })
//     })
// }


/****** Tab ******/
function tabMenu () {
    var tab = $('.ui-tab'),
        anchor = tab.find('li').children('a');

    anchor.on('click', function () {
        var tabID = $(this).attr("href");
        tabClick (this);
        if ($(this).parents().siblings('.ui-tab-container').length > 0) {
            $(tabID).addClass("active").siblings().removeClass("active");
        }
    });
}

function tabClick (el) {
    $(el).parent('li').addClass('current').siblings('li').removeClass('current');
}


/****** dropDown ******/
function dropDown (e) {
    $(document).on('click','.dropdown-value',function(e){
        if ( !$(this).hasClass('disabled') ) {
            if ( $(this).parent('.dropdown-box').hasClass('on')) {    
                dropDownClose ();
            } else {
                dropDownClose ();
                $(this).parent('.dropdown-box').addClass('on');
            }
        
            $('body').on('click',function(e){
                if($(e.target).closest('.dropdown-box').length === 0 && $('.dropdown-box').hasClass('on')){
                    dropDownClose ()
                }
            })
        }
    });

    $(document).on('click','.dropdown-list a',function(){
        dropDownAction(this);
    })
}

function dropDownAction (el) {
    $(el).parents('.dropdown-list').find('li').not('.disabled').children('a').not('.text-primary').removeClass('selected');
   
    if ( !$(el).parent('li').hasClass('disabled') ) {
        $(el).not('.text-primary').addClass('selected');
    } 
    dropDownClose ();
}

function dropDownClose () {
    $('.dropdown-box').removeClass('on');
    return false;
}


/****** SelectBox ******/
function selectBox (e) {
    $(document).on('click','.select-value',function(e){
        if ( !$(this).hasClass('disabled') ) {
            if ( $(this).parent('.ui-select').hasClass('on')) {    
                selectBoxClose ();
            } else {
                selectBoxClose ();
                $(this).parent('.ui-select').addClass('on');
            }
        
            $('body').on('click',function(e){
                if($(e.target).closest('.ui-select').length === 0 && $('.ui-select').hasClass('on')){
                   selectBoxClose ()
                }
            }) 
        } 
    });

    $(document).on('click','.select-list a',function(){
        selectBoxAction(this);
    })
}


function selectBoxAction (el) {
    var listValue = $(el).children('span').text();
    
    $(el).parents('.select-list').find('ul li a').removeClass('selected');
    $(el).addClass('selected');
    $(el).parents('.ui-select').find('.select-value span').text(listValue);

    var selectedValue = $(el).parent('li').data('name');
    $(el).parents('.ui-select').attr('data-value',selectedValue);

    if ($(el).hasClass('selected') ) {
        if ( !$(el).parent('li').hasClass('first') ) {
            $(el).parents('.select-list').prev('.select-value').removeClass('placeholder');
        } else if ( $(el).parent('li').hasClass('first') ) {
            $(el).parents('.select-list').prev('.select-value').addClass('placeholder');
            $(el).parents('.ui-select').attr('data-value','');
        }
    }
    selectBoxClose ();
}


function selectBoxClose () {
    $('.ui-select').removeClass('on');
    return false;
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

        if(btnAnchor.hasClass('btn-img-zoom')){
            setTimeout(function(){
            	$('.zoom-info').fadeOut();
            },2000);
        }
        
        popLayer = $(popupID);
        layerOpen (popLayer);
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

function layerClose (el, btnTarget) {
    var layerWrap = $(el).parents('.layer-wrap');
    $('body').removeAttr('style');
    $('.layer-pop').removeAttr('style');
    layerWrap.hide();

    if ( !layerWrap.hasClass('onload')) {
        btnTarget.focus();
    } 
}

function layerHeight () {
    var layer = $('.layer-pop'),
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
    btnTip = $('.ui-tooltip'),
    btnClose = $('.ui-tooltip-close'),
    tipbox = $('[class*="ui-tooltipbox-"]');

    if ( btnTip.hasClass('ui-hover') ) {
        btnTip.on('click mouseenter',function () {
            tipShowEvent (this)
        });
        btnTip.on('mouseleave',function () {
            tooltipClose(targetTipBox)
        });
    } else {
        btnTip.on('click',function () {
            tipShowEvent (this)
        });
        btnClose.on('click',function () {
            tooltipClose(targetTipBox)
        });
    }
    
    function tipShowEvent (el) {
        var offTop = $(el).position().top - $(el).outerHeight() - 15, //
        offLeft = $(el).position().left - $(el).outerWidth(),
        offRight = $(el).position().left + $(el).outerWidth() + 15, //
        offBottom = $(el).position().top + $(el).outerHeight() + 10,
        offCenter = $(el).position().left;

        targetTipBox = $(el).next(tipbox);

        if ( targetTipBox.hasClass('on') ) {
            targetTipBox.removeClass('on');
            tooltipClose(targetTipBox);
        } else if ( !$(el).hasClass('on') ) {
            targetTipBox.addClass('on');
            
            if ( targetTipBox.hasClass('ui-tooltipbox-top') ) {
                tooltipTopOpen ( targetTipBox, offTop, offCenter)
            } else if ( targetTipBox.hasClass('ui-tooltipbox-bottom') ) {
                tooltipBottomOpen ( targetTipBox, offBottom, offCenter)
            } else if ( targetTipBox.hasClass('ui-tooltipbox-left') ) {
                tooltipLeftOpen ( targetTipBox, offTop, offLeft)
            } else if ( targetTipBox.hasClass('ui-tooltipbox-right') ) {
                tooltipRightOpen ( targetTipBox, offTop, offRight)
            }
        }
    }
}

function tooltipTopOpen ( targetTipBox, top, center ) {
    targetTipBox.show().css({'top':top+'px', 'left':center+'px'}).focus();
}

function tooltipBottomOpen ( targetTipBox, top, center ) {
    targetTipBox.show().css({'top':top+'px', 'left':center+'px'}).focus();
}

function tooltipLeftOpen ( targetTipBox, top, left ) {
    targetTipBox.show().css({'top':top+'px', 'left':left+'px'}).focus();
}

function tooltipRightOpen ( targetTipBox, top, right )  {
    targetTipBox.show().css({'top':top+'px', 'left':right+'px'}).focus();
}

function tooltipClose ( targetTipBox ) {
    targetTipBox.removeAttr('style').hide();
    targetTipBox.removeClass('on');
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


/****** toggle ******/
function toggleCnt () {
    var toggleBtn = $('.ui-toggle-btn');
    var toggleLockItem = $('.qna-item-lock');

    toggleBtn.on('click', function () {
        var toggleOn = $(this).hasClass('toggle-on'),
            toggleCnt = $(this).parents('.ui-toggle').find('.ui-toggle-content');
            toggleCntSub = toggleCnt.find('ui-toggle-sub');

        if ( !toggleOn ) {
            $(this).addClass('toggle-on');
            $(this).parents('.ui-toggle').addClass('on');
            $(this).children('span').text('잡기');
            toggleCnt.removeClass('hide');

            // 상품상세 리뷰보기 영역
            if ( $(this).children('span').hasClass('txt-change') ) {
                $(this).children('span').text('닫기');
            }
        } else if ( toggleOn ) {
            $(this).removeClass('toggle-on');
            $(this).parents('.ui-toggle').removeClass('on');
            $(this).children('span').text('자세히 보기');
            toggleCnt.addClass('hide')

             // 상품상세 리뷰보기 영역
            if ( $(this).children('span').hasClass('txt-change') ) {
                $(this).children('span').text('더보기');
            }

            // 조회영역 서브컨텐츠
            if ( !toggleCntSub.hasClass('hide') ) {
                toggleCntSub.addClass('hide')
            }
        }
    })
    
    toggleLockItem.find('.btn-close').on('click',function(){
        $(this).closest('.detail-view').addClass('hide').closest('.ui-toggle').removeClass('on').find('.ui-toggle-btn').removeClass('toggle-on');
    });

}

function toggleHeight () {
    var toggleCnt = $('.ui-toggle-height');
        toggleBtn = $('.ui-toggle-btn'),
        showHeight = $('.show-line').outerHeight();
    
        toggleHeightClose ();

    toggleBtn.on('click', function () {
        var toggleOn = $(this).hasClass('toggle-on');

        if ( !toggleOn ) {
            $(this).addClass('toggle-on')
            toggleCnt.removeAttr('style')
        } else if ( toggleOn ) {
            $(this).removeClass('toggle-on');
            toggleHeightClose ();
        }
    })

    function toggleHeightClose () {
        toggleCnt.css({
            overflow : 'hidden',
            height : showHeight
        })
    }
}

function toggleSlide () {
    var toggleBtn = $('.ui-slide-btn');

    toggleBtn.on('click', function () {
        var toggleWrap = $(this).parent().parent('.ui-toggle-slide'),
            toggleCnt = toggleWrap.find('.ui-slide-content'),
            toggleCntSub = $(this).parent().next('.ui-slide-subcontent'),
            toggleOn = $(this).hasClass('toggle-on'),
            rightAction = $(this).prev('.right-item1'),
            rightActionBtn = rightAction.find('.ico-arrfill-toggle');

            if ( !toggleOn ) {
                $(this).addClass('toggle-on');
                toggleWrap.addClass('active');
                toggleCnt.slideDown(400);

                // 주문/결제 페이지의 이용약관 영역
                //if ( toggleWrap.hasClass('order-info-inner') ) {
                    rightActionBtn.addClass('on');
                    rightAction.find('.change-txt').text('내용감추기')
                    if ( rightAction.find('.on-txt').length ) {
                        rightAction.find('.on-txt').hide();
                    }
                //}
               
                if ( toggleCntSub.length ) {
                    toggleCntSub.slideDown(400);
                    rightActionBtn.addClass('on')
                }
                
            } else if ( toggleOn ) {
                $(this).removeClass('toggle-on');
                toggleWrap.removeClass('active');
                toggleCnt.slideUp(400);

                // 주문/결제 페이지의 이용약관 영역
                //if ( toggleWrap.hasClass('order-info-inner') ) { 
                    rightAction.find('.change-txt').text('내용보기')
                    if ( rightAction.find('.on-txt').length ) {
                        rightAction.find('.on-txt').show();
                        rightActionBtn.removeClass('on')
                    }
               // }

                toggleWrap.find('.ui-slide-subcontent').slideUp(400).removeClass('active');
                toggleWrap.find('.ico-arrfill-toggle').removeClass('on')
                toggleWrap.find('.ui-slide-btn').removeClass('toggle-on');
                toggleWrap.find('.ui-toggle-slide').removeClass('active');

                if ( toggleCntSub.length ) {
                    toggleCntSub.slideUp(400).removeClass('active');
                    rightActionBtn.removeClass('on')
                    
                }
            }
    })
}



/****** 주문결제 박스 스크롤 고정 ******/
// function paymentFix () {
//     sideFixArea = $('.side-fix-area');
//     payBox = sideFixArea.children('.payment-info-box');
//     payBoxPos = payBox.offset().top - 110;

//     $(document).on('scroll', function(){
//         docScroll = $(document).scrollTop();
//         contentHeight = $('.container').height(),
//         footHeight = $(".footer").outerHeight() + 175; // 275
//         payBoxHeight = payBox.height() + 62;

//         if ( docScroll > payBoxPos ){
//             sideFixArea.addClass('fixed');
//             payBox.removeAttr('style');
//             if ( docScroll >= contentHeight - footHeight - 100 ) {
//                 sideFixArea.addClass('static').find('.payment-info-box').css('top',-payBoxHeight)
//              } else {
//                 sideFixArea.removeClass('static')
//              }
//         } else {
//             sideFixArea.removeClass('fixed');
//         }
//     });
// }


/****** 비교담기 ******/
function closeToastPop () {
    $('.toast-pop').fadeOut();
    setTimeout(function () {
        $('.toast-pop').remove();
    },500)
}

function compareScrollFix () {
    var compareFixArea = $('.compare-layer-pop'),
    contentHeight = $('.container').height(),

    docScroll = $(document).scrollTop();
    footHeight = $(".footer").outerHeight() + 485; // 275

    if ( docScroll <= contentHeight - footHeight ) {
        compareFixArea.addClass('fixed')
       } else {
        compareFixArea.removeClass('fixed')
       }
    
    $(document).on('scroll', function(){
        docScroll = $(document).scrollTop();
        footHeight = $(".footer").outerHeight() + 485; // 275
        if ( docScroll <= contentHeight - footHeight ) {
            compareFixArea.addClass('fixed')
        } else {
            compareFixArea.removeClass('fixed')
        }
    });
}


/****** 아코디언 ******/
function accordionList () {
    var listWrap =  $('.ui-accordion').children('.ui-accordion-list'),
        click = listWrap.children('.ui-accordion-item').find('.ui-accordion-click');

    click.on('click', function () {
        var accrItem = $(this).parents('.ui-accordion-item'),
            view = accrItem.find('.ui-accordion-view'),
            list = $(this).parents('.ui-accordion-item');

        if ( !list.hasClass('active') ) {
            list.addClass('active').siblings('li').removeClass('active').find('.ui-accordion-view').addClass('hide');
            view.removeClass('hide')
        } else if ( list.hasClass('active') ) {
            list.removeClass('active');
            view.addClass('hide')
        }
    });
}


/****** 목록, 내용 더보기 ******/
function moreListView () {
    var viewList = $('.ui-more-list'),    
        
        moreBtn = viewList.next().children('.ui-more-btn')

    moreBtn.on('click', function () {
        listItem = $(this).parent().siblings('.ui-more-list').children('li');

        if ( !$(this).hasClass('on')) {
            listItem.not('.ui-show-item').addClass('ui-hidden-off')
            $(this).addClass('on').html('<span>닫기</span>');
        } else {
            listItem.not('.ui-show-item').removeClass('ui-hidden-off')
            $(this).removeClass('on').html('<i class="ico-plus"></i><span>더보기</span>');
        }
    });
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

    unselected = $(el).siblings('.upload-name').find('span').text();

    if (  $(el).parent('.filebox').hasClass('on') ) {
        $(el).siblings('.upload-name').find('span').text(filename);
        return false;
    } 
    $(el).parent('.filebox').addClass('on');
    $(el).siblings('.upload-name').find('span').text(filename);
    $(el).siblings('.upload-name').append('<button type="button" class="btn-x-xs ui-file-delete"><i class="ico-x-grey"></i><span class="blind">삭제</span></button>');
}

function fileRemove (el) {
   // var unselected = $(el).siblings('.upload-name').find('span').text();
    $(el).parents('.filebox').removeClass('on');
    $(el).siblings('.txt').text(unselected);
    $(el).parent('.upload-name').siblings('.upload-hidden').val('');
    $(el).remove();
}


/****** 식단상담 슬라이드 ******/
function planSwiperSlide () {
    var swiper = new Swiper('.meal-plan-list', {
        spaceBetween: 20,
        slidesPerView : 2,
        centeredSlides: false,
        autoplay: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
}


/****** 상품상세 탭, 옵션선택박스 ******/
function goodsTab () {
    var docHeight = $(window).height(),
        optionBox = $('.option-select-fix').find('.option-select-area'),
        optionBoxScroll = $('.ui-fix-option');

    optionBox.css('height',docHeight - 48);

    if ( optionBoxScroll.parents('.right-option-area').length ) {
        optionBoxScroll.css('max-height',docHeight - 390)
    } else {
        optionBoxScroll.css('max-height',docHeight - 590)
    }
    
    detailTab =  $('.ui-goods-tab');
    optionArea =  $('.option-select-fix');
    
    detailTab.find('a').on('click', function(){
        $('html,body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 500);
		$(this).parent("li").addClass("current");
		$(this).parent("li").siblings().removeClass("current");
    })

    $(document).on('scroll', function(){
        var docScroll = $(document).scrollTop(),  
            tabTop =  $('.goods-detail-wrap').offset().top - 48;

        if ( docScroll >= tabTop ){
            detailTab.addClass('fixed');
            optionArea.addClass('fixed');
        } else if ( docScroll < tabTop ) {
            detailTab.removeClass('fixed');
            optionArea.removeClass('fixed');
        }
        
        contentHeight = $('.container').height(),
        footHeight = $(".footer").outerHeight() + 275;

        if ( docScroll >= contentHeight - footHeight - 100 ) { // 300
            optionArea.addClass('static')
        } else {
            optionArea.removeClass('static')
        }

        // 스크롤 탭
        scrollTopChange ();
    });

    $(window).resize(function () {
        var docHeight = $(window).height();
        optionBox.css('height',docHeight - 48);
        if ( optionBoxScroll.parents('.right-option-area').length ) {
            optionBoxScroll.css('max-height',docHeight - 390)
        } else {
            optionBoxScroll.css('max-height',docHeight - 590)
        }
    })
}

function scrollTopChange () {
    var docScroll = $(document).scrollTop();

     $('[id^=detail-section]').each(function(){
        if( docScroll + 180 > $(this).offset().top ){
            var sectionName = $(this).attr('id');
            var scrollNav = $('.tab-detail a[href$="' + sectionName + '"]').parent('li');
            
            scrollNav.siblings('li').removeClass('current');
            scrollNav.addClass('current');
        } 
    }); 
} //


/****** 상품상세 옵션선택 고정 ******/
function optionFix () {
    $(document).on('scroll', function(){
        var docScroll = $(document).scrollTop(),  
            optionBox =  $('.option-select-fix'),
            optionTop = optionBox.offset().top - 48

        if( docScroll >= optionTop ){
            optionBox.addClass('fixed');
        } else {
            optionBox.removeClass('fixed');
        }

        //console.log(optionTop, docScroll)
    });
}


/****** 상품상세 설명 전체보기 ******/
function moreArticle() {    
    var detailContent = $('.ui-more-article'),
        detailBtn = $('.ui-all-content')

    detailBtn.on('click', function () {
        var toggleOn = $(this).hasClass('toggle-on');
        if ( !toggleOn ) {
            $(this).addClass('toggle-on');
            detailContent.addClass('active')
            $(this).children('span').text('상품설명 접기')
        } else if ( toggleOn ) {
            $(this).removeClass('toggle-on');
            detailContent.removeClass('active')
            $(this).children('span').text('상품설명 전체보기')
        }
    })
}


/****** 장바구니 이동 팝업 ******/
function cartPopOpen (el) {
	$(el).siblings('.cart-pop').addClass('on')
}

function cartPopClose (el) {
    $(el).parents('.cart-pop').removeClass('on')
}


/****** review 상세 슬라이드 ******/
function reviewSwiperSlide () {
    var  reviewSwiper = new Swiper('.review-detail-slide', {
        slidesPerView : 1,
        centeredSlides: true,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        effect : false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        nested: true,
        touchRatio:false,
    });

    var  reviewInnerSwiper = new Swiper('.inner-pop-slide', {
        slidesPerView : 1,
        centeredSlides: true,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        touchRatio: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

}


/****** toggleLayer ******/
function toggleLayer () {
    togglelayerBtn = $('.ui-togglelayer-btn');
    togglelayerBox = $('.ui-togglelayer-box');
    toggleDimm = $('.dimm');

    togglelayerBtn.on('click',function () {
        if ( !togglelayerBox.hasClass('on') ) {
            $(this).addClass('toggle-on');
            togglelayerBox.addClass('on');
            if(togglelayerBtn.hasClass('refrig-toggle')){
                toggleDimm.show();
                $('body').css('overflow','hidden');
            }
        } else if ( togglelayerBox.hasClass('on') ) {
            $(this).removeClass('toggle-on');
            togglelayerBox.removeClass('on')
            if(togglelayerBtn.hasClass('refrig-toggle')){
                toggleDimm.hide();
                $('body').css('overflow','visible');
            }
        }


        $('.btn-area button').on('click',function(e){
            if($(e.target).closest('.ui-togglelayer-btn').length === 0 && $('.ui-togglelayer-btn').hasClass('toggle-on')){
                togglelayerBox.removeClass('on');
                togglelayerBtn.removeClass('toggle-on');
                toggleDimm.hide();
                $('body').css('overflow','visible');
            }
        }) 
    })
}


/****** 브랜드 검색 ******/
function brandSearch () {
    brandsearchBtn = $('.ui-brand-search');
    brandsearchArea = $('.brand-search-area');
    brandDim = brandsearchArea.find('.dim');
    docH = $(document).height() - 185;

    brandsearchBtn.on('click',function () {
        if ( !brandsearchArea.hasClass('on') ) {
            $(this).addClass('on');
            brandsearchArea.addClass('on');
            brandDim.css('height',docH)
        } else if ( brandsearchArea.hasClass('on') ) {
            brandSearchClose ()
        }
    })

    brandDim.on('click', function () {
        brandSearchClose ()
    })
}

function brandSearchClose () {
    brandsearchBtn.removeClass('on')
    brandsearchArea.removeClass('on');
    brandDim.removeAttr('style')
}


/****** 브랜드관 슬라이드 ******/
function brandSwiperSlide () {
    $('.brand-swiper-list').each(function(index, element){
        var $this = $(this);
        $this.addClass('brand-swiper-' + index);

        var brandSetColum4 = {
            spaceBetween: 20, 
            observer: true,
            observeParents: true,
            slidesPerGroup : 4,
            slidesPerView : 4 ,
            touchRatio: false,
            watchOverflow: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }

        var brandSetColum5 = {
            spaceBetween: 25, 
            observer: true,
            observeParents: true,
            slidesPerGroup : 5,
            slidesPerView : 5,
            touchRatio: false,
            watchOverflow: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }

        var brandSetColum1= {
            spaceBetween: 0, 
            observer: true,
            observeParents: true,
            slidesPerGroup :1,
            slidesPerView : 1,
            touchRatio: false,
            watchOverflow: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }

        var brandSetColum5_page = {
            spaceBetween: 25, 
            observer: true,
            observeParents: true,
            slidesPerGroup : 5,
            slidesPerView : 5,
            touchRatio: false,
            watchOverflow: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        }

        var brandSetColum1_page = {
            spaceBetween: 0, 
            observer: true,
            observeParents: true,
            slidesPerGroup :1,
            slidesPerView : 1,
            touchRatio: false,
            watchOverflow: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        }

        if ( $this.hasClass('column4') ) {
            var  brandSwiper = new Swiper('.brand-swiper-' + index, brandSetColum4)
        } else if ( $this.hasClass('column5') ) {
            var  brandSwiper = new Swiper('.brand-swiper-' + index, brandSetColum5)
            if ( $this.hasClass('page-slide-note') ) {
                var  brandSwiper = new Swiper('.brand-swiper-' + index, brandSetColum5_page)
            }
        } else if ( $this.hasClass('column1') ) {
            var  brandSwiper = new Swiper('.brand-swiper-' + index, brandSetColum1)
            if ( $this.hasClass('page-slide-note') ) {
                var  brandSwiper = new Swiper('.brand-swiper-' + index, brandSetColum1_page)
            }
        }  
    });
}


/****** 이달의 특가 ******/
function anchorMove () {
    var anchorList = $('.ui-anchor-tab');

    anchorList.find('a').on('click', function(){
        if ( $(this).parents('.ui-anchor-tab').hasClass('select-nav-list') ) {
            var topH = 100;
        } else {
            var topH = 200;
        }
        $('html,body').animate({
            scrollTop: $($(this).attr('href')).offset().top - topH
        }, 500);
    })
}

function selectBarFix () {
    var barTop =  $('.scroll-select-bar').offset().top - 48;

    $(document).on('scroll', function(){
        var docScroll = $(document).scrollTop();
        
        if ( docScroll >= barTop ){
            $('.scroll-select-bar').addClass('fixed');
        } else if ( docScroll < barTop ) {
            $('.scroll-select-bar').removeClass('fixed');
        }
        scrollSelectBarChange();
        selectBarChange();
    });
}


function scrollSelectBarChange () {
    var docScroll = $(document).scrollTop();

     $('[id^=special-div]').each(function(){
        if( docScroll + 180 > $(this).offset().top ){
            var sectionName = $(this).attr('id');
            var scrollNav = $('.select-nav-list a[href$="' + sectionName + '"]').parent('li');
            
            scrollNav.siblings('li').removeClass('on');
            scrollNav.addClass('on');
        } 
    }); 
} //


function selectBarChange () {
    $('.select-nav-list').children('li').each(function () {
        var listValue = $(this).find('span').text();
        if ( $(this).hasClass('on') ) {
            $(this).parents('.select-nav-box').find('.select-nav-value').children('.txt').text(listValue)
        } 
    });
}


/****** 베스트 랭킹 swiperTab  rankTabSwiperSlide ******/
function rankTabSwiperSlide () {
    var rankTabSwiper = new Swiper('.ranking-swiper-tab', {
        slidesPerView : "auto",
        touchRatio:true,
    });
}


/****** 1팩담기 ******/
function onepackLayer (el) {
    if ( !$(el).parents('.onepack-layer-box').hasClass('toggle-on') ) {
        $(el).parents('.onepack-layer-box').addClass('toggle-on')
    } else if ( $(el).parents('.onepack-layer-box').hasClass('toggle-on') ) {
        $(el).parents('.onepack-layer-box').removeClass('toggle-on')
    }
}
 

/****** 베스트 랭킹 rankTabSwiperSlide ******/
function bestPrdSwiperSlide () {
    var bestPrdSwiper = new Swiper('.best-prd-list', {
        spaceBetween: 20, 
        slidesPerGroup :5,
        slidesPerView : 5,
        centeredSlides: false,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

/****** 카드등록 목록 ******/
//var cardSwiper = null;

function cardSwiperSlide () {

   // if(cardSwiper != null) cardSwiper.destroy();
    
    var cardSwiper = new Swiper('.card-box-list', {
      //  spaceBetween: 25, 
        slidesPerView: 'auto',
        centeredSlides: true,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        touchRatio: true,
       // loop: true,
    });

    //cardSwiper.init();
}


/****** 베스트 구매후기 슬라이드 ******/
function bestReviewSwiperSlide () {
    var mainSwiper = new Swiper('.best-review-slide', {
        slidesPerView : 1,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

/****** 1팩담기 슬라이드 ******/
function one_pack_slide () { 
    $('.one-pack-slide').each(function(index, element){
        var $this = $(this);
        $this.addClass('item-slide' + index);
        var slideSetArr = {
            slidesPerView: 2.5,
            loop: false,
            spaceBetween: 10,
            touchRatio: true,
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: false,
              },
        }

        if ( $this.hasClass('prd-centerd-view1') ) {
            var itemSwiper = new Swiper('.item-slide' + index, slideCenterSet1)
        } else if ( $this.hasClass('prd-view2') ) {
            var itemSwiper = new Swiper('.item-slide' + index, slideSet2)
        } else if ( $this.hasClass('prd-arr-view') ) {
            var itemSwiper = new Swiper('.item-slide' + index, slideSetArr)
        }
        
    });
}

// 추천상품 스와이프
function recommPrdSwiperSlide () {
    var recommPrdSwiper = new Swiper('.recomm-prod-list', {
        spaceBetween: 10, 
        slidesPerGroup: 1,
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },pagination: {
            el: '.swiper-pagination', 
            type: 'fraction' 
        }
    });
}


//이미지 슬라이드
function imgSwiper () {
    var mainSwiper = new Swiper('.img-slide', {
        slidesPerView : 1,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
}
