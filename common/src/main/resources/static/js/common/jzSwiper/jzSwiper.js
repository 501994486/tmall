/**
 * Swiper slide plugin.
 * 
 * Usage:
 * <div class="jzc-swiper" data-slide-items="2" data-slide-gap="3">
 *   <div class="jzc-swiper__item"></div>
 * </div>
 * 
 * JS:
 * $('.jzc-swiper').jzSwiper();
 * 
 * data-slide-items="2": the number of items per page.
 * data-slide-gap="3px": spacing between two items in pixels.
 */
(function($) {
    $.fn.jzSwiper = function(options) {

        var optionDefaults = {
            hoverStyle: ''
        };
        var settings = $.extend({}, optionDefaults, options);
        
        this.each(function() {
            
            var dragWrapper = $(this);
            var startX, startTranslateX, positionLeft, rightX, moveX, preTime, idxTime, arrNext, arrPrev, progressbar, progressbarFill, isLeave, dragWrapperPadding = parseInt(dragWrapper.css('padding'));
            var dragWrapperWidth = dragWrapper.width();
            var dragWrapperItems = dragWrapper.find('.jzc-swiper__item');
            var $arrow = '<i class="fa fa-angle-left jzc-swiper__arr jzc-swiper__arr-prev"></i>'
                    + '<i class="fa fa-angle-right jzc-swiper__arr jzc-swiper__arr-next"></i>';
            var $progressbar = '<div class="jzc-swiper__progressbar"><div class="jzc-swiper__progressbar-fill"></div></div>';
            var dataSlideItems = parseInt(dragWrapper.attr('data-slide-items')),
                dataSlideGap = parseInt(dragWrapper.attr('data-slide-gap')) || 0;
            var $dragMask = '<div class="jzc-swiper__drag-mask"></div>';
            
            if (dragWrapper.length == 0 || dragWrapper.data('drag-init') == true) return;

            dragInit();
            var dragTarget = dragWrapper.find('.jzc-swiper__helper'),
                dragTargetWidth = dragTarget.outerWidth(),
                dragItemWidth = dragTarget.find('.jzc-swiper__item').outerWidth(),
                moveOverlay = dragWrapper.find('.jzc-swiper__drag-mask'),
                swiperArr = dragWrapper.find('.jzc-swiper__arr');
           
            selectEvent();
            if (dragWrapperItems.length <= dataSlideItems) return;
            dragTarget.on('mousedown.drag', start);  
            dragWrapper.on('mouseenter', enter);

            function dragInit() {
                dragWrapperItems.wrapAll('<div class="jzc-swiper__helper"></div>');
                dragWrapperItems.wrapInner('<div class="jzc-swiper__item-content"></div>');
                dragWrapperItems.find('img').wrap('<div class="jzc-swiper__photo-wrapper"></div>');

                if (dragWrapperItems.length > dataSlideItems) {
                    dragWrapper.append($arrow);
                    dragWrapper.append($progressbar);
                    arrNext = dragWrapper.find('.jzc-swiper__arr-next');
                    arrPrev = dragWrapper.find('.jzc-swiper__arr-prev');
                    progressbar = dragWrapper.find('.jzc-swiper__progressbar');
                    progressbarFill = progressbar.find('.jzc-swiper__progressbar-fill');
                    progressbarFill.css('width', dataSlideItems*100/dragWrapperItems.length + '%');
                    arrNext.attr('data-visible', true);
                }
                dragWrapper.append($dragMask);
                dragWrapper.data('drag-init', true);

                if (dataSlideGap || (typeof dataSlideGap == 'number')) {
                    dragWrapperItems.css({'marginRight': dataSlideGap + 'px', 'width': (dragWrapperWidth - dataSlideGap * (dataSlideItems - 1)) / dataSlideItems + 'px'});
                }
                else {
                    dragWrapperItems.css({'width': dragWrapperWidth / dataSlideItems + 'px'})
                }

                if (dragWrapperItems.length < dataSlideItems) {
                    var dragItemsFillWidth = dragWrapperItems.outerWidth();
                    dragWrapper.width(dragItemsFillWidth * dragWrapperItems.length + (dragWrapperItems.length - 1) * dataSlideGap);
                }

                if (settings.selectStyle === 'ribbon') {
                    dragWrapper.addClass('jzc-swiper--style-ribbon');
                }
            }

            function selectEvent() {
                var jzcSwiperRibbon = '<div class="jzc-swiper__ribbon"><span>選&nbsp;択</span></div>';
                dragWrapperItems.on('click', function() {
                    if (!settings.isSelectable) return;
                    
                    if ($(this).hasClass('selected')) return;

                    $('.jzc-swiper__item').removeClass('selected');
                    $(this).addClass('selected');

                    if (settings.selectStyle === 'ribbon') {
                        $('.jzc-swiper__ribbon').remove();
                        $(this).find('.jzc-swiper__item-content').append(jzcSwiperRibbon);
                    }

                    return false;
                });
            }

            function start(e) {
                if (event.button == 0) {
                    startX = e.pageX;
                    dragTarget = $(this);
                    dragWrapper = dragTarget.closest('.jzc-swiper');
                    startTranslateX = parseInt(dragTarget.css('left'));
                    preTime = new Date().getTime();
                    moveOverlay.hide();
                    $(document).on('mousemove.drag', move);  
                    $(document).on('mouseup.drag', end);   
                }
                
                return false;
            }

            function move(e){  
                moveX = e.pageX - startX; 
                positionLeft = dragTarget.position().left;
                rightX = dragTargetWidth - Math.abs(positionLeft) - dragWrapperWidth;
                if (moveX != 0) {
                    if (!moveOverlay.is(':visible')) {
                        moveOverlay.show();
                    }
                    progressbar.stop().animate({'opacity': 1}, 0).css('opacity', 1);
                }
                
                
                if (moveX > 0) {
                    // right
                    if (positionLeft > 0) {
                        dragTarget.css('left', (moveX + startTranslateX) * 0.2 + 'px');
                    }
                    else {
                        dragTarget.css('left', (moveX + startTranslateX) + 'px');
                    }
                }
                else {
                    // left
                    if (rightX < 0) {
                        dragTarget.css('left', -(dragTargetWidth - dragWrapperWidth) + moveX * 0.2 + 'px');
                    }
                    else {
                        dragTarget.css('left', (moveX + startTranslateX) + 'px');
                    }
                }

                if (positionLeft < 0) {
                    var progressNum = (Math.abs(positionLeft) + dragWrapperPadding + dragWrapperWidth) / dragTargetWidth;
                    progressbarFill.css('width', progressNum * 100 + '%');
                }

                return false;
            }  
            
            function end(e){  
                moveOverlay.hide();

                if ((e.pageX - startX) == 0) {
                    $(document).off('mousemove.drag', move);  
                    $(document).off('mouseup.drag', end); 
                    return;
                };
                idxTime = new Date().getTime();
                var animateTime = idxTime - preTime < 200 ? idxTime - preTime : 200;
                var left;
                swiperArr.attr('data-visible', true).addClass('arr-active');

                if (positionLeft > 0) {
                    left = 0;
                    dragTarget.stop().animate({'left': left}, 300, 'swing');
                    arrPrev.removeAttr('data-visible').removeClass('arr-active');
                }
                else if (rightX < 0) {
                    left = -(dragTargetWidth - dragWrapperWidth);
                    dragTarget.stop().animate({'left': left}, 300, 'swing');
                    arrNext.removeAttr('data-visible').removeClass('arr-active');
                }
                else if (moveX < 0 && dragTargetWidth - Math.abs(positionLeft) > dragWrapperWidth) {
                    var idxLeft = parseInt(dragTarget.css('left'));
                    var num = Math.ceil(Math.abs(idxLeft) / dragItemWidth);
                    left = dragTargetWidth - (dragItemWidth * num + parseInt(dataSlideGap) * num) < dragWrapperWidth ? -(dragTargetWidth - dragWrapperWidth) : -(dragItemWidth * num + parseInt(dataSlideGap) * num);;
                    dragTarget.stop().animate({'left': left}, animateTime, 'swing');
                    if (left == dragWrapperWidth - dragTargetWidth) {
                        arrNext.removeAttr('data-visible').removeClass('arr-active');
                    }
                }
                else if (moveX > 0 && positionLeft < 0) {
                    var idxLeft = parseInt(dragTarget.css('left'));
                    var num = Math.floor(Math.abs(idxLeft) / dragItemWidth);
                    num = Math.floor((Math.abs(idxLeft) - dataSlideGap * (num - 1)) / dragItemWidth);
                    left = -(dragItemWidth * num + parseInt(dataSlideGap) * num);
                    dragTarget.stop().animate({'left': left}, animateTime, 'swing');
                    if (left == 0) {
                        arrPrev.removeAttr('data-visible').removeClass('arr-active');
                    }
                }
                else {
                    if (moveX > 0) {
                        left = 0;
                        dragTarget.stop().animate({'left': left}, 300, 'swing');
                        arrPrev.removeAttr('data-visible').removeClass('arr-active');
                    }
                    else if (moveX < 0) {
                        left = -(dragTargetWidth - dragWrapperWidth);
                        dragTarget.stop().animate({'left': left}, 300, 'swing');
                        arrNext.removeAttr('data-visible').removeClass('arr-active');
                    }
                }

                if (isLeave) {swiperArr.removeClass('arr-active');}

                var progressNum = (Math.floor(Math.abs(left) / dragItemWidth) + dataSlideItems) / dragWrapperItems.length;
                progressbarFill.css('width', progressNum * 100 + '%');
                progressbar.stop().animate({'opacity': 0}, 1500);
                
                $(document).off('mousemove.drag', move);  
                $(document).off('mouseup.drag', end);  

                return false;
            }

            function enter() {
                $(this).find('.jzc-swiper__arr').each(function() {
                    if ($(this).attr('data-visible') == 'true') {
                        $(this).addClass('arr-active');
                    }
                });
                isLeave = false;
                $(this).on('mouseleave', leave);
            }

            function leave() {
                isLeave = true;
                $(this).find('.jzc-swiper__arr').removeClass('arr-active');
            }

            var isSlideEnd = true;
            swiperArr.off('click').on('click', function() {
                var dragWrapper = $(this).closest('.jzc-swiper');
                var dragTarget = dragWrapper.find('.jzc-swiper__helper');
                var dragItemsGap = dragWrapper.attr('data-slide-gap') || 0;
                var dragItemWidth = dragWrapper.find('.jzc-swiper__item').outerWidth() + parseInt(dragItemsGap);
                positionLeft = dragTarget.position().left; 
                progressbar.stop().animate({'opacity': 1}, 0).css('opacity', 1);

                if ($(this).hasClass('jzc-swiper__arr-next')) {
                    var left = Math.abs(positionLeft - dragWrapperWidth) > dragTargetWidth - dragWrapperWidth ? -(dragTargetWidth - dragWrapperWidth) : positionLeft - dragItemWidth - dragWrapperPadding;
                    if (!isSlideEnd) return;
                    isSlideEnd = false;
                    dragTarget.stop().animate({'left': left}, 300, 'swing', function() {
                        isSlideEnd = true;
                    });
                    swiperArr.attr('data-visible', true);
                    if (left == dragWrapperWidth - dragTargetWidth) {
                        arrNext.removeAttr('data-visible').removeClass('arr-active');
                    }
                    arrPrev.addClass('arr-active');
                }
                else if ($(this).hasClass('jzc-swiper__arr-prev')) {
                    var left = positionLeft + dragWrapperWidth > dragWrapperPadding ? 0 : positionLeft + dragItemWidth - dragWrapperPadding;
                    if (!isSlideEnd) return;
                    isSlideEnd = false;
                    dragTarget.stop().animate({'left': left}, 300, 'swing', function() {
                        isSlideEnd = true;
                    });
                    swiperArr.attr('data-visible', true);
                    if (left == 0) {
                        arrPrev.removeAttr('data-visible').removeClass('arr-active');
                    }
                    arrNext.addClass('arr-active');
                }

                var progressNum = (Math.floor(Math.abs(left) / dragItemWidth) + dataSlideItems) / dragWrapperItems.length;
                progressbarFill.css('width', progressNum * 100 + '%');
                progressbar.stop().animate({'opacity': 0}, 1500);

                return false;
            });

        });
    };
})(jQuery);
