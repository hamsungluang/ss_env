let _div_dom = {};
_div_dom.__proto__ = {};
Object.defineProperty(_div_dom.__proto__, "align", {
    get: function () {
        h_log("_div_dom.__proto__ align get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_div_dom.__proto__ align set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _HTMLDivElement = function () {
    h_log("_div_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_div") {
        this.tag_arg = "div" + div_count
        div_count += 1
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLDivElement.prototype = _div_dom.__proto__;
Object.defineProperty(_div_dom.__proto__, "constructor", {
    value: _HTMLDivElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_div_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLDivElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_div_dom.__proto__.__proto__ = HTMLElement.prototype;
