$(document).ready(function () {

    //특급/일반배송 클릭 시
    $("input[name=expressDlv]").on('click', function (event) {
        if ($(this).is(':checked') && $(this).val() == 'Y') {//특급배송 선택 시
            $(".dlv_express_chk_area").show();
            $(".dlv_normal_chk_area").hide();
            $('input[name=addColdProdcd]').val("");
            fnGetPrice();
        } else if ($(this).is(':checked') && $(this).val() == 'N') {//일반배송 선택 시
            $(".dlv_express_chk_area").hide();
            $(".dlv_normal_chk_area").show();
            $('input[name=addColdProdcd]').val("");
            fnGetPrice();
        }
    });

    //특급배송 마감
    $(".text-throu").on('click', function (event) {
        alert('오늘 저녁 도착 배송 접수는\n오후 1시에 마감 되었습니다.');
    });

});

//주문 금액 계산 AJAX
function fnGetPrice() {

    cmAjax({
        url: "/order/order/getPriceAjax"
        , type: "post"
        , data: $("form[name='ordFrm']").serialize()
        , dataType: "json"
        , success: function (data) {
            console.log("data:" + JSON.stringify(data));
            if (data.status == "succ") {
                var obj = data.object;
                var totPrice = obj.totPrice;
                var saleCartCoupon = obj.saleCartCoupon;
                var totUsePoint = obj.totUsePoint;
                var totSalePrice = 0;
                var expressDlv = obj.expressDlv;//특급배송 선택 여부
                var expressPostFlag = obj.expressPostFlag;//특급배송가능지역여부
                var dlvExpressPrice = obj.dlvExpressPrice;//특급배송비
                var totIslandDlvPrice = obj.totIslandDlvPrice;//도서산간배송비
                var totDlvPrice = obj.totDlvPrice;//배송비 총합
                var dlvNormalPrice = obj.dlvNormalPrice;//일반상품 배송비
                var addColdPrice = obj.addColdPrice;
                var nonmemberYn = obj.nonmemberYn;
                console.log('obj:' + JSON.stringify(obj));
                console.log('totDlvPrice:' + totDlvPrice + '|dlvNormalPrice:' + dlvNormalPrice + '|dlvExpressPrice:' + dlvExpressPrice + '|totIslandDlvPrice:' + totIslandDlvPrice);

                $('#txt_sale_coupon').text('-' + SetNumComma(saleCartCoupon) + '원');
                $('#text_use_coupon').val(SetNumComma(saleCartCoupon));
                totSalePrice += parseInt(saleCartCoupon);

                $('#txt_use_point').text('-' + SetNumComma(totUsePoint) + '원');
                $("#usePoint").val(totUsePoint);
                $("#textUsePoint").val(SetNumComma(totUsePoint));
                totSalePrice += parseInt(totUsePoint);

                $('#txt_tot_sale_price').text('-' + SetNumComma(totSalePrice));

                var totPrice = parseInt($('input[name=tot_price]').val());//상품금액
                //var totDlvPrice = parseInt($('input[name=tot_dlv_price]').val());//배송비

                if (addColdPrice > 0) {
                    $('#txt_add_cold_price').text('(보냉제 추가 ' + SetNumComma(addColdPrice) + '원 포함)');
                    $('#txt_add_cold_price').show();
                } else {
                    $('#txt_add_cold_price').hide();
                }

                totPrice += addColdPrice;
                $('#txt_tot_price').text(SetNumComma(totPrice));

                totDlvPrice += dlvExpressPrice;
                $("#txt_tot_dlv_price").text(SetNumComma(totDlvPrice));
                $('input[name=tot_dlv_price]').val(totDlvPrice);

                if (totIslandDlvPrice > 0) {
                    $('#txt_island').show();
                    $('#txt_normal_dlv_price').html('<span>' + SetNumComma(dlvNormalPrice + totIslandDlvPrice) + ' 원 (도서산간 배송비)</span>');
                } else {
                    $('#txt_island').hide();
                    if (dlvNormalPrice == 0) {
                        $('#txt_normal_dlv_price').html('<span>무료배송</span>');
                    } else {
                        $('#txt_normal_dlv_price').html('<span>' + SetNumComma(dlvNormalPrice) + ' 원</span>');
                    }
                }

                totPrice = totPrice + totDlvPrice - totSalePrice;

                $('input[name=tot_pg_price]').val(totPrice);//결제금액
                $('#txt_tot_pg_price').text(SetNumComma(totPrice));
                $('#txt_btn_payment').text(SetNumComma(totPrice) + '원 결제하기');

                if (expressPostFlag == 'true') {
                    $('#dlvDlvTypeChk').show();
                } else {
                    $('#dlvDlvTypeChk').hide();
                }

                if (nonmemberYn == 'N') {
                    if (saleCartCoupon == 0 && $('input[name=cartCouponid]').val() != '') {
                        $('input[name=cartCouponid]').val('');
                        alert('쿠폰을 적용 할 수 없습니다.');
                    }
                }

            }
        }
        , error: function (e) {
            console.log(JSON.stringify(e));
        }
    });

}

//결제하기 버튼 클릭
function fnCheckOrder() {

    var frm = document.ordFrm;

    //약관동의 체크
    if (!frm.check_terms.checked) {
        alert('구매조건 및 이용약관에 동의해주세요.');
        return false;
    }

    //주문자 정보 체크
    if ($.trim(frm.orderName.value) == '') {
        alert("주문하시는분 이름을 입력해 주세요");
        return false;
    }

    if (frm.orderCell2 != undefined) {
        if ($.trim(frm.orderCell2.value) != '') {
            frm.orderCell.value = $("#orderCell1").data('value') + frm.orderCell2.value;
        }
    }
    if ($.trim(frm.orderCell.value) == '') {
        alert("주문하시는 분 휴대전화 번호를 공백없이 숫자로 입력해주세요.");
        return false;
    }
    //TODO 전화번호 유효성 검사 추가
    if ($.trim(frm.orderCell.value) == '') {
        alert("주문하시는 분 휴대전화 번호를 공백없이 숫자로 입력해주세요.");
        return false;
    }
    if ($.trim(frm.orderEmail.value) == '') {
        alert("주문하시는 분 이메일주소를 입력해주세요.");
        return false;
    }
    //TODO 이메일 유효성 검사 추가
    if ($.trim(frm.orderEmail.value) == '') {
        alert("주문하시는 분 이메일 형식이 정확하지 않습니다.");
        return false;
    }

    //배송지 정보 체크
    if ($.trim(frm.receiverName.value) == '') {
        alert("받으실 분 이름을 입력해주세요.");
        return false;
    }
    if (frm.receiverCell2 != undefined) {
        if ($.trim(frm.receiverCell2.value) != '') {
            frm.receiverCell.value = $("#receiverCell1").data('value') + frm.receiverCell2.value;
        }
    }

    if ($.trim(frm.receiverCell.value) == '') {
        alert("받으실 분 휴대전화 번호를 공백없이 숫자로 입력해주세요.");
        return false;
    }
    //TODO 전화번호 유효성 검사 추가
    if ($.trim(frm.receiverCell.value) == '') {
        alert("받으실 분 휴대전화 번호를 공백없이 숫자로 입력해주세요.");
        return false;
    }
    if ($.trim(frm.receiverPost.value) == '') {
        alert("배송지 우편번호를 입력해주세요.");
        return false;
    }
    if ($.trim(frm.receiverAddr.value) == '') {
        alert("배송지 기본주소를 입력해주세요.");
        return false;
    }
    if ($.trim(frm.receiverAddrDtl.value) == '') {
        alert("배송지 상세주소를 입력해주세요.");
        return false;
    }

    let today = new Date();
    let hours = today.getHours();// 시
    let minutes = today.getMinutes();//분
    console.log('hours:' + hours + '|minutes:' + minutes);


    //특급배송 일 경우
    if ($('input[name=expressDlv]:checked').val() == 'Y') {
        //저녁 도착 예정 선택 시
        if ($('input[name=dayDawnChk]:checked').val() == 'DAY') {
            if (hours >= 13 && hours <= 16) {
                alert('오늘 저녁 도착 접수 마감!');
                return false;
            }
        }
        var commentData = $("#div_express_comment").attr('data-value');
        console.log('expressCommentData:' + commentData);
        //공동현관 출입방법 필수
        if (commentData == '') {
            alert('공동현관 출입방법을 선택하세요.');
            return false;
        } else if (commentData == '2') {
            if ($.trim($('input[name=express_memo1]').val()) == '') {
                alert('공동현관 비밀번호를 입력하세요.');
                return false;
            }
        } else if (commentData == '3') {
            if ($.trim($('input[name=express_memo2]').val()) == '') {
                alert('새벽시간 통화 가능한 연락처를 입력해주세요.');
                return false;
            }
        } else if (commentData == '5') {
            alert('관공서, 군부대, 병원 등 공동현관 출입불가\n배송지는 특급배송으로 주문할 수 없습니다.\n일반배송으로 주문해주세요.');
            return false;
        } else if (commentData == '6') {
            if ($.trim($('input[name=express_memo3]').val()) == '') {
                alert('공동현관 출입 방법을 입력해주세요.');
                return false;
            }
        }
        var commentText = '';
        $("#div_express_comment").find('li').each(function () {
            if ($(this).attr('data-name') == commentData) {
                commentText = $(this).find('span').text();
                console.log('commentText:' + commentText);
                return;
            }
        });
        $("input[name=dlvCommentCd]").val(commentData);
        $("input[name=dlvCommentText]").val(commentText);
    } else {
        var commentData = $("#div_normal_comment").attr('data-value');
        var commentText = '';
        if (commentData != '') {
            $("#div_normal_comment").find('li').each(function () {
                if ($(this).attr('data-name') == commentData) {
                    commentText = $(this).find('span').text();
                    console.log('commentText:' + commentText);
                    return;
                }
            });
        }
        $("input[name=dlvCommentCd]").val(commentData);
        $("input[name=dlvCommentText]").val(commentText);
    }

    var payType = frm.payType.value;

    //결제수단 체크 확인
    if (payType == "CARD") {
        frm.payCard.value = $("#div_pay_card").attr('data-value');
        if (frm.payCard.value == '') {
            alert("카드를 선택해 주세요.");
            return false;
        }
        frm.cardInst.value = $('#div_card_inst').attr('data-value');

    } else if (payType == "VBANK") {
        frm.payVbank.value = $("#div_pay_vbank").attr('data-value');
        if (frm.payVbank.value == '') {
            alert("입금 은행을 선택해주세요.");
            return false;
        }
        if ($.trim(frm.depositNm.value) == '') {
            alert("무통장 입금자명을 입력해주세요.");
            return false;
        }
        //현금영수증 발행 체크
        if (frm.cash_re.checked) {
            if ($.trim(frm.cashRegNum.value) == '') {
                alert("현금영수증 정보를 입력해주세요.");
                return false;
            }
        }
    }

    if ($('input[name=tot_pg_price]').val() < 0) {
        alert('결제금액을 확인해주세요.');
        return false;
    }

    $('#ordFrm').attr('action', "/order/order/orderCheckIframe");
    $('#ordFrm').attr('target', 'hiddenIframe');
    $('#ordFrm').submit();

}

function openUserDeliveryListPop() {
    $('#userDeliveryListPop').load("/order/order/userDeliveryList");
}
