const { VM } = require("vm2");
const fs = require("fs");
const xhr2 = require("xhr2");
const v8 = require('v8');
const _vm = require('vm');
let code = require('./env_loader');
const CONFIG = require('./config');
v8.setFlagsFromString('--allow-natives-syntax');
let undetectable = _vm.runInThisContext("%GetUndetectable()");
v8.setFlagsFromString('--no-allow-natives-syntax');


const vm = new VM({
    sandbox: {
        h_log: CONFIG.DEBUG ? function(...args) {
            if (!CONFIG.DEBUG_INCLUDE_WINDOW) {
                const hasVWindow = args.some(arg => typeof arg === 'string' && arg.includes('[v] window'));
                const hasGet = args.some(arg => typeof arg === 'string' && arg.includes('[get]'));
                
                if (hasVWindow && hasGet) return;
            }
            console.log.apply(console, args);
        } : function () {
        },
        config_LOCATION: CONFIG.LOCATION,
        MessageChannel: MessageChannel,
        atob: atob,
        btoa: btoa,
        URL: URL,
        URLSearchParams: URLSearchParams,
        TextDecoder: TextDecoder,
        undetectable: undetectable,
        // simon_url: "https://www.douyin.com/aweme/v1/web/aweme/detail/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=7487819295116823808&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=1&cpu_core_num=8&version_code=190500&version_name=19.5.0&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&browser_online=true&engine_name=Blink&engine_version=138.0.0.0&os_name=Windows&os_version=10&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7493790376601454116&uifid=1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65&verifyFp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&fp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&msToken=mV5RIaPOgRQOVuJhNcxuN1hIevf-5U_HEFGHRNLwOLuopVPEvRpx0Xp6qZl2JKtFzaWWjb_wcqvqQXsovaKYiwXdALgcJizjU83ngHT3L4sL_oi0TiQVhQyQRSB1ALL0I6t2Au2vGAITdiImpqTySyX4umxXm0joLIDm_MWMi5odquJ6PvlfWjM%3D",
        // simon_url: "_simon_url"
        // XMLHttpRequest: xhr2.XMLHttpRequest
        // setInterval:setInterval,
        // setTimeout: setTimeout,
    },
});



// ----------------加载抖音js------------------------------
// code += fs.readFileSync("./work/bdms.js", "utf-8")


// --------------加载rs6----------------------------------------
// code += fs.readFileSync("./work/rs6.js", "utf-8")
// code += fs.readFileSync("./work/rs6_ts.js", "utf-8")
// code += 'document.cookie;'


// --------------加载zp_stoken----------------------------------------
code += fs.readFileSync("./work/__zp_stoken__.js", "utf-8")
if (CONFIG.DEBUG === true) {
    code += `t = "rwclXXRSpoLviCPkW+/LLtV9DvgcO4cbUI9Q1HvD88b4rKbSZifvZPNZeH1lECpKKW6hAImTC/6NvqNskhWywQ=="
i = "1756347222269"
n = (new window.ABC).z(t, parseInt(i) + 60 * (480 + (new Date).getTimezoneOffset()) * 1e3)
result = encodeURIComponent(n)`
} else {
    code += `n = (new window.ABC).z("arg_seed", parseInt("arg_ts") + 60 * (480 + (new Date).getTimezoneOffset()) * 1e3);result = encodeURIComponent(n)`
}


// 可留可不留
// code = `try{${code};}catch(e){h_log(e);debugger;};`


result = vm.run(code);
console.log(result)
process.exit()