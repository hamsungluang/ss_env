let _batteryIsCharging = {};
_batteryIsCharging.__proto__ = {};
Object.defineProperty(_batteryIsCharging.__proto__, "charging", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ charging get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "chargingTime", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ chargingTime get [call]", "arg:", arguments)
        return Infinity
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "dischargingTime", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ dischargingTime get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "level", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ level get [call]", "arg:", arguments)
        return 1.0
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "onchargingchange", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ onchargingchange get [call]", "arg:", arguments)
        return true
    }, set: function () {
        h_log("_batteryIsCharging.__proto__ onchargingchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "onchargingtimechange", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ onchargingtimechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_batteryIsCharging.__proto__ onchargingtimechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "ondischargingtimechange", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ ondischargingtimechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_batteryIsCharging.__proto__ ondischargingtimechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "onlevelchange", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ onlevelchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_batteryIsCharging.__proto__ onlevelchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
BatteryManager = function () {
    h_log("_batteryIsCharging.__proto__ constructor value [call]", "arg:", arguments)
};
BatteryManager.prototype = _batteryIsCharging.__proto__;
Object.defineProperty(_batteryIsCharging.__proto__, "constructor", {
    value: BatteryManager,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, Symbol.toStringTag, {
    value: "BatteryManager",
    writable: false,
    enumerable: false,
    configurable: true,
});
_batteryIsCharging.__proto__.__proto__ = eventTarget;

