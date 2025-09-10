let ProxyObj = function (obj, name, xx = true) {
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

