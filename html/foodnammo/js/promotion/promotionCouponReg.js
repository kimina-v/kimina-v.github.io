$(document).ready(function () {
    addOnlyNumberEvent($(".onlyNumber"), {isComma: true});
    //빈 radio 첫째 값으로 초기화
    $('input[type="radio"]').each(function (i, radio) {
        if (radio.name != "vCoverageType") {
            if ($('input[name="' + radio.name + '"]:checked').length <= 0) {
                $('input[name="' + radio.name + '"]:eq(0)').prop('checked', true).trigger('change');
            }
        } else {
            if ($('input[name="' + radio.name + '"]:checked').length <= 0) {
                $('input[name="' + radio.name + '"]').attr('disabled', true);
            }
        }
    });
    //빈 checkbox 첫째 값으로 초기화
    $('input[type="checkbox"]').each(function (i, checkbox) {
        if ($('input[name="' + checkbox.name + '"]:checked').length <= 0) {
            $('input[name="' + checkbox.name + '"]:eq(0)').prop('checked', true).trigger('change');
        }
    });
    //할인 범위 클릭시
    $('input[name="discountTyp"]').on("click", function (event) {
        console.log($(this).val());
        if ($(this).val() == "Y") {
            $('input[name="vCoverageType"]:eq(0)').prop('checked', true);
            $('input[name="vCoverageType"]').attr("disabled", false);
        } else {
            $('input[name="vCoverageType"]').prop('checked', false);
            $('input[name="vCoverageType"]').attr("disabled", true);
        }
    });

    //카테고리 추가 클릭시
    $(".addCategory").click(function (event) {
        event.preventDefault();
        let row = $(this).closest('tr');
        let $divCategory = row.find('.divcategory');
        var idx = $divCategory.length;
        console.log("add idx>>" + idx);
        var $cloneDiv = $('#cloneDivcategory').clone(true);

        $cloneDiv.addClass("divcategory");
        $cloneDiv.css('display', 'block');

        $divCategory.last().after($cloneDiv);
    });

    //카테고리 삭제 클릭시
    $(".delDivCategory").click(function (event) {
        event.preventDefault();
        var $divCategory = $(this).closest('.divcategory');
        if ($('.divcategory').length != 1) {
            $divCategory.remove();
        }
    });

    //카테고리 1 뎁스 변경시
    $(document).on('change', '.cpnCate1cd', function (event) {
        event.preventDefault();
        var $divCategory = $(this).closest('.divcategory');
        var idx = $('.divcategory').length;

        cmSelectCombo({
            url: '/product/category/selectSubCategory'
            , param: {
                categoryCd: $(this).val()
            }
            , keyValue: 'VCategorycd'
            , keyText: 'VCategorynm'
            , target: $divCategory.find('.cpnCate2cd')
            , callback: function () {
                setCategoryShowHide(idx);
            }
        });
    });
    //카테고리 2 뎁스 변경시
    $(document).on('change', '.cpnCate2cd', function (event) {
        event.preventDefault();
        var $divCategory = $(this).closest('.divcategory');
        var idx = $divCategory.length;

        cmSelectCombo({
            url: '/product/category/selectSubCategory'
            , param: {
                categoryCd: $(this).val()
            }
            , keyValue: 'VCategorycd'
            , keyText: 'VCategorynm'
            , target: $divCategory.find('.cpnCate3cd')
            , callback: function () {
                setCategoryShowHide(idx);
            }
        });
    });

    // 브랜드 검색 버튼 클릭
    $('.btn_brand_search').on('click', function (e) {
        $('#couponPopFrm input[name=callbackFunction]').val('addMultiBrand');
        $('#commonBrandSearchPop').load('/common/selectBrandPop', $('#couponPopFrm').serialize());
    });

    // 입점사 검색 버튼 클릭
    $(".btn_partner_search").on('click', function (event) {
        $('#couponPopFrm input[name=callbackFunction]').val('addMultiPartner');
        $('#commonPartnerSearchPop').load('/common/selectPartnerPop', $('#couponPopFrm').serialize());
    });
    //상품검색 버튼 클릭
    $(".btn_product_search").on('click', function (event) {
        $('#couponPopFrm input[name=callbackFunction]').val('addMultiProduct');
        $('#commonProductSearchPop').load('/common/selectProductPop', $('#couponPopFrm').serialize());
    });

});

function addMultiBrand(brandList) {
    console.log(11111);
    if (typeof (brandList) === 'undefined') {
        return false;
    }
    $(".brandNm").text("");
    $('.brandInfoDiv').text("");

    var brandNm = "";
    let addHtml = [];
    $(brandList).each(function (i, e) {
        var arrBrandcd = e.vBrandCd;
        var arrBrandnm = e.vBrandnm;

        addHtml.push('  <div class="objectDiv" style="display: none;">');
        addHtml.push('		<input type="hidden" data-name="vObjectType" value="BRAND"/>');
        addHtml.push('		<input type="hidden" class="brandCd" data-name="vObjectCd" value="' + arrBrandcd + '"/>');
        addHtml.push('  </div>');

        brandNm += arrBrandnm + ",";
    });
    $('.brandInfoDiv').append(addHtml.join(''));

    brandNm = brandNm.substr(0, brandNm.length - 1);
    $(".brandNm").text(brandNm);
}

function addMultiPartner(list) {
    if (typeof (list) === 'undefined') {
        return false;
    }
    $(".partnerNm").text("");
    $('.partnerInfoDiv').text("");

    var partnerNm = "";
    let addHtml = [];
    $(list).each(function (i, e) {
        var arrCd = e.cd;
        var arrNm = e.name;

        addHtml.push('  <div class="objectDiv" style="display: none;">');
        addHtml.push('		<input type="hidden" data-name="vObjectType" value="PARTNER"/>');
        addHtml.push('		<input type="hidden" class="partnerCd" data-name="vObjectCd" value="' + arrCd + '"/>');
        addHtml.push('  </div>');

        partnerNm += arrNm + ",";
    });
    $('.partnerInfoDiv').append(addHtml.join(''));

    partnerNm = partnerNm.substr(0, partnerNm.length - 1);
    $(".partnerNm").text(partnerNm);
}

function addMultiProduct(list) {
    if (typeof (list) === 'undefined') {
        return false;
    }

    let addHtml = [];
    let cnt = $("#productTbody tr:not(.no-data)").length;
    let isCheck = true;

    $(list).each(function (i, e) {
        $("#productTbody").children('tr:not(.no-data)').each(function (i, tr) {
            if (e.prdcd === $(this).find('.vPrdcd').val()) {
                alert('이미 등록된 상품이 있습니다.');
                isCheck = false;
                return false;
            }
        });
        if (!isCheck) {
            return false;
        }

        addHtml.push('  <tr class="row">');
        addHtml.push('		<td class="list-num">');
        addHtml.push('		<div class="in-tb">' + (cnt + 1) + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.prdcd + '</div>');
        addHtml.push('          <input type="hidden" class="vPrdcd" data-name="vProductcd" value=' + e.prdcd + ' />');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.brandnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.parternm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.prdnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.statusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-left">');
        addHtml.push('		<div class="in-tb">' + e.price + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.statusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.showynnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td>');
        addHtml.push('		<input type=\'button\' class=\'btn-form btn-default btn_prd_del\' value="삭제" style="width:50px;" onclick=\'delPrdTableRow(this);\'>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#productTbody').find('.no-data').remove();
    $('.prdCnt').text(cnt);
    $('#productTbody').append(addHtml.join(''));
}

function delPrdTableRow(obj) {
    var tr = $(obj).parent().parent();
    tr.remove();
    let cnt = $("#productTbody tr:not(.no-data)").length;
    $('.prdCnt').text(cnt);
}

function setCategoryShowHide(idx) {
    var idx = idx - 1;
    console.log("idx>>" + idx);
    var ctg2 = $('.divcategory').eq(idx).find('.cpnCate2cd');
    var ctg3 = $('.divcategory').eq(idx).find('.cpnCate3cd');

    if ($("option", ctg2).length > 1) {
        ctg2.show();
    } else {
        ctg2.hide();
    }
    if ($("option", ctg3).length > 1) {
        ctg3.show();
    } else {
        ctg3.hide();
    }
}

function isValidate() {
    return true;
}

function setReqData() {
    const reqData = {};
    $('#couponRegFrm').serializeArray().forEach(function (form) {
        console.log(form.name + "::::" + form.value);
        reqData[form.name] = encodeURIComponent(form.value);
    });

    const salePrice = $('input[name="nSalePrice"]').val();
    const saleRate = $('input[name="nSaleRate"]').val();

    if (salePrice > 0) {
        reqData['vSaleType'] = "100"
    }
    if (saleRate > 0) {
        reqData['vSaleType'] = "200"
    }

    function getDataNameList($target) {
        console.log($target.length);
        const result = [];
        $target.each(function (i, row) {
            const rowData = {};
            $('[data-name]', $(row)).each(function (j, data) {
                console.log(data.dataset.name + "::::" + data.value);
                rowData[data.dataset.name] = encodeURIComponent(data.value);
            });
            result.push(rowData);
        });

        return result;
    }

    function setCateData() {
        const result = [];
        $('.divcategory').each(function (i, row) {
            $('[data-name]', $(row)).each(function (j, data) {
                const rowData = {};
                console.log(data.dataset.name + "::::" + data.value);
                if (!isEmpty(data.value)) {
                    rowData[data.dataset.name] = encodeURIComponent(data.value);
                    rowData['nDepth'] = encodeURIComponent(data.dataset.depth);
                    result.push(rowData);
                }
            });
        });
        return result;
    }


    reqData.userList = getDataNameList($('.targetUserBox input[type="checkbox"]:checked').parent());

    const coverageType = $('input[name="vCoverageType"]:checked').val();
    if (coverageType == '20') {
        reqData.categoryList = setCateData();
    } else if (coverageType == '30' || coverageType == '40') {
        reqData.objectList = getDataNameList($('.objectDiv'));
    } else if (coverageType == '50') {
        reqData.productList = getDataNameList($('#productTbody>tr:not(.no-data)'));
    }
    return reqData;
}

function goSave() {
    if (!isValidate()) {
        return false;
    }

    const reqData = setReqData();


    const param = [];
    param.push($('#couponImgFrm').serialize());
    param.push('flagAction=' + reqData.flagAction);
    param.push('json=' + JSON.stringify(reqData));

    if (confirm("등록 하시겠습니까?")) {
        cmAjax({
            url: "/promotion/coupon/save"
            , type: "post"
            , data: param.join('&')
            , dataType: "json"
            , success: function (data) {
                if (data.status == "succ") {
                    alert("등록 되었습니다.");
                    document.location.href = "/promotion/coupon/list";
                } else {
                    alert("등록 실패");
                }
            }
            , error: function (e) {
                //alert(JSON.stringify(e));
                alert("ajax error!");
            }
        });
    }
}

function goCopy() {

    const reqData = setReqData();
    const param = [];
    param.push($('#couponImgFrm').serialize());
    param.push('flagAction=R');
    param.push('json=' + JSON.stringify(reqData));

    if (confirm("복사 하시겠습니까?")) {
        cmAjax({
            url: "/promotion/coupon/save"
            , type: "post"
            , data: param.join('&')
            , dataType: "json"
            , success: function (data) {
                if (data.status == "succ") {
                    alert("등록 되었습니다.");
                    document.location.href = "/promotion/coupon/list";
                } else {
                    alert("등록 실패");
                }
            }
            , error: function (e) {
                //alert(JSON.stringify(e));
                alert("ajax error!");
            }
        });
    }

}