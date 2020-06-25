/*
 * jQuery ui dropppable Plugin
 * https://github.com/maxazan/jquery-ui-droppable-iframe
 *
 * Copyright 2015, Pomazan Maksym
 * Licensed under the MIT licenses.
 */
// Create new object to cache iframe offsets
$.ui.ddmanager.frameOffsets = {};
 
//Save native prepareOffsets method from ddmanager
var nativePrepareOffsets
if(typeof nativePrepareOffsets === 'undefined'){
	nativePrepareOffsets = $.ui.ddmanager.prepareOffsets;
}else{
	//nativePrepareOffsets = $.ui.ddmanager.prepareOffsets;
}
//Overrided prepareOffsets method
$.ui.ddmanager.prepareOffsets = function(t, event) {
    //Call parent method
    nativePrepareOffsets.apply(this, arguments);

    var m = $.ui.ddmanager.droppables[t.options.scope] || [];

    // ys added
    if (typeof t.options["isInIframe"] == 'boolean' && t.options["isInIframe"]) {
    	return false;
    }
    
    for (i = 0; i < m.length; i++) {
        
        //Iframe fixes
    	var doc = m[i].document[0];
        if (doc !== document && (doc.defaultView || doc.parentWindow) != null) {
            var iframe = $((doc.defaultView || doc.parentWindow).frameElement);
            var iframeOffset = iframe.offset();
            var el = m[i].element;

            //Check our droppable element is in the viewport of out iframe
            var viewport = {
                top: iframe.contents().scrollTop(),
                left: iframe.contents().scrollLeft()
            };
            viewport.right = viewport.left + iframe.width();
            viewport.bottom = viewport.top + iframe.height();

            var bounds = el.offset();
            bounds.right = bounds.left + el.outerWidth();
            bounds.bottom = bounds.top + el.outerHeight();
            if (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom)) {
                //In view port
                var ytop = bounds.top - iframe.contents().scrollTop();
                ytop = ytop < 0 ? 0 : ytop;
                var xtop = bounds.left - iframe.contents().scrollLeft();
                xtop = xtop < 0 ? 0 : xtop;
                var ybottom = bounds.top + el.height() - iframe.contents().scrollTop();
                ybottom = ybottom > iframe.height() ? iframe.height() : ybottom;
                var xbottom = bounds.left + el.width() - iframe.contents().scrollLeft();
                xbottom = xbottom > iframe.width() ? iframe.width() : xbottom;
                // if condition added
                if (m[i].hasOwnProperty('offset')) {
	                m[i].offset.top = iframeOffset.top + ytop;
	                m[i].offset.left = iframeOffset.left + xtop;
	                
	                if (m[i].element[0].id.indexOf('row-') != -1) {
	                	m[i].proportions({
		                	// 27 = 13(padding-left) + 14(padding-right) 
		                    width: xbottom - xtop + 27,
		                    height: ybottom - ytop,
		                });
	                }
	                else {
	                	m[i].proportions({
		                    width: xbottom - xtop,
		                    height: ybottom - ytop,
		                });	
	                }
                }
            } else {
                //Out of view port - skip
                m[i].proportions().height = 0;
                continue;
            }

        }

    }
};

$.ui.plugin.add("draggable", "iframeScroll", {
    drag: function(event, ui, i) {

        var o = i.options;
        var selector = o.iframeFix === true ? "iframe" : o.iframeFix;

        //check if mouse in scroll zone
        i.document.find(selector).each(function() {

            var scrolled = false;
            var iframeDocument;
            var iframe = $(this);
            var offset = iframe.offset();
            offset.width = iframe.width();
            offset.height = iframe.height();
            //Check scroll top
            if (offset.left < event.pageX && event.pageX < offset.left + offset.width) {
                if (offset.top < event.pageY && event.pageY < offset.top + o.scrollSensitivity) {
                    iframeDocument = iframe.contents();
                    scrolled = iframeDocument.scrollTop(iframeDocument.scrollTop() - o.scrollSpeed);
                }
            }
            //Check scroll down
            if (offset.left < event.pageX && event.pageX < offset.left + offset.width) {
                if ((offset.top + offset.height - o.scrollSensitivity) < event.pageY && event.pageY < offset.top + offset.height) {
                    iframeDocument = iframe.contents();
                    scrolled = iframeDocument.scrollTop(iframeDocument.scrollTop() + o.scrollSpeed);
                }
            }
            //Check scroll left
            if (offset.left < event.pageX && event.pageX < offset.left + o.scrollSensitivity) {
                if (offset.top < event.pageY && event.pageY < offset.top + offset.height) {
                    iframeDocument = iframe.contents();
                    scrolled = iframeDocument.scrollLeft(iframeDocument.scrollLeft() - o.scrollSpeed);
                }
            }
            //Check scroll right
            if ((offset.left + offset.width - o.scrollSensitivity) < event.pageX && event.pageX < offset.left + offset.width) {
                if (offset.top < event.pageY && event.pageY < offset.top + offset.height) {
                    iframeDocument = iframe.contents();
                    scrolled = iframeDocument.scrollLeft(iframeDocument.scrollLeft() + o.scrollSpeed);
                }
            }

            if (mouseWheelSupportFlag || scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(i, event);
                mouseWheelSupportFlag = false;
            }

            clearTimeout(i.scrollTimer);
            if (i._mouseStarted) {
                i.scrollTimer = setTimeout(function() {
                    //call drag trigger
                    i._trigger("drag", event);
                    //update offsets
                    if ($.ui.ddmanager) {
                        $.ui.ddmanager.drag(i, event);
                    }
                }, 10);
            }

        });
    },
    stop: function(event, ui, i) {
        clearInterval(i.scrollTimer);
    }
});

$.ui.plugin.add("draggable", "inIframeScroll", {
	drag: function(event, ui, i) {

		 //check if mouse in scroll zone
		var o = i.options,
		 	scrolled = false,
            iframe = $('#page-iframe'),
        	iframeDocument = iframe.contents(),
        	iframeScrollTop = iframeDocument.scrollTop(),
        	iframeScrollHeight = iframeDocument.height(),
        	iframeHeight = iframe.height(),
        	pgrowsHeight = iframeDocument.find('#pgrows').height();
		
		if (iframeScrollTop == 0 && event.clientY < o.scrollSpeed
				|| pgrowsHeight < iframeHeight) {
			clearTimeout(i.scrollTimer);
			return false;
		}
		
		// Check scroll bottom
		if (iframeHeight + iframeScrollTop == iframeScrollHeight) {
			scrolled = iframeDocument.scrollTop(iframeScrollTop - 1);
			event.pageY -= 1;
		}
		// Check scroll up
		else if (event.pageY < iframeScrollTop + o.scrollSpeed && event.clientY < o.scrollSpeed) {
			scrolled = iframeDocument.scrollTop(iframeScrollTop - o.scrollSpeed);
			event.pageY -= o.scrollSpeed;
		}
		// Check scroll down
		else if (iframeScrollTop + iframeHeight - o.scrollSpeed < event.pageY && event.pageY < pgrowsHeight
				&& event.clientY > iframeHeight - o.scrollSpeed) {
			scrolled = iframeDocument.scrollTop(iframeScrollTop + o.scrollSpeed);
			event.pageY += o.scrollSpeed;
		}
		
		clearTimeout(i.scrollTimer);
		if (i._mouseStarted) {
			ui.helper.css('top', event.clientY + iframeScrollTop + 2);
			if (scrolled !== false && event.pageY > 0) {
				ui.helper.css('top', event.pageY);
			}
			i.scrollTimer = setTimeout(function() {
				//call drag trigger
				i._trigger("drag", event);
				//update offsets
				if ($.ui.ddmanager) {
					$.ui.ddmanager.drag(i, event);
				}
			}, 50);
		}

	},
    stop: function(event, ui, i) {
        clearInterval(i.scrollTimer);
    }
});
