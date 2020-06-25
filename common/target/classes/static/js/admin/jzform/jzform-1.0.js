/**
 * jzform version 1.0
 * 
 */
(function($, undefined) {
	var event = $(event);
	var conf;

	var imagePrefix = 'image_';

	var jzFieldWidth = 150;

	function getJzFieldWidth() {
		return jzFieldWidth + 'px';
	}

	function setJzFieldWidth() {
		jzFieldWidth = $('#jzformarea').width() / 2;
	}

	var jzform = function(options) {
		this.init = function(options) {
			conf = this.conf = $.extend({
				lang : [],
				fields : [],
				optionControlURL : '',
				extendFieldDetailURL : ''
			}, options);
		};

		this.refresh = function() {
			setFieldList(conf.fields);
		};

		this.show = function() {
			formarea.show(this.conf.fields);
			resizeYsContainer();
		};

		var formarea = {
			show : function(fields) {
				$('#menu-content-in').html('');
				$('#jz-form-item').html('');
				var memberHtml = '';
				if (conf.jzformType == 'member_entry') {
					memberHtml = '<li id="jzFieldLabel_emailaddress" title="EMAILADDRESS" fieldname="EMAILADDRESS" columnname="jzFieldLabel_emailaddress" fieldtype="label" class="labelClass" jzstatus="moved" jzrequired="">'
					+ '				<div>'
					+ '					<table class="detail03 field-detail-table">'
					+ '						<tr>'
					+ '							<th id="jzFieldLabel_emailaddress_th" scope="row">' + conf.lang.emailAddressField + '：</th>'
					+ '							<td id="jzFieldLabel_emailaddress_td"><label class="emailaddress_label"></label></td>'
					+ '						</tr>'
					+ '					</table>'
					+ '				</div>'
					+ '			</li>'
					+ '			<li id="jzFieldLabel_password" title="PASSWORD" fieldname="PASSWORD" columnname="jzFieldLabel_password" fieldtype="label" class="labelClass" jzstatus="moved" jzrequired="">'
					+ '				<div>'
					+ '					<table class="detail03 field-detail-table">'
					+ '						<tr>'
					+ '							<th id="jzFieldLabel_password_th" scope="row">' + conf.lang.passwordField + '：</th>'
					+ '							<td id="jzFieldLabel_password_td"><label class="password_label"></label></td>'
					+ '						</tr>'
					+ '					</table>'
					+ '				</div>'
					+ '			</li>';
				}
				else if (conf.jzformType == 'porxy_entry') {
//					memberHtml = '<li id="jzFieldLabel_name" title="NAME" fieldname="NAME" columnname="jzFieldLabel_name" fieldtype="label" class="labelClass" jzstatus="moved" jzrequired="">'
//						+ '				<div>'
//						+ '					<table class="detail03 field-detail-table">'
//						+ '						<tr>'
//						+ '							<th id="jzFieldLabel_name_th" scope="row"><span id="B1_required_control" class="tx-required">' + conf.lang.requiredMark + '</span>' + conf.lang.nameField + '：</th>'
//						+ '							<td id="jzFieldLabel_name_td"><label class="name_label"></label></td>'
//						+ '						</tr>'
//						+ '					</table>'
//						+ '				</div>'
//						+ '			</li>';
				}
				var layout = ' <div class="drag-target">' + conf.lang.dragTip + '</div>'
						+ '<div id="jzform" style="-moz-user-select: none;-webkit-user-select: none;" onselectstart="return false;">'
						+ '		<div id="jz-form-area">'
						+ '			<a id="option-control-link" href="" style="display:none;"></a>'
						+ '			<div id="jz-form-area-in">'
						+ ' 			<div class="form-title">' + conf.masterNameTitle + '</div>'
						+ '				<div class="jzformarea-border">'
						+ '					<div id="jzformarea">'
						+ '						<ul id="sortable2">'
						+ 							memberHtml							
						+ '						</ul>'
						+ '					</div>'
						+ '				</div>'
						+ '				<div class="f-clear"></div>'
						+ '			</div>'
						+ '		</div>'
						+ '		<div id="jz-form-item">'
						+ '			<div id="jz-form-item-in"></div>'
						+ '		</div>'
						+ '		<div class="f-clear"></div>'
						+ '</div>';
				$('#menu-content-in').html(layout);
				$('#menu-content-in').append('<div id="optionBox">'
											+ '  <div id="itemContentMenu">' + conf.lang.menuTitle + '</div>'
											+ '  <ul id="itemMenuDetail" class="item-contextmenu"></ul>'
											+ '</div>');

				var leftPanelHtml = '<div id="jz-form-item-in">'
								+ '		<div id="item-in-up">'
								+ '			<ul>'
								+ '				<li class="item-title">' + conf.lang.fieldsTitle + '</li>'
								+ '				<ul id="sortable1"></ul>'
								+ '			</ul>'
								+ '		</div>'
								+ '		<div class="margin-t8">'
								+ '			<ul>'
								+ '				<li class="item-title">' + conf.lang.imageFieldTitle + '</li>'
								+ '				<ul id="sortable3">'
								+ '					<li id="jzFieldImage"><div class="input-image">' + conf.lang.imageField + '</div></li>'
								+ '				</ul>'
								+ '			</ul>'
								+ '		</div>'
								+ '</div>';
				$('#jz-form-item').html(leftPanelHtml);

				setJzFieldWidth();
				setFieldList(fields);
				bindMouse();
				$('#jz-form-area li[class="normalClass"], li[class="labelClass"]').click(function(event) {
					$('.cke_top　jz-form-area').each(function(){
						var pid = $(this).parent().parent().attr("id");
						if (!(pid && pid.indexOf("webeditor") != -1)) {
							$(this).hide();	
						}
					});
					ckeditorBlur();
				});
		
				$(document).on('click', '#jzform input, #jzform select', function(event) {
					$(this).attr('checked', false);
					$(this).blur();
					return false;
				});

				// 普通项目从左侧拖拽到右侧 
				$("#sortable1").sortable({
					cursor : "move",
					cursorAt: {top: 12, left: 30},
					tolerance : 'pointer',
					connectWith : "#sortable2",
					start : function(event, ui) {
						var $item = ui.item;
						var columnName = $item.attr('columnName'), fieldType = $item.attr('fieldType');
						$.ajax({
							url : conf.extendFieldDetailURL + columnName,
							async : false,
							success : function(data, textStatus) {
								$item.children("div").html('<table class="detail03 drag-field-detail-table">' + data.ExtendFieldDetail + '</table>');
								$item.children("div").removeAttr("class");
								setJZFormareaCSS("start");
								setWebeditorJs(columnName, fieldType);
								$item.find("div.btn-gs>a").unbind('click');
							}
						});
						$("#optionBox").hide();
						$("#sortable2 li div").unbind('mousedown').unbind('mouseup').unbind('click');
					},
					stop : function(event, ui) {
						var $item = ui.item;
						if ($item.parent().attr("id") == "sortable1") {
							var thisField = {
									title: $item.attr('fieldName'),
									fieldName: $item.attr('fieldName'),
									columnName: $item.attr('columnName'),
									fieldType: $item.attr('fieldType'),
									showOrder: $item.attr('showOrder'),
									formCount: $item.attr('formCount')
							};
							$item.remove();
							setFieldInit(thisField, "delete");
							
						}
						else if ($item.parent().attr("id") == "sortable2") {
							$item.addClass("normalClass");
							$item.find("table").removeClass("drag-field-detail-table").addClass("field-detail-table");
							$item.attr('jzstatus', "moved");
						}
						
						// 如果左侧项目列表的内容为空, 恢复到初始状态
						if ($('#sortable1').html() == "") {
							$('#sortable1').html('<div class="input-none">' + conf.lang.itemContent + '</div>');
						}
						setJZFormareaCSS();
						bindMouse();
					},
					cancel : "#optionBox, .input-none",
					zIndex : 1002,
					revert : true
				});

				// 普通项目从右侧拖拽到左侧
				$("#sortable1").droppable({
					accept : "li.normalClass",
					tolerance : 'touch',
					drop : function(event, ui) {
						$item = ui.draggable;
						var thisField = {
								title: $item.attr('fieldName'),
								fieldName: $item.attr('fieldName'),
								columnName: $item.attr('columnName'),
								fieldType: $item.attr('fieldType'),
								showOrder: $item.attr('showOrder'),
								formCount: $item.attr('formCount')
						};
						$('#optionBox').hide();
						$item.remove();
						//$(".ui-sortable-placeholder").hide("slow");
						if ($('#sortable1').children("div").hasClass("input-none")) {
							$('#sortable1').html("");
						}
						setFieldInit(thisField, "delete");
						resizeJzFormArea('delete');
					}
				});

				// image项目从左侧拖拽到右侧
				$('#jzFieldImage').draggable({
					cursor: "move",
					cursorAt: {top: 4, left: 30},
					helper: function(e) {
						var htmlDataValue = getImageHtml($(this).attr('columnName'), "drag", imagePrefix + "drag");
						return $(htmlDataValue)[0];
					},
					start : function(event, ui) {
						setWebeditorJs (imagePrefix + "drag", $(this).attr('fieldType'));
						setJZFormareaCSS("start");
					},
					stop : function(event, ui) {
						setJZFormareaCSS();
					},
					connectToSortable : "#sortable2"
				});

				// image项目从右侧拖拽到左侧
				$("#jzFieldImage").droppable({
					accept: "li.imageClass",
					tolerance: 'touch',
					drop: function(event, ui) {
						var $item = ui.draggable;
						var colName = $item.attr('columnName').split('_');
						if (colName.length >= 2) {
							var editor = CKEDITOR.instances[imagePrefix + colName[1]];
							if (editor) {
								editor.destroy();
								editor = null;
							}
						}
						$('#optionBox').hide();
						$item.remove();
						//$(".ui-sortable-placeholder").hide("slow");
						resizeJzFormArea('delete');
					}
				});

				// 右侧项目进行拖拽排序
				$("#sortable2").sortable({
					cursor: "move",
					tolerance: 'pointer',
					connectWith: '#sortable2',
					start: function(event, ui) {
						if (ui.item.attr('fieldType') == "image") {
							ui.placeholder.height(ui.helper.height());
						}
						$("#optionBox").hide();
						$("#sortable2 li div").unbind('mousedown').unbind('mouseup').unbind('click');
					},
					stop: function(event, ui) {
						var $item = ui.item;
						if ($item.parent().attr("id") == "sortable2") {
							var columnName = $item.attr('columnName'), fieldType = $item.attr('fieldType');
							if (fieldType == "image") {
								var colName = columnName.split('_');
								if (colName.length >= 2) {
									var myeditor = CKEDITOR.instances[imagePrefix + colName[1]];
									var value= myeditor.document.getBody().getHtml();
									var htmlvalue = getImageHtml(columnName, "", imagePrefix + colName[1], value);
									$item.children("div").html(htmlvalue);
									setWebeditorJs (imagePrefix + colName[1], fieldType);
								}
								else {
									var uniqueTime = new Date().getTime();
									$item.addClass("imageClass");
									$item.attr({
										id: columnName + "_" + uniqueTime,
										fieldname: imagePrefix + uniqueTime,
										columnname: columnName + "_" + uniqueTime,
										jzstatus: 'moved',
									});
									var value = getImageHtml(columnName, "", imagePrefix + uniqueTime);
									$item.children("div").html(value);
									$item.children("div").removeAttr("class");
									setWebeditorJs (imagePrefix + uniqueTime, fieldType);
								}
							}
						}
						resizeJzFormArea('delete');
						bindMouse();
					},
					cancel : "#optionBox", // 阻止排序动作在匹配的元素上发生。
					zIndex : 1002,
					revert : true
				});
				$("#sortable1, #sortable2").disableSelection();
				
				// 展开或合并左侧列表
				$(".item-title").click(function() {
					$('#optionBox').hide();
					if ($(this).next().css("display") == "block") {
						$(this).next().slideUp("fast", "swing");
						$(this).addClass("selected");
					}
					else if ($(this).hasClass("selected")) {
						$(this).next().slideDown("fast", "swing");
						$(this).removeClass("selected");
					}
					else {
						$(this).addClass("selected");
					}
				});
				
				// 鼠标悬浮或离开左侧列表标题时, 标题的CSS设置
				$(".item-title").mouseover(function() {
					$(this).addClass("over");
				}).mouseleave(function() {
					$(this).removeClass("over");
				});
				
				// 鼠标悬浮或离开操作图标时, 设置的CSS设置
				$("#itemContentMenu").mouseover(function() {
					$(this).addClass("over");
				}).mouseleave(function() {
					$(this).removeClass("over");
				});
				//点击隐藏操作的下拉菜单
				$(document).bind("click", function(e) {
					$("#itemMenuDetail").hide();
					$("#itemContentMenu").removeClass('over');
				});
				
				$(document).bind("mouseover", function(e) {
					if ($("#itemMenuDetail").is(":visible")) {
						$("#itemContentMenu").addClass('over');
					}
				});
				
				// 鼠标点击拖拽区域内中项目上的操作图标时, 显示下拉列表
				$('#optionBox').unbind('click').bind('click', function(e) {
					if ($("#itemMenuDetail").is(":visible")) {
						$("#itemMenuDetail").hide();
						$("#itemContentMenu").removeClass("over");
						return;
					}
					else {
						$("#itemMenuDetail").show();
						$("#itemContentMenu").addClass("over");
					}
					$itemAttr = $('#' + $('#optionBoxHiddenBtn').attr('columnName'));
					var num = $itemAttr.nextAll().length, length = $("#sortable2 li").length;
					if (length == 1) {
						$("#optionBoxMoveUpBtn").parent("li").hide();
			 			$("#optionBoxMoveUpDisabledBtn").parent("li").show();
			 			$("#optionBoxMoveDownBtn").parent("li").hide();
			 			$("#optionBoxMoveDownDisabledBtn").parent("li").show();
					}
					else if (num == length-1) {
						$("#optionBoxMoveUpBtn").parent("li").hide();
			 			$("#optionBoxMoveUpDisabledBtn").parent("li").show();
					}
					else if (num == 0) {
			 			$("#optionBoxMoveDownBtn").parent("li").hide();
			 			$("#optionBoxMoveDownDisabledBtn").parent("li").show();
					}
					$('#itemContentMenu').addClass('over');
					//$("#itemMenuDetail").css({"margin-top": "18px"});
					$("#itemMenuDetail").show();
					$(this).show();
					return false;
				});
				
				// 「必須項目」菜单执行的操作
				$("#jz-jzrequired-option").die().live("click", function(e) {
					var $item = $('#' + $(this).attr('field')),
						$itemReu = $('#' + $(this).attr('field') + "_required_control"),
						$itemCon = $('#' + $(this).attr('field') + "_option_control");
					if ($(this).attr('field') == 'A59') {
						jzMsgBox(warningMsg("W_10009_000"), 'alert');
					}
					else {
						if ($(this).attr('checkedFlag') == 'checked') {
							$item.attr('jzrequired', '');
							$itemReu.html('');
						}
						else {
							$item.attr('jzrequired', 'checked');
							$itemReu.html(conf.lang.requiredMark);
						}
						if ($item.attr('jzOptionControl') == 'checked') {
							$itemCon.html(conf.lang.optionControlMark);
						}
					}
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
				});
				
				// 「選択肢による制御」菜单执行的操作
				$("#optionControlBtn").die().live("click", function(e) {
					for ( var i = 0; i < excludeFieldArray.length; i++) {
						var currentJson = jQuery.parseJSON(excludeFieldArray[i]);
						if (currentJson["columnName"] == $(this).attr('field')) {
							delete excludeFieldArray[i];
							excludeFieldArray.splice(i, 1);
						}
					}
					columnNameOption = $(this).attr("columnName");
					$('#option-control-link').attr('href', conf.optionControlURL + "/" + conf.masterName + "/" + $(this).attr('columnName'));
					$('#option-control-link').YSModalDialog({
						dialogTitle : conf.lang.optionControl,width:"600px"
					});
					$('#option-control-link').click();
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
				});

				// 「削除」菜单执行的操作
				$("#optionBoxDeleteBtn").die().live("click", function(e) {
					var $itemDel = $('#' + $('#optionBoxDeleteBtn').attr('columnName')),
						$itemAttr = $('#' + $('#optionBoxDeleteBtn').attr('columnName'));
					
					if ($('#optionBoxDeleteBtn').attr('columnName').indexOf('jzFieldImage') != -1) {
						$itemDel.remove();
					}
					else {
						if ($('#sortable1').children("div").hasClass("input-none")) {
							$('#sortable1').html("");
						}
						var thisField = {
							title: $itemAttr.attr('fieldName'),
							fieldName: $itemAttr.attr('fieldName'),
							columnName: $itemAttr.attr('columnName'),
							fieldType: $itemAttr.attr('fieldType'),
							showOrder: $itemAttr.attr('showOrder'),
							formCount: $itemAttr.attr('formCount')
						};
						$itemDel.remove();
						setFieldInit(thisField, "delete");
					}
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
					resizeJzFormArea('delete');
				});

				// 「上に移動」菜单执行的操作
				$("#optionBoxMoveUpBtn").die().live("click", function(e) {
					var itemNow = $('#' + $('#optionBoxMoveUpBtn').attr('columnName'));
					var itemUp = itemNow.prev();
					if (itemUp.length == 0) {
						$('#optionBox').hide();
						return false;
					}
					
					itemNow.insertBefore(itemUp);
					resetImage(itemNow);
					resetImage(itemUp);
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
				});

				// 「下に移動」菜单执行的操作
				$("#optionBoxMoveDownBtn").die().live("click", function(e) {
					var itemNow = $('#' + $('#optionBoxMoveDownBtn').attr('columnName'));
					var itemDown = itemNow.next();
					if (itemDown.length == 0) {
						$('#optionBox').hide();
						return false;
					}
					itemDown.insertBefore(itemNow);
					resetImage(itemNow);
					resetImage(itemDown);
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
				});
			}
		};

		function resizeJzFormArea(action) {
			var lastElement = $('[jzstatus="moved"]:last');
			var pos = lastElement.offset();

			if (action == 'delete') {
				$('#jzformarea').css('min-height', 350);
			}
			else {
				if ($('#jzformarea').offset().top + $('#jzformarea').height() - (pos.top + lastElement.height()) < 30) {
					$('#jzformarea').css('min-height', $('#jzformarea').height() + lastElement.height() * 2);
				}
			}
		}

		function setFieldList(fields) {
			$('#sortable1').empty();
			var count = 0;
			// for emailaddress and password.
			if (conf.jzformType == 'member_entry') {
				for ( var i = 0; i < fields.length; i++) {
					if (fields[i].used) {
						if (fields[i].used == 'YES') {
							// 初始化显示区域的内容
							$('#sortable2').empty();
							break;
						}
					}
				}
			}
			else if (conf.jzformType == 'porxy_entry') {
				for ( var i = 0; i < fields.length; i++) {
					if (fields[i].used) {
						if (fields[i].used == 'YES') {
							// 初始化显示区域的内容
							$('#sortable2').empty();
							break;
						}
					}
				}
			}
			else {
				$('#sortable1').empty();
				$('#sortable2').empty();
			}
			for ( var i = 0; i < fields.length; i++) {
				if (fields[i].used) {
					if (fields[i].used == 'YES') {
						setFieldMoved($('#sortable2'), fields[i]);
						count++;
					}
					else {
						setFieldInit(fields[i]);
					}
				}
			}
			// 初始时【ユーザマスタ項目】没有项目或者所有的项目都拖到了右侧, 设置【ユーザマスタ項目】的显示文字
			if (fields.length == 0 || count == fields.length) {
				$('#sortable1').html('<div class="input-none">' + conf.lang.itemContent + '</div>');
			}
			$('#jzFieldImage').attr({
				title: 'WEB EDITOR',
				fieldName: 'WEB EDITOR',
				columnName: 'jzFieldImage',
				fieldType: 'image',
				jzstatus: 'init',
				jzrequired: '',
				jzOptionControl: ''
			});
		}

		/**
		 * 項目（フォーム定義にまだ使われていない）リストの初期化
		 * 
		 * @param field
		 */
		function setFieldInit(field, type) {
			var liHtml = '<li id="' + field.columnName + '">'
					+ '		<div class="input-' + field.fieldType + '">' + getShortFieldName(field.fieldName) + '</div>'
					+ '	  </li>';
			if (type == "delete") {
				if (field.fieldType == "webeditor") {
					var editor = CKEDITOR.instances[field.columnName + '_' + field.fieldType];
					if (editor) {
						CKEDITOR.remove(editor);
					}
				}
				var showOrder = getShowOrder(field.showOrder);
				if (showOrder == "") {
					$('#sortable1').append(liHtml);
				}
				else {
					if (showOrder.indexOf("before") != -1) {
						showOrder = showOrder.substring(0, showOrder.length - 6);
						$('[showOrder="' + showOrder + '"]').before(liHtml);
					}
					else {
						$('[showOrder="' + showOrder + '"]').after(liHtml);
					}
				}
			}
			else {
				$('#sortable1').append(liHtml);
			}
			$('#' + field.columnName).attr({
				title: field.fieldName,
				fieldName: field.fieldName,
				columnName: field.columnName,
				fieldType: field.fieldType,
				showOrder: field.showOrder,
				formCount: field.formCount,
				jzstatus: 'init',
				// 必須
				jzrequired: '',
				// 選択肢による制御
				jzOptionControl : ''
			});
		}

		function getShowOrder(showOrder) {
			var showOrderStr = "", newShowOrderStr = "", minShowOrder = "";
			$('[showOrder][jzstatus="init"]').each(function() {
				showOrderStr += $(this).attr('showOrder') + ",";
			});
			if (showOrderStr != "") {
				showOrderStr = showOrderStr.substring(0, showOrderStr.length - 1);
				var showOrderArray = showOrderStr.split(",");
				for ( var i = 0; i < showOrderArray.length; i++) {
					if (parseInt(showOrder) < parseInt(showOrderArray[i])) {
						newShowOrderStr += showOrderArray[i] + ",";
					}
				}
				if (newShowOrderStr == "") {
					minShowOrder = Math.max.apply(Math, showOrderArray) + "before";
				}
				else {
					newShowOrderStr = newShowOrderStr.substring(0, newShowOrderStr.length - 1);
					var newShowOrderArray = newShowOrderStr.split(",");
					minShowOrder = Math.min.apply(Math, newShowOrderArray) + "";
				}
			}
			return minShowOrder;
		}

		/**
		 * 項目（フォーム定義に既に使われている）リストの初期化
		 * 
		 * @param targetId
		 * @param field
		 */
		function setFieldMoved($target, field) {
			// JZFORMの初期化の時、imageの初期化に利用する
			if (field.fieldType == "image") {
				var timeSuffix = field.columnName.substring(field.columnName.indexOf('_') + 1);
				if (!field.fieldName) {
					field.fieldName = imagePrefix + timeSuffix;
				}
				var htmlDataContent = getImageHtml(field.columnName, "", imagePrefix + timeSuffix, field.editorData);
				$target.append(getNormalOrImageHtml(field, htmlDataContent));
				$('#' + field.columnName).addClass("imageClass");
				setFieldMovedEnd(field, timeSuffix);
			}
			else {
				$target.append(getNormalOrImageHtml(field, field.htmlData));
				// the type of emailaddress and password.
				if (field.fieldType == "label") {
					$('#' + field.columnName).addClass("labelClass");
				}
				else {
					$('#' + field.columnName).addClass("normalClass");
				}
				setFieldMovedEnd(field);
			}
		}

		function setFieldMovedEnd(field, timeSuffix) {
			$('#' + field.columnName).attr({
				fieldName: field.fieldName,
				columnName: field.columnName,
				fieldType: field.fieldType,
				showOrder: field.showOrder,
				formCount: field.formCount,
				jzstatus: 'moved',
				jzrequired: field.jzrequired,
				jzOptionControl: field.jzOptionControl
			});
			// チェックされた場合、 FIELDの背景色を変える
			if (field.jzrequired == 'checked') {
				$('#' + field.columnName + "_required_control").html(conf.lang.requiredMark);	
			}
			if (field.jzOptionControl == 'checked') {
				$('#' + field.columnName + "_option_control").html(conf.lang.optionControlMark);
			}
			if (field.fieldType == 'image' || field.fieldType == 'webeditor') {
				var webeditorId = field.columnName;
				if (timeSuffix) {
					webeditorId = imagePrefix + timeSuffix;
				}
				setWebeditorJs (webeditorId, field.fieldType);
			}
			$('#' + field.columnName).find("div.btn-gs>a").unbind('click');
		}

		function getShortFieldName(fieldName) {
			var count = 0;
			var result = fieldName;
            if(fieldName.length == 0){
            	return "";
            }
            else {
            	result = fieldName.replace(/&/g,"&amp;");
            	result = result.replace(/</g,"&lt;");
            	result = result.replace(/>/g,"&gt;");
            	result = result.replace(/ /g,"&nbsp;");
            	result = result.replace(/\'/g,"&#39;");
            	result = result.replace(/\"/g,"&quot;");
            }
            if (result && result.length) {
				for ( var i = 0; i < result.length; i++) {
					var c = result.charCodeAt(i);
					if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
						count++;
					}
					else {
						count += 2;
					}
					if (count > 16) {
						result = result.substring(0, i);
						break;
					}
				}
			}
			return result;
		}

		function getImageHtml(columnName, classType, editorId, editorData) {
			var dragTableClass = "field-detail-table";
			if (classType == "drag") {
				dragTableClass = "drag-field-detail-table";
			}
			if (!editorData) {
				editorData = "";
			}
			return '<table class="detail03 ' + dragTableClass + '">'
				+ '		<tr id="' + columnName + '_tr" >'
				+ '		<td id="' + columnName + '_td" align="left"><textarea id="' + editorId + '">' + editorData + '</textarea></td>'
				+ '</tr></table>';
		}
		
		function getNormalOrImageHtml(field, htmlValue) {
			if (field.fieldType == "image") {
				htmlValue = '<li id="' + field.columnName + '"><div>' + htmlValue + '</div></li>';
			}
			else {
				htmlValue = '<li id="' + field.columnName + '"><div><table class="detail03 field-detail-table">' + htmlValue + '</table></div></li>';
			}
			return htmlValue;
		}
		
		function setWebeditorJs(columnName, fieldType) {
			if (fieldType == "webeditor") {
				var editor = CKEDITOR.instances[columnName + '_' + fieldType];
				if (editor) {
					CKEDITOR.remove(editor);
				}
				CKEDITOR.replace(columnName + '_' + fieldType, conf.config);
			}
			else if (fieldType == "image") {
				var editor = CKEDITOR.instances[columnName];
				if (editor) {
					CKEDITOR.remove(editor);					
				}
				editor = CKEDITOR.replace(columnName, conf.config);
				editor.on('loaded', function(event) {
					$('#cke_' + editor.name).find('.cke_top').hide();
				});
				
				editor.on('focus', function(event) {
					var cke = $('#cke_' + event.editor.name), 
						ckeTop = cke.find('.cke_top'), 
						ckeTopHeight = ckeTop.height(),
						optionBox = $('#optionBox');
					ckeTop.show();
					ckeTop.click();
				});
								
				editor.on('contentDom', function() {
				    this.document.on('click', function(event) {
				    	editor.focus();
				     });
				});
				
				editor.on('blur', function(event) {
					var cke = $('#cke_' + event.editor.name), 
						ckeTop = cke.find('.cke_top'), 
						ckeTopHeight = ckeTop.height(),
						optionBox = $('#optionBox'),
						optConBtnAttr = $('#optionControlBtn').attr('columnName'); 
			    	
					ckeTop.hide();
			    	if (optionBox.is(':visible') && cke.position().top < optionBox.position().top) {
			    		if (optionBox.attr('fieldId').indexOf('jzFieldImage') == -1) {
			    			optionBox.css({top: optionBox.position().top - ckeTopHeight - 10});
			    		}
			    	}
			    });
			}
		}
		
		function resetImage($item) {
			if ($item.attr("fieldType") == "image") {
				var columnName = $item.attr("columnName");
				var colName = columnName.split('_');
				if (colName.length >= 2) {
					var myeditor = CKEDITOR.instances[imagePrefix + colName[1]];
					var value= myeditor.document.getBody().getHtml();
					var htmlvalue = getImageHtml(columnName, "", imagePrefix + colName[1], value);
					$item.children("div").html(htmlvalue);
					setWebeditorJs (imagePrefix + colName[1], $item.attr("fieldType"));
				}
			}
		}
		
		// 设置开始拖拽或停止拖拽时拖拽区域的样式
		function setJZFormareaCSS(type) {
			// 停止拖拽时恢复到拖拽区域的初始样式
			var jzBorder = "#F7F7F7", jz = "#CCCCCC";
			if (type == "start") {
				// 开始拖拽时改变拖拽区域的样式
				jzBorder = "#DEDEDE";
				jz = "#666666";
			}
			$('.jzformarea-border').css("border-color", jzBorder);
			$('#jzformarea').css("border-color", jz);
		}
		
		// 点击拖拽区域内中项目时, 显示操作图标
		function bindMouse() {
			$("#optionBox").hide();
			$(document).on('click', '#sortable2 li>div', function(e) {
				var $item = $(this).parent();
				$(this).addClass('moved-over');
				var topPosition = ($item.position().top + 10) + "px", leftPosition = ($item.position().left + 10) + "px";
				if ($item.attr('fieldType') == 'webeditor' || $item.attr('fieldType') == 'image') {
					topPosition = $item.position().top + 10 + "px";
				}
				$("#optionBox").css({"left" : leftPosition, "top" : topPosition});
				$('#optionBox').show();
				
				// 拼接下拉菜单
				var itemDeleteMenu = '<li><a id="optionBoxDeleteBtn" class="normal"><span>' + conf.lang.deleteMenu + '</span></a></li>',
					itemMenuDetailHtml = '<li style="display: none;"><a id="optionBoxHiddenBtn"></a></li>'
									+ '   <li><a id="optionBoxMoveUpBtn" class="normal"><span>' + conf.lang.moveUpMenu + '</span></a></li>'
									+ '   <li style="display: none;"><a id="optionBoxMoveUpDisabledBtn" class="disabled"><span>' + conf.lang.moveUpMenu + '</span></a></li>'
									+ '   <li><a id="optionBoxMoveDownBtn" class="normal"><span>' + conf.lang.moveDownMenu + '</span></a></li>'
									+ '   <li style="display: none;"><a id="optionBoxMoveDownDisabledBtn" class="disabled"><span>' + conf.lang.moveDownMenu + '</span></a></li>';
				var itemEditMenu = '';
				if (conf.jzformType == 'facility_type_entry' || conf.jzformType == 'enquete_entry' || conf.jzformType == 'porxy_entry') {
					itemEditMenu = '<li><a class="normal" onclick="editExtendField(\'' + $item.attr('columnname') + '\');"><span>' + conf.lang.editMenu + '</span></a></li>';
				}
				if ($item.hasClass("normalClass")) {
					if (conf.jzformType == 'attend_entry') {
						itemMenuDetailHtml = itemDeleteMenu + itemMenuDetailHtml;
					}
					else {
						var ckeckedClass = "";
						if ($item.attr('jzrequired') == 'checked') {
							ckeckedClass = "checked";
						}
						var standardSelectArr = ['A27', 'A28', 'A30', 'A32', 'A37', 'A38', 'A39', 'A40', 'A59'];
						if ($item.attr('fieldType') == 'select' || $item.attr('fieldType') == 'radio' || $item.attr('fieldType') == 'checkbox' || $.inArray($item.attr('columnname'), standardSelectArr) != -1 ) {
							itemMenuDetailHtml = '<li><a id="jz-jzrequired-option" class="normal ' + ckeckedClass + '">'
											+ '		<span>' + conf.lang.requiredMenu + '</span></a></li>'
											+ '   <li class="separate"><a id="optionControlBtn" class="normal"><span>' + conf.lang.selectMenu + '</span></a></li>'
											+ itemEditMenu + itemDeleteMenu + itemMenuDetailHtml;
						}
						else {
							itemMenuDetailHtml = '<li class="separate"><a id="jz-jzrequired-option" class="normal ' + ckeckedClass + '">'
											+ '		<span>' + conf.lang.requiredMenu + '</span>'
											+ '	</a></li>'
											+ itemEditMenu + itemDeleteMenu + itemMenuDetailHtml;
						}
					}
				}
				else if ($item.hasClass("imageClass")) {
					itemMenuDetailHtml = itemDeleteMenu + itemMenuDetailHtml;
				}
				$('#itemMenuDetail').html(itemMenuDetailHtml);
				$('#itemContentMenu').removeClass('over');
				$('#itemMenuDetail').hide();

				var fieldId = $item.attr('id');
				$('#jz-jzrequired-option').attr({'field': fieldId, 'checkedFlag': $item.attr('jzrequired')});
				$('#optionControlBtn').attr({'columnName': fieldId, 'optionControlFlag': $item.attr('jzOptionControl')});
				$('#optionBoxDeleteBtn').attr('columnName', fieldId);
				$('#optionBoxHiddenBtn').attr('columnName', fieldId);
				$('#optionBoxMoveUpBtn').attr('columnName', fieldId);
				$('#optionBoxMoveDownBtn').attr('columnName', fieldId);
				
				$('#optionBox').attr('fieldId', fieldId);
			});
		}
		
		this.init(options);
		this.show(conf);
	};

	function ckeditorBlur() {
		if (!$.browser.msie) {
			for(name in window.CKEDITOR.instances) {
				window.CKEDITOR.instances[name].focusManager.blur();
				$('#cke_' + name).find('iframe').contents().find('body').blur();
			}
		}
	}

	jzform.prototype = {
		conf : {}
	};

	$.fn.jzform = function(options) {
		return new jzform(options);
	};
})(jQuery);

function addOperationToLeftItem(lang) {
	$(document).on('click', '#sortable1 li', function(e) {
		var topPosition = ($(this).position().top + 6) + "px", leftPosition = ($(this).position().left + 120) + "px";
		$("#optionBox").css({"left" : leftPosition, "top" : topPosition});
		$('#optionBox').show();
		
		// 拼接下拉菜单
		var fieldnameValue = $(this).attr('fieldname');		
		var result = fieldnameValue.replace(/&/g,"&amp;");
		result = result.replace(/</g,"&lt;");
		result = result.replace(/>/g,"&gt;");
		result = result.replace(/ /g,"&nbsp;");
		result = result.replace(/\'/g,"&#39;");
		result = result.replace(/\"/g,"&quot;");
		
		var itemDeleteMenu = '<li><a class="normal" onclick="editExtendField(\'' + $(this).attr('columnname') + '\');"><span>' + lang.editMenu + '</span></a></li>'
		 					+ '<li><a class="normal" onclick="deleteExtendField(\'' + result + '\',  \'' + $(this).attr('columnname') + '\',  \'' + $(this).attr('formcount') + '\');"><span>' + lang.deleteMenu + '</a></li>';
		$('#itemMenuDetail').html(itemDeleteMenu);
		$('#itemContentMenu').removeClass('over');
		$('#itemMenuDetail').hide();
	});
}

function addOperationItem(title, fieldName, columnName, fieldType, showOrder, formCount) {
	var thisField = {
			title: title,
			fieldName: fieldName,
			columnName: columnName,
			fieldType: fieldType,
			showOrder: showOrder,
			formCount: formCount
	};
	$('#optionBox').hide();
	if ($('#sortable1').children("div").hasClass("input-none")) {
		$('#sortable1').html("");
	}
	setFieldInit(thisField, "delete");
	resizeJzFormArea('delete');
}

/**
 * 項目（フォーム定義にまだ使われていない）リストの初期化
 * 
 * @param field
 */
function setFieldInit(field, type) {
	var liHtml = '<li id="' + field.columnName + '">'
			+ '		<div class="input-' + field.fieldType + '">' + getShortFieldName(field.fieldName) + '</div>'
			+ '	  </li>';
	if (type == "delete") {
		if (field.fieldType == "webeditor") {
			var editor = CKEDITOR.instances[field.columnName + '_' + field.fieldType];
			if (editor) {
				CKEDITOR.remove(editor);
			}
		}
		var showOrder = getShowOrder(field.showOrder);
		if (showOrder == "") {
			$('#sortable1').append(liHtml);
		}
		else {
			if (showOrder.indexOf("before") != -1) {
				showOrder = showOrder.substring(0, showOrder.length - 6);
				$('[showOrder="' + showOrder + '"]').before(liHtml);
			}
			else {
				$('[showOrder="' + showOrder + '"]').after(liHtml);
			}
		}
	}
	else {
		$('#sortable1').append(liHtml);
	}
	$('#' + field.columnName).attr({
		title: field.fieldName,
		fieldName: field.fieldName,
		columnName: field.columnName,
		fieldType: field.fieldType,
		showOrder: field.showOrder,
		formCount: field.formCount,
		jzstatus: 'init',
		// 必須
		jzrequired: '',
		// 選択肢による制御
		jzOptionControl : ''
	});
}

function getShowOrder(showOrder) {
	var showOrderStr = "", newShowOrderStr = "", minShowOrder = "";
	$('[showOrder][jzstatus="init"]').each(function() {
		showOrderStr += $(this).attr('showOrder') + ",";
	});
	if (showOrderStr != "") {
		showOrderStr = showOrderStr.substring(0, showOrderStr.length - 1);
		var showOrderArray = showOrderStr.split(",");
		for ( var i = 0; i < showOrderArray.length; i++) {
			if (parseInt(showOrder) < parseInt(showOrderArray[i])) {
				newShowOrderStr += showOrderArray[i] + ",";
			}
		}
		if (newShowOrderStr == "") {
			minShowOrder = Math.max.apply(Math, showOrderArray) + "before";
		}
		else {
			newShowOrderStr = newShowOrderStr.substring(0, newShowOrderStr.length - 1);
			var newShowOrderArray = newShowOrderStr.split(",");
			minShowOrder = Math.min.apply(Math, newShowOrderArray) + "";
		}
	}
	return minShowOrder;
}

function getShortFieldName(fieldName) {
	var count = 0;
	var result = fieldName;
    if(fieldName.length == 0){
    	return "";
    }
    else {
    	result = fieldName.replace(/&/g,"&amp;");
    	result = result.replace(/</g,"&lt;");
    	result = result.replace(/>/g,"&gt;");
    	result = result.replace(/ /g,"&nbsp;");
    	result = result.replace(/\'/g,"&#39;");
    	result = result.replace(/\"/g,"&quot;");
    }
    if (result && result.length) {
		for ( var i = 0; i < result.length; i++) {
			var c = result.charCodeAt(i);
			if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
				count++;
			}
			else {
				count += 2;
			}
			if (count > 16) {
				result = result.substring(0, i);
				break;
			}
		}
	}
	return result;
}

function resizeJzFormArea(action) {
	var lastElement = $('[jzstatus="moved"]:last');
	var pos = lastElement.offset();

	if (action == 'delete') {
		$('#jzformarea').css('min-height', 350);
	}
	else {
		if ($('#jzformarea').offset().top + $('#jzformarea').height() - (pos.top + lastElement.height()) < 30) {
			$('#jzformarea').css('min-height', $('#jzformarea').height() + lastElement.height() * 2);
		}
	}
}
