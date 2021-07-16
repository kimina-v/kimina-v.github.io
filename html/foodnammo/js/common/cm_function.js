/*
 * 분류 : 문자함수
 * 요약 : 문자열에서 대상문자를 모두 대체문자로 변경한다. (원본문자열, 대상 문자, 대체 문자)
 */
function fnReplaceCharAll(str, tarCh, repCh) {
	var nowCh  = "";
	var sumStr = "";
	if (typeof str == "string") {
		var len    = str.length;
		for (var i = 0; i < len; i++) {
			if (str.charAt(i) == tarCh) {
				nowCh = repCh;
			} else {
				nowCh = str.charAt(i);
			}
			sumStr = sumStr + nowCh;
		}
	}
	return sumStr;
}

/*
 * 분류 : 문자함수
 * 요약 : 문자열이 공백인지 체크한다.
 */
function isEmpty(P) {
    if (P != null) {
      P = fnReplaceCharAll(P,"\n","");
      P = fnReplaceCharAll(P,"\r","");
   }
   return ((P == null) || (P.replace(/ /gi,"").length == 0));
}

/*
 * 분류 : 문자함수
 * 요약 : 문자열이 공백인지 체크한다.
 */
function isEmpty2(P) {
	
	if (P != null) {
		P = fnReplaceCharAll(P,"\n","");
	    P = fnReplaceCharAll(P,"\r","");
	    P = fnReplaceCharAll(P," ","");
	    
	    return (P == "");
	}
	return true;  
}

/*
 * 분류 : 문자함수
 * 요약 : 변수에 문자만 있는지 체크한다.
 */
function isString(P) {
   var len = P.length;

   for (var i = 0; i < len; i++) {
      if ( ((P.charAt(i) >= "a") && (P.charAt(i) <= "z")) || ((P.charAt(i) >= "A") && (P.charAt(i) <= "Z")) ) {
      }
      else {
         return false;
      }
   }
   return true;
}

/*
 * 분류 : 문자함수
 * 요약 : 변수에 숫자만 있는지 체크한다.
 */
function isDigit (P) {
   var len = P.length;

   for (var i = 0; i < len; i++) {
      if ( (P.charAt(i) >= "0") && (P.charAt(i) <= "9") ) {
      }
      else {
         return false;
      }
   }
   return true;
}

/*
 * 분류 : 문자함수
 * 요약 : 객체의 값이 숫자만 있는지 체크한다. 숫자외에 값이 잇을경우 경우창을 뛰우고 해당객체로 포커스를 이동시킨다.
 */
function isDigit2 (obj) {
   if(isNaN(obj.value) && obj.value != 0){
      alert("숫자를 입력하십시오");
      obj.focus();
      return false;
   }
   return true;
}

/*
 * 분류 : 문자함수
 * 요약 : 단순 PASSWORD Check, 6자 미만, 영숫자 미 혼용, ID+글자사용, ID 와 동일 사용, 동일문자열 4회 이상연속
 */
function simplePASSWORDCheck(strpass, id) {
   // 단순 Password Check  2003/4/17 윤미진
   var chkStr = [];
	var chkFlag = 0;
   var chkCnt = 0;
   var digitFlag = 0;
   var alphaFlag = 0;

   if(strpass.length < 6)
   {
      // 영 숫자 혼용으로 6자 이상 입력 하십시요.
      return "MIN_LENGTH";
   }

   if(strpass == id || strpass.search(id) != -1)
   {
      return "INCLUDE_ID";
   }


   for(var i = 0; i < strpass.length; i++)
   {
      if(chkStr[chkCnt] == strpass.charAt(i)) chkCnt += 1;
      else chkCnt = 0;

      chkStr[chkCnt] = strpass.charAt(i);
      if(chkFlag == 0 && (chkCnt + 1) > 3) chkFlag = 1;

      if ( (strpass.charAt(i) >= "0") && (strpass.charAt(i) <= "9") )
          digitFlag = 1;

      if ( (strpass.charAt(i) >= "a") && (strpass.charAt(i) <= "z") ||
           (strpass.charAt(i) >= "A") && (strpass.charAt(i) <= "Z") )
          alphaFlag = 1;

   }
   // 영 숫자 혼용이 아닌경우
   if(digitFlag == 0 || alphaFlag == 0)
   {
      // 영 숫자 혼용으로 6자 이상 입력 하십시요.
      return "NOT_MIX";
   }

   // 동일 문자 연속 4회 이상인 경우
   if(chkFlag == 1)
   {
     // 동일 문자열이 4회 이상 연속되었습니다.
     return "SAME_STRING";
   }

   return "OK";
}

/*
 * 분류 : 문자함수
 * 요약 : 문자열의 자우공백을 제거한다. 공백만 있는경우에는 작동하지 않는다.
 */
function trim(str) {
    var start = 0;
    var end   = str.length - 1;
    
    for (var i=0; i < str.length; i++) {
         if (str.substring(i,i+1) != " ") {
             start = i;
             break;
         }
    }

    for (var i=str.length - 1; i >= 0; i--) {
         if (str.substring(i,i+1) != " ") {
             end = i + 1;
             break;
         }
    }

    return str.substring(start, end);
}

/*
 * 분류 : 문자함수
 * 요약 : 문자열의 자우공백을 제거한다. (공백만 있는경우도 됨)
 */
function trim2(str) {
	if(isEmpty(str)){
		return "";
	}
    var start = 0;
    var end   = str.length - 1;
    
    for (var i=0; i < str.length; i++) {
         if (str.substring(i,i+1) != " ") {
             start = i;
             break;
         }
    }

    for (var i=str.length - 1; i >= 0; i--) {
         if (str.substring(i,i+1) != " ") {
             end = i + 1;
             break;
         }
    }

    return str.substring(start, end);
}

/*
 * 분류 : 문자함수
 * 요약 : 객체의 문자열의 길이를 바이트 단위로 체크한다. (객체, 최대 바이트 길이값)
 */
function fnCheckStringLength(stringElement,MAX)
{
  	var origin_str = stringElement.value;
  	var return_str ="";
  	var strLen = 0;
  	var return_total = 0;
  	var temp_len=0;
  	    
  	strLen = origin_str.length;
  	    
  	for(var i=0 ; i < strLen ; i++ ) 
  	{
  	   var ch = origin_str.charAt(i);
  
  	   if( escape(ch).length > 4 ) return_total += 2;
  	   else if( ch != '\r' ) return_total++;
  		
  	   if( return_total > MAX )
  	   {
  	      alert(MAX + " 바이트 이하로 입력해 주세요.");
  	      stringElement.value=return_str;
  					  stringElement.focus();
  					  return_total=temp_len;
  	      break;
  	   }
  	   else
  	   {
  				   return_str += ch;
  				   temp_len=return_total;
  	   }
  	}

}

/*
 * 분류 : 숫자함수
 * 요약 : 숫자만 리턴한다. 숫자가 존재하지 않을 경우 0을 리턴한다. 콤마 제거시에 사용한다.
 */
function fnOnlyNumber(str){
	var	len		= str.length;
	var oRtn	= {};
	var iRtn	= 0;
	var sRtn	= "";
	
	for (var i = 0; i < len; i++) {
		if ((str.charAt(i) >= "0" && str.charAt(i) <= "9") || (str.charAt(i) == "-") || (str.charAt(i) == ".")) 
			sRtn	+= str.charAt(i);
	}
	if (sRtn != "")
		iRtn		= parseInt(sRtn, 10);
	
	oRtn.number	= iRtn;
	oRtn.string	= sRtn;
	
	return oRtn;
}


/*
 * 분류 : 숫자함수
 * 요약 : 객체에 숫자만 입력하도록 한다.
 */
function SetNumObj(obj) {
    obj.value   = SetNum(obj.value);
    obj.select();

}

/*
 * 분류 : 숫자함수
 * 요약 : 문자열에서 콤마를 제거한다. 
 */
function SetNum(str) {
    return fnReplaceCharAll(str, ",", "");
}

/*
 * 분류 : 숫자함수
 * 요약 : 천단위마다 콤마를 삽입한다.
 */
function SetNumComma(str) {
	
    var tmpStr  = onlyNumber( "" + str );
    var sResult = "";

    if (tmpStr != "")  {
        tmpStr  = "" + parseInt(tmpStr, 10);        // 0부터 시작할 경우 앞에 0 모두 제거

        var len     = tmpStr.length;
        var cnt     = 0;

        for (var i = len - 1; i >= 0; i--) {
            if (cnt > 0 && cnt % 3 == 0 ) {
                sResult  = "," + sResult;
            }
            sResult  = tmpStr.charAt(i) + sResult;
            cnt++;
        }
    }
    return sResult;
}

/*
 * 분류 : 숫자함수
 * 요약 : 숫자값만을 리턴한다. 콤마제거시에 사용한다.
 */
function onlyNumber (str) {
    var len      = str.length;
    var sReturn  = "";

    for (var i = 0; i < len; i++) {
        if ( (str.charAt(i) >= "0") && (str.charAt(i) <= "9") ) 
            sReturn += str.charAt(i);
    }
    return sReturn;
}

/*
 * 분류 : 숫자함수
 * 요약 : 숫자만 입력 KeyDown 이벤트 (keyPressCheck와 동시사용해야함, 한글은 적용 안됨)
 */
function keyDownCheck(event, P) {
   var sKeyCode  = event.keyCode;
   var sKeyValue = String.fromCharCode(sKeyCode);
   var sKeyCheck = "";
   var sTmpKey1  = 0;
   var sTmpKey2  = 0;

   if (P == "Y") {
      sKeyCheck = "-0123456789";
      sTmpKey1  = 109;
      sTmpKey2  = 189;
   }
   else {
      sKeyCheck = "0123456789";
      sTmpKey1  = 8;
      sTmpKey2  = 8;
   }
   
   if (sKeyCheck.indexOf(sKeyValue) > -1 || sKeyCode == sTmpKey1 || sKeyCode == sTmpKey2 || sKeyCode == 8 || sKeyCode == 9 || sKeyCode == 110 || sKeyCode == 190 || sKeyCode == 46 || sKeyCode == 16 || sKeyCode == 17 || (sKeyCode >= 96 && sKeyCode <= 105)|| (sKeyCode >= 35 && sKeyCode <= 40) ) {
      event.returnValue = true;
   }
   else {
    event.keyCode = 0;
      event.returnValue = false;
   }
}

/*
 * 분류 : 숫자함수
 * 요약 : 숫자만 입력 KeyPress 이벤트 (keyDownCheck와 동시사용해야함, 한글은 적용 안됨)
 */
function keyPressCheck( event, P) {
   var sKeyCode  = event.keyCode;
   var sKeyValue = String.fromCharCode(sKeyCode);
   var sKeyCheck = "";
   if (P == "Y") {
      sKeyCheck = "-0123456789";
   }
   else {
      sKeyCheck = "0123456789";
   }
   if (sKeyCheck.indexOf(sKeyValue) > -1 || sKeyCode == 46) {
      event.returnValue = true;
   }
   else {
    event.keyCode = 0;
      event.returnValue = false;
   }
}






//플래시 표시
function fnShowFlash(url, width, height){
   document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '"  id = "movie" VIEWASTEXT>');
   document.write('<param name="movie" value="' + url + '">');
   document.write('<param name="quality" value="high">');
   document.write('<param name="wmode" value="transparent">');
   document.write('<embed src="' + url + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" name = "movie"></embed>');
   document.write('</object>');
}

//플래시 메뉴표시
function fnShowFlashMenu(url, width, height){
   document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '"  onmouseout="fnSubMenuHide()" id = "movie" VIEWASTEXT >');
   document.write('<param name="movie" value="' + url + '">');
   document.write('<param name="quality" value="high">');
   document.write('<param name="wmode" value="transparent">');
   document.write('<embed src="' + url + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" name = "movie"></embed>');
   document.write('</object>');
}



//일정크기만큼 문자열 길이 반환(문자열, 길이, 확장자 포함 여부-Y/N)
function fnCutString(sData, iLen, isExt)
{
  	var origin_str = sData;
  	var strExt = "";
  	var return_str ="";
  	var strLen = 0;
  	var return_total = 0;
  	var temp_len=0;
  	
  	strLen = origin_str.length;
  	
  	if(isExt == "Y"){
  	   arrTemp = sData.split('.');
  	   strExt = arrTemp[arrTemp.length-1];
  	   strLen = strLen - (strExt.length + 1);
  	   iLen = iLen - (strExt.length + 1);
  	}
  	
  	for( var i=0 ; i < strLen ; i++ )
  	{
  	   var ch = origin_str.charAt(i);
  
  	   if( escape(ch).length > 4 ) return_total += 2;
  	   else if( ch != '\r' ) return_total++;
  		
  	   if( return_total > iLen )
  	   {
  					  return_total=temp_len;
  	      break;
  	   }
  	   else
  	   {
  				   return_str += ch;
  				   temp_len=return_total;
  	   }
  	}
  	
  	if(isExt == "Y"){
  	   return_str = return_str + "." + strExt;
  	}
  	
  	return return_str;
}

/******************************************************************************
 *  Function Name : jsValidBizRegNo
 *  Description   : 사업자등록번호 검사
 *  Parameters    : bizRegNo - '-'를 제외한 사업자등록번호 10자리의 문자열
 *  Example       : if (!jsValidBizRegNo("1231212345")) return;
 *  Comment       : 
 ******************************************************************************
 *  History       : 2008. 06. 25  방지한  (최초 작성)
 ******************************************************************************/
function jsValidBizRegNo(bizRegNo) {
	var i, sum = 0;
	//var	check		= parseInt(bizRegNo.charAt(9), 10);
	var tempBizRegNo = new Array(10);
	var checkValue = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1];

	if (bizRegNo == "0000000000") {
		alert("입력항목 [사업자등록번호]의 형식이 맞지 않습니다.");
		return false;
	}

	for (i = 0; i < 10; i++) tempBizRegNo[i] = parseInt(bizRegNo.charAt(i), 10);

	for (i = 0; i < 10; i++)
		sum += (tempBizRegNo[i] * checkValue[i]);

	sum	+= Math.floor((tempBizRegNo[8] * 5) / 10);
	sum	%= 10;
	sum	= (sum == 0) ? 0 : (10 - sum);

	if (sum == 0)	return true;
	else {
		alert("입력항목 [사업자등록번호]의 형식이 맞지 않습니다.");
		return false;
	}
}

/******************************************************************************
 *  Function Name : jsMakeAndCheckTelNo
 *  Description   : 전화번호 검사 및 한 문자열로 변환하는 기능
 *  Parameters    : tel_no  - 전체 전화번호를 받을 form id
 *                  tel_no0 - 지역번호 또는 휴대폰 ID 번호의 form id
 *                  tel_no1 - 국번의 form id
 *                  tel_no2 - 번호의 form id
 *                  title   - 전화번호 필드의 명칭
 *                  need    - 필수 입력 여부 (true : 필수, false : 필수 아님)
 *  Example       : if (jsMakeAndCheckTelNo(document.myForm.tel_no, document.myForm.tel_no0,
 *                                          document.myForm.tel_no1, document.myForm.tel_no2,
 *                                          "휴대폰", false) return;
 *  Comment       : 
 ******************************************************************************
 *  History       : 2008. 06. 25  방지한  (최초 작성)
 ******************************************************************************/
function jsMakeAndCheckTelNo(tel_no, tel_no0, tel_no1, tel_no2, title, need) {
	var	count	= 0;

	if (tel_no0.value != "") count++;
	if (tel_no1.value != "") count++;
	if (tel_no2.value != "") count++;

	if (need && (count == 0)) {
		alert("입력항목 [" + title + "]을(를) 입력하십시오.");
//		tel_no0.focus();
		return false;
	}

	if ((count != 0) && (count != 3)) {
		alert("입력항목 [" + title + "]의 형식이 맞지 않습니다.");
//		tel_no0.focus();
		return false;
	}

	tel_no.value	= tel_no0.value + "-" + tel_no1.value + "-" + tel_no2.value;
	if ((count != 0) && ((tel_no.value.length < 11) || (tel_no.value.length > 13))) {
//		tel_no.value	= "";
		alert("입력항목 [" + title + "]의 형식이 맞지 않습니다.");
//		tel_no0.focus();
		return false;
	}

	if (tel_no.value == "--")	tel_no.value	= "";

	return true;
}

/******************************************************************************
 *  Function Name : jsCheckTelNo
 *  Description   : 전화번호 검사 기능
 *  Parameters    : tel_no0 - 지역번호 또는 휴대폰 ID 번호의 form id
 *                  tel_no1 - 국번의 form id
 *                  tel_no2 - 번호의 form id
 *                  title   - 전화번호 필드의 명칭
 *                  need    - 필수 입력 여부 (true : 필수, false : 필수 아님)
 *  Example       : if (jsCheckTelNo(document.myForm.tel_no0, document.myForm.tel_no1,
 *                                   document.myForm.tel_no2, "휴대폰번호", false) return;
 *  Comment       : 
 ******************************************************************************
 *  History       : 2008. 06. 25  방지한  (최초 작성)
 ******************************************************************************/
function jsCheckTelNo(tel_no0, tel_no1, tel_no2, title, need) {
	var	count	= 0;

	if (tel_no0.value != "") count++;
	if (tel_no1.value != "") count++;
	if (tel_no2.value != "") count++;

	if (need && (count == 0)) {
		alert("입력항목 [" + title + "]을(를) 입력하십시오.");
//		tel_no0.focus();
		return false;
	}

	if ((count != 0) && (count != 3)) {
		alert("입력항목 [" + title + "]의 형식이 맞지 않습니다.");
//		tel_no0.focus();
		return false;
	}

	var	tel_no	= tel_no0.value + "-" + tel_no1.value + "-" + tel_no2.value;
	if ((count != 0) && ((tel_no.length < 11) || (tel_no.length > 13))) {
//		tel_no.value	= "";
		alert("입력항목 [" + title + "]의 형식이 맞지 않습니다.");
//		tel_no0.focus();
		return false;
	}

	return true;
}

/* 체크박스 전체 선택, 전체 해제 */
function fnChkAll(obj1, tmpStr) {
	var obj2	= document.getElementsByName(tmpStr);
	var totCnt	= obj2.length;

	if (obj1.checked == true) {
		for (var i = 0; i < totCnt; i++ ) {
			if ( obj2[i].disabled == false) {
				obj2[i].checked = true;
			}
		}
	} else {
		for (var i = 0; i < totCnt; i++ ) {
			obj2[i].checked = false;
		}
	}
}

/* 체크박스 전체 선택 유무 체크 */
function fnChkEach(tmpStr1, tmpStr2) {
	var obj1	= document.getElementsByName(tmpStr1);
	var obj2	= document.getElementById(tmpStr2);		// 전체 선택, 전체 해제 체크박스
	var totCnt	= obj1.length;
	var bresult	= true;

	for(var i = 0; i < totCnt; i++) {
		if ( obj1[i].disabled == false && obj1[i].checked == false) {
			bresult = false;
		}
	}

	obj2.checked = bresult;
}


/* 팝업 */
function pop(pop,name,width,height,flag)
{
	var url = pop;
	var wd 	= width;
	var he 	= height;
	var obj	= null; 

	if ((window.navigator.userAgent.indexOf("SV1") != -1) || (window.navigator.userAgent.indexOf("MSIE 7") != -1)) {
		wd = wd + 8;
		he = he + 10;

		if(flag == "0" ){
			obj = window.open(url,name,"toolbar=0,menubar=0,scrollbars=no,resizable=no,width=" + wd + ",height=" + he + ";");  
		}else{  
			obj = window.open(url,name,"toolbar=0,menubar=0,scrollbars=yes,resizable=no,width=" + wd + ",height=" + he + ";");
		}
	} else {
		if (flag == "0" ) {
			obj = window.open(url,name,"toolbar=0,menubar=0,scrollbars=no,resizable=no,width=" + wd +",height=" + he + ";");
		} else {  
			obj = window.open(url,name,"toolbar=0,menubar=0,scrollbars=yes,resizable=no,width=" + wd +",height=" + he + ";");
		}
	}
	return obj;
}

function check_length(sInputStr, strLength) {

	nStrLen = calculate_byte(sInputStr);

	if ( nStrLen > strLength ) {
		return false;
	} else {
		return true;
	}

}

function calculate_byte( sTargetStr ) {
	var sTmpStr, sTmpChar;
	var nOriginLen = 0;
	var nStrLength = 0;

	sTmpStr = String(sTargetStr);
	nOriginLen = sTmpStr.length;

	for (var i = 0; i < nOriginLen; i++) {
		sTmpChar = sTmpStr.charAt(i);

		if (escape(sTmpChar).length > 4) {
			nStrLength += 2;
		} else if (sTmpChar != '\r') {
			nStrLength++;
		}
	}
	return nStrLength;
}

function Cut_Str( sTargetStr , nMaxLen ) {
	var sTmpStr, sTmpChar;
	var nOriginLen = 0;
	var nStrLength = 0;
	var sDestStr = "";
	sTmpStr = String(sTargetStr);
	nOriginLen = sTmpStr.length;

	for (var i = 0; i < nOriginLen; i++) {
		sTmpChar = sTmpStr.charAt(i);

		if (escape(sTmpChar).length > 4) {
			nStrLength = nStrLength + 2;
		} else if (sTmpChar != '\r') {
			nStrLength++;
		}

		if (nStrLength <= nMaxLen) {
			sDestStr = sDestStr + sTmpChar;
		} else {
			break;
		}
	}
	return sDestStr;
}

/* 메시지의 길이를 체크 txtObj 길이 체크할 객체, sTarget : span id, maxLength 최대 길이 */
function fnMsgLength(txtObj, sTarget, maxLength) {
	var sObj				= document.getElementById(sTarget);
	var txtLength			= 0;
	txtLength				= calculate_byte(txtObj.value);
	sObj.innerHTML			= SetNumComma(txtLength);

	if (maxLength < txtLength) {
		
		sObj.innerHTML	=	"<font color='red'>" + SetNumComma(calculate_byte(txtObj.value)) + "</font>";
		
	}
}

/* 메시지의 길이를 체크후 submit  frm form이름, txtObj 길이 체크할 객체, maxLength 최대 길이, url 주소*/
function fnMsgLengthVal(frm, txtObj, maxLength, url) {
	var txtLength			= 0;
	txtLength				= calculate_byte(txtObj.value);
	
	if (maxLength > txtLength) {
		frm.action	=	url;
		frm.submit();
	}else{
		alert("최대 허용 문자수를 초과하였습니다.");
		txtObj.focus();

	}
}


/**
* 문자 변경
*
* @param tmpStr
* @param searchStr
* @param replaceStr  
*/
function fnReplaceAll ( tmpStr, searchStr, replaceStr) {

	while( tmpStr.indexOf( searchStr ) != -1 )	{
		tmpStr = tmpStr.replace( searchStr, replaceStr );
	}
	return tmpStr;

}

// cookie 생성
function setCookie (name, value, expiredays)
{
	var todayDate		= new Date();
	todayDate.setDate( todayDate.getDate() + expiredays ); 
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

// cookie 확인
function getCookie(name) 
{
	var nameOfCookie = name + '='; 
	var x = 0;
	while ( x <= document.cookie.length ) 
	{
		var y = (x + nameOfCookie.length);
		
		if ( document.cookie.substring( x, y ) == nameOfCookie ) 
		{
			if ( (endOfCookie=document.cookie.indexOf( ';',y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring(y, endOfCookie ) );
		}
		x = document.cookie.indexOf( ' ', x ) + 1;
		if ( x == 0 )break;
	}
	return '';
}

function selBoxOptionCopy(selFrom, selTo)
{
	var len		= selFrom.options.length;
	
	selTo.options.length	= 0;
	
	if (len > 0)
	{
		for (var i = 0; i < len; i++)
		{
			selTo.options.add(new Option( selFrom.options[i].text, selFrom.options[i].value ));
		}
	}
}

function asciiChk(strChk) 
{
	var i; 
	for(i=0; i<strChk.length; i++) 
	{
		if((strChk.charAt(i) < " ") || (strChk.charAt(i) > "~"))
			return false;
	}
	return true;
}

//E-mail 체크
function emailChk(email) 
{
	if (!asciiChk(email)) {
		alert("E-mail을 다시 확인해 주세요");
		return false;
	}

	var invalidStr = "\"|&;<>!*\'\\"   ;

	for (var i = 0; i < invalidStr.length; i++) 
	{
		if (email.indexOf(invalidStr.charAt(i)) != -1) 
		{
			alert("E-mail을 다시 확인해 주세요");
			return false;
		}
	}

	if (email.indexOf("@")==-1)
	{
		alert("E-mail형식이 맞지 않습니다.");
		return false;
	}

	if (email.indexOf(" ") != -1){
		alert("E-Mail에 공백이 있습니다.");
		return false;
	}

	if (window.RegExp) 
	{
		var reg1str = "(@.*@)|(\\.\\.)|(@\\.)|(\\.@)|(^\\.)";
		var reg2str = "^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$";

		var reg1 = new RegExp (reg1str);
		var reg2 = new RegExp (reg2str);
		if (reg1.test(email) || !reg2.test(email)) 
		{
			alert("E-Mail에 잘못된 문자가 있습니다.");
			return false;
		}
	}
	return true;
}


function fnStrMaxCheck ( inputNode, message)
{
	var sMaxLength;
	var iMaxLength		= 0;
	try {
		sMaxLength	= inputNode.getAttribute("maxlength");
	} catch (e) {
		alert("잘못된 객체입니다.\n" + e.message);
		return false;
	}
	
	if (sMaxLength == null)
	{
		alert("maxlength 값 미설정");
		return false;
	}
	
	try {
		iMaxLength = parseInt(sMaxLength, 10);
	} catch (e) {
		alert("maxlengt 값이 없거나 숫자가 아닌 값이 있습니다.");
		return false;
	}
	
	if (calculate_byte(inputNode.value) > iMaxLength)
	{
		if (message != null && message != "")
		{
			alert(message + "\n\n" + iMaxLength + "byte 이내로 작성해 주세요.\n영문 : " + iMaxLength + "자, 한글 : " + Math.floor(iMaxLength/2) + "자" );
		}
		return false;
	}
	return true;
}

// 한글을 자름
function js_han_split(char) {
	var char_st = 44032; //'가'의 유니코드 넘버(10진수) 
	var char_ed = 55203; //'힝'의 유니코드 넘버(10진수)

	var arr_1st = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];//초성 19개
	var arr_2nd = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];//중성 21개
	var arr_3th = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];//종성 28개

	if (char.length > 2)
		char = char.charAt(0);

	var uninum = escape(char);

	if (uninum.length < 4)
		return false;//한글이 아니다 

	uninum = parseInt(uninum.replace(/\%u/, ''), 16);

	if(uninum < char_st || uninum > char_ed) 
		return false;//한글이 아니다 

	var uninum2 = uninum - char_st;
	var arr_1st_v = Math.floor(uninum2 / 588);

	uninum2 = uninum2 % 588;

	var arr_2nd_v = Math.floor(uninum2 / 28);

	uninum2 = uninum2 % 28;
	var arr_3th_v = uninum2;
	var return_arr = [arr_1st[arr_1st_v], arr_2nd[arr_2nd_v], arr_3th[arr_3th_v]];

	return return_arr;
}

/**
 * target 이름 완성
 * @param name
 * @param str1
 * @param str2
 * @returns
 */
function makeTargetName(name, str1, str2) {
	var lastName, strArr;
	if (name != "") {
		lastName	= name.substr(name.length-1 , 1);
		strArr		= js_han_split(lastName);
		
		if (typeof strArr != "boolean") {
			if (strArr[2] == "")
				name	+= str1;
			else
				name	+= str2;
		}
		else {
			name += str1 + "(" + str2 + ")";
		}
	}
	return name;
}

/*********************************************
 * [START] date 관련 함수
**********************************************/
/**
 * 해당월의 마지막 날자 가져오기
 * @param year
 * @param month
 * @returns
 */
function getMonthLastDay( year, month ) {
	var iYear, iMonth;
	
	if (typeof year == "number") {
		iYear	= year;
	}
	else {
		try {
			iYear	= parseInt(year, 10);
		} catch (e) {
			return 0;
		}
	}
	
	if (typeof month == "number") {
		iMonth	= month;
	}
	else {
		try {
			iMonth	= parseInt(month, 10);
		} catch (e) {
			return 0;
		}
	}
	
	if (iMonth == 12)
		return 31;
	
	var dt	= new Date(iYear, iMonth, 0);
	
	return dt.getDate();
}

/**
 * String 날짜 비교 (작은값)
 * @param date1
 * @param date2
 * @param sChar
 * @returns
 */
function getMinDate(date1, date2, sChar)
{
	if ( isDate(date1, sChar) && isDate(date2, sChar) ) {
		var dt1		= getDate(date1, sChar);
		var dt2		= getDate(date2, sChar);
		
		if (dt1.getTime() < dt2.getTime())
			return date1;
		else
			return date2;
	}
	else if ( isDate(date1, sChar) && !isDate(date2, sChar) ) {
		return date1;
	}
	else if ( !isDate(date1, sChar) && isDate(date2, sChar) ) {
		return date2;
	}
	else {
		return "";
	}
}

/**
 * String 날짜 비교 (큰값)
 * @param date1
 * @param date2
 * @param sChar
 * @returns
 */
function getMaxDate(date1, date2, sChar)
{
	if ( isDate(date1, sChar) && isDate(date2, sChar) ) {
		var dt1		= getDate(date1, sChar);
		var dt2		= getDate(date2, sChar);
		
		if (dt1.getTime() > dt2.getTime())
			return date1;
		else
			return date2;
	}
	else if ( isDate(date1, sChar) && !isDate(date2, sChar) ) {
		return date1;
	}
	else if ( !isDate(date1, sChar) && isDate(date2, sChar) ) {
		return date2;
	}
	else {
		return "";
	}
}

/**
 * String => date 로 변
 * @param sDate	: String 날
 * @param sChar : 구분자
 * @returns {Date}
 */
function getDate( sDate, sChar )
{
	var strLen		= sDate.length;
	var tmpDate		= new Date();
	var year		= 0;
	var month		= 0;
	var date		= 0;
	
	if (strLen != 10 && strLen != 8)
		return tmpDate;
	
	if (strLen == 10)
	{
		var arrDate		= sDate.split(sChar);
		
		if (arrDate.length != 3)
			return tmpDate;

		year		= parseInt(arrDate[0], 10);
		month		= parseInt(arrDate[1], 10) - 1;
		date		= parseInt(arrDate[2], 10);
	}
	else
	{
		year		= parseInt(sDate.substring(0, 4), 10);
		month		= parseInt(sDate.substring(4, 6), 10) - 1;
		date		= parseInt(sDate.substring(6, 8), 10);
	}
	
	tmpDate.setFullYear(year);
	tmpDate.setMonth(month);
	tmpDate.setDate(date);
	
	return tmpDate; 
}

/**
 * 날짜 체크
 * @param sDate
 * @param sChar
 * @returns {Boolean}
 */
function isDate( sDate, sChar)
{
	var strLen		= sDate.length;
	var tmpDate		= new Date();
	var year		= 0;
	var month		= 0;
	var date		= 0;
	
	if (strLen != 10 && strLen != 8)
		return false;
	
	if (strLen == 10) {
		var arrDate		= sDate.split(sChar);
		
		if (arrDate.length != 3)
			return false;

		year		= parseInt(arrDate[0], 10);
		month		= parseInt(arrDate[1], 10) - 1;
		date		= parseInt(arrDate[2], 10);
	}
	else {
		year		= parseInt(sDate.substring(0, 4), 10);
		month		= parseInt(sDate.substring(4, 6), 10) - 1;
		date		= parseInt(sDate.substring(6, 8), 10);
	}
	
	tmpDate.setFullYear(year);
	tmpDate.setMonth(month);
	tmpDate.setDate(date);
	
	if (tmpDate.getFullYear() == year && tmpDate.getMonth() == month && tmpDate.getDate() == date)
		return true;
	else
		return false;
}

/**
 * date => String 으로 변환
 * @param date
 * @param sChar
 * @returns {String}
 */
function dateToString(date, sChar) {
	
	if (date == undefined)
		return "";
	
	if (sChar == undefined)
		sChar = ".";
	
	var year = date.getFullYear();
	var month = date.getMonth();
	var date2 = date.getDate();
	
	return "" + year + sChar + (month >= 9 ? "" : "0" ) + (month + 1) + sChar + (date2 > 9 ? "" : "0") + date2;
}

/**
 * 년.월 => String 으로 변환 
 * @param date
 * @param sChar
 * @returns {String}
 */
function yearMonthToString(date, sChar) {
	if (date == undefined) 
		return "";
	
	if (sChar == undefined)
		sChar = ".";
	
	var year = date.getFullYear();
	var month = date.getMonth();
	
	return "" + year + sChar + (month >= 9 ? "" : "0" ) + (month + 1);
}

function changeDatePatten (sDate) {
    var result = '';

    if (sDate != null && sDate.length >= 8) {
        result += sDate.substring(0, 4) + '.' + sDate.substring(4, 6) + '.' + sDate.substring(6, 8);
    } else if (sDate != null && sDate.length() >= 6) {
        result += sDate.substring(0, 4) + '.' + sDate.substring(4, 6);
    }

    return result;
}

function changeDatePatten2 (sDate) {
    var result = '';

    if (sDate != null && sDate.length >= 8) {
        result += sDate.substring(0, 4) + '.' + sDate.substring(4, 6) + '.' + sDate.substring(6, 8) +" "+sDate.substring(8,10)+":"+sDate.substring(10,12)+":"+sDate.substring(12,14);
    } else if (sDate != null && sDate.length() >= 6) {
        result += sDate.substring(0, 4) + '.' + sDate.substring(4, 6);
    }

    return result;
}



/*********************************************
 * [END] date 관련 함수
**********************************************/

function msgBoxHide( flag ) {
	if (flag)
		jQuery(".msgBoxHide").hide();
	else
		jQuery(".msgBoxHide").show();
}

//index 값 구하기
function fnGetIndex( obj )
{
	var target	= jQuery(obj);
	var tagName	= target.attr("tagName");
	var index	= -1;
	
	if (tagName == "INPUT") {
		var name	= target.attr("name");
		index	= jQuery("input[name='" + name + "']", this.frm ).index(target);
	}
	else {
		var id	= target.attr("id");
		index	= jQuery("#" + id, this.frm ).index(target);
	}
	return index;
}

//숫자금액을 한글로 변환
function cmChangeHangul(num) {
	if (isNaN(num)) {
		return "";
	}
	if (num == 0 || num == "0") {
		return "";
	}

	var hanA = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십"];
	var danA = ["", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천"];
	var result = "";

	if (num * 1 > 0) {
		for (var i = 0; i < num.length; i++) {
			str = "";
			han = hanA[num.charAt(num.length - (i + 1))];
			if (han != "") str = han + danA[i];
			if (i == 4) {
				var sum = 0;
				for (var j = i; j < 8; j++) {
            		sum = sum + num.charAt(num.length-(j+1))*1;
            	}
            	if(sum > 0){
            		str += "만";
            	}
            }
            if(i == 8){
            	//만단위 숫자가 모두 0일 경우 
            	var sum=0;
            	for(var j=i; j < 12; j++){
            		sum = sum + num.charAt(num.length-(j+1))*1;
            	}
            	if(sum > 0){
            		str += "억";
            	}
            }
            if(i == 12){
            	var sum=0;
            	for(var j=i; j < 16; j++){
            		sum = sum + num.charAt(num.length-(j+1))*1;
            	}
            	if(sum > 0){
            		str += "조";
            	}
            }
            result = str + result; 
        } 
        return result; 
    }
}

function SetFloatComma(str)
{
    var tmpStr  = "" + str;
    var sResult = "";
    if (tmpStr != "")
    {
        var ArrtemStr = tmpStr.split(".");

        if(ArrtemStr.length > 1){
            tmpStr = ArrtemStr[0];
            tmpStr  = "" + parseInt(tmpStr, 10);        // 0부터 시작할 경우 앞에 0 모두 제거

            var len     = tmpStr.length;
            var cnt     = 0;

            for (var i = len - 1; i >= 0; i--)
            {
                if (cnt > 0 && cnt % 3 == 0 )
                {
                    sResult  = "," + sResult;
                }
                sResult  = tmpStr.charAt(i) + sResult;
                cnt++;
            }

            sResult = sResult + "." + ArrtemStr[1];
        } else {
            tmpStr  = "" + parseFloat(tmpStr, 10);        // 0부터 시작할 경우 앞에 0 모두 제거

            var len     = tmpStr.length;
            var cnt     = 0;

            for (var i = len - 1; i >= 0; i--)
            {
                if (cnt > 0 && cnt % 3 == 0 )
                {
                    sResult  = "," + sResult;
                }
                sResult  = tmpStr.charAt(i) + sResult;
                cnt++;
            }
        }
    }

    return sResult;
}

//글자 카운트
function updateInputCount(textareaname,MaxLength,spanid){
    var textStr = jQuery('textarea[name='+textareaname+']').val();
    var textLength = textStr.length;
    var textChar = "";
    var count = 0;
    var countMax = MaxLength;
    var countLen = 0;
    var textStr2 = "";

    for(var i = 0; i < textLength; i++){
        // 한글자추출
        textChar = textStr.charAt(i);

        // 한글이면 2를 더한다.
        if (escape(textChar).length > 4) {
            count += 2;
        }
        else {   // 그밗의 경우는 1을 더한다.
            count++;
        }

        // 전체 크기가 countMax 넘지않으면
        if(count <= countMax){
            countLen = i + 1;
        }
    }

    if(count > countMax){
        showMessageBox({
            message : "한글"+MaxLength/2+"글자, 영문"+MaxLength+"글자를 초과 입력할수 없습니다. \n초과된 내용은 삭제 됩니다.",
            close : function(){
                jQuery('span.'+spanid).text(countMax);
            }
        });
        textStr2 = textStr.substr(0, countLen);
        jQuery('textarea[name='+textareaname+']').val(textStr2);

    }
    jQuery('span.'+spanid).text(count);
}

//list
function cmGoList(formName, urlName, parsName) {
    var frm		= jQuery("form[name='"+ formName + "']");
    var url		= jQuery.trim(jQuery("input[name='" + urlName + "']", frm).val());
    var pars	= jQuery.trim(jQuery("input[name='" + parsName + "']", frm).val());

    if (url == "") {
        alert(urlName + " 값이 없습니다.");
        return;
    }

    if (pars != "") {
        document.location.href	= url + "?" + pars;
    }
    else {
        document.location.href	= url;
    }
}

/**
 * 2010.10.10 형식을 다른 형식으로 변환
 * @param dateStr
 * @param typeString ( DATEFORMAT : 20101010, 명시안함 : 2010년 10월 10일 )
 * @return 문자열
 */
function changeDate(dateStr, typeString) {

    var dateStrAry = dateStr.split(".");
    var returnStr = "";

    if (typeString == "DATEFORMAT")
    {
        returnStr += dateStrAry[0];
        returnStr += dateStrAry[1];
        returnStr += dateStrAry[2];
    }
    else {
        returnStr += dateStrAry[0] + "년 ";
        returnStr += dateStrAry[1] + "월 ";
        returnStr += dateStrAry[2] + "일 ";
    }

    return returnStr;
}

/**
 * 숫자를 시간으로 변경
 * 15시 30분 (1530) => 155
 * @param numberStr
 * @return
 */
function changeNumberToHhMm ( numberStr ) {

    var sHhMm = "";

    var sHh = parseInt((parseInt(numberStr, 10) / 10), 10);

    var sMm = numberStr.substr((numberStr.length - 1), (numberStr.length - 1));

    if(sMm == "" && numberStr == "0"){
        sMm = "0";
    }

    sHhMm = (sHh < 10 ? "0"+sHh : sHh) + ( sMm == "0" ? "00" : "30" ) ;

    return sHhMm;
}

/**
 * 숫자를 시간으로 변경
 * 15시 30분 (1530) => 15:5
 * @param numberStr
 * @return
 */
function changeNumberToHhMm2 ( numberStr ) {

    var sHhMm = "";

    var sHh = parseInt((parseInt(numberStr, 10) / 10), 10);

    var sMm = numberStr.substr((numberStr.length - 1), (numberStr.length - 1));

    if(sMm == "" && numberStr == "0"){
        sMm = "0";
    }

    sHhMm = (sHh < 10 ? "0"+sHh : sHh) +":"+ ( sMm == "0" ? "00" : "30" ) ;

    return sHhMm;
}

/**
 * 시간을 숫자로 변경
 * 155 => 15시 30분 (1530)
 * @param HhMmStr
 * @return
 */
function changeHhMmToNumber ( HhMmStr )
{
    var sHh = parseInt((parseInt(HhMmStr, 10) / 10), 10);

    var sMm = HhMmStr.substr((HhMmStr.length - 1), (HhMmStr.length - 1));

    if(sMm == "" && HhMmStr == "0"){
        sMm = "0";
    }

    var sNumber1 = sHh < 10 ? "0"+sHh : sHh;
    var sNumber2 = sMm == "0" ? "00" : "30";

    return sNumber1 + sNumber2;
}

function addThumnailImagePop(target, p_opt) {

    if (target == undefined || target == null) {
        target = jQuery(".lrk_thumbnail_image");
    }

    target.click(function (event) {
        event.preventDefault();
        var src = jQuery(this).attr("src");
        var ext = src.substring(src.lastIndexOf("."), src.length);
        var url = src.substring(0, src.lastIndexOf("_"));

        var temp_frm = jQuery("<form name='temp_thumbnail_frm'/>");
        temp_frm.appendTo("body");
        temp_frm.attr({"action" : url + ext, "target": "_blank"});
        temp_frm.submit();
        temp_frm.remove();
    });
}

/**
 * 제품 검색
 */
function addSearchProductEvent() {
	
    var url = WEB_ROOT + "shop/pd/shop_pd_search_product_list_pop.do";

    jQuery(".search_product").each(function (n) {
        var productNm = jQuery("input[type='text']", jQuery(this));
        var hideProductnm = jQuery("span.hide_productNm", jQuery(this));
        var productcd = jQuery("input[type='hidden']:eq(0)", jQuery(this));
        var searchType = jQuery("input[type='hidden']:eq(1)", jQuery(this));
        var searchType2 = jQuery("input[type='hidden']:eq(2)", jQuery(this));
        var callbackFunction = jQuery("input[type='hidden']:eq(3)", jQuery(this));
        var productimg = jQuery("input[type='hidden']:eq(4)", jQuery(this));
        var searchBtn = jQuery("a.btn_search_product", jQuery(this));
        var deleteBtn = jQuery("a.btn_delete_product", jQuery(this));
        var arrParam = [];
        var dialogTitle = (function() {
            switch(searchType.val()) {
                case "all" :
                    return "본품 목록";
                case "0001" :
                    return "본품 목록";
                case "0002" :
                    return "판촉상품 목록";
                case "0003" :
                    return "Freegood 목록";
                default :
                    return "일반상품";
            }
        })();

        // 검색
        searchBtn.click(function(event) {
            arrParam = [];
            arrParam.push("callbackFunction=" + (callbackFunction.val() == '' ? "parent.addSearchProductEventResult" : "parent." + callbackFunction.val()));
            arrParam.push("categoryCallbackFunction=parent.addSearchCategoryProductEventResult");
            arrParam.push("seachIndex=" + n);
            arrParam.push("typecd=" + searchType.val());
            arrParam.push("typecd2=" + searchType2.val());
            arrParam.push("keyword=" + encodeURIComponent(productNm.val()));

            event.preventDefault();
            cmDialogOpen("searchProduct", {
                url : url + "?" + arrParam.join("&")
                , title : dialogTitle
                , width :800
                , height : 550
                , modal : true
            });
        });

        // 삭제
        deleteBtn.click(function(event) {
            event.preventDefault();
            productNm.val("");
            hideProductnm.text("");
            productcd.val("");
        });

        // Enter key event
        addInputMessageEvent();
        setEnterKey(productNm, searchBtn);
    });
}

/**
 * 제품 검색 결과등록
 * @param rvo
 */
function addSearchProductEventResult(rvo) {
    var searchProduct = jQuery("dl.search_product");
    var size = searchProduct.size();

    try {
        var index = parseInt(rvo.n_index, 10);

        if (size <= index) {
            alert("addSearchProductEventResult(rvo) 오류");
            return;
        }

        var productNm = jQuery("input[type='text']", searchProduct.eq(index));
        var hideProductnm = jQuery("span.hide_productNm", searchProduct.eq(index));
        var productcd = jQuery("input[type='hidden']:eq(0)", searchProduct.eq(index));
        var productImg = jQuery("input[type='hidden']:eq(4)", searchProduct.eq(index));
        
        productNm.val(rvo.v_product_nm);
        hideProductnm.text(rvo.v_product_nm);
        productcd.val(rvo.v_product_cd);
        productImg.val(rvo.v_product_img);

        productcd.data("product_info", rvo);

        try {
            // change event 발생
            productcd.change();
        } catch (e) {}

        cmDialogClose("searchProduct");
        productNm.focus();

    } catch (e) {
        alert("addSearchProductEventResult(rvo) 오류\n\n" + e.message);
    }
}

function addSearchOptionEvent() {
	
    var url = WEB_ROOT + "shop/pd/shop_pd_shop_list_option_pop.do";

    jQuery(".search_option").each(function (n) {
        var productNm = jQuery("input[type='text']", jQuery(this));
        var hideProductnm = jQuery("span.hide_productNm", jQuery(this));
        var productcd = jQuery("input[type='hidden']:eq(0)", jQuery(this));
        var optioncd = jQuery("input[type='hidden']:eq(1)", jQuery(this));
        var callbackFunction = jQuery("input[type='hidden']:eq(3)", jQuery(this));
        var searchBtn = jQuery("a.btn_search_option", jQuery(this));
        var deleteBtn = jQuery("a.btn_delete_option", jQuery(this));
        var arrParam = [];
        var dialogTitle = "본품 목록";

        // 검색
        searchBtn.click(function(event) {
            arrParam = [];
            arrParam.push("callbackFunction=" + (callbackFunction.val() == '' ? "parent.addSearchOptionEventResult" : "parent." + callbackFunction.val()));
            arrParam.push("seachIndex=" + n);
            arrParam.push("keyword=" + encodeURIComponent(productNm.val()));
            arrParam.push("flag=Y");

            event.preventDefault();
            cmDialogOpen("searchOption", {
                url : url + "?" + arrParam.join("&")
                , title : dialogTitle
                , width :800
                , height : 550
                , modal : true
            });
        });

        // 삭제
        deleteBtn.click(function(event) {
            event.preventDefault();
            productNm.val("");
            hideProductnm.text("");
            productcd.val("");
            optioncd.val("");
        });

        // Enter key event
        addInputMessageEvent();
        setEnterKey(productNm, searchBtn);
    });
}

/**
 * 제품 검색 결과등록
 * @param rvo
 */
function addSearchOptionEventResult(rvo) {
    var searchProduct = jQuery("dl.search_option");
    var size = searchProduct.size();

    try {
        var index = parseInt(rvo.n_index, 10);
        
        if (size <= index) {
            alert("addSearchOptionEventResult(rvo) 오류");
            return;
        }

        var productNm = jQuery("input[type='text']", searchProduct.eq(index));
        var hideProductnm = jQuery("span.hide_productNm", searchProduct.eq(index));
        var productcd = jQuery("input[type='hidden']:eq(0)", searchProduct.eq(index));
        var optioncd = jQuery("input[type='hidden']:eq(1)", searchProduct.eq(index));
        var optionnm = jQuery("input[type='hidden']:eq(2)", searchProduct.eq(index));
        
        productNm.val(rvo.v_productnm);
        hideProductnm.text(rvo.v_productnm);
        productcd.val(rvo.v_productcd);
        optioncd.val(rvo.v_optioncd);
        optionnm.val(rvo.v_optionnm);
        
        optioncd.data("option_info", rvo);

        try {
            // change event 발생
            optioncd.change();
        } catch (e) {
        }

        cmDialogClose("searchOption");
        productNm.focus();

    } catch (e) {
        alert("addSearchOptionEventResult(rvo) 오류\n\n" + e.message);
    }
}

function addSearchUserEvent() {
	
	var url = WEB_ROOT + "user/mn/user_mn_user_search_list_pop.do";
	
	jQuery("dl.search_user").each(function (n) {
		var usernm 		= jQuery("input[type='text']", jQuery(this));
		var hideUsernm 	= jQuery("span.hide_usernm", jQuery(this));
		var userInfo 	= jQuery(".search_user_info_txt", jQuery(this));
		var userid 		= jQuery("input[type='hidden']", jQuery(this)).eq(0);
		var searchBtn 	= jQuery("a.btn_search_user", jQuery(this));
		var deleteBtn 	= jQuery("a.btn_delete_user", jQuery(this));
		
		// 검색
		searchBtn.click(function(event) {
			
			var arrParam = [];
			
			arrParam.push("callbackFunction=parent.addSearchUserEventResult");
			arrParam.push("seachIndex=" + n);
			arrParam.push("keyword=" + encodeURIComponent(usernm.val()));

			event.preventDefault();
			cmDialogOpen("searchUser", {
				url : url + "?" + arrParam.join("&")
				, width : 600
				, height : 400
				, modal : true
			});
		});
		
		// 삭제
		deleteBtn.click(function(event) {
			event.preventDefault();
			usernm.val("");
			hideUsernm.text("");
			userid.val("");
			userInfo.text("");
		});
		
		// Enter key event
		setEnterKey(usernm, searchBtn);
	});
}

/**
 * 사원 검색 결과등록
 * @param rvo
 */
function addSearchUserEventResult(rvo) {
	var searchUser = jQuery("dl.search_user");
	var size = searchUser.size();
	
	try {
		var index = parseInt(rvo.n_index, 10);
		
		if (size <= index) {
			alert("addSearchUserEventResult(rvo) 오류");
			return;
		}
		
		var userNm 		= jQuery("input[type='text']", searchUser.eq(index));
		var hideUsernm 	= jQuery("span.hide_usernm", searchUser.eq(index));
		var userId 		= jQuery("input[type='hidden']", searchUser.eq(index));
		var userInfo 	= jQuery(".search_user_info_txt", searchUser.eq(index)); 
		
		userNm.val(rvo.v_usernm);
		hideUsernm.text(rvo.v_usernm);
		userId.val(rvo.v_userid);
		userId.data("data_user_info", rvo);
		userInfo.text("(" + (rvo.v_nickname != "" ? rvo.v_nickname : rvo.v_usernm) + " / " + rvo.v_userid_hide + ")");
		
		try {
			// change event 발생
			userId.change();
		} catch (e) {}
		
		cmDialogClose("searchUser");
		userNm.focus();
		
	} catch (e) {
		alert("addSearchUserEventResult(rvo) 오류\n\n" + e.message);
	}
}


function fnCommentInfo(index, recordid){
	
	cmAjax({
		url : WEB_ROOT + "comm/comm_comment_list_ajax.do"
		, type : "POST"
		, data : {recordid : recordid}
		, dataType : "html"
		, isModal : false
		, isModalEnd : false
		, success : function ( data, textStatus, jqXHR) {
			if (data.status = "succ") {

				if ($(".tr_comment").eq(index).css("display") == "none") {
					$(".tr_comment").hide();
					$(".tr_comment").eq(index).show();
				} else {
					$(".tr_comment").hide();

				}
				$(".div_comment").html("");
				$(".div_comment").eq(index).html(data);
			}
		}
	});		
}

function fnModifyPop(commentcd, tablenm, contentcol, targetcdNm,width,height) {
	var url = WEB_ROOT + "comm/comm_reply_mod_pop.do";
	
	var arrParam = [];
	
	arrParam.push("commentcd=" + commentcd);
	arrParam.push("tablenm=" + tablenm);
	arrParam.push("contentCol=" + contentcol);
	arrParam.push("targetcd=" + targetcdNm);
	
	cmDialogOpen("comment_modify", {
		url : url + "?" + arrParam.join("&")
		, width : width
		, height : height
		, modal : true
	});
}

function fnDeleteComment(commentcd, tablenm, contentcol, targetcdNm) {
	var url	=	WEB_ROOT + "comm/comm_comment_save.do";
	
	cmAjax({
		url : url
		, type : "POST"
		, data : {
			commentcd : commentcd
			, tablenm : tablenm
			, contentCol : contentcol
			, targetcd : targetcdNm
			, flagAction : "D"
		}
		, dataType : "json"
		, isModal : true
		, isModalEnd : true
		, success : function(data, textStatus, jqXHR) {
			if(data.status == "succ") {
				showMessageBox({
					message : data.message
					, close : function() {
						parent.fnReload();
					}
				});
			} else {
				showMessageBox({message : data.message});
			}
		}
	});
}


//YHCHOI : 유투브 영상 존재유무 체크. 존재시 아이디만 가져오기
function fnYouTubeCheck(){

	var url	=	WEB_ROOT + "tube/be/tube_be_youtube_check_ajax.do";

		cmAjax({
			url: url
			, type: "post"
			, data: {youTube: $("#youTube").val(), showMovie: 'Y'}
			, dataType: "json"
			, isBlock: true
			, success: function (json) {
				if (json.status == "succ") {
					removeErrorMessageForTarget($("#youTube").attr("name"));
					$(".error_i_sYouTube").text("* " + json.message);
					$("#uploadYouTubeId").val(json.object);
					$("#youTube").val(json.object);
				} else {
					addErrorMessage($("*[name='youTube']", frm), json.message);
					$("input[name='youTube']").focus();
				}
			}
			, error: function (e) {
				alert(e);
				alert("ajax error!");
			}
		});
}

//YHCHOI : 유투브 영상 업로드
function fnYoutubeUpload(token,tokenUrl,playlistid) {
	
	var file = document.getElementById("youtubeFileUpload");
	if(file) {
		var fileName = $("#youtubeFileUpload").val();
		var fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
		var fileExtList = ["mp4", "avi", "mpg", "mpeg", "mpe", "wmv", "asf", "asx", "flv", "rm", "mov", "dat"];
		var fileExtFlag = false;

		for (var i = 0; i < fileExtList.length; i++) {
			if (fileExtension == fileExtList[i]) {
				fileExtFlag = true;
			}
		}

		if (!fileExtFlag) {
			addErrorMessage($("input[name='youtubeFileUpload']"), "동영상 파일만 업로드할 수 있습니다.");
			return;
		} else {
			removeErrorMessageForTarget($("#youtubeFileUpload").attr("name"));
		}

		var returnUrl = "&nexturl=" + WEB_FULL_URL + "tube/be/tube_be_ytUpload_iframe.do?playListId=" + playlistid;

		var frm = document.frm;
		frm.enctype = "multipart/form-data";
		frm.target = "youTubeiFrame";
		frm.action = tokenUrl + "?token=" + token + returnUrl;
		frm.submit();

	}
}

//YHCHOI : 유투브 결과 뿌려주기
function fnYouTubeResult() {
	var id = $("#uploadYouTubeId").val();
	var arrHtml = [];

	arrHtml.push('<object width="461" height="289">');
	arrHtml.push('	<param name="movie" value="http://www.youtube.com/v/' + id + '&theme=light&disablekb=1&autohide=1&color=white"/>');
	arrHtml.push('	<param name="allowFullScreen" value="true"/>');
	arrHtml.push('	<param name="allowscriptaccess" value="always"/>');
	arrHtml.push('	<embed src="http://www.youtube.com/v/' + id + '&theme=light&disablekb=1&autohide=1&color=white" type="application/x-shockwave-flash" allowfullscreen="true" width="461" height="289" allowscriptaccess="always"  wmode="transparent"/>');
	arrHtml.push('</object>');

	$(".youtube_thumbNail").html("");
	$(".youtube_thumbNail").append(arrHtml.join(""));
}
/*
function fnDeliverySearch(delino){
	
	var loc_url = document.location.href;
	
	if ( loc_url.indexOf("https://") > -1 ) {
		var popup = pop("http://nexs.cjgls.com/web/info.jsp?slipno=" + delino, "DELIVERY_INFO", "630", "380", 1);
		try {
			popup.focus();
		} catch (e) {}
	}
	else {
		cmDialogOpen('DELIVERY_INFO' , {
			url:"http://nexs.cjgls.com/web/info.jsp?slipno="+delino,
			width:630,
			height:380,
			modal : true,
			scroll : "Yes",
			changeViewAutoSize: true
		});
	}
}
*/
function fnDeliverySearch(delino){
	cmDialogOpen('DELIVERY_INFO' , {
		url: WEB_ROOT + "order/od/order_od_shipping_order_status_pop.do?ordercd="+delino,
		width:630,
		height:380,
		modal : true,
		scroll : "Yes",
		changeViewAutoSize: true
	});
}
//HJLEE : search clear
function fnSearChClearAll(obj) {
	$('select').val('');
	$('input:text').val('');
	$('input:checkbox').attr('checked', false);
	if (obj == 'i_label') {
		$('.i_label').css('visibility', 'visible');
	}
}

// 파일 사이즈
function getFileSize(fileSize) {
	fileSize = parseInt(fileSize);
	var sReturn = "";
	if(fileSize >= (1 * 1024 * 1024 * 1024)) {
		sReturn = SetNumComma(Math.ceil(fileSize / 1024 / 1024 / 1024)) + "GB";
	} else if(fileSize >= (1 * 1024 * 1024)) {
		sReturn = SetNumComma(Math.ceil(fileSize / 1024 / 1024)) + "MB";
	} else if(fileSize >= (1 * 1024)) {
		sReturn = SetNumComma(Math.ceil(fileSize / 1024)) + "KB";
	} else if(fileSize > 0) {
		sReturn = "1KB";
	}
	return sReturn;
}

// IE 여부 및 버전 체크
function fnIECheck() {
	var isIE = false;
	var version = null;
	var ua = navigator.userAgent;
	if ( ua.match(/MSIE/) || ua.match(/Trident/) ) {
		isIE = true;
		version = ua.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
	}
	
	return {isIE : isIE, version : version};
}

function getStrByte( str ) {
	
	if (str == undefined) { 
		return 0;
	}
	var len 	= str.length;
	var ibyte 	= 0;
	
	for (var i = 0; i < len; i++) {
		var tmp = escape(str.charAt(i));
		if (tmp.length == 1) ibyte++;
		else if (tmp.indexOf("%u") != -1) ibyte += 3;
		else if (tmp.indexOf("%") != -1) ibyte += tmp.length / 3;
	}
	return ibyte;
}

//정수체크
function isNumeric(Num) {
	 var result = false;
	 if (!isNaN(parseInt(Num))){
	  result = true;
	 }
	 return result;
}

/**
 * 날짜포맷변경
 * 
 * formatType 1 : yyyy.MM.dd
 * formatType 2 : yyyy.MM.dd HH:mm:ss
 * 
 * @param strDate
 * @param formatType
 * @returns
 */
function formatDate(strDate, formatType) {
	var dateObj	= new Date(strDate);
	var year	= dateObj.getFullYear();
	var month	= dateObj.getMonth();
	var date	= dateObj.getDate();
	var hr		= dateObj.getHours();
	var min		= dateObj.getMinutes();
	var sc		= dateObj.getSeconds();
	
	month		= month +1;
	
	if (month.toString().length == 1) {
		month = "0" + month;
	}
	if (date.toString().length == 1) {
		date = "0" + date;
	}
	if (hr.toString().length == 1) {
		hr = "0" + hr;
	}
	if (min.toString().length == 1) {
		min = "0" + min;
	}
	
	if (formatType == 1) {			//yyyy.MM.dd
		return year + "." + month + "." + date;
	}
	else if (formatType == 2) {		//yyyy.MM.dd HH:mm:ss
		return year + "." + month + "." + date + " " + hr + ":" + min + ":" + sc;
	}
}

/**
 * 날짜포맷변경
 * dd.MM.yyyy → yyyy.MM.dd
 * 
 * @param strDate
 * @returns
 */
/*
function changeFormatDate(strDate) {
	var newStrDate = "";
	var arrStrDate = strDate.split(".");
	
	newStrDate = arrStrDate[2] + "." + arrStrDate[1] + "." + arrStrDate[0]; 
	
	return newStrDate;
}
*/

/**
 * 이미지업로드 ui 생성
 * @param id 이미지 업로드가 추가 될 태그 id
 * @param attrObj 이미지 속성 객체
 */
function createImageUploadUI(id,attrObj){
	jQuery('input[name^='+attrObj.uploadCd+']',jQuery('form[name='+attrObj.formName+']')).remove();

	let tag = '';
	tag += '<div id="'+attrObj.uploadCd+'_preview">';
	if(attrObj.type === 'M'){
		tag += '<img src="'+attrObj.imageSrcPath+'" style="width:'+attrObj.imageWidth+';height:'+attrObj.imageHeight+';">';
	}
	tag += '</div>';
	tag += '<div id="'+attrObj.uploadCd+'_upload_wrap" class="filebox'+ ' on' +'">';
	tag += '<div class="upload_btn">';
	tag += '<input class="input_file" id="'+attrObj.uploadCd+'_imageFile" name="'+attrObj.uploadCd+'_imageFile" type="file" accept="image/*">';
	tag += '<label for="'+attrObj.uploadCd+'_imageFile" class="btn-form btn-default file_upload"><span>파일 선택</span></label></div>';
	tag += '<div class="upload-name"><span class="txt">'
	if(attrObj.type === 'M'){
		const imageExt = attrObj.imageSrcPath.substring(attrObj.imageSrcPath.lastIndexOf(".")).toLowerCase();
		tag += attrObj.imageId + imageExt
	}
	tag += '</span>'
	if(attrObj.type === 'M'){
		tag += '<button type="button" class="btn-del-xs ui-file-delete btn_del" onclick="jfupload.deleteImage(\''+attrObj.uploadCd+'\',\''+attrObj.formName+'\');" value="삭제">';
		tag += '<i class="ico-x-white"></i><span class="blind">삭제</span>'
		tag += '</button>'
	}

	tag += '</div>';
	tag += '</div>';
	if(attrObj.type === 'M'){
		tag += '<div id="div_'+attrObj.uploadCd+'_'+attrObj.imageId+'">';
		tag += '<input type="hidden" name="'+attrObj.uploadCd+'_image_action_type" value="M">';
		tag += '<input type="hidden" name="'+attrObj.uploadCd+'_image_id" value="'+attrObj.imageId+'">';
		tag += '<input type="hidden" name="'+attrObj.uploadCd+'_image_path" value="'+attrObj.imagePath+'">';
		tag += '</div>';
	}
	tag += '</div>';

	jQuery('#'+id).html(tag);
	attrObj.target = jQuery('#'+attrObj.uploadCd+'_imageFile');
	attrObj.success = function(imageData){
		console.log(imageData);
		jfupload.deleteImage(attrObj.uploadCd,attrObj.formName);
		const previewTag = jQuery('#'+attrObj.uploadCd+'_preview');
		const uploadNameTag = jQuery('#'+attrObj.uploadCd+'_upload_wrap').find('.upload-name');
		let uploadNameStr = '<span class="txt">'+imageData.image_id + imageData.image_ext+'</span>';
		uploadNameStr += '<button type="button" class="btn-del-xs ui-file-delete btn_del" onClick="javascript:jfupload.deleteImage(\''+attrObj.uploadCd+'\', \'eventImage\');">';
		uploadNameStr += '<i class="ico-x-white"></i><span class="blind">삭제</span>';
		uploadNameStr += '</button>';
		uploadNameTag.html(uploadNameStr);
		const src = imageData.image_url + imageData.image_path + imageData.image_id + imageData.image_ext;
		previewTag.html('<img src="'+src+'" style="width:'+attrObj.imageWidth+';height:'+attrObj.imageHeight+';">');
	};

	jfupload.initImageUpload(attrObj);

}


/**
 * 에디터 생성
 * @param textareaId 에디터가 될 textarea id
 * @param attrObj 이미지 속성 객체
 */
function createEditor(textareaId,attrObj){
	jQuery('#'+textareaId).hide();
	attrObj.tempYn ='N';
	const arrParam=[];
	for (let property in attrObj) {
		arrParam.push(property+'='+attrObj[property]);
	}
	if(CKEDITOR.instances[textareaId]){
		CKEDITOR.instances[textareaId].setData(jQuery('#'+textareaId).val());
		CKEDITOR.instances[textareaId].destroy();

	}

	CKEDITOR.replace(textareaId,{filebrowserUploadUrl:'/img/editor/upload?'+arrParam.join('&')}).on('instanceReady', function( ev ) {
		jQuery('iframe.cke_wysiwyg_frame', ev.editor.container.$).contents().find('body').css({'min-height':200});
	});

	let tag = '';
	tag += '<form id="img_upload_form_'+textareaId+'" style="display: none;">';
	tag += '<input type="file" id="img_file_'+textareaId+'" multiple="multiple" name="imgfile[]" accept="image/*">';
	tag += '<input type="hidden" class="target" name="target"/></form>';

	jQuery('body').append(tag);

	attrObj.target = jQuery('#img_file_'+textareaId);
	attrObj.singleFileUploads = false;

	attrObj.success = function(imgList){
		let resultTag = '';
		imgList.forEach(function(img,i){
			resultTag +='<p><img alt="" src="'+img.image_url + img.image_path + img.image_id + img.image_ext+'" /></p>'
		});
		CKEDITOR.instances[textareaId].insertHtml(resultTag);

	};
	jfupload.initImageUpload(attrObj);
}