let _html_dom = {};
_html_dom.__proto__ = {};
Object.defineProperty(_html_dom.__proto__, "version", {
    get: function () {
        h_log("_html_dom.__proto__ version get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_html_dom.__proto__ version set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _HTMLHtmlElement = function () {
    h_log("_html_dom.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLHtmlElement.prototype = _html_dom.__proto__;
Object.defineProperty(_html_dom.__proto__, "constructor", {
    value: _HTMLHtmlElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_html_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLHtmlElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_html_dom.__proto__.__proto__ = HTMLElement.prototype;



