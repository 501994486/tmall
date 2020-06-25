$(function() {
	/* Handle login member notice start **/
	handleHomepageNoticeData();
	
	openHomepageNoticeDialog();
	/* Handle login member notice end **/
});

function adminPromtOpen() {
	if ($('#common-data-part').attr('data-domain')) {
		$('#show-admin-prompt-link-popup .close-reveal-modal').click(function() {
			$.get($('#common-data-part').attr('data-domain') + '/toppage/set-common-popup-page/admin');
		});
	}
}

function showAdminPageStyle(openType) {
	if ($('#admin-prompt-notice-homepage-data').attr('data-domain')) {
		if (openType == "window") {
			window.open($('#admin-prompt-notice-homepage-data').attr('data-domain') + "/admin", "cc_" + $('#common-data-part').attr('data-tenantSignId'), "toolbar=yes, resizable=yes, height="+(window.screen.availHeight - 200)+", width="+(window.screen.availWidth - 200)+", top=100,left=100, scrollbars=yes").focus();
		}
		else {
			window.open($('#admin-prompt-notice-homepage-data').attr('data-domain') + "/admin", "cc_" + $('#common-data-part').attr('data-tenantSignId')).focus();
		}
	}
}

function handleHomepageNoticeData() {
	if ($('#notice-homepage-data').length > 0) {
		$('#notice-homepage-data div').each(function() {
			if ($(this).attr('id') == 'agreement-notice-homepage-data') {
				$('body').append('<a id="show-agreement-link" href="'+ $('#agreement-notice-homepage-data').attr('data-domain') + '/web-common/agreement/show-change-agreement-page' + '"></a>');
				$('#show-agreement-link').YSDialog({dialogTitle:"<m>規約の確認</m>", afterOpen: "agreementDialogOpen", afterClose:"dialogClose", width: "630px"});
			}
			else if ($(this).attr('id') == 'notice-notice-homepage-data') {
				$('body').append('<a id="show-notice-link" href="'+ $('#notice-notice-homepage-data').attr('data-domain') + '/web-common/news/popup-news' + '"></a>');
				$("#show-notice-link").YSDialog({dialogTitle:"<m>お知らせ</m>", afterOpen: "noticeDialogOpen",width: "600px", afterClose: "dialogClose"});
			}
			else if ($(this).attr('id') == 'admin-prompt-notice-homepage-data') {
				if ($(this).attr('data-show-admin')) {
					$('body').append('<a id="show-admin-prompt-link" href="'+ $('#admin-prompt-notice-homepage-data').attr('data-domain') + '/show-admin-page-prompt/' + $('#admin-prompt-notice-homepage-data').attr('data-show-admin') + '"></a>');
					$('#show-admin-prompt-link').YSDialog({dialogTitle:'<m>Jimzenコンソールの表示</m>', afterOpen: 'adminPromtOpen', afterClose:"dialogClose"});
				}
				
			}
		});
	}
}

function dialogClose() {
	var agreementLogoutFlag = 'NO';
	if ($('#agreementLogoutFlag').length > 0) {
		agreementLogoutFlag = $('#agreementLogoutFlag').val();
	}
	if (agreementLogoutFlag == 'NO') {
		removeHomepageNoticeData();
		openHomepageNoticeDialog();
	}
}

function removeHomepageNoticeData() {
	var removeHomepageNoticeDataObj = $('#notice-homepage-data').find('div:first');
	if ($(removeHomepageNoticeDataObj).attr('id') == 'notice-notice-homepage-data') {
		var noticeStr = $('#notice-notice-homepage-data').attr('data-notice-id');
		var noticeArr = noticeStr.split(',');
		var noticeId = noticeArr[0]; 
		if ($('#showNoticeFlag').prop("checked")) {
			$.get($('#notice-notice-homepage-data').attr('data-domain') + "/web-common/news/add-news-read?${_csrf.parameterName}=${_csrf.token}", {noticeId: noticeId}, function(data) {
				if (data.result == 'ERROR'){
					jzMsgBox('<m>処理中エラーが発生しました。</m>', 'alert');
				}
			});
		}
		
		var newNoticeIdStr = '';
		for(var i = 1;i < noticeArr.length; i++) {
			newNoticeIdStr = newNoticeIdStr + ',' + noticeArr[i]; 
		}
		newNoticeIdStr = newNoticeIdStr.substring(1);
		$('#notice-notice-homepage-data').attr('data-notice-id',newNoticeIdStr);
		if (newNoticeIdStr == '') {
			removeHomepageNoticeDataObj.remove();
			$('#show-notice-link').remove();
		}
	}
	else {
		if ($(removeHomepageNoticeDataObj).attr('id') == 'agreement-notice-homepage-data') {
			$('#show-agreement-link').remove();
		}
		else if ($(removeHomepageNoticeDataObj.attr('id') == 'admin-prompt-notice-homepage-data')) {
			$('#show-admin-prompt-link').remove();
		}
		removeHomepageNoticeDataObj.remove();
		
	}
}

function openHomepageNoticeDialog() {
	var homepageNoticeDataObj = $('#notice-homepage-data').find('div:first');
	if ($(homepageNoticeDataObj).attr('id') == 'agreement-notice-homepage-data') {
		$('#show-agreement-link').click();
	}
	else if ($(homepageNoticeDataObj).attr('id') == 'notice-notice-homepage-data') {
		var noticeIdStr = $(homepageNoticeDataObj).attr('data-notice-id');
		var noticeIdArr = noticeIdStr.split(',');
		var href = $("#show-notice-link").attr('href');
		var ahref = href + '/' + noticeIdArr[0] + '/auto';
		$("#show-notice-link").attr('href',ahref);
		$("#show-notice-link").click();
		$("#show-notice-link").attr('href',href);
	}
	else if ($(homepageNoticeDataObj).attr('id') == 'admin-prompt-notice-homepage-data') {
		if ($('#admin-prompt-notice-homepage-data').attr('data-show-admin')) {
			$("#show-admin-prompt-link").click();
		}
		else if ($('#admin-prompt-notice-homepage-data').attr('data-open-flag')) {
			$.get($('#admin-prompt-notice-homepage-data').attr('data-domain') + '/toppage/set-common-popup-page/admin');
			showAdminPageStyle("tab");
			$('#admin-prompt-notice-homepage-data').remove();
		}
	}
}
function setCkEditDefaultCss(config, urlArray){
	config.contentsCss = urlArray;
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
