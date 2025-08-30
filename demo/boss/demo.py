import requests
import subprocess
import os
from urllib.parse import quote
from loguru import logger
from urllib.parse import urlparse

# 获取 main.js 的绝对路径
js_path = os.path.abspath("../../main.js")
js_dir = os.path.dirname(js_path)  # main.js 所在的目录
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
})
url = "https://www.zhipin.com/wapi/zpgeek/job/detail.json"
params = {
    "securityId": "oJ3suR_LBmtZw-p11SDfSMzXs4fnaen3i9KZaYBjorRNwEX4maX7ncd5B4m_0vUdIEcT3rNTgrF2b2B5ALjuZ478MqRN1BZT9wAAGTSreOcPnLBgqMRakN1pJNBegVlQPkOzfeD5zGHFxsgIK4ZugtpWnMKouQ~~",
    "lid": "aJ1xYF8FIXJ.search.2"
}
parsed_url = urlparse(url)


def get_data_first():
    response = session.get(url, params=params)
    # logger.info(f"first status_code: {response.status_code}")
    data = response.json()
    logger.info(data)
    return data


def get_zp_stoken(data):
    seed = data["zpData"]["seed"]
    ts = data["zpData"]["ts"]
    with open("../../main.js", "r", encoding="utf-8") as f:
        js_code = f.read().replace("arg_urlString", url).replace("arg_seed", seed).replace("arg_ts", str(ts))
    stoken = subprocess.check_output(['node', '-e', js_code], cwd=js_dir).strip()
    # stoken = quote(result,safe='')
    logger.info(f"__zp_stoken__: {stoken}")
    return stoken


def get_data_second(stoken):
    session.cookies.update({"__zp_stoken__": stoken})
    # session.cookies.update({"__zp_stoken__": '395dfPDLCmsK3TMKzMyoLBgIPBDshOD4tYD4%2FKjw3PT8%2BOzU%2FPz4zFzEvH8K5wqrCjMKJUcOMOjYqPjs4Nj8wPDc7Gj43xLHCsT4%2FIMOfwrfCosKEwo1Yw4EMGQgqwrYpwqrCuwTCswwrMCXDp8KzwpbCusO4wrXCkMK%2FwqbCt1HCvTnCtgDCtDjCswzCtTHCssKAwrrCmsK2ODkgNAsDXVo0QklcDkJeSFZUTgNBQEUiQklcDkJeSFZUTgNBQEUiMTM%2FO8OVwprDuBc5BgcODwoLCgMCBwcGDwMGDA0EBQAAAQgJDC82wofCucSgwojGssSpxJPFrsOJwq7EscOuxJHCgcSrw7%2FEmsKaxKnDucOIwrPDr8Knw4PCh8OYwrHDjsKzw5PCrsOnwoTDvsKxw4tLw7rClMOswrfDtsKkw5nCmsOgwqzDs8Krwo%2FCncKmwqbCq1LCm8KawpJswp1ewqVNwp3CsUdLwpvCuMKMX0lGwp9Swrt1b0LCo11TTcKpZMKqwr5DU0pfwr5dwrpAX1QNDAM9WAfDjsOK'})
    response = session.get(url, params=params)
    # logger.info(f"second status_code: {response.status_code}")
    logger.info(response.text)


def main():
    data = get_data_first()
    stoken = get_zp_stoken(data)
    get_data_second(stoken)


if __name__ == '__main__':
    main()
