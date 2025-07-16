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
    } else if (_lp_func_toString.call(this).includes("Object toString")) {
        h_log(`Function toString ${this.name} 被调用`)
        h_log(`返回：` + 'function toString() { [native code] }')
        return 'function toString() { [native code] }'
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

let ProxyObj = function (obj, name) {
    return new Proxy(obj, {
        get(target, propKey, receiver) { //拦截对象属性的读取，比如proxy.foo和proxy['foo']。
            let temp = Reflect.get(target, propKey, receiver);
            if (propKey.toString() !== "attachEvent" && propKey.toString() !== "stack" && propKey.toString() !== 'Symbol(Symbol.toPrimitive)') {
                h_log(`${name} -> get ${propKey.toString()} return -> ${temp}`);
            }
            if (typeof temp == 'object') {
                temp = ProxyObj(temp, name + " => " + propKey)
            }
            return temp;
        },
        set(target, propKey, value, receiver) { //拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
            const temp = Reflect.set(target, propKey, value, receiver);
            if (propKey.toString() !== "D" && propKey.toString() !== "B" && propKey.toString() !== "stack") {
                //h_log(`${name} -> set ${propKey.toString()} value -> ${value}`);
                h_log(`${name} -> set ${propKey} value -> ${value}`);
            }
            //h_log(`${name} -> set ${propKey} value -> ${value}`);
            return temp;
        },
        has(target, propKey) { //拦截propKey in proxy的操作，返回一个布尔值。
            const temp = Reflect.has(target, propKey);
            h_log(`${name} -> has ${propKey.toString()} return -> ${temp}`);
            return temp;
        },
        deleteProperty(target, propKey) { //拦截delete proxy[propKey]的操作，返回一个布尔值。
            const temp = Reflect.deleteProperty(target, propKey);
            h_log(`${name} -> deleteProperty ${propKey}`);
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

            h_log(`${name} -> ownKeys ${stringKeys}`); // 打印转换为字符串后的 keys

            return keys; // 返回字符串数组
        },
        //加的
        getOwnPropertyDescriptor(target, propKey) { //拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
            const descriptor = Reflect.getOwnPropertyDescriptor(target, propKey);
            // h_log(`${name} -> getOwnPropertyDescriptor ${propKey.toString()} return ->`, descriptor);
            return descriptor;
        },
        defineProperty(target, propKey, propDesc) { //拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
            const success = Reflect.defineProperty(target, propKey, propDesc);
            h_log(`${name} -> defineProperty ${propKey.toString()} descriptor ->`, propDesc, 'success ->', success);
            return success;
        },
        preventExtensions(target) { //拦截Object.preventExtensions(proxy)，返回一个布尔值。
            const success = Reflect.preventExtensions(target);
            h_log(`${name} -> preventExtensions success ->`, success);
            return success;
        },
        getPrototypeOf(target) { //拦截Object.getPrototypeOf(proxy)，返回一个对象。
            const prototype = Reflect.getPrototypeOf(target);
            h_log(`${name} -> getPrototypeOf return ->`, prototype);
            return prototype;
        },
        isExtensible(target) { //拦截Object.isExtensible(proxy)，返回一个布尔值。
            const extensible = Reflect.isExtensible(target);
            h_log(`${name} -> isExtensible return ->`, extensible);
            return extensible;
        },
        setPrototypeOf(target, proto) { //拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
            const success = Reflect.setPrototypeOf(target, proto);
            h_log(`${name} -> setPrototypeOf proto ->`, proto, 'success ->', success);
            return success;
        },
        apply(target, object, args) { //拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
            h_log(`${name} -> apply object ->`, object, 'args ->', args);
            const result = Reflect.apply(target, object, args);
            h_log(`${name} -> apply result ->`, result);
            return result;
        },
        construct(target, args) { //拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
            h_log(`${name} -> construct args ->`, args);
            const result = Reflect.construct(target, args);
            h_log(`${name} -> construct result ->`, result);
            return result;
        }
    })
}
