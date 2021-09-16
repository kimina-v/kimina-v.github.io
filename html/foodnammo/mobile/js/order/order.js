$(document).ready(function () {

    // 배송요청사항 직접입력 선택시
    $('#select-item1').change(function () {
        var result = $('#select-item1 option:selected').val();
        $(this).siblings('.ui-direct-input').addClass('hide')
        if (result === '1') {
            $('#direct-item-1').removeClass('hide');
        }

    });

    // 공동현관 출입 선택시
    $('#select-item2').change(function () {
        var result = $('#select-item2 option:selected').val();
        $(this).siblings('.ui-direct-input').addClass('hide')
        if (result === '2') {
            $('#direct-item-2').removeClass('hide').siblings('.ui-direct-input').addClass('hide')
        } else if (result === '3') {
            $('#direct-item-3').removeClass('hide').siblings('.ui-direct-input').addClass('hide')
        } else if (result === '6') {
            $('#direct-item-6').removeClass('hide').siblings('.ui-direct-input').addClass('hide')
        }
    });

    // 현금영수증 발행
    $('#check-receipt').on('click', function () {
        var checked = $(this).is(':checked')
        if (checked) {
            $(this).parent().siblings('.ui-select-receipt').removeClass('hide')
        } else if (!checked) {
            $(this).parent().siblings('.ui-select-receipt').addClass('hide')
        }
    });

    var uiRadioBtn = $('.radio-box-grid'),
        uiCont = $('.payment-detail-wrap').children('.payment-detail');

    uiRadioBtn.on('click', function () {
        uiCont.eq(uiRadioBtn.index(this)).addClass('active').siblings().removeClass('active');
    })
});