function validateCkeditorFocus(iframeId){
	if ($("#"+iframeId).prevAll(".formError").length != 0) {
		var className = $("#"+iframeId).prevAll(".formError")[0].classList[0];
		if (!$('.formError').is('.greenPopup')) {
			$('.formError').css('opacity', '0.3');
		}
		$('.'+ className).css('opacity', '1');
	}
}

function validateCkeditorBlur(iframeId,data){
	if ($("#"+iframeId).prevAll(".formError").length != 0 && data != "") {
		var className = $("#"+iframeId).prevAll(".formError")[0].classList[0];
		$('.'+ className).remove();
	}
}

function buttonMouseenterOrFocusErrorInfo(errorName) {
	if (($('.'+ errorName + 'formError').length > 0 || $('.'+ errorName + 'CheckformError').length > 0)
			&& !$('.'+ errorName + 'formError').is('.greenPopup')){
		if (!$('.formError').is('.greenPopup')) {
			$('.formError').css('opacity', '0.3');
		}
		if ($('.'+ errorName + 'formError').length > 0) {
			$('.'+ errorName + 'formError').css('opacity', '1');
		}
		else {
			$('.'+ errorName + 'CheckformError').css('opacity', '1');
		}	
	}
}