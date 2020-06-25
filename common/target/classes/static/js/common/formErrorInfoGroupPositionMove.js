var iframe = "description-iframe";  
var descriptionIframeWindow = null;
var oldDescriptionIframeHeight = $("#" + iframe).height();
var newDescriptionIframeHeight = null;
var oldFromErrorInfoOffsetTop = null;
var newFromErrorInfoOffsetTop = null;
var eventGroupDivHideHeight = $("#description-div-hide").height() + 4;

function errorInfoclassNameEach(className) {
	if (className != "membershipGroupNameformError" && className != "nameformError" && className != "eventCourseGroupNameformError" && className != "eventInstructorGroupNameformError"
			&& className != "eventPlaceGroupNameformError" && className != "productGroupNameformError" && className != "titleformError" && className != "relationGroupNameformError"
			&& className != "errorMessageformError" && className != "iconFileNameformError" && className != "icon-fileformError" && $('.' + className).length > 0 && !$('.' + className).is('.greenPopup')) {
		return true;
	}
	return false;
}

if ($('#' + iframe).length > 0){
	descriptionIframeWindow = document.querySelector('#' + iframe).contentWindow;
	descriptionIframeWindow.onresize = function () {
		newDescriptionIframeHeight = $("#" + iframe).height();
		var formErrorHeight = newDescriptionIframeHeight - oldDescriptionIframeHeight;
		$(".formError").each(function(){
			var formError = $(this).prop('class').split(" ");
			var className = $.trim(formError[0]);
	        if (errorInfoclassNameEach(className)) {
				newFromErrorInfoOffsetTop = $('.' + className).position().top + formErrorHeight;
				$('.' + className).css('top',newFromErrorInfoOffsetTop + 'px');
			}
		});
		oldDescriptionIframeHeight = newDescriptionIframeHeight;
	};
}

function fromErrorInfomoveflag(flag) {
	var formErrorOffsetTop,
	    formError,
	    className;
	if(!flag){
		$(".formError").each(function(){
			formError = $(this).prop('class').split(" ");
			className = $.trim(formError[0]);
			if (errorInfoclassNameEach(className)) {
				oldFromErrorInfoOffsetTop = $('.' + className).position().top;
				if (newFromErrorInfoOffsetTop != null) {
					$('.' + className).css('top',newFromErrorInfoOffsetTop + 'px');
				}
				else {
					formErrorOffsetTop = $('.' + className).position().top;
					if (newDescriptionIframeHeight != null) {
						formErrorOffsetTop = formErrorOffsetTop + newDescriptionIframeHeight - eventGroupDivHideHeight;
					}
					$('.' + className).css('top',formErrorOffsetTop + 'px');
				}
			}
		});
	}
	else {
		$(".formError").each(function(){
			formError = $(this).prop('class').split(" ");
			className = $.trim(formError[0]);
			if (errorInfoclassNameEach(className)) {
				if (oldFromErrorInfoOffsetTop != null) {
					$('.' + className).css('top',oldFromErrorInfoOffsetTop + 'px');
				}
				else {
					formErrorOffsetTop = $('.' + className).position().top;
					if (newDescriptionIframeHeight != null) {
						if (oldDescriptionIframeHeight != newDescriptionIframeHeight) {
							formErrorOffsetTop = formErrorOffsetTop - newDescriptionIframeHeight - eventGroupDivHideHeight;
						}
						else {
							formErrorOffsetTop = formErrorOffsetTop - newDescriptionIframeHeight + eventGroupDivHideHeight;
						}
					}
					$('.' + className).css('top',formErrorOffsetTop + 'px');
				}
			}
		});
	}
}