(function ($) {
	var defaults = {
		url: false,
		callback: false,
		on: 'click',
		touch: true,
		onZoomIn: false,
		onZoomOut: false,
		magnify: 1
	};

	// Core Zoom Logic, independent of event listeners.
	$.zoom = function(source, img, magnify) {
		var sourceHeight,
			sourceWidth,
			xRatio,
			yRatio,
			offset,
			$source = $(source);

		img.style.width = img.style.height = '';

		$(img)
			.css({
				position: 'absolute',
				top: 0,
				left: 0,
				width: img.naturalWidth * magnify,
				height: img.naturalHeight * magnify,
				border: 'none',
				maxWidth: 'none',
				maxHeight: 'none'
			});

		return {
			init: function() {
                sourceWidth = $source.outerWidth();
                sourceHeight = $source.outerHeight();

				xRatio = (img.width - sourceWidth) / sourceWidth;
				yRatio = (img.height - sourceHeight) / sourceHeight;

				offset = $source.offset();
			},
			move: function (e) {
				var left = (e.pageX - offset.left),
					top = (e.pageY - offset.top);
                
				top = Math.max(Math.min(top, sourceHeight), 0);
				left = Math.max(Math.min(left, sourceWidth), 0);

                var sourceleft = offset.left,
                    sourceright = sourceleft + sourceWidth,
                    sourceTop = offset.top,
                    sourceBottom = sourceTop + sourceHeight;
                if (e.pageX < sourceleft || e.pageX > sourceright || e.pageY < sourceTop || e.pageY > sourceBottom) return;
            
				if (sourceWidth < img.width * magnify && sourceHeight > img.height * magnify) {
					img.style.left = (left * -xRatio) + 'px';
					img.style.top = (sourceHeight - img.height)/2 + 'px';
				}
				else if (sourceWidth > img.width * magnify && sourceHeight < img.height * magnify) {
					img.style.left = (sourceWidth - img.width)/2 + 'px';
					img.style.top = (top * -yRatio) + 'px';
				}
				else {
					img.style.left = (left * -xRatio) + 'px';
					img.style.top = (top * -yRatio) + 'px';
				}
			}
		};
	};

	$.fn.zoom = function (options) {
		return this.each(function () {
			var
			settings = $.extend({}, defaults, options || {}),
			source = this,
			$source = $(source),
			img = $source.find('img')[0],
			$img = $(img),
			mousemove = 'mousemove.zoom',
			clicked = false,
			touched = false;
            
            var zoom,sourceImgWidth,sourceImgHeight,sourceImgLeft,sourceImgTop;
            $img.addClass('zoomImg');

			$source.one('zoom.destroy', function(){
                $source.off(".zoom");
                $img.removeClass('zoomImg');
			}.bind(this));

            function start(e) {
                zoom.init();
                zoom.move(e);

                $img.stop()
                .fadeTo($.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
            }

            function stop() {
                $img.stop()
                .fadeTo(zoomOut(), $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
                function zoomOut() {
                    img.style.width = sourceImgWidth;
                    img.style.height = sourceImgHeight;
                    img.style.left = sourceImgLeft;
                    img.style.top = sourceImgTop;
                }
            }

            // Mouse events
            if (settings.on === 'click') {
                $source.on('click.zoom',
                    function (e) {
                        if (clicked) {
                            // bubble the event up to the document to trigger the unbind.
                            return;
                        } else {
                            clicked = true;
                            sourceImgWidth = img.style.width;
                            sourceImgHeight = img.style.height;
                            sourceImgLeft = img.style.left;
                            sourceImgTop = img.style.top;
                            zoom = $.zoom(source, img, settings.magnify);
                            start(e);
                            $(document).on(mousemove, zoom.move);
                            $(document).one('click.zoom',
                                function () {
                                    stop();
                                    clicked = false;
                                    $(document).off(mousemove, zoom.move);
                                }
                            );
                            return false;
                        }
                    }
                );
            } 

            // Touch fallback
            if (settings.touch) {
                $source
                    .on('touchstart.zoom', function (e) {
                        e.preventDefault();
                        if (touched) {
                            touched = false;
                            stop();
                        } else {
                            touched = true;
                            sourceImgWidth = img.style.width;
                            sourceImgHeight = img.style.height;
                            sourceImgLeft = img.style.left;
                            sourceImgTop = img.style.top;
                            zoom = $.zoom(source, img, settings.magnify);
                            start( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
                        }
                    })
                    .on('touchmove.zoom', function (e) {
                        e.preventDefault();
                        zoom.move( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
                    })
                    .on('touchend.zoom', function (e) {
                        e.preventDefault();
                        if (touched) {
                            touched = false;
                            stop();
                        }
                    });
            }
            
            if ($.isFunction(settings.callback)) {
                settings.callback.call(img);
            }
		});
	};

	$.fn.zoom.defaults = defaults;
}(window.jQuery));
