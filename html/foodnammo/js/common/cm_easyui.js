function toggleLnb(obj) {
    if ($(obj).hasClass('on')) {
        $(obj).removeClass('on').next('.tree_depth2').slideUp(300);
    } else {
        $('.lnb_tree .tree_depth').removeClass('on');
        $('.lnb_tree .tree_depth1').removeClass('on');
        $('.lnb_tree .tree_depth2').slideUp(300);
        $(obj).addClass('on').next('.tree_depth2').slideDown(300);
    }
}


/**
 * @function Name  : goMenu
 * @function Desc  :
 *        GNB 메뉴 이동을 한다.
 *        - 기존에 열려 있는 tab 모두 close
 *        - 이동할 GNB의 left menu load
 *        - 이동할 메뉴화면 tab 추가
 *
 * @작성일   : 2018. 01. 08.
 * @작성자   : wyjeong
 * @변경이력  :
 *           이름    : 일자            : 근거자료        : 변경내용
 *           --------------------------------------------------------------------------------
 *           wyjeong    : 2018. 01. 08.    :                : 신규 개발
 *
 * @param    obj - top menu li
 * @param    menuUrl - 이동할 tab 화면 url
 * @return
 */
function goMenu(obj, menuUrl) {
    // header menu 이동 시 tab close 하는 부분 막음
    /*var count = $('#tt').tabs('tabs').length;
    for (var i=count-1; i>=0; i--) {
        $('#tt').tabs('close', i);

    }*/

    // dashboard는 close함..
    $("#tt ul.tabs li").each(function (idx, obj) {
        var menuNm = $(this).text();
        if (menuNm === "dashboard")
            $('#tt').tabs('close', idx);
    });

    // click한 header menu class on
    $('#header .gnb li a').removeClass('on');
    $(obj).addClass('on');


    var menuNm = '';
    var check = false;

    var options = {
        url: "/common/leftMenu.do"
        , data: {url: menuUrl}
        , dataType: "json"
        , async: true
        , callBack: function (data) {
            var html = '', url = '', cls = '', style = '';
            for (var i = 0; i < data.leftMenuList.length; i++) {
                var item = data.leftMenuList[i];
                html += '<li>';

                if (check === false && item.url === menuUrl) {
                    menuNm = item.menuNm;
                    check = true;
                    addTab(menuNm, menuUrl);
                }

                if (item.listMenuBaseVO == null || item.listMenuBaseVO === '') {
                    if (data.commonMenuDetail.menuNo === item.menuNo) cls = 'on';
                    else cls = '';

                    url = 'javascript:addTabDepth1(\'' + item.menuNm + '\', \'' + item.url + '\', this);';
                    html += '<a href="#" onclick="' + url + '" class="tree_depth ' + cls + '">' + item.menuNm + '</a>';
                } else {
                    if (data.commonMenuDetail.upMenuNo === item.menuNo) {
                        cls = 'on';
                        style = 'style="display: block;"';
                    } else {
                        cls = '';
                        style = '';
                    }

                    html += '<a href="#" onclick="javascript:toggleLnb(this);" class="tree_depth1 ' + cls + '">' + item.menuNm + '</a>';
                    html += '<ul class="tree_depth2" ' + style + '>';

                    for (var j = 0; j < item.listMenuBaseVO.length; j++) {
                        var subItem = item.listMenuBaseVO[j];

                        if (subItem.url === '') url = '#'
                        else url = 'javascript:addTab(\'' + subItem.menuNm + '\', \'' + subItem.url + '\');';
                        if (check === false && subItem.url === menuUrl) {
                            menuNm = subItem.menuNm;
                            check = true;

                            addTab(menuNm, menuUrl);
                        }

                        html += '<li><a href="' + url + '">' + subItem.menuNm + '</a></li>';
                    }
                    html += '</ul>';
                }
                html += '</li>';
            }

            $('#side .lnb_tree').html(html);
        }
    };
    ajax.call(options);
}


/**
 * @function Name  : addTabDepth1
 * @function Desc  :
 *        tree의 하위 메뉴가 없는 경우, tree menu 토글 처리 후 tab 화면을 추가한다.
 *
 * @작성일   : 2018. 01. 08.
 * @작성자   : wyjeong
 * @변경이력  :
 *           이름    : 일자            : 근거자료        : 변경내용
 *           --------------------------------------------------------------------------------
 *           wyjeong    : 2018. 01. 08.    :                : 신규 개발
 *
 * @param    menuNm - 메뉴명
 *            menuUrl - 추가할 tab 화면 url
 *            obj - lnb tree obj
 * @return
 */
function addTabDepth1(menuNm, menuUrl, obj) {
    toggleLnb(obj);
    addTab(menuNm, menuUrl);
}


/**
 * @function Name  : addTab
 * @function Desc  :
 *        tab 화면을 추가한다. (기존에 해당 메뉴명의 tab이 열려 있으면 화면 update)
 *
 * @작성일   : 2018. 01. 08.
 * @작성자   : wyjeong
 * @변경이력  :
 *           이름    : 일자            : 근거자료        : 변경내용
 *           --------------------------------------------------------------------------------
 *           wyjeong    : 2018. 01. 08.    :                : 신규 개발
 *
 * @param    menuNm - 메뉴명
 *            menuUrl - 추가할 tab 화면 url
 * @return
 */
function addTab(menuNm, menuUrl) {
    $('.dropdown-menu').hide();

    var obj = parent.$('#tt');

    var content = '<iframe scrolling="auto" frameborder="0"  src="' + menuUrl + '" style="width:100%;height:99.5%;"></iframe>';
    if (obj.tabs('exists', menuNm)) {
        obj.tabs('select', menuNm);
        var tab = obj.tabs('getSelected');

        obj.tabs('update', {
            tab: tab,
            options: {
                title: menuNm,
                content: content
            }
        });
    } else {
        var tabCount = parent.$("#tt ul.tabs li").length;
        if (tabCount === 15) {
            // messager.alert("오픈할 수 있는 tab 최대 개수는 15개입니다.\n사용하지 않는 화면의 tab은 닫아 주세요.", "Info", "info");
            alert("오픈할 수 있는 tab 최대 개수는 15개입니다.\n사용하지 않는 화면의 tab은 닫아 주세요.");
            return;
        }

        obj.tabs('add', {
            title: menuNm,
            content: content,
            closable: true
        });
    }
}


/**
 * @function Name  : updateTab
 * @function Desc  :
 *        현재 열려 있는 tab 화면을 update한다. (refresh)
 *
 * @작성일   : 2018. 01. 08.
 * @작성자   : wyjeong
 * @변경이력  :
 *           이름    : 일자            : 근거자료        : 변경내용
 *           --------------------------------------------------------------------------------
 *           wyjeong    : 2018. 01. 08.    :                : 신규 개발
 *
 * @param    menuUrl - 추가할 tab 화면 url (option)
 *            menuNm - 메뉴명 (option)
 * @return
 */
function updateTab(menuUrl, menuNm) {
    var tab = parent.$('#tt').tabs('getSelected');
    var prevIndex = parent.$('#tt').tabs('getTabIndex', tab);
    var content = "";

    // 1. menuUrl, menuNm이 모두 없는 경우, 현재 화면 refresh (view 화면에서 정보 수정 후 refresh할 때 사용)
    if (menuUrl == null && menuNm == null) {
        parent.$('#tt').tabs('update', {
            tab: tab,
            options: {}
        });
    }
    // 2. menuUrl만 있는 경우, 화면 url 이동
    else if (menuUrl != null && menuNm == null) {
        content = '<iframe scrolling="auto" frameborder="0"  src="' + menuUrl + '" style="width:100%;height:99.5%;"></iframe>';
        parent.$('#tt').tabs('update', {
            tab: tab,
            options: {
                content: content
            }
        });
    }
    // 3. menuUrl, menuNm 모두 있는 경우, 해당 tab 정보 모두 update (insert 화면에서 정보 등록 후, view 화면으로 이동할 때 사용)
    else {
        content = '<iframe scrolling="auto" frameborder="0"  src="' + menuUrl + '" style="width:100%;height:99.5%;"></iframe>';
        if (parent.$('#tt').tabs('exists', menuNm)) {
            parent.$('#tt').tabs('select', menuNm);
            var tab2 = parent.$('#tt').tabs('getSelected');
            parent.$('#tt').tabs('update', {
                tab: tab2,
                options: {
                    title: menuNm,
                    content: content
                }
            });

            parent.$('#tt').tabs('close', prevIndex);
        } else {
            parent.$('#tt').tabs('update', {
                tab: tab,
                options: {
                    title: menuNm,
                    content: content
                }
            });
        }
    }
}


/**
 * @function Name  : getSeletedTabTitle
 * @function Desc  :
 *        현재 선택되어 있는 tab의 메뉴명을 리턴한다.
 *
 * @작성일   : 2018. 01. 08.
 * @작성자   : wyjeong
 * @변경이력  :
 *           이름    : 일자            : 근거자료        : 변경내용
 *           --------------------------------------------------------------------------------
 *           wyjeong    : 2018. 01. 08.    :                : 신규 개발
 *
 * @param
 * @return    tab 메뉴명
 */
function getSeletedTabTitle() {
    return parent.$('.tabs-selected .tabs-title').text();
}


/**
 * @function Name  : closeGoTab
 * @function Desc  :
 *        현재 열려 있는 tab view를 닫는다.
 *
 * @작성일   : 2018. 01. 08.
 * @작성자   : wyjeong
 * @변경이력  :
 *           이름    : 일자            : 근거자료        : 변경내용
 *           --------------------------------------------------------------------------------
 *           wyjeong    : 2018. 01. 08.    :                : 신규 개발
 *
 * @param
 * @return
 */
function closeTab() {
    var tab = parent.$('#tt').tabs('getSelected');
    var index = parent.$('#tt').tabs('getTabIndex', tab);
    parent.$('#tt').tabs('close', index);
}


/**
 * @function Name  : closeGoTab
 * @function Desc  :
 *        tab view에서 데이터 삭제 후 해당 tab view를 닫고, 목록 화면으로 이동한다.
 *
 * @작성일   : 2018. 01. 24.
 * @작성자   : wyjeong
 * @변경이력  :
 *           이름    : 일자            : 근거자료        : 변경내용
 *           --------------------------------------------------------------------------------
 *           wyjeong    : 2018. 01. 24.    :                : 신규 개발
 *
 * @param    menuNm - 이동할 목록의 tab 메뉴명
 *            menuUrl - 이동할 목록 url
 * @return
 */
function closeGoTab(menuNm, menuUrl) {
    var tab = parent.$('#tt').tabs('getSelected');
    var prevIndex = parent.$('#tt').tabs('getTabIndex', tab);

    addTab(menuNm, menuUrl);
    parent.$('#tt').tabs('close', prevIndex);
}


function goMenuFocus(obj, menuUrl) {
    // click한 header menu class on
    parent.$('#header .gnb li a').removeClass('on');
    $(obj).addClass('on');

    var options = {
        url: "/common/leftMenu.do"
        , data: {url: menuUrl}
        , dataType: "json"
        , async: true
        , callBack: function (data) {
            var html = '', url = '', cls = '', style = '';
            for (var i = 0; i < data.leftMenuList.length; i++) {
                var item = data.leftMenuList[i];
                html += '<li>';

                if (item.listMenuBaseVO == null || item.listMenuBaseVO === '') {
                    if (data.commonMenuDetail.menuNo === item.menuNo) cls = 'on';
                    else cls = '';

                    url = 'javascript:addTabDepth1(\'' + item.menuNm + '\', \'' + item.url + '\', this);';
                    html += '<a href="#" onclick="' + url + '" class="tree_depth ' + cls + '">' + item.menuNm + '</a>';
                } else {
                    if (data.commonMenuDetail.upMenuNo === item.menuNo) {
                        cls = 'on';
                        style = 'style="display: block;"';
                    } else {
                        cls = '';
                        style = '';
                    }

                    html += '<a href="#" onclick="javascript:toggleLnb(this);" class="tree_depth1 ' + cls + '">' + item.menuNm + '</a>';
                    html += '<ul class="tree_depth2" ' + style + '>';

                    for (var j = 0; j < item.listMenuBaseVO.length; j++) {
                        var subItem = item.listMenuBaseVO[j];

                        if (subItem.url === '') url = '#'
                        else url = 'javascript:addTab(\'' + subItem.menuNm + '\', \'' + subItem.url + '\');';

                        html += '<li><a href="' + url + '">' + subItem.menuNm + '</a></li>';
                    }
                    html += '</ul>';
                }
                html += '</li>';
            }

            parent.$('#side .lnb_tree').html(html);
        }
    };
    ajax.call(options);
}


$(function () {
    // tab title을 클릭했을 때..
    parent.$("#tt ul.tabs li.tabs-selected .tabs-inner").click(function (e) {
        e.preventDefault();

        var menuNm = $(this).text();
        if (menuNm === "dashboard")
            return;

        if (parent == null)
            return;

        var tab = parent.$('#tt').tabs('getTab', menuNm);

        var menuUrl = $(tab.children('iframe')).attr('src');
        var menuUrls = menuUrl.split('?');

        var options = {
            url: "/common/getMastMenuNo.do"
            , data: {menuUrl: menuUrls[0]}
            , dataType: "json"
            , callBack: function (data) {
                parent.$('#header .gnb li').each(function (idx, obj) {
                    var menuNo = $(this).data('menuNo');
                    if (menuNo === data.mastMenuNo) {
                        if (!$(this).children('a').hasClass("on"))
                            goMenuFocus($(this).children('a'), menuUrls[0]);
                    }
                });
            }
        };
        ajax.call(options);
    });

});
var waiting = {
    start: function () {
        $.blockUI({message: '<img src="/images/ajax-loader-white.gif" alt="Loading..." />'});
    }
    , stop: function () {
        $.unblockUI();
    }
    , startId: function (id) {
        $.blockUI({message: $("#" + id)});
    }
    , stopId: function () {
        $.unblockUI();
    }
};

var ajax = {
    call: function (options) {

//         var wait = true;
//
//         if (options.wait != null) {
//             wait = false;
//         }
//
//         if (wait) {
//             waiting.start();
//         }
//
//         jQuery.ajaxSettings.traditional = true;
//
//         options.contentType = setDefaultIfNull(options.contentType, "application/x-www-form-urlencoded;charset=UTF-8");
//         options.type = setDefaultIfNull(options.type, "POST");
//         options.dataType = setDefaultIfNull(options.dataType, "json");
//         options.async = (options.async == null || options.async) ? true : false;
//         var noAlert = (options.noAlert == null) ? false : options.noAlert
//
//         $.ajax({
//             url: options.url
//             , type: options.type
//             , dataType: options.dataType
//             , contentType: options.contentType
//             , cache: false
//             , data: options.data
//             , async: options.async
//         })
//             .done(function (data, textStatus, jqXHR) {
//                 if (options.dataType === "text" || options.dataType === "html") {
//                     try {
//                         var obj = eval("(" + data + ")");
//
//                         if (obj.exCode != null && obj.exCode !== "") {
//                             messager.alert(obj.exMsg, "Info", "info");
// //						waiting.stop();
//                         } else {
//                             options.callBack(data);
//                             common.all();
//                         }
//                     } catch (e) {
//                         options.callBack(data);
//                         common.all();
//                     }
//                 } else {
//                     if (data.exCode != null && data.exCode !== "") {
//                         messager.alert(data.exMsg, "Info", "info");
// //					waiting.stop();
//                     } else {
//                         options.callBack(data);
//                         common.all();
//                     }
//                 }
//             })
//             .fail(function (xhr, status, error) {
//                 if (xhr.status === 450) {
//                     location.replace("/login/noSessionView.do");
//                 } else {
//                     if (!noAlert) {
//                         messager.alert("오류가 발생되었습니다. 관리자에게 문의하십시요.[" + xhr.status + "][" + error + "]", "Error", "error");
//                     }
//                 }
//             })
//             .always(function () {
//                 if (wait) {
//                     waiting.stop();
//                 }
//             })
//             .then(function (data, textStatus, jqXHR) {
//
//             });
    },
    load: function (targetId, url, params) {
        waiting.start();

        if (params == null) {
            params = {};
        }
        $("#" + targetId).load(url, params, function (response, status, xhr) {
            waiting.stop();

            if (status === "error") {
                if (xhr.status === 450) {
                    location.replace("/login/noSessionView.do");
                } else {
                    messager.alert("오류가 발생되었습니다. 관리자에게 문의하십시요.[" + xhr.status + "][" + error + "]", "Error", "error");
                }
            }

        });
    }
};