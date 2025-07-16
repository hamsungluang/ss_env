const {VM} = require("vm2");
const fs = require("fs");
const xhr2 = require("xhr2");
const config = require("./config");

const vm = new VM({
    sandbox: {
        h_log: config.DEBUG ? console.log : function () {
        },
        config_LOCATION: config.LOCATION,
        MessageChannel: MessageChannel,
        atob: atob,
        btoa: btoa,
        URL: URL,
        URLSearchParams: URLSearchParams,
        TextDecoder: TextDecoder,
        // simon_url: "https://www.douyin.com/aweme/v1/web/aweme/detail/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=7487819295116823808&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=1&cpu_core_num=8&version_code=190500&version_name=19.5.0&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&browser_online=true&engine_name=Blink&engine_version=138.0.0.0&os_name=Windows&os_version=10&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7493790376601454116&uifid=1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65&verifyFp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&fp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&msToken=mV5RIaPOgRQOVuJhNcxuN1hIevf-5U_HEFGHRNLwOLuopVPEvRpx0Xp6qZl2JKtFzaWWjb_wcqvqQXsovaKYiwXdALgcJizjU83ngHT3L4sL_oi0TiQVhQyQRSB1ALL0I6t2Au2vGAITdiImpqTySyX4umxXm0joLIDm_MWMi5odquJ6PvlfWjM%3D",
        simon_url: "_simon_url"
        // XMLHttpRequest: xhr2.XMLHttpRequest
    }
});


let code = ""
// 加载框架代码
code += fs.readFileSync("./env/init.js", "utf-8")
code += fs.readFileSync("./env/public/eventTarget.js", "utf-8")
code += fs.readFileSync("./env/bom/performance.js", "utf-8")
code += fs.readFileSync("./env/bom/EventSource.js", "utf-8")
code += fs.readFileSync("./env/bom/NetworkInformation.js", "utf-8")
code += fs.readFileSync("./env/bom/NavigatorUAData.js", "utf-8")
code += fs.readFileSync("./env/bom/StorageManager.js", "utf-8")
code += fs.readFileSync("./env/bom/history.js", "utf-8")
code += fs.readFileSync("./env/bom/screen.js", "utf-8")
code += fs.readFileSync("./env/bom/plugins.js", "utf-8")
code += fs.readFileSync("./env/bom/navigator.js", "utf-8")
code += fs.readFileSync("./env/bom/location.js", "utf-8")
code += fs.readFileSync("./env/dom/dom.js", "utf-8")
code += fs.readFileSync("./env/dom/DOMTokenList.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLAnchorElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLAudioElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLBodyElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLDivElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLHeadElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLHtmlElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLMetaElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLScriptElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLSpanElement.js", "utf-8")
code += fs.readFileSync("./env/dom/Element/HTMLCanvasElement.js", "utf-8")
code += fs.readFileSync("./env/dom/text.js", "utf-8")
code += fs.readFileSync("./env/dom/document.js", "utf-8")
code += fs.readFileSync("./env/bom/window.js", "utf-8")
code = `(function(){${code}})();` + "\n" + "/* ------环境加载完成------ */\n" + "debugger;\n"
code += fs.readFileSync("./work/bdms.js", "utf-8")

// 可留可不留
code = `try{${code};}catch(e){h_log(e);debugger;};`
a_bougs = vm.run(code);
console.log(a_bougs)
process.exit()