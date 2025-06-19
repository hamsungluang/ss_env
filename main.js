const {VM} = require("vm2");
const fs = require("fs");
const config = require("./config");

const _setTimeout = function (a, b){
    return setTimeout(a)
}

const vm = new VM({
    sandbox: {
        h_log: config.DEBUG?console.log:function (){},
        setTimeout: _setTimeout,
        setInterval: _setTimeout,
        // config_LOCATION: config.LOCATION,
    }
});

let code = "debugger;" // 便于调试
// 加载框架代码
code += fs.readFileSync("./env/init.js", "utf-8")
code += fs.readFileSync("./env/public/eventTarget.js", "utf-8")
code += fs.readFileSync("./env/bom/navigator.js", "utf-8")
code += fs.readFileSync("./env/bom/location.js", "utf-8")
code += fs.readFileSync("./env/bom/screen.js", "utf-8")
code += fs.readFileSync("./env/dom/dom.js", "utf-8")
code += fs.readFileSync("./env/dom/tag.js", "utf-8")
code += fs.readFileSync("./env/dom/document.js", "utf-8")
code += fs.readFileSync("./env/bom/window.js", "utf-8")
code = `(function(){${code}})();`
code += fs.readFileSync("./work/work.js", "utf-8")

// 可留可不留
code = `try{${code};debugger}catch(e){h_log(e);debugger;};`
// code += `document.cookie`;
_cookie = vm.run(code);
// console.log(_cookie)