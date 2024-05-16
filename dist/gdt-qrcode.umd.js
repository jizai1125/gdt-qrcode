(function(d,o){typeof exports=="object"&&typeof module<"u"?o(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],o):(d=typeof globalThis<"u"?globalThis:d||self,o(d.GdtQRCode={},d.Vue))})(this,function(d,o){"use strict";function C(t,a=!0){const e=new URLSearchParams;for(const c in t)if(Object.hasOwn(t,c)){const f=t[c];(!a||f!=null)&&e.append(c,f)}return e.toString()}const S=/^(\d|\.)+$/;function g(t,a="px"){return typeof t=="number"?`${t}${a}`:typeof t=="string"&&S.test(t)?`${t}${a}`:t}const y="https://login-pro.ding.zj.gov.cn",p={domain:y,url:`${y}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,width:"100%",height:320,showLogo:!0,onlyShowCode:!1,blockLine:!0};function w(t,a){if(!t){console.warn("[gdt-qrcode]","dom is not exist");return}const e={config:a,dom:t,domClassName:"gdt-qrcode-wrapper",iframe:void 0,url:void 0,render:f,update:l,updateUrl:h,updateStyle:u,messageHandler:c};e.render(),window.addEventListener("message",c);function c(n){var s,i;n.origin.match(e.config.domain)&&((i=(s=e.config).onScanned)==null||i.call(s,n.data.code,n.data))}function f(){e.dom.innerHTML="",e.dom.classList.add(e.domClassName);const n=document.createElement("iframe");e.iframe=n,e.update(),e.dom.appendChild(n)}function l(n){e.iframe&&(r(n),e.updateUrl(),e.updateStyle())}function h(n){e.iframe&&(n&&r({url:n}),e.url=m(),e.iframe.src=e.url)}function u(n){if(!e.iframe)return;const{width:s,height:i,showLogo:_,onlyShowCode:R,blockLine:b}=r(n);e.iframe.frameBorder="0",e.iframe.width=g(s),e.iframe.height=g(i),e.iframe.style.marginTop=R?"-80px":_?"0":"-40px",e.dom.style.display=b?"block":"inline-block",e.dom.style.overflow="hidden"}function r(n){return e.config={...p,...e.config,...n},e.config}function m(){const{clientId:n,redirectUri:s,url:i}=e.config;return typeof i=="function"?i(e.config):`${i}&${C({client_id:n,redirect_uri:s})}`}return e}const L=o.defineComponent({__name:"QRCode",props:o.mergeDefaults({clientId:{},redirectUri:{},domain:{},url:{type:[String,Function]},width:{},height:{},blockLine:{type:Boolean},showLogo:{type:Boolean},onlyShowCode:{type:Boolean},onScanned:{type:Function}},p),emits:["scanned"],setup(t,{emit:a}){const e=t,c=a,f=o.ref(),l=o.ref();o.watch([()=>e.url,()=>e.clientId,()=>e.redirectUri],([u,r,m])=>{var n;(n=l.value)==null||n.update({url:u,clientId:r,redirectUri:m})}),o.watch([()=>e.width,()=>e.height,()=>e.onlyShowCode,()=>e.showLogo,()=>e.blockLine],([u,r,m,n,s])=>{var i;(i=l.value)==null||i.updateStyle({width:u,height:r,onlyShowCode:m,showLogo:n,blockLine:s})});function h(u,r){c("scanned",u,r)}return o.onMounted(()=>{l.value=w(f.value,{...e,onScanned:h})}),o.onUnmounted(()=>{l.value&&window.removeEventListener("message",l.value.messageHandler)}),(u,r)=>(o.openBlock(),o.createElementBlock("div",{ref_key:"qrcodeContainerRef",ref:f},null,512))}});d.QRCode=L,d.defaultConfig=p,d.initQRCode=w,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
