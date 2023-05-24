!function(r,a){"object"==typeof exports&&"object"==typeof module?module.exports=a():"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?exports.DecibelMeter=a():r.DecibelMeter=a()}(this,function(){return function(y){var r={};function a(i){if(r[i])return r[i].exports;var c=r[i]={i,l:!1,exports:{}};return y[i].call(c.exports,c,c.exports,a),c.l=!0,c.exports}return a.m=y,a.c=r,a.i=function(i){return i},a.d=function(i,c,v){a.o(i,c)||Object.defineProperty(i,c,{configurable:!1,enumerable:!0,get:v})},a.n=function(i){var c=i&&i.__esModule?function(){return i.default}:function(){return i};return a.d(c,"a",c),c},a.o=function(i,c){return Object.prototype.hasOwnProperty.call(i,c)},a.p="",a(a.s=3)}([function(y,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=function(){function g(f,n){for(var e=0;e<n.length;e++){var h=n[e];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(f,h.key,h)}}return function(f,n,e){return n&&g(f.prototype,n),e&&g(f,e),f}}(),v=_(a(5)),u=_(a(2)),l=_(a(1)),t=a(4);function _(g){return g&&g.__esModule?g:{default:g}}function m(g,f){if(!(g instanceof f))throw new TypeError("Cannot call a class as a function")}var x=function(){function g(){var f=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,v.default)();m(this,g),this.id=f,this.listening=!1,this.events=new u.default(this),this._connection=null,(0,t.register)(this)}return i(g,[{key:"on",value:function(n,e){return this.events.on(n,e),e}},{key:"off",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this.events.off(n,e),e}},{key:"listen",value:function(){return this.listening||(this.listening=!0,this.events.dispatch("change",this.listening),this.connection&&this.connection.dBAnalyser.start()),this}},{key:"stopListening",value:function(){return this.listening&&(this.connection&&this.connection.dBAnalyser.stop(),this.listening=!1,this.events.dispatch("change",this.listening)),this}},{key:"listenTo",value:function(n,e){var h=this;return this.connectTo(n).then(function(b){return h.events.on("sample",e),b.listen(),h})}},{key:"connect",value:function(n){var e=this;return n instanceof MediaDeviceInfo?this._connection&&this._connection.source===n?Promise.resolve(this):navigator.mediaDevices.getUserMedia({audio:{mandatory:{sourceId:n.deviceId}}}).then(function(b){var p=null,d=void 0;if(e._connection){p=e._connection.source;var k=e._connection.source,M=e._connection.stream,D=M.getAudioTracks().find(function(w){return w.label===k.label});D&&(D.stop(),M.removeTrack(D)),e._connection.dBAnalyser.stop(),e._connection.streamSource.disconnect(),delete e._connection.stream,delete e._connection.streamSource,(d=e._connection).source=n,d.stream=b,d.streamSource=d.context.createMediaStreamSource(b),d.streamSource.connect(d.analyser)}else(d={stream:b,source:n,context:new AudioContext}).analyser=d.context.createAnalyser(),d.analyser.smoothingTimeConstant=.5,d.lastSample=new Uint8Array(1),d.streamSource=d.context.createMediaStreamSource(b),d.streamSource.connect(d.analyser),d.dBAnalyser=new l.default(e),e._connection=d;return e.events.dispatch("connect",n,p),e.listening&&!d.dBAnalyser.running&&d.dBAnalyser.start(),e}):Promise.reject(new TypeError("DecibelMeter: Expected first parameter to be of type MediaDeviceInfo"))}},{key:"connectTo",value:function(n){var e=this;return this.sources.then(function(h){if(0===h.length)throw new ReferenceError("DecibelMeter: No audioinput sources available");if("number"==typeof n)return h[n]?e.connect(h[n]):Promise.reject(new ReferenceError("DecibelMeter: Source not found INDEX "+n));if("string"==typeof n){var b=h.find(function(p){return p.deviceId===n});return b?e.connect(b):Promise.reject(new ReferenceError("DecibelMeter: Source not found DEVICEID "+n))}return Promise.reject(new TypeError("DecibelMeter: Invalid source identifier"))})}},{key:"disconnect",value:function(){var n=this;return this.stopListening(),this.connection&&(this.connection.dBAnalyser.stop(),this.connection.streamSource.disconnect(),this.connection.stream.getAudioTracks().forEach(function(e){return e.stop()})),new Promise(function(e){setTimeout(function(){delete n._connection.stream,delete n._connection.streamSource,n._connection=null,n.events.dispatch("disconnect"),e(n)},100)})}},{key:"source",get:function(){return this._connection&&this._connection.source?this._connection.source:null}},{key:"connection",get:function(){return this._connection}},{key:"sources",get:function(){return navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices?navigator.mediaDevices.enumerateDevices().then(function(n){return n.filter(function(e){return"audioinput"===e.kind})}):Promise.reject(new Error("MediaDevices.enumerateDevices() is not supported"))}},{key:"connected",get:function(){return null!==this._connection}}],[{key:"getMeterById",value:function(n){return(0,t.getById)(n)}},{key:"meters",get:function(){return(0,t.registry)()}}]),g}();r.default=x,y.exports=r.default},function(y,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=function(){function o(u,s){for(var l=0;l<s.length;l++){var t=s[l];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(u,t.key,t)}}return function(u,s,l){return s&&o(u.prototype,s),l&&o(u,l),u}}(),v=function(){function o(u){(function c(o,u){if(!(o instanceof u))throw new TypeError("Cannot call a class as a function")})(this,o),this.meter=u,this._running=!1}return i(o,[{key:"running",get:function(){return this._running}}]),i(o,[{key:"update",value:function(){var s=this,l=this.meter.connection,t=l.analyser,_=l.lastSample;t.getByteFrequencyData(_);var m=_[0],x=m/255;this.meter.events.dispatch("sample",t.minDecibels+(t.maxDecibels-t.minDecibels)*x,m,x,t.minDecibels,t.maxDecibels),this._running&&requestAnimationFrame(function(){return s.update()})}},{key:"start",value:function(){this._running=!0,this.update()}},{key:"stop",value:function(){this._running=!1}}]),o}();r.default=v,y.exports=r.default},function(y,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=function(){function o(u,s){for(var l=0;l<s.length;l++){var t=s[l];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(u,t.key,t)}}return function(u,s,l){return s&&o(u.prototype,s),l&&o(u,l),u}}(),v=function(){function o(u){(function c(o,u){if(!(o instanceof u))throw new TypeError("Cannot call a class as a function")})(this,o),this.context=u,this.eventIndex={}}return i(o,[{key:"index",value:function(s){return this.eventIndex[s]?this.eventIndex[s]:this.eventIndex[s]=[]}},{key:"on",value:function(s,l){this.index(s).push(l)}},{key:"off",value:function(){var s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===s)return this.eventIndex={};var t=this.index(s);if(null===l)return t.splice(0);t.includes(l)&&t.splice(t.indexOf(l),1)}},{key:"dispatch",value:function(s){for(var l=this,t=arguments.length,_=Array(t>1?t-1:0),m=1;m<t;m++)_[m-1]=arguments[m];this.index(s).forEach(function(x){return x.apply(l.context,_)})}}]),o}();r.default=v,y.exports=r.default},function(y,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=a(0);Object.defineProperty(r,"default",{enumerable:!0,get:function(){return function c(v){return v&&v.__esModule?v:{default:v}}(i).default}}),y.exports=r.default},function(y,r,a){"use strict";function i(){return typeof navigator.__decibelMeters>"u"&&(navigator.__decibelMeters={}),navigator.__decibelMeters}Object.defineProperty(r,"__esModule",{value:!0}),r.registry=i,r.register=function c(o){return i()[o.id]=o},r.getById=function v(o){return i()[o]||null}},function(y,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function i(){var c=performance.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(v){var o=(c+16*Math.random())%16|0;return c=Math.floor(c/16),("x"==v?o:3&o|8).toString(16)})},y.exports=r.default}])});