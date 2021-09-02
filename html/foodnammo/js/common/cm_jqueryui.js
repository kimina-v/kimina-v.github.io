var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
    tabCounter = 1,
    tabMaxNum = 10;

$( function() {
    var tabs = $( "#tabs" ).tabs();
    // Close icon: removing the tab on click
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        $(tabs).tabs( "refresh" );
        sessionStorage.removeItem(panelId);
        tabCounter--;
    });


} );

// Actual addTab function: adds new tab using the input from the form above
function addTab(menuId, menuNm, menuUrl) {
    if (isEmpty(menuUrl)) {
        return;
    }
    //url에 tabid를 같이 넘김
    if(menuUrl.indexOf('?') < 0) {
        menuUrl += "?tabId=" + menuId;
    } else {
        menuUrl += "&tabId=" + menuId;
    }
    //alert(menuUrl);
    if (tabCounter >= tabMaxNum) {
        alert("오픈할 수 있는 tab 최대 개수는 " + tabMaxNum + "개입니다.\n사용하지 않는 화면의 tab은 닫아 주세요.");
        return;
    }
    // $('.dropdown-menu').hide();
    var label = menuNm,
        id = menuId,
        //id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = '<iframe scrolling="auto" frameborder="0"  src="' + menuUrl + '" style="width:100%;height:100%;"></iframe>';

    //같은 tab id로 이미 생성되어 있으면 해당 tab을 활성화
    var tab_id = id2Index(tabs, id);    
    if (tab_id < 0) {

        $(tabs).find(".ui-tabs-nav").append(li);
        $(tabs).append("<div id='" + id + "'>" + tabContentHtml + "</div>");
        $(tabs).tabs("refresh");

        $(tabs).tabs({active: id2Index(tabs, id)});
        tabCounter++;
    } else {
        $(tabs).tabs({active: tab_id});
    }
}


// 대시보드를 제외하고 모든 tab을 close
function closeAllTabs(){
    for (var i = tabCounter; i >= 1; i--) {
        $(tabs).find(".ui-tabs-nav li:eq(" + i + ")").remove();
        $(tabs).find(".ui-tabs-panel:eq(" + i + ")").remove();
        var tabid = $(tabs).find("li a").eq(i-1).attr("href");
        //대시보드탭은 sessionStorage 삭제안함
        if ( i > 1 ) {
            sessionStorage.removeItem(tabid);
        }
    }
    //tabCounter 초기화
    tabCounter = 1;
    $(tabs).tabs("refresh");
}


// tab id로 tab index 찾기
function id2Index(tabsId, srcId){
    // index 값 -1로 설정
    var index = -1;
    // i 값 선언, tbH : 해당하는 탭의 a 태그 찾기
    var i = 0, tbH = $(tabsId).find("li a");
    // tbH 길이 선언
    var lntb = tbH.length;
    // lntb가 0보다 클경우
    if(lntb>0){
        for(i=0;i<lntb;i++){
            o=tbH[i];
            var jbSplit = o.href.split('#');
            if(jbSplit[1] === srcId){
            //if(o.href.search(srcId)>0){
                index = i;
            }
        }
    }
    // index값 리턴
    return index;
}
