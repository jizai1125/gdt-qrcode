import { defineComponent as S, mergeDefaults as _, ref as p, watch as g, onMounted as v, onUnmounted as k, openBlock as R, createElementBlock as U } from "vue";
function b(o, c = !0) {
  const e = new URLSearchParams();
  for (const d in o)
    if (Object.hasOwn(o, d)) {
      const u = o[d];
      (!c || u != null) && e.append(d, u);
    }
  return e.toString();
}
const $ = /^(\d|\.)+$/;
function h(o, c = "px") {
  return typeof o == "number" ? `${o}${c}` : typeof o == "string" && $.test(o) ? `${o}${c}` : o;
}
const y = "https://login-pro.ding.zj.gov.cn", w = {
  domain: y,
  url: `${y}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,
  width: "100%",
  height: 320,
  showLogo: !0,
  onlyShowCode: !1,
  blockLine: !0
};
function x(o, c) {
  if (!o) {
    console.warn("[gdt-qrcode]", "dom is not exist");
    return;
  }
  const e = {
    config: c,
    dom: o,
    domClassName: "gdt-qrcode-wrapper",
    iframe: void 0,
    url: void 0,
    render: u,
    update: a,
    updateUrl: s,
    updateStyle: m,
    messageHandler: d
  };
  e.render(), window.addEventListener("message", d);
  function d(n) {
    var t, i;
    n.origin.match(e.config.domain) && ((i = (t = e.config).onScanned) == null || i.call(t, n.data.code, n.data));
  }
  function u() {
    e.dom.innerHTML = "", e.dom.classList.add(e.domClassName);
    const n = document.createElement("iframe");
    e.iframe = n, e.update(), e.dom.appendChild(n);
  }
  function a(n) {
    e.iframe && (r(n), e.updateUrl(), e.updateStyle());
  }
  function s(n) {
    e.iframe && (n && r({ url: n }), e.url = f(), e.iframe.src = e.url);
  }
  function m(n) {
    if (!e.iframe)
      return;
    const { width: t, height: i, showLogo: l, onlyShowCode: C, blockLine: L } = r(n);
    e.iframe.frameBorder = "0", e.iframe.width = h(t), e.iframe.height = h(i), e.iframe.style.marginTop = C ? "-80px" : l ? "0" : "-40px", e.dom.style.display = L ? "block" : "inline-block", e.dom.style.overflow = "hidden";
  }
  function r(n) {
    return e.config = {
      ...w,
      ...e.config,
      ...n
    }, e.config;
  }
  function f() {
    const { clientId: n, redirectUri: t, url: i } = e.config;
    return typeof i == "function" ? i(e.config) : `${i}&${b({
      client_id: n,
      redirect_uri: t
    })}`;
  }
  return e;
}
const E = /* @__PURE__ */ S({
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
  }, w),
  emits: ["load", "scanned"],
  setup(o, { emit: c }) {
    const e = o, d = c, u = p(), a = p();
    function s() {
      a.value && d("load", { ...a.value });
    }
    g(
      [() => e.url, () => e.clientId, () => e.redirectUri],
      ([r, f, n]) => {
        var t;
        (t = a.value) == null || t.update({
          url: r,
          clientId: f,
          redirectUri: n
        }), s();
      }
    ), g(
      [
        () => e.width,
        () => e.height,
        () => e.onlyShowCode,
        () => e.showLogo,
        () => e.blockLine
      ],
      ([r, f, n, t, i]) => {
        var l;
        (l = a.value) == null || l.updateStyle({
          width: r,
          height: f,
          onlyShowCode: n,
          showLogo: t,
          blockLine: i
        });
      }
    );
    function m(r, f) {
      d("scanned", r, f);
    }
    return v(() => {
      a.value = x(u.value, { ...e, onScanned: m }), s();
    }), k(() => {
      a.value && window.removeEventListener("message", a.value.messageHandler);
    }), (r, f) => (R(), U("div", {
      ref_key: "qrcodeContainerRef",
      ref: u
    }, null, 512));
  }
});
export {
  E as QRCode,
  w as defaultConfig,
  x as initQRCode
};
