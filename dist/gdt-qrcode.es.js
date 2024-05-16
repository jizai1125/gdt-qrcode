import { defineComponent as L, mergeDefaults as _, ref as m, watch as p, onMounted as k, onUnmounted as U, openBlock as b, createElementBlock as v } from "vue";
function R(t, i = !0) {
  const e = new URLSearchParams();
  for (const d in t)
    if (Object.hasOwn(t, d)) {
      const a = t[d];
      (!i || a != null) && e.append(d, a);
    }
  return e.toString();
}
const $ = /^(\d|\.)+$/;
function g(t, i = "px") {
  return typeof t == "number" ? `${t}${i}` : typeof t == "string" && $.test(t) ? `${t}${i}` : t;
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
function x(t, i) {
  if (!t) {
    console.warn("[gdt-qrcode]", "dom is not exist");
    return;
  }
  const e = {
    config: i,
    dom: t,
    domClassName: "gdt-qrcode-wrapper",
    iframe: void 0,
    url: void 0,
    render: a,
    update: s,
    updateUrl: l,
    updateStyle: c,
    messageHandler: d
  };
  e.render(), window.addEventListener("message", d);
  function d(n) {
    var u, o;
    n.origin.match(e.config.domain) && ((o = (u = e.config).onScanned) == null || o.call(u, n.data.code, n.data));
  }
  function a() {
    e.dom.innerHTML = "", e.dom.classList.add(e.domClassName);
    const n = document.createElement("iframe");
    e.iframe = n, e.update(), e.dom.appendChild(n);
  }
  function s(n) {
    e.iframe && (r(n), e.updateUrl(), e.updateStyle());
  }
  function l(n) {
    e.iframe && (n && r({ url: n }), e.url = f(), e.iframe.src = e.url);
  }
  function c(n) {
    if (!e.iframe)
      return;
    const { width: u, height: o, showLogo: w, onlyShowCode: C, blockLine: S } = r(n);
    e.iframe.frameBorder = "0", e.iframe.width = g(u), e.iframe.height = g(o), e.iframe.style.marginTop = C ? "-80px" : w ? "0" : "-40px", e.dom.style.display = S ? "block" : "inline-block", e.dom.style.overflow = "hidden";
  }
  function r(n) {
    return e.config = {
      ...y,
      ...e.config,
      ...n
    }, e.config;
  }
  function f() {
    const { clientId: n, redirectUri: u, url: o } = e.config;
    return typeof o == "function" ? o(e.config) : `${o}&${R({
      client_id: n,
      redirect_uri: u
    })}`;
  }
  return e;
}
function q() {
  return Math.random().toString(32).substring(2);
}
const E = /* @__PURE__ */ L({
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
  setup(t, { emit: i }) {
    const e = t, d = i, a = m(), s = m();
    p(
      [() => e.url, () => e.clientId, () => e.redirectUri],
      ([c, r, f]) => {
        var n;
        (n = s.value) == null || n.update({
          url: c,
          clientId: r,
          redirectUri: f
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
      ([c, r, f, n, u]) => {
        var o;
        (o = s.value) == null || o.updateStyle({
          width: c,
          height: r,
          onlyShowCode: f,
          showLogo: n,
          blockLine: u
        });
      }
    );
    function l(c, r) {
      d("scanned", c, r);
    }
    return k(() => {
      s.value = x(a.value, { ...e, onScanned: l });
    }), U(() => {
      s.value && window.removeEventListener("message", s.value.messageHandler);
    }), (c, r) => (b(), v("div", {
      ref_key: "qrcodeContainerRef",
      ref: a
    }, null, 512));
  }
});
export {
  E as QRCode,
  y as defaultConfig,
  q as genUuid,
  x as initQRCode
};
