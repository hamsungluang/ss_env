let _plugins = {};
Object.defineProperty(_plugins, "0", {value: {}, writable: false, enumerable: true, configurable: true,});
Object.defineProperty(_plugins, "1", {value: {}, writable: false, enumerable: true, configurable: true,});
Object.defineProperty(_plugins, "2", {value: {}, writable: false, enumerable: true, configurable: true,});
Object.defineProperty(_plugins, "3", {value: {}, writable: false, enumerable: true, configurable: true,});
Object.defineProperty(_plugins, "4", {value: {}, writable: false, enumerable: true, configurable: true,});
Object.defineProperty(_plugins, "PDF Viewer", {value: {}, writable: false, enumerable: false, configurable: true,});
Object.defineProperty(_plugins, "Chrome PDF Viewer", {
    value: {},
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_plugins, "Chromium PDF Viewer", {
    value: {},
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_plugins, "Microsoft Edge PDF Viewer", {
    value: {},
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_plugins, "WebKit built-in PDF", {
    value: {},
    writable: false,
    enumerable: false,
    configurable: true,
});
_plugins.__proto__ = {};
Object.defineProperty(_plugins.__proto__, "length", {
    get: function () {
        h_log("_plugins.__proto__ length get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_plugins.__proto__, "item", {
    get: function () {
        h_log("[v] _plugins.__proto__ item value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _plugins.__proto__ item value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_plugins.__proto__, "namedItem", {
    get: function () {
        h_log("[v] _plugins.__proto__ namedItem value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _plugins.__proto__ namedItem value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_plugins.__proto__, "refresh", {
    get: function () {
        h_log("[v] _plugins.__proto__ refresh value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _plugins.__proto__ refresh value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _PluginArray = function () {
    h_log("_plugins.__proto__ constructor value [call]", "arg:", arguments)
};
_PluginArray.prototype = _plugins.__proto__;
Object.defineProperty(_plugins.__proto__, "constructor", {
    value: _PluginArray,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_plugins.__proto__, Symbol.toStringTag, {
    value: "PluginArray",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_plugins.__proto__, Symbol.iterator, {
    get: function () {
        h_log("[v] _plugins.__proto__ Symbol(Symbol.iterator) value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _plugins.__proto__ Symbol(Symbol.iterator) value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
