function get_location(urlString) {
    const url = new URL(urlString);
    return {
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
    }
}
module.exports = {
    get_location,
}


