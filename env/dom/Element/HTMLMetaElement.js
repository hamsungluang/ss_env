let _meta_dom = {};
_meta_dom.__proto__ = {};
Object.defineProperty(_meta_dom.__proto__, "name", {
    get: function () {
        h_log("_meta_dom.__proto__ name get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_meta_dom.__proto__ name set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, "httpEquiv", {
    get: function () {
        h_log("_meta_dom.__proto__ httpEquiv get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_meta_dom.__proto__ httpEquiv set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, "content", {
    get: function () {
        h_log("_meta_dom.__proto__ content get [call]", "arg:", arguments, "this--->", this)
        return this._content
    }, set: function () {
        h_log("_meta_dom.__proto__ content set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, "media", {
    get: function () {
        h_log("_meta_dom.__proto__ media get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_meta_dom.__proto__ media set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, "scheme", {
    get: function () {
        h_log("_meta_dom.__proto__ scheme get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_meta_dom.__proto__ scheme set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _HTMLMetaElement = function () {
    h_log("_meta_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_meta") {
        this.tag_arg = "meta" + meta_count
        meta_count += 1
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLMetaElement.prototype = _meta_dom.__proto__;
Object.defineProperty(_meta_dom.__proto__, "constructor", {
    value: _HTMLMetaElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLMetaElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_meta_dom.__proto__.__proto__ = HTMLElement.prototype;