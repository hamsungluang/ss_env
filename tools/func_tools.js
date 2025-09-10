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

/**
 * 将代码保存到指定文件
 * @param {string} code - 要保存的代码内容
 * @param {string} filePath - 目标文件路径（绝对路径或相对路径）
 * @param {string} [encoding='utf8'] - 文件编码，默认为utf8
 * @returns {boolean} - 保存成功返回true，失败返回false
 */
function saveCodeToFile(code, filePath, encoding = 'utf8') {
    try {
        const fs = require('fs');
        const path = require('path');
        
        // 确保目录存在
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // 写入文件
        fs.writeFileSync(filePath, code, encoding);
        // console.log(`代码已成功保存到: ${filePath}`);
        return true;
    } catch (error) {
        console.error(`保存代码失败: ${error.message}`);
        return false;
    }
}


module.exports = {
    get_location,
    saveCodeToFile,
}


