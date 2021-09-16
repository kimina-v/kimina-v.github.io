/**
 * 장바구니 등록 함수
 * @param cartType (00 바로구매, 01: 일반 장바구니)
 * @param arrayList (json형식의 데이터)
 * @param fnCallBack (callback 함수)
 * @param influNo (인플루언서 번호)
 */
function fnCartInsert(cartType, arrayList, fnCallBack, influNo){

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
            if(fnCallBack != undefined){
                fnCallBack(data.status, cartType);
            }
        }
        , error : function(e) {
            //console.log('e:'+JSON.stringify(e));
            if(fnCallBack != undefined){
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
function fnCartInsertCallBackTest(status, cartType){

    if(status == 'succ'){
        if(cartType == '00'){
            location.href='/order/order?cartType=00';
        }else{
            if(confirm('장바구니에 추가하였습니다. 장바구니로 이동하시겠습니까?')){
                location.href='/order/cart';
            }
        }
    }else{
        alert("장바구니 등록 실패");
    }
}
