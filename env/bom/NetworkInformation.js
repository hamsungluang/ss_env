let _network_information = {};
_network_information.__proto__ = {};
Object.defineProperty(_network_information.__proto__, "onchange", {
    get: function () {
        h_log("_network_information.__proto__ onchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_network_information.__proto__ onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_network_information.__proto__, "effectiveType", {
    get: function () {
        h_log("_network_information.__proto__ effectiveType get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_network_information.__proto__, "rtt", {
    get: function () {
        h_log("_network_information.__proto__ rtt get [call]", "arg:", arguments)
        return 50
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_network_information.__proto__, "downlink", {
    get: function () {
        h_log("_network_information.__proto__ downlink get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_network_information.__proto__, "saveData", {
    get: function () {
        h_log("_network_information.__proto__ saveData get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
let _NetworkInformation = function () {
    h_log("_network_information.__proto__ constructor value [call]", "arg:", arguments)
};
_NetworkInformation.prototype = _network_information.__proto__;
Object.defineProperty(_network_information.__proto__, "constructor", {
    value: _NetworkInformation,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_network_information.__proto__, Symbol.toStringTag, {
    value: "NetworkInformation",
    writable: false,
    enumerable: false,
    configurable: true,
});
_network_information.__proto__.__proto__ = eventTarget;

