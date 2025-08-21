let _form_dom = {};
_form_dom.__proto__ = {};
Object.defineProperty(_form_dom.__proto__, "acceptCharset", {
    get: function () {
        h_log("_form_dom.__proto__ acceptCharset get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ acceptCharset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "action", {
    get: function () {
        h_log("_form_dom.__proto__ action get [call]", "arg:", arguments)
        debugger;
        return this._action
    }, set: function () {
        h_log("_form_dom.__proto__ action set [call]", "arg:", arguments, "this--->", this)
        this._action = arguments[0]
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "autocomplete", {
    get: function () {
        h_log("_form_dom.__proto__ autocomplete get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ autocomplete set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "enctype", {
    get: function () {
        h_log("_form_dom.__proto__ enctype get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ enctype set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "encoding", {
    get: function () {
        h_log("_form_dom.__proto__ encoding get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ encoding set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "method", {
    get: function () {
        h_log("_form_dom.__proto__ method get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ method set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "name", {
    get: function () {
        h_log("_form_dom.__proto__ name get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ name set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "noValidate", {
    get: function () {
        h_log("_form_dom.__proto__ noValidate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ noValidate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "target", {
    get: function () {
        h_log("_form_dom.__proto__ target get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ target set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "rel", {
    get: function () {
        h_log("_form_dom.__proto__ rel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ rel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "relList", {
    get: function () {
        h_log("_form_dom.__proto__ relList get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_form_dom.__proto__ relList set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "elements", {
    get: function () {
        h_log("_form_dom.__proto__ elements get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "length", {
    get: function () {
        h_log("_form_dom.__proto__ length get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_form_dom.__proto__, "checkValidity", {
    get: function () {
        h_log("[v] _form_dom.__proto__ checkValidity value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _form_dom.__proto__ checkValidity value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_form_dom.__proto__, "reportValidity", {
    get: function () {
        h_log("[v] _form_dom.__proto__ reportValidity value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _form_dom.__proto__ reportValidity value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_form_dom.__proto__, "requestSubmit", {
    get: function () {
        h_log("[v] _form_dom.__proto__ requestSubmit value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _form_dom.__proto__ requestSubmit value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_form_dom.__proto__, "reset", {
    get: function () {
        h_log("[v] _form_dom.__proto__ reset value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _form_dom.__proto__ reset value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_form_dom.__proto__, "submit", {
    get: function () {
        h_log("[v] _form_dom.__proto__ submit value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _form_dom.__proto__ submit value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _HTMLFormElement = function () {
    h_log("_form_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_form") {
        this.tag_arg = "form" + form_count
        form_count += 1
        this._children = {}
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLFormElement.prototype = _form_dom.__proto__;
Object.defineProperty(_form_dom.__proto__, "constructor", {
    value: _HTMLFormElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_form_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLFormElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_form_dom.__proto__, Symbol.iterator, {
    get: function () {
        h_log("[v] _form_dom.__proto__ Symbol(Symbol.iterator) value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _form_dom.__proto__ Symbol(Symbol.iterator) value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
_form_dom.__proto__.__proto__ = HTMLElement.prototype;
