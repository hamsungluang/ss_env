let _Request = function () {
    h_log("Request constructor value [call]", "arg:", arguments)
}
_Request.prototype = {}
_Request.prototype = ProxyObj(_Request.prototype, "_Request.prototype")
