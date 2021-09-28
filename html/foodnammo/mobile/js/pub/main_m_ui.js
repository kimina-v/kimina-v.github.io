$(function () { 
    // 메인비주얼
    if ($('.main-visual-area').length > 0) { mainSwiperSlide(); }

    if ($('.main-item-slide').length > 0) { mainItemSlide(); }

    if ($('.event-item-slide').length > 0) { eventSwiperSlide(); }
    //환상 꿀조합
    if ($('.recomm-mix').length > 0) { recommMixSlide(); }
});


/****** 메인비주얼 ******/
function mainSwiperSlide () {
    var mainSwiper = new Swiper('.main-slide', {
        slidesPerView : 1,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
    });
}


/****** 이벤트 배너 ******/
function eventSwiperSlide () {
    var mainSwiper = new Swiper('.event-item-slide', {
        slidesPerView : 1,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}


/****** 상품 슬라이드 ******/
function mainItemSlide () { 
    $('.main-item-slide').each(function(index, element){
        var $this = $(this);
        $this.addClass('item-slide' + index);

        var slideCenterSet1 = {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
        }

        var slideSet2 = {
            spaceBetween:17, 
            observer: true,
            observeParents: true,
            slidesPerGroup : 2,
            slidesPerView : 2,
            touchRatio: true,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
        }

        var slideSetArr = {
            slidesPerView: 2.5,
            loop: false,
            spaceBetween: 10,
            touchRatio: true,
        }

        var slideSetArr2 = {
            slidesPerView: 1.3,
            loop: false,
            spaceBetween: 10,
            touchRatio: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
        }

        if ( $this.hasClass('prd-centerd-view1') ) {
            var itemSwiper = new Swiper('.item-slide' + index, slideCenterSet1)
        } else if ( $this.hasClass('prd-view2') ) {
            var itemSwiper = new Swiper('.item-slide' + index, slideSet2)
        } else if ( $this.hasClass('prd-arr-view') ) {
            var itemSwiper = new Swiper('.item-slide' + index, slideSetArr)
        } else if ( $this.hasClass('prd-arr-view2') ) {
            var itemSwiper = new Swiper('.item-slide' + index, slideSetArr2)
        }
        
    });
}



//환상의 꿀조합을 찾아서
function recommMixSlide(){
    var recommMixMenu = new Swiper('.recoom-mix-menu', {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var menuTarget = $('.recoom-mix-menu .swiper-slide button');
    menuTarget.click(function(){
        recommMixMenu.slideTo($(this).parent().index()-1)			
    })
    var recommMixCont = new Swiper('.recomm-mix-cont', {
        autoHeight: true,
        observer: true,
        observeParents: true,
        spaceBetween: 10,
        thumbs: {
            swiper: recommMixMenu
        }
    });
}