$(function(){
	/*
	//リンクフォーカス枠の削除
	$('a').focus(function(){this.blur();});
	
	//コンテンツメニュー（左メニュー）
	$(".menu-content-c3 ul ul").css("display","none");
	$(".menu-content-c3 .selected + ul").css("display","block");
	$(".menu-content-c3 li").click(function(){
		if($("+ul",this).css("display")=="none"){
			$(this).next().slideDown("fast","swing");
			$(this).addClass("selected");
		}
		else if($(this).hasClass("selected")){
			$(this).next().slideUp("fast","swing");
			$(this).removeClass("selected");
		}
		else{
			$(".menu-content-c3 li").removeClass("selected2");
			$(this).addClass("selected2");
			$(".menu-content-c3 a").removeClass("empty2");
		}
		return false;
	}).mouseover(function(){
		$(this).addClass("over");
	}).mouseout(function(){
		$(this).removeClass("over");
	});
		
	//コンテンツ領域を閉じる
	$(".btn-close").click(function(){
		$(this).parent().slideUp(300,"swing");
	});
	
	$(document).on('mouseover', '.btn-close', function() {
		$(this).addClass("btn-close-hover");
	}).on('mouseout', '.btn-close', function() {
		$(this).removeClass("btn-close-hover");
	});
	
	//ガジェットボックス開閉
	$(".exbox").css("display","none");
	$("a.wopen").click(function(){
			var openbox = $(this).attr("href");
		if($(this).text()=="▲ もとに戻す"){
			$(openbox).children("div.exbox").slideUp(300,"swing");
			$(this).text("▼ 全て表示する");
		}else{
			$(openbox).children("div").slideDown(300,"swing");
			$(this).text("▲ もとに戻す");
		}	
		return false;
	});
	
	//メンバーボタンレイアウト調整
	$(".memberbtn").css("margin-left", $(".mainbtn").innerWidth());
	*/
});

/**
 * 点击「メンバーシップ 」, 展开或者收缩所有的Membership.
 * 
 * <p>详细说明： 点击「メンバーシップ 」，动态取得所有的Membership生成<li></li>菜单.
 * @param menuDataUrl： 取得所有Membership的地址
 * @param menuParentUlId： 所有Membership外围的<ul></ul>的ID
 * @param detailDataUrl： 显示Membership详细的链接地址
 */
function membershipTopMenuClick(menuParentUlId, listUrl, detailUrl) {
	if ($('#' + menuParentUlId).css("display") == 'none' || $('#' + menuParentUlId).html() == '') {
		$.post(listUrl, function(data) {
			var html = '';
			for ( var i = 0; i < data.length; i++) {
				var url = detailUrl + "/" + data[i].membershipId + "/topPage";
				html += "<li id='membership_" + data[i].membershipId + "'>";
				html += "<a href=\"javascript: void(0)\"onclick=\"showTopMenuMembership(this, '" + url + "');\"  ><i class='fa fa-circle-o'></i>" + data[i].membershipName + "</a>";
				html += "</li>";
			}
			$('#' + menuParentUlId).html(html);
		});
	}
}

/**
 * 点击「カレンダー 」.
 * 
 * <p>详细说明： 点击「メンバーシップ 」，动态取得所有的Membership生成<li></li>菜单.
 * @param menuDataUrl： 取得所有Membership的地址
 * @param menuParentUlId： 所有Membership外围的<ul></ul>的ID
 * @param detailDataUrl： 显示Membership详细的链接地址
 */
function topmenuMenuCalendarClick(listUrl) {
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getCalendarStatus();
	}
	else {
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load(listUrl, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
			$("#topmenu_contents_first_div").load(listUrl, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(listUrl, function() {
					$("#content").fadeTo(300, 1);
				});
				
			});
		}
	}
}

/**
 * 点击 「検索 」.
 * 
 * @param listUrl
 */
function searchTopMenuClick(listUrl){
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getSearchStatus();
	}
	else {
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load(listUrl, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(listUrl, function() {
					$("#content").fadeTo(300, 1);
				});
				
			});
		}
	}
}


/**
 * 点击 「Wishlist 」.
 * @param listUrl
 */
function wishlistTopMenuClick(listUrl){
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getWishlistStatus();
	}
	else {
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load(listUrl, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(listUrl, function() {
					$("#content").fadeTo(300, 1);
				});
				
			});
		}
	}
}

/**
 * 点击「新規登録」或者「メンバーシップ 」, 显示Membership.
 * 
 * <p>详细说明： 在DIV(ID="topmenu_contents_first_div")中显示Membership.
 */
function showTopMenuMembership(thisId, membershipUrl) {
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getMembershipStatus(membershipUrl);
	}
	else {
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load( membershipUrl, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(membershipUrl, function() {
					$("#content").fadeTo(300, 1);
				});
			});
		}
	}
}

/**
 * 点击「インストラクター 」, 展开或者收缩所有的instructor.
 * 
 * <p>详细说明： 点击「インストラクター 」，动态取得所有的instructor生成<li></li>菜单.
 * @param menuDataUrl： 取得所有instructor的地址
 * @param menuParentUlId： 所有instructor外围的<ul></ul>的ID
 * @param detailDataUrl： 显示instructor详细的链接地址
 */
function instructorTopMenuClick(menuParentUlId, listUrl, tenantBaseUrl) {
	if ($('#' + menuParentUlId).css("display") == 'none' || $('#' + menuParentUlId).html() == '') {
		$.post(listUrl, function(data) {
			var html = '';
			for ( var i = 0; i < data.length; i++) {
				html += "<li id='instructor_" + data[i].instructorId + "'>";
				html += "<a href=\"javascript: void(0)\" onclick = \"eventInstructorClick(this, " +data[i].instructorId +",'"+ tenantBaseUrl+"')\" ><i class='fa fa-circle-o'></i>" + data[i].instructorName + "</a>";
				html += "</li>";
			}
			$('#' + menuParentUlId).html(html);
		});
	}
}

/**
 * 
 * @param menuParentUlId
 * @param listUrl
 * @param tenantBaseUrl
 */
function categoryTopMenuClick(menuParentUlId, listUrl, tenantBaseUrl){
	if ($('#' + menuParentUlId).css("display") == 'none' || $('#' + menuParentUlId).html() == '') {
		$.post(listUrl, function(data) {
			var html = '';
			html +="<table width='100%'><tr>";
			for ( var i = 0; i < data.length; i++) {
				var tagName = data[i].tag;
				html += "<td  width='50%'  id='tag_" + i+ "'>";
				html += "<li>";
				html += "<a href=\"javascript: void(0)\" onclick = \"topMenuCategoryClick(this, '"+ tagName +"','"+ tenantBaseUrl+"')\" ><i></i>" + data[i].tag + "</a>";
				html += "</li>";
				html += "</td>";
				if(i % 2 ==1 ){
					html +="</tr>";
					html +="<tr>";
				}
			}
			html +="</tr></table>";
			$('#' + menuParentUlId).html(html);
		});
	}
}
	
/**
 * 点击「開催場所 」, 展开或者收缩所有的place.
 * 
 * <p>详细说明： 点击「インストラクター 」，动态取得所有的place生成<li></li>菜单.
 * @param menuDataUrl： 取得所有place的地址
 * @param menuParentUlId： 所有place外围的<ul></ul>的ID
 * @param detailDataUrl： 显示place详细的链接地址
 */
function placeTopMenuClick(menuParentUlId, listUrl, tenantBaseUrl) {
	if ($('#' + menuParentUlId).css("display") == 'none' || $('#' + menuParentUlId).html() == '') {
		$.post(listUrl, function(data) {
			var html = '';
			for ( var i = 0; i < data.length; i++) {
				html += "<li id='place_" + data[i].placeId + "'>";
				html += "<a href=\"javascript: void(0)\" onclick = \"eventPlaceClick(this," +data[i].placeId +",'"+ tenantBaseUrl+"')\" ><i class='fa fa-circle-o'></i>" + data[i].placeName + "</a>";
				html += "</li>";
			}
			$('#' + menuParentUlId).html(html);
		});
	}
}


/**
 * 点击「テーマ 」, 展开或者收缩所有的thema.
 * 
 * <p>详细说明： 点击「テーマ 」，动态取得所有的thema生成<li></li>菜单.
 * @param menuDataUrl： 取得所有thema的地址
 * @param menuParentUlId： 所有thema外围的<ul></ul>的ID
 * @param detailDataUrl： 显示thema详细的链接地址
*/
function themaTopMenuOnload(menuParentUlId, listUrl, tenantBaseUrl) {
	if ($('#' + menuParentUlId).css("display") == 'none' || $('#' + menuParentUlId).html() == '') {
		$.post(listUrl, function(data) {
			var html = '';
			for ( var i = 0; i < data.length; i++) {
				if( data[i].themeType =='group'){
					var styleFlag = false;
					for ( var j = 0; j < data.length; j++) {	
						if (data[i].themeId == data[j].topId) {
							styleFlag=true;
							break;
						}
					}
					if (styleFlag) {
						html += "<li id = "+data[i].themeId +" class>";
						html += "<a href=\"javascript: void(0)\" class=\"arrow\" onclick = \"showTheme("+data[i].themeId+",'"+tenantBaseUrl+"')\" ><i class='fa fa-caret-right'></i>" + data[i].themeName + "</a>";
						html += "</li>";
					}
					html +="<ul  id = "+data[i].themeId+"-ul"+" style=\"display: none;\">";
					for ( var j = 0; j < data.length; j++) {
						if (data[i].themeId == data[j].topId) {
							html +="<li id = "+ data[j].themeId  +">";
							html += "<a href=\"javascript: void(0)\" onclick = \"eventThemeClick(this, "+ data[j].themeId +",'"+tenantBaseUrl+"')\" ><i class='fa fa-circle-o'></i>" + data[j].themeName + "</a>";
							html +="</li>";
						}
					}
					html +="</ul>";
				}
				else {
					if (data[i].themeType =='group') {
						var styleFlag = true;
						for ( var j = 0; j < data.length; j++) {								
							if (data[i].themeId == data[j].topId) {
								styleFlag=false;
								break;
							}
						}
						if (styleFlag) {
							html += "<li id = "+data[i].themeId +" class>";
							html += "<a href=\"javascript: void(0)\" class=\"arrow\" onclick = \"showTheme("+data[i].themeId+",'"+tenantBaseUrl+"')\" ><i class='fa fa-caret-right'></i>" + data[i].themeName + "</a>";
							html += "</li>";
						}
					}
					if ( data[i].themeType =='theme' && data[i].topId =='top' ){
						html += "<li id='" + data[i].themeId + "'>";
						html += "<a class = \"empty\" href=\"javascript: void(0)\" onclick = \"eventThemeClick(this,"+ data[i].themeId +",'"+tenantBaseUrl+"')\" ><i class='fa fa-circle-o'></i>" + data[i].themeName + "</a>";
						html += "</li>";
					}
				}
			}
			$('#' + menuParentUlId).html(html);
			if (window["topMenuInitSelect"] && typeof window["topMenuInitSelect"] === 'function') {
				topMenuInitSelect();
			}
		});
	}
}
/**
 * 点击「テーマ 」, 展开或者收缩所有的thema.
 * 
 * <p>详细说明： 点击「テーマ 」，动态取得所有的thema生成<li></li>菜单.
 * @param menuDataUrl： 取得所有thema的地址
 * @param menuParentUlId： 所有thema外围的<ul></ul>的ID
 * @param detailDataUrl： 显示thema详细的链接地址
 */
function themaTopMenuClick(menuParentUlId, listUrl, tenantBaseUrl) {
	if ($('#' + menuParentUlId).css("display") == 'none' || $('#' + menuParentUlId).html() == '') {
		$.post(listUrl, function(data) {
			var html = '';
			for ( var i = 0; i < data.length; i++) {
				if( data[i].themeType =='group'){
					var styleFlag = false;
					for ( var j = 0; j < data.length; j++) {	
						if (data[i].themeId == data[j].topId) {
							styleFlag=true;
							break;
						}
					}
					if (styleFlag) {
						html += "<li id = "+data[i].themeId +" class>";
						html += "<a href=\"javascript: void(0)\" class=\"arrow\" onclick = \"showTheme("+data[i].themeId+",'"+tenantBaseUrl+"')\" ><i class='fa fa-caret-down'></i>" + data[i].themeName + "</a>";
						html += "</li>";
					}
					html +="<ul  id = "+data[i].themeId+"-ul"+" style=\"display: block;\">";
					for ( var j = 0; j < data.length; j++) {
						if (data[i].themeId == data[j].topId) {
							html +="<li id = "+ data[j].themeId  +">";
							html += "<a href=\"javascript: void(0)\" onclick = \"eventThemeClick(this, "+ data[j].themeId +",'"+tenantBaseUrl+"')\" ><i class='fa fa-circle-o'></i>" + data[j].themeName + "</a>";
							html +="</li>";
						}
					}
					html +="</ul>";
				}
				else {
					if (data[i].themeType =='group') {
						var styleFlag = true;
						for ( var j = 0; j < data.length; j++) {								
							if (data[i].themeId == data[j].topId) {
								styleFlag=false;
								break;
							}
						}
						if (styleFlag) {
							html += "<li id = "+data[i].themeId +" class>";
							html += "<a href=\"javascript: void(0)\" class=\"arrow\" onclick = \"showTheme("+data[i].themeId+",'"+tenantBaseUrl+"')\" ><i class='fa fa-caret-down'></i>" + data[i].themeName + "</a>";
							html += "</li>";
						}
					}
					if ( data[i].themeType =='theme' && data[i].topId =='top' ){
						html += "<li id='" + data[i].themeId + "'>";
						html += "<a class = \"empty\" href=\"javascript: void(0)\" onclick = \"eventThemeClick(this,"+ data[i].themeId +",'"+tenantBaseUrl+"')\" ><i class='fa fa-circle-o'></i>" + data[i].themeName + "</a>";
						html += "</li>";
					}
				}
			}
			$('#' + menuParentUlId).html(html);
			if (window["topMenuInitSelect"] && typeof window["topMenuInitSelect"] === 'function') {
				topMenuInitSelect();
			}
		});
	}
}

/**
 * 点击「開催場所 」, 展开或者收缩所有的place.
 * 
 * <p>详细说明： 点击「インストラクター 」，动态取得所有的place生成<li></li>菜单.
 * @param menuDataUrl： 取得所有place的地址
 * @param menuParentUlId： 所有place外围的<ul></ul>的ID
 * @param detailDataUrl： 显示place详细的链接地址
 */
function courseTopMenuClick(menuParentUlId, listUrl, tenantBaseUrl) {
	if ($('#' + menuParentUlId).css("display") == 'none' || $('#' + menuParentUlId).html() == '') {
		$.post(listUrl, function(data) {
			var html = '';
			for ( var i = 0; i < data.length; i++) {
				html += "<li id='course_" + data[i].courseId + "'>";
				html += "<a href=\"javascript: void(0)\" onclick = \"eventCourseClick(this," +data[i].courseId +",'"+ tenantBaseUrl+"')\" ><i class='fa fa-circle-o'></i>" + data[i].courseName + "</a>";
				html += "</li>";
			}
			$('#' + menuParentUlId).html(html);
		});
	}
}
	
function eventThemeClick(thisId, themeId, tenantBaseUrl) {
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getEventThemeStatus(themeId);
	}
	else {
		var url = tenantBaseUrl + "/show-event-theme/"+ themeId;
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load(url, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(url, function() {
					$("#content").fadeTo(300, 1);
				});
			});
		}
	}
}
	
function showTheme(id, tenantBaseUrl){
	var groupId = id;
	var url = tenantBaseUrl + "/show-event-group/"+ groupId;
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getEventGroupStatus(id);
	}
	else {
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load( url, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(url, function() {
					$("#content").fadeTo(300, 1);
				});
			});
		}
		var size = $('#'+id+'-ul li').length;
		if (size >0){
			if($('#'+id+'-ul').css("display")=="none"){
				$('#'+id+'-ul').slideDown("fast","swing");
				$('#'+id+' i').removeClass("fa-caret-right");
				$('#'+id+' i').addClass("fa fa-caret-down");
			}
			else {
				$('#'+id+'-ul').slideUp("fast","swing");
				$('#'+id+' i').removeClass("fa-caret-down");
				$('#'+id+' i').addClass("fa fa-caret-right");
			}
		}
	}
}

function eventInstructorClick(thisId,instructorId, tenantBaseUrl) {
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getEventInstructorStatus(instructorId);
	}
	else {
		var url = tenantBaseUrl + "/show-event-instructor/"+ instructorId + "/leftTree";
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load( url, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(url, function() {
					$("#content").fadeTo(300, 1);
				});
			});
		}
	}
}

function topMenuCategoryClick(thisId,tag,tenantBaseUrl){
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getMenuCategoryStatus(tag);
	}
	else {
		var url = tenantBaseUrl + "/shop/show-top-menu-category/" + tag;
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load( url, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(url, function() {
					$("#content").fadeTo(300, 1);
				});
			});
		}
	}
}

function eventPlaceClick(thisId,placeId,tenantBaseUrl) {
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getEventPlaceStatus(placeId);
	}
	else {
		var url = tenantBaseUrl + "/show-event-place/"+ placeId + "/leftTree";
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load( url, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(url, function() {
					$("#content").fadeTo(300, 1);
				});
			});
		}
	}
}

function eventCourseClick(thisId,courseId,tenantBaseUrl) {
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getEventCourseStatus(courseId);
	}
	else {
		var url = tenantBaseUrl + "/show-event-course/"+ courseId;
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load( url, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(url, function() {
					$("#content").fadeTo(300, 1);
				});
			});
		}
	}
}

/**
 * 点击「カテゴリ 」, 展开或者收缩所有的"カテゴリ".
 * 
 * <p>详细说明： 点击「カテゴリ」，动态取得所有的"カテゴリ"生成<li></li>菜单.
 * @param listUrl： 取得所有カテゴリ的地址
 * @param menuParentUlId： 所有カテゴリ外围的<ul></ul>的ID
 * @param tenantBaseUrl： 显示カテゴリ详细的链接地址
*/
function productCategoryTopMenuClick(menuParentUlId, listUrl, tenantBaseUrl) {
	if ($('#' + menuParentUlId+'-ul').css("display") == 'none' || $('#' + menuParentUlId).html() == '') {
		var tmp = '';	
		if(menuParentUlId  == 'product-category-menu-in'){
			tmp = listUrl + "/" + 0;  
		}else{
			tmp = listUrl + "/" + menuParentUlId;
		}
		
		$.post(tmp, function(data) {
			var html = '';
			for (var i = 0; i < data.length; i++) {
				if (data[i].sizeFlag == 'Y') {
					html += "<li id = "+data[i].productCategoryId +" class>";
					html += "<a href=\"javascript: void(0)\" class=\"arrow\" onclick = \"productCategoryTopMenuClick("+data[i].productCategoryId+",'"+listUrl+"','"+tenantBaseUrl+"')\" ><i class='fa fa-caret-right'></i>" + data[i].productCategoryName + "</a>";
					html += "</li><ul id='"+data[i].productCategoryId+"-ul' style='display: none;padding-left: 10px;'></ul>";
				}
				else {
					html += "<li id = "+data[i].productCategoryId +">";
					html += "<a href=\"javascript: void(0)\" onclick = \"productCategoryTopMenuClick("+data[i].productCategoryId+",'"+listUrl+"','"+tenantBaseUrl+"')\" ><i class='fa fa-circle-o'></i>" + data[i].productCategoryName + "</a>";
					html += "</li><ul id='"+data[i].productCategoryId+"-ul' style='display: none;padding-left: 10px;'></ul>";
				}
			}
			
			if(menuParentUlId  == 'product-category-menu-in'){
				$('#' + menuParentUlId).html(html);
			}else{
				$('#' + menuParentUlId + '-ul').html(html);
				$('#' + menuParentUlId + '-ul').css('display','block');
				$('#' + menuParentUlId).children("a").children("i").removeClass("fa-caret-right").addClass("fa-caret-down");
			}
		});
		
		if (menuParentUlId  != 'product-category-menu-in') {
			showProductCategory(menuParentUlId, tmp,tenantBaseUrl);
		}
		
	}else{
		$('#' + menuParentUlId + '-ul').css('display','none');
		$('#' + menuParentUlId).children("a").children("i").removeClass("fa-caret-down").addClass("fa-caret-right");
	}
	
}

function showProductCategory(id, listUrlNew,tenantBaseUrl){
	var productCategoryId = id;
	var url = tenantBaseUrl + "/shop/show-product-category/"+ productCategoryId;
	if ('loginSuccess' != $("#mainPage").val() && $("#mainPage").val() != "") {
		getProductCategoryStatus(id);
	}
	else {
		if ($("#content").css("display") == "none") {
			$("#topmenu_contents_first_div").load( url, function() {
				$("#content:not(:animated)").slideDown(300, "swing");
			});
		}
		else {
			$("#content").fadeTo(300, 0, function() {
				$("#topmenu_contents_first_div").load(url, function() {
					$("#content").fadeTo(300, 1);
				});
			});
		}
		var size = $('#'+id+'-ul li').length;
		if (size >0){
			if($('#'+id+'-ul').css("display")=="none"){
				$('#'+id+'-ul').slideDown("fast","swing");
				$('#'+id+' i').removeClass("fa-caret-right");
				$('#'+id+' i').addClass("fa fa-caret-down");
			}
			else {
				$('#'+id+'-ul').slideUp("fast","swing");
				$('#'+id+' i').removeClass("fa-caret-down");
				$('#'+id+' i').addClass("fa fa-caret-right");
			}
		}
	}
}

