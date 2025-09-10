let _location = {};
Object.defineProperty(_location, "valueOf", {
    get: function () {
        h_log("[v] _location valueOf value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _location valueOf value [call]", "arg:", arguments)
            return _location
        }
    }, enumerable: false, configurable: false
});
Object.defineProperty(_location, "ancestorOrigins", {
    get: function () {
        h_log("_location ancestorOrigins get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "href", {
    get: function () {
        const result = config_LOCATION.href
        h_log("_location href get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: function () {
        h_log("_location href set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "origin", {
    get: function () {
        const result = config_LOCATION.origin
        h_log("_location origin get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: undefined, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "protocol", {
    get: function () {
        const result = config_LOCATION.protocol
        h_log("_location protocol get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: function () {
        h_log("_location protocol set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "host", {
    get: function () {
        const result = config_LOCATION.host
        h_log("_location host get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: function () {
        h_log("_location host set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "hostname", {
    get: function () {
        const result = config_LOCATION.hostname
        h_log("_location hostname get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: function () {
        h_log("_location hostname set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "port", {
    get: function () {
        const result = config_LOCATION.port
        h_log("_location port get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: function () {
        h_log("_location port set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "pathname", {
    get: function () {
        const result = config_LOCATION.pathname
        h_log("_location pathname get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: function () {
        h_log("_location pathname set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "search", {
    get: function () {
        const result = config_LOCATION.search
        h_log("_location search get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: function () {
        h_log("_location search set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "hash", {
    get: function () {
        const result = config_LOCATION.hash
        h_log("_location hash get [call]", "arg:", arguments, "result:", result)
        return result
    }, set: function () {
        h_log("_location hash set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(_location, "assign", {
    get: function () {
        h_log("[v] _location assign value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _location assign value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: false
});
Object.defineProperty(_location, "reload", {
    get: function () {
        h_log("[v] _location reload value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _location reload value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: false
});
Object.defineProperty(_location, "replace", {
    get: function () {
        h_log("[v] _location replace value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _location replace value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: false
});
Object.defineProperty(_location, "toString", {
    get: function () {
        h_log("[v] _location toString value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _location toString value [call]", "arg:", arguments)
            return config_LOCATION.href  
        }
    }, enumerable: true, configurable: false
});
Object.defineProperty(_location, Symbol.toPrimitive, {
    value: config_LOCATION.href ,
    writable: false,
    enumerable: false,
    configurable: false,
});
_location.__proto__ = {};
let _Location = function () {
    h_log("_location.__proto__ constructor value [call]", "arg:", arguments)
};
_Location.prototype = _location.__proto__;
Object.defineProperty(_location.__proto__, "constructor", {
    value: _Location,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_location.__proto__, Symbol.toStringTag, {
    value: "Location",
    writable: false,
    enumerable: false,
    configurable: true,
});