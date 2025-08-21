// Error.prepareStackTrace = function (error, structuredStackTrace) {
//     h_log("有报错, 错误已打印，可以考虑在此处拦截\n", error)
//     debugger;
//     // error.stack = error.stack.replace(/vm.js/g, "<anonymous>")
//     // h_log("有报错,已拦截，替换为\n", error.stack)
//     return error
// };

let _lp_func_toString = Object.assign(Function.prototype.toString);
let _lp_obj_toString = Object.assign(Object.prototype.toString);

Function.prototype.toString = function () {
    if (_lp_func_toString.call(this).includes("open")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function open() { [native code] }')
        return 'function open() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("toDataURL")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function toDataURL() { [native code] }')
        return 'function toDataURL() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("getAttribute")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function getAttribute() { [native code] }')
        return 'function getAttribute() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("Object toString")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function toString() { [native code] }')
        return 'function toString() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("_navigator.__proto__ webdriver")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function get webdriver() { [native code] }')
        return 'function get webdriver() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("clearInterval")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function clearInterval() { [native code] }')
        return 'function clearInterval() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("_navigator.__proto__ languages")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function get languages() { [native code] }')
        return 'function get languages() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("_navigator.__proto__ vendor")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function get vendor() { [native code] }')
        return 'function get vendor() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("window Event")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function Event() { [native code] }')
        return 'function Event() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("window prompt")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function prompt() { [native code] }')
        return 'function prompt() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("toBlob")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function toBlob() { [native code] }')
        return 'function toBlob() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("getImageData")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function getImageData() { [native code] }')
        return 'function getImageData() { [native code] }'
    } else if (this.name === "eval") {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function eval() { [native code] }')
        return 'function eval() { [native code] }'
    } else if (_lp_func_toString.call(this).includes("XMLHttpRequest.prototype send")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function send() { [native code] }')
        return 'function send() { [native code] }'
    }
    h_log(`Function toString ${this.name} 被调用`)
    h_log("函数体为（只展示100字符）：" + _lp_func_toString.call(this).slice(0, 100))
    h_log("原路返回")
    return _lp_func_toString.call(this)
};

Object.prototype.toString = function () {
    h_log("Object toString 被调用")
    h_log("对象为：" + _lp_obj_toString.call(this))
    debugger
    // h_log(this)
    h_log("----------------------------------------")
    return _lp_obj_toString.call(this)
};

let div_count = 1;
let script_count = 1;
let meta_count = 1;
let html_count = 1;
let head_count = 1;
let body_count = 1;
let a_count = 1;
let form_count = 1;
let input_count = 1;
