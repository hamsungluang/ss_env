let _navigator_UAData = {};
_navigator_UAData.__proto__ = {};
Object.defineProperty(_navigator_UAData.__proto__, "brands", {
    get: function () {
        h_log("_navigator_UAData.__proto__ brands get [call]", "arg:", arguments)
        return [
            {
                "brand": "Not)A;Brand",
                "version": "8"
            },
            {
                "brand": "Chromium",
                "version": "138"
            },
            {
                "brand": "Google Chrome",
                "version": "138"
            }
        ]
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator_UAData.__proto__, "mobile", {
    get: function () {
        h_log("_navigator_UAData.__proto__ mobile get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator_UAData.__proto__, "platform", {
    get: function () {
        h_log("_navigator_UAData.__proto__ platform get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator_UAData.__proto__, "getHighEntropyValues", {
    get: function () {
        h_log("[v] _navigator_UAData.__proto__ getHighEntropyValues value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator_UAData.__proto__ getHighEntropyValues value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator_UAData.__proto__, "toJSON", {
    get: function () {
        h_log("[v] _navigator_UAData.__proto__ toJSON value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator_UAData.__proto__ toJSON value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _NavigatorUAData = function () {
    h_log("_navigator_UAData.__proto__ constructor value [call]", "arg:", arguments)
};
_NavigatorUAData.prototype = _navigator_UAData.__proto__;
Object.defineProperty(_navigator_UAData.__proto__, "constructor", {
    value: _NavigatorUAData,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_navigator_UAData.__proto__, Symbol.toStringTag, {
    value: "NavigatorUAData",
    writable: false,
    enumerable: false,
    configurable: true,
});

