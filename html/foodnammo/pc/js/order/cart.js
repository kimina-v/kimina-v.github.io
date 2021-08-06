/**
 * 장바구니 등록 함수
 * @param cartType (00 바로구매, 01: 일반 장바구니)
 * @param arrayList (json형식의 데이터)
 * @param influNo (인플루언서 번호)
 * @param fnCallBack (callback 함수)
 */
function fnCartInsert(cartType, arrayList, influNo, fnCallBack){

    //cartType 필수, arrayList 에 v_productcd 필수
    console.log('cartType:'+cartType+' | arrayList:'+JSON.stringify(arrayList));
    
    cmAjax({
        url	: '/order/cart/insertCartAjax'
        , type : "post"
        , data : {json: JSON.stringify(arrayList), cartType: cartType, influNo: influNo}
        , dataType : "json"
        , success : function (data) {
            //console.log("data:"+JSON.stringify(data));
            if(fnCallBack != undefined){
                fnCallBack(data.status, cartType);
            }
        }
        , error : function(e) {
            console.log(JSON.stringify(e));
            if(fnCallBack != undefined){
                fnCallBack("error");
            }
        }
    });

}

/**
 * 장바구니 샘플 데이터 형식
 * @param cartType
 * @param productcd
 * @param qty
 * @param optionid
 * @param textOption1
 * @param textOption2
 * @param textOption3
 * @param fnCallBack
 */
function fnCartInsertData(cartType,productcd,qty,optionid,textOption1,textOption2,textOption3, fnCallBack){
    var arrayList = [];

    var obj = {};
    obj.v_productcd = productcd;
    obj.n_qty = qty;
    obj.v_optionid = optionid;
    obj.v_text_option1 = textOption1;
    obj.v_text_option2 = textOption2;
    obj.v_text_option3 = textOption3;
    obj.v_cart_type = cartType;
    arrayList.push(obj);

    fnCartInsert(cartType,arrayList,fnCallBack);
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
        alert("등록 실패");
    }
}
