var GdtQRCode=function(u,i){"use strict";const y="https://login-pro.ding.zj.gov.cn",p={domain:y,url:`${y}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,width:220,height:320,showLogo:!0,onlyShowCode:!1};function w(c,s){if(!c){console.warn("[gdt-qrcode]","dom is not exist");return}const e={config:s,dom:c,domClassName:"gdt-qrcode-wrapper",style:void 0,iframe:void 0,url:void 0,render:l,update:d,updateUrl:m,updateStyle:g,messageHandler:a};e.render(),window.addEventListener("message",a);function a(n){var t,o;n.origin.match(e.config.domain)&&((o=(t=e.config).onScanned)==null||o.call(t,n.data.code,n.data))}function l(){e.dom.innerHTML="",e.dom.classList.add(e.domClassName);const n=document.createElement("iframe");e.iframe=n,e.update(),e.dom.appendChild(n)}function d(n){e.iframe&&(r(n),e.updateUrl(),e.updateStyle())}function m(n){e.iframe&&(n&&r({url:n}),e.url=f(),e.iframe.src=e.url)}function g(n){if(!e.iframe)return;const{width:t,height:o,showLogo:_,onlyShowCode:L}=r(n);if(e.iframe.frameBorder="0",e.iframe.width=`${t}px`,e.iframe.height=`${o}px`,e.iframe.style.marginTop=L?"-80px":_?"0":"-40px",!e.style){const h=document.createElement("style");h.innerHTML=`
      .${e.domClassName} {
        display: inline-block;
        overflow: hidden;
      }
      `,e.style=h,e.dom.appendChild(h)}}function r(n){return e.config={...p,...e.config,...n},e.config}function f(){const{clientId:n,redirectUri:t,url:o}=e.config;return typeof o=="function"?o(e.config):`${o}&${C({client_id:n,redirect_uri:t})}`}return e}function C(c,s=!0){const e=new URLSearchParams;for(const a in c)if(Object.hasOwn(c,a)){const l=c[a];(!s||l!=null)&&e.append(a,l)}return e.toString()}const S=i.defineComponent({__name:"QRCode",props:i.mergeDefaults({clientId:{},redirectUri:{},domain:{},url:{type:[String,Function]},width:{},height:{},showLogo:{type:Boolean},onlyShowCode:{type:Boolean},onScanned:{type:Function}},p),emits:["load","scanned"],setup(c,{emit:s}){const e=c,a=s,l=i.ref(),d=i.ref();function m(){d.value&&a("load",{...d.value})}i.watch([()=>e.url,()=>e.clientId,()=>e.redirectUri],([r,f,n])=>{var t;(t=d.value)==null||t.update({url:r,clientId:f,redirectUri:n}),m()}),i.watch([()=>e.width,()=>e.height,()=>e.onlyShowCode,()=>e.showLogo],([r,f,n,t])=>{var o;(o=d.value)==null||o.updateStyle({width:r,height:f,onlyShowCode:n,showLogo:t})});function g(r,f){a("scanned",r,f)}return i.onMounted(()=>{d.value=w(l.value,{...e,onScanned:g}),m()}),i.onUnmounted(()=>{d.value&&window.removeEventListener("message",d.value.messageHandler)}),(r,f)=>(i.openBlock(),i.createElementBlock("div",{ref_key:"qrcodeContainerRef",ref:l},null,512))}});return u.QRCode=S,u.defaultConfig=p,u.initQRCode=w,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),u}({},Vue);