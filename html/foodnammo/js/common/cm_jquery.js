
var cm_jquery_param = {
	is_save : false
};

/**
 *  ajax 공통 처리 부분
 * @param obj
 */
function cmAjax(obj)
{
	var url = obj.url;
	
	if (url.indexOf("_save.") > -1 || url.indexOf("_save_ajax.") > -1) {
		if (cm_jquery_param.is_save) {
			return;
		}
		cm_jquery_param.is_save = true;
	}

	var ajaxObj = {
			        url: obj.url,
			        type: obj.type,
			        async : obj.async == undefined ? true : obj.async,
			        data: obj.data,
			        dataType: obj.dataType,
			        success: function(data, textStatus, jqXHR){
			        	
				        if (data.status == "isNotLogin") {
				        	showMessageBox({
				        		message : "로그인 해주세요"
				        		, close : function () {
				        			document.frm_reload.submit();
				        			//document.location.href = WEB_ROOT + "auth/us/auth_us_login_form.do";
				        		}
				        	});
			            }
			            else {
			            	if ( typeof obj.success != 'undefined' ) 
			            		obj.success(data, textStatus, jqXHR);
			            }
				    },
				    error : function(jqXHR, textStatus, errorThrown) {
				    	if ( typeof obj.error != 'undefined' ) 
				    		obj.error(jqXHR, textStatus, errorThrown );
				    },
			        beforeSend : function(jqXHR, settings) {
			        	const header = jQuery("meta[name='_csrf_header']").attr("content");
			        	if(header){
							jqXHR.setRequestHeader(header, jQuery("meta[name='_csrf']").attr("content"));
						}

			        	if ( typeof obj.isModal != 'undefined' && obj.isModal ) 
			        		//showLoadingBox();
				    	if ( typeof obj.beforeSend != 'undefined' ) 
				    		obj.beforeSend(jqXHR, settings);
				    },
			        complete: function(jqXHR, textStatus){
			        	if (url.indexOf("_save.") > -1  || url.indexOf("_save_ajax.") > -1) {
			        		cm_jquery_param.is_save = false;
			        	}
			        	if ( typeof obj.isModalEnd != 'undefined' && obj.isModalEnd ) 
			        		//hideLoadingBox();
			            if ( typeof obj.complete != 'undefined' ) 
			            	obj.complete(jqXHR, textStatus);
				    }
				};
	
	if(obj.processData != 'undefined' ){
		ajaxObj.processData = obj.processData
	}
	if(obj.contentType != 'undefined'){
		ajaxObj.contentType = obj.contentType
	}
		
	jQuery.ajax(ajaxObj);
}

/**
 * 트리 이벤트 추가
 * @param p_option
 */
function addTreeEvent (p_option) {
	
	if (typeof p_option != "object" || p_option.treeId == undefined || p_option.code == undefined || p_option.name == undefined ) {
		alert("addTreeEvent 초기화 실패");
		return;
	}
	
	var tree_element = jQuery("#" + p_option.treeId);
	var node_code = p_option.code;
	var node_name = p_option.name;
	
	tree_element
		.jstree({ 
			"types" : {
				"valid_children" : [ "root" ],
				"types" : {
					"root" : {
						"icon" : { 
							"image" : WEB_ROOT + "images/common/_drive.png" 
						}
		 				, "valid_children" : [ "default" ]
						, "max_depth" : 2
						, "hover_node" : false
						/*, "select_node" : function () {return false;}*/
					},
					"default" : {
						"valid_children" : [ "default" ]
					}
				}
			}
			, "plugins" : ["themes","html_data","search","adv_search","ui","types"]
		})
		.bind("loaded.jstree", function (event, data) {
			if (node_code != undefined) {
				tree_element.data({
					"node_name" : node_name
					, "node_code" : node_code
				});
				if (node_code.val() != "") {
					tree_element.jstree("select_node", "#" + node_code.val() );
				}
			}
		})
		.bind("select_node.jstree", function (event, data){
			
			var val = data.rslt.obj.attr("id");
			var name = jQuery("a", data.rslt.obj).eq(0).text();
			
			tree_element.data("node_name").val(name);
			tree_element.data("node_code").val(val);
			tree_element.hide();
		})
		.css({
			"position" : "absolute"
			, "z-index" : "1000"
			, "min-width" : "300px"
			, "height" : "300px"
			, "border" : "2px solid #000000"
			, "overflow" : "auto"
		})
		.hide();
	
	jQuery(document).mousedown(function (event) {
		var target = jQuery(event.target);
		if( target[0].id != p_option.treeId && !target.hasClass(p_option.treeId) && target.parents("#" + p_option.treeId).length == 0 ) {
			jQuery("#" + p_option.treeId).hide();
		}
	});
	
	node_name
		.data({
			tree_element : tree_element
			, node_code : node_code
			, node_name : node_name
		})
		.focus(function (event) {
			jQuery(this).click();
		})
		.click(function (event) {
			
			var tree_element = jQuery(this).data("tree_element");
			var node_name = jQuery(this).data("node_name");
			var node_code = jQuery(this).data("node_code");
		
			tree_element
				.show()
				.data({
					"node_name" : node_name
					, "node_code" : node_code 
				})
				.css({
					left : jQuery(this).offset().left 
					, top : jQuery(this).offset().top + 20
				});
		
			if (jQuery(this).next("input").val() != "") {
				tree_element.jstree("select_node", "#" + node_code.val() );
			}
		})
		.addClass("chooseBox")
		.attr("readonly", "readonly")
		.addClass(p_option.treeId);
}

/**
 * Tree 초기화
 * @param treeId
 */
function cmTreeInit(p_treeId, p_option) {
	
	var treeElement = jQuery("#" + p_treeId); 
	
	treeElement.jstree({ 
		"types" : {
			"valid_children" : [ "root" ],
			"types" : {
				"root" : {
					"icon" : { 
						"image" : WEB_ROOT + "images/common/_drive.png" 
					}
	 				, "valid_children" : [ "default" ]
					, "max_depth" : 2
					, "hover_node" : false
					/*, "select_node" : function () {return false;}*/
				},
				"default" : {
					"valid_children" : [ "default" ]
				}
			}
		}
		, "plugins" : ["themes","html_data","search","adv_search","ui","types"]
	})
	.bind("loaded.jstree", function (event, data) {
		if (typeof p_option == "object" && p_option.select_node != undefined && p_option.select_node != "") {
			if (p_option.select_node_target != undefined) {
				treeElement.data({
					"target_text" : p_option.select_node_target
					, "target_val" : p_option.select_node_target.next("input")
				});
			}
			treeElement.jstree("select_node", "#" + p_option.select_node );
		}
	})
	.bind("select_node.jstree", function (event, data){
		
		var val = data.rslt.obj.attr("id");
		var name = jQuery("a", data.rslt.obj).eq(0).text();
		
		treeElement.data("target_text").val(name);
		treeElement.data("target_val").val(val);
		treeElement.hide();
	})
	.css({
		"position" : "absolute"
		, "z-index" : "1000"
		, "min-width" : "300px"
		, "height" : "300px"
		, "border" : "2px solid #000000"
		, "overflow" : "auto"
	})
	.hide();
	
	jQuery(document).mousedown(function (event) {
		var target = jQuery(event.target);
		if( target[0].id != p_treeId && !target.hasClass(p_treeId) && target.parents("#" + p_treeId).length == 0 ) {
			jQuery("#" + p_treeId).hide();
			cmLayerPopEvent("close");
		}
	});
}

/**
 * "p_element" focus or click event 발생시 "p_treeId" tree 가 뜨도록 이벤트 추가
 * 
 * @param p_element : input[type=text]
 * @param p_treeId : tree id
 */
function addInputTreeEvent(p_element, p_treeId) {
	
	p_element
		.unbind("focus")
		.unbind("click")
		.focus(function (event) {
			jQuery(this).click();
		})
		.click(function (event) {
			var treeElement = jQuery("#" + p_treeId);
			
			treeElement
				.show()
				.data({
					"target_text" : jQuery(this)
					, "target_val" : jQuery(this).next("input") 
				})
				.css({
					left : jQuery(this).offset().left 
					, top : jQuery(this).offset().top + 20
				});
			
			cmLayerPopEvent("open");
			
			if (jQuery(this).next("input").val() != "") {
				treeElement.jstree("select_node", "#" + jQuery(this).next("input").val() );
			}
		})
		.addClass("chooseBox")
		.attr("readonly", "readonly")
		.addClass(p_treeId);
}

/**
 *  select combo 공통 사용 이벤트
 *  
 * @param p_option
 */
function cmSelectCombo(p_option) {
	
	var defaults = {
		url : ""
		, param : {
			mstCd : ""
			, buffer1 : ""
			, buffer2 : ""
			, buffer3 : ""
		}
		, keyValue : ""
		, keyText : ""
		, target : undefined
		, callback : undefined
	};
	var options = jQuery.extend(defaults, p_option);
	
	if ( options.url == "" || options.target == undefined || options.keyValue == "" || options.keyText == "") {
		alert("설정 오류!!!");
		return;
	}
	
	options.target.val("").change();
	
	cmAjax({
		url : options.url
		, type : "POST"
		, data : options.param
		, dataType : "json"
		, isModal : true
		, isModalEnd : true
		, success : function ( data, textStatus, jqXHR) {

			jQuery("option", options.target).each(function(evnet) {
				if (jQuery(this).val() != "")
					jQuery(this).remove();
			});
			
			if (data.object != undefined && data.object.length > 0) {
				
				if (data.object[0][options.keyValue] == undefined || data.object[0][options.keyText] == undefined) {
					alert("[keyValue | keyText] 설정오류");
					return;
				}
				
				for (var i = 0; i < data.object.length; i++) {
					jQuery("<option/>")
						.attr({
							value : data.object[i][options.keyValue]
						})
						.text(data.object[i][options.keyText])
						.appendTo(options.target);
				}
			}
			
			if (typeof options.callback ==  "function") {
				options.callback();
			}
		}
	});
}

/**
 * 날짜입력 input에 이벤트 추가
 * 
 * @param el
 * @param callback
 */
function addCalendarEvent( el, p_opt ) {
	
	if(typeof el != "object")
		el		= jQuery(".datepicker");
	
	var _default = {
		  dateFormat: "yy.mm.dd"
		, showAnim:"slideDown"
		, changeMonth: true
		, changeYear: true
		, showMonthAfterYear : true
		, showOtherMonths: true
		, selectOtherMonths: true
		, monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
		, monthNames : ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)', '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)']
		, dayNamesMin : ["일", "월", "화", "수", "목", "금", "토"]
		, showUp : false
		, callback : undefined
	};
	
	var options;
	
	if (typeof p_opt == "function") {
		options = jQuery.extend(_default, null);
		options.callback = p_opt;
	}
	else {
		options = jQuery.extend(_default, p_opt);
	}
	
	el.datepicker( {
		dateFormat: options.dateFormat
		, showAnim: options.showAnim
		, changeMonth: options.changeMonth
		, changeYear: options.changeYear
		, showMonthAfterYear : options.showMonthAfterYear
		, showOtherMonths: options.showOtherMonths
		, selectOtherMonths: options.selectOtherMonths
		, monthNames : options.monthNames
		, monthNamesShort : options.monthNamesShort
		, dayNamesMin : options.dayNamesMin
		, showUp : options.showUp
		, showOn: "both"
		, buttonImageOnly: true
		, buttonImage: IMG_URL+"/calendar.png"
		, onSelect: function(dateText, inst) 
		{
			if (typeof options.callback == "function")
				options.callback(jQuery(this));
		}
		, beforeShow : function () {
			jQuery(".div-edms iframe").hide();
		}
		, onClose : function () {
			jQuery(".div-edms iframe").show();
		}
	}).attr("readonly", "readonly");
}

/**
 * Enter 이벤트 추가
 * 
 * @param el
 * @param func
 */
function setEnterKey(target, functionOrElement) {
	
	if ( typeof target != "object" || (typeof functionOrElement != "function" && typeof functionOrElement != "object") ) {
		return;
	}
	
	target.keydown(function (event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			
			if (typeof functionOrElement == "function") {
				functionOrElement();
			}
			else {
				functionOrElement.click();
			}
		}
	});
}

/**
 * table 형식 list에 over|out 이벤트 추가
 * 
 * @param el
 */
function addListTableEvent(table_tr) {
	
	if (typeof table_tr != "object")
		table_tr = jQuery(".tbl_type01 > tbody > tr, .tbl_type02 > tbody > tr");
	
	table_tr
		.mouseover(function (evnet) {
			var scroll = jQuery(this).parents(".x_scroll");
			var size = scroll.size();
			var h = 0;
			
			if (size > 0) {
				h = scroll.eq(0).height();
			}
			
			jQuery(this).addClass("tr_over");
			
			// ie9 에서 생기는 x_scroll 버그처리
			if (size > 0) {
				scroll.eq(0).height(h);
			}
		})
		.mouseout(function () {
			jQuery(this).removeClass("tr_over");
		});
}

/**
 * readonly일 경우 backspace 처리
 */
function addReadonlyBackKeyEvent() {
	jQuery("input[readonly]")
		.keydown(function(e) {
			if (e.which == 8 || e.which == 46) 
				return false;
		});
}

/**
 * 사원 선택유무 확인
 * @returns {Boolean}
 */
function isSearchUserValidator() {
	
	var searchUser = jQuery("dl.search_user");
	var size = searchUser.size();
	var rtn = {
		is_val : true
		, message : ""
		, inp_target : undefined
		, btn_target : undefined
	};
	for (var i = 0; i < size; i++) {
		var usernm = jQuery("input[type='text']", searchUser.eq(i));
		var hideUsernm = jQuery("span.hide_usernm", searchUser.eq(i));
		var searchBtn = jQuery("a.btn_search_user", searchUser.eq(i));
		var name = usernm.attr("alt") || "회원";
		if (usernm.val() != hideUsernm.text()) {
			rtn.is_val = false;
			rtn.inp_target = usernm;
			rtn.btn_target = searchBtn;
			rtn.message = makeTargetName(name, "가", "이") + " 정확히 선택되지 않았습니다.";
			return rtn;
		}
		if (usernm.hasClass("required") && usernm.val() == "") {
			rtn.is_val = false;
			rtn.inp_target = usernm;
			rtn.btn_target = searchBtn;
			rtn.message = makeTargetName(name, "는", "은") + " 필수 입력사항입니다.";
			return rtn;
		}
	}
	return rtn;
}
/**
 * 사원 검색
 */
function addSearchUsDpGpEvent() {
	
	var url = WEB_ROOT + "auth/us/auth_us_search_all_list_pop.do";
	
	jQuery("dl.search_us_dp_gp").each(function (n) {
		var targetnm = jQuery("input[type='text']", jQuery(this));
		var hideTargetnm = jQuery("span.hide_us_dp_gp_nm", jQuery(this));
		var targetcd = jQuery("input[type='hidden']", jQuery(this)).eq(0);
		var targetTypecd = jQuery("input[type='hidden']", jQuery(this)).eq(1);
		var searchBtn = jQuery("a.btn_search_us_dp_gp", jQuery(this));
		var deleteBtn = jQuery("a.btn_delete_us_dp_gp", jQuery(this));
		var retiree = jQuery("input[type='checkbox']", jQuery(this));
		
		// 검색
		searchBtn.click(function(event) {
			
			var arrParam = [];
			
			arrParam.push("callbackFunction=parent.addSearchUsDpGpEventResult");
			arrParam.push("seachIndex=" + n);
			arrParam.push("keyword=" + encodeURIComponent(targetnm.val()));
			
			if (retiree.size() > 0 && retiree.attr("checked")) {
				arrParam.push("flagRetiree=Y");
			}
			
			event.preventDefault();
			cmDialogOpen("searchUsDpGp", {
				url : url + "?" + arrParam.join("&")
				, width : 400
				, height : 400
				, modal : true
			});
		});
		
		// 삭제
		deleteBtn.click(function(event) {
			event.preventDefault();
			targetnm.val("");
			hideTargetnm.text("");
			targetcd.val("");
			targetTypecd.val("");
		});
		
		// Enter key event
		setEnterKey(targetnm, searchBtn);
	});
}

/**
 * 사원 검색 결과등록
 * @param rvo
 */
function addSearchUsDpGpEventResult(rvo) {
	var searchUser = jQuery("dl.search_us_dp_gp");
	var size = searchUser.size();
	
	try {
		var index = parseInt(rvo.n_index, 10);
		
		if (size <= index) {
			alert("addSearchUserEventResult(rvo) 오류");
			return;
		}
		
		var targetNm = jQuery("input[type='text']", searchUser.eq(index));
		var hideTargetNm = jQuery("span.hide_targetnm", searchUser.eq(index));
		var targetCd = jQuery("input[type='hidden']", searchUser.eq(index)).eq(0);
		var targetTypecd = jQuery("input[type='hidden']", searchUser.eq(index)).eq(1);
		
		targetNm.val(rvo.v_target_nm);
		hideTargetNm.text(rvo.v_target_nm);
		targetCd.val(rvo.v_target_cd);
		targetTypecd.val(rvo.v_target_type_cd);
		targetCd.data("data_us_dp_gp_info", rvo);
		
		try {
			// change event 발생
			targetCd.change();
		} catch (e) {}
		
		cmDialogClose("searchUsDpGp");
		targetNm.focus();
		
	} catch (e) {
		alert("addSearchUserEventResult(rvo) 오류\n\n" + e.message);
	}
}

/**
 * 사원 선택유무 확인
 * @returns {Boolean}
 */
function isSearchUsDpGpValidator() {
	
	var searchUser = jQuery("dl.search_us_dp_gp");
	var size = searchUser.size(); 
	
	for (var i = 0; i < size; i++) {
		var targetNm = jQuery("input[type='text']", searchUser.eq(i));
		var hideTargetNm = jQuery("span.hide_targetnm", searchUser.eq(i));
		var searchBtn = jQuery("a.btn_search_user", searchUser.eq(i));
		var name = targetNm.attr("alt") || "사원";
		
		if (targetNm.val() != hideTargetNm.text()) {
			showMessageBox({
				message : makeTargetName(name, "가", "이") + " 정확히 선택되지 않았습니다."
				, close : function(event) {
					searchBtn.click();
				}
			});
			return false;
		}
		
		if (targetNm.hasClass("required") && targetNm.val() == "") {
			showMessageBox({
				message : makeTargetName(name, "는", "은") + " 필수 입력사항입니다."
				, close : function(event) {
					targetNm.focus();
				}
			});
			return false;
		}
	}
	return true;
}

/**
 * 기감검색 공통 이벤트
 */
function addFromToDtEvent() {
	
	jQuery("div.from_to_dt").each(function (n) {
		var inputFromDt = jQuery("input[type='text']", jQuery(this)).eq(0);
		var inputToDt = jQuery("input[type='text']", jQuery(this)).eq(1);
		var fromToDtToday = jQuery("span.from_to_dt_today", jQuery(this));
		var arrBtn = jQuery(".btn_sml", jQuery(this));
		
		addCalendarEvent(inputFromDt);
		addCalendarEvent(inputToDt);
		
		arrBtn.click(function(event) {
			event.preventDefault();
			
			var index = arrBtn.index(jQuery(this));
			var today = getDate(fromToDtToday.text(), ".");
			var year = today.getFullYear();
			var month = today.getMonth();
			var date = today.getDate();
			var fromDt, toDt;
			
			if (arrBtn.size() == 5) {
				switch (index) {
				case 0 :	// 오늘
					fromDt = today;
					toDt = today;
					break;
				case 1 :	// 1주일
					fromDt = new Date(year, month, date - 6);
					toDt = today;
					break;
				case 2 :	// 1개월
					fromDt = new Date(year, month - 1, date);
					toDt = today;
					break;
				case 3 :	// 3개월
					fromDt = new Date(year, month - 3, date);
					toDt = today;
					break;
				case 4 :	// 6개월
					fromDt = new Date(year, month - 6, date);
					toDt = today;
					break;
				default :
					fromDt = today;
					toDt = today;
				break;
				}
				
				if (index > 0 && fromDt.getDate() == date) {
					fromDt = new Date(fromDt.getFullYear(), fromDt.getMonth(), fromDt.getDate() + 1);
				}
			}
			else {
				switch (index) {
				case 0 :	// 전일
					fromDt = new Date(year, month, date - 1);
					toDt = new Date(year, month, date - 1);
					break;
				case 1 :	// 오늘
					fromDt = today;
					toDt = today;
					break;
				case 2 :	// 1주일
					fromDt = new Date(year, month, date - 6);
					toDt = today;
					break;
				case 3 :	// 1개월
					fromDt = new Date(year, month - 1, date);
					toDt = today;
					break;
				case 4 :	// 3개월
					fromDt = new Date(year, month - 3, date);
					toDt = today;
					break;
				case 5 :	// 6개월
					fromDt = new Date(year, month - 6, date);
					toDt = today;
					break;
				case 6 :	// 이번주
					fromDt = new Date(year, month, date - (today.getDay() == 0 ? 6 : today.getDay() - 1));
					toDt = today;
					break;
				case 7 :	// 이번달
					fromDt = new Date(year, month, 1);
					toDt = today;
					break;
				default :
					fromDt = today;
					toDt = today;
				break;
				}
				
				if (index > 1 && fromDt.getFullYear() != year && fromDt.getDate() == date) {
					fromDt = new Date(fromDt.getFullYear(), fromDt.getMonth(), fromDt.getDate() + 1);
				}
			}
			
			inputFromDt.val(dateToString(fromDt, "."));
			inputToDt.val(dateToString(toDt, "."));
		});
	});
}

/**
 * 권한 설정
 */
function addAuthLimitEvent() {
	var authLimt = jQuery("div.auth_limit");
	var url = WEB_ROOT + "auth/mn/auth_mn_limit_reg_pop.do";
	
	authLimt.each(function (n) {
		var siteCd = jQuery(".hide_auth_sitecd", jQuery(this));
		var langCd = jQuery(".hide_auth_langcd", jQuery(this));
		var recordId = jQuery(".hide_auth_recordid", jQuery(this));
		var table = jQuery(".hide_auth_table", jQuery(this));
		var authBtn = jQuery("a.btn_auth_set", jQuery(this));
		
		var arr = [];
		
		arr.push("sitecd=" + siteCd.text());
		arr.push("langcd=" + langCd.text());
		arr.push("recordid=" + recordId.text());
		arr.push("table=" + table.text());
		
		// 검색
		authBtn.click(function(event) {
			event.preventDefault();
			cmDialogOpen("auth_limit", {
				url : url + "?callbackFunction=parent.addAuthLimitEventResult&authIndex=" + n + "&" + arr.join("&")
				, width : 700
				, height : 600
				, modal : true
			});
		});
	});
}

/**
 * 권한 설정 결과
 */
function addAuthLimitEventResult(rvo) {
	var index = parseInt(rvo.n_index, 10);
	var authLimit = jQuery("div.auth_limit");
	var size = authLimit.size();
	
	if (index < -1 && index >= size) {
		showMessageBox({
			message : "addAuthLimitEventResult(rvo)<br/>[index] 값 오류"
		});
	}
	
	var userCnt = parseInt(rvo.n_user_cnt, 10);
	var target = jQuery("img.img_user", authLimit.eq(index));
	var src = target.attr("src");
	
	if (userCnt == 0) {
		if (src.indexOf("_g.png") == -1) {
			target.attr("src", src.replace(".png", "_g.png"));
		}
	}
	else {
		target.attr("src", src.replace("_g.png", ".png"));
	}
}

/**
 * 파일 다운로드
 * @param attachId
 * @param attachTypeCd
 * @param flagDownCnt
 */
function fileDownload(attachid, serverUrl, attachTypeCd, flagDownCnt) {
	
	if (jQuery("#cm_download").html() == null) {
		var arrHtml	= [];
		
		arrHtml.push("<iframe id='cm_download' name='cm_download src='about:blank' style='display:none;' scrolling='auto' marginwidth='0' marginheight='0' frameborder='0' vspace='0' hspace='0'></iframe>");
		jQuery(arrHtml.join("")).appendTo("body");
	}
	
	var url = serverUrl + "comm/comm_download.do?attachid=" + attachid + "&attachTypeCd=" + attachTypeCd + "&flagDownCnt=" + flagDownCnt;
	
	jQuery("#cm_download").attr("src", url);
}

/**
 * Excel download 공통 호출 함수
 * @param url
 * @param flag
 */
function fncExcelDownload( url, flag) {
	var frm				= document.frm_reload;
	var oldTarget		= frm.target;
	var oldAction		= frm.action;
	var flagExcelAll	= jQuery("*[name='flagExcelAll']", "form[name='frm_reload']");
	
	var iframe			= jQuery("#excel_down_iframe");
	if (iframe.size() == 0) {
		iframe		= jQuery("<iframe id='excel_down_iframe' name='excel_down_iframe' src='about:blank' style='display:none;'></iframe>").appendTo("body");
	}
	
	if (flagExcelAll.size() == 0) {
		flagExcelAll = jQuery("<input type='hidden' name='flagExcelAll' value=''/>").appendTo("form[name='frm_reload']");
	}
	
	// IE 10 해당 방법으로 사용 불가
	var is_IE8_lower = false;
	var ieCheck = fnIECheck();
	if (ieCheck.isIE && ieCheck.version <= 8) {
		is_IE8_lower = true;
	}
	
	if (is_IE8_lower) {
		url = WEB_FULL_URL + url.substring(1);
	}
	
//	var obj = window.open("about:blank","excel_down_iframe","toolbar=0,menubar=0,scrollbars=no,resizable=no,width=600,height=100;");
	
	if (flag != undefined && flag == "ALL") {
		showConfirmBox({
    		title : "Excel 다운로드"
    		, message : "전체 다운로드 하시겠습니까?"
    		, ok_func : function() {
    			flagExcelAll.eq(0).val("Y");
    			frm.target = is_IE8_lower ? "_blank" : "excel_down_iframe";
    			frm.action = url;
    			frm.submit();
    			
    			frm.target = oldTarget;
    			frm.action = oldAction;
    			flagExcelAll.eq(0).val("N");
    		}
    		, cancel_func : function() {
    			return false;
    		}
    		, option : {
    			ok_str : "확인"
    			, cancel_str : "취소"
    		}
    	});
	}
	else if (flag != undefined && flag == "down") {
		showConfirmBox({
    		title : "Excel 다운로드"
    		, message : "해당 건을 다운로드 하시겠습니까?"
    		, ok_func : function() {
    			flagExcelAll.eq(0).val("Y");
    			frm.target = is_IE8_lower ? "_blank" : "excel_down_iframe";
    			frm.action = url;
    			frm.submit();
    			
    			frm.target = oldTarget;
    			frm.action = oldAction;
    			flagExcelAll.eq(0).val("N");
    		}
    		, cancel_func : function() {
    			return false;
    		}
    		, option : {
    			ok_str : "확인"
    			, cancel_str : "취소"
    		}
    	});
	}
	else {
    	showConfirmBox({
    		title : "Excel 다운로드"
    		, message : "전체 다운로드 하시겠습니까?"
    		, ok_func : function() {
    			flagExcelAll.eq(0).val("Y");
    			frm.target = is_IE8_lower ? "_blank" : "excel_down_iframe";
    			frm.action = url;
    			frm.submit();
    			
    			frm.target = oldTarget;
    			frm.action = oldAction;
    			flagExcelAll.eq(0).val("N");
    		}
    		, cancel_func : function() {
    			flagExcelAll.eq(0).val("N");
    			frm.target = is_IE8_lower ? "_blank" : "excel_down_iframe";
    			frm.action = url;
    			frm.submit();
    			
    			frm.target = oldTarget;
    			frm.action = oldAction;
    			flagExcelAll.eq(0).val("N");
    		}
    		, option : {
    			ok_str : "전체 페이지"
    			, cancel_str : "현재 페이지"
    		}
    	});
	}
}

/**
 * Excel download 공통 호출 함수
 * @param url
 * @param flag
 */
function fncExcelFormDownload( url, flag) {
	var frm				= document.frm;
	var oldTarget		= frm.target;
	var oldAction		= frm.action;
	var flagExcelAll	= jQuery("*[name='flagExcelAll']", "form[name='frm']");
	/*
	var iframe			= jQuery("#excel_down_iframe");
	if (iframe.size() == 0) {
		iframe		= jQuery("<iframe id='excel_down_iframe' name='excel_down_iframe' src='about:blank' style='display:none;'></iframe>").appendTo("body");
	}
	*/

	if (flagExcelAll.size() == 0) {
		flagExcelAll = jQuery("<input type='hidden' name='flagExcelAll' value=''/>").appendTo("form[name='frm']");
	}

//	var obj = window.open("about:blank","excel_down_iframe","toolbar=0,menubar=0,scrollbars=no,resizable=no,width=600,height=100;");

	if (flag != undefined && flag == "ALL") {
		flagExcelAll.eq(0).val("Y");
		frm.target = "excel_down_iframe";
		frm.action = url;
		frm.submit();

		frm.target = oldTarget;
		frm.action = oldAction;
		flagExcelAll.eq(0).val("N");
	}
	else {
    	showConfirmBox({
    		title : "Excel 다운로드"
    		, message : "전체 다운로드 하시겠습니까?"
    		, ok_func : function() {
    			flagExcelAll.eq(0).val("Y");
    			frm.target = "excel_down_iframe";
    			frm.action = url;
    			frm.submit();

    			frm.target = oldTarget;
    			frm.action = oldAction;
    			flagExcelAll.eq(0).val("N");
    		}
    		, cancel_func : function() {
    			flagExcelAll.eq(0).val("N");
    			frm.target = "excel_down_iframe";
    			frm.action = url;
    			frm.submit();

    			frm.target = oldTarget;
    			frm.action = oldAction;
    			flagExcelAll.eq(0).val("N");
    		}
    		, option : {
    			ok_str : "전체 페이지"
    			, cancel_str : "현재 페이지"
    		}
    	});
	}
}


// sort event
function addTableSortEvent( p_opt ) {
	var _default = {
		formName : "frm"
		, tableId : ""
		, sortCol : ""
		, sortDir : ""
		, sortColName : "sortCol"
		, sortDirName : "sortDir"
		, url : ""
	};
	var options = jQuery.extend(_default, p_opt);
	
	var form = jQuery("form[name='" + options.formName + "']");
	var table = jQuery("table#" + options.tableId);
	var th = jQuery("th.th_sort", table);
	var inputSortCol = jQuery("*[name='" + options.sortColName + "']", form);
	var inputSortDir = jQuery("*[name='" + options.sortDirName + "']", form);
	
	var sort_desc_path = WEB_ROOT + 'images/common/sort_desc.gif';
	var sort_asc_path = WEB_ROOT + 'images/common/sort_asc.gif';
	
	th.each(function (n) {
			var id = jQuery(this).attr("id").toUpperCase().replace(".", "aAa");
			
			while (id.indexOf("+") > -1) {
				id = id.replace("+", "bBb");
			}
			jQuery(this).attr("id", id);
			jQuery("<span class='table_sort'/>").appendTo(jQuery(this)).html("<img src='"+sort_desc_path+"'/><img src='"+sort_asc_path+"'/>");
		})
		.click(function (event) {
			var sortCol		= inputSortCol.val().toUpperCase();
			var sortDir		= inputSortDir.val().toUpperCase();
			var chgSortCol = jQuery(this).attr("id").replace("aAa", ".");
			
			while (chgSortCol.indexOf("bBb") > -1) {
				chgSortCol = chgSortCol.replace("bBb", "+");
			}
			
			if (chgSortCol != sortCol) {
				sortDir	= "DESC";
			}
			else {
				if (sortDir == "DESC") {
					sortDir	= "ASC";
				}
				else {
					sortDir	= "DESC";
				}
			}
			
			inputSortCol.val(chgSortCol);
			inputSortDir.val(sortDir);
			
			if (options.callFunction != undefined && typeof options.callFunction == "function") {
				options.callFunction();
			}
			else {
				form.attr("action", options.url);
				form.submit();
			}
		})
		.css("cursor", "pointer");
	
	if (inputSortCol.size() == 0) {
		inputSortCol = jQuery("<input type='hidden' name='" + options.sortColName + "' value='' />");
		inputSortDir = jQuery("<input type='hidden' name='" + options.sortDirName + "' value='' />");
		
		inputSortCol.appendTo(form);
		inputSortDir.appendTo(form);
	}
	
	if (options.sortCol != undefined && options.sortCol != "") {
		var sortCol = options.sortCol.replace(".", "aAa").replace("+", "bBb");
		while (sortCol.indexOf("+") > -1) {
			sortCol = sortCol.replace("+", "bBb");
		}
		var chooseTh = jQuery("th#" + sortCol, table);
		var span = jQuery(".table_sort", chooseTh);
		
		if (options.sortDir == "ASC") {
			span.html("<img src='"+sort_asc_path+"'/>");
		}
		else {
			span.html("<img src='"+sort_desc_path+"'/>");
		}
		inputSortCol.val(options.sortCol);
		inputSortDir.val(options.sortDir);
	}
}


//sort event
function addTableSortEvtMulti( p_opt ) {
	var _default = {
		formName : "frm"
		, tableId : ""
		, sortDiv : ""
		, sortColName : "arrSortCol"
		, sortDirName : "arrSortDir"
		, url : ""
		, sort : ""
	};
	var options = jQuery.extend(_default, p_opt);
	
	var form = jQuery("form[name='" + options.formName + "']");
	var table = jQuery("table#" + options.tableId);
	var th = jQuery("th.th_sort", table);
	var inputSortCol = jQuery("*[name='" + options.sortColName + "']", form);
	var inputSortDir = jQuery("*[name='" + options.sortDirName + "']", form);
	
	var sort_desc_path = WEB_ROOT + 'images/common/sort_desc.gif';
	var sort_asc_path = WEB_ROOT + 'images/common/sort_asc.gif';
	
	th.each(function (n) {
			var id = jQuery(this).attr("data-sort-col");
			
			jQuery(this).attr("id", id);
			jQuery("<span class='table_sort'/>").appendTo(jQuery(this)).html("<img src='"+sort_desc_path+"'/><img src='"+sort_asc_path+"'/>");
		})
		.click(function (event) {
			
			
			var sortCol		= "";
			var sortDir		= "";
			var chgSortCol = jQuery(this).attr("data-sort-col");
			var cnt = 0;
			var idx = 0;
			
			jQuery("*[name='" + options.sortColName + "']", form).each(function(index){
				if(jQuery(this).val() == chgSortCol){
					cnt ++;
					idx = index;
				}
			});
			
			if (jQuery("*[name='" + options.sortColName + "']", form).size() == 0) {
				sortDir = "DESC";
			}else{
				sortCol = jQuery("*[name='" + options.sortColName + "']", form).eq(idx).val().toUpperCase();
				sortDir = jQuery("*[name='" + options.sortDirName + "']", form).eq(idx).val().toUpperCase();
			}
			
			if (chgSortCol != sortCol) {
				sortDir	= "DESC";
			}
			else {
				if (sortDir == "DESC") {
					sortDir	= "ASC";
				}
				else {
					sortDir	= "DESC";
				}
			}
			
			if(cnt ==0){
				inputSortCol = jQuery("<input type='hidden' name='" + options.sortColName + "' value='"+chgSortCol+"' />");
				inputSortDir = jQuery("<input type='hidden' name='" + options.sortDirName + "' value='"+sortDir+"' />");
				inputSortCol.appendTo(form);
				inputSortDir.appendTo(form);
				
				
			}else{
				
				jQuery("input[name='"+options.sortDirName+"']").eq(idx).val(sortDir);
				
			}
			if (options.callFunction != undefined && typeof options.callFunction == "function") {
				options.callFunction();
			}
			else {
				form.attr("action", options.url);
				form.submit();
			}
			
		})
		.css("cursor", "pointer");

	
	if (options.sort != undefined && options.sort != "") {
		
		var sort = options.sort.split(",");
		
		for(var i = 0; i<sort.length; i++){
			var sort_col = sort[i].split(" ")[0];
			var sort_dir = sort[i].split(" ")[1];
			var sortNm = "";
			var chooseTh = "";
			jQuery(".th_sort",table).each(function(index){
				if(jQuery(this).attr("data-sort-col") == sort_col){
					sortNm = jQuery(this).attr("data-sort-nm");
					chooseTh = jQuery(this);
				}
			});
			var append_div = [];
			if(sort_dir == "ASC"){
				append_div.push("<div class='cl_sort "+sort_col+"' id='"+sort_col+"' style='cursor:pointer'>"+sortNm);
				append_div.push("	<img src='"+sort_asc_path+"'/>");
				append_div.push("	<a href=\"#\" class=\"btn_del_sort\" id=\""+sort_col+"\"><img src=\""+WEB_ROOT+"images/button/btn_delete6.png\" width=\"12px;\"style='margin-left:5px;'/></a>");
				append_div.push("	<input type='hidden' name='" + options.sortColName + "' value='"+sort_col+"' />");
				append_div.push("	<input type='hidden' name='" + options.sortDirName + "' value='"+sort_dir+"' />");
				append_div.push("</div>");
			}else{
				append_div.push("<div class='cl_sort "+sort_col+"' id='"+sort_col+"' style='cursor:pointer'>"+sortNm);
				append_div.push("	<img src='"+sort_desc_path+"'/>");
				append_div.push("	<a href=\"#\" class=\"btn_del_sort\" id=\""+sort_col+"\"><img src=\""+WEB_ROOT+"images/button/btn_delete6.png\" width=\"12px;\"style='margin-left:5px;'/></a>");
				append_div.push("	<input type='hidden' name='" + options.sortColName + "' value='"+sort_col+"' />");
				append_div.push("	<input type='hidden' name='" + options.sortDirName + "' value='"+sort_dir+"' />");
				append_div.push("</div>");
			}
			jQuery(append_div.join("\n")).appendTo(jQuery("."+options.sortDiv));
			
			
			var span = jQuery(".table_sort", chooseTh);
			
			if (sort_dir == "ASC") {
				span.html("<img src='"+sort_asc_path+"'/>");
			}
			else {
				span.html("<img src='"+sort_desc_path+"'/>");
			}
		}
		jQuery("."+options.sortDiv).css("margin-bottom",25);
		
		jQuery(".cl_sort").click(function(event){
			var id = jQuery(this).attr("id");
			jQuery(".th_sort",table).each(function(){
				if(jQuery(this).attr("data-sort-col") == id){
					jQuery(this).click();

                }
			});
		});
		
		jQuery(".btn_del_sort").click(function(event){
			event.preventDefault();
			var id=jQuery(this).attr("id");
			jQuery("."+id).remove();
			
			if (options.callFunction != undefined && typeof options.callFunction == "function") {
				options.callFunction();
			}
			else {
				form.attr("action", options.url);
				form.submit();
			}
		});
		
	}
}

/**
 * 
 * @param p_opt
 */
function addXscrollMoveEvent(p_opt) {
    /*
    var _default = {
        target : jQuery("div.x_scroll")
    };

    var options = jQuery.extend(_default, p_opt);
    var target = options.target;

    target
        .mousedown(function(event) {
            $(this).data("mousedown", "Y");
            $(this).data("pageX", event.pageX);
        })
        .mouseup(function(event) {
            $(this).data("mousedown", "");
        })
        .mousemove(function(event) {
            var mousedown 	= $(this).data("mousedown");

            if (mousedown == "Y") {
                var oldPageX 	= $(this).data("pageX");
                var pageX		= event.pageX;

                jQuery(this).scrollLeft( jQuery(this).scrollLeft() + pageX - oldPageX );
            }
        });
    */
}

/**
 * 
 * @param p_opt
 */
function removeXscrollMoveEvent(p_opt) {
	/*
	var _default = {
			target : jQuery("div.x_scroll")
	};
	
	var options = jQuery.extend(_default, p_opt);
	var target = options.target;
	
	target.unbind("mousedown")
		.unbind("mouseup")
		.unbind("mousemove");
	*/
}


function addTableTitleFixedEvent(p_opt) {
	var _default = {
		tableId : ""
		, rows : 0
		, height : "300px"
	};
	var options = jQuery.extend(_default, p_opt);
	
	var table = jQuery("table#" + options.tableId);
	var div = table.parents("div.table_title_fixed, div.x_scroll");
	
	if (!table.hasClass("table_title_fixed")) {
		table.addClass("table_title_fixed");
	}
	
	if (div.size() == 0) {
		div = jQuery("<div/>").insertBefore(table);
		div.addClass("table_title_fixed");
		table.appendTo(div);
	}
	
	var cp_div = div.clone(true).insertBefore(div);
	var cp_table = jQuery("table", cp_div).attr("id", options.tableId + "_cp_table");

	jQuery("tbody tr", cp_table).each(function (n) {
		if (n >= options.rows)
			jQuery(this).remove();
	});
	
	cp_div
		.css({
			"overflow-x" : "hidden"
			, "overflow-y" : "scroll"
			, "padding" : "0px"
		})
		.attr("id", options.tableId + "_cp_div");
	
	div.height(options.height)
		.css({"overflow-y" : "scroll"})
		.data({
			"cp_div" : options.tableId + "_cp_div"
			, "cp_table" : options.tableId + "_cp_table"
		});
	
	jQuery("tbody tr", table).each(function (n) {
		if (n < options.rows)
			jQuery(this).remove();
	});
	jQuery("thead", table).remove();
	
	div.scroll(function (event) {
		var target = jQuery(event.target);
		var cp_div = jQuery("#" + target.data("cp_div"));
		//var cp_table = jQuery("#" + target.data("cp_table"));
		
		cp_div.scrollLeft(target.scrollLeft());
	});
}

var tableTitleFixed = {
	tfx_div : undefined	
	, tfx_cp_div : undefined	
};

function addTableTitleFixedEvent_bak(p_opt) {
	var _default = {
		tableId : ""
		, rows : 0
	};
	var options = jQuery.extend(_default, p_opt);
	
	var table = jQuery("table#" + options.tableId);
	var div = table.parents("div.table_title_fixed, div.x_scroll");
	
	if (table.hasClass("table_title_fixed")) {
	//	return;
    } else {
        table.addClass("table_title_fixed");
    }

    if (div.size() == 0) {
        div = jQuery("<div/>").prependTo(table);
        div.addClass("table_title_fixed");
    }

    var cp_div = div.clone(true).appendTo($("body"));
    var cp_table = jQuery("table", cp_div);

    jQuery("tbody tr", cp_table).each(function (n) {
        if (n >= options.rows)
            jQuery(this).remove();
    });

    cp_div
        .attr("id", "tfx_" + options.tableId)
        .addClass("tfx_table_title_fixed")
		.css({
			"position" : "fixed"
			, "z-index" : "200"
			, "top" : div.offset().top + "px"
			, "left" : div.offset().left + "px"
			, "overflow-x" : "hidden"
		})
		.width(div.width());
	
	var scrollTop = jQuery(window).scrollTop();
	var titleTop = div.offset().top;
	var gap = titleTop - scrollTop;
	
	if (gap > 0) {
		cp_div.css("top", gap + "px");
	}
	else {
		cp_div.css("top", "10px");
	}
	
	tableTitleFixed.tfx_div = div;
	tableTitleFixed.tfx_cp_div = cp_div;
		
	jQuery(window).resize(function (event) {
		tableTitleFixed.tfx_cp_div.width(tableTitleFixed.tfx_div.width());	
	});
	
	jQuery(window).scroll(function (event) {
			var scrollTop = jQuery(window).scrollTop();
			var titleTop = tableTitleFixed.tfx_div.offset().top;
			var gap = titleTop - scrollTop;
			
			if (gap > 0) {
				tableTitleFixed.tfx_cp_div.css("top", gap + "px");
			}
			else {
				tableTitleFixed.tfx_cp_div.css("top", "0px");
			}	
	});
	
	jQuery(tableTitleFixed.tfx_div).scroll(function (event) {
		tableTitleFixed.tfx_cp_div.scrollLeft(tableTitleFixed.tfx_div.scrollLeft());
	});
}

/**
 * select box clear
 * @param target
 */
function clearSelect(target) {

    target.val('').change();

    var arrOption = $("option", target);
    var len = arrOption.length;
    for (var i = len - 1; i > 0; i--) {
        arrOption.eq(i).remove();
    }
}


/**************************
 * [START] comment 공통 사용
 **************************/
var cmCommentParam = {
	isInit : false
};

// 초기화
function initBoardCommentList( p_param ) {
	
	if (cmCommentParam.isInit) {
		alert("공통 comment script는 1개일때만 사용 가능합니다.");
		return;
	}
	
	var _default = {
		isInit : true
		, boardTypeCd : ""
		, boardCd : ""
		, nowPageNo : 1
	};
	cmCommentParam = jQuery.extend(_default, p_param);
	
	getBoardCommentList();
	addBoardCommentEvent();
}

// 페이지 이동시
function getBoardCommentListChangePage(pg) {
	cmCommentParam.nowPageNo = pg;
	
	getBoardCommentList();
}

// 목록
function getBoardCommentList() {
	cmAjax({
		url : WEB_ROOT + "board/cm/board_cm_comment_list_ajax.do"
		, type : "POST"
		, data : cmCommentParam
		, dataType : "html"
		, isModal : false
		, isModalEnd : false
		, success : function ( data, textStatus, jqXHR) {
			jQuery("#divComment").html(data);
		}
	});
}

/**
 * comment 등록
 */
function addBoardCommentEvent() {
	jQuery(".btn_comment_reg").click(function (event) {
		event.preventDefault();
		var div = jQuery(this).parents(".div_comment_box");
		var frm = jQuery("form[name='frm_comment']", div);
		var useqno = jQuery("textarea[name='useqno']", frm);
		var comment = jQuery("textarea[name='comment']", frm);
		
		if ( !frm.jgeeseValidator() ) {
			return;
		}
		cmAjax({
			url : WEB_ROOT + "board/cm/board_cm_comment_save.do"
			, type : "POST"
			, data : frm.serialize()
			, dataType : "json"
				, isModal : true
				, isModalEnd : true
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						showMessageBox({
							message : "저장되었습니다."
							, close : function () {
								comment.val("");
								if (useqno.val() == "0") {
									cmCommentParam.nowPageNo = 1;
								}
								getBoardCommentList();
							}
						});
					}
					else {
						showMessageBox({message : data.message});
					}
				}
		});
	});
}

function fnBoardCommentReply(boardTypeCd, boardCd, useqno) {
	var url = WEB_ROOT + "board/cm/board_cm_comment_reg_pop.do";
	var param = "?boardTypeCd=" + boardTypeCd + "&boardCd=" + boardCd + "&useqno=" + useqno;
	
	cmDialogOpen("boardComment", {
		url : url + param
		, width : 800
		, height : 250
		, modal : true
	});
}

function fnBoardCommentModify(boardTypeCd, boardCd, seqno) {
	var url = WEB_ROOT + "board/cm/board_cm_comment_reg_pop.do";
	var param = "?boardTypeCd=" + boardTypeCd + "&bardCd=" + boardCd + "&seqno=" + seqno;
	
	cmDialogOpen("boardComment", {
		url : url + param
		, width : 800
		, height : 250
		, modal : true
	});
}

function fnBoardCommentDelete(boardTypeCd, boardCd, seqno) {
	
	showConfirmBox({
		message : "정말로 삭제하시겠습니까?"
		, ok_func : function () {
			cmAjax({
				url : WEB_ROOT + "board/cm/board_cm_comment_save.do"
				, type : "POST"
				, data : {
					flagAction : "D"
					, boardTypeCd : boardTypeCd
					, boardCd : boardCd
					, seqno : seqno
				}
				, dataType : "json"
				, isModal : true
				, isModalEnd : true
				, success : function ( data, textStatus, jqXHR) {
					if (data.status == "succ") {
						getBoardCommentList();
					}
					else {
						showMessageBox({message : data.message});
					}
				}
			});
		}
	});
}
/**************************
 * [END] comment 공통 사용
 **************************/
function addInputMessageEvent() {
	// Input Clear
	var i_label = jQuery('.cm_label_message>.i_label');
    var i_text = i_label.next('.i_label_text');
    
    i_label
    	.css('position','absolute')
    	.click(function(event) {
    		jQuery(this).next(".i_label_text").focus();
    	});
    
    i_text
    	.focus(function(){
    		jQuery(this).prev('.i_label').css('visibility','hidden');    
    	}).blur(function(){
	    	if(jQuery(this).val() == ''){
	    		jQuery(this).prev('.i_label').css('visibility','visible');
	        } else {
	        	jQuery(this).prev('.i_label').css('visibility','hidden');        	
	        }
	    }).change(function(){
	        if(jQuery(this).val() == ''){
	        	jQuery(this).prev('.i_label').css('visibility','visible');
	        } else {
	        	jQuery(this).prev('.i_label').css('visibility','hidden');   
	        }
	    });
    
    try {
    	i_text.blur();
    } catch (e){}
	
    
    var i_input_label = jQuery('.i_input_label');
    var i_input_text = i_input_label.next('.i_input_label_text');
    
    i_input_label
	    .css('position','absolute')
	    .click(function(event) {
	    	jQuery(this).next(".i_input_label_text").focus();
	    });
    
    i_input_text
    	.focus(function(){
	    	jQuery(this).prev('.i_input_label').css('visibility','hidden');    
	    }).blur(function(){
	    	if(jQuery(this).val() == ''){
	    		jQuery(this).prev('.i_input_label').css('visibility','visible');
	    	} else {
	    		jQuery(this).prev('.i_input_label').css('visibility','hidden');        	
	    	}
	    }).change(function(){
	    	if(jQuery(this).val() == ''){
	    		jQuery(this).prev('.i_input_label').css('visibility','visible');
	    	} else {
	    		jQuery(this).prev('.i_input_label').css('visibility','hidden');   
	    	}
	    });
    
    try {
    	i_input_text.blur();
    } catch (e){}
    
    var i_textarea_label = jQuery('.i_textarea_label');
    var i_textarea_text = i_textarea_label.next('.i_textarea_label_text');
    
    i_textarea_label
	    .css('position','absolute')
	    .click(function(event) {
	    	jQuery(this).next(".i_textarea_label_text").focus();
	    });
    
    i_textarea_text
	    .focus(function(){
	    	jQuery(this).prev('.i_textarea_label').css('visibility','hidden');    
	    }).blur(function(){
	    	if(jQuery(this).val() == ''){
	    		jQuery(this).prev('.i_textarea_label').css('visibility','visible');
	    	} else {
	    		jQuery(this).prev('.i_textarea_label').css('visibility','hidden');        	
	    	}
	    }).change(function(){
	    	if(jQuery(this).val() == ''){
	    		jQuery(this).prev('.i_textarea_label').css('visibility','visible');
	    	} else {
	    		jQuery(this).prev('.i_textarea_label').css('visibility','hidden');   
	    	}
	    });
    
    try {
    	i_textarea_text.blur();
    } catch (e){}
}



function addMultiChooseEvent(p_opt) {
	
	var input_name = p_opt.input_name;
	var box = p_opt.box;
	var chkbox_all = p_opt.chkbox_all;
	var arr_chkbox = p_opt.arr_chkbox;
	
	box.css({
			"display" : "none"
			, "position" : "absolute"
			, "z-index" : "10"
			, "border" : "2px solid #000000"
			, "background-color" : "#ffffff"
			, "padding" : "5px"
		})
		.hide();
	
	input_name.click(function(event) {
		box.css({
				left : jQuery(this).offset().left
				, top : jQuery(this).offset().top + jQuery(this).outerHeight() 
			})
			.show();
	});
	
	chkbox_all.click(function (event) {
		var checked = jQuery(this).attr("checked");
		
		if (checked) {
			arr_chkbox.attr("checked", true);
		}
		else {
			arr_chkbox.attr("checked", false);
		}
	});
	
	arr_chkbox.click(function (event) {
		var size1 = arr_chkbox.size();
		var size2 = arr_chkbox.filter(":checked").size();
		
		if (size1 == size2) {
			chkbox_all.attr("checked", true);
		}
		else {
			chkbox_all.attr("checked", false);
		}
		
		if (size2 == 0 || size1 == size2) {
			input_name.val(":: 전체 ::");
		}
		else if (size2 == 1) {
			input_name.val(arr_chkbox.filter(":checked").attr("alt"));
		}
		else {
			input_name.val(size2 + "개 선택");
		}
	});
	
	jQuery(document).mousedown(function(event) {
		var target = jQuery(event.target);
		var box_id = box.attr("id");
		var name = input_name.attr("name");

		if (target[0].id != box_id
				&& target.parents("#" + box_id).size() == 0
				&& target[0].name != name ) {
			box.hide();
		}
	});
	
	
	var size1 = arr_chkbox.size();
	var size2 = arr_chkbox.filter(":checked").size();
	
	if (size1 == size2) {
		chkbox_all.attr("checked", true);
	}
	else {
		chkbox_all.attr("checked", false);
	}
	
	if (size2 == 0 || size1 == size2) {
		input_name.val(":: 전체 ::");
	}
	else if (size2 == 1) {
		input_name.val(arr_chkbox.filter(":checked").attr("alt"));
	}
	else {
		input_name.val(size2 + "개 선택");
	}
}


function cmLayerPopEvent( type ) {
	
	if (type == undefined) {
		return;
	}
	
	type = type.toLowerCase();
	
	if (type == "open") {
		jQuery('.msgBoxHide').hide();
	}
	else if (type == "close") {
		jQuery('.msgBoxHide').show();
	}
}

/**
 * up&down 키 , 버튼으로 선택된 row의 위치를 변경하는 event
 * @param wrapperId - row class를 감싸고 있는 tag의 id (require)
 * @param $topBtn - 최상단으로 이동하는 버튼의 id (option)
 * @param $bottomBtn - 최하단으로 이동하는 버튼의 id (option)
 * @param selClassName - row가 선택될 때 추가되는 class명 (custom시 이용)
 * @param fixedHeaderHeight - fix 되어있는 header의 높이 (custom시 이용)
 */


/**
 * up&down 키 , 버튼으로 선택된 row의 위치를 변경하는 event
 * @param option event 옵션
 *     wrapperId - 버튼 및 테이블을 감싸고 있는 tag의 id (require)
 *     topBtnClass - 상단으로 이동하는 버튼의 class / first라는 class 포함시 최상단으로 이동 (option)
 *     bottomBtnClass - 하단으로 이동하는 버튼의 class / last라는 class 포함시 최하단으로 이동 (option)
 *     moveCntInputClass - 이동할 범위를 입력하는 input의 class (option)
 *     selClassName - row가 선택될 때 추가되는 class명 (custom시 이용)
 *     fixedHeaderHeight - fix 되어있는 header의 높이 (custom시 이용)
 */
function addChangeRowUpDownEvent(option){
	const defaults = {
		  wrapperId : ""
		, topBtnClass : ""
		, bottomBtnClass : ""
		, moveCntInputClass : ""
		, selClassName : "selected"
		, fixedHeaderHeight : 115
	};

	option = jQuery.extend(defaults, option);

	if(!option.wrapperId){
		return;
	}

	$('#'+option.wrapperId).off('click').on('click',".row",function(e){
		$('.row').not($('#'+option.wrapperId+' .row')).removeClass(option.selClassName);
		if( !e.ctrlKey ) {
			$('#'+option.wrapperId+' .row').removeClass(option.selClassName);
			$(this).addClass(option.selClassName);
		}
		else {
			$(this).toggleClass(option.selClassName);
		}
	});

	function moveTop(first,moveCnt){
		const $selectList = $('.'+option.selClassName,$('#'+option.wrapperId));
		if($selectList.length > 0) {
			const $firstSelRow = $selectList.first();
			let targetRow = $('#'+option.wrapperId+' .row:first');

			if(!first){
				if(!moveCnt){
					moveCnt = 1;
				}
				const targetRowIdx = $firstSelRow.index() - moveCnt;
				if(targetRowIdx >= 0){
					targetRow = $('#'+option.wrapperId+' .row').eq(targetRowIdx)
				}
			}

			if($firstSelRow.index() == targetRow.index()){
				$selectList.insertAfter(targetRow);
			}else{
				$selectList.insertBefore(targetRow);
				const totalRowHeight = $selectList.height() * $selectList.length;
				if($(window).scrollTop() - targetRow.offset().top > -(totalRowHeight + option.fixedHeaderHeight)) {
					$(window).scrollTop(targetRow.offset().top - (totalRowHeight + option.fixedHeaderHeight));
				}
			}
		}
	}

	function moveBottom(last,moveCnt){
		const $selectList = $('.'+option.selClassName,$('#'+option.wrapperId));
		if($selectList.length > 0) {
			const $lastSelRow = $selectList.last();
			let targetRow = $('#'+option.wrapperId+' .row:last');
			if(!last){
				if(!moveCnt){
					moveCnt = 1;
				}
				const targetRowIdx = $lastSelRow.index() + moveCnt;
				if(targetRowIdx < $('#'+option.wrapperId+' .row').length){
					targetRow = $('#'+option.wrapperId+' .row').eq(targetRowIdx)
				}
			}

			if($lastSelRow.index() == targetRow.index()) {
				$selectList.insertBefore(targetRow);
			}else{
				$selectList.insertAfter(targetRow);
				const windowHeight = $(window).height();
				const totalRowHeight = $selectList.height() * $selectList.length;
				if( ($(window).scrollTop() + windowHeight) - (targetRow.offset().top + totalRowHeight)  < $selectList.height() ) {
					$(window).scrollTop(targetRow.offset().top + totalRowHeight - windowHeight + $selectList.height());
				}
			}
		}
	}


	$(document).on('keydown', function(e){
		const $selectList = $('.'+option.selClassName,$('#'+option.wrapperId));
		if($selectList.length > 0) {
			let isChanged = false;
			switch( e.keyCode ) {
				case 38 : //up
					moveTop(false);
					isChanged = true;
					break;
				case 40 : //down
					moveBottom(false);
					isChanged = true;
					break;
				case 27 :
					$('#'+option.wrapperId+' .row').removeClass(option.selClassName);
					isChanged = true;
					break;
			}

			return !isChanged;
		}
	});

	if(option.topBtnClass){
		$('.'+option.topBtnClass,$('#'+option.wrapperId)).off('click').on('click', function(){
			let first = false;
			let moveCnt = 1;
			if(option.moveCntInputClass){
				const inputMoveCnt = parseInt($('.'+option.moveCntInputClass,$('#'+option.wrapperId)).val());
				if(inputMoveCnt){
					moveCnt = inputMoveCnt;
				}
			}
			if($(this).hasClass('first')){
				first = true;
			}
			moveTop(first,moveCnt);
		});
	}

	if(option.bottomBtnClass){
		$('.'+option.bottomBtnClass,$('#'+option.wrapperId)).off('click').on('click', function(){
			let last = false;
			let moveCnt = 1;
			if(option.moveCntInputClass){
				const inputMoveCnt = parseInt($('.'+option.moveCntInputClass,$('#'+option.wrapperId)).val());
				if(inputMoveCnt){
					moveCnt = inputMoveCnt;
				}
			}
			if($(this).hasClass('last')){
				last = true;
			}
			moveBottom(last,moveCnt);
		});
	}

}


var cmErrorMessage = {
	// 에러 메시지 출력
	addMessage : function (target, message, p_opt) {
		var options = {
			type : "" 	// 메시지 형식
			, auto_remove_sec : -1  // 에러메시지 자동삭제 (초단위)
			, is_focus : false
		};

		if (typeof p_opt == "string" ) {
			options.type = p_opt;
		}
		else {
			options = jQuery.extend(options, p_opt);
		}
		
		var frm 			= target.parents("form").eq(0);
		var name 			= target.attr("name");
		var index 			= jQuery("*[name='"+ name +"']", frm).index(target);
		var message_target 	= jQuery(".error_" + name);
		
		if (options.type == "byte") {
			message = message + " ( Max : " + target.attr("maxlength") + " byte)";
		}
		
		if (message_target.size() > index) {
			var data_msg 	= message_target.eq(index).data("error_old_msg");
			var data_fontw	= message_target.eq(index).data("error_old_font_weight");
			var data_color	= message_target.eq(index).data("error_old_color");
			var old_msg 	= message_target.eq(index).text();
			var old_fontw	= message_target.eq(index).css("font_weight");
			var old_color	= message_target.eq(index).css("color");
			
			if (data_msg == null || data_msg == undefined) {
				data_msg = old_msg || "";
			}
			if (data_fontw == null || data_fontw == undefined) {
				data_fontw = old_fontw || "normal";
			}
			if (data_color == null || data_color == undefined) {
				data_color = old_color || "none";
			}
			
			message_target.eq(index).text("* " + message)
				.data({
					"error_old_msg" : data_msg
					, "error_old_font_weight" : data_fontw
					, "error_old_color" : data_color
				});
		}
		
		var data_borderc 	= target.data("error_old_border_color");
		var old_borderc		= target.css("border-color");
		
		if (data_borderc == null) {
			target.data("error_old_border_color", old_borderc || "none");
		}
		
		target.css({"border-color": "red"}).addClass("poplens_error_message");
		message_target.css({"font-weight": "bold", "color" : "blue"});
		
		if (options.is_focus) {
			target.focus();
		}
		
		if (options.auto_remove_sec > -1) {
			
			console.log("auto_remove_sec");
			
			var data_timer = target.data("error_timer");
			
			if (data_timer != undefined && data_timer != null) {
				clearTimeout(data_timer);
			}
			
			data_timer = setTimeout(function () {
								cmErrorMessage.removeMessage(target.attr("name"));
								target.data("error_timer", undefined);
							}, options.auto_remove_sec * 1000);
			
			target.data("error_timer", data_timer);
		}
		
	},
	// 메시지막 출력 (input 빨간줄 안생김)
	addOnlyMessage : function (message_target, message, p_opt) {
		
		var _default = {
			type : "" 	// 메시지 형식
			, auto_remove_sec : -1  // 에러메시지 자동삭제 (초단위)
		};
		
		var options = jQuery.extend(_default, p_opt);
		
		var data_msg 	= message_target.data("error_old_msg");
		var data_fontw	= message_target.data("error_old_font_weight");
		var data_color	= message_target.data("error_old_color");
		var old_msg 	= message_target.text();
		var old_fontw	= message_target.css("font_weight");
		var old_color	= message_target.css("color");
		
		if (data_msg == null || data_msg == undefined) {
			data_msg = old_msg || "";
		}
		if (data_fontw == null || data_fontw == undefined) {
			data_fontw = old_fontw || "normal";
		}
		if (data_color == null || data_color == undefined) {
			data_color = old_color || "none";
		}
		
		message_target.text("* " + message)
			.data({
				"error_old_msg" : data_msg
				, "error_old_font_weight" : data_fontw
				, "error_old_color" : data_color
			});
		
		message_target.css({"font-weight": "bold", "color" : "blue"});
		
		if (options.auto_remove_sec > -1) {
			
			var data_timer = message_target.data("error_timer");
			
			if (data_timer != undefined && data_timer != null) {
				clearTimeout(data_timer);
			}
			
			data_timer = setTimeout(function () {
								cmErrorMessage.removeOnlyMessage(message_target);
								message_target.data("error_timer", undefined);
							}, options.auto_remove_sec * 1000);
			
			message_target.data("error_timer", data_timer).addClass("poplens_error_only_message");
		}
		
	},
	// 메시지 삭제
	removeMessage : function (name) {
        var target = $("*[name='" + name + "']");

        target.each(function (n) {

            var name = jQuery(this).attr("name");
            var index = jQuery("*[name='" + name + "']").index(jQuery(this));
            var data_borderc = jQuery(this).data("error_old_border_color");
            var message_target = jQuery(".error_" + name);

            if (message_target.size() > index) {
                var data_msg = message_target.eq(index).data("error_old_msg");
	    		var data_fontw	= message_target.eq(index).data("error_old_font_weight");
	    		var data_color	= message_target.eq(index).data("error_old_color");
	    		
	            message_target.eq(index).text(data_msg)
		            .css({
						"font-weight" : data_fontw
						, "color" : data_color
					});
	        }
	        
	        jQuery(this).css({"border-color": data_borderc}).removeClass("poplens_error_message");
	    });
	},
	// 메시지만 제거
	removeOnlyMessage : function (message_target) {
		
		var data_msg 	= message_target.data("error_old_msg");
		var data_fontw	= message_target.data("error_old_font_weight");
		var data_color	= message_target.data("error_old_color");
		
        message_target.text(data_msg).addClass("poplens_error_only_message")
            .css({
				"font-weight" : data_fontw
				, "color" : data_color
			});
	},
	// 전체 삭제
	removeMessageAll : function () {
		var target 	= jQuery(".poplens_error_message");
		var len 	= target.length;
		
		for (var i = 0; i < len; i++) {
			var name 			= target.eq(i).attr("name");
			var index 			= jQuery("*[name='"+ name +"']").index(target.eq(i));
			var data_borderc  	= target.eq(i).data("error_old_border_color");
			var message_target 	= jQuery(".error_" + name);
			
			if (message_target.size() > index) {
				var data_msg 	= message_target.eq(index).data("error_old_msg");
	    		var data_fontw	= message_target.eq(index).data("error_old_font_weight");
	    		var data_color	= message_target.eq(index).data("error_old_color");
	    		
	            message_target.eq(index).text(data_msg)
		            .css({
						"font-weight" : data_fontw
						, "color" : data_color
					});
			}
			
			target.eq(i).css({"border-color": data_borderc}).removeClass("poplens_error_message");
		}
		
		target 	= jQuery(".poplens_error_only_message");
		len		= target.length;
		
		for (var i = 0; i < len; i++) {
			var message_target = target.eq(i);
			var data_msg 	= message_target.data("error_old_msg");
			var data_fontw	= message_target.data("error_old_font_weight");
			var data_color	= message_target.data("error_old_color");
			
	        message_target.text(data_msg).addClass("poplens_error_only_message")
	            .css({
					"font-weight" : data_fontw
					, "color" : data_color
				});
		}
	}
};

// 에러 메시지 출력
function addErrorMessage(target, message, p_opt) {
	cmErrorMessage.addMessage(target, message, p_opt);
}

//에러 메시지 전체삭제
function removeErrorMessage() {
	cmErrorMessage.removeMessageAll();
}

// 에러 메시지 삭제
function removeErrorMessageForTarget(name) {
	cmErrorMessage.removeMessage(name);
}


function isMaxlengCheck(target) {
	var max = 0;
	try {
		max = parseInt(target.attr("maxlength") || "0", 10);
	} catch (e) {
		max = 0;
	}
	
	if (max == 0) {
		return true;
	}
	
	var str = target.val();
	var ibyte = 0;
	
	for (var i = 0; i < str.length; i++) {
		var tmp = escape(str.charAt(i));
		if (tmp.length == 1) ibyte++;
		else if (tmp.indexOf("%u") != -1) ibyte += 3;
		else if (tmp.indexOf("%") != -1) ibyte += tmp.length / 3;
	}
	
	if (max < ibyte) {
		return false;
	}
	else {
		return true;
	}
}

/**
 * 에디터 값 입력 여부
 * @param content
 * @returns {Boolean}
 */
function isEditorWrite( content ) {
	if (content == undefined) {
		return false;
	}
	if ( jQuery.trim(content) == "") {
		return false;
	}
	
	return true;
}


/**
 * 체크박스 전체 선택
 * @param chkbox_all
 * @param arr_chkbox
 */
function addCheckboxEvent(chkbox_all, arr_chkbox) {
	chkbox_all.click(function (event) {
		var checked = jQuery(this).prop("checked");
		
		if (checked) {
			arr_chkbox.prop("checked", true);
		}
		else {
			arr_chkbox.prop("checked", false);
		}
	});
	
	arr_chkbox.click(function (event) {
		var size1 = arr_chkbox.length;
		var size2 = arr_chkbox.filter(":checked").length;
		
		if (size1 == size2) {
			chkbox_all.prop("checked", true);
		}
		else {
			chkbox_all.prop("checked", false);
		}
	});
}

/**
 * 유투브 동영상 URL 체크
 * @param youtubeid
 * @returns {___anonymous48110_48239}
 */
function isYoutubeUrlCheck (youtubeid) {
	
	var rtn = {
		is_validation : false
		, youtubeid : undefined
		, message : undefined
		, movie_url : undefined
		, thumb_url : undefined
	};
	
	if (youtubeid == undefined || youtubeid == "") {
		rtn.is_validation = false;
		rtn.message = "Youtube ID를 입력해 주세요";
		return rtn;
	}
	
	cmAjax({
        url : WEB_ROOT + "tube/be/tube_be_youtube_check_ajax.do"
        , type : "post"
        , dataType : "json"
        , data : { youTube : "http://www.youtube.com/embed/" + youtubeid}
		, async : false
        , isModal : true
        , isModalEnd : true
        , success : function(json) {
        	if (json.status == "succ") {
        		rtn.is_validation = true;
        		rtn.message = json.message;
        		rtn.youtubeid = youtubeid;
        		rtn.movie_url = "http://www.youtube.com/embed/" + youtubeid;
        		//rtn.thumb_url = "http://img.youtube.com/vi/" + youtubeid + "/maxresdefault.jpg";
        		rtn.thumb_url = "http://img.youtube.com/vi/" + youtubeid + "/1.jpg";
        	}
        	else {
        		rtn.is_validation = false;
        		rtn.message = json.message;
        	}
        }
    });
	
	return rtn;
}


function MultiChooseBox ( p_opt ) {
	var _defaults = {
		inputText : ""
		, inputAllChk : ""
		, inputChk : ""
		, boxId : ""
	};
	this.opt	= jQuery.extend(_defaults, p_opt);
	this.init();
}
MultiChooseBox.prototype = {
	init : function() {
		var multiChooseBox = this;
		var opt = this.opt;
		
		jQuery("input[name='" + opt.inputText +"']").click(function (event) {
			jQuery("#" + opt.boxId).css({
				left : jQuery(this).offset().left
				//, top : jQuery(this).offset().top + jQuery(this).outerHeight() 
			})
			.show();
		});
		
		jQuery("input[name='" + opt.inputAllChk + "']", "#" + opt.boxId).click(function (event) {
			var chk 	= jQuery("input[name='"+ opt.inputChk +"']", "#" + opt.boxId);
			var chk_all = jQuery(this);
			if (chk_all.attr("checked")) {
				chk.prop("checked", true);
			}
			else {
				chk.prop("checked", false);
			}
			multiChooseBox.setChooseNm();
		});
		
		jQuery("input[name='"+ opt.inputChk +"']", "#" + opt.boxId).click(function (event) {
			var chk 	= jQuery("input[name='"+ opt.inputChk +"']", "#" + opt.boxId);
			var chk_all = jQuery("input[name='"+ opt.inputAllChk +"']", "#" + opt.boxId);
			
			if (chk.filter(":checked").size() == chk.size()) {
				chk_all.prop("checked", true);
			}
			else {
				chk_all.prop("checked", false);
			}
			multiChooseBox.setChooseNm();
		});
		jQuery(document).mousedown(function(event) {
			var target = jQuery(event.target);

			target[0].id != opt.boxId
				&& target.parents("#" + opt.boxId).size() == 0
				&& target[0].id != opt.inputText
				&& multiChooseBox.hideBox();
		});
		
		multiChooseBox.setChooseNm();
	}
	, hideBox : function () {
		var opt = this.opt;
		jQuery("#" + opt.boxId).hide();
	}
	, setChooseNm : function () {
		var opt = this.opt;
		var chk 	= jQuery("input[name='"+ opt.inputChk +"']", "#" + opt.boxId);
		var chk_all = jQuery("input[name='"+ opt.inputAllChk +"']", "#" + opt.boxId);
		var target	= jQuery("input[name='"+ opt.inputText +"']");
		
		if (chk_all.attr("checked")) {
			target.val("전부");
		}
		else {
			var chk_target	= chk.filter(":checked");

			if (chk_target.size() == 0) {
				target.val("전부");
			}
			else if (chk_target.size() == 1) {
				target.val(chk_target.eq(0).attr("alt"));
			}
			else {
				target.val( chk_target.size() + "개 선택");
			}
		}
	}	
};


//no image
function fnNoImage(target) {
	var img = jQuery(target);
	var span = jQuery("<span>No Image</span>").insertAfter(img);
	var fontSize = "13pt";
	
	if (img.width() < 80) {
		fontSize = "8pt";
	}
	
	span.css({
		"display" : "inline-block"
		, "background-color" : "#efeded"
		, "color" : "#c2c0c1"
		, "line-height" : img.height() + "px"
		, "text-align" : "center"
		, "font-family" : "Lucida Sans Unicode"
		, "font-size" : fontSize
		, "border" : "1px solid #d8d8d8"
	});
	span.width(img.width());
	span.height(img.height());
	img.hide();
}


function addTextCopyLayer() {
	
	jQuery(".span_text_copy").click(function(event) {
		var txt = jQuery(this).attr("data-copy-text");
		
		cmDialogOpen("comm_text_copy_pop", {
			url : WEB_ROOT + "comm/comm_text_copy_pop.do?copyText=" + encodeURIComponent(txt)
			, width : 400
			, height : 400
			, modal : true
		});
	}).css({"cursor": "pointer"});
	
}