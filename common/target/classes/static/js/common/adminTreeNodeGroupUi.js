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

/*
 * add jstree_node open/closed 
 * add jstree_node group dblclick
 */ 
function ysLoadedJstree(treeName) {
	$("#" + treeName + "-tree li").each(function(j) {
		var leafId = $(this).attr("id"),
		relVal = $(this).attr("rel"),
		click_event = function(e) { 
			treeNodeClick(leafId, relVal);
		},
		dblclick_event = function(e) {
			openOrClosedTreeNode(leafId, relVal, "dblclick");
		};
		$("#" + leafId + " ins:first").bind('click', function(e) {
			openOrClosedTreeNode(leafId, relVal, "insclick");
		});
		if (typeof(relVal) != "undefined") {
			if (relVal == "drive" || relVal.indexOf("folder") == 0) {
				$("#" + leafId).children("a").skygqOneDblClick({oneclick:click_event,dblclick:dblclick_event});
				mouseoverOrMouseout(leafId);
			}
			else if (relVal == "default") {
				// $("#" + leafId).children("a").skygqOneDblClick({oneclick:click_event,dblclick:dblclick_event});
			}
		}
	});
}

/*
 * jstree_node group jstree-open/jstree-closed
 */
function openOrClosedTreeNode(id, relVal, type) {
	setTimeout(function(){
		if (relVal == "drive" || relVal.indexOf("folder") == 0) {
			if ($("#" + id).hasClass('jstree-closed')){
				$("#" + id + " ul li").each(function() {
					var leafId = $(this).attr("id");
					if ($("#" + leafId).children('div').children('.tree-node-selected-icon').css('display') == 'block') {
						$("#" + id).children("div").children(".icon-arrow").css('display',"block");
						$("#" + id).addClass("subchild-selected");
						$("#" + id).children("a").children("span").addClass("jstree-span-color");
					}
					
					try{
						if(eventType != "undefined" && eventType == "facility" && relVal != "drive") {
							if (type == "dblclick"){
								$("#" + id).children('a').removeClass("jstree-selected");
								$("#" + id).children('div').children('.tree-node-selected-icon').css('display','none');
							}
							else if (type == "insclick") {
								$("#" + id).children('a').removeClass("jstree-selected");
								$("#" + id).children('div').children('.tree-node-selected-icon').css('display','none');
							}
						}
					}catch (e){}
				});
			}
			else if ($("#" + id).hasClass('jstree-open')) {
				$("#" + id).children("div").children(".icon-arrow").css('display','none');
				$("#" + id).removeClass("subchild-selected");
				$("#" + id).children("a").removeClass("jstree-closed-hovered");
				$("#" + id).children("a").children("span").removeClass("jstree-span-color");
				
				try{
					if(eventType != "undefined" && eventType == "facility" && relVal != "drive") {
						if (type == "dblclick"){
							if ($("#" + id).children('div').children('input').prop('checked')) {
								$("#" + id).children('a').addClass("jstree-selected");
								$("#" + id).children('div').children('.tree-node-selected-icon').css('display','block');
							}
						}
						else if (type == "insclick") {
							if ($("#" + id).children('div').children('input').prop('checked')) {
								$("#" + id).children('a').addClass("jstree-selected");
								$("#" + id).children('div').children('.tree-node-selected-icon').css('display','block');
							}
						}
					}
				}catch (e){}
			}
		}
	}, 100);
}

/*
 * jstree-node group click
 */
function treeNodeClick(id, relVal) {
	var auth = $("#" + id).hasClass('jstree-selected');
	var childNode = $("#" + id).closest("li").find('li');
	var parentNodeRel = $("#" + id).closest("li").attr('rel');
	if (parentNodeRel == 'drive' || parentNodeRel.indexOf("folder") == 0) {
		if (auth) {
			// add down arrow
			childNode.each(function (){
				if ($(this).hasClass("jstree-closed")) {
					$(this).children("div").children(".icon-arrow").css('display',"block");
					$(this).addClass("subchild-selected");
					$(this).children("a").children("span").addClass("jstree-span-color");
				}
			});
			if ($("#" + id).hasClass("jstree-closed")) {
				$("#" + id).children("div").children(".icon-arrow").css('display',"block");
				$("#" + id).addClass("subchild-selected");
				$("#" + id).children("a").children("span").addClass("jstree-span-color");
			}
		} 
		else {
			// del down arrow
			childNode.each(function (){
				if ($(this).hasClass("jstree-closed")) {
					$(this).children("div").children(".icon-arrow").css('display',"none");
					$(this).removeClass("subchild-selected");
					$(this).children("a").children("span").removeClass("jstree-span-color");
				}
			});
			if ($("#" + id).hasClass("jstree-closed") && !$("#" + id).hasClass("is-not-display")) {
				$("#" + id).children("div").children(".icon-arrow").css('display',"none");
				$("#" + id).removeClass("subchild-selected");
				$("#" + id).children("a").children("span").removeClass("jstree-span-color");
			}
		}
	}
}

/*
 * jstree_node li>a mouseover/mouseout
 */
function mouseoverOrMouseout(id){
	$("#" + id).children("a").on('mouseover', function() {
		if($("#" + id).hasClass("jstree-closed") && $("#" + id).children("div").children(".icon-arrow").css("display") == "block"){
			$("#" + id).children('a').addClass("jstree-closed-hovered");
		}
	}).on('mouseout', function() {
		if($("#" + id).hasClass("jstree-closed")){
			$("#" + id).children('a').removeClass("jstree-closed-hovered");
		}
	});
}
