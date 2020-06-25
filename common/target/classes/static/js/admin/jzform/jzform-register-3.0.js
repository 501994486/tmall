/**
 * jzform-register version 3.0
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
				else if (conf.jzformType == 'service_member_entry') {
					memberHtml = '<li id="jzFieldLabel_membershipidentifier" title="MEMBERSHIPIDENTIFIER" fieldname="MEMBERSHIPIDENTIFIER" columnname="jzFieldLabel_membershipiIdentifier" fieldtype="label" class="labelClass" jzstatus="moved" jzrequired="">'
						+ '				<div>'
						+ '					<table class="detail03 field-detail-table">'
						+ '						<tr>'
						+ '							<th id="jzFieldLabel_membershipidentifier_th" scope="row">' + conf.lang.membershipIdentifierField + '：</th>'
						+ '							<td id="jzFieldLabel_membershipidentifier_td"><label class="membershipidentifier_label"></label></td>'
						+ '						</tr>'
						+ '					</table>'
						+ '				</div>'
						+ '			</li>'
						+ '			<li id="jzFieldLabel_businessdomain" title="BUSINESSDOMAIN" fieldname="BUSINESSDOMAIN" columnname="jzFieldLabel_businessdomain" fieldtype="label" class="labelClass" jzstatus="moved" jzrequired="">'
						+ '				<div>'
						+ '					<table class="detail03 field-detail-table">'
						+ '						<tr>'
						+ '							<th id="jzFieldLabel_businessdomain_th" scope="row">' + conf.lang.businessDomainField + '：</th>'
						+ '							<td id="jzFieldLabel_businessdomain_td"><label class="businessdomain_label"></label></td>'
						+ '						</tr>'
						+ '					</table>'
						+ '				</div>'
						+ '			</li>'
						+ '			<li id="jzFieldLabel_membershipshopname" title="MEMBERSHIPSHOPNAME" fieldname="MEMBERSHIPSHOPNAME" columnname="jzFieldLabel_membershipshopname" fieldtype="label" class="labelClass" jzstatus="moved" jzrequired="">'
						+ '				<div>'
						+ '					<table class="detail03 field-detail-table">'
						+ '						<tr>'
						+ '							<th id="jzFieldLabel_membershipshopname_th" scope="row">' + conf.lang.membershipShopNameField + '：</th>'
						+ '							<td id="jzFieldLabel_membershipshopname_td"><label class="membershipshopname_label"></label></td>'
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
				var layout = `
					<div class="drag-target is-hidden">${conf.lang.dragTip}</div>
					<div id="jzform" class="jz-form-report div-change-trigger" onselectstart="return false;">
						<div id="jz-form-area" class="jz-form-container">
						<a id="option-control-link" href="" class="is-hidden"></a>
						<div class="jz-form-header">
				          <div class="jz-form-header_l">
				            <span><span id="page-conf-str">${conf.masterNameTitle}</span></span>
				            <span><div class="divider"></div></span>
				            <span><a class="" href="javascript:;" onclick="hover('#jz-form-item');"><i class="fa fa-th-large question-bubble-popup" ${conf.lang.hoverBtnTip}></i></a></span>
				          </div>
						  
				          <div class="jz-form-header_r">
				            <a id="full-size-btn" class="btn-alone">
				                <span>全画面表示</span>
				                ${conf.lang.btnTip}
				                <span class="is-hidden">通常表示</span>
				            </a>
				          </div>
				        </div>
						<div id="jz-form-area-in" class="jz-form__bk-canvas">
									<div class="jz-form-canvas">
										<div id="jzformarea">
											<ul id="sortable2" class="form-table">
					 							${memberHtml}						
											</ul>
											<div class="jz-form-no-item is-hidden">
												<div><i class="fa fa-arrow-circle-o-down"></i></div><div><m>項目をドラッグしレイアウトしてください。</m></div>
											</div>
										</div>
									</div>
									<div class="f-clear"></div>
								</div>
							</div>
							<div id="jz-form-item" class="pull-dw-menu-list is-display-none">
								<div id="jz-form-item-in"></div>
							</div>
							<div class="f-clear"></div>
						</div>`;
				
				var editor = 
					// <iframe class="jz-form-canvas" src='about:blank'></iframe>
//					`<script type="text/javascript" src="https://172.28.4.13/r/js/common/jquery-1.7.2.min.js"></script>
//					 <script type="text/javascript" src="https://172.28.4.13/r/js/admin/jzform/jzform-layout-3.0.js"></script>
//					 <link type="text/css" rel="stylesheet" href="${top.jzAppVars().webCssUrl}">
//					` +
					`<div id="jzformarea">
											<ul id="sortable2">
					 							${memberHtml}						
											</ul>
										</div>`;
				
				$('#menu-content-in').html(layout);
				
//				$('iframe.jz-form-canvas').ready(function() {
//					  $('body', $('iframe.jz-form-canvas').contents()).html(editor);
//				});
				
				$('#menu-content-in').append('<div id="optionBox" class="jzform-contextmenu">'
											+ '  <div id="itemContentMenu" class="is-hidden">' + conf.lang.menuTitle + '</div>'
											+ '  <ul id="itemMenuDetail" class="item-contextmenu"></ul>'
											+ '</div>');

				var leftPanelHtml = `
				                
								  <ul class="pull-dw-menu">
									 <div class="vw-change">
								        <a id="to-tile-btn" class="icon-mgn link-trigger-excepted " href="javascript:;" onclick="toTile();"><i class="fa fa-th-large question-bubble-popup" ${conf.lang.leftPanelTitleBtnTip}></i></a>
								        <a id="to-list-btn" class="icon-mgn link-trigger-excepted is-selected" href="javascript:;" onclick="toList();"><i class="fa fa-list-ul question-bubble-popup" ${conf.lang.leftPanelListBtnTip}></i></a>
								      </div>
								      <li class="pull-dw-menu__parents">
								        <div id="item-in-up" class="op-cl-area">
								          <span class="font-lead">${conf.lang.fieldsTitle}</span>
								        </div>
								      	<div class="pull-dw-menu__slide-area">
								          <ul id="sortable1" class="pull-dw-menu__child"></ul>
										</div>
								      	<div id="itemOptionBox" class="jzform-contextmenu is-display-none">
								      		<ul id="itemOptionBoxDetail" class="item-contextmenu"></ul>
										</div>
									  </li>
									  <li class="pull-dw-menu__parents">
									  
								        <div class="op-cl-area">
								          <span class="font-lead">${conf.lang.imageFieldTitle}</span>
								        </div>
								      	<div id="sortable3" class="pull-dw-menu__slide-area">
								          <ul id="sortable3" class="pull-dw-menu__child">
											 <li id="jzFieldImage" class="pull-dw-menu__contents">
											 	<div class="ic-txt-box input-image">
												 	<div class="ic-txt-box_icon"><i class="fa fa-file-image-o" aria-hidden="true"></i></div>
													<div class="ic-txt-box_txt"><span>${conf.lang.imageField}</span></div>
											 	</div>
											 </li>
										  </ul>
										</div>
									  </li>
								  </ul>
								`;
				$('#jz-form-item').html(leftPanelHtml);
				
				setJzFieldWidth();
				setFieldList(fields);
				bindMouse();

				hover('#jz-form-item');
				
				$(".op-cl-area").on("click", function(){
					var $parent = $(".op-cl-area").parent();
					$parent.find(".op-cl-area").removeClass("open");
					$parent.find(".pull-dw-menu__slide-area").removeClass("open");
					$parent.find(".pull-dw-menu__slide-area").slideUp();
				    if($(this).next().is(':hidden')){
				        $(this).addClass("open");
				        $(this).next().addClass("open");
				        $(this).next().slideDown();
				    }
				});
				
				$('#jz-form-area li[class="normalClass"], li[class="labelClass"]').click(function(event) {
					$('.cke_top　jz-form-area').each(function(){
						var pid = $(this).parent().parent().attr("id");
						if (!(pid && pid.indexOf("webeditor") != -1)) {
							$(this).hide();	
						}
					});
				});
		
				$(document).on('click', '#jzform input, #jzform select', function(event) {
					$(this).attr('checked', false);
					$(this).blur();
					return false;
				});

				// 普通?目从左???到右? 
				$("#sortable1").sortable({
					cursor : "move",
					cursorAt: {top: 12, left: 30},
					tolerance : 'pointer',
					connectWith : "#sortable2",
					forcePlaceholderSize: true,
					placeholder: "placeholder",
					helper: function(e, item) {
						return item.prop("outerHTML");
					},
					start : function(event, ui) {
						/*
						var $item = ui.item;
						var columnName = $item.attr('columnName'), fieldType = $item.attr('fieldType');
						$.ajax({
							url : conf.extendFieldDetailURL + columnName,
							async : false,
							success : function(data, textStatus) {
								$item.children("div").html('<table class="detail03 drag-field-detail-table">' + data.ExtendFieldDetail + '</table>');
								$item.children("div").removeAttr("class");
								setJZFormareaCSS("start");
								//setWebeditorJs(columnName, fieldType);
								$item.find("div.btn-gs>a").unbind('click');
							}
						});
						$("#optionBox").hide();
						$("#sortable2 li div").unbind('mousedown').unbind('mouseup').unbind('click');
						*/
					},
					stop : function(event, ui) {
						var $item = ui.item;
						if ($item.parent().attr("id") == "sortable1") {
							/*
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
							*/
							$(ui.sender).sortable('cancel');
							return false;
						}
						else if ($item.parent().attr("id") == "sortable2") {
							
							var columnName = $item.attr('columnName'), fieldType = $item.attr('fieldType');
							$.ajax({
								url : conf.extendFieldDetailURL + columnName,
								async : false,
								success : function(data, textStatus) {
									$item.children("div").html('<table class="detail03 drag-field-detail-table">' + data.ExtendFieldDetail + '</table>');
									$item.children("div").removeAttr("class");
									setJZFormareaCSS("start");
									//setWebeditorJs(columnName, fieldType);
									$item.find("div.btn-gs>a").unbind('click');
								}
							});
							$("#optionBox").hide();
							$("#sortable2 li div").unbind('mousedown').unbind('mouseup').unbind('click');
							
							$item.find(".icon-menu-list").remove();
							resetDivToIframe($item);
							resetImage($item);
							
							$item.removeClass("pull-dw-menu__contents");
							$item.addClass("normalClass");
							$item.find("table").removeClass("drag-field-detail-table").addClass("field-detail-table");
							$item.attr('jzstatus', "moved");
							
							resizeJzFormArea();
						}
						
						// 如果左??目列表的内容?空, 恢?到初始状?
						if ($('#sortable1').html() == "") {
							$('#sortable1').html('<div class="input-none">' + conf.lang.itemContent + '</div>');
						}
						setJZFormareaCSS();
						bindMouse();
						$('#jzform').change();
					},
					cancel : "#optionBox, .input-none",
					zIndex : 1002,
					revert : true
				});

				// 普通?目从右???到左?
				/*
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
						$('#jzform').change();
					}
				});
				*/
				// image?目从左???到右?
				$('#jzFieldImage').draggable({
					cursor: "move",
					cursorAt: {top: 4, left: 30},
					connectToSortable : "#sortable2",
					helper: function(e) {
						//var htmlDataValue = getImageHtml($(this).attr('columnName'), "drag", imagePrefix + "drag");
						//return $(htmlDataValue)[0];
						return  $($(this).prop("outerHTML"));
					},
					start : function(event, ui) {
						//setWebeditorJs (imagePrefix + "drag", $(this).attr('fieldType'));
						setJZFormareaCSS("start");
					},
					stop : function(event, ui) {
						setJZFormareaCSS();
						$('#jzform').change();
					}
				});

				// image?目从右???到左?
				/*
				$("#jzFieldImage").droppable({
					accept: "li.imageClass",
					tolerance: 'touch',
					drop: function(event, ui) {
						var $item = ui.draggable;
						var colName = $item.attr('columnName').split('_');
						if (colName.length >= 2) {
						}
						$('#optionBox').hide();
						$item.remove();
						//$(".ui-sortable-placeholder").hide("slow");
						resizeJzFormArea('delete');
					}
				});
				*/
				// 右??目?行??排序
				$("#sortable2").sortable({
					cursor: "move",
					tolerance: 'pointer',
					connectWith: '#sortable2',
					forcePlaceholderSize: true,
					placeholder: "placeholder",
					cancel : "#optionBox", // 阻止排序?作在匹配的元素上?生。
					zIndex : 1002,
					revert : 200,
					axis: "y",
					start: function(event, ui) {
						if (ui.item.attr('fieldType') == "image") {
							//ui.helper.css("min-height","50px");
							ui.placeholder.height(ui.helper.height());
						}
						$("#optionBox").hide();
						$("#sortable2").addClass("sorting")
						$("#sortable2 li div").unbind('mousedown').unbind('mouseup').unbind('click');
					},
					stop: function(event, ui) {
						var $item = ui.item;
						$("#sortable2").removeClass("sorting")
						if ($item.parent().attr("id") == "sortable2") {
							var columnName = $item.attr('columnName'), fieldType = $item.attr('fieldType');
							if (fieldType == "image") {
								var colName = columnName.split('_');
								if (colName.length >= 2) {
									var value= $("#" + imagePrefix + colName[1]).html();
									var htmlvalue = getImageHtml(columnName, "", imagePrefix + colName[1], value);
									$item.children("div").html(htmlvalue);
								}
								else {
									var uniqueTime = new Date().getTime();
									$item.removeAttr("class");
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
								}
							}
							
							resetDivToIframe($item);
							resetImage($item);
						}
						resizeJzFormArea('delete');
						bindMouse();
						$('#jzform').change();
					}
				});
				$("#sortable1, #sortable2").disableSelection();
				
				resizeJzFormArea();
				
				$(document).bind("click", function(e) {
					var target = $(e.target); 
					
					if (target.closest('#optionBox.over, .icon-menu-list ').length == 0) {
						$("#optionBox").hide();
					}
				});
				
				$("#full-size-btn").die().live("click", function(e) {
					toFullPage();
				});
				
				
				// 「必須項目」菜??行的操作
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
						
						$('#jzform').change();
					}
					resetDivToIframe($item);
					resetImage($item);
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
				});
				
				// 「選択肢による制御」菜??行的操作
				$("#optionControlBtn").die().live("click", function(e) {
					for ( var i = 0; i < excludeFieldArray.length; i++) {
						var currentJson = jQuery.parseJSON(excludeFieldArray[i]);
						if (currentJson["columnName"] == $(this).attr('field')) {
							delete excludeFieldArray[i];
							excludeFieldArray.splice(i, 1);
						}
					}
					columnNameOption = $(this).attr("columnName");
					var id = "optionControlLinkId";
					$('#option-control-link').attr('href', conf.optionControlURL + "/" + conf.masterName + "/" + $(this).attr('columnName'));
					$('#option-control-link').YSModalDialog({
						width: 700,
						dialogTitle : conf.lang.optionControl,	
						dialogId : id
					});
					$('#option-control-link').click();
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
					
					$('#jzform').change();
				});

				// 「削除」菜??行的操作
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
					
					if (conf.jzformType == 'porxy_entry') {
						addOperationToLeftItem(conf.lang);
					}
					
					$('#jzform').change();
				});

				// 「上に移動」菜??行的操作
				$("#optionBoxMoveUpBtn").die().live("click", function(e) {
					var itemNow = $('#' + $('#optionBoxMoveUpBtn').attr('columnName'));
					var itemUp = itemNow.prev();
					if (itemUp.length == 0) {
						$('#optionBox').hide();
						return false;
					}
					
					itemNow.insertBefore(itemUp);
					resetDivToIframe(itemNow);
					resetImage(itemNow);
					resetImage(itemUp);
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
					
					$('#jzform').change();
				});

				// 「下に移動」菜??行的操作
				$("#optionBoxMoveDownBtn").die().live("click", function(e) {
					var itemNow = $('#' + $('#optionBoxMoveDownBtn').attr('columnName'));
					var itemDown = itemNow.next();
					if (itemDown.length == 0) {
						$('#optionBox').hide();
						return false;
					}
					itemDown.insertBefore(itemNow);
					resetDivToIframe(itemDown);
					resetImage(itemNow);
					resetImage(itemDown);
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
					
					$('#jzform').change();
				});
			}
		};

		function resizeJzFormArea(action) {
			var lastElement = $('#sortable2 [jzstatus="moved"]:last');

			if(lastElement.length > 0){
				/*
				var pos = lastElement.offset();
				if ($('#jzformarea').offset().top + $('#jzformarea').height() - (pos.top + lastElement.height()) < 30) {
					$('#jzformarea').css('height', $('#jzformarea').height() + lastElement.height() * 2);
				}
				*/
				$(".jz-form-no-item").addClass("is-hidden");
			}else{
				$(".jz-form-no-item").removeClass("is-hidden");
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
							// 初始化?示区域的内容
							$('#sortable2').empty();
							break;
						}
					}
				}
			}
			// for membershipidentifier and membershipshopname and businessdomain.
			else if (conf.jzformType == 'service_member_entry') {
				for ( var i = 0; i < fields.length; i++) {
					if (fields[i].used) {
						if (fields[i].used == 'YES') {
							// 初始化?示区域的内容
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
							// 初始化?示区域的内容
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
			// 初始?【ユーザマスタ項目】没有?目或者所有的?目都?到了右?, ?置【ユーザマスタ項目】的?示文字
			if (fields.length == 0 || count == fields.length) {
				$('#sortable1').html('<div class="input-none">' + conf.lang.itemContent + '</div>');
			}
			if (conf.jzformType == 'porxy_entry') {
				addOperationToLeftItem(conf.lang);
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
				// the type of emailaddress and password and membershipidentifier and membershipshopname and businessdomain.
				if (field.fieldType == "label") {
					$('#' + field.columnName).addClass("labelClass");
				}
				else {
					$('#' + field.columnName).addClass("normalClass");
				}
				setFieldMovedEnd(field);
			}
			//div to iframe
			resetDivToIframe($('#' + field.columnName));
			resetImage($('#' + field.columnName))
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
				//setWebeditorJs (webeditorId, field.fieldType);
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
			return `<table class="detail03 ${dragTableClass}">
					<tr id="${columnName}_tr" >
						<td id="${columnName}_td" align="left"><textarea id="${editorId}" class="is-hidden">${editorData}</textarea>
				    </td>
				</tr></table>
					    <iframe id="${editorId}-iframe" class="inside_image" frameborder="0" onload="clearLoading(this)" width="100%" height="100%"
					        src="${top.jzAppVars().domainUrl}/common/iframe-ckeditor-modal/init?iframeId=${editorId}-iframe&textAreaId=${editorId}&tenantUploadId=${top.jzAppVars().tenantUploadId}&v=${top.jzAppVars().v}">
					    </iframe>
				`;
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
					editor.removeAllListeners();
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
					var value= $("#" + imagePrefix + colName[1]).text();
					var htmlvalue = getImageHtml(columnName, "", imagePrefix + colName[1], value);
					$item.addClass("loading");
					$item.children("div").html(htmlvalue);
				}
				
				if($item.children(".inside_input").length <= 0){
					$item.append('<a class="inside_input btn-small" onclick="doEdit(this)"><m>編集</m></a><i class="inside_input icon-menu-list"></i>');
				}
			}
		}
		
		function resetDivToIframe($item){
			if ($item.attr("fieldType") == "image" || $item.attr("fieldType") == "paging") {
				return;
			}
			var head = `<link type="text/css" rel="stylesheet" href="${ top.jzAppVars().resourceServerUrl }/css/web/common/font-awesome.min.css">`;
			top.jzAppVars().webCssUrl.forEach(function(item){head = head + `<link type="text/css" rel="stylesheet" href="${item}">`});
			var style = `<style>html,body{overflow: hidden} table.field-detail-table{width: 100%;} .tx-required {background-color: #fff;display: inline-block; width: 28px !important;}</style>`;
			var content = "<head>" + head + style + "</head><body>" + $item.find(".drag-field-detail-table,.field-detail-table").prop('outerHTML') + "</body>";
			//$item.children("div").hide();
			if($item.find(".inside_input").length > 0){
				var $content =  $('body', $item.find("iframe.inside_input").contents());
				$item.find("iframe.inside_input").load(function(){
					$item.find("iframe.inside_input").css("visibility","visible");
				});
				var $newConent = $(content);
				$newConent.on('load',function(){
					$content.find("table").removeClass("drag-field-detail-table").addClass("field-detail-table");
					var height = $content.find(".field-detail-table").outerHeight();
					$item.find("iframe.inside_input").height(0);
					$item.find("iframe.inside_input").height(height);
				});
				$content.html($newConent);
				
			}else{
				$item.append('<i class="inside_input icon-menu-list"></i>');
				$item.children("div").append('<iframe class="inside_input" src="about:blank"></iframe>');
				$item.find("iframe.inside_input").ready(function() {
					var $content =  $('body', $item.find("iframe.inside_input").contents());
					$item.find("iframe.inside_input").load(function(){
						$item.find("iframe.inside_input").css("visibility","visible");
					});
					var $newConent = $(content);
					$newConent.on('load',function(){
						$content.find("table").removeClass("drag-field-detail-table").addClass("field-detail-table");
						var height = $content.find(".field-detail-table").outerHeight();
						var bgColor = $content.css("background");
						$item.find("iframe.inside_input").height(0);
						$item.find("iframe.inside_input").height(height);
						$("#jzformarea").css("background", bgColor);
					});
					$content.html($newConent);
				});
			}
		}
		
		// ?置?始??或停止?????区域的?式
		function setJZFormareaCSS(type) {
			// 停止???恢?到??区域的初始?式
			var jzBorder = "#F7F7F7", jz = "#CCCCCC";
			if (type == "start") {
				// ?始???改???区域的?式
				jzBorder = "#DEDEDE";
				jz = "#666666";
			}
			$('.jzformarea-border').css("border-color", jzBorder);
			$('#jzformarea').css("border-color", jz);
		}
		
		function toFullPage(){
			$(".jz-form-container").toggleClass("is-fullSize");
			$("#full-size-btn").children().toggleClass('is-hidden');
		  
			if ($('#panel').is(':visible')) {
				$('#panel').hide();
				$('body section').append('<div id="regist-form-full-screen"></div>');
				//$('#regist-form-full-screen').empty();
				$('#jzform').appendTo('#regist-form-full-screen');
				
				$("#jzform #sortable2 li").each(function() {
					resetDivToIframe($(this));
					resetImage($(this));
				});
			}
			else {
				$('#jzform').appendTo('#menu-content-in');
				$('#panel').show();
				//$('#regist-form-full-screen').empty();
				$('#regist-form-full-screen').remove();
				
				$("#jzform #sortable2 li").each(function() {
					resetDivToIframe($(this));
					resetImage($(this));
				});
				
			}
			
		}
		
		function hideMenu(){
			$("#optionBox").hide();
			$("#optionBox").removeClass("over");
		}
		
		// 鼠?点???区域内中?目上的操作???, ?示下拉列表
		function showMenu() {
			
			var selectFileldId = $(".icon-menu-list.moved-over").parent().attr("id"),
			    menuFieldid = $("#optionBox").attr("fieldid");
			
			if(selectFileldId == menuFieldid && $("#optionBox").is(":visible")){
				$("#optionBox").hide();
				$("#optionBox").removeClass("over");
				return;
			}
			else {
				var $icon = $(".icon-menu-list.moved-over"), $item = $icon.parent();
				var topPosition = ($icon.offset().top - $("#yscontainer-wrap").offset().top + 18) + "px", 
				leftPosition = ($icon.offset().left - $("#yscontainer-wrap").offset().left - 46) + "px";
				if ($item.attr('fieldType') == 'webeditor' || $item.attr('fieldType') == 'image') {
					//topPosition = $item.position().top + 15 + "px";
				}
				$("#optionBox").css({"left" : leftPosition, "top" : topPosition});
				$("#optionBox").show();
				$("#optionBox").addClass("over");
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
			//$('#itemContentMenu').addClass('over');
			//$("#itemMenuDetail").css({"margin-top": "18px"});
			//$("#itemMenuDetail").show();
		}

		
		// 点???区域内中?目?, ?示操作??
		function bindMouse() {
			$("#optionBox").hide();
			$(document).off('click', '#sortable2 li > .icon-menu-list');
			$(document).on('click', '#sortable2 li > .icon-menu-list', function(e) {
				var $item = $(this).parent();
				$('#sortable2 li > .icon-menu-list').removeClass('moved-over');
				$(this).addClass('moved-over');
				//$('#optionBox').show();
				
				// ?接下拉菜?
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
				$('#optionBox').removeClass('over');
				
				var fieldId = $item.attr('id');
				$('#jz-jzrequired-option').attr({'field': fieldId, 'checkedFlag': $item.attr('jzrequired')});
				$('#optionControlBtn').attr({'columnName': fieldId, 'optionControlFlag': $item.attr('jzOptionControl')});
				$('#optionBoxDeleteBtn').attr('columnName', fieldId);
				$('#optionBoxHiddenBtn').attr('columnName', fieldId);
				$('#optionBoxMoveUpBtn').attr('columnName', fieldId);
				$('#optionBoxMoveDownBtn').attr('columnName', fieldId);
				
				$('#optionBox').attr('fieldId', fieldId);
				
				showMenu();
			});
		}
		
		this.init(options);
		this.show(conf);
	};

	jzform.prototype = {
		conf : {}
	};

	$.fn.jzform = function(options) {
		return new jzform(options);
	};
})(jQuery);


function addOperationToLeftItem(lang) {
	$('#sortable1 li').each(function(e) {
		if($(this).find(".icon-menu-list").length == 0){
			var $menu = $('<i class="icon-menu-list"></i>');
			$(this).append($menu);
			$menu.click(function(){
				var topPosition = ($(this).position().top + 34) + "px", leftPosition = ($(this).position().left - 45) + "px";
				$("#itemOptionBox").css({"left" : leftPosition, "top" : topPosition});
				
				// ?接下拉菜?
				var thisLi = $(this).closest("li");
				var fieldnameValue = thisLi.attr('fieldname');		
				var result = fieldnameValue.replace(/&/g,"&amp;");
				result = result.replace(/</g,"&lt;");
				result = result.replace(/>/g,"&gt;");
				result = result.replace(/ /g,"&nbsp;");
				result = result.replace(/\'/g,"&#39;");
				result = result.replace(/\"/g,"&quot;");
				
				var itemDeleteMenu = '<li><a class="normal" onclick="editExtendField(\'' + thisLi.attr('columnname') + '\');"><span>' + lang.editMenu + '</span></a></li>'
				 					+ '<li><a class="normal" onclick="deleteExtendField(\'' + result + '\',  \'' + thisLi.attr('columnname') + '\',  \'' + thisLi.attr('formcount') + '\');"><span>' + lang.deleteMenu + '</a></li>';
				$('#itemOptionBox .item-contextmenu').html(itemDeleteMenu);
				//$('#itemContentMenu').removeClass('over');
				//$('#itemMenuDetail').hide();
				$('#itemOptionBox').attr("for", thisLi.attr('id'));
				$('#itemOptionBox').show();
				
			});

		}
	});
	
	$(document).bind("click", function(e) {
		var target = $(e.target); 
		
		if (target.closest('#itemOptionBox, #sortable1 li .icon-menu-list').length == 0) {
			$("#itemOptionBox").hide();
		}else if (target.closest('#sortable1 li .icon-menu-list').length > 0 
				&&  target.closest('#sortable1 li .icon-menu-list').attr("id") == $('#itemOptionBox').attr("for")){
			$("#itemOptionBox").hide();
		}
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

var iconMap = {
		'A1': 'fa fa-user',
		'A2': 'fa fa-user',
		'A3': 'fa fa-user',
		'A4': 'fa fa-user',
		'A5': 'fa fa-user',
		'A6': 'fa fa-user',
		'A7': 'fa fa-user',
		'A8': 'fa fa-user',
		'A9': 'fa fa-user',
		'A10': 'fa fa-user',
		'A11': 'fa fa-user',
		'A12': 'fa fa-user',
		'A16': 'fa fa-home',
		'A17': 'fa fa-home',
		'A18': 'fa fa-home',
		'A19': 'fa fa-home',
		'A20': 'fa fa-home',
		'A21': 'fa fa-home',
		'A22': 'fa fa-home',
		'A23': 'fa fa-home',
		'A24': 'fa fa-home',
		'A25': 'fa fa-home',
		'A26': 'fa fa-home',
		'A27': 'fa fa-male',
		'A28': 'fa fa-male',
		'A29': 'fa fa-building-o',
		'A30': 'fa fa-building-o',
		'A31': 'fa fa-building-o',
		'A32': 'fa fa-building-o',
		'A33': 'fa fa-building-o',
		'A34': 'fa fa-building-o',
		'A35': 'fa fa-building-o',
		'A36': 'fa fa-building-o',
		'A37': 'fa fa-building-o',
		'A38': 'fa fa-users',
		'A39': 'fa fa-jpy',
		'A40': 'fa fa-jpy',
		'A41': 'fa fa-phone',
		'A42': 'fa fa-phone',
		'A43': 'fa fa-mobile',
		'A44': 'fa fa-phone',
		'A45': 'fa fa-fax',
		'A46': 'fa fa-envelope-o',
		'A47': 'fa fa-envelope-o',
		'A48': 'fa fa-envelope-o',
		'A49': 'fa fa-building-o',
		'A50': 'fa fa-building-o',
		'A51': 'fa fa-building-o',
		'A52': 'fa fa-birthday-cake',
		'A53': 'fa fa-home',
		'A54': 'fa fa-home',
		'A55': 'fa fa-home',
		'A56': 'fa fa-home',
		'A57': 'fa fa-home',
		'A58': 'fa fa-user',
		'A59': 'fa fa-envelope-o',
		'BUSINESS': 'fa fa-building-o',
		'COMMENT': 'fa fa-list',
		'COMPANY_ADDRESS': 'fa fa-building-o',
		'ADDRESS': 'fa fa-home',
		'DELIVERY_DATE': 'fa fa-calendar',
		'DELIVERY_METHOD': 'fa fa-truck',
		'DISCRIPTION': 'fa fa-code',
		'END_DAY': 'fa fa-calendar',
		'END_HOUR': 'fa fa-calendar',
		'END_MINUTE': 'fa fa-calendar',
		'FOREIGN_ADDRESS': 'fa fa-home',
		'JAN_CODE': 'fa fa-barcode',
		'KEYWORDS': 'fa fa-code',
		'MAIL_ADDRESS': 'fa fa-envelope-o',
		'MODIFY_DATE': 'fa fa-refresh',
		'NAME_HIRAKANA': 'fa fa-user',
		'NAME_KAN_JI': 'fa fa-user',
		'NAME_KATAKANA': 'fa fa-user',
		'NAME_ALPHABET': 'fa fa-user',
		'PUBLIC_TYPE': 'fa fa-calendar',
		'PAYMENT_TYPE': 'fa fa-credit-card',
		'RETAIL_PRICE': 'fa fa-jpy',
		'SEO': 'fa fa-code',
		'SALE_PRICE': 'fa fa-jpy',
		'START_DAY': 'fa fa-calendar',
		'START_HOUR': 'fa fa-calendar',
		'START_MINUTE': 'fa fa-calendar',
		'STATUS': 'fa fa-user',
		'SUMMARY': 'fa fa-list'
		};


/**
 * 項目（フォーム定義にまだ使われていない）リストの初期化
 * 
 * @param field
 */
function setFieldInit(field, type) {
	var liHtml = '<li id="' + field.columnName + '" class="pull-dw-menu__contents">'
	+ '		<div class="ic-txt-box input-' + field.fieldType + '"> <div class="ic-txt-box_icon"><i class="' + (iconMap[field.columnName]　|| 'fa fa-file-o') 　+ '" aria-hidden="true"></i></div>'
	+ '		<div class="ic-txt-box_txt"><span>' + getShortFieldName(field.fieldName) + '</span></div></div>'
	if (type == "delete") {
		if (field.fieldType == "webeditor") {
/*			
			var editor = CKEDITOR.instances[field.columnName + '_' + field.fieldType];
			if (editor) {
				CKEDITOR.remove(editor);
			}
*/			
		}
		var showOrder = getShowOrder(field.showOrder);
		if (showOrder == "") {
			$('#sortable1').append(liHtml);
		}
		else {
			if (showOrder.indexOf("before") != -1) {
				showOrder = showOrder.substring(0, showOrder.length - 6);
				$('#sortable1 [showOrder="' + showOrder + '"]:first').before(liHtml);
			}
			else {
				$('#sortable1 [showOrder="' + showOrder + '"]:first').after(liHtml);
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
			$('#jzformarea').css('height', $('#jzformarea').height() + lastElement.height() * 2);
		}
	}
}

function toTile(){
    //$('.ic-txt-box').toggleClass("ic-txt-box-tile");
    $('.pull-dw-menu__slide-area').removeClass("type-list");
    $('.pull-dw-menu__slide-area').addClass("type-tile");
    $('#to-list-btn').removeClass("is-selected");
    $('#to-tile-btn').addClass("is-selected");
   
}

function toList(){
    //$('.ic-txt-box').toggleClass("ic-txt-box-tile");
	$('.pull-dw-menu__slide-area').removeClass("type-tile");
	$('.pull-dw-menu__slide-area').addClass("type-list");
	$('#to-list-btn').addClass("is-selected");
	$('#to-tile-btn').removeClass("is-selected");
   
}

function hover(targetHref){
	if($(targetHref).html() == ""){
		$(targetHref).remove();
	}
	
	if($(targetHref).closest(".jz-form-dialog").length > 0){
		$(targetHref).closest(".jz-form-dialog").show();
	}else{
		$(targetHref).dialog({
			width: 390,
	        minWidth: 390,
	        maxHeight: '75vh',
	        position: {my: "right top", at: "left top", of: "#jzform"},
	        open: function() {
	        	$("body > #jz-form-item").remove();
	        	$(this).closest(".ui-dialog").addClass("jz-form-dialog"); 
	        	$("#YSContainer").change(function(e){ if(e.target == $(this)[0]) $(".jz-form-dialog").remove();});
	        }
		});
	}
}

function clearLoading(iframe){
	setTimeout(function(){
		$(iframe).closest("li").removeClass("loading");
	},500);
	
}

function doEdit(button){
	var li = $(button).closest("li");
	li.find("iframe.inside_image")[0].contentWindow.$("body").click()
	
}
