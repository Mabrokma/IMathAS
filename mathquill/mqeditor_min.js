var MQeditor=function(h){var y={layoutstyle:"auto",layout:[]},u={},l=!1,f=null,i=null,p=null,g=MathQuill.getInterface(MathQuill.getInterface.MAX);function n(n,t,e){var a,o,s,l,i,r,d,c;"string"==typeof n&&(n=document.getElementById(n)),a="boolean"==typeof t?t:"hidden"!=n.type,o=n.id,!0===a?(s=h(n).attr("type","hidden").val(),y.hasOwnProperty("toMQ")&&(s=y.toMQ(s)),0==(l=h("#mqinput-"+o)).length?(i=h("<span/>",{id:"mqinput-"+o,class:"mathquill-math-field",text:s}),null!==(r=n.className.match(/(ansred|ansyel|ansgrn)/))&&i.addClass(r[0]),d=n.hasAttribute("size")?3<n.size?n.size/1.8:n.size:10,i.css("min-width",d+"em"),i.insertAfter(n),c={handlers:{edit:q,enter:w}},y.hasOwnProperty("getLayoutstyle")?y.curlayoutstyle=y.getLayoutstyle():"auto"==y.layoutstyle?y.curlayoutstyle=v():y.curlayoutstyle=y.layoutstyle,"OSK"==y.curlayoutstyle&&(c.substituteTextarea=function(){var t=document.createElement("span");return t.setAttribute("tabindex",0),t},c.keyboardPassthrough=!0),n.disabled?(l=g.StaticMath(i[0]),i.addClass("disabled")):(l=g.MathField(i[0],c).config(u),b(i),h(n).on("change",function(t,e){if(!e){var a=n.value;y.hasOwnProperty("toMQ")&&(a=y.toMQ(a)),l.latex(a)}}))):(l.show(),l=g(l[0]).latex(s)),!0!==e&&l.focus()):(h(n).attr("type","text"),!0!==e&&h(n).focus(),h("#mqinput-"+o).hide())}function b(t){h(t).find(".mq-textarea > *").on("focus.mqeditor",e).on("blur.mqeditor",function(){i=setTimeout(a,100)}),h(t).on("click.mqeditor",function(t){var e=h(t.target).closest("label");if(0<e.length)return"undefined"!==e.attr("for")&&h("#"+e.attr("for")).prop("checked",!0),t.stopPropagation(),!1})}function e(t){var a,e,n,o,s;clearTimeout(i),a=h(t.target).closest(".mathquill-math-field"),!1===l&&(h("body").append(h("<div/>",{id:"mqeditor",class:"mqeditor"})),h("#mqeditor").on("mousedown touchstart",function(t){t.preventDefault()}),l=!0),e=y.curlayoutstyle,y.hasOwnProperty("getLayoutstyle")?y.curlayoutstyle=y.getLayoutstyle():"auto"==y.layoutstyle?y.curlayoutstyle=v():y.curlayoutstyle=y.layoutstyle,"OSK"===y.curlayoutstyle?(h("#mqeditor").addClass("fixedbottom"),document.getElementById("mqe-fb-spacer")||((n=document.createElement("div")).style.height="200px",n.id="mqe-fb-spacer",h("body").append(n))):h("#mqeditor").removeClass("fixedbottom"),o=!1,null!==f&&a[0]==f.el()&&e===y.curlayoutstyle||(o=!0,null!==f&&h("#"+f.el().id.substring(8)).trigger("change",!0),y.hasOwnProperty("getLayout")&&(y.layout=y.getLayout(a[0],y.curlayoutstyle)),h("#mqeditor").empty().show(),y.layout.tabs?function(t,e,a){var n,o,s,l,i,r,d=document.createElement("div");d.className="mqed-row mqed-tabrow";n=document.createElement("div"),l=0;t.appendChild(d),t.appendChild(n);for(i=0;i<e.tabs.length;i++)if(!0===e.tabs[i].enabled)for(l++,E(d,e.tabs[i],a+"-"+i),(s=document.createElement("div")).className="mqed-row mqed-tabpanel",s.id=a+"-"+i+"-tabpanel",n.appendChild(s),r=0;r<e.tabs[i].tabcontent.length;r++)(o=e.tabs[i].tabcontent[r]).hasOwnProperty("flow")&&0==o.contents.length||(o.hasOwnProperty("flow")?C(s,o,a+"-"+i+"-"+r):E(s,o,a+"-"+i+"-"+r));1<l?h(t).find(".mqed-tab").first().addClass("mqed-activetab"):h(d).hide()}(document.getElementById("mqeditor"),y.layout,"mqeditor"):C(document.getElementById("mqeditor"),y.layout,"mqeditor"),h("#mqeditor .mqed-btn.rend").each(function(){g.StaticMath(this,{mouseEvents:!1})}),0<h("#mqeditor .mqed-tabrow").length&&(h("#mqeditor .mqed-tabpanel").hide().first().show(),(s=h("#mqeditor .mqed-tabrow + div")).css("height",s.height()))),"OSK"===y.curlayoutstyle?h("#mqeditor").slideDown(50,function(){var t=h("#mqeditor").height()+5,e=h(window).height()-(a.offset().top+a.outerHeight()-h(window).scrollTop());e<t&&h(window).scrollTop(h(window).scrollTop()+(t-e))}):h("#mqeditor").show(),r(a),f=g.MathField(a[0]),h("#"+a[0].id.substring(8)).triggerHandler("focus"),y.hasOwnProperty("onShow")&&y.onShow(a[0],y.curlayoutstyle,o)}function a(t){"OSK"===y.curlayoutstyle?h("#mqeditor").slideUp(50):h("#mqeditor").hide(),h("#"+f.el().id.substring(8)).trigger("change",!0),f=null}function r(t){var e,a,n,o,s;"under"==y.curlayoutstyle?(a=(e=h(t).closest(".mathquill-math-field")).offset(),n=e.outerHeight(),o=a.left,document.getElementById("mqeditor")&&o+(s=document.getElementById("mqeditor").offsetWidth)>document.documentElement.clientWidth&&(o=document.documentElement.clientWidth-s-5),h("#mqeditor").css("top",a.top+n+3).css("left",o)):h("#mqeditor").css("top","auto").css("left",0)}function q(t){var e,a=t.el();r(a),a.id.match(/mqinput/)&&(e=t.latex(),y.hasOwnProperty("fromMQ")&&(e=y.fromMQ(e)),h("#"+a.id.substring(8)).val(e).trigger("input"),""!=e&&h("#"+a.id.substring(8)).siblings("input[id^=qs][value=spec]").prop("checked",!0),y.hasOwnProperty("onEdit")&&y.onEdit(a.id,e))}function w(t){y.hasOwnProperty("onEnter")&&y.onEnter(t.el().id)}function v(){var t=document.documentElement.clientWidth;return navigator.userAgent.match(/Android/)||navigator.userAgent.match(/iPhone/)||navigator.userAgent.match(/iPad/)||t<500?"OSK":"under"}function C(t,e,a){var n,o,s,l,i,r,d=e.flow,c=100;for(e.hasOwnProperty("s")&&"row"==d&&(c=e.s),n=document.createElement("div"),e.hasOwnProperty("s")&&(n.style.flexGrow=e.s),e.hasOwnProperty("class")&&(n.className=e.class),e.hasOwnProperty("tabpanel")&&(n.id=e.tabpanel.id,n.style.display=e.tabpanel.hidden?"none":""),(o=document.createElement("div")).className="mqed-"+d,r=i=s=0;r<e.contents.length;r++)(l=e.contents[r]).hasOwnProperty("flow")&&0==l.contents.length||(c<s+(i=l.hasOwnProperty("s")?l.s:1)&&(n.appendChild(o),s=0,(o=document.createElement("div")).className="mqed-"+d),l.hasOwnProperty("flow")?C(o,l,a+"-"+r):E(o,l,a+"-"+r),s+=i);n.appendChild(o),t.appendChild(n)}function E(t,e,a){var n,o,s,l,i,r;((o=document.createElement("div")).className="mqed-btn-cont",e.s&&(o.style.flexGrow=e.s),e.contid&&(o.id=e.contid),e.contclass&&h(o).addClass(e.contclass),t.appendChild(o),e.l||e.b||e.p)&&((n=document.createElement("span")).tabIndex=0,e.l?(n.className="mqed-btn rend",n.innerText=e.l,s="c",l=e.l.substring(1)):e.b?(n.className="mqed-btn rend",n.innerHTML=e.b,s="t",((l=e.b).match(/^\d$/)||"."==l)&&h(n).addClass("mqed-digitkey")):(n.className="mqed-btn",n.innerHTML=e.p,s="t",l=e.p),e.c&&("shift"==(s=e.c)?h(n).addClass("mqed-shift"):"k"==s&&h(n).addClass("mqed-navkey")),e.sm&&(n.style.fontSize=100-10*e.sm+"%"),e.w&&(l=e.w),e.tabcontent&&(h(n).addClass("mqed-tab"),s="showtabpanel",l=a+"-tabpanel"),h(n).data("cmdtype",s).data("cmdval",l),h(n).on("click mousedown touchstart keydown",(i=s,r=l,function(t){!function t(e,a,n){var o,s,l,i,r,d,c,u;if(("mousedown"!=e.type||"Backspace"===n)&&!("click"==e.type&&"Backspace"===n||"keydown"==e.type&&"Enter"!==e.key))if("touchstart"==e.type&&(e.preventDefault(),h(e.currentTarget).addClass("mactive")),"t"==a)n.match(/^[a-zA-Z]$/)&&h(e.target).closest(".mqed-tabpanel").find(".mqed-shift").hasClass("active")&&(n=n.toUpperCase()),f.typedText(n);else if("c"==a)f.cmd(n);else if("l"==a)f.latex(n);else if("w"==a){if(f.write(n),m=n.match(/bmatrix}(.*?)(\\\\|\\end{bm)/))for(o=m[1].split(/&/).length,s=0;s<o;s++)f.keystroke("Left")}else"k"==a?(f.keystroke(n),"Backspace"===n&&(p=setTimeout(function(){t(e,a,n)},null===p?600:70))):"m"==a?f.matrixCmd(n):"f"==a?(l=f.getSelection())?(f.write(n+"\\left("+l+"\\right)"),f.keystroke("Left")):n.match(/{}$/)?f.typedText(n.replace(/{}$/,"")):f.write(n):"sf"==a?((l=f.getSelection())?f.write(n+"{"+l+"}"):f.cmd(n),f.keystroke("Left")):"i"==a?((l=f.getSelection())||(l=""),"string"==typeof n?(i=n.charAt(0),r=n.charAt(1),f.write("\\left"+i+l+"\\right"+r)):f.write(n[0]+l+n[1]),""==l&&f.keystroke("Left")):"showtabpanel"==a?((d=h(e.target).closest(".mqed-btn")).closest(".mqeditor").find(".mqed-tabpanel").hide(),d.closest(".mqeditor").find(".mqed-btn.mqed-activetab").removeClass("mqed-activetab"),h("#"+n).show(),d.addClass("mqed-activetab"),y.hasOwnProperty("onTab")&&y.onTab(d[0],y.curlayoutstyle,n)):"shift"==a&&(d=h(e.target).closest(".mqed-btn"),c=h(e.target).closest(".mqed-tabpanel"),(u=!d.hasClass("active"))?d.addClass("active"):d.removeClass("active"),c.find(".mqed-btn").each(function(t,e){var a=e.textContent;a.match(/^[a-zA-Z]$/)&&(e.textContent=u?e.textContent.toUpperCase():e.textContent.toLowerCase())}))}(t,i,r)})).on("touchend",function(t){setTimeout(function(){h(t.currentTarget).removeClass("mactive")},50)}).on("touchend mouseup",function(){clearTimeout(p),p=null}),o.appendChild(n))}return{setConfig:function(t){for(var e in t)y[e]=t[e]},setMQconfig:function(t){u=t},toggleMQ:n,toggleMQAll:function(t,e){var a=e||null;h(t).each(function(t,e){n(e,a,!0)})},attachEditor:b,getLayoutstyle:v,resetEditor:function(){clearTimeout(i),h("#mqeditor").hide()}}}(jQuery);
