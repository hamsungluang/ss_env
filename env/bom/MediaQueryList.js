let _MediaQueryList = {};
_MediaQueryList.__proto__ = {};
Object.defineProperty(_MediaQueryList.__proto__, "media", {
    get: function () {
        h_log("_MediaQueryList.__proto__ media get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_MediaQueryList.__proto__, "matches", {
    get: function () {
        h_log("_MediaQueryList.__proto__ matches get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_MediaQueryList.__proto__, "onchange", {
    get: function () {
        h_log("_MediaQueryList.__proto__ onchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_MediaQueryList.__proto__ onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_MediaQueryList.__proto__, "addListener", {
    get: function () {
        h_log("[v] _MediaQueryList.__proto__ addListener value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _MediaQueryList.__proto__ addListener value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_MediaQueryList.__proto__, "removeListener", {
    get: function () {
        h_log("[v] _MediaQueryList.__proto__ removeListener value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _MediaQueryList.__proto__ removeListener value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
MediaQueryList = function () {
    h_log("_MediaQueryList.__proto__ constructor value [call]", "arg:", arguments)
};
MediaQueryList.prototype = _MediaQueryList.__proto__;
Object.defineProperty(_MediaQueryList.__proto__, "constructor", {
    value: MediaQueryList,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_MediaQueryList.__proto__, Symbol.toStringTag, {
    value: "MediaQueryList",
    writable: false,
    enumerable: false,
    configurable: true,
});
_MediaQueryList.__proto__.__proto__ = eventTarget;
