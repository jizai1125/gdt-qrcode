import { defineComponent as v, mergeDefaults as S, ref as p, watch as h, onMounted as _, onUnmounted as L, openBlock as U, createElementBlock as x } from "vue";
const g = "https://login-pro.ding.zj.gov.cn", y = {
  domain: g,
  url: `${g}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,
  width: 220,
  height: 320,
  showLogo: !0,
  onlyShowCode: !1
};
function R(d, u) {
  if (!d) {
    console.warn("[gdt-qrcode]", "dom is not exist");
    return;
  }
  const e = {
    config: u,
    dom: d,
    domClassName: "gdt-qrcode-wrapper",
    style: void 0,
    iframe: void 0,
    url: void 0,
    render: c,
    update: a,
    updateUrl: l,
    updateStyle: f,
    messageHandler: r
  };
  e.render(), window.addEventListener("message", r);
  function r(n) {
    var o, t;
    n.origin.match(e.config.domain) && ((t = (o = e.config).onScanned) == null || t.call(o, n.data.code, n.data));
  }
  function c() {
    e.dom.innerHTML = "", e.dom.classList.add(e.domClassName);
    const n = document.createElement("iframe");
    e.iframe = n, e.update(), e.dom.appendChild(n);
  }
  function a(n) {
    e.iframe && (i(n), e.updateUrl(), e.updateStyle());
  }
  function l(n) {
    e.iframe && (n && i({ url: n }), e.url = s(), e.iframe.src = e.url);
  }
  function f(n) {
    if (!e.iframe)
      return;
    const { width: o, height: t, showLogo: w, onlyShowCode: C } = i(n);
    if (e.iframe.frameBorder = "0", e.iframe.width = `${o}px`, e.iframe.height = `${t}px`, e.iframe.style.marginTop = C ? "-80px" : w ? "0" : "-40px", !e.style) {
      const m = document.createElement("style");
      m.innerHTML = `
      .${e.domClassName} {
        display: inline-block;
        overflow: hidden;
      }
      `, e.style = m, e.dom.appendChild(m);
    }
  }
  function i(n) {
    return e.config = {
      ...y,
      ...e.config,
      ...n
    }, e.config;
  }
  function s() {
    const { clientId: n, redirectUri: o, url: t } = e.config;
    return typeof t == "function" ? t(e.config) : `${t}&${E({
      client_id: n,
      redirect_uri: o
    })}`;
  }
  return e;
}
function E(d, u = !0) {
  const e = new URLSearchParams();
  for (const r in d)
    if (Object.hasOwn(d, r)) {
      const c = d[r];
      (!u || c != null) && e.append(r, c);
    }
  return e.toString();
}
const k = /* @__PURE__ */ v({
  __name: "QRCode",
  props: /* @__PURE__ */ S({
    clientId: {},
    redirectUri: {},
    domain: {},
    url: { type: [String, Function] },
    width: {},
    height: {},
    showLogo: { type: Boolean },
    onlyShowCode: { type: Boolean },
    onScanned: { type: Function }
  }, y),
  emits: ["load", "scanned"],
  setup(d, { emit: u }) {
    const e = d, r = u, c = p(), a = p();
    function l() {
      a.value && r("load", { ...a.value });
    }
    h(
      [() => e.url, () => e.clientId, () => e.redirectUri],
      ([i, s, n]) => {
        var o;
        (o = a.value) == null || o.update({
          url: i,
          clientId: s,
          redirectUri: n
        }), l();
      }
    ), h(
      [() => e.width, () => e.height, () => e.onlyShowCode, () => e.showLogo],
      ([i, s, n, o]) => {
        var t;
        (t = a.value) == null || t.updateStyle({
          width: i,
          height: s,
          onlyShowCode: n,
          showLogo: o
        });
      }
    );
    function f(i, s) {
      r("scanned", i, s);
    }
    return _(() => {
      a.value = R(c.value, { ...e, onScanned: f }), l();
    }), L(() => {
      a.value && window.removeEventListener("message", a.value.messageHandler);
    }), (i, s) => (U(), x("div", {
      ref_key: "qrcodeContainerRef",
      ref: c
    }, null, 512));
  }
});
export {
  k as QRCode,
  y as defaultConfig,
  R as initQRCode
};
