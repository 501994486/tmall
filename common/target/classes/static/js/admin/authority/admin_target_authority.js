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

(function($){
	$.fn.skygqOneDblClick = function(options){
		return this.each(function(){
			var s = $.extend({}, $.fn.skygqOneDblClick.Default, options || {});
			var self_obj = this;
			do_click = function(e){
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
})(jQuery);

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

function editTarget(link, afterCloseFun) {
	$('#' + link).YSDialog({
		iframe : true,
		dialogTitle : "<m>対象</m>",
		afterClose : afterCloseFun
	});
	$('#' + link).click();
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

	if (treeName == 'auth-membership') {
		var membership_root_obj = $("#auth-membership-tree ul").children('li').eq(1).find('a:first span');
		//membership_root_obj.html(membership_root_obj.html().replace('MEMBERSHIP_NAME', '<m>メンバーシップ</m>'));
	}
	else if (treeName == 'auth-group') {

	}
	else if (treeName == 'auth-query') {
		var query_root_obj = $("#auth-query-tree ul").children('li').eq(1).find('a:first span');
		query_root_obj.html(query_root_obj.html().replace("query", "<m>クエリー</m>"));
	}
	else if (treeName == 'auth-event') {
		var event_root_obj = $("#auth-event-tree ul").children('li').eq(1).find('a:first span');
		event_root_obj.html(event_root_obj.html().replace("event-menagement-root-title", "<m>イベントエントリー</m>"));
	}
	else if (treeName == 'auth-product') {
		var category_root_obj = $("#auth-product-tree ul").children('li').eq(1).find('a:first span');
		category_root_obj.html(category_root_obj.html().replace("parent-product-root ", "<m>オンラインショップ</m>"));
	}
	else if (treeName == 'auth-relation') {
		var relation_root_obj = $("#auth-relation-tree ul").children('li').eq(1).find('a:first span');
		relation_root_obj.html(relation_root_obj.html().replace("parent-relation-root ", "<m>リレーション</m>"));
	}
	
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

		var leafId = $(this).attr("id"),
			relVal = $(this).attr("rel"),
			click_event = function(e) { },
			dblclick_event = function(e) {
				$("#" + leafId + " ins:first").click();
			}
		
		if (typeof(relVal) != "undefined") {
			if (relVal == "default") {
				// 点击+号时, 显示GRID数据
				$("#" + leafId + " ins:first").bind('mouseup', function(e) {
					if ($("#" + leafId).hasClass("jstree-closed")) {
						$("#" + leafId + " ins:first").click();
						addgrid(treeName, url, leafId, treeBox, authSetting);
						$("#" + leafId + " ins:first").click();
					}
					else if ($("#" + leafId).hasClass("jstree-open")) {
						$("#" + leafId + " ins:first").click();
						removegrid(treeName, leafId);
						$("#" + leafId + " ins:first").click();
					}
				});
				
				if (treeName == 'auth-membership') {
					$(this).addClass('jstree-closed');
				}
				
				// 双击打开jqgrid
				$("#" + leafId + " a:first").skygqOneDblClick({oneclick:click_event,dblclick:dblclick_event});
				
			}
			else if (relVal.indexOf("folder") == 0) {

				// GROUP初始化时,关闭TOP以下所有节点
				if(parentFlg == 'no_parent'){
					if ($(this).hasClass("jstree-open")) {
						$(this).removeClass("jstree-open");
						$(this).addClass("jstree-closed");
					}
				}
				
				// 双击打开jqgrid
				$("#" + leafId + " a:first").skygqOneDblClick({oneclick:click_event,dblclick:dblclick_event});
				
				// 点击+号时, 显示GRID数据
				$("#" + leafId + " ins:first").bind('mouseup', function(e) {
					if ($("#" + leafId).hasClass("jstree-closed")) {
						$("#" + leafId + " ins:first").click();
						addgrid(treeName, url, leafId, treeBox, authSetting);
						$("#" + leafId + " ins:first").click();
					}
					else if ($("#" + leafId).hasClass("jstree-open")) {
						$("#" + leafId + " ins:first").click();
						removegrid(treeName, leafId);
						$("#" + leafId + " ins:first").click();
					}
				});
				
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

				// 双击打开jqgrid
				$("#" + leafId + " a:first").skygqOneDblClick({oneclick:click_event,dblclick:dblclick_event});
				
				$("#" + leafId + " ins:first").bind('mouseup', function(e) {
					if ($("#" + leafId).hasClass("jstree-closed")) {
						$("#" + leafId + " ins:first").click();
						addgrid(treeName, url, leafId, treeBox, authSetting);
						$("#" + leafId + " ins:first").click();
					}
					else if ($("#" + leafId).hasClass("jstree-open")) {
						$("#" + leafId + " ins:first").click();
						removegrid(treeName, leafId);
						$("#" + leafId + " ins:first").click();
					}
				});
				
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
		nameArrayStr = [ '<m>表示名</m>', '<m>ファックス番号</m>' ];
		colModelStr = [ { name : 'userName', index : 'userName', width : '20%', align : 'left' },
		                { name : 'faxNum', index : 'faxNum', width : '80%', align : 'left', sortable: false } ];
	}
	else {
		nameArrayStr = [ '<m>表示名</m>', '<m>メール</m>' ];
		colModelStr = [ { name : 'userName', index : 'userName', width : '20%', align : 'left' },
		                { name : 'mail', index : 'mail', width : '80%', align : 'left' } ];
	}

	$('#loading-div').show();
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
			$('#loading-div').hide();
			
			// 显示继承元
			if(parentFlg == 'parent'){
				controlParentDirection();
			}
		},
		onSelectRow : function(rowid, status) {
			if (authSetting.showCheckBox == false) {
				clickMember(rowid);
			}
			else if (clickMember) {
				clickMember(rowid);
			}
		},
		beforeRequest: function() {
			if ($('#loading-div').is(':hidden')) {
				$('#loading-div').show();
				$("#loading-div").css("height", document.body.scrollHeight);
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
				ptr.css("background", "#F2F2F2");
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

	$('#loading-div').show();
	$("#loading-div").css("height", document.body.scrollHeight);

	$("#" + leafId + " a:first").children('.open_arrow').remove();
	$("#" + leafId).removeClass("grid-added");
	$("#" + treeName + "-grid-" + leafId).jqGrid('GridDestroy');
	$("input[name=" + leafId + "-cb]").parent().remove();
	$("#" + treeName + "-grid-div-" + leafId).remove();
	$("#" + treeName + "-grid-area-" + leafId).remove();
	$("#" + treeName + "-ul-" + leafId).remove();

	$('#loading-div').hide();
}

function ysTreeAddGrid(treeName, leafId) {
	var html = 	"<ul id='" + treeName + "-ul-" + leafId + "' class='tree-grid-ul'>" +
					"<li id='" + treeName + "-grid-area-" + leafId + "' style='padding-top:2px; padding-bottom: 2px;'>" +
						"<div id='" + treeName + "-grid-div-" + leafId + "' style='margin: 5px 0px 10px 20px;'>" +
							"<table id='" + treeName + "-grid-" + leafId + "'></table>" +
							"<div id='" + treeName + "-pager-" + leafId + "'></div>" +
						"</div>" +
						"<div id='table-show-" + leafId + "' style='padding-left: 50px; display: none;'><m>該当するデータがありません。</m></div>" +
					"</li>" +
				"</ul>";
	$("#" + leafId + " a:first").after(html);
}

function ysAddEventGrid(treeName, leafId) {
	var html = "";
	if ($("#" + leafId).hasClass("jstree-last") && $("#" + leafId).find("ul").length == 0) {
		html = "<ul id='auth-event-ul-" + leafId + "'><li id='auth-event-grid-area-" + leafId + "' style='background:none; margin-left: 0px;'><div id='auth-event-grid-div-" + leafId + "' style='padding-top:2px; padding-bottom: 2px;margin-left: 86px;' class='.yscontainer'>" + "<table id='auth-event-grid-" + leafId
				+ "'></table>" + "<div id='auth-event-pager-" + leafId + "'></div></div>" + "<div id='table-show-" + leafId + "' style='min-height: 18px; padding-left:83px;padding-top:13px;display: none;'><m>該当するデータがありません。</m></div></li></ul>";
		$("#" + leafId).after(html);
	}
	else if ($("#" + leafId).find("ul").length == 0) {
		html = "<ul id='auth-event-ul-" + leafId + "'><li class='jstree-leaf' style='padding-top:2px; padding-bottom: 2px;' id='auth-event-grid-area-" + leafId + "'>" + "<div id='auth-event-grid-div-" + leafId + "' style='margin-left: 53px;' class='.yscontainer'>" + "<table id='auth-event-grid-" + leafId
				+ "'></table>" + "<div id='auth-event-pager-" + leafId + "'></div></div>" + "<div id='table-show-" + leafId + "' style='padding-left:50px;padding-top:13px;display: none;'><m>該当するデータがありません。</m></div></li></ul>";
		$("#" + leafId).after(html);
	}
	// 如果是树的最后一个节点，则不需要节点前的连线的样式
	else {
		html = "<ul id='auth-event-ul-" + leafId + "'><li class='jstree-leaf' style='padding-top:2px; padding-bottom: 2px;' id='auth-event-grid-area-" + leafId + "'>" + "<div id='auth-event-grid-div-" + leafId + "' style='margin-left: 30px;' class='.yscontainer'>" + "<table id='auth-event-grid-" + leafId
				+ "'></table>" + "<div id='auth-event-pager-" + leafId + "'></div></div>" + "<div id='table-show-" + leafId + "' style='min-height: 18px; padding-left:50px;padding-top:13px;display: none;'><m>該当するデータがありません。</m></div></li></ul>";
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
		$.ajax({
			url : domainUrl + "/admin/" + url + "/get-user-auth-list/" + fromPath,
			data : {
				objectId : objectId,
				objectAuthType : objectAuthType,
				userIds : ids.toString()
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
								$("#" + checkboxId).next('i').show();
								$("#" + checkboxId).parents('tr:first').addClass('jggrid-selected');
								
							}
							else if (authValue[0] == _AUTH_NO) {
								$("#" + checkboxId).attr("checked", false);
								$("#" + checkboxId).next('i').hide();
								$("#" + checkboxId).parents('tr:first').removeClass('jggrid-selected');
							}
	
							if (authValue[1] == _AUTH_INHERITED) {
								$("#" + checkboxId + "-img").hide();
								$("#" + checkboxId).addClass("inherited");
							}
							else if (authValue[1] == _AUTH_STANDALONE) {
								$("#" + checkboxId + "-img").show();
								$("#" + checkboxId).addClass("stand-alone");
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
	if ($("#" + checkboxId).hasClass("inherited")) {
		$("#" + checkboxId).addClass("inherited-canceled");
		$("#" + checkboxId).removeClass("inherited");
		$("#" + checkboxId + "-img").show();
	}
	else if ($("#" + checkboxId).hasClass("inherited-canceled")) {
		$("#" + checkboxId).addClass("inherited");
		$("#" + checkboxId).removeClass("inherited-canceled");
		$("#" + checkboxId + "-img").hide();
	}
	else if (resourceType == 'membershipUseNoTitle' && $("#" + checkboxId).hasClass("stand-alone")) {
		$("#" + checkboxId).addClass("no-path");
		$("#" + checkboxId).siblings("i").hide();
		$("#" + checkboxId).removeClass("stand-alone");
	}
	else if (resourceType == 'membershipUseNoTitle' && $("#" + checkboxId).hasClass("no-path")) {
		$("#" + checkboxId).addClass("stand-alone");
		$("#" + checkboxId).siblings("i").show();
		$("#" + checkboxId).removeClass("no-path");
	}
	else if ($("#" + checkboxId).hasClass("stand-alone")) {
		$("#" + checkboxId).addClass("no-path");
		$("#" + checkboxId + "-img").hide();
		$("#" + checkboxId).removeClass("stand-alone");
	}
	else if ($("#" + checkboxId).hasClass("no-path")) {
		$("#" + checkboxId).addClass("stand-alone");
		$("#" + checkboxId + "-img").show();
		$("#" + checkboxId).removeClass("no-path");
	}
	else if ($("#" + checkboxId).hasClass("new-stand-alone")) {
		$("#" + checkboxId).removeClass("new-stand-alone");
		$("#" + checkboxId + "-img").hide();
	}
	else {
		$("#" + checkboxId).addClass("new-stand-alone");
		$("#" + checkboxId + "-img").show();
	}
}

function saveAuthChanges() {
	$('#loading-div').show();
	$("#loading-div").css("height", document.body.scrollHeight);
	var resourceServerUrl = top.jzAppVars().resourceServerUrl;
	var resourceIds = new Array();
	var n = 0;
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

//	if (resourceIds.length == 0) {
//		// jzMsgBox('<m>保存しました</m>');
//		// setTimeout("parent.$('#YSDialogIframe').dialog('close');", 1000);
//		$('#loading-div').hide();
//		return;
//	}
	// 保存设置
	var url = "security";
	if (fromPath.indexOf("target-") > -1) {
		url = "common/target";
	}
	var domainUrl = top.jzAppVars().domainUrl;
	$.ajax({
		url : domainUrl + "/admin/" + url + "/update-auth-by-objectid/" + fromPath,
		data : {
			objectId : objectId,
			objectAuthType : objectAuthType,
			authList : resourceIds.toString()
		},
		type : 'POST',
		async : false,
		success : function(data) {
			if (data.result == _STATUS_SUCCESS) {
				parentResourceId = '';
				
				// 重置权限的复选框
				var left_tree_name = 'function-tree';
				if(objectAuthType == 'RELATION_USE'){
					left_tree_name = 'auth-relation-tree';
				}
				
				$("#"+left_tree_name+" li").find("span:first").css("background", "none");
				$("input.function-cb").parent().css("background", "none");
				$("input.function-cb").attr("checked", false);
				$("input.function-cb").each(function() {
					if ($(this).attr("class") != "function-cb") {
						$(this).removeAttr("class");
						$(this).attr("class", "function-cb");
					}
				});

				$('#'+left_tree_name+' .member-standalone-mark').attr('style', null);
				$('#'+left_tree_name).find("div[id^='count-pin-']").hide();
				
				$('#auth-membership-tree, #auth-group-tree, #auth-query-tree, #auth-event-tree, #auth-product-tree').find("div[id^='count-pin-']").hide();
				$('#auth-membership-tree, #auth-group-tree, #auth-query-tree, #auth-event-tree, #auth-product-tree').find("i[id$='cb-img']").hide();
				
				// 根据设置过的情况，重新读取权限的设置情况
				if (data.resourceAuthList && (data.resourceAuthList instanceof Array))
					for ( var i = 0; i < data.resourceAuthList.length; i++) {
						var resourceAuth = data.resourceAuthList[i];
						var authValue = resourceAuth.split(",");
						if (authValue instanceof Array) {
							if (authValue[1] == _AUTH_YES) {
								$("input[value=" + authValue[0] + "]").attr("checked", true);
								$("input[value=" + authValue[0] + "]").next('i').show();
								$("input[value=" + authValue[0] + "]").parents('tr:first').addClass('jggrid-selected');
							}
							else if (authValue[1] == _AUTH_NO) {
								$("input[value=" + authValue[0] + "]").attr("checked", false);
								$("input[value=" + authValue[0] + "]").next('i').hide();
								$("input[value=" + authValue[0] + "]").parents('tr:first').removeClass('jggrid-selected');
							}

							if (authValue[2] == _AUTH_INHERITED) {
								$("input[value=" + authValue[0] + "]").parent().children("i[id$='cb-img']").hide();
								$("input[value=" + authValue[0] + "]").addClass("inherited");
							}
							else if (authValue[2] == _AUTH_STANDALONE) {
								$("input[value=" + authValue[0] + "]").parent().children("i[id$='cb-img']").show();
								$("input[value=" + authValue[0] + "]").addClass("stand-alone");
								
								if (authValue.length == 4) {
									var objGroupIds = authValue[3].split("#");
									if (objGroupIds && (objGroupIds instanceof Array)) {
										for ( var j = 0; j < objGroupIds.length; j++) {
											$('#count-pin-' + objGroupIds[j]).html('<i class="fa fa-thumb-tack subchild-stand-alone-mark" aria-hidden="true"></i>').attr('style', "display: inline-block;");
										}
									}
								}
							}
						}
					}
				
				// 淺 色图钉
				for ( var i = 0; i < data.lightPinset.length; i++) {
					var resId = data.lightPinset[i];
					$('#count-pin-' + resId).html('<i class="fa fa-thumb-tack subchild-stand-alone-mark" aria-hidden="true"></i>').attr('style', "display: inline-block;");
				}
				
				// 重新设置左边树的显示情况
				if (data.objectStandaloneArray && (typeof data.objectStandaloneArray == "string")) {
					var objectIds = data.objectStandaloneArray.substring(1, data.objectStandaloneArray.length - 1);
					var objectIdArray = objectIds.split(",");
					if (objectIdArray instanceof Array) {
						for ( var k = 0; k < objectIdArray.length; k++) {
							$("#" + $.trim(objectIdArray[k])).find(".member-standalone-mark:first").css("width", "16px").css("background", "url('" + resourceServerUrl + "/image/admin/auth/pin01.png') no-repeat right center");
						}
					}
				}
				
				// 左边树淺 色图钉
				for ( var i = 0; i < data.functionLightPinset.length; i++) {
					var objId = data.functionLightPinset[i];
					$('#count-pin-' + objId).html('<i class="fa fa-thumb-tack subchild-stand-alone-mark" aria-hidden="true"></i>').attr('style', "display: inline-block;");
				}

				$("#parent-notice-div").hide();
				jzMsgBox('<m>保存しました</m>');
				parent.$('#popup-event-list-button').validationEngine('hide');
			} else {
				jzMsgBox('<m>エラー！</m>', 'alert');
			}
			$('#loading-div').hide();
		},
		error : function(data)  {
			jzMsgBox('<m>エラー！</m>', 'alert');
			$('#loading-div').hide();
		},
		dataType : "json"
	});
}

/**
 * 事件处理
 */
function allEvent() {

	$("#cancel-link").YSDialog({
		dialogTitle : "<m>キャンセル</m>"
	});
	$("#cancel-sure-btn").click(function() {
		parent.$('#YSDialogIframe').dialog('close');
	});

	// 閉じる按钮
	$("#cancel-btn").click(function() {
		parent.$('#YSDialogIframe').dialog('close');
	});

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

// 切换或关闭时，如果有改变过但是没保存的，给与提示
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

