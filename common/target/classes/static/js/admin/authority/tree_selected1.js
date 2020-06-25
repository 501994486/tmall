(function($) {

	// CheckBox
	// var cb_div_left = "<div id='treename-leafId-div' style='position:
	// absolute; right: checkboxRight; width: auto; float: left; height:20px;
	// top:50%; margin-top:-10px;'>";
	var resourceServerUrl = top.jzAppVars().resourceServerUrl;
	var cb_div_left = "<div id='treename-leafId-div' class='tree-select-icon-box'>";
	var cb_info = "<input type='checkbox' class='function-cb membership-cb' onclick='changeEvent(this);' id='treename-leafId-cb' name='treename-leafId-cb-name' value='cbval'/>"
				+ '<i class="fa fa-check-circle tree-node-selected-icon oneself-stand-alone-mark" aria-hidden="true" style="display: none;"></i>';
	//var cb_div_right = '<i id="treename-leafId-cb-img" class="fa fa-thumb-tack oneself-stand-alone-mark" aria-hidden="true" style="display: none;"></i>'
//	var cb_div_right = '<i id="treename-leafId-cb-stand-alone-help" style="overflow:right;margin-left:45px;margin-top:-15px; display:none;" '
//		        + 'class="fa fa-question-circle fa-question-circle-green question-bubble-popup" position="right" custom-width="200" '
//		        + 'guidance="<m>この赤ピンは限定の対象から除外するために直接指定した箇所で、下のグループも対象から除外されチェックマークが無くなります</m>"></i>'
//		        + '<i id="treename-leafId-cb-oneself-stand-alone-help" style="overflow:right;margin-left:45px;margin-top:-15px; display:none;" '
//		        + 'class="fa fa-question-circle fa-question-circle-green question-bubble-popup" position="right" custom-width="200" '
//		        + 'guidance="<m>この赤ピンは限定の対象として直接指定した箇所で、下のグループも対象となってチェックマークが付きます</m>"></i></div>';
	var cb_div_right = "";
		
		//"<img id='treename-leafId-cb-img' src='" + resourceServerUrl + "/image/admin/auth/empty.png' style='vertical-align: top; margin-top: -5px; margin-left: -5px;'/></div>";
	$.fn.jstreecheckbox = function(settings) {

		var checkboxRight = 5;// CheckBox间距
		if (!isNullOrEmpty(settings['checkboxRight'])) {
			checkboxRight = settings['checkboxRight'];
		}
		var treename = this.selector.substring(1);// 树节点名
		var clickEvent = settings['clickEvent'];// 树节点单击事件
		var cbSize = settings['cbSize'];// CheckBox列数
		var showCheckBox = settings['showCheckBox'];
		var pageShowStatus = settings['pageShowStatus'];
		var winWidth = $(window).width();
		var t_name = '';
		if (!isNullOrEmpty(treename)) {
			t_name = treename.split('-')[0] + '-' + treename.split('-')[1];
			if (treename.length > 2 && treename.split('-')[2] == 'member') {
				t_name = t_name + '-' + treename.split('-')[2];
			}
		}

		if(pageShowStatus == 'Dialog'){
			$("#" + treename).parent().css('background', '');
			$("#" + treename).parent().css('width', '100%');
			$("#" + treename).css('overflow', 'hidden');// 滚动条隐藏
		}

		// 窗口大小变化时,grid宽度重设.
		$(window).resize(function() {
			$("#yscontainer-wrap").css("width",getYsContainerWidth());
		});

		// Tree CheckBox显示
		this.treecheckbox = function() {
			
			if(showCheckBox == false){
				return ;
			}
			
			var firstLi = false;
			$("#" + treename + " li").each(function(j) {
				
				var leafId = $(this).attr("id");
				
				// 控制TOP行是否显示CHECKBOX.
				var showTopLine = true;
				if(firstLi == true){
					if(leafId != undefined){
						firstLi = false;
					}
					
					if(treename == 'group-tree'){
						showTopLine = false;
					}
				}

				if(showTopLine == true){
					//if ($(this).attr("rel") == "default" || $(this).attr("rel") == "folder") {
	
						$(this).css({
							'position' : 'relative'
						});
				
						for ( var i = 0; i < cbSize; i++) {
							var result = cb_div_left + cb_info + cb_div_right;
							// 节点ID
							result = result.replace(/cbval/g, leafId);
							result = result.replace(/leafId/g, leafId);
							// 标签名
							result = result.replace(/treename/g, i + '-' + treename);
							// 设置CheckBox位置
							result = result.replace(/checkboxRight/g, (i + 1) * checkboxRight + "px");
							// 点击事件
							result = result.replace(/changeEvent/g, clickEvent);
							// 树节点添加对应的权限复选框
							$(this).append(result);
						}
	
					//}
				}
			});
		};

		// jqGrid CheckBox显示
		this.jqgridcheckbox = function(leafId) {
			var cb_div_left = "<div id='treename-leafId-div' class='jqgrid-select-icon-box'>";
			var cb_info = "<input type='checkbox' class='function-cb membership-cb' onclick='changeEvent(this);' id='treename-leafId-cb' name='treename-leafId-cb-name' value='cbval'/>"
						+ '<i class="fa fa-check-circle tree-node-selected-icon oneself-stand-alone-mark" aria-hidden="true" style="display: none;"></i>';
			var ids = $("#" + t_name + "-grid-" + leafId).getDataIDs();
			for ( var j = 0; j < ids.length; j++) {

				var userId = _AUTH_NODE_TYPE_RESOURCE_USER + ids[j].substring(ids[j].lastIndexOf("_") + 1);

				for ( var i = 0; i < cbSize; i++) {
					var result = cb_div_left;
					if(showCheckBox == true){
						result += cb_info;
					}
					result += cb_div_right;
					// 节点ID
					result = result.replace(/cbval/g, userId);
					result = result.replace(/leafId/g, ids[j]);
					// 标签名
					result = result.replace(/treename/g, i + '-' + treename + '-grid');
					// 设置CheckBox位置
					result = result.replace(/checkboxRight/g, (i + 1) * checkboxRight + "px");
					// 点击事件
					result = result.replace(/changeEvent/g, clickEvent);
					// 树节点添加对应的权限复选框
					$("#" + ids[j]).children("td").eq(1).append(result);
					// $("#" + ids[j]).append(result);
				}
			}
		};

		returnValue = this;
		return returnValue;
	};

	function isNullOrEmpty(strVal) {
		if (strVal == '' || strVal == null || strVal == undefined) {
			return true;
		} else {
			return false;
		}
	}

})(jQuery);

