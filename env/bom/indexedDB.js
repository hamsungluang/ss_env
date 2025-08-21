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
