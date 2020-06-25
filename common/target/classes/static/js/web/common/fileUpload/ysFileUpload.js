(function ($) {
	$.fn.ysFileUpload = function(options) {
		var uploadFormId = $(this).attr('id'), ysFileUploadOpt = {
			/*
			beforeSend: function() {
			    $("#" + uploadFormId + " #fu-progress").show();
			    $("#" + uploadFormId + " #fu-error").html("");
				$("#" + uploadFormId + " #fu-bar").width('0%');
				$("#" + uploadFormId + " #fu-percent").html("0%");
			},
			uploadProgress: function(event, position, total, percentComplete) {
				$("#" + uploadFormId + " #fu-bar").width(percentComplete+'%');
				$("#" + uploadFormId + " #fu-percent").html(percentComplete+'%');
			},
			success: function() {
			    $("#" + uploadFormId + " #fu-bar").width('100%');
				$("#" + uploadFormId + " #fu-percent").html('100%');
			},
			*/
			beforeSubmit: function(arr, $form, op) {
				// Return if there is no files selected
				if (arr[0].value == "") {
					return false;
				}
				else if (options.checks && options.checks.image) {
					if (!arr[0].value.name.toUpperCase().match(/\.(JPG|JPEG|PNG|GIF)$/)) {
						jzMsgBox(options.checks.image, 'alert');
						return false;
					}
				}
			},
			complete: function(response) {
				var resText = response.responseText, 
					spliterPos = resText.indexOf('_'), 
					filename="", 
					fileId="",
					fileDesc="",
					uploadFormViewId = uploadFormId;
				
				if (options.uploadFormViewId) {
					uploadFormViewId = options.uploadFormViewId;
				}
				
				if (spliterPos > 0) {
					fileId = resText.substring(0, spliterPos);
					filename = resText.substring(spliterPos + 1);
					if($("#uploadType").val() == "signupform"){
						showImageFile(fileId,filename);
					}
					else {
						fileDesc = "<div id='attach-"+fileId+"'><a href='javascript:'; onclick='downloadFile(\""+options.basePath+"\",\""+$('#'+uploadFormId+'>#uploadType').val()+"\",\""+fileId+"\");'>" + filename + "</a>";
						if (!options.noDelete) {
							fileDesc += "&nbsp;&nbsp;<a href='javascript:' onclick='deleteFile(this, \""+options.basePath+"\",\""+$('#'+uploadFormId+'>#uploadType').val()+"\",\""+fileId+"\",\""+uploadFormId+"\");'><i class='fa fa-times'></i></a>";
						}
						fileDesc += "</div>";
						$("#" + uploadFormViewId + " #fu-message").append(fileDesc);
					}
					$("#" + uploadFormId + " #uploadFiles").val($("#" + uploadFormId + " #uploadFiles").val() + resText + '*');
					
//					setTimeout("$('#" + uploadFormId + " #fu-progress').hide(2000)", 2000);
				}
				else {
					jzMsgBox("Sorry, file upload failed.", "alert");
				}
			},
			error: function() {
				$("#" + uploadFormId + " #fu-error").html("<font color='red'>Error: unable to upload files.</font>");
			},
			clearForm: function() {
				 return true;
			}
		};

		this.ajaxForm(ysFileUploadOpt);
		$("#" + uploadFormId + " #fu-progress").hide();
	};
	
	$.fn.ysFileUploadNew = function(options) {
		var uploadFormId = $(this).attr('id'), 
			ysFileUploadOptNew = {
			clearForm: true,
			forceSync: true,
			beforeSubmit: function(arr, $form, op) {
				// Return if there is no files selected
				if (arr[0].value == "") {
					return false;
				}
				else if (options.checks && options.checks.image) {
					if (!arr[0].value.name.toUpperCase().match(/\.(JPG|JPEG|PNG|GIF)$/)) {
						jzMsgBox(options.checks.image, 'alert');
						return false;
					}
				}
			},
			complete: function(response) {
				var resText = response.responseText,
				    spliterPos = resText.lastIndexOf('/'),
					filename="", 
					fileId="",
					fileDesc="",
					uploadFormCounter = options.uploadFormCounter,
					uploadFileFormParentIdStr = "",
					uploadFormIndex = options.uploadFormCounter;
				
				if (resText == "ExceedTheAmountOfData") {
					$(uploadFileFormParentIdStr + "#new-upload-file" + uploadFormCounter).remove();
					$("#" + uploadFormId).remove();
					window["changePlan"]();
					return;
				}
				if (options.uploadType == "csv") {
					window[options.callBackFuncName](resText);
					return;
				}
				else if (options.uploadType == "report") {
					window[options.callBackFuncName](resText);
					return;
				}
				
				if (options.uploadFileFormParentId && options.uploadFileFormParentId.trim() != "") {
					uploadFileFormParentIdStr = '#' + options.uploadFileFormParentId + " ";
				}
				if (spliterPos > 0) {
			//		$(uploadFileFormParentIdStr + "#new-upload-file" + uploadFormCounter).remove();
					fileId = resText.substring(0, spliterPos);
					filename = resText.substring(spliterPos + 1);
					
					if(options.uploadType == "signupform"){
						showImageFile(fileId, filename, options.uploadObjectId);
						$("#attachmentFiles").val($("#attachmentFiles").val() + resText + '*');
					}
					else if (options.uploadType == "originaldomain") {
						fileDesc = "<div style='max-width:490px; word-break:break-all;' id='attach-"+uploadFormCounter+"'><i class='fa fa-paperclip'></i> <a href='javascript:'; onclick='downloadFile(\""+options.basePath+"\",\"originaldomain\",\""+uploadFormCounter+"\", \""+uploadFormCounter+"\");'>" + filename + "</a>";
						if (!options.noDelete) {
							fileDesc += "&nbsp;&nbsp;<a href='javascript:' onclick='deleteFileName(this, \"oldFile\", \""+$('#'+uploadFormId+'>.uploadType').val()+"\", \""+uploadFormCounter+"\", \""+options.uploadFileFormParentId+"\");'><i class='fa fa-times'></i></a>";
						}
						fileDesc += "</div>";
						$("#fu-message" + uploadFormCounter).html(fileDesc);
						uploadFormCounter = 1;
					}
					else {
						fileDesc = "<div style='max-width:490px; word-break:break-all;' id='attach-"+fileId+"'><i class='fa fa-paperclip'></i> <a href='javascript:'; onclick='downloadFile(\""+options.basePath+"\",\""+$('#'+uploadFormId+'>.uploadType').val()+"\",\""+fileId+"\", \""+options.uploadObjectId+"\");'>" + filename + "</a>";
						if (!options.noDelete) {
							fileDesc += "&nbsp;&nbsp;<a href='javascript:' onclick='deleteFileName(this, \"oldFile\", \""+$('#'+uploadFormId+'>.uploadType').val()+"\", \""+fileId+"\", \""+options.uploadFileFormParentId+"\");'><i class='fa fa-times'></i></a>";
						}
						fileDesc += "</div>";
						
						$(uploadFileFormParentIdStr + "#fu-message #new-file-flag").first().after(fileDesc);
						$("#attachmentFiles").val($("#attachmentFiles").val() + resText + '*');
					}
					$("#" + uploadFormId).remove();
					
					uploadFormCounter -- ;
					
					if(uploadFormCounter != 0){
						while($("#new-upload-file"+uploadFormCounter).length==0){
							uploadFormCounter -- ;
							if(uploadFormCounter == 0){
								break;
							}
						}
					}
					
					if(uploadFormCounter > 0) {
						uploadFile(options.basePath, options.uploadType, options.uploadObjectId, options.callBackFuncName, options.thisObjId, options.thisObjClkFun, options.thisObjText, uploadFormCounter, options.uploadFileFormParentId);
					} 
					else {
					    $(uploadFileFormParentIdStr + "#fu-message #new-file-flag").remove();
						if($("#deleteAttachmentIds").val()) {
							deleteFiles(options.basePath, options.uploadType, options.uploadObjectId, options.callBackFuncName);
						}
						else {
							window[options.callBackFuncName]();
						}
					}
				}
				else {
				    if(options.thisObjId && options.thisObjId.trim() != "") {
				        $("#"+options.thisObjId).attr("onclick", options.thisObjClkFun).css("cursor","pointer").html(options.thisObjText);
				    }
				    if (options.uploadType == "originaldomain") {
						afterUploadFileFailed(uploadFormIndex);
					}
				    else {
				    	jzMsgBox("<m>添付ファイルのアップロードに失敗しました</m>", "alert");
				    }
				}
			},
			error: function() {
				if (options.uploadType == "csv") {
					window[options.callBackFuncName]();
					return true;
				}
				else if (options.uploadType == "report") {
					window[options.callBackFuncName]();
					return true;
				}
				$("#" + uploadFormId + " #fu-error").html("<font color='red'>Error: unable to upload files.</font>");
			}
		};
		this.ajaxForm(ysFileUploadOptNew);
	};
}(jQuery));

function downloadFile(basePath, uploadType, attachmentId, uploadObjectId) {
	window.location.href = basePath+"/fs/download?ut="+uploadType+"&attachmentId="+attachmentId+"&uploadObjectId="+uploadObjectId;
}

function deleteFile(thisObj, basePath, uploadType, fileId, uploadFormId, uploadObjectId) {
	var url = basePath+"/fs/delete?ut="+uploadType+"&fileId="+fileId+"&uploadObjectId="+uploadObjectId;
	if (uploadType == "product") {
		url += "&productId=" + $("#productId").val() + "&variationInfoId=" + $("#variationInfoId").val() + "&mainVariationFlag=" + globalVar.mainVariationFlag;
	}
	$.get(url, function(data) {
		if (data == "SUCCESS") {
			$(thisObj).parent().remove();
		}
		
		if (uploadFormId) {
			var uploadFormVal = $("#" + uploadFormId + " #uploadFiles").val(), startPos, endPos, fileRemoved;
			if (uploadFormVal) {
				startPos = uploadFormVal.indexOf(fileId);
				endPos = uploadFormVal.indexOf("*", startPos);
				if (startPos >= 0 && endPos > 0) {
					fileRemoved = uploadFormVal.substring(startPos, endPos+1);
				}
				$("#" + uploadFormId + " #uploadFiles").val(uploadFormVal.replace(fileRemoved, ''));
			}
		}
	});
}

function addFile(uploadUrl, uploadType, uploadObjectId, maxUploadFileSize, uploadFileFormParentId) {
	var fileNum = $("div[id^=new-upload-file]").length;
	if ((uploadType == "event" || uploadType == "contact" || uploadType == "eventplace" || uploadType == "eventinstructor" || uploadType == "eventcourse" || uploadType == "product" || uploadType == "membership") && fileNum >= 64) {
		jzMsgBox('<m>追加できません。登録可能なファイルは64個までです</m>', 'alert');  
		return;
	}
	var uploadCounter = 0,
	    uploadFileFormParentIdStr = "",
	    formParenIdFlag = typeof uploadFileFormParentId != "undefined";
	
	if (formParenIdFlag){
		uploadFileFormParentIdStr = '#' + uploadFileFormParentId + " ";
	}
	uploadCounter = $(uploadFileFormParentIdStr + 'form[id^="file-upload-comment-form"]').length + 1;
	
	if (uploadType == 'originaldomain') {
		uploadCounter = uploadObjectId;
	}
	
	var str = "<form id='file-upload-comment-form" + uploadCounter + "' action=\"" + uploadUrl + "\" method='post' enctype='multipart/form-data'>"
    + "<input type='file' class='uploadFile' name='uploadFile' style='display: none;' onchange='showUploadFileName(this, " + maxUploadFileSize + ", " + uploadCounter + ", \"" + uploadType + "\", \"" + uploadFileFormParentId + "\")'/>"
	+ "<input type='hidden' class='uploadType' name='uploadType' value='" + uploadType + "' />"
	+ "<input type='hidden' class='uploadObjectId' name='uploadObjectId' value='" + uploadObjectId + "' />"
	+ "</form>";
	
	if(formParenIdFlag) {
		$(uploadFileFormParentIdStr).append(str);
	}
	else {
		if (uploadType == 'originaldomain') {
			uploadCounter = uploadObjectId;
			if ($("#file-upload-comment-form" + uploadCounter).length == 0) {
				$("#panel").after(str);
			}
		}
		else {
			$("#yscontainer-wrap").after(str);
		}
	}
	
    $(uploadFileFormParentIdStr + "#file-upload-comment-form" + uploadCounter + " .uploadFile").click();
}

function showUploadFileName(file, maxUploadFileSize, uploadCounter, uploadType, uploadFileFormParentId) {
	
	var uploadFileFormParentIdStr = "";
	if(uploadFileFormParentId !== "undefined" && uploadFileFormParentId != null && uploadFileFormParentId.trim() != "") {
		uploadFileFormParentIdStr = "#" + uploadFileFormParentId + " ";
	}
	var $uploadFileCommentFormId = $(uploadFileFormParentIdStr + "#file-upload-comment-form" + uploadCounter + " .uploadFile");
	if(file.files[0].size > maxUploadFileSize){
		 var maxSize = maxUploadFileSize / 1024 / 1024;
		 jzMsgBox(removeMtag('<m>ファイルサイズは</m>' + maxSize + '<m>MB以下にしてください</m>'), 'alert');
		 $uploadFileCommentFormId.after($uploadFileCommentFormId.clone().val(""));
		 $uploadFileCommentFormId.remove();
	}
	else if(uploadType == "signupform" && !/\.(gif|jpg|jpeg|png|bmp|tiff)$/i.test($(file).val())) {
		jzMsgBox(removeMtag('<m>写真形式を添付してください</m>'), 'alert');
		$uploadFileCommentFormId.after($uploadFileCommentFormId.clone().val(""));
		$uploadFileCommentFormId.remove();
	}
	else {
		if(uploadType == "signupform") {
			$("#add_file_div").hide();
		}
		else if((uploadType == "product" || uploadType == "membership" || uploadType == "eventplace" || uploadType == "eventinstructor" || uploadType == "event" || uploadType == "eventcourse") && attachmentNum >= 64) {
		    jzMsgBox('<m>追加できません。登録可能なファイルは64個までです</m>', 'alert');  
			return;
		}
		var filename = $(file).val().replace(/.*(\/|\\)/, "");
		
		var fileDesc = "<div class='jzc-upload-list__item' id='new-upload-file" + uploadCounter + "'><span>·</span>  " + "<a class='jzc-upload-list__item-file-name' href='javascript:' >"+ filename + "</a>"+ "&nbsp;&nbsp;<a class='jzc-upload-list__item-icon' href='javascript:' onclick='deleteFileName(this, \"newFile\", \"" + uploadType + "\", \"" + uploadCounter + "\", \"" + uploadFileFormParentId + "\")'><i class='fa fa-trash-o'></i></a></div>";
		
		if (uploadType == 'originaldomain') {
			$("#attachmentPlaceholder" + uploadCounter).hide();
			$("#attachment-add-" + uploadCounter).html("<m>変更</m>");
			$("#fu-message" + uploadCounter).html(fileDesc);
		}
		else {
			$(uploadFileFormParentIdStr + "#fu-message").append(fileDesc);
		}
		if(uploadType == "mailmaga" || uploadType == "product" || uploadType == "membership" || uploadType == "eventplace" || uploadType == "eventinstructor" || uploadType == "event" || uploadType == "eventcourse" || uploadType == "fax") {
			attachmentNum ++;
		}
	}
	if (uploadType == "mailmaga" || uploadType == "event" || uploadType == "eventplace" || uploadType == "eventinstructor" || uploadType == "product" || uploadType == "eventcourse" || uploadType == "membership" || uploadType == "fax") {
		attachmentIconShow();
	}
}

function deleteFileName(file, type, uploadType, fileId, uploadFileFormParentId) {
	deleteAttachmentFile = file;
	deleteAttachmentFileType = type;
	deleteAttachmentUploadType = uploadType;
	deleteAttachmentFileId = fileId;
	deleteAttachmentFormParentId = uploadFileFormParentId;
	var attachmentFileName = $.trim($(deleteAttachmentFile).parent().text());
	if ($('#delete-the-attachment-link').length == 0) {
		if (uploadType != "contact") {
			$(file).parents('form:first').after('<a id="delete-the-attachment-link" href="#delete-the-attachment-div-link" style="display: none;"></a>' +
					'<div id="delete-the-attachment-div-link" class="ysdialog">' +
					'<div class="ysdialog-confirm">' + 
						'<div>「<span id="delete-attachment-file-name">' + attachmentFileName + '</span>」<m>を削除します</m></div>' +
						'<div class="ysdialog-confirm__buttons-wrapper">' + 
							'<a class="button ysdialog-close" href="javascript:;"><m>キャンセル</m></a>' + 
							'<a class="button ysdialog-close" id="delete-attachment-btn" href="javascript:;" onclick="deleteAttachmentfile();"><m>削除する</m></a>' + 
						'</div>' +
					 '</div>' + 
				'</div>');
		} else {
			$(file).parent().after('<a id="delete-the-attachment-link" href="#delete-the-attachment-div-link" style="display: none;"></a>' +
					'<div id="delete-the-attachment-div-link" class="ysdialog">' +
					'<div class="ysdialog-confirm">' + 
						'<div>「<span id="delete-attachment-file-name">' + attachmentFileName + '</span>」<m>を削除します</m></div>' +
						'<div class="ysdialog-confirm__buttons-wrapper">' + 
							'<a class="button ysdialog-close" href="javascript:;"><m>キャンセル</m></a>' + 
							'<a class="button ysdialog-close" id="delete-attachment-btn" href="javascript:;" onclick="deleteAttachmentfile();"><m>削除する</m></a>' + 
						'</div>' +
					 '</div>' + 
				'</div>');
		}
	} else {
		$('#delete-attachment-file-name').text($.trim($(deleteAttachmentFile).parent().text()));
	}
	
	//$('#delete-the-attachment-link').YSDialog({dialogTitle: "<m>添付ファイルの削除</m>", dialogId: "deleteAttachmentFile", afterOpen: "afterOpenDeleteAttachmentFile"});
	//$('#delete-the-attachment-link').YSDialog({dialogTitle: "<m>添付ファイルの削除</m>", dialogId: "deleteAttachmentFile"});
	$('#delete-the-attachment-link').YSDialog({width: '380px', commonSize: true});
	$("#delete-the-attachment-link").click();
}

function deleteNewFileName(file, basePath, type, uploadType, fileId, uploadFileFormParentId) {
	deleteAttachmentFile = file;
	deleteAttachmentFileType = type;
	deleteAttachmentUploadType = uploadType;
	deleteAttachmentFileId = fileId;
	deleteAttachmentFormParentId = uploadFileFormParentId;
	var attachmentFileName = $.trim($(deleteAttachmentFile).parent().find('a:first').text());
	if ($('#delete-the-attachment-link').length == 0) {
		if (uploadType != "contact") {
			$(file).parents('form:first').after('<a id="delete-the-attachment-link" href="#delete-the-attachment-div-link" style="display: none;"></a>' +
					'<div id="delete-the-attachment-div-link" class="ysdialog">' +
					'<div class="ysdialog-confirm">' + 
						'<div>「<span id="delete-attachment-file-name">' + attachmentFileName + '</span>」<m>を削除します</m></div>' +
						'<div class="ysdialog-confirm__buttons-wrapper">' + 
							'<a class="button ysdialog-close" href="javascript:;"><m>キャンセル</m></a>' + 
							'<a id="delete-attachment-btn" onclick="deleteWebAttachmentFile(\'' + basePath + '\');" href="javascript:;" class="button ysdialog-close"><m>削除する</m></a>' +
						'</div>' +
					 '</div>' + 
				'</div>');
		} else {
			$(file).parent().after('<a id="delete-the-attachment-link" href="#delete-the-attachment-div-link" style="display: none;"></a>' +
					'<div id="delete-the-attachment-div-link" class="ysdialog">' +
					'<div class="ysdialog-confirm">' + 
						'<div>「<span id="delete-attachment-file-name">' + attachmentFileName + '</span>」<m>を削除します</m></div>' +
						'<div class="ysdialog-confirm__buttons-wrapper">' + 
							'<a class="button ysdialog-close" href="javascript:;"><m>キャンセル</m></a>' + 
							'<a id="delete-attachment-btn" onclick="deleteWebAttachmentFile(\'' + basePath + '\');" href="javascript:;" class="button ysdialog-close"><m>削除する</m></a>' +
						'</div>' +
					 '</div>' + 
				'</div>');
		}
	} else {
		$('#delete-attachment-file-name').text($.trim($(deleteAttachmentFile).parent().find('a:first').text()));
	}
	
	//$('#delete-the-attachment-link').YSDialog({dialogTitle: "<m>添付ファイルの削除</m>", dialogId: "deleteAttachmentFile"});
	$('#delete-the-attachment-link').YSDialog({width: '380px', commonSize: true});
	$("#delete-the-attachment-link").click();
}

function afterOpenDeleteAttachmentFile() {
	$('#delete-attachment-file-name').text($.trim($(deleteAttachmentFile).parent().text()));
}

function deleteAttachmentfile() {
	deleteFileNameConfirm(deleteAttachmentFile, deleteAttachmentFileType, deleteAttachmentUploadType, deleteAttachmentFileId, deleteAttachmentFormParentId);
}

function deleteFileNameConfirm(file, type, uploadType, fileId, uploadFileFormParentId) {
	var uploadFileFormParentIdStr = "";
	if(uploadFileFormParentId !== "undefined" && uploadFileFormParentId != null && uploadFileFormParentId.trim() != "") {
		uploadFileFormParentIdStr = "#" + uploadFileFormParentId + " ";
	}
	if(type == 'oldFile') {
		
		if (uploadType == 'originaldomain') {
			
		}
		else {
			var uploadFormVal = $("#attachmentFiles").val(), startPos, endPos, fileRemoved;
			startPos = uploadFormVal.indexOf(fileId);
			endPos = uploadFormVal.indexOf("*", startPos);
			
			if (startPos >= 0 && endPos > 0) {
				fileRemoved = uploadFormVal.substring(startPos, endPos+1);
				var deleteFilesIds = $("#deleteAttachmentIds").val();
				if(deleteFilesIds) {
					deleteFilesIds += "*";
				}
				deleteFilesIds += fileId;
				$("#deleteAttachmentIds").val(deleteFilesIds);
			}
			$("#attachmentFiles").val(uploadFormVal.replace(fileRemoved, ''));
		}
	}
	else if(type == 'newFile') {
		var $uploadFileCommentFormId = $(uploadFileFormParentIdStr + "#file-upload-comment-form" + fileId + " .uploadFile");
		$uploadFileCommentFormId.after($uploadFileCommentFormId.clone().val(""));
		$uploadFileCommentFormId.remove();
	}
	$(file).parent().remove();
	if(uploadType == "signupform") {
		$("#add_file_div").show();
	}
	else if (uploadType == "mailmaga" || uploadType == "event" || uploadType == "eventplace" || uploadType == "eventinstructor" || uploadType == "product" || uploadType == "eventcourse" || uploadType == "membership") {
		attachmentNum --;
		attachmentIconShow();
	}
	else if (uploadType == 'originaldomain') {
		$("#attachment-add-" + fileId).html("<m>選択</m>");
		$('#attachmentPlaceholder' + fileId).show();
		$("#file-upload-comment-form" + fileId).remove();
	}
	else if (uploadType == "fax") {
		attachmentNum --;
		attachmentIconShow();
	}
}

function uploadAndSave(thisObj, uploadFileFormParentId) {
	var basePath = thisObj.attr('data-upload-base-url'), 
		uploadType = thisObj.attr('data-upload-type'),
		callBackFuncName = thisObj.attr('data-upload-callback-funcname'),
		uploadObjectId = thisObj.attr('data-upload-object-id'),
		thisObjId = thisObj.attr("id"),
	    thisObjClkFun = thisObj.attr("onclick"),
	    thisObjText = thisObj.html();

	thisObj.removeAttr("onclick").css("cursor","default").html('<span><m>\u51e6\u7406\u4e2d\u2026</m></span>');
	
	var uploadFormCounter,
	    uploadFileFormParentIdStr = "";
	if(uploadFileFormParentId !== "undefined" && uploadFileFormParentId != null && uploadFileFormParentId.trim() != "") {
		uploadFileFormParentIdStr = "#" + uploadFileFormParentId + " ";
	}
	uploadFormCounter = $(uploadFileFormParentIdStr + ' form[id^="file-upload-comment-form"]').length;
	if(uploadFormCounter > 0) {
		$(uploadFileFormParentIdStr + "#fu-message").append("<span id='new-file-flag'></span>");	
		uploadFile(basePath, uploadType, uploadObjectId, callBackFuncName, thisObjId, thisObjClkFun, thisObjText, uploadFormCounter, uploadFileFormParentId);
	}
	else if($("#deleteAttachmentIds").val()) {
		deleteFiles(basePath, uploadType, uploadObjectId, callBackFuncName);
	}
 	$("#"+thisObjId).attr("onclick", thisObjClkFun).css("cursor","pointer").html(thisObjText);
}

function uploadFile(basePath, uploadType, uploadObjectId, callBackFuncName, thisObjId, thisObjClkFun, thisObjText, uploadFormCounter, uploadFileFormParentId) {
	var uploadFileFormParentIdStr = "";
	if(uploadFileFormParentId !== "undefined" && uploadFileFormParentId != null && uploadFileFormParentId.trim() != "") {
		uploadFileFormParentIdStr = "#" + uploadFileFormParentId + " ";
	}
	
	var $uploadFileCommentFormId = $(uploadFileFormParentIdStr + "#file-upload-comment-form" + uploadFormCounter);
	var isSubmitted = $uploadFileCommentFormId.attr('submitted');
	if (isSubmitted) {
		return;
	}
	else {
		$uploadFileCommentFormId.attr('submitted', 'Y');
	}
	
	var uploadFileValue = $(uploadFileFormParentIdStr + "#file-upload-comment-form" + uploadFormCounter + " .uploadFile").val();
	if (uploadFileValue) {
		$uploadFileCommentFormId.ysFileUploadNew({
			basePath: basePath,
			uploadType: uploadType,
			callBackFuncName: callBackFuncName,
			uploadObjectId: uploadObjectId,
			thisObjId: thisObjId,
			thisObjClkFun: thisObjClkFun,
			thisObjText: thisObjText,
			uploadFormCounter: uploadFormCounter,
			uploadFileFormParentId: uploadFileFormParentId
		});
		
		setTimeout(function(){
			$uploadFileCommentFormId.submit();	
		},300)

	}
	/*
	else {
		if (uploadType == "originaldomain") {
			afterUploadFileFailed(uploadFormCounter);
		}
		else {
			$uploadFileCommentFormId.remove();
			uploadFormCounter-- ;
			
			if(uploadFormCounter > 0) {
				uploadFile(basePath, uploadType, uploadObjectId, callBackFuncName, thisObjId, thisObjClkFun, thisObjText, uploadFormCounter, uploadFileFormParentId);
			} 
			else {
				$(uploadFileFormParentIdStr + "#fu-message #new-file-flag").remove();
				window[callBackFuncName]();
			}
		}
	}
	*/
}

function deleteFiles(basePath, uploadType, uploadObjectId, callBackFuncName) {
	var attachmentIds = $("#deleteAttachmentIds").val();
	var url = basePath+"/fs/delete-all?ut="+uploadType+"&attachmentIds="+attachmentIds+"&uploadObjectId="+uploadObjectId;
	$.get(url, function(data) {
		$("#deleteAttachmentIds").val("");
		window[callBackFuncName]();
	});
}

function deleteSingleFile(thisObj, basePath, uploadType, attachmentId, uploadObjectId) {
	var url = basePath+"/fs/delete?ut="+uploadType+"&attachmentId="+attachmentId+"&uploadObjectId="+uploadObjectId;
	$.get(url, function(data) {
		if (data == "SUCCESS") {
			$(thisObj).parent().remove();
		}
	});
}

function deleteWebAttachmentFile(basePath) {
	var url = basePath+"/fs/delete?ut="+deleteAttachmentUploadType+"&attachmentId="+deleteAttachmentFileId+"&uploadObjectId="+deleteAttachmentFormParentId;
	$.get(url, function(data) {
		if (data == "SUCCESS") {
			var attachmentFileNum = 0;
			$(deleteAttachmentFile).parents(".attachments").find(".fa-trash-o").each(function(){
				attachmentFileNum++;
			});
			if(attachmentFileNum == 1){
				$(deleteAttachmentFile).parents(".attachments").remove();
			}
			else{
				$(deleteAttachmentFile).parent().remove();
			}
		}
	});
}

function deleteBackGroundFile(thisObj, basePath, uploadType, attachmentId, uploadObjectId) {
	var url = basePath+"/fs/delete?ut="+uploadType+"&attachmentId="+attachmentId+"&uploadObjectId="+uploadObjectId;
	$.get(url, function(data) {
		if (data == "SUCCESS") {
			if (uploadType == "report") {
				$('#jzformarea').css('background-image', '');
				$('#file-upload-comment-form #reportEditFlag').val('N');
				$('#file-upload-comment-form #backgroundFileFlag').val('0');
				
			}else{
				$(thisObj).css('background-image', '');
			}
		}
	});
}

/**
 * ファイルサイズは5MB以下にしてください
 * 例：
 * <input type="file" name="contractFileName" style="width: 500px;" onchange="checkUploadFileSize(this);"/>
 * Return:
 * 		true < 5MB
 * 		false >= 5MB
 */
function checkUploadFileSize(input) {
    var flag;
    var filesize = 0;
    var maxSize = 5;//MB

    filesize = input.files[0].size;
 
    if (filesize < maxSize * 1024 * 1024 ) {
        flag = true;
    } else {
    	jzMsgBox(removeMtag('<m>ファイルサイズは</m>' + maxSize + '<m>MB以下にしてください</m>'), 'alert');
        flag = false;
    }

    return flag;
}
