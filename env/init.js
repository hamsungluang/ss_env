const hook_prepareStackTrace = config_config.hook_prepareStackTrace;

const hook_RegExp = config_config.hook_RegExp;

const hook_ObjectToString = config_config.hook_ObjectToString;

const hook_ObjectKeys = config_config.hook_ObjectKeys;

if (hook_ObjectKeys) {
  let _lp_obj_keys = Object.assign(Object.keys);
  Object.keys = function () {
    h_log("Object keys 被调用","对象为：" , arguments);
    return _lp_obj_keys.apply(undefined,arguments);
  };
}

if (hook_prepareStackTrace) {
  Error.prepareStackTrace = function (error, structuredStackTrace) {
    h_log("有报错, 错误已打印，可以考虑在此处拦截\n", error);
    debugger;
    // error.stack = error.stack.replace(/vm.js/g, "<anonymous>")
    // h_log("有报错,已拦截，替换为\n", error.stack)
    return error;
  };
}

let _lp_func_toString = Object.assign(Function.prototype.toString);
Function.prototype.toString = function () {
  if (_lp_func_toString.call(this).includes("open")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function open() { [native code] }");
    return "function open() { [native code] }";
  } else if (_lp_func_toString.call(this).includes("toDataURL")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function toDataURL() { [native code] }");
    return "function toDataURL() { [native code] }";
  } else if (_lp_func_toString.call(this).includes("getAttribute")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function getAttribute() { [native code] }");
    return "function getAttribute() { [native code] }";
  } else if (_lp_func_toString.call(this).includes("Object toString")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function toString() { [native code] }");
    return "function toString() { [native code] }";
  } else if (
    _lp_func_toString.call(this).includes("_navigator.__proto__ webdriver")
  ) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function get webdriver() { [native code] }");
    return "function get webdriver() { [native code] }";
  } else if (_lp_func_toString.call(this).includes("clearInterval")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function clearInterval() { [native code] }");
    return "function clearInterval() { [native code] }";
  } else if (
    _lp_func_toString.call(this).includes("_navigator.__proto__ languages")
  ) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function get languages() { [native code] }");
    return "function get languages() { [native code] }";
  } else if (
    _lp_func_toString.call(this).includes("_navigator.__proto__ vendor")
  ) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function get vendor() { [native code] }");
    return "function get vendor() { [native code] }";
  } else if (_lp_func_toString.call(this).includes("window Event")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function Event() { [native code] }");
    return "function Event() { [native code] }";
  } else if (_lp_func_toString.call(this).includes("window prompt")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function prompt() { [native code] }");
    return "function prompt() { [native code] }";
  } else if (_lp_func_toString.call(this).includes("toBlob")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function toBlob() { [native code] }");
    return "function toBlob() { [native code] }";
  } else if (_lp_func_toString.call(this).includes("getImageData")) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function getImageData() { [native code] }");
    return "function getImageData() { [native code] }";
  } else if (this.name === "eval") {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function eval() { [native code] }");
    return "function eval() { [native code] }";
  } else if (this.name === "MimeTypeArray") {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function MimeTypeArray() { [native code] }");
    return "function MimeTypeArray() { [native code] }";
  } else if (this.name === "PluginArray") {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function PluginArray() { [native code] }");
    return "function PluginArray() { [native code] }";
  } else if (this.name === "Window") {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function Window() { [native code] }");
    return "function Window() { [native code] }";
  } else if (
    _lp_func_toString.call(this).includes("XMLHttpRequest.prototype send")
  ) {
    h_log(`Function toString ${this.name} 被调用`);
    h_log(`返回：` + "function send() { [native code] }");
    return "function send() { [native code] }";
  }
  h_log(`Function toString ${this.name} 被调用`);
  h_log(
    "函数体为（只展示100字符）：" + _lp_func_toString.call(this).slice(0, 100)
  );
  h_log("原路返回");
  return _lp_func_toString.call(this);
};

if (hook_ObjectToString) {
  let _lp_obj_toString = Object.assign(Object.prototype.toString);
  Object.prototype.toString = function () {
    h_log("Object toString 被调用");
    h_log("对象为：" + _lp_obj_toString.call(this));
    debugger;
    // h_log(this)
    h_log("----------------------------------------");
    return _lp_obj_toString.call(this);
  };
}

if (hook_RegExp) {
  let _lp_RegExp_test = Object.assign(RegExp.prototype.test);
  let _lp_RegExp_exec = Object.assign(RegExp.prototype.exec);
  let _lp_RegExp_compile = Object.assign(RegExp.prototype.compile);
  let _lp_RegExp_toString = Object.assign(RegExp.prototype.toString);

  // 保存原始RegExp构造函数
  const _lp_OriginalRegExp = RegExp;

  // Hook RegExp构造函数
  RegExp = function (pattern, flags) {
    h_log("RegExp 构造函数被调用", "pattern:", pattern, "flags:", flags);

    if (this instanceof RegExp) {
      // new RegExp() 调用
      const instance = new _lp_OriginalRegExp(pattern, flags);
      Object.setPrototypeOf(instance, RegExp.prototype);
      return instance;
    } else {
      // RegExp() 函数调用
      return _lp_OriginalRegExp(pattern, flags);
    }
  };

  // 设置原型链
  RegExp.prototype = _lp_OriginalRegExp.prototype;
  RegExp.prototype.constructor = RegExp;

  // Hook compile方法
  RegExp.prototype.compile = function (pattern, flags) {
    h_log("RegExp compile 被调用", "pattern:", pattern, "flags:", flags);
    const result = _lp_RegExp_compile.call(this, pattern, flags);
    h_log("RegExp compile 返回:", result);
    return result;
  };
  RegExp.prototype.test = function () {
    const result = _lp_RegExp_test.call(this, ...arguments);
    h_log("RegExp test 被调用", "args：", arguments, "返回：", result);
    return result;
  };

  RegExp.prototype.exec = function () {
    const result = _lp_RegExp_exec.call(this, ...arguments);
    h_log("RegExp exec 被调用", "args：", arguments, "返回：", result);
    return result;
  };
}

// 记录元素创建次数
let div_count = 1;
let script_count = 1;
let meta_count = 1;
let html_count = 1;
let head_count = 1;
let body_count = 1;
let a_count = 1;
let form_count = 1;
let input_count = 1;
let iframe_count = 1;
