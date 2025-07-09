let _screen = {};
_screen.__proto__ = {};
Object.defineProperty(_screen.__proto__, "availWidth", {
    get: function () {
        h_log("_screen.__proto__ availWidth get [call]", "arg:", arguments)
        return 1536
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availHeight", {
    get: function () {
        h_log("_screen.__proto__ availHeight get [call]", "arg:", arguments)
        return 816
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "width", {
    get: function () {
        h_log("_screen.__proto__ width get [call]", "arg:", arguments)
        return 1536
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "height", {
    get: function () {
        h_log("_screen.__proto__ height get [call]", "arg:", arguments)
        return 864
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "colorDepth", {
    get: function () {
        h_log("_screen.__proto__ colorDepth get [call]", "arg:", arguments)
        return 24
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "pixelDepth", {
    get: function () {
        h_log("_screen.__proto__ pixelDepth get [call]", "arg:", arguments)
        return 24
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availLeft", {
    get: function () {
        h_log("_screen.__proto__ availLeft get [call]", "arg:", arguments)
        return 0
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availTop", {
    get: function () {
        h_log("_screen.__proto__ availTop get [call]", "arg:", arguments)
        return 0
    }, set: undefined, enumerable: true, configurable: true,
});

let _orientation = {};
_orientation.__proto__ = {};
Object.defineProperty(_orientation.__proto__, "angle", {
    get: function () {
        h_log("_orientation.__proto__ angle get [call]", "arg:", arguments)
        return 0
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_orientation.__proto__, "type", {
    get: function () {
        h_log("_orientation.__proto__ type get [call]", "arg:", arguments)
        return "landscape-primary"
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_orientation.__proto__, "onchange", {
    get: function () {
        h_log("_orientation.__proto__ onchange get [call]", "arg:", arguments)
        return null
    }, set: function () {
        h_log("_orientation.__proto__ onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_orientation.__proto__, "lock", {
    get: function () {
        h_log("[v] _orientation.__proto__ lock value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _orientation.__proto__ lock value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_orientation.__proto__, "unlock", {
    get: function () {
        h_log("[v] _orientation.__proto__ unlock value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _orientation.__proto__ unlock value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
ScreenOrientation = function () {
    h_log("_orientation.__proto__ constructor value [call]", "arg:", arguments)
};
ScreenOrientation.prototype = _orientation.__proto__;
Object.defineProperty(_orientation.__proto__, "constructor", {
    value: ScreenOrientation,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_orientation.__proto__, Symbol.toStringTag, {
    value: "ScreenOrientation",
    writable: false,
    enumerable: false,
    configurable: true,
});
_orientation.__proto__.__proto__ = eventTarget;

Object.defineProperty(_screen.__proto__, "orientation", {
    get: function () {
        h_log("_screen.__proto__ orientation get [call]", "arg:", arguments)
        return new ScreenOrientation
    }, set: undefined, enumerable: true, configurable: true,
});
let _Screen = function () {
    h_log("_screen.__proto__ constructor value [call]", "arg:", arguments)
};
_Screen.prototype = _screen.__proto__;
Object.defineProperty(_screen.__proto__, "constructor", {
    value: _Screen,
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