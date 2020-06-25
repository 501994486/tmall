	$("ul.menu li").hover(function(){
	$(">ul:not(:animated)",this).slideDown("fast");
	},
	function(){
		$(">ul",this).slideUp("fast");
	});
	$("ul.sub").parent("li").children("a").addClass("arrow-sub");
