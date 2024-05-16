function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import { defineComponent, mergeDefaults, ref, watch, onMounted, onUnmounted, openBlock, createElementBlock } from 'vue';
var C = Object.defineProperty;
var S = function S(o, e, t) {
  return e in o ? C(o, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
  }) : o[e] = t;
};
var d = function d(o, e, t) {
  return S(o, _typeof(e) != "symbol" ? e + "" : e, t), t;
};
function M(o) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
  var t = new URLSearchParams();
  for (var i in o) if (Object.hasOwn(o, i)) {
    var s = o[i];
    (!e || s != null) && t.append(i, s);
  }
  return t.toString();
}
var O = /^(\d|\.)+$/;
function g(o) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "px";
  return typeof o == "number" ? "".concat(o).concat(e) : typeof o == "string" && O.test(o) ? "".concat(o).concat(e) : o;
}
var y = "https://login-pro.ding.zj.gov.cn",
  m = {
    domain: y,
    url: "".concat(y, "/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true"),
    width: "100%",
    height: 320,
    showLogo: !0,
    onlyShowCode: !1,
    blockLine: !0
  };
var $ = /*#__PURE__*/function () {
  function $(e, t) {
    _classCallCheck(this, $);
    d(this, "dom");
    d(this, "domClassName", "gdt-qrcode-wrapper");
    d(this, "options", m);
    d(this, "iframe");
    d(this, "url");
    this.options = _objectSpread(_objectSpread({}, m), t), this.dom = e, this.render(), this.registerMessage();
  }
  return _createClass($, [{
    key: "render",
    value: function render(e) {
      if (!this.dom) return;
      this.dom.innerHTML = "", this.dom.classList.add(this.domClassName);
      var t = document.createElement("iframe");
      this.iframe = t, this.update(e), this.dom.appendChild(t);
    }
  }, {
    key: "update",
    value: function update(e) {
      this.updateOptions(e), this.updateUrl(), this.updateStyle();
    }
  }, {
    key: "updateOptions",
    value: function updateOptions(e) {
      return this.options = _objectSpread(_objectSpread({}, this.options), e), this.options;
    }
  }, {
    key: "updateUrl",
    value: function updateUrl(e) {
      this.iframe && (e && this.updateOptions({
        url: e
      }), this.url = this.formatUrl(), this.iframe.src = this.url);
    }
  }, {
    key: "updateStyle",
    value: function updateStyle(e) {
      if (!this.iframe || !this.dom) return;
      var _this$updateOptions = this.updateOptions(e),
        t = _this$updateOptions.width,
        i = _this$updateOptions.height,
        s = _this$updateOptions.showLogo,
        r = _this$updateOptions.onlyShowCode,
        h = _this$updateOptions.blockLine;
      this.iframe.frameBorder = "0", this.iframe.width = g(t), this.iframe.height = g(i), this.iframe.style.marginTop = r ? "-80px" : s ? "0" : "-40px", this.dom.style.display = h ? "block" : "inline-block", this.dom.style.overflow = "hidden";
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.iframe && (this.iframe.remove(), this.iframe = void 0), this.url = void 0, this.offMessage();
    }
  }, {
    key: "formatUrl",
    value: function formatUrl() {
      var _this$options = this.options,
        e = _this$options.clientId,
        t = _this$options.redirectUri,
        i = _this$options.url;
      return typeof i == "function" ? i(this.options) : "".concat(i, "&").concat(M({
        client_id: e,
        redirect_uri: t
      }));
    }
  }, {
    key: "offMessage",
    value: function offMessage() {
      window.removeEventListener("message", this.messageHandler);
    }
  }, {
    key: "registerMessage",
    value: function registerMessage() {
      this.offMessage(), window.addEventListener("message", this.messageHandler);
    }
  }, {
    key: "messageHandler",
    value: function messageHandler(e) {
      var t, i;
      this.options && e.origin.match(this.options.domain) && ((i = (t = this.options).onScanned) == null || i.call(t, e.data.code, e.data));
    }
  }]);
}();
var x = /* @__PURE__ */defineComponent({
  __name: "QRCode",
  props: /* @__PURE__ */mergeDefaults({
    clientId: {},
    redirectUri: {},
    domain: {},
    url: {
      type: [String, Function]
    },
    width: {},
    height: {},
    blockLine: {
      type: Boolean
    },
    showLogo: {
      type: Boolean
    },
    onlyShowCode: {
      type: Boolean
    },
    onScanned: {
      type: Function
    }
  }, m),
  emits: ["load", "scanned"],
  setup: function setup(o, _ref) {
    var e = _ref.emit;
    var t = o,
      i = e,
      s = ref(),
      r = ref();
    function h() {
      r.value && i("load", _objectSpread({}, r.value));
    }
    watch([function () {
      return t.url;
    }, function () {
      return t.clientId;
    }, function () {
      return t.redirectUri;
    }], function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 3),
        n = _ref3[0],
        a = _ref3[1],
        l = _ref3[2];
      var c;
      (c = r.value) == null || c.update({
        url: n,
        clientId: a,
        redirectUri: l
      }), h();
    }), watch([function () {
      return t.width;
    }, function () {
      return t.height;
    }, function () {
      return t.onlyShowCode;
    }, function () {
      return t.showLogo;
    }, function () {
      return t.blockLine;
    }], function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 5),
        n = _ref5[0],
        a = _ref5[1],
        l = _ref5[2],
        c = _ref5[3],
        L = _ref5[4];
      var p;
      (p = r.value) == null || p.updateStyle({
        width: n,
        height: a,
        onlyShowCode: l,
        showLogo: c,
        blockLine: L
      });
    });
    function w(n, a) {
      i("scanned", n, a);
    }
    return onMounted(function () {
      r.value = new $(s.value, _objectSpread(_objectSpread({}, t), {}, {
        onScanned: w
      })), h();
    }), onUnmounted(function () {
      var n;
      (n = r.value) == null || n.destroy();
    }), function (n, a) {
      return openBlock(), createElementBlock("div", {
        ref_key: "qrcodeContainerRef",
        ref: s
      }, null, 512);
    };
  }
});
export { $ as GdtQRCode, x as VGdtQRCode, m as defaultOptions };
