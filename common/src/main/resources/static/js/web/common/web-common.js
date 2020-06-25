$(function(){
	document.title = removeMtag(document.title);
	
	resizeWebContent();
	//プルダウンメニュー
	$(window).click(function() {
		$(".icon-menu").removeClass("selected");
		$(".ysdropdown").hide();
		if (typeof(disabledBtnFlag) != 'undefined' && disabledBtnFlag) {
			$(".arrow_box").hide();
		}
		else {
			disabledBtnFlag = true;
		}
	});
	
	$("#menu-side").click(function(){
		$(".icon-menu").removeClass("selected");
		$(".arrow_box").hide();
	});
	
	$(document).off('mouseover', ".icon-menu")
	.off('mouseover', '.icon-menu')
	.off('click', '.icon-menu')
	.on('mouseover', ".icon-menu", function() {
		$(this).addClass("over");
	})
	.on('mouseout', ".icon-menu", function() {
		$(this).removeClass("over");
	})
	.on('click', ".icon-menu", function() {
		if($(".arrow_box").css("display")=="block"){
			$(this).removeClass("selected");
			$(".arrow_box").hide();
		}
		else{
			$(this).addClass("selected");
			$(".arrow_box").show();
		}
		return false;
	});
	
	$(".common-mouseover-box").mouseover(function(){
		$(this).addClass("over");
		}).mouseout(function(){
			$(this).removeClass("over");
	});
	
	/*
	$(document).click(function(){
		$(".icon-menu").removeClass("selected");
		if (disabledBtnFlag) {
			$(".arrow_box").hide();
		}
	});
	*/

	//メンバーメニュー（ヘッダーナビゲーション）
	$("#menu-member ul li a").click(function(){
		$("#menu-member ul li a").removeClass("selected");
		$(this).addClass("selected");
	});
	
	//メンバーボタンレイアウト調整
	$("#memberbtn").css("margin-left", $("#mainbtn").innerWidth());
	
	// Prevent double submission.
	$(document).on('click', '.yssubmit', function() {
		var id = $(this).attr('id'), action = $(this).attr('action');
		if (!action) {
			return false;
		}
		if (action) {
			if (typeof window[action] === 'function') {
				var titleHtml = $(this).html();
				setTimeout("waitValidationAndShowHandleMsg('" + id + "')", 300);
				window[action]();
				$(this).attr('action', '');
				setTimeout(function() {
					enableSubmit(id, action, titleHtml);
				}, 1000);
			}
		}
	});
	
	if (typeof CKEDITOR != "undefined") {
		CKEDITOR.on("instanceReady", function(ev) {
			var editor = ev.editor;
			editor.on("blur", function(ev) {
				var oriData = editor.getData(), replData = '';
				if (oriData.indexOf("http:") != -1) {
					replData = oriData.replace(/"http:/gm, "\"https:");
					if (oriData.length != replData.length) {
						editor.setData(replData);	
					}	
				}				
			});
		});
	}
});

function waitValidationAndShowHandleMsg(id) {
	if ($('.formError').length == 0) {
		$('#' + id).html('<span><m>処理中…</m></span>');
	}
}

function enableSubmit(id, action, titleHtml) {
	var obj = $('#' + id);
	if (obj.attr('action') == '') {
		obj.attr('action', action);
		obj.html(titleHtml);
	}
}

function resizeWebContent() {
	if (document.documentElement.scrollHeight === document.documentElement.clientHeight
			&& $('#panel').length > 0 && $('#foot').length > 0) {
		$('#panel').css('min-height', $('#foot').position().top - $('#panel').position().top - 46);
	}
}
	
function setEditorConfig(tenantSignId, language, width, height, toolbarStyle, resize) {
	$('.cke').remove();
	var config = {};
	config.language = language ? language : "en";
	config.width = width ? width : "100%";
	config.height = height ? height : "200px";
	config.resize_enabled = resize ? resize : false;
	config.removePlugins = "elementspath";
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

function setFullEditorConfig(tenantSignId) {
	$('.cke').remove();
	var config = {};
	setFileConfig(config, tenantSignId);
	return config;
}

function setFileConfig(config, tenantSignId) {
	var kcfinderUrl = typeof jzAppVars == 'undefined' ? top.jzAppVars().kcfinderUrl : jzAppVars().kcfinderUrl;
	var domainUrl = top.jzAppVars().domainUrl;
	config.filebrowserBrowseUrl = domainUrl + "/admin/common/image/show-image-setup-init/CKEDITOR?type=files";
	config.filebrowserImageBrowseUrl = domainUrl + "/admin/common/image/show-image-setup-init/CKEDITOR?type=images";
	config.filebrowserFlashBrowseUrl = domainUrl + "/admin/common/image/show-image-setup-init/CKEDITOR?type=flash";
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

/**
 * 閉店メッセージ
 * @param tenantBaseUrl
 */
function openShopPopup(tenantBaseUrl) {
	var showShopCloseUrl = tenantBaseUrl + "/shop_close_message";
	$('#show-shop-close-link').attr("href", showShopCloseUrl);
	$('#show-shop-close-link').YSDialog({iframe: true, dialogTitle: "<m>閉店メッセージ</m>"});
	$('#show-shop-close-link').click();
}

function ysDateFormat(date) {
	var dateArray = date.split('-');
	var date = dateArray[0] + removeMtag('<m>年</m>') + dateArray[1] + removeMtag('<m>月</m>') + dateArray[2] + removeMtag('<m>日</m>');
	return date;
}

$.ajaxSetup({
	cache: false 
});