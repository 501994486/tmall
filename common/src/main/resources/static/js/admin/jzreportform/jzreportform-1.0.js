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
				
				var layout = ' <div class="drag-target">' + conf.lang.dragTip + '</div>'
						+ '<div id="jzform" style="-moz-user-select: none;-webkit-user-select: none;" onselectstart="return false;">'
						+ '		<div id="jz-form-area">'
						+ '			<a id="option-control-link" href="" style="display:none;"></a>'
						+ '			<div id="jz-form-area-in">'
						+ ' 			<div class="form-title">' + conf.masterNameTitle + '</div>'
						+ '				<div class="jzformarea-border">'
						+ '					<div id="jzformarea">'
						+ '						<textarea id="reportFormData" name="reportFormData"></textarea>'
						+ '					</div>'
						+ '				</div>'
						+ '				<div class="f-clear"></div>'
						+ '			</div>'
						+ '		</div>'
						+ '		<div id="jz-form-item">'
						+ '		</div>'						
						+ '		<div class="f-clear"></div>'
						+ '		<div id="msgBoxCopy" style="display:none; position:absolute; padding:4px 0px 0px 8px; background:#fff; color:#000; width:145px; height:20px;">'+conf.lang.copyOK+'</div>'
						+ '</div>';
				$('#menu-content-in').html(layout);
				
				var leftPanelHtml = '<div id="jz-form-item-in">'
								+ '		<div id="item-in-up">'
								+ '			<ul>'
								+ '				<li class="item-title">' + conf.lang.fieldsTitle + '</li>'
								+ '				<ul id="master-item-list"></ul>'
								+ '			</ul>'
								+ '		</div>'
								+ '		<div id="report-items-wrap" class="margin-t8">'
								+ '		</div>'
								+ '</div>';
				$('#jz-form-item').html(leftPanelHtml);

				addReportItems(conf.lang.reportItems, conf.reportFormType);

				setJzFieldWidth();
				setFieldList(fields);
				
				var zcb=new ZeroClipboard(document.getElementsByClassName('zcb'));
				zcb.on("ready", function( readyEvent ) {
					zcb.on( "aftercopy", function( event ) {
					    zcbData = event.data["text/plain"];
					});
				});
				
				reportEditor = CKEDITOR.replace("reportFormData", conf.config);
				reportEditor.on('instanceReady', function(event) {
					$('.cke_toolbox_main').find('.cke_toolgroup').last().remove();		
				});
				reportEditor.setData(conf.reportFormData);
				reportEditor.on('paste', function(evt) {
					if (typeof zcbData != 'undefined' && zcbData) {
						reportEditor.insertHtml(getReportItemHtml(zcbData));
						zcbData = null;
					}
					return false;
				}, reportEditor.element.$);
				
				reportEditor.on('focus', function(){
					$('html,body').animate({scrollTop: $("#jzform").offset().top}, 'slow');
				});
				
				$('#master-item-list li>div, #report-items li>div').mouseover(function() {
					$(this).css('background-color', '#fff');
				})
				.mouseout(function() {
					$(this).css('background-color', '#EFEFEF');
				})
				.click(function() {
					$('#msgBoxCopy').css({'left':$(this).position().left + 4, 'top': $(this).position().top + 2}).show().fadeOut(1000);
					$(this).show('bounce');
				});
				
				$('#jz-form-item').mouseleave(function() {
					$(this).find('li>div').css('background-color', '#EFEFEF');
				});
						
				// 展开或合并左侧列表
				$(".item-title").click(function() {
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
			}
		};
		
		function getReportItemHtml(reportItem) {
			var reportItemHtml, isTextarea=false, size=20, cols=76, rows=6, initVal=$('#'+reportItem).text().trim();
			// group items
			if (reportItem == 'ADDRESS'.toLowerCase()) {
				reportItemHtml = '郵便番号：<input type="text" name="A16" value="123" style="width: 36px;" />-<input type="text" name="A17" value="456" style="width: 36px;" />'
					+ '<br /><br />住所：<input type="text" name="A18" value="東京都" size="4" />'
					+ '<input type="text" name="A19" value="××区" size="10" />'
					+ '<input type="text" name="A20" value="○○町1丁目123-4" size="20" />';
			}			
			else if (reportItem == 'BIRTH_DAY_SPLIT') {
				reportItemHtml = '<input type="text" name="A15" value=""  style="width: 40px;" />年'
								+ '<input type="text" name="A14" value="" style="width: 14px;" />月'
								+ '<input type="text" name="A13" value="" style="width: 14px;" />日';
			}
			else if (reportItem == 'BUSINESS') {
				reportItemHtml = '<input type="text" name="A33" value="業種" size="10" />'
								+ '<input type="text" name="A34" value="大分類" size="10" />'
								+ '<input type="text" name="A35" value="中分類" size="10" />'
								+ '<input type="text" name="A36" value="小分類" size="10" />';
			}
			else if (reportItem == 'COMPANY_ADDRESS') {
				reportItemHtml = '郵便番号：<input type="text" name="A53" value="123" style="width: 36px;" />-<input type="text" name="A54" value="456" style="width: 36px;" />'
					+ '<br /><br />住所：<input type="text" name="A55" value="東京都" size="4" />'
					+ '<input type="text" name="A56" value="××区" size="10" />'
					+ '<input type="text" name="A57" value="○○町1丁目123-4" size="20" />';
			}
			else if (reportItem == 'FOREIGN_ADDRESS') {
				reportItemHtml = '<input type="text" name="A21" value="Apartment, unit, building, etc." size="24" />'
								+ '<input type="text" name="A22" value="Street address" size="10" />'			
								+ '<input type="text" name="A23" value="City" size="10" />'								
								+ '<input type="text" name="A24" value="State/Province/Region" size="18" />'
								+ '<input type="text" name="A26" value="Country" size="10" />'								
								+ '<input type="text" name="A25" value="Zip" size="10" />';
			}
			else if (reportItem == 'NAME_ALPHABET') {
				reportItemHtml = '<input type="text" name="A11" value="SEI" size="10" />'
								+ '<input type="text" name="A12" value="MEI" size="10" />';
			}
			else if (reportItem == 'NAME_HIRAKANA') {
				reportItemHtml = '<input type="text" name="A7" value="せい" size="10" />'
								+ '<input type="text" name="A8" value="めい" size="10" />';
			}
			else if (reportItem == 'NAME_KAN_JI') {
				reportItemHtml = '<input type="text" name="A5" value="姓" size="10" />'
								+ '<input type="text" name="A6" value="名" size="10" />';
			}
			else if (reportItem == 'NAME_KATAKANA') {
				reportItemHtml = '<input type="text" name="A9" value="セイ" size="10" />'
								+ '<input type="text" name="A10" value="メイ" size="10" />';
			}
			else if (reportItem == 'PROFESSION') {
				reportItemHtml = '<input type="text" name="A49" value="職業（大分類）" size="10" />'
								+ '<input type="text" name="A50" value="職業（中分類）" size="10" />'
								+ '<input type="text" name="A51" value="職業（小分類）" size="10" />';
			}
			
			// account items
			else if(reportItem == 'accountEntryDate') {
				size=20;
			}
			else if(reportItem == 'accountAmount') {
				size=20;
			}
			else if(reportItem == 'accountEntryDate') {
				size=20;
			}
			else if(reportItem == 'accountEntryDate') {
				size=20;
			}
			
			// fax items
			else if(reportItem == 'faxDeliveryDate') {
				size=20;
			}
			else if(reportItem == 'faxTitle') {
				size = 70;
			}
			else if(reportItem == 'faxMemo') {
				isTextarea = true;
			}
			else if(reportItem == 'faxTotalPages') {
				reportItemHtml = '<input type="text" name="faxTotalPages" value="'+initVal+'" size="6" />ページ';
			}
			else if(reportItem == 'faxNumber') {
				size= 10;
			}
			
			if (!reportItemHtml) {
				if (isTextarea) {
					reportItemHtml = '<textarea name="'+reportItem+'" cols="'+cols+'" rows="'+rows+'">'+initVal+'</textarea>';
				}
				else {
					reportItemHtml = '<input type="text" name="'+reportItem+'" size="'+size+'" value="'+initVal+'" />';
				}
			}
			
			return reportItemHtml;
		}
		
		
		function addReportItems(reportItems, reportFormType) {
			var reportItemsHtml = '<ul>';
			reportItemsHtml += '<li class="item-title">' + reportItems[reportFormType].title + '</li>';
			if (reportItems[reportFormType].subItems) {
				reportItemsHtml += '<ul id="report-items">';
				for(var reportItemId in reportItems[reportFormType].subItems) {
				    reportItemsHtml += '<li id="'+reportItemId+'" fieldName="'+reportItems[reportFormType].subItems[reportItemId].title+'" columnname="'+reportItems[reportFormType].subItems[reportItemId].title+'" fieldtype="standard" showorder="0" formcount="0" jzstatus="init" jzrequired=""><div data-clipboard-text="' + reportItemId + '" class="zcb">'
	                + reportItems[reportFormType].subItems[reportItemId].title + '</div></li>';	
				}
				reportItemsHtml += '</ul>';	
			}
			reportItemsHtml += '</ul>';
			$('#report-items-wrap').html(reportItemsHtml);
		}
		
		function setFieldList(fields) {
			var count = 0;
			// for emailaddress and password.
			if (conf.jzformType == 'member_entry') {
				for ( var i = 0; i < fields.length; i++) {
					if (fields[i].used) {
						if (fields[i].used == 'YES') {
							// 初始化显示区域的内容
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
							break;
						}
					}
				}
			}
			else {
				$('#master-item-list').empty();
			}
			for ( var i = 0; i < fields.length; i++) {
				if (fields[i].used) {
					if (fields[i].used == 'YES') {
						//setFieldMoved($('#sortable2'), fields[i]);
						count++;
					}
					else {
						setFieldInit(fields[i]);
					}
				}
			}
			// 初始时【ユーザマスタ項目】没有项目或者所有的项目都拖到了右侧, 设置【ユーザマスタ項目】的显示文字
			if (fields.length == 0 || count == fields.length) {
				$('#master-item-list').html('<div class="input-none">' + conf.lang.itemContent + '</div>');
			}
			$('#jzFieldImage').attr({
				/*title: 'WEB EDITOR',*/
				fieldName: 'WEB EDITOR',
				columnName: 'jzFieldImage',
				fieldType: 'image',
				jzstatus: 'init',
				jzrequired: ''
			});
		}

		/**
		 * 項目（フォーム定義にまだ使われていない）リストの初期化
		 * 
		 * @param field
		 */
		function setFieldInit(field, type) {
			var liHtml = '<li id="' + field.columnName + '">'
					+ '		<div data-clipboard-text="'+field.columnName+'" class="zcb input-' + field.fieldType + '">' + getShortFieldName(field.fieldName) + '</div>'
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
					$('#master-item-list').append(liHtml);
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
				$('#master-item-list').append(liHtml);
			}
			$('#' + field.columnName).attr({
				/*title: conf.lang.liTitle,*/
				fieldName: field.fieldName,
				columnName: field.columnName,
				fieldType: field.fieldType,
				showOrder: field.showOrder,
				formCount: field.formCount,
				jzstatus: 'init',
				// 必須
				jzrequired: ''
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
				jzrequired: field.jzrequired
			});
			// チェックされた場合、 FIELDの背景色を変える
			if (field.jzrequired == 'checked') {
				$('#' + field.columnName + "_required_control").html(conf.lang.requiredMark);
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
			if (fieldName && fieldName.length) {
				for ( var i = 0; i < fieldName.length; i++) {
					var c = fieldName.charCodeAt(i);
					if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
						count++;
					}
					else {
						count += 2;
					}
					if (count > 16) {
						result = fieldName.substring(0, i);
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
						ckeTopHeight = ckeTop.height();
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
						optConBtnAttr = $('#optionControlBtn').attr('columnName'); 
					ckeTop.hide();
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
