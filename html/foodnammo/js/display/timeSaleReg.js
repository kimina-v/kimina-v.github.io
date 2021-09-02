$(document).ready(function () {
    addBtnEvent();
    loadEditor();
    addPrdPriceEvent();

    $('#showSdate').datepicker('setDate', '${cfn:dtFormat(reqVo.showSdate)}');
    $('#showEdate').datepicker('setDate', '${cfn:dtFormat(reqVo.showEdate)}');

    //숫자만 입력되는 input
    $(document).on("keydown keypress keyup blur change", ".numberOnly", function(e) {
        if(!((e.keyCode > 95 && e.keyCode < 106)
            ||(e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8))
        {
            $(this).val($(this).val().replace(/[^0-9]/g,""));
        }
    });
});

function addBtnEvent() {
    // 상품 추가 버튼
    /*$('.btn_add_prd').click(function (e) {
        $('#searchPrdPopFrm input[name=callbackFunction]').val('addNewProduct');
        $('#searchPrdPopFrm input[name=type]').val('single');

        $('#commonProductSearchPop').load('/common/selectProductPop', $('#searchPrdPopFrm').serialize());
    });*/

    // 상품 삭제 버튼
    $(document).on('click', '.btn_del_prd', function (e) {
        e.preventDefault();

        $(this).closest('tr').remove();
        noDataToggle();
        // 필수옵션 & 추가옵션 삭제
        $('#tbody_opt>tr:not(.no-data)').remove();
        $('#tbody_add>tr:not(.no-data)').remove();
    });

    // 사은품 추가 버튼
    /*$('.btn_add_gift').click(function (e) {
        $('#searchPrdPopFrm input[name=callbackFunction]').val('addNewGift');
        $('#searchPrdPopFrm input[name=type]').val('multi');

        $('#commonProductSearchPop').load('/common/selectProductPop', $('#searchPrdPopFrm').serialize());
    });*/
    
    // ERP 검색
    $(document).on('click', '.btn_erp_search', function (event) {
        event.preventDefault();
        $('#searchPrdPopFrm input[name=callbackFunction]').val('addErp');
        var index = $(this).closest('tr').prevAll().length;
        $('#searchPrdPopFrm input[name=index]').val(index);
        $('#commonErpProductSearchPop').load('/common/selectErpPop', $('#searchPrdPopFrm').serialize());
    });

    // 사은품 삭제 버튼
    $(document).on('click', '.btn_del_gift', function (e) {
        e.preventDefault();

        $(this).closest('tr').remove();
        noDataToggleGift();
    });

    // 목록
    $(".btn_cancel").on('click', function (event) {
        event.preventDefault();

        if(confirm('입력중인 내용이 있습니다. 나가시겠습니까?')) {
            goList();
        }
    });

    // 저장
    $(".btn_save").on('click', goSave);
}

// 상품 추가
function addNewProduct(prdList) {
    if (typeof (prdList) === 'undefined') {
        return false;
    }
    let addHtml = [];
    let cnt = $("#tbody_prd").find('tr:not(.no-data)').length + 1;
    let isCheck = true;

    $(prdList).each(function (i, e) {
        // 상품 중복 검사
        $("#tbody_prd").children('tr:not(.no-data)').each(function (i, tr) {
            if (e.prdcd === $(this).find($('input[name="prdcd"]')).val()) {
                alert('이미 등록된 상품이 있습니다.');
                isCheck = false;
                return false;
            }
        });
        // 상품 개수 제한
        if(cnt > 1) {
            alert('대상 상품은 1개만 등록 가능합니다.');
            isCheck = false;
            return false;
        }

        if (!isCheck) {
            return false;
        }

        addHtml.push('  <tr>');
        addHtml.push('		<td class="list-num">');
        addHtml.push('		    <div class="in-tb">' + e.prdcd + '</div>');
        addHtml.push('          <input type="hidden" name="prdcd" value=' + e.prdcd + ' />');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.parternm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.brandnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-left">');
        addHtml.push('		    <div class="in-tb">' + e.prdnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <input type="text" class="input-text w-full text-center onlinePrice numberOnly" name="onlinePrice" value="' + e.price +'">');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <input type="text" class="input-text w-full text-center salePrice numberOnly" name="salePrice" value="' + e.saleprice +'">');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="input-group">');
        addHtml.push('		        <input type="text" class="input-text w-full text-center saleRate numberOnly" name="saleRate" value="' + e.salerate +'">');
        addHtml.push('		        <div class="input-group-txt">%</div>');
        addHtml.push('		    </div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.statusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.showynnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <button type="button" class="btn-form btn-default btn_del_prd"><span>삭제</span></button>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;

        // 상품 필수옵션 출력 (상품연동형)
        addOption(e.prdcd);
        // 상품 추가옵션 출력
        addAddOption(e.prdcd);
    });

    $('#tbody_prd').find('.no-data').hide();
    $('#tbody_prd').append(addHtml.join(''));
}

// 대상상품 가격 변경 event
function addPrdPriceEvent() {
    //할인율 변경시
    $(document).on("change", ".saleRate", function () {
        var price = Number($(".onlinePrice").val().replace(/,/g, ''));
        var saleRate = Number($(this).val().replace(/,/g, ''));
        if (saleRate > 0) {
            var rate = Number(((saleRate)) / 100) || 0;
            var ret = Math.ceil((price * rate) / 10) * 10 || price;
            var salePrice = price - ret;
            $(".salePrice").val(salePrice);
        } else {
            $(".salePrice").val(price);
        }
    });
    //온라인판매가 변경시
    $(document).on("change", ".onlinePrice", function () {
        var price = Number($(this).val().replace(/,/g, ''));
        var salePrice = Number($('.salePrice').val().replace(/,/g, ''));
        var saleRate = Number($('.saleRate').val().replace(/,/g, ''));
        if (salePrice > 0) {
            saleRate = 100 - (Math.floor(salePrice / price * 100));
            $(".saleRate").val(saleRate);
        }

        if (saleRate > 0) {
            var rate = Number(((saleRate)) / 100) || 0;
            var ret = Math.ceil((price * rate) / 10) * 10 || price;
            var salePrice = price - ret;
            $(".salePrice").val(salePrice);
        }

    });
    //판매가 변경시
    $(document).on("change", ".salePrice" ,function () {
        var price = Number($(".onlinePrice").val().replace(/,/g, ''));
        var salePrice = Number($(this).val().replace(/,/g, ''));
        if (price > 0) {
            if (salePrice > 0) {
                var saleRate = Math.floor((price - salePrice) / price * 100) || 0;
                $(".saleRate").val(saleRate);
            }
        } else {
            $(".saleRate").val(0);
        }
    });
}

// 상품 리스트 no-data
function noDataToggle() {
    const len = $("#tbody_prd").find('tr:not(.no-data)').length;

    if(len == 0) {
        $('tr.no-data').show();
    }else {
        $('tr.no-data').hide();
    }
}

// 사은품 리스트 no-data
function noDataToggleGift() {
    const len = $("#tbody_gift").find('tr:not(.no-data)').length;

    if(len == 0) {
        $('tr.no-data').show();
    }else {
        $('tr.no-data').hide();
    }
}

// 필수옵션 추가
function addOption(prdCd) {
    let siteCd = $('[name="siteCd"]').val();

    cmAjax({
        url	: '/display/timeSale/optionAjax'
        , type : 'post'
        , data : {
            productCd : prdCd
            , siteCd : siteCd
        }
        , dataType : "json"
        , success : function (data) {
            if(data.status == "succ"){
                var list = data.object;
                if(list != null) {
                    addOptionHtml(list);
                }
            }else{
                alert("에러가 발생하였습니다.");
            }
        }
        , error : function(e) {
            alert("에러가 발생하였습니다.");
        }
    });
}

// 필수옵션 html 출력
function addOptionHtml(optList) {
    let addHtml = [];
    let cnt = $("#tbody_opt").find('tr:not(.no-data)').length + 1;

    $(optList).each(function (i, e) {
        addHtml.push('  <tr>');
        addHtml.push('      <input type="hidden" name="optId" value=' + e.VOptionid + ' />');
        addHtml.push('      <input type="hidden" name="optPrdcd" value=' + e.VOptionProdCd + ' />');
        addHtml.push('      <input type="hidden" name="optPrice" value=' + e.NOptionAmt + ' />');
        addHtml.push('      <input type="hidden" name="optStock" value=' + e.NOptionStock + ' />');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.VOptionNm1 + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        if(e.VOptionNm2 != undefined) {
            addHtml.push('		    <div class="in-tb">' + e.VOptionNm2 + '</div>');
        }else{
            addHtml.push('		    <div class="in-tb">-</div>');
        }
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        if(e.VOptionNm3 != undefined) {
            addHtml.push('		    <div class="in-tb">' + e.VOptionNm3 + '</div>');
        }else{
            addHtml.push('		    <div class="in-tb">-</div>');
        }
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.VShowYnnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.NOptionAmt + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.NOptionStock + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.VStatusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.VOptionProdCd + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        if(e.VErpProdcd != undefined) {
            addHtml.push('		    <div class="in-tb">' + e.VErpProdcd + '</div>');
        }else{
            addHtml.push('		    <div class="in-tb">-</div>');
        }
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="input-group-form">');
        addHtml.push('		        <select class="select w140" name="optApplyYn">');
        addHtml.push('		            <option value="Y">적용</option>');
        addHtml.push('		            <option value="N">미적용</option>');
        addHtml.push('		        </select>');
        addHtml.push('		    </div>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#tbody_opt').find('.no-data').hide();
    $('#tbody_opt').append(addHtml.join(''));
}

// 추가옵션 추가
function addAddOption(prdCd) {
    let siteCd = $('[name="siteCd"]').val();

    cmAjax({
        url	: '/display/timeSale/addOptionAjax'
        , type : 'post'
        , data : {
            productCd : prdCd
            , siteCd : siteCd
        }
        , dataType : "json"
        , success : function (data) {
            if(data.status == "succ"){
                var list = data.object;
                if(list != null) {
                    addAddOptionHtml(list);
                }
            }else{
                alert("에러가 발생하였습니다.");
            }
        }
        , error : function(e) {
            alert("에러가 발생하였습니다.");
        }
    });
}

// 추가옵션 html 출력
function addAddOptionHtml(addOptList) {
    let addHtml = [];
    let cnt = $("#tbody_add").find('tr:not(.no-data)').length + 1;

    $(addOptList).each(function (i, e) {
        addHtml.push('  <tr>');
        addHtml.push('      <input type="hidden" name="addPrdcd" value=' + e.VProductcd + ' />');
        // addHtml.push('      <input type="hidden" name="addOptPrdcd" value=' + e.VAddprodCd + ' />');
        addHtml.push('      <input type="hidden" name="addPrice" value=' + e.NAddPrice + ' />');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.VProductnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.VShowYnnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.NAddPrice + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.NStock + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.VStatusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.VProductcd + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="input-group-form">');
        addHtml.push('		        <select class="select w140" name="addApplyYn">');
        addHtml.push('		            <option value="Y">적용</option>');
        addHtml.push('		            <option value="N">미적용</option>');
        addHtml.push('		        </select>');
        addHtml.push('		    </div>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#tbody_add').find('.no-data').hide();
    $('#tbody_add').append(addHtml.join(''));
}

// 사은품 추가
function addNewGift(prdList) {
    if (typeof (prdList) === 'undefined') {
        return false;
    }
    let addHtml = [];
    let cnt = $("#tbody_gift").find('tr:not(.no-data)').length+1;
    let isCheck = true;

    $(prdList).each(function (i, e) {
        // 상품 중복 검사
        $("#tbody_gift").children('tr:not(.no-data)').each(function (i, tr) {
            if (e.prdcd === $(this).find($('input[name="prdcd"]')).val()) {
                alert('이미 등록된 상품이 있습니다.');
                isCheck = false;
                return false;
            }
        });

        if (!isCheck) {
            return false;
        }

        addHtml.push('  <tr>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.prdcd + '</div>');
        addHtml.push('          <input type="hidden" name="giftPrdcd" value=' + e.prdcd + ' />');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="input-group full">');
        addHtml.push('		        <input type="text" class="input-text" id="erp_' + cnt + '" placeholder="ERP 코드 입력" name="giftErp" value="' + e.erpcd +'" readonly>');
        addHtml.push('		        <span class="input-group-btn">');
        addHtml.push('		            <button type="button" class="btn-form btn-grey btn_erp_search"><span>ERP 검색</span></button>');
        addHtml.push('		        </span>');
        addHtml.push('		    </div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.parternm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.brandnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-left">');
        addHtml.push('		    <div class="in-tb">' + e.prdnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <input type="text" class="input-text w-full text-center numberOnly" name="giftQty">');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.statusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <div class="in-tb">' + e.showynnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		    <button type="button" class="btn-form btn-default btn_del_gift"><span>삭제</span></button>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#tbody_gift').find('.no-data').hide();
    $('#tbody_gift').append(addHtml.join(''));
}

// 사은품 ERP 코드 추가
function addErp(arr) {
    var index = $('#searchPrdPopFrm input[name=index]').val();
    $('#erp_'+index).val(arr.vErpProdcd);
}

function goList() {
    document.location.href = "/display/timeSale/list";
}

function goSave() {
    const frm = $('form[name="frm"]');

    if(!isValidate()){
        return false;
    }

    $("textarea[name='pcDesc']").text(CKEDITOR.instances.pcDesc.getData());
    $("textarea[name='moDesc']").text(CKEDITOR.instances.moDesc.getData());

    if(confirm('등록하시겠습니까?')) {
        cmAjax({
            url	: '/display/timeSale/save'
            , type : 'post'
            , data : frm.serialize()
            , dataType : "json"
            , success : function (data) {
                if(data.status == "succ"){
                    alert("저장 되었습니다.");
                    goList();
                }else{
                    alert("저장 실패");
                }
            }
            , error : function(e) {
                alert("ajax error!");
            }
        });
    }

}

function isValidate() {
    let timesaleNm = $('[name="timesaleNm"]').val();
    const showSdate = $('[name="showSdate"]').val();
    const showEdate = $('[name="showEdate"]').val();

    if(isEmpty(timesaleNm)) {
        alert('타임세일 명을 입력해주세요.');
        return false;
    }

    if(calculate_byte(timesaleNm) > 200) {
        alert('타임세일 명이 너무 깁니다.');
        return false;
    }

    if(showSdate && showEdate && showSdate.split('.').join('') > showEdate.split('.').join('')){
        alert('시작일이 종료일보다 클수 없습니다.');
        return false;
    }

    if($("#tbody_prd").find('tr:not(.no-data)').length <= 0) {
        alert('상품을 등록해주세요.');
        return false;
    }

    return true;
}

function loadEditor(){
    //에디터 생성
    createEditor('pcDesc', {
        siteCd:'COMM',
        fileCd:'EDITOR',
        uploadCd:"TIMESALE",
        limitFileMBSize:"5",
    });
    createEditor('moDesc', {
        siteCd:'COMM',
        fileCd:'EDITOR',
        uploadCd:"TIMESALE",
        limitFileMBSize:"5",
    });
}

