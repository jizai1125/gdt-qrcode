!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).GdtQRCode={},e.Vue)}(this,(function(e,t){"use strict";var o=Object.defineProperty,i=(e,t,i)=>(((e,t,i)=>{t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i})(e,"symbol"!=typeof t?t+"":t,i),i);const n=/^(\d|\.)+$/;function s(e,t="px"){return"number"==typeof e||"string"==typeof e&&n.test(e)?`${e}${t}`:e}const r="https://login-pro.ding.zj.gov.cn",d={domain:r,url:`${r}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,width:"100%",height:320,showLogo:!0,onlyShowCode:!1,blockLine:!0};class a{constructor(e,t){i(this,"dom"),i(this,"domClassName","gdt-qrcode-wrapper"),i(this,"options",d),i(this,"iframe"),i(this,"url"),i(this,"messageHandler",(e=>{var t,o;this.options&&e.origin.match(this.options.domain)&&(null==(o=(t=this.options).onScanned)||o.call(t,e.data.code,e.data))})),this.options={...d,...t},this.dom=e,this.render(),this.registerMessage()}render(e){if(!this.dom)return;this.dom.innerHTML="",this.dom.classList.add(this.domClassName);const t=document.createElement("iframe");this.iframe=t,this.update(e),this.dom.appendChild(t)}update(e){this.updateOptions(e),this.updateUrl(),this.updateStyle()}updateOptions(e){return this.options={...this.options,...e},this.options}updateUrl(e){this.iframe&&(e&&this.updateOptions({url:e}),this.url=this.formatUrl(),this.iframe.src=this.url)}updateStyle(e){if(!this.iframe||!this.dom)return;const{width:t,height:o,showLogo:i,onlyShowCode:n,blockLine:r}=this.updateOptions(e);this.iframe.frameBorder="0",this.iframe.width=s(t),this.iframe.height=s(o),this.iframe.style.marginTop=n?"-80px":i?"0":"-40px",this.dom.style.display=r?"block":"inline-block",this.dom.style.overflow="hidden"}destroy(){this.iframe&&(this.iframe.remove(),this.iframe=void 0),this.url=void 0,this.offMessage()}formatUrl(){const{clientId:e,redirectUri:t,url:o}=this.options;return"function"==typeof o?o(this.options):function(e,t,o=!0){const i=new URL(e);return Object.keys(t).forEach((e=>{const n=t[e];(!o||null!=n)&&i.searchParams.append(e,n)})),i.toString()}(o,{client_id:e,redirect_uri:t})}registerMessage(){this.offMessage(),window.addEventListener("message",this.messageHandler)}offMessage(){window.removeEventListener("message",this.messageHandler)}}const h=t.defineComponent({__name:"QRCode",props:t.mergeDefaults({clientId:{},redirectUri:{},domain:{},url:{type:[String,Function]},width:{},height:{},blockLine:{type:Boolean},showLogo:{type:Boolean},onlyShowCode:{type:Boolean},onScanned:{type:Function}},d),emits:["load","scanned"],setup(e,{emit:o}){const i=e,n=o,s=t.ref(),r=t.ref();function d(){r.value&&n("load",{...r.value})}function h(e,t){n("scanned",e,t)}return t.watch([()=>i.url,()=>i.clientId,()=>i.redirectUri],(([e,t,o])=>{var i;null==(i=r.value)||i.update({url:e,clientId:t,redirectUri:o}),d()})),t.watch([()=>i.width,()=>i.height,()=>i.onlyShowCode,()=>i.showLogo,()=>i.blockLine],(([e,t,o,i,n])=>{var s;null==(s=r.value)||s.updateStyle({width:e,height:t,onlyShowCode:o,showLogo:i,blockLine:n})})),t.onMounted((()=>{r.value=new a(s.value,{...i,onScanned:h}),d()})),t.onUnmounted((()=>{var e;null==(e=r.value)||e.destroy()})),(e,o)=>(t.openBlock(),t.createElementBlock("div",{ref_key:"qrcodeContainerRef",ref:s},null,512))}});e.GdtQRCode=a,e.VGdtQRCode=h,e.defaultOptions=d}));
