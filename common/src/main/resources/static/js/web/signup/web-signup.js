
$(function(){
//		   
//	$("a.enterpass").click(function(){
//		var url = $(this).attr("href");
//		alert(url)
//		$(".closearea").slideUp(300,"swing",function(){
//                location.href = url;
//            });
//            return false;
//	});
//	
//	
//	$("a.cancelbtn").click(function(){
//		var url = $(this).attr("href");
//		$(".openarea").slideUp(300,"swing",function(){
//                location.href = url;
//            });
//            return false;
//	});
	
	//サインアップ遷移時のアニメーション
	$(".openarea").hide();
	$(".openarea").slideDown(300,"swing");
	$("a.enterpass").click(function(){
		var url = $(this).attr("href");
		$(".closearea").slideUp(300,"swing",function(){
                location.href = url;
            });
            return false;
	});
	$("a.cancelbtn").click(function(){
		var url = $(this).attr("href");
		$(".openarea").slideUp(300,"swing",function(){
                location.href = url;
            });
            return false;
	});
	
	//リンクフォーカス枠の削除
	$('a').focus(function(){this.blur();
	});
		   
	// リスト01ストライプテーブル
	$("table.list01 input[type='checkbox']:odd,table.list01s input[type='checkbox']:odd").parent("td").addClass("checkbg-odd");
	$("table.list01 input[type='checkbox']:even,table.list01s input[type='checkbox']:even").parent("td").addClass("checkbg-even");
	$("table.list01 input[type='checkbox']:odd,table.list01s input[type='checkbox']:odd").parent("td").parent("tr").addClass("odd");
	$("table.list01 input[type='checkbox']:even,table.list01s input[type='checkbox']:even").parent("td").parent("tr").addClass("even");
	
	// リスト01ストライプテーブル（チェックボックスがない場合用）
	$("table.list01 tr:nth-child(odd)").addClass("odd2");
	$("table.list01 tr:nth-child(even)").addClass("even2");
	$("table.list01s tr:nth-child(odd)").addClass("odd2");
	$("table.list01s tr:nth-child(even)").addClass("even2");
	
	// ソートアイコン表示
	$(".sort a").click(function(){
		if($(this).attr("class")=="sort-up"){
			$(".sort a").removeClass();
			$(this).addClass("sort-down");
		}else{
			$(".sort a").removeClass();
			$(this).addClass("sort-up");
		}
		return false;
	});
	
	// チェックボックス（全選択）（全解除）
	$(".checkall-btn a").toggle(function(){
		$(":checkbox").attr("checked","checked");
		$(".chk").parent("td").addClass("chk-line");
		$(".chk").parent("td").parent("tr").addClass("chk-line");
		return false;
	},function(){
		$(":checkbox").attr("checked","");
		$(".chk").parent("td").removeClass("chk-line");
		$(".chk").parent("td").parent("tr").removeClass("chk-line");
		return false;
	});
	
	// チェックボックス（一行選択）
	$(".chk").click(function(){
		if(this.checked){
			$(this).parent("td").addClass("chk-line");
			$(this).parent("td").parent("tr").addClass("chk-line");
		}else{
			$(this).parent("td").removeClass("chk-line");
			$(this).parent("td").parent("tr").removeClass("chk-line");
		}
	});
	
	// 絞り込み吹き出し表示
	$("div.shiborikomi-balloon").css("opacity","0.9").hide();
	$("a.shiborikomi").mouseover(function(){
		$("div.shiborikomi-balloon").fadeIn(100).css({
			"top":$(this).offset().top-40+"px",
			"left":$(this).offset().left-58+"px"
		});
	}).mouseout(function(){
		$("div.shiborikomi-balloon").fadeOut(100);
	});
	
	//モーダル絞り込み表示
	$("body").append("<div id='glayLayer'></div><div id='overLayer'><div id='overLayerin'></div></div>");
	
	//$("#glayLayer").click(function(){
	//	$(this).hide();
	//	$("#overLayer").hide();
	//});
			
	$("a.modal,.shiborikomi").click(function(){
		$("#glayLayer:not(:animated)").fadeTo(100,0.5);
		$("#overLayerin").load($(this).attr("href"),function(){
			$("#overLayer:not(:animated)").fadeIn(100).css({
				marginTop:"-"+$("#overLayer").height()/2+"px" , 
				marginLeft:"-"+$("#overLayer").width()/2+"px" 
			});
		});
		return false;
	});
				
	//if($.browser.msie && $.browser.version<7){
	//	$(window).scroll(function(){
	//		$("#glayLayer").get(0).style.setExpression("top","$(document).scrollTop()+'px'");
	//		$("#overLayer").get(0).style.setExpression("top","($(document).scrollTop()+$(window).height()/2)+'px'");
	//	});
	//}
	
	//ツリー階層のマウスオーバー、選択（tree01）
	$("table.tree01 tr:not(:last-child)").mouseover(function(){
		$(this).css("cursor","pointer"); 
		$(this).addClass("hover");
	}).mouseout(function(){
		$(this).css("cursor","default");
		$(this).removeClass("hover");
	}).click(function(){
		$(this).toggleClass("selected");
	});
	
	//ツリー階層のマウスオーバー、選択（tree02）
	$("table.tree02 tr").mouseover(function(){
		$(this).css("cursor","pointer"); 
		$(this).addClass("hover");
	}).mouseout(function(){
		$(this).css("cursor","default");
		$(this).removeClass("hover");
	}).click(function(){
		$(this).toggleClass("selected");
	});
	
	//タブ
	$("ul.tab-h li").click(function(){
		$("ul.tab-h li").removeClass("selected");
		$(this).addClass("selected");
	});
	
	$("#tab-v ul li").click(function(){
		$("#tab-v ul li").removeClass("selected");
		$(this).addClass("selected");
	});
	
	//メニュー
	$(".menu-v ul li").click(function(){
		$(".menu-v ul li").removeClass("selected");
		$(this).addClass("selected");
	});
	
	//読み込み
	//$("ul.tab-h li a").click(function(){
	//	$("ul.tab-h li").removeClass("selected");
	//	$(this).parent("li").addClass("selected");
	//	var loadcon = $(this).attr("href");
	//	$(".tab-content").load(loadcon)
	//	return false;
	//});
	
});
		

