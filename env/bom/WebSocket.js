let _websocket = function () {
};
let _websocket_value = {};
Object.defineProperty(_websocket_value, "url", {
    get: function () {
        h_log("_websocket_value url get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "readyState", {
    get: function () {
        h_log("_websocket_value readyState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "bufferedAmount", {
    get: function () {
        h_log("_websocket_value bufferedAmount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "onopen", {
    get: function () {
        h_log("_websocket_value onopen get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_websocket_value onopen set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "onerror", {
    get: function () {
        h_log("_websocket_value onerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_websocket_value onerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "onclose", {
    get: function () {
        h_log("_websocket_value onclose get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_websocket_value onclose set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "extensions", {
    get: function () {
        h_log("_websocket_value extensions get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "protocol", {
    get: function () {
        h_log("_websocket_value protocol get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "onmessage", {
    get: function () {
        h_log("_websocket_value onmessage get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_websocket_value onmessage set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "binaryType", {
    get: function () {
        h_log("_websocket_value binaryType get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_websocket_value binaryType set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_websocket_value, "CONNECTING", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_websocket_value, "OPEN", {value: 1, writable: false, enumerable: true, configurable: false,});
Object.defineProperty(_websocket_value, "CLOSING", {value: 2, writable: false, enumerable: true, configurable: false,});
Object.defineProperty(_websocket_value, "CLOSED", {value: 3, writable: false, enumerable: true, configurable: false,});
Object.defineProperty(_websocket_value, "close", {
    get: function () {
        h_log("[v] _websocket_value close value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _websocket_value close value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_websocket_value, "send", {
    get: function () {
        h_log("[v] _websocket_value send value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _websocket_value send value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _WebSocket = function () {
    h_log("_websocket_value constructor value [call]", "arg:", arguments)
};
_WebSocket.prototype = _websocket_value;
Object.defineProperty(_websocket_value, "constructor", {
    value: _WebSocket,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_websocket_value, Symbol.toStringTag, {
    value: "WebSocket",
    writable: false,
    enumerable: false,
    configurable: true,
});
_websocket_value.__proto__ = eventTarget;
Object.defineProperty(_websocket, "prototype", {
    value: _websocket_value,
    writable: false,
    enumerable: false,
    configurable: false,
});

