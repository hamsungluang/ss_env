let document_all = {}
document_all.__proto__ = {}
Object.defineProperty(document_all.__proto__, "length", {
    get: function () {
        h_log("document_all.__proto__ length get [call]", "arg:", arguments)
        return 1112
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(document_all.__proto__, "item", {
    get: function () {
        h_log("document_all.__proto__ item value [get]", "arg:", arguments)
        return function () {
            h_log("document_all.__proto__ item value [call]", "arg:", arguments)
        }
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(document_all.__proto__, "namedItem", {
    get: function () {
        h_log("document_all.__proto__ namedItem value [get]", "arg:", arguments)
        return function () {
            h_log("document_all.__proto__ namedItem value [call]", "arg:", arguments)
        }
    }, set: undefined, enumerable: true, configurable: true,
});
function HTMLAllCollection() {
    h_log("document_all.__proto__ constructor value [call]", "arg:", arguments)
    throw TypeError("Illegal constructor")
}
HTMLAllCollection.prototype = document_all.__proto__
Object.defineProperty(document_all.__proto__, "constructor", {
    value: HTMLAllCollection,
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
        h_log("document_all.__proto__ Symbol.iterator value [get]", "arg:", arguments)
        return function () {
            h_log("document_all.__proto__ Symbol.iterator value [call]", "arg:", arguments)
        }
    },
    set: undefined,
    enumerable: false,
    configurable: true,
});



let document_images = {}
document_images.__proto__ = {}
Object.defineProperty(document_images.__proto__, "length", {
    get: function () {
        h_log("document_images.__proto__ length get [call]", "arg:", arguments)
        return 41
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(document_images.__proto__, "item", {
    get: function () {
        h_log("document_images.__proto__ item value [get]", "arg:", arguments)
        return function () {
            h_log("document_images.__proto__ item value [call]", "arg:", arguments)
        }
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(document_images.__proto__, "namedItem", {
    get: function () {
        h_log("document_images.__proto__ namedItem value [get]", "arg:", arguments)
        return function () {
            h_log("document_images.__proto__ namedItem value [call]", "arg:", arguments)
        }
    }, set: undefined, enumerable: true, configurable: true,
});
function HTMLCollection() {
    h_log("document_images.__proto__ constructor value [call]", "arg:", arguments)
    throw TypeError("Illegal constructor")
}
Object.defineProperty(document_images.__proto__, "constructor", {
    value: HTMLCollection,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(document_images.__proto__, Symbol.toStringTag, {
    value: "HTMLCollection",
    writable: false,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(document_images.__proto__, Symbol.iterator, {
    get: function () {
        h_log("document_images.__proto__ Symbol.iterator value [get]", "arg:", arguments)
        return function () {
            h_log("document_images.__proto__ Symbol.iterator value [call]", "arg:", arguments)
        }
    },
    set: undefined,
    enumerable: false,
    configurable: true,
});
HTMLCollection.prototype = document_images.__proto__







