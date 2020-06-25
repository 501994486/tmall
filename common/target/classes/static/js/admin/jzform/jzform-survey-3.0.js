/**
 * jzform-survey version 3.0
 * 
 */
(function($, undefined) {
	var event = $(event);
	var conf;

	var imagePrefix = 'image_';
	var pagingPrefix = 'paging_';

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
				var layout = `
					<div class="drag-target is-hidden">${conf.lang.dragTip}</div>
					<div id="jzform" class="jz-form-report div-change-trigger" onselectstart="return false;">
						<div id="jz-form-area" class="jz-form-container">
						<a id="option-control-link" href="" class="is-hidden"></a>
						<a id="option-control-alarm-link" href="" class="is-hidden"></a>
						<div class="jz-form-header">
				          <div class="jz-form-header_l">
				            <span><span id="page-conf-str">${conf.masterNameTitle}</span></span>
				            <span><div class="divider"></div></span>
				            <span><a class="" href="javascript:;" onclick="hover('#jz-form-item');"><i class="fa fa-th-large  question-bubble-popup" ${conf.lang.hoverBtnTip}></i></a></span>
				          </div>
						  
				          <div class="jz-form-header_r">
				            <a id="full-size-btn" class="btn-alone">
				                <span>全画面表示</span>
				                <span class="is-hidden">通常表示</span>
				            </a>
				          </div>
				        </div>
						<div id="jz-form-area-in" class="jz-form__bk-canvas">
									<div class="jz-form-canvas">
										<div id="jzformarea">
											<ul id="sortable2" class="form-table">
											</ul>
											<div>
											  <ul id ="sortable4" class="form-table">
											    <li id="jzFieldPaging_overPage" title="WEB PAGING" fieldname="over_paging" columnname="jzFieldPaging_overPaging" fieldtype="paging" class="pagingClass" jzstatus="moved" jzrequired="">
						                        <div>
						                        <table class="detail07 field-detail-table">
														<tr id="over_tr" >
															<td id="over_title_td" align="left"><div class="end-page"><i class="fa fa-external-link-square" aria-hidden="true"></i><span><m>終了</m></span></div></td>
															<td id="over_paging_td" align="left"></td>
															<td id="over_preview_td" align="right"><a id="over_preview" href="javascript:;" onclick="OthersPreviewDelay(this)" class="btn-alone-small" ><m>ページプレビュー</m></a></td>
														</tr>
											    </table>
											    </div>
											    </li>
											  </ul>
											</div>
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

				$('#menu-content-in').html(layout);
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
								      	<div class="pull-dw-menu__slide-area tree">
								          <ul id="sortable1" class="pull-dw-menu__child"></ul>
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
											 <li id="jzFieldPaging" class="pull-dw-menu__contents">
											  	<div class="ic-txt-box input-image">
												 	<div class="ic-txt-box_icon"><i class="fa fa-external-link-square" aria-hidden="true"></i></div>
													<div class="ic-txt-box_txt"><span>${conf.lang.paging}</span></div>
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

				$(".op-cl-area").off("click").on("click", function(){
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

				// image The project is dragged to the right from the left.
				$('#jzFieldImage').draggable({
					cursor: "move",
					cursorAt: {top: 4, left: 30},
					zIndex:100000,
					helper: function(e) {
						var htmlDataValue = getImageHtml($(this).attr('columnName'), "drag", imagePrefix + "drag");
						return $(htmlDataValue)[0];
					},
					start : function(event, ui) {
						//setWebeditorJs (imagePrefix + "drag", $(this).attr('fieldType'));
						setJZFormareaCSS("start");
						$("#optionBox").hide();
					},
					stop : function(event, ui) {
						setJZFormareaCSS();
					},
					connectToSortable : "#sortable2"
				});

				// image The project is dragged to the left from the right.
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
				
				// paging The project is dragged to the right from the left.
				$('#jzFieldPaging').draggable({
					cursor: "move",
					zIndex:100000,
					cursorAt: {top: 4, left: 30},
					helper: function(e) {
						var htmlDataValue = getPagingHtml($(this).attr('columnName'), "drag", pagingPrefix + "drag", "" , true);
						return $(htmlDataValue)[0];
					},
					start : function(event, ui) {
						//setWebeditorJs (pagingPrefix + "drag", $(this).attr('fieldType'));
						setJZFormareaCSS("start");
					},
					stop : function(event, ui) {
						setJZFormareaCSS();
					},
					connectToSortable : "#sortable2"
				});

				// paging The project is dragged to the left from the right.
				$("#jzFieldPaging").droppable({
					accept: "li.pagingClass",
					tolerance: 'touch',
					drop: function(event, ui) {
						var $item = ui.draggable;
						$('#optionBox').hide();
						$item.remove();
						//$(".ui-sortable-placeholder").hide("slow");
						resizeJzFormArea('delete');
					}
				});
				
				// Drag and drop sorted items on the right
				$("#sortable2").sortable({
					cursor: "move",
					tolerance: 'pointer',
					connectWith: '#sortable2',
					forcePlaceholderSize: true,
					placeholder: "placeholder",
					cancel : "#optionBox",
					zIndex : 1002,
					revert : 200,
					axis: "y",
					start: function(event, ui) {
						if (ui.item.attr('fieldType') == "image") {
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
							if (fieldType == "image" || fieldType == "paging") {
								var colName = columnName.split('_');
								if (colName.length >= 2) {
									if (fieldType == "paging") {
										var checkboxFlag = $item.find("input[type='checkbox']").prop('checked');
										var textValue = $item.find("input[type='text']").val();
										var htmlvalue = getPagingHtml(columnName, "", pagingPrefix + colName[1], textValue, checkboxFlag);
										$item.children("div").html(htmlvalue);
										$item.removeAttr("class");
										$item.addClass("pagingClass");
										//setWebeditorJs (pagingPrefix + colName[1], fieldType);
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
								else {
									var uniqueTime = new Date().getTime();
									if (fieldType == "paging") {
										$item.removeAttr("class");
										$item.addClass("pagingClass");
										$item.attr({
											id: columnName + "_" + uniqueTime,
											fieldname: pagingPrefix + uniqueTime,
											columnname: columnName + "_" + uniqueTime,
											jzstatus: 'moved',
										});
										var value = getPagingHtml(columnName, "", pagingPrefix + uniqueTime, "", true);
										$item.children("div").html(value);
										$item.children("div").removeAttr("class");
										//setWebeditorJs (pagingPrefix + uniqueTime, fieldType);
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
							else {
								var addFlag = true,
									addNodeId = $item.attr('columnName'),
								  	rel = $item.attr("rel");
								
								if (rel == "folder2") {
									$("#sortable2 li").each(function(){
									    if ($(this).attr("id") == addNodeId) {
									    	addFlag = false;
									    	return false;
									    }
									  });
									if (addFlag) {
										var htmlDataValue = getOthersTypeHtml($item, true);
										setJZFormareaCSS("start");
										$item.prop("outerHTML", htmlDataValue);
									}
									else {
										$item.remove();
									}
								}
								else if (rel == "folder") {
									var addFolderFlag = false;
									$("#" + addNodeId + " li").each(function() {
										if ($(this).attr("rel") != "folder") {
											addFolderFlag = true;
											var addFolderNodeId = $(this).attr("columnName");
											$("#sortable2 li").each(function(){
											    if ($(this).attr("id") == addFolderNodeId) {
											    	addFlag = false;
											    	return false;
											    }
											  });
											if (addFlag) {
												var htmlDataValue = getOthersTypeHtml($item, true);
												setJZFormareaCSS("start");
												$item.prop("outerHTML", htmlDataValue);
											}
											else {
												$item.remove();
											}
											addFlag = true;
										}
									});
									if (!addFolderFlag) {
										$item.remove();
									}
								}
							}
							resetDivToIframe($("#sortable2").find("#" + $item.attr('columnName')));
							resetImage($("#sortable2").find("#" + $item.attr('columnName')));
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
							$itemCon.removeClass("tx-required").addClass("tx-required--option");
						}
						else{
							$itemCon.removeClass("tx-required--option").addClass("tx-required");	
						}
						
						$('#jzform').change();
					}
					resetDivToIframe($item);
					resetImage($item);
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
					//initCheckLinkClick();
				});
				
				
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
						width: 700,
						dialogTitle : conf.lang.optionControl
					});
					$('#option-control-link').click();
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
					
					$('#jzform').change();
					//initCheckLinkClick();
				});
				
				
				$("#optionControAlarmBtn").die().live("click", function(e) {
					var $item = $('#sortable2 #' + $(this).attr('columnName'));
					var bellIdList = "",
						bellLength = $item.find("span.bell").length - 1;
					var columnNameOption = $('#' + $('#optionControAlarmBtn').attr('columnName'));
					$item.find("span.bell").each(function(i) {
						if (typeof($(this).attr("id")) != "undefined") {
							var optionId = "option_" + $(this).attr("id").split("_")[1];
							bellIdList += optionId;
							if (i != bellLength) {
								bellIdList += ",";
							}
						}
					});
					if (bellIdList == "") {
						bellIdList = "0";
					}
					$('#option-control-alarm-link').attr('href', conf.optionControAlarmURL + "/" + conf.masterName + "/" + conf.formId + "/" + $(this).attr('columnName') + "/" + bellIdList);
					$('#option-control-alarm-link').YSModalDialog({
						width: 700,
						dialogTitle : conf.lang.optionControlAlarm,
						dialogId: "OptionControlAlarm"
					});
					$('#option-control-alarm-link').click();
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
					
					$('#jzform').change();
				});

				
				$("#optionBoxDeleteBtn").die().live("click", function(e) {
					var $itemDel = $('#' + $('#optionBoxDeleteBtn').attr('columnName')),
						$itemAttr = $('#' + $('#optionBoxDeleteBtn').attr('columnName'));
					$itemDel.remove();
					$('#itemContentMenu').removeClass('over');
					$('#optionBox').hide();
					resizeJzFormArea('delete');
					
					$('#jzform').change();
				});
				
				$("#optionBoxMoveUpBtn").die().live("click", function(e) {
					//initCheckLinkClick();	
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

		var surveyItemTree;
		var surveyItemTreeUrl = top.jzAppVars().domainUrl + "/admin/survey/item/management/get-surveyItem-tree-data?surveyFlag=0";
		function loadSurveyItemTree(fields) {
			surveyItemTree = $("#survey-item-tree").jstree({
				"core" : { 
					"width" : "326px",
					"lang" : surveyItemTreeLang
				},
				"json_data" : {
					"ajax" : {
						"url" : function() {
							return getSurveyItemTreeUrl();
						}
					}
				},
			});
			surveyItemTree.bind("loaded.jstree", function(e, data) {
// 				data.inst.open_all(-1);
				setSurveyItemPictureTree(fields);
				setTreeNodeSortable();
			});
	
			surveyItemTree.bind("refresh.jstree", function(e, data) {
// 	 			data.inst.open_all(null);
			});
			
			surveyItemTree.bind("open_node.jstree click.jstree", function(e){
				setSurveyItemPictureTree(fields);
			});
		}
		
		var globalVar = {
				selectedThemeId : -1,
				tabName : 'setup',
				targetTicket : '',
				nodeId : -1,
				parentNodeId : -1,
				isLeaf : true,
				isRoot : false,
			}
		
		function getSurveyItemTreeUrl() {
			return surveyItemTreeUrl;
		}
		
		function setSurveyItemPictureTree(fields) {
			$("#survey-item-tree li").each(function() {
				if ($(this).attr('rel') != 'drive'){
					$(this).css("cursor","move");
					$(this).children('a').css("cursor","move");
					$(this).children('a').children('ins').css("cursor","move");
					$(this).children('a').mouseover(function() {
						$(this).addClass("jstree-hovered");
					}).mouseleave(function() {
						$(this).removeClass("jstree-hovered");
					});
				}
				if ($(this).attr('rel') == 'folder'){
					$(this).addClass("tree-ui-sortable");
					$(this).children('a').addClass("l-jstree-folder");
					$(this).attr('columnName',$(this).attr('id'));
				}
				if ($(this).attr('rel') == 'folder2') {
					$(this).children('ins').remove();
					var noedName = $(this).children('a').children('span').text();
					$(this).children('a').children('span').text(getSurveyItemFieldName(ckeditorToTextarea(noedName.replace(/\r\n|\n/g,"<br/>"))));
					
					var columnName = $(this).attr("id").split("_")[1];
					var showOrder,
						fieldType,
						fieldnameValue;
					for ( var i = 0; i < fields.length; i++) {
						if (fields[i].columnName ==  columnName) {
							showOrder = fields[i].showOrder;
							fieldType = fields[i].fieldType;
							fieldnameValue = fields[i].fieldName.replace(/\r\n|\n/g,"<br/>").replace(/\"/g,"&quot;");
						}
					}
					$(this).attr({
						title: fieldnameValue,
						fieldName: fieldnameValue,
						columnName: columnName,
						showOrder: showOrder,
						formCount: 0,
						fieldType: fieldType,
						jzstatus: 'init',
						jzrequired: '',
						jzOptionControl: ''
					});
				}
			});
		}
		
		function setTreeNodeSortable(){
			var $target = $('#survey-item-tree li[rel="folder2"]');
		
			$target.draggable({
// 				cursor: "move",
				tolerance: "pointer",
			    connectToSortable: "#sortable2",
				appendTo: "#jzform",
			    helper: function(e) {
			    	  var $htmlData = $(this).clone();
			          var htmlDataValue = getOthersTypeHtml($htmlData, false);
			          return $(htmlDataValue)[0];
			  	},
			  	start: function(event, ui) {
					setJZFormareaCSS("start");
					$("#optionBox").hide();
					$("#sortable2 li div").unbind('mousedown').unbind('mouseup').unbind('click');
	    		},
				stop: function(event, ui) {
					setJZFormareaCSS();
					bindMouse();
			    }
			});
			/*
			$target.droppable({
				accept: "li.normalClass",
				tolerance: 'touch',
				drop: function(event, ui) {
					$item = ui.draggable;
					$('#optionBox').hide();
					$item.remove();
					resizeJzFormArea('delete');
				}
			});
			*/
			$($target, '#sortable2').disableSelection();
		}
		
		function setFieldList(fields) {
			$('#sortable1').empty();
			$('#sortable2').empty();
			var count = 0;
			for ( var i = 0; i < fields.length; i++) {
				if (fields[i].used) {
					if (fields[i].used == 'YES') {
						if (i == fields.length - 1) {
							$("#over_textId").val(fields[i].limitTimeMinute);
						}
						else {
							setFieldMoved($('#sortable2'), fields[i]);
						}
						count++;
					}
					else {
						//setFieldInit(fields[i]);
					}
				}
			}
			/*
			if (fields.length == 0 || count == fields.length) {
				$('#sortable1').html('<div class="input-none">' + conf.lang.itemContent + '</div>');
			}
			*/
			$('#sortable1').html('<div id="survey-item-tree" class="jstree link-trigger-excepted"></div>');
			loadSurveyItemTree(fields);
			
			$('#jzFieldImage').attr({
				title: 'WEB EDITOR',
				fieldName: 'WEB EDITOR',
				columnName: 'jzFieldImage',
				fieldType: 'image',
				jzstatus: 'init',
				jzrequired: '',
				jzOptionControl: ''
			});
			
			$('#jzFieldPaging').attr({
				title: 'WEB PAGING',
				fieldName: 'WEB PAGING',
				columnName: 'jzFieldPaging',
				fieldType: 'paging',
				jzstatus: 'init',
				jzrequired: '',
				jzOptionControl: ''
			});
		}

		/**
		 * 
		 * @param field
		 */
		function setFieldInit(field, type) {
			var liHtml = '<li id="' + field.columnName + '" class="pull-dw-menu__contents">'
					+ '		<div class="ic-txt-box input-' + field.fieldType + '">' + getShortFieldName(ckeditorToTextarea(field.fieldName)) + '</div>'
					+ '		<div class="ic-txt-box_txt"><span>' + getShortFieldName(field.fieldName) + '</span></div></div>'
					+ '	  </li>';
			
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
			$("#enquete-setup-form").find(('#' + field.columnName)).attr({
				title: field.fieldName,
				fieldName: field.fieldName,
				columnName: field.columnName,
				fieldType: field.fieldType,
				showOrder: field.showOrder,
				formCount: field.formCount,
				jzstatus: 'init',
				// Must
				jzrequired: '',
				// Control according to selection
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
		 * 
		 * @param targetId
		 * @param field
		 */
		function setFieldMoved($target, field) {
			// JZFORM Initialization、image Initialization、 paging Initialization
			if (field.fieldType == "image") {
				var timeSuffix = field.columnName.substring(field.columnName.indexOf('_') + 1);
				if (!field.fieldName) {
					field.fieldName = imagePrefix + timeSuffix;
				}
				var htmlDataContent = getImageHtml(field.columnName, "", imagePrefix + timeSuffix, field.editorData);
				$target.append(getNormalOrImageHtml(field, htmlDataContent));
				$("#enquete-setup-form").find(('#' + field.columnName)).addClass("imageClass");
				setFieldMovedEnd(field, timeSuffix);
			}
			else if (field.fieldType == "paging") {
				var timeSuffix = field.columnName.substring(field.columnName.indexOf('_') + 1);
				if (!field.fieldName) {
					field.fieldName = pagingPrefix + timeSuffix;
				}
				var htmlDataContent = getPagingHtml(field.columnName, "", pagingPrefix + timeSuffix, field.limitTimeMinute, field.prevFlag);
				$target.append(getNormalOrImageHtml(field, htmlDataContent));
				$("#enquete-setup-form").find(('#' + field.columnName)).addClass("pagingClass");
				setFieldMovedEnd(field, timeSuffix);
			}
			else {
				$target.append(getNormalOrImageHtml(field, field.htmlData));
				// the type of emailaddress and password.
				if (field.fieldType == "label") {
					$("#enquete-setup-form").find(('#' + field.columnName)).addClass("labelClass");
				}
				else {
					$("#enquete-setup-form").find(('#' + field.columnName)).addClass("normalClass");
				}
				setFieldMovedEnd(field);
			}
			//div to iframe
			resetDivToIframe($('#' + field.columnName));
			resetImage($('#' + field.columnName))
		}

		function setFieldMovedEnd(field, timeSuffix) {
			$("#enquete-setup-form").find(('#' + field.columnName)).attr({
				fieldName: field.fieldName.replace(/\"/g,"&quot;"),
				columnName: field.columnName,
				fieldType: field.fieldType,
				showOrder: field.showOrder,
				formCount: field.formCount,
				jzstatus: 'moved',
				jzrequired: field.jzrequired,
				jzOptionControl: field.jzOptionControl
			});
			
			if (field.jzrequired == 'checked') {
				$('#' + field.columnName + "_required_control").html(conf.lang.requiredMark);	
			}
			if (field.jzOptionControl == 'checked') {
				$('#' + field.columnName + "_option_control").html(conf.lang.optionControlMark);
				$('#' + field.columnName + "_option_control").removeClass("tx-required").addClass("tx-required--option");
			}
			else {
				$('#' + field.columnName + "_option_control").removeClass("tx-required--option").addClass("tx-required");	
			}
			if (field.fieldType == 'image' || field.fieldType == 'webeditor') {
				var webeditorId = field.columnName;
				if (timeSuffix) {
					webeditorId = imagePrefix + timeSuffix;
				}
				//setWebeditorJs (webeditorId, field.fieldType);
			}
			else if (field.fieldType == 'paging') {
				var webeditorId = field.columnName;
				if (timeSuffix) {
					webeditorId = pagingPrefix + timeSuffix;
				}
				$("#enquete-setup-form").find('#' + field.columnName + " input").bind('click.sortable mousedown.sortable',function(ev){
				    ev.target.focus();
				});
				//setWebeditorJs (webeditorId, field.fieldType);
			}
			$("#enquete-setup-form").find(('#' + field.columnName)).find("div.btn-gs>a").unbind('click');
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
		
		function getSurveyItemFieldName(fieldName) {
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
			return `<ul class="detail03 ${dragTableClass}">
					<li id="${columnName}_tr" >
						<div id="${columnName}_td" align="left"><textarea id="${editorId}" class="is-hidden">${editorData}</textarea>
					    </div>
					</li></ul>
				<iframe id="${editorId}-iframe" class="inside_image" frameborder="0" onload="clearLoading(this)" width="100%" height="100%"
					src="${top.jzAppVars().domainUrl}/common/iframe-ckeditor-modal/init?iframeId=${editorId}-iframe&textAreaId=${editorId}&tenantUploadId=${top.jzAppVars().tenantUploadId}&v=${top.jzAppVars().v}">
				</iframe>
				`;
/*			
			return '<table class="detail03 ' + dragTableClass + '">'
				+ '		<tr id="' + columnName + '_tr" >'
				+ '		<td id="' + columnName + '_td" align="left"><textarea id="' + editorId + '">' + editorData + '</textarea></td>'
				+ '</tr></table>';
*/
		}
		
		function getPagingHtml(columnName, classType, pagingId, textData, checkboxFlag) {
			var dragTableClass = "field-detail-table";
			if (classType == "drag") {
				dragTableClass = "drag-field-detail-table";
			}
			if (!textData) {
				textData = "";
			}
			
			var html = '';
			html += '<ul class="detail07 ' + dragTableClass + '">'
				+ '		<li id="' + columnName + '_' + pagingId + '_tr" >'
				+ '		<div id="' + columnName +  '_' + pagingId + '_title_td"><div class="next-page"><i class="fa fa-external-link-square" aria-hidden="true"></i><span><m>改ページ</m></span></div></div>';
			
			html += '		<div id="' + columnName + pagingId + '_time_td" align="right"></div>'
			html += '		<div id="' + columnName + pagingId + '_time_td" align="right"></div>'
			 	  + '		<div id="' + columnName + pagingId + '_preview_td" align="right"><a id="' + pagingId +  '_preview" href="javascript:;" onclick="OthersPreviewDelay(this)" class="btn-alone-small"><m>ページプレビュー</m></a></div>'
				  + '</li></ul>';
			 
			return html;
		}
		
		function getOthersTypeHtml($obj, flag) {
			var htmlDataValue = "";
			if ($obj.attr("rel") == "folder2") {
				htmlDataValue = getDataHtml($obj, flag);
			}
			else if ($obj.attr("rel") == "folder") {
				var folderId = $obj.attr("columnName");
				$("#" + folderId + " li").each(function() {
					var rel = $(this).attr("rel");
					var htmlDataList = "";
					if (rel != "folder") {
						htmlDataList = getDataHtml(this, flag);
						htmlDataValue += htmlDataList;
					}
				});
			}
			if (htmlDataValue == "") {
				htmlDataValue = '<li style="list-style-type: none;">'
							  + '    <div><ul class="detail03 drag-field-detail-table" style="min-height: 36px;border: 1px solid #ccc;"></ul></div>'
							  + '</li>';
			}
			return htmlDataValue;
		}
		
		function getDataHtml(obj, flag){
			var htmlDataList = "";
			var columnName = $(obj).attr('columnName'),
				fieldname = $(obj).attr('fieldname').replace(/\"/g,"&quot;"),
				showorder = $(obj).attr('showorder'),
				formcount = $(obj).attr('formcount'),
				jzrequired = $(obj).attr('jzrequired'),
				jzoptioncontrol = $(obj).attr('jzoptioncontrol'),
				fieldType = $(obj).attr('fieldType');
			
			$.ajax({
				url : conf.extendFieldDetailURL + columnName,
				async : false,
				success : function(data, textStatus) {
					if(flag) {
						htmlDataList = '<li id="' + columnName + '" class="normalClass" fieldname="' + fieldname + '" columnname="' + columnName + '" fieldtype="' + fieldType + '" showorder="' + showorder + '" formcount="' + formcount + '" jzstatus="moved" jzrequired="' + jzrequired + '" jzoptioncontrol="' + jzoptioncontrol + '">'
								      + '    <div><ul class="detail03 field-detail-table jzc-eqta-form">' + data.ExtendFieldDetail + '</ul></div>'
								      + '</li>';
					}
					else {
						htmlDataList = '<li id="' + columnName + '" class="normalClass" fieldname="' + fieldname + '" columnname="' + columnName + '" fieldtype="' + fieldType + '" showorder="' + showorder + '" formcount="' + formcount + '" jzstatus="moved" jzrequired="' + jzrequired + '" jzoptioncontrol="' + jzoptioncontrol + '" style="line-height:100%;list-style-type: none;">'
								      + '    <div><ul class="detail03 drag-field-detail-table">' + data.ExtendFieldDetail + '</ul></div>'
								      + '</li>';
					}
				}
			});
			
			return htmlDataList;
		}
		
		function getNormalOrImageHtml(field, htmlValue) {
			if (field.fieldType == "image" || field.fieldType == "paging") {
				htmlValue = '<li id="' + field.columnName + '"><div>' + htmlValue + '</div></li>';
			}
			else {
				htmlValue = '<li id="' + field.columnName + '"><div><ul class="detail03 field-detail-table jzc-eqta-form">' + htmlValue + '</ul></div></li>';
			}
			return htmlValue;
		}
		
		function setWebeditorJs(columnName, fieldType) {
			return ;
			
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
/*		
		function resetImage($item) {
			if ($item.attr("fieldType") == "image") {
				var columnName = $item.attr("columnName");
				var colName = columnName.split('_');
				if (colName.length >= 2) {
					var myeditor = CKEDITOR.instances[imagePrefix + colName[1]];
					var value= myeditor.document.getBody().getHtml();
					var htmlvalue = getImageHtml(columnName, "", imagePrefix + colName[1], value);
					$item.children("div").html(htmlvalue);
					//setWebeditorJs (imagePrefix + colName[1], $item.attr("fieldType"));
				}
			}
		}
*/		
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
			}else if ($item.attr("fieldType") == "paging") {
				if($item.children(".inside_input").length <= 0){
					$item.append('<i class="inside_input icon-menu-list"></i>');
				}
				$item.find('input').bind('click.sortable mousedown.sortable',function(ev){
				    ev.target.focus();
				});
			}
		}
		
		function resetDivToIframe($item){
			if ($item.attr("fieldType") == "image" || $item.attr("fieldType") == "paging") {
				return;
			}
			
			var head = `<link type="text/css" rel="stylesheet" href="${ top.jzAppVars().resourceServerUrl }/css/web/common/font-awesome.min.css">`;
			top.jzAppVars().webCssUrl.forEach(function(item){head = head + `<link type="text/css" rel="stylesheet" href="${item}">`});
			var style = `<style>html,body{overflow: hidden} table.field-detail-table{width: 100%;} {padding-left: 30px;} .tx-required {display: none;}</style>`;
			var content = "<head>" + head + style + "</head><body>" + $item.find(".field-detail-table").prop('outerHTML') + "</body>";
			//$item.children("div").hide();
			if($item.find(".inside_input").length > 0){
				resetIframeByContent($item, content)
			}else{
				$item.append('<i class="inside_input icon-menu-list"></i>');
				$item.children("div").append('<iframe class="inside_input" src="about:blank"></iframe>');
				$item.find("iframe.inside_input").ready(function() {
					if($item.find("iframe.inside_input")){
						resetIframeByContent($item, content);
					}
				});
			}
		}
		
		function resetIframeByContent($item, content){
			var id=$item.attr("id"), $content =  $('body', $item.find("iframe.inside_input").contents());
			$item.find("iframe.inside_input").load(function(){
				$item.find("iframe.inside_input").css("visibility","visible");
			});
			var $newConent = $(content);
			$newConent.on('load',function(){
				$content.find(".drag-field-detail-table, .field-detail-tabl").removeClass("drag-field-detail-table").addClass("field-detail-table");
				var height = $content.find(".field-detail-table").outerHeight();
				var bgColor = $content.css("background");
				$item.find("iframe.inside_input").height(0);
				$item.find("iframe.inside_input").height(height * 1.1);
				$("#jzformarea").css("background", bgColor);
			});
			$content.html($newConent);
//			move tx-required
			var requiredCrl = $content.find("#"+id + "_required_control");
			if(requiredCrl.length && requiredCrl.html().length){
				requiredCrl.removeClass("tx-required").addClass("jzc-eqta-form__no-omitted-tip");
				requiredCrl.appendTo($content.find(".itemContents_title"));
			}

		}
		
		function setJZFormareaCSS(type) {
			
			var jzBorder = "#F7F7F7", jz = "#CCCCCC";
			if (type == "start") {
			
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
		
		// 鼠标点击拖拽区域内中项目上的操作图标时, 显示下拉列表
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

		function bindMouse() {
			$("#optionBox").hide();
			$(document).off('click', '#sortable2 li > .icon-menu-list');
			$(document).on('click', '#sortable2 li > .icon-menu-list', function(e) {
				var $item = $(this).parent();
				$('#sortable2 li > .icon-menu-list').removeClass('moved-over');
				$(this).addClass('moved-over');
				/*
				var topPosition = ($item.position().top + 10) + "px", leftPosition = ($item.position().left + 10) + "px";
				if ($item.attr('fieldType') == 'webeditor' || $item.attr('fieldType') == 'image' || $item.attr('fieldType') == 'paging') {
					topPosition = $item.position().top + 10 + "px";
				}
				$("#optionBox").css({"left" : leftPosition, "top" : topPosition});
				$('#optionBox').show();
				*/
				
				var itemDeleteMenu = '<li><a id="optionBoxDeleteBtn" class="normal"><span>' + conf.lang.deleteMenu + '</span></a></li>',
					itemAlarmMenu = '<li><a id="optionControAlarmBtn" class="normal"><span>' + conf.lang.alarmMenu + '</span></a></li>',
					itemMenuDetailHtml = '<li style="display: none;"><a id="optionBoxHiddenBtn"></a></li>'
									+ '   <li><a id="optionBoxMoveUpBtn" class="normal"><span>' + conf.lang.moveUpMenu + '</span></a></li>'
									+ '   <li style="display: none;"><a id="optionBoxMoveUpDisabledBtn" class="disabled"><span>' + conf.lang.moveUpMenu + '</span></a></li>'
									+ '   <li><a id="optionBoxMoveDownBtn" class="normal"><span>' + conf.lang.moveDownMenu + '</span></a></li>'
									+ '   <li style="display: none;"><a id="optionBoxMoveDownDisabledBtn" class="disabled"><span>' + conf.lang.moveDownMenu + '</span></a></li>';
				var itemEditMenu = '';
				
				if (conf.jzformType == 'facility_type_entry' || conf.jzformType == 'enquete_entry' || conf.jzformType == 'porxy_entry') {
// 					itemEditMenu = '<li><a class="normal" onclick="editExtendField(\'' + $item.attr('columnname') + '\');"><span>' + conf.lang.editMenu + '</span></a></li>';
				}
				
				if ($item.attr('fieldType') != "textarea" && $item.attr('fieldType') != "image" && $item.attr('fieldType') != "paging") {
					itemDeleteMenu = itemDeleteMenu + itemAlarmMenu;
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
				else if ($item.hasClass("imageClass") || $item.hasClass("pagingClass")) {
					itemMenuDetailHtml = itemDeleteMenu + itemMenuDetailHtml;
				}
				$('#itemMenuDetail').html(itemMenuDetailHtml);
				$('#optionBox').removeClass('over');
				
				var fieldId = $item.attr('id');
				$('#jz-jzrequired-option').attr({'field': fieldId, 'checkedFlag': $item.attr('jzrequired')});
				$('#optionControlBtn').attr({'columnName': fieldId, 'optionControlFlag': $item.attr('jzOptionControl')});
				$('#optionBoxDeleteBtn').attr('columnName', fieldId);
				$('#optionControAlarmBtn').attr('columnName', fieldId);
				$('#optionBoxHiddenBtn').attr('columnName', fieldId);
				$('#optionBoxMoveUpBtn').attr('columnName', fieldId);
				$('#optionBoxMoveDownBtn').attr('columnName', fieldId);
				
				$('#optionBox').attr('fieldId', fieldId);
				
				showMenu();
			});
			$('body').css('cursor','auto');
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

// add-menu-btn
function addOperationToLeftItem(lang) {
	$(document).on('click', '#sortable1 li', function(e) {
		var topPosition = ($(this).position().top + 6) + "px", leftPosition = ($(this).position().left + 120) + "px";
		$("#optionBox").css({"left" : leftPosition, "top" : topPosition});
		$('#optionBox').show();
		
		
		var fieldnameValue = $(this).attr('fieldname');		
		var result = fieldnameValue.replace(/&/g,"&amp;");
		result = result.replace(/\r\n|\n/g,"<br/>");
		result = result.replace(/</g,"&lt;");
		result = result.replace(/>/g,"&gt;");
		result = result.replace(/ /g,"&nbsp;");
		result = result.replace(/\'/g,"&#39;");
		result = result.replace(/\"/g,"&quot;");
		
// 		var itemDeleteMenu = '<li><a class="normal" onclick="editExtendField(\'' + $(this).attr('columnname') + '\');"><span>' + lang.editMenu + '</span></a></li>'
		var itemDeleteMenu = '<li><a class="normal" onclick="copySurveyItem(\'' + $(this).attr('columnname') + '\');"><span>' + lang.copyMenu + '</a></li>'
							+ '<li><a id="pasteSurveyItem" class="disabled" onclick="pasteSurveyItem()"><span>' + lang.pasteMenu + '</a></li>'
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
 * invalid/externalMethod
 * @param field
 */
function setFieldInit(field, type) {
	var liHtml = '<li id="' + field.columnName + '">'
			+ '		<div class="input-' + field.fieldType + '">' + getShortFieldName(ckeditorToTextarea(field.fieldName)) + '</div>'
			+ '	  </li>';
			
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
	$("#enquete-setup-form").find(('#' + field.columnName)).attr({
		title: field.fieldName,
		fieldName: field.fieldName,
		columnName: field.columnName,
		fieldType: field.fieldType,
		showOrder: field.showOrder,
		formCount: field.formCount,
		jzstatus: 'init',
		// Must
		jzrequired: '',
		// Control according to selection
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
    	result = result.replace(/\r\n|\n/g,"<br/>");
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
    $('.pull-dw-menu__slide-area:not(.tree)').removeClass("type-list");
    $('.pull-dw-menu__slide-area:not(.tree)').addClass("type-tile");
    $('#to-list-btn').removeClass("is-selected");
    $('#to-tile-btn').addClass("is-selected");
   
}

function toList(){
    //$('.ic-txt-box').toggleClass("ic-txt-box-tile");
	$('.pull-dw-menu__slide-area:not(.tree)').removeClass("type-tile");
	$('.pull-dw-menu__slide-area:not(.tree)').addClass("type-list");
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
	        	$("#YSContainer").change(function(e){ if(e.target == $(this)[0]) $(".jz-form-dialog").remove()});
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

function resetAlarmDivToIframe($item){
	var head = `<link type="text/css" rel="stylesheet" href="${ top.jzAppVars().resourceServerUrl }/css/web/common/font-awesome.min.css">`;
	top.jzAppVars().webCssUrl.forEach(function(item){head = head + `<link type="text/css" rel="stylesheet" href="${item}">`});
	var style = `<style>html,body{overflow: hidden} table.field-detail-table{width: 100%;} {padding-left: 30px;} .tx-required {display: none; }</style>`;
	var content = "<head>" + head + style + "</head><body>" + $item.find(".field-detail-table").prop('outerHTML') + "</body>";
	//$item.children("div").hide();
	if($item.find(".inside_input").length > 0){
		var $content =  $('body', $item.find("iframe.inside_input").contents());
		$item.find("iframe.inside_input").load(function(){
			$item.find("iframe.inside_input").css("visibility","visible");
		});
		var $newConent = $(content);
		$newConent.on('load',function(){
			$content.find(".drag-field-detail-table, .field-detail-tabl").removeClass("drag-field-detail-table").addClass("field-detail-table");
			var height = $content.find(".field-detail-table").outerHeight();
			var bgColor = $content.css("background");
			$item.find("iframe.inside_input").height(0);
			$item.find("iframe.inside_input").height(height * 1.1);
			$("#jzformarea").css("background", bgColor);
		});
		$content.html($newConent);
		
	}else{
		$item.append('<i class="inside_input icon-menu-list"></i>');
		$item.children("div").append('<iframe class="inside_input" src="about:blank"></iframe>');
		$item.find("iframe.inside_input").ready(function() {
			if($item.find("iframe.inside_input")){
				var $content =  $('body', $item.find("iframe.inside_input").contents());
				$item.find("iframe.inside_input").load(function(){
					$item.find("iframe.inside_input").css("visibility","visible");
				});
				var $newConent = $(content);			
				$newConent.on('load',function(){
					$content.find(".drag-field-detail-table, .field-detail-tabl").removeClass("drag-field-detail-table").addClass("field-detail-table");
					var height = $content.find(".field-detail-table").outerHeight();
					var bgColor = $content.css("background");
					$item.find("iframe.inside_input").height(0);
					$item.find("iframe.inside_input").height(height * 1.1);
					$("#jzformarea").css("background", bgColor);
				});
				$content.html($newConent);
			}
		});
	}
}
