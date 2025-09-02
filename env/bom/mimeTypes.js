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

