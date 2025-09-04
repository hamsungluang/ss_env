import requests
import subprocess
import os
from lxml import html
from loguru import logger
from urllib.parse import urlparse

# 获取 main.js 的绝对路径
js_path = os.path.abspath("../../main.js")
js_dir = os.path.dirname(js_path)  # main.js 所在的目录
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
})

# 深圳大学总医院
url = "https://sugh.szu.edu.cn/Html/News/Columns/7/2.html"
# 甘肃省发展和改革委员会
# url = "https://fzgg.gansu.gov.cn/fzgg/tzgg/list.shtml"
# 维普中文期刊服务平台
# url = "https://qikan.cqvip.com/Qikan/Journal/JournalGuid?from=index"
# 欧冶
# url = "https://www.ouyeel.com/steel/search?pageIndex=0&pageSize=50"
# 天津税务局登录页面
# url = "https://tpass.tianjin.chinatax.gov.cn:8443/#/login"
# 信用中国
# url = "https://www.creditchina.gov.cn/"
# 企业信用信息系统
# url = "https://www.gsxt.gov.cn/"
# 深圳市市场监督局（有jsl）
# url = "https://amr.sz.gov.cn/outer/doublePublic/list.html"

parsed_url = urlparse(url)


def get_data_first():
    resp = session.get(url)
    resp.encoding = 'utf-8'
    logger.info("第一次请求：{}", resp.status_code)
    return resp.content


def parse_html(html_content):
    # logger.info(html_content)
    tree = html.fromstring(html_content)
    content = tree.xpath("//meta[2]/@content")[0]
    # logger.info(content)
    script = tree.xpath("//script[1]/text()")[0]
    with open("../../work/rs6.js", "w", encoding="utf-8") as f:
        f.write(script)
    # logger.info(script)
    ts_url = tree.xpath("//script[2]/@src")[0]
    return content, script, ts_url


def get_cookie(content, script, ts_url):
    script_ts = session.get(f"{parsed_url.scheme}://{parsed_url.netloc}" + ts_url).text
    with open("../../work/rs6_ts.js", 'w', encoding="utf-8") as f:
        f.write(script_ts)
    with open("../../vm_runner.js", "r", encoding="utf-8") as f:
        js_code = f.read().replace("arg_content", content).replace("arg_urlString", url)
    result = subprocess.check_output(['node', '-e', js_code + "rs6();process.exit();"], cwd=js_dir)
    # logger.info(f"cookie: {result}")
    cookie_list = result.split(';')[0].split('=')
    cookie_name = cookie_list[0]
    logger.info("cookie_name：>{}", cookie_name)
    cookie_value = cookie_list[1]
    logger.info("cookie_value：{}", cookie_value)
    logger.info("cookie长度：{}", len(cookie_value))
    return cookie_name, cookie_value


def get_data_second(cookie_name, cookie_value):
    session.cookies.update({cookie_name: cookie_value})
    resp = session.get(url)
    resp.encoding = 'utf-8'
    logger.info("第二次请求：{}", resp.status_code)
    logger.info(resp.text)


def main():
    c = get_data_first()
    content, script, ts_url = parse_html(c)
    cookie_name, cookie_value = get_cookie(content, script, ts_url)
    get_data_second(cookie_name, cookie_value)


if __name__ == '__main__':
    main()
