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

