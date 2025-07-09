let _MessagePort = function () {
    h_log("_MessagePort_value constructor value [call]", "arg:", arguments)
};
let _MessagePort_value = {};
Object.defineProperty(_MessagePort_value, "onmessage", {
    get: function () {
        h_log("_MessagePort_value onmessage get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_MessagePort_value onmessage set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_MessagePort_value, "onmessageerror", {
    get: function () {
        h_log("_MessagePort_value onmessageerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_MessagePort_value onmessageerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_MessagePort_value, "close", {
    get: function () {
        h_log("[v] _MessagePort_value close value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _MessagePort_value close value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_MessagePort_value, "postMessage", {
    get: function () {
        h_log("[v] _MessagePort_value postMessage value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _MessagePort_value postMessage value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_MessagePort_value, "start", {
    get: function () {
        h_log("[v] _MessagePort_value start value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _MessagePort_value start value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});

Object.defineProperty(_MessagePort_value, "constructor", {
    value: _MessagePort,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_MessagePort_value, Symbol.toStringTag, {
    value: "MessagePort",
    writable: false,
    enumerable: false,
    configurable: true,
});
_MessagePort.__proto__ = eventTarget;
Object.defineProperty(_MessagePort, "prototype", {
    value: _MessagePort_value,
    writable: false,
    enumerable: false,
    configurable: false,
});


_MessageChannel = function () {
    h_log("_MessageChannel_value constructor value [call]", "arg:", arguments)
};
let _MessageChannel_value = {};
Object.defineProperty(_MessageChannel_value, "port1", {
    get: function () {
        h_log("_MessageChannel_value port1 get [call]", "arg:", arguments)
        return new _MessagePort()
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_MessageChannel_value, "port2", {
    get: function () {
        h_log("_MessageChannel_value port2 get [call]", "arg:", arguments)
        return new _MessagePort()
    }, set: undefined, enumerable: true, configurable: true,
});

Object.defineProperty(_MessageChannel_value, "constructor", {
    value: _MessageChannel,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_MessageChannel_value, Symbol.toStringTag, {
    value: "MessageChannel",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_MessageChannel, "prototype", {
    value: _MessageChannel_value,
    writable: false,
    enumerable: false,
    configurable: false,
});