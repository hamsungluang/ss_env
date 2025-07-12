let _eventsource = function () {
};
let _eventsource_value = {};
Object.defineProperty(_eventsource_value, "url", {
    get: function () {
        h_log("_eventsource_value url get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_eventsource_value, "withCredentials", {
    get: function () {
        h_log("_eventsource_value withCredentials get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_eventsource_value, "readyState", {
    get: function () {
        h_log("_eventsource_value readyState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_eventsource_value, "onopen", {
    get: function () {
        h_log("_eventsource_value onopen get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_eventsource_value onopen set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_eventsource_value, "onmessage", {
    get: function () {
        h_log("_eventsource_value onmessage get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_eventsource_value onmessage set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_eventsource_value, "onerror", {
    get: function () {
        h_log("_eventsource_value onerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_eventsource_value onerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_eventsource_value, "CONNECTING", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_eventsource_value, "OPEN", {value: 1, writable: false, enumerable: true, configurable: false,});
Object.defineProperty(_eventsource_value, "CLOSED", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_eventsource_value, "close", {
    get: function () {
        h_log("[v] _eventsource_value close value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _eventsource_value close value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _EventSource = function () {
    h_log("_eventsource_value constructor value [call]", "arg:", arguments)
};
_EventSource.prototype = _eventsource_value;
Object.defineProperty(_eventsource_value, "constructor", {
    value: _EventSource,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_eventsource_value, Symbol.toStringTag, {
    value: "EventSource",
    writable: false,
    enumerable: false,
    configurable: true,
});
_eventsource_value.__proto__ = eventTarget;
Object.defineProperty(_eventsource, "prototype", {
    value: _eventsource_value,
    writable: false,
    enumerable: false,
    configurable: false,
});


