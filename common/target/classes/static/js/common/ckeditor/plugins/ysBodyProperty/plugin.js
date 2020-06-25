(function(){
	
	b='ysBodyProperty';//插件名称
	CKEDITOR.plugins.add(b,{
		init: function(editor) {
			// Add the link and unlink buttons.
			editor.addCommand(b, new CKEDITOR.dialogCommand(b));
			editor.ui.addButton(b, {
				// label : editor.lang.link.toolbar,
				label : "編集エリアプロパティ",
				icon: this.path + 'icon_new.png', 
				command : b
			});
			// CKEDITOR.dialog.add( 'link', this.path +
			// 'dialogs/link.js' );
			CKEDITOR.dialog.add(b,
				function(editor) {
					return {
						title : '編集エリアプロパティ',
						minWidth : 350,
						minHeight : 100,
						contents : [ {
							id : 'tab1',
							label : '',
							title : '',
							elements : [{
								type: "html",  
			                    style: "",  
			                    html: $("#uiData-form").html()
							} ]
						} ],
						onShow : function() {
							$(".cke_dialog_contents #iconUrl").val($("#iconUrl").val());
							$(".cke_dialog_contents #background-attachment").val($("#background-attachment").val());
							$(".cke_dialog_contents #background-repeat").val($("#background-repeat").val());
							$(".cke_dialog_contents #background-position").val($("#background-position").val());
							$(".cke_dialog_contents #background-color").val($("#background-color").val());
							$(".cke_dialog_contents #background-size").val($("#background-size").val());
							$(".cke_dialog_contents #margin-top").val($(" #margin-top").val());
							$(".cke_dialog_contents #margin-right").val($("#margin-right").val());
							$(".cke_dialog_contents #margin-bottom").val($(" #margin-bottom").val());
							$(".cke_dialog_contents #margin-left").val($("#margin-left").val());
							$(".cke_dialog_contents #padding-top").val($("#padding-top").val());
							$(".cke_dialog_contents #padding-right").val($(" #padding-right").val());
							$(".cke_dialog_contents #padding-bottom").val($("#padding-bottom").val());
							$(".cke_dialog_contents #padding-left").val($("#padding-left").val());
							$(".cke_dialog_contents #height").val($("#height").val());
							$(".cke_dialog_contents #line-height").val($("#line-height").val());
							$(".cke_dialog_contents #overflow").val($("#overflow").val());
						},
						onOk : function() {
							$("#iconUrl").val($(".cke_dialog_contents #iconUrl").val());
							$("#background-attachment").val($(".cke_dialog_contents #background-attachment").val());
							$("#background-repeat").val($(".cke_dialog_contents #background-repeat").val());
							$("#background-position").val($(".cke_dialog_contents #background-position").val());
							$("#background-color").val($(".cke_dialog_contents #background-color").val());
							$("#background-size").val($(".cke_dialog_contents #background-size").val());
							if ($(".cke_dialog_contents #margin-top").val() != '') {
								$("#margin-top").val($(".cke_dialog_contents #margin-top").val());
							}
							else {
								$("#margin-top").val(0);
							}
							if ($(".cke_dialog_contents #margin-right").val() != '') {
								$("#margin-right").val($(".cke_dialog_contents #margin-right").val());
							}
							else {
								$("#margin-right").val(0);
							}
							if ($(".cke_dialog_contents #margin-bottom").val() != '') {
								$("#margin-bottom").val($(".cke_dialog_contents #margin-bottom").val());
							}
							else {
								$("#margin-bottom").val(0);
							}
							if ($(".cke_dialog_contents #margin-left").val() != '') {
								$("#margin-left").val($(".cke_dialog_contents #margin-left").val());
							}
							else {
								$("#margin-left").val(0);
							}
							if ($(".cke_dialog_contents #padding-top").val() != '') {
								$("#padding-top").val($(".cke_dialog_contents #padding-top").val());
							}
							else {
								$("#padding-top").val(0);
							}
							if ($(".cke_dialog_contents #padding-right").val() != '') {
								$("#padding-right").val($(".cke_dialog_contents #padding-right").val());
							}
							else {
								$("#padding-right").val(0);
							}
							if ($(".cke_dialog_contents #padding-bottom").val() != '') {
								$("#padding-bottom").val($(".cke_dialog_contents #padding-bottom").val());
							}
							else {
								$("#padding-bottom").val(0);
							}
							if ($(".cke_dialog_contents #padding-left").val() != '') {
								$("#padding-left").val($(".cke_dialog_contents #padding-left").val());
							}
							else {
								$("#padding-left").val(0);
							}
							$("#height").val($(".cke_dialog_contents #height").val());
							if ($(".cke_dialog_contents #line-height").val() != '') {
								$("#line-height").val($(".cke_dialog_contents #line-height").val());
							}
							else {
								$("#line-height").val(20);
							}
							$("#overflow").val($(".cke_dialog_contents #overflow").val());
							setAllBodyProperty();
						},
						onCancel : function() {
							setAllBodyProperty();
						}
					};
			});
		},
		requires: ['fakeobjects']
	});
		
})(); 