import{defineComponent as e,mergeDefaults as t,ref as i,watch as o,onMounted as s,onUnmounted as n,openBlock as r,createElementBlock as a}from"vue";var d=Object.defineProperty,h=(e,t,i)=>(((e,t,i)=>{t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i})(e,"symbol"!=typeof t?t+"":t,i),i);const l=/^(\d|\.)+$/;function u(e,t="px"){return"number"==typeof e||"string"==typeof e&&l.test(e)?`${e}${t}`:e}const p="https://login-pro.ding.zj.gov.cn",c={domain:p,url:`${p}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,width:"100%",height:320,showLogo:!0,onlyShowCode:!1,blockLine:!0};class m{constructor(e,t){h(this,"dom"),h(this,"domClassName","gdt-qrcode-wrapper"),h(this,"options",c),h(this,"iframe"),h(this,"url"),this.options={...c,...t},this.dom=e,this.render(),this.registerMessage()}render(e){if(!this.dom)return;this.dom.innerHTML="",this.dom.classList.add(this.domClassName);const t=document.createElement("iframe");this.iframe=t,this.update(e),this.dom.appendChild(t)}update(e){this.updateOptions(e),this.updateUrl(),this.updateStyle()}updateOptions(e){return this.options={...this.options,...e},this.options}updateUrl(e){this.iframe&&(e&&this.updateOptions({url:e}),this.url=this.formatUrl(),this.iframe.src=this.url)}updateStyle(e){if(!this.iframe||!this.dom)return;const{width:t,height:i,showLogo:o,onlyShowCode:s,blockLine:n}=this.updateOptions(e);this.iframe.frameBorder="0",this.iframe.width=u(t),this.iframe.height=u(i),this.iframe.style.marginTop=s?"-80px":o?"0":"-40px",this.dom.style.display=n?"block":"inline-block",this.dom.style.overflow="hidden"}destroy(){this.iframe&&(this.iframe.remove(),this.iframe=void 0),this.url=void 0,this.offMessage()}formatUrl(){const{clientId:e,redirectUri:t,url:i}=this.options;return"function"==typeof i?i(this.options):`${i}&${function(e,t=!0){const i=new URLSearchParams;for(const o in e)if(Object.hasOwn(e,o)){const s=e[o];(!t||null!=s)&&i.append(o,s)}return i.toString()}({client_id:e,redirect_uri:t})}`}offMessage(){window.removeEventListener("message",this.messageHandler)}registerMessage(){this.offMessage(),window.addEventListener("message",this.messageHandler)}messageHandler(e){var t,i;this.options&&e.origin.match(this.options.domain)&&(null==(i=(t=this.options).onScanned)||i.call(t,e.data.code,e.data))}}const f=e({__name:"QRCode",props:t({clientId:{},redirectUri:{},domain:{},url:{type:[String,Function]},width:{},height:{},blockLine:{type:Boolean},showLogo:{type:Boolean},onlyShowCode:{type:Boolean},onScanned:{type:Function}},c),emits:["load","scanned"],setup(e,{emit:t}){const d=e,h=t,l=i(),u=i();function p(){u.value&&h("load",{...u.value})}function c(e,t){h("scanned",e,t)}return o([()=>d.url,()=>d.clientId,()=>d.redirectUri],(([e,t,i])=>{var o;null==(o=u.value)||o.update({url:e,clientId:t,redirectUri:i}),p()})),o([()=>d.width,()=>d.height,()=>d.onlyShowCode,()=>d.showLogo,()=>d.blockLine],(([e,t,i,o,s])=>{var n;null==(n=u.value)||n.updateStyle({width:e,height:t,onlyShowCode:i,showLogo:o,blockLine:s})})),s((()=>{u.value=new m(l.value,{...d,onScanned:c}),p()})),n((()=>{var e;null==(e=u.value)||e.destroy()})),(e,t)=>(r(),a("div",{ref_key:"qrcodeContainerRef",ref:l},null,512))}});export{m as GdtQRCode,f as VGdtQRCode,c as defaultOptions};
