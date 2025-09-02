function test() {
    var type = typeof document.all
    if (type === "undefined") {
        var all_len = document.all.length;
        var a = document.createElement("a");
        document.body.appendChild(a);
        var b = document.all[all_len]
        if (a === b) {
            h_log('111111')
            delete document.all[all_len];
            h_log(document.all)
            var c = document.all[all_len];
            if (a === c) {
                h_log('22222')
                document.body.removeChild(a);
                var d = document.all[all_len];
                if (d === undefined) {
                    return "成功";
                }
            }
        }
    }
    return "失败";
}
 
h_log(test())
