$(document).ready(function () {
    var imageEditFlag = {};
    //사이트코드 변경시
    $(document).on('change', 'select[name="siteCd"]', function (event) {
        event.preventDefault();
        if (confirm("사이트 코드 변경하시겠습니까?")) {
            var frm = $('#frm');
            frm.action = "/product/prd/regProduct";
            frm.submit();
        }
    });
    $(".btn_erp_search").click(function (event) {
        event.preventDefault();
        searchErp("product");
    });
    //대표카테고리 1 뎁스 변경시
    $(document).on('change', '.mstCategory1', function (event) {
        event.preventDefault();
        var mstCategory = $(this).val();
        cmSelectCombo({
            url: '/product/category/selectSubCategory'
            , param: {
                categoryCd: mstCategory
            }
            , keyValue: 'VCategorycd'
            , keyText: 'VCategorynm'
            , target: $('.mstCategory2')
            , callback: function () {
                $('.divcategory').each(function (i) {
                    var cate = $(this).find('.category1cd').val();
                    console.log(cate);
                    $(this).find('.category1cd option').each(function (i) {
                        $(this).show();
                        if ($(this).val() == mstCategory) {
                            $(this).hide();
                        }
                    });
                    if (cate == mstCategory) {
                        $(this).find('.category1cd option:eq(0)').prop("selected", true);
                    }
                });

                var ctg2 = $('.mstCategory2');
                var ctg3 = $('.mstCategory3');

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
        });
    });
    //대표카테고리 2 뎁스 변경시
    $(document).on('change', '.mstCategory2', function (event) {
        event.preventDefault();
        var mstCategory = $(this).val();
        cmSelectCombo({
            url: '/product/category/selectSubCategory'
            , param: {
                categoryCd: $(this).val()
            }
            , keyValue: 'VCategorycd'
            , keyText: 'VCategorynm'
            , target: $('.mstCategory3')
            , callback: function () {
                $('.divcategory').each(function (i) {
                    var cate = $(this).find('.category2cd').val();
                    console.log(cate);
                    $(this).find('.category2cd option').each(function (i) {
                        $(this).show();
                        if ($(this).val() == mstCategory) {
                            $(this).hide();
                        }
                    });
                    if (cate == mstCategory) {
                        $(this).find('.category2cd option:eq(0)').prop("selected", true);
                    }
                });

                var ctg2 = $('.mstCategory2');
                var ctg3 = $('.mstCategory3');

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
        });
    });
    //카테고리 1 뎁스 변경시
    $(document).on('change', '.category1cd', function (event) {
        event.preventDefault();
        var mstCate = $('.mstCategory1').val();
        if (isEmpty(mstCate)) {
            alert("대표 카테고리 먼저 선택해주세요.");
            return false;
        }
        var $divCategory = $(this).closest('.divcategory');
        var idx = $divCategory.index();

        cmSelectCombo({
            url: '/product/category/selectSubCategory'
            , param: {
                categoryCd: $(this).val()
            }
            , keyValue: 'VCategorycd'
            , keyText: 'VCategorynm'
            , target: $divCategory.find('.category2cd')
            , callback: function () {
                setCategoryShowHide(idx);
            }
        });
    });
    //카테고리 2 뎁스 변경시
    $(document).on('change', '.category2cd', function (event) {
        event.preventDefault();
        if ($(this).val() == "") {
            return false;
        }
        var $divCategory = $(this).closest('.divcategory');
        var idx = $divCategory.index();

        cmSelectCombo({
            url: '/product/category/selectSubCategory'
            , param: {
                categoryCd: $(this).val()
            }
            , keyValue : 'VCategorycd'
            , keyText : 'VCategorynm'
            , target : $divCategory.find('.category3cd')
            , callback : function () {
                setCategoryShowHide(idx);
            }
        });
    });
    //카테고리 추가 클릭시
    $(".addCategory").click(function (event) {
        event.preventDefault();
        let row = $(this).closest('tr');
        let $divCategory = row.find('.divcategory');
        var idx = $divCategory.length;
        console.log("add idx>>" + idx);
        var $cloneDiv = $('#cloneDivcategory').clone(true);

        $cloneDiv.find('.category1cd').prop('name', "categoryList[" + idx + "].vDepth1");
        $cloneDiv.find('.category2cd').prop('name', "categoryList[" + idx + "].vDepth2");
        $cloneDiv.find('.category3cd').prop('name', "categoryList[" + idx + "].vDepth3");
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
        //name
        $('.divcategory').each(function (i) {
            $(this).find('.category1cd').prop('name', "categoryList[" + i + "].vDepth1");
            $(this).find('.category2cd').prop('name', "categoryList[" + i + "].vDepth2");
            $(this).find('.category3cd').prop('name', "categoryList[" + i + "].vDepth3");
        });
    });
    //적립금 변경시
    $('input[name="mstProduct.vPointYn"]:radio').change(function () {
        if (this.value == 'N') {
            $('.pointTxt').hide();
            $('input[name="mstProduct.nPointRate"]').val(0);
        } else {
            $('.pointTxt').show();
        }
    });
    //상품별 배송비 클릭 시
    $(".dlvChargeCd").click(function (event) {
        if (($(this).val() == "20") || ($(this).val() == "30")) {
            $(".dlvCharge").show();
        } else {
            $(".dlvCharge").hide();
        }
    });
    //할인율 변경시
    $(".saleRate").on("change", function () {
        var price = Number($(".onlinePrice").val().replace(/,/g, ''));
        var saleRate = Number($(this).val().replace(/,/g, ''));
        if (saleRate > 0) {
            var rate = Number(((saleRate)) / 100) || 0;
            var ret = Math.ceil((price * rate) / 10) * 10 || price;
            var salePrice = price - ret;
            console.log('rate:' + rate + 'ret:' + ret + 'salePrice:' + salePrice);
            $(".salePrice").val(salePrice);
            $(".onlinePriceTxt").val(salePrice);
        } else {
            $(".salePrice").val(price);
            $(".onlinePriceTxt").val(price);
        }
    });
    //온라인판매가 변경시
    $(".onlinePrice").on("change", function () {
        var price = Number($(this).val().replace(/,/g, ''));
        var salePrice = Number($('.salePrice').val().replace(/,/g, ''));
        var saleRate = Number($('.saleRate').val().replace(/,/g, ''));
        if (salePrice > 0) {
            //saleRate = Math.floor((price - salePrice) / price * 100) || 0;
            saleRate = 100 - (Math.floor(salePrice / price * 100));
            $(".saleRate").val(saleRate);
        }

        if (saleRate > 0) {
            var rate = Number(((saleRate)) / 100) || 0;
            var ret = Math.ceil((price * rate) / 10) * 10 || price;
            var salePrice = price - ret;
            console.log('rate:' + rate + 'ret:' + ret + 'salePrice:' + salePrice);
            $(".salePrice").val(salePrice);
            $(".onlinePriceTxt").val(salePrice);
        }

    });
    //판매가 변경시
    $(".salePrice").on("change", function () {
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
        $(".onlinePriceTxt").val(salePrice);

        if (!isEmpty($(".lowPrice").val())) {
            var lowPrice = Number($(".lowPrice").val().replace(/,/g, ''));
            var margin = Math.floor((salePrice - lowPrice) / salePrice) || 0;
            $(".marginRate").val(margin);
        }
    });
    $(".btn_opt").click(function (event) {
        $("#optDiv").show();
    });
    $(".btn_add_opt").click(function (event) {
        $("#addOptDiv").show();
    });
    // 필수 옵션 검색 버튼 클릭
    $(".btn_option_search").click(function (event) {
        event.preventDefault();
        $("#searchPrdPopFrm").attr("name", "searchPrdPopFrm");
        const frm = $("form[name='searchPrdPopFrm']");
        $("form[name='searchPrdPopFrm'] input[name=siteCd]").val($('select[name="siteCd"]').val());
        $("form[name='searchPrdPopFrm'] input[name=callbackFunction]").val("addOptionGroup");
        $('#productSearchPop').load('/productPop/selectOptionPop', frm.serialize());

    });

    // 추가 옵션 검색 버튼 클릭
    $(".btn_add_option_search").click(function (event) {
        event.preventDefault();
        $("#searchPrdPopFrm").attr("name", "searchPrdPopFrm");
        const frm = $("form[name='searchPrdPopFrm']");
        $("form[name='searchPrdPopFrm'] input[name=siteCd]").val($('select[name="siteCd"]').val());
        $("form[name='searchPrdPopFrm'] input[name=callbackFunction]").val("addOptionAddGroup");
        $('#productSearchPop').load('/productPop/selectAddOptionPop', frm.serialize());

    });

    //옵션 선택 클릭시
    $('input[name="productOpt"]').click(function (event) {
        $('#optPrdDiv').hide();
        $('#comPrdDiv').hide();
        if ($(this).val() == 'OPT') {
            $('#optPrdDiv').show();
        } else {
            $('#comPrdDiv').show();
        }
    });
    //옵션 추가 버튼 클릭시
    $('.btnOptTableAdd').click(function (event) {
        event.preventDefault();
        var optNum = $(this).attr("data-opt");
        var cnt = $('.divOptName_' + optNum).length;

        let $div = $('.divOptName_' + optNum);

        var cloneDiv = $('#cloneDivOptName').clone(true);
        if (cnt == 0) {
            $div = $(this).closest('.divOptAdd');
        }

        cloneDiv.find('.bundlOptNm').prop('id', 'bundlOptNm' + optNum + '_' + cnt);
        cloneDiv.find('.bundlOptNm').prop('name','arrBundlOptNm'+cnt);
        cloneDiv.find('.btnOptTableDel').attr("data-opt",optNum);
        cloneDiv.show();
        cloneDiv.addClass("divOptName_"+optNum);
        //cloneDiv.css('display', 'inline-block');

        $div.last().after(cloneDiv);
    });
    //옵션 삭제 버튼 클릭시
    $('.btnOptTableDel').click(function (event) {
        event.preventDefault();
        var optNum = $(this).attr("data-opt");
        let target = $(this).parent().closest('.divOptName_' + optNum);

        if ($('.divOptName_' + optNum).length <= 1) {
            return false
        }

        target.remove();

    });
    //옵션 목록으로 적용 클릭 시
    $('.btnOptTableSet').click(function (event) {
        event.preventDefault();

        var opt = $('input[name="productOpt"]:checked').val();
        console.log("opt>>" + opt);
        var index = 0;
        if (opt == "OPT") {
            $('#optPrd').find('.no-data').remove();
            index = $('#optPrd tr').length;
        } else {
            $('#optCom').find('.no-data').remove();
            index = $('#optCom tr').length;
        }

        $(".optTitle").empty();

        let addHtml = [];
        var arrOptNm1 = [];
        var arrOptNm2 = [];
        var arrOptNm3 = [];

        $('.nm1').text($('input[name=optDpText1]').val());
        $('.nm2').text($('input[name=optDpText2]').val());
        $('.nm3').text($('input[name=optDpText3]').val());

        $(".bundlOptNm").each(function () {
            if ($(this).val() != '') {
                if ($(this).attr("id").substr(10, 1) == "1") {
                    arrOptNm1.push($(this).val());
                } else if ($(this).attr("id").substr(10, 1) == "2") {
                    arrOptNm2.push($(this).val());
                } else if ($(this).attr("id").substr(10, 1) == "3") {
                    arrOptNm3.push($(this).val());
                }
            }
        });

        if (opt == "OPT") {
            if (arrOptNm1.length != 0 && arrOptNm2.length != 0 && arrOptNm3.length != 0) {
                for (i = 0; i < arrOptNm1.length; i++) {
                    for (j = 0; j < arrOptNm2.length; j++) {
                        for (k = 0; k < arrOptNm3.length; k++) {
                            var tr = createOptRow(arrOptNm1[i], arrOptNm2[j], arrOptNm3[k], index);
                            addHtml.push(tr.join(''));
                            index++;
                        }
                    }
                }
            } else if(arrOptNm1.length != 0 && arrOptNm2.length == 0 && arrOptNm3.length == 0) {
                for (i = 0; i < arrOptNm1.length; i++) {
                    var tr = createOptRow(arrOptNm1[i], "", "", index);
                    addHtml.push(tr.join(''));
                    index++;
                }
            } else if(arrOptNm1.length != 0 && arrOptNm2.length != 0 && arrOptNm3.length == 0) {
                for (i = 0; i < arrOptNm1.length; i++) {
                    for (j = 0; j < arrOptNm2.length; j++) {
                        var tr = createOptRow(arrOptNm1[i], arrOptNm2[j], "", index);
                        addHtml.push(tr.join(''));
                        index++;
                    }
                }
            }
            $('.optCnt').text(index);
            $('#optPrd:last').append(addHtml.join(''));
        } else if (opt == "COM") {
            if (arrOptNm1.length != 0 && arrOptNm2.length != 0 && arrOptNm3.length != 0) {
                for (i = 0; i < arrOptNm1.length; i++) {
                    for (j = 0; j < arrOptNm2.length; j++) {
                        for (k = 0; k < arrOptNm3.length; k++) {
                            var tr = createComOptRow(arrOptNm1[i], arrOptNm2[j], arrOptNm3[k], index);
                            addHtml.push(tr.join(''));
                            index++;
                        }
                    }
                }
            } else if (arrOptNm1.length != 0 && arrOptNm2.length == 0 && arrOptNm3.length == 0) {
                for (i = 0; i < arrOptNm1.length; i++) {
                    var tr = createComOptRow(arrOptNm1[i], "", "", index);
                    addHtml.push(tr.join(''));
                    index++;
                }
            } else if (arrOptNm1.length != 0 && arrOptNm2.length != 0 && arrOptNm3.length == 0) {
                for (i = 0; i < arrOptNm1.length; i++) {
                    for (j = 0; j < arrOptNm2.length; j++) {
                        var tr = createComOptRow(arrOptNm1[i], arrOptNm2[j], "", index);
                        addHtml.push(tr.join(''));
                        index++;
                    }
                }
            }
            $('.optCnt').text(index);
            $('#optCom:last').append(addHtml.join(''));
        }

    });

    $(".btn_erp_search").click(function (event) {
        event.preventDefault();
        searchErp("product");
    });
    //관련 상품 검색 클릭시
    $('.btnLinkPrdSearch').click(function (event) {
        searchProductPop('link');
    });
    //텍스트 옵션 클릭 시
    $('#textOpt').click(function (event) {
        $('.txtOpt').hide();
        if ($('input[name="textOpt"]').is(':checked')) {
            $('.txtOpt').show();
        }
    });
    //옵션 체크박스 선택시
    $('.all_check').click(function (event) {
        var chkAll = $(this).is(":checked");
        if (chkAll) {
            $(".opt_chk").prop("checked", true);
        } else {
            $(".opt_chk").prop("checked", false);
        }
    });
    $('.auto_thumb').click(function (event) {
        const idx = $(this).attr("data-img");
        const flag = $('input[name="flagAction"]').val();

        if ($(this).is(':checked')) {
            $('div[id^=PRD' + idx + ']:gt(1)').hide();
        } else {
            $('div[id^=PRD' + idx + ']:gt(1)').show();
        }
        if (flag == 'M') {
            if (!$(this).is(':checked')) {
                if (!imageEditFlag[$(this).val()]) {
                    imageEditFlag[$(this).val()] = true;
                    $('div[id^=PRD' + idx + ']').find('.ui-file-delete').trigger('click');

                }
            }
        }
    });
    $('.badge').click(function (event) {
        if ($('.badge:checked').length > 4) {
            alert('뱃지는 최대 4개까지 선택 가능합니다.');
            $(this).prop('checked', false);
        }
    });
    $('.icon').click(function (event) {
        if ($('.icon:checked').length > 4) {
            alert('아이콘은 최대 4개까지 선택 가능합니다.');
            $(this).prop('checked', false);
        }
    });

    $(document).on('change', 'select[name="notiMstCd"]', function (event) {
        if ($('input[name="notiUseYn"]:checked').val() == "Y") {
            var notiMstCd = $(this).val();
            var tr = [];
            var index = 0;
            cmAjax({
                url: "/product/prd/selectNotiInfoAjax"
                , type: "post"
                , data: {notiMstCd: notiMstCd}
                , dataType: "json"
                , success: function (data) {
                    if (data.status == "succ") {
                        for (var i = 0; i < data.object.length; i++) {
                            var vo = data.object[i];
                            tr.push('  <tr>');
                            tr.push('		<th scope="row">');
                            tr.push('		<span class="in-tb">' + vo.VNotiDtlnm + '</span>');
                            tr.push('		<input type=\'hidden\' name=\'notiList[' + index + '].vNotiDtlnm\' value="' + vo.VNotiDtlnm + '" />');
                            tr.push('		<input type=\'hidden\' name=\'notiList[' + index + '].vNotiMstCd\' value="' + notiMstCd + '" />');
                            tr.push('		</th>');
                            tr.push('		<td colspan="3">');
                            tr.push('		<textarea class=\'textarea\' style=\'height: 50px;\' name=\'notiList[' + index + '].vNotiCont\'></textarea>');
                            tr.push('		</td>');
                            tr.push('  </tr>');
                            index++;
                        }
                        $('#notiTable tr:not(:first)').remove();
                        $('#notiTable tbody:last-child').append(tr.join(''));
                    } else {
                        alert("상품정보고시를 불러오는 도중에 오류가 발생했습니다.");
                    }
                }
                , error: function (e) {
                    //alert(JSON.stringify(e));
                    alert("ajax error!");
                }
            });
        }
    });

    //입점사 수수료
    $(document).on('change', '.partnerRate', function (event) {
        var flag = false;
        if ($(this).val() < 3) {
            if (confirm("기본수수료보다 작습니다. 적용하시겠습니까?")) {
                flag = true;
            } else {
                flag = false;
            }
        }
        if (!flag) {
            $(this).val(3);
        }
    });
    //상품 연동형 상품 검색 클릭시
    $(document).on("click", ".searchOptPrd", function () {
        var index = $(this).closest('tr').prevAll().length;
        $('#searchPrdPopFrm input[name=index]').val(index);
        searchProductPop('opt');
    });
    //상품 조합형 ERP 검색 클릭시
    $(document).on("click", ".searchOptErp", function () {
        var index = $(this).closest('tr').prevAll().length;
        $('#searchPrdPopFrm input[name=index]').val(index);
        searchErp('option');
    });

    // 배송 그룹 검색 버튼 클릭
    $(".btn_delivery_search").on('click', function (event) {
        event.preventDefault();
        $('#searchPrdPopFrm input[name=type]').val('single');
        $('#productDeliveryPop').load('/common/selectDeliveryPop', $('#searchPrdPopFrm').serialize());
    });
    //비교코드 검색 버튼 클릭
    $(".btn_compare_search").on('click', function (event) {
        event.preventDefault();
        $('#searchPrdPopFrm input[name=type]').val('single');
        $('#commonCompareSearchPop').load('/common/selectComparePop', $('#searchPrdPopFrm').serialize());
    });
    //냉장고 검색 버튼 클릭
    $(".btn_ice_search").on('click', function (event) {
        event.preventDefault();
        $('#searchPrdPopFrm input[name=type]').val('single');
        $('#commonIceSearchPop').load('/common/selectIcePop', $('#searchPrdPopFrm').serialize());
    });
});

function createOptRow(nm1, nm2, nm3, index) {
    var titleNm1 = $('input[name=optDpText1]').val();
    var titleNm2 = $('input[name=optDpText2]').val();
    var titleNm3 = $('input[name=optDpText3]').val();

    var tr = [];
    tr.push('  <tr class="row dataTr">');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'hidden\' class=\'vOptionid dataTd\' name=\'optionList[' + index + '].vOptionid\' />');
    tr.push('		<input type=\'hidden\' class=\'nSort dataTd\' name=\'optionList[' + index + '].nSort\' value="' + (index + 1) + '" />');
    tr.push('		<input type=\'text\'  class=\'input-text w90 vOptionNm1 dataTd\' name=\'optionList[' + index + '].vOptionNm1\' value="' + nm1 + '" readonly=\'readonly\'/>');
    tr.push('		<input type=\'hidden\' class=\'input-text w90 vOptionCd1 dataTd\' name=\'optionList[' + index + '].vOptionCd1\' value="' + titleNm1 + '"/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 vOptionNm2 dataTd\' name=\'optionList[' + index + '].vOptionNm2\' value="' + nm2 + '" readonly=\'readonly\'/>');
    tr.push('		<input type=\'hidden\' class=\'input-text w90 vOptionCd2 dataTd\' name=\'optionList[' + index + '].vOptionCd2\' value="' + titleNm2 + '"/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 vOptionNm3 dataTd\' name=\'optionList[' + index + '].vOptionNm3\' value="' + nm3 + '" readonly=\'readonly\'/>');
    tr.push('		<input type=\'hidden\' class=\'input-text w90 vOptionCd3 dataTd\' name=\'optionList[' + index + '].vOptionCd3\' value="' + titleNm3 + '"/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<select class=\'select vShowYn dataTd\' name=\'optionList[' + index + '].vShowYn\'><option selected="selected" value="N">미전시</option><option value="Y">전시</option></select>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 nOptionAmt dataTd\' name=\'optionList[' + index + '].nOptionAmt\' value="0"/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 nOptionStock dataTd onlyNumber\' name=\'optionList[' + index + '].nOptionStock\' value="0"/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 dataTd onlyNumber\' name=\'optionList[' + index + '].nPackQty\' value="0" />');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<select class=\'select vStatus dataTd\' name=\'optionList[' + index + '].vStatus\'><option selected="selected" value="100">정상</option><option value="999">품절</option><option value="300">판매중지</option><option value="200">강제품절</option></select>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w140 optionProdCd dataTd\' name=\'optionList[' + index + '].vOptionProdCd\' readonly=\'readonly\' />');
    tr.push('		<button type=\'button\' class=\'btn-func btn-default searchOptPrd\'><span>상품 검색</span></button>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w140 erpProdCd\'  readonly=\'readonly\'/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<input type=\'button\' class=\'btn-form btn-default\' onclick="delOptTableRow(this);" value="삭제" style="width:50px;">');
    tr.push('		</td>');
    tr.push('  </tr>');
    return tr;
}


function createComOptRow(nm1, nm2, nm3, index) {
    var titleNm1 = $('input[name=optDpText1]').val();
    var titleNm2 = $('input[name=optDpText2]').val();
    var titleNm3 = $('input[name=optDpText3]').val();

    var tr = [];
    tr.push('  <tr class="row dataTr">');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'hidden\' class=\'vOptionid dataTd\' name=\'optionList[' + index + '].vOptionid\' />');
    tr.push('		<input type=\'hidden\' class=\'nSort dataTd\' name=\'optionList[' + index + '].nSort\' value="' + (index + 1) + '" />');
    tr.push('		<input type=\'text\'  class=\'input-text w90 vOptionNm1 dataTd\' name=\'optionList[' + index + '].vOptionNm1\' value="' + nm1 + '" readonly=\'readonly\'/>');
    tr.push('		<input type=\'hidden\' class=\'input-text w90 vOptionCd1 dataTd\' name=\'optionList[' + index + '].vOptionCd1\' value="' + titleNm1 + '"/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 dataTd\' name=\'optionList[' + index + '].vOptionNm2\' value="' + nm2 + '" readonly=\'readonly\' />');
    tr.push('		<input type=\'hidden\' class=\'input-text dataTd\' name=\'optionList[' + index + '].vOptionCd2\' value="' + titleNm2 + '"/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 dataTd\' name=\'optionList[' + index + '].vOptionNm3\' value="' + nm3 + '" readonly=\'readonly\' />');
    tr.push('		<input type=\'hidden\' class=\'input-text dataTd\' name=\'optionList[' + index + '].vOptionCd3\' value="' + titleNm3 + '"/>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<select class=\'select dataTd\' name=\'optionList[' + index + '].vShowYn\'><option selected="selected" value="N">미전시</option><option value="Y">전시</option></select>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 dataTd\' name=\'optionList[' + index + '].nOptionAmt\' value="0" />');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 dataTd onlyNumber\' name=\'optionList[' + index + '].nOptionStock\' value="0" />');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w90 dataTd onlyNumber\' name=\'optionList[' + index + '].nPackQty\' value="0" />');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<select class=\'select dataTd\' name=\'optionList[' + index + '].vStatus\'><option selected="selected" value="100">정상</option><option value="999">품절</option><option value="300">판매중지</option><option value="200">강제품절</option></select>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<div class=\'in-tb\'>');
    tr.push('		<input type=\'text\' class=\'input-text w140 vErpProdcd dataTd \' name=\'optionList[' + index + '].vErpProdcd\' readonly=\'readonly\' />');
    tr.push('		<button type=\'button\' class=\'btn-func btn-default searchOptErp\'><span>ERP 검색</span></button>');
    tr.push('		</div>');
    tr.push('		</td>');
    tr.push('		<td class=\'text-center\'>');
    tr.push('		<input type=\'button\' class=\'btn-form btn-default\' onclick="delOptTableRow(this);" value="삭제" style="width:50px;">');
    tr.push('		</td>');
    tr.push('  </tr>');
    return tr;
}

function delOptTableRow(obj) {
    var $tr = $(obj).parent().parent();
    var optionId = $tr.find(".vOptionid").val();
    console.log("optionId>" + optionId);
    if (isEmpty(optionId)) {
        $tr.remove();
    } else {
        cmAjax({
            url: "/product/prd/updateOptionAjax"
            , type: "post"
            , data: {flagAction: "D", siteCd: $('select[name="siteCd"]').val(), optionid: optionId}
            , dataType: "json"
            , success: function (data) {
                if (data.status == "succ") {
                    console.log("OPT result::" + data.object);
                    $tr.remove();
                } else {
                    alert("옵션정보를 삭제하는 도중에 오류가 발생했습니다.");
                }
            }
            , error: function (e) {
                //alert(JSON.stringify(e));
                alert("ajax error!");
            }
        });
    }
    reOptTableIndex();

}

function reOptTableIndex() {
    var index = 0;
    $(".dataTr").each(function (x, i) {
        console.log("index>>" + x);
        $(this).find(".dataTd").each(function (xx, ii) {
            console.log(ii.name, ':', ii.value);
            var nameArr = ii.name.split(".");
            $(this).prop("name", "optionList[" + x + "]." + nameArr[1]);
            console.log('1111:', $(this).attr("name"));
        });
        index++;
    });
    $('.optCnt').text(index);
}


function searchErp(target) {
    var callback = "";
    if (target == "product") {
        var flagAction = $('input[name="flagAction"]').val();
        if (flagAction != "R") {
            alert("ERP 코드는 수정할수 없습니다.");
            return false;
        }
        callback = "addErp";
    } else if (target == "option") {
        callback = "addOptionErp";
    }
    $('#searchPrdPopFrm input[name=callbackFunction]').val(callback);

    $('#commonErpProductSearchPop').load('/common/selectErpPop', $('#searchPrdPopFrm').serialize());
}

function addErp(arr) {

    cmAjax({
        url: "/product/prd/selectErpInfoAjax"
        , type: "post"
        , data: {vErpProdcd: arr.vErpProdcd, vSitecd: $('select[name="siteCd"]').val()}
        , dataType: "json"
        , success: function (data) {
            if (data.status == "succ") {
                console.log("ERP result::" + data.object);
                if (data.object == "Y") {
                    $('input[name="vErpFlagAction"]').val("N");
                    $('input[name="flagAction"]').val("R");

                    $('input[name="mstProduct.vErpProdcd"]').val(arr.vErpProdcd);
                    $('input[name="mstProduct.vErpProdnm"]').val(arr.vErpProdnm);
                    $('input[name="mstProduct.vStandard"]').val(arr.vStandard);
                    $('input[name="mstProduct.vAssets"]').val(arr.vAssets);
                    $('input[name="mstProduct.vUnit"]').val(arr.vUnit);
                    $('input[name="mstProduct.nStdPrice"]').val(arr.nStdPrice);
                    $('input[name="mstProduct.nLowPrice"]').val(arr.nLowPrice);
                    $('input[name="mstProduct.nConsPrice"]').val(arr.nConsPrice);
                    $('input[name="mstProduct.vOnetimeYn"]').val(arr.vOtprodYn);
                    $('.onlinePrice').val(arr.nConsPrice);
                } else if (data.object == "N") {
                    alert("이미 존재한 ERP 코드 입니다.");
                    $('input[name="vErpFlagAction"]').val("N");
                    return false;
                } else {
                    $('input[name="productcd"]').val(data.object);
                    $('input[name="flagAction"]').val("R");
                    $('input[name="vErpFlagAction"]').val("Y");
                    fnReload();
                }
            } else {
                alert("ERP정보를 불러오는 도중에 오류가 발생했습니다.");
            }
        }
        , error: function (e) {
            //alert(JSON.stringify(e));
            alert("ajax error!");
        }
    });
}

function addOptionErp(arr) {
    var index = $('#searchPrdPopFrm input[name=index]').val();
    var $tr = $("#optCom tr").eq(index);
    $tr.find(".vErpProdcd").val(arr.vErpProdcd);
}

function searchProductPop(target) {
    var type = "radio";
    var callback = "";
    if (target == 'opt') {
        callback = "addOptionProduct";
        type = "single";
    } else if (target == 'link') {
        callback = "addLinkProduct";
        type = "multi";
    }

    $('#searchPrdPopFrm input[name=callbackFunction]').val(callback);
    $('#searchPrdPopFrm input[name=type]').val(type);

    $('#commonProductSearchPop').load('/common/selectProductPop', $('#searchPrdPopFrm').serialize());
}

function setCategoryShowHide(idx) {
    var ctg2 = $('.divcategory').eq(idx).find('.category2cd');
    var ctg3 = $('.divcategory').eq(idx).find('.category3cd');

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

function addOptionProduct(obj) {
    var index = $('#searchPrdPopFrm input[name=index]').val();
    var $tr = $("#optPrd tr").eq(index);
    $tr.find(".optionProdCd").val(obj.prdcd);
    $tr.find(".erpProdCd").val(obj.erpcd);

}

function addLinkProduct(prdList) {
    if (typeof (prdList) === 'undefined') {
        return false;
    }
    let addHtml = [];
    let cnt = $("#prdLINK").find('tr:not(.no-data)').length + 1;
    let isCheck = true;

    $(prdList).each(function (i, e) {
        $("#prdLINK").children('tr:not(.no-data)').each(function (i, tr) {
            if (e.prdcd === $(this).find('.vLinkProductcd').val()) {
                alert('이미 등록된 상품이 있습니다.');
                isCheck = false;
                return false;
            }
        });
        if (!isCheck) {
            return false;
        }

        addHtml.push('  <tr class="row">');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + (cnt + 1) + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-center">');
        addHtml.push('		<div class="in-tb">' + e.prdcd + '</div>');
        addHtml.push('          <input type="hidden" class="vLinkProductcd" name="linkList[' + cnt + '].vLinkProductcd" value=' + e.prdcd + ' />');
        addHtml.push('          <input type="hidden" class="nSort" name="linkList[' + cnt + '].nSort" value=' + (cnt + 1) + ' />');
        addHtml.push('		</td>');
        addHtml.push('		<td>');
        addHtml.push("          <img style='width:70px;height:70px;' src = '" + e.thumbnail + "' />");
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-left">');
        addHtml.push('		<div class="in-tb">' + e.prdnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-left">');
        addHtml.push('		<div class="in-tb">' + e.price + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-left">');
        addHtml.push('		<div class="in-tb">' + e.saleprice + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td class="text-left">');
        addHtml.push('		<div class="in-tb">' + e.statusnm + '</div>');
        addHtml.push('		</td>');
        addHtml.push('		<td>');
        addHtml.push('		<input type=\'button\' class=\'btn-form btn-default btn_link_del\' value="삭제" style="width:50px;" onclick=\'delLinkTableRow(this);\'>');
        addHtml.push('		</td>');
        addHtml.push('  </tr>');
        cnt++;
    });

    $('#prdLINK').find('.no-data').remove();
    $('#prdLINK').append(addHtml.join(''));
}
function delLinkTableRow(obj) {
    var tr = $(obj).parent().parent();
    tr.remove();
    $("#prdLINK tr").each(function (i, e) {
        var $prdcd = $(this).find(".vLinkProductcd");
        $prdcd.prop('name', 'linkList[' + i + '].vLinkProductcd');
        var $nSort = $(this).find(".nSort");
        $nSort.prop('name', 'linkList[' + i + '].nSort');
    });
}
function addOptionGroup(arr) {
    console.log(arr[0]);
    cmAjax({
        url: "/productPop/selectOptionGroupAjax"
        , type: "post"
        , data: {groupId: arr[0]}
        , dataType: "json"
        , success: function (data) {
            if (data.status == "succ") {
                $(".optionId").val(arr[0]);
                $(".optionNm").val(arr[1]);
                for (var i = 0; i < data.object.length; i++) {
                    var vo = data.object[i];
                    $("input[name='optDpText1']").val(vo.VOptionTitle1);
                    $("input[name='optDpText2']").val(vo.VOptionTitle2);
                    $("input[name='optDpText3']").val(vo.VOptionTitle3);
                    if (!isEmpty(vo.VOptionNm1)) {
                        var nm1Arr = vo.VOptionNm1.split(",");
                        for (var x in nm1Arr) { //nm1Arr[x]
                            if (x < 2) {
                                $('#bundlOptNm1_' + x).val(nm1Arr[x]);
                            } else {
                                var optNum = 1;
                                var cnt = x;
                                createSetOptionNm(optNum, cnt, nm1Arr[x]);
                            }
                        }
                    }
                    if(!isEmpty(vo.VOptionNm2)){
                        var nm2Arr = vo.VOptionNm2.split(",");
                        for ( var x in nm2Arr ) { //nm1Arr[x]
                            if( x < 2){
                                $('#bundlOptNm2_' + x).val(nm2Arr[x]);
                            }else{
                                var optNum = 2;
                                var cnt = x;
                                createSetOptionNm(optNum,cnt,nm2Arr[x]);
                            }
                        }
                    }
                    if(!isEmpty(vo.VOptionNm3)){
                        var nm3Arr = vo.VOptionNm3.split(",");
                        for ( var x in nm3Arr ) { //nm1Arr[x]
                            if( x < 2){
                                $('#bundlOptNm3_' + x).val(nm3Arr[x]);
                            }else{
                                var optNum = 3;
                                var cnt = x;
                                createSetOptionNm(optNum,cnt,nm3Arr[x]);
                            }
                        }
                    }
                }
            }else{
                alert("필수옵션을 불러오는 도중에 오류가 발생했습니다.");
            }
        }
        , error : function(e) {
            //alert(JSON.stringify(e));
            alert("ajax error!");
        }
    });
}
function addOptionAddGroup(arr) {
    console.log(arr[0]);
    var index = 0;
    var addHtml = [];
    cmAjax({
        url: "/productPop/selectAddOptionDetailAjax"
        , type: "post"
        , data: {groupId: arr[0], siteCd: arr[2]}
        , dataType: "json"
        , success: function (data) {
            if (data.status == "succ") {
                $('#addOptionId').val(arr[0]);
                $('#addOptionName').val(arr[1]);
                $('#addOptionFo').val(arr[3]);
                $('#add_opt_detail').empty();

                for (var i = 0; i < data.object.length; i++) {
                    var vo = data.object[i];

                    var hideYn = vo.VHidingYn;
                    var hideTxt = "";
                    if (hideYn == 'Y') {
                        hideTxt = "전시";
                    } else if (hideYn == 'N') {
                        hideTxt = "미전시";
                    }
                    addHtml.push("  <tr>");
                    addHtml.push('		<td class="text-left"><div class="in-tb">' + vo.VProductnm + '</div></td>');
                    addHtml.push('		<td class="text-left"><div class="in-tb">' + hideTxt + '</div></td>');
                    addHtml.push('		<td class="text-left"><div class="in-tb">' + vo.NAddPrice + '</div></td>');
                    addHtml.push('		<td class="text-left"><div class="in-tb">' + vo.NStock + '</div></td>');
                    addHtml.push('		<td class="text-left"><div class="in-tb">' + vo.VStatusnm + '</div></td>');
                    addHtml.push('		<td class="text-left"><div class="in-tb">' + vo.VProductcd + '</div></td>');
                    addHtml.push('		<td class="text-left"><div class="in-tb">' + vo.NSort + '</div></td>');
                    addHtml.push("  </tr>");
                    index++;
                }
                $('#add_opt_detail').append(addHtml.join(''));
                $('.add_opt_detail_cnt').text(index);
            }else{
                alert("추가 옵션을 불러오는 도중에 오류가 발생했습니다.");
            }
        }
        , error : function(e) {
            //alert(JSON.stringify(e));
            alert("ajax error!");
        }
    });
}
function createSetOptionNm(optNum,cnt,val) {
    console.log("optNum:" + optNum + "|cnt:" + cnt + ":val" + val);
    var cloneDiv = $('#cloneDivOptName').clone(true);
    cloneDiv.find('.bundlOptNm').prop('id', 'bundlOptNm' + optNum + '_' + cnt);
    cloneDiv.find('.bundlOptNm').prop('name', 'arrBundlOptNm' + cnt);
    cloneDiv.find('.btnOptTableDel').attr("data-opt", optNum);
    cloneDiv.addClass("divOptName_" + optNum);

    var $div = $('.divOptName_' + optNum);
    $div.last().after(cloneDiv);
    cloneDiv.show();
    $('#bundlOptNm' + optNum + '_' + cnt).val(val);
}
function isValidate() {
    var frm = $("form[name='frm']");
    const $prdNm = $('input[name="mstProduct.vProductnm"]', frm);
    const $price = $('input[name="price.nPrice"]', frm);
    const vOptionUseYn = $('input[name="mstProduct.vOptionUseYn"]:checked').val();
    const productOpt = $('input[name="productOpt"]:checked').val();
    const siteCd = $("select[name='siteCd']").val();
    var flag = true;

    if (isEmpty(siteCd)) {
        alert("사이트 코드를 확인해주세요.");
        return false;
    }
    if (isEmpty($prdNm.val())) {
        alert("상품명을 입력해주세요.");
        return false;
    }
    if (isEmpty($price.val()) || $price.val() == '0') {
        alert("판매가를 입력해주세요.");
        return false;
    }

    if (isEmpty($('.dlvGroupCd').val())) {
        alert("배송 그룹 코드를 확인해주세요.");
        return false;
    }
    const vApplyCd = $('input[name="mstProduct.vApplyCd"]').val();
    const flagAction = $('input[name="flagAction"]').val();

    //상품 이미지
    if (flagAction == "R") {
        var img1 = $('#PRD1_1_preview').html().trim();
        if (isEmpty(img1) || img1 == 'undefined') {
            alert("상품이미지 1은 필수 값입니다.");
            return false;
        }
    }

    if (vApplyCd == "300") {
        alert("재승인 상태에서는 수정 할 수 없습니다.");
        return false;
    }
    if (flagAction == "M") {
        if (vApplyCd == "100") {
            if (isEmpty($("#memo").val())) {
                alert("메모를 남겨주세요.");
                return false;
            }
        }
    }
    const vDlvChargeCd = $('input[name="mstProduct.vDlvChargeCd"]:checked').val();
    const nDlvCharge = $('input[name="mstProduct.nDlvCharge"]').val();
    if (vDlvChargeCd == "20" || vDlvChargeCd == "30") {
        if (isEmpty(nDlvCharge) || nDlvCharge == '0') {
            alert("부과 배송비를 입력해주세요.");
            return false;
        }
    }
    console.log("vOptionUseYn1>" + vOptionUseYn);
    console.log("productOpt1>" + productOpt);
    if (vOptionUseYn == "Y") {
        if (productOpt == "OPT") {
            if ($('#optPrd > tr.no-data').length > 0) {
                alert('필수 옵션을 등록해주세요.');
                return false;
            }
            $('#optPrd > tr').each(function () {
                var optPrdcd = $(this).find('.optionProdCd').val();
                console.log("optPrdcd>" + optPrdcd);
                if (isEmpty(optPrdcd)) {
                    alert("상품 연동형은 상품코드를 맵핑해줘야 합니다.");
                    flag = false;
                    return false;
                }
            });
            console.log('flag>' + flag);
            $('#optCom').empty();
            return flag;
        } else if (productOpt == "COM") {
            if ($('#optCom > tr.no-data').length > 0) {
                alert('필수 옵션을 등록해주세요.');
                return false;
            }
            $('#optPrd').empty();
        }
    } else {
        $('#optPrd').empty();
        $('#optCom').empty();
    }
    const vAddOptionUseYn = $('input[name="mstProduct.vAddOptionUseYn"]:checked').val();
    if (vAddOptionUseYn == "Y") {
        if (vOptionUseYn == "N") {
            alert("필수옵션을 먼저 등록해주세요.");
            return false;
        }
    }
    //대표카테고리
    var mstCate1 = $('.mstCategory1').val();
    var mstCate2 = $('.mstCategory2').val();
    var mstCate3 = $('.mstCategory3').val();

    var mstCate2Opt = $('.mstCategory2 option').length;
    var mstCate3Opt = $('.mstCategory3 option').length;
    console.log(mstCate2Opt);
    console.log(mstCate3Opt);

    if (isEmpty(mstCate1)) {
        alert("대표 카테고리 대분류를 확인해주세요.");
        flag = false;
        return false;
    }
    if (mstCate2Opt > 1) {
        if (isEmpty(mstCate2)) {
            alert("대표 카테고리 중분류를 확인해주세요.");
            flag = false;
            return false;
        }
    }
    if (mstCate3Opt > 1) {
        if (isEmpty(mstCate3)) {
            alert("대표 카테고리 소분류를 확인해주세요.");
            flag = false;
            return false;
        }
    }
    //카테고리
    $('.divcategory').each(function (i) {
        var cate1 = $(this).find('.category1cd').val();
        var cate2 = $(this).find('.category2cd').val();
        var cate3 = $(this).find('.category3cd').val();

        var cate2Opt = $(this).find('.category2cd option').length;
        var cate3Opt = $(this).find('.category3cd option').length;

        console.log(cate2Opt);
        console.log(cate3Opt);

        if (!isEmpty(cate1)) {
            if (cate2Opt > 1) {
                if (isEmpty(cate2)) {
                    alert("중분류 카테고리를 확인해주세요.");
                    flag = false;
                    return false;
                }
            }
            if (cate3Opt > 1) {
                if (isEmpty(cate3)) {
                    alert("소분류 카테고리를 확인해주세요.");
                    flag = false;
                    return false;
                }
            }
        }
    });
    return flag;
}
function goSave() {
    if (!isValidate()) {
        return false;
    }

    //성인인증상품
    if ($('#adultYn').prop("checked")) {
        $('input[name="mstProduct.vAdultYn"]').val('Y');
    }
    //재입고알림신청
    if ($('input[name="restockYn"]').prop("checked")) {
        $('input[name="mstProduct.vRestockYn"]').val('Y');
    }
    //네이버
    if ($('input[name="naverSaleYn"]').prop("checked")) {
        $('input[name="mstProduct.vNaverSaleYn"]').val('Y');
    }
    //선물하기
    if ($('input[name="giftYn"]').prop("checked")) {
        $('input[name="mstProduct.vGiftYn"]').val('Y');
    }

    //텍스트 옵션
    if ($('input[name="textOpt"]').prop("checked")) {
        $("#textOptYn").val('Y');
    }
    //면세
    if ($('#taxfreeYn').prop("checked")) {
        $('input[name="mstProduct.vTaxfreeYn"]').val('Y');
    }
    //개별
    if ($('#nosalwYn').prop("checked")) {
        $('input[name="mstProduct.vNosalwYn"]').val('Y');
    }
    //일반
    if ($('#dlvProp').prop("checked")) {
        $('input[name="mstProduct.vDlvProp"]').val("10");
    }
    //정기
    if ($('#routineDlvYn').prop("checked")) {
        $('input[name="mstProduct.vRoutineDlvYn"]').val('Y');
    }
    //도서산간
    if ($('#islandDlvYn').prop("checked")) {
        $('input[name="mstProduct.vIslandDlvYn"]').val('Y');
    }
    if (!$('#dlvProp').prop("checked") && !$('#routineDlvYn').prop("checked") && !$('#islandDlvYn').prop("checked")) {
        $('input[name="mstProduct.vDlvProp"]').val("10");
    }
    //브랜드코드
    if (!isEmpty($('input[name="vBrandCd"]').val())) {
        $('input[name="mstProduct.vBrandCd"]').val($('input[name="vBrandCd"]').val());
    }
    //묶음상품
    if ($('#bundleYn').prop("checked")) {
        $('input[name="mstProduct.vBundleYn"]').val('Y');
    }

    //필수 옵션 sort
    $('#optPrd tr').each(function (i) {
        $(this).find('.nSort').val(i + 1);
    });

    //필수 옵션 sort
    $('#optCom tr').each(function (i) {
        $(this).find('.nSort').val(i + 1);
    });

    //관련 상품 sort
    $('#prdLINK tr').each(function (i) {
        $(this).find('.nSort').val(i + 1);
    });

    //에디터
    $("textarea[name='pcClob.vCont']").text(CKEDITOR.instances.PC_textarea.getData());
    $("textarea[name='mobileClob.vCont']").text(CKEDITOR.instances.MOBILE_textarea.getData());
    //자동 생성
    $('.auto_thumb').each(function (event) {
        if (!$(this).is(':checked')) {
            $(this).val("N");
            $(this).attr("checked", true);
        }
    });
    //,제거
    $('.onlyNumber').each(function (j, vv) {
        var val = vv.value;
        $(this).val(val.replaceAll(/,/g, ''));
    });

    if (confirm("등록 하시겠습니까?")) {
        cmAjax({
            url: "/product/prd/saveProductAjax"
            , type: "post"
            , data: $("form[name='frm']").serialize()
            , dataType: "json"
            , success: function (data) {
                if (data.status == "succ") {
                    alert("등록 되었습니다.");
                    document.location.href = "/product/prd/list";
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

function goOption() {
    var opt = $('input[name="productOpt"]:checked').val();
    console.log(opt);
    var prdCd = $('#prdCd').val();
    var flag = true;
    if (opt == "OPT") {
        $('#optPrd > tr').each(function () {
            var optPrdcd = $(this).find('.optionProdCd').val();
            console.log("optPrdcd>" + optPrdcd);
            if (isEmpty(optPrdcd)) {
                alert("상품 연동형은 상품코드를 맵핑해줘야 합니다.");
                flag = false;
                return false;
            }
        });
    }
    if (!flag) {
        return false;
    }
    var dataList = [];
    var index = 0;
    $(".dataTr").each(function (x, i) {
        var vo = {};
        console.log("index>>" + index);
        $(this).find(".dataTd").each(function (xx, ii) {
            console.log(ii.name, ':', ii.value);
            var name = ii.name;
            var nameArr = name.split(".");
            if (nameArr[1] != null) {
                name = nameArr[1];
            }
            vo[name] = ii.value;
        });
        vo['vSitecd'] = $('select[name="siteCd"]').val();
        vo['vProductcd'] = prdCd;
        vo['nSort'] = index;
        console.log(vo);
        index++;
        dataList.push(vo);
    });
    console.log(dataList);
    cmAjax({
        url: "/product/prd/updateOptionAjax"
        , type: "post"
        , data: {flagAction: "M", siteCd: $('select[name="siteCd"]').val(), json: JSON.stringify(dataList)}
        , dataType: "json"
        , success: function (data) {
            if (data.status == "succ") {
                fnReload();
            }
        }
        , error: function (e) {
            alert("ajax error!");
        }
    });

}

//페이지 리로드
function fnReload() {
    var frm = $("#frm");
    frm.action = "/product/prd/regProduct";
    frm.submit();
}

//목록으로
function goList() {
    if (confirm("입력중인 내용이 있습니다.\n 나가겠습니까?")) {
        document.location.href = "/product/prd/list";
    }
}

function fnLog(target) {
    $("#searchPrdPopFrm").attr("name", "searchPrdPopFrm");

    const frm = $("form[name='searchPrdPopFrm']");
    $("form[name='searchPrdPopFrm'] input[name=siteCd]").val($('select[name="siteCd"]').val());
    $("form[name='searchPrdPopFrm'] input[name=target]").val(target);
    $('#productSearchPop').load('/productPop/selectLogPop', frm.serialize());
}

function fnOpenBrandSearchPop() {
    $("#searchPrdPopFrm").attr("name", "brandSearchForm");

    const frm = $("form[name='brandSearchForm']");
    $("form[name='brandSearchForm'] input[name=siteCd]").val($('select[name="siteCd"]').val());
    $("form[name='brandSearchForm'] input[name=type]").val("single");
    $("form[name='brandSearchForm'] input[name=callbackFunction]").val("addBrand");
    $('#productSearchPop').load('/common/selectBrandPop', frm.serialize());
}

function fnOpenPartnerSearchPop() {
    $("#searchPrdPopFrm").attr("name", "partnerSearchForm");
    const frm = $("form[name='partnerSearchForm']");
    $("form[name='partnerSearchForm'] input[name=siteCd]").val($('select[name="siteCd"]').val());
    $("form[name='partnerSearchForm'] input[name=type]").val("single");
    $("form[name='partnerSearchForm'] input[name=callbackFunction]").val("addPartner");
    $("#productSearchPop").load("/common/selectPartnerPop", frm.serialize());
}

function goCopy() {
    $("#searchPrdPopFrm").attr("name", "searchPrdPopFrm");
    const frm = $("form[name='searchPrdPopFrm']");
    var prdNm = $("form[name='searchPrdPopFrm'] input[name=productnm]").val();
    if (isEmpty(prdNm)) {
        alert("등록된 상품만 복사하기가 가능합니다.");
        return false;
    }
    $('#productSearchPop').load('/productPop/copyPop', frm.serialize());

}

function fnOpenCouponSearchPop() {
    $("#searchPrdPopFrm").attr("name", "searchPrdPopFrm");

    const frm = $("form[name='searchPrdPopFrm']");
    $("form[name='searchPrdPopFrm'] input[name=siteCd]").val($('select[name="siteCd"]').val());
    $('#productSearchPop').load('/productPop/selectCouponPop', frm.serialize());
}

function fnOpenExhibitionSearchPop() {
    $("#searchPrdPopFrm").attr("name", "searchPrdPopFrm");

    const frm = $("form[name='searchPrdPopFrm']");
    $("form[name='searchPrdPopFrm'] input[name=siteCd]").val($('select[name="siteCd"]').val());
    $('#productSearchPop').load('/productPop/selectExhibitionPop', frm.serialize());

}




