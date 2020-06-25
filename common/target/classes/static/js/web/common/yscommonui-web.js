function showYSDialog(dialogId, iframeFlag, dialogchangeWidth, commonSize) {
	var dialog = $('#' + dialogId),
		dialogIframe,
		afterOpenFunc,
		dataAfterOpen = 'data-after-open',
		cssOption = {};
	
	dialog.data('isCommonSize', commonSize);

	// fix scrollbar
	if ($(document).height() > $(window).height()) {
		if (!dialog.closest('html').hasClass('jzc-dialog-is-open')) {
			var scrollTop = $(document).scrollTop();
			dialog.closest('html').addClass('jzc-dialog-is-open').css('top', '-'+ scrollTop +'px');
		}
	}

	var windowHeight = $(window).height(),
	    windowWidth = $(window).width(),
		topGutter = 24;
	
	if (iframeFlag && iframeFlag === 'Y') {
		dialogIframe = dialog.find('.ysdialog-iframe');
		if (dialogIframe.length == 0 || dialogIframe.attr('src') == 'about:blank') {
			return;
		}
		
		var iframeHeight,
			dialogContents = dialogIframe.contents().find('.ysdialog-contents');

		setTimeout(function() {
			initDialog();
		}, 250);

		var resizeTimer = null;
		$(window).resize(function(){
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){
				responsiveDialog();
			} , 20);
		});

		dialogIframe.contents().find('.ysdialog-close').attr('data-ysdialog-id', dialogId);

	}
	else {
		// YS div dialog
		initDialog();
		$(window).resize(function() {
			responsiveDialog();
		});
	}
	
	$('#ysdialog-loading-animation').hide();
	
	dialog
	.show()
	.css(cssOption)
	.tinyDraggable({handle: '.ysdialog-handler'});

	// loader
	// dialog
	// .css(cssOption)
	// .tinyDraggable({handle: '.ysdialog-handler'});

	dialog.find('.ysdialog-close').attr('data-ysdialog-id', dialogId);

	afterOpenFunc = dialog.attr(dataAfterOpen);
	
	if (afterOpenFunc && typeof window[afterOpenFunc] === 'function') {
		window[afterOpenFunc]();
	}
	
	// init div dialog
	if (iframeFlag && iframeFlag === 'N') {
		if (dialog.data('isCommonSize')  == 'true' || dialog.data('isCommonSize')  == true) {
			var dialogWidth = dialog.width(),
				dialogHeight = dialog.height();
			dialog.css({'margin-left': -dialogWidth/2 + 'px', 'margin-top': -dialogHeight/2 + 'px'});
		}
		if (Foundation.MediaQuery.atLeast('medium')) {
			var dialogWidth = dialog.width(),
				dialogHeight = dialog.height();
			dialog.css({'margin-left': -dialogWidth/2 + 'px', 'margin-top': -dialogHeight/2 + 'px'});
		}
	}

	// auto height
	if (iframeFlag && iframeFlag === 'Y') {
		var dialogContentsHeightPrev = dialog.find('.ysdialog-iframe').contents().find('.ysdialog-contents').outerHeight();
		var dialogContentsHeightIdx;
		if (jz.vComponent.dialog.timer) {
			clearInterval(jz.vComponent.dialog.timer);
		}
		jz.vComponent.dialog.timer = setInterval(function() {
			dialogContentsHeightIdx = dialog.find('.ysdialog-iframe').contents().find('.ysdialog-contents').outerHeight();
			if (dialogContentsHeightIdx != dialogContentsHeightPrev) {
				dialogContentsHeightPrev = dialogContentsHeightIdx;
				dialog.find('.ysdialog-body').height(dialogContentsHeightIdx);
				dialogIframe.attr({'scrolling': 'no', 'height': dialogContentsHeightIdx + 'px'});
				if (!Foundation.MediaQuery.is('small only')) {
					dialog.css({'margin-top': -(dialogContentsHeightIdx+24)/2 + 'px'});
				}
			}
		}, 100);
	}

	// perfect scrollbar
	var dialogContentsIdx,perfectScrollbar;
	if (iframeFlag && iframeFlag === 'N') {
		$('.ps__rail-x').remove();
		$('.ps__rail-y').remove();
		dialogContentsIdx = dialog.find('.ysdialog-contents');
		var dialogButtons = dialog.find('.ysdialog-buttons');
		if (dialogContentsIdx && dialogButtons.length > 0) {
			dialog.find('.ysdialog-bottom-mask').hide();
		}
		if (dialog.data('isCommonSize')  == 'true' || dialog.data('isCommonSize')  == true) {
			perfectScrollbar = new PerfectScrollbar(dialogContentsIdx[0]);
		}
	}

	function initDialog () {
		if (Foundation.MediaQuery.is('small only')) {
			if (dialog.data('isCommonSize')  == 'false' || dialog.data('isCommonSize')  == false) {
				dialog.removeClass('ysdialog--border-radius ysdialog-common-size').height(windowHeight).css({'top': 0, 'left': 0});
				if (iframeFlag && iframeFlag === 'Y') {
					dialogContents.css('max-height', windowHeight - topGutter + 'px').innerHeight(windowHeight - topGutter);
					iframeHeight = dialogContents.outerHeight();
					dialogIframe.attr({'scrolling': 'no', 'height': iframeHeight + 'px'});
				}
			}
			else {
				dialog.addClass('ysdialog--border-radius ysdialog-common-size').css({'top': '50%', 'left': '50%'});
				dialog.find('.ysdialog-title-close-btn--for-medium').css('cssText', 'display: block !important;');
				dialog.find('.ysdialog-title-close-btn--for-small').css('cssText', 'display: none !important;');
				if (iframeFlag && iframeFlag === 'Y') {
					dialogContents.css('max-height', windowHeight - topGutter - 60 + 'px');
					iframeHeight = dialogContents.outerHeight();
					if (iframeHeight < 60) {
						iframeHeight = dialogIframe.contents().height();
					}
					dialogIframe.attr({'scrolling': 'no', 'height': iframeHeight + 'px'});
					dialog.find('.ysdialog-body').height(iframeHeight);
				}
				else {
					dialog.find('.ysdialog-contents').css('max-height', windowHeight - topGutter - 60 + 'px');
				}
				var dialogWidth = dialog.width(),
					dialogHeight = dialog.height();
				dialog.css({'margin-left': -dialogWidth/2 + 'px', 'margin-top': -dialogHeight/2 + 'px'});
			}
		}
		else {
			dialog.addClass('ysdialog--border-radius');
			if (iframeFlag && iframeFlag === 'Y') {
				dialogContents.css('max-height', windowHeight - topGutter - 60 + 'px');
				iframeHeight = dialogContents.outerHeight();
				if (iframeHeight < 60) {
					iframeHeight = dialogIframe.contents().height();
				}
				dialogIframe.attr({'scrolling': 'no', 'height': iframeHeight + 'px'});
				dialog.find('.ysdialog-body').height(iframeHeight);
			}
			else {
				dialog.find('.ysdialog-contents').css('max-height', windowHeight - topGutter - 60 + 'px');
			}
			var dialogWidth = dialog.width(),
				dialogHeight = dialog.height();
			dialog.css({'margin-left': -dialogWidth/2 + 'px', 'margin-top': -dialogHeight/2 + 'px'});
		}

		if (iframeFlag && iframeFlag === 'Y') {
			$('#' + dialogId).css({'visibility': 'visible'});

			// loader
			// dialog.find('.ysdialog-loader-wrappper').hide();
			// dialogIframe.css({'visibility': 'visible'});
			// dialogIframe.show();
		}
		else {
			cssOption['visibility'] = 'visible';

			// loader
			// dialog.show();
		}

		if (dialogContents && dialog.find('.ysdialog-iframe').contents().find('.ysdialog-buttons').length > 0) {
			dialog.find('.ysdialog-bottom-mask').hide();
		}

		// perfect scrollbar
		if (iframeFlag && iframeFlag === 'Y' && dialogContents.find('.fotorama').length == 0) {
			dialogContentsIdx = dialog.find('.ysdialog-iframe').contents().find('.ysdialog-contents');
			perfectScrollbar = new PerfectScrollbar(dialogContentsIdx[0]);
		}
	}

	function responsiveDialog () {
		windowHeight = $(window).height();
		if (Foundation.MediaQuery.is('small only')) {
			if (dialog.data('isCommonSize')  == 'false' || dialog.data('isCommonSize')  == false) {
				dialog.removeClass('ysdialog--border-radius').height(windowHeight).css({'top': 0, 'left': 0, 'margin-left': 0, 'margin-top': 0});
				if (iframeFlag && iframeFlag === 'Y') {
					dialogContents.css('max-height', windowHeight - topGutter + 'px').innerHeight(windowHeight - topGutter);
					iframeHeight = dialogContents.outerHeight();
					dialogIframe.attr({'scrolling': 'no', 'height': iframeHeight + 'px'});
					dialog.find('.ysdialog-body').height(windowHeight - topGutter);
				}
			}
			else {
				dialog.addClass('ysdialog--border-radius ysdialog-common-size');
				dialog.find('.ysdialog-title-close-btn--for-medium').css('cssText', 'display: block !important;');
				dialog.find('.ysdialog-title-close-btn--for-small').css('cssText', 'display: none !important;');
				if (iframeFlag && iframeFlag === 'Y') {
					dialog.find('.ysdialog-body').css('height', 'auto');
					dialogContents.css('max-height', windowHeight - topGutter - 60 + 'px');
					iframeHeight = dialogContents.outerHeight();
					if (iframeHeight < 60) {
						iframeHeight = dialogIframe.contents().height();
					}
					dialogIframe.attr({'scrolling': 'no', 'height': iframeHeight + 'px'});
					dialog.find('.ysdialog-body').height(iframeHeight);
				}
				else {
					dialog.find('.ysdialog-contents').css('max-height', windowHeight - topGutter - 60 + 'px');
				}
				var dialogWidth = dialog.width(),
					dialogHeight = dialog.height();
				dialog.css({'margin-left': -dialogWidth/2 + 'px', 'margin-top': -dialogHeight/2 + 'px'});
			}
		}
		else {
			if (dialog.data('isCommonSize')  == 'false' || dialog.data('isCommonSize')  == false) {
				if (dialogchangeWidth) {
					dialog.addClass('ysdialog--border-radius').css({'width': dialogchangeWidth, 'top': '50%', 'left': '50%', 'height': 'auto'});
				}
				else {
					dialog.addClass('ysdialog--border-radius').css({'top': '50%', 'left': '50%', 'height': 'auto'});
				}
				
				if (iframeFlag && iframeFlag === 'Y') {
					dialogContents.css('max-height', windowHeight - topGutter - 60 + 'px').css('height', 'auto');
					iframeHeight = dialogContents.outerHeight();
					if (iframeHeight < 60) {
						iframeHeight = dialogIframe.contents().height();
					}
					dialogIframe.attr({'scrolling': 'no', 'height': iframeHeight + 'px'});
					dialog.find('.ysdialog-body').height(iframeHeight);
				}
				else {
					dialog.find('.ysdialog-contents').css('max-height', windowHeight - topGutter - 60 + 'px');
				}
			}
			else {
				dialog.removeClass('ysdialog-common-size').css({'width': dialogchangeWidth, 'top': '50%', 'left': '50%', 'height': 'auto'});
				if (iframeFlag && iframeFlag === 'Y') {
					dialogContents.css('max-height', windowHeight - topGutter - 60 + 'px');
					iframeHeight = dialogContents.outerHeight();
					if (iframeHeight < 60) {
						iframeHeight = dialogIframe.contents().height();
					}
					dialogIframe.attr({'scrolling': 'no', 'height': iframeHeight + 'px'});
					dialog.find('.ysdialog-body').height(iframeHeight);
				}
				else {
					dialog.find('.ysdialog-contents').css('max-height', windowHeight - topGutter - 60 + 'px');
				}
			}
			var dialogWidth = dialog.width(),
				dialogHeight = dialog.height();
			dialog.css({'margin-left': -dialogWidth/2 + 'px', 'margin-top': -dialogHeight/2 + 'px'});
		}

		// responsive perfect scrollbar
		dialogContents = dialogContents || dialog.find('.ysdialog-contents');
		if (dialogContents.find('.fotorama').length == 0) {
			perfectScrollbar.update();
		}
	}
}

function YSDialogClose(dialogId, winObj) {
	var targetYsDialog, dataAfterClose = 'data-after-close', afterClose, dataDialogHref, dialogIframe, dialogBody;
	
	if (typeof winObj === "object") {
		targetYsDialog = winObj.$('#' + dialogId);
	}
	else {
		targetYsDialog = top.$('#' + dialogId);	
	}
	
	// Hide the dialog.
	targetYsDialog.css({'display': 'none', 'visibility': 'hidden'});

	// Hide the dialog overlay.
	targetYsDialog.closest('.ysdialog-wrapper').find('.ysdialog-overlay').hide();
	
	// Execute the after close callback function.
	afterClose = targetYsDialog.attr(dataAfterClose);
	if (typeof afterClose === "string" && typeof window[afterClose] === "function") {
		window[afterClose]();
	}
	
	dataDialogHref = targetYsDialog.attr('data-dialog-href');
	if (dataDialogHref && dataDialogHref.indexOf('#') == 0) {
		dialogBody = targetYsDialog.children('.ysdialog-body');
		$(dataDialogHref).html(dialogBody.html());
		targetYsDialog.children('.ysdialog-body').empty();
	}
	
	// hide scrollbar
	if (parent.$('html').hasClass('jzc-dialog-is-open')) {
		if (dataDialogHref && dataDialogHref.indexOf('#') == 0) {
			if (parent.$('.ysdialog-iframe').length == 0 && parent.$('.ysdialog-wrapper').length <= 1) {
				var documentScrollTop = Math.abs(parseInt(parent.$('html').css('top')));
				parent.$('html').removeClass('jzc-dialog-is-open').css('top', '').scrollTop(documentScrollTop);
			}
		}
		else {
			if (parent.$('.ysdialog-iframe') && parent.$('.ysdialog-iframe').length <= 1) {
				var documentScrollTop = Math.abs(parseInt(parent.$('html').css('top')));
				parent.$('html').removeClass('jzc-dialog-is-open').css('top', '').scrollTop(documentScrollTop);
			}
		}
	}

	// close timer interval
	if (dataDialogHref && dataDialogHref.indexOf('#') == 0) {
		if (parent.$('.ysdialog-iframe').length < 1) {
			clearInterval(jz.vComponent.dialog.timer);
		}
	}
	else if (parent.$('.ysdialog-iframe').length <= 1) {
		window.top.clearInterval(top.jz.vComponent.dialog.timer);
	}
	
	// Remove dialog.
	targetYsDialog.closest('.ysdialog-wrapper').remove();

}

(function($) {
	$.fn.YSDialog = function(options) {
		var dialogIdSuffix = '-dialog',
			dataAfterOpen = 'data-after-open',
			dataAfterClose = 'data-after-close',
			dialogIframeIdSuffix = '-iframe',
			dialogWrapperIdSuffix = '-wrapper',
			thisLinkId = $(this).attr('id'),
			dialogMainWidth = '',
			isCommonSize;
		
		/*
		 * Create a dialog.
		 */
		(function createDialog() {
			if ($('#' + thisLinkId + dialogIdSuffix + dialogWrapperIdSuffix).length > 0) {
				return false;
			}
			
			// Bind click event 
			$('#' + thisLinkId).off('click').on('click', function() {
				var dialogId = $(this).attr('id') + dialogIdSuffix,
					dialogHref = $.trim($(this).attr('href'));
				
				// Create a dialog wrapper for wrapping the overlay and the dialog. 
				createDialogWrapper(dialogId);
				
				// Prepare the dialog overlay and append it to the dialog wrapper.
				prepareDialogOverlay(dialogId);
				
				// Prepare an empty dialog and append it to the dialog wrapper.
				prepareEmptyDialog(dialogId, dialogHref);	

				if ($('#' + dialogId).length > 0) {
					showDialogOverlay(dialogId);
					loadDialogContents(dialogId, dialogHref);
				}
				return false;
			});
		})();
		
		/*
		 * Create dialog wrapper.
		 */
		function createDialogWrapper(dialogId) {
			$('#' + dialogId + dialogWrapperIdSuffix).remove();
			$('body').append('<div id="' + dialogId + dialogWrapperIdSuffix + '" class="ysdialog-wrapper"></div>');
		}
		
		/*
		 * Prepare an empty dialog.
		 */
		function prepareEmptyDialog(dialogId, dialogHref) {
			var emptyDialogStr = '', 
				dialogTitle = '',
				dialogWidth = '',
				dialogHeight = '',
				showDialogTitleBar = true,
				dialogStyle = '',
				optionDataAttr = '';
			
			if (options && typeof options.dialogTitle === 'string') {
				dialogTitle = options.dialogTitle;
			}
			if (options && typeof options.width === 'string') {
				dialogMainWidth = options.width;
				dialogWidth = options.width;
				dialogStyle += 'width: ' + dialogWidth + ';';
			}
			// if (!options.width) {
			// 	dialogWidth = '600px';
			// 	dialogMainWidth = '600px';
			// 	dialogStyle += 'width: ' + dialogWidth + ';';
			// }
			if (options && typeof options.height === 'string') {
				dialogHeight = options.height;
				dialogStyle += 'height: ' + dialogHeight + ';';
			}
			if (options && typeof options.showDialogTitleBar === 'boolean') {
				showDialogTitleBar = options.showDialogTitleBar;
			}
			if (options && typeof options.afterOpen === 'string') {
				optionDataAttr += dataAfterOpen + '="' + options.afterOpen + '"';
			}
			if (options && typeof options.afterClose === 'string') {
				optionDataAttr += dataAfterClose + '="' + options.afterClose + '"';
			}
			// ys
			if (typeof options.commonSize === 'boolean') {
				if (options.commonSize == true) {
					isCommonSize = true;
				}
			}
			else {
				isCommonSize = false;
			}
			
			emptyDialogStr = '<div id="' + dialogId + '" class="ysdialog" style="' + dialogStyle + '" data-dialog-href="' + dialogHref + '"' + optionDataAttr + '>';
			/*
			if (showDialogTitleBar) {
				emptyDialogStr += '<div class="ysdialog-title">' + dialogTitle + '<a class="ysdialog-title-close-btn ysdialog-close"><i class="fa fa-times" style="font-size:14px;"></i></a></div>';
			}
			*/
			//ys
			emptyDialogStr += '<div class="ysdialog-title"><a class="ysdialog-title-close-btn ysdialog-title-close-btn--for-small show-for-small-only ysdialog-close"><i class="fa fa-times" style="font-size:18px;"></i></a><a class="ysdialog-title-close-btn ysdialog-title-close-btn--for-medium hide-for-small-only ysdialog-close"><i class="fa fa-times" style="font-size:18px;"></i></a></div>';    

			emptyDialogStr += '<div class="ysdialog-body">';
			
			//ys
			emptyDialogStr += '<div class="ysdialog-handler"></div>';

			if (dialogHref && dialogHref.indexOf('#') == 0) {
				if ($(dialogHref).find('.ysdialog-contents').length  == 0) {
					emptyDialogStr += '<div class="ysdialog-contents"></div>';
				}
			}

			if (typeof options.iframe === 'boolean') {
				// loader
				// emptyDialogStr += '<div class="ysdialog-loader-wrappper"><div class="ysdialog-loader"></div></div>';
				emptyDialogStr += '<iframe id="' + dialogId + dialogIframeIdSuffix + '" class="ysdialog-iframe" src="about:blank" scrolling="no"></iframe>';
			}

			emptyDialogStr += '<div class="ysdialog-bottom-mask"></div>';	

			emptyDialogStr +=	'</div>'
							+ '</div>';
			
			$('#' + dialogId + dialogWrapperIdSuffix).append(emptyDialogStr);
		}
		
		/*
		 * Load contents of dialog.
		 */
		function loadDialogContents(dialogId, dialogHref) {
			if (typeof options.iframe === 'boolean') {
				$('#' + dialogId + ' .ysdialog-iframe').attr({'src': dialogHref, 'height': '0px', 'onload': 'showYSDialog("' + dialogId + '", "Y", "' + dialogMainWidth + '", "' + isCommonSize + '")'});
				
				// initLoader
				/* 
				var dialog = $('#' + dialogId);
				var windowHeight = $(window).height();
				if (Foundation.MediaQuery.is('small only')) {
					if (isCommonSize  == 'false' || isCommonSize  == false) {
						dialog.removeClass('ysdialog--border-radius ysdialog-common-size').height(windowHeight).css({'top': 0, 'left': 0});
						dialog.find('.ysdialog-body').height(windowHeight);
					}
					else {
						dialog.addClass('ysdialog--border-radius ysdialog-common-size').css({'top': '50%', 'left': '50%', 'transform': 'translate(-50% ,-50%)'});
						dialog.find('.ysdialog-title-close-btn--for-medium').css('cssText', 'display: block !important;');
						dialog.find('.ysdialog-title-close-btn--for-small').css('cssText', 'display: none !important;');
						dialog.find('.ysdialog-body').height(200);
					}
				}
				else {
					dialog.addClass('ysdialog--border-radius');
					dialog.find('.ysdialog-body').height(200);
				}
				$('#' + dialogId).css({'visibility': 'visible'});
				dialog.show();
				*/

			}
			else {
				// Load contents of dialog by moving DOM
				if (dialogHref && dialogHref.indexOf('#') == 0) {
					// ys
					if ($(dialogHref).find('.ysdialog-contents').length  == 0) {
						$('#' + dialogId + ' .ysdialog-contents').html($(dialogHref).html());
					}
					else {
						var hasMask = $(dialogHref).find('.ysdialog-bottom-mask').length;
						var hasHandler = $(dialogHref).find('.ysdialog-handler').length;
						if (hasMask == 0 && hasHandler == 0) {
							$('#' + dialogId + ' .ysdialog-body').html($(dialogHref).html() + '<div class="ysdialog-handler"></div><div class="ysdialog-bottom-mask"></div>');
						}
						else {
							$('#' + dialogId + ' .ysdialog-body').html($(dialogHref).html());
						}
					}
					$(dialogHref).empty();
					
					showYSDialog(dialogId, 'N', dialogMainWidth, isCommonSize);
				}
				// Load contents of dialog with the specified URL
				else {
					$('#' + dialogId + ' .ysdialog-body').load(dialogHref, function() {
						showYSDialog(dialogId, 'N', dialogMainWidth, isCommonSize);
					});	
				}
			}
		}
		
		/*
		 * Prepare overlay and loading animation.
		 */
		function prepareDialogOverlay(dialogId) {
			var dialogWrapper = $('#' + dialogId + dialogWrapperIdSuffix);
			if ($('#' + dialogId + '-ysdialog-overlay').length == 0) {
				dialogWrapper.append('<div id="'+dialogId+'-ysdialog-overlay" class="ysdialog-overlay"></div>');
			}
			
			if ($('#ysdialog-loading-animation').length == 0) {
				$('body').append('<div id="ysdialog-loading-animation" style="background-image: url(\''+getImageURL("loading_animate_rectangular.gif")+'\');"></div>');	
			}
			
			if (options && typeof options.closeOnClick === 'boolean' && options.closeOnClick) {
				$('#' + dialogId + '-ysdialog-overlay').off('click').on('click', function() {
					$('#ysdialog-loading-animation').hide();
					YSDialogClose($(this).closest('.ysdialog-wrapper').find('.ysdialog').attr('id'));
				});
			}
		}
		
		/*
		 * Show overlay and loading animation.
		 */
		function showDialogOverlay(dialogId) {
			$('#' + dialogId + '-ysdialog-overlay').show();
			$('#ysdialog-loading-animation').show();
		}
	};
	
	$(document).off('click', '.ysdialog-close').on('click', '.ysdialog-close', function() {
		YSDialogClose($(this).attr('data-ysdialog-id'));
	});
	
	// disable tab key when the YSDialog show.
	$(document).on('keydown keyup', function(e){
		let ysdialogOpend = $('.ysdialog:visible');
		if (ysdialogOpend.length > 0) {
			var code = e.keyCode || e.which;
		    if (code == '9' && ysdialogOpend.find(e.target).length == 0) {
		    	e.target.blur();
		    	e.preventDefault();
		        e.stopPropagation();
		    	return false;
	        }
		}
    });
	
	$(document).on('submit', '.ysform', function() {
		$(this).submit(function() {
			return false;
		});
		return true;
	});
	
	$(document).off('click', 'body').on('click', 'body', function(){
		$('.ysdropdown').hide();
		$('#member-menu-link').removeClass('selected');
	});
	
	$.fn.YSPagination = function(options) {
		var pageNum = 1, totalPageNum = 1, totalItemNum = 0, itemInfo = '', rowNumPerPage = 5,
			thisObject = $(this), pf, pp, pn, pl, itemFrom = 0, itemTo = 0, pagination = '',
			rowNumPerPageHtml = '<li><select id="rowNumPerPage" name="rowNumPerPage"><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option></select></li>',
			refreshAllPage = false;
		
		pageNum = options.pageNum ? parseInt(options.pageNum) : pageNum;
		rowNumPerPage = options.rowNumPerPage ? parseInt(options.rowNumPerPage) : rowNumPerPage;
		refreshAllPage = options.refreshAllPage ? options.refreshAllPage : refreshAllPage;
		if (options.totalItemNum && options.totalItemNum != '') {
			totalItemNum = options.totalItemNum ? parseInt(options.totalItemNum) : totalItemNum;
			totalPageNum = totalItemNum % rowNumPerPage == 0 ? totalItemNum / rowNumPerPage : totalItemNum / rowNumPerPage + 1;
			totalPageNum = parseInt(totalPageNum);
			
			itemFrom = (pageNum - 1) * rowNumPerPage + 1; 
			itemTo = pageNum < totalPageNum ? pageNum * rowNumPerPage : ((pageNum - 1) * rowNumPerPage + (totalItemNum % rowNumPerPage == 0 ? rowNumPerPage : totalItemNum % rowNumPerPage));
			
			if (totalItemNum > 0) {
				itemInfo = totalItemNum+'件中の'
					+ itemFrom + '～' + itemTo +'件を表示';
			}
		}
		if (options.itemsPerPage) {
			rowNumPerPageHtml = '<li><select id="rowNumPerPage" name="rowNumPerPage">';
			var itemsPerPageArr = options.itemsPerPage.split('-');
			for (var i = 0; i < itemsPerPageArr.length; i++) {
				if (itemsPerPageArr[i] != '') {
					rowNumPerPageHtml += '<option value="' + itemsPerPageArr[i] + '">' + itemsPerPageArr[i] + '</option>';
				}
			}
			rowNumPerPageHtml += '</select></li>';
		}
		pagination = '<ul class="pagination">'
			+ '<li><a href="javascript:;" id="page-first" data-page="1" class="move"><i class="fa fa-step-backward"></i></a></li>'
			+ '<li><a href="javascript:;" id="page-prev" class="move"><i class="fa fa-play fa-flip-horizontal"></i></a></li>'
			+ '<li><span id="totalPageNum"></span>ページ中</li>'
			+ '<li><input type="text" class="page-num"></li>'
			+ '<li><a href="javascript:;" id="page-next" class="move"><i class="fa fa-play"></i></a></li>'
			+ '<li><a href="javascript:;" id="page-last" class="move"><i class="fa fa-step-forward"></i></a></li>'
			+ rowNumPerPageHtml
			+ '<li id="totalItemNum" style="margin-left: 20px;"></li>'
			+ '</ul>';
		thisObject.empty().html(pagination);
		thisObject.find('.page-num').val(pageNum);
		thisObject.find('#totalPageNum').text(totalPageNum);
		thisObject.find('#totalItemNum').text(itemInfo);
		if (totalItemNum == 0) {thisObject.hide();}
		
		setPageButtonState(rowNumPerPage);
		
		thisObject.find('#rowNumPerPage').unbind('change').change(function() {
			if (refreshAllPage) {
				var url = options.url + '?page=1&count=' + thisObject.find('#rowNumPerPage').val();
				if (options.params) {
					url += '&' + options.params;
				}
				location.href = url;
			}
			else {
				var url = options.url + '/1/' + thisObject.find('#rowNumPerPage').val() + '/y', postData = {};
				if (options.params) {
					let postDataItem = options.params.split('&');
					
					if (postDataItem.constructor === Array) {
						for (let i = 0; i < postDataItem.length; i++) {
							let postDataItemArr = postDataItem[i].split('='),
								postDataKey = postDataItemArr[0],
								postDataVal = postDataItemArr[1];
							
							if (postDataKey) {
								postData[postDataKey] = postDataVal;
							}
						}
					}
				}
				$(options.targetDiv).load(url, postData);
			}
		});

		thisObject.find('#page-first, #page-prev, #page-next, #page-last').unbind('click').click(function() {
			if (!$(this).hasClass('disable')) {
				if (refreshAllPage) {
					var url = options.url + '?page=' + $(this).attr('data-page') + '&count=' + thisObject.find('#rowNumPerPage').val();
					if (options.params) {
						url += '&' + options.params;
					}
					location.href = url;
				}
				else {
//					var url = options.url + '/' + $(this).attr('data-page') + '/' + thisObject.find('#rowNumPerPage').val() + '/y';
//					if (options.params) {
//						url += '?' + options.params;
//					}
//					$(options.targetDiv).load(url);
					var url = options.url + '/' + $(this).attr('data-page') + '/' + thisObject.find('#rowNumPerPage').val() + '/y', postData = {};
					if (options.params) {
						let postDataItem = options.params.split('&');
						
						if (postDataItem.constructor === Array) {
							for (let i = 0; i < postDataItem.length; i++) {
								let postDataItemArr = postDataItem[i].split('='),
									postDataKey = postDataItemArr[0],
									postDataVal = postDataItemArr[1];
								
								if (postDataKey) {
									postData[postDataKey] = postDataVal;
								}
							}
						}
					}
					$(options.targetDiv).load(url, postData);
				}
			}
			return false;
		});
		
		function setPageButtonState() {
			var pf = thisObject.find("#page-first"), pp = thisObject.find("#page-prev"), pn = thisObject.find("#page-next"), pl = thisObject.find("#page-last"), 
				ppNum = 1, pnNum = 1;
			
			thisObject.find('#rowNumPerPage').val(rowNumPerPage);
			
			if (parseInt(pageNum) == 1) {
				pf.addClass('disable');
				pp.addClass('disable');
			}
			else {
				ppNum = pageNum - 1;
				pf.removeClass('disable');
				pp.removeClass('disable');
			}

			if (parseInt(pageNum) == parseInt(totalPageNum)) {
				pnNum = totalPageNum;
				pn.addClass('disable');
				pl.addClass('disable');
			}
			else {
				pnNum = pageNum + 1;
				pn.removeClass('disable');
				pl.removeClass('disable');
			}

			pf.attr({'href': options.url + '/' + ppNum + '/' + rowNumPerPage, 'data-page': 1});
			pp.attr({'href': options.url + '/' + ppNum + '/' + rowNumPerPage, 'data-page': ppNum});
			pn.attr({'href': options.url + '/' + pnNum + '/' + rowNumPerPage, 'data-page': pnNum});
			pl.attr({'href': options.url + '/' + totalPageNum + '/' + rowNumPerPage, 'data-page': totalPageNum});
		}
	};
	
	$.fn.YSDropdown = function(options) {
		if ($('#' + options.id).length > 0) return;
		
		$(this).css('position', 'relative');
		var ysDropdownHtml = '<div id="' + options.id + '" class="ysdropdown"><div class="before"></div><ul class="menu-list">'
			beforeRight = '14px', afterRight = '16px', distance = 0;
		if (options.menus.length) {
			for (var i = 0; i < options.menus.length; i++) {
				if (options.menus[i][0] == 'boundary-line') {
					ysDropdownHtml += '<li class="boundary-line"></li>';
				}
				else {
					if (options.menus[i].length >= 5) {
						ysDropdownHtml += '<li ' + options.menus[i][4] +'><a id="' + options.menus[i][0] + '" href="javascript:;"';
					}
					else {
						ysDropdownHtml += '<li><a id="' + options.menus[i][0] + '" href="javascript:;"';
					}
					if (options.menus[i].length >= 3) {
						ysDropdownHtml += ' action="' + options.menus[i][2] + '"';
						
						if (options.menus[i].length >= 4) {
							ysDropdownHtml += ' data-option="' + options.menus[i][3] + '"'; 
						}
					}
					ysDropdownHtml += '>' + options.menus[i][1] + '</a></li>';
				}
			}
		}
		ysDropdownHtml += '</ul><div class="after"></div></div>';
		$(this).append(ysDropdownHtml);

		if (options.arrowAlign && options.arrowAlign == "center") {
			distance = $('#' + options.id).outerWidth() / 2 - 12;
			beforeRight = distance + 'px';
			afterRight = (distance + 2) + 'px';
		}
		else if (options.arrowAlign && options.arrowAlign == "left") {
			distance = $('#' + options.id).outerWidth() - 16 - 12;
			beforeRight = distance + 'px';
			afterRight = (distance + 2) + 'px';
		}
		
		$(this).find('.before').css('right', beforeRight);
		$(this).find('.after').css('right', afterRight);
		
		$(this).off('click').on('click', function() {
			var dropdown = $(this).find('.ysdropdown');
			if ($(this).is('visible')) {
				dropdown.hide();
				$(this).removeClass('selected');
			}
			else {
				if (parseFloat(dropdown.css('padding-top')) > 0) {
					dropdown.css('margin-top', (parseFloat(dropdown.css('padding-top'))*2-1) + 'px');
				}
				dropdown.show();
				$(this).addClass('selected');
			}
			return false;
		});
		
		for (var i = 0; i < options.menus.length; i++) {
			if (options.menus[i].length >= 3 && options.menus[i][2] && typeof window[options.menus[i][2]] === 'function') {
				$('#' + options.menus[i][0]).off('click').on('click', function() {
					var thisYsDropdown = $(this).closest('.ysdropdown');
					thisYsDropdown.attr('data-val', $(this).attr('id'));
					
					var funcName = $(this).attr('action'), data = $(this).attr('data-option');
					if (funcName) {
						thisYsDropdown.hide();
						if (data) {
							window[funcName](data);
						}
						else {
							window[funcName]();
						}
					}
					return false;
				});
			}
		}
	};
	
	$.fn.YSProcessSteps = function(options) {
		var thisObj = $(this),
			steps = options.steps,
		    maxStepNum = steps.length,
		    maxStepNumProgress = 1;

	     function attachMouseEventToStep() {
	     	$('.process-step').mouseenter(function() {
	     		if ($(this).hasClass('disabled') || $(this).hasClass('selected')) {return false;}
	     		var elemA = $(this).children('a'), 
	     			stepNumSelected = parseInt($('.process-step.selected a').attr('data-no')), 
	     			stepNumMouseover = parseInt(elemA.attr('data-no'));
	     		
	     		$(this).addClass('mouseover').removeClass('fold');
	     		elemA.html(elemA.attr('data-text'));
	     		
	     		if (stepNumMouseover < stepNumSelected - 1) {
	     			var prevStepSelected = $('.process-step.selected').prev();
	     			var displayValue = prevStepSelected.css('display');
	     			if (displayValue == 'none') {
	     				prevStepSelected = $('.process-step.selected').prev().prev();
	     				stepNumSelected = stepNumSelected - 1;
	     			}
	     			if (stepNumMouseover < stepNumSelected - 1) {
	     				prevStepSelected.addClass('fold');
	     				prevStepSelected.find('a').hide();
	     			}
	     		}
	     		else if (stepNumMouseover > stepNumSelected + 1) {
	     			var nextStepSelected = $('.process-step.selected').next(); 
	     			nextStepSelected.addClass('fold');
	     			nextStepSelected.find('a').hide();
	     		}
	     	})
	     	.mouseleave(function() {
	     		if ($(this).hasClass('disabled') || $(this).hasClass('selected')) {return false;}
	     		var elemA = $(this).children('a'), 
	     			stepNumSelected = parseInt($('.process-step.selected a').attr('data-no')), 
	     			stepNumMouseover = parseInt(elemA.attr('data-no'));
	     		
	     		$(this).removeClass('mouseover');
	     		if (!$(this).hasClass('open')) {
	     			$(this).addClass('fold');
	     			elemA.html('');
	     		}
	     		
	     		if (stepNumMouseover < stepNumSelected - 1) {
	     			var prevStepSelected = $('.process-step.selected').prev();
	     			var displayValue = prevStepSelected.css('display');
	     			if (displayValue == 'none') {
	     				prevStepSelected = $('.process-step.selected').prev().prev();
	     				stepNumSelected = stepNumSelected - 1;
	     			}
	     			if (stepNumMouseover < stepNumSelected - 1) {
	     				prevStepSelected.removeClass('fold');
	     				prevStepSelected.find('a').show();
	     			}
	     		}
	     		else if (stepNumMouseover > stepNumSelected + 1) {
	     			var nextStepSelected = $('.process-step.selected').next(); 
	     			nextStepSelected.removeClass('fold');
	     			nextStepSelected.find('a').show();
	     		}
	     	})
	     	.click(function() {
	     		if ($(this).hasClass('disabled') || $(this).hasClass('selected')) {return false;}
	     		$('#process-steps .process-step').removeClass('selected');
	     		$(this).addClass('selected');
	     		
	     		window[$(this).find('a').attr('data-action')]();
	     	});
	     }

	     
	     $.fn.YSProcessSteps.resetSteps = function(newSteps) {
	    	 steps = newSteps;	    	 
			 maxStepNum = steps.length;
	     }
	     
	     $.fn.YSProcessSteps.disableStep = function(stepFuncName) {
	    	 $('#process-steps a[data-action="' + stepFuncName + '"]').parent().addClass('disabled');
	     }
	     
	     $.fn.YSProcessSteps.enableStep = function(stepFuncName) {
	    	 $('#process-steps a[data-action="' + stepFuncName + '"]').parent().removeClass('disabled');
	     }
	     
	     $.fn.YSProcessSteps.showStep = function(stepFuncName) {
	    	 var maxStepNumTemp = 1, stepNum = 1, stepStr = '';
	    	 
	    	 for (var i = 0; i < steps.length; i++) {
	    		 if (stepFuncName == steps[i][1]) {
	    			 stepNum = i + 1;
	    		 }
	    	 }
	    	 
	    	 maxStepNumProgress = maxStepNumProgress < stepNum ? stepNum : maxStepNumProgress;
	    	 maxStepNumTemp = maxStepNum == maxStepNumProgress ? maxStepNum : maxStepNumProgress + 1;
	    	 
	    	 //console.log('stepNum: ' + stepNum + ' maxStepNumProgress: ' + maxStepNumProgress + ' maxStepNumTemp: ' + maxStepNumTemp);
	    	 
	    	 var processDisabled = [];
	    	 $('#process-steps .process-step+.disabled a').each(function() {
	    		 processDisabled.push(parseInt($(this).attr('data-no')));
	    	 });
	    	 
	    	 for (var i = 1; i <= maxStepNumTemp; i++) {
	    		 stepStr += '<div class="process-step';
	    		 openStepFlag = false;
	     		
	     		// Apply classes(start, end).
	     		if (i == 1) {
	     			stepStr += ' process-step-start';
	     		}
	     		else if (i == maxStepNum) {
	     			stepStr += ' process-step-end';
	     		}

	     		// Apply classes(open, fold, selected, disabled).
	     		if (i > maxStepNumProgress || ($.inArray(i, processDisabled) != -1 && i != stepNum)) {
	     			stepStr += ' disabled';
	     		}

	     		if (i == stepNum) {
	     			stepStr += ' selected open';
	     			openStepFlag = true;
	     		}
	     		else if (i == stepNum - 1 || i == stepNum + 1) {
	     			stepStr += ' open';
	     			openStepFlag = true;
	     		}
	     		else {
	     			stepStr += ' fold';
	     		}
	     		
	     		stepStr += '" style="z-index: '+(100-i)+';">';
	     		stepStr += '<a data-text="' + steps[i-1][0] + '" data-no="' + i + '" data-action="' + steps[i-1][1] + '">';
	     		
	     		if (openStepFlag) {
	     			stepStr += steps[i-1][0];
	     		}
	     		
	     		stepStr += '</a></div>\n';
	    	 }
	    	 
	    	 $('#process-steps').empty().append(stepStr);
	    	 
	    	 attachMouseEventToStep();
	     }
	     
	     var thisObj = $('#'+$(this).attr('id')), 
	     	 initStep = '<div class="process-step process-step-start selected open" style="z-index: 99;">'
				+ '<a data-text="' + steps[0][0] + '" data-no="1" data-action="'+steps[0][1]+'">' + steps[0][0] + '</a></div>';

	     if (steps.length > 1) {
				+ '<div class="process-step disabled open" style="z-index: 98;">'
				+ '<a data-text="' + steps[1][0] + '" data-no="2" data-action="'+steps[1][1]+'">' + steps[1][0] + '</a>'
				+ '</div>';
	     }
	     thisObj.append(initStep);
	     thisObj.YSProcessSteps.showStep(steps[0][1]);
	     
	};
	
	$.fn.YSBubblePopup = function(options) {
		var defaults = {
			position : 'left',
			msg : ''
		}
		var options = $.extend(defaults, options),
			width = "width: ",
			bubbleWidth = 180;
		if (!options.msg) {
			throw new Error('params error');
		}
		if (options.width) {
			width += options.width + 'px;';
			bubbleWidth = options.width;
		}
		
		this.each(function(){
			var element = $(this),
				elementWidth = $(this).outerWidth(),
				element_top = element.offset().top,
				element_left = element.offset().left,
				windowWidth = $(window).width(),element_right = windowWidth - elementWidth - element_left,
				positionX = element_left > element_right ? element_right : element_left;
			
			if (positionX < bubbleWidth/2 && element_left > bubbleWidth/2 && element_right < bubbleWidth/2) {
				options.position = 'right';
			}
			else if (positionX < bubbleWidth/2 && element_left < bubbleWidth/2 && element_right > bubbleWidth/2) {
				options.position = 'left';
			}

			var	bubble = $('<div class="bubble_popup_box"><div class="bubble_popup_arrow bubble_popup_'+options.position+'"></div><div class="bubble_popup_arrow2 bubble_popup_'+options.position+'"></div><div class="bubble_popup_info" style="' + width + '">'+options.msg+'</div></div>').appendTo(document.body);
				bubbleWidth = bubble.outerWidth();
			switch(options.position){
				case 'center':
					bubble.css({
						top: element_top - bubble.outerHeight() - 2,
						left: element_left - bubbleWidth/2 + elementWidth/2
					});
					break;
				case 'left':
					bubble.css({
						top: element_top - bubble.outerHeight() - 2,
						left: element_left - 31 + elementWidth/2
					});
					break;
				case 'right':
					bubble.css({
						top: element_top - bubble.outerHeight() - 2,
						left: element_left - (bubbleWidth - 31) + elementWidth/2
					});
					break;
				default:
			}
			bubble.fadeIn('fast');
		});
		return this;
	};
    
    $(document).on('mouseenter', '.question-bubble-popup', function() {
		$(this).YSBubblePopup({ position: $(this).attr('position'), msg: $(this).attr('guidance'), width: $(this).attr('custom-width') });
	}).on('mouseleave', '.question-bubble-popup', function() {
		$('.bubble_popup_box').remove();
	});
    
    $.fn.YsSlider = function(options) {
    	var defaults = {
			productPage: 1,
			eventPage: 1,
			sliderType: '',
			url: '',
			productSliderTitle: '',
			eventSliderTitle: '',
			pageText: '',
			uploadBasePath: '',
			useReviewFlag: '',
			objectProduct: 'pu',
			objectEvent: 'ev',
    	}
    	$.extend(defaults, options);
    	var $slider = $('.jzc-slider');

    	$.post(defaults.url, function(data) {
    			if (data.result == 'SUCCESS') {

    				if (defaults.sliderType == defaults.objectProduct) {
    					if (data[defaults.objectProduct] && data[defaults.objectProduct].length > 0) {
        					getSliderHtml(data[defaults.objectProduct], defaults.objectProduct);
        				}
        				
        				if (data[defaults.objectEvent] && data[defaults.objectEvent].length > 0) {
        					getSliderHtml(data[defaults.objectEvent], defaults.objectEvent);
        				}
    				}
    				else if (defaults.sliderType == defaults.objectEvent) {
    					if (data[defaults.objectEvent] && data[defaults.objectEvent].length > 0) {
    						getSliderHtml(data[defaults.objectEvent], defaults.objectEvent);
        				}
    					if (data[defaults.objectProduct] && data[defaults.objectProduct].length > 0) {
        					getSliderHtml(data[defaults.objectProduct], defaults.objectProduct);
        				}
    				}
    				
    				$slider.show();
    			}
    			else {
    				$slider.remove();
    			}
    	}, "json");

    	function getSliderHtml(relationDateList, sliderType) {
    		
    		var domainUrl = top.jzAppVars().domainUrl;
    		var sliderPageType = '',
    			sliderTitle = '',
    			sliderCount = relationDateList.length,
    			sliderTotalPage = Math.ceil(sliderCount/5);
    		
    		if (sliderType == defaults.objectProduct) {
    			sliderPageType = 'productPage';
    			sliderTitle = defaults.productSliderTitle;
    		}
    		else if (sliderType == defaults.objectEvent) {
    			sliderPageType = 'eventPage';
    			sliderTitle = defaults.eventSliderTitle;
    		}
    		
    		var sliderHtml = '<div class="jzc-slider-' + sliderType + '">' +
    									'<div class="jzc-slider-title">' + 	
    										'<div class="row">' + 
    											'<div class="small-12 cell">' + 
    												'<h2 class="left">' + sliderTitle + '</h2>' + 
    												'<div class="right">' + defaults.pageText + ' : <span class="jzc-slider-page">1</span>/' + sliderTotalPage + '</div>' + 
    											'</div>' + 
    										'</div>' + 
    									'</div>' + 
    									'<div style="clear:both"></div>' +
    									'<div class="jzc-slider-box">' +
    										'<div class="row">' +
    											'<div class="small-1 cell">' +
    												'<div class="jzc-slider-controls jzc-slider-prev left"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>' +
    											'</div>' +
    										'<div class="small-10 cell">';
    		
    		for (var i = 0; i < sliderCount; i++) {
    			var pageIndex = parseInt(i/5) + 1,
    				relationDate = relationDateList[i];
    			if (i%5 == 0) {
    				sliderHtml += '<div class="row small-up-5 jzc-slider-row jzc-slider-' + sliderType + '-' + pageIndex + '" style="display: none;">';
    			}
    			sliderHtml += '<div class="column column-block">' +
		  					'<a href="' + domainUrl + relationDate.url +'">';
				if (relationDate.imgPath) {
					sliderHtml += '<div style="height: 80px; width: 80px; margin-left: auto; margin-right: auto;">' +
									'<div class="img-pro-bg" style="background-image: url(\'' + defaults.uploadBasePath + relationDate.imgPath + relationDate.imgFileName + '\');"></div>' +
								'</div>';
				}
				else {
					sliderHtml += '<div style="font-weight: bold; margin-left: auto; margin-right: auto; color: #ffffff; height: 80px; width: 80px; background-color: #CCC;">';
					sliderHtml += '<div style="text-align: center; padding-top: 20px;">NO<br/>IMAGE</div>';
					sliderHtml += '</div>';
				}
				sliderHtml += '</a>' +
							'<div style="margin-top: 10px;"><a href="' + domainUrl + relationDate.url +'">' + relationDate.name + '</a></div>';
				if (relationDate.price) {
					sliderHtml += '<div>' + relationDate.price + '</div>';
				}
				if (defaults.useReviewFlag == 1) {
					sliderHtml += '<span id="starPointAve-' + relationDate.reviewId + '" class="starPointAve" score="' + relationDate.starPointAve + '"></span>&nbsp;(<span id="reviewNum-' + relationDate.reviewId + '">' + relationDate.reviewNum + '</span>)';
				}
    					
    			sliderHtml += '</div>';
    			if (i%5 == 4 || i+1 == sliderCount) {
    				sliderHtml += '</div>';
    			}
    		}
    		sliderHtml += 	'</div>' +
								'<div class="small-1 cell">' +
									'<div class="jzc-slider-controls jzc-slider-next right"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>' +
								'</div>' +
							'</div>';
    		$slider.append(sliderHtml);
    		$('.jzc-slider-' + sliderType + '-1').show();
    		$('.jzc-slider .starPointAve').each(function() {
    			$(this).raty({
        			readOnly: true,
        			half: true,
        			score: $(this).attr('score'),
        			space: false
        		});
    		});
    		
    		var $sliderShowPage = $('.jzc-slider-' + sliderType + ' .jzc-slider-page'),
	    		$slideContent = $('.jzc-slider-' + sliderType + ' .jzc-slider-row');
    		$(document).on('click', '.jzc-slider-' + sliderType + ' .jzc-slider-prev', function() {
	    		if (defaults[sliderPageType] == 1) {
	    			return;
	    		}
	    		else {
	    			defaults[sliderPageType]--;
	    		}
	    		$slideContent.hide();
	    		$sliderShowPage.text(defaults[sliderPageType]);
	    		$('.jzc-slider-' + sliderType + '-'+defaults[sliderPageType]).show();
	    	});
    		$(document).on('click', '.jzc-slider-' + sliderType + ' .jzc-slider-next', function() {
	    		if (defaults[sliderPageType] == sliderTotalPage) {
	    			return;
	    		}
	    		else {
	    			defaults[sliderPageType]++;
	    		}
	    		$slideContent.hide();
	    		$sliderShowPage.text(defaults[sliderPageType]);
	    		$('.jzc-slider-' + sliderType + '-'+defaults[sliderPageType]).show();
	    	});
    	}
    	
    };
	
})(jQuery);

function YSLoadingStart(message) {
	$.blockUI({
		baseZ: 9999999,
		message: '<table><tr><td><div style="width: 32px; height: 32px;"><i class="fa fa-spinner fa-pulse" style="font-size: 28px; margin-top: 2px;"></i></td><td style="padding-left: 16px;">' + message
				+ "</td></tr></tbody></table>",
		overlayCSS: {
			backgroundColor: 'rgba(0,0,0,0.5)',
			opacity: '0.7'
		},
		css: {
			backgroundColor: "#fff",
			border: "3px solid #aaa",
			color: "#000",
			cursor: "default",
			left: "45%",
			margin: 0,
			padding: "40px 40px 40px 30px",
			textAlign: "center",
			top: "45%",
			width: "auto"
		}
	});
}

function YSLoadingStop(options) {
	$.unblockUI();
}


function waitingStart(message, callback) {
	$.blockUI({
		baseZ: 9999999,
		message: '<table><tr><td valign="top"><div style="width: 32px; height: 32px;"><i class="fa fa-spinner fa-pulse" style="font-size: 28px; margin-top: 2px;"></i></td><td  align="left" style="padding-left: 16px;">' + message
				+ '</td></tr></tbody></table><ul class="ysdialog-buttons button-group even-2"><li><a class="button recommend ysdialog-close" href="#" onclick="'+ callback +'">キャンセル</a></li></ul>',
		overlayCSS: {
			backgroundColor: 'rgba(0,0,0,0.5)',
			opacity: '0.7'
		},
		css: {
			backgroundColor: "#fff",
			border: "3px solid #aaa",
			color: "#000",
			cursor: "default",
			left: "40%",
			margin: 0,
			padding: "40px 40px 40px 30px",
			textAlign: "center",
			top: "40%",
			width: "auto"
		}
	});
}

function waitingStop(options) {
	$.unblockUI();
}

function setupDynamicYSDialog(ysDialogLinkId, ysDialogTitle, ysDialogWidth, ysDialogHeight) {
	if ($('#' + ysDialogLinkId).length == 0) {
		$('body').append('<a id="' + ysDialogLinkId + '"></a>');
		
		if (ysDialogHeight) {
			$('#' + ysDialogLinkId).YSDialog({dialogTitle: ysDialogTitle, width: ysDialogWidth, height: ysDialogHeight});	
		}
		else {
			$('#' + ysDialogLinkId).YSDialog({dialogTitle: ysDialogTitle, width: ysDialogWidth});
		};
	}
}

function openDynamicYSDialog(ysdialogLinkId, url) {
	var dynamicDialog = $('#' + ysdialogLinkId);
	dynamicDialog.attr("href", url);
	dynamicDialog.click();
}

function openLinkSelf(url) {
	window.location = url;
}

function openLinkBlank(url) {
	window.open(url);
}

function jzMsgBox(message, messageType, width) {
	
	if (!parent.document.getElementById('jzMsgBox')) {
		window.top.$('body').append('<div id="jzc-msg-box" data-msg-type="">' +
						'<a id="jzc-msg-box-link" href="#jzc-msg-box-link-div" style="display: none;"></a>' +
						'<div id="jzc-msg-box-link-div" class="ysdialog">' +
							'<div class="ysdialog-contents jzc-msg-box-content">' +
							    '<table align="center">' +
							    	'<td valign="top">' +
							    		'<div class="jzc-msg-box-icon-bg"><i class="jzc-msg-box-icon fa"></i></div>' +
							    	'</td>' +
							    	'<td class="jzc-msg-box-msg"></td>' +
							   ' </table>' +
						    '</div>' +
						'</div>' +
					'</div>');
	}
	
	if (messageType == 'alert') {
		window.top.$('.jzc-msg-box-icon').removeClass('fa-check-circle jzc-msg-box-success-msg-icon').addClass('fa-exclamation-triangle jzc-msg-box-error-msg-icon');
	}
	else {
		window.top.$('.jzc-msg-box-icon').addClass('fa-check-circle').addClass('jzc-msg-box-success-msg-icon').removeClass('fa-exclamation-triangle jzc-msg-box-error-msg-icon');
	}
	window.top.$('.jzc-msg-box-msg').html(message);
	
	openJzcMsgBox();
}

function openJzcMsgBox() {
	window.top.$("#jzc-msg-box-link").YSDialog({dialogId: "jzMsgBox", showDialogTitleBar: false, closeOnClick: true, afterOpen: 'afterOpenJzcMsgBox'});
	window.top.$("#jzc-msg-box-link").click();
}

function afterOpenJzcMsgBox() {
	window.top.$("#jzc-msg-box-link-dialog").css('width', '');
}

function afterOpenIconBox() {
	// $('#popup-show-fullscreen-icon-link-dialog .ysdialog-title').css({"background-color": "#FFF"});
	// var ysdialogContents = $('#popup-show-fullscreen-icon-link-dialog').find('iframe').contents().find('.ysdialog-contents');
	// $('#popup-show-fullscreen-icon-link-dialog').find('iframe').contents().find('html,body').css('height', '100%');
	// ysdialogContents.css('margin-bottom', '0').css('overflow', 'auto').css('min-height','100%').css('max-height','');
}

function getImageURL(loadingFileName) {
	var contextPath = '';
	if (window.location.pathname.indexOf('/jimzen') == 0) {
		contextPath = '/jimzen';
	}
	var resourceServerUrl =  top.jzAppVars().resourceServerUrl;
	//return	resourceServerUrl + '/js/common/yscommonui/images/' + loadingFileName;
	return	resourceServerUrl + '/image/web/common/dialog/' + loadingFileName;     //2018.08.10
}

function removeMtag(msg) {
	return msg.replace(/<m>|<\/m>/g, '');
}

function addBreadcrumbList() {
	var contents = "";
	$('.jstree').jstree('get_selected').parents("li").each(function() {
		var elementName = $(this).find('a:first').children("span").text().trim(), liId='#'+$(this).attr('id').trim();
		
		contents = '<a href="javascript:" onclick="$(\''+liId+'\').find(\'a:first\').click();"><span>' + elementName + '</span></a><i class="fa fa-angle-right"></i>' + contents;
	});

	if (contents) {
		$("#breadcrumb-list").html(contents);	
	}
	else {
		$("#breadcrumb-list").hide();
	}
}

function resizeYsDialogContents(ysiframeDialogId) {
	var ysiframeDialog = $('#'+ysiframeDialogId), iframeDialogContents = ysiframeDialog.contents();
	
	iframeDialogContents.find('.ysdialog-close').attr('data-iframe-id', ysiframeDialogId);
	ysiframeDialog.attr('height', ysiframeDialog.contents().height() + 'px');
	
	$('#ysdialog-loading-animate').hide();
	
	ysiframeDialog.parent().css('visibility', 'visible');
	repositionYsDialog(ysiframeDialog.parent());
	
	// for chrome
	iframeDialogContents.find('html').css('overflow', 'hidden');
	ysiframeDialog.attr('scrolling', 'auto');
}

function repositionYsDialog(ysdialog) {
	ysdialog.css('top', ($(window).scrollTop() + ($(window).height() - ysdialog.height()) * 0.4) + 'px');
	ysdialog.css('left', ($(window).scrollLeft() + ($(window).width() - ysdialog.width()) * 0.5) + 'px');
}

function handleIframe() {
	if (!isIframe()) {
		$('.ysdialog-contents').css('max-height', 'none');
		$('.ysdialog-close').parent().hide();
	}
}

function isIframe() {
    try {
    	return window.self !== window.top;
    }
    catch (e) {
    	return true;
    }
}

/*
jQuery tinyDraggable v1.0.2
Copyright (c) 2014 Simon Steinberger / Pixabay
GitHub: https://github.com/Pixabay/jQuery-tinyDraggable
More info: https://pixabay.com/blog/posts/p-52/
License: http://www.opensource.org/licenses/mit-license.php
*/
(function($){
$.fn.tinyDraggable = function(options){
	var settings = $.extend({ handle: 0, exclude: 0 }, options);
	var draggableMask = $('<div class="ysdialog-draggable-mask"></div>');
    return this.each(function(){
        var dx, dy, el = $(this), handle = settings.handle ? $(settings.handle, el) : el;
        handle.on({
            mousedown: function(e){
				if (settings.exclude && ~$.inArray(e.target, $(settings.exclude, el))) return;
				e.preventDefault();
				handle.closest('.ysdialog-body').append(draggableMask);
                var os = el.offset(); dx = e.pageX-os.left, dy = e.pageY-os.top;
                $(document).on('mousemove.drag', function(e){ el.offset({top: e.pageY-dy, left: e.pageX-dx}); });
            },
            mouseup: function(e){ 
				$(document).off('mousemove.drag');
				draggableMask.remove();
			}
        });
    });
}
}(jQuery));

function setEditorConfig(tenantSignId, language, width, height, toolbarStyle, resize) {
	var config = {};
	config.language = language ? language : "en";
	config.width = width ? width : "100%";
	config.height = height ? height : "200px";
	config.resize_enabled = resize ? resize : false;
	config.removePlugins = "elementspath";
	config.autoParagraph = false;
	config.toolbar = [
	                  	['Styles', 'Format'],
	                  	['NumberedList', 'BulletedList'],
	                  	['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
	                  	['Source'], ['Maximize'],
	                  	'/',
	                  	['Font', 'FontSize'],
	                  	['TextColor', 'BGColor'],
	                  	['Bold', 'Italic', 'Underline', 'Strike'],
	                  	['Link','Image','Table']
	                  ];
	
	if (toolbarStyle == "extendForm") {
		config.resize_enabled = false;
		config.toolbar = [
		          ['Styles','Format'],
		          ['Bold','Italic','Underline','Strike'],
		          ['NumberedList','BulletedList'],
		          ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		          '/',
		          ['Font','FontSize'],
		          ['TextColor','BGColor'],
		          ['Link','Image','Table']
		         ];
	}
	setFileConfig(config, tenantSignId);
	return config;
}
function setAutoGrowEditorConfig(tenantSignId) {
	var config = {
		extraPlugins: 'autogrow',
		//removePlugins: 'resize',
		autoGrow_onStartup : true
	};
	setFileConfig(config, tenantSignId);
	return config;
}
function setFullEditorConfig(tenantSignId) {
	var config = {};
	config.autoParagraph = false;
	setFileConfig(config, tenantSignId);
	return config;
}

function setFileConfig(config, tenantSignId) {
	var kcfinderUrl = typeof jzAppVars == 'undefined' ? top.jzAppVars().kcfinderUrl : jzAppVars().kcfinderUrl;
	var domainUrl = top.jzAppVars().domainUrl;
	//config.filebrowserBrowseUrl = domainUrl + "/admin/common/image/show-image-setup-init/CKEDITOR?type=files";
	//config.filebrowserImageBrowseUrl = domainUrl + "/admin/common/image/show-image-setup-init/CKEDITOR?type=images";
	//config.filebrowserFlashBrowseUrl = domainUrl + "/admin/common/image/show-image-setup-init/CKEDITOR?type=flash";
	config.filebrowserWindowWidth = '1000';
	config.filebrowserWindowHeight = '700';
}

function textareaToCkeditor(data) {
	data = data.replace(/ /gm, '&nbsp;');
	return data.replace(/\r\n|\r|\n/g, "<br />");
}

function ckeditorToTextarea(data) {
	data = data.trim();
	data = data.replace(/&nbsp;/gm, ' ');
	data = data.replace(/http:/gm, "");
	return data.replace(/<(?:.|\n)*?>/gm, "");
}

function preventEnterKeyFormSubmit() {
	$('form').on('keyup keypress', function(e) {
		var code = e.keyCode || e.which;
		if (code == 13) { 
			e.preventDefault();
			return false;
		}
	});
}

$(document).on('change', 'input[type="text"]', function() {
	var thisVal = $.trim($(this).val());
	$(this).val(thisVal);
});

function htmlEncode(value){
	value = removeMtag(value);
	return $('<div/>').text(value).html();
}

function htmlDecode(value){
	return $('<div/>').html(value).text();
}

function htmlEscapeWithoutBrTag(value) {
	value = value.replace(/<br[ ]*[/]?>/g, '<br />')
	var valueArr = value.split('<br />'),
		value = '',
		len = valueArr.length;
	for (var i = 0; i < len; i++) {
		if (!(len == i+1 && valueArr[i] == '')) {
			var text = '';
			if (valueArr[i] == '') {
				text = '<br />'
			}
			else {
				text = '<div>' + htmlEncode(valueArr[i]) + '</div>';
			}
			value += text;
		}
	}
	value = value.replace(/&amp;nbsp;/g, ' ');
	return value;
}

function openPaypalWindow() {
	var width = 400, height = 550, left, top;
	if (window.outerWidth) {
	    left = Math.round((window.outerWidth - width) / 2) + window.screenX;
	    top = Math.round((window.outerHeight - height) / 2) + window.screenY;
	} else if (window.screen.width) {
	    left = Math.round((window.screen.width - width) / 2);
	    top = Math.round((window.screen.height - height) / 2);
	}
	openPaypalWin = window.open('', 'PPDGFrame', 'top=' + top + ', left=' + left + ', width=' + width + ', height=' + height 
			+ ', location=0, status=0, toolbar=0, menubar=0, resizable=0, scrollbars=1');
}

function closePaypalWindow() {
	if (typeof openPaypalWin != 'undefined') {
		openPaypalWin.close();
	}
}

function isSelfIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
    return false;
}

$(document).off('click', '.ysdialog-title-close-btn').on('click', '.ysdialog-title-close-btn', function() {
	$('a').blur();
});
