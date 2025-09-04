import requests
import execjs
import re
from loguru import logger
import subprocess
import os
from lxml import html
from loguru import logger
from urllib.parse import urlparse

# 获取 main.js 的绝对路径
js_path = os.path.abspath("../../main.js")
js_dir = os.path.dirname(js_path)  # main.js 所在的目录
parsed_url = urlparse("https://amr.sz.gov.cn/outer/doublePublic/list.html")

session = requests.session()

headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://amr.sz.gov.cn",
    "Referer": "https://amr.sz.gov.cn/outer/doublePublic/list.html",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
}
cookies = {
    "Path": "/",
    # "EKyd12pLzdcZO": "60Ycz7lmm0VQr.VHGnQaXS6_IoQ9vqnk55f6SMPeT5ES_md2kEbst6Alnwx9S_K7w.GGT.lruBvF3ATS6GBEfg1A",
    # "__jsluid_s": "7bbfdc0aebb01b23f4efdded98d316f9",
    "Hm_lvt_f89f708d1e989e02c93927bcee99fb29": "1756799228",
    "HMACCOUNT": "E3E9B31BB809A6FE",
    "arialoadData": "false",
    "_yfxkpy_ssid_10001435": "%7B%22_yfxkpy_firsttime%22%3A%221756799227402%22%2C%22_yfxkpy_lasttime%22%3A%221756799227402%22%2C%22_yfxkpy_visittime%22%3A%221756810736277%22%2C%22_yfxkpy_cookie%22%3A%2220250902154707403692907552823442%22%7D",
    "Hm_lpvt_f89f708d1e989e02c93927bcee99fb29": "1756810949",
    "SF_cookie_35": "97592707",
    # "__jsl_clearance_s": "1756868010.862|0|UotewLpzEotsDasy22LAdo1%2FLuo%3D",
    "JSESSIONID": "0000fy4SvI0A8RfPc15fSc3bgA7:-1",
    "_yfxkpy_ssid_10009122": "%7B%22_yfxkpy_firsttime%22%3A%221756810972864%22%2C%22_yfxkpy_lasttime%22%3A%221756868012695%22%2C%22_yfxkpy_visittime%22%3A%221756868012695%22%2C%22_yfxkpy_cookie%22%3A%2220250902190252865735479778566436%22%2C%22_yfxkpy_returncount%22%3A%221%22%7D",
    "EKyd12pLzdcZP": "0_05U01ttSST2dBw30KCItCWiaP.rqxE6.N1i_YFGVrWEr1.xXIMM3LIof10cltnJ74KDiTAdO43rqpXEokz0Ioul5G7EUS8kntKAxVxWeuKamhE87FGvAK7T2YT4vmdEXFI7xFQpElgc.togVKaVW5NyGRQ512QXC.pxq.ZxITw6YwPehZyGZT78KENI5u6lS0stx4heSETvfxR7hYcWWZVKHJl1ygoLahgIr.0FDPhHxXueuRVsPDLmGToivg278B_ZVwp0o0x512UC4MthMy1im__gu5XCj9JbXr6IJ5Kx7sXzN_K2ZpnMGOnm0yS1hJucSZJpVdACi8aiDTu8umIk1AoLTXCa86nU3zCmlWbZJy98uDEnTo3Vhg1NwmUI_gFCnyhftslzvWQpbux2rNv4kkaPLJMUsSz5Vdd5mqQ"
}
url = "https://amr.sz.gov.cn/outer/xzcf/loading_xzcf_list.do"
data = {
    "action": "getXZCFGSList",
    "Type": "",
    "keyword": "",
    "pageIndex": "3"
}
response = session.post(url, headers=headers, data=data)

set_cookie = response.headers['set-cookie']
cookie1 = {set_cookie.split(';')[0].split('=')[0]: set_cookie.split(';')[0].split('=')[1]}
logger.info(cookie1)
jsl_ = response.text.split('cookie=')[1].split('location')[0]

cookie = re.search('<script>document.cookie=(.*?);location', response.text).group(1)
cookie_value = execjs.eval(cookie)
logger.info(cookie_value)

cookie1.update({cookie_value.split(';')[0].split('=')[0]: cookie_value.split(';')[0].split('=')[1]})

response = session.post(url, headers=headers, cookies=cookie1, data=data)

ress = response.text.replace('<script>', '').replace('</script>', '')


with open('t_md5.js', "r", encoding='utf-8') as f:
    js_code = f.read()

ctx1 = execjs.compile(js_code)
__jsl_clearance_s = ctx1.call('jsl_clearance_s', ress)
logger.info(__jsl_clearance_s)

cookie1['__jsl_clearance_s'] = __jsl_clearance_s.split(';')[0].split('=')[1]

session.cookies.update(cookie1) 
response = session.post(url, headers=headers, data=data)
print(response.text)

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
    # print(ts_url)
    # script_ts = session.get(f"{parsed_url.scheme}://{parsed_url.netloc}" + ts_url).text
    # with open("../../work/rs6_ts.js", 'w', encoding="utf-8") as f:
    #     f.write(script_ts)
    with open("../../main.js", "r", encoding="utf-8") as f:
        js_code = f.read().replace("arg_content", content).replace("arg_urlString", url)
    result = subprocess.check_output(['node', '-e', js_code], cwd=js_dir)
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
    resp = session.post(url, headers=headers, data=data)
    resp.encoding = 'utf-8'
    logger.info("第二次请求：{}", resp.status_code)
    logger.info(resp.text)


def main():
    content, script, ts_url = parse_html(response.content)
    cookie_name, cookie_value = get_cookie(content, script, ts_url)
    get_data_second(cookie_name, cookie_value)

main()