let _connection = {};
_connection.__proto__ = {};
Object.defineProperty(_connection.__proto__, "onchange", {
    get: function () {
        h_log("_connection.__proto__ onchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_connection.__proto__ onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_connection.__proto__, "effectiveType", {
    get: function () {
        h_log("_connection.__proto__ effectiveType get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_connection.__proto__, "rtt", {
    get: function () {
        h_log("_connection.__proto__ rtt get [call]", "arg:", arguments)
        return 250
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_connection.__proto__, "downlink", {
    get: function () {
        h_log("_connection.__proto__ downlink get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_connection.__proto__, "saveData", {
    get: function () {
        h_log("_connection.__proto__ saveData get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
NetworkInformation = function () {
    h_log("_connection.__proto__ constructor value [call]", "arg:", arguments)
};
NetworkInformation.prototype = _connection.__proto__;
Object.defineProperty(_connection.__proto__, "constructor", {
    value: NetworkInformation,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_connection.__proto__, Symbol.toStringTag, {
    value: "NetworkInformation",
    writable: false,
    enumerable: false,
    configurable: true,
});
_connection.__proto__.__proto__ = eventTarget;
