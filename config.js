DEBUG = false
// DEBUG = true

const urlString = "https://fzgg.gansu.gov.cn/fzgg/tzgg/list.shtml";
// const urlString = "https://www.douyin.com/video/7487819295116823808";
const url = new URL(urlString);
const LOCATION = {
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
exports.DEBUG = DEBUG
exports.LOCATION = LOCATION
