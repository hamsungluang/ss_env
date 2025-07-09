let _span_dom = {};
_span_dom.__proto__ = {};
HTMLSpanElement = function () {
    h_log("_span_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_span") {
        this.tag_arg = arguments[1]
        return
    }
    throw TypeError("Illegal constructor")
};
HTMLSpanElement.prototype = _span_dom.__proto__;
Object.defineProperty(_span_dom.__proto__, "constructor", {
    value: HTMLSpanElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_span_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLSpanElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_span_dom.__proto__.__proto__ = HTMLElement.prototype;

let _div_dom = {};
_div_dom.__proto__ = {};
Object.defineProperty(_div_dom.__proto__, "align", {
    get: function () {
        h_log("_div_dom.__proto__ align get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_div_dom.__proto__ align set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
HTMLDivElement = function () {
    h_log("_div_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_div") {
        this.tag_arg = arguments[1]
        return
    }
    throw TypeError("Illegal constructor")
};
HTMLDivElement.prototype = _div_dom.__proto__;
Object.defineProperty(_div_dom.__proto__, "constructor", {
    value: HTMLDivElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_div_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLDivElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_div_dom.__proto__.__proto__ = HTMLElement.prototype;


let _script_dom = {};
_script_dom.__proto__ = {};
Object.defineProperty(_script_dom.__proto__, "src", {
    get: function () {
        h_log("_script_dom.__proto__ src get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ src set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "type", {
    get: function () {
        h_log("_script_dom.__proto__ type get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ type set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "noModule", {
    get: function () {
        h_log("_script_dom.__proto__ noModule get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ noModule set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "charset", {
    get: function () {
        h_log("_script_dom.__proto__ charset get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ charset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "async", {
    get: function () {
        h_log("_script_dom.__proto__ async get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ async set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "defer", {
    get: function () {
        h_log("_script_dom.__proto__ defer get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ defer set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "crossOrigin", {
    get: function () {
        h_log("_script_dom.__proto__ crossOrigin get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ crossOrigin set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "text", {
    get: function () {
        h_log("_script_dom.__proto__ text get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ text set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "referrerPolicy", {
    get: function () {
        h_log("_script_dom.__proto__ referrerPolicy get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ referrerPolicy set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "fetchPriority", {
    get: function () {
        h_log("_script_dom.__proto__ fetchPriority get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ fetchPriority set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "event", {
    get: function () {
        h_log("_script_dom.__proto__ event get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ event set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "htmlFor", {
    get: function () {
        h_log("_script_dom.__proto__ htmlFor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ htmlFor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "integrity", {
    get: function () {
        h_log("_script_dom.__proto__ integrity get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ integrity set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "blocking", {
    get: function () {
        h_log("_script_dom.__proto__ blocking get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ blocking set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
HTMLScriptElement = function () {
    this.tag_arg = arguments[0]
    h_log("_script_dom.__proto__ constructor value [call]", "arg:", arguments)
};
HTMLScriptElement.prototype = _script_dom.__proto__;
Object.defineProperty(_script_dom.__proto__, "constructor", {
    value: HTMLScriptElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_script_dom.__proto__, "attributionSrc", {
    get: function () {
        h_log("_script_dom.__proto__ attributionSrc get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_script_dom.__proto__ attributionSrc set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_script_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLScriptElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_script_dom.__proto__.__proto__ = HTMLElement.prototype;


let _body_dom = {};
_body_dom.__proto__ = {};
Object.defineProperty(_body_dom.__proto__, "text", {
    get: function () {
        h_log("_body_dom.__proto__ text get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ text set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "link", {
    get: function () {
        h_log("_body_dom.__proto__ link get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ link set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "vLink", {
    get: function () {
        h_log("_body_dom.__proto__ vLink get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ vLink set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "aLink", {
    get: function () {
        h_log("_body_dom.__proto__ aLink get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ aLink set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "bgColor", {
    get: function () {
        h_log("_body_dom.__proto__ bgColor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ bgColor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "background", {
    get: function () {
        h_log("_body_dom.__proto__ background get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ background set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onblur", {
    get: function () {
        h_log("_body_dom.__proto__ onblur get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onblur set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onerror", {
    get: function () {
        h_log("_body_dom.__proto__ onerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onfocus", {
    get: function () {
        h_log("_body_dom.__proto__ onfocus get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onfocus set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onload", {
    get: function () {
        h_log("_body_dom.__proto__ onload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onresize", {
    get: function () {
        h_log("_body_dom.__proto__ onresize get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onresize set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onscroll", {
    get: function () {
        h_log("_body_dom.__proto__ onscroll get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onscroll set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onafterprint", {
    get: function () {
        h_log("_body_dom.__proto__ onafterprint get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onafterprint set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onbeforeprint", {
    get: function () {
        h_log("_body_dom.__proto__ onbeforeprint get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onbeforeprint set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onbeforeunload", {
    get: function () {
        h_log("_body_dom.__proto__ onbeforeunload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onbeforeunload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onhashchange", {
    get: function () {
        h_log("_body_dom.__proto__ onhashchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onhashchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onlanguagechange", {
    get: function () {
        h_log("_body_dom.__proto__ onlanguagechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onlanguagechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onmessage", {
    get: function () {
        h_log("_body_dom.__proto__ onmessage get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onmessage set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onmessageerror", {
    get: function () {
        h_log("_body_dom.__proto__ onmessageerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onmessageerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onoffline", {
    get: function () {
        h_log("_body_dom.__proto__ onoffline get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onoffline set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "ononline", {
    get: function () {
        h_log("_body_dom.__proto__ ononline get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ ononline set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onpagehide", {
    get: function () {
        h_log("_body_dom.__proto__ onpagehide get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onpagehide set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onpageshow", {
    get: function () {
        h_log("_body_dom.__proto__ onpageshow get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onpageshow set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onpopstate", {
    get: function () {
        h_log("_body_dom.__proto__ onpopstate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onpopstate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onrejectionhandled", {
    get: function () {
        h_log("_body_dom.__proto__ onrejectionhandled get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onrejectionhandled set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onstorage", {
    get: function () {
        h_log("_body_dom.__proto__ onstorage get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onstorage set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onunhandledrejection", {
    get: function () {
        h_log("_body_dom.__proto__ onunhandledrejection get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onunhandledrejection set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_body_dom.__proto__, "onunload", {
    get: function () {
        h_log("_body_dom.__proto__ onunload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_body_dom.__proto__ onunload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
HTMLBodyElement = function () {
    h_log("_body_dom.__proto__ constructor value [call]", "arg:", arguments)
};
HTMLBodyElement.prototype = _body_dom.__proto__;
Object.defineProperty(_body_dom.__proto__, "constructor", {
    value: HTMLBodyElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_body_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLBodyElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_body_dom.__proto__.__proto__ = HTMLElement.prototype;


let _meta_dom = {};
_meta_dom.__proto__ = {};
Object.defineProperty(_meta_dom.__proto__, "name", {
    get: function () {
        h_log("_meta_dom.__proto__ name get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_meta_dom.__proto__ name set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, "httpEquiv", {
    get: function () {
        h_log("_meta_dom.__proto__ httpEquiv get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_meta_dom.__proto__ httpEquiv set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, "content", {
    get: function () {
        h_log("_meta_dom.__proto__ content get [call]", "arg:", arguments)
        if (this.tag_arg === "meta2") {
            return config_CONTENT
        }
    }, set: function () {
        h_log("_meta_dom.__proto__ content set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, "media", {
    get: function () {
        h_log("_meta_dom.__proto__ media get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_meta_dom.__proto__ media set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, "scheme", {
    get: function () {
        h_log("_meta_dom.__proto__ scheme get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_meta_dom.__proto__ scheme set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
HTMLMetaElement = function () {
    this.tag_arg = arguments[0]
    h_log("_meta_dom.__proto__ constructor value [call]", "arg:", arguments)
};
HTMLMetaElement.prototype = _meta_dom.__proto__;
Object.defineProperty(_meta_dom.__proto__, "constructor", {
    value: HTMLMetaElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_meta_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLMetaElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_meta_dom.__proto__.__proto__ = HTMLElement.prototype;


let _head_dom = {};
_head_dom.__proto__ = {};
HTMLHeadElement = function () {
    h_log("_head_dom.__proto__ constructor value [call]", "arg:", arguments)
};
HTMLHeadElement.prototype = _head_dom.__proto__;
Object.defineProperty(_head_dom.__proto__, "constructor", {
    value: HTMLHeadElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_head_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLHeadElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_head_dom.__proto__.__proto__ = HTMLElement.prototype;

let _a_dom = {};
_a_dom.__proto__ = {};
Object.defineProperty(_a_dom.__proto__, "target", {
    get: function () {
        h_log("_a_dom.__proto__ target get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ target set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "download", {
    get: function () {
        h_log("_a_dom.__proto__ download get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ download set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "ping", {
    get: function () {
        h_log("_a_dom.__proto__ ping get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ ping set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "rel", {
    get: function () {
        h_log("_a_dom.__proto__ rel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ rel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "relList", {
    get: function () {
        h_log("_a_dom.__proto__ relList get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ relList set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "hreflang", {
    get: function () {
        h_log("_a_dom.__proto__ hreflang get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ hreflang set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "type", {
    get: function () {
        h_log("_a_dom.__proto__ type get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ type set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "referrerPolicy", {
    get: function () {
        h_log("_a_dom.__proto__ referrerPolicy get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ referrerPolicy set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "text", {
    get: function () {
        h_log("_a_dom.__proto__ text get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ text set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "coords", {
    get: function () {
        h_log("_a_dom.__proto__ coords get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ coords set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "charset", {
    get: function () {
        h_log("_a_dom.__proto__ charset get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ charset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "name", {
    get: function () {
        h_log("_a_dom.__proto__ name get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ name set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "rev", {
    get: function () {
        h_log("_a_dom.__proto__ rev get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ rev set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "shape", {
    get: function () {
        h_log("_a_dom.__proto__ shape get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ shape set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "origin", {
    get: function () {
        h_log("_a_dom.__proto__ origin get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "protocol", {
    get: function () {
        h_log("_a_dom.__proto__ protocol get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ protocol set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "username", {
    get: function () {
        h_log("_a_dom.__proto__ username get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ username set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "password", {
    get: function () {
        h_log("_a_dom.__proto__ password get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ password set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "host", {
    get: function () {
        h_log("_a_dom.__proto__ host get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ host set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "hostname", {
    get: function () {
        h_log("_a_dom.__proto__ hostname get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ hostname set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "port", {
    get: function () {
        h_log("_a_dom.__proto__ port get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ port set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "pathname", {
    get: function () {
        h_log("_a_dom.__proto__ pathname get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ pathname set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "search", {
    get: function () {
        h_log("_a_dom.__proto__ search get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ search set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "hash", {
    get: function () {
        h_log("_a_dom.__proto__ hash get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ hash set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "href", {
    get: function () {
        h_log("_a_dom.__proto__ href get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ href set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "toString", {
    get: function () {
        h_log("[v] _a_dom.__proto__ toString value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _a_dom.__proto__ toString value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
HTMLAnchorElement = function () {
    h_log("_a_dom.__proto__ constructor value [call]", "arg:", arguments)
};
HTMLAnchorElement.prototype = _a_dom.__proto__;
Object.defineProperty(_a_dom.__proto__, "constructor", {
    value: HTMLAnchorElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "hrefTranslate", {
    get: function () {
        h_log("_a_dom.__proto__ hrefTranslate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ hrefTranslate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "attributionSrc", {
    get: function () {
        h_log("_a_dom.__proto__ attributionSrc get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_a_dom.__proto__ attributionSrc set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLAnchorElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_a_dom.__proto__.__proto__ = HTMLElement.prototype;


let _html_dom = {};
_html_dom.__proto__ = {};
Object.defineProperty(_html_dom.__proto__, "version", {
    get: function () {
        h_log("_html_dom.__proto__ version get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_html_dom.__proto__ version set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
HTMLHtmlElement = function () {
    h_log("_html_dom.__proto__ constructor value [call]", "arg:", arguments)
};
HTMLHtmlElement.prototype = _html_dom.__proto__;
Object.defineProperty(_html_dom.__proto__, "constructor", {
    value: HTMLHtmlElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_html_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLHtmlElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_html_dom.__proto__.__proto__ = HTMLElement.prototype;

let _video_dom = {};
_video_dom.__proto__ = {};
Object.defineProperty(_video_dom.__proto__, "width", {
    get: function () {
        h_log("_video_dom.__proto__ width get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__ width set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "height", {
    get: function () {
        h_log("_video_dom.__proto__ height get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__ height set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "videoWidth", {
    get: function () {
        h_log("_video_dom.__proto__ videoWidth get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "videoHeight", {
    get: function () {
        h_log("_video_dom.__proto__ videoHeight get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "poster", {
    get: function () {
        h_log("_video_dom.__proto__ poster get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__ poster set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "webkitDecodedFrameCount", {
    get: function () {
        h_log("_video_dom.__proto__ webkitDecodedFrameCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "webkitDroppedFrameCount", {
    get: function () {
        h_log("_video_dom.__proto__ webkitDroppedFrameCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "playsInline", {
    get: function () {
        h_log("_video_dom.__proto__ playsInline get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__ playsInline set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "onenterpictureinpicture", {
    get: function () {
        h_log("_video_dom.__proto__ onenterpictureinpicture get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__ onenterpictureinpicture set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "onleavepictureinpicture", {
    get: function () {
        h_log("_video_dom.__proto__ onleavepictureinpicture get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__ onleavepictureinpicture set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "disablePictureInPicture", {
    get: function () {
        h_log("_video_dom.__proto__ disablePictureInPicture get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__ disablePictureInPicture set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__, "cancelVideoFrameCallback", {
    get: function () {
        h_log("[v] _video_dom.__proto__ cancelVideoFrameCallback value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__ cancelVideoFrameCallback value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__, "getVideoPlaybackQuality", {
    get: function () {
        h_log("[v] _video_dom.__proto__ getVideoPlaybackQuality value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__ getVideoPlaybackQuality value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__, "requestPictureInPicture", {
    get: function () {
        h_log("[v] _video_dom.__proto__ requestPictureInPicture value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__ requestPictureInPicture value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__, "requestVideoFrameCallback", {
    get: function () {
        h_log("[v] _video_dom.__proto__ requestVideoFrameCallback value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__ requestVideoFrameCallback value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
HTMLVideoElement = function () {
    h_log("_video_dom.__proto__ constructor value [call]", "arg:", arguments)
};
HTMLVideoElement.prototype = _video_dom.__proto__;
Object.defineProperty(_video_dom.__proto__, "constructor", {
    value: HTMLVideoElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_video_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLVideoElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_video_dom.__proto__.__proto__ = {};
Object.defineProperty(_video_dom.__proto__.__proto__, "error", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ error get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "src", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ src get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ src set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "currentSrc", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ currentSrc get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "crossOrigin", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ crossOrigin get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ crossOrigin set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "networkState", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ networkState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "preload", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ preload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ preload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "buffered", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ buffered get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "readyState", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ readyState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "seeking", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ seeking get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "currentTime", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ currentTime get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ currentTime set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "duration", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ duration get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "paused", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ paused get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "defaultPlaybackRate", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ defaultPlaybackRate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ defaultPlaybackRate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "playbackRate", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ playbackRate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ playbackRate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "played", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ played get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "seekable", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ seekable get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "ended", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ ended get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "autoplay", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ autoplay get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ autoplay set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "loop", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ loop get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ loop set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "preservesPitch", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ preservesPitch get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ preservesPitch set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "controls", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ controls get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ controls set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "controlsList", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ controlsList get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ controlsList set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "volume", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ volume get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ volume set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "muted", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ muted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ muted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "defaultMuted", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ defaultMuted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ defaultMuted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "textTracks", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ textTracks get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "webkitAudioDecodedByteCount", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ webkitAudioDecodedByteCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "webkitVideoDecodedByteCount", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ webkitVideoDecodedByteCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "onencrypted", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ onencrypted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ onencrypted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "onwaitingforkey", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ onwaitingforkey get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ onwaitingforkey set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "srcObject", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ srcObject get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ srcObject set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "NETWORK_EMPTY", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "NETWORK_IDLE", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "NETWORK_LOADING", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "NETWORK_NO_SOURCE", {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "HAVE_NOTHING", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "HAVE_METADATA", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "HAVE_CURRENT_DATA", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "HAVE_FUTURE_DATA", {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "HAVE_ENOUGH_DATA", {
    value: 4,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "addTextTrack", {
    get: function () {
        h_log("[v] _video_dom.__proto__.__proto__ addTextTrack value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__.__proto__ addTextTrack value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__.__proto__, "canPlayType", {
    get: function () {
        h_log("[v] _video_dom.__proto__.__proto__ canPlayType value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__.__proto__ canPlayType value [call]", "arg:", arguments)
            return 'probably'
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__.__proto__, "captureStream", {
    get: function () {
        h_log("[v] _video_dom.__proto__.__proto__ captureStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__.__proto__ captureStream value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__.__proto__, "load", {
    get: function () {
        h_log("[v] _video_dom.__proto__.__proto__ load value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__.__proto__ load value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__.__proto__, "pause", {
    get: function () {
        h_log("[v] _video_dom.__proto__.__proto__ pause value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__.__proto__ pause value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__.__proto__, "play", {
    get: function () {
        h_log("[v] _video_dom.__proto__.__proto__ play value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__.__proto__ play value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__.__proto__, "sinkId", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ sinkId get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "remote", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ remote get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "disableRemotePlayback", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ disableRemotePlayback get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_video_dom.__proto__.__proto__ disableRemotePlayback set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "setSinkId", {
    get: function () {
        h_log("[v] _video_dom.__proto__.__proto__ setSinkId value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__.__proto__ setSinkId value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
HTMLMediaElement = function () {
    h_log("_video_dom.__proto__.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_video") {
        this.tag_arg = arguments[1]
        return
    }
    throw TypeError("Illegal constructor")
};
HTMLMediaElement.prototype = _video_dom.__proto__.__proto__;
Object.defineProperty(_video_dom.__proto__.__proto__, "constructor", {
    value: HTMLMediaElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "mediaKeys", {
    get: function () {
        h_log("_video_dom.__proto__.__proto__ mediaKeys get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_video_dom.__proto__.__proto__, "setMediaKeys", {
    get: function () {
        h_log("[v] _video_dom.__proto__.__proto__ setMediaKeys value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _video_dom.__proto__.__proto__ setMediaKeys value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_video_dom.__proto__.__proto__, Symbol.toStringTag, {
    value: "HTMLMediaElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_video_dom.__proto__.__proto__.__proto__ = HTMLElement.prototype;

