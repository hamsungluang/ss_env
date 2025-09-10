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
_XMLHttpRequest = ProxyObj(_XMLHttpRequest, "_XMLHttpRequest")
