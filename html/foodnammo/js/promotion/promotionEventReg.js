const EventView = {
    formName : 'event',
    imageFormName : 'eventImage',
    listFormName : 'eventList',
    formValue : {
        benefit_type : [],
    },
    benefitKey : 0,
    init : function(){
        const $eventForm = $('form[name="'+EventView.formName+'"]');
        EventView.fetchFormData();
        EventView.refreshEventUI(true);
        EventView.loadEditor();

        //라디오 + input UI disable event
        $('input[type="radio"].radioInput').change(function(e){
            const $target = $('input[name="'+this.name+'"]:checked');
            const $nonTarget = $('input[name="'+this.name+'"]').not($target);
            const $selInput = $target.closest('.radioWrapper').find('input[type=text].radioInput');
            const $otherInput = $nonTarget.closest('.radioWrapper').find('input[type=text].radioInput');

            if($selInput){
                EventView.enableInp($selInput);
            }

            if($otherInput){
                EventView.disableInp($otherInput,true);
            }
        });

        //빈 radio 첫째 값으로 초기화
        $('input[type="radio"]').each(function(i,radio){
            if($('input[name="'+radio.name+'"]:checked').length<=0){
                $('input[name="'+radio.name+'"]:eq(0)').prop('checked',true).trigger('change');
            }
        });

        //숫자만 입력되는 input
        $eventForm.on("keydown keypress keyup blur change", ".numberOnly", function(e) {
            if(!((e.keyCode > 95 && e.keyCode < 106)
                ||(e.keyCode > 47 && e.keyCode < 58)
                || e.keyCode == 8))
            {
                $(this).val($(this).val().replace(/[^0-9]/g,""));
            }
        });

        //이벤트,혜택,퀴즈,선착순 타입 변경시
        $eventForm.on('change',".changeEventForm",function(){
            const name = this.name || this.dataset.name;
            switch (name) {
                case "vSitecd" : //사이트 변경
                    EventView.refreshSiteUI($(this).val());
                    break;
                case "vEventType" : //이벤트 타입 변경
                    EventView.refreshEventUI();
                    break;
                case "vQuizType" : //퀴즈 타입 변경
                    EventView.refreshQuizUI();
                    break;
                case "vFirstComeType" : //선착순 타입 변경
                    EventView.refreshFirstComeUI();
                    break;
                case "vBenefitType" : //혜택 타입 변경
                    EventView.refreshBenefitUI($(this));
                    break;
            }
        });

        /*
            동적으로 생성되는 버튼 click event
            페이지/답안 추가삭제
            쿠폰검색/적립금 검색
        */
        $eventForm.on('click',".dynamicBtn",function(){
            const btn = $(this);
            if(btn.hasClass('pageDelBtn')||btn.hasClass('answerDelBtn')){
                //페이지/답안 삭제
                const listBoxName = btn.hasClass('pageDelBtn') ? 'pageListBox' : 'answerListBox';
                btn.closest('.input-group').remove();
                EventView.rearrangeRows($('#'+listBoxName+'>div'));
            }else if(btn.hasClass('pageAddBtn')){
                //페이지추가
                const $pageListBox = $('#pageListBox');
                let tagStr = '<div class="input-group">';
                tagStr += '<div class="input-group-form"><input type="text" data-name="vLandingPage" class="input-text w571" placeholder="URL 입력"></div>';
                tagStr += '<span class="input-group-btn">';
                tagStr += '<span class="input-group-btn">';
                tagStr += '<button type="button" class="btn-minus dynamicBtn pageDelBtn" title="삭제"><i class="ico-minus-bold"></i><span class="blind">삭제</span></button>';
                tagStr += '</span>';
                tagStr += '</div>';
                $pageListBox.append(tagStr);
            }else if(btn.hasClass('answerAddBtn')){
                //답안추가
                const $answerListBox = $('#answerListBox');
                const questionCnt = $answerListBox.children().length;
                let tagStr = '<div class="input-group">';
                tagStr += '<div class="input-group-form w30">';
                tagStr += '<div class="custom-radio single">';
                tagStr += '<input type="radio" name="vQuizAnswer" class="radio rowCount" id="vQuizAnswer'+(questionCnt+1)+'" value="${questionCnt+1}">';
                tagStr += '<label for="vQuizAnswer'+(questionCnt+1)+'" class="blind">선택</label>';
                tagStr += '</div>';
                tagStr += '</div>';
                tagStr += '<div class="input-group-form">';
                tagStr += '<input type="text" class="input-text w571" data-name="vAnswerNm" placeholder="보기 입력" value="">';
                tagStr += '</div>';
                tagStr += '<span class="input-group-btn">';
                tagStr += '<button type="button" class="btn-minus dynamicBtn answerDelBtn" title="삭제"><i class="ico-minus-bold"></i><span class="blind">삭제</span></button>';
                tagStr += '</span>';
                tagStr += '</div>';
                $answerListBox.append(tagStr);
            }else if(btn.hasClass('searchPointBtn')){
                //포인트검색
                //TODO 팝업호출 임시로 callback trigger
                const testData = {
                    name: '6월 포인트 적립',
                    code:'9999',
                    info:'5%적립'
                }
                EventView.setBenefit(testData,$(btn).closest('tr'));
            }else if(btn.hasClass('searchCouponBtn')){
                //쿠폰검색
                //TODO 팝업호출 임시로 callback trigger
                const testData = {
                    name: '6월 할인 쿠폰',
                    code:'8888',
                    info:'50000이상 10% 할인'
                }
                EventView.setBenefit(testData,$(btn).closest('tr'));
            }
        });

        //혜택추가 버튼 클릭시
        $("#benefitAddBtn").click(function(){
            const $benefitTableBody = $("#benefitTableBody");
            const benefitCnt = $("tr:not(.no-data)",$benefitTableBody).length;
            const maxCnt = $benefitTableBody.data('max');
            const eventType = $('select[name="vEventType"]').val();

            if(maxCnt && maxCnt > 0 ){
                if(benefitCnt >= maxCnt){
                    alert(maxCnt+'개 이상 추가할수 없습니다.');
                    return false;
                }
            }

            const noData = $("tr.no-data",$benefitTableBody);
            const addBenefitIdx = benefitCnt > 0 ? benefitCnt : 0;
            const rowId = EventView.benefitKey++;
            let rowStr = '<tr>';
            rowStr += '<td class="list-check">';
            rowStr += '<div class="custom-checkbox single">';
            rowStr += '<input type="checkbox" id="benefit'+rowId+'" class="checkbox" name="arrBenefitId"><label for="benefit'+rowId+'"><span class="blind">선택</span></label>';
            rowStr += '</div>';
            rowStr += '</td>';
            rowStr += '<td class="list-num"><div class="in-tb rowCount" >'+(addBenefitIdx+1)+'</div></td>';
            rowStr += '<td class="text-center">';
            rowStr += '<select class="select w-full changeEventForm" data-name="vBenefitType">';
            rowStr += EventView.formValue.benefit_type.reduce(function (result, benefit) {
                result += '<option value="'+benefit.VSubCode1+'">'+benefit.VSub1Codenm+'</option>';
                return result;
            }, '');
            rowStr += '</select>';
            rowStr += '</td>';
            rowStr += '<td>';
            rowStr += '<div id="benefitImage'+rowId+'"></div>';
            rowStr += '<input type="hidden" data-name="vBenefitid" value="benefitImage'+rowId+'"/>';
            rowStr += '</td>';
            rowStr += '<td class="text-center benefitWrapper">';
            rowStr += '<div class="input-group w-full">';
            rowStr += '<input type="text" class="input-text" data-name="vBenefitName" disabled>';
            rowStr += '<span class="input-group-btn">';
            rowStr += '<button type="button" class="btn-form btn-default searchCouponBtn dynamicBtn"><span>쿠폰 조회</span></button>';
            rowStr += '</span>';
            rowStr += '</div>';
            rowStr += '</td>';
            rowStr += '<td class="text-center">';
            rowStr += '<input type="text" class="input-text w-full" data-name="vBenefitInfo" value="" disabled>';
            rowStr += '<input type="hidden" data-name="vBenefitCd" value="">';
            rowStr += '</td>';

            if(eventType === 'E02'){
                //출석체크
                rowStr += '<td class="text-center">';
                rowStr += '<input type="text" data-name="nWinDay" class="input-text w-full text-center numberOnly" value="">';
                rowStr += '</td>';
                rowStr += '<td class="text-center">';
                rowStr += '<input type="text" data-name="nPlayDayCnt" class="input-text w-full text-center numberOnly" value="">';
                rowStr += '</td>';
            }

            if(eventType === 'E05'){
                //룰렛
                rowStr += '<td class="text-center">';
                rowStr += '<div class="input-group">';
                rowStr += '<input type="text" class="input-text w-full text-center" data-name="nBenefitRate" value="" placeholder="숫자 입력">';
                rowStr += '<div class="input-group-txt">%</div>';
                rowStr += '</div>';
                rowStr += '</td>';
                rowStr += '<td class="text-center">';
                rowStr += '<select class="select w-full" data-name="vDuplicatePlayYn">';
                rowStr += '<option value="Y">허용</option>';
                rowStr += '<option value="N">불가</option>';
                rowStr += '</select>';
                rowStr += '</td>';
            }

            rowStr += '</tr>';
            $benefitTableBody.append(rowStr);
            noData.hide();

            createImageUploadUI('benefitImage'+rowId, {
                formName:"eventImage",
                siteCd:$('[name=vSitecd]',$('#'+EventView.formName)).val(),
                fileCd:'BANNER',
                type:"R",
                uploadCd:'benefitImage'+rowId,
                imageWidth:"100px",
                imageHeight:"100px",
                limitFileMBSize:"5",
            });

        });

        //혜택 삭제
        $("#benefitDelBtn").click(function(){
            EventView.deleteBenefit($('[name=arrBenefitId]:checked:not(#check-all)').closest('tr'));
        });

        //저장버튼 클릭
        $("#eventSaveBtn").click(function(){
            const pcHtml = CKEDITOR.instances.pcHtml.getData();
            const mobileHtml = CKEDITOR.instances.mobileHtml.getData();
            const eventType = $('select[name="vEventType"]').val();
            const startDate = $('#eventStartDate').val();
            const startHour = $('#eventStartHour').val();
            const startMinute =  $('#eventStartMinute').val();
            const endDate = $('#eventEndDate').val();
            const endHour = $('#eventEndHour').val();
            const endMinute = $('#eventEndMinute').val();
            const winDate = $('#winDate').val();

            const startDtm = startDate.split('.').join('') + startHour + startMinute;
            const endDtm = endDate.split('.').join('') + endHour + endMinute;
            const reqData = {};
            reqData.vClobPc = pcHtml;
            reqData.vClobMobile = mobileHtml;
            reqData.vEventSdtm = startDtm;
            reqData.vEventEdtm = endDtm;
            reqData.vWinDate = winDate ? winDate.split('.').join('') : '';

            $('#event').serializeArray().forEach(function(form){
                reqData[form.name] = encodeURIComponent(form.value);
            });

            function getDataNameList($target){
                const result = [];
                $target.each(function(i,row){
                    const rowData = {};
                    $('[data-name]',$(row)).each(function(j,data){
                        rowData[data.dataset.name] = encodeURIComponent(data.value);
                    });
                    result.push(rowData);
                });

                return result;
            }

            reqData.targetUserOptList = getDataNameList($('.targetUserBox input[type="checkbox"]:checked').parent());
            reqData.benefitList = getDataNameList($('#benefitTableBody>tr:not(.no-data)'));

            //퀴즈인경우
            if(eventType === 'E04'){
                reqData.answerList = getDataNameList($('#answerListBox>div'));
            }

            //숨은그림찾기인경우
            if(eventType === 'E06'){
                reqData.pageList = getDataNameList($('#pageListBox>div'));
            }

            if(!EventView.validate(reqData)){
                return false;
            }

            const param = [];
            param.push($('#'+EventView.imageFormName).serialize());
            param.push('flagAction='+reqData.flagAction);
            param.push('eventData='+JSON.stringify(reqData));

            cmAjax({
                url	: '/promotion/event/save'
                , type : 'post'
                , data : param.join('&')
                , dataType : "json"
                , success : function (data) {
                    if(data.status == "succ"){
                        alert("저장 되었습니다.");
                        $('#'+EventView.listFormName).submit();
                    }else{
                        alert("에러가 발생하였습니다.");
                    }
                }
                , error : function(e) {
                    alert("에러가 발생하였습니다.");
                }
            });
        });

        //취소버튼클릭
        $('#eventCancelBtn').click(function(){
            if(confirm('이벤트 작성을 취소하시겠습니까?')){
                $('#'+EventView.listFormName).submit();
            }
        })
    },
    fetchFormData : function(){
        cmAjax({
            url	: '/promotion/event/data'
            , type : 'post'
            , dataType : "json"
            , success : function (data) {
                if(data.status == "succ"){
                    EventView.formValue = data.object;
                }
            }
        });
    },
    loadEditor : function(){
        //에디터 생성
        createEditor('pcHtml', {
            siteCd:'COMM',
            fileCd:'EDITOR',
            uploadCd:"EVENT",
            limitFileMBSize:"5",
        });
        createEditor('mobileHtml', {
            siteCd:'COMM',
            fileCd:'EDITOR',
            uploadCd:"EVENT",
            limitFileMBSize:"5",
        });
    },
    deleteBenefit : function($benefit){
        const $BenefitTableBody = $("#benefitTableBody");
        if(!$benefit){
            $benefit = $('tr:not(.no-data,#check-all)',$BenefitTableBody);
        }

        $benefit.remove();

        const $currentBenefit = $('tr:not(.no-data,#check-all)',$BenefitTableBody);
        if($currentBenefit.length > 0){
            EventView.rearrangeRows($currentBenefit);
        }else{
            $('tr.no-data',$BenefitTableBody).show();
        }
    },
    rearrangeRows : function($targetRows){
        $targetRows.each(function(i,row){
            const valueTag = $('.rowCount',row);
            valueTag.each(function(j,tag){
                if($(tag).prop('tagName')==='INPUT'){
                    $(tag).val(i+1);
                }else{
                    $(tag).text(i+1);
                }
            });
        });
    },
    setBenefit : function(benefit, $target){
        $target.find('[data-name=vBenefitName]').val(benefit.name);
        $target.find('[data-name=vBenefitCd]').val(benefit.code);
        $target.find('[data-name=vBenefitInfo]').val(benefit.info);
    },
    refreshEventUI : function(init){
        const eventType = $('select[name="vEventType"]').val();
        const $hideTarget = $('[data-event-hide*="'+eventType+'"]');
        const $nonHideTarget = $('[data-event-hide]').not($hideTarget);
        const $showTarget = $('[data-event-show*="'+eventType+'"]');
        const $nonShowTarget = $('[data-event-show]').not($showTarget);
        const selector = 'input[type=text]:not(.radioInput)'; //radio와 연관되지않은 input form

        EventView.hide($hideTarget,$(selector,$hideTarget));
        EventView.show($nonHideTarget,$(selector,$nonHideTarget));

        EventView.show($showTarget,$(selector,$showTarget));
        EventView.hide($nonShowTarget,$(selector,$nonShowTarget));

        //선착순
        if(eventType==='E03'){
            EventView.refreshFirstComeUI();
        }

        //퀴즈
        if(eventType === 'E04'){
            EventView.refreshQuizUI();
        }

        // //댓글, 룰렛의 경우 혜택 멀티 등록 가능
        // if(eventType === 'E01' || eventType === 'E05'){
        //     $("#benefitTableBody").removeData('max');
        // }else{
        //     $("#benefitTableBody").data('max',1);
        // }

        if(!init){
            EventView.deleteBenefit();
        }
    },
    refreshSiteUI : function(siteCd){
        $('#'+EventView.imageFormName).find('[name="siteCd"]').val(siteCd);

        const userGradeWrapper = $('#userGrade');
        const userGroupWrapper = $('#userGroup');

        userGradeWrapper.html('');
        userGroupWrapper.html('');

        const siteData = EventView.formValue[siteCd];
        if(siteData.user_grade){
            const gradeTag = siteData.user_grade.reduce(function (result, grade) {
                result += ' <div class="custom-checkbox">';
                result += '<input type="checkbox" id="grade'+grade.VSubCode1+'" class="checkbox" data-name="vTargetCode" value="'+grade.VSubCode1+'">';
                result += '<label for="grade'+grade.VSubCode1+'">'+grade.VSub1Codenm+'</label>';
                result += '<input type="hidden" data-name="vTargetType" value="GRADE">';
                result += '</div>';
                return result;
            }, '');

            userGradeWrapper.html(gradeTag);
        }

        if(siteData.user_group){
            const groupTag = siteData.user_group.reduce(function (result, group) {
                result += ' <div class="custom-checkbox">';
                result += '<input type="checkbox" id="group'+group.VSubCode1+'" class="checkbox" data-name="vTargetCode" value="'+group.VSubCode1+'">';
                result += '<label for="group'+group.VSubCode1+'">'+group.VSub1Codenm+'</label>';
                result += '<input type="hidden" data-name="vTargetType" value="GROUP">';
                result += '</div>';
                return result;
            }, '');

            userGroupWrapper.html(groupTag);
        }

        EventView.refreshEventUI();

    },
    refreshQuizUI : function(){
        const quizType = $('input[name="vQuizType"]:checked').val();
        const $target = $('[data-quiz-type="'+quizType+'"]');
        const $nonTarget = $('[data-quiz-type]').not($target);
        EventView.hide($nonTarget,$nonTarget.find('input'));
        EventView.show($target,$target.find('input'));
    },
    refreshFirstComeUI : function(){
        const firstType = $('input[name="vFirstComeType"]:checked').val();
        const $target = $('[data-first-type="'+firstType+'"]');
        const $nonTarget = $('[data-first-type]').not($target);
        EventView.enableInp($target);
        EventView.disableInp($nonTarget,true);
    },
    refreshBenefitUI : function($benefit){
        const benefitType = $benefit.val();
        const $benefitRow = $benefit.closest('tr');
        const $benefitWrapper = $benefitRow.find('.benefitWrapper');
        let tagStr = '';

        $benefitRow.find('[data-name=vBenefitInfo],[data-name=vBenefitCd]').val('');
        switch (benefitType) {
            case "B01" : //쿠폰
                tagStr += '<div class="input-group w-full">';
                tagStr += '<input type="text" class="input-text" data-name="vBenefitName" disabled>';
                tagStr += '<span class="input-group-btn">';
                tagStr += '<button type="button" class="btn-form btn-default searchCouponBtn dynamicBtn"><span>쿠폰 조회</span></button>';
                tagStr += '</span>';
                tagStr += '</div>';
                break;
            case "B02" : //적립금
                tagStr += '<div class="input-group w-full">';
                tagStr += '<input type="text" class="input-text" data-name="vBenefitName" disabled>';
                tagStr += '<span class="input-group-btn">';
                tagStr += '<button type="button" class="btn-form btn-default searchPointBtn dynamicBtn"><span>적립금 조회</span></button>';
                tagStr += '</span>';
                tagStr += '</div>';
                break;
            case "B03" : //직접입력
                tagStr = '<input type="text" data-name="vBenefitName" class="input-text w-full" value="">';
                break;
        }

        $benefitWrapper.html(tagStr);
    },
    disableInp : function($target,clear){
        $target.attr("disabled", true);
        if(clear){
            $target.val('');
        }
    },
    enableInp : function($selector,clear){
        $selector.attr("disabled", false);
        if(clear){
            $selector.val('');
        }
    },
    show : function($target,$enableTarget){
        $target.show();
        EventView.enableInp($enableTarget);
    },
    hide : function($target,$disableTarget){
        $target.hide();
        EventView.disableInp($disableTarget);
    },
    defaultRequireForm : {
        vEventNm : '[이벤트명]',
        vChannelType : '[채널구분]',
        vEventSdtm : '[시작일시]',
        vEventEdtm : '[종료일시]',
        vEventType : '[이벤트유형]',
        vWinType : '[당첨구분]'
    },
    eventRequireForm : {
        vPlayType : '[참여횟수]',
        nPlayCnt : '[참여횟수]',
        nTotAttendCnt : '[출석체크 전체 일수]',
        vAttendMtd : '[출석 체크 방법]',
        nPlayLimitCnt : '[참여제한수]',
        nDayLimitCnt : '[일일제한수]',
        vFirstComeType : '[선착순 유형]',
        vQuizType : '[퀴즈유형]',
        vQuizQuestion : '[퀴즈문제]',
        vQuizAnswer : '[퀴즈정답]',
        nTotWinCnt : '[전체당첨자수]',
        vImgSelType : '[찾기 참여 횟수]',
        nImgSelCnt : '[찾기 참여 횟수]',
        findPicture : '[숨은그림이미지]',
        thumbnail : '[썸네일]',
        pageList : '[페이지 URL]',
        answerList : '[퀴즈 보기]',
    },
    validate : function(reqData){
        const alertText = ' 값은 필수입니다.';
        //기본 필수값 체크
        const isCorrect = Object.keys(EventView.defaultRequireForm).every(function(form,i){
            if(!reqData[form]){
                alert(EventView.defaultRequireForm[form] + alertText);
                return false;
            }

            if(form.indexOf('dtm')>0 && reqData[form].length < 12){
                alert(EventView.defaultRequireForm[form] + alertText);
                return false;
            }
            return true;
        });

        if(!isCorrect){
            return false;
        }

        //진행기간 체크
        if(reqData.vEventSdtm > reqData.vEventEdtm){
            alert('시작일이 종료일보다 클 수 없습니다.');
            return false;
        }

        //선착순이 아닌 경우 참여횟수 체크
        if(reqData.vEventType !== 'E03'){
            if(!reqData.vPlayType){
                alert(EventView.eventRequireForm.vPlayType + alertText);
                return false;
            }else if(reqData.vPlayType > 30 && !reqData.nPlayCnt){
                alert(EventView.eventRequireForm.nPlayCnt + alertText);
                return false;
            }
        }

        //이벤트 별 필수값 체크
        const eventValidate = EventView.validateByEvent[reqData.vEventType];

        if(eventValidate){
            const result = {
                target : '',
                value : true
            }

            function setError(target){
                result.target = target;
                result.value = false;
            }

            eventValidate(reqData,setError);
            if(!result.value){
                alert(EventView.eventRequireForm[result.target] + alertText);
                return false;
            }
        }

        //썸네일 체크
        if($('#EVENT_preview>img').length < 1 &&  $('input[name="EVENT_image_id"]').length < 1){
            alert(EventView.eventRequireForm.thumbnail+ alertText);
            return false;
        }

        return true;
    },

    validateByEvent : {
        //출석체크
        'E02': function(reqData,setError){
            //출석체크 전체 일수
            if(!reqData.nTotAttendCnt){
                setError('nTotAttendCnt');
                return;
            }

            //출석체크 방법
            if(!reqData.vAttendMtd){
                setError('vAttendMtd');
                return;
            }
        },
        //선착순
        'E03': function(reqData,setError){
            //선착순유형
            if(!reqData.vFirstComeType){
                setError('vFirstComeType');
                return;
            }

            if(reqData.vFirstComeType === '1'){
                //참여제한수
                if(!reqData.nPlayLimitCnt){
                    setError('nPlayLimitCnt');
                    return;
                }
            }else if(!reqData.nDayLimitCnt){
                //일일제한수
                setError('nDayLimitCnt');
                return;
            }

        },
        //퀴즈
        'E04': function(reqData,setError){
            //퀴즈유형 체크
            if(!reqData.vQuizType){
                setError('vQuizType');
                return;
            }

            //퀴즈 문제 체크
            if(!reqData.vQuizQuestion){
                setError('vQuizQuestion');
                return;
            }

            //퀴즈 정답 체크
            if(!reqData.vQuizAnswer){
                setError('vQuizAnswer');
                return;
            }

            //객관식 정답보기 체크
            if(reqData.vQuizType === '1'){
                const isCorrect = reqData.answerList.every(function(answer,i){
                    return answer.vAnswerNm
                });

                if(!isCorrect){
                    setError('answerList');
                    return;
                }
            }

        },
        //룰렛
        'E05': function(reqData,setError){
            //전체당첨자 수 체크
            if(!reqData.nTotWinCnt){
                setError('nTotWinCnt');
            }
        },
        //숨은그림찾기
        'E06': function(reqData,setError){
            //숨은그림이미지 체크
            if($('#FIND_PICTURES_EVENT_preview>img').length < 1 && $('input[name="FIND_PICTURES_EVENT_image_id"]').length < 1){
                setError('findPicture');
                return;
            }

            //참기참여횟수 체크
            if(!reqData.vImgSelType){
                setError('vImgSelType');
                return;
            }else if(reqData.vImgSelType === '40' && !reqData.nImgSelCnt){
                setError('nImgSelCnt');
                return;
            }
            
            //페이지 체크
            const isCorrect = reqData.pageList.every(function(page,i){
                return page.vLandingPage
            });

            if(!isCorrect){
                setError('pageList');
                return;
            }

        },
    }
};