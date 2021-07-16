
const jfupload = {
	// 이미지 업로드 초기화
	initImageUpload : function (p_opt) {
		// 기본값 셋팅
		const _default = {
			target : undefined
			, uploadCd : undefined
			, fileCd : undefined
			, siteCd : undefined
			, recordId : undefined
			, formName : undefined
			, resizeWidth : ""
			, resizeHeight : ""
			, index : undefined	
			, url : "/img/upload"
			, dropZone : undefined
			, limitFileMBSize : undefined
			, dataType : "json"
			, isSelfMakeTag : false
			, singleFileUploads : true
			, tempYn : ""
			, ext : /(\.|\/)(gif|jpe?g|png)$/i
		};

		const options = jQuery.extend(_default, p_opt);
		
		if (options.target == undefined || options.uploadCd == undefined ) {
			return;
		}

		const target = options.target;
		
		target.fileupload({
			url: options.url
			, singleFileUploads: options.singleFileUploads
			, dataType: options.dataType
			, formData: {
				uploadCd: options.uploadCd
				, siteCd: options.siteCd
				, fileCd: options.fileCd
				, recordId: options.recordId
				, uploadType: options.uploadType
				, resizeWidth: options.resizeWidth
				, resizeHeight: options.resizeHeight
				, tempYn: options.tempYn
				, resultType: "json"
				, _csrf: $("meta[name='_csrf']").attr("content")
			}
			, dropZone: options.dropZone
			, pasteZone: null
		}).on("fileuploadadd", function (e, data) {
			
			jfupload.printLog("fileuploadadd");
			if(!data.files.every(function(file,i){
				const uploadFile = file;
				if (options.ext != undefined) {
					if (!(options.ext).test(uploadFile.name)) {
						alert("이미지 파일만 업로드 가능합니다.");
						return false;
					}
				}
				if(options.limitFileMBSize){
					if(uploadFile.size > options.limitFileMBSize * 1024 * 1024){
						alert("이미지 용량이 너무 큽니다.");
						return false;
					}
				}
				return true;
			})){
				return false;
			}
        	
        	if (typeof options.add_func == "function") {
        		options.add_func(e, data);
        	}
        	
        	data.submit()
	        	.done (function (result, textStatus, jqXHR) {
	        		if (result.status != "succ") {
	        			alert(result.message);
	        			return;
					}

					const imgList = result.object;

					if (typeof options.success == "function") {
						if(options.singleFileUploads){
							options.success(imgList[0], options.uploadCd, data);
						}else{
							options.success(imgList, options.uploadCd, data);
						}
					}

	        		if (!options.isSelfMakeTag) {
	        			jfupload.makeImageUploadTag(imgList, options.uploadCd, options.formName, "R");
	        		}
	        	})
	            .fail(function (jqXHR, textStatus, errorThrown) {
	            	if (typeof options.error == "function") {
	        			options.error(jqXHR, textStatus, errorThrown);
	        		}
	            })
	            .always (function (result, textStatus, jqXHR) {
	            	if (typeof options.complete == "function") {
	        			options.complete(result, textStatus, jqXHR);
	        		}
	            });
			
		}).on('fileuploadprocessalways', function (e, data) {

			jfupload.printLog("fileuploadprocessalways");
			
			if (typeof options.always_func == "function") {
        		options.always_func(e, data);
        	}
			
		}).on('fileuploadprogress', function (e, data) {

			const progress = parseInt(data.loaded / data.total * 100, 10);
			jfupload.printLog("!!" + progress);
			
			if (typeof options.progress_func == "function") {
				options.progress_func(e, data, progress);
			}
			
		}).on('fileuploadprogressall', function (e, data) {

			const progress = parseInt(data.loaded / data.total * 100, 10);
			const el_progress = jQuery(".div_progressBar").eq(options.index);
			const cls = el_progress.parent().attr("class");
			
			if(cls != undefined && cls.indexOf("dd_jfuploadProgress") > -1) {
				el_progress.parent().css("width", "155px");
			}
			
			el_progress.show();
			
			if(progress >= 15 && progress <=90) {
				el_progress.css({
					width : progress - 10 + "%"
				});
			}
			
	    }).prop('disabled', !jQuery.support.fileInput)
	        .parent().addClass(jQuery.support.fileInput ? undefined : 'disabled');
		
		
		// drag & drop 기능 사용시
		if (options.dropZone != undefined) {
			
			jQuery(document).bind('dragover', function (e) {
				const dropZone = options.dropZone,
					timeout = window.dropZoneTimeout;
				
				if (!timeout) {
					dropZone.addClass("in");
				}
				else {
					clearTimeout(timeout);
				}

				let found = false,
					node = e.target;
				
				do {
					if (node == dropZone[0]) {
						found = true;
						break;
					}
					node = node.parentNode;
				}
				while (node != null);
				
				if (found) {
					dropZone.addClass("hover");
				}
				else {
					dropZone.removeClass("hover");
				}
				window.dropZoneTimeout = setTimeout(function () {
					window.dropZoneTimeout = null;
					 dropZone.removeClass('in hover');
				}, 100);
			});
		}
		
	},	
	// HTML tag 생성해서  form 에 삽입
	makeImageUploadTag : function (imgList, uploadCd, formName, flagAction) {
		const form = jQuery("form[name='"+formName+"']");
		imgList.forEach(function(img,i){
			const div 	= jQuery("<div/>").prop("id", "div_" + uploadCd + "_" + img.image_id);
			const actionType 	= jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_image_action_type"}).val(flagAction);
			const imageId 	= jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_image_id"}).val(img.image_id);
			const imagePath 	= jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_image_path"}).val(img.image_path);
			const imageExt 	= jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_image_ext"}).val(img.image_ext);
			const imageNm 	= jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_image_nm"}).val(img.image_nm);
			const imageWidth 	= jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_image_width"}).val(img.image_width);
			const imageHeight 	= jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_image_height"}).val(img.image_height);

			div.appendTo(form);
			actionType.appendTo(div);
			imageId.appendTo(div);
			imagePath.appendTo(div);
			imageExt.appendTo(div);
			imageNm.appendTo(div);
			imageWidth.appendTo(div);
			imageHeight.appendTo(div);
		});

	},
	deleteImage : function (uploadCd, formName , imgId) {
		if(imgId){
			const div = jQuery("#div_"+uploadCd+"_"+imgId);
			const flagAction = div.find("input[name*='image_action_type']").val();
			if (flagAction==="M") {
				const inp = jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_del_image_id"}).val( div.find("input[name*='image_id']").val());
				inp.appendTo(jQuery("form[name='"+formName+"']"));
			}
			jQuery("#"+uploadCd+"_preview_"+imgId).remove();
			jQuery("#"+uploadCd+"_upload_name_"+imgId).remove();
			div.remove();
		}else{
			const divList = jQuery("[id^='div_"+uploadCd+"']");
			divList.each(function(i,$div){
				const flagAction = jQuery($div).find("input[name*='image_action_type']").val();
				if (flagAction==="M") {
					const inp = jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_del_image_id"}).val( jQuery($div).find("input[name*='image_id']").val());
					const inpPath = jQuery("<input/>").prop({"type" : "hidden", "name" : uploadCd + "_del_image_path"}).val( jQuery($div).find("input[name*='image_path']").val());
					inp.appendTo(jQuery("form[name='"+formName+"']"));
					inpPath.appendTo(jQuery("form[name='"+formName+"']"));

				}

			});
			jQuery("#"+uploadCd+"_preview").empty();
			jQuery("#"+uploadCd+"_upload_name").empty();
			divList.remove();
		}


	},
	printLog : function (str) {
		console.log(str);
	},
};


