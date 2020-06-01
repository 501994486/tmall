(function likeButton() {
	  var likeElm = document.createElement('span');
	  likeElm.innerHTML = '<span class="fb-like" data-action="like" data-href="' + window.location.href + '" data-layout="button_count" data-share="false" data-size="small"></span>';

	  window.addEventListener('load', function() {
	    document.querySelector('.item.facebook').appendChild(likeElm);

	    window.fbAsyncInit = function() {
	      FB.init({
	        appId      : 'XXXXXXXX',
	        xfbml      : true,
	        version    : 'v2.8'
	      });
	    };

	    (function(d, s, id) {
	      var js, fjs = d.getElementsByTagName(s)[0];
	      if (d.getElementById(id)) return;
	      js = d.createElement(s); js.id = id;
	      js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.8&appId=XXXXXXXX";
	      fjs.parentNode.insertBefore(js, fjs);
	    }(document, 'script', 'facebook-jssdk'));
	  });
	})();

(function tweetButton() {
	  window.addEventListener('load', function() {
	    var tweetElm = document.createElement('span');
	    tweetElm.innerHTML = '<a href="https://twitter.com/share" class="twitter-share-button" data-url="' + window.location.href + '" data-lang="ja">ツイート</a>';

	    document.querySelector('.item.twitter').appendChild(tweetElm);

	    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
	  });
	})();

(function plusoneButton() {
	  var scriptElm = document.createElement('script');
	  scriptElm.src = 'https://apis.google.com/js/platform.js';
	  scriptElm.innerHTML = "{lang: 'ja', parsetags: 'onload'}";
	  document.body.appendChild(scriptElm);

	  window.addEventListener('load', function() {
	    var gplusElm = document.createElement('span');
	    gplusElm.innerHTML = '<div class="g-plusone"></div>';

	    document.querySelector('.item.gplus').appendChild(gplusElm);

	    gapi.plusone.go();
	  });
	})();

function get_social_count_facebook(url, selector) {
	  jQuery.ajax({
	    url:'https://graph.facebook.com/',
	    dataType:'jsonp',
	    data:{
	      id:url
	    },
	    success:function(res){
	      if ( res.share && res.share.share_count ) {
	        jQuery( selector ).text( res.share.share_count );
	      } else {
	        jQuery( selector ).text( '0' );
	      }
	    },
	    error:function(){
	      jQuery( selector ).text('0');
	    }
	  });
	}

function get_social_count_twitter(url, selector) {
	  jQuery.ajax({
	  url:'http://urls.api.twitter.com/1/urls/count.json',
	  dataType:'jsonp',
	  data:{
	    url:url
	  },
	  success:function(res){
	    jQuery( selector ).text( res.count || 0 );
	  },
	  error:function(){
	    jQuery( selector ).text('0');
	  }
	  });
	}

function get_social_count_googleplus(url, selector) {
	  jQuery.ajax({
		    type: "get", dataType: "xml",
		    url: "http://query.yahooapis.com/v1/public/yql",
		    data: {
		        q: "SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
		        format: "xml",
		        env: "http://datatables.org/alltables.env"
		    },
		    success: function (data) {
		        var content = $(data).find("content").text();
		        var match = content.match(/window\.__SSR[\s*]=[\s*]{c:[\s*](\d+)/i);
		        var count = (match != null) ? match[1] : 0;

		        jQuery(selector).text(count);
	    }
	  });
	}


jQuery(function(){
//	get_social_count_facebook(window.location.href, '.facebook-count');
//	get_social_count_twitter(window.location.href, '.twitter-count');
//	get_social_count_googleplus(window.location.href, '.googleplus-count');
});