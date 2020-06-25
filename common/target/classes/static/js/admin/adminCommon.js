$.valHooks.textarea = {
    get: function(element) {
    	let value = element.value;
    	if (typeof value != 'undefined') {
    		value = getTextareaValWithCRLF(value);
    	}
        return value;
    }
};

function getTextareaValWithCRLF(text) {
	return text.replace(/\r/g, '').replace(/\n/g, '\r\n');
}

$(function(){
	/*
	if ($("#panel").length > 0 && $("#panel").height() < $(window).height() - 210) {
		if ($("#navi-sub").length > 0) {
			$("#panel").css({"min-height": $(window).height() - 210});
		}
		else {
			$("#panel").css({"min-height": $(window).height() - (210 - 43)});
		}
	}
	*/

	// Create variables dynamically for preventing double submission.
	//createDynamicSubmitBtn();

	// Prevent double submission.
	$(document).on('click', '.yssubmit', function() {
		var id = $(this).attr('id'), action = $(this).attr('action');
		if (!action || $(this).hasClass('btn-disabled')) {
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

	// Handle the logout button at the header.
	//$("#logout-btn").YSDialog({dialogTitle: "<m>ログアウト</m>"});
	$("#logout-btn").YSModalDialog({dialogTitle: "<m>ログアウト</m>"});

	if($.fn.containedStickyScroll) {
		if ($('.stickyscroll').length > 0) {
			$('.stickyscroll').containedStickyScroll();
		}
		else if($('#YSContainer').length > 0) {
		//	$('#YSContainer').containedStickyScroll();
		}
	}

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

	$(".common-mouseover-box").mouseover(function(){
		$(this).addClass("over");
		}).mouseout(function(){
			$(this).removeClass("over");
	});

	$(document).click(function() {
		$(".grid-top-menu a").removeClass("selected");
		$('.grid-top-menu-box').hide();
	});

    $(document).on('mouseenter', '.grid-top-menu a', function() {
    	$(this).removeClass("over");
	}).on('mouseleave', '.grid-top-menu a', function() {
		$(this).addClass("over");
	}).on('click', '.grid-top-menu a', function() {
		$(document).click();
		if($(".grid-top-menu-box").css("display")=="block"){
			$(this).removeClass("selected");
			$(".grid-top-menu-box").hide();
		}else{
			$(this).addClass("selected");
			$(".grid-top-menu-box").show();
		}
		return false;
	});

    if ($('#right-panel').length > 0 && $('#right-panel').length > 0 && $('.jstree').length > 0){
    	
	    if($('.jstree-wrap').length > 0){
	    	justPostitionTreeArrow();
	    }
	    
	    $('.jstree').on('loaded.jstree',function(){
	    	justPostitionTreeArrow();
	    	$('.jstree-wrap').on('scroll', function(){
	 	    	justPostitionTreeArrow();
	 	    });
	    	
	    }).on('select_node.jstree after_open.jstree after_close.jstree',function(){
	    	justPostitionTreeArrow();
	    	setTimeout(justPostitionTreeArrow, 100);
	    });
	      
	    $('#left-panel, #prce').on('click dblclick',  function(){
	    	justPostitionTreeArrow();
	    })
	    
	    $(window).resize(function(){
	    	justPostitionTreeArrow();
	    });

	}
    
});

function waitValidationAndShowHandleMsg(id) {
	if ($('.formError').length == 0) {
		$('#' + id).html('<span><m>処理中…</m></span>');
	}
}

/*
function createDynamicSubmitBtn() {
	$('.yssubmit').each(function(index) {
		var id = $(this).attr('id'),
			action = $(this).attr('action'),
			title = $(this).html();

		if ($(this).attr('id') && $(this).attr('action')) {
			var submitBtn = $(this).attr('id').replace(/-/g, '');
			window[submitBtn] = {
				"id": id,
				"action": action,
				"title": title
			};
		}
	});
}
*/

function enableSubmit(id, action, titleHtml) {
	var obj = $('#' + id);
	if (obj.attr('action') == '') {
		obj.attr('action', action);
		obj.html(titleHtml);
	}
}

function setEditorConfig(tenantSignId, language, width, height, toolbarStyle, resize, dontCleanCkeFlag) {
//	var config = {};
//	config.language = language ? language : "en";
//	config.width = width ? width : "100%";
//	config.height = height ? height : "200px";
//	config.resize_enabled = resize ? resize : true;
//	config.removePlugins = "elementspath";
//	config.autoParagraph = false;
//	config.toolbar = [
//	                  	['Styles', 'Format'],
//	                  	['NumberedList', 'BulletedList'],
//	                  	['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
//	                  	['Source'], ['Maximize'],
//	                  	'/',
//	                  	['Font', 'FontSize'],
//	                  	['TextColor', 'BGColor'],
//	                  	['Bold', 'Italic', 'Underline', 'Strike'],
//	                  	['Link','Image','Table']
//	                  ];

//	if (toolbarStyle == "extendForm") {
//		config.resize_enabled = true;
//		config.toolbar = [
//		          ['Styles','Format'],
//		          ['Bold','Italic','Underline','Strike'],
//		          ['NumberedList','BulletedList'],
//		          ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
//		          '/',
//		          ['Font','FontSize'],
//		          ['TextColor','BGColor'],
//		          ['Link','Image','Table']
//		         ];
//	}
//	setFileConfig(config, tenantSignId);
//	return config;
	return setAutoGrowEditorConfig(tenantSignId);

}

function setFullEditorConfig(tenantSignId) {
	$('.cke').remove();
	var config = {
			width: '100%',
			font_names: 'ＭＳ ゴシック; ＭＳ Ｐゴシック; ＭＳ 明朝; ＭＳ Ｐ明朝; メイリオ; Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif;',
			toolbarCanCollapse: true,
	};

	setFileConfig(config, tenantSignId);
	return config;
}

function setAutoGrowEditorConfig(tenantSignId) {
	var config = {
		extraPlugins: 'autogrow,ysLineHeight',
		//removePlugins: 'resize',
		autoGrow_onStartup : true,
		allowedContent : true,
		font_names: 'ＭＳ ゴシック, sans-serif; ＭＳ Ｐゴシック, sans-serif; ＭＳ 明朝, sans-serif; ＭＳ Ｐ明朝, sans-serif; メイリオ, Meiryo, sans-serif; Arial, Helvetica, sans-serif;',
		format_tags : "p;div_summary;h2;div_h2;h3;div_h3;h4;div_h4;h5;div_h5",
	    format_p : {element: "p", attributes: { 'class': 'cke-fmt' }},
	    format_div_summary : {element: "p", attributes: { 'class': 'cke-fmt-summary' }},
	    format_h2 : {element: "h2", attributes: { 'class': 'cke-fmt-h2' }},
	    format_div_h2 : {name: "概要 2", element: "p", attributes: { 'class': 'cke-fmt-h2-content' }},
	    format_h3 : {element: "h3", attributes: { 'class': 'cke-fmt-h3' }},
	    format_div_h3 : {name: "概要 3", element: "p", attributes: { 'class': 'cke-fmt-h3-content' }},
	    format_h4 : {element: "h4", attributes: { 'class': 'cke-fmt-h4' }},
	    format_div_h4 : {name: "概要 4", element: "p", attributes: { 'class': 'cke-fmt-h4-content' }},
	    format_h5 : {element: "h5", attributes: { 'class': 'cke-fmt-h5' }},
	    format_div_h5 : {name: "概要 5", element: "p", attributes: { 'class': 'cke-fmt-h5-content' }},
	    coreStyles_bold : {element: 'strong',  attributes : { 'class' : 'cke-fmt-strong' }},
	};
	
	CKEDITOR.on( 'instanceReady', function( evt ) {
	
		
		editor.on('change',function(event){
			var $body = $(editor.document.getBody().$);
			var elements = $body.children();
			if(elements.length > 0){
				var tagClass = elements.first().attr("class") || "";				
				
				for ( var i = 1; i < elements.length; ++i ) {
					var $c = elements.eq(i);
					var cTagClass = $c.attr("class")  || "";//.match(/cke\-fmt\-h[2-5]\-content/g).join(",");
					
					if(cTagClass.replace(/[ ]|(cke\-fmt\-last)/g,"") != tagClass.replace(/[ ]|(cke\-fmt\-last)/g,"")){
						elements.eq(i - 1).addClass("cke-fmt-last");
						tagClass = cTagClass;
					}else if(elements.eq(i - 1).hasClass("cke-fmt-last")){
						elements.eq(i - 1).removeClass("cke-fmt-last");
					}
					
				}
				elements.last().addClass("cke-fmt-last");
			}
			
		});
		
	    editor.on('afterCommandExec', function( event ){     
	    	   
				if( event.data.name == 'bulletedlist' || event.data.name == 'numberedlist' ) {
					var s = $(editor.getSelection().getStartElement().$);
					if(s.prop("tagName")=="LI" || s.parent("li").length || s.parent().parent("li").length){
						s.closest("ul, ol").addClass("cke-fmt-list").addClass(s.attr("class"));
						/*
						s.closest(".cke-fmt-list").children("li").each(function(){
							if(($(this).attr("class") || "").indexOf("cke-fmt-")>=0){
								if($(this).children('[class^="cke-fmt-"]').length){
									var html = $(this).children('[class^="cke-fmt-"]').html();
								}else{
									var html = $(this).html();
								}
								if(html != null && html != ""){
									$(this).html('<p class="'+$(this).attr("class")+'">'+html+'</p>');
								}
							}else{
								$(this).addClass(s.attr("class"));
							}
						});
						*/
						
					}
				}
	       }, null, null, 100);
	});
	
	setFileConfig(config, tenantSignId);
	return config;
}

function setEmailAutoGrowEditorConfig(tenantSignId) {
	var config = {
			extraPlugins: 'autogrow,ysLineHeight',
			//removePlugins: 'resize',
			autoGrow_onStartup : true,
			allowedContent : true,
		    enterMode : CKEDITOR.ENTER_DIV,
		    shiftEnterMode : CKEDITOR.ENTER_DIV,
		    format_tags : "div;h1;h2;h3;h4;h5;h6;pre;address",
		    format_div : {element: "div"},
		    format_pre : {element: "pre"},
		    format_address : {element: "address"},
		    format_h1 : {element: "h1"},
		    format_h2 : {element: "h2"},
		    format_h3 : {element: "h3"},
		    format_h4 : {element: "h4"},
		    format_h5 : {element: "h5"},
		    format_h6 : { element: "h6"}
	};
	setFileConfig(config, tenantSignId);
	return config;
}

function setPersonalEditorConfig(tenantSignId) {
	$('.cke').remove();
	var config = setFullEditorConfig(tenantSignId);
	config.autoParagraph = false;
	config.extraPlugins += ",ysBodyProperty,ysLineHeight";
	config.allowedContent=true; // Close Target Filtering
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

function setCkEditDefaultCss(config, urlArray){
	config.contentsCss = urlArray;
	return config;
}

function textareaToCkeditor(data) {
	data = data.replace(/\r\n|\r|\n/g, "<br>");
	return htmlEscapeWithoutBrTag(data);
}

function ckeditorToTextarea(data) {
	return htmlDecode(data);
}

function checkSessionTimeout(event, xhr, ajaxOptions) {
    if (xhr.readyState == 4) {
        if(xhr.getResponseHeader("x-session-timeout") != null
        		&& xhr.getResponseHeader("x-session-timeout").length > 0) {
            top.window.location.href = xhr.getResponseHeader("x-session-timeout-url");
        }
    }
}

function alertConnectionError(jqXhr) {
	var connErrorDiv = $('#conn-error-div'), errorMsg='', dialogTitle='', connErrorDivCont='';
	$(".ui-dialog").hide();
	$("#YSContainer").hide();
	var domainUrl = top.jzAppVars().domainUrl, isAdminError500 = false;

	if (jqXhr.readyState == 4) {
		if (jqXhr.status == 403) {
			var locationInfo = top.location.href.split('/');
			if (top.location.href.indexOf('admin') != -1) {
				top.location.href = domainUrl+'/jsys/login/session-timeout?targetUrl='+domainUrl+'/admin';
			}
			else {
				top.location.href = domainUrl+'/jsys/login/session-timeout';
			}
			return;
		}
		dialogTitle = 'エラー';
		errorMsg = jqXhr.responseText;
		isAdminError500 = true;
	}
	else {
		dialogTitle = '通信エラー';
		errorMsg = '<p style="margin-top: 26px; font-size: 18px;">通信に失敗したため、表示できません。しばらく待ってから操作してください。 <br />また、ネットワークが接続していない場合もありますので、接続を確認してください。</p>';
	}

	if (isAdminError500) {
		$('body').append(errorMsg);
	}
	else {
		if (connErrorDiv.length == 0 && $.ui) {
			connErrorDivCont = '<div id="conn-error-div" class="tx-center ysdialog">';
			connErrorDivCont += '<div style="width: 780px; height: 100px; padding: 20px; text-align: left;">';
			connErrorDivCont += '<i style="float: left; margin-top: 35px; margin-left: 10px;" class="fa fa-exclamation-triangle error-msg-icon"></i>';
			connErrorDivCont += '<div style="margin-left: 60px;">' + errorMsg + '</div>';
			connErrorDivCont += '</div>';
			connErrorDivCont += '<div class="btn">';
			connErrorDivCont += '	<ul>';
			connErrorDivCont += '		<li><a id="conn-error-close-btn" class="ysdialog-close recommend" href="javascript:"><span><m>閉じる</m></span></a></li>';
			connErrorDivCont += '	</ul>';
			connErrorDivCont += '</div>';
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
}

function ysDateFormat(date) {
	var dateArray = date.split('-');
	var date = dateArray[0] + removeMtag('<m>年</m>') + dateArray[1] + removeMtag('<m>月</m>') + dateArray[2] + removeMtag('<m>日</m>');
	return date;
}

function bytes2(str) {
    return(encodeURIComponent(str).replace(/%../g,"x").length);
}

function addPrefixZero(number) {
	if (parseInt(number) < 10) {
		number = "0" + number;
	}
	return number;
}

// web site display timeFrom change
function setEndTimeTo() {
	return true;
}

$.ajaxSetup({
	cache: false,
	error: function(jqXhr){alertConnectionError(jqXhr);}
});

$(document).ajaxComplete(checkSessionTimeout);

function focusItemNameCreated(itemId) {
	if (globalVar.createClickFlag) {
		$('.check-save-excepted').find('#' + itemId).select();
		globalVar.createClickFlag = false;
	}

}

function showYSContainerCreated(treeId,nodeId) {
	if (nodeId != '') {
		setTimeout(function() {
			$('#' + treeId).jstree('deselect_all');
			$('#'+ nodeId + ' a').click();
		}, 1000);
	}
}

function showParentNodeInfo(treeId,nodeId) {
	if (nodeId != '') {
		setTimeout(function() {
			$('#' + treeId).jstree('deselect_all');
			$('#'+ nodeId).find('a').eq(0).click();
		}, 1000);
	}
}

function validationFormCkeditor(formId) {

	if ($('#' + formId + ' .formError').length > 0) {
		$('#' + formId + ' .formError').each(function() {
			$(this).remove();
		});

		setTimeout(function() {
			$("#" + formId).validationEngine('validate');

			if ('enquete-setup-form' == formId) {
				registerationTitleValidate();
				checkGuidanceNum();
				checkRewardNum();
			}
		},100);
	}
}

function YSLoadingStart(message) {
	$.blockUI({
		baseZ: 9999999,
		message: '<table><tr><td style="padding-left: 16px;">' + message
				+ "</td></tr></tbody></table>",
		overlayCSS: {
			backgroundColor: '#616161',
			opacity: '0.6'
		},
		css: {
			backgroundColor: "#fff",
			border: "3px solid #aaa",
			color: "##616161",
			cursor: "default",
			left: "45%",
			margin: 0,
			padding: "40px 40px 40px 30px",
			textAlign: "center",
			top: "45%",
			width: "auto"
		}
	});

	YSLoadingStartTimer();
}

var ysLoadingStopFlag = true;
function YSLoadingStop(options) {
	if (ysLoadingStopFlag) {
		$.unblockUI();
	}
	else {
		setTimeout('YSLoadingStop()', 300);
	}
}

function YSLoadingStartTimer() {
	ysLoadingStopFlag = false;
	setTimeout('YSLoadingStopTimer()', 1500);
}

function YSLoadingStopTimer() {
	ysLoadingStopFlag = true;
}

var startCheckLinkClick = false;
var _authSetInited = true;
var _authResourceIds = null;
var _authResourceIdsBySet = null;
var _authResourceIdsByPreset = null;
var _authObjectNames, _authObjectHelps;

function stopCheckLinkClick(){
	startCheckLinkClick = false;
	$('.check-save-excepted').closest("#yscontainer-wrap,.iziModal-wrap").find(".save-btn.is-actived:visible").each(function(){
		$(this).removeClass("is-actived").addClass("is-disabled");
		if($(this).attr("data-disabled-html")){
			if(!$(this).attr("data-actived-html")){
				$(this).attr("data-actived-html", $(this).children("span").html());
			}
			$(this).children("span").html($(this).attr("data-disabled-html"));
		}
	});

}

function initCheckLinkClick(container, element){
	if($('.check-save-excepted').length > 0){
		startCheckLinkClick = true;
		$('.check-save-excepted').closest("#yscontainer-wrap,.iziModal-wrap").find(".save-btn.is-disabled:visible").each(function(){
			$(this).removeClass("is-disabled").addClass("is-actived");
			if($(this).attr("data-actived-html")){
				if(!$(this).attr("data-disabled-html")){
					$(this).attr("data-disabled-html", $(this).children("span").html());
				}
				$(this).children("span").html($(this).attr("data-actived-html"));
			}
		});
		
		if(container){
	
			if(element){
				$target = $(container + " " + element);
			}else{
				$target = $(container +" a");
			}
			
		}else{

			$('.check-save-excepted #save-btn, .tab-save-btn').each(
					function(){
						$(this).click('click',
						function(){
							stopCheckLinkClick();
						});
					});

			$(".add-new-tree-node-btn").click(
					function(){
						setTimeout(function(){
							initCheckLinkClick(".ysdropdown");
						},100);
					}
				);

			$("#js-tree-menu").mousedown(
					function(){
						setTimeout(function(){
							$("#vakata-contextmenu a").each(
								function(){
									if($(this).hasClass('bindedClickCheck')) return;
									$(this).on('mouseup', async function(event) {
										if (startCheckLinkClick){
									    	event.stopPropagation();
									    	event.preventDefault();
										}
									    if (!startCheckLinkClick || await checkLinkClick()) {
									    	if(startCheckLinkClick){
									    		stopCheckLinkClick();
									    		$(this).removeClass('bindedClickCheck');
									    		$(this).mouseup();
									    	}
									    	return true;
									    }else{
									    	return false;
									    }
									});
									$(this).addClass('bindedClickCheck');
								}
							);
						},100);
					}
				);

			$target = $("a");
		}

		$target.each(
			function(){
				var $this = $(this);
				if($this.hasClass("bindedClickCheck")
					|| $this.hasClass("ui-dialog-titlebar-close")
					|| $this.hasClass("tab-save-btn")
					|| ($this.closest("#navi-main").length && $("#navi-main .navi-arrow-box#" + $this.attr("id") + "-box" ).length)
					|| $this.closest(".check-save-excepted, .ctrl-area, .link-trigger-excepted, .cke_toolbar").length){
					return;
				}

				var script = $this.attr("onclick");
				if(script){
					if(script.indexOf("doCheckLinkClick")<0){
						//$(this).attr("onclick","doCheckLinkClick(event,\""+script.replace('"',"&quot;")+"\");" + script);
						$this.attr("onclick","doCheckLinkClick(this,\""+script.replace('"',"&quot;")+"\")");
						//$(this).attr("onclick","previewDelay()");
					}
				}

				var events = $._data($this[0], "events");

				if(!events && !element) return;

				var originalHandlerClone = null;
				if(events){
					var originalHandler = events.click;
					if(!originalHandler){
						return;
					}
					originalHandlerClone = $.extend(true, [], originalHandler);
				}
				
				$this.off('click');
				$this.on('click', async function(event) {
					if (startCheckLinkClick){
				    	event.stopPropagation();
				    	event.preventDefault();
					}
				    if (!startCheckLinkClick || await checkLinkClick()) {
				    	//$.each(fs,function(index){
				    	//	fs[index](event);
				    	//});
				    	$._data($(this)[0], "events").click = originalHandlerClone;
				    	$(this).click();
				    	stopCheckLinkClick();
				    	$(this).removeClass('bindedClickCheck');
				    	return true;
				    }else{
				    	return false;
				    }
				});
				$this.addClass('bindedClickCheck');
			}
		);
	}
}
/*
async function doCheckLinkClick(event, script){
	if (startCheckLinkClick) {
		if(script.replace("javascript:","").replace("void(0)","").length < 3){
			return true;
		}
		
		event.stopPropagation();
		event.preventDefault();
	}	
	if (!startCheckLinkClick || await checkLinkClick()) {
		stopCheckLinkClick();
		event.click();
		return true;
	}else{
		return false;
	}
	
	return true;
}
*/
async function doCheckLinkClick(_this, script){
	 if (!startCheckLinkClick || await checkLinkClick()) {
		 if(script){
			 script.replace(/\([^'^\"]*this[^'^\"]*\)/,function (match) {
	                return match.replace("this","_this"); 
	            });
			 eval(script);
			 stopCheckLinkClick();
		 }
		 return true;
	 }else{
		 return false;
	 }
}

var clickCheckOKLastTime=0;
var clickCheckCancelLastTime=0;
async function checkLinkClick(){
	var currendTime = new Date();
	if(currendTime.getTime() <= clickCheckCancelLastTime + 500){
        clickCheckCancelLastTime = (new Date()).getTime();
		return false;
	}
	if(currendTime.getTime() <= clickCheckOKLastTime + 500){
		clickCheckOKLastTime = (new Date()).getTime();
		return true;
	}
	var result = await openConfirm(cautionMsg("C_00000_999"));
	if(result){
		clickCheckOKLastTime = (new Date()).getTime();
		return true;
	}else{
        clickCheckCancelLastTime = (new Date()).getTime();
        return false;
	}

}

function clearTargetAuth(){
	_authSetInited = true;
	_authResourceIds = null;
	_authResourceIdsBySet = null;
	_authResourceIdsByPreset = null;
	_authObjectNames = {};
	_authObjecthelps = {};
}

function taregetAuthKey(objId, authRel="default"){
	return (objId+"-").split("-")[0] +  "+" +  authRel;
}

function getTargetAuth(objId, authRel="default"){
	if(_authResourceIds == null){
		return "";
	}else if(_authResourceIds[taregetAuthKey(objId, authRel)]){
		return _authResourceIds[taregetAuthKey(objId, authRel)];
	}else{
		return "";
	}
}

function setTempTargetAuth(objId, authRel, auth){
	if(_authResourceIds == null){
		_authResourceIds = {};
	}
	_authResourceIds[taregetAuthKey(objId, authRel)] = auth;
}

function getTargetAuthBySet(objId, authRel = "default"){
	if(_authResourceIdsBySet == null){
		return "";
	}else if(_authResourceIdsBySet[taregetAuthKey(objId, authRel)]){
		return _authResourceIdsBySet[taregetAuthKey(objId, authRel)];
	}else{
		return "";
	}
}

function setTempTargetAuthBySet(objId, authRel, auth){
	if(_authResourceIdsBySet == null){
		_authResourceIdsBySet = {};
	}
	_authResourceIdsBySet[taregetAuthKey(objId, authRel)] = auth;
}

function isTargetAuthByBaseSet(objId, authRel){
	var preset = getTargetAuth(objId, authRel);
	if (preset && preset.match(/ps([0-9]*)#/) && preset.match(/ps([0-9]*)#/)[1] < 10000 ){
		return true;
	}
	return false;
}

function getTargetAuthByPreset(objId, authRel){
	if(!authRel) var authRel = "default";
	if(_authResourceIdsByPreset == null){
		return "";
	}else if(_authResourceIdsByPreset[taregetAuthKey(objId, authRel)]){
		return _authResourceIdsByPreset[taregetAuthKey(objId, authRel)];
	}else{
		return "";
	}
}

function setTempTargetAuthByPreset(objId, authRel, auth){
	if(_authResourceIdsByPreset == null){
		_authResourceIdsByPreset = {};
	}
	_authResourceIdsByPreset[taregetAuthKey(objId, authRel)] = auth;
}

function getTargetObjectName(objId, authRel){
	if(!authRel) var authRel = "default";
	var authKey = taregetAuthKey(objId, authRel);
	if(_authObjectNames == null){
		return "";
	}else if(_authObjectNames[authKey]){
		if(_authObjectNames[authKey].indexOf("#")==0 && $(_authObjectNames[authKey]).length){
			return $(_authObjectNames[authKey]).val() || $(_authObjectNames[authKey]).text();
		}
		return _authObjectNames[authKey];
	}else{
		return "";
	}
}

function setTargetObjectName(objId, authRel, objectName){
	if(_authObjectNames == null){
		_authObjectNames = [];
	}
	_authObjectNames[taregetAuthKey(objId, authRel)] = objectName;
}

function getTargetObjectHelp(objId, authRel){
	if(!authRel) var authRel = "default";
	if(_authObjectHelps == null){
		return "";
	}else if(_authObjectHelps[taregetAuthKey(objId, authRel)]){
		return _authObjectHelps[taregetAuthKey(objId, authRel)];
	}else{
		return "";
	}
}

function setTargetObjectHelp(objId, authRel, objectName){
	if(_authObjectHelps == null){
		_authObjectHelps = [];
	}
	_authObjectHelps[taregetAuthKey(objId, authRel)] = objectName;
}


function initTargetAuth(objId, authRel){
	console.log("initTargetAuth auth type= " + authRel);
	
	var	memberTabParamsJSON = {pageNum:1,
		       rowNumPerPage: 25,
		       sidx:'mail',
		       sord:'asc',
		       pageSearchParam : JSON.stringify({objectExceptedAuthType: '',
												 authList: authRel,
												 isSearchFlag:0,
												 searchColumns: ''
												}),
		      };
	localStorage.setItem('memberTabParams', JSON.stringify(memberTabParamsJSON));
	if(!authRel) var authRel = "default";
	if(_authSetInited){
		_authSetInited = false;
		_authResourceIds = _authResourceIds || {};
		$(window).off('message.targetAuth')
		$(window).on('message.targetAuth', function(event){
			console.log("origin:" + event.originalEvent.origin + " data:" +  event.originalEvent.data);
			
			if (top.jzAppVars().domainUrl.indexOf(event.originalEvent.origin) != 0) return;
			
			initCheckLinkClick();
			var _objId = event.originalEvent.data.split(":")[0].split("+")[0];
			var _authRel = event.originalEvent.data.split(":")[0].split("+")[1];
			var _authList = event.originalEvent.data.split(":")[1];
			
			console.log("receviceMessage auth id=" + _objId +" type=" + _authRel +" list=" + _authList);
			
			if(_authList.indexOf("clear")>=0 && _authList.match(/ps[0-9]+#Y/) != null){
				setTempTargetAuth(_objId, _authRel, _authList);
				setTempTargetAuthByPreset(_objId, _authRel, getTargetAuth(objId, _authRel) );
			}else{
				setTempTargetAuth(_objId, _authRel, updateAuthResourceIds(getTargetAuthBySet(_objId, _authRel), _authList));
				
				if(getTargetAuth(_objId, _authRel).indexOf("gu0#Y")>=0 
					|| getTargetAuth(_objId, _authRel).indexOf("take")>=0
					|| getTargetAuth(_objId, _authRel).match(/ps[0-9]+#Y/) != null){
					
				}else{
					setTempTargetAuthBySet(objId, _authRel, getTargetAuth(_objId, _authRel) );
				}
			}
			console.log("receviceMessage auth id=" + _objId +" type=" + _authRel +" list=" + getTargetAuth(_objId, _authRel));
			if($(`[name="${objId + "-" + _authRel}"]`).length){
				$(`[name="${objId + "-" + _authRel}"]`).closest(".target-set-area").change();
			}
		});
	}
	if($('#YSDialogIframe').find('iframe')[0]){
		//$('#YSDialogIframe').closest('.ui-dialog').find(".ui-dialog-titlebar-close").hide();
		if (isTargetAuthByBaseSet(objId, authRel)){
			var postObj = {authList: _authResourceIdsBySet[taregetAuthKey(objId, authRel)], objectName: getTargetObjectName(objId, authRel)};
			//setTempTargetAuthByPreset(objId, authRel, "");
		}else{
			var postObj = {authList: _authResourceIds[taregetAuthKey(objId, authRel)], objectName: getTargetObjectName(objId, authRel)};
		}
		
		$('#YSDialogIframe').find('iframe')[0].contentWindow.postMessage(JSON.stringify(postObj), top.jzAppVars().domainUrl);
	}
}
function updateAuthResourceIds(oldAuth,newAuth){
	if(!oldAuth){
		return newAuth;
	}else if(!newAuth){
		return oldAuth;
	}else if(newAuth.indexOf("clear")>=0){
		return newAuth;
	}
	else{
		var newAuthArr = newAuth.split(',');
		var oldAuthArr = oldAuth.split(',');

		var resAuthStr = newAuthArr.shift();
		oldAuthArr.shift();

		var oldAuthObj = {};
		for(var auth,i=0; auth=oldAuthArr[i]; i++){
			var authArr = auth.split('#');
			oldAuthObj[authArr[0]]=(authArr.length>1?authArr[1]:"");
		}
		var newAuthObj = {};
		for(var auth,i=0; auth=newAuthArr[i]; i++){
			var authArr = auth.split('#');
			newAuthObj[authArr[0]]=(authArr.length>1?authArr[1]:"");
			if(oldAuthObj[authArr[0]] == null){
				oldAuthArr.push(auth);
			}
		}

		for(var auth,i=0; auth=oldAuthArr[i]; i++){
			var authArr = auth.split('#');
			var newAuth = "";
			if(resAuthStr){
				resAuthStr = resAuthStr + ",";
			}
			if(newAuthObj[authArr[0]]!=null){
				resAuthStr = resAuthStr + authArr[0] + (newAuthObj[authArr[0]]?("#" + newAuthObj[authArr[0]]):"");
			}else{
				resAuthStr = resAuthStr + auth;
			}
		}
		return resAuthStr;
	}
}

function setTargetAuth(authRel,objectId,callback){
	var authResourceIds = getTargetAuth(objectId, authRel)
	if(!authResourceIds){
		return;
	}

	var domainUrl = top.jzAppVars().domainUrl;
	var URL = domainUrl + '/admin/common/target/update-auth-and-guest-by-objectid/target-'+authRel+'-' + objectId;
	$.post( URL,
		{
			objectId : objectId,
			objectAuthType : authRel,
			authList : authResourceIds.toString()
		},
		function(data) {
			if(data.result){
				if(callback) callback(data.result);
				clearTargetAuth();
			}
		}
	);
}

function adminAuthCheck(checkUrl, targetUrl) {
	var test = ajaxAuthCheck(checkUrl, targetUrl);
	if(test.indexOf("OK") >= 0){
		location.href = targetUrl;
	}else if(test.indexOf("NG") >= 0){
		//jzMsgBox(warningMsg("W_10001_002"), 'alert');
		jzMsgBox('<m>権限がないため、操作できません</m>', 'alert')
	}
}

function ajaxAuthCheck(checkUrl, targetUrl) {
    var result = $.ajax({
    	url : checkUrl,
        type :'POST',
        dataType : 'text',
        data : {url : targetUrl},
        timeout : 15000,
        async: false
    }).responseText;
    return result;
}

function adminAuthCheck2(checkUrl, targetUrl){
	var result = false;
	var test = ajaxAuthCheck(checkUrl, targetUrl);
	if(test.indexOf("OK") >= 0){
		result = true;
	}else{
		jzMsgBox('<m>権限がないため、操作できません</m>', 'alert')
	}
	return result;
}

function showFirstErrorWarning() {
	if ($(".formErrorContent:eq(0)").offset()) {
		var select;
		if ($(".formErrorContent:eq(0)").parent("div").next()[0].tagName == "DIV" || $(".formErrorContent:eq(0)").parent("div").next()[0].tagName == "SPAN") {
			select = $(".formErrorContent:eq(0)").parent("div").next().children(":eq(0)");
			select.focus();
		}
		else {
			select = $(".formErrorContent:eq(0)").parent("div").next();
			select.focus();
		}
		/*if ($(window).scrollTop() < ($(".formErrorContent:eq(0)").offset().top + $(".formErrorContent:eq(0)").outerHeight()-100)
				|| ($(window).scrollTop() + $(window).height()) < ($(".formErrorContent:eq(0)").offset().top)) {
			return;
		}
		window.scrollTo(0,$(".formErrorContent:eq(0)").offset().top-100);*/
	}
}
$(document).on("click","a[id$='-btn'],a[id$='-preview']",function() {
	setTimeout(function() {
		showFirstErrorWarning();
	},500);
});

async function getMemberAuthNum(objId, objAuthType, authList, callback){
	var domainUrl = top.jzAppVars().domainUrl;
	return await Promise.resolve($.post(domainUrl+"/admin/common/target/get-member-auth-num",
			{objId: objId, objectAuthType : objAuthType, authList: authList}, "json"));
	/*
	$.post(domainUrl+"/admin/common/target/get-member-auth-num",
			{objId: objId, objectAuthType : objAuthType, authList: authList},
			function(data) {
				callback(data);
			}, "json");
	*/
}


async function targetAuthAreaFresh(objId, objAuthType, selector, objName, helpStr){
	console.log(`targetAuthAreaFresh(${objId}, ${objAuthType}, ${selector}, ${objName}, ${helpStr})`);
	
	if(objName != null){
		setTargetObjectName(objId, objAuthType, objName);
	}
	
	if(helpStr != null){
		setTargetObjectHelp(objId, objAuthType, helpStr)
	}
	
	var loading ='<img src="'+ getImageURL("container_loading.gif") +'" id="guestNum-loading" style="position: absolute; display: inline; margin:0; height: 20px; bottom: 20px; left:0px;"></img>';
	$(selector).append(loading);
	//getMemberAuthNum(objId, objAuthType,  getTargetAuth(objId, objAuthType), function(data) {
	var data = await getMemberAuthNum(objId, objAuthType,  getTargetAuth(objId, objAuthType));
	if(["PRODUCT_USE","MEMBERSHIP_USE","EVENT_USE","COURSE_USE","EVENT_PLACE_USE","EVENT_INSTRUCTOR_USE","GALLERY_USE","BBS_USE","BBS_ADMIN_USE","NOTICE_USE","NEWS_USE","POINT_COUPON_USE","TARGET_COUPON_USE","TICKET_USE","FAX_USE","ENQUETE_USE","MAGA_USE","CONTACT_GUEST_USE","CONTACT_RESPONDER_USE","BASIC_SET_USE","MAILING_ADMIN_USE"].indexOf(objAuthType) >= 0
		|| objId != "1001" && ["RELATION_USE"].indexOf(objAuthType) >= 0){
		
		var takeOverFlg = data.takeOverFlg;
		var targetFlg = data.targetFlg;
		// upadte by li.yw 19/07.15
		var help = getTargetObjectHelp(objAuthType);
		
		if(takeOverFlg == 1){
			await targetAuthAreaUpdate(data, objId, objAuthType, (targetFlg == 0),selector, help);
			
		}else{
			
			
			//getMemberAuthNum(objId, objAuthType,  "take over auth,me0#Y", function(tempData) {
			var tempData = await getMemberAuthNum(objId, objAuthType,  "take over auth,me0#Y");
			var targetFlg = tempData.targetFlg;
			
				await targetAuthAreaUpdate(data, objId, objAuthType, (targetFlg == 0), selector, help);
			//});
				
			if(data.presetId && parseInt(data.presetId.replace("ps",""))< 10000){
				setTempTargetAuth(objId, objAuthType, "clear,"+data.presetId+"#Y");
				
				//getMemberAuthNum(data.presetId.replace("ps",""), "PRESET_USE",  "", function(tempData) {
				var tempData = await getMemberAuthNum(data.presetId.replace("ps",""), "PRESET_USE",  "");
					setTempTargetAuthBySet(objId, objAuthType, "clear,me0#Y");
					await targetAuthAreaUpdate(tempData, objId, objAuthType, (targetFlg == 0), selector, help);
				//});
			}

		}
	}else{
		await targetAuthAreaUpdate(data, objId, objAuthType, false,selector, help);
	}
	//});

}

async function targetAuthAreaUpdate(data, objId, objAuthType, isChange, selector, help){
	
	var helpStr = "";
	if (help != null && help != "" ) {
		helpStr = help.split(",");
	}
	else{
		helpStr = ["","","","","","","",""];	
	}
	
	console.log(`targetAuthAreaUpdate(${JSON.stringify(data)}, ${objId}, ${objAuthType}, ${isChange}, ${selector}, ${helpStr})`);
	var $html = $(selector);
	var authNum = parseInt(data.authNum);
	var authNumStr = "";
	var targetFlg = data.targetFlg;
	var takeOverFlg = data.takeOverFlg;
	var takeOverObjId = data.takeOverObjId;
	var presetId = data.presetId;
	var presetName = data.presetName || "<m>プリセット</m>";
	var canEditTarget = true;
	var str = "", targetType = 0 /*0 ：GUEST,1:TAKEOVER,2:FILTER,3:PRESET */;
	
	var canTakeOver = false;
	if( (objId != "0" && ["PRODUCT_USE","MEMBERSHIP_USE","EVENT_USE","COURSE_USE","EVENT_PLACE_USE","EVENT_INSTRUCTOR_USE","GALLERY_USE","BBS_USE","BBS_ADMIN_USE","NOTICE_USE","NEWS_USE","BASIC_SET_USE","MAILING_ADMIN_USE"].indexOf(objAuthType) >= 0)
		|| (objId != "1001" && ["RELATION_USE"].indexOf(objAuthType) >= 0)	){
		canTakeOver = true;
	}
	
	var canPreset = true
	if (["POINT_COUPON_USE"].indexOf(objAuthType) >= 0 || ["TARGET_COUPON_USE"].indexOf(objAuthType) >= 0) {
		canPreset = false;
	}
	if(["PRESET_USE"].indexOf(objAuthType) >= 0 && parseInt(objId) >= 10000){
		canPreset = false;
		str = `<a class="txt-link" onclick="targetAuthEdit('${objId}', '${objAuthType}', '${selector}');">
				<div>
					<span class="txt-mark">${authNum}<m>人</m></span>
				</div>
			</a>`;
		$html.html(str);
	}else{
		
		if(takeOverFlg == 1){
			//str = str + "<m>継承</m>";
			if(targetFlg == 0){
				targetType = 0;
			}else{
				targetType = 1;
			}
		}else{
			
			if(targetFlg == 0){
				targetType = 0;
			}else if(presetId){
				if(presetId.match(/ps([0-9]*)/) && presetId.match(/ps([0-9]*)/)[1] < 10000 ){
					return;
				}
				targetType = 3;
				setTempTargetAuthByPreset(objId, objAuthType, "clear,"+presetId+"#Y");
				$html.addClass("targetPreseted");
			}else{
				targetType = 2;
				$html.addClass("targetEdited");
			}
			
		}
		
		var name = objId + "-" + objAuthType;	
		var	inputTemplate = `
				<input type="radio" name="${name}" id="${name}targetType0" value="${isChange?"1":"0"}" ${targetType == 0?"checked":""} ><label for="${name}targetType0">全員${formathelpStr(helpStr[0])}</label>
			    <input type="radio" name="${name}" id="${name}targetType2" value="2" ${targetType　==　2?"checked":""} ><label for="${name}targetType2">選択する${formathelpStr(helpStr[1])}</label>
			    <input type="radio" name="${name}" id="${name}targetType1" value="1" ${targetType == 1?"checked":""} ><label for="${name}targetType1" class="${canTakeOver?"":"is-hidden"} ${isChange?"is-disabled":""}">グループと同じ${formathelpStr(helpStr[2])}</label>
				<input type="radio" name="${name}" id="${name}targetType3" value="3" ${targetType == 3?"checked":""} ><label for="${name}targetType3" class="${canPreset?"":"is-hidden"}">プリセット${formathelpStr(helpStr[3])}</label>
			    `;
		
		
		var subTitle, subVal, onClickfn;
		
		
		if(targetType == 0){ 
			subTitle = `<m>全てのメンバー</m>${formathelpStr(helpStr[7])}`;
		}
		else if(targetType == 1){
			subTitle = `（<span class="takeOverNode"></span>）<m>で選択したメンバー</m>${formathelpStr(helpStr[4])}`;
			subVal = `<span class="txt-mark">${authNum}<m>人</m>`;
			onClickfn = `targetAuthEdit('${objId}', '${objAuthType}', '${selector}');`;
		}
		else if(targetType == 2){
			subTitle = `<m>選択したメンバー</m>${formathelpStr(helpStr[5])}`;
			subVal = `<span class="txt-mark">${authNum}<m>人</m></span>`;
			onClickfn = `targetAuthEdit('${objId}', '${objAuthType}', '${selector}');`;
			
		}else if(targetType == 3){
			subTitle = `（${presetName}）<m>で選択したメンバー</m>${formathelpStr(helpStr[6])}`;
			subVal = `<span class="txt-mark">${authNum}<m>人</m>`;
			onClickfn = `targetAuthSelectPreset('${objId}', '${objAuthType}', '${selector}', '${presetId.replace("ps","")}');`;
		}
		
		if(subTitle != null){
			var subValHtml = "";
			if(subVal != null && subVal != ""){
				onClickfn = onClickfn.replace(/\"/g,"&quot;");
				
				subValHtml = `<a class="txt-link" onclick="${onClickfn}">
									${subVal}
						  	</a>`;
			}
			inputTemplate += `<div class="radio-sub-area">
				  <div class="detail-form__row__sub">
					<div class="detail-form__row__sub-single">${subTitle}${subValHtml}</div>
				   </div>
				</div>`;
			
			$html.html(inputTemplate);
			
		}
		
		
		
	}
	
	$html.find('[name="'+name+'"]').on('focus', function () {
		var selected = $(this).val();
		if (selected=="2"){
			var oldSet = getTargetAuth(objId, objAuthType);
			if(oldSet){
				setTempTargetAuthBySet(objId, objAuthType, oldSet);
				$html.addClass("targetEdited");
			}
		}else if (selected=="3"){
			var oldSet = getTargetAuth(objId, objAuthType);
			if(!isTargetAuthByBaseSet(objId, objAuthType) && oldSet){
				setTempTargetAuthByPreset(objId, objAuthType, oldSet);
				$html.addClass("targetPreseted");
			}
		}
		
	}).change(function(e){
		var selected = $(this).val();
		
		if (selected=="0"){
			setTempTargetAuth(objId, objAuthType,"gu0#Y,me0#Y");
		}else if (selected=="1"){
			setTempTargetAuth(objId, objAuthType,"take over auth,me0#Y");
		}else if (selected=="2"){
			if(!$html.hasClass("targetEdited") && getTargetAuthBySet(objId, objAuthType) == ""){
				setTempTargetAuthBySet(objId, objAuthType, "clear,me0#Y");
				setTempTargetAuth(objId, objAuthType,  "clear,me0#Y");
				targetAuthEdit(objId,objAuthType,selector);
			}else{
			    setTempTargetAuth(objId, objAuthType,  getTargetAuthBySet(objId, objAuthType));
			}
		}else if (selected=="3"){
			if(!$html.hasClass("targetPreseted") && getTargetAuthBySet(objId, objAuthType) == ""){
				targetAuthSelectPreset(objId,objAuthType,selector);
				return;
			}else if(!$html.hasClass("targetPreseted")){
				targetAuthSelectPreset(objId,objAuthType,selector);
				return;
			}else{
			    setTempTargetAuth(objId, objAuthType,  getTargetAuthByPreset(objId, objAuthType));
			}
		}
		targetAuthAreaFresh(objId, objAuthType, selector)
	});
	
	if(takeOverObjId != null){
		updateTakeOverNode($html.find(".takeOverNode"), takeOverObjId);
	}
}

function formathelpStr(helpStr) {
	return helpStr || "";
}

function targetAuthEdit(objId, objAuthType, selector, callBack) {
	console.log(`targetAuthEdit('${objId}', '${objAuthType}', '${selector})', ${callBack}`);
	//setTempTargetAuthByPreset(objId, objAuthType, "clear,me0#Y");
	var domainUrl = top.jzAppVars().domainUrl;
	
	if(callBack){
		console.log(callBack);
	}else {
		var newScript =`targetAuthAreaFresh('${objId}', '${objAuthType}', '${selector}');`;
		window["targetAuthNumberFreshFn"] = function(){
			eval(newScript);
		}
		callBack = 'targetAuthNumberFreshFn';
	}
	
	var url = domainUrl + "/admin/common/target/edit-target-and-guest/target_Dialog/"+objAuthType+"/"+objId;
	$('#edit-target-auth-link').remove();
	setupDynamicYSModalDialog("edit-target-auth-link", "", "", url, null, true, {dialogTitle: getTargetObjectName(objAuthType),　width: '1000px', afterClose: callBack});
	openDynamicYSModalDialog("edit-target-auth-link");
}

function targetAuthSelectPreset(objId, objAuthType, selector) {
	console.log(`targetAuthEdit('${objId}', '${objAuthType}', '${selector}');`);
	var domainUrl = top.jzAppVars().domainUrl;
	var newScript =`targetAuthAreaFresh('${objId}', '${objAuthType}', '${selector}');`;
	
	window["targetAuthNumberFreshFn"] = function(){
		console.log("newScript <= " + newScript);
		eval(newScript);
	}
	
	var initPresetId = getTargetAuthByPreset(objId,objAuthType) || "0";
	if(initPresetId){
		initPresetId = initPresetId.replace("clear","").replace("ps","").replace(",","") || "0";
	}
	
	var url = domainUrl + "/admin/common/target/popup-preset-list/"+objAuthType+"/"+objId+"/" + initPresetId;
	$('#edit-target-auth-preset-link').remove();
	setupDynamicYSModalDialog("edit-target-auth-preset-link", "", "TargetAuthSelectPreset", url, null, true, {dialogTitle: getTargetObjectName(objAuthType),　afterClose: 'targetAuthNumberFreshFn'});
	openDynamicYSModalDialog("edit-target-auth-preset-link");

}

function updateTakeOverNode(tag, takeOverObjId){
	var currentTree = $.jstree._focused(),
	currentNodeEl = currentTree.get_selected().closest("li"),
	currentNodeId = currentNodeEl.attr("id"),
	parentNodeId = currentNodeEl.parent().closest("li").attr("id");
	var takeOverNodeEl = {}; //currentNode.closest('li[rel="drive"]');
	
	if(currentNodeId == "-1" || currentNodeEl.find('li[id="-1"]').length > 0){
		//currentNode = currentNode.find('li[id="-1"]').children("a");
		//currentNodeId = currentNode.closest("li").parent().closest("li").attr("id");
		currentNodeId = "-1";
	}
	
	if(takeOverObjId == "0" || takeOverObjId == "1001"){
		takeOverNodeEl = currentNodeEl.closest('li[rel="drive"]');
	}else if(parentNodeId.indexOf("pr") === 0  || parentNodeId.indexOf("gr") === 0){
		takeOverObjId = "gr" + takeOverObjId;
		takeOverNodeEl = currentNodeEl.closest('li[id="'+takeOverObjId+'"]');
	}else{
		takeOverNodeEl = currentNodeEl.closest('li[id="'+takeOverObjId+'"]');
	}
	
	drawTreeNodeToDiv(tag, takeOverNodeEl);
	//showTakeOverNodeTree(tag, currentTree.get_container(), currentNodeId, takeOverNodeEl.attr("id"));
}

function updateGroupNode(tag, groupObjId){
	var currentTree = $.jstree._focused(),
	currentNodeEl = currentTree.get_selected().closest("li"),
	currentNodeId = currentNodeEl.attr("id");
	var groupNodeEl = {}; //currentNode.closest('li[rel="drive"]');
	
	if(currentNodeId == "-1" || currentNodeEl.find('li[id="-1"]').length > 0){
		//currentNode = currentNode.find('li[id="-1"]').children("a");
		//currentNodeId = currentNode.closest("li").parent().closest("li").attr("id");
		currentNodeId = "-1";
	}
	
	if(currentNodeId.indexOf("pr") === 0  || currentNodeId.indexOf("gr") === 0){
		groupObjId = "gr" + groupObjId;
		groupNodeEl = currentNodeEl.find('li[id="'+groupObjId+'"]');
	}else{
		groupNodeEl = currentNodeEl.find('li[id="'+groupObjId+'"]');
	}
	
	drawTreeNodeToDiv(tag, groupNodeEl);
}

function drawTreeNodeToDiv(tag, treeNodeEl){
	tag.html(treeNodeEl.children("a").html());
	var treeNodeInsEl = treeNodeEl.children('a').children('ins');
	tag.css({
		'padding': '5px',
    	'position': 'relative'
		});
	
	tag.children('ins').css({
		'position': 'relative',
		'-webkit-mask': treeNodeInsEl.css('-webkit-mask-image'),
	    'background-image': treeNodeInsEl.css('background-image'),
	    'background-color': treeNodeInsEl.css('background-color'),
	    'width': '25px',
	    'height': '25px',
	    'margin-right': '4px',
	    'background-size': '25px 25px',
	    'display': 'inline-block',
	    'text-decoration': 'none'
	});
}

function showTakeOverNodeTree(tag, treeEl, currentNodeId, takeOverNodeId){

	var treeHtml =  '';
	var currentNodeEl = treeEl.find("li#"+currentNodeId);
	var insHtml = '', 
		insHtml1 = '<ins class="icon-line01"></ins>',
		insHtml2 = '<ins class="icon-line02"></ins>';
	var count = 0;
	while(currentNodeEl.length){
		count++;
		
		if(currentNodeEl.attr("id") == takeOverNodeId){
			insHtml = "";
		}else if(count > 2){
			currentNodeEl = currentNodeEl.parent().closest("li");
			continue;
		}else if(count > 1 && currentNodeEl.parent().closest("li").attr("id") != takeOverNodeId){
			insHtml = insHtml2;
		}else {
			insHtml = insHtml1;
		}
		
		treeHtml = '<ul><li id="' + currentNodeEl.attr("id") + '">'+insHtml+'<a></a>'+treeHtml+'</li></ul>';
		
		if(currentNodeEl.attr("id") == takeOverNodeId)break;
		currentNodeEl = currentNodeEl.parent().closest("li");
	}
	
	var maxHeight = 140;
	treeHtml = `<div id="bubble_${takeOverNodeId}" class="bubble-tree" style="max-height:140px; height:${maxHeight}px;">${treeHtml}</div>`;
	
	tag.on('mouseenter',function() {
		$(this).YSBubblePopup({ position: "center", msg: treeHtml, width: '300', bubbleType: 'whiteboard' });
		var $tree = $('#bubble_'+ takeOverNodeId),
			$box = $tree.closest(".bubble_popup_box");
			
		
		$tree.find("li").each(function(){
    		drawTreeNodeToDiv($(this).children("a"), treeEl.find("li#" + $(this).attr("id")));
    	});
    	
		var th = maxHeight - $tree.children().height();
		
		$tree.css("height", ($tree.outerHeight() - th) + "px");
		$box.css("top", ($box.offset().top + th) + "px");
    	
    	
	}).on('mouseleave', function() {
		$('.bubble_popup_box').remove();
	});
}

function divChangeTrigger() {
	$(".div-change-trigger").bind('DOMNodeInserted', function (e) {
		
			initCheckLinkClick();
		});

	$(".div-change-trigger").bind('DOMNodeRemoved', function (e) {
		
			initCheckLinkClick();
		});
}

function openModalHelp(targetDiv){
	var modalOption = {
			width: '45vw',
			zindex: 9999999,
		    padding:10,
		    radius: 8,
		    headerColor: 'white',
		    background: 'white',
		    borderBottom: false,
		    overlayColor: 'rgba(0, 0, 0, 0.3)',
		    overlayClose: true,
		    loop: true,
		    navigateArrows: 'closeToModal',
		    onOpening: function(modal){
				modal.$wrap.children(".iziModal-content")
          			.remove(".icon-close");
				addModalCloseButton(modal);
		    },
		};

	$('.modalHelp').iziModal(modalOption);

	$(targetDiv).iziModal("open");
}

function openModal(targetDiv, option){
	var modalOption = {
						width: '45vw',
					    padding:10,
					    radius: 8,
					    headerColor: 'white',
					    background: 'white',
					    borderBottom: false,
					    overlayColor: 'rgba(0, 0, 0, 0.3)',
					    overlayClose: false,
					    zindex: getNextModalZindex(),
					    onOpening: function(modal){
							modal.$wrap.children(".iziModal-content")
			          			.remove(".icon-close");
							addModalCloseButton(modal);
					    }
					   };
					   
	if(option){
		modalOption = Object.assign(modalOption, option);
	}

	$(targetDiv).iziModal(modalOption);
	$(targetDiv).iziModal('open');
}

function openModalAjax(targetDiv, option, url){
	var modalOption = {
						width: '45vw',
						top: '100px',
						bottom: '100px',
					    padding: 10,
					    radius: 8,
					    headerColor: 'white',
					    background: 'white',
					    borderBottom: false,
					    overlayColor: 'rgba(0, 0, 0, 0.3)',
					    overlayClose: false,
					    zindex: getNextModalZindex(),
					    onOpening: function(modal){
					    	modal.startLoading();
					    	addModalCloseButton(modal);
					        $.get(url, function(data) {
					        	modal.stopLoading();
						    	modal.$wrap.children(".iziModal-content").html(data)
					    		.remove(".icon-close");
					        });
					    },
						onClosed: function(){
						  $(targetDiv).remove();
						}
					   };

	if(option){
		modalOption = Object.assign(modalOption, option);
	}

	$(targetDiv).iziModal(modalOption);
	$(targetDiv).iziModal('open');
}
function openModalAjaxPost(targetDiv, option, url, jsonData){
	var modalOption = {
						width: '45vw',
						top: '100px',
						bottom: '100px',
					    padding: 10,
					    radius: 8,
					    headerColor: 'white',
					    background: 'white',
					    borderBottom: false,
					    overlayColor: 'rgba(0, 0, 0, 0.3)',
					    overlayClose: false,
					    zindex: getNextModalZindex(),
					    onOpening: function(modal){
					        modal.startLoading();
					        addModalCloseButton(modal);
					        $.post(url, jsonData, function(data) {
					        	modal.stopLoading();
						        modal.$wrap.children(".iziModal-content").html(data)
					        	.remove(".icon-close");
					        });
					    },
						onClosed: function(){
						  $(targetDiv).remove();
						}
					   };

	if(option){
		modalOption = Object.assign(modalOption, option);
	}

	$(targetDiv).iziModal(modalOption);
	$(targetDiv).iziModal('open');
}

function openModalIf(targetDiv, option, url){
	var modalOption = {
			  width: 1000,
			  radius: 10,
			  padding:0,
			  iframe: true,
			  iframeHeight: 500,
			  iframeURL: url,
			  overlayClose: false,
			  zindex: getNextModalZindex(),
			  onOpening: function(modal){
				  modal.$wrap.children(".iziModal-content")
		          	.remove(".icon-close");
				  addModalCloseButton(modal);
			  },
			};

	if(option){
		modalOption = Object.assign(modalOption, option);
	}

	$(targetDiv).iziModal(modalOption);
	$(targetDiv).iziModal('open');
}

function openAlert(targetDiv, titleMes, subTitle, errorFlg, option){
	
	if($(targetDiv).parents('.iziModal-content')){
		$('.iziModal').iziModal('close');
	}

	var color = '#d43838';
	if(!errorFlg)color='#00af66';
	var modalOption = { 

			 headerColor: color,
			    background: color,
			    borderBottom: false,
			    overlayColor: 'rgba(0, 0, 0, 0.3)',
			title: titleMes,
						subtitle: subTitle,
						headerColor: color,
						width: 400,
						autoOpen: true,
						timeout: 3000,
						pauseOnHover: true,
						timeoutProgressbar: true,
						attached: 'bottom'
					   };
	if(option){
		modalOption = Object.assign(modalOption, option);
	}

	$(targetDiv).iziModal(modalOption);
	$(targetDiv).iziModal('open');
}

function openConfirm(msg){
	return new Promise((res) => {
		if($(".system-confirm-dialog").is(':visible')
				&& $(".system-confirm-dialog #confirm-message").html() == msg){
			res(false);
			return; 
		}
		
		var modalOption = {
				width: '400px',
			    padding:0,
			    radius: 10,
			    headerColor: 'white',
			    background: 'white',
			    borderBottom: false,
			    overlayColor: 'rgba(0, 0, 0, 0.3)',
				overlayClose: false,
				zindex: 99999,
				transitionIn: 'bounceInDown',
				transitionOut: 'bounceOutUp',
				onOpening: function(modal){
					  var $modal = modal.$wrap.closest('.iziModal');
					  $modal.find(".iziModal-content")
			          	.remove(".icon-close");
			          	//addModalCloseButton(modal);
					  $modal.find("#ok-btn").click(function(){res(true);modal.close()});
					  
					  $modal.addClass("wobble");
				        setTimeout(function(){
				            $modal.removeClass("wobble");
				        }, 1500);
					  
					},
					
				onClosed: function(){
					res(false);
				}
			   };

		var div = $(`
		<div class="system-confirm-dialog">
			<div class="ysdialog-contents type-alter"><i class="icon-alert"></i><span id="confirm-message">${msg}</span></div>
			<div class="ctrl-area-btm">
				<div class="ctrl-area__main btn-no-border">
				<a id="cancel-btn" class="ctrl-area__main__btn save-btn" href="javascript:" data-iziModal-close><span>キャンセル</span></a>
				<a id="ok-btn" class="ctrl-area__main__btn" href="javascript:"><span>OK</span></a>
				</div>
			</div>
		</div>
		`);
		div.iziModal(modalOption);
		div.iziModal('open');
	});
}

/* accordion open/close and ctrl method */
function toggleDefault(obj){
	
	if($(obj).val() == 1){
		// main
		$(obj).parents(".accordion-area").find(".detail-form").addClass("is-disabled");
		//$(obj).parents(".accordion-area").find(".detail-form input").prop("disabled", "true");
		confSameFlgSwitch(obj, true);
	}else{
		$(obj).parents(".accordion-area").find(".detail-form").removeClass("is-disabled");
		//$(obj).parents(".accordion-area").find(".detail-form input").prop("disabled", "");
		confSameFlgSwitch(obj, false);
	}

}

function toggleDetailConf(){

	var src = $("#detail-iframe").attr("src");
	$("#detail-iframe").attr("src", "");
	$("#detail-iframe").attr("src", src);
	
	$('.accord-op-cl > span').toggleClass("is-hidden");
	if($('.detail-form__row-another') && 
			$('.detail-form__row-another').size() > 0){
		$('.main-another-num-cnt').toggleClass("is-hidden");
		$('#main-another-num').text($('.detail-form__row-another').size());
	}

    $("#accordion-area").slideToggle(function(){
        if($(this).is(":visible")){
        	$('textarea').autoExpand();
        }
    });
	
	$('input[name="main-same-flg-selector__radio"]').off("change").on("change",function(){
		toggleDefault(this);
	});
	
}

function confSameFlgSwitch(obj, flg){
	var sameInputList = $(obj).parents(".accordion-area").find(".detail-form input[name$='SameFlag']");
	
	$.each(sameInputList, function(index){
		appendMainStatus($(this), true);
	});
	
	var radioVal= '0';
	if(flg){
		radioVal = '1';
	}
	
	$('input[name="main-same-flg-selector__radio"]').val([radioVal]);
	$(".main-another-num-cnt").addClass('is-hidden');
}


function appendMainStatus(elm, mainFlg){
	var contentsDiv = elm.closest('.detail-form__row');
	
	if(mainFlg){
		changeDefaultVal(elm);
		contentsDiv.find('.show-same-flag-div input[type="checkbox"]').prop('checked', true);
		contentsDiv.removeClass("detail-form__row-another");
		
	}else{
		contentsDiv.find('.show-same-flag-div input[type="checkbox"]').prop('checked', false);
		contentsDiv.addClass("detail-form__row-another");
	}
}

function changeDefaultVal(elm){
	var contentsDiv = elm.closest('.detail-form__row');
	var dataType = contentsDiv.find('.hide-same-flag-div').attr('data-type');
	var id = contentsDiv.find('.hide-same-flag-div input').attr("id");
	var name = $("#"+id).attr("name");
	var mainVal = $("#main-" + name).val();
	
	if(dataType == "radioText"){
		contentsDiv.find('.hide-same-flag-div input').each(function(){
			var inputType = $(this).attr("type");
			name = $(this).attr("name");
			mainVal = $("#main-" + name).val();
			
			if(mainVal && mainVal != null){
				if(inputType=="radio" || 
						inputType=="checkbox"){
					$('input[name="' + name + '"]').val([mainVal]).change().trigger("input");
				
				}else{
					$('input[name="' + name + '"]').val(mainVal).change().trigger("input");
				}
			}else{
				console.log("### Error! Not find same val: " + name);
			}
		});

	}else if(dataType == "img"){
		var imgId = contentsDiv.find('.hide-same-flag-div ul').attr("id");
		contentsDiv.find('.hide-same-flag-div ul > *').remove();
		contentsDiv.find('.hide-same-flag-div ul').append($("#main-"+ imgId).children().clone());

	}else{
		contentsDiv.find('.hide-same-flag-div input').each(function(){
			id = $(this).attr("id");
			name = $(this).attr("name");
			var inputType = $("#"+ id).attr("type");
			
			if(inputType == "text"){
				$("#"+id).val($("#main-"+id).val()).change().trigger("input");
				
			}else if(inputType == "radio" || inputType == "checkbox"){
				mainVal = $("#main-" + name).val();
				contentsDiv.find('.hide-same-flag-div input[name="' + name + '"]').val([mainVal]).trigger("input");

			}
		});
	}
	
}

function removeDateValidation() {
	//$('#period-time-disable').show();
	//$('#period-time').hide();
	$('#pr-webshow-between').slideUp();
	$('#period-time').addClass('tx-blank');
	if($('input[name=publicType]:checked').val() != "${_SHOP_PRODUCT_PUBLIC_TYPE_PERIOD_TIME}"){
		$('#period-time').attr("data-before-setting", $('input[name=publicType]:checked').val());
	}
}

function publicSameFlagEditClick(){
	$('#editStartTimeFrom').val($('#startTimeFrom').val());
	$('#editStartHour').val($('#startHour').val());
	$('#editStartMinute').val($('#startMinute').val());
	$('#editEndTimeTo').val($('#endTimeTo').val());
	$('#editEndHour').val($('#endHour').val());
	$('#editEndMinute').val($('#endMinute').val());
	var domainUrl = top.jzAppVars().domainUrl;
	setupDynamicYSModalDialog("edit-public-date-link", "<m>表示する期間を設定します</m>", "CommonPublicDate", domainUrl+"/admin/common/image/popup-web-site-public-date-edit", null, false, {postDataFormId: "edit-public-date-iframe-form", afterClose:"resetDateValidation"});
	openDynamicYSModalDialog("edit-public-date-link");
}

function addDateValidation() {
	$(".disabledAttr").removeAttr("disabled");
	//$('#period-time-disable').hide();
	//$('#period-time').show();
	$('#pr-webshow-between').slideDown();
	$('#period-time').removeClass('tx-blank');
	if($('#period-time').html()==''){
		publicSameFlagEditClick();
	}
}

function resetDateValidation() {
	if($('#period-time').html()=='' && $('#period-time').attr("data-before-setting") != $('input[name=publicType]:checked').val()){
		$('input[name=publicType][value='+$('#period-time').attr("data-before-setting")+']').prop('checked', true);
	}
	var slideArea= $('input[name="publicType"]').nextAll(".radio-sub-area");
	if ($('input[name="publicType"]:checked').val() != 2){
		$(slideArea).slideUp();
		$(slideArea).hide();
	}
}

function openAllTree(){
	var currentTree = $.jstree._focused(),
		currentNode = currentTree.get_selected();
	currentTree.open_node(currentNode.closest("li"));
	currentNode.closest("li").find("li").each(function(){
		if(!$(this).hasClass("jstree-leaf") && !$(this).hasClass("jstree-open")){
			currentTree.open_node($(this));
		}
	});
	currentTree.get_container().closest(".jstree-wrap").find("#js-tree-menu").show();
}

function closeAllTree(){
	var currentTree = $.jstree._focused(),
		currentNode = currentTree.get_selected();
	currentNode.closest("li").find("li").each(function(){
		if(!$(this).hasClass("jstree-leaf") && !$(this).hasClass("jstree-close")){
			currentTree.close_node($(this));
		}
	});
	currentTree.close_node(currentNode.closest("li"));
	currentTree.get_container().closest(".jstree-wrap").find("#js-tree-menu").show();
}


// table resize
function tableResize(id){
	var thHeight = $(".jz-table__row.header > .jz-table__cell:first").height();
	$(".jz-table__row.header > .jz-table__cell:not(:last-child)").resizable({
		handles: "e",
		minHeight: thHeight,
		maxHeight: thHeight,
		minWidth: 50,
    	maxWidth: 1280,
		resize: function (event, ui) {
			var sizerID = "#" + id + " #" + $(event.target).attr("id") + "-sizer";
			$(sizerID).width(ui.size.width);
        }
	});
}

function resize(tableId){
	// TODO テーブル2つ以上の場合に対応。テーブルIDを引数とする
	$("#" + tableId + " .jz-table__row.header > .jz-table__cell").each(function(index){
	$(this).append('<div id="' + $(this).attr("id") + '-sizer" class="jz-table__resizer"></div>');
	});
	tableResize(tableId);
}

function makeTable(data, tableId, headerFlg){
	//data = [['a', 'b', 'c', 'd'], [1-1, 1-2, 1-3, 1-4], [2-1, 2-2] ... ];
	var table = $('<table class="jz-table">');

    var colNum = 0;
    for (var i = 0; i < data.length; i++) {
      var row = $('<tr class="jz-table__row"></tr>')
      row.appendTo(table);
      for (var j = 0; j < data[i].length; j++) {
        colNum = data[0].length;
        console.log(j + " / " + data[i].length);
        if(data[i].length != colNum && j == data[i].length - 1){
          if(data[i][j] == ''){
            $('<td id="' + (j+1) + '" class="jz-table__cell-brank" colspan="'+ (colNum - j) + '"></td>').appendTo(row);
          }else{
            $('<td id="' + (j+1) + '" class="jz-table__cell" colspan="'+ (colNum - j) + '">' + data[i][j] + '</td>').appendTo(row);
          }
        }else{
          $('<td id="' + (j+1) + '"  class="jz-table__cell">' + data[i][j] + '</td>').appendTo(row);
        }
      }
    }
    
    if(headerFlg){
    	table.find('.jz-table__row:first-child').addClass("header");
    	table.find('.jz-table__row:first-child').wrap('<thead></thead>');
    	table.find('.jz-table__row:not(:first-child)').wrapAll('<tbody></tbody>');
    }
    console.log(table.html());
    $("#"+tableId).append(table);
    
    $(".jz-table__cell-brank").parents(".jz-table__row").prev().addClass("last-row");
	
}

function justPostitionTreeArrow(){
	
	if ($('.jstree-clicked').position()) {
		
		var treeWrap =  $('.jstree-clicked').closest('.jstree-wrap');
		var targetHeight = $('.jstree-clicked').offset().top -  treeWrap.offset().top + 7;
		var bottom = $('#right-panel').outerHeight() - 25;
		var minTop = -5;
		var arrowWeight = 13;
		
		treeWrap.find('#js-tree-menu').css("top", (targetHeight + treeWrap.scrollTop() - 7) + 'px');
		
		var targetHeight = Math.min(bottom, Math.max(minTop, targetHeight));
		$('.parts-tri').css("top", (targetHeight) + 'px');
		
		if(targetHeight - minTop < arrowWeight){
			var ht = Math.min (arrowWeight, Math.max(0, targetHeight - minTop));
			ht = Math.min(8,Math.max(0,ht -1));

			$('#right-panel').css("border-top-left-radius", ht + "px").css("border-bottom-left-radius", "");

			$('#balloon-left-style').html('.parts-tri .rotate-square {--ag: '+ (8 - ht) +'; bottom:' +  (targetHeight * -1)  + 'px;}' +
					  '#right-panel:before { height:' + Math.max(0, Math.max( ht - 1 , targetHeight)) + 'px; border-top-left-radius: '+ ht + 'px;}' +
					  '#right-panel:after { height:' + Math.max(0, bottom - targetHeight + (8 - ht) ) + 'px;}'
					  );

		}else if(targetHeight > (bottom - arrowWeight - minTop)){
			var hb = Math.max(0, bottom - targetHeight);
			hb = Math.min(8,Math.max(0,hb - 1));
			$('#right-panel').css("border-top-left-radius", "").css("border-bottom-left-radius",  hb + "px");
			$('#balloon-left-style').html('.parts-tri .rotate-square {--ag: '+ (8 - hb) +'; --ag0: -1; bottom:' +  (hb)  + 'px;}' +
					  '#right-panel:before { height:' + Math.max(0, targetHeight + 10*(8 - hb)/8 ) + 'px;}' +
					  '#right-panel:after { height:' + Math.max(hb, bottom - targetHeight + 10 * hb / 8) + 'px; border-bottom-left-radius: '+ hb + 'px;}'
					  );

		}else{
			if(targetHeight > (bottom-arrowWeight-8)){

			}else{
				$('#right-panel').css("border-top-left-radius", "");
				$('#right-panel').css("border-bottom-left-radius", "");
			}
			$('#balloon-left-style').html(
											  '#right-panel:before { height:' + Math.max(0, targetHeight) + 'px;}' +
											  '#right-panel:after { height:' + Math.max(0,bottom - targetHeight) + 'px;}'
											  );
		}
	}else if ($('.dust-box').children("a").hasClass("dusokp")) {
	
		var targetHeight = $('.dust-box').position().top - $('#right-panel').position().top + $('.dust-box').height() / 2;
		var bottom = $('#right-panel').outerHeight() - 25;
		var minTop = -5;
		var arrowWeight = 13;
		
		var targetHeight = Math.min(bottom, Math.max(minTop, targetHeight));
		$('.parts-tri').css("top", (targetHeight) + 'px');
		
		$('#right-panel').css("border-top-left-radius", "");
		$('#right-panel').css("border-bottom-left-radius", "");
	
		$('#balloon-left-style').html(
		  '#right-panel:before { height:' + Math.max(0, targetHeight) + 'px;}' +
		  '#right-panel:after { height:' + Math.max(0,bottom - targetHeight) + 'px;}'
		  );
		
	}
}

