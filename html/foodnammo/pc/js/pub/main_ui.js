$(function () { 
    // 메인비주얼
    if ($('.main-visual-area').length > 0) { mainSwiperSlide(); }

    // 타임세일
    if ($('.sales-slide').length > 0) { saleSwiperSlide(); }

    // 기획특가
    if ($('.event-slide').length > 0) { eventSwiperSlide(); }

    // 종류별 인기 상품 - 카테고리
    if ($('.category-slide').length > 0) { categorySwiperSlide(); }
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
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });

    $('.swiper-button-ctrl').on('click', function () {
        if ( !$(this).hasClass('play') ) {
            mainSwiper.autoplay.stop();
            $(this).addClass('play')
            //console.log('autoplay stop')
        } else {
            mainSwiper.autoplay.start(); 
            $(this).removeClass('play')
            //console.log('autoplay start')
        }
    })
}


/****** 타임세일 특가 ******/
function saleSwiperSlide () {
    var swiperTarget = $('.sales-slide');
    var saleSlide = $('.sales-slide').find('.swiper-slide');
    var saleItemLen = saleSlide.length;

    var slideSetColum3 = {
        spaceBetween: 30, 
        observer: true,
        observeParents: true,
        slidesPerGroup : 3,
        slidesPerView : 3 ,
        touchRatio: false,
        watchOverflow: true,
        pagination: {
        el: '.swiper-pagination-num',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
    }

    var slideSetColum2 = {
        spaceBetween: 140, 
        observer: true,
        observeParents: true,
        slidesPerGroup : 2,
        slidesPerView : 2 ,
        touchRatio: false,
        watchOverflow: true,
        pagination: {
        el: '.swiper-pagination-num',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
    }

    var slideSetColum1 = { 
        spaceBetween: 0, 
        observer: true,
        observeParents: true,
        slidesPerGroup : 1,
        slidesPerView : 1 ,
        touchRatio: false,
        watchOverflow: true,
    }

    if (saleItemLen >= 3) {
        swiperTarget.addClass('slide-set-colum3');
        var saleSwiper = new Swiper(swiperTarget, slideSetColum3)
    } else if (saleItemLen == 2) {
        swiperTarget.addClass('slide-set-colum2').find('.swiper-page-wrap').hide();
        var saleSwiper = new Swiper(swiperTarget, slideSetColum2)
    } else if (saleItemLen == 1) {
        swiperTarget.addClass('slide-set-colum1').find('.swiper-page-wrap').hide();
        var saleSwiper = new Swiper(swiperTarget, slideSetColum1)
    }
}

/****** 기획특가 ******/
function eventSwiperSlide () { 
    $('.event-slide').each(function(index, element){
        var $this = $(this);
        $this.addClass('event-' + index);

        var eventSwiper = new Swiper('.event-' + index, {
            spaceBetween: 54,
            observer: true,
            observeParents: true,
            slidesPerGroup : 3,
            slidesPerView : 3,
            touchRatio: false,
            watchOverflow: true,
            navigation: {
                nextEl: $('.event-' + index).find('.swiper-button-next'),
                prevEl: $('.event-' + index).find('.swiper-button-prev'),
            },
        });
    });
}

/****** 종류별 인기 상품 - 카테고리 ******/
//var categorySwiper = null;
function categorySwiperSlide () { 
     $('.category-slide').each(function(index, element){
        var $this = $(this);
        $this.addClass('instance-' + index);

        //if(categorySiper != null) categorySwiper.destroy();

        var categorySwiper = new Swiper('.instance-' + index, {
            observer: true,
            observeParents: true,
            slidesPerView : 1,
            touchRatio: false,
            navigation: {
                nextEl: $('.instance-' + index).find('.swiper-button-next'),
                prevEl: $('.instance-' + index).find('.swiper-button-prev'),
            },
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination-num',
                clickable: true,
                renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            },
        });

        var categoryMenu = $(this).parents('.tab-cate-area').siblings('.tab-category-wrap').find('.tab-category-menu');
        var classType = categoryMenu.attr('class').split(' ')[1];
       
        if ( categoryMenu.length ) {
            $(this).find('.swiper-pagination-num').addClass(classType);
        }
    });
}
