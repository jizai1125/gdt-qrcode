var C = Object.defineProperty;
var S = (o, e, t) => e in o ? C(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var d = (o, e, t) => (S(o, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as _, mergeDefaults as v, ref as u, watch as f, onMounted as k, onUnmounted as U, openBlock as R, createElementBlock as b } from "vue";
function M(o, e = !0) {
  const t = new URLSearchParams();
  for (const i in o)
    if (Object.hasOwn(o, i)) {
      const s = o[i];
      (!e || s != null) && t.append(i, s);
    }
  return t.toString();
}
const O = /^(\d|\.)+$/;
function g(o, e = "px") {
  return typeof o == "number" ? `${o}${e}` : typeof o == "string" && O.test(o) ? `${o}${e}` : o;
}
const y = "https://login-pro.ding.zj.gov.cn", m = {
  domain: y,
  url: `${y}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,
  width: "100%",
  height: 320,
  showLogo: !0,
  onlyShowCode: !1,
  blockLine: !0
};
class $ {
  constructor(e, t) {
    d(this, "dom");
    d(this, "domClassName", "gdt-qrcode-wrapper");
    d(this, "options", m);
    d(this, "iframe");
    d(this, "url");
    this.options = {
      ...m,
      ...t
    }, this.dom = e, this.render(), this.registerMessage();
  }
  render(e) {
    if (!this.dom)
      return;
    this.dom.innerHTML = "", this.dom.classList.add(this.domClassName);
    const t = document.createElement("iframe");
    this.iframe = t, this.update(e), this.dom.appendChild(t);
  }
  update(e) {
    this.updateOptions(e), this.updateUrl(), this.updateStyle();
  }
  updateOptions(e) {
    return this.options = {
      ...this.options,
      ...e
    }, this.options;
  }
  updateUrl(e) {
    this.iframe && (e && this.updateOptions({ url: e }), this.url = this.formatUrl(), this.iframe.src = this.url);
  }
  updateStyle(e) {
    if (!this.iframe || !this.dom)
      return;
    const { width: t, height: i, showLogo: s, onlyShowCode: r, blockLine: h } = this.updateOptions(e);
    this.iframe.frameBorder = "0", this.iframe.width = g(t), this.iframe.height = g(i), this.iframe.style.marginTop = r ? "-80px" : s ? "0" : "-40px", this.dom.style.display = h ? "block" : "inline-block", this.dom.style.overflow = "hidden";
  }
  destroy() {
    this.iframe && (this.iframe.remove(), this.iframe = void 0), this.url = void 0, this.offMessage();
  }
  formatUrl() {
    const { clientId: e, redirectUri: t, url: i } = this.options;
    return typeof i == "function" ? i(this.options) : `${i}&${M({
      client_id: e,
      redirect_uri: t
    })}`;
  }
  offMessage() {
    window.removeEventListener("message", this.messageHandler);
  }
  registerMessage() {
    this.offMessage(), window.addEventListener("message", this.messageHandler);
  }
  messageHandler(e) {
    var t, i;
    this.options && e.origin.match(this.options.domain) && ((i = (t = this.options).onScanned) == null || i.call(t, e.data.code, e.data));
  }
}
const x = /* @__PURE__ */ _({
  __name: "QRCode",
  props: /* @__PURE__ */ v({
    clientId: {},
    redirectUri: {},
    domain: {},
    url: { type: [String, Function] },
    width: {},
    height: {},
    blockLine: { type: Boolean },
    showLogo: { type: Boolean },
    onlyShowCode: { type: Boolean },
    onScanned: { type: Function }
  }, m),
  emits: ["load", "scanned"],
  setup(o, { emit: e }) {
    const t = o, i = e, s = u(), r = u();
    function h() {
      r.value && i("load", { ...r.value });
    }
    f(
      [() => t.url, () => t.clientId, () => t.redirectUri],
      ([n, a, l]) => {
        var c;
        (c = r.value) == null || c.update({
          url: n,
          clientId: a,
          redirectUri: l
        }), h();
      }
    ), f(
      [
        () => t.width,
        () => t.height,
        () => t.onlyShowCode,
        () => t.showLogo,
        () => t.blockLine
      ],
      ([n, a, l, c, L]) => {
        var p;
        (p = r.value) == null || p.updateStyle({
          width: n,
          height: a,
          onlyShowCode: l,
          showLogo: c,
          blockLine: L
        });
      }
    );
    function w(n, a) {
      i("scanned", n, a);
    }
    return k(() => {
      r.value = new $(s.value, {
        ...t,
        onScanned: w
      }), h();
    }), U(() => {
      var n;
      (n = r.value) == null || n.destroy();
    }), (n, a) => (R(), b("div", {
      ref_key: "qrcodeContainerRef",
      ref: s
    }, null, 512));
  }
});
export {
  $ as GdtQRCode,
  x as VGdtQRCode,
  m as defaultOptions
};
