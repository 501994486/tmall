!function(n){var o={};function i(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=n,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e){t.exports=jQuery},function(t,e,n){t.exports=n(9)},function(t,a,e){(function(t){var e,n,o,i;function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}i=function(){return function(n){var o={};function i(t){if(o[t])return o[t].exports;var e=o[t]={exports:{},id:t,loaded:!1};return n[t].call(e.exports,e,e.exports,i),e.loaded=!0,e.exports}return i.m=n,i.c=o,i.p="",i(0)}([function(t,e){"use strict";t.exports=function(){if("undefined"==typeof document||"undefined"==typeof window)return{ask:function(){return"initial"},element:function(){return null},ignoreKeys:function(){},specificKeys:function(){},registerOnChange:function(){},unRegisterOnChange:function(){}};var e=document.documentElement,n=null,s="initial",c=s;try{window.sessionStorage.getItem("what-input")&&(s=window.sessionStorage.getItem("what-input")),window.sessionStorage.getItem("what-intent")&&(c=window.sessionStorage.getItem("what-intent"))}catch(e){}var o=null,l=["input","select","textarea"],i=[],d=[16,17,18,91,93],u=[],f={keydown:"keyboard",keyup:"keyboard",mousedown:"mouse",mousemove:"mouse",MSPointerDown:"pointer",MSPointerMove:"pointer",pointerdown:"pointer",pointermove:"pointer",touchstart:"touch"},p=!1,r=!1,a={x:null,y:null},h={2:"touch",3:"touch",4:"mouse"},t=!1;try{var m=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,m)}catch(e){}var g,w=function(t){if(!p){var e=t.which,n=f[t.type];"pointer"===n&&(n=j(t));var o=!u.length&&-1===d.indexOf(e),i=u.length&&-1!==u.indexOf(e),r="keyboard"===n&&e&&(o||i)||"mouse"===n||"touch"===n;if(s!==n&&r){s=n;try{window.sessionStorage.setItem("what-input",s)}catch(t){}v("input")}if(c!==n&&r){var a=document.activeElement;if(a&&a.nodeName&&-1===l.indexOf(a.nodeName.toLowerCase())){c=n;try{window.sessionStorage.setItem("what-intent",c)}catch(t){}v("intent")}}}},v=function(t){e.setAttribute("data-what"+t,"input"===t?s:c),C(t)},y=function(t){if(k(t),!p&&!r){var e=f[t.type];if("pointer"===e&&(e=j(t)),c!==e){c=e;try{window.sessionStorage.setItem("what-intent",c)}catch(t){}v("intent")}}},z=function(t){t.target.nodeName?(n=t.target.nodeName.toLowerCase(),e.setAttribute("data-whatelement",n),t.target.classList&&t.target.classList.length&&e.setAttribute("data-whatclasses",t.target.classList.toString().replace(" ",","))):b()},b=function(){n=null,e.removeAttribute("data-whatelement"),e.removeAttribute("data-whatclasses")},_=function(t){w(t),window.clearTimeout(o),p=!0,o=window.setTimeout(function(){p=!1},100)},j=function(t){return"number"==typeof t.pointerType?h[t.pointerType]:"pen"===t.pointerType?"touch":t.pointerType},$=function(){return"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"},C=function(t){for(var e=0,n=i.length;e<n;e++)i[e].type===t&&i[e].fn.call(void 0,"input"===t?s:c)},k=function(t){a.x!==t.screenX||a.y!==t.screenY?(r=!1,a.x=t.screenX,a.y=t.screenY):r=!0};return"addEventListener"in window&&Array.prototype.indexOf&&(f[$()]="mouse",g=!!t&&{passive:!0},window.PointerEvent?(window.addEventListener("pointerdown",w),window.addEventListener("pointermove",y)):window.MSPointerEvent?(window.addEventListener("MSPointerDown",w),window.addEventListener("MSPointerMove",y)):(window.addEventListener("mousedown",w),window.addEventListener("mousemove",y),"ontouchstart"in window&&(window.addEventListener("touchstart",_,g),window.addEventListener("touchend",w))),window.addEventListener($(),y,g),window.addEventListener("keydown",_),window.addEventListener("keyup",_),window.addEventListener("focusin",z),window.addEventListener("focusout",b),v("input"),v("intent")),{ask:function(t){return"intent"===t?c:s},element:function(){return n},ignoreKeys:function(t){d=t},specificKeys:function(t){u=t},registerOnChange:function(t,e){i.push({fn:t,type:e||"input"})},unRegisterOnChange:function(t){var e=function(t){for(var e=0,n=i.length;e<n;e++)if(i[e].fn===t)return e}(t);(e||0===e)&&i.splice(e,1)}}}()}])},"object"===r(a)&&"object"===r(t)?t.exports=i():(n=[],void 0===(o="function"==typeof(e=i)?e.apply(a,n):e)||(t.exports=o))}).call(this,e(3)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e){window.jz={vCommon:{responsive:1},vComponent:{button:{isButtonExist:!1},dropdown:{isDropDownExist:!1},accordion:{isAccordionExist:!1},clickLink:{isClickLinkExist:!1},infiniteScroll:{prevPageNum:1,nextPageNum:1,noMoreData:!1},dialog:{timer:null}},vContact:{inputRadio:{isGuesterInputRadioExist:!1,isResponderInputRadioExist:!1}},vOnlineshop:{},vConstant:{DATA_INIT_YES:1},vTab:{ids:[]},vAccordion:{ids:[]},vClickArea:{ids:[]},vButton:{ids:[]},vDropdown:{ids:[]},vFotorama:{ids:[]}}},function(module,exports){jz.infiniteScroll=function(options){var url=location.href,pageByUrl=getParameterByName("page"),isScroll=!0,scrollIdx=0,scrollPre=0,timerScroll=null,timerPrevious=null,optionDefaults={afterPageLoad:""},thisOptions=$.extend({},optionDefaults,options),loader=$('<div class="loader-ellips"><span class="loader-ellips__dot"></span><span class="loader-ellips__dot"></span><span class="loader-ellips__dot"></span><span class="loader-ellips__dot"></span></div>');function init(){var t=jz.vComponent.infiniteScroll.noMoreData;if(hasBlankArea()&&!t){var e=++jz.vComponent.infiniteScroll.nextPageNum,n=changeURLArg(url,"page",e);$(".jzc-page:last").after('<div class="jzc-page" data-page="'+e+'"></div>'),$(".jzc-page:last").load(n+"&mco=Y",function(t,e){if("success"==e)0!=$(".jzc-page:last").find(".end-page").length&&(parseInt($(".jzc-page:last").attr("data-page"))==parseInt($(".jzc-page:first").attr("data-page"))+1&&$(".jzc-page:last").find(".end-page").hide(),jz.vComponent.infiniteScroll.noMoreData=!0),hasObjectFitImages(".jzc-page:last"),afterPageLoad($(".jzc-page:last")),isTruncated(".jzc-page:last"),init();else if("error"==e)return void $(".jzc-page:last").remove()})}}function hasObjectFitImages(t){var e=$(t+" img.object-fit-images");0<e.length&&objectFitImages(e)}function isTruncated(t){var e=$(t+" .dotdotdot");0<e.length&&e.dotdotdot({watch:!0})}function afterPageLoad(t){if(0<thisOptions.afterPageLoad.length){var e=thisOptions.afterPageLoad;"string"==typeof e&&"function"==typeof window[e]&&window[e](t)}}function hasBlankArea(){return 0<$(window).height()-($(".jzc-page:last").offset().top+$(".jzc-page:last").height())}function changeURLArg(url,arg,arg_val){var pattern=arg+"=([^&]*)",replaceText=arg+"="+arg_val;if(url.match(pattern)){var tmp="/("+arg+"=)([^&]*)/gi";return tmp=url.replace(eval(tmp),replaceText),tmp}return url.match("[?]")?url+"&"+replaceText:url+"?"+replaceText}function getParameterByName(t,e){e||(e=window.location.href),t=t.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(e);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function changeUrl(t){var e=changeURLArg(location.href,"page",t);return history.replaceState(null,null,e),!1}$(".jzc-page").parent().append(loader),pageByUrl&&(jz.vComponent.infiniteScroll.nextPageNum=parseInt(pageByUrl),jz.vComponent.infiniteScroll.prevPageNum=parseInt(pageByUrl)),init(),$(window).off("scroll").on("scroll",function(){if(scrollIdx=$(this).scrollTop(),$(window).scrollTop()>=$(document).height()-$(window).height()-300&&!jz.vComponent.infiniteScroll.noMoreData&&isScroll){isScroll=!1;var t=++jz.vComponent.infiniteScroll.nextPageNum,e=changeURLArg(url,"page",t);$(".loader-ellips").show(),$(".jzc-page:last").after('<div class="jzc-page" data-page="'+t+'"></div>'),$(".jzc-page:last").load(e+"&mco=Y",function(t,e){if("success"==e)0!=$(".jzc-page:last").find(".end-page").length&&(jz.vComponent.infiniteScroll.noMoreData=!0),$(".loader-ellips").hide(),hasObjectFitImages(".jzc-page:last"),afterPageLoad($(".jzc-page:last")),isTruncated(".jzc-page:last"),isScroll=!0;else if("error"==e)return void $(".jzc-page:last").remove()})}scrollIdx<scrollPre&&1<parseInt($(".jzc-page:first").attr("data-page"))&&0==$(".jzc-page:first").find(".end-page").length&&$(window).scrollTop()<=300&&isScroll&&(isScroll=!1,t=--jz.vComponent.infiniteScroll.prevPageNum,e=changeURLArg(url,"page",t),$(".jzc-page:first").before('<div class="jzc-page" data-page="'+t+'"></div>'),$(".jzc-page:first").load(e+"&mco=Y",function(t,e){if("success"==e)clearTimeout(timerPrevious),timerPrevious=setTimeout(function(){var t=$(".jzc-page:first").height();$(window).scrollTop($(window).scrollTop()+t),hasObjectFitImages(".jzc-page:first"),afterPageLoad($(".jzc-page:first")),isTruncated(".jzc-page:first"),isScroll=!0},200);else if("error"==e)return void $(".jzc-page:first").remove()})),setTimeout(function(){scrollPre=scrollIdx},0),$(".jzc-page-item").each(function(){var t=$(window).scrollTop(),e=t+50,n=$(this).offset().top;if(t<n&&n<e){var o=$(this).closest(".jzc-page").attr("data-page");clearTimeout(timerScroll),timerScroll=setTimeout(function(){changeUrl(o)},100)}})})}},function(t,e){var d,u,f,n;jz.getImageSize=(d=[],u=null,f=function(){for(var t=0;t<d.length;t++)d[t].end?d.splice(t--,1):d[t]();!d.length&&n()},n=function(){clearInterval(u),u=null},function(t,e,n,o){var i,r,a,s,c,l=new Image;if(l.src=t,l.complete)return e.call(l),void(n&&n.call(l));r=l.width,a=l.height,l.onerror=function(){o&&o.call(l),i.end=!0,l=l.onload=l.onerror=null},(i=function(){s=l.width,c=l.height,(s!==r||c!==a||1024<s*c)&&(e.call(l),i.end=!0)})(),l.onload=function(){!i.end&&i(),n&&n.call(l),l=l.onload=l.onerror=null},i.end||(d.push(i),null===u&&(u=setInterval(f,40)))})},function(t,e){jz.news=function(){var o,i,t=$(".jzp-news");0<t.length&&(o=parseInt(t.attr("data-item-num-pc")),i=parseInt(t.attr("data-item-num-sp")),Foundation.MediaQuery.atLeast("medium")?$(".jzp-news__list-item").filter(function(t){return t<o}).show():Foundation.MediaQuery.is("small only")&&$(".jzp-news__list-item").filter(function(t){return t<i}).show(),$(window).on("changed.zf.mediaquery",function(t,e,n){"medium"==e?$(".jzp-news__list-item").hide().filter(function(t){return t<o}).show():"small"==e&&$(".jzp-news__list-item").hide().filter(function(t){return t<i}).show()}))}},function(t,e){$(document).on("click",function(){var t=$(".jzc-dropdown");0<t.length&&(t.find(".jzc-dropdown-body").css({"max-height":"none"}).hide(),t.blur(),t.removeClass("jzc-dropdown--selected"))})},function(t,e,n){"use strict";n.r(e);var o=n(0),c=n.n(o);function s(){return"rtl"===c()("html").attr("dir")}function i(t,e){return t=t||6,Math.round(Math.pow(36,t+1)-Math.random()*Math.pow(36,t)).toString(36).slice(1)+(e?"-".concat(e):"")}function l(t){var e,n={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},o=document.createElement("div");for(var i in n)void 0!==o.style[i]&&(e=n[i]);return e||(e=setTimeout(function(){t.triggerHandler("transitionend",[t])},1),"transitionend")}function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}n(2),window.matchMedia||(window.matchMedia=function(){var e=window.styleMedia||window.media;if(!e){var n,o=document.createElement("style"),t=document.getElementsByTagName("script")[0];o.type="text/css",o.id="matchmediajs-test",t?t.parentNode.insertBefore(o,t):document.head.appendChild(o),n="getComputedStyle"in window&&window.getComputedStyle(o,null)||o.currentStyle,e={matchMedium:function(t){var e="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return o.styleSheet?o.styleSheet.cssText=e:o.textContent=e,"1px"===n.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());var a={queries:[],current:"",_init:function(){c()("meta.foundation-mq").length||c()('<meta class="foundation-mq">').appendTo(document.head);var t,e,n,o=c()(".foundation-mq").css("font-family");for(var i in n=void 0,n={},t="string"!=typeof(e=o)?n:(e=e.trim().slice(1,-1))?e.split("&").reduce(function(t,e){var n=e.replace(/\+/g," ").split("="),o=n[0],i=n[1];return o=decodeURIComponent(o),i=void 0===i?null:decodeURIComponent(i),t.hasOwnProperty(o)?Array.isArray(t[o])?t[o].push(i):t[o]=[t[o],i]:t[o]=i,t},{}):n)t.hasOwnProperty(i)&&this.queries.push({name:i,value:"only screen and (min-width: ".concat(t[i],")")});this.current=this._getCurrentSize(),this._watcher()},atLeast:function(t){var e=this.get(t);return!!e&&window.matchMedia(e).matches},is:function(t){return 1<(t=t.trim().split(" ")).length&&"only"===t[1]?t[0]===this._getCurrentSize():this.atLeast(t[0])},get:function(t){for(var e in this.queries)if(this.queries.hasOwnProperty(e)){var n=this.queries[e];if(t===n.name)return n.value}return null},_getCurrentSize:function(){for(var t,e=0;e<this.queries.length;e++){var n=this.queries[e];window.matchMedia(n.value).matches&&(t=n)}return"object"===r(t)?t.name:t},_watcher:function(){var n=this;c()(window).off("resize.zf.mediaquery").on("resize.zf.mediaquery",function(){var t=n._getCurrentSize(),e=n.current;t!==e&&(n.current=t,c()(window).trigger("changed.zf.mediaquery",[t,e]))})}};function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var u={version:"6.5.3",_plugins:{},_uuids:[],plugin:function(t,e){var n=e||f(t),o=p(n);this._plugins[o]=this[n]=t},registerPlugin:function(t,e){var n=e?p(e):f(t.constructor).toLowerCase();t.uuid=i(6,n),t.$element.attr("data-".concat(n))||t.$element.attr("data-".concat(n),t.uuid),t.$element.data("zfPlugin")||t.$element.data("zfPlugin",t),t.$element.trigger("init.zf.".concat(n)),this._uuids.push(t.uuid)},unregisterPlugin:function(t){var e=p(f(t.$element.data("zfPlugin").constructor));for(var n in this._uuids.splice(this._uuids.indexOf(t.uuid),1),t.$element.removeAttr("data-".concat(e)).removeData("zfPlugin").trigger("destroyed.zf.".concat(e)),t)t[n]=null},reInit:function(t){var e=t instanceof c.a;try{if(e)t.each(function(){c()(this).data("zfPlugin")._init()});else{var n=d(t),o=this;({object:function(t){t.forEach(function(t){t=p(t),c()("[data-"+t+"]").foundation("_init")})},string:function(){t=p(t),c()("[data-"+t+"]").foundation("_init")},undefined:function(){this.object(Object.keys(o._plugins))}})[n](t)}}catch(t){console.error(t)}finally{return t}},reflow:function(o,t){void 0===t?t=Object.keys(this._plugins):"string"==typeof t&&(t=[t]);var i=this;c.a.each(t,function(t,e){var n=i._plugins[e];c()(o).find("[data-"+e+"]").addBack("[data-"+e+"]").each(function(){var t=c()(this),i={};if(t.data("zfPlugin"))console.warn("Tried to initialize "+e+" on an element that already has a Foundation plugin.");else{t.attr("data-options")&&t.attr("data-options").split(";").forEach(function(t,e){var n,o=t.split(":").map(function(t){return t.trim()});o[0]&&(i[o[0]]="true"===(n=o[1])||"false"!==n&&(isNaN(1*n)?n:parseFloat(n)))});try{t.data("zfPlugin",new n(c()(this),i))}catch(t){console.error(t)}finally{return}}})})},getFnName:f,addToJquery:function(r){return r.fn.foundation=function(n){var t=d(n),e=r(".no-js");if(e.length&&e.removeClass("no-js"),"undefined"===t)a._init(),u.reflow(this);else{if("string"!==t)throw new TypeError("We're sorry, ".concat(t," is not a valid parameter. You must use a string representing the method you wish to invoke."));var o=Array.prototype.slice.call(arguments,1),i=this.data("zfPlugin");if(void 0===i||void 0===i[n])throw new ReferenceError("We're sorry, '"+n+"' is not an available method for "+(i?f(i):"this element")+".");1===this.length?i[n].apply(i,o):this.each(function(t,e){i[n].apply(r(e).data("zfPlugin"),o)})}return this},r}};function f(t){if(void 0!==Function.prototype.name)return void 0===t.prototype?t.constructor.name:t.prototype.constructor.name;var e=/function\s([^(]{1,})\(/.exec(t.toString());return e&&1<e.length?e[1].trim():""}function p(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}u.util={throttle:function(n,o){var i=null;return function(){var t=this,e=arguments;null===i&&(i=setTimeout(function(){n.apply(t,e),i=null},o))}}},window.Foundation=u,function(){Date.now&&window.Date.now||(window.Date.now=Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var n=t[e];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var o=0;window.requestAnimationFrame=function(t){var e=Date.now(),n=Math.max(o+16,e);return setTimeout(function(){t(o=n)},n-e)},window.cancelAnimationFrame=clearTimeout}window.performance&&window.performance.now||(window.performance={start:Date.now(),now:function(){return Date.now()-this.start}})}(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,o=function(){},i=function(){return n.apply(this instanceof o?this:t,e.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(o.prototype=this.prototype),i.prototype=new o,i});var h={ImNotTouchingYou:function(t,e,n,o,i){return 0===m(t,e,n,o,i)},OverlapArea:m,GetDimensions:g,GetOffsets:function(t,e,n,o,i,r){switch(console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5"),n){case"top":return s()?w(t,e,"top","left",o,i,r):w(t,e,"top","right",o,i,r);case"bottom":return s()?w(t,e,"bottom","left",o,i,r):w(t,e,"bottom","right",o,i,r);case"center top":return w(t,e,"top","center",o,i,r);case"center bottom":return w(t,e,"bottom","center",o,i,r);case"center left":return w(t,e,"left","center",o,i,r);case"center right":return w(t,e,"right","center",o,i,r);case"left bottom":return w(t,e,"bottom","left",o,i,r);case"right bottom":return w(t,e,"bottom","right",o,i,r);case"center":return{left:$eleDims.windowDims.offset.left+$eleDims.windowDims.width/2-$eleDims.width/2+i,top:$eleDims.windowDims.offset.top+$eleDims.windowDims.height/2-($eleDims.height/2+o)};case"reveal":return{left:($eleDims.windowDims.width-$eleDims.width)/2+i,top:$eleDims.windowDims.offset.top+o};case"reveal full":return{left:$eleDims.windowDims.offset.left,top:$eleDims.windowDims.offset.top};default:return{left:s()?$anchorDims.offset.left-$eleDims.width+$anchorDims.width-i:$anchorDims.offset.left+i,top:$anchorDims.offset.top+$anchorDims.height+o}}},GetExplicitOffsets:w};function m(t,e,n,o,i){var r,a,s,c,l=g(t);if(e){var d=g(e);a=d.height+d.offset.top-(l.offset.top+l.height),r=l.offset.top-d.offset.top,s=l.offset.left-d.offset.left,c=d.width+d.offset.left-(l.offset.left+l.width)}else a=l.windowDims.height+l.windowDims.offset.top-(l.offset.top+l.height),r=l.offset.top-l.windowDims.offset.top,s=l.offset.left-l.windowDims.offset.left,c=l.windowDims.width-(l.offset.left+l.width);return a=i?0:Math.min(a,0),r=Math.min(r,0),s=Math.min(s,0),c=Math.min(c,0),n?s+c:o?r+a:Math.sqrt(r*r+a*a+s*s+c*c)}function g(t){if((t=t.length?t[0]:t)===window||t===document)throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");var e=t.getBoundingClientRect(),n=t.parentNode.getBoundingClientRect(),o=document.body.getBoundingClientRect(),i=window.pageYOffset,r=window.pageXOffset;return{width:e.width,height:e.height,offset:{top:e.top+i,left:e.left+r},parentDims:{width:n.width,height:n.height,offset:{top:n.top+i,left:n.left+r}},windowDims:{width:o.width,height:o.height,offset:{top:i,left:r}}}}function w(t,e,n,o,i,r,a){var s,c,l=g(t),d=e?g(e):null;switch(n){case"top":s=d.offset.top-(l.height+i);break;case"bottom":s=d.offset.top+d.height+i;break;case"left":c=d.offset.left-(l.width+r);break;case"right":c=d.offset.left+d.width+r}switch(n){case"top":case"bottom":switch(o){case"left":c=d.offset.left+r;break;case"right":c=d.offset.left-l.width+d.width-r;break;case"center":c=a?r:d.offset.left+d.width/2-l.width/2+r}break;case"right":case"left":switch(o){case"bottom":s=d.offset.top-i+d.height-l.height;break;case"top":s=d.offset.top+i;break;case"center":s=d.offset.top+i+d.height/2-l.height/2}}return{top:s,left:c}}var v={9:"TAB",13:"ENTER",27:"ESCAPE",32:"SPACE",35:"END",36:"HOME",37:"ARROW_LEFT",38:"ARROW_UP",39:"ARROW_RIGHT",40:"ARROW_DOWN"},y={};function z(t){return!!t&&t.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function(){return!(!c()(this).is(":visible")||c()(this).attr("tabindex")<0)})}function b(t){var e=v[t.which||t.keyCode]||String.fromCharCode(t.which).toUpperCase();return e=e.replace(/\W+/,""),t.shiftKey&&(e="SHIFT_".concat(e)),t.ctrlKey&&(e="CTRL_".concat(e)),t.altKey&&(e="ALT_".concat(e)),e.replace(/_$/,"")}var _={keys:function(t){var e={};for(var n in t)e[t[n]]=t[n];return e}(v),parseKey:b,handleKey:function(t,e,n){var o,i=y[e],r=this.parseKey(t);if(!i)return console.warn("Component not defined!");if((o=n[(void 0===i.ltr?i:s()?c.a.extend({},i.ltr,i.rtl):c.a.extend({},i.rtl,i.ltr))[r]])&&"function"==typeof o){var a=o.apply();(n.handled||"function"==typeof n.handled)&&n.handled(a)}else(n.unhandled||"function"==typeof n.unhandled)&&n.unhandled()},findFocusable:z,register:function(t,e){y[t]=e},trapFocus:function(t){var e=z(t),n=e.eq(0),o=e.eq(-1);t.on("keydown.zf.trapfocus",function(t){t.target===o[0]&&"TAB"===b(t)?(t.preventDefault(),n.focus()):t.target===n[0]&&"SHIFT_TAB"===b(t)&&(t.preventDefault(),o.focus())})},releaseFocus:function(t){t.off("keydown.zf.trapfocus")}},j=["mui-enter","mui-leave"],C=["mui-enter-active","mui-leave-active"],k={animateIn:function(t,e,n){L(!0,t,e,n)},animateOut:function(t,e,n){L(!1,t,e,n)}};function L(t,e,n,o){if((e=c()(e).eq(0)).length){var i=t?j[0]:j[1],r=t?C[0]:C[1];a(),e.addClass(n).css("transition","none"),requestAnimationFrame(function(){e.addClass(i),t&&e.show()}),requestAnimationFrame(function(){e[0].offsetWidth,e.css("transition","").addClass(r)}),e.one(l(e),function(){t||e.hide(),a(),o&&o.apply(e)})}function a(){e[0].style.transitionDuration=0,e.removeClass("".concat(i," ").concat(r," ").concat(n))}}var S={Feather:function(t){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"zf";t.attr("role","menubar");var e=t.find("li").attr({role:"menuitem"}),o="is-".concat(n,"-submenu"),i="".concat(o,"-item"),r="is-".concat(n,"-submenu-parent"),a="accordion"!==n;e.each(function(){var t=c()(this),e=t.children("ul");e.length&&(t.addClass(r),a&&(t.attr({"aria-haspopup":!0,"aria-label":t.children("a:first").text()}),"drilldown"===n&&t.attr({"aria-expanded":!1})),e.addClass("submenu ".concat(o)).attr({"data-submenu":"",role:"menubar"}),"drilldown"===n&&e.attr({"aria-hidden":!0})),t.parent("[data-submenu]").length&&t.addClass("is-submenu-item ".concat(i))})},Burn:function(t,e){var n="is-".concat(e,"-submenu"),o="".concat(n,"-item"),i="is-".concat(e,"-submenu-parent");t.find(">li, > li > ul, .menu, .menu > li, [data-submenu] > li").removeClass("".concat(n," ").concat(o," ").concat(i," is-submenu-item submenu is-active")).removeAttr("data-submenu").css("display","")}};function x(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var T,I,P,E,D={},O=!1,A=!1;function M(t){if(this.removeEventListener("touchmove",F),this.removeEventListener("touchend",M),!A){var e=c.a.Event("tap",E||t);c()(this).trigger(e)}E=null,A=O=!1}function F(t){if(c.a.spotSwipe.preventDefault&&t.preventDefault(),O){var e,n=t.touches[0].pageX,o=(t.touches[0].pageY,T-n);A=!0,P=(new Date).getTime()-I,Math.abs(o)>=c.a.spotSwipe.moveThreshold&&P<=c.a.spotSwipe.timeThreshold&&(e=0<o?"left":"right"),e&&(t.preventDefault(),M.apply(this,arguments),c()(this).trigger(c.a.Event("swipe",t),e).trigger(c.a.Event("swipe".concat(e),t)))}}function q(t){1==t.touches.length&&(T=t.touches[0].pageX,t.touches[0].pageY,E=t,A=!(O=!0),I=(new Date).getTime(),this.addEventListener("touchmove",F,!1),this.addEventListener("touchend",M,!1))}function R(){this.addEventListener&&this.addEventListener("touchstart",q,!1)}var B=function(){function n(t){!function(t,e){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this),this.version="1.0.0",this.enabled="ontouchstart"in document.documentElement,this.preventDefault=!1,this.moveThreshold=75,this.timeThreshold=200,this.$=t,this._init()}return x(n.prototype,[{key:"_init",value:function(){var t=this.$;t.event.special.swipe={setup:R},t.event.special.tap={setup:R},t.each(["left","up","down","right"],function(){t.event.special["swipe".concat(this)]={setup:function(){t(this).on("swipe",t.noop)}}})}}]),n}();function N(t){return(N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}D.setupSpotSwipe=function(t){t.spotSwipe=new B(t)},D.setupTouchHandler=function(o){o.fn.addTouch=function(){this.each(function(t,e){o(e).bind("touchstart touchmove touchend touchcancel",function(t){n(t)})});var n=function(t){var e,n=t.changedTouches[0],o={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup"}[t.type];"MouseEvent"in window&&"function"==typeof window.MouseEvent?e=new window.MouseEvent(o,{bubbles:!0,cancelable:!0,screenX:n.screenX,screenY:n.screenY,clientX:n.clientX,clientY:n.clientY}):(e=document.createEvent("MouseEvent")).initMouseEvent(o,!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(e)}}},D.init=function(t){void 0===t.spotSwipe&&(D.setupSpotSwipe(t),D.setupTouchHandler(t))};var H=function(){for(var t=["WebKit","Moz","O","Ms",""],e=0;e<t.length;e++)if("".concat(t[e],"MutationObserver")in window)return window["".concat(t[e],"MutationObserver")];return!1}(),U=function(e,n){e.data(n).split(" ").forEach(function(t){c()("#".concat(t))["close"===n?"trigger":"triggerHandler"]("".concat(n,".zf.trigger"),[e])})},Y={Listeners:{Basic:{},Global:{}},Initializers:{}};function G(e,t,n){var o,i=Array.prototype.slice.call(arguments,3);c()(window).off(t).on(t,function(t){o&&clearTimeout(o),o=setTimeout(function(){n.apply(null,i)},e||10)})}function W(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}Y.Listeners.Basic={openListener:function(){U(c()(this),"open")},closeListener:function(){c()(this).data("close")?U(c()(this),"close"):c()(this).trigger("close.zf.trigger")},toggleListener:function(){c()(this).data("toggle")?U(c()(this),"toggle"):c()(this).trigger("toggle.zf.trigger")},closeableListener:function(t){t.stopPropagation();var e=c()(this).data("closable");""!==e?k.animateOut(c()(this),e,function(){c()(this).trigger("closed.zf")}):c()(this).fadeOut().trigger("closed.zf")},toggleFocusListener:function(){var t=c()(this).data("toggle-focus");c()("#".concat(t)).triggerHandler("toggle.zf.trigger",[c()(this)])}},Y.Initializers.addOpenListener=function(t){t.off("click.zf.trigger",Y.Listeners.Basic.openListener),t.on("click.zf.trigger","[data-open]",Y.Listeners.Basic.openListener)},Y.Initializers.addCloseListener=function(t){t.off("click.zf.trigger",Y.Listeners.Basic.closeListener),t.on("click.zf.trigger","[data-close]",Y.Listeners.Basic.closeListener)},Y.Initializers.addToggleListener=function(t){t.off("click.zf.trigger",Y.Listeners.Basic.toggleListener),t.on("click.zf.trigger","[data-toggle]",Y.Listeners.Basic.toggleListener)},Y.Initializers.addCloseableListener=function(t){t.off("close.zf.trigger",Y.Listeners.Basic.closeableListener),t.on("close.zf.trigger","[data-closeable], [data-closable]",Y.Listeners.Basic.closeableListener)},Y.Initializers.addToggleFocusListener=function(t){t.off("focus.zf.trigger blur.zf.trigger",Y.Listeners.Basic.toggleFocusListener),t.on("focus.zf.trigger blur.zf.trigger","[data-toggle-focus]",Y.Listeners.Basic.toggleFocusListener)},Y.Listeners.Global={resizeListener:function(t){H||t.each(function(){c()(this).triggerHandler("resizeme.zf.trigger")}),t.attr("data-events","resize")},scrollListener:function(t){H||t.each(function(){c()(this).triggerHandler("scrollme.zf.trigger")}),t.attr("data-events","scroll")},closeMeListener:function(t,e){var n=t.namespace.split(".")[0];c()("[data-".concat(n,"]")).not('[data-yeti-box="'.concat(e,'"]')).each(function(){var t=c()(this);t.triggerHandler("close.zf.trigger",[t])})}},Y.Initializers.addClosemeListener=function(t){var e=c()("[data-yeti-box]"),n=["dropdown","tooltip","reveal"];if(t&&("string"==typeof t?n.push(t):"object"===N(t)&&"string"==typeof t[0]?n=n.concat(t):console.error("Plugin names must be strings")),e.length){var o=n.map(function(t){return"closeme.zf.".concat(t)}).join(" ");c()(window).off(o).on(o,Y.Listeners.Global.closeMeListener)}},Y.Initializers.addResizeListener=function(t){var e=c()("[data-resize]");e.length&&G(t,"resize.zf.trigger",Y.Listeners.Global.resizeListener,e)},Y.Initializers.addScrollListener=function(t){var e=c()("[data-scroll]");e.length&&G(t,"scroll.zf.trigger",Y.Listeners.Global.scrollListener,e)},Y.Initializers.addMutationEventsListener=function(t){if(!H)return!1;var e=t.find("[data-resize], [data-scroll], [data-mutate]"),n=function(t){var e=c()(t[0].target);switch(t[0].type){case"attributes":"scroll"===e.attr("data-events")&&"data-events"===t[0].attributeName&&e.triggerHandler("scrollme.zf.trigger",[e,window.pageYOffset]),"resize"===e.attr("data-events")&&"data-events"===t[0].attributeName&&e.triggerHandler("resizeme.zf.trigger",[e]),"style"===t[0].attributeName&&(e.closest("[data-mutate]").attr("data-events","mutate"),e.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger",[e.closest("[data-mutate]")]));break;case"childList":e.closest("[data-mutate]").attr("data-events","mutate"),e.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger",[e.closest("[data-mutate]")]);break;default:return!1}};if(e.length)for(var o=0;o<=e.length-1;o++)new H(n).observe(e[o],{attributes:!0,childList:!0,characterData:!1,subtree:!0,attributeFilter:["data-events","style"]})},Y.Initializers.addSimpleListeners=function(){var t=c()(document);Y.Initializers.addOpenListener(t),Y.Initializers.addCloseListener(t),Y.Initializers.addToggleListener(t),Y.Initializers.addCloseableListener(t),Y.Initializers.addToggleFocusListener(t)},Y.Initializers.addGlobalListeners=function(){var t=c()(document);Y.Initializers.addMutationEventsListener(t),Y.Initializers.addResizeListener(),Y.Initializers.addScrollListener(),Y.Initializers.addClosemeListener()},Y.init=function(t,e){var n,o,i,r,a;n=t(window),o=function(){!0!==t.triggersInitialized&&(Y.Initializers.addSimpleListeners(),Y.Initializers.addGlobalListeners(),t.triggersInitialized=!0)},i="complete"===document.readyState,r=(i?"_didLoad":"load")+".zf.util.onLoad",a=function(){return n.triggerHandler(r)},n&&(n.one(r,o),i?setTimeout(a):c()(window).one("load",a)),e&&(e.Triggers=Y,e.IHearYou=Y.Initializers.addGlobalListeners)};var K=function(){function o(t,e){!function(t,e){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(this),this._setup(t,e);var n=X(this);this.uuid=i(6,n),this.$element.attr("data-".concat(n))||this.$element.attr("data-".concat(n),this.uuid),this.$element.data("zfPlugin")||this.$element.data("zfPlugin",this),this.$element.trigger("init.zf.".concat(n))}return W(o.prototype,[{key:"destroy",value:function(){this._destroy();var t=X(this);for(var e in this.$element.removeAttr("data-".concat(t)).removeData("zfPlugin").trigger("destroyed.zf.".concat(t)),this)this[e]=null}}]),o}();function Q(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function X(t){return void 0!==t.constructor.name?Q(t.constructor.name):Q(t.className)}function Z(t){return(Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function J(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function V(t){return(V=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function tt(t,e){return(tt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var et=function(t){function s(){return function(t,e){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}(this),t=this,!(e=V(s).apply(this,arguments))||"object"!==Z(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e;var t,e}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&tt(t,e)}(s,K),J(s.prototype,[{key:"_setup",value:function(t,e){this.$element=t,this.options=c.a.extend({},s.defaults,e),this.rules=[],this.currentPath="",this.className="Interchange",this._init(),this._events()}},{key:"_init",value:function(){a._init();var t=this.$element[0].id||i(6,"interchange");this.$element.attr({"data-resize":t,id:t}),this._addBreakpoints(),this._generateRules(),this._reflow()}},{key:"_events",value:function(){var t=this;this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger",function(){return t._reflow()})}},{key:"_reflow",value:function(){var t;for(var e in this.rules)if(this.rules.hasOwnProperty(e)){var n=this.rules[e];window.matchMedia(n.query).matches&&(t=n)}t&&this.replace(t.path)}},{key:"_addBreakpoints",value:function(){for(var t in a.queries)if(a.queries.hasOwnProperty(t)){var e=a.queries[t];s.SPECIAL_QUERIES[e.name]=e.value}}},{key:"_generateRules",value:function(t){var e,n=[];for(var o in e="string"==typeof(e=this.options.rules?this.options.rules:this.$element.data("interchange"))?e.match(/\[.*?, .*?\]/g):e)if(e.hasOwnProperty(o)){var i=e[o].slice(1,-1).split(", "),r=i.slice(0,-1).join(""),a=i[i.length-1];s.SPECIAL_QUERIES[a]&&(a=s.SPECIAL_QUERIES[a]),n.push({path:r,query:a})}this.rules=n}},{key:"replace",value:function(e){if(this.currentPath!==e){var n=this,o="replaced.zf.interchange";"IMG"===this.$element[0].nodeName?this.$element.attr("src",e).on("load",function(){n.currentPath=e}).trigger(o):e.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i)?(e=e.replace(/\(/g,"%28").replace(/\)/g,"%29"),this.$element.css({"background-image":"url("+e+")"}).trigger(o)):c.a.get(e,function(t){n.$element.html(t).trigger(o),c()(t).foundation(),n.currentPath=e})}}},{key:"_destroy",value:function(){this.$element.off("resizeme.zf.trigger")}}]),s}();function nt(t,e,o){var i,r,n=$("string"==typeof e?e:"."+t);0!=n.length&&("jzc-tab"==t?(i=jz.vTab.ids,r="tab"):"jzc-accordion"==t?(i=jz.vAccordion.ids,r="accordion"):"jzc-click-area"==t?(i=jz.vClickArea.ids,r="click-area"):"button"==t?(i=jz.vButton.ids,r="button"):"jzc-dropdown-select"==t?(i=jz.vDropdown.ids,r="select"):"fotorama"==t&&(i=jz.vFotorama.ids,r="fotorama"),n.each(function(t,e){var n=$(this).attr("id");n||(n=r+"-"+Date.now()+t,$(this).attr("id",n)),-1!=$.inArray(n,i)||(i.push($(this).attr("id")),"function"==typeof o&&o(this))}))}et.defaults={rules:null},et.SPECIAL_QUERIES={landscape:"screen and (orientation: landscape)",portrait:"screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"},u.addToJquery(c.a),u.rtl=s,u.GetYoDigits=i,u.transitionend=l,u.Box=h,u.onImagesLoaded=function(t,e){var n=t.length;function o(){0==--n&&e()}0===n&&e(),t.each(function(){if(this.complete&&void 0!==this.naturalWidth)o();else{var t=new Image,n="load.zf.images error.zf.images";c()(t).one(n,function t(e){c()(this).off(n,t),o()}),t.src=c()(this).attr("src")}})},u.Keyboard=_,u.MediaQuery=a,u.Motion=k,u.Move=function(n,o,i){var r,a,s=null;if(0===n)return i.apply(o),void o.trigger("finished.zf.animate",[o]).triggerHandler("finished.zf.animate",[o]);r=window.requestAnimationFrame(function t(e){s||(s=e),a=e-s,i.apply(o),a<n?r=window.requestAnimationFrame(t,o):(window.cancelAnimationFrame(r),o.trigger("finished.zf.animate",[o]).triggerHandler("finished.zf.animate",[o]))})},u.Nest=S,u.Timer=function(e,t,n){var o,i,r=this,a=t.duration,s=Object.keys(e.data())[0]||"timer",c=-1;this.isPaused=!1,this.restart=function(){c=-1,clearTimeout(i),this.start()},this.start=function(){this.isPaused=!1,clearTimeout(i),c=c<=0?a:c,e.data("paused",!1),o=Date.now(),i=setTimeout(function(){t.infinite&&r.restart(),n&&"function"==typeof n&&n()},c),e.trigger("timerstart.zf.".concat(s))},this.pause=function(){this.isPaused=!0,clearTimeout(i),e.data("paused",!0);var t=Date.now();c-=t-o,e.trigger("timerpaused.zf.".concat(s))}},D.init(c.a),Y.init(c.a,u),u.plugin(et,"Interchange"),n(4),jz.accordion=function(t){nt("jzc-accordion",t,function(){$(document).off("click",".jzc-accordion-title").on("click",".jzc-accordion-title",function(){var t=$(this).closest(".jzc-accordion"),e=t.find(".jzc-accordion-body"),n=$(this).find(".jzc-accordion-title-text"),o=$(this).find(".jzc-accordion-icon"),i=t.attr("data-accordion-title"),r=t.attr("data-accordion-title-open");return e.is(":visible")?(e.slideUp(),o.addClass("fa-chevron-down").removeClass("fa-chevron-up"),t.removeClass("jzc-accordion--opened"),n.html(i)):(e.slideDown(),o.addClass("fa-chevron-up").removeClass("fa-chevron-down"),t.addClass("jzc-accordion--opened"),n.html(r)),!1})})},n(5),jz.clickarea=function(t){nt("jzc-click-area",t,function(){$(document).on("click",".jzc-click-area a",function(){if(-1!=$(this).attr("href").indexOf("javascript"))return!1}),$(document).on("click",".jzc-click-area",function(){var t,e,n,o,i=$(this).find("a.jzc-click-link:first"),r=i.attr("href"),a=i.attr("data-dialog-link-id");return a?(t=r,e=$("#"+a),n=e.attr("data-dialog-title"),o=e.attr("data-dialog-width"),e.attr("data-dialog-type"),e.attr("href",t),e.YSDialog({dialogTitle:n,width:o+"px",iframe:!0}),e.click()):-1!=r.indexOf("javascript")?i.click():location.href=r,!1})})},jz.tab=function(t){nt("jzc-tab",t,function(t){var e=$(t).attr("data-tab-id-active");$(t).find(".jzc-tab__body").addClass("hide"),e?($(t).find('.jzc-tab__title[data-tab-id="'+e+'"]').addClass("jzc-tab__title--active"),$(t).find("#"+e).removeClass("hide")):($(t).find(".jzc-tab__title:first-child").addClass("jzc-tab__title--active"),$(t).find(".jzc-tab__body:first-child").removeClass("hide")),$(t).on("click",".jzc-tab__title",function(){var t=$(this).attr("data-tab-id"),e=$(this).closest(".jzc-tab");e.find(".jzc-tab__title").removeClass("jzc-tab__title--active"),$(this).addClass("jzc-tab__title--active"),e.find(".jzc-tab__body").addClass("hide"),e.find("#"+t).removeClass("hide")})})},jz.dropdown=function(t,e){e&&$(t).each(function(){var t=$(this).attr("id");$(this).closest(".jzc-dropdown").find(".jzc-dropdown-title").remove(),$(this).closest(".jzc-dropdown").find(".jzc-dropdown-body-wrapper").remove(),$(this).unwrap(),jz.vDropdown.ids.splice($.inArray(t,jz.vDropdown.ids),1),jz.dropdown(this)}),nt("jzc-dropdown-select",t,function(m){var T;!function(t){for(var e=$(m),n=e.children(),o=e.children(":selected").html(),i=e.children(":selected").index(),r=e.attr("data-underline"),a=$('<div class="jzc-dropdown-title"><div class="jzc-dropdown-title-text">'+o+'</div><i class="jzc-dropdown-icon fa fa-caret-down"></i></div>'),s=$('<div class="jzc-dropdown-body"></div>'),c="",l=0;l<n.length;l++)c+='<div class="jzc-dropdown-option">'+n.eq(l).html()+"</div>";if(s.html(c),e.wrap('<div class="jzc-dropdown" tabindex="0"></div>'),e.after(a,s),e.closest(".jzc-dropdown").attr("data-option-selected",i),s.wrap('<div class="jzc-dropdown-body-wrapper"></div>'),r){var d=r.split(",");for(l=0;l<d.length;l++)e.closest(".jzc-dropdown").find(".jzc-dropdown-option").eq(parseInt(d[l])-1).after('<div class="jzc-dropdown-hline"></div>')}var u=e.attr("data-auto-width"),f=parent.$(".ysdialog-iframe"),p=e;if(u&&"false"==u)if(0<f.length)setTimeout(function(){var t=p.closest(".jzc-dropdown").find(".jzc-dropdown-body").outerWidth();p.closest(".jzc-dropdown").width(t+18),p.closest(".jzc-dropdown").find(".jzc-dropdown-body").width(t+16),p.closest(".jzc-dropdown").find(".jzc-dropdown-body-wrapper").width(t+18)},200);else{var h=e.closest(".jzc-dropdown").find(".jzc-dropdown-body").outerWidth();e.closest(".jzc-dropdown").width(h+18),e.closest(".jzc-dropdown").find(".jzc-dropdown-body").width(h+16),e.closest(".jzc-dropdown").find(".jzc-dropdown-body-wrapper").width(h+18)}else e.closest(".jzc-dropdown").find(".jzc-dropdown-body-wrapper").css("width","100%"),e.closest(".jzc-dropdown").find(".jzc-dropdown-body").css("width","100%");(/iP(ad|hone|od).*OS/.test(window.navigator.userAgent)||/Android/.test(window.navigator.userAgent))&&(e.css("z-index",99999),e.off("change").on("change",function(){var t=$(this).get(0).selectedIndex,e=$(this).closest(".jzc-dropdown").find(".jzc-dropdown-option");($(this).closest(".jzc-dropdown").find(".jzc-dropdown-body"),$(this).closest(".jzc-dropdown").find(".jzc-dropdown-title")).click(),e.eq(t).click()}))}(),$(m).closest(".jzc-dropdown").on("click",".jzc-dropdown-title",function(){var r=$(this).closest(".jzc-dropdown"),a=r.find(".jzc-dropdown-body"),s=$(this).find(".jzc-dropdown-title-text"),e=a.children(".jzc-dropdown-option"),t=r.attr("data-option-selected"),n=r.attr("data-selected-top"),c=r.find(".jzc-dropdown-select").attr("data-change-callback");if(e.removeClass("jzc-dropdown-option--selected").eq(t).addClass("jzc-dropdown-option--selected"),a.is(":visible"))a.css({"max-height":"none"}).hide(),r.blur();else{$(".jzc-dropdown").removeClass("jzc-dropdown--selected"),$(".jzc-dropdown-body").css({"max-height":"none"}).hide(),r.addClass("jzc-dropdown--selected"),a.show();var o=r,i=$(window).height(),l=o.height(),d=$(document).scrollTop(),u=o.offset().top-d,f=i-l-u,p=a.height(),h=a.children(".jzc-dropdown-option").height();if(0<parent.$(".ysdialog-iframe").length)f=i-14-l-(u=o.offset().top);else if(0<o.closest(".ysdialog").length){var m=o.closest(".ysdialog"),g=m.offset().top,w=i-g-m.height(),v=o.offset().top;u=v-g,f=i-l-v-w-14}var y=12*h;if(f<p)if(u<f||y<f){var z=Math.floor(f/h);y=y<f?y+2:h*z+2,a.css({"max-height":y+"px",overflow:"auto"});var b=a.height();a.css({top:"-1px"}),!a.hasClass("ps")&&b<p?T=new PerfectScrollbar(a[0],{wheelPropagation:!1}):a.hasClass("ps")&&(T.update(),0==a.find(".ps__rail-y").length&&(T=new PerfectScrollbar(a[0],{wheelPropagation:!1})))}else z=Math.floor(u/h),y=y<h*z?y+2:h*z+2,a.css({"max-height":y+"px",overflow:"auto"}),b=a.height(),a.css({top:-(b+l-1)+"px"}),!a.hasClass("ps")&&b<p?T=new PerfectScrollbar(a[0],{wheelPropagation:!1}):a.hasClass("ps")&&(T.update(),0==a.find(".ps__rail-y").length&&(T=new PerfectScrollbar(a[0],{wheelPropagation:!1})));else a.removeClass("ps").css({top:"-1px"}),T&&(r.find(".ps__rail-x").remove(),r.find(".ps__rail-y").remove(),T.destroy(),T=null);if(n)a.scrollTop(parseInt(n));else{var _=t*h-y+2+h;0<_&&a.scrollTop(_)}}e.each(function(){$(this).off("mouseover").on("mouseover",function(){e.removeClass("jzc-dropdown-option--selected"),$(this).addClass("jzc-dropdown-option--selected");var t=$(this).prevAll(".jzc-dropdown-option").length;L=k=C=t}),$(this).off("click").on("click",function(){var t=$(this).html(),e=a.scrollTop();a.hide(),s.html(t);var n=$(this).prevAll(".jzc-dropdown-option").length,o=r.find(".jzc-dropdown-select").children();r.attr("data-option-selected",n),r.attr("data-selected-top",e),o.eq(n).attr("selected",!0).siblings().attr("selected",!1);var i=$(this).closest(".jzc-dropdown").find(".jzc-dropdown-select");return"string"==typeof c&&"function"==typeof window[c]&&window[c](i),r.blur(),!1})});var j=r.attr("data-option-selected"),C=j,k=j,L=j,S=null,x=!0;return r.off("keydown keyup").on("keydown",function(t){if(40==t.keyCode){if(++k>e.length-1)return!1;L=C=k,e.removeClass("jzc-dropdown-option--selected").eq(k).addClass("jzc-dropdown-option--selected"),e.eq(k).position().top+h>a.height()&&(x&&(S&&(clearTimeout(S),S=null),e.off("mouseover"),x=!1),a.scrollTop(L*h-y+2+h))}else if(38==t.keyCode){if(--C<0)return!1;L=k=C,e.removeClass("jzc-dropdown-option--selected").eq(C).addClass("jzc-dropdown-option--selected"),e.eq(k).position().top<0&&(x&&(S&&(clearTimeout(S),S=null),e.off("mouseover"),x=!1),a.scrollTop(L*h))}else 13==t.keyCode&&e.eq(L).click();t.preventDefault()}).on("keyup",function(t){40!=t.keyCode&&38!=t.keyCode||(x||(S&&(clearTimeout(S),S=null),S=setTimeout(function(){e.each(function(){$(this).off("mouseover").on("mouseover",function(){e.removeClass("jzc-dropdown-option--selected"),$(this).addClass("jzc-dropdown-option--selected");var t=$(this).prevAll(".jzc-dropdown-option").length;L=k=C=t})}),x=!0},500)),t.preventDefault())}),!1})})},n(6),jz.responsive=function(t){nt("fotorama",t,function(){if(0!=$(".fotorama").length){var c,l,i,d,r,a,u,f=0<parent.$(".ysdialog-iframe").length,p=$(".fotorama").fotorama().data("fotorama"),h="default";f&&(c=parent.imgMaxHeight,l=parent.imgMaxWidth,u=parent.ratio),function(){if(w(),f){p.show(parent.fotorama.activeIndex),$(".fotorama").addClass("fotorama--popup");var t=$(window.top).width(),e=$(window.top).height(),n=$(".fotorama__nav-wrap").height();$(".fotorama").closest(".ysdialog-contents").css({"padding-top":"16px",overflow:"hidden"}),1==p.size&&($(".fotorama__stage").css("margin-bottom",0),$(".fotorama__arr").hide()),(d=e-60-80-30-n||e-60-80)<(a=(r=l>(i=t-60-80)?i:l)*c/l)&&(r=(a=d)*l/c),parent.$(".ysdialog").css({width:r+80+"px"}),p.setOptions({width:r,ratio:r/a})}var o=$('<div class="fotorama__stage__maskA"></div><div class="fotorama__stage__maskC"></div>');$(".fotorama__stage").append(o),$(".fotorama").on("fotorama:load",function(t,e,n){if(n.index==e.activeIndex&&(s(),f)){var o=n.frame.$stageFrame.find("img.fotorama__img"),i=n.src;m(o,i)&&g(o,i)}}).on("fotorama:showend",function(t,e,n){if(s(),f){var o=$(".fotorama__stage__frame.fotorama__active").find("img.fotorama__img"),i=e.activeFrame.img;m(o,i)?g(o,i):"default"==h&&o.trigger("zoom.destroy")}}).fotorama(),$(document).on("click",".fotorama__stage__maskA",function(){p.show("<")}).on("click",".fotorama__stage__maskC",function(){p.show(">")})}();var t=null;$(window.parent).resize(function(){t&&clearTimeout(t),t=setTimeout(function(){w(),function(){if(f){var t,e,n=$(window.top).width(),o=$(window.top).height(),i=$(".fotorama__nav-wrap").height(),r=l<n-60-80?l+80:n-60;parent.$(".ysdialog").css({width:n-60+"px","max-width":r+"px"}),e=n-60-80,parent.Foundation.MediaQuery.is("small only")&&(parent.$(".ysdialog").css({width:"100%","max-width":"100%"}),e=n-80),(t=e/u)>=c&&(e=(t=c)*u),t>(d=o-60-80-30-i||o-60-80)&&(t=o-60-80-30-i||o-60-80,parent.Foundation.MediaQuery.is("small only")&&(t=o-80-30-i||o-80),e=t*u,parent.$(".ysdialog").css({width:e+80+"px"})),p.setOptions({width:"100%"});var a=$(".fotorama__stage__frame.fotorama__active img.fotorama__img"),s=p.activeFrame.img;m(a,s)?(a.trigger("zoom.destroy"),g(a,s)):"default"==h&&a.trigger("zoom.destroy")}}()},0)})}function m(t,e){var o,i,r=t,n=r.closest(".fotorama__stage__frame"),a=(e=e,r.width()),s=r.height();if(0<r.length)return o=r[0].naturalWidth,i=r[0].naturalHeight,a<o||s<i?(n.css("cursor","zoom-in"),h="zoom-in",!(0<t.closest(".fotorama__stage__frame").find("img.zoomImg").length&&(n.css("cursor","zoom-in"),1))):(n.css("cursor","default"),!(h="default"));jz.getImageSize(e,function(){o=this.width,i=this.height,$(".fotorama").on("fotorama:load",function(t,e,n){return r=$(".ysdialog-contents .fotorama__stage__frame.fotorama__active").find(".fotorama__img"),a=r.width(),s=r.height(),a<o||s<i?(r.closest(".fotorama__stage__frame").css("cursor","zoom-in"),h="zoom-in",!(0<r.closest(".fotorama__stage__frame").find("img.zoomImg").length)):(r.closest(".fotorama__stage__frame").css("cursor","default"),!(h="default"))}).fotorama()})}function g(t,e){t.hasClass("zoomImg")||t.wrap('<div class="zoomImgWrapper"></div>').parent().zoom({url:e,on:"click",onZoomIn:function(){$(".fotorama__stage__frame.fotorama__active").css("cursor","zoom-out"),$(".fotorama__stage__maskA").hide(),$(".fotorama__stage__maskC").hide(),$(".fotorama__arr").hide()},onZoomOut:function(){$(".fotorama__stage__frame.fotorama__active").css("cursor","zoom-in"),$(".fotorama__stage__maskA").show(),$(".fotorama__stage__maskC").show(),1<p.size&&$(".fotorama__arr").show()}})}function s(){1==p.size?($(".fotorama__stage__maskA").hide(),$(".fotorama__stage__maskC").hide()):($(".fotorama__stage__maskA").show(),$(".fotorama__stage__maskC").show())}function w(){f||(Foundation.MediaQuery.is("small only")?p.setOptions({nav:"dots"}):p.setOptions({nav:"thumbs"}))}})},jz.button=function(t){nt("button",t,function(t){$(t).on("click",function(){var t=$(this).attr("data-link-type");if(t)return"top"==t?window.scrollTo(0,0):"bottom"==t&&window.scrollTo(0,document.body.scrollHeight),!1;var e=$(this).attr("data-click-interval");if(e){var n=$(this).attr("data-click-time"),o=(new Date).getTime();if($(this).attr("data-click-time",o),0!=e||n){$(this).addClass("disabled");var i=$(this);setTimeout(function(){i.removeClass("disabled"),i.removeAttr("data-click-time")},e)}else $(this).addClass("disabled")}})})},n(7),n(8),c()(function(){var t=c()("body").attr("data-screen-pc-gte");"medium"==t?jz.vCommon.responsive=1:"small"==t?jz.vCommon.responsive=2:t||(jz.vCommon.responsive=3),jz.accordion(),jz.clickarea(),jz.tab(),jz.dropdown("select.jzc-dropdown-select"),jz.button(),jz.news(),0<parent.$(".ysdialog-iframe").length?setTimeout(function(){jz.responsive()},200):jz.responsive()}),window.$=c.a,window.jQuery=c.a,c()(document).foundation()}]);
$(function(){
	$('.menu-hori a').mouseenter(function() {
		$(this).addClass('active');
		var pos = $(this).position();
		$(this).closest('.menu-hori').find('#sub-menu-hori-' + $(this).attr('id')).css({top: pos.top + 40 +'px', left: pos.left + 'px'}).show();
	})
	.mouseleave(function() {
		if(!$(this).hasClass('selected')) {
			$(this).removeClass('active');
		}
		var that = $(this);
		setTimeout(function() {
			if (!that.closest('.menu-hori').find('#' + that.attr('id')).hasClass('active')) {
				that.closest('.menu-hori').find('#sub-menu-hori-' + that.attr('id')).hide();
			}
		}, 100);
	});

	$('.sub-menu-hori').mouseenter(function() {
		$(this).closest('.menu-hori').find('#' + $(this).attr('data-main-menu-id')).addClass('active');
		$(this).show();
	}).mouseleave(function() {
		$(this).closest('.menu-hori').find('#' + $(this).attr('data-main-menu-id')).removeClass('active');
		$(this).hide();
	});

	$('.menu-vert a').click(function() {
		if ($(this).closest('ul').hasClass('submenu')) {
			$(this).parents('.mainmenu').last().find('a:first').click();
			if($(this).attr("href") !== undefined) {
				$(this).closest('ul').hide();
			}
		}
		else {
			$('.menu-vert a.selected').removeClass('selected');
			$(this).addClass('selected');
		}

		$('.menu-hori').find('.selected').each(function() {
			$(this).removeClass('active').removeClass('selected');
		});
	});

	$('.menu-vert .mainmenu').mouseenter(function() {
		var posX = $(this).width();
		if ($(this).closest('ul').hasClass('submenu')) {
			$(this).find('a:first').addClass('mainmenu-bg2');
		}
		else {
			$(this).find('a:first').addClass('mainmenu-bg1');
		}
		$(this).find('.submenu:first').css({left: posX + 'px'}).show();
	})
	.mouseleave(function() {
		$(this).find('a:first').removeClass('mainmenu-bg1 mainmenu-bg2');
		$(this).find('.submenu:first').hide();
	});

	getSelectedMenu();

	setPartCartCss();

});

function playSwiper(rowId, optStr){
	if(!Swiper){
		return;
	}

	var option = {
			rowSlideSpeed : 600,
			rowSlideDirection: "horizontal",
			rowSlideEffect: "slide",
			rowSlidePagenation: "Y",
			rowSlideLoop: "Y",
			rowSlideAutoplay: "Y",
			rowSlideDelay: 3000,
			rowSlideNavigation: "Y",
		};

	if(optStr){
		var optionParam = $.parseJSON(optStr);
		option = $.extend(option, optionParam);
	}

	if(option.rowSlideAutoplay !== "Y"){
		option.rowSlideDelay = 0;
	}
	$(rowId).find('.swiper-wrapper:first').removeAttr('style');
	$(rowId).find('.swiper-wrapper:first').css('visibility','visible');
	$(rowId).find('.swiper-wrapper:first').each(function(){
		var $swiperWrapper = $(this);
		var $swiperContainer = $swiperWrapper.parent();
		$swiperContainer.addClass('swiper-container');
		$swiperContainer.find('.control-helper').remove();

		if(option.rowSlidePagenation == "Y"){
			$swiperContainer.append('<div class="swiper-pagination"></div>');
		}
		if(option.rowSlideNavigation == "Y"){
			$swiperContainer.append('<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>');
		}
		//$swiperContainer.append('<div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div>');

		$swiperWrapper.children(".pgcol,.cell").each(function(){
			if(!$(this).hasClass("swiper-slide")){
				$(this).addClass("swiper-slide");
			}
		});

	});

    var mySwiper = new Swiper ($(rowId).find('.swiper-container'), {
        loop:  option.rowSlideLoop == "Y",
        speed: parseInt(option.rowSlideSpeed),
        direction: option.rowSlideDirection,
        uniqueNavElements: true,
        effect: option.rowSlideEffect,
        fadeEffect: {
          crossFade: true
        },
        autoplay: option.rowSlideDelay,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
      });


}


function getSelectedMenu() {
	if ($('#selectedMenuIdAndUrl').val() != null && $('#selectedMenuIdAndUrl').val() != undefined) {
		var selectedMenuIdAndUrl = $('#selectedMenuIdAndUrl').val().split('#');
	}
	if(selectedMenuIdAndUrl !== undefined && selectedMenuIdAndUrl.length > 1) {
		var menuId = selectedMenuIdAndUrl[0],
		    menuUrl = selectedMenuIdAndUrl[1];
		$('.menu-hori').find('#' + menuId).each(function() {
			if($(this).attr('href') !== undefined && ($(this).attr('href') == menuUrl || $(this).attr('href') + '/' == menuUrl || $(this).attr('href')== menuUrl + '/')) {
				$(this).addClass('active').addClass('selected');
			}
		});

		$('.menu-vert').find('#' + menuId).each(function() {
			if($(this).attr('href') !== undefined && ($(this).attr('href') == menuUrl || $(this).attr('href') + '/' == menuUrl || $(this).attr('href')== menuUrl + '/')) {
				$(this).addClass('selected');
			}
		});
	}
	$('#selectedMenuIdAndUrl').remove();
}

function setPartCartCss() {
	$('a[id="part-cart-link"]').css({'text-decoration':'none', 'font-weight':'bold', 'padding':'3px 4px 3px 10px', 'display':'block', 'background':'#E6F0F5', 'color':'#000'});

	$('a[id="part-cart-link"]').hover(
	    function() {$(this).css('background-color', '#b2d1e0');},
		function() {$(this).css('background-color', '#E6F0F5');}
	);
}

function getPartLogin() {
	$(document).off('click', '.part-login-member-menu-link')
				.on('click', '.part-login-member-menu-link', function() {
		var currentYsdropdownFlag = false;
		if ($(this).next('.ysdropdown')) {
			$(this).append($(this).next('.ysdropdown'));
			$(this).next('.ysdropdown').remove();
		}

		if (!$(this).children('.ysdropdown').is(':visible')) {
			currentYsdropdownFlag = true;
		}

		$('.ysdropdown').hide();

		if (currentYsdropdownFlag) {
			$(this).children('.ysdropdown').toggle();
		}
	});

	$(document).click(function (e) {
		if (!$(e.target).hasClass('part-login-member-menu-link')) {
			$('.ysdropdown').hide();
		}
	});

	$("#popup-tenantownerinfo").YSDialog({dialogTitle: "<m>テナントオーナー情報</m>"});

	var useMyTimezone = getCookie("useMyTimezone");
	if (useMyTimezone == $('#useMyTimezoneYes').val()) {
		$('i[id="use-my-timezone-check"]').css('display','');
	}

}

function showMemberInfoDetails() {
	$('#popup-tenantownerinfo').click();
}

function openAdminPage(url) {
	window.open(url, 'admwin_' + $('#tenantSignId').val());
}

function changeMailAddress() {
	$('#change-mail-address').YSDialog({iframe:true, dialogTitle:'<m>メールアドレスの変更</m>', width:'840px'});
	$('#change-mail-address').click();
}

function openServiceMessages(tenantBaseUrl) {
	if ($('#service-msg').is(":visible")) {
		return;
	}

	var serviceMsg = $('#service-msg');
	$.get(tenantBaseUrl + '/jsys/top-page/open-service-messages', function() {
		if (serviceMsg.length == 1) {
			$('#service-msg').show();
		}
		else {
			location.reload();
		}
	});
}

function useMyTimezoneCheck() {
	$('#use-my-timezone-link').YSDialog({dialogTitle:'<m>タイムゾーンの設定</m>', width: '400px'});
	$('#use-my-timezone-link').click();
}

function setMyTimeZone(useMyTimezoneFlag, tenantBaseUrl) {
	var useMyTimezoneYes = $('#useMyTimezoneYes').val(),
	    useMyTimezoneNo = $('#useMyTimezoneNo').val(),
	    useMyTimezone = useMyTimezoneNo;

	if (useMyTimezoneFlag == useMyTimezoneYes) {
		$('i[id="use-my-timezone-check"]').show();
		setCookie('timezone', jstz.determine().name());
		useMyTimezone = useMyTimezoneYes;
	}
	else if (useMyTimezoneFlag == useMyTimezoneNo) {
		$('i[id="use-my-timezone-check"]').hide();
	}
	setCookie('useMyTimezone', useMyTimezone);

	$.get(tenantBaseUrl + '/jsys/top-page/setup-my-timezone/' + useMyTimezoneFlag, function(data) {
		location.reload();
	});
}

function getCookie(name) {
    var strcookie = document.cookie;
    var arr = strcookie.split(";");
    for (var i = 0; i<arr.length; i++) {
		var arrStr = arr[i].split("=");
		if(arrStr[0].trim() == name) {
			return arrStr[1];
		}
    }
    return "";
}

function setCookie(name, value) {
	var date = new Date("12, 31, 9999");
	document.cookie = name + "=" + value + ";expires=" + date.toGMTString() + ";path=/";
}

function resetLoginSetting(url) {
	$.get(url, function(data) {
		if (data.result == $('#statusSuccess').val()) {
			localStorage.clear();
			localStorage.setItem('nextTimeConfirmOpenPreviewWindowTab', 'Y');
			jzMsgBox('<m>確認メッセージが表示されるよう変更しました</m>', '', '300px');
		}
		else if (data.result == $('#statusError').val()){
			jzMsgBox('<m>処理中エラーが発生しました</m>', 'alert');
		}
		else if (data.result == "session_time_out") {
			top.window.location.href = data._domain + "/jsys/login";
		}
	});
}

function logout(tenantBaseUrl) {
	location.href = tenantBaseUrl + "/logout";
}

function checkSessionTimeout(event, xhr, ajaxOptions) {
    if (xhr.readyState == 4) {
        if(xhr.getResponseHeader("x-session-timeout") != null
        		&& xhr.getResponseHeader("x-session-timeout").length > 0) {
            top.window.location.href = xhr.getResponseHeader("x-session-timeout-url");
        }
    }
}

function checkNgWord(event, xhr, ajaxOptions) {
    if (xhr.readyState == 4) {
    		if(xhr.getResponseHeader("x-ng-word-found") != null
        		&& xhr.getResponseHeader("x-ng-word-found").length > 0) {
        	top.window.location.href = xhr.getResponseHeader("x-ng-word-found-url")
        	return;
        }
    }
}

function alertConnectionError(xhr) {
	var connErrorDiv = $('#conn-error-div'), errorMsg='', dialogTitle='', connErrorDivCont='';

	$(".ui-dialog").hide();
	$("#YSContainer").hide();
	var domainUrl = top.jzAppVars().domainUrl;
	if (xhr.readyState == 4) {
		if(xhr.getResponseHeader("x-session-timeout") != null
        		&& xhr.getResponseHeader("x-session-timeout").length > 0) {
            return;
        }else if(xhr.getResponseHeader("x-ng-word-found") != null
        		&& xhr.getResponseHeader("x-ng-word-found").length > 0) {
        	top.window.location.href = xhr.getResponseHeader("x-ng-word-found-url")
        	return;
        }else{
    		dialogTitle = 'エラー';
    		errorMsg = xhr.responseText;
        }
	}
	else {
		dialogTitle = '通信エラー';
		errorMsg = '<p>通信に失敗したため、表示できません。しばらく待ってから操作してください。 <br />また、ネットワークが接続していない場合もありますので、接続を確認してください。</p>';
	}


	if (connErrorDiv.length == 0) {
		connErrorDivCont = '<div id="conn-error-div" class="tx-center ysdialog">';
		connErrorDivCont += '<div style="width: 600px; height: 80px; padding: 10px 15px; padding-left: 100px; text-align: left; margin-bottom: 30px;">';
		connErrorDivCont += '<i style="position: absolute; top:30%; left:50px;" class="fa fa-exclamation-triangle error-msg-icon"></i>';
		connErrorDivCont += errorMsg;
		connErrorDivCont += '</div>';
		connErrorDivCont += '	<ul class="button-group">';
		connErrorDivCont += '		<li><a id="conn-error-close-btn" class="ysdialog-close button recommend" href="javascript:"><span><m>閉じる</m></span></a></li>';
		connErrorDivCont += '	</ul>';
		connErrorDivCont += '</div>';
		connErrorDivCont += '<a id="conn-error-btn" href="#conn-error-div" style="display:none"></a>';
		$('body').append(connErrorDivCont);

		$("#conn-error-btn").YSDialog({dialogTitle: dialogTitle});
		$('#conn-error-close-btn').click(function() {
			$("#YSContainer").hide();
			$(".ui-dialog").hide();
		});
	}
	$('#conn-error-btn').click();
}

$.ajaxSetup({
	cache: false,
	error: function(xhr){alertConnectionError(xhr);}
});

$(document).ajaxComplete(checkSessionTimeout);
$(document).ajaxComplete(checkNgWord);

