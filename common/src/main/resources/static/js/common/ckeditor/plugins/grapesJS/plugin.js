(function() {
    //Section 1 : Code to execute when the toolbar button is pressed
    var a = {
        exec: function(editor) {
        	alert("検証中の機能を開きます。\n動作が不安定になる場合がありますので注意してください。");
        	var id = editor.container.getId();
            var data = editor.getData();
            //alert(theSelectedText);
            if(parent.showPopupGragesJS){
            	parent.showPopupGragesJS(id, data)
        	}
        }
    },

    //Section 2 : Create the button and add the functionality to it
    b='grapesJS';
    
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("grapesJS", {
                label: 'Add Tag', 
                //icon: this.path+"addTag.gif",
                icon: this.path + 'grapesjs-logo-cl.png',
                command: b
            });
        }
    }); 
})();
