let _performance = {};
_performance.__proto__ = {};
Object.defineProperty(_performance.__proto__, "timeOrigin", {
    get: function () {
        h_log("_performance.__proto__ timeOrigin get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_performance.__proto__, "onresourcetimingbufferfull", {
    get: function () {
        h_log("_performance.__proto__ onresourcetimingbufferfull get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_performance.__proto__ onresourcetimingbufferfull set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_performance.__proto__, "clearMarks", {
    get: function () {
        h_log("[v] _performance.__proto__ clearMarks value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ clearMarks value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "clearMeasures", {
    get: function () {
        h_log("[v] _performance.__proto__ clearMeasures value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ clearMeasures value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "clearResourceTimings", {
    get: function () {
        h_log("[v] _performance.__proto__ clearResourceTimings value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ clearResourceTimings value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "getEntries", {
    get: function () {
        h_log("[v] _performance.__proto__ getEntries value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ getEntries value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "getEntriesByName", {
    get: function () {
        h_log("[v] _performance.__proto__ getEntriesByName value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ getEntriesByName value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "getEntriesByType", {
    get: function () {
        h_log("[v] _performance.__proto__ getEntriesByType value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ getEntriesByType value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "mark", {
    get: function () {
        h_log("[v] _performance.__proto__ mark value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ mark value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "measure", {
    get: function () {
        h_log("[v] _performance.__proto__ measure value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ measure value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "setResourceTimingBufferSize", {
    get: function () {
        h_log("[v] _performance.__proto__ setResourceTimingBufferSize value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ setResourceTimingBufferSize value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "toJSON", {
    get: function () {
        h_log("[v] _performance.__proto__ toJSON value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ toJSON value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_performance.__proto__, "now", {
    get: function () {
        h_log("[v] _performance.__proto__ now value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _performance.__proto__ now value [call]", "arg:", arguments)
            return 3971936.4999999995
        }
    }, enumerable: true, configurable: true
});
let _Performance = function () {
    h_log("_performance.__proto__ constructor value [call]", "arg:", arguments)
};
_Performance.prototype = _performance.__proto__;
Object.defineProperty(_performance.__proto__, "constructor", {
    value: _Performance,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_performance.__proto__, "timing", {
    get: function () {
        h_log("_performance.__proto__ timing get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_performance.__proto__, "navigation", {
    get: function () {
        h_log("_performance.__proto__ navigation get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_performance.__proto__, "memory", {
    get: function () {
        h_log("_performance.__proto__ memory get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_performance.__proto__, "eventCounts", {
    get: function () {
        h_log("_performance.__proto__ eventCounts get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_performance.__proto__, Symbol.toStringTag, {
    value: "Performance",
    writable: false,
    enumerable: false,
    configurable: true,
});
_performance.__proto__.__proto__ = eventTarget;

