$(function(){
	$('.menu-hori a').mouseenter(function() {
		$(this).addClass('active');
		var pos = $(this).position();
		$(this).closest('.menu-hori').find('#sub-menu-hori-' + $(this).attr('id')).css({top: '40px', left: pos.left + 'px'}).show();
	})
	.mouseleave(function() {
		if(!$(this).hasClass('selected')) {
			$(this).removeClass('active');
		}
		var that = $(this);
		setTimeout(function() {
			if (!that.closest('.menu-hori').find('#' + that.attr('id')).hasClass('active')) {
				that.closest('.menu-hori').find('#sub-menu-hori-' + that.attr('id')).hide();	
			}
		}, 100);
	});
	
	$('.sub-menu-hori').mouseenter(function() {
		$(this).closest('.menu-hori').find('#' + $(this).attr('data-main-menu-id')).addClass('active');
		$(this).show();
	}).mouseleave(function() {
		$(this).closest('.menu-hori').find('#' + $(this).attr('data-main-menu-id')).removeClass('active');
		$(this).hide();
	});
	
	$('.menu-vert a').click(function() {
		if ($(this).closest('ul').hasClass('submenu')) {
			$(this).parents('.mainmenu').last().find('a:first').click();
			if($(this).attr("href") !== undefined) {
				$(this).closest('ul').hide();
			}
		}
		else {
			$('.menu-vert a.selected').removeClass('selected');
			$(this).addClass('selected');
		}
		
		$('.menu-hori').find('.selected').each(function() {
			$(this).removeClass('active').removeClass('selected');
		});
	});
	
	$('.menu-vert .mainmenu').mouseenter(function() {
		var posX = $(this).width();
		if ($(this).closest('ul').hasClass('submenu')) {
			$(this).find('a:first').addClass('mainmenu-bg2');	
		}
		else {
			$(this).find('a:first').addClass('mainmenu-bg1');
		}
		$(this).find('.submenu:first').css({left: posX + 'px'}).show();
	})
	.mouseleave(function() {
		$(this).find('a:first').removeClass('mainmenu-bg1 mainmenu-bg2');
		$(this).find('.submenu:first').hide();
	});
	
	getSelectedMenu();
	
	setPartCartCss();
	
});

function getSelectedMenu() {
	if ($('#selectedMenuIdAndUrl').val() != null && $('#selectedMenuIdAndUrl').val() != undefined) {
		var selectedMenuIdAndUrl = $('#selectedMenuIdAndUrl').val().split('#');
	}
	if(selectedMenuIdAndUrl !== undefined && selectedMenuIdAndUrl.length > 1) {
		var menuId = selectedMenuIdAndUrl[0],
		    menuUrl = selectedMenuIdAndUrl[1];
		$('.menu-hori').find('#' + menuId).each(function() {
			if($(this).attr('href') !== undefined && ($(this).attr('href') == menuUrl || $(this).attr('href') + '/' == menuUrl || $(this).attr('href')== menuUrl + '/')) {
				$(this).addClass('active').addClass('selected');
			}
		});
		
		$('.menu-vert').find('#' + menuId).each(function() {
			if($(this).attr('href') !== undefined && ($(this).attr('href') == menuUrl || $(this).attr('href') + '/' == menuUrl || $(this).attr('href')== menuUrl + '/')) {
				$(this).addClass('selected');
			}
		});
	}
	$('#selectedMenuIdAndUrl').remove();
}

function setPartCartCss() {
	$('a[id="part-cart-link"]').css({'text-decoration':'none', 'font-weight':'bold', 'padding':'3px 4px 3px 10px', 'display':'block', 'background':'#E6F0F5', 'color':'#000'});
	
	$('a[id="part-cart-link"]').hover(
	    function() {$(this).css('background-color', '#b2d1e0');},
		function() {$(this).css('background-color', '#E6F0F5');}
	);
}

function getPartLogin() {
	$(document).off('click', '.part-login-member-menu-link')
				.on('click', '.part-login-member-menu-link', function() {
		var currentYsdropdownFlag = false;
		if ($(this).next('.ysdropdown')) {
			$(this).append($(this).next('.ysdropdown'));
			$(this).next('.ysdropdown').remove();
		}
		
		if (!$(this).children('.ysdropdown').is(':visible')) {
			currentYsdropdownFlag = true;
		}
		
		$('.ysdropdown').hide();
		
		if (currentYsdropdownFlag) {
			$(this).children('.ysdropdown').toggle();
		}
	});
	
	$(document).click(function (e) {
		if (!$(e.target).hasClass('part-login-member-menu-link')) {
			$('.ysdropdown').hide();
		}
	});
	
	$("#popup-tenantownerinfo").YSDialog({dialogTitle: "<m>テナントオーナー情報</m>"});
	
	var useMyTimezone = getCookie("useMyTimezone");
	if (useMyTimezone == $('#useMyTimezoneYes').val()) {
		$('i[id="use-my-timezone-check"]').css('display','');
	}
	
	/*
	$('a[id="member-menu-my-contact"], a[id="member-menu-my-mail"], a[id="member-menu-my-activity"], a[id="member-menu-my-enquete"], a[id="member-menu-my-payment"],'
	   + ' a[id="member-menu-my-info"], a[id="member-menu-control-center"], a[id="member-menu-mail-address-change"], a[id="member-menu-use-open-sys-msg"],'
	   + ' a[id="member-menu-use-my-timezone-check"], a[id="member-menu-reset-login-setting"], a[id="member-menu-logout"], a[id="member-menu-tenant-base-url"]').click(function() {
		var funcName = $(this).attr('action'), dataOption = $(this).attr('data-option');
		if (funcName) {
			if (dataOption) {
				$(this).closest('.ysdropdown').hide();
				window[funcName](dataOption);
			}
			else {
				window[funcName]();
			}
		}
	});
	*/
}

function showMemberInfoDetails() {
	$('#popup-tenantownerinfo').click();
}

function openAdminPage(url) {
	window.open(url, 'admwin_' + $('#tenantSignId').val());
}

function changeMailAddress() {
	$('#change-mail-address').YSDialog({iframe:true, dialogTitle:'<m>メールアドレスの変更</m>', width:'840px'});
	$('#change-mail-address').click();
}

function openServiceMessages(tenantBaseUrl) {
	if ($('#service-msg').is(":visible")) {
		return;
	}
	
	var serviceMsg = $('#service-msg');
	$.get(tenantBaseUrl + '/top-page/open-service-messages', function() {
		if (serviceMsg.length == 1) {
			$('#service-msg').show();
		}
		else {
			location.reload();
		}
	});
}

function useMyTimezoneCheck() {
	$('#use-my-timezone-link').YSDialog({dialogTitle:'<m>タイムゾーンの設定</m>', width: '400px'});
	$('#use-my-timezone-link').click();
}

function setMyTimeZone(useMyTimezoneFlag, tenantBaseUrl) {
	var useMyTimezoneYes = $('#useMyTimezoneYes').val(),
	    useMyTimezoneNo = $('#useMyTimezoneNo').val(),
	    useMyTimezone = useMyTimezoneNo;
	
	if (useMyTimezoneFlag == useMyTimezoneYes) {
		$('i[id="use-my-timezone-check"]').show();
		setCookie('timezone', jstz.determine().name());
		useMyTimezone = useMyTimezoneYes;
	}
	else if (useMyTimezoneFlag == useMyTimezoneNo) {
		$('i[id="use-my-timezone-check"]').hide();
	}
	setCookie('useMyTimezone', useMyTimezone);
	
	$.get(tenantBaseUrl + '/top-page/setup-my-timezone/' + useMyTimezoneFlag, function(data) {
		location.reload();
	});
}

function getCookie(name) {
    var strcookie = document.cookie;
    var arr = strcookie.split(";");
    for (var i = 0; i<arr.length; i++) {
		var arrStr = arr[i].split("="); 
		if(arrStr[0].trim() == name) {
			return arrStr[1]; 
		}
    }
    return ""; 
}

function setCookie(name, value) {
	var date = new Date("12, 31, 9999");
	document.cookie = name + "=" + value + ";expires=" + date.toGMTString() + ";path=/";
}

function resetLoginSetting(url) {
	$.get(url, function(data) {
		if (data.result == $('#statusSuccess').val()) {
			localStorage.clear();
			localStorage.setItem('nextTimeConfirmOpenPreviewWindowTab', 'Y');
			jzMsgBox('<m>確認メッセージが表示されるよう変更しました</m>', '', '300px');
		}
		else if (data.result == $('#statusError').val()){
			jzMsgBox('<m>処理中エラーが発生しました</m>', 'alert');
		}
		else if (data.result == "session_time_out") {
			top.window.location.href = data._domain + "/jsys/login";
		}
	});
}

function logout(tenantBaseUrl) {
	location.href = tenantBaseUrl + "/logout";
}

function checkSessionTimeout(event, xhr, ajaxOptions) {
    if (xhr.readyState == 4) {
        if(xhr.getResponseHeader("x-session-timeout") != null 
        		&& xhr.getResponseHeader("x-session-timeout").length > 0) {
            top.window.location.href = xhr.getResponseHeader("x-session-timeout-url");
        }
    }
}

function checkNgWord(event, xhr, ajaxOptions) {
    if (xhr.readyState == 4) {
    		if(xhr.getResponseHeader("x-ng-word-found") != null
        		&& xhr.getResponseHeader("x-ng-word-found").length > 0) {
        	top.window.location.href = xhr.getResponseHeader("x-ng-word-found-url")
        	return;
        }
    }
}

function alertConnectionError(xhr) {
	var connErrorDiv = $('#conn-error-div'), errorMsg='', dialogTitle='', connErrorDivCont='';

	$(".ui-dialog").hide();
	$("#YSContainer").hide();
	var domainUrl = top.jzAppVars().domainUrl;
	if (xhr.readyState == 4) {
		if(xhr.getResponseHeader("x-session-timeout") != null
        		&& xhr.getResponseHeader("x-session-timeout").length > 0) {
            return;
        }else if(xhr.getResponseHeader("x-ng-word-found") != null
        		&& xhr.getResponseHeader("x-ng-word-found").length > 0) {
        	top.window.location.href = xhr.getResponseHeader("x-ng-word-found-url")
        	return;
        }else{
    		dialogTitle = 'エラー';
    		errorMsg = xhr.responseText;
        }
	}
	else {
		dialogTitle = '通信エラー';
		errorMsg = '<p>通信に失敗したため、表示できません。しばらく待ってから操作してください。 <br />また、ネットワークが接続していない場合もありますので、接続を確認してください。</p>';
	}
	
	
	if (connErrorDiv.length == 0) {
		connErrorDivCont = '<div id="conn-error-div" class="tx-center ysdialog">';
		connErrorDivCont += '<div style="width: 600px; height: 80px; padding: 10px 15px; padding-left: 100px; text-align: left; margin-bottom: 30px;">';
		connErrorDivCont += '<i style="position: absolute; top:30%; left:50px;" class="fa fa-exclamation-triangle error-msg-icon"></i>';
		connErrorDivCont += errorMsg;
		connErrorDivCont += '</div>';
		connErrorDivCont += '	<ul class="button-group">';
		connErrorDivCont += '		<li><a id="conn-error-close-btn" class="ysdialog-close button recommend" href="javascript:"><span><m>閉じる</m></span></a></li>';
		connErrorDivCont += '	</ul>';
		connErrorDivCont += '</div>';
		connErrorDivCont += '<a id="conn-error-btn" href="#conn-error-div" style="display:none"></a>';
		$('body').append(connErrorDivCont);
		
		$("#conn-error-btn").YSDialog({dialogTitle: dialogTitle});
		$('#conn-error-close-btn').click(function() {
			$("#YSContainer").hide();
			$(".ui-dialog").hide();
		});
	}
	$('#conn-error-btn').click();
}

$.ajaxSetup({
	cache: false, 
	error: function(xhr){alertConnectionError(xhr);} 
});

$(document).ajaxComplete(checkSessionTimeout);
$(document).ajaxComplete(checkNgWord);
$(document).foundation();