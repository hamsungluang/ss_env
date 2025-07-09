let _userActivation = {};
_userActivation.__proto__ = {};
Object.defineProperty(_userActivation.__proto__, "hasBeenActive", {
    get: function () {
        h_log("_userActivation.__proto__ hasBeenActive get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_userActivation.__proto__, "isActive", {
    get: function () {
        h_log("_userActivation.__proto__ isActive get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
UserActivation = function () {
    h_log("_userActivation.__proto__ constructor value [call]", "arg:", arguments)
};
UserActivation.prototype = _userActivation.__proto__;
Object.defineProperty(_userActivation.__proto__, "constructor", {
    value: UserActivation,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_userActivation.__proto__, Symbol.toStringTag, {
    value: "UserActivation",
    writable: false,
    enumerable: false,
    configurable: true,
});


