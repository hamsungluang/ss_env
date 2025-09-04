const { VM } = require("vm2");
const v8 = require('v8');
const _vm = require('vm');
const { get_location } = require("./tools/func_tools");
const EnvCodeLoader = require("./tools/env_loader");
let CONFIG = require('./config');

class VMRunner {
    constructor(urlString) {
        this.undetectable = this._initUndetectable();
        this.sandbox = this._createVMSandbox(urlString);
    }
    _initUndetectable() {
        v8.setFlagsFromString('--allow-natives-syntax');
        const undetectable = _vm.runInThisContext("%GetUndetectable()");
        v8.setFlagsFromString('--no-allow-natives-syntax');
        return undetectable;
    }
    _createVMSandbox(urlString) {
        return {
            h_log: CONFIG.DEBUG ? (...args) => {
                if (!CONFIG.DEBUG_INCLUDE_WINDOW) {
                    const hasVWindow = args.some(arg => typeof arg === 'string' && arg.includes('[v] window'));
                    const hasGet = args.some(arg => typeof arg === 'string' && arg.includes('[get]'));
                    if (hasVWindow && hasGet) return;
                }
                console.log.apply(console, args);
            } : () => {},
            config_LOCATION: get_location(urlString),
            config_config: CONFIG,
            MessageChannel: MessageChannel,
            atob: atob,
            btoa: btoa,
            URL: URL,
            URLSearchParams: URLSearchParams,
            TextDecoder: TextDecoder,
            undetectable: this.undetectable,
        };
    }
    run(code) {
        const vm = new VM({
            sandbox: this.sandbox,
        });
        return vm.run(code);
    }
};


// --------------加载rs6-----------------------------------
function rs6() {
    let urlString = "arg_urlString";
    let frameworkCode = ""
    const workScripts = [
        "./work/rs6.js",
        "./work/rs6_ts.js",
    ]
    const workScriptCode = 'document.cookie;'
    if (CONFIG.DEBUG) {
        urlString = "https://sugh.szu.edu.cn/Html/News/Columns/7/2.html";
        // urlString = "https://fzgg.gansu.gov.cn/fzgg/tzgg/list.shtml";
        frameworkCode = `meta2["_content"] = "arg_content";`
    };
    const envCodeLoader = new EnvCodeLoader(frameworkCode, workScripts, workScriptCode);
    const code = envCodeLoader.load();
    const vm = new VMRunner(urlString);
    const result = vm.run(code);
    console.log(result)
};

// ----------------加载抖音js------------------------------
function get_a_bogus() {
    let urlString = "arg_urlString";
    let frameworkCode = ""
    let url = "_simon_url";
    const workScripts = [
        "./work/bdms.js",
    ]
    if (CONFIG.DEBUG) {
        urlString = "https://www.douyin.com/video/7487819295116823808";
        url = "https://www.douyin.com/aweme/v1/web/aweme/detail/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=7487819295116823808&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=1&cpu_core_num=8&version_code=190500&version_name=19.5.0&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&browser_online=true&engine_name=Blink&engine_version=138.0.0.0&os_name=Windows&os_version=10&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7493790376601454116&uifid=1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65&verifyFp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&fp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&msToken=mV5RIaPOgRQOVuJhNcxuN1hIevf-5U_HEFGHRNLwOLuopVPEvRpx0Xp6qZl2JKtFzaWWjb_wcqvqQXsovaKYiwXdALgcJizjU83ngHT3L4sL_oi0TiQVhQyQRSB1ALL0I6t2Au2vGAITdiImpqTySyX4umxXm0joLIDm_MWMi5odquJ6PvlfWjM%3D";
    };
    let workScriptCode = `let get_abgous=function(simon_url){var t={"aid":6383,"pageId":6241,"paths":["^/webcast/","^/aweme/v1/","^/aweme/v2/","/v1/message/send","^/live/","^/captcha/","^/ecom/"],"boe":false,"ddrt":8.5,"ic":8.5};window.bdms.init(t);xhr=new XMLHttpRequest();xhr.bdmsInvokeList=[{"args":["GET",simon_url,true]},{"args":["Accept","application/json, text/plain, */*"]},{"args":["uifid","163eead721bc91ca6f3a3cb4766a73c0638fabced1012e02c28bcbf3169aca5cb1348391d76f63e2f9da4d719c4da32217a9b2949c98efebcf51e3c9c7e1d0966c784065b26bf6b319b04de558d7cb318383c29fa3a83356e1edcec69ee2d2b9c261a4ab36ad07403666f4f2b321382d22bc25bc620e23bcf48eaac8ccce297a7305d63b5b82ddf5a8eb9dc5afb305639b5d8324a5feb6a13e74d04fbdcf11b6"]}];xhr.send(null);return window.a_bogus};a_bougs=get_abgous("${url}");`
    const envCodeLoader = new EnvCodeLoader(frameworkCode, workScripts, workScriptCode);
    const code = envCodeLoader.load();
    const vm = new VMRunner(urlString);
    const result = vm.run(code);
    console.log(result)
};

// --------------加载zp_stoken----------------------------------------
function get_zp_stoken() {
    let urlString = "arg_urlString";
    let frameworkCode = ``;
    let workScriptCode = `n = (new window.ABC).z("arg_seed", parseInt("arg_ts") + 60 * (480 + (new Date).getTimezoneOffset()) * 1e3);result = encodeURIComponent(n)`
    if (CONFIG.DEBUG) {
        urlString = "about:blank";
        frameworkCode = `t = "rwclXXRSpoLviCPkW+/LLtV9DvgcO4cbUI9Q1HvD88b4rKbSZifvZPNZeH1lECpKKW6hAImTC/6NvqNskhWywQ=="
// i = "1756347222269"
// n = (new window.ABC).z(t, parseInt(i) + 60 * (480 + (new Date).getTimezoneOffset()) * 1e3)
// result = encodeURIComponent(n)`
        workScriptCode = ``
    }
    const workScripts = [
        "./work/__zp_stoken__.js",
    ]
    const envCodeLoader = new EnvCodeLoader(frameworkCode, workScripts, workScriptCode);
    const code = envCodeLoader.load();
    const vm = new VMRunner(urlString);
    result = vm.run(code);
    console.log(result)
};

module.exports = {
    get_a_bogus,
    rs6,
    get_zp_stoken,
};
