var fnc_return;

var fncReturns = {};

//layer popup 가운데로 
function cmLayerPopupCenter(layerBox) {
	
	var popW = layerBox.width();
	var popH = layerBox.height();
	var scroll_top = jQuery(document).scrollTop();
	var winW = jQuery(window).width();
	var winH = jQuery(window).height();
	var top = (winH - popH) / 2 - 30;
	
	if (winW > popW) {
		layerBox.css("left", winW / 2 - popW / 2);
	}
	else {
		layerBox.css("left", 0);
	}
	
	if(popH > winH - 100){
		jQuery('.pop-contents', layerBox).css('height', winH-200);
		layerBox.css({'top' : scroll_top + 50});
	} else {
		jQuery('.pop-contents', layerBox).css('height', 'auto');
		layerBox.css({'top' : top + scroll_top});
	}
}

// 레이어 팝업 background 보이기
function showLayerPopupBackground( id ) {
	var bgPop;
	if (id != undefined && id != "") {
		bgPop			= jQuery("#" + id);
		if (bgPop.html() == null) {
			bgPop = jQuery("<div id=\""+ id +"\"></div>").appendTo(jQuery("body"));
		}
	}
	else {
		bgPop			= jQuery(".bg-pop").eq(0);
		if (bgPop.size() == 0) {
			bgPop = jQuery("<div class=\"bg-pop\"></div>").appendTo(jQuery("body"));
		}
	}
	bgPop.show();
}

// 레이어 팝업 background 숨기기
function hideLayerPopupBackground(id) {
	if (id != undefined && id != "") {
		jQuery("#" + id).hide();
	}
	else {
		jQuery(".bg-pop").eq(0).hide();
	}
}

function cmDialogOpen(customId, p_opt) {
	
	if (jQuery('#div_'+customId).html() != null) {
		jQuery('#div_'+customId).dialog('destroy');
		jQuery("#"+customId).attr('src','');
	}
	
	if (jQuery('#div_'+customId).html() == null) {
		var arrHtml	= [];
		
		arrHtml.push("<div id='div_"+customId+"' style='display:none;padding:0px;margin:0px;overflow:hidden;'>");
		arrHtml.push("<iframe id='"+customId+"' name='"+customId+"' class='ui-iframe-style' src='about:blank' style='overflow-x:hidden' scrolling='auto' marginwidth='0' marginheight='0' frameborder='0' vspace='0' hspace='0'></iframe>");
		arrHtml.push("</div>");
		jQuery(arrHtml.join("")).appendTo("body");
	}
	
	var defaults = {
		maxWidth : "1000"
		, maxHeight : "4000"
		, modal : true
		, scroll :"auto"
	};
	var options = jQuery.extend(defaults, p_opt);
	
	jQuery('#div_'+customId).dialog({
		title: 		options.title,
		bgiframe: 	true,
        autoOpen: 	false,
        width:		options.width,
 		height:		options.height,
 		minWidth :  options.minWidth,
 		minHeight : options.minHeight,
 		maxWidth :  options.maxWidth,
 		maxHeight : options.maxHeight,
 		position :  options.position,
		modal: 		options.modal ,
		resizable:  false,
        open: function() { 
        	jQuery('.msgBoxHide').hide();
			jQuery("#"+customId).height(jQuery(this).height()); 
			jQuery("#"+customId).width("100%");
			jQuery('html').addClass('nscroll');
		},
        resize: function() { 
			jQuery('#popcontent').hide(); 
		},
        resizeStop: function() { 
			jQuery("#"+customId).show();
			jQuery("#"+customId).height(jQuery(this).height()-10);  
			jQuery("#"+customId).width(jQuery(this).width()-20); 
		},
		close: function(){
			jQuery('.msgBoxHide').show();
			jQuery("#"+customId).attr('src','');
			//jQuery('#div_'+customId).dialog('destroy');
			cmDialogClose(customId);
			jQuery('html').removeClass('nscroll');
		} 
	}).data("options", options); 
						
	//dialog 종료후 실행될 function setting
	if (options.fnc_return != undefined) {
		fncReturns[customId]		= options.fnc_return;
	}
	
	//dialog시 불러올 iframe 주소
	jQuery("#"+customId).attr({src: options.url});
	
	// IE 10 해당 방법으로 사용 불가
	var ieCheck = fnIECheck();
	if (ieCheck.isIE && ieCheck.version >= 10) {
		options.changeViewAutoSize = false;
	}
	
	if ( options.changeViewAutoSize ) {
		jQuery("#"+customId).load(function (event) {
			
			var popBody = jQuery("#"+customId).contents().find("body");
			var height = popBody.height();
			
			if (options.maxHeight > height) {
				jQuery('#div_'+customId).height(height);
				jQuery('#'+customId).height(height);
			}
			
			popBody.resize(function (event) {
				height = popBody.height();
				
				if (jQuery('#div_'+customId).height() != height) {
					if (options.maxHeight > height) {
						jQuery('#div_'+customId).height(height);
						jQuery('#'+customId).height(height);
					}
					else  {
						jQuery('#div_'+customId).height(options.maxHeight);
						jQuery('#'+customId).height(options.maxHeight);
					}
				}
			});
		});
	}
	
	//to-do : 타이틀 없애는 거 추가
	if ( typeof options.hideTitle != 'undefined' || options.hideTitle == true ) {
		jQuery('.ui-dialog-titlebar').hide();
	}
	else {
		jQuery('.ui-dialog-titlebar').show();
	}
	
	jQuery("#"+customId).show();
	jQuery('#div_'+customId).dialog("open");
}

/**
 * IFrame 레이어 팝업 종료 함수
 */
function cmDialogClose(customId){
	//창 종료 후 실행될 함수
	
	if (typeof fncReturns[customId] == "function") {
		fncReturns[customId]();
	}
	jQuery('.msgBoxHide').show();
	jQuery('#div_'+customId).dialog('close');
	jQuery('#div_'+customId).remove();
//	jQuery('#div_'+customId).dialog('destroy');
//	jQuery("#"+customId).attr('src','');
}

/**
 * gwkoo
 * dialog close callback function in parameter
 * @param customId
 * @param option
 */
function cmDialogClose(customId, option) {
	if (typeof fncReturns[customId] == "function") {
		fncReturns[customId](option);
	}
	jQuery('.msgBoxHide').show();
	jQuery('#div_'+customId).dialog('close');
	jQuery('#div_'+customId).remove();
}

function cmDialogResize(customId, height) {
	
	if (height == undefined) {
		return;
	}
	
	var options = jQuery('#div_'+customId).data("options");
	
	if (jQuery('#div_'+customId).height() != height) {
		if (options.maxHeight > height) {
			jQuery('#div_'+customId).height(height);
			jQuery('#'+customId).height(height);
		}
		else  {
			jQuery('#div_'+customId).height(options.maxHeight);
			jQuery('#'+customId).height(options.maxHeight);
		}
	}
}

/**
 * Layer popup Resize 공통함수
 */
function cmDialogLayerResize(customId) {
	var height = jQuery("body").height();
	
	try {
		parent.cmDialogResize(customId, height);
	} catch (e) {}
}

/**
 * IFrame을 이용한 레이어 팝업
 * @param options
 */
function dialogOpen(p_opt){
	
	if (jQuery('#common_dialog').html() == null) {
		var arrHtml	= [];
		
		arrHtml.push("<div id=\"common_dialog\" style=\"display:none;padding:0px;margin:0px;\">");
		arrHtml.push("<iframe id=\"popcontent\" name=\"popcontent\" class=\"ui-iframe-style\" src=\"about:blank\" scrolling=\"auto\" marginwidth=\"0\" marginheight=\"0\" frameborder=\"0\" vspace=\"0\" hspace=\"0\"></iframe>");
		arrHtml.push("</div>");
		jQuery(arrHtml.join("")).appendTo("body");
	}

	var defaults = {
		maxWidth : "600"
		, maxHeight : "600"
		, modal : true
	};
	var options = jQuery.extend(defaults, p_opt);
	
	jQuery('#common_dialog').dialog({
			title: 		options.title,
			bgiframe: 	true,
	        autoOpen: 	false,
	        width:		options.width,
     		height:		options.height,
     		minWidth :  options.minWidth,
     		minHeight : options.minHeight,
     		maxWidth :  options.maxWidth,
     		maxHeight : options.maxHeight,
     		position : options.position,
			modal: 		typeof options.modal == 'undefined' ? true : options.modal ,
			resizable:  false,
	        open: function() { 
	        	jQuery('.msgBoxHide').hide();
				jQuery('#popcontent').height(jQuery(this).height()-10); 
				jQuery('#popcontent').width(jQuery(this).width()-10); 
			},
	        resize: function() { 
				jQuery('#popcontent').hide(); 
			},
	        resizeStop: function() { 
				jQuery('#popcontent').show();
				jQuery('#popcontent').height(jQuery(this).height()-10);  
				jQuery('#popcontent').width(jQuery(this).width()-10); 
			},
			close: function(){
				jQuery('.msgBoxHide').show();
				jQuery('#popcontent').attr('src','');
				jQuery('#common_dialog').dialog('destroy');
			} 
	}); 
						
	//dialog 종료후 실행될 function setting
	if (options.fnc_return != undefined) {
		fnc_return		= options.fnc_return;
	}
	
	//dialog시 불러올 iframe 주소
	jQuery('#popcontent').attr({src: options.url});
	
	if ( options.changeViewAutoSize ) {
		jQuery("#popcontent").load(function (event) {
			
			var popBody = jQuery("#popcontent").contents().find("body");
			var height = popBody.height();
			
			if (options.maxHeight > height) {
				jQuery('#common_dialog').height(height);
				jQuery('#popcontent').height(height);
			}
			
			popBody.resize(function (event) {
				height = popBody.height();
				
				if (jQuery('#common_dialog').height() != height) {
					if (options.maxHeight > height) {
						jQuery('#common_dialog').height(height);
						jQuery('#popcontent').height(height);
					}
					else  {
						jQuery('#common_dialog').height(options.maxHeight);
						jQuery('#popcontent').height(options.maxHeight);
					}
				}
			});
		});
	}
	
	//to-do : 타이틀 없애는 거 추가
	if ( typeof options.hideTitle != 'undefined' || options.hideTitle == true ) {
		jQuery('.ui-dialog-titlebar').hide();
	}
	else {
		jQuery('.ui-dialog-titlebar').show();
	}
	
	jQuery('#popcontent').show();
	jQuery('#common_dialog').dialog("open");
}

/**
 * IFrame 레이어 팝업 종료 함수
 */
function dialogClose(){
	//창 종료 후 실행될 함수
	
	if (typeof fnc_return == "function") {
		fnc_return();
	}

    fnc_return = null;
	
	jQuery('#popcontent').attr('src','');
	jQuery('#common_dialog').dialog('destroy');
	jQuery('.msgBoxHide').show();
}

function cmDialog(jQueryObj, options) {
	
	jQueryObj.dialog({
		title: 		options.title,
		bgiframe: 	true,
        autoOpen: 	false,
        width:		options.width,
 		height:		options.height,
 		position : options.position,
 		minWidth :  options.minWidth,
 		minHeight : options.minHeight,
 		maxWidth :  options.maxWidth,
 		maxHeight : options.maxHeight,
		modal: 		typeof options.modal == 'undefined' ? true : options.modal ,
		resizable:  false,
        open: function() { 
        	jQuery('.msgBoxHide').hide();
			if ( options.open ) options.open();
		},
        resize: function() { 
        	if ( options.resize ) options.resize();
		},
        resizeStop: function() { 
        	if ( options.resizeStop ) options.resizeStop; 
		},
		close: function(){
			jQuery('.msgBoxHide').show();
			if ( options.close ) options.close();
		} 
	}); 
	
	jQueryObj.dialog("open");
}


/**
 * Confirm 박스
 * @param object
 */
function showConfirmBox( object ) {
	if (typeof object != "object" || object == null) {
		alert("설정 오류");
		return
	}
	
	
	var title		= object.title || "";
	var message		= object.message || "";
	var	ok_func		= object.ok_func;
	var	cancel_func	= object.cancel_func;
	var close_func  = object.close_func;
	var	option		= object.option;
	var width = (typeof(object.width) == 'undefined') ? 300 : object.width;
	var height = (typeof(object.height) == 'undefined') ? 130 : object.height;
	
	var confirmBox		= makeConfirmBox(message);
	
	cmDialog( confirmBox, {
		title : title,
		width : width,
		height : height,
		autoOpen : false,
		modal : true,
		resizable : false,
		zIndex : 2000,
		open : function () {
			var h = confirmBox.height();
			var h2 = jQuery(".message", confirmBox).height();
			
			if (h2 > 20) {
				confirmBox.height(h + h2 - 20);
			}
		}
	});
	
	/*
	if ( object.ok_str ) {
		jQuery(".btn_ok span", confirmBox).text(object.ok_str);
	}
	
	if ( object.cancel_str ) {
		jQuery(".btn_cnacel span", confirmBox).text(object.cancel_str);
	}
	*/
	
	if (typeof option == "object" && option != null) {
		var ok_str		= option.ok_str || "";
		var cancel_str	= option.cancel_str || "";
		
		if (ok_str != "") {
			jQuery(".btn_ok", confirmBox).html("<strong>" + ok_str + "<strong>");
		}
		if (cancel_str != "") {
			jQuery(".btn_cnacel", confirmBox).html("<strong>" + cancel_str + "<strong>");
		}
	}
	
	// ok 버튼 클릭시
	jQuery(".btn_ok", confirmBox).unbind("click").bind("click", function (e) {
		e.preventDefault();
		if (typeof ok_func == "function")
			ok_func();
		hideConfirmBox();
	});
	
	// cancel 버튼 클릭시
	jQuery(".btn_cnacel", confirmBox).unbind("click").bind("click", function (e) {
		e.preventDefault();
		if (typeof cancel_func == "function")
			cancel_func();
		hideConfirmBox();
	});
	
	// 닫기(x) 버튼 클릭시
	jQuery(".ui-dialog-titlebar-close", confirmBox.parent()).bind("click", function (e) {
		if (typeof close_func == "function")
			close_func();
	});
	
	confirmBox.dialog("open");
	msgBoxHide(true);
}

/**
 * Confirm 박스 생성
 */
function makeConfirmBox(message) {
	
	jQuery("#commonConfirmBox").remove();
	
	var arrHtml		= [];
	
	arrHtml.push("<div id=\"commonConfirmBox\" style=\"display:none;\" class=\"commonBox\">");
	arrHtml.push("    <div class=\"message\" >"+ message +"</div>");
	arrHtml.push("    <div class=\"gap\"></div>");
	arrHtml.push("    <div class=\"btn\">");
	arrHtml.push("        <a href=\"#\" class='btn_sml btn_ok'><strong>OK</strong></a>");
	arrHtml.push("        <a href=\"#\" class='btn_sml btn_cnacel' ><strong>CANCEL</strong></a>");
	arrHtml.push("    </div>");
	arrHtml.push("</div>");
	
	var div = jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));
	
	return div;
}

// confirm 닫기
function hideConfirmBox() {
	var confirmBox		= jQuery("#commonConfirmBox");
	confirmBox.dialog("close");
	msgBoxHide(false);
}
//[e] confirm

function msgBoxHide( flag ) {
	if (flag)
		jQuery(".msgBoxHide").hide();
	else
		jQuery(".msgBoxHide").show();
}

////[s] Message Box
function showMessageBox( object ) {
	
	if (typeof object != "object" || object == null) {
		alert("showMessageBox : 설정 오류");
		return
	}
	
	var title				= object.title || "";
	var message				= object.message || "";
	
	var messageBox		= makeMessageBox(title, message);
	
	if (title == "") {
		jQuery(".message-title", messageBox).hide();
	}
	
	messageBox.show();
	showLayerPopupBackground("commonMessageBoxBg");
	
	cmLayerPopupCenter(messageBox);
	
	if (typeof object.close == "function")
		messageBox.data("close_function", object.close);
	
	msgBoxHide(true);
	jQuery(".div_msgbox_close_b a", messageBox).eq(0).focus();
}

// messge box 닫기
function hideMessageBox() {
	var messageBox		= jQuery("#commonMessageBox");
	
	msgBoxHide(false);
	hideLayerPopupBackground("commonMessageBoxBg");
	
	var close_function = messageBox.data("close_function");
	if (close_function != undefined) {
		close_function();
	}
	
	messageBox.remove();
}

// message box 
function makeMessageBox(title, message) {
	
	jQuery("#commonMessageBox").remove();
	
	var arrHtml			= [];
	
	arrHtml.push("<div id=\"commonMessageBox\">");
	arrHtml.push("	  <div class=\"div_msgbox_close_t\"><a href=\"javascript:hideMessageBox();\"><em>닫기</em></a></div>");
	arrHtml.push("    <div class=\"pop-contents\" >");
	arrHtml.push("        <div class=\"message-title\">"+ title +"</div>");
	arrHtml.push("        <div class=\"message-desc\">" + message + "</div>");
	arrHtml.push("    </div>");
	arrHtml.push("	  <div class=\"div_msgbox_close_b\"><span class=\"btn-box-small c-gray\"><a href=\"javascript:hideMessageBox();\">확인</a></span></div>");
	arrHtml.push("</div>");	
	
	var div = jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));
	
	return div;
}
//[e] Message Boxox


//[s] Loading Box
function showLoadingBox() {
	
	var loadingBox		= jQuery("#commonLoadingBox");
	
	if (loadingBox.html() == null) {
		makeLoadingBox();
		loadingBox		= jQuery("#commonLoadingBox");
	}
	
	loadingBox.dialog({ 
		width : 350,
		autoOpen : false,
		modal : true,
		resizable : false,
		zIndex : 2000
	});
	
	jQuery('.ui-dialog-titlebar', loadingBox.parent()).hide();
	
	loadingBox.dialog("open");
}

// Loading box 닫기
function hideLoadingBox() {
	var loadingBox		= jQuery("#commonLoadingBox");
	
	loadingBox.dialog("close");
}

// Loading box 
function makeLoadingBox() {
	var arrHtml			= [];
	
	arrHtml.push("<div id=\"commonLoadingBox\" style=\"display:none;\" class=\"common_dialog\">");
	//arrHtml.push("	<h1 class=\"title\"></h1>");
	arrHtml.push("	<div class=\"message\" style='text-align:center;'><img src=\""+ IMG_URL +"/common/loading.gif?ver=1.1\" alt=\"loading\"/></div>");
	arrHtml.push("	<div class=\"gap\"></div>");
	arrHtml.push("	<div class=\"button\">");
	arrHtml.push("	</div>");
	arrHtml.push("</div>");	
	
	jQuery(arrHtml.join("\n")).appendTo(jQuery("body"));
}