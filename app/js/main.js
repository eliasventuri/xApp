(function($,window,undefined){$.fn.backstretch=function(images,options){if(images===undefined||images.length===0)$.error("No images were supplied for Backstretch");if($(window).scrollTop()===0)window.scrollTo(0,0);return this.each(function(){var $this=$(this),obj=$this.data("backstretch");if(obj){options=$.extend(obj.options,options);obj.destroy(true)}obj=new Backstretch(this,images,options);$this.data("backstretch",obj)})};$.backstretch=function(images,options){return $("body").backstretch(images,
options).data("backstretch")};$.expr[":"].backstretch=function(elem){return $(elem).data("backstretch")!==undefined};$.fn.backstretch.defaults={centeredX:true,centeredY:true,duration:5E3,fade:0};var styles={wrap:{left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},img:{position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxWidth:"none",zIndex:-999999}};var Backstretch=function(container,images,options){this.options=
$.extend({},$.fn.backstretch.defaults,options||{});this.images=$.isArray(images)?images:[images];$.each(this.images,function(){$("<img />")[0].src=this});this.isBody=container===document.body;this.$container=$(container);this.$root=this.isBody?supportsFixedPosition?$(window):$(document):this.$container;var $existing=this.$container.children(".backstretch").first();this.$wrap=$existing.length?$existing:$('<div class="backstretch"></div>').css(styles.wrap).appendTo(this.$container);if(!this.isBody){var position=
this.$container.css("position"),zIndex=this.$container.css("zIndex");this.$container.css({position:position==="static"?"relative":position,zIndex:zIndex==="auto"?0:zIndex,background:"none"});this.$wrap.css({zIndex:-999998})}this.$wrap.css({position:this.isBody&&supportsFixedPosition?"fixed":"absolute"});this.index=0;this.show(this.index);$(window).on("resize.backstretch",$.proxy(this.resize,this)).on("orientationchange.backstretch",$.proxy(function(){if(this.isBody&&window.pageYOffset===0){window.scrollTo(0,
1);this.resize()}},this))};Backstretch.prototype={resize:function(){try{var bgCSS={left:0,top:0},rootWidth=this.isBody?this.$root.width():this.$root.innerWidth(),bgWidth=rootWidth,rootHeight=this.isBody?window.innerHeight?window.innerHeight:this.$root.height():this.$root.innerHeight(),bgHeight=bgWidth/this.$img.data("ratio"),bgOffset;if(bgHeight>=rootHeight){bgOffset=(bgHeight-rootHeight)/2;if(this.options.centeredY)bgCSS.top="-"+bgOffset+"px"}else{bgHeight=rootHeight;bgWidth=bgHeight*this.$img.data("ratio");
bgOffset=(bgWidth-rootWidth)/2;if(this.options.centeredX)bgCSS.left="-"+bgOffset+"px"}this.$wrap.css({width:rootWidth,height:rootHeight}).find("img:not(.deleteable)").css({width:bgWidth,height:bgHeight}).css(bgCSS)}catch(err){}return this},show:function(index){if(Math.abs(index)>this.images.length-1)return;else this.index=index;var self=this,oldImage=self.$wrap.find("img").addClass("deleteable"),evt=$.Event("backstretch.show",{relatedTarget:self.$container[0]});clearInterval(self.interval);self.$img=
$("<img />").css(styles.img).bind("load",function(e){var imgWidth=this.width||$(e.target).width(),imgHeight=this.height||$(e.target).height();$(this).data("ratio",imgWidth/imgHeight);$(this).fadeIn(self.options.speed||self.options.fade,function(){oldImage.remove();if(!self.paused)self.cycle();self.$container.trigger(evt,self)});self.resize()}).appendTo(self.$wrap);self.$img.attr("src",self.images[index]);return self},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},
prev:function(){return this.show(this.index===0?this.images.length-1:this.index-1)},pause:function(){this.paused=true;return this},resume:function(){this.paused=false;this.next();return this},cycle:function(){if(this.images.length>1){clearInterval(this.interval);this.interval=setInterval($.proxy(function(){if(!this.paused)this.next()},this),this.options.duration)}return this},destroy:function(preserveBackground){$(window).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);
if(!preserveBackground)this.$wrap.remove();this.$container.removeData("backstretch")}};var supportsFixedPosition=function(){var ua=navigator.userAgent,platform=navigator.platform,wkmatch=ua.match(/AppleWebKit\/([0-9]+)/),wkversion=!!wkmatch&&wkmatch[1],ffmatch=ua.match(/Fennec\/([0-9]+)/),ffversion=!!ffmatch&&ffmatch[1],operammobilematch=ua.match(/Opera Mobi\/([0-9]+)/),omversion=!!operammobilematch&&operammobilematch[1],iematch=ua.match(/MSIE ([0-9]+)/),ieversion=!!iematch&&iematch[1];return!((platform.indexOf("iPhone")>
-1||(platform.indexOf("iPad")>-1||platform.indexOf("iPod")>-1))&&(wkversion&&wkversion<534)||(window.operamini&&{}.toString.call(window.operamini)==="[object OperaMini]"||(operammobilematch&&omversion<7458||(ua.indexOf("Android")>-1&&(wkversion&&wkversion<533)||(ffversion&&ffversion<6||("palmGetResource"in window&&(wkversion&&wkversion<534)||(ua.indexOf("MeeGo")>-1&&ua.indexOf("NokiaBrowser/8.5.0")>-1||ieversion&&ieversion<=6)))))))}()})(jQuery,window);


(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X=[].slice,Y={}.hasOwnProperty,Z=function(a,b){function c(){this.constructor=a}for(var d in b)Y.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},$=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};for(u={catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},C=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?a:+new Date},E=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,t=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==E&&(E=function(a){return setTimeout(a,50)},t=function(a){return clearTimeout(a)}),G=function(a){var b,c;return b=C(),(c=function(){var d;return d=C()-b,d>=33?(b=C(),a(d,function(){return E(c)})):setTimeout(c,33-d)})()},F=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?X.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},v=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?X.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)Y.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?v(b[a],e):b[a]=e);return b},q=function(a){var b,c,d,e,f;for(c=b=0,e=0,f=a.length;f>e;e++)d=a[e],c+=Math.abs(d),b++;return c/b},x=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},g=function(){function a(){}return a.prototype.on=function(a,b,c,d){var e;return null==d&&(d=!1),null==this.bindings&&(this.bindings={}),null==(e=this.bindings)[a]&&(e[a]=[]),this.bindings[a].push({handler:b,ctx:c,once:d})},a.prototype.once=function(a,b,c){return this.on(a,b,c,!0)},a.prototype.off=function(a,b){var c,d,e;if(null!=(null!=(d=this.bindings)?d[a]:void 0)){if(null==b)return delete this.bindings[a];for(c=0,e=[];c<this.bindings[a].length;)e.push(this.bindings[a][c].handler===b?this.bindings[a].splice(c,1):c++);return e}},a.prototype.trigger=function(){var a,b,c,d,e,f,g,h,i;if(c=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],null!=(g=this.bindings)?g[c]:void 0){for(e=0,i=[];e<this.bindings[c].length;)h=this.bindings[c][e],d=h.handler,b=h.ctx,f=h.once,d.apply(null!=b?b:this,a),i.push(f?this.bindings[c].splice(e,1):e++);return i}},a}(),j=window.Pace||{},window.Pace=j,v(j,g.prototype),D=j.options=v({},u,window.paceOptions,x()),U=["ajax","document","eventLag","elements"],Q=0,S=U.length;S>Q;Q++)K=U[Q],D[K]===!0&&(D[K]=u[K]);i=function(a){function b(){return V=b.__super__.constructor.apply(this,arguments)}return Z(b,a),b}(Error),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;if(null==this.el){if(a=document.querySelector(D.target),!a)throw new i;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)}return this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(a){i=a}return this.el=void 0},a.prototype.render=function(){var a,b,c,d,e,f,g;if(null==document.querySelector(D.target))return!1;for(a=this.getElement(),d="translate3d("+this.progress+"%, 0, 0)",g=["webkitTransform","msTransform","transform"],e=0,f=g.length;f>e;e++)b=g[e],a.children[0].style[b]=d;return(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(a.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?c="99":(c=this.progress<10?"0":"",c+=0|this.progress),a.children[0].setAttribute("data-progress",""+c)),this.lastRenderedProgress=this.progress},a.prototype.done=function(){return this.progress>=100},a}(),h=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),P=window.XMLHttpRequest,O=window.XDomainRequest,N=window.WebSocket,w=function(a,b){var c,d,e,f;f=[];for(d in b.prototype)try{e=b.prototype[d],f.push(null==a[d]&&"function"!=typeof e?a[d]=e:void 0)}catch(g){c=g}return f},A=[],j.ignore=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("ignore"),c=b.apply(null,a),A.shift(),c},j.track=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("track"),c=b.apply(null,a),A.shift(),c},J=function(a){var b;if(null==a&&(a="GET"),"track"===A[0])return"force";if(!A.length&&D.ajax){if("socket"===a&&D.ajax.trackWebSockets)return!0;if(b=a.toUpperCase(),$.call(D.ajax.trackMethods,b)>=0)return!0}return!1},k=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){return J(d)&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new P(b),a(c),c};try{w(window.XMLHttpRequest,P)}catch(d){}if(null!=O){window.XDomainRequest=function(){var b;return b=new O,a(b),b};try{w(window.XDomainRequest,O)}catch(d){}}if(null!=N&&D.ajax.trackWebSockets){window.WebSocket=function(a,b){var d;return d=null!=b?new N(a,b):new N(a),J("socket")&&c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d};try{w(window.WebSocket,N)}catch(d){}}}return Z(b,a),b}(h),R=null,y=function(){return null==R&&(R=new k),R},I=function(a){var b,c,d,e;for(e=D.ajax.ignoreURLs,c=0,d=e.length;d>c;c++)if(b=e[c],"string"==typeof b){if(-1!==a.indexOf(b))return!0}else if(b.test(a))return!0;return!1},y().on("request",function(b){var c,d,e,f,g;return f=b.type,e=b.request,g=b.url,I(g)?void 0:j.running||D.restartOnRequestAfter===!1&&"force"!==J(f)?void 0:(d=arguments,c=D.restartOnRequestAfter||0,"boolean"==typeof c&&(c=0),setTimeout(function(){var b,c,g,h,i,k;if(b="socket"===f?e.readyState<2:0<(h=e.readyState)&&4>h){for(j.restart(),i=j.sources,k=[],c=0,g=i.length;g>c;c++){if(K=i[c],K instanceof a){K.watch.apply(K,d);break}k.push(void 0)}return k}},c))}),a=function(){function a(){var a=this;this.elements=[],y().on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d,e;return d=a.type,b=a.request,e=a.url,I(e)?void 0:(c="socket"===d?new n(b):new o(b),this.elements.push(c))},a}(),o=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2},!1),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100},!1);else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),n=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100},!1)}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},D.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d,e,f=this;this.progress=0,a=0,e=[],d=0,c=C(),b=setInterval(function(){var g;return g=C()-c-50,c=C(),e.push(g),e.length>D.eventLag.sampleCount&&e.shift(),a=q(e),++d>=D.eventLag.minSamples&&a<D.eventLag.lagThreshold?(f.progress=100,clearInterval(b)):f.progress=100*(3/(a+3))},50)}return a}(),m=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=D.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=F(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=F(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/D.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,D.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+D.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),L=null,H=null,r=null,M=null,p=null,s=null,j.running=!1,z=function(){return D.restartOnPushState?j.restart():void 0},null!=window.history.pushState&&(T=window.history.pushState,window.history.pushState=function(){return z(),T.apply(window.history,arguments)}),null!=window.history.replaceState&&(W=window.history.replaceState,window.history.replaceState=function(){return z(),W.apply(window.history,arguments)}),l={ajax:a,elements:d,document:c,eventLag:f},(B=function(){var a,c,d,e,f,g,h,i;for(j.sources=L=[],g=["ajax","elements","document","eventLag"],c=0,e=g.length;e>c;c++)a=g[c],D[a]!==!1&&L.push(new l[a](D[a]));for(i=null!=(h=D.extraSources)?h:[],d=0,f=i.length;f>d;d++)K=i[d],L.push(new K(D));return j.bar=r=new b,H=[],M=new m})(),j.stop=function(){return j.trigger("stop"),j.running=!1,r.destroy(),s=!0,null!=p&&("function"==typeof t&&t(p),p=null),B()},j.restart=function(){return j.trigger("restart"),j.stop(),j.start()},j.go=function(){var a;return j.running=!0,r.render(),a=C(),s=!1,p=G(function(b,c){var d,e,f,g,h,i,k,l,n,o,p,q,t,u,v,w;for(l=100-r.progress,e=p=0,f=!0,i=q=0,u=L.length;u>q;i=++q)for(K=L[i],o=null!=H[i]?H[i]:H[i]=[],h=null!=(w=K.elements)?w:[K],k=t=0,v=h.length;v>t;k=++t)g=h[k],n=null!=o[k]?o[k]:o[k]=new m(g),f&=n.done,n.done||(e++,p+=n.tick(b));return d=p/e,r.update(M.tick(b,d)),r.done()||f||s?(r.update(100),j.trigger("done"),setTimeout(function(){return r.finish(),j.running=!1,j.trigger("hide")},Math.max(D.ghostTime,Math.max(D.minTime-(C()-a),0)))):c()})},j.start=function(a){v(D,a),j.running=!0;try{r.render()}catch(b){i=b}return document.querySelector(".pace")?(j.trigger("start"),j.go()):setTimeout(j.start,50)},"function"==typeof define&&define.amd?define(function(){return j}):"object"==typeof exports?module.exports=j:D.startOnPageLoad&&j.start()}).call(this);


var request = require('request'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
    os = require('os'),
    moment = require('moment'),
    gui = require('nw.gui');

	
/*var splashwin = require('nw.gui').Window.open('app://xisquio/app/assets/img/splash.html', {
	'frame': false,  // frameless
	'position': 'center',
	'always-on-top': true,
	"title": "Xisquio APP",
    "toolbar": false,
    "resizable": false,
    "show": true,
	 "width": 300,
    "height": 300,
    "icon": "app/assets/icons/512x512.png"
});
*/
// Window
var win = gui.Window.get();
win.title = 'StormX APP';
var windows = [];

// API endpoint
var endpoint = 'http://stormx.tv/app/';

// App version
var version = '0.5.0';

// Platform 
var isWin = /^win/.test(process.platform);
var isMac = /^darwin/.test(process.platform);
var isMaximized = false;

// App extra variables
var videoData = {};
var languages = {
	'ES': 'Español',
	'EN': 'Inglés',
	'PT': 'Portugués'
}
var genres = [
	{ key: '1', name: 'Drama'},
	{ key: '2', name: 'Comedia'},
	{ key: '3', name: 'Suspenso'},
	{ key: '4', name: 'Terror'},
	{ key: '5', name: 'Acción'},
	{ key: '6', name: 'Ciencia Ficción'},
	{ key: '7', name: 'Animación'},
	{ key: '8', name: 'Infantil'},
	{ key: '9', name: 'Romance'},
	{ key: '10', name: 'Documental'},
	{ key: '11', name: 'Musical'},
	{ key: '12', name: 'Humor'},
	{ key: '13', name: 'Fantástico'},
	{ key: '14', name: 'Aventura'},
	{ key: '15', name: 'Comedia Musical'},
	{ key: '16', name: 'Comedia Romántica'},
	{ key: '18', name: 'Crimen'},
	{ key: '19', name: 'Bélica'},
	{ key: '20', name: 'Deporte'},
	{ key: '21', name: 'Western'},
	{ key: '22', name: 'Dogma'},
	{ key: '23', name: 'Cine Negro'},
	{ key: '24', name: 'Comedia Stand-up'},
	{ key: '25', name: 'Intriga'},
	{ key: '26', name: 'Comedia Negra'},
	{ key: '27', name: 'Comedia Dramática'},
	{ key: '28', name: 'Cortometraje'}
];

// Scrollbar config
var scrollbarOptions = {
	verticalDragMinHeight: 30,
	autoReinitialise:true,
	autoReinitialiseDelay:200,
	animateScroll:true,
	verticalGutter: 0,
	hideFocus: true,
	enableKeyboardNavigation: false,
	mouseWheelSpeed: isWin ? 30 : 3
}

// Create tmp dir
var tmpDir = path.join(os.tmpDir(), 'StormX APP');
if(!fs.existsSync(tmpDir)) { fs.mkdirSync(tmpDir); }

// Debug
var isDebug = true;
console.log(gui.App.argv);



function base64_decode(data) {
 var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec.replace(/\0+$/, '');
}
			    //	$('#detail-view,#main,#menu').hide();


request({
	url: endpoint+'/update',
	method: 'GET',
	json: true
}, function(error, response, data) {
	 if (!error && response.statusCode == 200) {
	 	if (gui.App.argv[0]){
	 				data = gui.App.argv[0].replace('stormx://', '').replace('/','');
			    	console.log(data);
			    	var dat=$.parseJSON(base64_decode(data));
					console.log(dat);
					t.loadView(dat.type+'s', null, dat.id);
									

			;
		}else{
						gui.Shell.openExternal(endpoint);
						win.close();

		}
	} else if (error) {
		t.ajaxError('noconnection');
		$('#init-load').hide();
	}
	//t.delAjaxCall(ac);
	t.loader(true)
	//splashwin.close(true);
	win.show();
	// Hide initial loading screen if error
	//$('#init-load').hide();
})




if (!isDebug) {
    console.log = function () {};
} else {
    function addDeveloperTools(win) {
      // Developer Menu building
      var menubar = new gui.Menu({ type: 'menubar' }),
          developerSubmenu = new gui.Menu(),
          developerItem = new gui.MenuItem({
             label: 'Developer',
             submenu: developerSubmenu
          }),
          debugItem = new gui.MenuItem({
              label: 'Show developer tools',
              click: function () {
                  win.showDevTools();
              }
          });
      menubar.append(developerItem);
      developerSubmenu.append(debugItem);
      win.menu = menubar;

      // Developer Shortcuts
      win.window.document.addEventListener('keydown', function(event){
          // F12 Opens DevTools
          if( event.keyCode == 123 ) { win.showDevTools(); }
          // F11 Reloads
          if( event.keyCode == 122 ) { win.reloadIgnoringCache(); }
      });
    }
    addDeveloperTools(win);
}

function preventDragDrop(win) {
  var preventDefault = function(e) { e.preventDefault() }
  // Prevent dropping files into the window
  win.window.addEventListener("dragover",   preventDefault, false);
  win.window.addEventListener("drop",       preventDefault, false);
  // Prevent dragging files outside the window
  win.window.addEventListener("dragstart",  preventDefault, false);
}
preventDragDrop(win);

var Xapp = function() {
	t = this,
	t.config = {
		version: '1.0',
		video: {
			def: '720',
			lang: 'EN'
		},
		subtitles: {
			show: true,
			size: 30,
			color: '#FFFFFF',
			lang: 'ES'
		},
		orderBy: {
			active: false,
			type: 'name',
			order: 'asc'
		}
	},
	t.ajaxcalls = [],
	t.totalajaxcalls = 0,
	t.gridStyle = 'normal',
	t.lastSearchValue = '',
	t.lastRequest = '',
	t.topButtons = $('.top-buttons'),
	t.loadBarInfo = $('#loading-bar .download-info'),
	t.lastURL = {},
	t.featured = [],
	t.featuredTimeout,

	// Elements
	t.dview = $('#detail-view'),
	t.darkAll = $('#dark-bg'),
	t.darkMain = $('#dark-main'),

	t.init = function() {
		// Delete cache on startup (dev mode)
		localStorage.clear();

		
		// Load config
		t.loadConfig();

		// Toolbar in Windows
		if (isWin) {
			var toolbar = $('#toolbar');

			toolbar.find('.min').click(function() {
				win.minimize();
			})
			toolbar.find('.max').click(function() {
				isMaximized ? win.unmaximize() : win.maximize();
			})
			toolbar.find('.close').click(function() {
				win.close();
			})
			$('body').addClass('isWindows');
		} else if (isMac) {
			$('body').addClass('isMac');
		}

		// Window height containers
		t.resizeElements();

		// Moment lang
		moment.lang('es');

		// Check for updates
		t.checkUpdates();

		// Drop menus
		$('.menu-handler').off('click.menu').on('click.menu',function() {
			t.dropMenu(this);
			return false;
		})


		// Input search focus

		win.on('enter-fullscreen', function() {
			$('body').addClass('fullscreen-mode')
			win.focus();
		})
		win.on('leave-fullscreen', function() {
			$('body').removeClass('fullscreen-mode')
			win.focus();
		})
		win.on('maximize', function () {
			isMaximized = true;
		});
		win.on('unmaximize', function () {
		    isMaximized = false;
		});

		win.on('close', function() {
			this.hide(); // Pretend to be closed already
			t.closeAllWindows();

			// Clean tmp dir
			if (fs.existsSync(tmpDir)) {
				fs.readdir(tmpDir, function(err, files) {
					if (!err) {
						if (files.length > 0) {
							for (var i in files) {
								var filePath = tmpDir + files[i];
								fs.stat(filePath, function(err, stats) {
									if (!err) {
									 	if (stats.isFile()) {
											fs.unlink(filePath);
										}
									}
								});
							}
						}
					}
				})
			}


			if (t.ajaxcalls.length > 0) {
				if (confirm(i18n.__('PENDING_REQUESTS'))) {
					this.close(true);
				} else {
					this.show();
					this.focus();
				}
			}
			return this.close(true);

		});


		
	}

	t.trackPageview = function(url) {
		if (window.ga) {
			ga(['send', 'pageview', '/app'+url]);
		}
	}

	var eztv = '';
var ids=[];

	
	t.comments = function (page, movieId){
		//if (lastMovieId==movieId) return;
		//var lastMovieId=movieId;
				
		/*eztv.getShows({}, function(error, results) {
			$.each(results, function (index,value) {
				ids.push(value.id);
			});
			console.log(ids);
			t.sendShow(826);

		})*/
		
	$('#containercomments').empty();
		$('.comentario,.nombre').val('');
		$('.comentario,.nombre').on('keyup', $.throttle(
			250, function(e) {
				if (e.preventDefault) e.preventDefault();
				var key = e.keyCode;
				switch(key) {
					case 27:
						e.target.value = '';
						break;
					// enter
					case 13:
						if (e.target.value != '') $('.sendcomment').click(); 
						break;
				
				}
			}
		));

		$('.sendcomment').unbind('click');

		$('.sendcomment').click(function(e) {

       			 if (($('.comentario').val().length > 3)&&($('.comentario').val().length < 300)&&($('.nombre').val().length < 20)&&($('.nombre').val().length > 3)){
					 $('.sendcomment').html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
					$.ajax({
					  type: "POST",
					  url: endpoint+"/addcomments.php",
					  data: { movieid: movieId, comentario: $('.comentario').val().replace(/\r?\n/g, ' '),usuario:$('.nombre').val() }
					}).done(function( msg ) {
						date=new Date();
							$('.sendcomment').html('Enviar');
							if (vacio) $('#containercomments').empty();
							$('#containercomments').prepend('<li><div class="usuario">'+$('.nombre').val()+' el '+date.getDate()+'/'+ (date.getMonth()+1)+'/'+date.getFullYear()+' a las '+date.getHours()+':'+date.getMinutes()+'</div><div class="comment">'+$('.comentario').val().replace(/\r?\n/g, ' ')+'</div></li>');
							$('.comentario').val('');
							$('.nombre').val('');
							
						});
				}
		});
		
		
		var url= endpoint+'/comments.php?movieid='+movieId+'&page='+page;
		var ac = t.newAjaxCallId();
		var vacio = false;

		request({
			url: url,
			method: 'GET',
			json: true
		}, function(error, response, data) {
			 if (!error && response.statusCode == 200) {

						if (data.current_page<data.last_page) $('#morecomments').show();
						if (data.current_page==data.last_page) $('#morecomments').hide();
						if (data.total==0){ vacio = true; $('#morecomments').hide();$('#containercomments').html('<li><div class="usuario">No hay críticas disponibles</div></li>')}
						$('#morecomments').html('Cargar más críticas...');
						if (data.data) $.each( data.data, function( index, item){
							$('#containercomments').append('<li><div class="usuario">'+item.usuario+' el '+item.fecha+' a las '+item.hora+'</div><div class="comment">'+item.comentario+'</div></li>')
						})
						$('.scrollbar').jScrollPane(scrollbarOptions);
						$('#morecomments').click(function(e) {
							$('#morecomments').unbind('click');
							$('#morecomments').html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
							t.comments(page+1,movieId);
						});
						
			}
			t.delAjaxCall(ac);
		})
		
		

		
	}





	t.checkUpdates = function() {
		var url = endpoint+'/update';

		var ac = t.newAjaxCallId();

		request({
			url: url,
			method: 'GET',
			json: true
		}, function(error, response, data) {
			 if (!error && response.statusCode == 200) {
				if (data.version != window.version) {
					$('#app-alert').show().find('button').click(function() {
						gui.Shell.openExternal(data.download_url);
					})
						console.log(data.download_url);

				}
			}
			t.delAjaxCall(ac);
		})
		setTimeout(t.checkUpdates, 86400000);
	}

	// Resize elements
	t.resizeElements = function() {
		var he = $(window).height();
		//$('#menu, #main').height(he-$('#menu').offset().top);
		//$('#menu ul').height(he-$('#menu ul').offset().top);
		//$('#grid-container').height(he-$('#grid-container').offset().top);
		$('.scrollbar').jScrollPane(scrollbarOptions);
			//	t.dview.find('.left').height($('#detail-view .head_info.show_info').height());
		//$('.wrap').width($('#detail-view').width());
	}

	// Close all open windows
	t.closeAllWindows = function() {
		for (var i in windows) {
			windows[i].close(true);
		}
		windows = [];
	}

	// Config
	t.loadConfig = function() {
		console.log(localStorage);
		if (localStorage.getItem('config') != null) {
			var config = JSON.parse(localStorage.getItem('config'));
			if (config.version != t.config.version) {
				localStorage.removeItem('config');
			} else {
				t.config = config;
			}
		} else {
			localStorage.setItem('config', JSON.stringify(t.config));
		}
	}

	// Save config
	t.saveConfig = function() {
		localStorage.setItem('config', JSON.stringify(t.config));
	}

	// Ajax calls
	t.newAjaxCallId = function () {
        t.totalajaxcalls++;
        t.ajaxcalls.push(t.totalajaxcalls);
        return t.totalajaxcalls
    }
    t.delAjaxCall = function (id) {
        var i = t.ajaxcalls.indexOf(id);
        if (i != -1) {
            t.ajaxcalls.splice(i, 1)
        }
    }

    // Search
    t.searchList = function(e, suggest) {
    	var q = $.trim(e.target.value);
    	if ((!suggest && q.length <=1) || (suggest && q.length <= 0)) return;

		t.config.orderBy.active = false;
    	t.loadView('search'+(suggest?'/suggest':''), null, null, 'q='+encodeURIComponent(q), null, false, function() {
    		t.updateViewStyle('search');
    	});
    	t.lastSearchValue = q;
    }

    // Load view
	t.loadView = function(type, action, id, vars, page, append, scrollcallback) {
				// Close detail view if open
		//t.closeItemView();

		// Save last URL
		t.lastURL = {
			type: type,
			action: action,
			id: id,
			vars: vars,
			page: page,
			append: append
		}

		// Url variables
		action_url = (action != null) ? '/'+encodeURIComponent(action) : '';
		id_url = (id != null) ? '/'+id : '';
		vars_url = (vars != null) ? vars : '';
		page_url = (page != null) ? '&page='+page : '';

		
		t.trackPageview(action_url+id_url+'?'+vars_url+page_url);
		var url = endpoint+'/'+type+action_url+id_url+'?'+vars_url+page_url;
		console.log(url);

		// Set callback and time for cache
		var callback = function(url, data) {
			// Hide initial loading screen
			//splashwin.close(true);
			win.show();
			$('#init-load').hide();

    		if (id != null) {
				t.renderItemView(data)
				t.trackPageview(id_url+'/'+data.name);
			} else {
				t.renderGrid(data, append)
			}
			if (typeof scrollcallback == 'function') {
				scrollcallback();
			}
    	}, time = 3600000;

    	// Load cached view data
		if (t.isCached(url,time,callback)) return;

		var ac = t.newAjaxCallId();
		t.loader();

		t.lastRequest = url;

		request({
			url: url,
			method: 'GET',
			json: true
		}, function(error, response, data) {
			 if (!error && response.statusCode == 200) {
			 	if (url == t.lastRequest) {
					callback(url, data)
					t.saveCache(url, data);
				}
			} else if (error) {
				t.loadView(type, action, id, vars, page, append, scrollcallback);
				t.ajaxError('noconnection');
			}
			t.delAjaxCall(ac);
			t.loader(true)
			//splashwin.close(true);
			win.show();
			// Hide initial loading screen if error
			$('#init-load').hide();

		})
	}



	// Render item
	t.renderItemView = function(data) {
		
		t.dview.removeClass('closed tvshow episode movie');
		t.darkMain.show();

		t.dview.addClass(data.type || 'movie');

		var finaldata = (data.type == 'episode') ? data.tvshow : data;
		var subtitle = (data.type == 'episode') ? data.tvshow.name : '';
		
		if ((data.type == 'episode')){t.dview.find('.rating-score,.tags').hide();t.dview.find('.year').show()}else{t.dview.find('.rating-score,.tags').show();t.dview.find('.year').hide()}

		//$('.imdb,.trailer').unbind('click');

		//t.dview.find('.imdb').show();
		///t.dview.find('.imdb').click(function(){			   	 gui.Shell.openExternal('http://www.imdb.com/title/tt'+data.id);    			});
		//if ((data.type == 'episode')) t.dview.find('.imdb').click(function(){gui.Shell.openExternal('http://www.imdb.com/title/tt'+data.tvshow.id);});

		t.dview.find('.name').html(data.name);
		t.dview.find('.year').html(subtitle);
		if (finaldata.cover_url) {$('#poster').css({'background-image':'url('+finaldata.cover_url.replace('w185', 'w780')+')' });}
//				t.dview.find('.left').height($('#detail-view .head_info.show_info').height());
//		$('#detail-view').backstretch("destroy");
		//if ((data.type == 'movie')){$('#detail-view').backstretch(endpoint+"/bg?id="+data.id, {fade: 'normal'});}else{$('#detail-view').backstretch(endpoint+"/bgtv?id="+finaldata.id, {fade: 'normal'});}
				

		

		

		


		((data.genre.name != '')&&(data.genre.name)) ? t.dview.find('.genre').show().html(data.genre.name): t.dview.find('.genre').hide();
		((data.language.name != '')&&(data.language.name)) ? t.dview.find('.language').show().html(data.language.name): t.dview.find('.language').hide();
		((data.duration != 'N/A')&&(data.duration)) ? t.dview.find('.duration').show().html(data.duration) : t.dview.find('.duration').parent().hide();

		(data.cast != '') ? t.dview.find('.cast').html(data.cast) : t.dview.find('.plot').html('Sin información');

		(data.director != '') ? t.dview.find('.director').html(data.director) : t.dview.find('.director').html('Sin información');

		(data.plot != '') ? t.dview.find('.plot').html(data.plot) : t.dview.find('.plot').html('Sin sinopsis');

		// Rating
		if (data.rating >0) {t.dview.find('.rating,.rating-score').show();
		t.dview.find('.rating span').show().width(0).animate({width:Math.round(data.rating*100/10)+'%'},2000);
		t.dview.find('.rating-score .score span').show().html(Math.round(data.rating*100)/100);
		}else{t.dview.find('.rating,.rating-score').hide();}
		if ((data.type == 'tvshow')) {	$('body').backstretch(endpoint+"/bgtv/"+data.id, {fade: 'normal'});$('.titulo').html(data.name);}
		if ((data.type == 'movie')) {	$('body').backstretch(endpoint+"/bg/"+data.id, {fade: 'normal'});$('.titulo').html(data.name);}
		if ((data.type == 'episode')) {	$('body').backstretch(endpoint+"/bgep/"+data.id, {fade: 'normal'});$('.titulo').html(data.tvshow.name +' - '+data.name);}
		
		$('.sinopsis').html(data.plot);

		// If TV Show, show seasons and episodes
		if (data.type == 'tvshow') {
			t.dview.find('.action_buttons').hide()
			var seasons_div = t.dview.find('.seasons'), example_div = t.dview.find('.seasons > div.example');
			
			seasons_div.children('div').not(example_div).remove();
			for (var i in data.seasons) {
				var element = example_div.clone().removeClass().appendTo(seasons_div);
				element.find('h3 .number').html(i);

				var ul = element.find('ul');
				for (var n in data.seasons[i]) {
					var li = ul.children('li.example').clone().removeClass().appendTo(ul);
					li.find('.number').html(data.seasons[i][n].number)
					li.find('.name').html(data.seasons[i][n].name)

					//li.find('.rating span').width(Math.round(data.seasons[i][n].rating*10)+'%');

					li.data('id', data.seasons[i][n].id).click(function(e) {
						t.loadView('episodes', null, $(this).data('id'));
					});
				}
			}
			if (seasons_div.hasClass('ui-accordion')) {
				seasons_div.accordion("destroy")
			}
			seasons_div.accordion({
				collapsible: true,
				header: 'h3',
				heightStyle: "content",
				activate: function( event, ui ) {
					t.dview.jScrollPane(scrollbarOptions);
					if (ui.newHeader.length) t.dview.data('jsp').scrollToElement(ui.newHeader, false);
				}
			});
		} else {
			// If episode, episode info
			if (data.type == 'episode') {
				var np = t.dview.find('.nextprevious');
				if (data.prev_episode!=''){
				np.children('.prev').off('click').on('click', function() {
					if (data.prev_episode) t.loadView('episodes', null, data.prev_episode);
				}).css({opacity:1})}else{np.children('.prev').css({opacity:0})}
				if (data.next_episode!=''){
				np.children('.next').off('click').on('click', function() {
					if (data.next_episode) t.loadView('episodes', null, data.next_episode);
				}).css({opacity:1})}else{np.children('.next').css({opacity:0})}
				np.children('.gotoshow').off('click').on('click', function() {
					t.loadView('tvshows', null, data.tvshow.id);
				})
				t.dview.find('.season').html(data.season);
				t.dview.find('.episode').html(data.number);
			}

			// Sources
			if (data.sources != null && data.sources.length > 0) {
				t.dview.find('.action_buttons').show();
				console.log(data.sources);

				// Populate
				//t.populateMenuData(data, 'audio')
				t.populateMenuData(data, 'def')

				// Play-button
				t.dview.find('.play-button').off('click.play').on('click.play', function() {
					t.loadVideo(data);
				});
				t.dview.find('.down-button').off('click.play').on('click.play', function() {
					t.downVideo(data);
				});
				t.dview.find('.down-subs').off('click.play').on('click.play', function() {
					if (data.type == 'movie') {gui.Shell.openExternal(endpoint+'/getsubs/'+data.id+'/'+data.name);}else{ 
						$.each(data.subtitles,function(i,v){ if (data.subtitles[i].def==t.config.video.def) gui.Shell.openExternal(data.subtitles[i].url);})
						}
				});

				t.dview.find('.separator').eq(0).hide();
			} else {
				t.dview.find('.action_buttons').hide()
				t.dview.find('.separator').show();
			}
		}

		t.dview.jScrollPane(scrollbarOptions);
		t.dview.data('jsp').scrollTo(0,0);
		t.darkMain.hide();
		$(".logo").fadeIn();
		// Close events
		$(document).off('.renderitem');
		t.darkMain.off('.renderitem');
		setTimeout(function() {
			$(document).on('keydown.renderitem', function(e) {
	    		if (e.keyCode == 27) {
	    			t.closeItemView();
	    			$(document).off('.renderitem');
	    		}
	    	})
			t.darkMain.on('click.renderitem', function() {
				t.closeItemView();
				$(this).off('.renderitem');
			})
		}, 1);
	}

	t.closeItemView = function() {
		t.dview.addClass('closed')
		t.darkMain.hide();
	}

	// Friendly format date
	t.friendlyDate = function(date) {
		var text = '', ti = moment(date), td = moment().unix()-ti.unix();
		if (td > 86400*2) {
			if (moment().year() != ti.year()) {
				text = ti.format('LLLL');
			} else {
				text = ti.format('LLL');
			}
		} else if (td > 86400) {
			text = ti.fromNow()+', '+ti.format('LT');
		} else {
			text = ti.fromNow();
		}
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	t.populateMenuData = function(data, type) {
		var menu = $('#menu_'+type+' ul');

		// Clean
		menu.find('li:not(.title)').remove();

		// Populate
		var listed = [], first = false;
		if (type == 'audio') {
			// list
			for (var i in data.sources) {
				var audio = data.sources[i].lang, label = (languages[audio]!='undefined'?languages[audio]:audio);
				if ($.inArray(audio,listed) == -1) {
					menu.append('<li data-value="'+audio+'">'+label+'</li>');
					listed.push(audio)
				}
				// Default
				if (!first || audio == t.config.video.lang) {
					t.dview.find('.source-'+type).find('.text').html(label)
					first = true;
				}
			}
		} else {
			// Order sources
			data.sources.sort((function(index){
			    return function(a, b){
			        return (a[index] === b[index] ? 0 : (parseInt(a[index]) < parseInt(b[index]) ? -1 : 1));
			    };
			})('def'));
			// List
			for (var i in data.sources) {
				var def = data.sources[i].def, label = def+'p '+(parseInt(def)>=720?'HD':'SD');

				console.log(def);
				console.log(label);
				if ($.inArray(def,listed) == -1) {
					menu.append('<li data-value="'+def+'">'+label+'</li>');
					listed.push(def)
				}
				// Default
				if (!first || def == t.config.video.def) {
					t.dview.find('.source-'+type).find('.text').html(label)
					first = true;
				}
			}
		}

		menu.find('li:not(.title)').each(function(index) {
			var $this = $(this);
			$this.off('click').on('click', function() {
				var val = $this.attr('data-value');
				// Update config
				if (type=='audio') {
					t.config.video.lang = val;
				} else {
					t.config.video.def = val;
				}
				t.dview.find('.source-'+type).find('.text').html($this.text());
				t.saveConfig();
			})
		})
	}

	// Dropmemenu
    t.dropMenu = function(a, hide) {
	    var a = $(a), m = a.attr('data-menu'), d = $('#menu_'+m);
	    $('.menu-drop').not(d).each(function() {
		    $(document).trigger('click.menudrop_'+$(this).attr('id').replace('menu_', ''))
	    })
		if (hide || d.is(':visible')) {
			d.slideUp(150).animate({opacity:0},{queue:false, duration: 150});
			a.removeClass('sel');
			$(document).off('click.menudrop_'+m)
		} else {
			var width = $(window).width();
			var left = (a.offset().left+d.outerWidth()>width)?width-d.outerWidth():a.offset().left;
			d.css({
				left: (left+d.outerWidth()==width)? left-15 : left,
				top: a.offset().top+a.outerHeight()
			});
			if (d.hasClass('fittowidth')) d.css('min-width',a.outerWidth())
			
			d.css('opacity',0).slideDown(150, function() {
				if (d.hasClass('withscroll')) d.children('ul').jScrollPane(scrollbarOptions);
			}).animate({opacity:1},{queue:false, duration: 150});
			a.addClass('sel');
			$(document).on('click.menudrop_'+m,function() {
				t.dropMenu(a, true);
				$(document).off('click.menudrop_'+m)
			})
		}
		return false;
    }

	// Actualiza el estilo del grid
	t.updateViewStyle = function(style, hidegrid) {
		var grid = $('#main .grid');
		if (hidegrid) grid.hide();
		grid.removeClass('numbered search history tvshowslist');
		switch (style) {
			case 'pick':
				break;
			case 'numbered':
				grid.addClass('numbered');
				break;
			case 'search':
				grid.addClass('search');
				break;
			case 'history':
				grid.addClass('history');
				break;
			default:
				break;
		}
		t.gridStyle = style;
	}

    // Save in cache (con timestamp)
    t.saveCache = function(url, data) {
    	var id = md5(url);
    	localStorage.setItem(id, JSON.stringify({time:new Date().getTime().toString(), value: data}));
    }

	// Local storage (si está cacheado, usa callback) : callback(id, value)
    t.isCached = function(url, time, callback) {
    	if (time==null || time<=0) {
    		return false;
    	}
		var id = md5(url);
		if (localStorage.getItem(id) != null) {
			var j = JSON.parse(localStorage.getItem(id));
    		
			if (t.cacheTime(parseInt(j.time),time)) {
    			if (typeof callback == 'function') {
    				callback(url, j.value);
    			}
    			return true;
			} else {
				localStorage.removeItem(id)
			}
		}
    	return false;
    }
    
    // Update time
    t.cacheTime = function(t,time) {
    	var now = new Date().getTime();
    	if ((now-t) > time) {
    		return false;
    	}
    	return true;
    }

    // Load video from torrent
    t.loadVideo = function(data) {
    	$('#detail-view,#main,#menu').fadeOut();
    	var source = false;
    	for (var i in data.sources) {
    		if (data.sources[i].def == t.config.video.def) {
    			source = data.sources[i];
    			break;
    		}
    	}
    	// Set first source if default (config) not available
    	if (!source) {
	    	for (var i in data.sources) {
    			source = data.sources[i];
    			break;
	    	}
	    }

    	// Loadbar
    	//$('#loading-bar').find('.head').html(i18n.__('LOADING_VIDEO'));
    	$('#loading-bar').find('.msg').html(i18n.__('PLEASE_WAIT_PLAY'));
    	t.loadBarInfo.html(i18n.__('LOADING_TORRENT'));
    	t.loadingBar(0);

    	// Load cancel
    	$('#loading-bar .cancel').show().off('click').on('click', function() {
    		// Cancel loading video
    		t.cancelLoadingVideo();
    	});

    	var title = (data.type=='movie') ? data.name : data.tvshow.name+': '+data.name;

    	playTorrent(source.url, function(err, href) {
    		if (err) {
    			t.cancelLoadingVideo();
    			t.popupAlert(i18n.__('INVALID_FILE'),i18n.__('TORRENT_NOT_LOADED'));
    		} else {
	    		// Hide loading bar
	    		t.loadingBarHide();
	    		// Play
	    		t.playVideo(href, data.subtitles, source, title, data.next_episode);
	    		// Push history
	    		t.addHistory(data);
	    	}
    	}, function(percent, started, speed, active, seeds, timeout, video_id) {
    		if (started) {
    			$(document).trigger('videoLoading'+video_id, [percent, speed, active, seeds]);
    		} else {
	    		// Loading bar
	    		t.loadingBar(percent);
	            t.loadBarInfo.html( seeds>0 ? speed+'/s - '+active+' '+i18n.__('OF')+' '+seeds+' '+i18n.__('SEEDS') : i18n.__('LOOKING_FOR_SEEDS'));

	            // If download is stalled, restart
	            if (timeout) {
	                t.cancelLoadingVideo();
	                $('#detail-view .play-button').click();
	            }
	        }

    	});
    	$(document).on('keydown.loadvideo', function(e) {
    		if (e.keyCode == 27) {
    			t.cancelLoadingVideo();
    		}
    	})
    	
    }

    t.downVideo = function(data) {
    	    	$('#detail-view,#main,#menu').fadeOut();

    	var source = false;
    	for (var i in data.sources) {
    		if (data.sources[i].def == t.config.video.def) {
    			source = data.sources[i];
    			break;
    		}
    	}
    	// Set first source if default (config) not available
    	if (!source) {
	    	for (var i in data.sources) {
    			source = data.sources[i];
    			break;
	    	}
	    }

   		t.popupAlert('Estás por descargar: <span class="titulo"></span><span class="sinopsis"></span>',i18n.__('DOWNLOADING_VIDEO_MSG'));
   		$('.titulo').html(data.name);				
							$('.sinopsis').html(data.plot);
   	 gui.Shell.openExternal(source.url);    
    	
    }


    t.loadTorrent = function(torrent, data, source, title) {
    	playTorrent(torrent, function(err, href) {
    		if (err) {
    			t.cancelLoadingVideo();
    			t.popupAlert(i18n.__('INVALID_FILE'),i18n.__('TORRENT_NOT_LOADED'));
    		} else {
	    		// Hide loading bar
	    		t.loadingBarHide();
	    		// Play
	    		t.playVideo(href, data.subtitles, source, title, data.next_episode);
	    		// Push history
	    		t.addHistory(data);
	    	}
    	}, function(percent, started, speed, active, seeds, timeout, video_id) {
    		if (started) {
    			$(document).trigger('videoLoading'+video_id, [percent, speed, active, seeds]);
    		} else {
	    		// Loading bar
	    		t.loadingBar(percent);
	            t.loadBarInfo.html( seeds>0 ? speed+'/s - '+active+' '+i18n.__('OF')+' '+seeds+' '+i18n.__('SEEDS') : i18n.__('LOOKING_FOR_SEEDS'));

	            // If download is stalled, restart
	            if (timeout) {
	                t.cancelLoadingVideo();
	                $('#detail-view .play-button').click();
	            }
	        }

    	});
    	$(document).on('keydown.loadvideo', function(e) {
    		if (e.keyCode == 27) {
    			t.cancelLoadingVideo();
    		}
    	})
    }

    // Play video
    t.playVideo = function(href, subtitles, source, title, next) {
    	// Set vars
    	var videoData = {
    		title: title,
    		url: href,
    		subtitles: subtitles, 
    		source:source,
    		next:next
    	};
    	// localStorage.setItem('videoData', JSON.stringify(videoData));

    	var player_window = t.createPlayerWindow(title, videoData);
    }

    // Cancel loading video
    t.cancelLoadingVideo = function() {
    	for (var i in window.videos) {
			if (window.videos[i].id == window.videos_last_id) {
				$(document).trigger('closeVideo'+window.videos[i].id);
				break;
			}
		}
		t.loadingBarHide();
    	$(document).off('.loadvideo');
		win.close();

    }

    // Create player window
    t.createPlayerWindow = function(title, videoData) {
    	/*var new_window = gui.Window.open('app://xisquio/app/views/player.html', {
    		title: title,
    		frame: false,
    		toolbar: false,
		    icon: "./app/assets/icons/512x512.png",
    		position: 'center',
    		width: 1280,
    		height: 720,
    		min_width: 640,
    		min_height: 360,
    		focus: true,
			
    	});

    	new_window.on('loaded', function() {*/




var Player = function() {
	p = this,
	p.win = gui.Window.get(),

	p.videoId = 0,

	p.config = {
		video: {
			def: '720',
			lang: 'EN'
		},
		subtitles: {
			show: true,
			size: 30,
			color: '#FFFFFF',
			lang: 'ES'
		}
	},

	p.init = function() {

		// Load config
		p.loadConfig();

		// Check if window exists
		p.checkVideoId();

		// Load data from cache
    	if (videoData != null) {
    		var href = videoData.url, subtitles = videoData.subtitles, source = videoData.source; next = videoData.next;
    	} else {
    		alert(i18n.__('VIDEO_LOAD_ERROR'));
    		p.closeVideo();
    		win.close(true);
    		return;
    	}

		// Set title
		if (win.isWin) {

			// Resize player with toolbar
			$('#video-player').height($(window).height());
			$(window).resize(function() {
				$('#video-player').height($(window).height());
			})
		} else if (win.isMac) {
			$('body').addClass('isMac');
		}

		var player_container = $('#video-player').show();

    	player_container.empty();

		var tracks = '';
		for (var i in subtitles) {
			if (subtitles[i].def == source.def) {
				tracks += '<track kind="subtitles" src="' + subtitles[i].url + '" srclang="'+subtitles[i].lang.toLowerCase()+'" label="'+(languages[subtitles[i].lang]!='undefined'?languages[subtitles[i].lang]:subtitles[i].lang)+'" charset="UTF-8" '+((subtitles[i].lang == p.config.subtitles.lang)?'default':'')+' />';
			}
		}

    	$('<video id="player" width="100%" height="100%" preload autoplay><source src="'+href+'" type="video/mp4" />'+tracks+'</video>').appendTo(player_container);

	    var video = $('video');

	    video.mediaelementplayer({
			videoVolume: 'vertical',
			features: ['playpause','current','progress','duration','fullscreen','volume','tracks','videofit','torrentinfo','fontawesome', 'customtracks'],
			success : function(mediaElement, domObject, player) {
				$('#nextep').fadeOut();
        		t.mePlayer = player;
        		// TODO: Move me into a mediaelement plugin?
				player.container.bind('controlsshown', function() {
					player.container.css('cursor', 'auto')
				})
				player.container.bind('controlshidden', function() {
					player.container.css('cursor', 'none')
				})
				mediaElement.addEventListener('ended', function(e){
	                console.log('termino playback',endpoint+'episodes/'+next);
	                mediaElement.pause()	;
	                if (next!=''&&next){
	                	$('#nextep').fadeIn();
						request({
							url: endpoint+'episodes/'+next,
							method: 'GET',
							json: true
						}, function(error, response, data) {
							 if (!error && response.statusCode == 200) {
							 	console.log(data);
							 	$('.titulo').html(data.tvshow.name +' - '+data.name);

							 	t.loadVideo(data);
							} else if (error) {
								console.log(error);
								
							}
							

						})
					}else{
						gui.Shell.openExternal(endpoint);
					}

	            });
			}
		});

	    // Loading info event
		p.loadVideoStats();

    	// Player events

    	// Draggable video window
    	var player_area = player_container.find('.mejs-layers, video');

    	player_area.canDragWindow();

    	// Click event (fullscreen)
    	player_area.dblclick(function(e) {
    		e.preventDefault();
    		win.toggleKioskMode();
    	});
    	player_container.find('.mejs-fullscreen-button').on('click', function() {
    		win.toggleKioskMode();
    	});

    	// Keyboard events
    	$(document).off('keydown.playercontrol').on('keydown.playercontrol', function(e) {
			if (e.preventDefault) e.preventDefault();
    		var key = e.keyCode;
    		switch (key) {
    			// Esc
    			case 27:
    				// Quit fullscreen
    				win.leaveKioskMode();
    				break;
    			// F
    			case 70:
    				win.toggleKioskMode();
    				break;
    		}
    	});

    	// Window events
		$('#toolbar .estasviendo,#toolbar .bg').show();
		$('body > div:not(#toolbar,#video-player,#nextep)').remove();

	}

	// Config
	p.loadConfig = function() {
		if (localStorage.getItem('config') != null) {
			p.config = JSON.parse(localStorage.getItem('config'));
		} else {
			localStorage.setItem('config', JSON.stringify(t.config));
		}
	}

	// Save config
	p.saveConfig = function() {
		localStorage.setItem('config', JSON.stringify(t.config));
	}

	// Video id
	p.checkVideoId = function() {
		p.videoId = window.videos_last_id;
	}

	p.loadVideoStats = function() {
		var infodiv = $('#mejs-torrent-info');
		win.window.$(win.window.document).on('videoLoading'+p.videoId, function(event, percent, speed, active, seeds) {
			infodiv.html(seeds>0 ? speed+'/s - '+active+' '+i18n.__('OF')+' '+seeds+' '+i18n.__('SEEDS') : i18n.__('LOOKING_FOR_SEEDS'));
		});
	}

    // Close video
    p.closeVideo = function() {
    	for (var i in win.windows) {
    		if (win.windows[i] == t.win) {
		    	win.windows.splice(i, 1);
		    	break;
		    }
	    }
    	win.trigger('closeVideo'+t.videoId);
    	$(document).off('keypress.playercontrol');
    	win.close();
    }

	// Initialize
	p.init();

}

var player;

// Drag the window by a specific element
(function( $ ){

  $.fn.canDragWindow = function() {

    return this.each(function(ix, element){

      // Since the -drag CSS property fucks up the touch events, this is a hack so we can drag the window by the video anyway.
      var mouseIsDown = false;
      var previousPos = {};

      // TODO: This breaks under multiple screens on Windows (it won't go outside the screen it's on)
      $(element).mousedown(function(event){
        // Only move with the left mouse button
        if( event.button != 0 ){ return; }
        mouseIsDown = true;
        previousPos = {x: event.screenX, y: event.screenY};
      }).mouseup(function(event){
        mouseIsDown = false;
      }).mousemove(function(event){

        var thisPos = {x: event.screenX, y: event.screenY};
        var distance = {x: thisPos.x - previousPos.x, y: thisPos.y - previousPos.y};
        previousPos = thisPos;

        if( mouseIsDown && !win.isKioskMode ){
        	event.preventDefault();
          	window.moveBy(distance.x, distance.y);
        }
      });

    });

  };

})( jQuery );



    		mainWindow = win;
    		player = Player();
    		//win.close(true);

    /*	})*/

    //	windows.push(new_window);
	
    //	return new_window;
    }

    // Add to history
    t.addHistory = function(data) {
    	var history = t.getHistory();
		history.push({date:moment(), data:data});
		localStorage.setItem('history', JSON.stringify(history));
    }

    // Get history
    t.getHistory = function() {
    	if (localStorage.getItem('history') != null) {
			return JSON.parse(localStorage.getItem('history'));
		}
		return [];
    }

    // Clean history
    t.cleanHistory = function() {
    	if (confirm(i18n.__('HISTORY_DELETE_ALERT'))) {
	    	if (localStorage.getItem('history') != null) {
	    		localStorage.removeItem('history');
	    	}
	    	t.renderHistory();
	    }
    }

    // Loading bar
    t.loadingBar = function(percent) {
    	t.darkAll.show();
    	var loadbar = $('#loading-bar').show(), bar = loadbar.children('.bar').children('span');

    	// Loadbar 
    	bar.width(percent+'%');
    }

    // Loading bar hide
    t.loadingBarHide = function() {
    	t.darkAll.hide();
    	$('#loading-bar').hide();
    }

	// Ajax Error
    t.ajaxError = function (act) {
    	var er = $('#alert-msg').fadeIn(), msg = '';
    	switch (act) {
    		case 'noconnection':
    			msg = 'NO_CONNECTION'
    			break;
    		default:
    			msg = 'ERROR_OCURRED'
    			break;
    	}

    	t.popupAlert(i18n.__('ERROR'), i18n.__(msg));
    }

    // Open popup alert
    t.popupAlert = function(title, msg) {
    	t.darkAll.show();
    	var popup = $('#alert-msg').show();
    	if (title.length > 0) {
    		popup.find('.head').show().html(title)
    	} else {
    		popup.find('.head').hide();
    	}	
    	popup.find('.msg').html(msg)

    	popup.css({
    		marginTop: ((popup.outerHeight() / 2)*-1)+'px'
    	})

    	// Esc close popup / click close
    	popup.find('.close').on('click.alert', function() {
    		win.close(true);
    	});
    	$(document).on('keydown.alert', function(e) {
    		if (e.keyCode == 27) {
    			win.close(true);
    		}
    	})
    }

    // Loader indicator
    t.loader = function(hide) {
    	var l = $('#loader');
    	if (hide) {
    		l.hide();
    	} else {
    		l.show();
    	}
    }

    // Top bar buttons
    t.topButtonBar = function(type, action) {
    	t.topButtons.hide();
		$('#featured').hide();
    	if (action == 'history') {
    		$('.history-buttons').show();
    	} else if (action == 'featured') {
    		$('#featured').show();
    		$('.featured-buttons').show();
    	} else {
    		if (type=='movies') {
    			switch (action) {
    				case 'all':
					// Load orderby
		    			$('.movie-buttons').show();
		    			t.loadOrderBy();
    					break;
    				default:
    					
    					break;
    			}
    		} else if (type=='tvshows') {
    			switch (action) {
    				default:
    					break;
    			}
    		}
		}
		$('#history-noitems').hide();
		t.resizeElements();
    }

    // Orderby load
    t.loadOrderBy = function() {
    	var lis = t.topButtons.find('.orderby li');
    	lis.removeClass('asc desc');
    	if (t.config.orderBy.active) t.topButtons.find('li.'+t.config.orderBy.type).addClass(t.config.orderBy.order);
    }

    // Set orderby
    t.setOrderBy = function(type, order) {
    	t.config.orderBy.active = true;
    	t.config.orderBy.type = type;
    	t.config.orderBy.order = order;
    	t.saveConfig();
    	t.loadOrderBy();
    }

    // Set genre
    t.setGenre = function(id, notload) {
    	if (id == '') {
			$('#select-genre .text').html('Género');
    		if (!notload) t.loadView(t.lastURL.type, t.lastURL.action);
    	} else {
    		if (!notload) t.loadView(t.lastURL.type, t.lastURL.action, null, 'genre='+id);
    	}
    }

	// Initialize
	t.init();
	


}

var c;
	
$(document).ready(function() {
		
	c = new Xapp();
	
});

