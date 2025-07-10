const {VM} = require("vm2");
const fs = require("fs");
const config = require("./config");

const vm = new VM({
    sandbox: {
        h_log: config.DEBUG?console.log:function (){},
        config_LOCATION: config.LOCATION,
    }
});


let code = ""
// 加载框架代码
code += fs.readFileSync("./env/init.js", "utf-8")
code += fs.readFileSync("./env/public/eventTarget.js", "utf-8")
code += fs.readFileSync("./env/bom/navigator.js", "utf-8")
code += fs.readFileSync("./env/bom/location.js", "utf-8")
code += fs.readFileSync("./env/dom/dom.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLAnchorElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLBodyElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLDivElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLHeadElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLHtmlElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLMetaElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLScriptElement.js", "utf-8")
code += fs.readFileSync("./env/dom/document.js", "utf-8")
code += fs.readFileSync("./env/bom/window.js", "utf-8")
code = `(function(){${code}})();` + "\n" + "/* ------环境加载完成------ */\n" +"debugger;\n"
code += fs.readFileSync("./work/bdms.js", "utf-8")

// 可留可不留
code = `try{${code};debugger}catch(e){h_log(e);debugger;};`
vm.run(code);