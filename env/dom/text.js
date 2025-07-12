let _text = {};
_text.__proto__ = {};
Object.defineProperty(_text.__proto__, "wholeText", {
    get: function () {
        h_log("_text.__proto__ wholeText get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_text.__proto__, "assignedSlot", {
    get: function () {
        h_log("_text.__proto__ assignedSlot get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_text.__proto__, "splitText", {
    get: function () {
        h_log("[v] _text.__proto__ splitText value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__ splitText value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _Text = function () {
    h_log("_text.__proto__ constructor value [call]", "arg:", arguments)
};
_Text.prototype = _text.__proto__;
Object.defineProperty(_text.__proto__, "constructor", {
    value: _Text,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_text.__proto__, Symbol.toStringTag, {
    value: "Text",
    writable: false,
    enumerable: false,
    configurable: true,
});
_text.__proto__.__proto__ = {};
Object.defineProperty(_text.__proto__.__proto__, "data", {
    get: function () {
        h_log("_text.__proto__.__proto__ data get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_text.__proto__.__proto__ data set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_text.__proto__.__proto__, "length", {
    get: function () {
        h_log("_text.__proto__.__proto__ length get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_text.__proto__.__proto__, "previousElementSibling", {
    get: function () {
        h_log("_text.__proto__.__proto__ previousElementSibling get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_text.__proto__.__proto__, "nextElementSibling", {
    get: function () {
        h_log("_text.__proto__.__proto__ nextElementSibling get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_text.__proto__.__proto__, "after", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ after value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ after value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_text.__proto__.__proto__, "appendData", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ appendData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ appendData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_text.__proto__.__proto__, "before", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ before value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ before value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_text.__proto__.__proto__, "deleteData", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ deleteData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ deleteData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_text.__proto__.__proto__, "insertData", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ insertData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ insertData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_text.__proto__.__proto__, "remove", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ remove value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ remove value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_text.__proto__.__proto__, "replaceData", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ replaceData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ replaceData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_text.__proto__.__proto__, "replaceWith", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ replaceWith value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ replaceWith value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_text.__proto__.__proto__, "substringData", {
    get: function () {
        h_log("[v] _text.__proto__.__proto__ substringData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _text.__proto__.__proto__ substringData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _CharacterData = function () {
    h_log("_text.__proto__.__proto__ constructor value [call]", "arg:", arguments)
};
_CharacterData.prototype = _text.__proto__.__proto__;
Object.defineProperty(_text.__proto__.__proto__, "constructor", {
    value: _CharacterData,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_text.__proto__.__proto__, Symbol.toStringTag, {
    value: "CharacterData",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_text.__proto__.__proto__, Symbol.unscopables, {
    value: {},
    writable: false,
    enumerable: false,
    configurable: true,
});
_text.__proto__.__proto__.__proto__ = Node.prototype;