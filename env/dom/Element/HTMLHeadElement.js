let _head_dom = {};
_head_dom.__proto__ = {};
let _HTMLHeadElement = function () {
    h_log("_head_dom.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLHeadElement.prototype = _head_dom.__proto__;
Object.defineProperty(_head_dom.__proto__, "constructor", {
    value: _HTMLHeadElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_head_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLHeadElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_head_dom.__proto__.__proto__ = HTMLElement.prototype;