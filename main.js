const {VM} = require("vm2");
const fs = require("fs");
const config = require("./config");

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  debugger
  // 可以在这里添加处理逻辑，比如记录日志、发送报警等
});

const _setTimeout = function (a, b){
    return setTimeout(a)
}
const _atob = function (a,b){
    return atob(a)
}
const _btoa = function (a,b){
    return btoa(a)
}

const vm = new VM({
    sandbox: {
        h_log: config.DEBUG?console.log:function (){},
        setTimeout: _setTimeout,
        setInterval: _setTimeout,
        atob: _atob,
        btoa: _btoa,
        config_LOCATION: config.LOCATION,
    }
});
let code = ""
// code += "debugger;" // 便于调试
// 加载框架代码
code += fs.readFileSync("./env/init.js", "utf-8")
code += fs.readFileSync("./env/public/eventTarget.js", "utf-8")
code += fs.readFileSync("./env/bom/userAgentData.js", "utf-8")
code += fs.readFileSync("./env/bom/connection.js", "utf-8")
code += fs.readFileSync("./env/bom/userActivation.js", "utf-8")
code += fs.readFileSync("./env/bom/performance.js", "utf-8")
code += fs.readFileSync("./env/bom/MessageChannel.js", "utf-8")
code += fs.readFileSync("./env/bom/XMLHttpRequest.js", "utf-8")
code += fs.readFileSync("./env/bom/MediaQueryList.js", "utf-8")
code += fs.readFileSync("./env/bom/AudioContext.js", "utf-8")
code += fs.readFileSync("./env/bom/indexedDB.js", "utf-8")
code += fs.readFileSync("./env/bom/plugins.js", "utf-8")
code += fs.readFileSync("./env/bom/navigator.js", "utf-8")
code += fs.readFileSync("./env/bom/location.js", "utf-8")
code += fs.readFileSync("./env/bom/history.js", "utf-8")
code += fs.readFileSync("./env/bom/screen.js", "utf-8")
code += fs.readFileSync("./env/dom/dom.js", "utf-8")
code += fs.readFileSync("./env/dom/element.js", "utf-8")
code += fs.readFileSync("./env/dom/CanvasElement.js", "utf-8")
code += fs.readFileSync("./env/dom/collection.js", "utf-8")
code += fs.readFileSync("./env/dom/document.js", "utf-8")
code += fs.readFileSync("./env/bom/window.js", "utf-8")
code = `(function(){${code}})();` + "\n" + "/* ------环境加载完成------ */\n" +"debugger;\n"
code += fs.readFileSync("./work/work.js", "utf-8")

// 可留可不留
code = `try{${code};debugger}catch(e){h_log(e);debugger;};`
// code += `document.cookie`;
vm.run(code);
// console.log(_cookie)
