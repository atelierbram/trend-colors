function getCorrectTextColor(a){"use strict";function b(a){return"#"==a.charAt(0)?a.substring(1,7):a}return(299*function(a){return parseInt(b(a).substring(0,2),16)}(a)+587*function(a){return parseInt(b(a).substring(2,4),16)}(a)+114*function(a){return parseInt(b(a).substring(4,6),16)}(a))/1e3>130?"#000000":"#ffffff"}function colorTile(){"use strict";for(var a=document.querySelectorAll(".tiles li"),b=document.querySelectorAll(".tiles-spring li"),c=document.querySelectorAll(".tiles-fall li"),d=document.querySelectorAll(".modal_item"),e=0;e<a.length;e++)a[e].style.backgroundColor=a[e].dataset.color_hex,a[e].style.color=getCorrectTextColor(a[e].dataset.color_hex);for(var e=0;e<b.length;e++)b[e].addEventListener("mouseover",function(){this.parentNode.parentNode.style.backgroundColor=this.dataset.color_hex}),b[e].addEventListener("click",function(){this.parentNode.parentNode.style.backgroundColor=this.dataset.color_hex});for(var e=0;e<c.length;e++)c[e].addEventListener("mouseover",function(){this.parentNode.parentNode.style.backgroundColor=this.dataset.color_hex}),c[e].addEventListener("click",function(){this.parentNode.parentNode.style.backgroundColor=this.dataset.color_hex});for(var e=0;e<d.length;e++)d[e].style.color=getCorrectTextColor(d[e].dataset.color_hex);for(var f=document.querySelectorAll("[style*='color: rgb(255, 255, 255)']"),e=0;e<f.length;e++)f[e].classList.add("color-white"),f[e].classList.remove("color-black")}colorTile();
function OkayNav(a,b){var c=this,d=Object(b);c.target=findOrElement(a),c.target.setAttribute("data-okay-target",""),c.measure=findOrElement(d.measure)||a.parentNode,c.items="string"==typeof d.items?document.querySelectorAll(d.items):d.items,c.items=c.items||a.querySelectorAll("li"),c.items=Array.prototype.slice.call(c.items),c.items.forEach(function(a){a.setAttribute("data-okay-item","")}),c.toggle=findOrElement(d.toggle)||document.createElement("button"),c.toggle.setAttribute("aria-expanded","false"),c.toggle.setAttribute("aria-hidden",""),c.toggle.setAttribute("data-okay-toggle",""),c.toggle.addEventListener("click",function(){c.toggleOverflow()}),c.toggle.parentNode||(c.toggle.innerHTML='<span class="menu-toggle-tablet_up-arrow"><svg width="10" height="12" viewBox="0 0 10 12" style="width:10px;height:12px"><polygon fill="currentColor" points="2,11 2,1 9,6 "/></svg></span><span class="menu-toggle-tablet_down-arrow"><svg width="12" height="10" viewBox="0 0 12 10" style="width:12px;height:10px"><polygon fill="currentColor" points="1,2 11,2 6,9 "/></svg></span><span class="menu-toggle-tablet_text-more">&nbsp;more&nbsp;&nbsp;&nbsp;</span><span class="menu-toggle-tablet_text-less">&nbsp;less</span>',c.target.appendChild(c.toggle)),c.overflow=findOrElement(d.overflow)||document.createElement("ul"),c.overflow.setAttribute("aria-hidden",""),c.overflow.setAttribute("data-okay-overflow",""),c.overflow.parentNode||c.target.appendChild(c.overflow),c.overflowItems=[],c.padding=d.padding||0,window.addEventListener("resize",function(){c.recalculate()}),c.target.addEventListener("blur",function(a){setTimeout(function(){c.target.contains(document.activeElement)||c.hideOverflow()},16)},!0),c.recalculate()}function findOrElement(a){return"string"==typeof a?document.querySelector(a):a}function getMeasureWidth(a){return getInnerWidth(a.measure)-Array.prototype.reduce.call(a.measure.children,function(a,b){return a+getOuterWidth(b)},0)}function fire(a,b,c){var d=document.createEvent("Event");d.initEvent("okaynav:"+c,!0,!1),d.detail=a,b.dispatchEvent(d)}function getInnerWidth(a){var b=getComputedStyle(a);return a.getBoundingClientRect().width-parseFloat(b.paddingLeft)-parseFloat(b.paddingRight)}function getOuterWidth(a){var b=getComputedStyle(a);return a.getBoundingClientRect().width+parseFloat(b.marginLeft)+parseFloat(b.marginRight)}var oknav=document.getElementById("site-navigation"),span=document.createElement("span");span.innerHTML="&nbsp;",span.className="js-nav-fix",oknav.parentNode.insertBefore(span,oknav),document.addEventListener("DOMContentLoaded",function(){new OkayNav(document.getElementById("site-navigation"))}),OkayNav.prototype.recalculate=function(){var a=this;if(!a._currentAnimationFrame){a._currentAnimationFrame=requestAnimationFrame(function(){delete a._currentAnimationFrame});var b=getMeasureWidth(a);if(b<a.padding)for(var c=a.toggle.hasAttribute("aria-hidden");a.items.length&&b<a.padding;){var d=a.items.pop();c&&(a.toggle.removeAttribute("aria-hidden"),fire(a,a.target,"showtoggle"),c=!1),a.overflowItems.unshift({node:d,parent:d.parentNode,width:getOuterWidth(d)}),a.overflow.appendChild(d),fire(a,d,"hideitem"),b+=a.overflowItems[0].width,b>0&&(b=getMeasureWidth(a))}else if(a.overflowItems.length){for(;a.overflowItems.length&&b>a.overflowItems[0].width+a.padding;){var e=a.overflowItems.shift();e.parent.appendChild(e.node),a.items.push(e.node),b-=e.width,fire(a,e.node,"showitem")}a.overflowItems.length||(a.toggle.setAttribute("aria-expanded","false"),a.toggle.setAttribute("aria-hidden",""),fire(a,a.target,"hidetoggle"),a.overflow.hasAttribute("aria-hidden")||(a.overflow.setAttribute("aria-hidden",""),fire(a,a.target,"hideoverflow")))}}},OkayNav.prototype.showOverflow=function(){var a=this;"false"===a.toggle.getAttribute("aria-expanded")&&(a.toggle.setAttribute("aria-expanded","true"),a.overflow.removeAttribute("aria-hidden",""),fire(a,a.target,"showoverflow"))},OkayNav.prototype.hideOverflow=function(){var a=this;"true"===a.toggle.getAttribute("aria-expanded")&&(a.toggle.setAttribute("aria-expanded","false"),a.overflow.setAttribute("aria-hidden",""),fire(a,a.target,"hideoverflow"))},OkayNav.prototype.toggleOverflow=function(){this.overflow.hasAttribute("aria-hidden")?this.showOverflow():this.hideOverflow()};