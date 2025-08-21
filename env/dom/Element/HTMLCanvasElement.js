let _canvas_dom = {};
_canvas_dom.__proto__ = {};
Object.defineProperty(_canvas_dom.__proto__, "width", {
    get: function () {
        h_log("_canvas_dom.__proto__ width get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_dom.__proto__ width set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_dom.__proto__, "height", {
    get: function () {
        h_log("_canvas_dom.__proto__ height get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_dom.__proto__ height set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_dom.__proto__, "captureStream", {
    get: function () {
        h_log("[v] _canvas_dom.__proto__ captureStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_dom.__proto__ captureStream value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_dom.__proto__, "getContext", {
    get: function () {
        h_log("[v] _canvas_dom.__proto__ getContext value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_dom.__proto__ getContext value [call]", "arg:", arguments)
            if (arguments[0] === "2d"){
                return new _CanvasRenderingContext2D
            }
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_dom.__proto__, "toBlob", {
    get: function () {
        h_log("[v] _canvas_dom.__proto__ toBlob value [get]", "arg:", arguments, "this--->", this);
        return function () {
            h_log("[v] _canvas_dom.__proto__ toBlob value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_dom.__proto__, "toDataURL", {
    get: function () {
        h_log("[v] _canvas_dom.__proto__ toDataURL value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_dom.__proto__ toDataURL value [call]", "arg:", arguments)
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg=='
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_dom.__proto__, "transferControlToOffscreen", {
    get: function () {
        h_log("[v] _canvas_dom.__proto__ transferControlToOffscreen value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_dom.__proto__ transferControlToOffscreen value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _HTMLCanvasElement = function () {
    h_log("_canvas_dom.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLCanvasElement.prototype = _canvas_dom.__proto__;
Object.defineProperty(_canvas_dom.__proto__, "constructor", {
    value: _HTMLCanvasElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_canvas_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLCanvasElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_canvas_dom.__proto__.__proto__ = HTMLElement.prototype;
