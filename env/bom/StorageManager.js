let _storagemanager = {};
_storagemanager.__proto__ = {};
Object.defineProperty(_storagemanager.__proto__, "estimate", {
    get: function () {
        h_log("[v] _storagemanager.__proto__ estimate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _storagemanager.__proto__ estimate value [call]", "arg:", arguments)
            return Promise.resolve({
                "quota": 108095390514,
                "usage": 5650,
                "usageDetails": {
                    "indexedDB": 5650
                }
            });
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_storagemanager.__proto__, "persisted", {
    get: function () {
        h_log("[v] _storagemanager.__proto__ persisted value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _storagemanager.__proto__ persisted value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _StorageManager = function () {
    h_log("_storagemanager.__proto__ constructor value [call]", "arg:", arguments)
};
_StorageManager.prototype = _storagemanager.__proto__;
Object.defineProperty(_storagemanager.__proto__, "constructor", {
    value: _StorageManager,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_storagemanager.__proto__, "getDirectory", {
    get: function () {
        h_log("[v] _storagemanager.__proto__ getDirectory value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _storagemanager.__proto__ getDirectory value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_storagemanager.__proto__, "persist", {
    get: function () {
        h_log("[v] _storagemanager.__proto__ persist value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _storagemanager.__proto__ persist value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_storagemanager.__proto__, Symbol.toStringTag, {
    value: "StorageManager",
    writable: false,
    enumerable: false,
    configurable: true,
});
