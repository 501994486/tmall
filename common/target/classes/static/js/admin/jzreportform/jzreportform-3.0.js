/**
 * JZReportForm version 1.0
 * 
 */
(function($, undefined) {
	var event = $(event), conf, splitter='__', prevReportItem=[], mouseOverTitle='';
	var jzform = function(options) {
		this.init = function(options) {
			conf = this.conf = $.extend({
				lang : [],
				fields : [],
				optionControlURL : '',
				extendFieldDetailURL : '',
				ckeditorConfig: null,
				reportFormData: '',
				pageSize: 'A4#210#297',
				pagePadding: '10#10#10#10'
			}, options);
		};

		this.show = function() {
			formarea.show(this.conf.fields);
			resizeYsContainer();
		};

		var formarea = {
			show : function(fields) {
				mouseOverTitle= $(conf.lang.mouseOverTitle).text();
				$('#menu-content-in').html('');
				$('#jz-form-item').html('');
				var layout = `<div id="jzform" class="jz-form-report div-change-trigger">
								<div id="jz-form-area" class="jz-form-container">
									<a id="option-control-link" href="" class="is-hidden"></a>
									<div class="jz-form-header">
				   			    	<div class="jz-form-header_l">
				  			          <span id="page-conf-str">
				  			          <i class="fa fa-cog"></i>
				  			          <span id="page-size-label"></span><span id="page-size-label-detail"></span></span>
				   			          <span><div class="divider"></div></span>
				  			          <span><a class="" href="javascript:;" onclick="hover('#jz-form-item');"><i class="fa fa-th-large question-bubble-popup" ${conf.lang.hoverBtnTip}></i></a></span>
									  <span id="upload-pdf-file" class="btn-left" title="PDF帳表を導入"><i class="fa fa-upload question-bubble-popup" ${conf.lang.uploadBtnTip}></i></span>
									  <span id="remove-pdf-file" class="btn-left" title="PDF帳表を削除"><i class="fa fa-trash-o question-bubble-popup" ${conf.lang.trashBtnTip}></i></span>
				  			        </div>
						  
				   					<div class="jz-form-header_r">
				  			            <a id="full-size-btn" class="btn-alone">
				  			              <span><m>全画面表示</m></span>
				  			              ${conf.lang.btnTip}
				 			               <span class="is-hidden">通常表示</span>
							            </a>
							            <!-- <span id="jzform-preview-btn" class="btn-right" title="プレビュー"><i class="fa fa-search"></i></span> -->
							          </div>
						        	</div>
	
								<div id="jz-form-area-in" class="jz-form__bk-canvas">
									<div id="jzformarea-wrap">
										<div id="jzformarea" class="jz-form-canvas size-a4">
									    <div id="pds-ul" class="padding-area-lt"></div>
							            <div id="pds-ur" class="padding-area-rt"></div>
							            <div id="pds-dl" class="padding-area-lb"></div>
							            <div id="pds-dr" class="padding-area-rb"></div>
										
											
											<div id="noReportItemNotice" class="is-display-none">
												<i class="fa fa-arrow-circle-o-down" style="font-size: 70px;"></i>
												<br />
												<p><m>項目をドラッグしレイアウトしてください。</m></p>
											</div>
											
											<div id="control-buttons-left" class="control-buttons ui-draggable is-display-none"> 
												<ul>
													<li id="report-item-move-btn" class="for-arrowsr"><i class="fa fa-arrows"></i></li>
													<li id="report-item-remove-left-btn"><i class="fa fa-trash"></i></li>
												</ul>
											</div>
											<div id="control-buttons" class="control-buttons ui-draggable is-display-none">
												<ul>
													<li id="report-item-remove-btn"><i class="fa fa-trash"></i></li>
													<li id="report-item-edit-btn" class="for-cog"><i class="fa fa-cog"></i></li>
												</ul>
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
						</div>
						<input type="hidden" id="selected-item-id" name="selected-item-id">`;
				
				$('#menu-content-in').html(layout);
				$('#menu-content-in').append('<div id="optionBox" class="jzform-contextmenu">'
						+ '  <div id="itemContentMenu" class="is-hidden">' + conf.lang.menuTitle + '</div>'
						+ '  <ul id="itemMenuDetail" class="item-contextmenu"></ul>'
						+ '</div>');
				$('#selected-item-id').val("");
				
				/*
				var leftPanelHtml = '<div id="jz-form-item-in">'
								+ '		<div id="item-in-up">'
								+ '			<ul>'
								+ '				<li class="item-title"><i class="fa fa-caret-down"></i>' + conf.lang.fieldsTitle + '</li>'
								+ '				<div id="normal-report-item-wrap" class="report-item-wrap"></div>'
								+ '			</ul>'
								+ '		</div>'
								+ '		<div id="report-related-items-wrap" class="margin-t8 report-item-wrap">'
								+ '		</div>'
								+ '		<div class="margin-t8">'
								+ '			<ul>'
								+ '				<li class="item-title"><i class="fa fa-caret-down"></i>' + conf.lang.imageFieldTitle + '</li>'
								+ '				<div id="text-image-report-item-wrap" class="report-item-wrap"></div>'
								+ '			</ul>'
								+ '		</div>'
								+ '</div>';
				*/
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
						          <ul id="normal-report-item-wrap" class="report-item-wrap pull-dw-menu__child"></ul>
								</div>
							</li>
							
							<li class="pull-dw-menu__parents">
						        <div id="report-related-items-title" class="op-cl-area">
						          <span class="font-lead">${conf.lang.optionTitleHelp}</span>
						        </div>
						      	<div class="pull-dw-menu__slide-area">
						          <ul id="report-related-items-wrap" class="report-item-wrap pull-dw-menu__child"></ul>
								</div>
							</li>
							
							<li class="pull-dw-menu__parents">
						        <div class="op-cl-area">
						          <span class="font-lead">${conf.lang.imageFieldTitle}</span>
						        </div>
						      	<div class="pull-dw-menu__slide-area">
						          <ul id="text-image-report-item-wrap" class="report-item-wrap pull-dw-menu__child"></ul>
								</div>
							</li>
						</ul>`;
				$('#jz-form-item').html(leftPanelHtml);
				$('#jzformarea').append(conf.reportFormData);
				//$('#jzformarea').append('<div id="pds-ul" class="page-padding-symbol"></div><div id="pds-ur" class="page-padding-symbol"></div><div id="pds-dl" class="page-padding-symbol"></div><div id="pds-dr" class="page-padding-symbol"></div>');

				addPageSizeConfigDialog();
				addLineStyleConfigDialog();
				addQRCodeStyleConfigDialog();
				addReportItemNormalConfigDialog();
				$('#padt').val(10);
				$('#padb').val(10);
				$('#padl').val(10);
				$('#padr').val(10);
				resetPageSize(conf.pageSize, conf.pagePaddings);
				otherFunction();
				addReportItemNormal(fields);
				addReportItemSpecific(conf.lang.reportItems, conf.reportFormType);
				addReportItemTextImage('init', false);
				addReportBgImg();
				
				showNoReportItemNotice();
				
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
				
				
				function addReportItemTextImage(type, recoveryFlag) {
					var uniqueId = new Date().getTime(), textImageField;
					if (recoveryFlag) {
						textImageField = '<div id="jzFieldImage'+type+splitter+uniqueId+'" class="pull-dw-menu__contents input-image report-item" itemGroupType="textImage"><div class="ic-txt-box"><div class="ic-txt-box_icon"><i class="fa fa-file-image-o" aria-hidden="true"></i></div><div class="ic-txt-box_txt input-image">' + conf.lang["imageField"+type] + '</div></div></div>';
						if (prevReportItem.length == 1) {
							$(textImageField).insertAfter(prevReportItem);
						}
						else {
							$('#text-image-report-item-wrap').prepend($(textImageField));
						}
						addDraggableToReportItemTextImage($('#jzFieldImage'+type+splitter+uniqueId));
					}
					// init
					else {
						$('#text-image-report-item-wrap').append('<div id="jzFieldImageText'+splitter+uniqueId+'" class="pull-dw-menu__contents input-image report-item" itemGroupType="textImage"><div class="ic-txt-box"><div class="ic-txt-box_icon"><i class="fa fa-file-image-o" aria-hidden="true"></i></div><div class="ic-txt-box_txt input-image">' + conf.lang.imageFieldText + '</div></div></div>'
								+ '<li id="jzFieldImageLine'+splitter+uniqueId+'" class="pull-dw-menu__contents ic-txt-box input-image report-item" itemGroupType="textImage"><div class="ic-txt-box"><div class="ic-txt-box_icon"><i class="fa fa-file-image-o" aria-hidden="true"></i></div><div class="ic-txt-box_txt input-image">' + conf.lang.imageFieldLine + '</div></div></div>'
								+ '<li id="jzFieldImageRect'+splitter+uniqueId+'" class="pull-dw-menu__contents ic-txt-box input-image report-item" itemGroupType="textImage"><div class="ic-txt-box"><div class="ic-txt-box_icon"><i class="fa fa-file-image-o" aria-hidden="true"></i></div><div class="ic-txt-box_txt input-image">' + conf.lang.imageFieldRect + '</div></div></div>');
					}
				}

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
				
				// full screen button
				$("#full-size-btn").die().live("click", function(e) {
					toFullPage();
				});
				
				$('#upload-pdf-file').click(function() {
					$('#reportForm-upload-file-pdf').click();
				});
				
				$('#remove-pdf-file').click(function() {
					reportBgImgRemove();
				});
				
				$('#page-conf-str').click(function() {
					$('#pscd-link').YSModalDialog({dialogTitle:'帳票のサイズを設定します', afterOpen:'afterOpenPageSizeDialog'});
					$('#pscd-link').click();
				});
				
				// preview button
				$('#jzform-preview-btn').click(function() {
					preview();
				})
				.mouseover(function() {
					$(this).show();
					return false;
				});
				
				// initialize report items not used yet
				// normal items
				addDraggableToReportItems($("#normal-report-item-wrap .report-item"));
				// items for the specific report forms(account, ticket-image,
				// label-seal, fax-coversheet).
				addDraggableToReportItems($("#report-related-items-wrap .report-item"));
				// text-image items (ckeditor)
				addDraggableToReportItemTextImage($('#text-image-report-item-wrap .report-item'));
				
				// initialize report items used(moved) already
				$("#jzformarea .item-moved").each(function() {
					addMouseOverToItemMoved(this.id);
				});
				// normal items
				addDraggableToItemMoved($("#jzformarea .item-moved"));
				// text-image items
				$("#jzformarea .cke_editable").each(function(){
					addEditableToTextImageText($(this).attr('id'), conf.ckeditorConfig);	
				});
				// normal items
				$("#jzformarea .report-item").each(function(){
					if ($(this).attr('id')
						&& $(this).attr('id').indexOf('jzFieldImageText') == -1
						&& $(this).attr('id').indexOf('jzFieldImageLine') == -1
						&& $(this).attr('id').indexOf('jzFieldImageRect') == -1
						&& $(this).attr('id').indexOf('ticketQRCode') == -1) {
						addEditableToReportItem($(this).attr('id'), conf.ckeditorConfig);
					}
					$(this).removeClass("active");
				});
			
				$("#jzformarea div[id^='jzFieldImageLine']").resizable(
						{	autoHide: false, handles: 'e',
							containment: '#jzformarea',
							resize: function() {
								setAdjustPosition($(this),$(this).position().left,$(this).position().top);
								showControlButtons($(this));
								$('#jzform').change();
							}
						})
					.dblclick(function(){openLineStyleDialog($(this).attr('id'));})
					.bind('click',function(e){
						showControlButtons($(this));
						e.stopPropagation();
						});
				$("#jzformarea div[id^='jzFieldImageRect']").resizable({autoHide: false, containment: '#jzformarea', resize: function() {$('#jzform').change();}})
					.dblclick(function(){openLineStyleDialog($(this).attr('id'));})
					.bind('click',function(e){
						showControlButtons($(this));
						e.stopPropagation();
						});
				
				$("#jzformarea div[id^='ticketQRCode']")
					.dblclick(function(){openQrcodeStyleDialog($(this).attr('id'));})
					.bind('click',function(e){
						showControlButtons($(this));
						e.stopPropagation();
						});
				
				$('#report-item-edit-btn').click(function(){
					var reportItem = $('#'+$(this).attr('edit-report-id'));
					reportItem.trigger('dblclick');
				});
				
				$('#report-item-remove-btn').click(function(){
					var reportItem = $('#'+$(this).attr('remove-report-id'));
					reportItem.remove();
					if ($(this).attr('remove-report-id').indexOf('jzFieldImageText') != -1) {
						CKEDITOR.instances[$(this).attr('remove-report-id')].destroy();
					}
					hideControlButtons();
					hideControlBox();
					hideCkControlBox();
					showNoReportItemNotice();
				});
				
				$('#report-item-remove-left-btn').click(function(){
					$('#report-item-remove-btn').trigger('click');
				});
				
				$("#jzformarea").droppable({
					tolerance : 'fit',
					drop: function(event, ui) {
						if (ui.draggable.context.className.indexOf('item-moved') != -1
								|| ui.draggable.context.className.indexOf('ui-dialog') != -1
								|| ui.draggable.context.className.indexOf('control-buttons') != -1) {
							return;
						}

						prevReportItem = $('#'+ui.draggable.context.id).prev();

						var reportItem = ui.draggable.context.id.split(splitter)[0];
						
						if(reportItem == 'accountOrderDetails' || 
								reportItem == 'treasurerHistory' || 
									reportItem == 'orderDetailTreasureHis'){
							if($("#jzformarea .report-item .type01").size() || $("#jzformarea .report-item .type02").size() 
									|| $("#jzformarea .report-item .type03").size()){
								jzMsgBox('<m>既に付置済みのオブジェクトタイプです。</m>', 'alert');
								return;
							}
						}
						ui.draggable.context.innerHTML = getReportItemHtml(ui.draggable.context.id);
						$('#jzformarea').append(ui.draggable.context.outerHTML);

						if($("#jzformarea").find(".item-data").length > 0){
							$("#noReportItemNotice").hide()
						}else{
							$("#noReportItemNotice").show()
						}
						$('#'+ui.draggable.context.id).removeClass('pull-dw-menu__contents').addClass('item-moved').css({display: 'inline-block', position: 'absolute',
							left: event.pageX - $(this).offset().left, top: event.pageY - $(this).offset().top});
						ui.draggable.remove();

						var uniqueId = new Date().getTime(), fieldImageType='',currItemMoted=$('#'+ui.draggable.context.id);
						if (ui.draggable.context.id.indexOf('jzFieldImage') == 0) {
							// make text-image item editable
							if (ui.draggable.context.id.indexOf('Text') != -1) {
								addEditableToTextImageText(ui.draggable.context.id, conf.ckeditorConfig);
								CKEDITOR.instances[ui.draggable.context.id].setData("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
								//$("#"+ui.draggable.context.id).click();
							}
							else {
								if (ui.draggable.context.id.indexOf('Line') != -1) {
									addEditableToTextImageLine(currItemMoted);
								}
								else if(ui.draggable.context.id.indexOf('Rect') != -1) {
									addEditableToTextImageRect(currItemMoted);
								}
							}
							
						    // reset the text-image type item
							if (ui.draggable.context.id.indexOf('Text') != -1) {
								fieldImageType = 'Text';
							}
							else if (ui.draggable.context.id.indexOf('Line') != -1) {
								fieldImageType = 'Line';
								currItemMoted.css({width: currItemMoted.width(), height: currItemMoted.height()});
							}
							else if (ui.draggable.context.id.indexOf('Rect') != -1) {
								fieldImageType = 'Rect';
								currItemMoted.css({width: currItemMoted.width(), height: currItemMoted.height()});
							}
							addReportItemTextImage(fieldImageType, true);
						}else if (ui.draggable.context.id.indexOf('ticketQRCode') == 0) {
							// make text-image item editable
							addEditableToQRCode(currItemMoted);
							
							//fieldImageType = 'Rect';
							currItemMoted.css({width: currItemMoted.width(), height: currItemMoted.height()});
							
							//addReportItemTextImage(fieldImageType, true);	
						}else{
							// normal items
							var selectedItemId = ui.draggable.context.id;
							if(selectedItemId.indexOf('accountOrderDetails') > -1
										|| selectedItemId.indexOf('treasurerHistory') > -1
										|| selectedItemId.indexOf('orderDetailTreasureHis') > -1){
								$('#'+ui.draggable.context.id).css({'font-size': '10px'});
								$('#'+ui.draggable.context.id).css('width', $('#jzformarea').width())
								$('#'+ui.draggable.context.id).css('left' , $('#pds-dl').width());
							}
							
							addEditableToReportItem(ui.draggable.context.id, conf.ckeditorConfig);
						}
						otherFunction();
						addDraggableToItemMoved(currItemMoted);
						addMouseOverToItemMoved(ui.draggable.context.id);						
						adjustPosition($('#'+ui.draggable.context.id));

						// recovery normal & specific items
						if (ui.draggable.context.id.indexOf('jzFieldImage') == -1) {
							if ($('#'+ui.draggable.context.id).attr('itemGroupType') == 'specific') {
								addOneReportItemSpecific({title: currItemMoted.attr("title"), columnName:currItemMoted.attr("columnName"), fieldType:currItemMoted.attr("fieldType")}, uniqueId, true);
							}
							else {
								addOneReportItemNormal({title: currItemMoted.attr("title"), columnName:currItemMoted.attr("columnName"), fieldType:currItemMoted.attr("fieldType")}, uniqueId, true);
							}
							addDraggableToReportItems($('#'+ui.draggable.context.id.split(splitter)[0]+splitter+uniqueId));
						}
						
						if (ui.draggable.context.id.indexOf('jzFieldImage') != -1) {
							currItemMoted.attr('title', mouseOverTitle);
						}
						
						showNoReportItemNotice();
						showControlButtons($('#'+ui.draggable.context.id));
						$('#jzform').change();
					}
				})
				.mouseleave(function() {
					// $('#report-item-remove-btn').hide();
					//hideControlButtons();
				});

				/*
				$('#jzform').click(function(){
					// $('#remove-ckeditor-focus-input').focus();
					// $('#report-item-remove-btn').hide();
					hideControlButtons();
					hideControlBox();
					hideCkControlBox();
				});
				*/
			    
				$(document).click(function(e){
					if ($(e.target).parents('.cke_toolbar')[0]){
						return;
					}
					hideControlButtons();
					hideControlBox();
					hideCkControlBox();
				});
				
				function addReportItemNormal(fields) {
					var uniqueId = new Date().getTime();
					$('#normal-report-item-wrap').append(`<li id="mailAddress${splitter+uniqueId}" class="pull-dw-menu__contents input-text report-item" title="メールアドレス" columnName="mailAddress" fieldType="text" itemGroupType="normal">
							<div class="ic-txt-box">
								<div class="ic-txt-box_icon"><i class="fa fa-envelope-o" aria-hidden="true"></i></div>
								<div class="ic-txt-box_txt input-text"><span>メールアドレス</span></div>
							</div>
						</li>`);
					/*
					$('#normal-report-item-wrap').append('<div class="report-item" id="mailAddress'+splitter+uniqueId+'" title="メールアドレス" columnName="mailAddress" fieldType="text" itemGroupType="normal">'
							+ '		<div class="input-text">メールアドレス </div>'
							+ '	  </div>');
					*/
					
					for (var i = 0; i < fields.length; i++) {
						addOneReportItemNormal(fields[i], uniqueId, false);
					}
				}

				function addOneReportItemNormal(field, uniqueId, recoveryFlag) {
					var iconClass = (iconMap[field.columnName]　|| 'fa fa-file-o');
					var reportItem = `<li id="${field.columnName+splitter+uniqueId}" class="pull-dw-menu__contents input-text report-item" title="${htmlEncode(field.title || "")}" columnName="${field.columnName}" fieldType="${field.fieldType}" itemGroupType="normal">
							<div class="ic-txt-box">
								<div class="ic-txt-box_icon"><i class="${iconClass}" aria-hidden="true"></i></div>
								<div class="ic-txt-box_txt"><span>${htmlEncode(field.title || "")}</span></div>
							</div>
						</li>`;
					
					/*
					var reportItem = '<div class="report-item" id="' + field.columnName+splitter+uniqueId+'" title="'+htmlEncode(field.title)+'" columnName="'+field.columnName+'" fieldType="'+field.fieldType+'" itemGroupType="normal">'
									+ '		<div class="input-' + field.fieldType + '">' + htmlEncode(field.title) + '</div>'
									+ '	  </div>';
					*/
					if (recoveryFlag) {
						if (prevReportItem.length == 1) {
							$(reportItem).insertAfter(prevReportItem);
						}
						else {
							$('#normal-report-item-wrap').prepend($(reportItem));
						}
					}
					else {
						$('#normal-report-item-wrap').append(reportItem);
					}
				}
				
				function addReportItemSpecific(reportItems, reportFormType) {
					$('#report-related-items-title').children('span').prepend(reportItems[reportFormType].title);
					//$('#report-related-items-wrap').html('<div id="specific-report-item-wrap"></div>');
					if (reportItems[reportFormType].subItems) {
						var uniqueId = new Date().getTime();
						for(var reportItemId in reportItems[reportFormType].subItems) {
							addOneReportItemSpecific({title: removeMtag(reportItems[reportFormType].subItems[reportItemId].title), columnName:reportItemId, fieldType: reportItems[reportFormType].subItems[reportItemId].fieldType}, uniqueId, false);
						}
					}
				}

				function addOneReportItemSpecific(field, uniqueId, recoveryFlag) {
					/*
					var reportItem = '<div class="report-item" id="' + field.columnName+splitter+uniqueId+'" title="'+field.title+'" columnName="'+field.columnName+'" fieldType="'+field.fieldType+'" itemGroupType="specific">'
									+ '		<div class="input-' + field.fieldType + '">' + field.title + '</div>'
									+ '	  </div>';
					*/
					var iconClass = (iconMap[field.columnName]　|| 'fa fa-file-o');
					var reportItem = `<li id="${field.columnName+splitter+uniqueId}" class="pull-dw-menu__contents input-${field.fieldType} report-item" title="${htmlEncode(field.title)}" columnName="${field.columnName}" fieldType="${field.fieldType}" itemGroupType="specific">
											<div class="ic-txt-box">
												<div class="ic-txt-box_icon"><i class="${iconClass}" aria-hidden="true"></i></div>
												<div class="ic-txt-box_txt"><span>${htmlEncode(field.title)}</span></div>
											</div>
									  </li>`;
					if (recoveryFlag) {
						if (prevReportItem.length == 1) {
							$(reportItem).insertAfter(prevReportItem);
						}
						else {
							$('#report-related-items-wrap').prepend($(reportItem));
						}
					}
					else {
						$('#report-related-items-wrap').append(reportItem);
					}
				}

				function addPageSizeConfigDialog() {
					if ($('#page-size-config-dialog').length == 0) {
						$('body').append('<a id="pscd-link" href="#page-size-config-dialog" class="is-hidden link-trigger-excepted"></a>'
								+'<div id="page-size-config-dialog" class="tx-center ysdialog"><div class="ysdialog-contents min-w-700">'
								+'<ul class="detail-form"><li class="detail-form__row"><div class="detail-form__row__title-cell"><m>サイズ</m></div>'
								+'<div class="detail-form__row__content-cell"><div class="jzSelectWrap">'
								+'<select id="page-size" name="page-size">'
								+'<option value="レターサイズ#216#279">レターサイズ　216×279mm</option>'
								+'<option value="A4#210#297">A4　210 × 297 mm</option>'
								+'<option value="UC">ユーザ定義</option></select></div>'
								+'<div id="pagesize-custom-box" style="display:none;" class="mng-config-area"><div><span>幅<input type="text" id="uc-width" name="uc-width" size="3" maxlength="3" class="number auto-resize">mm</span><span>高さ<input type="text" id="uc-height" name="uc-height" size="3" maxlength="3" class="number auto-resize">mm</span></div>'
								+'</div></li>'
								+'<li class="detail-form__row"><div class="detail-form__row__title-cell"><m>余白</m></div>'
								+'<div class="detail-form__row__content-cell mng-config-area"><div><span>上<input type="text" size="3" id="padt" maxlength="2" value="10"  class="number auto-resize">mm</span><span>下<input type="text" size="3" id="padb" maxlength="2" value="10" class="number auto-resize">mm</span></div>'
								+'<div><span>左<input type="text" size="3" id="padl" maxlength="2" value="10" class="number auto-resize">mm</span><span>右<input type="text" size="3" id="padr" maxlength="2" value="10" class="number auto-resize">mm</span></div></div></li>'
								+'</ul></div>'
								+'<div class="ctrl-area"><div class="ctrl-area__main"><a class="ctrl-area__main__btn ysdialog-close"><span><m>キャンセル</m></span></a>'
								+'<a id="set-page-size-btn" class="ctrl-area__main__btn save-btn ysdialog-close"><span><m>OK</m></span></a>'
								+'</div></div>'
								+'</div>');
						//$('#pscd-link').YSDialog({dialogTitle:'帳票フォームサイズ設定'});
						
						$('#page-size').change(function() {
							if (this.value.indexOf('UC') == 0) {
								$('#pagesize-custom-box').show();
							}
							else {
								$('#pagesize-custom-box').hide();
							}
						});
						
						$('#page-size-config-dialog input').keydown(function(e) {
							var key = e.charCode || e.keyCode || 0;
				            return (key == 8 || key == 9 || key == 13 || key == 46 || key == 110 || key == 190 ||
				                (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
						});
					
						$('#set-page-size-btn').click(function() {
							resetPageSize();
							$('#jzform').change();
						});
					}
				}
				
				function addLineStyleConfigDialog() {
					if ($('#line-style-config-dialog').length == 0) {
						$('#jzformarea').append('<a id="lscd-link" href="#line-style-config-dialog" style="display:none;"></a>'
								+'<div id="line-style-config-dialog" class="control-box">'
								+'<table>'
								+'<tr><td><m>線の属性</m></td><td style="text-align: right;" onclick="hideControlBox();"><i class="fa fa-close"></i></td></tr>'
								+'<tr><td colspan="2">'
								+'<select id="line-style" name="line-style" style="width:170px" onchange="previewLine()">'
								+'<option value="solid">実線</option>'
								+'<option value="dotted">点線</option>'
								+'<option value="dashed">破線</option>'
								+'<option value="double">二重線</option>'
								+'</select></td></tr>'
								+'<tr><td>'
								+'<input type="number" step=0.25 min=1 max=5 id="line-weight" name="line-weight" value="2.00" style="text-align:left; width: 4em; padding-left: 5px;" />pt'
								+'</td>'
								+'<td style="text-align: right;">'
								+'<input type="color" id="line-color" name="line-color" style="text-align:left;width: 80px;"/>'
								+'</td></tr>'
								+'<tr style="display: none;"><td style="text-align:center;">プレビュー</td><td><hr id="preview-hr" style="width: 60px;"/></td></tr>'
								+'</table>'
								// +''<div class="btn btn-no-border">'
								// +'<ul><li><a href="javascript:"
								// id="set-line-style-btn" class="ysdialog-close
								// recommend"><m>設定</m></a></li>'
								// +'<li><a href="javascript:"
								// class="ysdialog-close"><m>キャンセル</m></a></li></ul>'
								// +'</div>
								+'</div>');								;
						$('#lscd-link').YSDialog({dialogTitle:'ライン属性設定', afterOpen:'afterOpenLineDialog'});
						
						$("#line-color").spectrum({
							preferredFormat: "hex",
						    showInput: true,
						    showButtons: false,
						    showInitial: true,
						    change: function() {
						    	previewLine();
						    }
						});

						$('#set-line-style-btn').click(function() {
							var selectedItemId = $('#selected-item-id').val(), lineStyle = $('#line-weight').val() + 'pt ' + $('#line-style').val() + ' ' + $('#line-color').val();
							if (selectedItemId && selectedItemId.indexOf('Line') != -1) {
								$('#'+selectedItemId + ' hr').css('border-bottom', lineStyle);	
							}
							else {
								$('#'+selectedItemId).css('border', lineStyle);
							}
						});
					}
				}

				function addReportItemNormalConfigDialog() {
					if ($('#item-style-config-dialog').length == 0) {
						$('#jzformarea').append('<a id="incd-link" href="#item-style-config-dialog" style="display:none;"></a>'
								+'<div id="item-style-config-dialog" class="control-box">'
								+'<table>'
								+'<tr><td><m>文字の属性</m></td><td style="text-align: right;" onclick="hideControlBox();"><i class="fa fa-close"></i></td></tr>'
								+'<tr><td colspan="2">'
								+'<select id="item-font-family" name="item-font-family" style="width:170px;" onchange="previewItemStyle()">'
								+'<option value="ｍｓ ゴシック, IPAゴシック">ＭＳ ゴシック</option>'
								+'<option value="ｍｓ ｐゴシック, IPA Pゴシック">ＭＳ Ｐゴシック</option>'
								+'<option value="ｍｓ 明朝", IPA明朝>ＭＳ 明朝</option>'
								+'<option value="ｍｓ ｐ明朝", IPA P明朝>ＭＳ Ｐ明朝</option>'
								+'</select></td></tr>'
								+'<tr><td>'
								+'<input type="number" min="8" max="30" id="item-font-size" name="item-font-size" value="8" style="width: 50px;" />px'
								+'</td>'
								+'<td style="text-align: right;">'
								+'<input type="color" id="item-font-color" name="item-font-color" style="text-align:left;width: 80px"/>'
								+'</td></tr>'
								+'<tr id="item-style-config-dialog-detail-size"><td style="text-align: left;">詳細行数</td>'
								+'<td style="text-align: right;">'
								+'<input type="number" min="1" max="20" id="item-detail-size" name="item-font-size" value="8" style="text-align:left;width: 80px;" onchange="previewItemStyle()"/>'
								+'</td></tr>'
								
								+'<tr style="display: none;"><td style="padding-left: 10px; text-align:center;">プレビュー</td><td><hr id="preview-item"" style="width: 60px;"/></td></tr>'
								+'</table>'
								
								+'<div style="display: none;">'
								+'<ul><li><a href="javascript:" id="set-item-normal-btn" class="ysdialog-close recommend"><m>設定</m></a></li>'
								+'<li><a href="javascript:" class="ysdialog-close"><m>キャンセル</m></a></li></ul></div>'
								
								+'</div>');
						$('#incd-link').YSDialog({dialogTitle:'属性設定', afterOpen:'afterOpenItemStyleDialog'});
						
						$("#item-font-color").spectrum({
							preferredFormat: "hex",
						    showInput: true,
						    showButtons: false,
						    showInitial: true,
						    change: function() {
						    	previewItemStyle();
						    }
						});

					}
				}
				
				function addQRCodeStyleConfigDialog() {
					if ($('#qrcode-style-config-dialog').length == 0) {
						$('#jzformarea').append('<a id="qscd-link" href="#qrcode-style-config-dialog" style="display:none;"></a>'
								+'<div id="qrcode-style-config-dialog" class="control-box">'
								+'<table>'
								+'<tr><td><m>QRコードの属性</m></td><td style="text-align: right;" onclick="hideControlBox();"><i class="fa fa-close"></i></td></tr>'
								
								+'<tr><td colspan="2" style="text-align: right;">'
								+'サイズ <input type="text" id="qrcode-size" name="qrcode-size" value="100px" style="text-align:left;width: 75px;padding-left: 5px;" />'
								+'</td></tr>'
								+'<tr><td colspan="2" style="text-align: right;">'
								+'余白 <input type="text" id="qrcode-margin" name="qrcode-margin" value="10px" style="text-align:left;width: 75px;padding-left: 5px;" />'
								+'</td></tr>'

								
								+'<tr style="display: none;"><td style="text-align:center;">プレビュー</td><td><hr id="preview-qrcode" style="width: 60px;"/></td></tr>'
								+'</table>'

								+'</div>');								;
						$('#qscd-link').YSDialog({dialogTitle:'QRコードの属性', afterOpen:'afterOpenQrcodeDialog'});
						
						$('#set-qrcode-style-btn').click(function() {
							var selectedItemId = $('#selected-item-id').val(), qrSize = $('#qrcode-size').val(), divSize = qrSize + ( $('#qrcode-margin').val() * 2);
							
							$('#'+selectedItemId).css({"width": divSize, "height": divSize});
							$('#'+selectedItemId).find('.image-qrcode').css({"width": qrSize, "height": qrSize});
							
						});
					}
				}
				
				function addEditableToTextImageText(itemId, ckeditorConfig) {
					$('#'+itemId).attr('contenteditable', 'true').removeClass('input-image').addClass('report-item-box').addClass('item-editable');
					CKEDITOR.disableAutoInline = true;
				    var editor = CKEDITOR.inline(itemId, ckeditorConfig);
				    editor.on('loaded', function(evt) {
				    	this.title = mouseOverTitle;
				    });
   
				    CKEDITOR.instances[itemId].on('focus', function(){
				    	hideControlBox();
				    	$('#jzform').change();
				    });
				    
				    CKEDITOR.instances[itemId].on('blur', function(){
				    	$('#'+itemId).draggable('enable');
				    });
				    
				    $("#"+itemId).bind('click',function(e){
						$(this).draggable('disable');
				    	showControlButtons($(this));
				    	e.stopPropagation();
				    });
				    
				    $("#"+itemId).dblclick(function(){
						$(this).draggable('disable');
				    	$(this).focus();
				    	
						setTimeout(function(){
							$("#"+itemId).removeClass('ui-state-disabled');
						}, 100);
					});
				}
				
				function addEditableToTextImageLine(currItemMoted) {
					//currItemMoted.addClass('image-line');
					currItemMoted.addClass('image-line-div');
					currItemMoted.append('<hr class="image-line report-item">');
					currItemMoted.resizable({
						autoHide: false,
						handles: 'e, w',
						containment: '#jzformarea',
						resize: function() {
							setAdjustPosition($(this),$(this).position().left,$(this).position().top);
							showControlButtons($(this));
						}
					});
					currItemMoted.bind('click',function(e){
						showControlButtons($(this));
						e.stopPropagation();
					});
					currItemMoted.dblclick(function() {
						openLineStyleDialog($(this).attr('id'));
					});
				}
				
				function addEditableToTextImageRect(currItemMoted) {
					currItemMoted.addClass('image-rect');
					currItemMoted.resizable({
						autoHide: true,
						containment: '#jzformarea'
					});
					currItemMoted.click(function() {
						showControlButtons($(this))
						return false;
					});
					currItemMoted.dblclick(function() {
						openLineStyleDialog($(this).attr('id'));
					});
				}
				
				function addEditableToQRCode(currItemMoted) {
					//currItemMoted.find('.report-item-box').remove();
					currItemMoted.addClass('image-qrcode-div').css('background','#ffffff');
					/*
					currItemMoted.resizable({
						autoHide: true,
						handles: 'se',
						containment: '#jzformarea',
						helper: function() {
							var minWh =  Math.min($(this).outerWidth(), $(this).outerHeight());
							return $(this).css({'width': minWh , 'height': minWh});
						}
					});
					*/
					currItemMoted.click(function() {
						showControlButtons($(this))
						return false;
					});
					currItemMoted.dblclick(function() {
						openQrcodeStyleDialog($(this).attr('id'));
					});
				}
				
				function addEditableToReportItem(itemId, ckeditorConfig) {
					
					
					$('#'+itemId).click(function() {
						// var controlBottons = $('#control-buttons');
						showControlButtons($(this))
						return false;
					});
					
					$('#'+itemId).dblclick(function() {
						openItemStyleDialog($(this).attr('id'));
					});
				}
				
				function addDraggableToReportItems(obj) {
					obj.draggable({
						//containment: '#edit-report-form',
						//cursor: "move",
						revert: "invalid",
						cursorAt: {top: 15, left: 20},
						zIndex: 1002,
						helper: function() {
							return  $($(this).prop("outerHTML"));
							//return $($(this).clone()).find('div').css('background-color', '#f6f6f6').css('padding-left', '40px').css('background-position', '5px');
						},
						stop: function(){
							$('#jzform').change();
						}
					});
				}
				
				function addDraggableToReportItemTextImage(obj) {
					obj.draggable({
						//containment: '#edit-report-form',
						//containment: 'document',
						//cursor: "move",
						revert: "invalid",
						cursorAt: {top: 15, left: 20},
						containment: "document",
						helper: function() {
							return  $($(this).prop("outerHTML"));
							//return $($(this).clone()).find('div').css('background-color', '#f6f6f6').css('padding-left', '40px').css('background-position', '5px');
						},
						stop: function(){
							$('#jzform').change();
						}
					});	
				}
				
				function addDraggableToItemMoved(obj) {
					obj.draggable({
						containment: '#jzformarea',
						revert: "invalid",							
						drag: function() {
							// $('#report-item-remove-btn').hide();
							if(isLockByControlBox()){
								return false;
							}
							hideControlButtons();
							hideCkControlBox();
							hideControlBox();
						},
						stop: function() {
							// $('#report-item-remove-btn').hide();
							showControlButtons($(this));
							$('#jzform').change();
						}
					});
				}

				function addMouseOverToItemMoved(itemId) {
					$('#'+itemId).on("drop",function(){
						showControlButtons($('#'+itemId));
						$('#jzform').change();
					});
					
					$('#'+itemId).mouseover(function(){
						return true;
					});					
				}
			}
		};

		function getReportItemHtml(reportItem) {
			var reportItemHtml, isTextarea=false, cols=76, rows=6, initVal=$('#'+reportItem).text().trim();
			reportItem = reportItem.split(splitter)[0];
			// group items
			if (reportItem == 'ADDRESS') {
				reportItemHtml = '<span id="ASymbol_2" class="item-data"></span><span id="A16" class="item-data"></span><span id="ASymbol_1" class="item-data"></span><span id="A17" class="item-data"></span>'
					+ '<span id="A18" class="item-data">住所</span>'
					+ '<span id="A19" class="item-data"></span>'
					+ '<span id="A20" class="item-data"></span>';
			}			
			else if (reportItem == 'BIRTH_DAY_SPLIT') {
				reportItemHtml = '<span id="A15" class="item-data"></span>年'
								+ '<span id="A14" class="item-data"></span>月'
								+ '<span id="A13" class="item-data"></span>日';
			}
			else if (reportItem == 'BUSINESS') {
				reportItemHtml = '<span id="A33" class="item-data">業種</span>'
								+ '<span id="A34" class="item-data">大分類</span>'
								+ '<span id="A35" class="item-data">中分類</span>'
								+ '<span id="A36" class="item-data">小分類</span>';
			}
			else if (reportItem == 'COMPANY_ADDRESS') {
				reportItemHtml = '<span id="A53" class="item-data">勤務先の住所</span><span id="A54" class="item-data"></span>'
					+ '<span id="A55" class="item-data"></span>'
					+ '<span id="A56" class="item-data"></span>'
					+ '<span id="A57" class="item-data"></span>';
			}
			else if (reportItem == 'FOREIGN_ADDRESS') {
				reportItemHtml = '<span id="A21" class="item-data">海外の住所</span>'
								+ '<span id="A22" class="item-data"></span>'			
								+ '<span id="A23" class="item-data"></span>'								
								+ '<span id="A24" class="item-data"></span>'
								+ '<span id="A26" class="item-data"></span>'								
								+ '<span id="A25" class="item-data"></span>';
			}
			else if (reportItem == 'NAME_ALPHABET') {
				reportItemHtml = '<span id="A11" class="item-data">（名前）</span>'
								+ '<span id="A12" class="item-data">アルファベット</span>';
			}
			else if (reportItem == 'NAME_HIRAKANA') {
				reportItemHtml = '<span id="A7" class="item-data">（名前）</span>'
								+ '<span id="A8" class="item-data">ひらがな</span>';
			}
			else if (reportItem == 'NAME_KAN_JI') {
				reportItemHtml = '<span id="A5" class="item-data">（名前）</span>'
								+ '<span id="A6" class="item-data">漢字</span>';
			}
			else if (reportItem == 'NAME_KATAKANA') {
				reportItemHtml = '<span id="A9" class="item-data">（名前）</span>'
								+ '<span id="A10" class="item-data">カタカナ</span>';
			}
			else if (reportItem == 'PROFESSION') {
				reportItemHtml = '<span id="A49" class="item-data">職業（大分類）</span>'
								+ '<span id="A50" class="item-data">職業（中分類）</span>'
								+ '<span id="A51" class="item-data">職業（小分類）</span>';
			}
			
			// account items
			else if(reportItem == 'accountEntryDate') {
			}
			else if(reportItem == 'accountAmount') {
			}
			else if(reportItem == 'accountOrderDetails') {
				// 注文明細
				reportItemHtml = ''
					+ '<style>'
					+ 'table.type01 {'
					+ ' width: 100%;'
					+ '	border-collapse: collapse;'
					+ '	line-height: 1.5;'
					+ ' border-spacing: 2px;'
					+ '}'
					+ 'table.type01 thead th {'
					+ '	padding: 10px;'
					+ '	font-weight: bold;'
					+ '	vertical-align: top;'
					+ '	color: #369;'
					+ '	border-bottom: 3px solid #036;'
					+ '}'
					+ 'table.type01 tbody th {'
					+ '	padding: 10px;'
					+ '	font-weight: bold;'
					+ '	vertical-align: top;'
					+ '	border-bottom: 1px solid #ccc;'
					+ ' background-color: #666666;'
					+ ' color: #ffffff;'
					+ '}'
					+ 'table.type01 td {'
					+ '	padding: 10px;'
					+ '	vertical-align: top;'
					+ '	border-bottom: 1px solid #ccc;'
					+ '}'
					+ 'table.type01 .string{'
					+ '	text-align: left;'
					+ '}'
					+ 'table.type01 .int{'
					+ '	text-align: right;'
					+ '}'
					+ '.sum-detail td:first-of-type{'
					+ '   border-style: none;'
					+ '}'
					+ '</style>'
					+ '<table class="type01" id="orderDetail">'
					+ '<tr class="header"><th id="nameitem" class="string" style="width: 60%;">アイテム</th><th id="nameunitprice" class="int" style="width: 15%;">単価</th><th id="namenumber" class="int" style="width: 10%;">数量</th><th id="namemoney" class="int" style="width: 15%;">金額（<span id="amountTaxType">税別</span>）</th></tr>'
					+ '<tr class="detail"><td class="string"><span id="item" class="item-data">A12345678 サンプル商品</span></td><td class="int"><span id="unitprice" class="item-data">￥1,000</span></td><td class="int"><span id="number" class="item-data">1</span></td><td class="int"><span id="money" sclass="item-data">￥1,000</span></td></tr>'
					+ '<tr class="detail"><td class="string"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td></tr>'
					+ '<tr class="detail"><td class="string"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td></tr>'					
					+ '<tr class="sum-detail"><td class="string"></td><td class="string" colspan="2">商品代金合計<span id="subtotalTaxType">(税抜)</span></td><td class="int"><span id="subtotal" class="item-data">￥1,000</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><td class="string" colspan="2">送料</td><td class="int"><span id="shoppingCharge" class="item-data">￥100</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><td class="string" colspan="2">消費税(<span id="paymentTaxType">外税</span>)</td><td class="int"><span id="orderTax" class="item-data">￥80</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><td class="string" colspan="2">ポイント利用金額</td><td class="int"><span id="pointDiscountAmount" class="item-data" style="color:red;">￥-60</span></td></tr>'
					+ '<tr id="adjustAmountShow" class="sum-detail"><td class="string"></td><td class="string" colspan="2">調整額</td><td class="int"><span id="adjustAmount" class="item-data">￥-10</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><th class="string" colspan="2" style="border-style: none;">合計</th><td class="int" style="border-style: none;"><span id="total" class="item-data">￥1,110</span></td></tr>'
					+ '</table>'
					;
			}
			else if(reportItem == 'orderDeliveryAddress') {
				/*reportItemHtml = '〒<span id="orderDeliveryZipCode" class="item-data">123-4567</span>'
					+ '<br /><br /><span id="orderDeliveryPrefectureCode" class="item-data">東京都</span>'
					+ '<span id="orderDeliveryAddressCity" class="item-data">××区○○町1丁目</span>'
					+ '<br /><span id="orderDeliveryAddressBuilding" class="item-data">223-4</span>';*/
				reportItemHtml = '<span id="ASymbol_2" class="item-data"></span><span id="A16" class="item-data"></span><span id="ASymbol_1" class="item-data"></span><span id="A17" class="item-data"></span>'
					+ '<span id="A18" class="item-data">配送先住所</span>'
					+ '<span id="A19" class="item-data"></span>'
					+ '<span id="A20" class="item-data"></span>';
			}
			else if(reportItem == 'treasurerHistory') {
				// 会計履歴
				reportItemHtml = ''
					+ '<style>'
					+ 'table.type02 {'
					+ ' width: 100%;'
					+ '	border-collapse: collapse;'
					+ '	line-height: 1.5;'
					+ ' border-spacing: 2px;'
					+ '}'
					+ 'table.type02 thead th {'
					+ '	padding: 10px;'
					+ '	font-weight: bold;'
					+ '	vertical-align: top;'
					+ '	color: #369;'
					+ '	border-bottom: 3px solid #036;'
					+ '}'
					+ 'table.type02 tbody th {'
					+ '	padding: 10px;'
					+ '	font-weight: bold;'
					+ '	vertical-align: top;'
					+ '	border-bottom: 1px solid #ccc;'
					+ ' background-color: #666666;'
					+ ' color: #ffffff;'
					+ '}'
					+ 'table.type02 td {'
					+ '	padding: 10px;'
					+ '	vertical-align: top;'
					+ '	border-bottom: 1px solid #ccc;'
					+ '}'
					+ 'table.type02 .string{'
					+ '	text-align: left;'
					+ '}'
					+ 'table.type02 .int{'
					+ '	text-align: right;'
					+ '}'
					+ 'table.type02 .sum-detail td{'
					+ ' border-style: none;'
					+ '}'
					+ 'table.type02 .detail td {'
					+ '	padding: 10px;'
					+ '	vertical-align: top;'
					+ '	border-bottom: 1px solid #ccc;'
					+ '}'
					+ '.balance {'
					+ 'background: #696969;'
					+ 'width: 125px;'
					+ 'margin: 0 auto;'
					+ 'position: relative;'
					+ 'height: 2px;'
					+ '}'
					+ '.balance:before {'
					+ 'content: "";'
					+ 'border: 12px solid transparent;'
					+ 'border-top: 12px solid #696969;'
					+ 'position: absolute;'
					+ 'left: 53px;'
					+ 'bottom: -23px;'
					+ '}'
					+ '</style>'
					+ '<table class="type02" id="historyDetail">'
					+ '<tr class="header"><th class="int" style="width: 7%;">&nbsp;</th><th class="int" style="width: 10%;">売上</th><th class="int" style="width: 10%;">入金</th><th class="string" style="width: 18%;">トランザクション</th><th class="string" style="width: 30%;">内容(注文番号 注文内容)</th><th class="string" style="width: 25%;">日時</th></tr>'
					+ '<tr class="detail"><td></td><td class="int"><span class="item-data">￥100</span></td><td class="int"><span class="item-data"></span></td><td class="string"><span class="item-data">注文</span></td><td class="string"><span class="item-data">サンプル商品 他1点</span></td><td class="string"><span class="item-data">2017年07月20日23時59分</span></td></tr>'
					+ '<tr class="detail"><td></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">￥100</span></td><td class="string"><span class="item-data">入金</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td></tr>'
					+ '<tr class="detail"><td></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td></tr>'
					+ '<tr class="detail"><td></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td></tr>'
					+ '<tr class="detail"><td></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td></tr>'
					+ '<tr class="sum-detail"><td style="border-style: none;"><span>合計</span></td><td class="int" style="border-style: none;"><span id="historyOrderTotal" class="item-data">￥100</span></td><td class="int" style="border-style: none;"><span id="paymentAmountTotal">￥100</span></td><td class="string" style="border-style: none;" colspan="3"></td></tr>'
					+ '<tr class="sum-detail" style="border-style: none;"><td style="border-style: none;"></td><td class="string" style="border-style: none;" colspan="2"><div class="balance"></div><br><div align="center">バランス<span id="balanceAmountTotal">￥0(会計完了)</span></td><td class="string" style="border-style: none;" colspan="3"></td></tr>'					
					+ '</table>'
					;
			}
			else if(reportItem == 'orderDetailTreasureHis') {
				// 注文明細＋会計履歴
				reportItemHtml = ''
					+ '<style>'
					+ 'table.type03 {'
					+ ' width: 100%;'
					+ '	border-collapse: collapse;'
					+ '	line-height: 1.5;'
					+ ' border-spacing: 2px;'
					+ '}'
					+ 'table.type03 thead th {'
					+ '	padding: 10px;'
					+ '	font-weight: bold;'
					+ '	vertical-align: top;'
					+ '	color: #369;'
					+ '	border-bottom: 3px solid #036;'
					+ '}'
					+ 'table.type03 tbody th {'
					+ '	padding: 10px;'
					+ '	font-weight: bold;'
					+ '	vertical-align: top;'
					+ '	border-bottom: 1px solid #ccc;'
					+ ' background-color: #666666;'
					+ ' color: #ffffff;'
					+ '}'
					+ 'table.type03 td {'
					+ '	padding: 10px;'
					+ '	vertical-align: top;'
					+ '	border-bottom: 1px solid #ccc;'
					+ '}'
					+ 'table.type03 .string{'
					+ '	text-align: left;'
					+ '}'
					+ 'table.type03 .int{'
					+ '	text-align: right;'
					+ '}'
					+ '#orderDetail .sum-detail td:first-of-type{'
					+ '   border-style: none;'
					+ '}'
					+ '#orderDetail .sum-detail td{'
					+ '}'
					+ '#historyDetail .sum-detail td{'
					+ ' border-style: none;'
					+ '}'
					+ '#historyDetail .detail td {'
					+ '	padding: 10px;'
					+ '	vertical-align: top;'
					+ '	border-bottom: 1px solid #ccc;'
					+ '}'
					+ '.balance {'
					+ 'background: #696969;'
					+ 'width: 125px;'
					+ 'margin: 0 auto;'
					+ 'position: relative;'
					+ 'height: 2px;'
					+ '}'
					+ '.balance:before {'
					+ 'content: "";'
					+ 'border: 12px solid transparent;'
					+ 'border-top: 12px solid #696969;'
					+ 'position: absolute;'
					+ 'left: 53px;'
					+ 'bottom: -23px;'	
					+ '}'
					+ '</style>'
					+ '<table class="type03" id="orderDetail">'
					+ '<tr class="title"><td>注文履歴</td><td colspan="4"></td></tr>'
					+ '<tr class="header"><th id="nameitem" class="string" style="width: 60%;">アイテム</th><th id="nameunitprice" class="int" style="width: 15%;">単価</th><th id="namenumber" class="int" style="width: 10%;">数量</th><th  id="namemoney" class="int" style="width: 15%;">金額（<span id="amountTaxType">税別</span>）</th></tr>'
					+ '<tr class="detail"><td class="string"><span id="item" class="item-data">A12345678 サンプル商品</span></td><td class="int"><span id="unitprice" class="item-data">￥1,000</span></td><td class="int"><span id="number" class="item-data">1</span></td><td class="int"><span span id="money" class="item-data">￥1,000</span></td></tr>'
					+ '<tr class="detail"><td class="string"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td></tr>'
					+ '<tr class="detail"><td class="string"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><td class="string" colspan="2">商品代金合計<span id="subtotalTaxType">(税抜)</span></td><td class="int"><span id="subtotal" class="item-data">￥1,000</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><td class="string" colspan="2">送料</td><td class="int"><span id="shoppingCharge" class="item-data">￥100</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><td class="string" colspan="2">消費税(<span id="paymentTaxType">外税</span>)</td><td class="int"><span id="orderTax" class="item-data">￥80</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><td class="string" colspan="2">ポイント利用金額</td><td class="int"><span id="pointDiscountAmount" class="item-data" style="color:red;">￥-60</span></td></tr>'
					+ '<tr id="adjustAmountShow" class="sum-detail"><td class="string"></td><td class="string" colspan="2">調整額</td><td class="int"><span id="adjustAmount" class="item-data">￥-10</span></td></tr>'
					+ '<tr class="sum-detail"><td class="string"></td><th class="string" colspan="2" style="border-style: none;">合計</th><td class="int" style="border-style: none;"><span id="total" class="item-data">￥1,110</span></td></tr>'
					+ '</table>'
					+ '<table class="type03" id="historyDetail">'
					+ '<tr class="title"><td colspan="2">会計履歴</td><td colspan="4"></td></tr>'
					+ '<tr class="header"><th class="int" style="width: 7%;">&nbsp;</th><th class="int" style="width: 10%;">売上</th><th class="int" style="width: 10%;">入金</th><th class="string" style="width: 18%;">トランザクション</th><th class="string" style="width: 30%;">内容(注文番号 注文内容)</th><th class="string" style="width: 25%;">日時</th></tr>'
					+ '<tr class="detail"><td></td><td class="int"><span class="item-data">￥100</span></td><td class="int"><span class="item-data"></span></td><td class="string"><span class="item-data">注文</span></td><td class="string"><span class="item-data">サンプル商品 他1点</span></td><td class="string"><span class="item-data">2017年07月20日23時59分</span></td></tr>'
					+ '<tr class="detail"><td></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">￥100</span></td><td class="string"><span class="item-data">入金</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td></tr>'
					+ '<tr class="detail"><td></td><td class="int"><span class="item-data">　</span></td><td class="int"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td><td class="string"><span class="item-data">　</span></td></tr>'
					+ '<tr class="sum-detail"><td style="border-style: none;"><span>合計</span></td><td class="int"><span id="historyOrderTotal" class="item-data">￥100</span></td><td class="int" style="border-style: none;"><span id="paymentAmountTotal">￥100</span></td><td class="string" style="border-style: none;" colspan="3"></td></tr>'
					+ '<tr class="sum-detail" style="border-style: none;"><td style="border-style: none;"></td><td class="string" style="border-style: none;" colspan="2"><div class="balance"></div><br><div align="center">バランス<span id="balanceAmountTotal">￥0(会計完了)</span></td><td class="string" style="border-style: none;" colspan="3"></td></tr>'					
					+ '</table>'
					;
			} 
			else if(reportItem == 'deliveryName') {
			} 
			else if(reportItem == 'deliveryTelephone') {
			} 
			else if(reportItem == 'deliveryCompanyName') {
			} 
			else if(reportItem == 'deliveryMethodName') {
			}
			else if(reportItem == 'billingName') {
			} 
			else if(reportItem == 'billingAddressCity') {
				/*reportItemHtml = '〒<span id="billingZipCode" class="item-data">123-4567</span>'
					+ '<br /><br /><span id="billingPrefectureCode" class="item-data">東京都</span>'
					+ '<span id="billingAddressCity" class="item-data">××区○○町1丁目</span>'
					+ '<br /><span id="billingAddressBuilding" class="item-data">223-4</span>';*/
				reportItemHtml = '<span id="ASymbol_2" class="item-data"></span><span id="A16" class="item-data"></span><span id="ASymbol_1" class="item-data"></span><span id="A17" class="item-data"></span>'
					+ '<span id="A18" class="item-data">注文者住所</span>'
					+ '<span id="A19" class="item-data"></span>'
					+ '<span id="A20" class="item-data"></span>';
			} 
			else if(reportItem == 'billingTelephone') {
			} 
			else if(reportItem == 'billingCompanyName') {
			}
			else if(reportItem == 'paymentMethodName') {
			}
			
			// fax items
			else if(reportItem == 'faxDeliveryDate') {
			}
			else if(reportItem == 'faxTitle') {
			}
			else if(reportItem == 'faxMemo') {
			}
			else if(reportItem == 'faxTotalPages') {
				// reportItemHtml = '<span id="faxTotalPages"
				// class="item-data">'+initVal+'</span>ページ';
			}
			else if(reportItem == 'faxNumber') {
			}
			
			else if(reportItem == 'ticketQRCode') {
				return '<div id="qrcodeImage" class="image-qrcode item-data"><span>'+initVal+'</span></div><div id="qrcodeNum" class="image-qrnum item-data"><span style="text-align: center;display:block;">'+ '123 456 789' +'</span></div>';
			}
			
			// text-image
			else if(reportItem.indexOf('jzFieldImage') != -1) {
				if (reportItem.indexOf('Text') != -1) {
					reportItemHtml = '<div class="report-item-box">&nbsp;</div>';
				}
				else  {
					reportItemHtml = '';
				}
				return reportItemHtml;
			}
			
			if (!reportItemHtml) {
				reportItemHtml = '<span id="'+reportItem+'" class="item-data">'+initVal+'</span>';
			}
			return '<div class="report-item-box">'+reportItemHtml+'</div>';
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

function setCkeditorConfig(tenantSignId, language) {
	var config = {};
	config.language = language ? language : "en";
	config.width = "100px";
	config.height = "60px";
	config.extraPlugins = 'sourcedialog';
	config.font_names = 'ＭＳ ゴシック, IPAゴシック; ＭＳ Ｐゴシック, IPA Pゴシック; ＭＳ 明朝, IPA明朝; ＭＳ Ｐ明朝, IPA P明朝;';
	config.toolbar = [
	                  	['Styles', 'Format'],
	                  	['NumberedList', 'BulletedList'],
	                  	['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
	                  	['Sourcedialog'],
	                  	'/',
	                  	['Font', 'FontSize'],
	                  	['TextColor', 'BGColor'],
	                  	['Bold', 'Italic', 'Underline', 'Strike'],
	                  	['Link','Image','Table']
	                  ];

	config.enterMode = CKEDITOR.ENTER_BR;
	setFileConfig(config, tenantSignId);
	return config;
}

var nowPageSize={};
function afterOpenPageSizeDialog() {
	if( !$.isEmptyObject(nowPageSize) ){
		$('#page-size').val(nowPageSize.pageSize);
		$('#uc-width').val(nowPageSize.pageUCWidth);
		$('#uc-height').val(nowPageSize.pageUCHeight);
		$('#padt').val(nowPageSize.pagePaddingT);
		$('#padb').val(nowPageSize.pagePaddingB);
		$('#padl').val(nowPageSize.pagePaddingL);
		$('#padr').val(nowPageSize.pagePaddingR);
		
		if (nowPageSize.pageSize.indexOf('UC') == 0) {
			var width = nowPageSize.pageSize.split('#')[1];
			var height = nowPageSize.pageSize.split('#')[2];
			
			$('#page-size').find('option').each(function(){
				if($(this).val().indexOf('UC')==0){
					$(this).val('UC#' + width + '#' + height);
				}
			});
			
			$('#page-size').val('UC#' + width + '#' + height);
		}
		
	}else{
		nowPageSize.pageSize = $('#page-size').val();
		nowPageSize.pageUCWidth = $('#uc-width').val();
		nowPageSize.pageUCHeight = $('#uc-height').val();
		nowPageSize.pagePaddingT = $('#padt').val();
		nowPageSize.pagePaddingB = $('#padb').val();
		nowPageSize.pagePaddingL = $('#padl').val();
		nowPageSize.pagePaddingR = $('#padr').val();
	}
	
	if($('#page-size').val().indexOf('UC') == 0){
		$('#pagesize-custom-box').show();
	}else{
		$('#pagesize-custom-box').hide();
	}
}

function initPageSize(pageSizeDB, pagePaddingDB) {
	if (pageSizeDB.indexOf('UC') == 0) {
		var width = pageSizeDB.split('#')[1];
		var height = pageSizeDB.split('#')[2];
		$('#uc-width').val(width);
		$('#uc-height').val(height);
		$('#page-size').find('option').each(function(){
			if($(this).val().indexOf('UC')==0){
				$(this).val('UC#' + width + '#' + height);
			}
		});
		$('#page-size').val(pageSizeDB);
	}else{
		$('#page-size').val(pageSizeDB);
	}
}

function resetPageSize(pageSizeDB, pagePaddingDB) {
	var pageSize, paperSize, width, height, widthActual, heightActual,
		padl, padr, padt, padb, topMin,topMax,leftMin,leftMax, itemSize={};
	
	if (pageSizeDB) {
		initPageSize(pageSizeDB, pagePaddingDB);
	}
	pageSize = $('#page-size').val();
	
	if (pageSize.indexOf('UC') == 0) {
			
			width = $('#uc-width').val();
			height = $('#uc-height').val();
		
			if(width < 100 || width > 500
					 || height < 100 || height > 500){
				jzMsgBox('<m>ユーザ定義は100mmから500mmの<m><br><m>間で設定してください。</m>', 'alert');
				return;
			}
	}
	
	if (pagePaddingDB) {
		var pagePaddingArr = pagePaddingDB.split('#');
		$('#padt').val(pagePaddingArr[0]);
		$('#padb').val(pagePaddingArr[1]);
		$('#padl').val(pagePaddingArr[2]);
		$('#padr').val(pagePaddingArr[3]);
	}
	padt=$('#padt').val();
	padb=$('#padb').val();
	padl=$('#padl').val();
	padr=$('#padr').val();
	
	if (pageSize.indexOf('UC') == 0) {
		paperSize = 'ユーザ定義';
		width = $('#uc-width').val();
		height = $('#uc-height').val();
		widthActual = width - padl - padr;
		heightActual = height - padt - padb;
	}
	else {
		var pageSizeArr = pageSize.split('#');
		paperSize = pageSizeArr[0];
		width = pageSizeArr[1];
		height = pageSizeArr[2];
		widthActual = pageSizeArr[1] - padl - padr;
		heightActual = pageSizeArr[2] - padt - padb;
	}

	$('#jzformarea .item-moved').each(function() {
		itemSize[$(this).attr('id')] = {
				width: $(this).outerWidth(),
				height: $(this).outerHeight()
		};
	});
	
	var pdsul=$('#pds-ul'), pdsur=$('#pds-ur'), pdsdl=$('#pds-dl'), pdsdr=$('#pds-dr'), jzformarea=$('#jzformarea'), padBorder=2;
	jzformarea.css({'width': widthActual+'mm', 'height': heightActual+'mm', 'padding-left': padl+'mm', 'padding-right': padr+'mm', 'padding-top': padt+'mm', 'padding-bottom': padb+'mm'});
	jzformarea.css({'padding-left': padl+'mm', 'padding-right': padr+'mm', 'padding-top': padt+'mm', 'padding-bottom': padb+'mm'});
	$(".padding-area-lt").css("height", padt+'mm');
	$(".padding-area-rt").css("width", padr+'mm');
	$(".padding-area-lb").css("width", padl+'mm');
	$(".padding-area-rb").css("height", padb+'mm');

	topMin = 0;
	topMax = jzformarea.innerHeight();
	leftMin =  0;
	leftMax =  jzformarea.innerWidth();
	
	if (!pageSizeDB) {
		$('#jzformarea .item-moved').each(function() {
			if ($(this).position().top < topMin) {
				$(this).css("top", topMin+"px");
			}
			else if ($(this).position().top + $(this).outerHeight() > topMax) {
				$(this).css("top", (topMax-itemSize[$(this).attr('id')].height)+"px");
			}
			
			if ($(this).position().left < leftMin) {
				$(this).css("left", leftMin+"px");
			}
			else if ($(this).position().left + $(this).outerWidth() > leftMax) {
				$(this).css("left", (leftMax-itemSize[$(this).attr('id')].width)+"px");				
			}
		});
	}
	
	$('#page-size-label').text(paperSize);
	$('#page-size-label-detail').text('（' + width + '×' + height + 'mm）');
	if (pageSize.indexOf('UC') == 0) {

		$('#page-size').find('option').each(function(){
			if($(this).val().indexOf('UC')==0){
				$(this).val('UC#' + width + '#' + height);
			}
		});
		
		$('#page-size').val('UC#' + width + '#' + height);
		$('#pageSize').val('UC#' + width + '#' + height);
	}else{
		$('#pageSize').val(pageSize);
	}
	$('#pagePadding').val(padt+'#'+padb+'#'+padl+'#'+padr);
	
	$('#jzformarea').find('div[columnname="accountOrderDetails"],div[columnname="treasurerHistory"],div[columnname="orderDetailTreasureHis"]').css({'width': $('#jzformarea').width()-1, 'left' : $('#pds-dl').width()+1});
	
	nowPageSize.pageSize = $('#page-size').val();
	nowPageSize.pageUCWidth = $('#uc-width').val();
	nowPageSize.pageUCHeight = $('#uc-height').val();
	nowPageSize.pagePaddingT = $('#padt').val();
	nowPageSize.pagePaddingB = $('#padb').val();
	nowPageSize.pagePaddingL = $('#padl').val();
	nowPageSize.pagePaddingR = $('#padr').val();
	$('#sizeConfClose').click();
}

function adjustPosition(reportItem) {
	var jzformarea=$('#jzformarea'),
		topMin = $('.padding-area-lt').height() || 0,
		topMax = jzformarea.innerHeight() - $('.padding-area-rb').height(),
		leftMin =  $('.padding-area-lb').width() || 0,
		leftMax =  jzformarea.innerWidth() - $('.padding-area-rt').width();

	if (reportItem.position().top < topMin) {
		reportItem.css("top", topMin+"px");
	}
	else if (reportItem.position().top + reportItem.outerHeight() > topMax) {
		reportItem.css("top", (topMax-reportItem.outerHeight())+"px");
	}
	
	if (reportItem.position().left < leftMin) {
		reportItem.css("left", leftMin+"px");
	}
	else if (reportItem.position().left + reportItem.outerWidth() > leftMax) {
		reportItem.css("left", (leftMax-reportItem.outerWidth())+"px");
	}
}

function afterOpenLineDialog() {
	var selectedItemId = $('#selected-item-id').val(), selectedItem = $('#'+selectedItemId);
	/*
	if (!$("#line-weight").next().hasClass("ui-spinner")) {
		$("#line-weight").spinner({suffix:'pt', step: 0.25, min: 1, max: 5, spin: function(event, ui) {
	        $(this).change();
	    }});
		$("#line-weight").css('text-align', 'left');
	}
	*/
	if(!selectedItem[0]){
		return;
	}
	
	if(selectedItem.find('hr')[0]){
		var selectedLine = selectedItem.find('hr')[0];
	}else{
		var selectedLine = selectedItem[0];
	}
	
	if (!selectedLine.style['border-bottom-color']) {
		selectedLine.style['border-bottom-color'] = '#000';
	}
	if (!selectedLine.style['border-bottom-style']) {
		selectedLine.style['border-bottom-style'] = 'solid';
	}
	if (!selectedLine.style['border-bottom-width']) {
		selectedLine.style['border-bottom-width'] = '2pt';
	}

	$("#line-color").spectrum("set", selectedLine.style['border-bottom-color']);
	$('#line-style').val(selectedLine.style['border-bottom-style']);
	//$("#line-weight").spinner("value", selectedLine.style['border-bottom-width'].substring(0, selectedLine.style['border-bottom-width'].length-2));
	$("#line-weight").val(selectedLine.style['border-bottom-width'].substring(0, selectedLine.style['border-bottom-width'].length-2));
	previewLine();

	$("#line-weight").unbind('change').bind('change', function() {
		previewLine();
	});
}

function previewLine() {
	var selectedItemId = $('#selected-item-id').val(), lineStyle =　$('#line-weight').val() + 'pt ' + $('#line-style').val() + ' ' + $('#line-color').val();
	if (selectedItemId && selectedItemId.indexOf('Line') != -1) {
		$('#'+selectedItemId+' hr').css('border-bottom', lineStyle);	
	}
	else {
		$('#'+selectedItemId).css('border', lineStyle);
	}
// $('#preview-hr').css({'border-bottom': $('#line-weight').val() + ' ' +
// $('#line-style').val() + ' ' + $('#line-color').val()});
}

function openLineStyleDialog(currItemId) {
	$('#selected-item-id').val(currItemId);
// $('#lscd-link').click();
	showControlBox(currItemId, 'line-style-config-dialog',afterOpenLineDialog);
}

function afterOpenQrcodeDialog() {
	var selectedItemId = $('#selected-item-id').val(), selectedItem = $('#'+selectedItemId);
	
	if (!$("#qrcode-size").next().hasClass("ui-spinner")) {
		$("#qrcode-size").spinner({suffix:'px', step: 10, min: 100, max: 500, spin: function(event, ui) {
	        $(this).change();
	    }});
		$("#qrcode-size").css('text-align', 'right');
	}
	
	if (!$("#qrcode-margin").next().hasClass("ui-spinner")) {
		$("#qrcode-margin").spinner({suffix:'px', step: 10, min: 10, max: 100, spin: function(event, ui) {
	        $(this).change();
	    }});
		$("#qrcode-margin").css('text-align', 'right');
	}
	
	if(!selectedItem[0]){
		return;
	}
	
	var selectedLineDiv = selectedItem[0];
	var selectedLine = selectedItem.find('.image-qrcode')[0];


	if (!selectedLine.style['width'] || !selectedLine.style['height']) {
		selectedLine.style['width'] = '100px';
		selectedLine.style['height'] = '100px';
	}
	if (!selectedLineDiv.style['width'] || !selectedLineDiv.style['height']) {
		selectedLineDiv.style['width'] = '110px';
		selectedLineDiv.style['height'] = '110px';
	}

	var qrSize = selectedLine.style['width'].substring(0, selectedLine.style['width'].length-2), 
		divSize = selectedLineDiv.style['width'].substring(0, selectedLineDiv.style['width'].length-2), 
		margin = (Number(divSize) - Number(qrSize))/2;
	
	$("#qrcode-size").spinner("value", qrSize);
	$("#qrcode-margin").spinner("value", margin);
	
	previewQrcode();
	
	$("#qrcode-size").unbind('change').bind('change', function() {
		previewQrcode();
	});
	
	$("#qrcode-margin").unbind('change').bind('change', function() {
		previewQrcode();
	});
}

function previewQrcode() {
	var selectedItemId = $('#selected-item-id').val(), 
		qrSize = $('#qrcode-size').val().substring(0, $('#qrcode-size').val().length-2), 
		margin = $('#qrcode-margin').val().substring(0, $('#qrcode-margin').val().length-2), 
		divSize = Number(qrSize) + ( margin * 2);
	
	$('#'+selectedItemId).find('.image-qrcode').css({"width": qrSize, "height": qrSize});
	$('#'+selectedItemId).css({"width": divSize, "height": divSize});
	$('#'+selectedItemId).attr("qrcode:size",qrSize).attr("qrcode:margin",margin);
	
}

function openQrcodeStyleDialog(currItemId) {
	$('#selected-item-id').val(currItemId);
// $('#lscd-link').click();
	showControlBox(currItemId, 'qrcode-style-config-dialog',afterOpenQrcodeDialog);
}


function afterOpenItemStyleDialog() {
	var selectedItemId = $('#selected-item-id').val(), selectedItem = $('#'+selectedItemId);
	// if (!$("#item-font-size").next().hasClass("ui-spinner")) {
		/*
		$("#item-font-size").spinner({suffix:'px', step: 1, min: 8, max: 30, spin: function(event, ui) {
	        $(this).change();
	    }});
		*/
		$("#item-font-size").css('text-align', 'left');
	// }
	// if (!$("#item-detail-size").next().hasClass("ui-spinner")) {
		var minNum = 0;
		if (($('#'+selectedItemId).contents().find('#orderDetail').length > 0)
				&& ($('#'+selectedItemId).contents().find('#historyDetail').length > 0)) {
			minNum = 3;
		} else if ($('#'+selectedItemId).contents().find('#orderDetail').length > 0) {
			minNum = 1;
		} else if ($('#'+selectedItemId).contents().find('#historyDetail').length > 0) {
			minNum = 2;
		} else {
			minNum = 1;
		}
		/*
		$("#item-detail-size").spinner({suffix:'', step: 1, min: minNum, max: 20, spin: function(event, ui) {
	        $(this).change();
	    }});
	    */
		$("#item-detail-size").css('text-align', 'left');
	// }
	
	if (!selectedItem[0].style['color']) {
		selectedItem[0].style['color'] = '#000';
	}
	if (!selectedItem[0].style['font-size']) {
		selectedItem[0].style['font-size'] = '13px';
	}
	if (!selectedItem[0].style['font-family']) {
		selectedItem[0].style['font-family'] = 'ｍｓ ｐゴシック';
	}

	$("#item-font-color").spectrum("set", selectedItem[0].style['color']);
	$("#item-font-family").val(selectedItem[0].style['font-family']);
	$('#item-font-size').val(parseInt(selectedItem[0].style['font-size']));
	
	// previewItemStyle();
	
	$("#item-font-size").unbind('change').bind('change', function() {
		previewItemStyle();
	});
	
	var selectedItemId = $('#selected-item-id').val();
	if(selectedItemId.indexOf('accountOrderDetails') > -1
			|| selectedItemId.indexOf('treasurerHistory') > -1
			|| selectedItemId.indexOf('orderDetailTreasureHis') > -1){
		// $('#item-style-config-dialog-font-size').hide();
		$('#item-style-config-dialog-detail-size').show();
		
		var nrows = 0, firstDetailHTML='';
		
		var rows = $('#'+selectedItemId + ' table tbody tr.detail');
		nrows = rows.length;
		$('#item-detail-size').val(nrows);
		
		var firstDetail =  $(rows[0]).clone();
		$.each($(firstDetail).find('span.item-data'), function() { 
			$(this).html('　');
		});
		
		firstDetailHTML =  $(firstDetail).prop('outerHTML');
		
		$('#set-item-normal-btn').unbind('click').bind('click', function() {
			var p_props = { 'color' : $('#item-font-color').val(), 'font-family' : $('#item-font-family').val(), 'font-size' : $('#item-font-size').val() + "px"};
			$('#'+selectedItemId).css(p_props);

			var srows = $('#item-detail-size').val();
			
			while(nrows > srows){
				if (($('#'+selectedItemId).contents().find('#orderDetail').length > 0)
						&& ($('#'+selectedItemId).contents().find('#historyDetail').length > 0)) {
				    if (srows < 3) {
				    	break;
				    }
				    nrows = nrows - 1;
				    if ($('#'+selectedItemId).contents().find('#historyDetail tr.detail').length > 2) {
				    	var obj = $('#historyDetail tr.detail');
						obj[obj.length - 1].remove();
				    } else {
				    	var obj = $('#orderDetail tr.detail');
						obj[obj.length - 1].remove();
				    }
				    continue;	
				} else if ($('#'+selectedItemId).contents().find('#orderDetail').length > 0) {
					if (srows < 1) {
				    	break;
				    }
				} else if ($('#'+selectedItemId).contents().find('#historyDetail').length > 0) {
					if (srows < 2) {
				    	break;
				    }
				}
				nrows = nrows - 1;
				var obj = $('#'+selectedItemId + ' table tbody tr.detail');
				obj[obj.length - 1].remove();
			}
			while(nrows < srows){
				nrows = nrows + 1;
				var obj = $('#'+selectedItemId + ' table tbody tr.detail');
				var line = firstDetailHTML.replace(/([a-z]*)([0-9]{2})([0-9]{2})/gi,"$1"+ ( '00' + nrows ).slice( -2 ) +"$3");
				
				$(obj[obj.length - 1]).after(line);
			}
		});
	}
	else{
		$('#item-style-config-dialog-font-size').show();
		$('#item-style-config-dialog-detail-size').hide();
		
		$('#set-item-normal-btn').unbind('click').bind('click', function() {
			var p_props = { 'color' : $('#item-font-color').val(), 'font-family' : $('#item-font-family').val(), 'font-size' : $('#item-font-size').val() + "px"};
			$('#'+selectedItemId).css(p_props);
		});
	}
	
}

function previewItemStyle() {
	// $('#preview-item').css({'color':$('#item-font-color').val(),
	// 'font-family':$('#item-font-family').val(),
	// 'font-size':$('#item-font-size').val()});
	$('#set-item-normal-btn').trigger('click');
}

function openItemStyleDialog(currItemId) {
	$('#selected-item-id').val(currItemId);
	// $('#incd-link').click();
	showControlBox(currItemId, 'item-style-config-dialog',afterOpenItemStyleDialog);
}

function isLockByControlBox(){
	// $('#jzformarea-wrap').contents().find('.control-box').is(':visible'));
	if($('#jzformarea-wrap').contents().find('.control-box').is(':visible')){
//		return true;
	}else if ($('.cke.cke_ltr').is(':visible')){
//		return true;
	}
	return false;
}

function showControlBox(thisObjCssId, controlBoxCssId, afterfunction) {
	
	var thisObj = $("#"+thisObjCssId);
	var controlBox = $("#"+controlBoxCssId);
	
	if(isLockByControlBox()){
		hideControlBox();
		hideCkControlBox();
	}
	
	showControlButtons(thisObj);
	
	var offset = thisObj.position();
	var posTop = parseInt(offset.top - 3);
	var posLeft = 4 + parseInt(offset.left + thisObj.outerWidth(true));
	
	posLeft = posLeft < 0 ? 1 : posLeft;
	controlBox.css({top: posTop, left: posLeft});
	controlBox.show();
	
	afterfunction();
	
	controlBox.bind('click',function(e){
		e.stopPropagation();
	});
	
	controlBox.mouseover(function(){
		//showControlButtons(thisObj, true);
	});
	
	if(controlBox.find('select')[0]){
		controlBox.find('select')[0].focus();
	}

}

function hideControlBox() {
	$('#jzformarea-wrap').contents().find('.control-box').hide();
}


function hideCkControlBox() {
	$('.report-item.cke_focus').trigger("blur");
	$('.cke.cke_ltr').hide();
}

function isShowedControlButtons(thisObj) {
	var item = $( '#' + $(this).find('#report-item-move-btn').attr('move-report-id') );
	if($('#control-buttons-left').is(':visible')){
		if ($('#report-item-remove-btn').attr('remove-report-id') === thisObj.attr('id') ){
			return true;
		}
	}
	return false;
}

function adjustCKControlBox(thisObj){
	var delayTime = 0;
	var sett = CKEDITOR.focusManager._.blurDelay;
	CKEDITOR.focusManager._.blurDelay = delayTime;
	thisObj.trigger("blur");
	CKEDITOR.focusManager._.blurDelay = sett;
	//setTimeout('$("#'+thisObj.attr('id') + '").focus()',(delayTime + 1));
	thisObj.focus();
}

function showControlButtons(thisObj) {
	var isCklItem = thisObj.attr('id').indexOf('jzFieldImageText') == 0;
	
	if(isLockByControlBox()){
		hideControlBox();
	}
	if(!isCklItem){
		hideCkControlBox();
		hideControlBox();
	}else{

		if ($('.cke.cke_ltr').is(':visible')){
			thisObj.focus();
			thisObj.removeClass('ui-state-disabled');
			//showCKControlBox(thisObj);

		}else{
			//$('.cke.cke_ltr').show();
			thisObj.focus();
			//setTimeout(
			//"$('#"+thisObj.attr('id')+"').focus();", 100);
			thisObj.removeClass('ui-state-disabled');
			
		}

	}
	
	let controlBottons = $('#jzformarea-wrap').contents().find('#control-buttons');
	let controlBottonsLeft = $('#jzformarea-wrap').contents().find('#control-buttons-left');
	
	var offset = thisObj.position();
	var posTop = parseInt(offset.top - controlBottons.outerHeight(true));
	var posLeft = 3 + parseInt(offset.left + thisObj.outerWidth(true) - controlBottons.outerWidth(true));
	
	// closeUnnecessaryDialog();
	controlBottons.find('#report-item-remove-btn').attr('remove-report-id', thisObj.attr('id'));
	controlBottons.find('#report-item-edit-btn').attr('edit-report-id', thisObj.attr('id'));
	controlBottonsLeft.find('#report-item-move-btn').attr('move-report-id', thisObj.attr('id'));
	
	if(!isCklItem){

		posLeft = posLeft < 0 ? 1 : posLeft;
		controlBottons.css({top: posTop, left: posLeft});
		controlBottons.show();
		
		controlBottons.attr({'selectedTargetId': thisObj.attr('id')});
		controlBottons.find('.for-part').hide();
		controlBottons.find('.for-row').show();
		
		$("#report-item-remove-left-btn").hide();
	}else{
		controlBottons.hide();
		$("#report-item-remove-left-btn").show();
	}
	posTop = parseInt(offset.top - 3);
	if(thisObj.hasClass('image-line-div')){
		posLeft = parseInt(offset.left - controlBottonsLeft.outerWidth(true) - 4);
	}else{
		posLeft = parseInt(offset.left - controlBottonsLeft.outerWidth(true) - 3);
	}
	controlBottonsLeft.css({top: posTop  , left: posLeft});
	controlBottonsLeft.show();
	

	$("#control-buttons-left").draggable({
//		containment: '#jzformarea',
		revert: "invalid",							
//		cursorAt: {top: 0, left: 0},
		start: function() {
			hideControlBox();
			if(isCklItem){
				//hideCkControlBox();
			}
		},
		drag: function() {
	    	var item = $( '#' + $(this).find('#report-item-move-btn').attr('move-report-id') );
	    	
	    	var pos = $(this).position();
	    	var pLeft = pos.left, pTop = pos.top;
	    	
	    	var doAdjust = setAdjustPosition(item, pLeft + $(this).outerWidth() + 3, pTop + 3);
	    	
	    	adjustCKControlBox(item);
	    	showControlButtons(item);
	    	
			return true;
		},
		stop: function() {
	    	var item = $( '#' + $(this).find('#report-item-move-btn').attr('move-report-id') );
			//CKEDITOR.instances[item.attr('id')].updateElement();
	    	adjustCKControlBox(item);
			showControlButtons(item);
			$('#jzform').change();
			return true;
		}
	});
	controlBottons.bind('click',function(e){e.stopPropagation();});
	controlBottonsLeft.bind('click',function(e){e.stopPropagation();});
	
	showActiveItem(thisObj);
}

function setAdjustPosition(reportItem, pLeft, pTop) {
	var jzformarea=$('#jzformarea'),
		topMin = $('.padding-area-lt').height() || 0,
		topMax = jzformarea.innerHeight() - topMin,
		leftMin =  $('.padding-area-lb').width() || 0,
		leftMax =  jzformarea.innerWidth() - leftMin,
		rLeft = pLeft,
		rTop = pTop;
		
	while(reportItem.outerHeight() > (topMax - topMin)){
		reportItem.height(reportItem.height()-1);
	}
	while(reportItem.outerWidth() > (leftMax - leftMin)){
		reportItem.width(reportItem.width()-1);
	}
	
	if (pTop < topMin) {
		rTop = topMin;
	}
	else if (pTop + reportItem.outerHeight() > topMax) {
		rTop =  (topMax-reportItem.outerHeight());
	}
	if (pLeft < leftMin) {
		rLeft =  leftMin;
	}
	else if (pLeft + reportItem.outerWidth() > leftMax) {
		rLeft = (leftMax-reportItem.outerWidth());
	}
	reportItem.css({left: rLeft, top: rTop});
	
	return (rLeft != pLeft || rTop != pTop);
}

function hideControlButtons() {
	if(isLockByControlBox()){
		return;
	}
	
	$('#jzformarea-wrap').contents().find('.active').each(function() {
		$(this).removeClass("active");
	});
	$('#jzformarea-wrap').contents().find('.control-buttons').hide();
}


function showActiveItem(thisObj) {
	
	$('#jzformarea-wrap').contents().find('.active').each(function() {
		$(this).removeClass("active");
	});
	thisObj.addClass("active");
	thisObj.find('.report-item-box').addClass("active");

}


function showNoReportItemNotice(){
	var itemMoved = $('#jzformarea .item-moved');
	if (itemMoved.length > 0) {
		$('#jzformarea #noReportItemNotice').hide();
	}else{
		$('#jzformarea #noReportItemNotice').show();
	}
}
function dialogClose(){
	 $('#YSDialogIframefaxId').dialog('close');
	 $('#dialog-preview-form').dialog('close');
}
function otherFunction(){
	var arr = '${otherFunction}';
        if(arr.indexOf('${_SYSAREA_SHOP_ITEM}') != -1){	
		}else{
			$("#nameitem").empty();
			$("#item").empty();
		}
		if(arr.indexOf('${_SYSAREA_SHOP_UNIT_PRICE}') != -1){
		}else{
			$('#nameunitprice').empty();
			$('#unitprice').empty();
		}
		if(arr.indexOf('${_SYSAREA_SHOP_NUMBER}') != -1){
		}else{
			$('#namenumber').empty();
			$('#number').empty();
		}
		if(arr.indexOf('${_SYSAREA_SHOP_MONEY}') != -1){
		}else{
			$('#namemoney').empty();
			$('#money').empty();
		} 
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
	        zIndex: 10,
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

function toFullPage(){
	$(".jz-form-container").toggleClass("is-fullSize");
	$("#full-size-btn").children().toggleClass('is-hidden');
	
	if ($('#panel').is(':visible')) {
		$('#panel').hide();
		$('body footer').before('<div id="report-form-full-screen"></div>');
		//$('#regist-form-full-screen').empty();
		$('#jzform').appendTo('#report-form-full-screen');
		
		/*
		$("#jzform #sortable2 li").each(function() {
			resetDivToIframe($(this));
			resetImage($(this));
		});
		*/
	}
	else {
		$('#jzform').appendTo('#menu-content-in');
		$('#panel').show();
		//$('#regist-form-full-screen').empty();
		$('#report-form-full-screen').remove();
		
		/*
		$("#jzform #sortable2 li").each(function() {
			resetDivToIframe($(this));
			resetImage($(this));
		});
		*/
		
	}
	
}
