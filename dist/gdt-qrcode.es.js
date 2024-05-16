import { defineComponent as S, mergeDefaults as _, ref as m, watch as p, onMounted as k, onUnmounted as v, openBlock as R, createElementBlock as U } from "vue";
function b(o, i = !0) {
  const e = new URLSearchParams();
  for (const d in o)
    if (Object.hasOwn(o, d)) {
      const a = o[d];
      (!i || a != null) && e.append(d, a);
    }
  return e.toString();
}
const $ = /^(\d|\.)+$/;
function g(o, i = "px") {
  return typeof o == "number" ? `${o}${i}` : typeof o == "string" && $.test(o) ? `${o}${i}` : o;
}
const h = "https://login-pro.ding.zj.gov.cn", y = {
  domain: h,
  url: `${h}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,
  width: "100%",
  height: 320,
  showLogo: !0,
  onlyShowCode: !1,
  blockLine: !0
};
function x(o, i) {
  if (!o) {
    console.warn("[gdt-qrcode]", "dom is not exist");
    return;
  }
  const e = {
    config: i,
    dom: o,
    domClassName: "gdt-qrcode-wrapper",
    iframe: void 0,
    url: void 0,
    render: a,
    update: f,
    updateUrl: l,
    updateStyle: c,
    messageHandler: d
  };
  e.render(), window.addEventListener("message", d);
  function d(n) {
    var u, t;
    n.origin.match(e.config.domain) && ((t = (u = e.config).onScanned) == null || t.call(u, n.data.code, n.data));
  }
  function a() {
    e.dom.innerHTML = "", e.dom.classList.add(e.domClassName);
    const n = document.createElement("iframe");
    e.iframe = n, e.update(), e.dom.appendChild(n);
  }
  function f(n) {
    e.iframe && (r(n), e.updateUrl(), e.updateStyle());
  }
  function l(n) {
    e.iframe && (n && r({ url: n }), e.url = s(), e.iframe.src = e.url);
  }
  function c(n) {
    if (!e.iframe)
      return;
    const { width: u, height: t, showLogo: w, onlyShowCode: C, blockLine: L } = r(n);
    e.iframe.frameBorder = "0", e.iframe.width = g(u), e.iframe.height = g(t), e.iframe.style.marginTop = C ? "-80px" : w ? "0" : "-40px", e.dom.style.display = L ? "block" : "inline-block", e.dom.style.overflow = "hidden";
  }
  function r(n) {
    return e.config = {
      ...y,
      ...e.config,
      ...n
    }, e.config;
  }
  function s() {
    const { clientId: n, redirectUri: u, url: t } = e.config;
    return typeof t == "function" ? t(e.config) : `${t}&${b({
      client_id: n,
      redirect_uri: u
    })}`;
  }
  return e;
}
const q = /* @__PURE__ */ S({
  __name: "QRCode",
  props: /* @__PURE__ */ _({
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
  }, y),
  emits: ["scanned"],
  setup(o, { emit: i }) {
    const e = o, d = i, a = m(), f = m();
    p(
      [() => e.url, () => e.clientId, () => e.redirectUri],
      ([c, r, s]) => {
        var n;
        (n = f.value) == null || n.update({
          url: c,
          clientId: r,
          redirectUri: s
        });
      }
    ), p(
      [
        () => e.width,
        () => e.height,
        () => e.onlyShowCode,
        () => e.showLogo,
        () => e.blockLine
      ],
      ([c, r, s, n, u]) => {
        var t;
        (t = f.value) == null || t.updateStyle({
          width: c,
          height: r,
          onlyShowCode: s,
          showLogo: n,
          blockLine: u
        });
      }
    );
    function l(c, r) {
      d("scanned", c, r);
    }
    return k(() => {
      f.value = x(a.value, { ...e, onScanned: l });
    }), v(() => {
      f.value && window.removeEventListener("message", f.value.messageHandler);
    }), (c, r) => (R(), U("div", {
      ref_key: "qrcodeContainerRef",
      ref: a
    }, null, 512));
  }
});
export {
  q as QRCode,
  y as defaultConfig,
  x as initQRCode
};
