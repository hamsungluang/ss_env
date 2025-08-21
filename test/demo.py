import requests


headers = {
    # "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    # "Accept-Language": "en-US,en;q=0.9",
    # "Cache-Control": "no-cache",
    # "Connection": "keep-alive",
    # "Pragma": "no-cache",
    # "Referer": "https://fzgg.gansu.gov.cn/fzgg/tzgg/list.shtml",
    # "Sec-Fetch-Dest": "document",
    # "Sec-Fetch-Mode": "navigate",
    # "Sec-Fetch-Site": "same-origin",
    # "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    # "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    # "sec-ch-ua-mobile": "?0",
    # "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    # "Path": "/",
    "4hP44ZykCTt5O": "600IZ5dbm.IRkYPZh3p0UKOCXZZ3TlYD0hwUWaMUjtpqwKzJNFibZ5GiftDx4k.O2Pz1BRjoEQtiKe685ZCWTvSa",
    # "7d0f4f97e8317b129e": "3601cf1eb5196db6546ba2733010c134",
    "4hP44ZykCTt5P": "0CGO0Hv5mzgzl7s6.39VydppBehQJG9RThIgo9XkorgYSq9TulEeH0C4tWGx9Zm8icZdxX0pOApToa4Am7BZ.RN7bwfRMER5.cHiFcM2CnhDSFkt3IqiIX4EqKQW0zdfbehp.jP.S1FCiYHij_370WdjImbg7JAXwjRlaYFaZyOe.xcMFBbOv0uarZK550C.jS8vsgpgBnD.wvJAYCXXEogicRU.oORctTvKmD0xGgifnXtNNHrrAD1xECDXYo66U"
}
url = "https://fzgg.gansu.gov.cn/fzgg/tzgg/list.shtml"
response = requests.get(url, headers=headers, cookies=cookies)

print(response.text)
print(response)