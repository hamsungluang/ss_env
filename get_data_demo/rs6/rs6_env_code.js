try{(function(){let ProxyObj = function (obj, name, xx = true) {
    return new Proxy(obj, {
        get(target, propKey, receiver) { //拦截对象属性的读取，比如proxy.foo和proxy['foo']。
            let temp = Reflect.get(target, propKey, receiver);
            if (propKey.toString() !== "attachEvent" && propKey.toString() !== "stack" && propKey.toString() !== 'Symbol(Symbol.toPrimitive)') {
                p_log(`${name} -> get ${propKey.toString()} return -> ${temp}`);
            }
            if (typeof temp == 'object' && xx) {
                temp = ProxyObj(temp, name + " => " + propKey)
            }
            return temp;
        },
        set(target, propKey, value, receiver) { //拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
            const temp = Reflect.set(target, propKey, value, receiver);
            if (propKey.toString() !== "D" && propKey.toString() !== "B" && propKey.toString() !== "stack") {
                //p_log(`${name} -> set ${propKey.toString()} value -> ${value}`);
                p_log(`${name} -> set ${propKey} value -> ${value}`);
            }
            //p_log(`${name} -> set ${propKey} value -> ${value}`);
            return temp;
        },
        has(target, propKey) { //拦截propKey in proxy的操作，返回一个布尔值。
            const temp = Reflect.has(target, propKey);
            p_log(`${name} -> has ${propKey.toString()} return -> ${temp}`);
            return temp;
        },
        deleteProperty(target, propKey) { //拦截delete proxy[propKey]的操作，返回一个布尔值。
            const temp = Reflect.deleteProperty(target, propKey);
            p_log(`${name} -> deleteProperty ${propKey}`);
            return temp;
        },
        ownKeys(target) {
            const keys = Reflect.ownKeys(target);

            // 将 keys 数组转换为字符串数组，以便安全地进行打印和返回
            const stringKeys = keys.map(key => {
                if (typeof key === 'symbol') {
                    return key.description ? `Symbol(${key.description})` : 'Symbol()';
                } else {
                    return key.toString();
                }
            });

            p_log(`${name} -> ownKeys ${stringKeys}`); // 打印转换为字符串后的 keys

            return keys; // 返回字符串数组
        },
        //加的
        getOwnPropertyDescriptor(target, propKey) { //拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
            const descriptor = Reflect.getOwnPropertyDescriptor(target, propKey);
            // p_log(`${name} -> getOwnPropertyDescriptor ${propKey.toString()} return ->`, descriptor);
            return descriptor;
        },
        defineProperty(target, propKey, propDesc) { //拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
            const success = Reflect.defineProperty(target, propKey, propDesc);
            p_log(`${name} -> defineProperty ${propKey.toString()} descriptor ->`, propDesc, 'success ->', success);
            return success;
        },
        preventExtensions(target) { //拦截Object.preventExtensions(proxy)，返回一个布尔值。
            const success = Reflect.preventExtensions(target);
            p_log(`${name} -> preventExtensions success ->`, success);
            return success;
        },
        getPrototypeOf(target) { //拦截Object.getPrototypeOf(proxy)，返回一个对象。
            const prototype = Reflect.getPrototypeOf(target);
            p_log(`${name} -> getPrototypeOf return ->`, prototype);
            return prototype;
        },
        isExtensible(target) { //拦截Object.isExtensible(proxy)，返回一个布尔值。
            const extensible = Reflect.isExtensible(target);
            p_log(`${name} -> isExtensible return ->`, extensible);
            return extensible;
        },
        setPrototypeOf(target, proto) { //拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
            const success = Reflect.setPrototypeOf(target, proto);
            p_log(`${name} -> setPrototypeOf proto ->`, proto, 'success ->', success);
            return success;
        },
        apply(target, object, args) { //拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
            p_log(`${name} -> apply object ->`, object, 'args ->', args);
            const result = Reflect.apply(target, object, args);
            p_log(`${name} -> apply result ->`, result);
            return result;
        },
        construct(target, args) { //拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
            p_log(`${name} -> construct args ->`, args);
            const result = Reflect.construct(target, args);
            p_log(`${name} -> construct result ->`, result);
            return result;
        }
    })
};

const hook_prepareStackTrace = config_config.hook_prepareStackTrace;

const hook_RegExp = config_config.hook_RegExp;

const hook_ObjectToString = config_config.hook_ObjectToString;

const hook_ObjectKeys = config_config.hook_ObjectKeys;

if (hook_ObjectKeys) {
  let _lp_obj_keys = Object.assign(Object.keys);
  Object.keys = function (obj) {
    h_log("Object keys 被调用","对象为：" , arguments);
    return _lp_obj_keys(obj);
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
let eventTarget = {};
Object.defineProperty(eventTarget, "addEventListener", {
    get: function () {
        h_log("[v] eventTarget addEventListener value [get]", "arg:", arguments);
        return function () {
            h_log("[v] eventTarget addEventListener value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(eventTarget, "dispatchEvent", {
    get: function () {
        h_log("[v] eventTarget dispatchEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] eventTarget dispatchEvent value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(eventTarget, "removeEventListener", {
    get: function () {
        h_log("[v] eventTarget removeEventListener value [get]", "arg:", arguments);
        return function () {
            h_log("[v] eventTarget removeEventListener value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
EventTarget = function () {
    h_log("eventTarget constructor value [call]", "arg:", arguments)
};
EventTarget.prototype = eventTarget;
Object.defineProperty(eventTarget, "constructor", {
    value: EventTarget,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(eventTarget, Symbol.toStringTag, {
    value: "EventTarget",
    writable: false,
    enumerable: false,
    configurable: true,
});
let _IDB_Open_DB_Request = {};
_IDB_Open_DB_Request.__proto__ = {};
Object.defineProperty(_IDB_Open_DB_Request.__proto__, "onblocked", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__ onblocked get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_IDB_Open_DB_Request.__proto__ onblocked set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__, "onupgradeneeded", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__ onupgradeneeded get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_IDB_Open_DB_Request.__proto__ onupgradeneeded set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
IDBOpenDBRequest = function () {
    h_log("_IDB_Open_DB_Request.__proto__ constructor value [call]", "arg:", arguments)
};
IDBOpenDBRequest.prototype = _IDB_Open_DB_Request.__proto__;
Object.defineProperty(_IDB_Open_DB_Request.__proto__, "constructor", {
    value: IDBOpenDBRequest,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__, Symbol.toStringTag, {
    value: "IDBOpenDBRequest",
    writable: false,
    enumerable: false,
    configurable: true,
});
_IDB_Open_DB_Request.__proto__.__proto__ = {};
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, "result", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ result get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, "error", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ error get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, "source", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ source get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, "transaction", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ transaction get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, "readyState", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ readyState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, "onsuccess", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ onsuccess get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ onsuccess set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, "onerror", {
    get: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ onerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_IDB_Open_DB_Request.__proto__.__proto__ onerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _IDBRequest = function () {
    h_log("_IDB_Open_DB_Request.__proto__.__proto__ constructor value [call]", "arg:", arguments)
};
_IDBRequest.prototype = _IDB_Open_DB_Request.__proto__.__proto__;
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, "constructor", {
    value: _IDBRequest,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_IDB_Open_DB_Request.__proto__.__proto__, Symbol.toStringTag, {
    value: "IDBRequest",
    writable: false,
    enumerable: false,
    configurable: true,
});
_IDB_Open_DB_Request.__proto__.__proto__.__proto__ = eventTarget;


let _indexedDB = {};
_indexedDB.__proto__ = {};
Object.defineProperty(_indexedDB.__proto__, "cmp", {
    get: function () {
        h_log("[v] _indexedDB.__proto__ cmp value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _indexedDB.__proto__ cmp value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_indexedDB.__proto__, "databases", {
    get: function () {
        h_log("[v] _indexedDB.__proto__ databases value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _indexedDB.__proto__ databases value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_indexedDB.__proto__, "deleteDatabase", {
    get: function () {
        h_log("[v] _indexedDB.__proto__ deleteDatabase value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _indexedDB.__proto__ deleteDatabase value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_indexedDB.__proto__, "open", {
    get: function () {
        h_log("[v] _indexedDB.__proto__ open value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _indexedDB.__proto__ open value [call]", "arg:", arguments)
            return _IDB_Open_DB_Request
        }
    }, enumerable: true, configurable: true
});
let _IDBFactory = function () {
    h_log("_indexedDB.__proto__ constructor value [call]", "arg:", arguments)
};
_IDBFactory.prototype = _indexedDB.__proto__;
Object.defineProperty(_indexedDB.__proto__, "constructor", {
    value: _IDBFactory,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_indexedDB.__proto__, Symbol.toStringTag, {
    value: "IDBFactory",
    writable: false,
    enumerable: false,
    configurable: true,
});
let _XMLHttpRequest = function () {
    h_log("XMLHttpRequest constructor value [call]", "arg:", arguments)
}
_XMLHttpRequest.prototype = {
    send: function () {
        h_log("[v] XMLHttpRequest.prototype send value [call]", "arg:", arguments)
    },
    open: function () {
        h_log("[v] XMLHttpRequest.prototype open value [call]", "arg:", arguments)
    },
    [Symbol.toStringTag]: "XMLHttpRequest"
}
_XMLHttpRequest.prototype = ProxyObj(_XMLHttpRequest.prototype, "_XMLHttpRequest.prototype")
let _Request = function () {
    h_log("Request constructor value [call]", "arg:", arguments)
}
_Request.prototype = {}
_Request.prototype = ProxyObj(_Request.prototype, "_Request.prototype")
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

let _network_information = {};
_network_information.__proto__ = {};
Object.defineProperty(_network_information.__proto__, "onchange", {
    get: function () {
        h_log("_network_information.__proto__ onchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_network_information.__proto__ onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_network_information.__proto__, "effectiveType", {
    get: function () {
        h_log("_network_information.__proto__ effectiveType get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_network_information.__proto__, "rtt", {
    get: function () {
        h_log("_network_information.__proto__ rtt get [call]", "arg:", arguments)
        return 50
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_network_information.__proto__, "downlink", {
    get: function () {
        h_log("_network_information.__proto__ downlink get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_network_information.__proto__, "saveData", {
    get: function () {
        h_log("_network_information.__proto__ saveData get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
let _NetworkInformation = function () {
    h_log("_network_information.__proto__ constructor value [call]", "arg:", arguments)
};
_NetworkInformation.prototype = _network_information.__proto__;
Object.defineProperty(_network_information.__proto__, "constructor", {
    value: _NetworkInformation,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_network_information.__proto__, Symbol.toStringTag, {
    value: "NetworkInformation",
    writable: false,
    enumerable: false,
    configurable: true,
});
_network_information.__proto__.__proto__ = eventTarget;

let _navigator_UAData = {};
_navigator_UAData.__proto__ = {};
Object.defineProperty(_navigator_UAData.__proto__, "brands", {
    get: function () {
        h_log("_navigator_UAData.__proto__ brands get [call]", "arg:", arguments)
        return [
            {
                "brand": "Not)A;Brand",
                "version": "8"
            },
            {
                "brand": "Chromium",
                "version": "138"
            },
            {
                "brand": "Google Chrome",
                "version": "138"
            }
        ]
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator_UAData.__proto__, "mobile", {
    get: function () {
        h_log("_navigator_UAData.__proto__ mobile get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator_UAData.__proto__, "platform", {
    get: function () {
        h_log("_navigator_UAData.__proto__ platform get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator_UAData.__proto__, "getHighEntropyValues", {
    get: function () {
        h_log("[v] _navigator_UAData.__proto__ getHighEntropyValues value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator_UAData.__proto__ getHighEntropyValues value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator_UAData.__proto__, "toJSON", {
    get: function () {
        h_log("[v] _navigator_UAData.__proto__ toJSON value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator_UAData.__proto__ toJSON value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _NavigatorUAData = function () {
    h_log("_navigator_UAData.__proto__ constructor value [call]", "arg:", arguments)
};
_NavigatorUAData.prototype = _navigator_UAData.__proto__;
Object.defineProperty(_navigator_UAData.__proto__, "constructor", {
    value: _NavigatorUAData,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_navigator_UAData.__proto__, Symbol.toStringTag, {
    value: "NavigatorUAData",
    writable: false,
    enumerable: false,
    configurable: true,
});

let _storagemanager = {};
_storagemanager.__proto__ = {};
Object.defineProperty(_storagemanager.__proto__, "estimate", {
    get: function () {
        h_log("[v] _storagemanager.__proto__ estimate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _storagemanager.__proto__ estimate value [call]", "arg:", arguments)
            return Promise.resolve({
                "quota": 108095390514,
                "usage": 5650,
                "usageDetails": {
                    "indexedDB": 5650
                }
            });
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_storagemanager.__proto__, "persisted", {
    get: function () {
        h_log("[v] _storagemanager.__proto__ persisted value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _storagemanager.__proto__ persisted value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _StorageManager = function () {
    h_log("_storagemanager.__proto__ constructor value [call]", "arg:", arguments)
};
_StorageManager.prototype = _storagemanager.__proto__;
Object.defineProperty(_storagemanager.__proto__, "constructor", {
    value: _StorageManager,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_storagemanager.__proto__, "getDirectory", {
    get: function () {
        h_log("[v] _storagemanager.__proto__ getDirectory value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _storagemanager.__proto__ getDirectory value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_storagemanager.__proto__, "persist", {
    get: function () {
        h_log("[v] _storagemanager.__proto__ persist value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _storagemanager.__proto__ persist value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_storagemanager.__proto__, Symbol.toStringTag, {
    value: "StorageManager",
    writable: false,
    enumerable: false,
    configurable: true,
});
let _batteryIsCharging = {};
_batteryIsCharging.__proto__ = {};
Object.defineProperty(_batteryIsCharging.__proto__, "charging", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ charging get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "chargingTime", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ chargingTime get [call]", "arg:", arguments)
        return Infinity
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "dischargingTime", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ dischargingTime get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "level", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ level get [call]", "arg:", arguments)
        return 1.0
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "onchargingchange", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ onchargingchange get [call]", "arg:", arguments)
        return true
    }, set: function () {
        h_log("_batteryIsCharging.__proto__ onchargingchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "onchargingtimechange", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ onchargingtimechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_batteryIsCharging.__proto__ onchargingtimechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "ondischargingtimechange", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ ondischargingtimechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_batteryIsCharging.__proto__ ondischargingtimechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, "onlevelchange", {
    get: function () {
        h_log("_batteryIsCharging.__proto__ onlevelchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_batteryIsCharging.__proto__ onlevelchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
BatteryManager = function () {
    h_log("_batteryIsCharging.__proto__ constructor value [call]", "arg:", arguments)
};
BatteryManager.prototype = _batteryIsCharging.__proto__;
Object.defineProperty(_batteryIsCharging.__proto__, "constructor", {
    value: BatteryManager,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_batteryIsCharging.__proto__, Symbol.toStringTag, {
    value: "BatteryManager",
    writable: false,
    enumerable: false,
    configurable: true,
});
_batteryIsCharging.__proto__.__proto__ = eventTarget;

let _chrome_app = {};
Object.defineProperty(_chrome_app, "isInstalled", {
  value: false,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "getDetails", {
  get: function () {
    h_log("[v] _chrome_app getDetails value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_app getDetails value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "getIsInstalled", {
  get: function () {
    h_log("[v] _chrome_app getIsInstalled value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_app getIsInstalled value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "installState", {
  get: function () {
    h_log("[v] _chrome_app installState value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_app installState value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "runningState", {
  get: function () {
    h_log("[v] _chrome_app runningState value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_app runningState value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "InstallState", {
  value: {
    DISABLED: "disabled",
    INSTALLED: "installed",
    NOT_INSTALLED: "not_installed",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "RunningState", {
  value: {
    CANNOT_RUN: "cannot_run",
    READY_TO_RUN: "ready_to_run",
    RUNNING: "running",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});

let _chrome_runtime = {};
Object.defineProperty(_chrome_runtime, "dynamicId", {
  value: undefined,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "id", {
  value: undefined,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "connect", {
  get: function () {
    h_log("[v] _chrome_runtime connect value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_runtime connect value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "sendMessage", {
  get: function () {
    h_log("[v] _chrome_runtime sendMessage value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_runtime sendMessage value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "ContextType", {
  value: {
    BACKGROUND: "BACKGROUND",
    DEVELOPER_TOOLS: "DEVELOPER_TOOLS",
    OFFSCREEN_DOCUMENT: "OFFSCREEN_DOCUMENT",
    POPUP: "POPUP",
    SIDE_PANEL: "SIDE_PANEL",
    TAB: "TAB",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "OnInstalledReason", {
  value: {
    CHROME_UPDATE: "chrome_update",
    INSTALL: "install",
    SHARED_MODULE_UPDATE: "shared_module_update",
    UPDATE: "update",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "OnRestartRequiredReason", {
  value: {
    APP_UPDATE: "app_update",
    OS_UPDATE: "os_update",
    PERIODIC: "periodic",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "PlatformArch", {
  value: {
    ARM: "arm",
    ARM64: "arm64",
    MIPS: "mips",
    MIPS64: "mips64",
    X86_32: "x86-32",
    X86_64: "x86-64",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "PlatformNaclArch", {
  value: {
    ARM: "arm",
    MIPS: "mips",
    MIPS64: "mips64",
    X86_32: "x86-32",
    X86_64: "x86-64",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "PlatformOs", {
  value: {
    ANDROID: "android",
    CROS: "cros",
    FUCHSIA: "fuchsia",
    LINUX: "linux",
    MAC: "mac",
    OPENBSD: "openbsd",
    WIN: "win",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "RequestUpdateCheckStatus", {
  value: {
    NO_UPDATE: "no_update",
    THROTTLED: "throttled",
    UPDATE_AVAILABLE: "update_available",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});

let _chrome = {};
Object.defineProperty(_chrome, "loadTimes", {
  get: function () {
    h_log("[v] _chrome loadTimes value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome loadTimes value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome, "csi", {
  get: function () {
    h_log("[v] _chrome csi value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome csi value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome, "app", {
  value: _chrome_app,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome, "runtime", {
  value: _chrome_runtime,
  writable: true,
  enumerable: true,
  configurable: true,
});
let _history = {};
_history.__proto__ = {};
Object.defineProperty(_history.__proto__, "length", {
    get: function () {
        h_log("_history.__proto__ length get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_history.__proto__, "scrollRestoration", {
    get: function () {
        h_log("_history.__proto__ scrollRestoration get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_history.__proto__ scrollRestoration set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_history.__proto__, "state", {
    get: function () {
        h_log("_history.__proto__ state get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_history.__proto__, "back", {
    get: function () {
        h_log("[v] _history.__proto__ back value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ back value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_history.__proto__, "forward", {
    get: function () {
        h_log("[v] _history.__proto__ forward value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ forward value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_history.__proto__, "go", {
    get: function () {
        h_log("[v] _history.__proto__ go value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ go value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_history.__proto__, "pushState", {
    get: function () {
        h_log("[v] _history.__proto__ pushState value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ pushState value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_history.__proto__, "replaceState", {
    get: function () {
        h_log("[v] _history.__proto__ replaceState value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _history.__proto__ replaceState value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _History = function () {
    h_log("_history.__proto__ constructor value [call]", "arg:", arguments)
};
_History.prototype = _history.__proto__;
Object.defineProperty(_history.__proto__, "constructor", {
    value: _History,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_history.__proto__, Symbol.toStringTag, {
    value: "History",
    writable: false,
    enumerable: false,
    configurable: true,
});
let _screen = {};
_screen.__proto__ = {};
Object.defineProperty(_screen.__proto__, "availWidth", {
    get: function () {
        h_log("_screen.__proto__ availWidth get [call]", "arg:", arguments)
        return 1536
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availHeight", {
    get: function () {
        h_log("_screen.__proto__ availHeight get [call]", "arg:", arguments)
        return 816
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "width", {
    get: function () {
        h_log("_screen.__proto__ width get [call]", "arg:", arguments)
        return 1536
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "height", {
    get: function () {
        h_log("_screen.__proto__ height get [call]", "arg:", arguments)
        return 864
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "colorDepth", {
    get: function () {
        h_log("_screen.__proto__ colorDepth get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "pixelDepth", {
    get: function () {
        h_log("_screen.__proto__ pixelDepth get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availLeft", {
    get: function () {
        h_log("_screen.__proto__ availLeft get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "availTop", {
    get: function () {
        h_log("_screen.__proto__ availTop get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "orientation", {
    get: function () {
        h_log("_screen.__proto__ orientation get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
let _Screen = function () {
    h_log("_screen.__proto__ constructor value [call]", "arg:", arguments)
};
_Screen.prototype = _screen.__proto__;
Object.defineProperty(_screen.__proto__, "constructor", {
    value: _Screen,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_screen.__proto__, "onchange", {
    get: function () {
        h_log("_screen.__proto__ onchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_screen.__proto__ onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, "isExtended", {
    get: function () {
        h_log("_screen.__proto__ isExtended get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_screen.__proto__, Symbol.toStringTag, {
    value: "Screen",
    writable: false,
    enumerable: false,
    configurable: true,
});
_screen.__proto__.__proto__ = eventTarget;
let _plugins = {};
Object.defineProperty(_plugins, "0", {
  value: {},
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_plugins, "1", {
  value: {},
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_plugins, "2", {
  value: {},
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_plugins, "3", {
  value: {},
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_plugins, "4", {
  value: {},
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_plugins, "PDF Viewer", {
  value: {},
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_plugins, "Chrome PDF Viewer", {
  value: {},
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_plugins, "Chromium PDF Viewer", {
  value: {},
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_plugins, "Microsoft Edge PDF Viewer", {
  value: {},
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_plugins, "WebKit built-in PDF", {
  value: {},
  writable: false,
  enumerable: false,
  configurable: true,
});
_plugins.__proto__ = {};
Object.defineProperty(_plugins.__proto__, "length", {
  get: function () {
    h_log("_plugins.__proto__ length get [call]", "arg:", arguments);
    return 5;
  },
  set: undefined,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_plugins.__proto__, "item", {
  get: function () {
    h_log("[v] _plugins.__proto__ item value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _plugins.__proto__ item value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_plugins.__proto__, "namedItem", {
  get: function () {
    h_log("[v] _plugins.__proto__ namedItem value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _plugins.__proto__ namedItem value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_plugins.__proto__, "refresh", {
  get: function () {
    h_log("[v] _plugins.__proto__ refresh value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _plugins.__proto__ refresh value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
let _PluginArray = function () {
  h_log("_plugins.__proto__ constructor value [call]", "arg:", arguments);
};
_PluginArray.prototype = _plugins.__proto__;
Object.defineProperty(_plugins.__proto__, "constructor", {
  value: _PluginArray,
  writable: true,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_plugins.__proto__, Symbol.toStringTag, {
  value: "PluginArray",
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_plugins.__proto__, Symbol.iterator, {
  get: function () {
    h_log(
      "[v] _plugins.__proto__ Symbol(Symbol.iterator) value [get]",
      "arg:",
      arguments
    );
    return function () {
      h_log(
        "[v] _plugins.__proto__ Symbol(Symbol.iterator) value [call]",
        "arg:",
        arguments
      );
    };
  },
  enumerable: false,
  configurable: true,
});
let _mimeTypes = {};
Object.defineProperty(_mimeTypes, "0", {
  value: {},
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_mimeTypes, "1", {
  value: {},
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_mimeTypes, "application/pdf", {
  value: {},
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_mimeTypes, "text/pdf", {
  value: {},
  writable: false,
  enumerable: false,
  configurable: true,
});
_mimeTypes.__proto__ = {};
Object.defineProperty(_mimeTypes.__proto__, "length", {
  get: function () {
    h_log("_mimeTypes.__proto__ length get [call]", "arg:", arguments);
    return 2;
  },
  set: undefined,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_mimeTypes.__proto__, "item", {
  get: function () {
    h_log("[v] _mimeTypes.__proto__ item value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _mimeTypes.__proto__ item value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_mimeTypes.__proto__, "namedItem", {
  get: function () {
    h_log("[v] _mimeTypes.__proto__ namedItem value [get]", "arg:", arguments);
    return function () {
      h_log(
        "[v] _mimeTypes.__proto__ namedItem value [call]",
        "arg:",
        arguments
      );
    };
  },
  enumerable: true,
  configurable: true,
});
let _MimeTypeArray = function () {
  h_log("_mimeTypes.__proto__ constructor value [call]", "arg:", arguments);
};
_MimeTypeArray.prototype = _mimeTypes.__proto__;
Object.defineProperty(_mimeTypes.__proto__, "constructor", {
  value: _MimeTypeArray,
  writable: true,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_mimeTypes.__proto__, Symbol.toStringTag, {
  value: "MimeTypeArray",
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(_mimeTypes.__proto__, Symbol.iterator, {
  get: function () {
    h_log(
      "[v] _mimeTypes.__proto__ Symbol(Symbol.iterator) value [get]",
      "arg:",
      arguments
    );
    return function () {
      h_log(
        "[v] _mimeTypes.__proto__ Symbol(Symbol.iterator) value [call]",
        "arg:",
        arguments
      );
    };
  },
  enumerable: false,
  configurable: true,
});

let _navigator = {};
_navigator.__proto__ = {};
Object.defineProperty(_navigator.__proto__, "vendorSub", {
    get: function () {
        h_log("_navigator.__proto__ vendorSub get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "productSub", {
    get: function () {
        h_log("_navigator.__proto__ productSub get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "vendor", {
    get: function () {
        h_log("_navigator.__proto__ vendor get [call]", "arg:", arguments)
        return 'Google Inc.'
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "maxTouchPoints", {
    get: function () {
        h_log("_navigator.__proto__ maxTouchPoints get [call]", "arg:", arguments)
        return 0
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "scheduling", {
    get: function () {
        h_log("_navigator.__proto__ scheduling get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "userActivation", {
    get: function () {
        h_log("_navigator.__proto__ userActivation get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "doNotTrack", {
    get: function () {
        h_log("_navigator.__proto__ doNotTrack get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "geolocation", {
    get: function () {
        h_log("_navigator.__proto__ geolocation get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "connection", {
    get: function () {
        h_log("_navigator.__proto__ connection get [call]", "arg:", arguments)
        return _network_information
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "plugins", {
    get: function () {
        h_log("_navigator.__proto__ plugins get [call]", "arg:", arguments)
        return _plugins
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "mimeTypes", {
    get: function () {
        h_log("_navigator.__proto__ mimeTypes get [call]", "arg:", arguments)
        return _mimeTypes
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "pdfViewerEnabled", {
    get: function () {
        h_log("_navigator.__proto__ pdfViewerEnabled get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "webkitTemporaryStorage", {
    get: function () {
        h_log("_navigator.__proto__ webkitTemporaryStorage get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});

let _webkitPersistentStorage = {};
_webkitPersistentStorage.__proto__ = {};
Object.defineProperty(_webkitPersistentStorage.__proto__, "queryUsageAndQuota", {
    get: function () {
        h_log("[v] _webkitPersistentStorage.__proto__ queryUsageAndQuota value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _webkitPersistentStorage.__proto__ queryUsageAndQuota value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_webkitPersistentStorage.__proto__, "requestQuota", {
    get: function () {
        h_log("[v] _webkitPersistentStorage.__proto__ requestQuota value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _webkitPersistentStorage.__proto__ requestQuota value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_webkitPersistentStorage.__proto__, Symbol.toStringTag, {
    value: "DeprecatedStorageQuota",
    writable: false,
    enumerable: false,
    configurable: true,
});

Object.defineProperty(_navigator.__proto__, "webkitPersistentStorage", {
    get: function () {
        h_log("_navigator.__proto__ webkitPersistentStorage get [call]", "arg:", arguments)
        return _webkitPersistentStorage
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "hardwareConcurrency", {
    get: function () {
        h_log("_navigator.__proto__ hardwareConcurrency get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "cookieEnabled", {
    get: function () {
        h_log("_navigator.__proto__ cookieEnabled get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "appCodeName", {
    get: function () {
        h_log("_navigator.__proto__ appCodeName get [call]", "arg:", arguments)
        return "Mozilla"
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "appName", {
    get: function () {
        h_log("_navigator.__proto__ appName get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "appVersion", {
    get: function () {
        h_log("_navigator.__proto__ appVersion get [call]", "arg:", arguments)
        return '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "platform", {
    get: function () {
        h_log("_navigator.__proto__ platform get [call]", "arg:", arguments)
        return 'Win32'
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "product", {
    get: function () {
        h_log("_navigator.__proto__ product get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "userAgent", {
    get: function () {
        h_log("_navigator.__proto__ userAgent get [call]", "arg:", arguments)
        return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "language", {
    get: function () {
        h_log("_navigator.__proto__ language get [call]", "arg:", arguments)
        return 'en-US'
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "languages", {
    get: function () {
        h_log("_navigator.__proto__ languages get [call]", "arg:", arguments)
        return ["en-US", "zh-CN", "zh", "en"]
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "onLine", {
    get: function () {
        h_log("_navigator.__proto__ onLine get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "webdriver", {
    get: function () {
        h_log("_navigator.__proto__ webdriver get [call]", "arg:", arguments)
        return false
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "getGamepads", {
    get: function () {
        h_log("[v] _navigator.__proto__ getGamepads value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ getGamepads value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "javaEnabled", {
    get: function () {
        h_log("[v] _navigator.__proto__ javaEnabled value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ javaEnabled value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "sendBeacon", {
    value: function () {
        h_log("[v] _navigator.__proto__ sendBeacon value [call]", "arg:", arguments);
    }, enumerable: true, configurable: true, writable: true
});
Object.defineProperty(_navigator.__proto__, "vibrate", {
    get: function () {
        h_log("[v] _navigator.__proto__ vibrate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ vibrate value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _Navigator = function () {
    h_log("_navigator.__proto__ constructor value [call]", "arg:", arguments)
};
_Navigator.prototype = _navigator.__proto__;
Object.defineProperty(_navigator.__proto__, "constructor", {
    value: _Navigator,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_navigator.__proto__, "deprecatedRunAdAuctionEnforcesKAnonymity", {
    get: function () {
        h_log("_navigator.__proto__ deprecatedRunAdAuctionEnforcesKAnonymity get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "bluetooth", {
    get: function () {
        h_log("_navigator.__proto__ bluetooth get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "clipboard", {
    get: function () {
        h_log("_navigator.__proto__ clipboard get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "credentials", {
    get: function () {
        h_log("_navigator.__proto__ credentials get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "keyboard", {
    get: function () {
        h_log("_navigator.__proto__ keyboard get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "managed", {
    get: function () {
        h_log("_navigator.__proto__ managed get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "mediaDevices", {
    get: function () {
        h_log("_navigator.__proto__ mediaDevices get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "storage", {
    get: function () {
        h_log("_navigator.__proto__ storage get [call]", "arg:", arguments)
        return _storagemanager
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "serviceWorker", {
    get: function () {
        h_log("_navigator.__proto__ serviceWorker get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "virtualKeyboard", {
    get: function () {
        h_log("_navigator.__proto__ virtualKeyboard get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "wakeLock", {
    get: function () {
        h_log("_navigator.__proto__ wakeLock get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "deviceMemory", {
    get: function () {
        h_log("_navigator.__proto__ deviceMemory get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "login", {
    get: function () {
        h_log("_navigator.__proto__ login get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "ink", {
    get: function () {
        h_log("_navigator.__proto__ ink get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "hid", {
    get: function () {
        h_log("_navigator.__proto__ hid get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "locks", {
    get: function () {
        h_log("_navigator.__proto__ locks get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "gpu", {
    get: function () {
        h_log("_navigator.__proto__ gpu get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "mediaCapabilities", {
    get: function () {
        h_log("_navigator.__proto__ mediaCapabilities get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "mediaSession", {
    get: function () {
        h_log("_navigator.__proto__ mediaSession get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "permissions", {
    get: function () {
        h_log("_navigator.__proto__ permissions get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "presentation", {
    get: function () {
        h_log("_navigator.__proto__ presentation get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "usb", {
    get: function () {
        h_log("_navigator.__proto__ usb get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "xr", {
    get: function () {
        h_log("_navigator.__proto__ xr get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "serial", {
    get: function () {
        h_log("_navigator.__proto__ serial get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "windowControlsOverlay", {
    get: function () {
        h_log("_navigator.__proto__ windowControlsOverlay get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "userAgentData", {
    get: function () {
        h_log("_navigator.__proto__ userAgentData get [call]", "arg:", arguments)
        return _navigator_UAData
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_navigator.__proto__, "adAuctionComponents", {
    get: function () {
        h_log("[v] _navigator.__proto__ adAuctionComponents value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ adAuctionComponents value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "runAdAuction", {
    get: function () {
        h_log("[v] _navigator.__proto__ runAdAuction value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ runAdAuction value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "canLoadAdAuctionFencedFrame", {
    get: function () {
        h_log("[v] _navigator.__proto__ canLoadAdAuctionFencedFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ canLoadAdAuctionFencedFrame value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "canShare", {
    get: function () {
        h_log("[v] _navigator.__proto__ canShare value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ canShare value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "share", {
    get: function () {
        h_log("[v] _navigator.__proto__ share value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ share value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "clearAppBadge", {
    get: function () {
        h_log("[v] _navigator.__proto__ clearAppBadge value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ clearAppBadge value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});

Object.defineProperty(_navigator.__proto__, "getBattery", {
    get: function () {
        h_log("[v] _navigator.__proto__ getBattery value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ getBattery value [call]", "arg:", arguments)
            return Promise.resolve(_batteryIsCharging);
        }
    }, enumerable: true, configurable: true
});

Object.defineProperty(_navigator.__proto__, "getUserMedia", {
    get: function () {
        h_log("[v] _navigator.__proto__ getUserMedia value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ getUserMedia value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "requestMIDIAccess", {
    get: function () {
        h_log("[v] _navigator.__proto__ requestMIDIAccess value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ requestMIDIAccess value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "requestMediaKeySystemAccess", {
    get: function () {
        h_log("[v] _navigator.__proto__ requestMediaKeySystemAccess value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ requestMediaKeySystemAccess value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "setAppBadge", {
    get: function () {
        h_log("[v] _navigator.__proto__ setAppBadge value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ setAppBadge value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "webkitGetUserMedia", {
    get: function () {
        h_log("[v] _navigator.__proto__ webkitGetUserMedia value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ webkitGetUserMedia value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "clearOriginJoinedAdInterestGroups", {
    get: function () {
        h_log("[v] _navigator.__proto__ clearOriginJoinedAdInterestGroups value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ clearOriginJoinedAdInterestGroups value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "createAuctionNonce", {
    get: function () {
        h_log("[v] _navigator.__proto__ createAuctionNonce value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ createAuctionNonce value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "deprecatedReplaceInURN", {
    get: function () {
        h_log("[v] _navigator.__proto__ deprecatedReplaceInURN value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ deprecatedReplaceInURN value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "deprecatedURNToURL", {
    get: function () {
        h_log("[v] _navigator.__proto__ deprecatedURNToURL value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ deprecatedURNToURL value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "getInstalledRelatedApps", {
    get: function () {
        h_log("[v] _navigator.__proto__ getInstalledRelatedApps value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ getInstalledRelatedApps value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "joinAdInterestGroup", {
    get: function () {
        h_log("[v] _navigator.__proto__ joinAdInterestGroup value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ joinAdInterestGroup value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "leaveAdInterestGroup", {
    get: function () {
        h_log("[v] _navigator.__proto__ leaveAdInterestGroup value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ leaveAdInterestGroup value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "updateAdInterestGroups", {
    get: function () {
        h_log("[v] _navigator.__proto__ updateAdInterestGroups value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ updateAdInterestGroups value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "registerProtocolHandler", {
    get: function () {
        h_log("[v] _navigator.__proto__ registerProtocolHandler value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ registerProtocolHandler value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, "unregisterProtocolHandler", {
    get: function () {
        h_log("[v] _navigator.__proto__ unregisterProtocolHandler value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _navigator.__proto__ unregisterProtocolHandler value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_navigator.__proto__, Symbol.toStringTag, {
    value: "Navigator",
    writable: false,
    enumerable: false,
    configurable: true,
});let _location = {};
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
});let _base_dom = {};
Object.defineProperty(_base_dom, "title", {
    get: function () {
        h_log("_base_dom title get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom title set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "lang", {
    get: function () {
        h_log("_base_dom lang get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom lang set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "translate", {
    get: function () {
        h_log("_base_dom translate get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom translate set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "dir", {
    get: function () {
        h_log("_base_dom dir get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom dir set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "hidden", {
    get: function () {
        h_log("_base_dom hidden get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom hidden set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "accessKey", {
    get: function () {
        h_log("_base_dom accessKey get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom accessKey set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "draggable", {
    get: function () {
        h_log("_base_dom draggable get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom draggable set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "spellcheck", {
    get: function () {
        h_log("_base_dom spellcheck get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom spellcheck set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "autocapitalize", {
    get: function () {
        h_log("_base_dom autocapitalize get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom autocapitalize set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "contentEditable", {
    get: function () {
        h_log("_base_dom contentEditable get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom contentEditable set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "enterKeyHint", {
    get: function () {
        h_log("_base_dom enterKeyHint get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom enterKeyHint set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "isContentEditable", {
    get: function () {
        h_log("_base_dom isContentEditable get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "inputMode", {
    get: function () {
        h_log("_base_dom inputMode get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom inputMode set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "virtualKeyboardPolicy", {
    get: function () {
        h_log("_base_dom virtualKeyboardPolicy get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom virtualKeyboardPolicy set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "offsetParent", {
    get: function () {
        h_log("_base_dom offsetParent get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "offsetTop", {
    get: function () {
        h_log("_base_dom offsetTop get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "offsetLeft", {
    get: function () {
        h_log("_base_dom offsetLeft get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "offsetWidth", {
    get: function () {
        h_log("_base_dom offsetWidth get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "offsetHeight", {
    get: function () {
        h_log("_base_dom offsetHeight get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "popover", {
    get: function () {
        h_log("_base_dom popover get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom popover set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "innerText", {
    get: function () {
        h_log(
            "_base_dom innerText get [call]",
            "arg:",
            arguments,
            "this--->",
            this
        );
        // 实际上是返回源代码
        return `$_ts=window['$_ts'];if(!$_ts)$_ts={};$_ts.nsd=35580;$_ts.cd="qoyxrrAloALlWkZmcqqtrGLoWkQEqqLmcGEcJaLrWkZcJGVBcqAPcGWRiGGqcGltrOq6cqqtrqLmWqVtqkqdrAGqcG3oWfV2ha9CoqLmDAGEqqLkcGqaJaGqJsEtcqqtqGLkWkQtq1ZtrcQtrsqdqGGqcGWtqkq6cGQaHZVtrcZvvuA0ruAuJdXvln_eaj4lmwS5IXD0OmVdT0hrnwbwnrzNJJKoUI_OMKhr4CfIJ8QXpxK3GUrFbaX7qGljqL3B1eyM8lNoFu3S_9N_VuxEJYCbwvxwQlyhHHqypDzX1UYe4bW4pop8HuX.V9g53TYeUeSMQlJ6FlNFN9aCs0zSs9HxKlRUYOSOUHSVMvRuJY0gZsE4WCwipvu6wbJCYlRrxteOisqaJOE9e6l4IUpHJCdsKkJGMKfPxteOisqaJOE9e6l4QofkIO4UYTYfi2J8xteOisqaJOE9e6l4wbmlW2ds1smc1Dm.xHwSiTrBUYy1jKYgYvEaROoEwOR9F0NpM77uQ97yFlfmZsETHKfG1CBViVeuJuxrsJxMF9NpwP9gdk7TJuWntKkXiY2XAuJ5VZTuFbp1Wn9gdk7TJuWntKkXi1g63ugnita6hbeSHoY7jurhpTwTp9kxFu7610zhAIfpsDN3H0qtvkErJrpBQ64zQsL0JuZTitL6JslSHsV_.sLaqurbHO5BWaW0Js3Ji_0TJkE4JuWy.a7CJkq0WkPNiOqYCvZ2N1rv.cz_TAveAuFSwfhwTAH1rE8V9aCFcx0oqGEmxTPKHXXzWEuhEPucvZXg.TjVkNT0HqZtwvp5jUecOB3ikuXjJuWaJsEdc_0EWsE6WsgujkqyJ19d3k.81lx7M9AaWZg7MOx3AOYJZlJcHmmbA6dpVsfQKvA5YMJlVDEuIbYMvAW0rkEDWEO0JULN3CR9xBSBQP2OwCabdomztKJSMPMd3C7N3DRuxBe.MP2GFvQbd6GntKl.RDBdhbJG3cz9Mde_hDRzFPzNZbSbMDV.Ro.zhbJCQ1z9887XRDpCtCJbZ1y9FDV.3CU5hbpj3UZ.MBxChDrBFnzBZv373o3.3vhghbRN3nzfRBgXRb20tCm2ZnybFbSutCunwPSPRbV.MIYzhDx.31zzynyLFUE.M6.zhbfS31zBIXTOQ6RT3nzOdb07MDS9tCHuRcS7MDg.3dJShDSnRPzO4b07MCJTtCkZwDlNFowPMMmLQDEXMUAbe6mBFny.MbPSMbePhbLuF4mB3UVXFbWd7KeN31yjMb8SMCzuhbNLM.mBM6WXFvQy7KeaW1yjwCXSM6rGR1zj8BLXMUYntCNyecyXMDg.FDO6hbeb8PzLMILXMC2GtCfb5cyBQKA.FouZhvr9Q1z6FISnhoYb31z_5bZ7wKz9t6.SFnSTMby0I.mnMbEXw6wv7UxawPy6w6_SQvrS8Pz68I9XQoaXw6yN7UJOFvVTt6B0RcS0wvZ.8HaXQbpBt6Y.4nyn3DV.wKdXhvxLhvYjIHZXQvm9t6Y5ZoE7wbr.t6v48PSCFb3.8IYOW12SFczy4Dg7wvpGt6vj3nSCwKl.88pShomOw1z5doG7QKYet640RcSSFCmfxX2zQvwvFUWb_URbtURdQnM.QKANwop0xXzSwn20ICWb_bJntUYbQ1MjRCxLhvrPFi0XwCfOt6rv_ny6Fbpft66nRD36hvr68Mm_3bGXICzy7UN7wvL.ICIShvfTMnzd8IlX8oZXI1zaeoEqqY0ORsnRU1pNFGJ3hB2.rmLb3b7E.uLcWkEDJGX7qGqmqGESij0nWqqSWOEn.AErJG";if($_ts.lcd)$_ts.lcd();`;
    },
    set: function () {
        h_log("_base_dom innerText set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "outerText", {
    get: function () {
        h_log("_base_dom outerText get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom outerText set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onbeforexrselect", {
    get: function () {
        h_log("_base_dom onbeforexrselect get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onbeforexrselect set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onabort", {
    get: function () {
        h_log("_base_dom onabort get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onabort set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onbeforeinput", {
    get: function () {
        h_log("_base_dom onbeforeinput get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onbeforeinput set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onbeforetoggle", {
    get: function () {
        h_log("_base_dom onbeforetoggle get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onbeforetoggle set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onblur", {
    get: function () {
        h_log("_base_dom onblur get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onblur set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncancel", {
    get: function () {
        h_log("_base_dom oncancel get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncancel set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncanplay", {
    get: function () {
        h_log("_base_dom oncanplay get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncanplay set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncanplaythrough", {
    get: function () {
        h_log("_base_dom oncanplaythrough get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncanplaythrough set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onchange", {
    get: function () {
        h_log("_base_dom onchange get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onchange set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onclick", {
    get: function () {
        h_log("_base_dom onclick get [call]", "arg:", arguments);
        return null
    },
    set: function () {
        h_log("_base_dom onclick set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onclose", {
    get: function () {
        h_log("_base_dom onclose get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onclose set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncontextlost", {
    get: function () {
        h_log("_base_dom oncontextlost get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncontextlost set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncontextmenu", {
    get: function () {
        h_log("_base_dom oncontextmenu get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncontextmenu set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncontextrestored", {
    get: function () {
        h_log("_base_dom oncontextrestored get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncontextrestored set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncuechange", {
    get: function () {
        h_log("_base_dom oncuechange get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncuechange set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondblclick", {
    get: function () {
        h_log("_base_dom ondblclick get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondblclick set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondrag", {
    get: function () {
        h_log("_base_dom ondrag get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondrag set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondragend", {
    get: function () {
        h_log("_base_dom ondragend get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondragend set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondragenter", {
    get: function () {
        h_log("_base_dom ondragenter get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondragenter set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondragleave", {
    get: function () {
        h_log("_base_dom ondragleave get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondragleave set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondragover", {
    get: function () {
        h_log("_base_dom ondragover get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondragover set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondragstart", {
    get: function () {
        h_log("_base_dom ondragstart get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondragstart set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondrop", {
    get: function () {
        h_log("_base_dom ondrop get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondrop set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ondurationchange", {
    get: function () {
        h_log("_base_dom ondurationchange get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ondurationchange set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onemptied", {
    get: function () {
        h_log("_base_dom onemptied get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onemptied set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onended", {
    get: function () {
        h_log("_base_dom onended get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onended set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onerror", {
    get: function () {
        h_log("_base_dom onerror get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onerror set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onfocus", {
    get: function () {
        h_log("_base_dom onfocus get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onfocus set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onformdata", {
    get: function () {
        h_log("_base_dom onformdata get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onformdata set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oninput", {
    get: function () {
        h_log("_base_dom oninput get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oninput set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oninvalid", {
    get: function () {
        h_log("_base_dom oninvalid get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oninvalid set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onkeydown", {
    get: function () {
        h_log("_base_dom onkeydown get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onkeydown set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onkeypress", {
    get: function () {
        h_log("_base_dom onkeypress get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onkeypress set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onkeyup", {
    get: function () {
        h_log("_base_dom onkeyup get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onkeyup set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onload", {
    get: function () {
        h_log("_base_dom onload get [call]", "arg:", arguments, "this:", this.tag_arg);
    },
    set: function () {
        h_log("_base_dom onload set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onloadeddata", {
    get: function () {
        h_log("_base_dom onloadeddata get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onloadeddata set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onloadedmetadata", {
    get: function () {
        h_log("_base_dom onloadedmetadata get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onloadedmetadata set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onloadstart", {
    get: function () {
        h_log("_base_dom onloadstart get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onloadstart set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onmousedown", {
    get: function () {
        h_log("_base_dom onmousedown get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onmousedown set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onmouseenter", {
    get: function () {
        h_log("_base_dom onmouseenter get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onmouseenter set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onmouseleave", {
    get: function () {
        h_log("_base_dom onmouseleave get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onmouseleave set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onmousemove", {
    get: function () {
        h_log("_base_dom onmousemove get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onmousemove set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onmouseout", {
    get: function () {
        h_log("_base_dom onmouseout get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onmouseout set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onmouseover", {
    get: function () {
        h_log("_base_dom onmouseover get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onmouseover set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onmouseup", {
    get: function () {
        h_log("_base_dom onmouseup get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onmouseup set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onmousewheel", {
    get: function () {
        h_log("_base_dom onmousewheel get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onmousewheel set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpause", {
    get: function () {
        h_log("_base_dom onpause get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpause set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onplay", {
    get: function () {
        h_log("_base_dom onplay get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onplay set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onplaying", {
    get: function () {
        h_log("_base_dom onplaying get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onplaying set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onprogress", {
    get: function () {
        h_log("_base_dom onprogress get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onprogress set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onratechange", {
    get: function () {
        h_log("_base_dom onratechange get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onratechange set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onreset", {
    get: function () {
        h_log("_base_dom onreset get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onreset set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onresize", {
    get: function () {
        h_log("_base_dom onresize get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onresize set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onscroll", {
    get: function () {
        h_log("_base_dom onscroll get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onscroll set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onsecuritypolicyviolation", {
    get: function () {
        h_log("_base_dom onsecuritypolicyviolation get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onsecuritypolicyviolation set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onseeked", {
    get: function () {
        h_log("_base_dom onseeked get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onseeked set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onseeking", {
    get: function () {
        h_log("_base_dom onseeking get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onseeking set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onselect", {
    get: function () {
        h_log("_base_dom onselect get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onselect set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onslotchange", {
    get: function () {
        h_log("_base_dom onslotchange get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onslotchange set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onstalled", {
    get: function () {
        h_log("_base_dom onstalled get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onstalled set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onsubmit", {
    get: function () {
        h_log("_base_dom onsubmit get [call]", "arg:", arguments);
        return null
    },
    set: function () {
        h_log("_base_dom onsubmit set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onsuspend", {
    get: function () {
        h_log("_base_dom onsuspend get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onsuspend set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ontimeupdate", {
    get: function () {
        h_log("_base_dom ontimeupdate get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ontimeupdate set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ontoggle", {
    get: function () {
        h_log("_base_dom ontoggle get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ontoggle set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onvolumechange", {
    get: function () {
        h_log("_base_dom onvolumechange get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onvolumechange set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onwaiting", {
    get: function () {
        h_log("_base_dom onwaiting get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onwaiting set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onwebkitanimationend", {
    get: function () {
        h_log("_base_dom onwebkitanimationend get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onwebkitanimationend set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onwebkitanimationiteration", {
    get: function () {
        h_log("_base_dom onwebkitanimationiteration get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onwebkitanimationiteration set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onwebkitanimationstart", {
    get: function () {
        h_log("_base_dom onwebkitanimationstart get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onwebkitanimationstart set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onwebkittransitionend", {
    get: function () {
        h_log("_base_dom onwebkittransitionend get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onwebkittransitionend set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onwheel", {
    get: function () {
        h_log("_base_dom onwheel get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onwheel set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onauxclick", {
    get: function () {
        h_log("_base_dom onauxclick get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onauxclick set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ongotpointercapture", {
    get: function () {
        h_log("_base_dom ongotpointercapture get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ongotpointercapture set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onlostpointercapture", {
    get: function () {
        h_log("_base_dom onlostpointercapture get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onlostpointercapture set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointerdown", {
    get: function () {
        h_log("_base_dom onpointerdown get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointerdown set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointermove", {
    get: function () {
        h_log("_base_dom onpointermove get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointermove set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointerrawupdate", {
    get: function () {
        h_log("_base_dom onpointerrawupdate get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointerrawupdate set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointerup", {
    get: function () {
        h_log("_base_dom onpointerup get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointerup set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointercancel", {
    get: function () {
        h_log("_base_dom onpointercancel get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointercancel set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointerover", {
    get: function () {
        h_log("_base_dom onpointerover get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointerover set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointerout", {
    get: function () {
        h_log("_base_dom onpointerout get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointerout set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointerenter", {
    get: function () {
        h_log("_base_dom onpointerenter get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointerenter set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpointerleave", {
    get: function () {
        h_log("_base_dom onpointerleave get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpointerleave set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onselectstart", {
    get: function () {
        h_log("_base_dom onselectstart get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onselectstart set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onselectionchange", {
    get: function () {
        h_log("_base_dom onselectionchange get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onselectionchange set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onanimationend", {
    get: function () {
        h_log("_base_dom onanimationend get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onanimationend set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onanimationiteration", {
    get: function () {
        h_log("_base_dom onanimationiteration get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onanimationiteration set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onanimationstart", {
    get: function () {
        h_log("_base_dom onanimationstart get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onanimationstart set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ontransitionrun", {
    get: function () {
        h_log("_base_dom ontransitionrun get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ontransitionrun set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ontransitionstart", {
    get: function () {
        h_log("_base_dom ontransitionstart get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ontransitionstart set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ontransitionend", {
    get: function () {
        h_log("_base_dom ontransitionend get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ontransitionend set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "ontransitioncancel", {
    get: function () {
        h_log("_base_dom ontransitioncancel get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom ontransitioncancel set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncopy", {
    get: function () {
        h_log("_base_dom oncopy get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncopy set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncut", {
    get: function () {
        h_log("_base_dom oncut get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom oncut set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onpaste", {
    get: function () {
        h_log("_base_dom onpaste get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onpaste set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "dataset", {
    get: function () {
        h_log("_base_dom dataset get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "nonce", {
    get: function () {
        h_log("_base_dom nonce get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom nonce set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "autofocus", {
    get: function () {
        h_log("_base_dom autofocus get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom autofocus set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "tabIndex", {
    get: function () {
        h_log("_base_dom tabIndex get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom tabIndex set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "style", {
    get: function () {
        h_log(
            "_base_dom style get [call]",
            "arg:",
            arguments,
            "this--->",
            this.tag_arg
        );
        return ProxyObj({}, "style.css");
    },
    set: function () {
        h_log("_base_dom style set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "attributeStyleMap", {
    get: function () {
        h_log("_base_dom attributeStyleMap get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "attachInternals", {
    get: function () {
        h_log("[v] _base_dom attachInternals value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom attachInternals value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "blur", {
    get: function () {
        h_log("[v] _base_dom blur value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom blur value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "click", {
    get: function () {
        h_log("[v] _base_dom click value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom click value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "focus", {
    get: function () {
        h_log("[v] _base_dom focus value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom focus value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "hidePopover", {
    get: function () {
        h_log("[v] _base_dom hidePopover value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom hidePopover value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "showPopover", {
    get: function () {
        h_log("[v] _base_dom showPopover value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom showPopover value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "togglePopover", {
    get: function () {
        h_log("[v] _base_dom togglePopover value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom togglePopover value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "inert", {
    get: function () {
        h_log("_base_dom inert get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom inert set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "oncontentvisibilityautostatechange", {
    get: function () {
        h_log(
            "_base_dom oncontentvisibilityautostatechange get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom oncontentvisibilityautostatechange set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, "onscrollend", {
    get: function () {
        h_log("_base_dom onscrollend get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onscrollend set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
HTMLElement = function () {
    h_log("_base_dom constructor value [call]", "arg:", arguments);
};
HTMLElement.prototype = _base_dom;
Object.defineProperty(_base_dom, "constructor", {
    value: HTMLElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_base_dom, "onbeforematch", {
    get: function () {
        h_log("_base_dom onbeforematch get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom onbeforematch set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom, Symbol.toStringTag, {
    value: "HTMLElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_base_dom.__proto__ = {};
Object.defineProperty(_base_dom.__proto__, "namespaceURI", {
    get: function () {
        h_log("_base_dom.__proto__ namespaceURI get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "prefix", {
    get: function () {
        h_log("_base_dom.__proto__ prefix get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "localName", {
    get: function () {
        h_log("_base_dom.__proto__ localName get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "tagName", {
    get: function () {
        const result = "BODY"
        h_log("_base_dom.__proto__ tagName get [call]", "arg:", arguments, "this:", this, "result:", result);
        return result
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "id", {
    get: function () {
        h_log("_base_dom.__proto__ id get [call]", "arg:", arguments);
        return this._id;
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ id set [call]",
            "arg:",
            arguments,
            "this--->",
            this
        );
        this._id = arguments[0];
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "className", {
    get: function () {
        h_log("_base_dom.__proto__ className get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ className set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "classList", {
    get: function () {
        h_log("_base_dom.__proto__ classList get [call]", "arg:", arguments);
        return new _DOMTokenList();
    },
    set: function () {
        h_log("_base_dom.__proto__ classList set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "slot", {
    get: function () {
        h_log("_base_dom.__proto__ slot get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ slot set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "attributes", {
    get: function () {
        h_log("_base_dom.__proto__ attributes get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "shadowRoot", {
    get: function () {
        h_log("_base_dom.__proto__ shadowRoot get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "part", {
    get: function () {
        h_log("_base_dom.__proto__ part get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ part set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "assignedSlot", {
    get: function () {
        h_log("_base_dom.__proto__ assignedSlot get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "innerHTML", {
    get: function () {
        h_log("_base_dom.__proto__ innerHTML get [call]", "arg:", arguments);
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ innerHTML set [call]",
            "arg:",
            arguments,
            "this--->",
            this
        );
        this._innerHTML = arguments[0];
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "outerHTML", {
    get: function () {
        h_log("_base_dom.__proto__ outerHTML get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ outerHTML set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scrollTop", {
    get: function () {
        h_log("_base_dom.__proto__ scrollTop get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ scrollTop set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scrollLeft", {
    get: function () {
        h_log("_base_dom.__proto__ scrollLeft get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ scrollLeft set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scrollWidth", {
    get: function () {
        h_log("_base_dom.__proto__ scrollWidth get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scrollHeight", {
    get: function () {
        h_log("_base_dom.__proto__ scrollHeight get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "clientTop", {
    get: function () {
        h_log("_base_dom.__proto__ clientTop get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "clientLeft", {
    get: function () {
        h_log("_base_dom.__proto__ clientLeft get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "clientWidth", {
    get: function () {
        h_log(
            "_base_dom.__proto__ clientWidth get [call]",
            "arg:",
            arguments,
            "this---->",
            this.tag_arg
        );
        return 0;
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "clientHeight", {
    get: function () {
        h_log("_base_dom.__proto__ clientHeight get [call]", "arg:", arguments, "this---->", this.tag_arg);
        return 0;
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "onbeforecopy", {
    get: function () {
        h_log("_base_dom.__proto__ onbeforecopy get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ onbeforecopy set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "onbeforecut", {
    get: function () {
        h_log("_base_dom.__proto__ onbeforecut get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ onbeforecut set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "onbeforepaste", {
    get: function () {
        h_log("_base_dom.__proto__ onbeforepaste get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ onbeforepaste set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "onsearch", {
    get: function () {
        h_log("_base_dom.__proto__ onsearch get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ onsearch set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "elementTiming", {
    get: function () {
        h_log("_base_dom.__proto__ elementTiming get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ elementTiming set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "onfullscreenchange", {
    get: function () {
        h_log(
            "_base_dom.__proto__ onfullscreenchange get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ onfullscreenchange set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "onfullscreenerror", {
    get: function () {
        h_log(
            "_base_dom.__proto__ onfullscreenerror get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ onfullscreenerror set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "onwebkitfullscreenchange", {
    get: function () {
        h_log(
            "_base_dom.__proto__ onwebkitfullscreenchange get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ onwebkitfullscreenchange set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "onwebkitfullscreenerror", {
    get: function () {
        h_log(
            "_base_dom.__proto__ onwebkitfullscreenerror get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ onwebkitfullscreenerror set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "role", {
    get: function () {
        h_log("_base_dom.__proto__ role get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ role set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaAtomic", {
    get: function () {
        h_log("_base_dom.__proto__ ariaAtomic get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaAtomic set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaAutoComplete", {
    get: function () {
        h_log("_base_dom.__proto__ ariaAutoComplete get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaAutoComplete set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaBusy", {
    get: function () {
        h_log("_base_dom.__proto__ ariaBusy get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaBusy set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaBrailleLabel", {
    get: function () {
        h_log("_base_dom.__proto__ ariaBrailleLabel get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaBrailleLabel set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaBrailleRoleDescription", {
    get: function () {
        h_log(
            "_base_dom.__proto__ ariaBrailleRoleDescription get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ ariaBrailleRoleDescription set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaChecked", {
    get: function () {
        h_log("_base_dom.__proto__ ariaChecked get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaChecked set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaColCount", {
    get: function () {
        h_log("_base_dom.__proto__ ariaColCount get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaColCount set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaColIndex", {
    get: function () {
        h_log("_base_dom.__proto__ ariaColIndex get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaColIndex set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaColSpan", {
    get: function () {
        h_log("_base_dom.__proto__ ariaColSpan get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaColSpan set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaCurrent", {
    get: function () {
        h_log("_base_dom.__proto__ ariaCurrent get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaCurrent set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaDescription", {
    get: function () {
        h_log("_base_dom.__proto__ ariaDescription get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaDescription set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaDisabled", {
    get: function () {
        h_log("_base_dom.__proto__ ariaDisabled get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaDisabled set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaExpanded", {
    get: function () {
        h_log("_base_dom.__proto__ ariaExpanded get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaExpanded set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaHasPopup", {
    get: function () {
        h_log("_base_dom.__proto__ ariaHasPopup get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaHasPopup set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaHidden", {
    get: function () {
        h_log("_base_dom.__proto__ ariaHidden get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaHidden set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaInvalid", {
    get: function () {
        h_log("_base_dom.__proto__ ariaInvalid get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaInvalid set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaKeyShortcuts", {
    get: function () {
        h_log("_base_dom.__proto__ ariaKeyShortcuts get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaKeyShortcuts set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaLabel", {
    get: function () {
        h_log("_base_dom.__proto__ ariaLabel get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaLabel set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaLevel", {
    get: function () {
        h_log("_base_dom.__proto__ ariaLevel get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaLevel set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaLive", {
    get: function () {
        h_log("_base_dom.__proto__ ariaLive get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaLive set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaModal", {
    get: function () {
        h_log("_base_dom.__proto__ ariaModal get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaModal set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaMultiLine", {
    get: function () {
        h_log("_base_dom.__proto__ ariaMultiLine get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaMultiLine set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaMultiSelectable", {
    get: function () {
        h_log(
            "_base_dom.__proto__ ariaMultiSelectable get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ ariaMultiSelectable set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaOrientation", {
    get: function () {
        h_log("_base_dom.__proto__ ariaOrientation get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaOrientation set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaPlaceholder", {
    get: function () {
        h_log("_base_dom.__proto__ ariaPlaceholder get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaPlaceholder set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaPosInSet", {
    get: function () {
        h_log("_base_dom.__proto__ ariaPosInSet get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaPosInSet set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaPressed", {
    get: function () {
        h_log("_base_dom.__proto__ ariaPressed get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaPressed set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaReadOnly", {
    get: function () {
        h_log("_base_dom.__proto__ ariaReadOnly get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaReadOnly set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaRelevant", {
    get: function () {
        h_log("_base_dom.__proto__ ariaRelevant get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaRelevant set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaRequired", {
    get: function () {
        h_log("_base_dom.__proto__ ariaRequired get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaRequired set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaRoleDescription", {
    get: function () {
        h_log(
            "_base_dom.__proto__ ariaRoleDescription get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__ ariaRoleDescription set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaRowCount", {
    get: function () {
        h_log("_base_dom.__proto__ ariaRowCount get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaRowCount set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaRowIndex", {
    get: function () {
        h_log("_base_dom.__proto__ ariaRowIndex get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaRowIndex set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaRowSpan", {
    get: function () {
        h_log("_base_dom.__proto__ ariaRowSpan get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaRowSpan set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaSelected", {
    get: function () {
        h_log("_base_dom.__proto__ ariaSelected get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaSelected set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaSetSize", {
    get: function () {
        h_log("_base_dom.__proto__ ariaSetSize get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaSetSize set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaSort", {
    get: function () {
        h_log("_base_dom.__proto__ ariaSort get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaSort set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaValueMax", {
    get: function () {
        h_log("_base_dom.__proto__ ariaValueMax get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaValueMax set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaValueMin", {
    get: function () {
        h_log("_base_dom.__proto__ ariaValueMin get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaValueMin set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaValueNow", {
    get: function () {
        h_log("_base_dom.__proto__ ariaValueNow get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaValueNow set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "ariaValueText", {
    get: function () {
        h_log("_base_dom.__proto__ ariaValueText get [call]", "arg:", arguments);
    },
    set: function () {
        h_log("_base_dom.__proto__ ariaValueText set [call]", "arg:", arguments);
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "children", {
    get: function () {
        h_log("_base_dom.__proto__ children get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "firstElementChild", {
    get: function () {
        h_log(
            "_base_dom.__proto__ firstElementChild get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "lastElementChild", {
    get: function () {
        h_log("_base_dom.__proto__ lastElementChild get [call]", "arg:", arguments);
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "childElementCount", {
    get: function () {
        h_log(
            "_base_dom.__proto__ childElementCount get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "previousElementSibling", {
    get: function () {
        h_log(
            "_base_dom.__proto__ previousElementSibling get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "nextElementSibling", {
    get: function () {
        h_log(
            "_base_dom.__proto__ nextElementSibling get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "after", {
    get: function () {
        h_log("[v] _base_dom.__proto__ after value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ after value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "animate", {
    get: function () {
        h_log("[v] _base_dom.__proto__ animate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ animate value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "append", {
    get: function () {
        h_log("[v] _base_dom.__proto__ append value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ append value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "attachShadow", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ attachShadow value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ attachShadow value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "before", {
    get: function () {
        h_log("[v] _base_dom.__proto__ before value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ before value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "closest", {
    get: function () {
        h_log("[v] _base_dom.__proto__ closest value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ closest value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "computedStyleMap", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ computedStyleMap value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ computedStyleMap value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getAttribute", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getAttribute value [get]",
            "arg:",
            arguments
        );
        return function () {
            const result = this[arguments[0]] === undefined ? null : this[arguments[0]]; result
            h_log(
                "[v] _base_dom.__proto__ getAttribute value [call]",
                "arg:",
                arguments,
                "this:",
                this.tag_arg, "result:", result
            );
            return result
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getAttributeNS", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getAttributeNS value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getAttributeNS value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getAttributeNames", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getAttributeNames value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getAttributeNames value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getAttributeNode", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getAttributeNode value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getAttributeNode value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getAttributeNodeNS", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getAttributeNodeNS value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getAttributeNodeNS value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getBoundingClientRect", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getBoundingClientRect value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getBoundingClientRect value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getClientRects", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getClientRects value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getClientRects value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getElementsByClassName", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getElementsByClassName value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getElementsByClassName value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getElementsByTagName", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getElementsByTagName value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getElementsByTagName value [call]",
                "arg:",
                arguments,
                "this--->",
                this
            );
            return [];
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getElementsByTagNameNS", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getElementsByTagNameNS value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getElementsByTagNameNS value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getInnerHTML", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getInnerHTML value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getInnerHTML value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "hasAttribute", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ hasAttribute value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ hasAttribute value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "hasAttributeNS", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ hasAttributeNS value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ hasAttributeNS value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "hasAttributes", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ hasAttributes value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ hasAttributes value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "hasPointerCapture", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ hasPointerCapture value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ hasPointerCapture value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "insertAdjacentElement", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ insertAdjacentElement value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ insertAdjacentElement value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "insertAdjacentHTML", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ insertAdjacentHTML value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ insertAdjacentHTML value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "insertAdjacentText", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ insertAdjacentText value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ insertAdjacentText value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "matches", {
    get: function () {
        h_log("[v] _base_dom.__proto__ matches value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ matches value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "prepend", {
    get: function () {
        h_log("[v] _base_dom.__proto__ prepend value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ prepend value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "querySelector", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ querySelector value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ querySelector value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "querySelectorAll", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ querySelectorAll value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ querySelectorAll value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "releasePointerCapture", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ releasePointerCapture value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ releasePointerCapture value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "remove", {
    get: function () {
        h_log("[v] _base_dom.__proto__ remove value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ remove value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "removeAttribute", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ removeAttribute value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ removeAttribute value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "removeAttributeNS", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ removeAttributeNS value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ removeAttributeNS value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "removeAttributeNode", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ removeAttributeNode value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ removeAttributeNode value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "replaceChildren", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ replaceChildren value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ replaceChildren value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "replaceWith", {
    get: function () {
        h_log("[v] _base_dom.__proto__ replaceWith value [get]", "arg:", arguments);
        return function () {
            h_log(
                "[v] _base_dom.__proto__ replaceWith value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "requestFullscreen", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ requestFullscreen value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ requestFullscreen value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "requestPointerLock", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ requestPointerLock value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ requestPointerLock value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scroll", {
    get: function () {
        h_log("[v] _base_dom.__proto__ scroll value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ scroll value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scrollBy", {
    get: function () {
        h_log("[v] _base_dom.__proto__ scrollBy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ scrollBy value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scrollIntoView", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ scrollIntoView value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ scrollIntoView value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scrollIntoViewIfNeeded", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ scrollIntoViewIfNeeded value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ scrollIntoViewIfNeeded value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "scrollTo", {
    get: function () {
        h_log("[v] _base_dom.__proto__ scrollTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _base_dom.__proto__ scrollTo value [call]", "arg:", arguments);
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "setAttribute", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ setAttribute value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ setAttribute value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "setAttributeNS", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ setAttributeNS value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ setAttributeNS value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "setAttributeNode", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ setAttributeNode value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ setAttributeNode value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "setAttributeNodeNS", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ setAttributeNodeNS value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ setAttributeNodeNS value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "setPointerCapture", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ setPointerCapture value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ setPointerCapture value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "toggleAttribute", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ toggleAttribute value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ toggleAttribute value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "webkitMatchesSelector", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ webkitMatchesSelector value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ webkitMatchesSelector value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "webkitRequestFullScreen", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ webkitRequestFullScreen value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ webkitRequestFullScreen value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "webkitRequestFullscreen", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ webkitRequestFullscreen value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ webkitRequestFullscreen value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "checkVisibility", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ checkVisibility value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ checkVisibility value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, "getAnimations", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__ getAnimations value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__ getAnimations value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Element = function () {
    h_log("_base_dom.__proto__ constructor value [call]", "arg:", arguments);
};
Element.prototype = _base_dom.__proto__;
Object.defineProperty(_base_dom.__proto__, "constructor", {
    value: Element,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, Symbol.toStringTag, {
    value: "Element",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__, Symbol.unscopables, {
    value: {},
    writable: false,
    enumerable: false,
    configurable: true,
});
_base_dom.__proto__.__proto__ = {};
Object.defineProperty(_base_dom.__proto__.__proto__, "nodeType", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ nodeType get [call]",
            "arg:",
            arguments, "this:", this
        );
        return 3
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "nodeName", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ nodeName get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "baseURI", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ baseURI get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "isConnected", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ isConnected get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "ownerDocument", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ ownerDocument get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "parentNode", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ parentNode get [call]",
            "arg:",
            arguments,
            "this--->",
            this
        );
        return head1;
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "parentElement", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ parentElement get [call]",
            "arg:",
            arguments,
            "this--->",
            this
        );
        return head1;
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "childNodes", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ childNodes get [call]",
            "arg:",
            arguments
        );
        return 1
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "firstChild", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ firstChild get [call]",
            "arg:",
            arguments, "this:", this.tag_arg
        );
        return this.tag_arg?this.tag_arg:null
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "lastChild", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ lastChild get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "previousSibling", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ previousSibling get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "nextSibling", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ nextSibling get [call]",
            "arg:",
            arguments
        );
    },
    set: undefined,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "nodeValue", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ nodeValue get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__.__proto__ nodeValue set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "textContent", {
    get: function () {
        h_log(
            "_base_dom.__proto__.__proto__ textContent get [call]",
            "arg:",
            arguments
        );
    },
    set: function () {
        h_log(
            "_base_dom.__proto__.__proto__ textContent set [call]",
            "arg:",
            arguments
        );
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "ELEMENT_NODE", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "ATTRIBUTE_NODE", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "TEXT_NODE", {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "CDATA_SECTION_NODE", {
    value: 4,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "ENTITY_REFERENCE_NODE", {
    value: 5,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "ENTITY_NODE", {
    value: 6,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(
    _base_dom.__proto__.__proto__,
    "PROCESSING_INSTRUCTION_NODE",
    {
        value: 7,
        writable: false,
        enumerable: true,
        configurable: false,
    }
);
Object.defineProperty(_base_dom.__proto__.__proto__, "COMMENT_NODE", {
    value: 8,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "DOCUMENT_NODE", {
    value: 9,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "DOCUMENT_TYPE_NODE", {
    value: 10,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "DOCUMENT_FRAGMENT_NODE", {
    value: 11,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "NOTATION_NODE", {
    value: 12,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(
    _base_dom.__proto__.__proto__,
    "DOCUMENT_POSITION_DISCONNECTED",
    {
        value: 1,
        writable: false,
        enumerable: true,
        configurable: false,
    }
);
Object.defineProperty(
    _base_dom.__proto__.__proto__,
    "DOCUMENT_POSITION_PRECEDING",
    {
        value: 2,
        writable: false,
        enumerable: true,
        configurable: false,
    }
);
Object.defineProperty(
    _base_dom.__proto__.__proto__,
    "DOCUMENT_POSITION_FOLLOWING",
    {
        value: 4,
        writable: false,
        enumerable: true,
        configurable: false,
    }
);
Object.defineProperty(
    _base_dom.__proto__.__proto__,
    "DOCUMENT_POSITION_CONTAINS",
    {
        value: 8,
        writable: false,
        enumerable: true,
        configurable: false,
    }
);
Object.defineProperty(
    _base_dom.__proto__.__proto__,
    "DOCUMENT_POSITION_CONTAINED_BY",
    {
        value: 16,
        writable: false,
        enumerable: true,
        configurable: false,
    }
);
Object.defineProperty(
    _base_dom.__proto__.__proto__,
    "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC",
    {
        value: 32,
        writable: false,
        enumerable: true,
        configurable: false,
    }
);
Object.defineProperty(_base_dom.__proto__.__proto__, "appendChild", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ appendChild value [get]",
            "arg:",
            arguments
        );
        return function (element) {
            h_log(
                "[v] _base_dom.__proto__.__proto__ appendChild value [call]",
                "arg:",
                arguments,
                "this--->",
                this.tag_arg
            );
            if (!element || !element.tag_arg) {
                throw new TypeError(
                    "Failed to execute 'appendChild' on 'Node': 1 argument required, but only 0 present."
                );
            }
            const key = element.tag_arg;
            this._children[key] = element;
            // 如果往body添加元素，需要同步document.all
            if (this.tag_arg == "body1") {
                // document_all[document_all.length] = element;
                const len = document_all.length;
                Object.defineProperty(document_all, len, {
                    value: element,
                    configurable: false,
                    enumerable: true,
                    writable: true,
                });
            }
            return element;
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "cloneNode", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ cloneNode value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ cloneNode value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(
    _base_dom.__proto__.__proto__,
    "compareDocumentPosition",
    {
        get: function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ compareDocumentPosition value [get]",
                "arg:",
                arguments
            );
            return function () {
                h_log(
                    "[v] _base_dom.__proto__.__proto__ compareDocumentPosition value [call]",
                    "arg:",
                    arguments
                );
            };
        },
        enumerable: true,
        configurable: true,
    }
);
Object.defineProperty(_base_dom.__proto__.__proto__, "contains", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ contains value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ contains value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "getRootNode", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ getRootNode value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ getRootNode value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "hasChildNodes", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ hasChildNodes value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ hasChildNodes value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "insertBefore", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ insertBefore value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ insertBefore value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "isDefaultNamespace", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ isDefaultNamespace value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ isDefaultNamespace value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "isEqualNode", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ isEqualNode value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ isEqualNode value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "isSameNode", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ isSameNode value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ isSameNode value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "lookupNamespaceURI", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ lookupNamespaceURI value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ lookupNamespaceURI value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "lookupPrefix", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ lookupPrefix value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ lookupPrefix value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "normalize", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ normalize value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ normalize value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "removeChild", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ removeChild value [get]",
            "arg:",
            arguments
        );
        return function (element) {
            h_log(
                "[v] _base_dom.__proto__.__proto__ removeChild value [call]",
                "arg:",
                arguments,
                "this--->",
                this.tag_arg
            );
            if (!element || !element.tag_arg) {
                throw new TypeError(
                    "Failed to execute 'removeChild' on 'Node': 1 argument required, but only 0 present."
                );
            }
            const key = element["tag_arg"];
            // 如果从body删除元素，需要同步document.all，删除对应元素
            if (this.tag_arg == "body1") {
                 const old_length = document_all.length;
                // 删除对应元素
                for (let i = 0; i < old_length; i++) {
                    if (document_all[i]["tag_arg"] == element["tag_arg"]) {
                        // 修改对应元素的值为undefined
                        document_all[i] = undefined;
                        break;
                    }
                }
            }
            if (this._children[key]) {
                delete this._children[key];
                return element;
            }
            return null; // 如果子节点不存在返回null
        };
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, "replaceChild", {
    get: function () {
        h_log(
            "[v] _base_dom.__proto__.__proto__ replaceChild value [get]",
            "arg:",
            arguments
        );
        return function () {
            h_log(
                "[v] _base_dom.__proto__.__proto__ replaceChild value [call]",
                "arg:",
                arguments
            );
        };
    },
    enumerable: true,
    configurable: true,
});
Node = function () {
    h_log(
        "_base_dom.__proto__.__proto__ constructor value [call]",
        "arg:",
        arguments
    );
};
Node.prototype = _base_dom.__proto__.__proto__;
Object.defineProperty(_base_dom.__proto__.__proto__, "constructor", {
    value: Node,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_base_dom.__proto__.__proto__, Symbol.toStringTag, {
    value: "Node",
    writable: false,
    enumerable: false,
    configurable: true,
});
_base_dom.__proto__.__proto__.__proto__ = eventTarget;
let _DOM_Token_List = {};
_DOM_Token_List.__proto__ = {};
Object.defineProperty(_DOM_Token_List.__proto__, "entries", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ entries value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ entries value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "keys", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ keys value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ keys value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "values", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ values value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ values value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "forEach", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ forEach value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ forEach value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "length", {
    get: function () {
        h_log("_DOM_Token_List.__proto__ length get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_DOM_Token_List.__proto__, "value", {
    get: function () {
        h_log("_DOM_Token_List.__proto__ value get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_DOM_Token_List.__proto__ value set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_DOM_Token_List.__proto__, "add", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ add value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ add value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "contains", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ contains value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ contains value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "item", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ item value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ item value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "remove", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ remove value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ remove value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "replace", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ replace value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ replace value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "supports", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ supports value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ supports value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "toggle", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ toggle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ toggle value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_DOM_Token_List.__proto__, "toString", {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ toString value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ toString value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _DOMTokenList = function () {
    h_log("_DOM_Token_List.__proto__ constructor value [call]", "arg:", arguments)
};
_DOMTokenList.prototype = _DOM_Token_List.__proto__;
Object.defineProperty(_DOM_Token_List.__proto__, "constructor", {
    value: _DOMTokenList,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_DOM_Token_List.__proto__, Symbol.toStringTag, {
    value: "DOMTokenList",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_DOM_Token_List.__proto__, Symbol.iterator, {
    get: function () {
        h_log("[v] _DOM_Token_List.__proto__ Symbol(Symbol.iterator) value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOM_Token_List.__proto__ Symbol(Symbol.iterator) value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});

let _DOMParser = function () {
    h_log("[v] window DOMParser value [call]", "arg:", arguments)
}
_DOMParser.prototype = {}
Object.defineProperty(_DOMParser.prototype, "parseFromString", {
    get: function () {
        h_log("[v] _DOMParser.prototype parseFromString value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _DOMParser.prototype parseFromString value [call]", "arg:", arguments);
        }
    }, enumerable: true, configurable: true
})
Object.defineProperty(_DOMParser.prototype, "constructor", {
    value:_DOMParser,
    writable:true,
    enumerable:false,
    configurable:true
})
Object.defineProperty(_DOMParser.prototype, Symbol.toStringTag, {
    value:"DOMParser",
    writable:false,
    enumerable:false,
    configurable:true
})
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
        return this.a_url.origin
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "protocol", {
    get: function () {
        h_log("_a_dom.__proto__ protocol get [call]", "arg:", arguments)
        return this.a_url.protocol
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
        return this.a_url.host
    }, set: function () {
        h_log("_a_dom.__proto__ host set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "hostname", {
    get: function () {
        h_log("_a_dom.__proto__ hostname get [call]", "arg:", arguments)
        return this.a_url.hostname
    }, set: function () {
        h_log("_a_dom.__proto__ hostname set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "port", {
    get: function () {
        h_log("_a_dom.__proto__ port get [call]", "arg:", arguments)
        return this.a_url.port
    }, set: function () {
        h_log("_a_dom.__proto__ port set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "pathname", {
    get: function () {
        h_log("_a_dom.__proto__ pathname get [call]", "arg:", arguments)
        return this.a_url.pathname
    }, set: function () {
        h_log("_a_dom.__proto__ pathname set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "search", {
    get: function () {
        h_log("_a_dom.__proto__ search get [call]", "arg:", arguments)
        return this.a_url.search
    }, set: function () {
        h_log("_a_dom.__proto__ search set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "hash", {
    get: function () {
        h_log("_a_dom.__proto__ hash get [call]", "arg:", arguments)
        return this.a_url.hash
    }, set: function () {
        h_log("_a_dom.__proto__ hash set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_a_dom.__proto__, "href", {
    get: function () {
        h_log("_a_dom.__proto__ href get [call]", "arg:", arguments)
        return this.a_url.href
    }, set: function () {
        h_log("_a_dom.__proto__ href set [call]", "arg:", arguments)
        const url = new URL(arguments[0]);
        this.a_url = {
            ancestorOrigins: {},
            href: url.href,
            origin: url.origin,
            protocol: url.protocol,
            host: url.host,
            hostname: url.hostname,
            port: url.port,
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
        };
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
let _HTMLAnchorElement = function () {
    h_log("_a_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_a") {
        this.tag_arg = "a" + a_count
        a_count += 1
        this._children = {}
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLAnchorElement.prototype = _a_dom.__proto__;
Object.defineProperty(_a_dom.__proto__, "constructor", {
    value: _HTMLAnchorElement,
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
_a_dom.__proto__.__proto__ = HTMLElement.prototype;let _form_dom = {};
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
let _input_dom = {};
_input_dom.__proto__ = {};
Object.defineProperty(_input_dom.__proto__, "accept", {
    get: function () {
        h_log("_input_dom.__proto__ accept get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ accept set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "alt", {
    get: function () {
        h_log("_input_dom.__proto__ alt get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ alt set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "autocomplete", {
    get: function () {
        h_log("_input_dom.__proto__ autocomplete get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ autocomplete set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "defaultChecked", {
    get: function () {
        h_log("_input_dom.__proto__ defaultChecked get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ defaultChecked set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "checked", {
    get: function () {
        h_log("_input_dom.__proto__ checked get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ checked set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "dirName", {
    get: function () {
        h_log("_input_dom.__proto__ dirName get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ dirName set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "disabled", {
    get: function () {
        h_log("_input_dom.__proto__ disabled get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ disabled set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "form", {
    get: function () {
        h_log("_input_dom.__proto__ form get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "files", {
    get: function () {
        h_log("_input_dom.__proto__ files get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ files set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "formAction", {
    get: function () {
        h_log("_input_dom.__proto__ formAction get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ formAction set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "formEnctype", {
    get: function () {
        h_log("_input_dom.__proto__ formEnctype get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ formEnctype set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "formMethod", {
    get: function () {
        h_log("_input_dom.__proto__ formMethod get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ formMethod set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "formNoValidate", {
    get: function () {
        h_log("_input_dom.__proto__ formNoValidate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ formNoValidate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "formTarget", {
    get: function () {
        h_log("_input_dom.__proto__ formTarget get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ formTarget set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "height", {
    get: function () {
        h_log("_input_dom.__proto__ height get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ height set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "indeterminate", {
    get: function () {
        h_log("_input_dom.__proto__ indeterminate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ indeterminate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "list", {
    get: function () {
        h_log("_input_dom.__proto__ list get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "max", {
    get: function () {
        h_log("_input_dom.__proto__ max get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ max set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "maxLength", {
    get: function () {
        h_log("_input_dom.__proto__ maxLength get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ maxLength set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "min", {
    get: function () {
        h_log("_input_dom.__proto__ min get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ min set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "minLength", {
    get: function () {
        h_log("_input_dom.__proto__ minLength get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ minLength set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "multiple", {
    get: function () {
        h_log("_input_dom.__proto__ multiple get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ multiple set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "name", {
    get: function () {
        h_log("_input_dom.__proto__ name get [call]", "arg:", arguments)
        return this._name
    }, set: function () {
        h_log("_input_dom.__proto__ name set [call]", "arg:", arguments, "this--->", this)
        this._name = arguments[0]
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "pattern", {
    get: function () {
        h_log("_input_dom.__proto__ pattern get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ pattern set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "placeholder", {
    get: function () {
        h_log("_input_dom.__proto__ placeholder get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ placeholder set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "readOnly", {
    get: function () {
        h_log("_input_dom.__proto__ readOnly get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ readOnly set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "required", {
    get: function () {
        h_log("_input_dom.__proto__ required get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ required set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "size", {
    get: function () {
        h_log("_input_dom.__proto__ size get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ size set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "src", {
    get: function () {
        h_log("_input_dom.__proto__ src get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ src set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "step", {
    get: function () {
        h_log("_input_dom.__proto__ step get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ step set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "type", {
    get: function () {
        h_log("_input_dom.__proto__ type get [call]", "arg:", arguments)
        return this._type
    }, set: function () {
        h_log("_input_dom.__proto__ type set [call]", "arg:", arguments)
        this._type = arguments[0]
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "defaultValue", {
    get: function () {
        h_log("_input_dom.__proto__ defaultValue get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ defaultValue set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "value", {
    get: function () {
        h_log("_input_dom.__proto__ value get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ value set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "valueAsDate", {
    get: function () {
        h_log("_input_dom.__proto__ valueAsDate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ valueAsDate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "valueAsNumber", {
    get: function () {
        h_log("_input_dom.__proto__ valueAsNumber get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ valueAsNumber set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "width", {
    get: function () {
        h_log("_input_dom.__proto__ width get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ width set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "willValidate", {
    get: function () {
        h_log("_input_dom.__proto__ willValidate get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "validity", {
    get: function () {
        h_log("_input_dom.__proto__ validity get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "validationMessage", {
    get: function () {
        h_log("_input_dom.__proto__ validationMessage get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "labels", {
    get: function () {
        h_log("_input_dom.__proto__ labels get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "selectionStart", {
    get: function () {
        h_log("_input_dom.__proto__ selectionStart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ selectionStart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "selectionEnd", {
    get: function () {
        h_log("_input_dom.__proto__ selectionEnd get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ selectionEnd set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "selectionDirection", {
    get: function () {
        h_log("_input_dom.__proto__ selectionDirection get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ selectionDirection set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "align", {
    get: function () {
        h_log("_input_dom.__proto__ align get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ align set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "useMap", {
    get: function () {
        h_log("_input_dom.__proto__ useMap get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ useMap set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "webkitdirectory", {
    get: function () {
        h_log("_input_dom.__proto__ webkitdirectory get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ webkitdirectory set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "incremental", {
    get: function () {
        h_log("_input_dom.__proto__ incremental get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ incremental set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "popoverTargetElement", {
    get: function () {
        h_log("_input_dom.__proto__ popoverTargetElement get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ popoverTargetElement set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "popoverTargetAction", {
    get: function () {
        h_log("_input_dom.__proto__ popoverTargetAction get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_input_dom.__proto__ popoverTargetAction set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_input_dom.__proto__, "checkValidity", {
    get: function () {
        h_log("[v] _input_dom.__proto__ checkValidity value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ checkValidity value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "reportValidity", {
    get: function () {
        h_log("[v] _input_dom.__proto__ reportValidity value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ reportValidity value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "select", {
    get: function () {
        h_log("[v] _input_dom.__proto__ select value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ select value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "setCustomValidity", {
    get: function () {
        h_log("[v] _input_dom.__proto__ setCustomValidity value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ setCustomValidity value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "setRangeText", {
    get: function () {
        h_log("[v] _input_dom.__proto__ setRangeText value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ setRangeText value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "setSelectionRange", {
    get: function () {
        h_log("[v] _input_dom.__proto__ setSelectionRange value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ setSelectionRange value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "showPicker", {
    get: function () {
        h_log("[v] _input_dom.__proto__ showPicker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ showPicker value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "stepDown", {
    get: function () {
        h_log("[v] _input_dom.__proto__ stepDown value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ stepDown value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "stepUp", {
    get: function () {
        h_log("[v] _input_dom.__proto__ stepUp value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _input_dom.__proto__ stepUp value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_input_dom.__proto__, "webkitEntries", {
    get: function () {
        h_log("_input_dom.__proto__ webkitEntries get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
let _HTMLInputElement = function () {
    h_log("_input_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_input") {
        this.tag_arg = "input" + input_count
        input_count += 1
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLInputElement.prototype = _input_dom.__proto__;
Object.defineProperty(_input_dom.__proto__, "constructor", {
    value: _HTMLInputElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_input_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLInputElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_input_dom.__proto__.__proto__ = HTMLElement.prototype;
let _audio_dom = {};
_audio_dom.__proto__ = {};
let _HTMLAudioElement = function () {
    h_log("_audio_dom.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLAudioElement.prototype = _audio_dom.__proto__;
Object.defineProperty(_audio_dom.__proto__, "constructor", {
    value: _HTMLAudioElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_audio_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLAudioElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_audio_dom.__proto__.__proto__ = {};
Object.defineProperty(_audio_dom.__proto__.__proto__, "error", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ error get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "src", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ src get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ src set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "currentSrc", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ currentSrc get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "crossOrigin", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ crossOrigin get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ crossOrigin set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "networkState", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ networkState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "preload", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ preload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ preload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "buffered", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ buffered get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "readyState", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ readyState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "seeking", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ seeking get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "currentTime", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ currentTime get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ currentTime set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "duration", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ duration get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "paused", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ paused get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "defaultPlaybackRate", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ defaultPlaybackRate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ defaultPlaybackRate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "playbackRate", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ playbackRate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ playbackRate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "played", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ played get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "seekable", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ seekable get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "ended", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ ended get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "autoplay", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ autoplay get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ autoplay set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "loop", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ loop get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ loop set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "preservesPitch", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ preservesPitch get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ preservesPitch set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "controls", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ controls get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ controls set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "controlsList", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ controlsList get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ controlsList set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "volume", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ volume get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ volume set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "muted", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ muted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ muted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "defaultMuted", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ defaultMuted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ defaultMuted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "textTracks", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ textTracks get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "webkitAudioDecodedByteCount", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ webkitAudioDecodedByteCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "webkitVideoDecodedByteCount", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ webkitVideoDecodedByteCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "onencrypted", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ onencrypted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ onencrypted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "onwaitingforkey", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ onwaitingforkey get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ onwaitingforkey set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "srcObject", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ srcObject get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ srcObject set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "NETWORK_EMPTY", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "NETWORK_IDLE", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "NETWORK_LOADING", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "NETWORK_NO_SOURCE", {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_NOTHING", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_METADATA", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_CURRENT_DATA", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_FUTURE_DATA", {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_ENOUGH_DATA", {
    value: 4,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "addTextTrack", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ addTextTrack value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ addTextTrack value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "canPlayType", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ canPlayType value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ canPlayType value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "captureStream", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ captureStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ captureStream value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "load", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ load value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ load value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "pause", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ pause value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ pause value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "play", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ play value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ play value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "sinkId", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ sinkId get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "remote", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ remote get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "disableRemotePlayback", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ disableRemotePlayback get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ disableRemotePlayback set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "setSinkId", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ setSinkId value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ setSinkId value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _HTMLMediaElement = function () {
    h_log("_audio_dom.__proto__.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLMediaElement.prototype = _audio_dom.__proto__.__proto__;
Object.defineProperty(_audio_dom.__proto__.__proto__, "constructor", {
    value: _HTMLMediaElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "mediaKeys", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ mediaKeys get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "setMediaKeys", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ setMediaKeys value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ setMediaKeys value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, Symbol.toStringTag, {
    value: "HTMLMediaElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_audio_dom.__proto__.__proto__.__proto__ = HTMLElement.prototype;

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
        return null
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
let _HTMLBodyElement = function () {
    h_log("_body_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_body") {
        this.tag_arg = "body" + body_count
        body_count += 1
        this._children = {}
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLBodyElement.prototype = _body_dom.__proto__;
Object.defineProperty(_body_dom.__proto__, "constructor", {
    value: _HTMLBodyElement,
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
let _div_dom = {};
_div_dom.__proto__ = {};
Object.defineProperty(_div_dom.__proto__, "align", {
    get: function () {
        h_log("_div_dom.__proto__ align get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_div_dom.__proto__ align set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _HTMLDivElement = function () {
    h_log("_div_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_div") {
        this.tag_arg = "div" + div_count
        div_count += 1
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLDivElement.prototype = _div_dom.__proto__;
Object.defineProperty(_div_dom.__proto__, "constructor", {
    value: _HTMLDivElement,
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
let _head_dom = {};
_head_dom.__proto__ = {};
let _HTMLHeadElement = function () {
    h_log("_head_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_head") {
        this.tag_arg = "head" + head_count
        html_count += 1
        this._children = {}
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLHeadElement.prototype = _head_dom.__proto__;
Object.defineProperty(_head_dom.__proto__, "constructor", {
    value: _HTMLHeadElement,
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
_head_dom.__proto__.__proto__ = HTMLElement.prototype;let _html_dom = {};
_html_dom.__proto__ = {};
Object.defineProperty(_html_dom.__proto__, "version", {
    get: function () {
        h_log("_html_dom.__proto__ version get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_html_dom.__proto__ version set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _HTMLHtmlElement = function () {
    h_log("_html_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_html") {
        this.tag_arg = "html" + html_count
        html_count += 1
        this._children = {}
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLHtmlElement.prototype = _html_dom.__proto__;
Object.defineProperty(_html_dom.__proto__, "constructor", {
    value: _HTMLHtmlElement,
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
        h_log("_meta_dom.__proto__ content get [call]", "arg:", arguments, "this--->", this)
        return this._content
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
let _HTMLMetaElement = function () {
    h_log("_meta_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_meta") {
        this.tag_arg = "meta" + meta_count
        meta_count += 1
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLMetaElement.prototype = _meta_dom.__proto__;
Object.defineProperty(_meta_dom.__proto__, "constructor", {
    value: _HTMLMetaElement,
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
_meta_dom.__proto__.__proto__ = HTMLElement.prototype;let _script_dom = {};
_script_dom.__proto__ = {};
Object.defineProperty(_script_dom.__proto__, "src", {
    get: function () {
        h_log("_script_dom.__proto__ src get [call]", "arg:", arguments)
        return ''
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
let _HTMLScriptElement = function () {
    h_log("_script_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_script") {
        this.tag_arg = "script" + script_count
        script_count += 1
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLScriptElement.prototype = _script_dom.__proto__;
Object.defineProperty(_script_dom.__proto__, "constructor", {
    value: _HTMLScriptElement,
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
let _span_dom = {};
_span_dom.__proto__ = {};
let _HTMLSpanElement = function () {
    h_log("_span_dom.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLSpanElement.prototype = _span_dom.__proto__;
Object.defineProperty(_span_dom.__proto__, "constructor", {
    value: _HTMLSpanElement,
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
let _iframe_dom = {};
_iframe_dom.__proto__ = {};
Object.defineProperty(_iframe_dom.__proto__, "src", {
    get: function () {
        h_log("_iframe_dom.__proto__ src get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ src set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "srcdoc", {
    get: function () {
        h_log("_iframe_dom.__proto__ srcdoc get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ srcdoc set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "name", {
    get: function () {
        h_log("_iframe_dom.__proto__ name get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ name set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "sandbox", {
    get: function () {
        h_log("_iframe_dom.__proto__ sandbox get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ sandbox set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "allowFullscreen", {
    get: function () {
        h_log("_iframe_dom.__proto__ allowFullscreen get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ allowFullscreen set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "width", {
    get: function () {
        h_log("_iframe_dom.__proto__ width get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ width set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "height", {
    get: function () {
        h_log("_iframe_dom.__proto__ height get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ height set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "contentDocument", {
    get: function () {
        h_log("_iframe_dom.__proto__ contentDocument get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "contentWindow", {
    get: function () {
        h_log("_iframe_dom.__proto__ contentWindow get [call]", "arg:", arguments, "this---->", this.tag_arg)
        if (body1._children['iframe1']){
            h_log("_iframe_dom.__proto__ contentWindow get [result]", "globalThis")
            return globalThis
        }
        h_log("_iframe_dom.__proto__ contentWindow get [result]", "null")
        return null
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "referrerPolicy", {
    get: function () {
        h_log("_iframe_dom.__proto__ referrerPolicy get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ referrerPolicy set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "csp", {
    get: function () {
        h_log("_iframe_dom.__proto__ csp get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ csp set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "allow", {
    get: function () {
        h_log("_iframe_dom.__proto__ allow get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ allow set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "featurePolicy", {
    get: function () {
        h_log("_iframe_dom.__proto__ featurePolicy get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "loading", {
    get: function () {
        h_log("_iframe_dom.__proto__ loading get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ loading set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "align", {
    get: function () {
        h_log("_iframe_dom.__proto__ align get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ align set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "scrolling", {
    get: function () {
        h_log("_iframe_dom.__proto__ scrolling get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ scrolling set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "frameBorder", {
    get: function () {
        h_log("_iframe_dom.__proto__ frameBorder get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ frameBorder set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "longDesc", {
    get: function () {
        h_log("_iframe_dom.__proto__ longDesc get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ longDesc set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "marginHeight", {
    get: function () {
        h_log("_iframe_dom.__proto__ marginHeight get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ marginHeight set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "marginWidth", {
    get: function () {
        h_log("_iframe_dom.__proto__ marginWidth get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ marginWidth set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "getSVGDocument", {
    get: function () {
        h_log("[v] _iframe_dom.__proto__ getSVGDocument value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _iframe_dom.__proto__ getSVGDocument value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_iframe_dom.__proto__, "credentialless", {
    get: function () {
        h_log("_iframe_dom.__proto__ credentialless get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ credentialless set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "allowPaymentRequest", {
    get: function () {
        h_log("_iframe_dom.__proto__ allowPaymentRequest get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ allowPaymentRequest set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _HTMLIFrameElement = function () {
    h_log("_iframe_dom.__proto__ constructor value [call]", "arg:", arguments)
    if (arguments.length && arguments[0] === "h_iframe") {
        this.tag_arg = "iframe" + iframe_count
        iframe_count += 1
        return
    }
    throw TypeError("Illegal constructor")
};
_HTMLIFrameElement.prototype = _iframe_dom.__proto__;
Object.defineProperty(_iframe_dom.__proto__, "constructor", {
    value: _HTMLIFrameElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "privateToken", {
    get: function () {
        h_log("_iframe_dom.__proto__ privateToken get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ privateToken set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "browsingTopics", {
    get: function () {
        h_log("_iframe_dom.__proto__ browsingTopics get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ browsingTopics set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "adAuctionHeaders", {
    get: function () {
        h_log("_iframe_dom.__proto__ adAuctionHeaders get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ adAuctionHeaders set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, "sharedStorageWritable", {
    get: function () {
        h_log("_iframe_dom.__proto__ sharedStorageWritable get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_iframe_dom.__proto__ sharedStorageWritable set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_iframe_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLIFrameElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_iframe_dom.__proto__.__proto__ = HTMLElement.prototype;
let _canvas_2d = {};
_canvas_2d.__proto__ = {};
Object.defineProperty(_canvas_2d.__proto__, "canvas", {
    get: function () {
        h_log("_canvas_2d.__proto__ canvas get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "font", {
    get: function () {
        h_log("_canvas_2d.__proto__ font get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ font set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "textAlign", {
    get: function () {
        h_log("_canvas_2d.__proto__ textAlign get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ textAlign set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "textBaseline", {
    get: function () {
        h_log("_canvas_2d.__proto__ textBaseline get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ textBaseline set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "direction", {
    get: function () {
        h_log("_canvas_2d.__proto__ direction get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ direction set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "fontKerning", {
    get: function () {
        h_log("_canvas_2d.__proto__ fontKerning get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ fontKerning set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "fontStretch", {
    get: function () {
        h_log("_canvas_2d.__proto__ fontStretch get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ fontStretch set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "fontVariantCaps", {
    get: function () {
        h_log("_canvas_2d.__proto__ fontVariantCaps get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ fontVariantCaps set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "letterSpacing", {
    get: function () {
        h_log("_canvas_2d.__proto__ letterSpacing get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ letterSpacing set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "textRendering", {
    get: function () {
        h_log("_canvas_2d.__proto__ textRendering get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ textRendering set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "wordSpacing", {
    get: function () {
        h_log("_canvas_2d.__proto__ wordSpacing get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ wordSpacing set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "globalCompositeOperation", {
    get: function () {
        h_log("_canvas_2d.__proto__ globalCompositeOperation get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ globalCompositeOperation set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "filter", {
    get: function () {
        h_log("_canvas_2d.__proto__ filter get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ filter set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "imageSmoothingQuality", {
    get: function () {
        h_log("_canvas_2d.__proto__ imageSmoothingQuality get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ imageSmoothingQuality set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "strokeStyle", {
    get: function () {
        h_log("_canvas_2d.__proto__ strokeStyle get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ strokeStyle set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "fillStyle", {
    get: function () {
        h_log("_canvas_2d.__proto__ fillStyle get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ fillStyle set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "shadowColor", {
    get: function () {
        h_log("_canvas_2d.__proto__ shadowColor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ shadowColor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "lineCap", {
    get: function () {
        h_log("_canvas_2d.__proto__ lineCap get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ lineCap set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "lineJoin", {
    get: function () {
        h_log("_canvas_2d.__proto__ lineJoin get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ lineJoin set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "globalAlpha", {
    get: function () {
        h_log("_canvas_2d.__proto__ globalAlpha get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ globalAlpha set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "imageSmoothingEnabled", {
    get: function () {
        h_log("_canvas_2d.__proto__ imageSmoothingEnabled get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ imageSmoothingEnabled set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "shadowOffsetX", {
    get: function () {
        h_log("_canvas_2d.__proto__ shadowOffsetX get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ shadowOffsetX set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "shadowOffsetY", {
    get: function () {
        h_log("_canvas_2d.__proto__ shadowOffsetY get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ shadowOffsetY set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "shadowBlur", {
    get: function () {
        h_log("_canvas_2d.__proto__ shadowBlur get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ shadowBlur set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "lineWidth", {
    get: function () {
        h_log("_canvas_2d.__proto__ lineWidth get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ lineWidth set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "miterLimit", {
    get: function () {
        h_log("_canvas_2d.__proto__ miterLimit get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ miterLimit set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "lineDashOffset", {
    get: function () {
        h_log("_canvas_2d.__proto__ lineDashOffset get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ lineDashOffset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, "clip", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ clip value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ clip value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "createConicGradient", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ createConicGradient value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ createConicGradient value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "createImageData", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ createImageData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ createImageData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "createLinearGradient", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ createLinearGradient value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ createLinearGradient value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "createPattern", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ createPattern value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ createPattern value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "createRadialGradient", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ createRadialGradient value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ createRadialGradient value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "drawFocusIfNeeded", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ drawFocusIfNeeded value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ drawFocusIfNeeded value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "drawImage", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ drawImage value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ drawImage value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "fill", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ fill value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ fill value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "fillText", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ fillText value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ fillText value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "getContextAttributes", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ getContextAttributes value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ getContextAttributes value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "getImageData", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ getImageData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ getImageData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "getLineDash", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ getLineDash value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ getLineDash value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "getTransform", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ getTransform value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ getTransform value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "isContextLost", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ isContextLost value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ isContextLost value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "isPointInPath", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ isPointInPath value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ isPointInPath value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "isPointInStroke", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ isPointInStroke value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ isPointInStroke value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "measureText", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ measureText value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ measureText value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "reset", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ reset value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ reset value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "roundRect", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ roundRect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ roundRect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "setLineDash", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ setLineDash value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ setLineDash value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "strokeText", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ strokeText value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ strokeText value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "arc", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ arc value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ arc value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "arcTo", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ arcTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ arcTo value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "beginPath", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ beginPath value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ beginPath value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "bezierCurveTo", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ bezierCurveTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ bezierCurveTo value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "clearRect", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ clearRect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ clearRect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "closePath", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ closePath value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ closePath value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "ellipse", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ ellipse value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ ellipse value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "fillRect", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ fillRect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ fillRect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "lineTo", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ lineTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ lineTo value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "moveTo", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ moveTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ moveTo value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "putImageData", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ putImageData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ putImageData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "quadraticCurveTo", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ quadraticCurveTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ quadraticCurveTo value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "rect", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ rect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ rect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "resetTransform", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ resetTransform value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ resetTransform value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "restore", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ restore value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ restore value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "rotate", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ rotate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ rotate value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "save", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ save value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ save value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "scale", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ scale value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ scale value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "setTransform", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ setTransform value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ setTransform value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "stroke", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ stroke value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ stroke value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "strokeRect", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ strokeRect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ strokeRect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "transform", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ transform value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ transform value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "translate", {
    get: function () {
        h_log("[v] _canvas_2d.__proto__ translate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _canvas_2d.__proto__ translate value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_canvas_2d.__proto__, "lang", {
    get: function () {
        h_log("_canvas_2d.__proto__ lang get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_canvas_2d.__proto__ lang set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _CanvasRenderingContext2D = function () {
    h_log("_canvas_2d.__proto__ constructor value [call]", "arg:", arguments)
};
_CanvasRenderingContext2D.prototype = _canvas_2d.__proto__;
Object.defineProperty(_canvas_2d.__proto__, "constructor", {
    value: _CanvasRenderingContext2D,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_canvas_2d.__proto__, Symbol.toStringTag, {
    value: "CanvasRenderingContext2D",
    writable: false,
    enumerable: false,
    configurable: true,
});let _canvas_dom = {};
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
let document_all = undetectable;

Object.defineProperty(document_all, 0, {
  get: function () {
    console.log("document_all 0 get [call]", "arg:", arguments);
    return {}
  },
  configurable: false,
  enumerable: true,
});
Object.defineProperty(document_all, 1, {
  get: function () {
    console.log("document_all 1 get [call]", "arg:", arguments);
    return {}   
  },
  configurable: false,
  enumerable: true,
});
document_all.__proto__ = {};
Object.defineProperty(document_all.__proto__, "length", {
  get: function () {
    const keys = Object.keys(this);
    const numericKeys = keys.filter(key => !isNaN(key) && key !== ''&& this[key] !== undefined);
    const result = numericKeys.length
    h_log("document_all.__proto__ length get [call]", "arg:", arguments, "result:", result);
    return result;
  },
  set: undefined,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(document_all.__proto__, "item", {
  get: function () {
    h_log("document_all.__proto__ item value [get]", "arg:", arguments);
    return function () {
      h_log("document_all.__proto__ item value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(document_all.__proto__, "namedItem", {
  get: function () {
    h_log("document_all.__proto__ namedItem value [get]","arg:",arguments);
    return function () {
      h_log("document_all.__proto__ namedItem value [call]",   "arg:",arguments);
    };
  },
  enumerable: true, 
  configurable: true,
});
let _HTMLAllCollection = function () {
  h_log("document_all.__proto__ constructor value [call]", "arg:", arguments);
};
Object.defineProperty(document_all.__proto__, "constructor", {
  value: _HTMLAllCollection,
  writable: true,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(document_all.__proto__, Symbol.toStringTag, {
  value: "HTMLAllCollection",
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(document_all.__proto__, Symbol.iterator, {
  get: function () {
    h_log(
      "document_all.__proto__ Symbol(Symbol.iterator) value [get]",
      "arg:",
      arguments
    );
    return function () {
      h_log(
        "document_all.__proto__ Symbol(Symbol.iterator) value [call]",
        "arg:",
        arguments
      );
    };
  },
  enumerable: false,
  configurable: true,
});

_HTMLAllCollection.prototype = document_all.__proto__;

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
_text.__proto__.__proto__.__proto__ = Node.prototype;let _document = {};
Object.defineProperty(_document, "location", {
    get: function () {
        h_log("_document location get [call]", "arg:", arguments)
        return _location
    }, set: function () {
        h_log("_document location set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
_document.__proto__ = {};
let _HTMLDocument = function () {
    h_log("_document.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLDocument.prototype = _document.__proto__;
Object.defineProperty(_document.__proto__, "constructor", {
    value: _HTMLDocument,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_document.__proto__, Symbol.toStringTag, {
    value: "HTMLDocument",
    writable: false,
    enumerable: false,
    configurable: true,
});
_document.__proto__.__proto__ = {};
Object.defineProperty(_document.__proto__.__proto__, "implementation", {
    get: function () {
        h_log("_document.__proto__.__proto__ implementation get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "URL", {
    get: function () {
        h_log("_document.__proto__.__proto__ URL get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "documentURI", {
    get: function () {
        h_log("_document.__proto__.__proto__ documentURI get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "compatMode", {
    get: function () {
        h_log("_document.__proto__.__proto__ compatMode get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "characterSet", {
    get: function () {
        h_log("_document.__proto__.__proto__ characterSet get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "charset", {
    get: function () {
        h_log("_document.__proto__.__proto__ charset get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "inputEncoding", {
    get: function () {
        h_log("_document.__proto__.__proto__ inputEncoding get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "contentType", {
    get: function () {
        h_log("_document.__proto__.__proto__ contentType get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "doctype", {
    get: function () {
        h_log("_document.__proto__.__proto__ doctype get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "documentElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ documentElement get [call]", "arg:", arguments)
        return html1
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "xmlEncoding", {
    get: function () {
        h_log("_document.__proto__.__proto__ xmlEncoding get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "xmlVersion", {
    get: function () {
        h_log("_document.__proto__.__proto__ xmlVersion get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ xmlVersion set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "xmlStandalone", {
    get: function () {
        h_log("_document.__proto__.__proto__ xmlStandalone get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ xmlStandalone set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "domain", {
    get: function () {
        h_log("_document.__proto__.__proto__ domain get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ domain set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "referrer", {
    get: function () {
        h_log("_document.__proto__.__proto__ referrer get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
let _value_cookie = ""
let _document_cookie_obj = {}
Object.defineProperty(_document.__proto__.__proto__, "cookie", {
    get: function () {
        h_log("_document.__proto__.__proto__ cookie get [call]", "arg:", arguments)
        return _value_cookie
    }, set: function (newValue) {
        h_log("_document.__proto__.__proto__ cookie set [call]", "arg:", arguments)
        let ck = newValue.split('=');
        if (ck.length >= 2) {
            let ck_key = ck[0];
            let ck_value = ck[1];
            if (ck_value.indexOf(';') != -1) {
                ck_value = ck[1].split(';')[0];
            } else {
                ck_value = ck[1];
            }
            _document_cookie_obj[ck_key] = ck_value
        }
        _value_cookie = newValue
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "lastModified", {
    get: function () {
        h_log("_document.__proto__.__proto__ lastModified get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "readyState", {
    get: function () {
        h_log("_document.__proto__.__proto__ readyState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "title", {
    get: function () {
        h_log("_document.__proto__.__proto__ title get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ title set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "dir", {
    get: function () {
        h_log("_document.__proto__.__proto__ dir get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ dir set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "body", {
    get: function () {
        h_log("_document.__proto__.__proto__ body get [call]", "arg:", arguments)
        return null
    }, set: function () {
        h_log("_document.__proto__.__proto__ body set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "head", {
    get: function () {
        h_log("_document.__proto__.__proto__ head get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "images", {
    get: function () {
        h_log("_document.__proto__.__proto__ images get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "embeds", {
    get: function () {
        h_log("_document.__proto__.__proto__ embeds get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "plugins", {
    get: function () {
        h_log("_document.__proto__.__proto__ plugins get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "links", {
    get: function () {
        h_log("_document.__proto__.__proto__ links get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "forms", {
    get: function () {
        h_log("_document.__proto__.__proto__ forms get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "scripts", {
    get: function () {
        h_log("_document.__proto__.__proto__ scripts get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "currentScript", {
    get: function () {
        h_log("_document.__proto__.__proto__ currentScript get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "defaultView", {
    get: function () {
        h_log("_document.__proto__.__proto__ defaultView get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "designMode", {
    get: function () {
        h_log("_document.__proto__.__proto__ designMode get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ designMode set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onreadystatechange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onreadystatechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onreadystatechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "anchors", {
    get: function () {
        h_log("_document.__proto__.__proto__ anchors get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "applets", {
    get: function () {
        h_log("_document.__proto__.__proto__ applets get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "fgColor", {
    get: function () {
        h_log("_document.__proto__.__proto__ fgColor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ fgColor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "linkColor", {
    get: function () {
        h_log("_document.__proto__.__proto__ linkColor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ linkColor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "vlinkColor", {
    get: function () {
        h_log("_document.__proto__.__proto__ vlinkColor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ vlinkColor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "alinkColor", {
    get: function () {
        h_log("_document.__proto__.__proto__ alinkColor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ alinkColor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "bgColor", {
    get: function () {
        h_log("_document.__proto__.__proto__ bgColor get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ bgColor set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "all", {
    get: function () {
        h_log("_document.__proto__.__proto__ all get [call]", "arg:", arguments)
        return document_all
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "scrollingElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ scrollingElement get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerlockchange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerlockchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerlockchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerlockerror", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerlockerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerlockerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "hidden", {
    get: function () {
        h_log("_document.__proto__.__proto__ hidden get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "visibilityState", {
    get: function () {
        h_log("_document.__proto__.__proto__ visibilityState get [call]", "arg:", arguments)
        return 'visible'
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "wasDiscarded", {
    get: function () {
        h_log("_document.__proto__.__proto__ wasDiscarded get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "prerendering", {
    get: function () {
        h_log("_document.__proto__.__proto__ prerendering get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "featurePolicy", {
    get: function () {
        h_log("_document.__proto__.__proto__ featurePolicy get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "webkitVisibilityState", {
    get: function () {
        h_log("_document.__proto__.__proto__ webkitVisibilityState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "webkitHidden", {
    get: function () {
        h_log("_document.__proto__.__proto__ webkitHidden get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onbeforecopy", {
    get: function () {
        h_log("_document.__proto__.__proto__ onbeforecopy get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onbeforecopy set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onbeforecut", {
    get: function () {
        h_log("_document.__proto__.__proto__ onbeforecut get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onbeforecut set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onbeforepaste", {
    get: function () {
        h_log("_document.__proto__.__proto__ onbeforepaste get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onbeforepaste set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onfreeze", {
    get: function () {
        h_log("_document.__proto__.__proto__ onfreeze get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onfreeze set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onprerenderingchange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onprerenderingchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onprerenderingchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onresume", {
    get: function () {
        h_log("_document.__proto__.__proto__ onresume get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onresume set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onsearch", {
    get: function () {
        h_log("_document.__proto__.__proto__ onsearch get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onsearch set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onvisibilitychange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onvisibilitychange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onvisibilitychange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "fullscreenEnabled", {
    get: function () {
        h_log("_document.__proto__.__proto__ fullscreenEnabled get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ fullscreenEnabled set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "fullscreen", {
    get: function () {
        h_log("_document.__proto__.__proto__ fullscreen get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ fullscreen set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onfullscreenchange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onfullscreenchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onfullscreenchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onfullscreenerror", {
    get: function () {
        h_log("_document.__proto__.__proto__ onfullscreenerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onfullscreenerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "webkitIsFullScreen", {
    get: function () {
        h_log("_document.__proto__.__proto__ webkitIsFullScreen get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "webkitCurrentFullScreenElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ webkitCurrentFullScreenElement get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "webkitFullscreenEnabled", {
    get: function () {
        h_log("_document.__proto__.__proto__ webkitFullscreenEnabled get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "webkitFullscreenElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ webkitFullscreenElement get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onwebkitfullscreenchange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onwebkitfullscreenchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onwebkitfullscreenchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onwebkitfullscreenerror", {
    get: function () {
        h_log("_document.__proto__.__proto__ onwebkitfullscreenerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onwebkitfullscreenerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "rootElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ rootElement get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "pictureInPictureEnabled", {
    get: function () {
        h_log("_document.__proto__.__proto__ pictureInPictureEnabled get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onbeforexrselect", {
    get: function () {
        h_log("_document.__proto__.__proto__ onbeforexrselect get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onbeforexrselect set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onabort", {
    get: function () {
        h_log("_document.__proto__.__proto__ onabort get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onabort set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onbeforeinput", {
    get: function () {
        h_log("_document.__proto__.__proto__ onbeforeinput get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onbeforeinput set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onbeforetoggle", {
    get: function () {
        h_log("_document.__proto__.__proto__ onbeforetoggle get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onbeforetoggle set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onblur", {
    get: function () {
        h_log("_document.__proto__.__proto__ onblur get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onblur set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncancel", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncancel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncancel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncanplay", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncanplay get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncanplay set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncanplaythrough", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncanplaythrough get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncanplaythrough set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onchange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onclick", {
    get: function () {
        h_log("_document.__proto__.__proto__ onclick get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onclick set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onclose", {
    get: function () {
        h_log("_document.__proto__.__proto__ onclose get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onclose set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncontextlost", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncontextlost get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncontextlost set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncontextmenu", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncontextmenu get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncontextmenu set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncontextrestored", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncontextrestored get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncontextrestored set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncuechange", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncuechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncuechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondblclick", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondblclick get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondblclick set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondrag", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondrag get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondrag set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondragend", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondragend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondragend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondragenter", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondragenter get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondragenter set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondragleave", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondragleave get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondragleave set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondragover", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondragover get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondragover set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondragstart", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondragstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondragstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondrop", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondrop get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondrop set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ondurationchange", {
    get: function () {
        h_log("_document.__proto__.__proto__ ondurationchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ondurationchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onemptied", {
    get: function () {
        h_log("_document.__proto__.__proto__ onemptied get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onemptied set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onended", {
    get: function () {
        h_log("_document.__proto__.__proto__ onended get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onended set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onerror", {
    get: function () {
        h_log("_document.__proto__.__proto__ onerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onfocus", {
    get: function () {
        h_log("_document.__proto__.__proto__ onfocus get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onfocus set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onformdata", {
    get: function () {
        h_log("_document.__proto__.__proto__ onformdata get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onformdata set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oninput", {
    get: function () {
        h_log("_document.__proto__.__proto__ oninput get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oninput set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oninvalid", {
    get: function () {
        h_log("_document.__proto__.__proto__ oninvalid get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oninvalid set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onkeydown", {
    get: function () {
        h_log("_document.__proto__.__proto__ onkeydown get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onkeydown set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onkeypress", {
    get: function () {
        h_log("_document.__proto__.__proto__ onkeypress get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onkeypress set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onkeyup", {
    get: function () {
        h_log("_document.__proto__.__proto__ onkeyup get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onkeyup set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onload", {
    get: function () {
        h_log("_document.__proto__.__proto__ onload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onloadeddata", {
    get: function () {
        h_log("_document.__proto__.__proto__ onloadeddata get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onloadeddata set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onloadedmetadata", {
    get: function () {
        h_log("_document.__proto__.__proto__ onloadedmetadata get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onloadedmetadata set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onloadstart", {
    get: function () {
        h_log("_document.__proto__.__proto__ onloadstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onloadstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onmousedown", {
    get: function () {
        h_log("_document.__proto__.__proto__ onmousedown get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onmousedown set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onmouseenter", {
    get: function () {
        h_log("_document.__proto__.__proto__ onmouseenter get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onmouseenter set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onmouseleave", {
    get: function () {
        h_log("_document.__proto__.__proto__ onmouseleave get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onmouseleave set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onmousemove", {
    get: function () {
        h_log("_document.__proto__.__proto__ onmousemove get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onmousemove set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onmouseout", {
    get: function () {
        h_log("_document.__proto__.__proto__ onmouseout get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onmouseout set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onmouseover", {
    get: function () {
        h_log("_document.__proto__.__proto__ onmouseover get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onmouseover set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onmouseup", {
    get: function () {
        h_log("_document.__proto__.__proto__ onmouseup get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onmouseup set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onmousewheel", {
    get: function () {
        h_log("_document.__proto__.__proto__ onmousewheel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onmousewheel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpause", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpause get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpause set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onplay", {
    get: function () {
        h_log("_document.__proto__.__proto__ onplay get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onplay set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onplaying", {
    get: function () {
        h_log("_document.__proto__.__proto__ onplaying get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onplaying set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onprogress", {
    get: function () {
        h_log("_document.__proto__.__proto__ onprogress get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onprogress set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onratechange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onratechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onratechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onreset", {
    get: function () {
        h_log("_document.__proto__.__proto__ onreset get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onreset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onresize", {
    get: function () {
        h_log("_document.__proto__.__proto__ onresize get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onresize set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onscroll", {
    get: function () {
        h_log("_document.__proto__.__proto__ onscroll get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onscroll set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onsecuritypolicyviolation", {
    get: function () {
        h_log("_document.__proto__.__proto__ onsecuritypolicyviolation get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onsecuritypolicyviolation set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onseeked", {
    get: function () {
        h_log("_document.__proto__.__proto__ onseeked get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onseeked set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onseeking", {
    get: function () {
        h_log("_document.__proto__.__proto__ onseeking get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onseeking set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onselect", {
    get: function () {
        h_log("_document.__proto__.__proto__ onselect get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onselect set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onslotchange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onslotchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onslotchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onstalled", {
    get: function () {
        h_log("_document.__proto__.__proto__ onstalled get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onstalled set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onsubmit", {
    get: function () {
        h_log("_document.__proto__.__proto__ onsubmit get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onsubmit set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onsuspend", {
    get: function () {
        h_log("_document.__proto__.__proto__ onsuspend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onsuspend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ontimeupdate", {
    get: function () {
        h_log("_document.__proto__.__proto__ ontimeupdate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ontimeupdate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ontoggle", {
    get: function () {
        h_log("_document.__proto__.__proto__ ontoggle get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ontoggle set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onvolumechange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onvolumechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onvolumechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onwaiting", {
    get: function () {
        h_log("_document.__proto__.__proto__ onwaiting get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onwaiting set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onwebkitanimationend", {
    get: function () {
        h_log("_document.__proto__.__proto__ onwebkitanimationend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onwebkitanimationend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onwebkitanimationiteration", {
    get: function () {
        h_log("_document.__proto__.__proto__ onwebkitanimationiteration get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onwebkitanimationiteration set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onwebkitanimationstart", {
    get: function () {
        h_log("_document.__proto__.__proto__ onwebkitanimationstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onwebkitanimationstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onwebkittransitionend", {
    get: function () {
        h_log("_document.__proto__.__proto__ onwebkittransitionend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onwebkittransitionend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onwheel", {
    get: function () {
        h_log("_document.__proto__.__proto__ onwheel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onwheel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onauxclick", {
    get: function () {
        h_log("_document.__proto__.__proto__ onauxclick get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onauxclick set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ongotpointercapture", {
    get: function () {
        h_log("_document.__proto__.__proto__ ongotpointercapture get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ongotpointercapture set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onlostpointercapture", {
    get: function () {
        h_log("_document.__proto__.__proto__ onlostpointercapture get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onlostpointercapture set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerdown", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerdown get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerdown set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointermove", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointermove get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointermove set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerrawupdate", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerrawupdate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerrawupdate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerup", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerup get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerup set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointercancel", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointercancel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointercancel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerover", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerover get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerover set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerout", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerout get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerout set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerenter", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerenter get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerenter set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpointerleave", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpointerleave get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpointerleave set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onselectstart", {
    get: function () {
        h_log("_document.__proto__.__proto__ onselectstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onselectstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onselectionchange", {
    get: function () {
        h_log("_document.__proto__.__proto__ onselectionchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onselectionchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onanimationend", {
    get: function () {
        h_log("_document.__proto__.__proto__ onanimationend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onanimationend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onanimationiteration", {
    get: function () {
        h_log("_document.__proto__.__proto__ onanimationiteration get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onanimationiteration set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onanimationstart", {
    get: function () {
        h_log("_document.__proto__.__proto__ onanimationstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onanimationstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ontransitionrun", {
    get: function () {
        h_log("_document.__proto__.__proto__ ontransitionrun get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ontransitionrun set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ontransitionstart", {
    get: function () {
        h_log("_document.__proto__.__proto__ ontransitionstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ontransitionstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ontransitionend", {
    get: function () {
        h_log("_document.__proto__.__proto__ ontransitionend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ontransitionend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "ontransitioncancel", {
    get: function () {
        h_log("_document.__proto__.__proto__ ontransitioncancel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ ontransitioncancel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncopy", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncopy get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncopy set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncut", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncut get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncut set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onpaste", {
    get: function () {
        h_log("_document.__proto__.__proto__ onpaste get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onpaste set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "children", {
    get: function () {
        h_log("_document.__proto__.__proto__ children get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "firstElementChild", {
    get: function () {
        h_log("_document.__proto__.__proto__ firstElementChild get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "lastElementChild", {
    get: function () {
        h_log("_document.__proto__.__proto__ lastElementChild get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "childElementCount", {
    get: function () {
        h_log("_document.__proto__.__proto__ childElementCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "activeElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ activeElement get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "styleSheets", {
    get: function () {
        h_log("_document.__proto__.__proto__ styleSheets get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "pointerLockElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ pointerLockElement get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "fullscreenElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ fullscreenElement get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ fullscreenElement set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "adoptedStyleSheets", {
    get: function () {
        h_log("_document.__proto__.__proto__ adoptedStyleSheets get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ adoptedStyleSheets set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "pictureInPictureElement", {
    get: function () {
        h_log("_document.__proto__.__proto__ pictureInPictureElement get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "fonts", {
    get: function () {
        h_log("_document.__proto__.__proto__ fonts get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "adoptNode", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ adoptNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ adoptNode value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "append", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ append value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ append value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "captureEvents", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ captureEvents value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ captureEvents value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "caretRangeFromPoint", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ caretRangeFromPoint value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ caretRangeFromPoint value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "clear", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ clear value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ clear value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "close", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ close value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ close value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createAttribute", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createAttribute value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createAttribute value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createAttributeNS", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createAttributeNS value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createAttributeNS value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createCDATASection", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createCDATASection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createCDATASection value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createComment", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createComment value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createComment value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createDocumentFragment", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createDocumentFragment value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createDocumentFragment value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createElement", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createElement value [call]", "arg:", arguments);
            if (arguments[0] === "div") {
                return new _HTMLDivElement("h_div")
            } else if (arguments[0] === "a") {
                return new _HTMLAnchorElement("h_a")
            } else if (arguments[0] === "span") {
                return new _HTMLSpanElement("h_span")
            } else if (arguments[0] === "canvas") {
                return new _HTMLCanvasElement("h_canva")
            } else if (arguments[0] === "form") {
                return new _HTMLFormElement("h_form")
            } else if (arguments[0] === "input") {
                return new _HTMLInputElement("h_input")
            } else if (arguments[0] === "iframe") {
                return new _HTMLIFrameElement("h_iframe")
            }
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createElementNS", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createElementNS value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createElementNS value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createEvent", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createEvent value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});

let _createExpression = {};
_createExpression.__proto__ = {};
Object.defineProperty(_createExpression.__proto__, "evaluate", {
    get: function () {
        h_log("[v] _createExpression.__proto__ evaluate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _createExpression.__proto__ evaluate value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _XPathExpression = function () {
    h_log("_createExpression.__proto__ constructor value [call]", "arg:", arguments)
};
_XPathExpression.prototype = _createExpression.__proto__;
Object.defineProperty(_createExpression.__proto__, "constructor", {
    value: _XPathExpression,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_createExpression.__proto__, Symbol.toStringTag, {
    value: "XPathExpression",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "createExpression", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createExpression value [get]", "arg:", arguments);
        return function (a, b) {
            h_log("[v] _document.__proto__.__proto__ createExpression value [call]", "arg:", arguments)
            return new _XPathExpression(a, b)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createNSResolver", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createNSResolver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createNSResolver value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createNodeIterator", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createNodeIterator value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createNodeIterator value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createProcessingInstruction", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createProcessingInstruction value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createProcessingInstruction value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createRange", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createRange value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createRange value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createTextNode", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createTextNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createTextNode value [call]", "arg:", arguments)
            return new _Text
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "createTreeWalker", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ createTreeWalker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ createTreeWalker value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "elementFromPoint", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ elementFromPoint value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ elementFromPoint value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "elementsFromPoint", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ elementsFromPoint value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ elementsFromPoint value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "evaluate", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ evaluate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ evaluate value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "execCommand", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ execCommand value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ execCommand value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "exitFullscreen", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ exitFullscreen value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ exitFullscreen value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "exitPictureInPicture", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ exitPictureInPicture value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ exitPictureInPicture value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "exitPointerLock", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ exitPointerLock value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ exitPointerLock value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "getElementById", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ getElementById value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ getElementById value [call]", "arg:", arguments)
            if (arguments[0] === "HugPYbOHyOWN") {
                return meta2
            }else if (arguments[0] === "rf62KBUrAJTi") {
                return meta2
            }
            return null

        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "getElementsByClassName", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ getElementsByClassName value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ getElementsByClassName value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "getElementsByName", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ getElementsByName value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ getElementsByName value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "getElementsByTagName", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ getElementsByTagName value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ getElementsByTagName value [call]", "arg:", arguments)
            if (arguments[0] === "script") {
                return ProxyObj([script1, script2], "document.getElementsByTagName(script)", false)
            } else if (arguments[0] === "meta") {
                return ProxyObj([meta1, meta2], "document.getElementsByTagName(meta)", false)
            } else if (arguments[0] === "base") {
                return ProxyObj([], "document.getElementsByTagName(base)", false)
            }
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "getElementsByTagNameNS", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ getElementsByTagNameNS value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ getElementsByTagNameNS value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "getSelection", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ getSelection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ getSelection value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "hasFocus", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ hasFocus value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ hasFocus value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "importNode", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ importNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ importNode value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "open", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ open value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ open value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "prepend", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ prepend value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ prepend value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "queryCommandEnabled", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ queryCommandEnabled value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ queryCommandEnabled value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "queryCommandIndeterm", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ queryCommandIndeterm value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ queryCommandIndeterm value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "queryCommandState", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ queryCommandState value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ queryCommandState value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "queryCommandSupported", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ queryCommandSupported value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ queryCommandSupported value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "queryCommandValue", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ queryCommandValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ queryCommandValue value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "querySelector", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ querySelector value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ querySelector value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "querySelectorAll", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ querySelectorAll value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ querySelectorAll value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "releaseEvents", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ releaseEvents value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ releaseEvents value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "replaceChildren", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ replaceChildren value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ replaceChildren value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "startViewTransition", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ startViewTransition value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ startViewTransition value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "webkitCancelFullScreen", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ webkitCancelFullScreen value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ webkitCancelFullScreen value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "webkitExitFullscreen", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ webkitExitFullscreen value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ webkitExitFullscreen value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "write", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ write value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ write value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "writeln", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ writeln value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ writeln value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _Document = function () {
    h_log("_document.__proto__.__proto__ constructor value [call]", "arg:", arguments)
};
_Document.prototype = _document.__proto__.__proto__;
Object.defineProperty(_document.__proto__.__proto__, "constructor", {
    value: _Document,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "fragmentDirective", {
    get: function () {
        h_log("_document.__proto__.__proto__ fragmentDirective get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onbeforematch", {
    get: function () {
        h_log("_document.__proto__.__proto__ onbeforematch get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onbeforematch set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "browsingTopics", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ browsingTopics value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ browsingTopics value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "hasPrivateToken", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ hasPrivateToken value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ hasPrivateToken value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "hasRedemptionRecord", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ hasRedemptionRecord value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ hasRedemptionRecord value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "requestStorageAccess", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ requestStorageAccess value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ requestStorageAccess value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "timeline", {
    get: function () {
        h_log("_document.__proto__.__proto__ timeline get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "oncontentvisibilityautostatechange", {
    get: function () {
        h_log("_document.__proto__.__proto__ oncontentvisibilityautostatechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ oncontentvisibilityautostatechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "onscrollend", {
    get: function () {
        h_log("_document.__proto__.__proto__ onscrollend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_document.__proto__.__proto__ onscrollend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, "getAnimations", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ getAnimations value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ getAnimations value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "hasStorageAccess", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ hasStorageAccess value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ hasStorageAccess value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, "requestStorageAccessFor", {
    get: function () {
        h_log("[v] _document.__proto__.__proto__ requestStorageAccessFor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _document.__proto__.__proto__ requestStorageAccessFor value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_document.__proto__.__proto__, Symbol.toStringTag, {
    value: "Document",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_document.__proto__.__proto__, Symbol.unscopables, {
    value: {},
    writable: false,
    enumerable: false,
    configurable: true,
});
_document.__proto__.__proto__.__proto__ = Node.prototype;let window_top = {};
window_top.location = {
    hostname:"www.zhipin.com",
};
window_top.length = 2;
window_top.document = {}
window_top = ProxyObj(window_top, "window_top", true);
window = globalThis;
window.Object = Object;
window.Function = Function;
window.Array = Array;
window.Number = Number;
window.parseFloat = parseFloat;
window.parseInt = parseInt;
window.Infinity = Infinity;
window.NaN = NaN;
window.undefined = undefined;
window.Boolean = Boolean;
window.String = String;
window.Symbol = Symbol;
window.Date = Date;
window.Promise = Promise;
window.RegExp = RegExp;
window.Error = Error;
window.AggregateError = AggregateError;
window.EvalError = EvalError;
window.RangeError = RangeError;
window.ReferenceError = ReferenceError;
window.SyntaxError = SyntaxError;
window.TypeError = TypeError;
window.URIError = URIError;
window.globalThis = globalThis;
window.JSON = JSON;
window.Math = Math;
window.Intl = Intl;
window.ArrayBuffer = ArrayBuffer;
window.Atomics = Atomics;
window.Uint8Array = Uint8Array;
window.Int8Array = Int8Array;
window.Uint16Array = Uint16Array;
window.Int16Array = Int16Array;
window.Uint32Array = Uint32Array;
window.Int32Array = Int32Array;
window.Float32Array = Float32Array;
window.Float64Array = Float64Array;
window.Uint8ClampedArray = Uint8ClampedArray;
window.BigUint64Array = BigUint64Array;
window.BigInt64Array = BigInt64Array;
window.DataView = DataView;
window.Map = Map;
window.BigInt = BigInt;
window.Set = Set;
window.WeakMap = WeakMap;
window.WeakSet = WeakSet;
window.Proxy = Proxy;
window.Reflect = Reflect;
window.FinalizationRegistry = FinalizationRegistry;
window.WeakRef = WeakRef;
window.decodeURI = decodeURI;
window.decodeURIComponent = decodeURIComponent;
window.encodeURI = encodeURI;
window.encodeURIComponent = encodeURIComponent;
window.escape = escape;
window.unescape = unescape;
window.eval = eval;
window.isFinite = isFinite;
window.isNaN = isNaN;
window.console = console;
window.ActiveXObject = undefined;
Object.defineProperty(window, "Option", {
    get: function () {
        h_log("[v] window Option value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Option value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Image", {
    get: function () {
        h_log("[v] window Image value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Image value [call]", "arg:", arguments);
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Audio", {
    get: function () {
        h_log("[v] window Audio value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Audio value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitURL", {
    get: function () {
        h_log("[v] window webkitURL value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitURL value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitRTCPeerConnection", {
    get: function () {
        h_log("[v] window webkitRTCPeerConnection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitRTCPeerConnection value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitMediaStream", {
    get: function () {
        h_log("[v] window webkitMediaStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitMediaStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});


Object.defineProperty(window, "WebKitMutationObserver", {
    get: function () {
        h_log("[v] window WebKitMutationObserver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebKitMutationObserver value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebKitCSSMatrix", {
    get: function () {
        h_log("[v] window WebKitCSSMatrix value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebKitCSSMatrix value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XSLTProcessor", {
    get: function () {
        h_log("[v] window XSLTProcessor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XSLTProcessor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XPathResult", {
    get: function () {
        h_log("[v] window XPathResult value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XPathResult value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XPathEvaluator", {
    get: function () {
        h_log("[v] window XPathEvaluator value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XPathEvaluator value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XMLSerializer", {
    get: function () {
        h_log("[v] window XMLSerializer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XMLSerializer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XMLHttpRequestUpload", {
    get: function () {
        h_log("[v] window XMLHttpRequestUpload value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XMLHttpRequestUpload value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XMLHttpRequestEventTarget", {
    get: function () {
        h_log("[v] window XMLHttpRequestEventTarget value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XMLHttpRequestEventTarget value [call]", "arg:", arguments);
        }
    }, enumerable: false, configurable: true
});
let id_count = 0;
Object.defineProperty(window, "setTimeout", {
    get: function () {
        h_log("[v] window setTimeout value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window setTimeout value [call]", "arg:", arguments)
            id_count += 1
            return id_count
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "setInterval", {
    get: function () {
        h_log("[v] window setInterval value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window setInterval value [call]", "arg:", arguments)
            id_count += 1
            return id_count
        }
    }, enumerable: false, configurable: true
});

Object.defineProperty(window, "XMLHttpRequest", {
    value: function () {
        h_log("[v] window XMLHttpRequest value [get]", "arg:", arguments);
        return _XMLHttpRequest
    }, enumerable: false, configurable: true, writable: true
});

Object.defineProperty(window, "XMLDocument", {
    get: function () {
        h_log("[v] window XMLDocument value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XMLDocument value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WritableStreamDefaultWriter", {
    get: function () {
        h_log("[v] window WritableStreamDefaultWriter value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WritableStreamDefaultWriter value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WritableStreamDefaultController", {
    get: function () {
        h_log("[v] window WritableStreamDefaultController value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WritableStreamDefaultController value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WritableStream", {
    get: function () {
        h_log("[v] window WritableStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WritableStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Worker", {
    get: function () {
        h_log("[v] window Worker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Worker value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WheelEvent", {
    get: function () {
        h_log("[v] window WheelEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WheelEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebSocket", {
    value: _WebSocket, enumerable: false, configurable: true, writable: true
});
Object.defineProperty(window, "WebGLVertexArrayObject", {
    get: function () {
        h_log("[v] window WebGLVertexArrayObject value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLVertexArrayObject value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLUniformLocation", {
    get: function () {
        h_log("[v] window WebGLUniformLocation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLUniformLocation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Location", {
    get: function () {
        h_log("[v] window Location value [get]", "arg:", arguments);
        return _Location
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLTransformFeedback", {
    get: function () {
        h_log("[v] window WebGLTransformFeedback value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLTransformFeedback value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLTexture", {
    get: function () {
        h_log("[v] window WebGLTexture value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLTexture value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLSync", {
    get: function () {
        h_log("[v] window WebGLSync value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLSync value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLShaderPrecisionFormat", {
    get: function () {
        h_log("[v] window WebGLShaderPrecisionFormat value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLShaderPrecisionFormat value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLShader", {
    get: function () {
        h_log("[v] window WebGLShader value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLShader value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLSampler", {
    get: function () {
        h_log("[v] window WebGLSampler value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLSampler value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLRenderingContext", {
    get: function () {
        h_log("[v] window WebGLRenderingContext value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLRenderingContext value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLRenderbuffer", {
    get: function () {
        h_log("[v] window WebGLRenderbuffer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLRenderbuffer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLQuery", {
    get: function () {
        h_log("[v] window WebGLQuery value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLQuery value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLProgram", {
    get: function () {
        h_log("[v] window WebGLProgram value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLProgram value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLFramebuffer", {
    get: function () {
        h_log("[v] window WebGLFramebuffer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLFramebuffer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLContextEvent", {
    get: function () {
        h_log("[v] window WebGLContextEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLContextEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLBuffer", {
    get: function () {
        h_log("[v] window WebGLBuffer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLBuffer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGLActiveInfo", {
    get: function () {
        h_log("[v] window WebGLActiveInfo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGLActiveInfo value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebGL2RenderingContext", {
    get: function () {
        h_log("[v] window WebGL2RenderingContext value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebGL2RenderingContext value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WaveShaperNode", {
    get: function () {
        h_log("[v] window WaveShaperNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WaveShaperNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VisualViewport", {
    get: function () {
        h_log("[v] window VisualViewport value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VisualViewport value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VirtualKeyboardGeometryChangeEvent", {
    get: function () {
        h_log("[v] window VirtualKeyboardGeometryChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VirtualKeyboardGeometryChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ViewTransition", {
    get: function () {
        h_log("[v] window ViewTransition value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ViewTransition value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VideoFrame", {
    get: function () {
        h_log("[v] window VideoFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VideoFrame value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VideoColorSpace", {
    get: function () {
        h_log("[v] window VideoColorSpace value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VideoColorSpace value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ValidityState", {
    get: function () {
        h_log("[v] window ValidityState value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ValidityState value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VTTCue", {
    get: function () {
        h_log("[v] window VTTCue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VTTCue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "UserActivation", {
    get: function () {
        h_log("[v] window UserActivation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window UserActivation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
// Object.defineProperty(window, "URLSearchParams", {
//     get: function () {
//         h_log("[v] window URLSearchParams value [get]", "arg:", arguments);
//         return function () {
//             h_log("[v] window URLSearchParams value [call]", "arg:", arguments)
//         }
//     }, enumerable: false, configurable: true
// });
Object.defineProperty(window, "URLPattern", {
    get: function () {
        h_log("[v] window URLPattern value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window URLPattern value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
// Object.defineProperty(window, "URL", {
//     get: function () {
//         h_log("[v] window URL value [get]", "arg:", arguments);
//         return function () {
//             h_log("[v] window URL value [call]", "arg:", arguments)
//         }
//     }, enumerable: false, configurable: true
// });
Object.defineProperty(window, "UIEvent", {
    get: function () {
        h_log("[v] window UIEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window UIEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TrustedTypePolicyFactory", {
    get: function () {
        h_log("[v] window TrustedTypePolicyFactory value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TrustedTypePolicyFactory value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TrustedTypePolicy", {
    get: function () {
        h_log("[v] window TrustedTypePolicy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TrustedTypePolicy value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TrustedScriptURL", {
    get: function () {
        h_log("[v] window TrustedScriptURL value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TrustedScriptURL value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TrustedScript", {
    get: function () {
        h_log("[v] window TrustedScript value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TrustedScript value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TrustedHTML", {
    get: function () {
        h_log("[v] window TrustedHTML value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TrustedHTML value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TreeWalker", {
    get: function () {
        h_log("[v] window TreeWalker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TreeWalker value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TransitionEvent", {
    get: function () {
        h_log("[v] window TransitionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TransitionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TransformStreamDefaultController", {
    get: function () {
        h_log("[v] window TransformStreamDefaultController value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TransformStreamDefaultController value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TransformStream", {
    get: function () {
        h_log("[v] window TransformStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TransformStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TrackEvent", {
    get: function () {
        h_log("[v] window TrackEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TrackEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TouchList", {
    get: function () {
        h_log("[v] window TouchList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TouchList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TouchEvent", {
    get: function () {
        h_log("[v] window TouchEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TouchEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Touch", {
    get: function () {
        h_log("[v] window Touch value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Touch value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ToggleEvent", {
    get: function () {
        h_log("[v] window ToggleEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ToggleEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TimeRanges", {
    get: function () {
        h_log("[v] window TimeRanges value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TimeRanges value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextTrackList", {
    get: function () {
        h_log("[v] window TextTrackList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextTrackList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextTrackCueList", {
    get: function () {
        h_log("[v] window TextTrackCueList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextTrackCueList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextTrackCue", {
    get: function () {
        h_log("[v] window TextTrackCue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextTrackCue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextTrack", {
    get: function () {
        h_log("[v] window TextTrack value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextTrack value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextMetrics", {
    get: function () {
        h_log("[v] window TextMetrics value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextMetrics value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextEvent", {
    get: function () {
        h_log("[v] window TextEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextEncoderStream", {
    get: function () {
        h_log("[v] window TextEncoderStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextEncoderStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextEncoder", {
    get: function () {
        h_log("[v] window TextEncoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextEncoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TextDecoderStream", {
    get: function () {
        h_log("[v] window TextDecoderStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TextDecoderStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
// Object.defineProperty(window, "TextDecoder", {
//     get: function () {
//         h_log("[v] window TextDecoder value [get]", "arg:", arguments);
//         return function () {
//             h_log("[v] window TextDecoder value [call]", "arg:", arguments)
//         }
//     }, enumerable: false, configurable: true
// });
Object.defineProperty(window, "Text", {
    get: function () {
        h_log("[v] window Text value [get]", "arg:", arguments);
        return _Text
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TaskSignal", {
    get: function () {
        h_log("[v] window TaskSignal value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TaskSignal value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TaskPriorityChangeEvent", {
    get: function () {
        h_log("[v] window TaskPriorityChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TaskPriorityChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TaskController", {
    get: function () {
        h_log("[v] window TaskController value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TaskController value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "TaskAttributionTiming", {
    get: function () {
        h_log("[v] window TaskAttributionTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window TaskAttributionTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SyncManager", {
    get: function () {
        h_log("[v] window SyncManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SyncManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SubmitEvent", {
    get: function () {
        h_log("[v] window SubmitEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SubmitEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "StyleSheetList", {
    get: function () {
        h_log("[v] window StyleSheetList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window StyleSheetList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "StyleSheet", {
    get: function () {
        h_log("[v] window StyleSheet value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window StyleSheet value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "StylePropertyMapReadOnly", {
    get: function () {
        h_log("[v] window StylePropertyMapReadOnly value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window StylePropertyMapReadOnly value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "StylePropertyMap", {
    get: function () {
        h_log("[v] window StylePropertyMap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window StylePropertyMap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "StorageEvent", {
    get: function () {
        h_log("[v] window StorageEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window StorageEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Storage", {
    get: function () {
        h_log("[v] window Storage value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Storage value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "StereoPannerNode", {
    get: function () {
        h_log("[v] window StereoPannerNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window StereoPannerNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "StaticRange", {
    get: function () {
        h_log("[v] window StaticRange value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window StaticRange value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SourceBufferList", {
    get: function () {
        h_log("[v] window SourceBufferList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SourceBufferList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SourceBuffer", {
    get: function () {
        h_log("[v] window SourceBuffer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SourceBuffer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ShadowRoot", {
    get: function () {
        h_log("[v] window ShadowRoot value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ShadowRoot value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Selection", {
    get: function () {
        h_log("[v] window Selection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Selection value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SecurityPolicyViolationEvent", {
    get: function () {
        h_log("[v] window SecurityPolicyViolationEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SecurityPolicyViolationEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ScriptProcessorNode", {
    get: function () {
        h_log("[v] window ScriptProcessorNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ScriptProcessorNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ScreenOrientation", {
    get: function () {
        h_log("[v] window ScreenOrientation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ScreenOrientation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Screen", {
    get: function () {
        h_log("[v] window Screen value [get]", "arg:", arguments);
        return _Screen
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Scheduling", {
    get: function () {
        h_log("[v] window Scheduling value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Scheduling value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Scheduler", {
    get: function () {
        h_log("[v] window Scheduler value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Scheduler value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGViewElement", {
    get: function () {
        h_log("[v] window SVGViewElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGViewElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGUseElement", {
    get: function () {
        h_log("[v] window SVGUseElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGUseElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGUnitTypes", {
    get: function () {
        h_log("[v] window SVGUnitTypes value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGUnitTypes value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGTransformList", {
    get: function () {
        h_log("[v] window SVGTransformList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGTransformList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGTransform", {
    get: function () {
        h_log("[v] window SVGTransform value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGTransform value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGTitleElement", {
    get: function () {
        h_log("[v] window SVGTitleElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGTitleElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGTextPositioningElement", {
    get: function () {
        h_log("[v] window SVGTextPositioningElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGTextPositioningElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGTextPathElement", {
    get: function () {
        h_log("[v] window SVGTextPathElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGTextPathElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGTextElement", {
    get: function () {
        h_log("[v] window SVGTextElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGTextElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGTextContentElement", {
    get: function () {
        h_log("[v] window SVGTextContentElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGTextContentElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGTSpanElement", {
    get: function () {
        h_log("[v] window SVGTSpanElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGTSpanElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGSymbolElement", {
    get: function () {
        h_log("[v] window SVGSymbolElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGSymbolElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGSwitchElement", {
    get: function () {
        h_log("[v] window SVGSwitchElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGSwitchElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGStyleElement", {
    get: function () {
        h_log("[v] window SVGStyleElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGStyleElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGStringList", {
    get: function () {
        h_log("[v] window SVGStringList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGStringList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGStopElement", {
    get: function () {
        h_log("[v] window SVGStopElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGStopElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGSetElement", {
    get: function () {
        h_log("[v] window SVGSetElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGSetElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGScriptElement", {
    get: function () {
        h_log("[v] window SVGScriptElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGScriptElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGSVGElement", {
    get: function () {
        h_log("[v] window SVGSVGElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGSVGElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGRectElement", {
    get: function () {
        h_log("[v] window SVGRectElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGRectElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGRect", {
    get: function () {
        h_log("[v] window SVGRect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGRect value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGRadialGradientElement", {
    get: function () {
        h_log("[v] window SVGRadialGradientElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGRadialGradientElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGPreserveAspectRatio", {
    get: function () {
        h_log("[v] window SVGPreserveAspectRatio value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGPreserveAspectRatio value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGPolylineElement", {
    get: function () {
        h_log("[v] window SVGPolylineElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGPolylineElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGPolygonElement", {
    get: function () {
        h_log("[v] window SVGPolygonElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGPolygonElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGPointList", {
    get: function () {
        h_log("[v] window SVGPointList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGPointList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGPoint", {
    get: function () {
        h_log("[v] window SVGPoint value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGPoint value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGPatternElement", {
    get: function () {
        h_log("[v] window SVGPatternElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGPatternElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGPathElement", {
    get: function () {
        h_log("[v] window SVGPathElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGPathElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGNumberList", {
    get: function () {
        h_log("[v] window SVGNumberList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGNumberList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGNumber", {
    get: function () {
        h_log("[v] window SVGNumber value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGNumber value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGMetadataElement", {
    get: function () {
        h_log("[v] window SVGMetadataElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGMetadataElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGMatrix", {
    get: function () {
        h_log("[v] window SVGMatrix value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGMatrix value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGMaskElement", {
    get: function () {
        h_log("[v] window SVGMaskElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGMaskElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGMarkerElement", {
    get: function () {
        h_log("[v] window SVGMarkerElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGMarkerElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGMPathElement", {
    get: function () {
        h_log("[v] window SVGMPathElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGMPathElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGLinearGradientElement", {
    get: function () {
        h_log("[v] window SVGLinearGradientElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGLinearGradientElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGLineElement", {
    get: function () {
        h_log("[v] window SVGLineElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGLineElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGLengthList", {
    get: function () {
        h_log("[v] window SVGLengthList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGLengthList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGLength", {
    get: function () {
        h_log("[v] window SVGLength value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGLength value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGImageElement", {
    get: function () {
        h_log("[v] window SVGImageElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGImageElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGGraphicsElement", {
    get: function () {
        h_log("[v] window SVGGraphicsElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGGraphicsElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGGradientElement", {
    get: function () {
        h_log("[v] window SVGGradientElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGGradientElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGGeometryElement", {
    get: function () {
        h_log("[v] window SVGGeometryElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGGeometryElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGGElement", {
    get: function () {
        h_log("[v] window SVGGElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGGElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGForeignObjectElement", {
    get: function () {
        h_log("[v] window SVGForeignObjectElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGForeignObjectElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFilterElement", {
    get: function () {
        h_log("[v] window SVGFilterElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFilterElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFETurbulenceElement", {
    get: function () {
        h_log("[v] window SVGFETurbulenceElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFETurbulenceElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFETileElement", {
    get: function () {
        h_log("[v] window SVGFETileElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFETileElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFESpotLightElement", {
    get: function () {
        h_log("[v] window SVGFESpotLightElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFESpotLightElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFESpecularLightingElement", {
    get: function () {
        h_log("[v] window SVGFESpecularLightingElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFESpecularLightingElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEPointLightElement", {
    get: function () {
        h_log("[v] window SVGFEPointLightElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEPointLightElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEOffsetElement", {
    get: function () {
        h_log("[v] window SVGFEOffsetElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEOffsetElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEMorphologyElement", {
    get: function () {
        h_log("[v] window SVGFEMorphologyElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEMorphologyElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEMergeNodeElement", {
    get: function () {
        h_log("[v] window SVGFEMergeNodeElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEMergeNodeElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEMergeElement", {
    get: function () {
        h_log("[v] window SVGFEMergeElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEMergeElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEImageElement", {
    get: function () {
        h_log("[v] window SVGFEImageElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEImageElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEGaussianBlurElement", {
    get: function () {
        h_log("[v] window SVGFEGaussianBlurElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEGaussianBlurElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEFuncRElement", {
    get: function () {
        h_log("[v] window SVGFEFuncRElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEFuncRElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEFuncGElement", {
    get: function () {
        h_log("[v] window SVGFEFuncGElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEFuncGElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEFuncBElement", {
    get: function () {
        h_log("[v] window SVGFEFuncBElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEFuncBElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEFuncAElement", {
    get: function () {
        h_log("[v] window SVGFEFuncAElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEFuncAElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEFloodElement", {
    get: function () {
        h_log("[v] window SVGFEFloodElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEFloodElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEDropShadowElement", {
    get: function () {
        h_log("[v] window SVGFEDropShadowElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEDropShadowElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEDistantLightElement", {
    get: function () {
        h_log("[v] window SVGFEDistantLightElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEDistantLightElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEDisplacementMapElement", {
    get: function () {
        h_log("[v] window SVGFEDisplacementMapElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEDisplacementMapElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEDiffuseLightingElement", {
    get: function () {
        h_log("[v] window SVGFEDiffuseLightingElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEDiffuseLightingElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEConvolveMatrixElement", {
    get: function () {
        h_log("[v] window SVGFEConvolveMatrixElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEConvolveMatrixElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFECompositeElement", {
    get: function () {
        h_log("[v] window SVGFECompositeElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFECompositeElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEComponentTransferElement", {
    get: function () {
        h_log("[v] window SVGFEComponentTransferElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEComponentTransferElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEColorMatrixElement", {
    get: function () {
        h_log("[v] window SVGFEColorMatrixElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEColorMatrixElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGFEBlendElement", {
    get: function () {
        h_log("[v] window SVGFEBlendElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGFEBlendElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGEllipseElement", {
    get: function () {
        h_log("[v] window SVGEllipseElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGEllipseElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGElement", {
    get: function () {
        h_log("[v] window SVGElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGDescElement", {
    get: function () {
        h_log("[v] window SVGDescElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGDescElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGDefsElement", {
    get: function () {
        h_log("[v] window SVGDefsElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGDefsElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGComponentTransferFunctionElement", {
    get: function () {
        h_log("[v] window SVGComponentTransferFunctionElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGComponentTransferFunctionElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGClipPathElement", {
    get: function () {
        h_log("[v] window SVGClipPathElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGClipPathElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGCircleElement", {
    get: function () {
        h_log("[v] window SVGCircleElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGCircleElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimationElement", {
    get: function () {
        h_log("[v] window SVGAnimationElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimationElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedTransformList", {
    get: function () {
        h_log("[v] window SVGAnimatedTransformList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedTransformList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedString", {
    get: function () {
        h_log("[v] window SVGAnimatedString value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedString value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedRect", {
    get: function () {
        h_log("[v] window SVGAnimatedRect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedRect value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedPreserveAspectRatio", {
    get: function () {
        h_log("[v] window SVGAnimatedPreserveAspectRatio value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedPreserveAspectRatio value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedNumberList", {
    get: function () {
        h_log("[v] window SVGAnimatedNumberList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedNumberList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedNumber", {
    get: function () {
        h_log("[v] window SVGAnimatedNumber value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedNumber value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedLengthList", {
    get: function () {
        h_log("[v] window SVGAnimatedLengthList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedLengthList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedLength", {
    get: function () {
        h_log("[v] window SVGAnimatedLength value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedLength value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedInteger", {
    get: function () {
        h_log("[v] window SVGAnimatedInteger value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedInteger value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedEnumeration", {
    get: function () {
        h_log("[v] window SVGAnimatedEnumeration value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedEnumeration value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedBoolean", {
    get: function () {
        h_log("[v] window SVGAnimatedBoolean value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedBoolean value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimatedAngle", {
    get: function () {
        h_log("[v] window SVGAnimatedAngle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimatedAngle value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimateTransformElement", {
    get: function () {
        h_log("[v] window SVGAnimateTransformElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimateTransformElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimateMotionElement", {
    get: function () {
        h_log("[v] window SVGAnimateMotionElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimateMotionElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAnimateElement", {
    get: function () {
        h_log("[v] window SVGAnimateElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAnimateElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAngle", {
    get: function () {
        h_log("[v] window SVGAngle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAngle value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SVGAElement", {
    get: function () {
        h_log("[v] window SVGAElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SVGAElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Response", {
    get: function () {
        h_log("[v] window Response value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Response value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ResizeObserverSize", {
    get: function () {
        h_log("[v] window ResizeObserverSize value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ResizeObserverSize value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ResizeObserverEntry", {
    get: function () {
        h_log("[v] window ResizeObserverEntry value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ResizeObserverEntry value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ResizeObserver", {
    get: function () {
        h_log("[v] window ResizeObserver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ResizeObserver value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Request", {
    value: _Request, enumerable: false, configurable: true, writable: true
});
Object.defineProperty(window, "ReportingObserver", {
    get: function () {
        h_log("[v] window ReportingObserver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ReportingObserver value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ReadableStreamDefaultReader", {
    get: function () {
        h_log("[v] window ReadableStreamDefaultReader value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ReadableStreamDefaultReader value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ReadableStreamDefaultController", {
    get: function () {
        h_log("[v] window ReadableStreamDefaultController value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ReadableStreamDefaultController value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ReadableStreamBYOBRequest", {
    get: function () {
        h_log("[v] window ReadableStreamBYOBRequest value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ReadableStreamBYOBRequest value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ReadableStreamBYOBReader", {
    get: function () {
        h_log("[v] window ReadableStreamBYOBReader value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ReadableStreamBYOBReader value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ReadableStream", {
    get: function () {
        h_log("[v] window ReadableStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ReadableStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ReadableByteStreamController", {
    get: function () {
        h_log("[v] window ReadableByteStreamController value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ReadableByteStreamController value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Range", {
    get: function () {
        h_log("[v] window Range value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Range value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RadioNodeList", {
    get: function () {
        h_log("[v] window RadioNodeList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RadioNodeList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCTrackEvent", {
    get: function () {
        h_log("[v] window RTCTrackEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCTrackEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCStatsReport", {
    get: function () {
        h_log("[v] window RTCStatsReport value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCStatsReport value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCSessionDescription", {
    get: function () {
        h_log("[v] window RTCSessionDescription value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCSessionDescription value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCSctpTransport", {
    get: function () {
        h_log("[v] window RTCSctpTransport value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCSctpTransport value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCRtpTransceiver", {
    get: function () {
        h_log("[v] window RTCRtpTransceiver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCRtpTransceiver value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCRtpSender", {
    get: function () {
        h_log("[v] window RTCRtpSender value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCRtpSender value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCRtpReceiver", {
    get: function () {
        h_log("[v] window RTCRtpReceiver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCRtpReceiver value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCPeerConnectionIceEvent", {
    get: function () {
        h_log("[v] window RTCPeerConnectionIceEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCPeerConnectionIceEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCPeerConnectionIceErrorEvent", {
    get: function () {
        h_log("[v] window RTCPeerConnectionIceErrorEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCPeerConnectionIceErrorEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCPeerConnection", {
    get: function () {
        h_log("[v] window RTCPeerConnection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCPeerConnection value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCIceTransport", {
    get: function () {
        h_log("[v] window RTCIceTransport value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCIceTransport value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCIceCandidate", {
    get: function () {
        h_log("[v] window RTCIceCandidate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCIceCandidate value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCErrorEvent", {
    get: function () {
        h_log("[v] window RTCErrorEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCErrorEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCError", {
    get: function () {
        h_log("[v] window RTCError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCEncodedVideoFrame", {
    get: function () {
        h_log("[v] window RTCEncodedVideoFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCEncodedVideoFrame value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCEncodedAudioFrame", {
    get: function () {
        h_log("[v] window RTCEncodedAudioFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCEncodedAudioFrame value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCDtlsTransport", {
    get: function () {
        h_log("[v] window RTCDtlsTransport value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCDtlsTransport value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCDataChannelEvent", {
    get: function () {
        h_log("[v] window RTCDataChannelEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCDataChannelEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCDataChannel", {
    get: function () {
        h_log("[v] window RTCDataChannel value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCDataChannel value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCDTMFToneChangeEvent", {
    get: function () {
        h_log("[v] window RTCDTMFToneChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCDTMFToneChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCDTMFSender", {
    get: function () {
        h_log("[v] window RTCDTMFSender value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCDTMFSender value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RTCCertificate", {
    get: function () {
        h_log("[v] window RTCCertificate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RTCCertificate value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PromiseRejectionEvent", {
    get: function () {
        h_log("[v] window PromiseRejectionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PromiseRejectionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ProgressEvent", {
    get: function () {
        h_log("[v] window ProgressEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ProgressEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Profiler", {
    get: function () {
        h_log("[v] window Profiler value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Profiler value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ProcessingInstruction", {
    get: function () {
        h_log("[v] window ProcessingInstruction value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ProcessingInstruction value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PopStateEvent", {
    get: function () {
        h_log("[v] window PopStateEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PopStateEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PointerEvent", {
    get: function () {
        h_log("[v] window PointerEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PointerEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PluginArray", {
    get: function () {
        h_log("[v] window PluginArray value [get]", "arg:", arguments);
        return _PluginArray
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Plugin", {
    get: function () {
        h_log("[v] window Plugin value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Plugin value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PictureInPictureWindow", {
    get: function () {
        h_log("[v] window PictureInPictureWindow value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PictureInPictureWindow value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PictureInPictureEvent", {
    get: function () {
        h_log("[v] window PictureInPictureEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PictureInPictureEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PeriodicWave", {
    get: function () {
        h_log("[v] window PeriodicWave value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PeriodicWave value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceTiming", {
    get: function () {
        h_log("[v] window PerformanceTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceServerTiming", {
    get: function () {
        h_log("[v] window PerformanceServerTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceServerTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceResourceTiming", {
    get: function () {
        h_log("[v] window PerformanceResourceTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceResourceTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformancePaintTiming", {
    get: function () {
        h_log("[v] window PerformancePaintTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformancePaintTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceObserverEntryList", {
    get: function () {
        h_log("[v] window PerformanceObserverEntryList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceObserverEntryList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceObserver", {
    get: function () {
        h_log("[v] window PerformanceObserver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceObserver value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceNavigationTiming", {
    get: function () {
        h_log("[v] window PerformanceNavigationTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceNavigationTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceNavigation", {
    get: function () {
        h_log("[v] window PerformanceNavigation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceNavigation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceMeasure", {
    get: function () {
        h_log("[v] window PerformanceMeasure value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceMeasure value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceMark", {
    get: function () {
        h_log("[v] window PerformanceMark value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceMark value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceLongTaskTiming", {
    get: function () {
        h_log("[v] window PerformanceLongTaskTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceLongTaskTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceEventTiming", {
    get: function () {
        h_log("[v] window PerformanceEventTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceEventTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceEntry", {
    get: function () {
        h_log("[v] window PerformanceEntry value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceEntry value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PerformanceElementTiming", {
    get: function () {
        h_log("[v] window PerformanceElementTiming value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PerformanceElementTiming value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Performance", {
    get: function () {
        h_log("[v] window Performance value [get]", "arg:", arguments);
        return _Performance
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Path2D", {
    get: function () {
        h_log("[v] window Path2D value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Path2D value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PannerNode", {
    get: function () {
        h_log("[v] window PannerNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PannerNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PageTransitionEvent", {
    get: function () {
        h_log("[v] window PageTransitionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PageTransitionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "OverconstrainedError", {
    get: function () {
        h_log("[v] window OverconstrainedError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window OverconstrainedError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "OscillatorNode", {
    get: function () {
        h_log("[v] window OscillatorNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window OscillatorNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "OffscreenCanvasRenderingContext2D", {
    get: function () {
        h_log("[v] window OffscreenCanvasRenderingContext2D value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window OffscreenCanvasRenderingContext2D value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "OffscreenCanvas", {
    get: function () {
        h_log("[v] window OffscreenCanvas value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window OffscreenCanvas value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "OfflineAudioContext", {
    get: function () {
        h_log("[v] window OfflineAudioContext value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window OfflineAudioContext value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "OfflineAudioCompletionEvent", {
    get: function () {
        h_log("[v] window OfflineAudioCompletionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window OfflineAudioCompletionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NodeList", {
    get: function () {
        h_log("[v] window NodeList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NodeList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NodeIterator", {
    get: function () {
        h_log("[v] window NodeIterator value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NodeIterator value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NodeFilter", {
    get: function () {
        h_log("[v] window NodeFilter value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NodeFilter value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});

Object.defineProperty(window, "NetworkInformation", {
    get: function () {
        h_log("[v] window NetworkInformation value [get]", "arg:", arguments);
        return _NetworkInformation
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigationTransition", {
    get: function () {
        h_log("[v] window NavigationTransition value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NavigationTransition value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigationHistoryEntry", {
    get: function () {
        h_log("[v] window NavigationHistoryEntry value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NavigationHistoryEntry value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigationDestination", {
    get: function () {
        h_log("[v] window NavigationDestination value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NavigationDestination value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigationCurrentEntryChangeEvent", {
    get: function () {
        h_log("[v] window NavigationCurrentEntryChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NavigationCurrentEntryChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Navigation", {
    get: function () {
        h_log("[v] window Navigation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Navigation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigateEvent", {
    get: function () {
        h_log("[v] window NavigateEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NavigateEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NamedNodeMap", {
    get: function () {
        h_log("[v] window NamedNodeMap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NamedNodeMap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MutationRecord", {
    get: function () {
        h_log("[v] window MutationRecord value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MutationRecord value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});

let _MutationObserver = {};
_MutationObserver.__proto__ = {};
Object.defineProperty(_MutationObserver.__proto__, "disconnect", {
    get: function () {
        h_log("[v] _MutationObserver.__proto__ disconnect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _MutationObserver.__proto__ disconnect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_MutationObserver.__proto__, "observe", {
    get: function () {
        h_log("[v] _MutationObserver.__proto__ observe value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _MutationObserver.__proto__ observe value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_MutationObserver.__proto__, "takeRecords", {
    get: function () {
        h_log("[v] _MutationObserver.__proto__ takeRecords value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _MutationObserver.__proto__ takeRecords value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
MutationObserver = function () {
    h_log("_MutationObserver.__proto__ constructor value [call]", "arg:", arguments)
};
MutationObserver.prototype = _MutationObserver.__proto__;
Object.defineProperty(_MutationObserver.__proto__, "constructor", {
    value: MutationObserver,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_MutationObserver.__proto__, Symbol.toStringTag, {
    value: "MutationObserver",
    writable: false,
    enumerable: false,
    configurable: true,
});

Object.defineProperty(window, "MouseEvent", {
    get: function () {
        h_log("[v] window MouseEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MouseEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MimeTypeArray", {
    get: function () {
        h_log("[v] window MimeTypeArray value [get]", "arg:", arguments);
        return _MimeTypeArray
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MimeType", {
    get: function () {
        h_log("[v] window MimeType value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MimeType value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
// Object.defineProperty(window, "MessagePort", {
//     get: function () {
//         h_log("[v] window MessagePort value [get]", "arg:", arguments);
//         return function () {
//             h_log("[v] window MessagePort value [call]", "arg:", arguments)
//         }
//     }, enumerable: false, configurable: true
// });
Object.defineProperty(window, "MessageEvent", {
    get: function () {
        h_log("[v] window MessageEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MessageEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
// Object.defineProperty(window, "MessageChannel", {
//     get: function () {
//         h_log("[v] window MessageChannel value [get]", "arg:", arguments);
//         return function () {
//             h_log("[v] window MessageChannel value [call]", "arg:", arguments)
//         }
//     }, enumerable: false, configurable: true
// });
Object.defineProperty(window, "MediaStreamTrackVideoStats", {
    get: function () {
        h_log("[v] window MediaStreamTrackVideoStats value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStreamTrackVideoStats value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaStreamTrackProcessor", {
    get: function () {
        h_log("[v] window MediaStreamTrackProcessor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStreamTrackProcessor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaStreamTrackGenerator", {
    get: function () {
        h_log("[v] window MediaStreamTrackGenerator value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStreamTrackGenerator value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaStreamTrackEvent", {
    get: function () {
        h_log("[v] window MediaStreamTrackEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStreamTrackEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaStreamTrack", {
    get: function () {
        h_log("[v] window MediaStreamTrack value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStreamTrack value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaStreamEvent", {
    get: function () {
        h_log("[v] window MediaStreamEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStreamEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaStreamAudioSourceNode", {
    get: function () {
        h_log("[v] window MediaStreamAudioSourceNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStreamAudioSourceNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaStreamAudioDestinationNode", {
    get: function () {
        h_log("[v] window MediaStreamAudioDestinationNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStreamAudioDestinationNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaStream", {
    get: function () {
        h_log("[v] window MediaStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaSourceHandle", {
    get: function () {
        h_log("[v] window MediaSourceHandle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaSourceHandle value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaSource", {
    get: function () {
        h_log("[v] window MediaSource value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaSource value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaRecorder", {
    get: function () {
        h_log("[v] window MediaRecorder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaRecorder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaQueryListEvent", {
    get: function () {
        h_log("[v] window MediaQueryListEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaQueryListEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaQueryList", {
    get: function () {
        h_log("[v] window MediaQueryList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaQueryList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaList", {
    get: function () {
        h_log("[v] window MediaList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaError", {
    get: function () {
        h_log("[v] window MediaError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaEncryptedEvent", {
    get: function () {
        h_log("[v] window MediaEncryptedEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaEncryptedEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaElementAudioSourceNode", {
    get: function () {
        h_log("[v] window MediaElementAudioSourceNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaElementAudioSourceNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaCapabilities", {
    get: function () {
        h_log("[v] window MediaCapabilities value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaCapabilities value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MathMLElement", {
    get: function () {
        h_log("[v] window MathMLElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MathMLElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});

Object.defineProperty(window, "LayoutShiftAttribution", {
    get: function () {
        h_log("[v] window LayoutShiftAttribution value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window LayoutShiftAttribution value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "LayoutShift", {
    get: function () {
        h_log("[v] window LayoutShift value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window LayoutShift value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "LargestContentfulPaint", {
    get: function () {
        h_log("[v] window LargestContentfulPaint value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window LargestContentfulPaint value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "KeyframeEffect", {
    get: function () {
        h_log("[v] window KeyframeEffect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window KeyframeEffect value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "KeyboardEvent", {
    get: function () {
        h_log("[v] window KeyboardEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window KeyboardEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IntersectionObserverEntry", {
    get: function () {
        h_log("[v] window IntersectionObserverEntry value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IntersectionObserverEntry value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IntersectionObserver", {
    get: function () {
        h_log("[v] window IntersectionObserver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IntersectionObserver value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "InputEvent", {
    get: function () {
        h_log("[v] window InputEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window InputEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "InputDeviceInfo", {
    get: function () {
        h_log("[v] window InputDeviceInfo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window InputDeviceInfo value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "InputDeviceCapabilities", {
    get: function () {
        h_log("[v] window InputDeviceCapabilities value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window InputDeviceCapabilities value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ImageTrackList", {
    get: function () {
        h_log("[v] window ImageTrackList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ImageTrackList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ImageTrack", {
    get: function () {
        h_log("[v] window ImageTrack value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ImageTrack value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ImageData", {
    get: function () {
        h_log("[v] window ImageData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ImageData value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ImageCapture", {
    get: function () {
        h_log("[v] window ImageCapture value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ImageCapture value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ImageBitmapRenderingContext", {
    get: function () {
        h_log("[v] window ImageBitmapRenderingContext value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ImageBitmapRenderingContext value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ImageBitmap", {
    get: function () {
        h_log("[v] window ImageBitmap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ImageBitmap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IdleDeadline", {
    get: function () {
        h_log("[v] window IdleDeadline value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IdleDeadline value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IIRFilterNode", {
    get: function () {
        h_log("[v] window IIRFilterNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IIRFilterNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBVersionChangeEvent", {
    get: function () {
        h_log("[v] window IDBVersionChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBVersionChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBTransaction", {
    get: function () {
        h_log("[v] window IDBTransaction value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBTransaction value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBRequest", {
    get: function () {
        h_log("[v] window IDBRequest value [get]", "arg:", arguments);
        return _IDBRequest
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBOpenDBRequest", {
    get: function () {
        h_log("[v] window IDBOpenDBRequest value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBOpenDBRequest value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBObjectStore", {
    get: function () {
        h_log("[v] window IDBObjectStore value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBObjectStore value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBKeyRange", {
    get: function () {
        h_log("[v] window IDBKeyRange value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBKeyRange value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBIndex", {
    get: function () {
        h_log("[v] window IDBIndex value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBIndex value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBFactory", {
    get: function () {
        h_log("[v] window IDBFactory value [get]", "arg:", arguments);
        return _IDBFactory
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBDatabase", {
    get: function () {
        h_log("[v] window IDBDatabase value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBDatabase value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBCursorWithValue", {
    get: function () {
        h_log("[v] window IDBCursorWithValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBCursorWithValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IDBCursor", {
    get: function () {
        h_log("[v] window IDBCursor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IDBCursor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "History", {
    get: function () {
        h_log("[v] window History value [get]", "arg:", arguments);
        return _History
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Headers", {
    get: function () {
        h_log("[v] window Headers value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Headers value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HashChangeEvent", {
    get: function () {
        h_log("[v] window HashChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HashChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLVideoElement", {
    get: function () {
        h_log("[v] window HTMLVideoElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLVideoElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLUnknownElement", {
    get: function () {
        h_log("[v] window HTMLUnknownElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLUnknownElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLUListElement", {
    get: function () {
        h_log("[v] window HTMLUListElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLUListElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTrackElement", {
    get: function () {
        h_log("[v] window HTMLTrackElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTrackElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTitleElement", {
    get: function () {
        h_log("[v] window HTMLTitleElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTitleElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTimeElement", {
    get: function () {
        h_log("[v] window HTMLTimeElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTimeElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTextAreaElement", {
    get: function () {
        h_log("[v] window HTMLTextAreaElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTextAreaElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTemplateElement", {
    get: function () {
        h_log("[v] window HTMLTemplateElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTemplateElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTableSectionElement", {
    get: function () {
        h_log("[v] window HTMLTableSectionElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTableSectionElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTableRowElement", {
    get: function () {
        h_log("[v] window HTMLTableRowElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTableRowElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTableElement", {
    get: function () {
        h_log("[v] window HTMLTableElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTableElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTableColElement", {
    get: function () {
        h_log("[v] window HTMLTableColElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTableColElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTableCellElement", {
    get: function () {
        h_log("[v] window HTMLTableCellElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTableCellElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLTableCaptionElement", {
    get: function () {
        h_log("[v] window HTMLTableCaptionElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLTableCaptionElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLStyleElement", {
    get: function () {
        h_log("[v] window HTMLStyleElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLStyleElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLSpanElement", {
    get: function () {
        h_log("[v] window HTMLSpanElement value [get]", "arg:", arguments);
        return _HTMLSpanElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLSourceElement", {
    get: function () {
        h_log("[v] window HTMLSourceElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLSourceElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLSlotElement", {
    get: function () {
        h_log("[v] window HTMLSlotElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLSlotElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLSelectElement", {
    get: function () {
        h_log("[v] window HTMLSelectElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLSelectElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLQuoteElement", {
    get: function () {
        h_log("[v] window HTMLQuoteElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLQuoteElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLProgressElement", {
    get: function () {
        h_log("[v] window HTMLProgressElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLProgressElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLPreElement", {
    get: function () {
        h_log("[v] window HTMLPreElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLPreElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLPictureElement", {
    get: function () {
        h_log("[v] window HTMLPictureElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLPictureElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLParamElement", {
    get: function () {
        h_log("[v] window HTMLParamElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLParamElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLParagraphElement", {
    get: function () {
        h_log("[v] window HTMLParagraphElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLParagraphElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLOutputElement", {
    get: function () {
        h_log("[v] window HTMLOutputElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLOutputElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLOptionsCollection", {
    get: function () {
        h_log("[v] window HTMLOptionsCollection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLOptionsCollection value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLOptionElement", {
    get: function () {
        h_log("[v] window HTMLOptionElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLOptionElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLOptGroupElement", {
    get: function () {
        h_log("[v] window HTMLOptGroupElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLOptGroupElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLObjectElement", {
    get: function () {
        h_log("[v] window HTMLObjectElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLObjectElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLOListElement", {
    get: function () {
        h_log("[v] window HTMLOListElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLOListElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLModElement", {
    get: function () {
        h_log("[v] window HTMLModElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLModElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLMeterElement", {
    get: function () {
        h_log("[v] window HTMLMeterElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLMeterElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLMenuElement", {
    get: function () {
        h_log("[v] window HTMLMenuElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLMenuElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLMediaElement", {
    get: function () {
        h_log("[v] window HTMLMediaElement value [get]", "arg:", arguments);
        return _HTMLMediaElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLMarqueeElement", {
    get: function () {
        h_log("[v] window HTMLMarqueeElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLMarqueeElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLMapElement", {
    get: function () {
        h_log("[v] window HTMLMapElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLMapElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLLinkElement", {
    get: function () {
        h_log("[v] window HTMLLinkElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLLinkElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLLegendElement", {
    get: function () {
        h_log("[v] window HTMLLegendElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLLegendElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLLabelElement", {
    get: function () {
        h_log("[v] window HTMLLabelElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLLabelElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLLIElement", {
    get: function () {
        h_log("[v] window HTMLLIElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLLIElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLInputElement", {
    get: function () {
        h_log("[v] window HTMLInputElement value [get]", "arg:", arguments);
        return _HTMLInputElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLImageElement", {
    get: function () {
        h_log("[v] window HTMLImageElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLImageElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLIFrameElement", {
    get: function () {
        h_log("[v] window HTMLIFrameElement value [get]", "arg:", arguments);
        return _HTMLIFrameElement
    }, enumerable: false, configurable: true
});

Object.defineProperty(window, "HTMLHeadingElement", {
    get: function () {
        h_log("[v] window HTMLHeadingElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLHeadingElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLHRElement", {
    get: function () {
        h_log("[v] window HTMLHRElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLHRElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLFrameSetElement", {
    get: function () {
        h_log("[v] window HTMLFrameSetElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLFrameSetElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLFrameElement", {
    get: function () {
        h_log("[v] window HTMLFrameElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLFrameElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLFormElement", {
    get: function () {
        h_log("[v] window HTMLFormElement value [get]", "arg:", arguments);
        return _HTMLFormElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLFormControlsCollection", {
    get: function () {
        h_log("[v] window HTMLFormControlsCollection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLFormControlsCollection value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLFontElement", {
    get: function () {
        h_log("[v] window HTMLFontElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLFontElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLFieldSetElement", {
    get: function () {
        h_log("[v] window HTMLFieldSetElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLFieldSetElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLEmbedElement", {
    get: function () {
        h_log("[v] window HTMLEmbedElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLEmbedElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLDocument", {
    get: function () {
        h_log("[v] window HTMLDocument value [get]", "arg:", arguments);
        return _HTMLDocument
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLDirectoryElement", {
    get: function () {
        h_log("[v] window HTMLDirectoryElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLDirectoryElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLDialogElement", {
    get: function () {
        h_log("[v] window HTMLDialogElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLDialogElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLDetailsElement", {
    get: function () {
        h_log("[v] window HTMLDetailsElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLDetailsElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLDataListElement", {
    get: function () {
        h_log("[v] window HTMLDataListElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLDataListElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLDataElement", {
    get: function () {
        h_log("[v] window HTMLDataElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLDataElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLDListElement", {
    get: function () {
        h_log("[v] window HTMLDListElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLDListElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLCollection", {
    get: function () {
        h_log("[v] window HTMLCollection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLCollection value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLCanvasElement", {
    get: function () {
        h_log("[v] window HTMLCanvasElement value [get]", "arg:", arguments);
        return _HTMLCanvasElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLButtonElement", {
    get: function () {
        h_log("[v] window HTMLButtonElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLButtonElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLBaseElement", {
    get: function () {
        h_log("[v] window HTMLBaseElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLBaseElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLBRElement", {
    get: function () {
        h_log("[v] window HTMLBRElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLBRElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLAudioElement", {
    get: function () {
        h_log("[v] window HTMLAudioElement value [get]", "arg:", arguments);
        return _HTMLAudioElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLAreaElement", {
    get: function () {
        h_log("[v] window HTMLAreaElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLAreaElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLAllCollection", {
    get: function () {
        h_log("[v] window HTMLAllCollection value [get]", "arg:", arguments);
        return _HTMLAllCollection
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GeolocationPositionError", {
    get: function () {
        h_log("[v] window GeolocationPositionError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GeolocationPositionError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GeolocationPosition", {
    get: function () {
        h_log("[v] window GeolocationPosition value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GeolocationPosition value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GeolocationCoordinates", {
    get: function () {
        h_log("[v] window GeolocationCoordinates value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GeolocationCoordinates value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Geolocation", {
    get: function () {
        h_log("[v] window Geolocation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Geolocation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GamepadHapticActuator", {
    get: function () {
        h_log("[v] window GamepadHapticActuator value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GamepadHapticActuator value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GamepadEvent", {
    get: function () {
        h_log("[v] window GamepadEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GamepadEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GamepadButton", {
    get: function () {
        h_log("[v] window GamepadButton value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GamepadButton value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Gamepad", {
    get: function () {
        h_log("[v] window Gamepad value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Gamepad value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GainNode", {
    get: function () {
        h_log("[v] window GainNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GainNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FormDataEvent", {
    get: function () {
        h_log("[v] window FormDataEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FormDataEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FormData", {
    get: function () {
        h_log("[v] window FormData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FormData value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FontFaceSetLoadEvent", {
    get: function () {
        h_log("[v] window FontFaceSetLoadEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FontFaceSetLoadEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FontFace", {
    get: function () {
        h_log("[v] window FontFace value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FontFace value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FocusEvent", {
    get: function () {
        h_log("[v] window FocusEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FocusEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FileReader", {
    get: function () {
        h_log("[v] window FileReader value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FileReader value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FileList", {
    get: function () {
        h_log("[v] window FileList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FileList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "File", {
    get: function () {
        h_log("[v] window File value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window File value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FeaturePolicy", {
    get: function () {
        h_log("[v] window FeaturePolicy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FeaturePolicy value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "EventSource", {
    get: function () {
        h_log("[v] window EventSource value [get]", "arg:", arguments);
        return _EventSource
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "EventCounts", {
    get: function () {
        h_log("[v] window EventCounts value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window EventCounts value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Event", {
    get: function () {
        h_log("[v] window Event value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Event value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ErrorEvent", {
    get: function () {
        h_log("[v] window ErrorEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ErrorEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "EncodedVideoChunk", {
    get: function () {
        h_log("[v] window EncodedVideoChunk value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window EncodedVideoChunk value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "EncodedAudioChunk", {
    get: function () {
        h_log("[v] window EncodedAudioChunk value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window EncodedAudioChunk value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ElementInternals", {
    get: function () {
        h_log("[v] window ElementInternals value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ElementInternals value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLAnchorElement", {
    get: function () {
        h_log("[v] window HTMLAnchorElement value [get]", "arg:", arguments);
        return _HTMLAnchorElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLBodyElement", {
    get: function () {
        h_log("[v] window HTMLBodyElement value [get]", "arg:", arguments);
        return _HTMLBodyElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLDivElement", {
    get: function () {
        h_log("[v] window HTMLDivElement value [get]", "arg:", arguments);
        return _HTMLDivElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLHeadElement", {
    get: function () {
        h_log("[v] window HTMLHeadElement value [get]", "arg:", arguments);
        return _HTMLHeadElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLHtmlElement", {
    get: function () {
        h_log("[v] window HTMLHtmlElement value [get]", "arg:", arguments);
        return _HTMLHtmlElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLMetaElement", {
    get: function () {
        h_log("[v] window _HTMLMetaElement value [get]", "arg:", arguments);
        return _HTMLMetaElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLScriptElement", {
    get: function () {
        h_log("[v] window _HTMLScriptElement value [get]", "arg:", arguments);
        return _HTMLScriptElement
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DynamicsCompressorNode", {
    get: function () {
        h_log("[v] window DynamicsCompressorNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DynamicsCompressorNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DragEvent", {
    get: function () {
        h_log("[v] window DragEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DragEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DocumentType", {
    get: function () {
        h_log("[v] window DocumentType value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DocumentType value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DocumentFragment", {
    get: function () {
        h_log("[v] window DocumentFragment value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DocumentFragment value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Document", {
    get: function () {
        h_log("[v] window Document value [get]", "arg:", arguments);
        return _Document
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DelayNode", {
    get: function () {
        h_log("[v] window DelayNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DelayNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DecompressionStream", {
    get: function () {
        h_log("[v] window DecompressionStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DecompressionStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DataTransferItemList", {
    get: function () {
        h_log("[v] window DataTransferItemList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DataTransferItemList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DataTransferItem", {
    get: function () {
        h_log("[v] window DataTransferItem value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DataTransferItem value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DataTransfer", {
    get: function () {
        h_log("[v] window DataTransfer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DataTransfer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMTokenList", {
    get: function () {
        h_log("[v] window DOMTokenList value [get]", "arg:", arguments);
        return _DOMTokenList
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMStringMap", {
    get: function () {
        h_log("[v] window DOMStringMap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMStringMap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMStringList", {
    get: function () {
        h_log("[v] window DOMStringList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMStringList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMRectReadOnly", {
    get: function () {
        h_log("[v] window DOMRectReadOnly value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMRectReadOnly value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMRectList", {
    get: function () {
        h_log("[v] window DOMRectList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMRectList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMRect", {
    get: function () {
        h_log("[v] window DOMRect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMRect value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMQuad", {
    get: function () {
        h_log("[v] window DOMQuad value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMQuad value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMPointReadOnly", {
    get: function () {
        h_log("[v] window DOMPointReadOnly value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMPointReadOnly value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMPoint", {
    get: function () {
        h_log("[v] window DOMPoint value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMPoint value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMParser", {
    get: function () {
        h_log("[v] window DOMParser value [get]", "arg:", arguments);
        return _DOMParser
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMMatrixReadOnly", {
    get: function () {
        h_log("[v] window DOMMatrixReadOnly value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMMatrixReadOnly value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMMatrix", {
    get: function () {
        h_log("[v] window DOMMatrix value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMMatrix value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMImplementation", {
    get: function () {
        h_log("[v] window DOMImplementation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMImplementation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMException", {
    get: function () {
        h_log("[v] window DOMException value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMException value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DOMError", {
    get: function () {
        h_log("[v] window DOMError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DOMError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CustomStateSet", {
    get: function () {
        h_log("[v] window CustomStateSet value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CustomStateSet value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CustomEvent", {
    get: function () {
        h_log("[v] window CustomEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CustomEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CustomElementRegistry", {
    get: function () {
        h_log("[v] window CustomElementRegistry value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CustomElementRegistry value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Crypto", {
    get: function () {
        h_log("[v] window Crypto value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Crypto value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CountQueuingStrategy", {
    get: function () {
        h_log("[v] window CountQueuingStrategy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CountQueuingStrategy value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ConvolverNode", {
    get: function () {
        h_log("[v] window ConvolverNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ConvolverNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ConstantSourceNode", {
    get: function () {
        h_log("[v] window ConstantSourceNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ConstantSourceNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CompressionStream", {
    get: function () {
        h_log("[v] window CompressionStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CompressionStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CompositionEvent", {
    get: function () {
        h_log("[v] window CompositionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CompositionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Comment", {
    get: function () {
        h_log("[v] window Comment value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Comment value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CloseEvent", {
    get: function () {
        h_log("[v] window CloseEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CloseEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ClipboardEvent", {
    get: function () {
        h_log("[v] window ClipboardEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ClipboardEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CharacterData", {
    get: function () {
        h_log("[v] window CharacterData value [get]", "arg:", arguments);
        return _CharacterData
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ChannelSplitterNode", {
    get: function () {
        h_log("[v] window ChannelSplitterNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ChannelSplitterNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ChannelMergerNode", {
    get: function () {
        h_log("[v] window ChannelMergerNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ChannelMergerNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CanvasRenderingContext2D", {
    get: function () {
        h_log("[v] window CanvasRenderingContext2D value [get]", "arg:", arguments);
        return _CanvasRenderingContext2D
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CanvasPattern", {
    get: function () {
        h_log("[v] window CanvasPattern value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CanvasPattern value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CanvasGradient", {
    get: function () {
        h_log("[v] window CanvasGradient value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CanvasGradient value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CanvasCaptureMediaStreamTrack", {
    get: function () {
        h_log("[v] window CanvasCaptureMediaStreamTrack value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CanvasCaptureMediaStreamTrack value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSVariableReferenceValue", {
    get: function () {
        h_log("[v] window CSSVariableReferenceValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSVariableReferenceValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSUnparsedValue", {
    get: function () {
        h_log("[v] window CSSUnparsedValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSUnparsedValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSUnitValue", {
    get: function () {
        h_log("[v] window CSSUnitValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSUnitValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSTranslate", {
    get: function () {
        h_log("[v] window CSSTranslate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSTranslate value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSTransformValue", {
    get: function () {
        h_log("[v] window CSSTransformValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSTransformValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSTransformComponent", {
    get: function () {
        h_log("[v] window CSSTransformComponent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSTransformComponent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSSupportsRule", {
    get: function () {
        h_log("[v] window CSSSupportsRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSSupportsRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSStyleValue", {
    get: function () {
        h_log("[v] window CSSStyleValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSStyleValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSStyleSheet", {
    get: function () {
        h_log("[v] window CSSStyleSheet value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSStyleSheet value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSStyleRule", {
    get: function () {
        h_log("[v] window CSSStyleRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSStyleRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSStyleDeclaration", {
    get: function () {
        h_log("[v] window CSSStyleDeclaration value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSStyleDeclaration value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSSkewY", {
    get: function () {
        h_log("[v] window CSSSkewY value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSSkewY value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSSkewX", {
    get: function () {
        h_log("[v] window CSSSkewX value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSSkewX value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSSkew", {
    get: function () {
        h_log("[v] window CSSSkew value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSSkew value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSScale", {
    get: function () {
        h_log("[v] window CSSScale value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSScale value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSRuleList", {
    get: function () {
        h_log("[v] window CSSRuleList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSRuleList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSRule", {
    get: function () {
        h_log("[v] window CSSRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSRule value [call]", "arg:", arguments)
            if (arguments.length === 0) {
                if (new.target) {
                    throw new TypeError("Failed to construct 'CSSRule': Illegal constructor");
                } else {
                    throw new TypeError("Illegal constructor");
                }
            }
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSRotate", {
    get: function () {
        h_log("[v] window CSSRotate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSRotate value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSPropertyRule", {
    get: function () {
        h_log("[v] window CSSPropertyRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSPropertyRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSPositionValue", {
    get: function () {
        h_log("[v] window CSSPositionValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSPositionValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSPerspective", {
    get: function () {
        h_log("[v] window CSSPerspective value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSPerspective value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSPageRule", {
    get: function () {
        h_log("[v] window CSSPageRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSPageRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSNumericValue", {
    get: function () {
        h_log("[v] window CSSNumericValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSNumericValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSNumericArray", {
    get: function () {
        h_log("[v] window CSSNumericArray value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSNumericArray value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSNamespaceRule", {
    get: function () {
        h_log("[v] window CSSNamespaceRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSNamespaceRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMediaRule", {
    get: function () {
        h_log("[v] window CSSMediaRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMediaRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMatrixComponent", {
    get: function () {
        h_log("[v] window CSSMatrixComponent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMatrixComponent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMathValue", {
    get: function () {
        h_log("[v] window CSSMathValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMathValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMathSum", {
    get: function () {
        h_log("[v] window CSSMathSum value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMathSum value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMathProduct", {
    get: function () {
        h_log("[v] window CSSMathProduct value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMathProduct value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMathNegate", {
    get: function () {
        h_log("[v] window CSSMathNegate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMathNegate value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMathMin", {
    get: function () {
        h_log("[v] window CSSMathMin value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMathMin value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMathMax", {
    get: function () {
        h_log("[v] window CSSMathMax value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMathMax value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMathInvert", {
    get: function () {
        h_log("[v] window CSSMathInvert value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMathInvert value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSMathClamp", {
    get: function () {
        h_log("[v] window CSSMathClamp value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSMathClamp value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSLayerStatementRule", {
    get: function () {
        h_log("[v] window CSSLayerStatementRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSLayerStatementRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSLayerBlockRule", {
    get: function () {
        h_log("[v] window CSSLayerBlockRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSLayerBlockRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSKeywordValue", {
    get: function () {
        h_log("[v] window CSSKeywordValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSKeywordValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSKeyframesRule", {
    get: function () {
        h_log("[v] window CSSKeyframesRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSKeyframesRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSKeyframeRule", {
    get: function () {
        h_log("[v] window CSSKeyframeRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSKeyframeRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSImportRule", {
    get: function () {
        h_log("[v] window CSSImportRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSImportRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSImageValue", {
    get: function () {
        h_log("[v] window CSSImageValue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSImageValue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSGroupingRule", {
    get: function () {
        h_log("[v] window CSSGroupingRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSGroupingRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSFontPaletteValuesRule", {
    get: function () {
        h_log("[v] window CSSFontPaletteValuesRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSFontPaletteValuesRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSFontFaceRule", {
    get: function () {
        h_log("[v] window CSSFontFaceRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSFontFaceRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSCounterStyleRule", {
    get: function () {
        h_log("[v] window CSSCounterStyleRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSCounterStyleRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSContainerRule", {
    get: function () {
        h_log("[v] window CSSContainerRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSContainerRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSConditionRule", {
    get: function () {
        h_log("[v] window CSSConditionRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSConditionRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSS", {value: {}, writable: true, enumerable: false, configurable: true,});
Object.defineProperty(window, "CDATASection", {
    get: function () {
        h_log("[v] window CDATASection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CDATASection value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ByteLengthQueuingStrategy", {
    get: function () {
        h_log("[v] window ByteLengthQueuingStrategy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ByteLengthQueuingStrategy value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BroadcastChannel", {
    get: function () {
        h_log("[v] window BroadcastChannel value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BroadcastChannel value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BlobEvent", {
    get: function () {
        h_log("[v] window BlobEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BlobEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Blob", {
    get: function () {
        h_log("[v] window Blob value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Blob value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BiquadFilterNode", {
    get: function () {
        h_log("[v] window BiquadFilterNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BiquadFilterNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BeforeUnloadEvent", {
    get: function () {
        h_log("[v] window BeforeUnloadEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BeforeUnloadEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BeforeInstallPromptEvent", {
    get: function () {
        h_log("[v] window BeforeInstallPromptEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BeforeInstallPromptEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BaseAudioContext", {
    get: function () {
        h_log("[v] window BaseAudioContext value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BaseAudioContext value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BarProp", {
    get: function () {
        h_log("[v] window BarProp value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BarProp value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioWorkletNode", {
    get: function () {
        h_log("[v] window AudioWorkletNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioWorkletNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioSinkInfo", {
    get: function () {
        h_log("[v] window AudioSinkInfo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioSinkInfo value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioScheduledSourceNode", {
    get: function () {
        h_log("[v] window AudioScheduledSourceNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioScheduledSourceNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioProcessingEvent", {
    get: function () {
        h_log("[v] window AudioProcessingEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioProcessingEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioParamMap", {
    get: function () {
        h_log("[v] window AudioParamMap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioParamMap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioParam", {
    get: function () {
        h_log("[v] window AudioParam value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioParam value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioNode", {
    get: function () {
        h_log("[v] window AudioNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioListener", {
    get: function () {
        h_log("[v] window AudioListener value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioListener value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioDestinationNode", {
    get: function () {
        h_log("[v] window AudioDestinationNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioDestinationNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioData", {
    get: function () {
        h_log("[v] window AudioData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioData value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioContext", {
    get: function () {
        h_log("[v] window AudioContext value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioContext value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioBufferSourceNode", {
    get: function () {
        h_log("[v] window AudioBufferSourceNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioBufferSourceNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioBuffer", {
    get: function () {
        h_log("[v] window AudioBuffer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioBuffer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Attr", {
    get: function () {
        h_log("[v] window Attr value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Attr value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AnimationEvent", {
    get: function () {
        h_log("[v] window AnimationEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AnimationEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AnimationEffect", {
    get: function () {
        h_log("[v] window AnimationEffect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AnimationEffect value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Animation", {
    get: function () {
        h_log("[v] window Animation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Animation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AnalyserNode", {
    get: function () {
        h_log("[v] window AnalyserNode value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AnalyserNode value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AbstractRange", {
    get: function () {
        h_log("[v] window AbstractRange value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AbstractRange value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AbortSignal", {
    get: function () {
        h_log("[v] window AbortSignal value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AbortSignal value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AbortController", {
    get: function () {
        h_log("[v] window AbortController value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AbortController value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
window.window = window;
Object.defineProperty(window, "self", {
    get: function () {
        h_log("window self get [call]", "arg:", arguments)
        return globalThis
    }, set: function () {
        h_log("window self set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "document", {
    get: function () {
        h_log("window document get [call]", "arg:", arguments)
        return _document
    }, set: undefined, enumerable: true, configurable: false,
});
let window_name = ""
Object.defineProperty(window, "name", {
    get: function () {
        h_log("window name get [call]", "arg:", arguments, "result:", window_name)
        return window_name
    }, set: function () {
        h_log("window name set [call]", "arg:", arguments)
        window_name = arguments[0]
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "location", {
    get: function () {
        h_log("window location get [call]", "arg:", arguments)
        return _location
    }, set: function () {
        h_log("window location set [call]", "arg:", arguments)
    }, enumerable: true, configurable: false,
});
Object.defineProperty(window, "customElements", {
    get: function () {
        h_log("window customElements get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "history", {
    get: function () {
        h_log("window history get [call]", "arg:", arguments)
        return _history
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "navigation", {
    get: function () {
        h_log("window navigation get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window navigation set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "locationbar", {
    get: function () {
        h_log("window locationbar get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window locationbar set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "menubar", {
    get: function () {
        h_log("window menubar get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window menubar set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "personalbar", {
    get: function () {
        h_log("window personalbar get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window personalbar set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "scrollbars", {
    get: function () {
        h_log("window scrollbars get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window scrollbars set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "statusbar", {
    get: function () {
        h_log("window statusbar get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window statusbar set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "toolbar", {
    get: function () {
        h_log("window toolbar get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window toolbar set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "status", {
    get: function () {
        h_log("window status get [call]", "arg:", arguments)
        return ''
    }, set: function () {
        h_log("window status set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "closed", {
    get: function () {
        h_log("window closed get [call]", "arg:", arguments)
        return false
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "frames", {
    get: function () {
        h_log("window frames get [call]", "arg:", arguments)
        return globalThis
    }, set: function () {
        h_log("window frames set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "length", {
    get: function () {
        h_log("window length get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window length set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "top", {
    get: function () {
        h_log("window top get [call]", "arg:", arguments)
        if (config_LOCATION.href === "about:blank"){
            return window_top
        }
        return window
    }, set: undefined, enumerable: true, configurable: false,
});
Object.defineProperty(window, "opener", {
    get: function () {
        h_log("window opener get [call]", "arg:", arguments)
        return null
    }, set: function () {
        h_log("window opener set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "parent", {
    get: function () {
        h_log("window parent get [call]", "arg:", arguments)
        if (config_LOCATION.href === "about:blank"){
            return window_top
        }
        return globalThis
    }, set: function () {
        h_log("window parent set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "frameElement", {
    get: function () {
        h_log("window frameElement get [call]", "arg:", arguments)
        return null
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "navigator", {
    get: function () {
        h_log("window navigator get [call]", "arg:", arguments)
        return _navigator
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "origin", {
    get: function () {
        h_log("window origin get [call]", "arg:", arguments)
        return config_LOCATION.origin
    }, set: function () {
        h_log("window origin set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
let _external = {};
_external.__proto__ = {};
Object.defineProperty(_external.__proto__, "AddSearchProvider", {
    get: function () {
        h_log("[v] _external.__proto__ AddSearchProvider value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _external.__proto__ AddSearchProvider value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_external.__proto__, "IsSearchProviderInstalled", {
    get: function () {
        h_log("[v] _external.__proto__ IsSearchProviderInstalled value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _external.__proto__ IsSearchProviderInstalled value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
External = function () {
    h_log("_external.__proto__ constructor value [call]", "arg:", arguments)
};
External.prototype = _external.__proto__;
Object.defineProperty(_external.__proto__, "constructor", {
    value: External,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_external.__proto__, Symbol.toStringTag, {
    value: "External",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(window, "external", {
    get: function () {
        h_log("window external get [call]", "arg:", arguments)
        return _external
    }, set: function () {
        h_log("window external set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "screen", {
    get: function () {
        h_log("window screen get [call]", "arg:", arguments)
        return _screen
    }, set: function () {
        h_log("window screen set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "innerWidth", {
    get: function () {
        h_log("window innerWidth get [call]", "arg:", arguments)
        return 1536
    }, set: function () {
        h_log("window innerWidth set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "innerHeight", {
    get: function () {
        h_log("window innerHeight get [call]", "arg:", arguments)
        return 695
    }, set: function () {
        h_log("window innerHeight set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "scrollX", {
    get: function () {
        h_log("window scrollX get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window scrollX set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "pageXOffset", {
    get: function () {
        h_log("window pageXOffset get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window pageXOffset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "scrollY", {
    get: function () {
        h_log("window scrollY get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window scrollY set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "pageYOffset", {
    get: function () {
        h_log("window pageYOffset get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window pageYOffset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "visualViewport", {
    get: function () {
        h_log("window visualViewport get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window visualViewport set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "screenX", {
    get: function () {
        h_log("window screenX get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window screenX set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "screenY", {
    get: function () {
        h_log("window screenY get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window screenY set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "outerWidth", {
    get: function () {
        h_log("window outerWidth get [call]", "arg:", arguments)
        return 1536
    }, set: function () {
        h_log("window outerWidth set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "outerHeight", {
    get: function () {
        h_log("window outerHeight get [call]", "arg:", arguments)
        return 816
    }, set: function () {
        h_log("window outerHeight set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "devicePixelRatio", {
    get: function () {
        h_log("window devicePixelRatio get [call]", "arg:", arguments)
        return 1.25
    }, set: function () {
        h_log("window devicePixelRatio set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "event", {
    get: function () {
        h_log("window event get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window event set [call]", "arg:", arguments)
    }, enumerable: false, configurable: true,
});
Object.defineProperty(window, "clientInformation", {
    get: function () {
        h_log("window clientInformation get [call]", "arg:", arguments)
        return _navigator
    }, set: function () {
        h_log("window clientInformation set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "offscreenBuffering", {
    get: function () {
        h_log("window offscreenBuffering get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window offscreenBuffering set [call]", "arg:", arguments)
    }, enumerable: false, configurable: true,
});
Object.defineProperty(window, "screenLeft", {
    get: function () {
        h_log("window screenLeft get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window screenLeft set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "screenTop", {
    get: function () {
        h_log("window screenTop get [call]", "arg:", arguments)
        return 0
    }, set: function () {
        h_log("window screenTop set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "styleMedia", {
    get: function () {
        h_log("window styleMedia get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onsearch", {
    get: function () {
        h_log("window onsearch get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onsearch set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "isSecureContext", {
    get: function () {
        h_log("window isSecureContext get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "trustedTypes", {
    get: function () {
        h_log("window trustedTypes get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "performance", {
    get: function () {
        h_log("window performance get [call]", "arg:", arguments)
        return _performance
    }, set: function () {
        h_log("window performance set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onappinstalled", {
    get: function () {
        h_log("window onappinstalled get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onappinstalled set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onbeforeinstallprompt", {
    get: function () {
        h_log("window onbeforeinstallprompt get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onbeforeinstallprompt set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "crypto", {
    get: function () {
        h_log("window crypto get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "indexedDB", {
    get: function () {
        h_log("window indexedDB get [call]", "arg:", arguments)
        return _indexedDB
    }, set: undefined, enumerable: true, configurable: true,
});
sessionStorage = {
    getItem: function (a) {
        h_log("sessionStorage getItem", arguments)
        return this[a] || null
    },
    setItem: function (a, b) {
        h_log("sessionStorage setItem", arguments)
        return this[a] = b
    },
    removeItem: function (a) {
        h_log("sessionStorage removeItem", arguments)
        delete this[a]
    }
}
window.sessionStorage = sessionStorage

localStorage = {
    getItem: function (a) {
        h_log("localStorage getItem", arguments);
        return this[a] || null
    },
    setItem: function (a, b) {
        h_log("localStorage setItem", arguments);
        return this[a] = b
    },
    removeItem: function (a) {
        h_log("localStorage removeItem", arguments);
        delete this[a]
    },
    "xmst":"Ryrpp6RG3CiMFbEzrx9ynTmuEaToVqZ6bWNTKlwW42Es5dmxCFfbeoKui9xcThfnizZN0V-Eb0X3X3d27YZ6aA1BwLqLmnxz4ZTbzMomgAHaqsEyu-8B9kVutaDqe3KXIHeEuuMNjRrAsqS_A2afdeUWJe_uXRC2YRjGvC4Gbb9iGw=="
}
window.localStorage = localStorage

Object.defineProperty(window, "onbeforexrselect", {
    get: function () {
        h_log("window onbeforexrselect get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onbeforexrselect set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onabort", {
    get: function () {
        h_log("window onabort get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onabort set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onbeforeinput", {
    get: function () {
        h_log("window onbeforeinput get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onbeforeinput set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onbeforetoggle", {
    get: function () {
        h_log("window onbeforetoggle get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onbeforetoggle set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onblur", {
    get: function () {
        h_log("window onblur get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onblur set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oncancel", {
    get: function () {
        h_log("window oncancel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oncancel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oncanplay", {
    get: function () {
        h_log("window oncanplay get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oncanplay set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oncanplaythrough", {
    get: function () {
        h_log("window oncanplaythrough get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oncanplaythrough set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onchange", {
    get: function () {
        h_log("window onchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onclick", {
    get: function () {
        h_log("window onclick get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onclick set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onclose", {
    get: function () {
        h_log("window onclose get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onclose set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oncontextlost", {
    get: function () {
        h_log("window oncontextlost get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oncontextlost set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oncontextmenu", {
    get: function () {
        h_log("window oncontextmenu get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oncontextmenu set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oncontextrestored", {
    get: function () {
        h_log("window oncontextrestored get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oncontextrestored set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oncuechange", {
    get: function () {
        h_log("window oncuechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oncuechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondblclick", {
    get: function () {
        h_log("window ondblclick get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondblclick set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondrag", {
    get: function () {
        h_log("window ondrag get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondrag set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondragend", {
    get: function () {
        h_log("window ondragend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondragend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondragenter", {
    get: function () {
        h_log("window ondragenter get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondragenter set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondragleave", {
    get: function () {
        h_log("window ondragleave get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondragleave set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondragover", {
    get: function () {
        h_log("window ondragover get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondragover set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondragstart", {
    get: function () {
        h_log("window ondragstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondragstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondrop", {
    get: function () {
        h_log("window ondrop get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondrop set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondurationchange", {
    get: function () {
        h_log("window ondurationchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondurationchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onemptied", {
    get: function () {
        h_log("window onemptied get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onemptied set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onended", {
    get: function () {
        h_log("window onended get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onended set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onerror", {
    get: function () {
        h_log("window onerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onfocus", {
    get: function () {
        h_log("window onfocus get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onfocus set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onformdata", {
    get: function () {
        h_log("window onformdata get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onformdata set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oninput", {
    get: function () {
        h_log("window oninput get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oninput set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oninvalid", {
    get: function () {
        h_log("window oninvalid get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window oninvalid set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onkeydown", {
    get: function () {
        h_log("window onkeydown get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onkeydown set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onkeypress", {
    get: function () {
        h_log("window onkeypress get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onkeypress set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onkeyup", {
    get: function () {
        h_log("window onkeyup get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onkeyup set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onload", {
    get: function () {
        h_log("window onload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onloadeddata", {
    get: function () {
        h_log("window onloadeddata get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onloadeddata set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onloadedmetadata", {
    get: function () {
        h_log("window onloadedmetadata get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onloadedmetadata set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onloadstart", {
    get: function () {
        h_log("window onloadstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onloadstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmousedown", {
    get: function () {
        h_log("window onmousedown get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmousedown set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmouseenter", {
    get: function () {
        h_log("window onmouseenter get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmouseenter set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmouseleave", {
    get: function () {
        h_log("window onmouseleave get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmouseleave set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmousemove", {
    get: function () {
        h_log("window onmousemove get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmousemove set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmouseout", {
    get: function () {
        h_log("window onmouseout get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmouseout set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmouseover", {
    get: function () {
        h_log("window onmouseover get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmouseover set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmouseup", {
    get: function () {
        h_log("window onmouseup get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmouseup set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmousewheel", {
    get: function () {
        h_log("window onmousewheel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmousewheel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpause", {
    get: function () {
        h_log("window onpause get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpause set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onplay", {
    get: function () {
        h_log("window onplay get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onplay set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onplaying", {
    get: function () {
        h_log("window onplaying get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onplaying set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onprogress", {
    get: function () {
        h_log("window onprogress get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onprogress set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onratechange", {
    get: function () {
        h_log("window onratechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onratechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onreset", {
    get: function () {
        h_log("window onreset get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onreset set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onresize", {
    get: function () {
        h_log("window onresize get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onresize set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onscroll", {
    get: function () {
        h_log("window onscroll get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onscroll set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onsecuritypolicyviolation", {
    get: function () {
        h_log("window onsecuritypolicyviolation get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onsecuritypolicyviolation set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onseeked", {
    get: function () {
        h_log("window onseeked get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onseeked set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onseeking", {
    get: function () {
        h_log("window onseeking get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onseeking set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onselect", {
    get: function () {
        h_log("window onselect get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onselect set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onslotchange", {
    get: function () {
        h_log("window onslotchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onslotchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onstalled", {
    get: function () {
        h_log("window onstalled get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onstalled set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onsubmit", {
    get: function () {
        h_log("window onsubmit get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onsubmit set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onsuspend", {
    get: function () {
        h_log("window onsuspend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onsuspend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ontimeupdate", {
    get: function () {
        h_log("window ontimeupdate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ontimeupdate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ontoggle", {
    get: function () {
        h_log("window ontoggle get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ontoggle set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onvolumechange", {
    get: function () {
        h_log("window onvolumechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onvolumechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onwaiting", {
    get: function () {
        h_log("window onwaiting get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onwaiting set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onwebkitanimationend", {
    get: function () {
        h_log("window onwebkitanimationend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onwebkitanimationend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onwebkitanimationiteration", {
    get: function () {
        h_log("window onwebkitanimationiteration get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onwebkitanimationiteration set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onwebkitanimationstart", {
    get: function () {
        h_log("window onwebkitanimationstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onwebkitanimationstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onwebkittransitionend", {
    get: function () {
        h_log("window onwebkittransitionend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onwebkittransitionend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onwheel", {
    get: function () {
        h_log("window onwheel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onwheel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onauxclick", {
    get: function () {
        h_log("window onauxclick get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onauxclick set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ongotpointercapture", {
    get: function () {
        h_log("window ongotpointercapture get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ongotpointercapture set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onlostpointercapture", {
    get: function () {
        h_log("window onlostpointercapture get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onlostpointercapture set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointerdown", {
    get: function () {
        h_log("window onpointerdown get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointerdown set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointermove", {
    get: function () {
        h_log("window onpointermove get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointermove set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointerrawupdate", {
    get: function () {
        h_log("window onpointerrawupdate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointerrawupdate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointerup", {
    get: function () {
        h_log("window onpointerup get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointerup set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointercancel", {
    get: function () {
        h_log("window onpointercancel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointercancel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointerover", {
    get: function () {
        h_log("window onpointerover get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointerover set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointerout", {
    get: function () {
        h_log("window onpointerout get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointerout set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointerenter", {
    get: function () {
        h_log("window onpointerenter get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointerenter set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpointerleave", {
    get: function () {
        h_log("window onpointerleave get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpointerleave set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onselectstart", {
    get: function () {
        h_log("window onselectstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onselectstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onselectionchange", {
    get: function () {
        h_log("window onselectionchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onselectionchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onanimationend", {
    get: function () {
        h_log("window onanimationend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onanimationend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onanimationiteration", {
    get: function () {
        h_log("window onanimationiteration get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onanimationiteration set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onanimationstart", {
    get: function () {
        h_log("window onanimationstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onanimationstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ontransitionrun", {
    get: function () {
        h_log("window ontransitionrun get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ontransitionrun set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ontransitionstart", {
    get: function () {
        h_log("window ontransitionstart get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ontransitionstart set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ontransitionend", {
    get: function () {
        h_log("window ontransitionend get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ontransitionend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ontransitioncancel", {
    get: function () {
        h_log("window ontransitioncancel get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ontransitioncancel set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onafterprint", {
    get: function () {
        h_log("window onafterprint get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onafterprint set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onbeforeprint", {
    get: function () {
        h_log("window onbeforeprint get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onbeforeprint set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onbeforeunload", {
    get: function () {
        h_log("window onbeforeunload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onbeforeunload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onhashchange", {
    get: function () {
        h_log("window onhashchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onhashchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onlanguagechange", {
    get: function () {
        h_log("window onlanguagechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onlanguagechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmessage", {
    get: function () {
        h_log("window onmessage get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmessage set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onmessageerror", {
    get: function () {
        h_log("window onmessageerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onmessageerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onoffline", {
    get: function () {
        h_log("window onoffline get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onoffline set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ononline", {
    get: function () {
        h_log("window ononline get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ononline set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpagehide", {
    get: function () {
        h_log("window onpagehide get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpagehide set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpageshow", {
    get: function () {
        h_log("window onpageshow get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpageshow set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onpopstate", {
    get: function () {
        h_log("window onpopstate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onpopstate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onrejectionhandled", {
    get: function () {
        h_log("window onrejectionhandled get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onrejectionhandled set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onstorage", {
    get: function () {
        h_log("window onstorage get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onstorage set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onunhandledrejection", {
    get: function () {
        h_log("window onunhandledrejection get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onunhandledrejection set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onunload", {
    get: function () {
        h_log("window onunload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onunload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "crossOriginIsolated", {
    get: function () {
        h_log("window crossOriginIsolated get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "scheduler", {
    get: function () {
        h_log("window scheduler get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window scheduler set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "alert", {
    get: function () {
        h_log("[v] window alert value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window alert value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
// Object.defineProperty(window, "atob", {
//     get: function () {
//         h_log("[v] window atob value [get]", "arg:", arguments);
//         return function () {
//             h_log("[v] window atob value [call]", "arg:", arguments)
//         }
//     }, enumerable: true, configurable: true
// });
Object.defineProperty(window, "blur", {
    get: function () {
        h_log("[v] window blur value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window blur value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
// Object.defineProperty(window, "btoa", {
//     get: function () {
//         h_log("[v] window btoa value [get]", "arg:", arguments);
//         return function () {
//             h_log("[v] window btoa value [call]", "arg:", arguments)
//         }
//     }, enumerable: true, configurable: true
// });
Object.defineProperty(window, "cancelAnimationFrame", {
    get: function () {
        h_log("[v] window cancelAnimationFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window cancelAnimationFrame value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "cancelIdleCallback", {
    get: function () {
        h_log("[v] window cancelIdleCallback value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window cancelIdleCallback value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "captureEvents", {
    get: function () {
        h_log("[v] window captureEvents value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window captureEvents value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "clearInterval", {
    value: function () {
            h_log("[v] window clearInterval value [call]", "arg:", arguments)
    }, enumerable: true, configurable: true, writable: true
});
Object.defineProperty(window, "clearTimeout", {
    get: function () {
        h_log("[v] window clearTimeout value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window clearTimeout value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "close", {
    get: function () {
        h_log("[v] window close value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window close value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "confirm", {
    get: function () {
        h_log("[v] window confirm value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window confirm value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "createImageBitmap", {
    get: function () {
        h_log("[v] window createImageBitmap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window createImageBitmap value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "fetch", {
    value: function () {
        h_log("[v] window fetch value [call]", "arg:", arguments)
    }, enumerable: true, configurable: true, writable: true
});
Object.defineProperty(window, "find", {
    get: function () {
        h_log("[v] window find value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window find value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "focus", {
    get: function () {
        h_log("[v] window focus value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window focus value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "getComputedStyle", {
    get: function () {
        h_log("[v] window getComputedStyle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window getComputedStyle value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "getSelection", {
    get: function () {
        h_log("[v] window getSelection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window getSelection value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "matchMedia", {
    get: function () {
        h_log("[v] window matchMedia value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window matchMedia value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "moveBy", {
    get: function () {
        h_log("[v] window moveBy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window moveBy value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "moveTo", {
    get: function () {
        h_log("[v] window moveTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window moveTo value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "open", {
    get: function () {
        h_log("[v] window open value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window open value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "postMessage", {
    get: function () {
        h_log("[v] window postMessage value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window postMessage value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "print", {
    get: function () {
        h_log("[v] window print value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window print value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "prompt", {
    get: function () {
        h_log("[v] window prompt value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window prompt value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "queueMicrotask", {
    get: function () {
        h_log("[v] window queueMicrotask value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window queueMicrotask value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "releaseEvents", {
    get: function () {
        h_log("[v] window releaseEvents value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window releaseEvents value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "reportError", {
    get: function () {
        h_log("[v] window reportError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window reportError value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "requestAnimationFrame", {
    get: function () {
        h_log("[v] window requestAnimationFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window requestAnimationFrame value [call]", "arg:", arguments)
            return 91233
        }
    }, enumerable: true, configurable: true
});
window._sdkGlueVersionMap = {
    "sdkGlueVersion": "1.0.0.64-fix.01",
    "bdmsVersion": "1.0.1.19-fix.01",
    "captchaVersion": "4.0.10"
}
Object.defineProperty(window, "requestIdleCallback", {
    get: function () {
        h_log("[v] window requestIdleCallback value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window requestIdleCallback value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "resizeBy", {
    get: function () {
        h_log("[v] window resizeBy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window resizeBy value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "resizeTo", {
    get: function () {
        h_log("[v] window resizeTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window resizeTo value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "scroll", {
    get: function () {
        h_log("[v] window scroll value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window scroll value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "scrollBy", {
    get: function () {
        h_log("[v] window scrollBy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window scrollBy value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "scrollTo", {
    get: function () {
        h_log("[v] window scrollTo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window scrollTo value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});

Object.defineProperty(window, "stop", {
    get: function () {
        h_log("[v] window stop value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window stop value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "structuredClone", {
    get: function () {
        h_log("[v] window structuredClone value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window structuredClone value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "webkitCancelAnimationFrame", {
    get: function () {
        h_log("[v] window webkitCancelAnimationFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitCancelAnimationFrame value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "webkitRequestAnimationFrame", {
    get: function () {
        h_log("[v] window webkitRequestAnimationFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitRequestAnimationFrame value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "chrome", {value: _chrome, writable: true, enumerable: true, configurable: false,});
window.WebAssembly = WebAssembly;
Object.defineProperty(window, "fence", {
    get: function () {
        h_log("window fence get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "caches", {
    get: function () {
        h_log("window caches get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "cookieStore", {
    get: function () {
        h_log("window cookieStore get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondevicemotion", {
    get: function () {
        h_log("window ondevicemotion get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondevicemotion set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondeviceorientation", {
    get: function () {
        h_log("window ondeviceorientation get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondeviceorientation set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "ondeviceorientationabsolute", {
    get: function () {
        h_log("window ondeviceorientationabsolute get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window ondeviceorientationabsolute set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "launchQueue", {
    get: function () {
        h_log("window launchQueue get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "sharedStorage", {
    get: function () {
        h_log("window sharedStorage get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "documentPictureInPicture", {
    get: function () {
        h_log("window documentPictureInPicture get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onbeforematch", {
    get: function () {
        h_log("window onbeforematch get [call]", "arg:", arguments)
    }, set: function () {
        h_log("window onbeforematch set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "AbsoluteOrientationSensor", {
    get: function () {
        h_log("[v] window AbsoluteOrientationSensor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AbsoluteOrientationSensor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Accelerometer", {
    get: function () {
        h_log("[v] window Accelerometer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Accelerometer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioDecoder", {
    get: function () {
        h_log("[v] window AudioDecoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioDecoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioEncoder", {
    get: function () {
        h_log("[v] window AudioEncoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioEncoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AudioWorklet", {
    get: function () {
        h_log("[v] window AudioWorklet value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AudioWorklet value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BatteryManager", {
    get: function () {
        h_log("[v] window BatteryManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BatteryManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Cache", {
    get: function () {
        h_log("[v] window Cache value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Cache value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CacheStorage", {
    get: function () {
        h_log("[v] window CacheStorage value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CacheStorage value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Clipboard", {
    get: function () {
        h_log("[v] window Clipboard value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Clipboard value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ClipboardItem", {
    get: function () {
        h_log("[v] window ClipboardItem value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ClipboardItem value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CookieChangeEvent", {
    get: function () {
        h_log("[v] window CookieChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CookieChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CookieStore", {
    get: function () {
        h_log("[v] window CookieStore value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CookieStore value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CookieStoreManager", {
    get: function () {
        h_log("[v] window CookieStoreManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CookieStoreManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Credential", {
    get: function () {
        h_log("[v] window Credential value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Credential value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CredentialsContainer", {
    get: function () {
        h_log("[v] window CredentialsContainer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CredentialsContainer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CryptoKey", {
    get: function () {
        h_log("[v] window CryptoKey value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CryptoKey value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DeviceMotionEvent", {
    get: function () {
        h_log("[v] window DeviceMotionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DeviceMotionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DeviceMotionEventAcceleration", {
    get: function () {
        h_log("[v] window DeviceMotionEventAcceleration value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DeviceMotionEventAcceleration value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DeviceMotionEventRotationRate", {
    get: function () {
        h_log("[v] window DeviceMotionEventRotationRate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DeviceMotionEventRotationRate value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DeviceOrientationEvent", {
    get: function () {
        h_log("[v] window DeviceOrientationEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DeviceOrientationEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FederatedCredential", {
    get: function () {
        h_log("[v] window FederatedCredential value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FederatedCredential value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPU", {
    get: function () {
        h_log("[v] window GPU value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPU value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUAdapter", {
    get: function () {
        h_log("[v] window GPUAdapter value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUAdapter value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUAdapterInfo", {
    get: function () {
        h_log("[v] window GPUAdapterInfo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUAdapterInfo value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUBindGroup", {
    get: function () {
        h_log("[v] window GPUBindGroup value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUBindGroup value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUBindGroupLayout", {
    get: function () {
        h_log("[v] window GPUBindGroupLayout value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUBindGroupLayout value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUBuffer", {
    get: function () {
        h_log("[v] window GPUBuffer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUBuffer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUBufferUsage", {value: {}, writable: true, enumerable: false, configurable: true,});
Object.defineProperty(window, "GPUCanvasContext", {
    get: function () {
        h_log("[v] window GPUCanvasContext value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUCanvasContext value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUColorWrite", {value: {}, writable: true, enumerable: false, configurable: true,});
Object.defineProperty(window, "GPUCommandBuffer", {
    get: function () {
        h_log("[v] window GPUCommandBuffer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUCommandBuffer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUCommandEncoder", {
    get: function () {
        h_log("[v] window GPUCommandEncoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUCommandEncoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUCompilationInfo", {
    get: function () {
        h_log("[v] window GPUCompilationInfo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUCompilationInfo value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUCompilationMessage", {
    get: function () {
        h_log("[v] window GPUCompilationMessage value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUCompilationMessage value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUComputePassEncoder", {
    get: function () {
        h_log("[v] window GPUComputePassEncoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUComputePassEncoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUComputePipeline", {
    get: function () {
        h_log("[v] window GPUComputePipeline value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUComputePipeline value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUDevice", {
    get: function () {
        h_log("[v] window GPUDevice value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUDevice value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUDeviceLostInfo", {
    get: function () {
        h_log("[v] window GPUDeviceLostInfo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUDeviceLostInfo value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUError", {
    get: function () {
        h_log("[v] window GPUError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUExternalTexture", {
    get: function () {
        h_log("[v] window GPUExternalTexture value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUExternalTexture value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUInternalError", {
    get: function () {
        h_log("[v] window GPUInternalError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUInternalError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUMapMode", {value: {}, writable: true, enumerable: false, configurable: true,});
Object.defineProperty(window, "GPUOutOfMemoryError", {
    get: function () {
        h_log("[v] window GPUOutOfMemoryError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUOutOfMemoryError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUPipelineError", {
    get: function () {
        h_log("[v] window GPUPipelineError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUPipelineError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUPipelineLayout", {
    get: function () {
        h_log("[v] window GPUPipelineLayout value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUPipelineLayout value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUQuerySet", {
    get: function () {
        h_log("[v] window GPUQuerySet value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUQuerySet value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUQueue", {
    get: function () {
        h_log("[v] window GPUQueue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUQueue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPURenderBundle", {
    get: function () {
        h_log("[v] window GPURenderBundle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPURenderBundle value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPURenderBundleEncoder", {
    get: function () {
        h_log("[v] window GPURenderBundleEncoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPURenderBundleEncoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPURenderPassEncoder", {
    get: function () {
        h_log("[v] window GPURenderPassEncoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPURenderPassEncoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPURenderPipeline", {
    get: function () {
        h_log("[v] window GPURenderPipeline value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPURenderPipeline value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUSampler", {
    get: function () {
        h_log("[v] window GPUSampler value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUSampler value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUShaderModule", {
    get: function () {
        h_log("[v] window GPUShaderModule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUShaderModule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUShaderStage", {value: {}, writable: true, enumerable: false, configurable: true,});
Object.defineProperty(window, "GPUSupportedFeatures", {
    get: function () {
        h_log("[v] window GPUSupportedFeatures value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUSupportedFeatures value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUSupportedLimits", {
    get: function () {
        h_log("[v] window GPUSupportedLimits value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUSupportedLimits value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUTexture", {
    get: function () {
        h_log("[v] window GPUTexture value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUTexture value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUTextureUsage", {value: {}, writable: true, enumerable: false, configurable: true,});
Object.defineProperty(window, "GPUTextureView", {
    get: function () {
        h_log("[v] window GPUTextureView value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUTextureView value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUUncapturedErrorEvent", {
    get: function () {
        h_log("[v] window GPUUncapturedErrorEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUUncapturedErrorEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GPUValidationError", {
    get: function () {
        h_log("[v] window GPUValidationError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GPUValidationError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "GravitySensor", {
    get: function () {
        h_log("[v] window GravitySensor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window GravitySensor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Gyroscope", {
    get: function () {
        h_log("[v] window Gyroscope value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Gyroscope value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ImageDecoder", {
    get: function () {
        h_log("[v] window ImageDecoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ImageDecoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Keyboard", {
    get: function () {
        h_log("[v] window Keyboard value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Keyboard value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "KeyboardLayoutMap", {
    get: function () {
        h_log("[v] window KeyboardLayoutMap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window KeyboardLayoutMap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "LinearAccelerationSensor", {
    get: function () {
        h_log("[v] window LinearAccelerationSensor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window LinearAccelerationSensor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Lock", {
    get: function () {
        h_log("[v] window Lock value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Lock value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "LockManager", {
    get: function () {
        h_log("[v] window LockManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window LockManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MIDIAccess", {
    get: function () {
        h_log("[v] window MIDIAccess value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MIDIAccess value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MIDIConnectionEvent", {
    get: function () {
        h_log("[v] window MIDIConnectionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MIDIConnectionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MIDIInput", {
    get: function () {
        h_log("[v] window MIDIInput value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MIDIInput value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MIDIInputMap", {
    get: function () {
        h_log("[v] window MIDIInputMap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MIDIInputMap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MIDIMessageEvent", {
    get: function () {
        h_log("[v] window MIDIMessageEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MIDIMessageEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MIDIOutput", {
    get: function () {
        h_log("[v] window MIDIOutput value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MIDIOutput value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MIDIOutputMap", {
    get: function () {
        h_log("[v] window MIDIOutputMap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MIDIOutputMap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MIDIPort", {
    get: function () {
        h_log("[v] window MIDIPort value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MIDIPort value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaDeviceInfo", {
    get: function () {
        h_log("[v] window MediaDeviceInfo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaDeviceInfo value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaDevices", {
    get: function () {
        h_log("[v] window MediaDevices value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaDevices value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaKeyMessageEvent", {
    get: function () {
        h_log("[v] window MediaKeyMessageEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaKeyMessageEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaKeySession", {
    get: function () {
        h_log("[v] window MediaKeySession value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaKeySession value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaKeyStatusMap", {
    get: function () {
        h_log("[v] window MediaKeyStatusMap value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaKeyStatusMap value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaKeySystemAccess", {
    get: function () {
        h_log("[v] window MediaKeySystemAccess value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaKeySystemAccess value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaKeys", {
    get: function () {
        h_log("[v] window MediaKeys value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaKeys value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigationPreloadManager", {
    get: function () {
        h_log("[v] window NavigationPreloadManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NavigationPreloadManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigatorManagedData", {
    get: function () {
        h_log("[v] window NavigatorManagedData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NavigatorManagedData value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XPathExpression", {
    get: function () {
        h_log("[v] window NavigatorManagedData value [get]", "arg:", arguments);
        return _XPathExpression
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Navigator", {
    get: function () {
        h_log("[v] window Navigator value [get]", "arg:", arguments);
        return _Navigator
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "OrientationSensor", {
    get: function () {
        h_log("[v] window OrientationSensor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window OrientationSensor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PasswordCredential", {
    get: function () {
        h_log("[v] window PasswordCredential value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PasswordCredential value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RelativeOrientationSensor", {
    get: function () {
        h_log("[v] window RelativeOrientationSensor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RelativeOrientationSensor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ScreenDetailed", {
    get: function () {
        h_log("[v] window ScreenDetailed value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ScreenDetailed value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ScreenDetails", {
    get: function () {
        h_log("[v] window ScreenDetails value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ScreenDetails value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Sensor", {
    get: function () {
        h_log("[v] window Sensor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Sensor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SensorErrorEvent", {
    get: function () {
        h_log("[v] window SensorErrorEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SensorErrorEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ServiceWorker", {
    get: function () {
        h_log("[v] window ServiceWorker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ServiceWorker value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ServiceWorkerContainer", {
    get: function () {
        h_log("[v] window ServiceWorkerContainer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ServiceWorkerContainer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ServiceWorkerRegistration", {
    get: function () {
        h_log("[v] window ServiceWorkerRegistration value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ServiceWorkerRegistration value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "StorageManager", {
    get: function () {
        h_log("[v] window StorageManager value [get]", "arg:", arguments);
        return _StorageManager
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SubtleCrypto", {
    get: function () {
        h_log("[v] window SubtleCrypto value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SubtleCrypto value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VideoDecoder", {
    get: function () {
        h_log("[v] window VideoDecoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VideoDecoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VideoEncoder", {
    get: function () {
        h_log("[v] window VideoEncoder value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VideoEncoder value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VirtualKeyboard", {
    get: function () {
        h_log("[v] window VirtualKeyboard value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VirtualKeyboard value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WGSLLanguageFeatures", {
    get: function () {
        h_log("[v] window WGSLLanguageFeatures value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WGSLLanguageFeatures value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebTransport", {
    get: function () {
        h_log("[v] window WebTransport value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebTransport value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebTransportBidirectionalStream", {
    get: function () {
        h_log("[v] window WebTransportBidirectionalStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebTransportBidirectionalStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebTransportDatagramDuplexStream", {
    get: function () {
        h_log("[v] window WebTransportDatagramDuplexStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebTransportDatagramDuplexStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WebTransportError", {
    get: function () {
        h_log("[v] window WebTransportError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WebTransportError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Worklet", {
    get: function () {
        h_log("[v] window Worklet value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Worklet value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRDOMOverlayState", {
    get: function () {
        h_log("[v] window XRDOMOverlayState value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRDOMOverlayState value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRLayer", {
    get: function () {
        h_log("[v] window XRLayer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRLayer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRWebGLBinding", {
    get: function () {
        h_log("[v] window XRWebGLBinding value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRWebGLBinding value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AuthenticatorAssertionResponse", {
    get: function () {
        h_log("[v] window AuthenticatorAssertionResponse value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AuthenticatorAssertionResponse value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AuthenticatorAttestationResponse", {
    get: function () {
        h_log("[v] window AuthenticatorAttestationResponse value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AuthenticatorAttestationResponse value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AuthenticatorResponse", {
    get: function () {
        h_log("[v] window AuthenticatorResponse value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AuthenticatorResponse value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PublicKeyCredential", {
    get: function () {
        h_log("[v] window PublicKeyCredential value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PublicKeyCredential value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Bluetooth", {
    get: function () {
        h_log("[v] window Bluetooth value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Bluetooth value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BluetoothCharacteristicProperties", {
    get: function () {
        h_log("[v] window BluetoothCharacteristicProperties value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BluetoothCharacteristicProperties value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BluetoothDevice", {
    get: function () {
        h_log("[v] window BluetoothDevice value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BluetoothDevice value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BluetoothRemoteGATTCharacteristic", {
    get: function () {
        h_log("[v] window BluetoothRemoteGATTCharacteristic value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BluetoothRemoteGATTCharacteristic value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BluetoothRemoteGATTDescriptor", {
    get: function () {
        h_log("[v] window BluetoothRemoteGATTDescriptor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BluetoothRemoteGATTDescriptor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BluetoothRemoteGATTServer", {
    get: function () {
        h_log("[v] window BluetoothRemoteGATTServer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BluetoothRemoteGATTServer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BluetoothRemoteGATTService", {
    get: function () {
        h_log("[v] window BluetoothRemoteGATTService value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BluetoothRemoteGATTService value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CaptureController", {
    get: function () {
        h_log("[v] window CaptureController value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CaptureController value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DocumentPictureInPicture", {
    get: function () {
        h_log("[v] window DocumentPictureInPicture value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DocumentPictureInPicture value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "EyeDropper", {
    get: function () {
        h_log("[v] window EyeDropper value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window EyeDropper value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Fence", {
    get: function () {
        h_log("[v] window Fence value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Fence value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FencedFrameConfig", {
    get: function () {
        h_log("[v] window FencedFrameConfig value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FencedFrameConfig value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HTMLFencedFrameElement", {
    get: function () {
        h_log("[v] window HTMLFencedFrameElement value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HTMLFencedFrameElement value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FileSystemDirectoryHandle", {
    get: function () {
        h_log("[v] window FileSystemDirectoryHandle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FileSystemDirectoryHandle value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FileSystemFileHandle", {
    get: function () {
        h_log("[v] window FileSystemFileHandle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FileSystemFileHandle value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FileSystemHandle", {
    get: function () {
        h_log("[v] window FileSystemHandle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FileSystemHandle value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FileSystemWritableFileStream", {
    get: function () {
        h_log("[v] window FileSystemWritableFileStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FileSystemWritableFileStream value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FontData", {
    get: function () {
        h_log("[v] window FontData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FontData value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "FragmentDirective", {
    get: function () {
        h_log("[v] window FragmentDirective value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window FragmentDirective value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HID", {
    get: function () {
        h_log("[v] window HID value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HID value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HIDConnectionEvent", {
    get: function () {
        h_log("[v] window HIDConnectionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HIDConnectionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HIDDevice", {
    get: function () {
        h_log("[v] window HIDDevice value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HIDDevice value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HIDInputReportEvent", {
    get: function () {
        h_log("[v] window HIDInputReportEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HIDInputReportEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IdentityCredential", {
    get: function () {
        h_log("[v] window IdentityCredential value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IdentityCredential value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IdentityProvider", {
    get: function () {
        h_log("[v] window IdentityProvider value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IdentityProvider value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IdentityCredentialError", {
    get: function () {
        h_log("[v] window IdentityCredentialError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IdentityCredentialError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "IdleDetector", {
    get: function () {
        h_log("[v] window IdleDetector value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window IdleDetector value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "LaunchParams", {
    get: function () {
        h_log("[v] window LaunchParams value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window LaunchParams value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "LaunchQueue", {
    get: function () {
        h_log("[v] window LaunchQueue value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window LaunchQueue value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Mojo", {
    get: function () {
        h_log("[v] window Mojo value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Mojo value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MojoHandle", {
    get: function () {
        h_log("[v] window MojoHandle value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MojoHandle value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MojoWatcher", {
    get: function () {
        h_log("[v] window MojoWatcher value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MojoWatcher value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigatorLogin", {
    get: function () {
        h_log("[v] window NavigatorLogin value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window NavigatorLogin value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "OTPCredential", {
    get: function () {
        h_log("[v] window OTPCredential value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window OTPCredential value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PaymentAddress", {
    get: function () {
        h_log("[v] window PaymentAddress value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PaymentAddress value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PaymentRequest", {
    get: function () {
        h_log("[v] window PaymentRequest value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PaymentRequest value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PaymentResponse", {
    get: function () {
        h_log("[v] window PaymentResponse value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PaymentResponse value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PaymentMethodChangeEvent", {
    get: function () {
        h_log("[v] window PaymentMethodChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PaymentMethodChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Presentation", {
    get: function () {
        h_log("[v] window Presentation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Presentation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PresentationAvailability", {
    get: function () {
        h_log("[v] window PresentationAvailability value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PresentationAvailability value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PresentationConnection", {
    get: function () {
        h_log("[v] window PresentationConnection value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PresentationConnection value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PresentationConnectionAvailableEvent", {
    get: function () {
        h_log("[v] window PresentationConnectionAvailableEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PresentationConnectionAvailableEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PresentationConnectionCloseEvent", {
    get: function () {
        h_log("[v] window PresentationConnectionCloseEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PresentationConnectionCloseEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PresentationConnectionList", {
    get: function () {
        h_log("[v] window PresentationConnectionList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PresentationConnectionList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PresentationReceiver", {
    get: function () {
        h_log("[v] window PresentationReceiver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PresentationReceiver value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PresentationRequest", {
    get: function () {
        h_log("[v] window PresentationRequest value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PresentationRequest value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Serial", {
    get: function () {
        h_log("[v] window Serial value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Serial value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SerialPort", {
    get: function () {
        h_log("[v] window SerialPort value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SerialPort value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SharedStorage", {
    get: function () {
        h_log("[v] window SharedStorage value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SharedStorage value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SharedStorageWorklet", {
    get: function () {
        h_log("[v] window SharedStorageWorklet value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SharedStorageWorklet value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USB", {
    get: function () {
        h_log("[v] window USB value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USB value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBAlternateInterface", {
    get: function () {
        h_log("[v] window USBAlternateInterface value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBAlternateInterface value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBConfiguration", {
    get: function () {
        h_log("[v] window USBConfiguration value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBConfiguration value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBConnectionEvent", {
    get: function () {
        h_log("[v] window USBConnectionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBConnectionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBDevice", {
    get: function () {
        h_log("[v] window USBDevice value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBDevice value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBEndpoint", {
    get: function () {
        h_log("[v] window USBEndpoint value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBEndpoint value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBInTransferResult", {
    get: function () {
        h_log("[v] window USBInTransferResult value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBInTransferResult value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBInterface", {
    get: function () {
        h_log("[v] window USBInterface value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBInterface value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBIsochronousInTransferPacket", {
    get: function () {
        h_log("[v] window USBIsochronousInTransferPacket value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBIsochronousInTransferPacket value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBIsochronousInTransferResult", {
    get: function () {
        h_log("[v] window USBIsochronousInTransferResult value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBIsochronousInTransferResult value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBIsochronousOutTransferPacket", {
    get: function () {
        h_log("[v] window USBIsochronousOutTransferPacket value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBIsochronousOutTransferPacket value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBIsochronousOutTransferResult", {
    get: function () {
        h_log("[v] window USBIsochronousOutTransferResult value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBIsochronousOutTransferResult value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "USBOutTransferResult", {
    get: function () {
        h_log("[v] window USBOutTransferResult value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window USBOutTransferResult value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WakeLock", {
    get: function () {
        h_log("[v] window WakeLock value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WakeLock value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WakeLockSentinel", {
    get: function () {
        h_log("[v] window WakeLockSentinel value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WakeLockSentinel value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WindowControlsOverlay", {
    get: function () {
        h_log("[v] window WindowControlsOverlay value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WindowControlsOverlay value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "WindowControlsOverlayGeometryChangeEvent", {
    get: function () {
        h_log("[v] window WindowControlsOverlayGeometryChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window WindowControlsOverlayGeometryChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRAnchor", {
    get: function () {
        h_log("[v] window XRAnchor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRAnchor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRAnchorSet", {
    get: function () {
        h_log("[v] window XRAnchorSet value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRAnchorSet value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRBoundedReferenceSpace", {
    get: function () {
        h_log("[v] window XRBoundedReferenceSpace value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRBoundedReferenceSpace value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRCPUDepthInformation", {
    get: function () {
        h_log("[v] window XRCPUDepthInformation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRCPUDepthInformation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRCamera", {
    get: function () {
        h_log("[v] window XRCamera value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRCamera value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRDepthInformation", {
    get: function () {
        h_log("[v] window XRDepthInformation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRDepthInformation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRFrame", {
    get: function () {
        h_log("[v] window XRFrame value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRFrame value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRHitTestResult", {
    get: function () {
        h_log("[v] window XRHitTestResult value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRHitTestResult value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRHitTestSource", {
    get: function () {
        h_log("[v] window XRHitTestSource value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRHitTestSource value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRInputSource", {
    get: function () {
        h_log("[v] window XRInputSource value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRInputSource value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRInputSourceArray", {
    get: function () {
        h_log("[v] window XRInputSourceArray value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRInputSourceArray value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRInputSourceEvent", {
    get: function () {
        h_log("[v] window XRInputSourceEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRInputSourceEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRInputSourcesChangeEvent", {
    get: function () {
        h_log("[v] window XRInputSourcesChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRInputSourcesChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRLightEstimate", {
    get: function () {
        h_log("[v] window XRLightEstimate value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRLightEstimate value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRLightProbe", {
    get: function () {
        h_log("[v] window XRLightProbe value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRLightProbe value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRPose", {
    get: function () {
        h_log("[v] window XRPose value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRPose value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRRay", {
    get: function () {
        h_log("[v] window XRRay value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRRay value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRReferenceSpace", {
    get: function () {
        h_log("[v] window XRReferenceSpace value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRReferenceSpace value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRReferenceSpaceEvent", {
    get: function () {
        h_log("[v] window XRReferenceSpaceEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRReferenceSpaceEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRRenderState", {
    get: function () {
        h_log("[v] window XRRenderState value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRRenderState value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRRigidTransform", {
    get: function () {
        h_log("[v] window XRRigidTransform value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRRigidTransform value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRSession", {
    get: function () {
        h_log("[v] window XRSession value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRSession value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRSessionEvent", {
    get: function () {
        h_log("[v] window XRSessionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRSessionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRSpace", {
    get: function () {
        h_log("[v] window XRSpace value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRSpace value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRSystem", {
    get: function () {
        h_log("[v] window XRSystem value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRSystem value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRTransientInputHitTestResult", {
    get: function () {
        h_log("[v] window XRTransientInputHitTestResult value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRTransientInputHitTestResult value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRTransientInputHitTestSource", {
    get: function () {
        h_log("[v] window XRTransientInputHitTestSource value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRTransientInputHitTestSource value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRView", {
    get: function () {
        h_log("[v] window XRView value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRView value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRViewerPose", {
    get: function () {
        h_log("[v] window XRViewerPose value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRViewerPose value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRViewport", {
    get: function () {
        h_log("[v] window XRViewport value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRViewport value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRWebGLDepthInformation", {
    get: function () {
        h_log("[v] window XRWebGLDepthInformation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRWebGLDepthInformation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "XRWebGLLayer", {
    get: function () {
        h_log("[v] window XRWebGLLayer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window XRWebGLLayer value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "getScreenDetails", {
    get: function () {
        h_log("[v] window getScreenDetails value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window getScreenDetails value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "queryLocalFonts", {
    get: function () {
        h_log("[v] window queryLocalFonts value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window queryLocalFonts value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "showDirectoryPicker", {
    get: function () {
        h_log("[v] window showDirectoryPicker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window showDirectoryPicker value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "showOpenFilePicker", {
    get: function () {
        h_log("[v] window showOpenFilePicker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window showOpenFilePicker value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "showSaveFilePicker", {
    get: function () {
        h_log("[v] window showSaveFilePicker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window showSaveFilePicker value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "originAgentCluster", {
    get: function () {
        h_log("window originAgentCluster get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "credentialless", {
    get: function () {
        h_log("window credentialless get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "speechSynthesis", {
    get: function () {
        h_log("window speechSynthesis get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(window, "oncontentvisibilityautostatechange", {
    get: function () {
        h_log("window oncontentvisibilityautostatechange get [call]", "arg:", arguments)
        return null
    }, set: function () {
        h_log("window oncontentvisibilityautostatechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "onscrollend", {
    get: function () {
        h_log("window onscrollend get [call]", "arg:", arguments)
        return null
    }, set: function () {
        h_log("window onscrollend set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(window, "AnimationPlaybackEvent", {
    get: function () {
        h_log("[v] window AnimationPlaybackEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AnimationPlaybackEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "AnimationTimeline", {
    get: function () {
        h_log("[v] window AnimationTimeline value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window AnimationTimeline value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSAnimation", {
    get: function () {
        h_log("[v] window CSSAnimation value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSAnimation value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSTransition", {
    get: function () {
        h_log("[v] window CSSTransition value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSTransition value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DocumentTimeline", {
    get: function () {
        h_log("[v] window DocumentTimeline value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DocumentTimeline value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BackgroundFetchManager", {
    get: function () {
        h_log("[v] window BackgroundFetchManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BackgroundFetchManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BackgroundFetchRecord", {
    get: function () {
        h_log("[v] window BackgroundFetchRecord value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BackgroundFetchRecord value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BackgroundFetchRegistration", {
    get: function () {
        h_log("[v] window BackgroundFetchRegistration value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BackgroundFetchRegistration value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BluetoothUUID", {
    get: function () {
        h_log("[v] window BluetoothUUID value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BluetoothUUID value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "BrowserCaptureMediaStreamTrack", {
    get: function () {
        h_log("[v] window BrowserCaptureMediaStreamTrack value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window BrowserCaptureMediaStreamTrack value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CropTarget", {
    get: function () {
        h_log("[v] window CropTarget value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CropTarget value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSScopeRule", {
    get: function () {
        h_log("[v] window CSSScopeRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSScopeRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "CSSStartingStyleRule", {
    get: function () {
        h_log("[v] window CSSStartingStyleRule value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window CSSStartingStyleRule value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ContentVisibilityAutoStateChangeEvent", {
    get: function () {
        h_log("[v] window ContentVisibilityAutoStateChangeEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ContentVisibilityAutoStateChangeEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DelegatedInkTrailPresenter", {
    get: function () {
        h_log("[v] window DelegatedInkTrailPresenter value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DelegatedInkTrailPresenter value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Ink", {
    get: function () {
        h_log("[v] window Ink value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Ink value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "DocumentPictureInPictureEvent", {
    get: function () {
        h_log("[v] window DocumentPictureInPictureEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window DocumentPictureInPictureEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Highlight", {
    get: function () {
        h_log("[v] window Highlight value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Highlight value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "HighlightRegistry", {
    get: function () {
        h_log("[v] window HighlightRegistry value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window HighlightRegistry value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaMetadata", {
    get: function () {
        h_log("[v] window MediaMetadata value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaMetadata value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MediaSession", {
    get: function () {
        h_log("[v] window MediaSession value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MediaSession value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "MutationEvent", {
    get: function () {
        h_log("[v] window MutationEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window MutationEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "NavigatorUAData", {
    get: function () {
        h_log("[v] window NavigatorUAData value [get]", "arg:", arguments);
        return _NavigatorUAData
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Notification", {
    get: function () {
        h_log("[v] window Notification value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Notification value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PaymentManager", {
    get: function () {
        h_log("[v] window PaymentManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PaymentManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PaymentRequestUpdateEvent", {
    get: function () {
        h_log("[v] window PaymentRequestUpdateEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PaymentRequestUpdateEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PeriodicSyncManager", {
    get: function () {
        h_log("[v] window PeriodicSyncManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PeriodicSyncManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PermissionStatus", {
    get: function () {
        h_log("[v] window PermissionStatus value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PermissionStatus value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "Permissions", {
    get: function () {
        h_log("[v] window Permissions value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window Permissions value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PushManager", {
    get: function () {
        h_log("[v] window PushManager value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PushManager value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PushSubscription", {
    get: function () {
        h_log("[v] window PushSubscription value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PushSubscription value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "PushSubscriptionOptions", {
    get: function () {
        h_log("[v] window PushSubscriptionOptions value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window PushSubscriptionOptions value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "RemotePlayback", {
    get: function () {
        h_log("[v] window RemotePlayback value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window RemotePlayback value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ScrollTimeline", {
    get: function () {
        h_log("[v] window ScrollTimeline value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ScrollTimeline value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "ViewTimeline", {
    get: function () {
        h_log("[v] window ViewTimeline value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window ViewTimeline value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SharedWorker", {
    get: function () {
        h_log("[v] window SharedWorker value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SharedWorker value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SpeechSynthesisErrorEvent", {
    get: function () {
        h_log("[v] window SpeechSynthesisErrorEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SpeechSynthesisErrorEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SpeechSynthesisEvent", {
    get: function () {
        h_log("[v] window SpeechSynthesisEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SpeechSynthesisEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "SpeechSynthesisUtterance", {
    get: function () {
        h_log("[v] window SpeechSynthesisUtterance value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window SpeechSynthesisUtterance value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VideoPlaybackQuality", {
    get: function () {
        h_log("[v] window VideoPlaybackQuality value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VideoPlaybackQuality value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "VisibilityStateEntry", {
    get: function () {
        h_log("[v] window VisibilityStateEntry value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window VisibilityStateEntry value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitSpeechGrammar", {
    get: function () {
        h_log("[v] window webkitSpeechGrammar value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitSpeechGrammar value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitSpeechGrammarList", {
    get: function () {
        h_log("[v] window webkitSpeechGrammarList value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitSpeechGrammarList value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitSpeechRecognition", {
    get: function () {
        h_log("[v] window webkitSpeechRecognition value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitSpeechRecognition value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitSpeechRecognitionError", {
    get: function () {
        h_log("[v] window webkitSpeechRecognitionError value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitSpeechRecognitionError value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitSpeechRecognitionEvent", {
    get: function () {
        h_log("[v] window webkitSpeechRecognitionEvent value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitSpeechRecognitionEvent value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "webkitRequestFileSystem", {
    get: function () {
        h_log("[v] window webkitRequestFileSystem value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitRequestFileSystem value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "webkitResolveLocalFileSystemURL", {
    get: function () {
        h_log("[v] window webkitResolveLocalFileSystemURL value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window webkitResolveLocalFileSystemURL value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "JSCompiler_renameProperty", {
    get: function () {
        h_log("[v] window JSCompiler_renameProperty value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window JSCompiler_renameProperty value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(window, "dir", {
    get: function () {
        h_log("[v] window dir value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window dir value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "dirxml", {
    get: function () {
        h_log("[v] window dirxml value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window dirxml value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "profile", {
    get: function () {
        h_log("[v] window profile value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window profile value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "profileEnd", {
    get: function () {
        h_log("[v] window profileEnd value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window profileEnd value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "clear", {
    get: function () {
        h_log("[v] window clear value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window clear value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "table", {
    get: function () {
        h_log("[v] window table value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window table value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "keys", {
    get: function () {
        h_log("[v] window keys value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window keys value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "values", {
    get: function () {
        h_log("[v] window values value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window values value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "debug", {
    get: function () {
        h_log("[v] window debug value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window debug value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "undebug", {
    get: function () {
        h_log("[v] window undebug value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window undebug value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "monitor", {
    get: function () {
        h_log("[v] window monitor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window monitor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "unmonitor", {
    get: function () {
        h_log("[v] window unmonitor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window unmonitor value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "inspect", {
    get: function () {
        h_log("[v] window inspect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window inspect value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "copy", {
    get: function () {
        h_log("[v] window copy value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window copy value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "queryObjects", {
    get: function () {
        h_log("[v] window queryObjects value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window queryObjects value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "getEventListeners", {
    get: function () {
        h_log("[v] window getEventListeners value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window getEventListeners value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "getAccessibleName", {
    get: function () {
        h_log("[v] window getAccessibleName value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window getAccessibleName value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "getAccessibleRole", {
    get: function () {
        h_log("[v] window getAccessibleRole value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window getAccessibleRole value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "monitorEvents", {
    get: function () {
        h_log("[v] window monitorEvents value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window monitorEvents value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
Object.defineProperty(window, "unmonitorEvents", {
    get: function () {
        h_log("[v] window unmonitorEvents value [get]", "arg:", arguments);
        return function () {
            h_log("[v] window unmonitorEvents value [call]", "arg:", arguments)
        }
    }, enumerable: false, configurable: true
});
window.__proto__ = {};
Object.defineProperty(window.__proto__, "TEMPORARY", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(window.__proto__, "PERSISTENT", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
});
Window = function () {
    h_log("window.__proto__ constructor value [call]", "arg:", arguments)
};
Window.prototype = window.__proto__;
Object.defineProperty(window.__proto__, "constructor", {
    value: Window,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(window.__proto__, Symbol.toStringTag, {
    value: "Window",
    writable: false,
    enumerable: false,
    configurable: true,
});
window.__proto__.__proto__ = {};
Object.defineProperty(window.__proto__.__proto__, Symbol.toStringTag, {
    value: "WindowProperties",
    writable: false,
    enumerable: false,
    configurable: true,
});
window.__proto__.__proto__.__proto__ = eventTarget;

if (config_config.proxy_obj) {
    window = ProxyObj(window, "window", true)
}
// 模拟html文档的初始化值
// 针对瑞数6

let html1 = new _HTMLHtmlElement("h_html")
let head1 = new _HTMLHeadElement("h_head")
let body1 = new _HTMLBodyElement("h_body")
let meta1 = new _HTMLMetaElement("h_meta")
let meta2 = new _HTMLMetaElement("h_meta")
meta2["r"] = "m"
meta2["_content"] = "_DdHSx_hGWXD_57bYC1SQZ2VLrgONetHHIBf9lF5DIxoHpD6JgcVvA"
let script1 = new _HTMLScriptElement("h_script")
let script2 = new _HTMLScriptElement("h_script")
script1["r"] = "m"
script2["r"] = "m"


// 构建DOM树
html1.appendChild(head1);
html1.appendChild(body1);
head1.appendChild(meta1);
head1.appendChild(meta2);
head1.appendChild(script1);
head1.appendChild(script2);




meta2["_content"] = "VnMlH25aEwciIel5iG6R28R8Fq.OfChXNgboE96brTgkHmNzpnKErKgrEo.FATysEvxZT9k7zOLNB8N_zJYywV5vrudtpdtmOV5FGAzNJa3";})();
/* ------环境加载完成------ */
debugger;
;}catch(e){h_log(e);debugger;};