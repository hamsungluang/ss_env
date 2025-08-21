let _DOMParser = function () {
    h_log("[v] window DOMParser value [call]", "arg:", arguments)
}
_DOMParser.prototype = {}
Object.defineProperty(_DOMParser.prototype, "parseFromString", {
    get: function () {
        h_log("[v] _DOMParser.prototype parseFromString value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOMParser.prototype parseFromString value [call]", "arg:", arguments);
        }
    }, enumerable: true, configurable: true
})
Object.defineProperty(_DOMParser.prototype, "constructor", {
    value:_DOMParser,
    writable:true,
    enumerable:false,
    configurable:true
})
Object.defineProperty(_DOMParser.prototype, Symbol.toStringTag, {
    value:"DOMParser",
    writable:false,
    enumerable:false,
    configurable:true
})
