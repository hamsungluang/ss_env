import requests
import subprocess
import os
from urllib.parse import quote
from loguru import logger
from urllib.parse import urlparse
from urllib.parse import urlencode


# 获取 main.js 的绝对路径
js_path = os.path.abspath("../../main.js")
js_dir = os.path.dirname(js_path)  # main.js 所在的目录
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
})
url = "https://www.zhipin.com/wapi/zpgeek/job/detail.json"
params = {
    "securityId": "L2gL0Qdw6HT8r-C1MDIjSvhsNB55mrI6Ii-BNF5zsl9pfVRUKel9Sr3mdxl6PKfICBR4O5xqegEN9QSA4zsu8yaZcHDrnwnqbFC_o2_-TdtYoYawUG0y51Ne8A~~",
    "lid": "9naX9Xzsv58.search.2"
}
arg_url = "about:blank"



def get_data_first():
    response = session.get(url, params=params)
    # logger.info(f"first status_code: {response.status_code}")
    data = response.json()
    logger.info(data)
    return data


def get_zp_stoken(data):
    seed = data["zpData"]["seed"]
    ts = data["zpData"]["ts"]
    with open("../../vm_runner.js", "r", encoding="utf-8") as f:
        js_code = f.read().replace("arg_urlString", arg_url).replace("arg_seed", seed).replace("arg_ts", str(ts))
    stoken = subprocess.check_output(['node', '-e', js_code + "get_zp_stoken();process.exit();"], cwd=js_dir).strip()
    # stoken = quote(result,safe='')
    logger.info(f"__zp_stoken__: {stoken}")
    logger.info(f"__zp_stoken__长度: {len(stoken)}")
    return stoken


def get_data_second(stoken):
    session.cookies.update({"__zp_stoken__": stoken})
    # session.cookies.update({"__zp_stoken__": 'e8adfMDPDpsK4woPCs0YtAA0DFRQzIT8zIkY5MC86R0UwMzxFRzAzRCcxIMOSwrPEh8K1wpVkw4M%2FPi0zPDA%2BMEU8RzsdMzjEucKxMTI3xITCscOwwqjCiVDDgQPDucKzFMOgwr8AfsOHDcKpwrwPZyMie8K9ODFHPFPDhTHDhQzCvjjCuw%2FCsTPCsjE%2FPDMiPQgLDRY9P09CZQNNW0NfWUkOSkFILTw4Rj7CvMKmNkUIFhUKAQgWFQoBDQMADhVyfH9wexcJChUONjDCpsKzw5LErcWdxLbEmcWqw4jCqMOVwoHEr8K1w4PCjcOSwrLEucKlw6TCs8O%2FwpPEvsK%2Bw7jCicOowqHDoMKVxYbCi8OcwpvCjcK8w7nCgMOfwoDDs8Kew5DCpcOwwrjDrV7DncK5wrbCkcKXVcKdwqbDucK1w73CrMOFwrfCnsOEVcOEQsKvwo9owqvCsFdRwqpOwptMa8KFV8KxwqFRT1HCrXBIFmZhVm9dUFgJZT9kFE3Dgg%3D%3D'})
    response = session.get(url, params=params)
    # logger.info(f"second status_code: {response.status_code}")
    logger.info(response.text)


def main():
    data = get_data_first()
    stoken = get_zp_stoken(data)
    get_data_second(stoken)


if __name__ == '__main__':
    main()
