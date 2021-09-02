/**
 * Project : foodnamoo-ec-shop.ranking_shop
 * Company : TGCS
 * User: yong
 * Date: 2021-07-25
 * Descript :
 */
(function ($) {
    var controlsWrapper;
    controlsWrapper = {
        // 싱글 선택박스
        _getSelectOneValue: function (select) {
            return select.val();
        },
        // 멀티 선택박스
        _getSelectMultipleValue: function (select) {
            let values = [];
            $.each(select[0].options, function (i, option) {
                let $option = $(option);

                if ($option.is(':selected')) {
                    values.push($option.val());
                }
            });

            return values;
        },
        getSelectValue: function (select) {
            let type, value;

            type = select[0].type;

            if (type === 'select-one') {
                value = this._getSelectOneValue(select);
            }
            else {
                value = this._getSelectMultipleValue(select);
            }

            return value;
        },
        getCheckboxValue: function (checkbox) {
            if (!checkbox.is(':checked')) {
                return '';
            }

            return checkbox.val();
        },
        getValues: function (container, keyFilter) {
            let formObject = {};

            container.find('input, select, textarea').each(function (i, node) {
                let key, disabled, type, value, $node;

                $node = $(node);

                key = $node.attr($.fn.inputValues.opts.attr);
                disabled = $node.is(':disabled');

                // disabled 항목 또는 일치하지 않는 항목은 skip
                if (!key || (!$.fn.inputValues.opts.includeDisabled && disabled) || (keyFilter && (key !== keyFilter))) {
                    return;
                }

                switch (node.type) {
                    case 'radio':
                        if (!$node.is(':checked')) {
                            formObject[key] = formObject[key] || '';
                            break;
                        }

                        formObject[key] = $node.val();
                        break;
                    case 'checkbox':
                        if (!$node.is(':checked')) {
                            formObject[key] = formObject[key] || '';
                            break;
                        }

                        if (!formObject.hasOwnProperty(key) || !formObject[key]) {
                            formObject[key] = $node.val();
                            break;
                        }

                        if (!$.isArray(formObject[key])) {
                            value = [formObject[key]];
                            formObject[key] = value;
                        }

                        formObject[key].push($node.val());
                        break;
                    case 'select-one':
                        formObject[key] = $node.val();
                        break;
                    case 'select-multiple':
                        formObject[key] = [];
                        $.each(node.options, function (i, option) {
                            let $option = $(option);
                            if ($option.is(':selected')) {
                                formObject[key].push($option.val());
                            }
                        });
                        break;
                    case 'button':
                    case 'reset':
                    case 'image':
                    case undefined:
                        break;
                    default:
                        formObject[key] = $node.val();
                }
            });

            if (keyFilter) {
                return formObject[keyFilter];
            }

            return formObject;
        },
        setSelectValue: function (select, value) {
            let i, size, option;

            select.val(null);

            if (!$.isArray(value)) {
                select.val(value);
                return;
            }

            for (i = 0, size = value.length; i < size; i += 1) {
                option = select.find('option[value="' + value[i] + '"]');
                option.prop('selected', true);
            }
        },
        // 라디오버튼 또는 체크박스
        _checkCheckableValue: function (checkable, value) {
            if (!$.isArray(value)) {
                value = [value];
            }

            $.each(value, function (i) {
                value[i] = '' + value[i];
            });

            if ($.inArray(checkable.val(), value) > -1) {
                checkable.prop('checked', true);
                return true;
            }
            return false;
        },
        checkCheckboxesValue: function (checkbox, value) {
            let i, size, anyWasChecked = false;

            checkbox.prop('checked', false);

            for (i = 0, size = checkbox.length; i < size; i += 1) {
                if (this._checkCheckableValue(checkbox.eq(i), value)) {
                    anyWasChecked = true;
                }
            }

            return anyWasChecked;
        },
        checkRadiosValue: function (radios, value) {
            let i, size;

            radios.prop('checked', false);

            for (i = 0, size = radios.length; i < size; i += 1) {
                if (this._checkCheckableValue(radios.eq(i), ('' + value))) {
                    return true;
                }
            }
            return false;
        },
        setValues: function (container, values) {
            let key, nodes, filter, type,
                attr = $.fn.inputValues.opts.attr;

            for (key in values) {
                if (!values.hasOwnProperty(key)) continue;

                filter = '[' + attr + '="' + key + '"]';
                nodes = container.find(filter);

                if (nodes.length === 0) { continue; }

                type = nodes[0].type;

                switch (type) {
                    case 'select-one':
                    case 'select-multiple':
                        this.setSelectValue(nodes, values[key]);
                        break;
                    case 'radio':
                        this.checkRadiosValue(nodes, values[key]);
                        break;
                    case 'checkbox':
                        this.checkCheckboxesValue(nodes, values[key]);
                        break;
                    case 'file':
                        // 파일의 경우는 빈 문자열로만 설정
                        if (values[key] !== '') continue;
                        nodes.val('');
                        break;
                    case 'button':
                    case 'image':
                    case 'reset':
                    case undefined:
                        break;
                    default:
                        nodes.val(values[key]);
                }
            }
        }
    };

    $.fn.inputValues = function (paramA, paramB) {
        let values;

        // 모든 form element 요소의 값 가져오기
        if (!paramA) return controlsWrapper.getValues(this);

        if (typeof paramA === 'string') {
            // 특정 이름의 값만 가져오기
            if (paramB === undefined) return controlsWrapper.getValues(this, paramA);
            values = {};
            values[paramA] = paramB ;
        } else {
            values = paramA;
        }

        controlsWrapper.setValues(this, values);

        return this;
    };

    $.fn.inputValues.opts = {
        attr: 'name',
        includeDisabled: false
    };

    $.fn.inputValues.config = function (opts) {
        $.fn.inputValues.opts = $.extend($.fn.inputValues.opts, opts);
        return this;
    };
    $.fn.serializeObject = function() {
        let result = {};
        let extend = function(i, element) {
            let node = result[element.name];
            if ("undefined" !== typeof node && node !== null) {
                if ($.isArray(node)) {
                    node.push(element.value);
                } else {
                    result[element.name] = [node, element.value];
                }
            } else {
                result[element.name] = element.value;
            }
        }
        $.each(this.serializeArray(), extend);
        return result;
    };
    $.fn.cmAjax = function(opt, params) {
        let frm = this,
            obj = {
                url: frm.attr('action'),
                type: frm.attr('method'),
                dataType: 'json',
                data: $.extend(frm.serializeObject(), params),
                success: function(data) {
                    if (!isEmpty(frm.data('succ')) && typeof window[frm.data('succ')] === 'function') {
                        window[frm.data('succ')](data);
                    }
                },
                error: function() {
                    if (!isEmpty(frm.data('fail')) && typeof window[frm.data('fail')] === 'function') {
                        obj.error = window[frm.data('fail')]();
                    }
                }
            };
        cmAjax($.extend(obj, opt));
    };
    $.validator.setDefaults({
        onkeyup: false, /* 키보드에 의한 검사 해제 */
        onclick: false, /* 체크박스나 라디오 버튼 클릭시마다 검사 해제 */
        onfocusout: false, /* 포커스가 빠져나올 경우의 검사 해제 */
        showErrors: function (errorMap, errorList) {
            if (this.numberOfInvalids()) {
                alert(errorList[0].message);
            }
        }
    });
    $.validator.addMethod("dateRange", function(value, element, from, to){
        try {
            let date = new Date(value);
            if(date >= from && date <= to)
                return true;
        } catch(e) {
        }
        return false;
    });
    $.validator.addMethod('from', function (value, element, params) {
        // if end date is valid, validate it as well
        let end = $(params);
        if (!end.data('validation.running')) {
            $(element).data('validation.running', true);
            setTimeout($.proxy(
            function () {
                this.element(end);
            }, this), 0);
            // Ensure clearing the 'flag' happens after the validation of 'end' to prevent endless looping
            setTimeout(function () {
                $(element).data('validation.running', false);
            }, 0);
        }
        return this.optional(element) || this.optional(end[0]) || new Date(value) < new Date(end.val());
    }, '해당 종료 날짜 이전이어야 합니다.');
    $.validator.addMethod('to', function (value, element, params) {
        // if start date is valid, validate it as well
        let start = $(params);
        if (!start.data('validation.running')) {
            $(element).data('validation.running', true);
            setTimeout($.proxy(
            function () {
                this.element(start);
            }, this), 0);
            setTimeout(function () {
                $(element).data('validation.running', false);
            }, 0);
        }
        return this.optional(element) || this.optional(start[0]) || new Date(value) > new Date($(params).val());
    }, '해당 시작 날짜 이후여야 합니다.');
    $.validator.addMethod('onlyEng', function(value, element) {
        return this.optional(element) || value.match(/^[a-zA-Z0-9\.\,\s]+( [a-zA-Z0-9\.\,\s]+)*$/);
    }, '영문자만 입력 해주세요.');
    $.validator.addMethod('onlyKor', function(value, element){
        return this.optional(element) || value.match(/^[가-힣]+$/);
    }, '한글만 입력 해주세요.');
    $.validator.addMethod('phone', function(value, element) {
        value = value.replace(/\s+/g, '');
        return this.optional(element) || value.match(/^\d{3}-\d{3,4}-\d{4}$/);
    }, '잘못된 휴대폰 번호입니다. 숫자, 하이픈(–) 를 포함한 숫자만 입력하세요.');
    $.validator.addMethod('email', function(value, element) {
        value = value.replace(/\s+/g, '');
        return this.optional(element) || value.match(/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/);
    }, '잘못된 이메일 주소입니다.');
}(jQuery));
function gfnSuccessCallback() {
    console.log('글로벌 정상 콜백!!');
}
function gfnErrorCallback() {
    console.log('글로벌 실패 콜백!!');
}

/**
 * 기존 isEmpty는 Object를 판별 할 수 없어 확장형으로 재정의
 * @param value
 * @returns {boolean}
 */
const isEmptyExt = (value) => {
    if (value === null) return true;
    if (typeof value === 'undefined') return true;
    if (typeof value === 'string' && value === '') return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1) return true;
    if (typeof value === 'object' && value.constructor.name === 'String' && Object.keys(value).length < 1) return true; // new String()
    return false;
}
/***************************************************************
 * Common Search Form
 * SearchStore 객체생성
 * init : 초기 조회조건설정 및 이전 조회조건 재설정
 * set : 조회조건 session set
 * get : 조회조건 session get
 * clear : 조회조건 sesstion delete
 ***************************************************************/
var SearchStore = (function() {
    function SearchStore(obj) {
        this._obj = obj || {};
        this._obj.pgm = $(parent.document).find('ul.ui-tabs-nav li.ui-state-active').attr('aria-controls');
    };
    SearchStore.prototype.init = function(pgm, frm) {
        frm.inputValues(JSON.parse(this.get(this._obj.pgm)));
    };
    SearchStore.prototype.set = function(pgm, obj) {
        this.clear(this._obj.pgm);
        sessionStorage.setItem(this._obj.pgm, JSON.stringify(obj));
    };
    SearchStore.prototype.get = function(pgm, flag) {
        return (flag) ? JSON.parse(sessionStorage.getItem(this._obj.pgm)) : sessionStorage.getItem(this._obj.pgm);
    };
    SearchStore.prototype.clear = function(pgm) {
        sessionStorage.removeItem(this._obj.pgm);
    };
    return SearchStore;
}());
/***************************************************************
 * Event binding
 ***************************************************************/
const ExtSelector = {
    MODAL_OPEN: ['button.btn-ext-modal', 'a.btn-ext-modal', 'button.btn-ext-xlsdn'].join(','),
    MODAL_CLOSE: 'button.ext-close-pop',
    MODAL_SRCH: 'button.btn-modal-search',
    MODAL_ENTR_SRCH: '.modal-popup input.ext-input-enter',
    MODAL_PAGING: '.modal-popup .pagination a',
    MODAL_CNF_RTN: 'button.ext-return-pop',
    MODAL_RSN_RTN: 'button.ext-reason-pop',
    MODAL_SEL_RTN: 'a.elps-link',
    CHECK_ALL: 'input[type=checkbox].checkbox.ext-check-all',
    CHECK_ITEM: 'input[type=checkbox].checkbox.ext-check-item',
    COMBO_RLTNL: 'select.ext-select',
    BTN_XLS_DN: 'button.ext-xlsdn',
    LNK_ADD_TAB: '.ext-add-tab'
};
$(document)
    // .on('click', ExtSelector.BTN_XLS_DN, gfnExcelDownload)
    .on('click', ExtSelector.CHECK_ALL, gfnCheckAll)
    .on('click', ExtSelector.CHECK_ITEM, gfnCheckItem)
    .on('click', ExtSelector.MODAL_OPEN, gfnOpenModal)
    .on('click', ExtSelector.MODAL_SRCH, gfnSearchModal)
    .on('click', ExtSelector.MODAL_CLOSE, gfnCloseModal)
    .on('click', ExtSelector.MODAL_CNF_RTN, gfnReturnModal)
    .on('click', ExtSelector.MODAL_RSN_RTN, gfnReasonModal)
    .on('click', ExtSelector.MODAL_SEL_RTN, gfnSelectReturnModal)
    .on('click', ExtSelector.MODAL_PAGING, gfnSearchModalPaging)
    .on('keypress', ExtSelector.MODAL_ENTR_SRCH, gfnKeypressSearchModal)
    .on('change', ExtSelector.COMBO_RLTNL, gfnSelectChangEvent)
    .on('click', ExtSelector.LNK_ADD_TAB, gfnAddTab)
    .ready(function(e) {
        $('.ext-component').each(gfnCreateComponent);
    });
/***************************************************************
 * Ajax call
 ***************************************************************/
function gfnAddTab(e) {
    if (isEmptyExt($(this).data())) {
        console.error('DATASET 설정을 해주세요.');
        return;
    }
    let data = $(this).data();
    if (isEmptyExt(data.menuId)) {
        console.error('메뉴아이디를 설정해 주세요.');
        return;
    }
    if (isEmptyExt(data.menuNm)) {
        console.error('메뉴명을 설정해 주세요.');
        return;
    }
    if (isEmptyExt(data.url)) {
        console.error('URL을 설정해 주세요.');
        return;
    }
    let queryString = '',
        param = $.extend({}, data, data.param);
    delete param.menuId;
    delete param.menuNm;
    delete param.url;
    delete param.param;
    if (!isEmptyExt(param)) {
        queryString = '?'.concat($.param(param));
    }
    addTab(data.menuId, data.menuNm, data.url + queryString);
}
/***************************************************************
 * Common Select Component
 ***************************************************************/
function gfnCreateComponent(index, elem, flag) {
    let $_elem = $(elem),
        data = $_elem.data();
    if ($.isEmptyObject(data)) {
        console.error('속성(dataset)를 설정해주세요.');
        return false;
    }
    if (isEmpty(data.option)) {
        console.error('설정 옵션(option)를 지정해주세요.');
        return false;
    }
    if (elem.getAttribute('id') === data.target) {
        console.error('설정 타겟(target)를 재확인해주세요.');
        return false;
    }
    if ($_elem.prop('tagName') === 'SELECT') {
        gfnCreateSelectOptions(elem, data);
    }
}
function gfnCreateSelectOptions(elem, data) {
    let optionElement = document.createElement('option'),
        optionText = document.createTextNode(data.nullText || '전체'),
        $_element = { select: $(elem), option: $(optionElement) };
    // setting
    $_element.option.val('');
    if (!$_element.select.hasClass('select')) {
        $_element.select.addClass('select');
    }
    if (!$_element.select.hasClass('ext-select')) {
        $_element.select.addClass('ext-select');
    }
    $_element.select.addClass(data.cls || '');
    if (!isEmpty(data.target)) {
        let $_next = $('#'.concat($_element.select.data('target')));
        $_next.data('prev', $_element.select.attr('id'));
    }
    // draw
    optionElement.appendChild(optionText);
    elem.appendChild(optionElement);
    // data load
    if (data.load) {
        gfnAjaxData(elem, data);
    } else {
        if (!isEmpty(data.callback) && typeof window[data.callback] === 'function') {
            window[data.callback]();
        }
    }
}
function gfnAjaxData(elem, data) {
    // console.log(data);
    let prev = $('#'.concat(data.prev)),
        params = {
            categorycd: prev.val(),
            depth: data.depth,
            sitecd: data.sitecd
        };
    cmAjax({
        url: '/common/module/dpcategory',
        type: 'POST',
        dataType: 'json',
        data: params,
        scope: {
            target: elem,
            params: params,
            callback: data.callback
        },
        success: gfnAjaxDataSucc
    });
}
function gfnAjaxDataSucc(data) {
    if (data.status === 'succ') {
        let records = data.object,
            params = this.scope.params,
            selectElement = this.scope.target,
            $_element = { select: $(selectElement) };
        $_element.select.find('option[value!=""]').remove();
        $_element.select.val('').trigger('change');
        if (records.length > 0) {
            records.forEach(function(item, index, arry) {
                let optionElement = document.createElement('option');
                $_element.option = $(optionElement);
                $_element.option.val(item.code).text(item.name);
                selectElement.appendChild(optionElement);
            });
        }
        if (!isEmpty(this.scope.callback) && typeof window[this.scope.callback] === 'function') {
            window[this.scope.callback]($_element.select);
        }
    }
}
function gfnSelectChangEvent(e) {
    // console.log(this);
    let target = $(this).data('target'),
        elem = document.getElementById(target);
    gfnAjaxData(elem, $.extend({
        categorycd: this.value
    }, $(elem).data()));
}
/***************************************************************
 * Common Input Component
 * checkbox 전체 선택 or 해제 / 개별선택시 전체 선택 or 해제 기능
 ***************************************************************/
function gfnCheckAll(e) {
    let selector = 'input:checkbox[name=' + this.name + ']:not(:disabled)';
    $(selector).prop('checked', ($(this).is(':checked')) ? true : false);
    let callback = $(this).data('callback'); // dataset에 지정된 callback 함수 호출
    if (!isEmpty(callback)) {
        window[callback]();
    }
}
function gfnCheckItem(e) {
    let isChecked = true,
        selector = 'input:checkbox[name=' + this.name + '].checkbox.ext-check-all';
    $('input:checkbox[name=' + this.name + '].checkbox.ext-check-item').each(function() {
        isChecked = isChecked && $(this).is(':checked');
    });
    $(selector).prop('checked', isChecked);
    // dataset에 지정된 callback 함수 호출
    let callback = $(this).data('callback');
    if (!isEmpty(callback)) {
        window[callback]();
    }
}
/***************************************************************
 * Common Button Component(Popup)
 ***************************************************************/
function gfnExcelDownload(e) {
    console.log(this);
}
function gfnOpenModal(e) {
    // console.log(this);
    let res = false,
        elem = $(this),    /* click button */
        data = elem.data();
    if ($.isEmptyObject(data) || isEmpty(data.modal)) {
        console.error('팝업(modal)를 지정해주세요.');
        return;
    }
    if (isEmpty(data.callback)) {
        console.error('결과(callback)를 지정해주세요.');
        return;
    }
    if (!isEmpty(data.before)) {
        if (typeof window[data.before] !== 'function') {
            console.error('선행 함수가 없습니다.');
            return;
        }
        if (!window[data.before]()) {
            return;
        }
    }
    let param = data.param || {};
    let params = $.extend(data, param, {
            modal: data.modal.toLowerCase(),
            type: data.type || 'single',
            cls: data.cls || 'md',
            pageSize: 10
        }),
        isModal = $('#modal-' + params.modal);
    if (data.modal.toLowerCase() === 'admin') {
        params.dept = data.dept || '';
    }
    // 버튼 중복클릭 방지
    if (isModal.length > 0) {
        isModal.show();
        return;
    }
    // console.log('params', params); // modal popup data
    let url = '/common/modal',
        $_dom = $(document.createElement('div'));
    $_dom.attr('class', 'modal-popup');
    $_dom.data('btn', elem);
    $_dom.data(params).load(url, $.param(params), function() {
        let elem = $(this);
        $('.layer-popup-wrap').append(elem);    // load된 내용 호출
        elem.find('.layer-wrap').show();        // 팝업 보이기
    });
}
function gfnKeypressSearchModal(e) {
    if (e.type === 'keypress' && e.which === 13) {
        e.preventDefault();
        $(this).closest('form').find('button.btn-modal-search').trigger('click');
    }
}
function gfnSearchModal(e) {
    if (e.type === 'click') {
        let elem = $(this),
            modal = elem.closest('.modal-popup'),
            data = modal.data(),
            form = elem.closest('#frm-search-' + data.modal),
            dom = modal.find('.layer-content'),
            url = '/common/modal #modal-content-' + data.modal,
            params = $.extend({}, data);
        delete params.btn; // element object 를 request parameter로 넘기지 않기 위함.
        dom.data(data).load(url, $.param($.extend({}, form.serializeObject(), params)), function(e) {
            // TODO
            if (data.modal === 'product' && !isEmpty($('select#ext-comp-ctgr1').data('reqval'))) {
                $('select#ext-comp-ctgr1').trigger('change');
            }
        });
    }
}
function gfnSearchModalPaging(e) {
    let elem = $(this),
        modal = elem.closest('.modal-popup'),
        data = modal.data(),
        dom = modal.find('.layer-content'),
        url = '/common/modal #modal-content-' + data.modal;
    data.nowPageNo = $(this).data('page');
    dom.data(data).load(url, $.param(data), function(e) {
        // TODO
    });
}
function gfnSelectReturnModal(e) {
    // console.log(this);
    let elem = $(this),
        selected = elem.closest('tr').find('.ext-check-item');
    selected.attr('checked', 'checked');
    elem.closest('.layer-body').find('.ext-return-pop').trigger('click');
}
function gfnReasonModal(e) {
    let elem = $(this),
        modal = elem.closest('.modal-popup'),
        data = modal.data(),
        textareaElement = elem.closest('.layer-body').find('textarea[name=reason]'),
        reason = textareaElement.val();
    if (isEmpty(textareaElement.val())) {
        alert('엑셀 다운로드 사유를 입력해주세요.');
        textareaElement.focus();
        return;
    }
    window[data.callback](reason);
    elem.closest('.layer-bottom').find('button.ext-close-pop').trigger('click');
}
function gfnReturnModal(e) {
    let elem = $(this),
        returnValues = [],
        selector = ['.board-list input.ext-check-item:checked',
                    '.board-list input[name=radio-item]:checked'],
        selected = elem.closest('.layer-body').find(selector.join(',')),
        callback = elem.closest('.modal-popup').data('callback'),
        $_divElement = elem.closest('.modal-popup').data('btn').closest('div.input-group');
    selected.each(function(index, item, array) {
        let me = $(item);
        if (me.is(':checked') && me.attr('id') !== 'check-all') {
            returnValues.push($(item).data());
        }
    });
    // 선택된 항목 params.target 세팅
    // console.log($_divElement);
    if (returnValues.length > 0) {
        $_divElement.find('.input-text').val(returnValues[0].name);
        $_divElement.find('input[type=hidden]').val(returnValues[0].code);
    }
    if (!isEmpty(callback)) {
        window[callback](returnValues);
    }
    elem.closest('.layer-bottom').find('button.ext-close-pop').trigger('click');
}
function gfnCloseModal(e) {
    let elem = $(this);
    elem.closest('.layer-wrap').hide();         // 팝업 숨기기
    elem.closest('.modal-popup').remove();      // 숨겨진 팝업 삭제
}