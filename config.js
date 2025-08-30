const CONFIG = {};

CONFIG.DEBUG = true;
// CONFIG.DEBUG = false;

// 为false时，不输出window下方法的gatter
CONFIG.DEBUG_INCLUDE_WINDOW = true;
CONFIG.DEBUG_INCLUDE_WINDOW = false;

let urlString;
if (CONFIG.DEBUG === false) {
    urlString = "arg_urlString";
} else {
    //urlString ="https://sugh.szu.edu.cn/Html/News/Columns/7/2.html";
    //urlString = "https://fzgg.gansu.gov.cn/fzgg/tzgg/list.shtml";
    // urlString = "https://www.douyin.com/video/7487819295116823808";
    urlString = "https://www.zhipin.com/job_detail/a26cc8b0574df54a1HJ_0967EldQ.html?ka=index_rcmd_job_1";
}


const url = new URL(urlString);
CONFIG.LOCATION = {
    ancestorOrigins: {},
    href: url.href,
    origin: url.origin,
    protocol: url.protocol,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash
};

module.exports = CONFIG;
