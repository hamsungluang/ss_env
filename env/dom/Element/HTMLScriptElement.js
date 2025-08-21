let _script_dom = {};
_script_dom.__proto__ = {};
Object.defineProperty(_script_dom.__proto__, "src", {
    get: function () {
        h_log("_script_dom.__proto__ src get [call]", "arg:", arguments)
        return ''
    }, set: function () {
        h_log("_script_dom.__proto__ src set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "type", {
    get: function () {
        h_log("_script_dom.__proto__ type get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ type set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "noModule", {
    get: function () {
        h_log("_script_dom.__proto__ noModule get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ noModule set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "charset", {
    get: function () {
        h_log("_script_dom.__proto__ charset get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ charset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "async", {
    get: function () {
        h_log("_script_dom.__proto__ async get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ async set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "defer", {
    get: function () {
        h_log("_script_dom.__proto__ defer get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ defer set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "crossOrigin", {
    get: function () {
        h_log("_script_dom.__proto__ crossOrigin get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ crossOrigin set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "text", {
    get: function () {
        h_log("_script_dom.__proto__ text get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ text set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "referrerPolicy", {
    get: function () {
        h_log("_script_dom.__proto__ referrerPolicy get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ referrerPolicy set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "fetchPriority", {
    get: function () {
        h_log("_script_dom.__proto__ fetchPriority get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ fetchPriority set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "event", {
    get: function () {
        h_log("_script_dom.__proto__ event get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ event set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "htmlFor", {
    get: function () {
        h_log("_script_dom.__proto__ htmlFor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ htmlFor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "integrity", {
    get: function () {
        h_log("_script_dom.__proto__ integrity get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ integrity set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "blocking", {
    get: function () {
        h_log("_script_dom.__proto__ blocking get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ blocking set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _HTMLScriptElement = function () {
    h_log("_script_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_script") {
        this.tag_arg = "script" + script_count
        script_count += 1
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLScriptElement.prototype = _script_dom.__proto__;
Object.defineProperty(_script_dom.__proto__, "constructor", {
    value: _HTMLScriptElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "attributionSrc", {
    get: function () {
        h_log("_script_dom.__proto__ attributionSrc get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ attributionSrc set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLScriptElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_script_dom.__proto__.__proto__ = HTMLElement.prototype;
