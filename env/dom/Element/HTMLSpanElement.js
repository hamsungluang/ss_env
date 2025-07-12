let _span_dom = {};
_span_dom.__proto__ = {};
let _HTMLSpanElement = function () {
    h_log("_span_dom.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLSpanElement.prototype = _span_dom.__proto__;
Object.defineProperty(_span_dom.__proto__, "constructor", {
    value: _HTMLSpanElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_span_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLSpanElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_span_dom.__proto__.__proto__ = HTMLElement.prototype;
