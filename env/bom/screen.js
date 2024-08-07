let _screen = {};
_screen.__proto__ = {};
Object.defineProperty(_screen.__proto__, "availWidth", {
    get: function () {
        h_log("_screen.__proto__ availWidth get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availHeight", {
    get: function () {
        h_log("_screen.__proto__ availHeight get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "width", {
    get: function () {
        h_log("_screen.__proto__ width get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "height", {
    get: function () {
        h_log("_screen.__proto__ height get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "colorDepth", {
    get: function () {
        h_log("_screen.__proto__ colorDepth get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "pixelDepth", {
    get: function () {
        h_log("_screen.__proto__ pixelDepth get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availLeft", {
    get: function () {
        h_log("_screen.__proto__ availLeft get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availTop", {
    get: function () {
        h_log("_screen.__proto__ availTop get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "orientation", {
    get: function () {
        h_log("_screen.__proto__ orientation get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Screen = function () {
    h_log("_screen.__proto__ constructor value [call]", "arg:", arguments)
};
Screen.prototype = _screen.__proto__;
Object.defineProperty(_screen.__proto__, "constructor", {
    value: Screen,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_screen.__proto__, "onchange", {
    get: function () {
        h_log("_screen.__proto__ onchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_screen.__proto__ onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "isExtended", {
    get: function () {
        h_log("_screen.__proto__ isExtended get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, Symbol.toStringTag, {
    value: "Screen",
    writable: false,
    enumerable: false,
    configurable: true,
});
_screen.__proto__.__proto__ = eventTarget;