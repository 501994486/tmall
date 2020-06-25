(function($){

    $.fn.textareaExpander = function(options){
        
        var defaults = {
            minHeight: 'inherit',
            animate: true,
            animateDuration: 100
        };
        
        options = $.extend({}, defaults, options);
        
        var checkResize = function(){
            var $this = $(this),
                prevHeight = $this.height(),
                rowHeight = $this.css('fontSize'),
                newHeight = 0;

            $this.height(rowHeight);
            newHeight = this.scrollHeight;
            $this.height(prevHeight);

            if (newHeight < options.minHeight) {
                newHeight = options.minHeight;
            }
            
            // Sadly we cannot use feature detection for this,
            // since it isn't a feature but different behavior :(
            if (!$.browser.mozilla) {
                if ($this.css('paddingBottom') || $this.css('paddingTop')) {
                    var padInt = 
                        parseInt($this.css('paddingBottom').replace('px',''), 10)+
                        parseInt($this.css('paddingTop').replace('px',''), 10);
                    newHeight -= padInt;
                }
            }
            
            options.animate ? 
                $this.stop().animate({
                    height: newHeight
                }, options.animateDuration)
                : $this.height(newHeight);
        }
        
        return this.filter('textarea').each(function(){
            var $this = $(this);
            if (options.minHeight == 'inherit') {
                options.minHeight = $this.height();
            }
            $this
                .css({
                    resize: 'none',
                    overflowY: 'hidden',
                    overflowX: 'hidden'
                }).bind(
                    'expand keyup keydown change',
                    checkResize
                ).trigger('expand');
            return this;
        });
    };
})(jQuery);

$(function(){
    $('textarea').textareaExpander();
});