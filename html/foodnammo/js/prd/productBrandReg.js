$(document).ready(function () {
    addBtnEvent();
    const frm = $("#frm_reg");
    addCheckboxEvent($("input[name='allCheck10']", frm), $("input[name='selectCheck10']", frm));
    addCheckboxEvent($("input[name='allCheck20']", frm), $("input[name='selectCheck20']", frm));
    addCheckboxEvent($("input[name='allCheck30']", frm), $("input[name='selectCheck30']", frm));

    createEditor('intro', {
        siteCd: 'COMM',
        fileCd: 'EDITOR',
        uploadCd: "PRODUCT",
        limitFileMBSize: "5",
    });

    addChangeRowUpDownEvent({
        wrapperId: "recommPrdList"
        , topBtnClass: "up"
        , bottomBtnClass: "down"
        , moveCntInputClass: "step"
    });
    addChangeRowUpDownEvent({
        wrapperId: "popularPrdList"
        , topBtnClass: "up"
        , bottomBtnClass: "down"
        , moveCntInputClass: "step"
    });
    addChangeRowUpDownEvent({
        wrapperId: "reviewPrdList"
        , topBtnClass: "up"
        , bottomBtnClass: "down"
        , moveCntInputClass: "step"
    });

});

function addBtnEvent() {

    // 입점사검색
    $(".btn_partner_search").on("click", function (event) {
        event.preventDefault();
        $('#frm_pop input[name=type]').val('single');
        $('#commonPartnerSearchPop').load('/common/selectPartnerPop', $('#frm_pop').serialize());
    });

    // 상품추가
    $(".btn_prod_add").on("click", function (event) {
        event.preventDefault();
        const id = $(this).attr("id");
        searchPop(id);
    });

    // 기획전검색
    $(".btn_exhb_search").on("click", function (event) {
        event.preventDefault();
        $('#frm_pop input[name=type]').val('multi');
        $('#frm_pop input[name=callbackFunction]').val('addExhibit')
        $('#commonExhibitionSearchPop').load('/common/selectExhibitionPop', $('#frm_pop').serialize());
    });

    // 리뷰검색
    $(".btn_review_search").on("click", function (event) {
        event.preventDefault();
        goReviewPop();
    });

    // 선택삭제(상품)
    $(".btn_prod_del").on("click", function (event) {
        event.preventDefault();
        const prdType = $(this).attr("id");
        const check = $("input:checkbox[name='selectCheck" + prdType + "']:checked").closest('tr');
        goProdDelete(check);
    });

    // 등록
    $(".btn_save").on("click", function (event) {
        event.preventDefault();
        goSave();
    });

    // 취소
    $(".btn_cancel").on("click", function (event) {
        event.preventDefault();
        if (confirm("취소하시겠습니까?")) {
            goList();
        }
    });

}

function isValidate() {
    const sitecd = $("select[name='siteCd'] option:selected").val();
    const brandnm = $("input[name='brandnm']").val();
    const brandSubnm = $("input[name='brandSubnm']").val();
    const category = $("select[name='category'] option:selected").val();

    if(sitecd == '' || sitecd == null) {
        alert("사이트를 선택해주세요.");
        return false;
    }
    if(brandnm == '' || brandnm == null) {
        alert("브랜드명을 입력해주세요.");
        return false;
    }
    if(brandSubnm == '' || brandSubnm == null) {
        alert("브랜드 서브명을 입력해주세요.");
        return false;
    }
    if(category == '' || category == null) {
        alert("카테고리를 선택해주세요.");
        return false;
    }

    return true;
}

function searchPop(target) {
    const frm = $("#frm_pop");
    let callback = "";

    // 추천상품
    if(target == 'recomm') {
        callback = "addRecommPrd";
    }
    // 인기상품
    else if(target == 'popular') {
        callback = "addPopularPrd";
    }

    $("input[name='callbackFunction']").val(callback);
    $("input[name='type']").val("multi");

    $('#commonProductSearchPop').load('/common/selectProductPop', frm.serialize());
}

function addRecommPrd(prdList) {
    if (typeof (prdList) === 'undefined') {
        return false;
    }

    let addHtml = [];
    let cnt = $("#recommPrd").find('tr:not(#no_data)').length + 1;
    let isCheck = true;

    $(prdList).each(function (i, e) {
        $("#recommPrd").children('tr:not(#no_data)').each(function(i, tr) {
            if (e.prdcd === $("input[name='recommPrdcd']", tr).val()) {
                alert('이미 등록된 추천상품이 있습니다.');
                isCheck = false;
                return false;
            }
        });
        if(!isCheck) {
            return false;
        }

        addHtml.push('  <tr class="row">');
        addHtml.push('		<td class="list-check">');
        addHtml.push('          <div class="custom-checkbox single">');
        addHtml.push('              <input type="checkbox" id="recomm'+ cnt +'" class="checkbox" name="selectCheck10"/><label for="recomm' + cnt + '"></label>');
        addHtml.push('		    </div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('          <input type="hidden" name="recommPrdcd" value="' + e.prdcd + '" />');
        addHtml.push('		' + e.prdcd + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.erpcd + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.brandnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.prdnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.price + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.statusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.showynnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#recommPrd').find('.no-data').remove();
    $('#recommPrd').append(addHtml.join('\n'));
}

function addPopularPrd(prdList) {
    if (typeof (prdList) === 'undefined') {
        return false;
    }

    let addHtml = [];
    let cnt = $("#popularPrd").find('tr:not(#no_data)').length + 1;
    let isCheck = true;

    $(prdList).each(function (i, e) {
        $("#popularPrd").children('tr:not(#no_data)').each(function(i, tr) {
            if (e.prdcd === $("input[name='popularPrdcd']", tr).val()) {
                alert('이미 등록된 인기상품이 있습니다.');
                isCheck = false;
                return false;
            }
        });
        if(!isCheck) {
            return false;
        }

        addHtml.push('  <tr class="row">');
        addHtml.push('		<td class="list-check">');
        addHtml.push('          <div class="custom-checkbox single">');
        addHtml.push('              <input type="checkbox" id="popular'+ cnt +'" class="checkbox" name="selectCheck20"/><label for="popular' + cnt + '"></label>');
        addHtml.push('		    </div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('          <input type="hidden" name="popularPrdcd" value="' + e.prdcd + '" />');
        addHtml.push('		' + e.prdcd + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.erpcd + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.brandnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.prdnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.price + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.statusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.showynnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#popularPrd').find('.no-data').remove();
    $('#popularPrd').append(addHtml.join('\n'));
}

function goReviewPop() {
    let arrParam = [];
    arrParam.push('callbackFunction=parent.addReview');

    $("#reviewPop").show();
    $("#reviewPop").load("/product/brand/reviewPop"+ '?' + arrParam.join('&'));
}

function addReview(prdList) {
    if (typeof (prdList) === 'undefined') {
        return false;
    }

    let addHtml = [];
    let cnt = $("#reviewPrd").find('tr:not(#no_data)').length + 1;
    let isCheck = true;

    $(prdList).each(function (i, e) {
        $("#reviewPrd").children('tr:not(#no_data)').each(function(i, tr) {
            if (e.prdcd === $("input[name='reviewPrdcd']", tr).val()) {
                alert('이미 등록된 리뷰가 있습니다.');
                isCheck = false;
                return false;
            }
        });
        if(!isCheck) {
            return false;
        }

        addHtml.push('  <tr class="row">');
        addHtml.push('		<td class="list-check">');
        addHtml.push('          <div class="custom-checkbox single">');
        addHtml.push('              <input type="checkbox" id="review'+ cnt +'" class="checkbox" name="selectCheck30"/><label for="review' + cnt + '"></label>');
        addHtml.push('		    </div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('          <input type="hidden" name="reviewPrdcd" value="' + e.prdcd + '" />');
        addHtml.push('		' + e.prdcd + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.brandnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.prdnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('          <input type="hidden" name="reviewText" value="' + e.review + '" />');
        addHtml.push('		' + e.review + '</div>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#reviewPrd').find('.no-data').remove();
    $('#reviewPrd').append(addHtml.join('\n'));
}

function addExhibit(exhibitList) {
    if (typeof (exhibitList) === 'undefined') {
        return false;
    }

    let addHtml = [];
    let cnt = $("#exhibit").find('tr:not(#no_data)').length + 1;
    let isCheck = true;

    $(exhibitList).each(function (i, e) {
        $("#exhibit").children('tr:not(#no_data)').each(function(i, tr) {
            if (e.cd === $("input[name='exhibitionCd']", tr).val()) {
                alert('이미 등록된 기획전이 있습니다.');
                isCheck = false;
                return false;
            }
        });
        if(!isCheck) {
            return false;
        }

        addHtml.push('  <tr>');
        addHtml.push('      <input type="hidden" name="exhibitionCd" value="' + e.cd + '" />');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.channel + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.name + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.period + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.show + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.status + '</div>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#exhibit').find('.no-data').remove();
    $('#exhibit').append(addHtml.join('\n'));
}

function goProdDelete(check) {
    check.remove();
}

function goSave() {
    if(!isValidate()) {
        return false;
    }

    $("#siteCd").attr("disabled", false);
    // 브랜드소개정보(에디터)
    $("textarea[name='brandIntro']").text(CKEDITOR.instances.intro.getData());

    const frm = $("#frm_reg");
    if(confirm("저장하시겠습니까?")) {
        cmAjax({
            url : "/product/brand/save"
            , type : "POST"
            , data : frm.serialize()
            , dataType : "json"
            , isModal : true
            , isModalEnd : true
            , success : function (data) {
                if (data.status == "succ") {
                    alert("저장되었습니다.");
                    goList();
                }
                else {
                    alert("fail");
                    return false;
                }
            }
        });
    }
}

function goList() {
    document.location.href = "/product/brand/list";
}
