let _indexedDB = {};
_indexedDB.__proto__ = {};
Object.defineProperty(_indexedDB.__proto__, "cmp", {
    get: function () {
        h_log("[v] _indexedDB.__proto__ cmp value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _indexedDB.__proto__ cmp value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_indexedDB.__proto__, "databases", {
    get: function () {
        h_log("[v] _indexedDB.__proto__ databases value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _indexedDB.__proto__ databases value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_indexedDB.__proto__, "deleteDatabase", {
    get: function () {
        h_log("[v] _indexedDB.__proto__ deleteDatabase value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _indexedDB.__proto__ deleteDatabase value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_indexedDB.__proto__, "open", {
    get: function () {
        h_log("[v] _indexedDB.__proto__ open value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _indexedDB.__proto__ open value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _IDBFactory = function () {
    h_log("_indexedDB.__proto__ constructor value [call]", "arg:", arguments)
};
_IDBFactory.prototype = _indexedDB.__proto__;
Object.defineProperty(_indexedDB.__proto__, "constructor", {
    value: _IDBFactory,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_indexedDB.__proto__, Symbol.toStringTag, {
    value: "IDBFactory",
    writable: false,
    enumerable: false,
    configurable: true,
});