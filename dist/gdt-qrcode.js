var L = Object.defineProperty;
var S = (o, e, t) => e in o ? L(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var a = (o, e, t) => (S(o, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as _, mergeDefaults as b, ref as p, watch as f, onMounted as v, onUnmounted as U, openBlock as k, createElementBlock as M } from "vue";
function O(o, e, t = !0) {
  const i = new URL(o);
  return Object.keys(e).forEach((r) => {
    const n = e[r];
    (!t || n != null) && i.searchParams.append(r, n);
  }), i.toString();
}
const R = /^(\d|\.)+$/;
function g(o, e = "px") {
  return typeof o == "number" ? `${o}${e}` : typeof o == "string" && R.test(o) ? `${o}${e}` : o;
}
const y = "https://login-pro.ding.zj.gov.cn", u = {
  domain: y,
  url: `${y}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,
  width: "100%",
  height: 320,
  showLogo: !0,
  onlyShowCode: !1,
  blockLine: !0
};
class E {
  constructor(e, t) {
    a(this, "dom");
    a(this, "domClassName", "gdt-qrcode-wrapper");
    a(this, "options", u);
    a(this, "iframe");
    a(this, "url");
    this.options = {
      ...u,
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
    const { width: t, height: i, showLogo: r, onlyShowCode: n, blockLine: h } = this.updateOptions(e);
    this.iframe.frameBorder = "0", this.iframe.width = g(t), this.iframe.height = g(i), this.iframe.style.marginTop = n ? "-80px" : r ? "0" : "-40px", this.dom.style.display = h ? "block" : "inline-block", this.dom.style.overflow = "hidden";
  }
  destroy() {
    this.iframe && (this.iframe.remove(), this.iframe = void 0), this.url = void 0, this.offMessage();
  }
  formatUrl() {
    const { clientId: e, redirectUri: t, url: i } = this.options;
    return typeof i == "function" ? i(this.options) : O(i, {
      client_id: e,
      redirect_uri: t
    });
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
  props: /* @__PURE__ */ b({
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
  }, u),
  emits: ["load", "scanned"],
  setup(o, { emit: e }) {
    const t = o, i = e, r = p(), n = p();
    function h() {
      n.value && i("load", { ...n.value });
    }
    f(
      [() => t.url, () => t.clientId, () => t.redirectUri],
      ([s, d, c]) => {
        var l;
        (l = n.value) == null || l.update({
          url: s,
          clientId: d,
          redirectUri: c
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
      ([s, d, c, l, C]) => {
        var m;
        (m = n.value) == null || m.updateStyle({
          width: s,
          height: d,
          onlyShowCode: c,
          showLogo: l,
          blockLine: C
        });
      }
    );
    function w(s, d) {
      i("scanned", s, d);
    }
    return v(() => {
      n.value = new E(r.value, {
        ...t,
        onScanned: w
      }), h();
    }), U(() => {
      var s;
      (s = n.value) == null || s.destroy();
    }), (s, d) => (k(), M("div", {
      ref_key: "qrcodeContainerRef",
      ref: r
    }, null, 512));
  }
});
export {
  E as GdtQRCode,
  x as VGdtQRCode,
  u as defaultOptions
};
