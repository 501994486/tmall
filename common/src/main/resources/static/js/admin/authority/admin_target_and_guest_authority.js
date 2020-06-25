export default function edit($) {
	
	$.fn.skygqOneDblClick = function(options){
		return this.each(function(){
			var s = $.extend({}, $.fn.skygqOneDblClick.Default, options || {});
			var self_obj = this;
			var do_click = function(e){
			    clearTimeout(s.timer);
			    s.timer = setTimeout(function(){s.oneclick.call(self_obj,e);}, 400);
			},
				do_dblclick = function(e) {
			    clearTimeout(s.timer);
			    s.dblclick.call(self_obj,e);
			};
			$(this).click(do_click).dblclick(do_dblclick);
		});
	};
	$.fn.skygqOneDblClick.Default = {
		timer: null,
		oneclick: $.noop,
		dblclick: $.noop
	};


	$('a#tab-save-btn').addClass("is-disabled");
	
	
	$('.target-tab').click(function() {
		showSelectAuth($(this).attr('id'));
	});
	
	$('.tab-cancel-confirm-btn').click(function() {
		if(!isMemberListTargetBox()){
			if(saveResourceIds){
				$('#target-box-container').slideUp(300, function(){
					$('.tab-btn ul li a').removeClass('selected');
					$('#ui-widget-overlay').remove();
					updateAuthChanges(saveResourceIds,false);
				});
			}
			return true;
		}
		
		parent.$('body').append('<a id="cancel-confirm-link" href="#cancel-confirm-div" style="display: none;"></a>');
		parent.$('body').append('<div id="cancel-confirm-div" class="tx-center ysdialog　 check-save-excepted"><div style="width: 350px; text-align: left;" class="ysdialog-contents">'
			+ '<p>'+cautionMsg("C_00000_999")+'</p>'
			+ '</div><div class="btn">'
			+ '<ul><li><a id="cancel-btn"" class="ysdialog-close" href="javascript:;" onclick="$(\'#YSDialogIframe\').dialog(\'close\');"><span>OK</span></a></li><li><a id="" class="ysdialog-close" href="javascript:;"><span>Cancel</span></a></li></ul>'
			+ '</div></div>');
		
		parent.$('#cancel-confirm-link').YSDialog();
		parent.$('#cancel-confirm-link').click();
	});

	$('.tab-save-btn').click(function() {
		if(!isMemberListTargetBox()){
			var newResourceIds = getNewResourceIds();
			saveResourceIds = newResourceIds;
			$('#target-box-container').slideUp(300, function(){
				$('.tab-btn ul li a').removeClass('selected');
				$('#ui-widget-overlay').remove();
				updateAuthChanges(newResourceIds);
			});
			return true;
		}
		
		var resourceId = new Array();
		var resourceIds = new Array();
		var n = 0,
			i = 0;
		$("input.function-cb").each(function() {
			if ($(this).hasClass("inherited-canceled") || $(this).hasClass("new-stand-alone") || $(this).hasClass("stand-alone")) {
				if ($(this).val().indexOf("me") != -1) {
					memberIdArray[i] = $(this).val().substring(2);
					i++;
				}
				else {
					resourceId[n] = $(this).val().substring(2);
					n++;
				}
			}
		});
		resourceIds = userAddArray.concat(resourceId);
		
		if (resourceType == 'membershipUseNoTitle') {
			$.post(domainUrl + "/admin/member/group/add-all-to-group-member", 
					{userAddId : resourceIds.toString(), userId : userArray.toString(), memberNodeId : memberIdArray.toString(), memberDelIds : memberIdDelArray.toString(), targetGroupId : objectId},
					function(data) {
						if (data.result == '${_STATUS_SUCCESS}') {
							jzMsgBox(successMsg("I_0000_003"));
						}
						else{
							jzMsgBox(errorMsg("E_0000_001"), 'alert');
						}
					}, "json");
			}
		else{
			saveAuthChanges();
		}
	});
	
	
	$(document).on('mouseover', '.project-choose-box li>a, .project-choose-box li>div', function() {
		if($(this).hasClass("tree-select-icon-box")){
			$(this).parent('li').children('a').addClass("jstree-hovered");
		}
		$(this).parent('li').children('.tree-select-icon-box').addClass("jstree-hovered");
		
		addChildrenMouseOver($(this).parent('li').attr('id'));
	}).on('mouseout', '.project-choose-box li>a, .project-choose-box li>div', function() {
		if($(this).hasClass("tree-select-icon-box")){
			$(this).parent('li').children('a').removeClass("jstree-hovered");
		}
		removeChildrenMouseOver($(this).parent('li').attr('id'));
		
		$(this).parent('li').children('.tree-select-icon-box').removeClass("jstree-hovered");
	});
	
	
/*鼠标经过时，按钮变化*/
function mouseOverBtnCss() {
	// 保存按钮式样变换
	$('#save-btn').mouseover(function(event) {
		$(this).addClass('recommend');
	}).mouseout(function(event) {
		$(this).removeClass('recommend');
	});
	$('#cancel-btn').mouseover(function(event) {
		// $(this).addClass('recommend');
	}).mouseout(function(event) {
		$(this).removeClass('recommend');
	});
}



var drawBaseDivSel = "#rightopenclose";

function clearAllDrawed(){
	$(".relation-line").remove();
}
function clearDrawed(cssClass){
	$(".relation-line."+cssClass).remove();
}

function getAbsPostion(x,y){
	var off = $(drawBaseDivSel).offset();
	var st = $(drawBaseDivSel).scrollTop();
	return {x: (x - off.left), y: (y - off.top)+st}
}


function drawline(cssClass, ax, ay, bx, by, color, weight, adjustWeight) {
	
	if(!color){
		var color = "#000000";
	}
	if(!weight){
		var weight = 1;
	}
	
    if (ax > bx) {
        bx = ax + bx;
        ax = bx - ax;
        bx = bx - ax;
        by = ay + by;
        ay = by - ay;
        by = by - ay;
    }
    
    var angle = Math.atan((ay - by) / (bx - ax));
    angle = (angle * 180 / Math.PI);
    angle = -angle;
    
    var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
    
	if(adjustWeight && weight > 1){
		if(angle < -45){
			ax = ax - (weight/2);
		}else if(angle > 45){
			ax = ax + (weight/2);
		}else{
			ay = ay - (weight/2);
		}
	}

    var style = "display: none;"
    style += "left:" + (ax) + "px;"
    style += "top:" + (ay) + "px;"
    style += "width:" + length + "px;"
    style += "height:" + weight + "px;"
    style += "background-color: " + color + ";"
    style += "position:absolute;"
    style += "transform:rotate(" + angle + "deg);"
    style += "-ms-transform:rotate(" + angle + "deg);"
    style += "transform-origin:0% 0%;"
    style += "-moz-transform:rotate(" + angle + "deg);"
    style += "-moz-transform-origin:0% 0%;"
    style += "-webkit-transform:rotate(" + angle + "deg);"
    style += "-webkit-transform-origin:0% 0%;"
    style += "-o-transform:rotate(" + angle + "deg);"
    style += "-o-transform-origin:0% 0%;"
    //style += "-webkit-box-shadow: 0px 0px 1px 1px rgba(250, 150, 30, .1);"
    //style += "box-shadow: 0px 0px 1px 1px rgba(250, 150, 30, .1);"
    style += "z-index:1;"
    $("<div style='" + style + "' class='relation-line " + cssClass + "'></div>").appendTo(drawBaseDivSel);
}

function drawnode(cssClass, num, x, y, color) {
	if(!color){
		var color = "#000000";
	}
    var ele = ""
    var style = "color:" + color + ";";
    style += "font-weight:bold;";
    style += "position:absolute;";
    style += "z-index:100;";
    ele += "<div class='relNode relation-line "+ cssClass +"' style=" + style + ">";
    ele += '<i><svg aria-hidden="true" data-prefix="fas" data-icon="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-link fa-w-16 fa-spin fa-lg" style="width: 13px;"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" class=""></path></svg></i>'
    ele += "<span> ("+num+")</span>";
    ele += "<div>"

    //$(drawBaseDivSel).show();
    var node = $(ele).appendTo(drawBaseDivSel);
    var width = node.width();
    var height = node.height();

    var centerX = width / 2;
    var centerY = height / 2;

    var startX = x - centerX;
    var startY = y - centerY;

    node.css("left", startX).css("top", startY);

}


// 点击排序式样
function clickSortCss(leafId) {
	if ($("#membership-grid-" + leafId + "_mail").attr("aria-selected") == 'true') {
		$("#jqgh_membership-grid-" + leafId + "_mail").find("m").css("font-weight", "bold");
	}
	else {
		$("#jqgh_membership-grid-" + leafId + "_mail").find("m").css({
			"font-weight" : ""
		});
	}

	if ($("#membership-grid-" + leafId + "_userName").attr("aria-selected") == 'true') {
		$("#jqgh_membership-grid-" + leafId + "_userName").find("m").css("font-weight", "bold");
	}
	else {
		$("#jqgh_membership-grid-" + leafId + "_userName").find("m").css("font-weight", "");
	}

	if ($("#group-grid-" + leafId + "_mail").attr("aria-selected") == 'true') {
		$("#jqgh_group-grid-" + leafId + "_mail").find("m").css("font-weight", "bold");
	}
	else {
		$("#jqgh_group-grid-" + leafId + "_mail").find("m").css({
			"font-weight" : ""
		});
	}

	if ($("#group-grid-" + leafId + "_userName").attr("aria-selected") == 'true') {
		$("#jqgh_group-grid-" + leafId + "_userName").find("m").css("font-weight", "bold");
	}
	else {
		$("#jqgh_group-grid-" + leafId + "_userName").find("m").css("font-weight", "");
	}
}

function ysLoadedJstree(treeName, url, data, authSetting) {

	// treeName = membership
	var showCheckBox = authSetting.showCheckBox;
	var pageShowStatus = authSetting.pageShowStatus;

	if (pageShowStatus == "Container") {

	}
	else {
		$("#" + treeName + "-tree").parent().css({
			'width' : 'auto',
			'border' : '0px'
		});
	}

	$("#" + treeName + "-tree").css('overflow', 'hidden');

	data.inst.open_all(-1);
	
	// CHECKBOX初始化
	var treeBox = $("#" + treeName + "-tree").jstreecheckbox({
		'clickEvent' : 'changeAuth', // 点击CHECKBOX事件
		'showCheckBox' : showCheckBox, // 
		'pageShowStatus' : pageShowStatus,
		'cbSize' : '1'// 显示几列CHECKBOX
	});

	// TREE CHECKBOX 显示
	treeBox.treecheckbox();
	
	$("#" + treeName + "-tree li").each(function(j) {
		//$(this).children("a").append('<div class="title_space"><div class="title_space_line"></div></div>');
		
		var leafId = $(this).attr("id"),
			relVal = $(this).attr("rel"),
			click_event = function(e) { },
			dblclick_event = function(e) {
				$("#" + leafId + " ins:first").click();
			};
			
			//$("#" + leafId + " > .tree-select-icon-box").click(function(){$("#" + leafId + " a:first").click()});
			
		if (typeof(relVal) != "undefined") {
			if (relVal == "default") {
				/* 20190226 comment out
				$("#" + leafId + "").unbind('dblclick').bind('dblclick', function(e) {
					$("#" + leafId + " ins:first").click();
				});
				$("#" + leafId + " ins:first").bind('click', function(e) {
					if ($("#" + leafId).hasClass("jstree-closed")) {						
						setTimeout(function(){
							removegrid(treeName, leafId);
							addgrid(treeName, url, leafId, treeBox, authSetting);
							
						}, 1);
					}
					else if ($("#" + leafId).hasClass("jstree-open")) {						
						removegrid(treeName, leafId);
					}
				});
				if (treeName == 'auth-membership') {
					$(this).addClass('jstree-closed');
				}
				// 双击打开jqgrid
				$("#" + leafId).skygqOneDblClick({oneclick:click_event,dblclick:dblclick_event});
				*/
			}
			else if (relVal.indexOf("folder") == 0) {
				// GROUP初始化时,关闭TOP以下所有节点
				if(parentFlg == 'no_parent'){
					if ($(this).hasClass("jstree-open")) {
						$(this).removeClass("jstree-open");
						$(this).addClass("jstree-closed");
					}
				}
				
				if (treeName == 'auth-group') {
					$(this).addClass('jstree-closed');
				}
			}
			else if (relVal == "drive") {

				// 初始化时,关闭TOP节点
				if (authSetting.closeTopNode) {
					if(parentFlg == 'no_parent'){
						if ($(this).hasClass("jstree-open")) {
							$(this).removeClass("jstree-open");
							$(this).addClass("jstree-closed");
						}
					}
				}
			
				if (treeName == 'auth-group') {
					$(this).addClass('jstree-closed');
				}
			}

			else if (relVal == "programDefault") {	
				$("#" + leafId + " > div").hide();
			}
		}
		
		// 显示CheckBox时, 点击事件以后, 背景色不显示.
		if (showCheckBox == true) {
			$("#" + leafId + " a:first").mouseover(function(e) {
				$("#" + leafId + " a:first").removeClass("jstree-clicked");
			});
		}

	});
}
window.ysLoadedJstree = ysLoadedJstree;

function addgrid(treeName, url, leafId, treeBox, authSetting) {
	if (treeName == 'auth-query' || treeName == 'auth-product') {
		return;
	}
	else if (treeName == 'auth-event' || treeName == 'auth-membership') {
		var relVal = $("#" + leafId).attr("rel");
		if(relVal != 'default'){
			return;
		}
	}
	
	var nameArrayStr = "",
		colModelStr = "";
	var fromPath = getFromPath();
	if (fromPath.indexOf("target-FAX_USE-") > -1) {
		nameArrayStr = gridNameArrayStr2;
		colModelStr = [ { name : 'faxNum', index : 'faxNum', width : '70%', align : 'left', sortable: false },
						{ name : 'userName', index : 'userName', width : '28%', align : 'left' },
						{ width : '2%', align : 'right'} ];
	}
	else {
		nameArrayStr = gridNameArrayStr1;
		colModelStr = [ { name : 'mail', index : 'mail', width : '70%', align : 'left' },
						{ name : 'userName', index : 'userName', width : '28%', align : 'left' },
						{ width : '2%', align : 'right'}];
	}

	$('a#tab-save-btn').addClass("is-disabled");
	$("#loading-div").css("height", document.body.scrollHeight);

	if ($("#" + leafId).find(".open_arrow").length == 0) {
		//$("#" + leafId + " a:first").children('span').after('<span class="open_arrow"></span>');
	}

	ysTreeAddGrid(treeName, leafId);
	
//	if ('ev' == leafId.substring(0, 2)) {
//		ysAddEventGrid(treeName, leafId);
//	}
	
	// leafId的格式为“me” + 从数据库取出的objId，所以从第二位开始截取获得真实的objId.
	var objId = leafId.substring(2);
	var objGrid = $("#" + treeName + "-grid-" + leafId).jqGrid({
		gridId : treeName + 'Grid' + leafId,
		url : url + objId,
		datatype : 'json',
		mtype : 'POST',
		height : '100%',
		colNames : nameArrayStr,
		colModel : colModelStr,
		pager : '#' + treeName + '-pager-' + leafId,
		rowNum : 25,
		rowList : [ 25, 50, 75, 100 ],
		sortname : 'mail',
		sortorder : 'asc',
		page : 1,
		autowidth: true,
		shrinkToFit : true,
		hoverrows : false,
		viewrecords : false,
		hidegrid : false,
		multiselect : false,
		gridComplete : function() {
			objGrid.jqGrid('setGridWidth', getOrderTableGridWidth()-20, true);
			
			$("#loading-div").css("height", document.body.scrollHeight);
			if (authSetting.pageName == "Member") {
				ysgridCompleteMember(treeName, leafId, treeBox);
			}
			else {
				ysgridCompleteFunction(treeName, leafId, treeBox, authSetting);
			}
			
			// 显示继承元
			if(parentFlg == 'parent'){
				controlParentDirection();
			}
			
			$("#" + treeName + "-grid-" + leafId).find('.jqgrid-select-icon-box').each(function(){
				var rowid = $(this).closest("tr").attr("id");
				$(this).unbind("click").bind("click",
					function(){
						clickMember(rowid);
				});
			})
			$('a#tab-save-btn').removeClass("is-disabled");
		},
		onSelectRow : function(rowid, status) {
			if (authSetting.showCheckBox == false) {
				//clickMember(rowid);
			}
			else if (clickMember) {
				//clickMember(rowid);
			}
			$('#' + rowid).removeClass('ui-state-highlight');
		},
		beforeRequest: function() {
			if ($('a#tab-save-btn').is(':hidden')) {
				$('a#tab-save-btn').addClass("is-disabled");
			}
		}
		
	});
	
	if (treeBox == true) {
		objGrid.bind('click', function(e) {
			var ptr = $(e.target).closest("tr.jqgrow");
			$("#" + ptr.attr("id")).removeClass("ui-state-highlight");
		});
	}
	else {
		objGrid.bind('mouseover', function(e) {
			var ptr = $(e.target).closest("tr.jqgrow");
			if (ptr.attr("aria-selected") != 'true') {
				ptr.css("background", "#FAFAFA");
			}
			ptr.css("cursor", "pointer");
		}).bind('mouseout', function(e) {
			var ptr = $(e.target).closest("tr.jqgrow");
			ptr.css("background", "");
		}).bind('click', function(e) {
			var ptr = $(e.target).closest("tr.jqgrow");
			ptr.css("background", "");
			var p_id = ptr.attr("id").split('_')[0];
			$("#" + p_id).find("a").removeClass("jstree-clicked");
		});
	}

	// 树中的表格的样式会与用与树的css冲突，自定义css样式.
	$("#" + treeName + "-grid-div-" + leafId).find("*").css("line-height", "1.4em");
	$("#" + treeName + "-grid-div-" + leafId).find("a").css({
		"min-height" : "17px",
		"height" : "17px"
	});

	$("#" + leafId).addClass("grid-added");
}

function getOrderTableGridWidth() {
	return $('.grid-box').width();
}

function removegrid(treeName, leafId) {

	if (treeName == 'auth-query') {
		return;
	}
	else if (treeName == 'auth-event') {
		var relVal = $("#" + leafId).attr("rel");
		if(relVal != 'default'){
			return;
		}
	}

	$('a#tab-save-btn').addClass("is-disabled");
	$("#loading-div").css("height", document.body.scrollHeight);

	$("#" + leafId + " a:first").children('.open_arrow').remove();
	$("#" + leafId).removeClass("grid-added");
	$("#" + treeName + "-grid-" + leafId).jqGrid('GridDestroy');
	$("input[name=" + leafId + "-cb]").parent().remove();
	$("#" + treeName + "-grid-div-" + leafId).remove();
	$("#" + treeName + "-grid-area-" + leafId).remove();
	$("#" + treeName + "-ul-" + leafId).remove();

	$('a#tab-save-btn').removeClass("is-disabled");
}

function ysTreeAddGrid(treeName, leafId) {
	var html = 	"<ul id='" + treeName + "-ul-" + leafId + "' class='tree-grid-ul'>" +
					"<li id='" + treeName + "-grid-area-" + leafId + "' style='padding-top:2px; padding-bottom: 2px;'>" +
						"<div id='" + treeName + "-grid-div-" + leafId + "' style='margin: 5px 0px 10px 20px;'>" +
							"<table id='" + treeName + "-grid-" + leafId + "'></table>" +
							"<div id='" + treeName + "-pager-" + leafId + "'></div>" +
						"</div>" +
						"<div id='table-show-" + leafId + "' style='padding-left: 50px;line-height: 100%; display: none;'>"+ msgNoData +"</div>" +
					"</li>" +
				"</ul>";
	$("#" + leafId + " a:first").after(html);
}

function ysAddEventGrid(treeName, leafId) {
	var html = "";
	if ($("#" + leafId).hasClass("jstree-last") && $("#" + leafId).find("ul").length == 0) {
		html = "<ul id='auth-event-ul-" + leafId + "'><li id='auth-event-grid-area-" + leafId + "' style='background:none; margin-left: 0px;'><div id='auth-event-grid-div-" + leafId + "' style='padding-top:2px; padding-bottom: 2px;margin-left: 86px;' class='.yscontainer'>" + "<table id='auth-event-grid-" + leafId
				+ "'></table>" + "<div id='auth-event-pager-" + leafId + "'></div></div>" + "<div id='table-show-" + leafId + "' style='min-height: 18px; padding-left:83px;padding-top:13px;display: none;'>"+msgNoData+"</div></li></ul>";
		$("#" + leafId).after(html);
	}
	else if ($("#" + leafId).find("ul").length == 0) {
		html = "<ul id='auth-event-ul-" + leafId + "'><li class='jstree-leaf' style='padding-top:2px; padding-bottom: 2px;' id='auth-event-grid-area-" + leafId + "'>" + "<div id='auth-event-grid-div-" + leafId + "' style='margin-left: 53px;' class='.yscontainer'>" + "<table id='auth-event-grid-" + leafId
				+ "'></table>" + "<div id='auth-event-pager-" + leafId + "'></div></div>" + "<div id='table-show-" + leafId + "' style='padding-left:50px;padding-top:13px;display: none;'>"+msgNoData+"</div></li></ul>";
		$("#" + leafId).after(html);
	}
	// 如果是树的最后一个节点，则不需要节点前的连线的样式
	else {
		html = "<ul id='auth-event-ul-" + leafId + "'><li class='jstree-leaf' style='padding-top:2px; padding-bottom: 2px;' id='auth-event-grid-area-" + leafId + "'>" + "<div id='auth-event-grid-div-" + leafId + "' style='margin-left: 30px;' class='.yscontainer'>" + "<table id='auth-event-grid-" + leafId
				+ "'></table>" + "<div id='auth-event-pager-" + leafId + "'></div></div>" + "<div id='table-show-" + leafId + "' style='min-height: 18px; padding-left:50px;padding-top:13px;display: none;'>"+msgNoData+"</div></li></ul>";
		$("#" + leafId + " a:first").after(html);
	}
}

function ysgridCompleteFunction(treeName, leafId, treeBox, authSetting) {

	// 删除之前的每条数据对应的复选框，主要用于翻页时候用
	$("input[name=" + leafId + "-cb]").parent().remove();

	// 根据读出来的数据的位置，动态的添加对应的复选框
	if ($("#" + treeName + "-grid-" + leafId).getDataIDs().length > 0) {

		var ids = $("#" + treeName + "-grid-" + leafId).getDataIDs();

		// GRID CHECKBOX 显示
		treeBox.jqgridcheckbox(leafId);
		
		// 根据当前取得的数据的userId的序列，调用后台方法取得相应的权限的信息
		var url = "security";
		if (fromPath.indexOf("target-") > -1) {
			url = "common/target";
		}
		var domainUrl = top.jzAppVars().domainUrl;
		var showObjectId = objectId;
		var authList = getNewResourceIds().toString();
		if(parentObjId && $('input[name=targetAllFlg]:checked').val()=="-1"){
			showObjectId = parentObjId;
			authList = "";
		}
		$.ajax({
			url : domainUrl + "/admin/" + url + "/get-user-auth-list/" + fromPath,
			data : {
				objectId : showObjectId,
				objectAuthType : objectAuthType,
				userIds : ids.toString(),
				//resNodeTypes: "us,me",
				authList: authList
			},
			type : 'POST',
			async : false,
			success : function(data) {
				$("input[name=" + leafId + "-cb]").removeAttr("disabled");
				ids = $("#" + treeName + "-grid-" + leafId).getDataIDs();
				var resourceServerUrl = top.jzAppVars().resourceServerUrl;
				if (resourceType != '' && resourceType != null && resourceType == 'membershipUseNoTitle') {
					for (var i = 0; i < ids.length; i++) {
						for (var j = 0; j < userArray.length; j++) {
							if (ids[i].indexOf(userArray[j]) != -1) {
								var checkboxId = '0-' + treeName + '-tree-grid-' + ids[i] + '-cb';
								$("#" + checkboxId).attr("checked", true);
								$("#" + checkboxId).next('i').show();
								$("#" + checkboxId).parents('tr:first').addClass('jggrid-selected');
								$("#" + checkboxId + "-img").show();
								$("#" + checkboxId).addClass("stand-alone");
							}
						}
					}
				}
				else {
					for ( var i = 0; i < ids.length; i++) {
						var userId = _AUTH_NODE_TYPE_RESOURCE_USER + ids[i].substring(ids[i].lastIndexOf("_") + 1),
							checkboxId = '0-' + treeName + '-tree-grid-' + ids[i] + '-cb',
							authValue = data[userId];
						
						if (authValue != undefined) {
							if (authValue[0] == _AUTH_YES) {
								$("#" + checkboxId).attr("checked", true);
								//$("#" + checkboxId).next('i').show();
								$("#" + checkboxId).nextAll('i.tree-node-excepted-icon').hide();
								$("#" + checkboxId).nextAll('i.tree-node-selected-icon').show();
								
								$("#" + checkboxId).parents('tr:first').addClass('jggrid-selected');
								$("#" + checkboxId).parents('tr:first').removeClass('jggrid-excepted');
							}
							else if (authValue[0] == _AUTH_NO) {
								$("#" + checkboxId).attr("checked", false);
								//$("#" + checkboxId).next('i').hide();
								$("#" + checkboxId).nextAll('i.tree-node-selected-icon').hide();
								$("#" + checkboxId).nextAll('i.tree-node-excepted-icon').show();

								$("#" + checkboxId).parents('tr:first').removeClass('jggrid-selected');
								$("#" + checkboxId).parents('tr:first').addClass('jggrid-excepted');
							}

							if (authValue[1] == _AUTH_INHERITED) {
								//$("#" + checkboxId + "-img").hide();
								$("#" + checkboxId).addClass("inherited");
								$("#" + checkboxId).removeClass("stand-alone");
								
								$("#" + checkboxId).nextAll('i').removeClass("oneself-stand-alone-mark");
							}
							else if (authValue[1] == _AUTH_STANDALONE) {
								//$("#" + checkboxId + "-img").show();
								$("#" + checkboxId).addClass("stand-alone");
								$("#" + checkboxId).removeClass("inherited");
								
								if (authValue[0] == _AUTH_YES) {
									$("#" + checkboxId).nextAll('i.oneself-stand-alone-mark').removeClass("oneself-stand-alone-mark");
									$("#" + checkboxId).nextAll('i.tree-node-selected-icon').addClass("oneself-stand-alone-mark").attr("guidance", "対象設定を解除する");
								}
								else if (authValue[0] == _AUTH_NO) {
									$("#" + checkboxId).nextAll('i.oneself-stand-alone-mark').removeClass("oneself-stand-alone-mark");
									$("#" + checkboxId).nextAll('i.tree-node-excepted-icon').addClass("oneself-stand-alone-mark").attr("guidance", "対象にする");
								}
							}
						}else{
							var $leftLi = $("#" + treeName + "-grid-div-" + leafId).closest("ul").closest("li");
							if($leftLi.children("a").hasClass("jstree-excepted")){
								$("#" + checkboxId).attr("checked", false);
								//$("#" + checkboxId).next('i').hide();
								$("#" + checkboxId).nextAll('i.tree-node-selected-icon').hide();
								$("#" + checkboxId).nextAll('i.tree-node-excepted-icon').show();

								$("#" + checkboxId).parents('tr:first').removeClass('jggrid-selected');
								$("#" + checkboxId).parents('tr:first').addClass('jggrid-excepted');
							}
						}
					}
				}
//				if ($("#"+leafId).children("div").find('input').attr("checked")) {
//					changeChildrenAuth(leafId, _AUTH_YES);
//				} 
//				else {
//					changeChildrenAuth(leafId, _AUTH_NO);					
//				}
				
			},
			dataType : "json"
		});

		if(authSetting.pageShowStatus == "Container"){
			//继承元链接显示调用的方法
			controlParentLink();
		}
		
		$("#" + treeName + "-grid-div-" + leafId).show();
		$("#table-show-" + leafId).remove();
	}
	else {
		$("#table-show-" + leafId).show();
		$("#" + treeName + "-grid-" + leafId).jqGrid('GridDestroy');
	}
	clickSortCss(leafId);
}

function ysgridCompleteMember(treeName, leafId, treeBox) {
	$("#jqgh_" + treeName + "-grid-" + leafId + "_userName a").click(function(e) {
		sortBeforeGetSelect(leafId);
	});
	$("#jqgh_" + treeName + "-grid-" + leafId + "_mail a").click(function(e) {
		sortBeforeGetSelect(leafId);
	});

	sortAfterSetSelect(leafId);

	if ($("#" + treeName + "-grid-" + leafId).getDataIDs().length > 0) {

		// GRID CHECKBOX 显示
		treeBox.jqgridcheckbox(leafId);

		$("#" + treeName + "-grid-div-" + leafId).show();
		var ids = $("#" + treeName + "-grid-" + leafId).getDataIDs();
		// 根据user的列表读取独自授权的情况，独自授权的变粉
		var url = "security";
		if (fromPath.indexOf("target-") > -1) {
			url = "common/target";
		}
		var domainUrl = top.jzAppVars().domainUrl;
		$.post(domainUrl + "/admin/" + url + "/get-user-standalone-list/" + fromPath + "/" + objectAuthType, {
			userIds : ids.toString()
		}, function(data) {
			for ( var i = 0; i < data.length; i++) {
				$("#" + leafId + '_' + data[i].substring(_AUTH_NODE_TYPE_RESOURCE_USER.length)).find("td").eq(1).addClass("user-standalone");
			}
		}, "json");

		initParentSelection(treeName + "-grid-" + leafId);
		$("#table-show-" + leafId).remove();
	}
	else {
		// 如果没有数据，则不显示表格，并显示提示
		$("#table-show-" + leafId).show();
		$("#" + treeName + "-grid-" + leafId).jqGrid('GridDestroy');
	}
	clickSortCss(leafId);
}

/**
 * 点击CHECKBOX触发事件
 * 
 * @param thisObj
 * @returns
 */
function changeAuth(checkboxId) {
	var resourceServerUrl = top.jzAppVars().resourceServerUrl;
	$("#" + checkboxId).each(
		function(){
			//console.log("changeAuth("+checkboxId+")");
			
			var $chekcbox = $(this);
			if ($chekcbox.hasClass("inherited")) {
				$chekcbox.addClass("inherited-canceled");
				$chekcbox.removeClass("inherited");
			}
			else if ($chekcbox.hasClass("inherited-canceled")) {
				$chekcbox.addClass("inherited");
				$chekcbox.removeClass("inherited-canceled");
			}
			else if (resourceType == 'membershipUseNoTitle' && $chekcbox.hasClass("stand-alone")) {
				$chekcbox.addClass("no-path");
				$chekcbox.siblings("i").hide();
				$chekcbox.removeClass("stand-alone");
			}
			else if (resourceType == 'membershipUseNoTitle' && $chekcbox.hasClass("no-path")) {
				$chekcbox.addClass("stand-alone");
				$chekcbox.removeClass("no-path");
			}
			else if ($chekcbox.hasClass("stand-alone")) {
				$chekcbox.addClass("no-path");
				$chekcbox.removeClass("stand-alone");
			}
			else if ($chekcbox.hasClass("no-path")) {
				$chekcbox.addClass("stand-alone");
				$chekcbox.removeClass("no-path");
			}
			else if ($chekcbox.hasClass("new-stand-alone")) {
				$chekcbox.removeClass("new-stand-alone");
			}
			else {
				$chekcbox.addClass("new-stand-alone");
			}
		}
	)
}

function saveAuthChanges() {
	
	$('a#tab-save-btn').addClass("is-disabled");
	$("#loading-div").css("height", document.body.scrollHeight);
	var resourceServerUrl = top.jzAppVars().resourceServerUrl;
	var resourceIds = new Array();
	var n = 0;
	
	/*
	// 将改变过的复选框，放入一个序列当中
	$("input.function-cb").each(function() {
		if ($(this).hasClass("inherited-canceled") || $(this).hasClass("new-stand-alone") || $(this).hasClass("stand-alone")) {
			var auth = $(this).attr("checked") == "checked" ? _AUTH_YES : _AUTH_NO;
			resourceIds[n] = $(this).val() + '#' + auth;
			n++;
		}
		else if ($(this).hasClass("no-path")) {
			resourceIds[n] = $(this).val();
			n++;
		}
	});
	*/
	var resourceIds = saveResourceIds;

	
	// 保存设置
	var url = "security";
	if (fromPath.indexOf("target-") > -1) {
		url = "common/target";
	}
	var domainUrl = top.jzAppVars().domainUrl;
	
	//console.log("postMessage -> " + objectAuthType+":"+resourceIds.toString() + " @saveAuthChanges()");
	window.parent.postMessage(objectId +"+"+objectAuthType+":"+resourceIds.toString(), domainUrl);
	
	//jzMsgBox(successMsg('I_0000_114'));
	setTimeout(function(){
		//parent.$('#YSDialogjzMsgBox').dialog('close'); 
		if(parent.$('#YSDialogIframe').hasClass('iziModal')){
			parent.$('#YSDialogIframe').YSModalDialog('close');
		}else{
			parent.$('#YSDialogIframe').dialog('close');
		}
		$('a#tab-save-btn').removeClass("is-disabled");
		},1000);
}

function isMemberListTargetBox(){
	if ($('#target-box-container').css('display') != 'block') {
		return true;
	}
	if( $('.guest-user-show').css('display') == 'block'){
		return true;
	}
	
	return false;
}


function showMemberListTargetBox(){
	$(".ui-widget-overlay").remove();
	$("#target-box-container").hide();
	$(".title").hide();
	$(".relation-line").hide();
	
	$(".target-tab").each(function() {
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		}
	});
	
	if( $("#excepted-memberlist").hasClass("selected") ){
		$(".memberlist-tab-single").removeClass("selected");
		$("#all-memberlist").addClass("selected");
	}
	
	$(".ml-eazy-filter-btn").off("click");
	$(".ml-eazy-filter-btn").click(function() {
		var $this = $(this);
		
		$('a#tab-save-btn').addClass("is-disabled");
		setTimeout(
			function(){
				var newResourceIds = getNewResourceIds();
				if(!$this.hasClass("selected")){
					$('.ml-eazy-filter-btn').removeClass("selected");
					$this.addClass("selected");
					if($this.attr("id") == "excepted-memberlist"){
						objectExceptedAuthType = objectAuthType;
					}else{
						objectExceptedAuthType = "";
					}
					updateMemberList(newResourceIds);
					$('a#tab-save-btn').removeClass("is-disabled");
				}
				$('a#tab-save-btn').removeClass("is-disabled");
			}
		,1);
		
		return true;
	});

}

function authMemberListFresh(authList) {
	//console.log("authMemberListFresh( " + authList.toString() + " )");
	var domainUrl = top.jzAppVars().domainUrl;
	
	$(".target-tab").removeClass("exist-selected");
	
	if(authList.toString().match(/take over auth/)){
		if($("#auth-membership-tree").has(".jstree-selected").length > 0){
			$(".target-tab#membership-target-tab").addClass("exist-selected");
			
		}
		if($("#auth-group-tree").has(".jstree-selected").length > 0){
			$(".target-tab#hierarchy-target-tab").addClass("exist-selected");
			
		}
		if($("#auth-query-tree").has(".jstree-selected").length > 0){
			$(".target-tab#query-target-tab").addClass("exist-selected");
			
		}
		if($("#auth-event-tree").has(".jstree-selected").length > 0){
			$(".target-tab#event-target-tab").addClass("exist-selected");
			
		}
		
	}else{
		if(authList.toString().match(/me[0-9]*#/)){
			$(".target-tab#membership-target-tab").addClass("exist-selected");
			
		}
		if(authList.toString().match(/gr[0-9]*#/)){
			$(".target-tab#hierarchy-target-tab").addClass("exist-selected");
			
		}
		if(authList.toString().match(/qu[0-9]*#/)){
			$(".target-tab#query-target-tab").addClass("exist-selected");
			
		}
		if(authList.toString().match(/ev[0-9]*#/)){
			$(".target-tab#event-target-tab").addClass("exist-selected");
			
		}
	}
	
	$.post(domainUrl + "/admin/common/target/get-member-auth-num/" + objectId + "/" + objectAuthType, 
			{authList: authList.toString()}, function(data) {
				if(data){
					$("#target-num").html(data.targetNumAll);
					$("#no-target-num").html(data.allMemberNum - data.targetNumAll);
					$(".target-num.target-num-me").html(data.targetNumMe);
					$(".target-num.target-num-gr").html(data.targetNumGr);
					$(".target-num.target-num-ev").html(data.targetNumEv);
					$(".target-num.target-num-qu").html(data.targetNumQu);
				}else{
					$("#target-num").html("0");
					$("#no-target-num").html("0");
					$(".target-num.target-num-me").html("0");
					$(".target-num.target-num-gr").html("0");
					$(".target-num.target-num-ev").html("0");
					$(".target-num.target-num-qu").html("0");
				}
	}, "json"); 
	
}
window.authMemberListFresh = authMemberListFresh;


function getMemberParentsResourceInfo(resId, authList, resTypeList, fn) {
	
	var domainUrl = top.jzAppVars().domainUrl;
	$.post(domainUrl + "/admin/common/target/get-parent-resource-data/" + objectId + "/" + objectAuthType + "/" + resId, 
			{authList: authList.toString(), resTypeList: resTypeList}, function(data) {
				var resTypes = resTypeList.split(",");
				
				if(fn){
					fn(data);
				}
	}, "json"); 
}


var memberAuthListGrid;
var objectExceptedAuthType;

function updateMemberList(newResourceIds){
	targetAuthListSelect($("#memberListData"), objectId, objectAuthType);
}

function updateAuthResourceIds(oldAuth,newAuth){
	if(!oldAuth || !oldAuth[0]){
		return newAuth;
	}else if(!newAuth || !newAuth[0]){
		return oldAuth;
	}else{
		var newAuthArr = newAuth.slice();//.split(',');
		var oldAuthArr = oldAuth.slice();//.split(',');
		var resAuthStr = "";
		if(oldAuthArr[0] && (oldAuthArr[0].indexOf("gu")==0 || oldAuthArr[0].indexOf("take over auth")==0 || oldAuthArr[0].indexOf("clear")==0)){
			resAuthStr = oldAuthArr.shift();
		}
		if(newAuth[0] && (newAuth[0].indexOf("gu")==0 || newAuth[0].indexOf("take over auth")==0 || (oldAuthArr[0] && oldAuthArr[0].indexOf("clear")==0))){
			resAuthStr = newAuth.shift();
		}
		
		var oldAuthObj = {};
		for(var auth of oldAuthArr){
			var authArr = auth.split('#');
			oldAuthObj[authArr[0]]=(authArr.length>1?authArr[1]:"");
		}
		var newAuthObj = {};
		for(var auth of newAuthArr){
			var authArr = auth.split('#');
			newAuthObj[authArr[0]]=(authArr.length>1?authArr[1]:"");
			if(oldAuthObj[authArr[0]] == null){
				oldAuthArr.push(auth);
			}
		}

		for(var auth of oldAuthArr){
			var authArr = auth.split('#');
			if(resAuthStr){
				resAuthStr = resAuthStr + ",";
			}
			if(newAuthObj[authArr[0]]!=null){
				resAuthStr = resAuthStr + authArr[0] + (newAuthObj[authArr[0]]?("#" + newAuthObj[authArr[0]]):"");
			}else{
				resAuthStr = resAuthStr + auth;
			}
		}
		return resAuthStr.split(',');
	}
}
window.updateAuthResourceIds = updateAuthResourceIds;

function authsFormatter(cellvalue, options, rowObject) {
	var array = options.rowId.split("_");
	var objId = array[0];
	
	return authsFormatterCore(cellvalue, objId);
}

function authsFormatterCore(cellvalue, objId) {
	objId = objId.trim();
	//cellvalue;
	var iconMe,iconGr,iconQu,iconEv;
	iconMe=iconGr=iconQu=iconEv='<ins class="icon-no"></ins>';
	if(cellvalue){
		if(cellvalue.indexOf("me#Y")>=0){
			iconMe = '<a href="javascript:;" onclick="showSelectAuth(\'membership-target-tab\',\''+ objId +'\');"><ins class="jstree-icon icon-me"> </ins></a>';
		}
		if(cellvalue.indexOf("qu#Y")>=0){
			iconQu = '<a href="javascript:;" onclick="showSelectAuth(\'query-target-tab\',\''+ objId +'\');"><ins class="jstree-icon icon-qu"> </ins></a>';
		}
		if(cellvalue.indexOf("gr#Y")>=0){
			iconGr = '<a href="javascript:;" onclick="showSelectAuth(\'hierarchy-target-tab\',\''+ objId +'\');"><ins class="jstree-icon icon-gr"> </ins></a>';
		}
		if(cellvalue.indexOf("ev#Y")>=0){
			iconEv = '<a href="javascript:;" onclick="showSelectAuth(\'event-target-tab\',\''+ objId +'\');"><ins class="jstree-icon icon-ev"> </ins></a>';
		}
	}
	return iconMe+iconGr+iconQu+iconEv;
}
window.authsFormatterCore = authsFormatterCore;

var currentResId;
function showSelectAuth(tabId, resId){
	if(resId){
		currentResId = resId;
	}else{
		resId = currentResId;
	}
	
	$('#ui-widget-overlay').remove();
	$("body").append('<div id="ui-widget-overlay" class="ui-widget-overlay"></div>');
	$('.target-tab').removeClass('selected');
	$('#' + tabId).addClass('selected');
	$('#target-box-container .target-box').hide();
	$('#target-box-container .title').hide();
	$("#target-box-container .relation-line").hide();
	
	var id = $('#' + tabId).attr('id').replace('tab', 'show');
	if( $('input[name=targetAllFlg]:checked').val()=="1" ){
		$('#target-box-container .'+id).show();
		$('#target-box-container').slideDown(500);
		return;
	}else if( $('input[name=targetAllFlg]:checked').val()=="-1" ){
		
		if(parentObjId && parentObjTargetAll){
			$('.guest-user-show').show();
			return;
		}
		
		if(resId){
			$(".title."+ id + " .take-over-target-num").html("0");
		}
		//$('.'+id).show();
		$('#target-box-container').slideDown(500);
		$('#target-box-container .'+id).show();
		openSelectdMember(tabId, resId);
		
		setTimeout("drawRelationLine(\""+tabId+"\")",500);
		$('.'+id + " .jstree").on('open_node.jstree close_node.jstree',function (){
			if( $('input[name=targetAllFlg]:checked').val()=="-1" ){
				$('.relation-line').hide();
				drawRelationLine(tabId);
				//setTimeout("drawRelationLine(\""+tabId+"\")",100);
				//setTimeout("drawRelationLine(\""+tabId+"\")",100);
				//setTimeout("drawRelationLine(\""+tabId+"\")",500);
			}
		});
	}else {
		$('#target-box-container .'+id).show();
		$('#target-box-container').slideDown(500);
		
		openSelectdMember(tabId, resId);
	}
	$('#target-box-container').css("top", $('.tab-shadow').parent(".selected").offset().top + 40);
}
window.showSelectAuth = showSelectAuth;

function openSelectdMember(tabId, resId){
	var doDrawSameMemberLine = false;
	if( $('input[name=targetAllFlg]:checked').val()=="0" ){
		doDrawSameMemberLine = true;
	}
	
	var id = $('#' + tabId).attr('id').replace('tab', 'show');
	
	if(!resId){
		$('.'+id).find('li').removeClass("hide-tree");
	}
	else {
		//$('#'+id).find('li').each( function () { $(this).removeClass("jstree-open").addClass("jstree-closed"); } );
		
		var tabNodeTypes = "";
		if(tabId == "membership-target-tab"){
			tabNodeTypes = "me,us";
		}else if(tabId == "hierarchy-target-tab"){
			tabNodeTypes = "gr";
		}else if(tabId == "query-target-tab"){
			tabNodeTypes = "qu";
		}else if(tabId == "event-target-tab"){
			tabNodeTypes = "ev";
		}
		
		getMemberParentsResourceInfo(resId, saveResourceIds, tabNodeTypes, 
			function(data){
				var nodeType = tabNodeTypes.split(",")[0];
				var meList = data[nodeType];
				var boxId = $("#"+tabId).attr('id').replace('tab', 'box');
				
				/*
				if( $('input[name=targetAllFlg]:checked').val()=="-1" ){
					$('#'+boxId).find('li').addClass("hide-tree");
				}
				*/
				if (!meList || !meList[0]) {
					return;
				}
				var parentNodeIds = [];
				$.each(meList, function(){
					var nodeId = this.split(":")[0];
					var path = this.split(":")[1];
					
					openSelfAndParentNode(tabId, nodeType, nodeId);
					
					if($("#"+boxId).find("#"+ nodeType + nodeId).hasClass("jstree-leaf")){
						parentNodeIds.push(nodeId);
					}
				});
				
				$("#"+boxId).find(".current-show").hide();
				$("#"+boxId).find(".current").remove("current");
				
				if(nodeType == "me" && false){
					addSelectedFunction(boxId, 'us' + resId, 'tr', 
						function($self){
							$self.addClass("current");
							
							addSelectedFunction($self.attr("id"),'us' + resId, '.jqgrid-select-icon-box', 
								function($self){
								
									if(doDrawSameMemberLine){
											drawSameMemberLine(tabId, resId);
									}
								
							});
						});
				}else{
					
					var info = data.info[0] + "　　　　" + data.info[1];
					//console.log("info : " + info);
					
					$.each(parentNodeIds, function(){
						addSelectedFunction(boxId, nodeType + this, 'li', 
								function($self){
									if(!$self.children("a").hasClass('jstree-selected')){
										return;
									}
									
									if(!$self.children("ul")[0]){
										$self.append('<ul class="current-show"></ul>');
									}
									$self.children("ul");
									//$self.append("<ul></ul>");
									//$self.children("ul").prepend('<li class="current-show"><a class="jstree-selected current" style="width:auto;" href="javascript:;" onclick="top.showPersonalData(\''+resId+'\',\''+data.info[1]+'\',\''+data.info[0]+'\',\'\',\'\');"><span>' +　data.info[0] +"</span><span>" + data.info[1] +"<span></a></li>");
									$self.children("ul").prepend('<li class="current-show"><a class="jstree-selected current" style="width:auto;" href="javascript:;" onclick="showSelectAuth(\'membership-target-tab\',\''+resId+'\');"><span>' +　data.info[0] +"</span><span>" + data.info[1] +"<span></a></li>");
									
						});
					});
				}
				
			}
		);
	}
}


function addSelectedFunction(divId, inputValue, elementType, fn, time){
	var maxTime = 5;
	if(!time){
		time = maxTime;
	}else if(time < 0){
		return;
	}
	
	var $self =$("#"+divId).find('input[value="' + inputValue +'"]').closest(elementType);
	if(time<maxTime && $self[0] && ($self).is(':visible')){
		if(fn){
			setTimeout(function(){fn($self)}, 100);
		}
	}else{
		setTimeout(
				function(){
					addSelectedFunction(divId, inputValue, elementType, fn, time -1);
				}
		, 100);
	}
	
}

function openSelfAndParentNode(tabId, nodeType, nodeId){
	var boxId = $("#"+tabId).attr('id').replace('tab', 'box');
	/*
	if(nodeType=="me"){
		var $self = $("#"+boxId).find('input[value="'+nodeType + nodeId+'"]').closest('li');
	}
	else{
		var $self = $("#"+boxId).find('input[value="'+nodeType + nodeId+'"]').closest('li.subchild-selected');
	}
	*/
	var $self = $("#"+boxId).find('input[value="'+nodeType + nodeId+'"]').closest('li');
	
	if($self.hasClass("jstree-leaf")){
		if(!$self.hasClass("jstree-open")){
			$("#"+boxId+" .jstree").jstree("open_node", $self);
		}
	}else{
		$("#"+boxId+" .jstree").jstree("open_node", $self);
	}
}

var saveResourceIds = [];
var limitResourceIds = [];
function getNewResourceIds(newResourceIds){
	//console.log("getNewResourceIds  <- " + newResourceIds );
	
	if(newResourceIds){
		
		if(newResourceIds.indexOf('take over auth')>=0){
			$('#targetTakeOver').prop('checked', true);
		}else if(newResourceIds.indexOf('gu0#Y')>=0){
			$('#targetAllFlgYes').prop('checked', true);
		}else{
			$('#targetAllFlgNo').prop('checked', true);
			limitResourceIds = newResourceIds.slice();
		}
	}
	else{
		
		var newResourceIds = new Array();
		var curResourceIds = new Array();
		
		// 将改变过的复选框，放入一个序列当中
		$("input.function-cb").each(function() {
			if ($(this).hasClass("inherited-canceled") || $(this).hasClass("new-stand-alone") || $(this).hasClass("stand-alone")) {
				var auth = $(this).attr("checked") == "checked" ? _AUTH_YES : _AUTH_NO;
				curResourceIds.push( $(this).val() + '#' + auth );
			}
			else if ($(this).hasClass("no-path")) {
				curResourceIds.push( $(this).val() );
			}
		});
		
		if(curResourceIds[0]){
			limitResourceIds = updateAuthResourceIds(limitResourceIds,curResourceIds.slice());
			//console.log("limitResourceIds  <- " + limitResourceIds + "  <- " + curResourceIds );
		}
		
		newResourceIds = curResourceIds.slice();
		//console.log("getNewResourceIds  <- " + newResourceIds );
		
		if( $('input[name=targetAllFlg]:checked').val()=="-1" ){
			newResourceIds = ["take over auth"];
		}else if( $('input[name=targetAllFlg]:checked').val()=="1" ){
			if(newResourceIds[0] && (newResourceIds[0].indexOf("gu0")==0 || newResourceIds[0].indexOf("take over auth")==0)){
				newResourceIds.shift();
			}
			newResourceIds.unshift("gu0#Y");
		}else{
			newResourceIds = limitResourceIds.slice();
			
			if(newResourceIds[0] && (newResourceIds[0].indexOf("gu0")==0 || newResourceIds[0].indexOf("take over auth")==0)){
				newResourceIds.shift();
			}
			if(!newResourceIds[0]){
				newResourceIds=["gu0"];
			}else if(newResourceIds[0] != "clear"){
				newResourceIds.unshift("gu0");
			}

		}
		//console.log("getNewResourceIds  => " + newResourceIds );
	}
	
	//console.log("limitResourceIds  <= " + limitResourceIds );
	
	return newResourceIds;
}
window.getNewResourceIds = getNewResourceIds;

var beforeChangeTargetType = "";
function changeTargetType(type){
	if(type == "0" && beforeChangeTargetType != "0"){
		limitResourceIds = [];
		$("input.function-cb").each(function() {
			$(this).removeClass("inherited-canceled");
			$(this).removeClass("new-stand-alone");
			$(this).removeClass("stand-alone");
		});
		
		updateAuthChanges(["clear","me0#Y"]);
	}else{
		updateAuthChanges();
	}
	
	
	beforeChangeTargetType = "";
}
window.changeTargetType = changeTargetType;

function updateAuthChanges(initResourceIds, isFreshMemberList = true){
	//console.log(`updateAuthChanges(${initResourceIds}, ${isFreshMemberList})`);
	$('a#tab-save-btn').addClass("is-disabled");
	setTimeout(
		function(){
			var showObjectId = objectId;
			
			if(!initResourceIds){
				initResourceIds = getNewResourceIds()
			}
			
			if( initResourceIds && initResourceIds.indexOf("take over auth")>=0){
				if(parentObjId){
					showObjectId = parentObjId;
					initResourceIds = "";
				}
			}
			
			updateAuthTrees(showObjectId, initResourceIds, 
				function(){
					_updateAuthChanges(initResourceIds, isFreshMemberList);
				});
								
			
			$('a#tab-save-btn').removeClass("is-disabled");
		}
	,100);
}
window.updateAuthChanges = updateAuthChanges;

function _updateAuthChanges(initResourceIds, isFreshMemberList = true) {
	//console.log("_updateAuthChanges(" + initResourceIds + ")");
	var newResourceIds = getNewResourceIds(initResourceIds);
	objectExceptedAuthType = "";
	
	authMemberListFresh(newResourceIds);
	
	if(isFreshMemberList){
		showMemberListTargetBox();
		updateMemberList(newResourceIds);
	}
	
	saveResourceIds = newResourceIds.slice();
	//console.log("saveResourceIds <- " + saveResourceIds + " @_updateAuthChanges()");
	
	var showObjectId = objectId;
	
	$('.target-type-display').hide().css("visibility","hidden");
	//$('.target-type-display').show().css("visibility","visible");
	if( $('input[name=targetAllFlg]:checked').val()=="1" ){
		//$('#object-tree-wrap').hide();
		clearRelationLine();
		$('.target-box').css('width','100%');
		$('#member-list-target-box').css('width','100%');
		
		$('.guest-user-hidden').hide().css("visibility","hidden");
		$('.guest-user-show').show().css("visibility","visible");
		
	}else if( $('input[name=targetAllFlg]:checked').val()=="-1" ){
		if(window["parentObjName"]){
			$("#objectName").html(window["parentObjName"]);
		}
		
		if(parentObjId && parentObjTargetAll){
			clearRelationLine();
			$('.target-box').css('width','100%');
			$('#member-list-target-box').css('width','100%');
			
			$('.guest-user-hidden').hide().css("visibility","hidden");
			$('.guest-user-show').show().css("visibility","visible");
			return;
		}
		
		if(parentObjId){
			showObjectId = parentObjId;
			newResourceIds = "";
		}
		$('.guest-user-hidden').show().css("visibility","visible");
		$('.guest-user-show').hide().css("visibility","hidden");
		
		//$('#object-tree-wrap').show();
		
		$('.target-box').css('width','53%');
		$('#member-list-target-box').css('width','100%');
		
		$('.take-over-target-show').show().css("visibility","visible");
		$('.take-over-target-hidden').hide().css("visibility","hidden");
		
	}else {
		
		//$('#object-tree-wrap').hide();
		
		clearRelationLine();
		
		$('.target-box').css('width','100%');
		$('#member-list-target-box').css('width','100%');
		
		$('.guest-user-hidden').show().css("visibility","visible");
		$('.take-over-target-hidden').show().css("visibility","visible");
	}
	
	closeAllTree();
}


function updateAuthMemberList(updateResourceIds, fn){	
	$('a#tab-save-btn').addClass("is-disabled");
	
	limitResourceIds = updateAuthResourceIds(getNewResourceIds(),updateResourceIds);
	
	updateTempAuthData(objectId, limitResourceIds, function(data){
		$('a#tab-save-btn').removeClass("is-disabled");
		saveResourceIds = limitResourceIds;
		authMemberListFresh(saveResourceIds);
		
		var memberIds = "";
		limitResourceIds.forEach(function(ral){
			if(ral.indexOf("us")==0){
				memberIds = memberIds + (memberIds == ""? "" : ",") + ral.split("#")[0].replace("us","");
			}
		});
		getMemberTempAuthData(objectId, limitResourceIds, memberIds, function(auths){
			for (var memberId in auths){
				if(memberId.indexOf("status")<0){
					auths[memberId]
					fn("row-"+memberId , auths[memberId]);
				}
			}
		});
	});
	
}
window.updateAuthMemberList = updateAuthMemberList;

function updateAuthTrees(objectId, newResourceIds, callback){
	//console.log(`updateAuthTrees(${objectId}, ${newResourceIds}, ${callback})`);
	
	$('a#tab-save-btn').addClass("is-disabled");
	
	updateTempAuthData(objectId, newResourceIds, function(data){
				
				parentResourceId = '';
				
				var $targetTree = $('#auth-membership-tree, #auth-group-tree, #auth-query-tree, #auth-event-tree, #auth-product-tree');
				$targetTree.each(function(){
					$(this).find("input.function-cb").attr("checked", false).removeAttr("class").attr("class", "function-cb");
					$(this).find("div[id^='count-pin-']").hide();
					$(this).find("i[id$='cb-img'],i.fa-check,i.tree-node-selected-icon,i.tree-node-excepted-icon").hide();
					$(this).find("li.subchild-selected").removeClass("subchild-selected");
					$(this).find("a.jstree-selected").removeClass("jstree-selected");
					$(this).find("a.jstree-excepted").removeClass("jstree-excepted");
					$(this).find("tr").removeClass("jggrid-selected");
					$(this).find("tr").removeClass("jggrid-excepted");					
				});
				
				// 根据设置过的情况，重新读取权限的设置情况
				if (data.resourceAuthList && (data.resourceAuthList instanceof Array)){
					var countSL = {};
					
					for ( var i = 0; i < data.resourceAuthList.length; i++) {
						var resourceAuth = data.resourceAuthList[i];
						var authValue = resourceAuth.split(",");
						if (authValue instanceof Array) {
							$("input[value=" + authValue[0] + "]").parent().children("i.tree-node-selected-icon").removeClass("oneself-stand-alone-mark").hide();
							$("input[value=" + authValue[0] + "]").parent().children("i.tree-node-excepted-icon").removeClass("oneself-stand-alone-mark").hide();
							
							if (authValue[1] == _AUTH_YES && authValue[2] == _AUTH_STANDALONE){
								var type = authValue[0].substr(0,2);
								var incr = 1;								
								if(authValue.length > 3){
									incr = authValue[3];
								}
								if(countSL[type]){
									countSL[type]+=incr;
								}else{
									countSL[type]=incr;
								}
							}
							
							if (authValue[1] == _AUTH_YES) {
								
								$("input[value=" + authValue[0] + "]").each(
									function(){
										var $input = $(this);
										$input.attr("checked", true);
										$input.parent().children("i.tree-node-selected-icon").show();
										$input.parents('tr:first').removeClass('jggrid-excepted');
										$input.parents('tr:first').addClass('jggrid-selected');
									}
								); 
								
								$("#" + authValue[0]).children('a').removeClass("jstree-excepted");
								$("#" + authValue[0]).children('a').addClass("jstree-selected");
								
							}
							else if (authValue[1] == _AUTH_NO) {
								$("input[value=" + authValue[0] + "]").each(
									function(){
										var $input = $(this);
										$input.attr("checked", false);
										$input.parent().children("i.tree-node-excepted-icon").show();
										$input.parents('tr:first').removeClass('jggrid-selected');
										$input.parents('tr:first').addClass('jggrid-excepted');
									}
								);
								
								$("#" + authValue[0]).children('a').removeClass("jstree-selected");
								$("#" + authValue[0]).children('a').addClass("jstree-excepted");
							}

							if (authValue[2] == _AUTH_INHERITED) {
								$("input[value=" + authValue[0] + "]").each(
									function(){
										var $input = $(this);
										$input.parent().children("i[id$='cb-img']").hide();
										$input.addClass("inherited");
									}
								);
								
							}
							else if (authValue[2] == _AUTH_STANDALONE) {
								$("input[value=" + authValue[0] + "]").addClass("stand-alone");
								if($("#" + authValue[0]).children('a').hasClass("jstree-selected") || $("input[value=" + authValue[0] + "]").parents('tr:first').hasClass('jggrid-selected')){
									$("input[value=" + authValue[0] + "]").parent().children("i.tree-node-selected-icon").addClass("oneself-stand-alone-mark");
									$("input[value=" + authValue[0] + "]").parent().children("i.tree-node-excepted-icon")
								}else{
									$("input[value=" + authValue[0] + "]").parent().children("i.tree-node-excepted-icon").addClass("oneself-stand-alone-mark");
									$("input[value=" + authValue[0] + "]").parent().children("i.tree-node-excepted-icon").show();
									
									if(!$("input[value=" + authValue[0] + "]").parent().hasClass("jqgrid-select-icon-box")){
										var children = $("input[value=" + authValue[0] + "]").closest('li').children('ul').find("input");
										children.each(
											function(){
												var $input = $(this);
												var $currentLi = $(this).closest('li');
												
												if($input.parent().hasClass("jqgrid-select-icon-box")){
													if(!$input.parents('tr:first').hasClass("jggrid-selected")
															&& !$input.parents('tr:first').hasClass("jggrid-excepted")){
														$input.parent().children("i.tree-node-excepted-icon").show();
														$input.parents('tr:first').removeClass('jggrid-selected');
														$input.parents('tr:first').addClass('jggrid-excepted');
													}
												}else{
													if(!$currentLi.children('a').hasClass("jstree-selected")
															&& !$currentLi.children('a').hasClass("jstree-excepted")){
														
														$currentLi.children('a').addClass("jstree-excepted");
														$(this).parent().children("i.tree-node-excepted-icon").removeClass("oneself-stand-alone-mark").show();
													}

												}
											}
										);
									}
									
								}
							}
						}
					}
				}
				
				//show count of stand alone !
				
				var meCount = 0;
				if(countSL["me"]){
					meCount = 1 * countSL["me"];
				}
				/*
				if(countSL["us"]){
					meCount = meCount + 1 * 1*countSL["us"];
				}
				*/
				if(meCount){
					$(".take-over-target-num.target-num-me").html(meCount);
				}
				
				if(countSL["gr"]){
					$(".take-over-target-num.target-num-gr").html(countSL["gr"]);
				}
				if(countSL["qu"]){
					$(".take-over-target-num.target-num-qu").html(countSL["qu"]);
				}
				if(countSL["ev"]){
					$(".take-over-target-num.target-num-ev").html(countSL["ev"]);
				}
				
				// 淺 色图钉
				for ( var i = 0; i < data.lightPinset.length; i++) {
					var resId = data.lightPinset[i];

					var $countPin = $('#count-pin-' + resId);
					if(!$countPin.is(':visible')){
						if (resId.indexOf("gr") >= 0
								&& $countPin.closest("li").find(".jstree-selected,.jstree-excepted").length == 0){
						}else{
						
							if($countPin.closest("li").hasClass("jstree-leaf")){
								$countPin.html('<i class="jstree-icon icon-arrow subchild-stand-alone-mark oneself-stand-alone" aria-hidden="true"></i>').attr('style', "display: inline-block;");
							}else{
								$countPin.html('<i class="jstree-icon icon-arrow subchild-stand-alone-mark" aria-hidden="true"></i>').attr('style', "display: inline-block;");
							}
							$countPin.closest("li").addClass("subchild-selected");
						}
					}

				}
				
				$("#parent-notice-div").hide();
				parent.$('#popup-event-list-button').validationEngine('hide');
				
				
				if(data.tempAuthList){
					limitResourceIds = data.tempAuthList.split(",");
				}
				
				if(callback!=null){
					callback(data.tempAuthList);
				}
			});
}

function updateTempAuthData(objectId, newResourceIds, fn){	
	var domainUrl = top.jzAppVars().domainUrl;
	var url = "security";
	if (fromPath.indexOf("target-") > -1) {
		url = "common/target";
	}
	alert("8")
	$.ajax({
		url : domainUrl + "/admin/" + url + "/update-temp-auth-by-objectid/" + fromPath,
		data : {
			objectId : objectId,
			objectAuthType : objectAuthType,
			authList : (newResourceIds || []).toString()
		},
		type : 'POST',
		async : false,
		success : function(data) {
			
			if (data.result == _STATUS_SUCCESS) {
				if(fn){
					fn(data);
				}
			} else {
				jzMsgBox(errorMsg("E_0000_001"), 'alert');
			}
		},
		error : function(data)  {
			jzMsgBox(errorMsg("E_0000_001"), 'alert');
		},
		dataType : "json"
	});
}
window.updateTempAuthData = updateTempAuthData;


function getMemberTempAuthData(objectId, newResourceIds, memberIds, fn){	
	var domainUrl = top.jzAppVars().domainUrl;
	var url = "security";
	if (fromPath.indexOf("target-") > -1) {
		url = "common/target";
	}
	$.ajax({
		url : domainUrl + "/admin/" + url + "/get-member-auth-map/" + objectId + "/" + objectAuthType,
		data : {
			objectId : objectId,
			objectAuthType : objectAuthType,
			authList : (newResourceIds || []).toString(),
			memberIds: memberIds,
		},
		type : 'POST',
		async : false,
		success : function(data) {
			
			if (data.result == _STATUS_SUCCESS) {
				if(fn){
					fn(data);
				}
			} else {
				jzMsgBox(errorMsg("E_0000_001"), 'alert');
			}
		},
		error : function(data)  {
			jzMsgBox(errorMsg("E_0000_001"), 'alert');
		},
		dataType : "json"
	});
}
window.getMemberTempAuthData = getMemberTempAuthData;

function getPos(e, a){
	var x=0,y=0;
	
	if(e){
		var offset = e.offset();
		if(offset){
			var x=offset.left, y=offset.top, w = e.width(), h = e.height();
			
			if(a.indexOf("I")>-1){
				w = e.innerWidth();
				h = e.innerHeight();
			}
			if(a.indexOf("O")>-1){
				w = e.outerWidth(true);
				h = e.outerHeight(true);
			}
				
			var m = 2;
			if(a.indexOf("T")>-1){
				x = x + (w / 2);
				y = y - m;
			}
			if(a.indexOf("B")>-1){
				x = x + (w / 2);
				y = y + h + m;
			}
			if(a.indexOf("L")>-1){
				x = x - m;
				y = y + (h / 2);
			}
			if(a.indexOf("R")>-1){
				x = x + w + m;
				y = y + (h / 2);
			}
			
			return getAbsPostion(x, y);
		}
	}
	return null;
}

function drawRelationLine(tabId){
	
	var id = $('#' + tabId).attr('id').replace('tab', 'show');
	
	$(".relation-line." +id).hide();

	clearDrawed(id);
	
	var pot = getPos($("#object-tree .tree-select-icon-box i"),"T"); 
	var pot2 = getPos($("#take-over-taget-title i"),"R"); 
	
	var dPset = [];
	var dYmax = 0;
	
	$("." + id +" .tree-node-selected-icon.oneself-stand-alone-mark").each(
		function (){
			if($(this).is(':hidden') || $(this).closest("ul").closest(".jstree-closed").length > 0) return;
			
			var pot3 = getPos($(this),"R"); 
			if(pot3){
				dYmax = Math.max(dYmax,pot3.y);
				dPset.push(pot3);
			}
		}
	);
	
	if(dPset.length > 0){
		
		var color = "#F05A00", weight = "2";
		var dx = Math.min( dPset[0].x + 20 , $("#rightopenclose").width());
		var dy = pot2.y ; 
		
		drawline(id, pot.x, pot.y,  pot.x, dy, color, weight, true);
		drawline(id, pot.x, dy,  dx, dy, color, weight);
		drawline(id, dx, dy,  dx, dYmax, color, weight);
		
		drawnode(id, dPset.length, pot.x + (dx - pot.x) /2 , dy, color);
		
		var maxLine = 0;
		if($(".title."+ id + " .take-over-target-num").html()){
			maxLine = 1 * $(".title."+ id + " .take-over-target-num").html();
		}
		maxLine = Math.max(maxLine, dPset.length);
		$(".title."+ id + " .take-over-target-num").html(maxLine);
		
		$.each(dPset,
			function (){
				drawline(id, this.x, this.y,  dx, this.y, color, weight, true);
			}
		);
		
		$(".relation-line."+id).show();
		
	}else{
		clearDrawed(id);
	}

}
window.drawRelationLine = drawRelationLine;

function clearRelationLine(){
	clearAllDrawed();
}


function drawSameMemberLine(tabId, userId){
	
	//console.log("drawSameMemberLine <- " + tabId + " , " + userId);
	
	var id = $('#' + tabId).attr('id').replace('tab', 'show');
    var className = id + "_same-member";	
    
	clearDrawed(className);
		
	var dPset = [];
	var dYmin = 10000;
	var dYmax = 0;
	
	var color = "#FFFFFF", weight = "1";
	
	$("." + id +" .jqgrid-select-icon-box[id$='_"+userId+"-div']").each(
		function (){
			//if($(this).is(':hidden')) return;
			
			if($(this).children(".tree-node-selected-icon.oneself-stand-alone-mark").is(':visible')){
				color = "#00AAFF";
			}else if($(this).children(".tree-node-excepted-icon.oneself-stand-alone-mark").is(':visible')){
				color = "#C3282D";
			}else if($(this).children(".tree-node-selected-icon").is(':visible')){
				color = "#C8EBFA";
			}else if($(this).children(".tree-node-excepted-icon").is(':visible')){
				color = "#FFD7C8";
			}
			
			var pot3 = getPos($(this),"IR"); 
			if(pot3){
				dYmin = Math.min(dYmin,pot3.y);
				dYmax = Math.max(dYmax,pot3.y);
				pot3.x = pot3.x - 3;
				dPset.push(pot3);
			}
		}
	);
	
	if(dPset.length > 1){
		
		
		var dx = Math.min( dPset[0].x + 7 , $("#rightopenclose").outerWidth() - 25);
		
		drawline(className, dx, dYmin,  dx, dYmax, color, weight);
		
		$.each(dPset,
			function (){
				drawline(className, this.x, this.y,  dx, this.y, color, weight, true);
			}
		);
		
		$(".relation-line."+className).show();
		
	}else{
		clearDrawed(className);
	}
	
	$("body").one("click",function(){
		clearDrawed(className);
	});
	
}

function clearSameMemberLine(){
	clearAllDrawed();
}

/**
 * 事件处理
 */
window.allEvent = function() {

	$("#cancel-link").YSDialog();
	$("#cancel-sure-btn").click(function() {
		parent.$('#YSDialogIframe').dialog('close');
	});

	$("#cancel-btn").click(function() {
		if(true)
		parent.$('#YSDialogIframe').dialog('close');
		
	});

}


function closeAllTree(){
	$(".target-box .jstree li").each(function() {
		var leafId = $(this).attr("id");
		if ($("#" + leafId).hasClass("grid-added")) {
			$("input[name=" + leafId + "-cb]").parent().remove();
			$("#" + leafId).removeClass("grid-added");
			$("#membership-grid-area-" + leafId).remove();
			$("#membership-grid-div" + leafId).remove();
			$("#table-show-" + leafId).remove();
		}
		
		if($(this).hasClass("jstree-open")){
			//$(this).children("ins:first").click();
		}
	});
	
	$(".target-box .jstree .current-show").remove();
	currentResId = "";
	
}

/**
 * 全展开关闭调用的方法
 */
function openClose() {
	if ($("#auth-group-tree ul li.jstree-open").length > 0 || $("#auth-membership-tree ul li.jstree-open").length > 0) {
		$("#auth-group-tree li").each(function() {
			var leafId = $(this).attr("id");
			if ($("#" + leafId).hasClass("grid-added")) {
				$("input[name=" + leafId + "-cb]").parent().remove();
				$("#" + leafId).removeClass("grid-added");
				$("#group-grid-area-" + leafId).parent().remove();
				$("#group-grid-div-" + leafId).remove();

				$("#table-show-" + leafId).remove();
			}
		});
		$("#auth-membership-tree li").each(function() {
			var leafId = $(this).attr("id");
			if ($("#" + leafId).hasClass("grid-added")) {
				$("input[name=" + leafId + "-cb]").parent().remove();
				$("#" + leafId).removeClass("grid-added");
				$("#membership-grid-area-" + leafId).remove();
				$("#membership-grid-div" + leafId).remove();
				$("#table-show-" + leafId).remove();
			}
		});
		$("#auth-group-tree ul li.jstree-open").each(function() {
			$(this).find("ins:first").click();
		});
		$("#auth-membership-tree ul li.jstree-open ins:first").click();
	} else {
		$("#auth-membership-tree ul li.jstree-closed ins:first").click();
		$("#auth-group-tree ul li.jstree-closed").each(function() {
			$(this).find("ins:first").click();
		});
	}
}

/**
 * 点击另外一个节点，或者要关闭的时候，如果有设置过但是未保存的情况，弹出提示
 */
function changeAlert() {
	if ($("input.function-cb").hasClass("inherited-canceled") || $("input.function-cb").hasClass("no-path") || $("input.function-cb").hasClass("new-stand-alone")) {
		return true;
	} else {
		return false;
	}
}

function changeAlertForMember() {
	if ($('#YSContainer').html() != "" && ($("input[name=object-cb]").hasClass("inherited-canceled") || $("input[name=object-cb]").hasClass("no-path") || $("input[name=object-cb]").hasClass("new-stand-alone"))) {
		return true;
	}
	return false;
}

function centerShowPage(id) {
	var width = 800;
	width = ($('#' + id).width() - width) / 2;
	$("#YSDialogIframe").dialog("option", "position", [ width, 50 ]);
	$("#YSDialogIframe").dialog({
		minHeight : 'auto'
	});
	$("#YSDialogIframe").css('overflow', 'hidden');
}

function getOs() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		return "MSIE";
	}
	if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
		return "Firefox";
	}
	if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
		return "Safari";
	}
	if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
		return "Camino";
	}
	if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
		return "Gecko";
	}
}

function getYsContainerWidth() {
	return $('#panel').width() - $('#left-panel').width() - 44;
}

function getIconBaseUrl(objectAuthType) {
	var resourceServerUrl = top.jzAppVars().resourceServerUrl;
	var result = resourceServerUrl + '/image/admin/';
	if (objectAuthType == _AUTH_TYPE_FUNCTION_USE) {
		result += 'security';
	}
	else if (objectAuthType == _AUTH_TYPE_SERVICE_LOGIN_FUNCTION_USE) {
		result += 'service';
	}
	return result + '/';
}

function getFromPath() {

	var result = '';

	if (objectAuthType == _AUTH_TYPE_FUNCTION_USE) {
		result = 'security';
	}
	else if (objectAuthType == _AUTH_TYPE_SERVICE_LOGIN_FUNCTION_USE) {
		result = 'service';
	}
	else {
		result = 'target-' + objectAuthType + "-" + objectId;
	}

	return result;
}
window.getFromPath = getFromPath;

function targetAuthListSelect(targetElm, objectId, objectAuthType){
	var memberTabParamsJson = $.parseJSON(localStorage.getItem('memberTabParams'));
	if (memberTabParamsJson == null || memberTabParamsJson == 'undefined' || 
			!memberTabParamsJson["pageSearchParam"]) {
		initMemberTabParams();
		memberTabParamsJson = $.parseJSON(localStorage.getItem('memberTabParams'));
	}
	var pageSearchParamJSON = $.parseJSON(memberTabParamsJson["pageSearchParam"]);
	var searchColumnStr = pageSearchParamJSON["searchColumns"];
	if (searchColumnStr) {
		$("#search-condition").html("");
		var searchColumnStrJSON = JSON.parse(searchColumnStr);
		for (var key in searchColumnStrJSON) {
			$("#search-condition").append('<div class="search-condition"><span class="search-column-name" name="'　+　
											$('#edit-detail-search-info-form .search-column').find("option:selected").val()+'">' + 
											$('#edit-detail-search-info-form .search-column').find("option:selected").text() + '&nbsp;</span>'　+
					'<span class="search-column-mark"><i class="fa fa-angle-right"></i>&nbsp;</span>'+
					'<span class="search-column-value">' + searchColumnStrJSON[key] + '&nbsp;</span></div>');
		}
		$("#search-item-show").show();
	}else{
		$("#search-item-show").hide();
	}
	
	if($("#all-memberlist").hasClass("selected")){
		pageSearchParamJSON["authList"] = getNewResourceIds().toString();
		pageSearchParamJSON["objectExceptedAuthType"] = "";
		pageSearchParamJSON["memberListType"] = "ALL";
	}else{
		pageSearchParamJSON["authList"] = getNewResourceIds().toString();
		pageSearchParamJSON["objectExceptedAuthType"] = objectExceptedAuthType;
		if(objectExceptedAuthType){
			pageSearchParamJSON["memberListType"] = "EXCEPTED";
		}else{
			pageSearchParamJSON["memberListType"] = "SELECTED";
		}
	}
	
	memberTabParamsJson["pageSearchParam"] = JSON.stringify(pageSearchParamJSON);
	

	//$(".modern-list__contents").html("");
	clearListData();
	initListData(memberTabParamsJson, pageSearchParamJSON["memberListType"]);	
	
    if(objectExceptedAuthType){
    	$('.headerTable .right span').hide();
    	$('#memberListData').addClass("excepted");
	}else{
		$('.headerTable .right span').show();
		$('#memberListData').removeClass("excepted");
	}
}


function update() {
	targetAuthListSelect($('#targetMemberList'), objectId, objectAuthType);
}


function setMemberTabParams(type, value) {
	
	var memberTabParams = localStorage.getItem('memberTabParams'),memberTabParamsJSON;
	if (memberTabParams == null || memberTabParams == 'undefined' ) {
		memberTabParamsJSON = initMemberTabParams();
	}
	else if (typeof memberTabParams == 'string') {
		memberTabParamsJSON = JSON.parse(memberTabParams);
		var searchColumns;
		var isSearchFlag;
		if (type == 'page') {
			memberTabParamsJSON["pageNum"] = value;
		}
		else if (type == 'rows') {
			memberTabParamsJSON["rowNumPerPage"] = value;
			memberTabParamsJSON["pageNum"] = 1;
		}
		else if (type == 'sidx') {
			memberTabParamsJSON["sidx"] = value
		}
		else if (type == 'sord') {
			memberTabParamsJSON["sord"] = value;
		}
		else if (type == 'status-change') {
			memberTabParamsJSON["status"] = value;
		}
		else if (type == 'search') {
			searchColumns = value;
			isSearchFlag =  1;
			if (value == '') {
				isSearchFlag =  0;
			}
		}
		memberTabParamsJSON["pageSearchParam"] = JSON.stringify({objectExceptedAuthType: objectExceptedAuthType, 
																 authList: getNewResourceIds().toString(),
																 isSearchFlag : isSearchFlag,
																 searchColumns : searchColumns
																});
	}
	localStorage.setItem('memberTabParams', JSON.stringify(memberTabParamsJSON));
}

function initMemberTabParams(memberTabParams) {
	if (memberTabParams == null || memberTabParams == 'undefined') {
		memberTabParamsJSON = {pageNum:1,
						       rowNumPerPage: 25,
						       sidx:'mail',
						       sord:'asc',
						       pageSearchParam : JSON.stringify({objectExceptedAuthType: objectExceptedAuthType, 
																 authList: getNewResourceIds().toString(),
																 isSearchFlag:0,
																 searchColumns: ''
																}),
						      };
	}
	localStorage.setItem('memberTabParams', JSON.stringify(memberTabParamsJSON));
}


function addChildrenMouseOver(id) {
	$('#'+id + '>ul>li').each(function() {
		var $input = $(this).children('.tree-select-icon-box').children('input');
		if (!($input.hasClass('stand-alone')
				|| $input.hasClass('new-stand-alone')
				|| $input.hasClass('inherited-canceled'))) {
			if ($(this).children('li>a').hasClass('no-hovered')) {
				$(this).children('li>a').removeClass('jstree-hovered');
			}
			else {
				$(this).children('li>a').addClass('jstree-hovered');
			}
			addChildrenMouseOver($(this).attr('id'))
		}
	});

	if ($('#'+id + '>ul.tree-grid-ul')) {
		$('#'+id + '>ul.tree-grid-ul>li').find('.ui-jqgrid-btable tr').each(function() {
			var $input = $(this).find('.jqgrid-select-icon-box>input');
			if (!($input.hasClass('stand-alone')
					|| $input.hasClass('new-stand-alone')
					|| $input.hasClass('inherited-canceled'))) {
				$(this).addClass('jstree-hovered');
			}
		});
	}
}

function removeChildrenMouseOver(id) {
	$('#'+id + '>ul>li').each(function() {
		var $input = $(this).children('.tree-select-icon-box').children('input');
		if (!($input.hasClass('stand-alone')
				|| $input.hasClass('new-stand-alone')
				|| $input.hasClass('inherited-canceled'))) {
			$(this).children('a').removeClass('jstree-hovered');
			removeChildrenMouseOver($(this).attr('id'))
		}
	});
	
	if ($('#'+id + '>ul.tree-grid-ul')) {
		$('#'+id + '>ul.tree-grid-ul>li').find('.ui-jqgrid-btable tr').each(function() {
			var $input = $(this).find('.jqgrid-select-icon-box>input');
			if (!($input.hasClass('stand-alone')
					|| $input.hasClass('new-stand-alone')
					|| $input.hasClass('inherited-canceled'))) {
				$(this).removeClass('jstree-hovered');
			}
		});
	}
}


var parentFlg = 'no_parent';

allEvent();


var userAddArray = new Array();
var memberIdArray = new Array();
var memberIdDelArray = new Array();

var domainUrl = top.jzAppVars().domainUrl;
var fromPath = getFromPath();

var authSetting = {
		showCheckBox : true,
		closeTopNode : true,
		pageShowStatus : _AUTH_SHOW_STATUS_DIALOG
	};
window.authSetting = authSetting;


function nodeClick(id, parentId, text, isLeaf, isRoot) {
	$("#" + id).closest(".jstree").jstree("deselect_all");
	//clickNode(id);
}

function getValidParentNode(parentId) {
	if ($('#' + parentId).children('a').hasClass('no-hovered')) {
		return getValidParentNode($('#' + parentId).parents('li:first').attr('id'));
	}
	else {
		return parentId;
	}
}

function clickNode(id) {
	//a();
	
	if( $('input[name=targetAllFlg]:checked').val()=="-1" ){
		jzMsgBox(warningMsg("W_90000_000"), 'alert');
		return;
	}
	
	var parentId =  $('#' + id).closest("li").attr("id");
			
	var $a = $("#" + id).children("a:first"),
		$div = $("#" + id).children('div');
	//$a.removeClass("jstree-clicked");
	//$("#" + id).closest(".jstree").jstree("deselect_all");
	
	var checkboxId = $("#" + id + '>div.tree-select-icon-box').find('input').attr('id');
	changeAuth(checkboxId);
	
	
	if ($('#' + id).attr('rel') != 'drive' 
			&& !($div.find('input').hasClass('stand-alone')
					|| $div.find('input').hasClass('new-stand-alone')
					|| $div.find('input').hasClass('inherited-canceled'))) {
		
		parentId = getValidParentNode(parentId);
		
		$a = $("#" + parentId).children("a:first");
		var authType = "";
		if ($a.hasClass('jstree-selected')) {
			authType = '${_AUTH_YES}';
		}
		else {
			authType = '${_AUTH_NO}';
		}
		
		var $input = $("#" + id).children('.tree-select-icon-box').children('input');
		if (!($input.hasClass('stand-alone')
				|| $input.hasClass('new-stand-alone')
				|| $input.hasClass('inherited-canceled'))) {
			
			var $div = $("#" + id).children('.tree-select-icon-box');
			if (authType == '${_AUTH_YES}') {
				$div.children('input').prop('checked', true);
				if ($("#" + id).children('a').hasClass('no-hovered')) {
					$("#" + id).children('a').removeClass("jstree-selected");
				}
				else {
					$("#" + id).children('a').addClass("jstree-selected");
				}
			}
			else {
				$div.children('input').prop('checked', false);
				$("#" + id).children('a').removeClass("jstree-selected");
			}
		}
		
		changeChildrenAuth(id, authType);
	}
	else {
		if ($div.find('input').prop('checked')) {
			$div.find('input').prop('checked', false);
			$a.removeClass("jstree-selected");
			
			$("#" + id + '>div').find('.oneself-stand-alone-mark').removeClass('oneself-stand-alone-mark');
			
			changeChildrenAuth(id, '${_AUTH_NO}');
		}
		else {
			$div.find('input').prop('checked', true);
			if ($("#" + id).children('a').hasClass('no-hovered')) {
				$a.removeClass("jstree-selected");
			}
			else {

				$a.addClass("jstree-selected");
			}
			changeChildrenAuth(id, '${_AUTH_YES}');
		}
	}

	setTimeout( function(){
		var newResourceIds =  getNewResourceIds();
		updateAuthTrees(objectId, newResourceIds, authMemberListFresh);
		//authMemberListFresh(newResourceIds);
	},100);
}
window.clickNode = clickNode;

function clickMember(rowid) {
	if( $('input[name=targetAllFlg]:checked').val()=="-1" ){
		jzMsgBox(warningMsg("W_90000_000"), 'alert');
		return;
	}
	
	var $div = $('#' + rowid + ' td:last').children('div'),
		inputId = $div.find('input').attr('id');
		
	//$('#' + rowid).removeClass('ui-state-highlight');

	var userIdKey= inputId.split("_")[1];
			
	$('input[id$="'+userIdKey+'"]').each(

		function(){
			var $input = $(this);
			var $row = $input.closest("tr");
			
			if ($input.prop('checked')) {
				$input.prop('checked', false);
				$row.removeClass('jggrid-selected');
			}else {
				$input.prop('checked', true);
				$row.addClass('jggrid-selected');
			}
			
			changeAuth($input.attr("id"));
			
			//showSelectAuth('membership-target-tab',$input.val().replace('us',''));
			
			openSelectdMember('membership-target-tab', $input.val().replace('us',''));
			
		}
	);
	
	setTimeout( function(){
		var newResourceIds =  getNewResourceIds();
		updateAuthTrees(objectId, newResourceIds,authMemberListFresh);
		//authMemberListFresh(newResourceIds);
	},100);
}
window.clickMember = clickMember;

function clickUser(inputId) {
	
	//$('#' + rowid).removeClass('ui-state-highlight');

	var userIdKey= inputId.split("_")[1];
			
	$('input[id$="'+userIdKey+'"]').each(

		function(){
			var $input = $(this);
			var $row = $input.closest("tr");
			
			if ($input.prop('checked')) {
				$input.prop('checked', false);
				$row.removeClass('jggrid-selected');
			}else {
				$input.prop('checked', true);
				$row.addClass('jggrid-selected');
			}
			
			changeAuth($input.attr("id"));
			
			//showSelectAuth('membership-target-tab',$input.val().replace('us',''));
			
			openSelectdMember('membership-target-tab', $input.val().replace('us',''));
			
		}
	);
	
	setTimeout( function(){
		var newResourceIds =  getNewResourceIds();
		updateAuthTrees(objectId, newResourceIds, authMemberListFresh);
		authMemberListFresh(newResourceIds);
	},100);
}
window.clickUser = clickUser;

function changeChildrenAuth(id, authType) {
	$('#'+id + '>ul>li').each(function() {
		var $input = $(this).children('.tree-select-icon-box').children('input');
		if (!($input.hasClass('stand-alone')
				|| $input.hasClass('new-stand-alone')
				|| $input.hasClass('inherited-canceled'))) {
			var $div = $(this).children('.tree-select-icon-box');
			if (authType == '${_AUTH_YES}') {
				$div.children('input').prop('checked', true);
				if ($(this).children('a').hasClass('no-hovered')) {
					$(this).children('a').removeClass("jstree-selected");
				}
				else {
					$(this).children('a').addClass("jstree-selected");
				}
			}
			else {
				$div.children('input').prop('checked', false);
				$(this).children('a').removeClass("jstree-selected");
			}
			
			changeChildrenAuth($(this).attr('id'), authType);
		}
	});

	if ($('#'+id + '>ul.tree-grid-ul')) {
		$('#'+id + '>ul.tree-grid-ul>li').find('.ui-jqgrid-btable tr').each(function() {
			var $input = $(this).find('.jqgrid-select-icon-box>input');
			if (!($input.hasClass('stand-alone')
					|| $input.hasClass('new-stand-alone')
					|| $input.hasClass('inherited-canceled'))) {
				
				var $div = $(this).find('.jqgrid-select-icon-box');
				if (authType == '${_AUTH_YES}') {
					$div.children('input').prop('checked', true);
					$(this).addClass('jggrid-selected');
				}
				else {
					$div.children('input').prop('checked', false);
					$(this).removeClass("jggrid-selected");
				}
			}
		});
	}
}

function clickSortCss(leafId) {
	if ($("#membership-grid-" + leafId + "_mail").attr("aria-selected") == 'true') {
		$("#jqgh_membership-grid-" + leafId + "_mail").find("m").css("font-weight", "bold");
	} else {
		$("#jqgh_membership-grid-" + leafId + "_mail").find("m").css({
			"font-weight" : ""
		});
	}

	if ($("#membership-grid-" + leafId + "_userName").attr("aria-selected") == 'true') {
		$("#jqgh_membership-grid-" + leafId + "_userName").find("m").css("font-weight", "bold");
	} else {
		$("#jqgh_membership-grid-" + leafId + "_userName").find("m").css("font-weight", "");
	}

	if ($("#group-grid-" + leafId + "_mail").attr("aria-selected") == 'true') {
		$("#jqgh_group-grid-" + leafId + "_mail").find("m").css("font-weight", "bold");
	} else {
		$("#jqgh_group-grid-" + leafId + "_mail").find("m").css({
			"font-weight" : ""
		});
	}

	if ($("#group-grid-" + leafId + "_userName").attr("aria-selected") == 'true') {
		$("#jqgh_group-grid-" + leafId + "_userName").find("m").css("font-weight", "bold");
	} else {
		$("#jqgh_group-grid-" + leafId + "_userName").find("m").css("font-weight", "");
	}
}

$(document).on('mouseover', 'input[type="checkbox"]', function() {
	if ($(this).val().indexOf('${_AUTH_NODE_TYPE_RESOURCE_USER}') != -1) {
		var trObj = $('#' + $(this).attr('name').substring(0, $(this).attr('name').indexOf("-cb")).substring($(this).attr('name').indexOf("grid-")+5));
		trObj.css('font-weight', 'normal').css('color', 'black').css('background-color', '#FAFAFA');
		trObj.children("td").css('font-weight', 'normal');
	}
	else {
		$('#' + $(this).val()).find('a:first').css('font-weight', 'normal').css('color', 'black').css('background-color', '#FAFAFA');	
	}
})
.on('mouseout', 'input[type="checkbox"]', function(){
	if ($(this).val().indexOf('${_AUTH_NODE_TYPE_RESOURCE_USER}') != -1) {
		var trObj = $('#' + $(this).attr('name').substring(0, $(this).attr('name').indexOf("-cb")).substring($(this).attr('name').indexOf("grid-")+5));
		trObj.removeAttr('style');
		trObj.children("td").css('font-weight', 'normal');
	}
	else {
		$('#' + $(this).val()).find('a:first').removeAttr('style');
	}
});

function setCheckBox(){
	return;
}
window.setCheckBox =  setCheckBox;

/*
function setlightPin(nodeId, standAloneFlag) {
	if (standAloneFlag) {
		$('#'+nodeId).parents('li').each(function() {
			$(this).children('a').find("div[id^='count-pin-']").html('<i class="jstree-icon icon-arrow subchild-stand-alone-mark" aria-hidden="true"></i>').attr('style', "display: inline-block;");
		});
	}
	else {
		$('#'+nodeId).parents('li').each(function() {
			var subchildStandAloneMarkShow = false;
			$(this).children('ul').find("div[id^='count-pin-']").each(function() {
				if (!$(this).is(':hidden')) {
					subchildStandAloneMarkShow = true;
				}
			});
			if (!subchildStandAloneMarkShow) {
				$(this).children('ul').find(".oneself-stand-alone-mark").each(function() {
					if (!$(this).is(':hidden')) {
						subchildStandAloneMarkShow = true;
					}
				});
			}
			if (subchildStandAloneMarkShow) {
				$(this).children('a').find("div[id^='count-pin-']").html('<i class="jstree-icon icon-arrow subchild-stand-alone-mark oneself-stand-alone" aria-hidden="true"></i>').attr('style', "display: inline-block;");
			}
			else {
				$(this).children('a').find("div[id^='count-pin-']").hide();
			}
		});
	}
}
*/
}