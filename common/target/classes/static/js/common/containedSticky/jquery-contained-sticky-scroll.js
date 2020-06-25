(function( $ ){

  $.fn.containedStickyScroll = function( options ) {
	
	var defaults = {  
		oSelector : this.selector,
		unstick : true,
		easing: 'linear',
		duration: 500,
		queue: false,
		closeChar: '^',
		closeTop: 0,
		closeRight: 0  
	};  
                  
	var options =  $.extend(defaults, options);
  
	if(options.unstick == true){  
		this.css('position','relative');
		this.append('<a class="scrollFixIt" style="display:none">' + options.closeChar + '</a>');
		jQuery(options.oSelector + ' .scrollFixIt').css('position','absolute');
		jQuery(options.oSelector + ' .scrollFixIt').css('top',options.closeTop + 'px');
		jQuery(options.oSelector + ' .scrollFixIt').css('right',options.closeTop + 'px');
		jQuery(options.oSelector + ' .scrollFixIt').css('cursor','pointer');
		jQuery(options.oSelector + ' .scrollFixIt').click(function() {
			getObject = options.oSelector;
			jQuery(getObject).animate({ top: "0px" },
				{ queue: options.queue, easing: options.easing, duration: options.duration });
			jQuery(window).unbind();
			jQuery('.scrollFixIt').remove();
		});
	} 
	
  	jQuery(window).scroll(function() {
  		
  		if (typeof stickyScrollSwitch == 'undefined' || stickyScrollSwitch) {
	  		getObject = options.oSelector;
	        if(jQuery(window).scrollTop() > (jQuery(getObject).parent().offset().top) &&
	           (jQuery(getObject).parent().height() + jQuery(getObject).parent().position().top - 30) > (jQuery(window).scrollTop() + jQuery(getObject).height())){
	        	jQuery(getObject).animate({ top: (jQuery(window).scrollTop() - jQuery(getObject).parent().offset().top + 16) + "px" }, 
	            { queue: options.queue, easing: options.easing, duration: options.duration });
	        }
	        else if(jQuery(window).scrollTop() < (jQuery(getObject).parent().offset().top)){
	        	jQuery(getObject).animate({ top: "0px" },
	            { queue: options.queue, easing: options.easing, duration: options.duration });
	        }
	        
	        stickyScrollSwitch = false;
  		}
  		else {
  			var st = $(this).scrollTop(),
  		        ysc = $('#YSContainer');
  		   	var nav = $("#navi"), navHeight=nav.height();
  			if ((typeof lastScrollTop != 'undefined' && st < lastScrollTop) || (ysc.height() < document.documentElement.clientHeight)){
  				getObject = options.oSelector;
  		        if(jQuery(window).scrollTop() > (jQuery(getObject).parent().offset().top) &&
  		           (jQuery(getObject).parent().height() + jQuery(getObject).parent().position().top - 30) > (jQuery(window).scrollTop() + jQuery(getObject).height())){
  		        	jQuery(getObject).animate({ top: (jQuery(window).scrollTop() - jQuery(getObject).parent().offset().top + 16 + navHeight) + "px" }, 
  		            { queue: options.queue, easing: options.easing, duration: options.duration });
  		        }
  		        else if(jQuery(window).scrollTop() < (jQuery(getObject).parent().offset().top)){
  		        	jQuery(getObject).animate({ top: "0px" },
  		            { queue: options.queue, easing: options.easing, duration: options.duration });
  		        }
  		        lastScrollTop = st;
  			}
  		}
  		
	});

  };
})( jQuery );
