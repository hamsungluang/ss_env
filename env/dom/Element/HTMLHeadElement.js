let _head_dom = {};
_head_dom.__proto__ = {};
let _HTMLHeadElement = function () {
    h_log("_head_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_head") {
        this.tag_arg = "head" + head_count
        html_count += 1
        this._children = {}
        return
    }
    throw TypeError("Illegal constructor")
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