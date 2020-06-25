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
			complete: function(response) {
				var fileName = response.responseText;
				$("#" + uploadFormId + " #fu-message").append("<a href='javascript:downloadFile(\"" + options.basePath + "\",\"" + fileName + "\")'>" + fileName + "</a><br />");
				$("#" + uploadFormId + " #uploadFiles").val($("#" + uploadFormId + " #uploadFiles").val() + fileName + "#");
				setTimeout("$('#" + uploadFormId + " #fu-progress').hide(2000)", 2000);
			},
			error: function() {
				$("#" + uploadFormId + " #fu-error").html("<font color='red'>Error: unable to upload files.</font>");
			}
		};

		this.ajaxForm(ysFileUploadOpt);
		$("#" + uploadFormId + " #fu-progress").hide();
	};
}(jQuery));

function downloadFile(basePath, fileName) {
	window.open(basePath + '/' + fileName, "_blank", "");
}