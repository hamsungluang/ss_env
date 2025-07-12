let _history = {};
_history.__proto__ = {};
Object.defineProperty(_history.__proto__, "length", {
    get: function () {
        h_log("_history.__proto__ length get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_history.__proto__, "scrollRestoration", {
    get: function () {
        h_log("_history.__proto__ scrollRestoration get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_history.__proto__ scrollRestoration set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_history.__proto__, "state", {
    get: function () {
        h_log("_history.__proto__ state get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_history.__proto__, "back", {
    get: function () {
        h_log("[v] _history.__proto__ back value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ back value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_history.__proto__, "forward", {
    get: function () {
        h_log("[v] _history.__proto__ forward value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ forward value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_history.__proto__, "go", {
    get: function () {
        h_log("[v] _history.__proto__ go value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ go value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_history.__proto__, "pushState", {
    get: function () {
        h_log("[v] _history.__proto__ pushState value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ pushState value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_history.__proto__, "replaceState", {
    get: function () {
        h_log("[v] _history.__proto__ replaceState value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ replaceState value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _History = function () {
    h_log("_history.__proto__ constructor value [call]", "arg:", arguments)
};
_History.prototype = _history.__proto__;
Object.defineProperty(_history.__proto__, "constructor", {
    value: _History,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_history.__proto__, Symbol.toStringTag, {
    value: "History",
    writable: false,
    enumerable: false,
    configurable: true,
});
