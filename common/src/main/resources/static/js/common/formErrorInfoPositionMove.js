var iframe = "detail-iframe";  
var oldDetaiIframeHeight = $("#" + iframe).height();
var newDetaiIframeHeight = null;
var detailIframeWindow = null;;
var newFromErrorInfoOffsetTop = null;
if ($('#' + iframe).length > 0){
	detailIframeWindow = document.querySelector('#' + iframe).contentWindow;
	detailIframeWindow.onresize = function () {
		newDetaiIframeHeight = $("#" + iframe).height();
		var formErrorHeight = newDetaiIframeHeight - oldDetaiIframeHeight;
		$(".formError").each(function(){
			var formError = $(this).prop('class').split(" ");
			var className = $.trim(formError[0]);
	        if (errorInfoclassNameEach(className)) {
				newFromErrorInfoOffsetTop = $('.' + className).position().top + formErrorHeight;
				$('.' + className).css('top',newFromErrorInfoOffsetTop + 'px')
			}
		});
		oldDetaiIframeHeight = newDetaiIframeHeight;
	};
}

function errorInfoclassNameEach(className) {
	if (className != "membershipNameformError" && className != "themeNameformError" && className != "courseNameformError" && className != "nameformError"
		&& className != "productNameformError" && className != "titleformError" && className != "mailingListNameCheckformError" && className != "entryMailPlaceholderformError"
		&& className != "icon-fileformError" && $('.' + className).length > 0 && !$('.' + className).is('.greenPopup') && $('.' + className).position().top != 0) {
		return true;
	}
	return false;
}