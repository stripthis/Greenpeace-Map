/* Copyright 2010, Avenza Systems Inc. */
"use strict";var AVENZA=(function(){var k="attributes";var r="feature";var s="pan_and_zoom";var d="LOCAL_SANDBOX";var q="NETWORK_SANDBOX";var i="AUTO_SANDBOX";function j(){return(/^file\:/).test(location.href)}function o(u){if(null===u.viewer&&swfobject){u.viewer=swfobject.getObjectById(u.id)}return(null!==u.viewer)}function p(u,v){if(typeof(u.viewer[v])!="undefined"){return true}if(j()){alert("The AVENZA API is not enabled for untrusted local files.  To use the API, first add this address to the list of trusted sites in your Flash Player security panel.")}return false}function a(u){this.id=u;this.viewer=null}a.prototype.panRight=function(){if(o(this)&&p(this,"panRight")){this.viewer.panRight()}};a.prototype.panLeft=function(){if(o(this)&&p(this,"panLeft")){this.viewer.panLeft()}};a.prototype.panUp=function(){if(o(this)&&p(this,"panUp")){this.viewer.panUp()}};a.prototype.panDown=function(){if(o(this)&&p(this,"panDown")){this.viewer.panDown()}};a.prototype.panHome=function(){if(o(this)&&p(this,"panHome")){this.viewer.panHome()}};a.prototype.zoomIn=function(){if(o(this)&&p(this,"zoomIn")){this.viewer.zoomIn()}};a.prototype.zoomOut=function(){if(o(this)&&p(this,"zoomOut")){this.viewer.zoomOut()}};a.prototype.panToPointAndZoom=function(w,v,u){if(o(this)&&p(this,"panToPointAndZoom")){this.viewer.panToPointAndZoom(w,v,u)}};a.prototype.search=function(v,u){if(o(this)&&p(this,"search")){this.viewer.search(v,u)}};a.prototype.setVisible=function(u,v){if(o(this)&&p(this,"swfLayerToggle")){this.viewer.swfLayerToggle(u,v)}};a.prototype.setAlpha=function(u,v){if(o(this)&&p(this,"setAlpha")){this.viewer.setAlpha(u,v)}};a.prototype.subscribe=function(u,v){if(o(this)){if(k==u){if(p(this,"addAttributeObserver")){this.viewer.addAttributeObserver(v)}}else{if(r==u){if(p(this,"addFeatureObserver")){this.viewer.addFeatureObserver(v)}}}}};a.prototype.unsubscribe=function(u,v){if(o(this)){if(k==u){if(p(this,"removeAttributeObserver")){this.viewer.removeAttributeObserver(v)}}else{if(r==u){if(p(this,"removeFeatureObserver")){this.viewer.removeFeatureObserver(v)}}}}};a.prototype.retrieve=function(u){if(o(this)){if(k==u){if(p(this,"getCurrentAttributes")){return this.viewer.getCurrentAttributes()}}else{if(r==u){if(p(this,"getCurrentFeature")){return this.viewer.getCurrentFeature()}}else{if(s==u){if(p(this,"getCurrentPanAndZoom")){return this.viewer.getCurrentPanAndZoom()}}}}}else{return null}};a.prototype.element=function(){if(o(this)){return this.viewer}else{return null}};a.prototype.tween=function(x,v,u,w){if(o(this)&&p(this,"tween")){this.viewer.tween(x,v,u,w)}};a.prototype.features=function(v,u){var w=this;return{forEach:function(x){if(o(w)&&p(w,"forEachFeature")){t=x;var y=w.viewer.forEachFeature(v,"AVENZA.private_visitor",u);if(y){throw y}}},highlight:function(y,x){if(o(w)&&p(w,"highlight")){var z=w.viewer.highlight(v,y,x,u);if(z){throw z}}},reveal:function(x,y){if(o(w)&&p(w,"reveal")){var z=w.viewer.reveal(v,x,y,u);if(z){throw z}}},showCallout:function(){if(o(w)&&p(w,"showCallout")){var x=w.viewer.showCallout(v,u);if(x){throw x}}}}};a.prototype.currentFeature=function(){return this.features("current")};var t;function b(u){if(t){return t(u)}}var n;function l(){if(n){n()}}function e(u){if(window&&window.getComputedStyle){return window.getComputedStyle(u,null)}else{if(u.currentStyle){return u.currentStyle}}return null}function g(v,w){if(j()&&(q!=w)){return false}var x=v.parentNode;var u=e(x).position.toLowerCase();if(u&&(u!="static")){u=e(v).position.toLowerCase();if(!u||(u=="static")){return true}}return false}function f(u){if(u.length>0&&"/"!=u.substring(u.length-1)){u+="/"}return u}function h(w){var u=swfobject.getObjectById(w);if(u&&u.scrollToZoom()){var v=function(x){x=x||event;var y={x:-1,y:-1,delta:x.detail||-x.wheelDelta,ctrlKey:x.ctrlKey,altKey:x.altKey,shiftKey:x.shiftKey};u.handleWheel(y);x.cancelBubble=true;x.returnValue=false;if(x.preventDefault){x.preventDefault()}return false};if(u.addEventListener){u.addEventListener("DOMMouseScroll",v,false);u.addEventListener("mousewheel",v,false)}else{u.onmousewheel=v}}}function m(u,x,G,y){if(!u){return null}x=x||"100%";G=G||"100%";y=y||{};var E=document.getElementById(u);if(E){var F=y.flashSecuritySandbox||q;if(!y.disableBackgroundImageElement&&g(E,F)&&!(x.substr(-1)=="%"||G.substr(-1)=="%")){var w=E.parentNode;var A=y.imageBaseURL||y.baseURL||"";A=f(A);A+="map.png";var D=document.createElement("img");D.src=A;D.style.height=G;D.style.width=x;D.style.position="absolute";D.style.top=0;D.style.left=0;var z=document.createElement("div");z.style.position="relative";z.style.top=0;z.style.left=0;w.insertBefore(D,E);w.insertBefore(z,E);z.appendChild(E)}var v=y.loadedCB||null;var B=y.viewerBaseURL||y.baseURL||"";B=f(B);var C=B;if(y.viewerFileName){C+=y.viewerFileName}else{if(F==i){C+=j()?"MAPublisherViewer-local.swf":"MAPublisherViewer.swf"}else{if(F==d){C+="MAPublisherViewer-local.swf"}else{C+="MAPublisherViewer.swf"}}}n=function(){if(w){setTimeout("AVENZA.private_takeDownLoadingImage()",1000);AVENZA.private_takeDownLoadingImage=function(){w.removeChild(D)}}h(u);if(v){v()}};y.loadedCB="AVENZA.private_cb";swfobject.embedSWF(C,u,x,G,"9.0.115",B+"expressInstall.swf",y,{wmode:"transparent",AllowScriptAccess:"always"})}}function c(x,v,u,w){swfobject.addDomLoadEvent(function(){m(x,v,u,w)});return new a(x)}return{ATTRIBUTES:k,FEATURE:r,PAN_AND_ZOOM:s,LOCAL_SANDBOX:d,NETWORK_SANDBOX:q,AUTO_SANDBOX:i,Viewer:a,embedViewer:c,private_cb:l,private_visitor:b}}());