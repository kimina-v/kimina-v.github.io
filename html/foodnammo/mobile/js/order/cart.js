/**
 * @author: chaek 2021-09-24 ~
 */
$(document).ready(function () {
    console.log('mobile cart.js');
    $('.cart-list-area').each(function (i, v) {
        const id = $(this).attr('id');
        const productCnt = $('#' + id + ' .inner').length;
        $('#' + id + ' .list-head .list-item-tit .num').text('(' + productCnt + ')');
    })
    addBtnEvent();
});

function addBtnEvent() {
    $('.btn-qty').on('click', updateProductQty);
    $('.deleteUserCart').on('click', deleteUserCart);
    $('#checkAll').on('click', checkAll);
    $('.checkboxGroup').on('click', checkDeliveryGroup);
    $('#deleteUserCartList').on('click', deleteUserCartList);
    $('.checkbox').on('click', calculateTotalOrderPrice);
    $('.useCoupon').on('click', getProductCoupon);
    $('#useCoupon').on('click', couponApply);
    $('.close').on('click', closePop);
    $(document).on('click', '.radio.type-box', calcDiscount);
    $('#order').on('click', order);

}

function updateProductQty(e) {
    const vCartid = this.dataset.vCartid;
    const calculate = this.dataset.calculate;
    const vProductcd = this.dataset.vProductcd;
    const vDlvGroupCd = this.dataset.vDlvGroupCd;
    const oriQty = parseInt($("#qty-" + vCartid).val());
    let nQty = oriQty;
    const nMaxQty = $('#qty-' + vCartid).data("max-qty");

    if (calculate == 'ADD') {
        $("#qty-" + vCartid).val(oriQty + 1);
        nQty = oriQty + 1;
        if (nMaxQty > 0 && nQty > nMaxQty) {
            alert("최대 " + nMaxQty + "개까지 구매 가능한 상품입니다.");
            $("#qty-" + vCartid).val(oriQty);
            return;
        }
    } else if (calculate == 'SUBTRACT') {
        if (nQty > 1) {
            nQty = oriQty - 1;
            if (nMaxQty > 0 && nQty > nMaxQty) {
                nQty = nMaxQty;
            }
            $("#qty-" + vCartid).val(nQty);
        } else {
            return;
        }
    } else {
        return;
    }

    const data = {
        vCartid: encodeURIComponent(vCartid),
        calculate: encodeURIComponent(calculate),
        vProductcd: encodeURIComponent(vProductcd),
        nQty: encodeURIComponent(nQty),
        vCartType: encodeURIComponent('01')
    }
    console.log(data);
    cmAjax({
        url: '/order/cart/updateProductQtyAjax'
        , type: "post"
        , data: {
            data: JSON.stringify(data)
        }
        , dataType: "json"
        , success: function (data) {
            console.log(data);
            if (data.status == 'succ') {
                calculateCartPrice(data.object);
                calculateDeliveryProductPrice(vProductcd);
                checkFreeDelivery(vDlvGroupCd);
                calculateTotalOrderPrice();
            } else {
                alert(data.message);
            }
        }
        , error: function (e) {
            console.log(e);
        }
    });

}

function calculateCartPrice(obj) {
    $.each(obj, function (i, v) {
        $('#cart-price-' + v.VCartid).text(SetNumComma(v.NCalcCartSalePrice));
    });
}

function calculateDeliveryProductPrice(vProductcd) {
    console.log('calculateDeliveryProductPrice ---');
    console.log('vProductcd', vProductcd);
    let totalProductPrice = 0;
    $('#delivery-product-' + vProductcd + ' .price .num').each(function (i, v) {
        totalProductPrice += fnOnlyNumber($(this).text()).number;
    });
    $('#delivery-product-' + vProductcd + ' .bottom-price-box .num:eq(0)').text(SetNumComma(totalProductPrice));

    const discountPrice = fnOnlyNumber($('#delivery-group-' + vProductcd + ' .bottom-price-box .num:eq(1)').text()).number;
    const numTotal = totalProductPrice - discountPrice;
    $('#delivery-product-' + vProductcd + ' .bottom-price-box .num-total').text(SetNumComma(numTotal));
}

function checkFreeDelivery(vDlvGroupCd) {
    console.log('checkFreeDelivery---');
    console.log('vDlvGroupCd', vDlvGroupCd);
    $('#delivery-group-' + vDlvGroupCd + ' .right-dlv-info').children().hide();

    const groupFreeDeliveryPrice = parseInt($('#delivery-group-' + vDlvGroupCd).data('freeDeliveryPrice'));
    console.log('groupFreeDeliveryPrice', groupFreeDeliveryPrice);
    let groupProductPrice = 0;

    $('#delivery-group-' + vDlvGroupCd + ' .productCheckbox:checked').each(function (i, v) {
        const vProductcd = this.dataset.vProductcd;
        $('#delivery-product-' + vProductcd + ' .price .num').each(function (j, vv) {
            const price = fnOnlyNumber($(this).text()).number;
            console.log('vProductcd', vProductcd, ', price', price);
            groupProductPrice += price;
        });
    });

    console.log('groupProductPrice', groupProductPrice, ', groupFreeDeliveryPrice', groupFreeDeliveryPrice);
    if (groupProductPrice > groupFreeDeliveryPrice) {
        $('#delivery-group-' + vDlvGroupCd + ' input[name=calcDeliveryPrice]').val(0);
        $('#delivery-group-' + vDlvGroupCd + ' .right-dlv-info p').show();
    } else {
        const defaultDeliveryPrice = $('#delivery-group-' + vDlvGroupCd + ' input[name=defaultDeliveryPrice]').val();
        $('#delivery-group-' + vDlvGroupCd + ' input[name=calcDeliveryPrice]').val(defaultDeliveryPrice);
        $('#delivery-group-' + vDlvGroupCd + ' .right-dlv-info p').hide();
    }
}

function calculateTotalOrderPrice() {

    function calcProductPrice() {
        let totalPrice = 0;
        $('.productCheckbox:checked').each(function (i, v) {
            const vProductcd = this.dataset.vProductcd;
            $('#delivery-product-' + vProductcd + ' .price .num').each(function (j, vv) {
                const price = fnOnlyNumber($(this).text()).number;
                totalPrice += price;
            });
        });
        return totalPrice;
    }

    function calcDiscountPrice() {
        let totalDiscount = 0;
        $('.productCheckbox:checked').each(function (i, v) {
            const vProductcd = this.dataset.vProductcd;
            $('#delivery-product-' + vProductcd + ' .bottom-price-box .discount').each(function (k, vv) {
                const discount = fnOnlyNumber($(this).text()).number;
                totalDiscount += discount;
            });
        });
        return totalDiscount;
    }

    function calcDeliveryPrice() {
        const vDlvGroupCdListTemp = [];
        $('.productCheckbox:checked').each(function (i, v) {
            vDlvGroupCdListTemp.push(this.dataset.vDlvGroupCd);
        });
        const vDlvGroupCdList = [...new Set(vDlvGroupCdListTemp)]; // 중복제거

        $.each(vDlvGroupCdList, function (i, vDlvGroupCd) {
            checkFreeDelivery(vDlvGroupCd);
        });

        let totalDelivery = 0;
        $('input[name=calcDeliveryPrice]').each(function (i, v) {
            totalDelivery += fnOnlyNumber($(this).val()).number;
        });
        return totalDelivery;
    }

    const totalProductPrice = calcProductPrice();
    const totalDiscountPrice = calcDiscountPrice();
    const totalDeliveryPrice = calcDeliveryPrice();

    const totalOrderPrice = totalProductPrice - totalDiscountPrice + totalDeliveryPrice;

    $('#totalProductPrice').text(SetNumComma(totalProductPrice));
    $('#totalDiscountPrice').text(SetNumComma(totalDiscountPrice));
    $('#totalDeliveryPrice').text(SetNumComma(totalDeliveryPrice));
    $('.totalOrderPrice').text(SetNumComma(totalOrderPrice));

}

function checkAll(e) {
    const checked = $('#checkAll').is(':checked');
    if (checked) {
        $('.cart-list-area .checkbox').prop('checked', true)
        $(this).next('label').text('전체해제')
    } else {
        $('.cart-list-area .checkbox').prop('checked', false);
        $(this).next('label').text('전체선택')
    }
    calculateTotalOrderPrice();
}

function checkDeliveryGroup(e) {
    const checked = $(this).is(':checked');
    const name = $(this).attr('name');
    if (checked) {
        $('input[name=' + name + ']').prop('checked', true);
    } else {
        $('input[name=' + name + ']').prop('checked', false);
    }
    calculateTotalOrderPrice();
}

// 단위테스트 이후에 deleteUserCart, deleteUserCartList 하나로 합치기
function deleteUserCart(e) {
    const deleteUserCartList = [];
    const data = {
        vCartid: encodeURIComponent(this.dataset.vCartid)
    }
    deleteUserCartList.push(data);

    callAjax('/order/cart/deleteUserCartAjax', deleteUserCartList);
}

// 단위테스트 이후에 deleteUserCart, deleteUserCartList 하나로 합치기
function deleteUserCartList(e) {

    const deleteUserCartList = [];
    $('.deleteUserCartList:checked').each(function (i, v) {
        const data = {
            vCartid: encodeURIComponent(this.dataset.vCartid)
        }
        deleteUserCartList.push(data);
    });

    if (deleteUserCartList.length === 0) {
        alert('삭제할 상품을 선택해주세요.');
        return;
    }

    if (confirm('선택한 상품을 장바구니에서 삭제하시겠습니까?')) {
        callAjax('/order/cart/deleteUserCartAjax', deleteUserCartList);
    }

}

function callAjax(url, obj) {
    cmAjax({
        url: url
        , type: 'POST'
        , data: {
            dataList: JSON.stringify(obj)
        }
        , dataType: "json"
        , success: function (data) {
            if (data.status == 'succ') {
                window.location.href = '/order/cart'
            }
        }
        , error: function (e) {
            console.log(e);
        }
    });
}

function getProductCoupon(e) {
    const vProductcd = this.dataset.vProductcd;
    let nSalePrice = 0;

    cmAjax({
        url: '/order/cart/getProductCoupon?vProductcd=' + vProductcd
        , type: "GET"
        , success: function (data) {
            data.vProductcd = vProductcd;
            setCoupon(data);
            setPrice(data);
            $('#popup-product-coupon').show();
        }
        , error: function (e) {
            console.log('e:' + JSON.stringify(e));
        }
    });

    function setPrice(data) {
        const productPrice = fnOnlyNumber($('.productPrice-' + vProductcd).text()).number;
        $('#nPrice').text(SetNumComma(productPrice));
        $('#nSalePrice').text(SetNumComma(nSalePrice));

        let calcPrice = productPrice - nSalePrice;
        if (calcPrice < 0) {
            calcPrice = 0;
        }
        $('#calcPrice').text(SetNumComma(calcPrice));
    }

    function setCoupon(data) {

        let usableCoupon = 0;
        let couponElement = [];

        couponElement.push('<li class="box-item">');
        couponElement.push('   <div class="custom-radio">');
        couponElement.push('       <input type="radio" id="radio-0" checked=""');
        couponElement.push('               data-v-sale-type="N" ');
        couponElement.push('               data-v-productcd="' + data.vProductcd + '" ');
        couponElement.push('               class="radio type-box" name="vCouponCd">');
        couponElement.push('       <label for="radio-0">');
        couponElement.push('           <span class="normal">적용안함</span>');
        couponElement.push('       </label>');
        couponElement.push('   </div>');
        couponElement.push('</li>');

        $.each(data.object, function (i, v) {
            couponElement.push('<li class="box-item">');
            couponElement.push('    <div class="custom-radio">');
            couponElement.push('        <input type="radio" id="radio-' + v.VCouponCd + '" ');
            couponElement.push('               data-v-productcd="' + data.vProductcd + '" ');
            couponElement.push('               data-v-coupon-cd="' + v.VCouponCd + '" ');
            couponElement.push('               data-v-coupon-type="' + v.VCouponType + '" ');
            couponElement.push('               data-v-coupon-type-nm="' + v.VCouponTypeNm + '" ');
            couponElement.push('               data-v-give-reason="' + v.VGiveReason + '" ');
            couponElement.push('               data-v-prt-edtm="' + v.VPrtEdtm + '" ');
            couponElement.push('               data-v-prt-stdtm="' + v.VPrtSdtm + '" ');
            couponElement.push('               data-v-rest-date="' + v.VRestDate + '" ');
            couponElement.push('               data-v-sale-type="' + v.VSaleType + '" ');
            couponElement.push('               data-n-sale-price="' + v.NSalePrice + '" ');
            couponElement.push('               data-n-sale-rate="' + v.NSaleRate + '" ');
            couponElement.push('               data-v-sale-value="' + v.VSaleValue + '" ');
            couponElement.push('               data-v-status="' + v.VStatus + '" ');
            couponElement.push('               data-v-status-nm="' + v.VStatusNm + '" ');
            couponElement.push('               data-v-user-cart-coupon-id="' + v.VUserCartCouponId + '" ');
            if (!isEmpty(v.VUserCartCouponId) && (v.VUproductcd == data.vProductcd)) {
                couponElement.push('               checked=""');
                nSalePrice = v.NCouponPrice;
            }
            if (v.VUsableYn == 'N') {
                couponElement.push('               disabled');
            }
            couponElement.push('               class="radio type-box" name="vCouponCd">');
            couponElement.push('        <label for="radio-' + v.VCouponCd + '">');
            couponElement.push('            <span class="sale">' + v.VSaleValue + '</span>');
            couponElement.push('            <span class="tit">' + v.VCouponnm + '</span>');
            couponElement.push('            <span class="desc">설명:??????</span>');
            couponElement.push('            <span class="date">' + v.VPrtEdtm + ' 까지</span>');
            couponElement.push('        </label>');
            couponElement.push('    </div>');
            couponElement.push('</li>');
            if (v.VUsableYn == 'Y') {
                usableCoupon++;
            }
        })

        $('#couponList').html(couponElement.join(''));
        $('#userCoupon').text(SetNumComma(data.object.length));
        $('#usableCoupon').text(SetNumComma(usableCoupon));
    }

}

function calcDiscount(e) {
    const obj = this.dataset;
    const nPrice = fnOnlyNumber($('#nPrice').text()).number;
    let nSalePrice = 0;
    let calcPrice = 0;

    if (obj.vSaleType == '100') {
        calcPrice = nPrice - obj.nSalePrice;
        nSalePrice = obj.nSalePrice;
    } else if (obj.vSaleType == '200') {
        calcPrice = nPrice - (nPrice * obj.nSaleRate * 0.01);
        nSalePrice = nPrice * obj.nSaleRate * 0.01;
    } else if (obj.vSaleType == 'N') {
        nSalePrice = 0;
        calcPrice = nPrice;
    } else {
        return;
    }

    $('#nSalePrice').text(SetNumComma(nSalePrice));
    $('#calcPrice').text(SetNumComma(calcPrice));

}

function couponApply(e) {
    console.log('couponApply-----');
    let url = '/order/cart/couponApplyAjax';
    const obj = $('#popup-product-coupon .radio:checked').data();

    const nPrice = fnOnlyNumber($('#nPrice').text()).number;
    let nCouponPrice = 0;

    if (obj.vSaleType == '100') {
        nCouponPrice = obj.nSalePrice;
    } else if (obj.vSaleType == '200') {
        nCouponPrice = nPrice * obj.nSaleRate * 0.01;
    } else if (obj.vSaleType == 'N') {
        url = '/order/cart/userCartCouponDeleteAjax';
    } else {
        return;
    }
    obj.nCouponPrice = nCouponPrice;
    obj.vUproductcd = obj.vProductcd;

    $('#discountPrice-' + obj.vProductcd).text(SetNumComma(nCouponPrice));

    const data = {};
    $.each(obj, function (name, value) {
        data[name] = encodeURIComponent(value);
    });

    cmAjax({
        url: url
        , type: 'POST'
        , data: {
            data: JSON.stringify(data)
        }
        , dataType: "json"
        , success: function (data) {
            if (data.status == 'succ') {
                window.location.href = '/order/cart'
            }
        }
        , error: function (e) {
            console.log(e);
        }
    });

}

function closePop() {
    $('.resetPrice').text('0');
    $('#popup-product-coupon').hide();
}

function order(e) {
    console.log('order-----');
    $("#frm input[name='vProductcdArr']").val('');
    let flag = false;
    $('.checkbox:checked').each(function (i, v) {
        const vProductcd = this.dataset.vProductcd;
        const vIslandDlvYn = this.dataset.vIslandDlvYn;
        if (!isEmpty(vProductcd)) {
            const input = '<input type="hidden" name="vProductcdArr" value="' + vProductcd + '" />'
            $('#frm').append(input);
        }
        if (vIslandDlvYn == 'Y') {
            flag = true;
        }
    });

    if (flag) {
        alert('도서산간 배송 불가한 상품과 같이 주문할 수 없습니다.');
        return;
    }

    $('#frm').submit();
}

/**
 * 장바구니 등록 함수
 * @param cartType (00 바로구매, 01: 일반 장바구니)
 * @param arrayList (json형식의 데이터)
 * @param fnCallBack (callback 함수)
 * @param influNo (인플루언서 번호)
 */
function fnCartInsert(cartType, arrayList, fnCallBack, influNo) {

    //cartType 필수, arrayList 에 v_productcd 필수
    console.log('cartType:' + cartType + ' | arrayList:' + JSON.stringify(arrayList));
    /*
    2021-09-14
    var arr = [
        {"v_productcd":"3613","n_qty":2,"v_optionid":"20210914000000016376"}
        , {"v_productcd":"3613","n_qty":2,"v_optionid":"20210914000000016377"}
        , {"v_productcd":"3616","n_qty":2,"v_optionid":"20210914000000017947"}
        , {"v_productcd":"3616","n_qty":2,"v_optionid":"20210914000000017948"}
        , {"v_productcd":"3625","n_qty":2,"v_optionid":"20210914000000017956"}
        , {"v_productcd":"3625","n_qty":2,"v_optionid":"20210914000000017957"}
        , {"v_productcd":"3983","n_qty":2,"v_optionid":"20210914000000016498"}
        , {"v_productcd":"3983","n_qty":2,"v_optionid":"20210914000000016497"}
        , {"v_productcd":"4060","n_qty":2,"v_optionid":"20210914000000016552"}
        , {"v_productcd":"4060","n_qty":2,"v_optionid":"20210914000000016553"}
    ];
    fnCartInsert('01',arr,fnCartInsertCallBackTest,'');
     */
    cmAjax({
        url: '/order/cart/insertCartAjax'
        , type: "post"
        , data: {json: JSON.stringify(arrayList), cartType: cartType, influNo: influNo}
        , dataType: "json"
        , success: function (data) {
            //console.log("data:"+JSON.stringify(data));
            if (fnCallBack != undefined) {
                fnCallBack(data.status, cartType);
            }
        }
        , error: function (e) {
            //console.log('e:'+JSON.stringify(e));
            if (fnCallBack != undefined) {
                fnCallBack("error");
            }
        }
    });

}

/**
 * 샘플 콜백함수
 * @param status
 * @param cartType
 */
function fnCartInsertCallBackTest(status, cartType) {

    if (status == 'succ') {
        if (cartType == '00') {
            location.href = '/order/order?cartType=00';
        } else {
            if (confirm('장바구니에 추가하였습니다. 장바구니로 이동하시겠습니까?')) {
                location.href = '/order/cart';
            }
        }
    } else {
        alert("장바구니 등록 실패");
    }
}
