let _userAgentData = {};
_userAgentData.__proto__ = {};
Object.defineProperty(_userAgentData.__proto__, "brands", {
    get: function () {
        h_log("_userAgentData.__proto__ brands get [call]", "arg:", arguments)
        return [
            {
                "brand": "Google Chrome",
                "version": "137"
            },
            {
                "brand": "Chromium",
                "version": "137"
            },
            {
                "brand": "Not/A)Brand",
                "version": "24"
            }
        ]
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_userAgentData.__proto__, "mobile", {
    get: function () {
        h_log("_userAgentData.__proto__ mobile get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_userAgentData.__proto__, "platform", {
    get: function () {
        h_log("_userAgentData.__proto__ platform get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_userAgentData.__proto__, "getHighEntropyValues", {
    get: function () {
        h_log("[v] _userAgentData.__proto__ getHighEntropyValues value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _userAgentData.__proto__ getHighEntropyValues value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_userAgentData.__proto__, "toJSON", {
    get: function () {
        h_log("[v] _userAgentData.__proto__ toJSON value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _userAgentData.__proto__ toJSON value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
NavigatorUAData = function () {
    h_log("_userAgentData.__proto__ constructor value [call]", "arg:", arguments)
};
NavigatorUAData.prototype = _userAgentData.__proto__;
Object.defineProperty(_userAgentData.__proto__, "constructor", {
    value: NavigatorUAData,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_userAgentData.__proto__, Symbol.toStringTag, {
    value: "NavigatorUAData",
    writable: false,
    enumerable: false,
    configurable: true,
});


