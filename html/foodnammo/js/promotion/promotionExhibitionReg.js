const ExhibitionView = {
    formName : 'exhibition',
    imageFormName : 'exhibitionImage',
    listFormName : 'exhibitionList',
    init : function(){
        const $exhibitionForm = $('form[name="'+ExhibitionView.formName+'"]');
        ExhibitionView.loadEditor();

        //라디오 + input UI disable event
        $('input[type="radio"].radioInput').change(function(e){
            const $target = $('input[name="'+this.name+'"]:checked');
            const $nonTarget = $('input[name="'+this.name+'"]').not($target);
            const $selInput = $target.closest('.radioWrapper').find('input[type=text].radioInput');
            const $otherInput = $nonTarget.closest('.radioWrapper').find('input[type=text].radioInput');

            if($selInput){
                ExhibitionView.enableInp($selInput);
            }

            if($otherInput){
                ExhibitionView.disableInp($otherInput,true);
            }
        });

        //빈 radio 첫째 값으로 초기화
        $('input[type="radio"]').each(function(i,radio){
            if($('input[name="'+radio.name+'"]:checked').length<=0){
                $('input[name="'+radio.name+'"]:eq(0)').prop('checked',true).trigger('change');
            }
        });

        //숫자만 입력되는 input
        $exhibitionForm.on("keydown keypress keyup blur change", ".numberOnly", function(e) {
            if(!((e.keyCode > 95 && e.keyCode < 106)
                ||(e.keyCode > 47 && e.keyCode < 58)
                || e.keyCode == 8))
            {
                $(this).val($(this).val().replace(/[^0-9]/g,""));
            }
        });

        ExhibitionView.initExhibition();

        $("input:radio[name=vExhibitionType]").click(function(){
            ExhibitionView.initExhibition();
        });


        $("#regPrdGroupBtn").on("click", function(event) {
            event.preventDefault();
           // $('#contents').append($('<div id="exhibitionRegPopupWrapper"></div>'));
            $('#popupForm input[name=callbackFunction]').val("callbackProd");
            $('#popupForm input[name=flagAction]').val('R');
            $('#exhibitionRegPopupWrapper').load('/promotion/exhibition/regpopup', $('#popupForm').serialize());
        });

        $("#getPrdGroupBtn").on("click", function (event) {
            event.preventDefault();
           // $('#contents').append($('<div id="exhibitionPrdPopupWrapper"></div>'));
            $('#popupForm input[name=callbackFunction]').val("callbackGetPrdGroup");
            $('#exhibitionPrdPopupWrapper').load('/promotion/exhibition/getpopup', $('#popupForm').serialize());
        });

        $("#addProdBtn").on("click", function (event) {
            event.preventDefault();
            $('#popupForm input[name=callbackFunction]').val("callbackProd");
            $('#popupForm input[name=type]').val('multi');
            $('#commonProductSearchPop').load('/common/selectProductPop', $('#popupForm').serialize());
        });

        $("#addTyingProdBtn").on("click", function (event) {
            event.preventDefault();
            $('#popupForm input[name=callbackFunction]').val("callbackTyingProd");
            $('#popupForm input[name=type]').val('multi');
            $('#commonProductSearchPop').load('/common/selectProductPop', $('#popupForm').serialize());
        });

        $("#freeGiftBtn").on("click", function (event) {
            event.preventDefault();
            $('#popupForm input[name=callbackFunction]').val("callbackGift");
            $('#popupForm input[name=type]').val('single');
            $('#commonProductSearchPop').load('/common/selectProductPop', $('#popupForm').serialize());
        });

        $("#excludeProdBtn").on("click", function (event) {
            event.preventDefault();
        });

        $("#excludeTyingProdBtn").on("click", function (event) {
            event.preventDefault();
        });

        addChangeRowUpDownEvent({
            wrapperId: "groupPrd"
            , topBtnClass: "up"
            , bottomBtnClass: "down"
            , moveCntInputClass: "step"
        });

        addChangeRowUpDownEvent({
            wrapperId: "indPrd"
            , topBtnClass: "up"
            , bottomBtnClass: "down"
            , moveCntInputClass: "step"
        });

        addChangeRowUpDownEvent({
            wrapperId: "tyingPrd"
            , topBtnClass: "up"
            , bottomBtnClass: "down"
            , moveCntInputClass: "step"
        });
    },

    loadEditor : function(){
        //에디터 생성
        createEditor('pcHtml', {
            siteCd:'COMM',
            fileCd:'EDITOR',
            uploadCd:"EXHIBITION",
            limitFileMBSize:"5",
        });
        createEditor('mobileHtml', {
            siteCd:'COMM',
            fileCd:'EDITOR',
            uploadCd:"EXHIBITION",
            limitFileMBSize:"5",
        });
    },

    initExhibition :function(){

        $("tr[name='discount']").hide();
        $("tr[name='accumulate']").hide();
        $("tr[name='freeGift']").hide();
        $("tr[name='freeDelivery']").hide();
        $("tr[name='etc']").hide();

        const exhibitionType = $('input[name="vExhibitionType"]:checked').val();

        if(exhibitionType == "DC"){
            $("tr[name='discount']").show();
        }else if(exhibitionType == "ACC"){
            $("tr[name='accumulate']").show();
        }else if(exhibitionType == "GIFT"){
            $("tr[name='freeGift']").show();
        }else if(exhibitionType == "FREE"){
            $("tr[name='freeDelivery']").show();
        }else if(exhibitionType == "ETC"){
            $("tr[name='etc']").show();
        }else{
            $("tr[name='discount']").show();
        }
    }

};