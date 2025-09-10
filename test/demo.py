import requests


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
}
cookies = {
    "aRzUAYpFuoMPO": "60ZXi4Vb5y1Iuf3OvXYK54ps30NYy7p3riEbo.sfch8lxltNo_aO2CrBdm4jBW5ts_rJuG.k9aZLeUukU7E_6MvA",
    "aRzUAYpFuoMPP": "0h6y56DtQv52rbGG3ES90qiBiRbJZ65eU4xpsAaLv5VZVYKzeXsOoE64fRdrEKmi56xwfGBCOpvFaMzMdSskRIOOtuzMJx4Cjduw0bnPZCMBB.CLVzrL1lfClOGCXsulBS10Qo0YDRzjkAztHgPG70DQwzOQlXbSMax1ppXbVklGHnQyeCzGrQ94vT2xezefofgNXD3x0OCYimqH82tCyH5u41n3dMTxdiOWAYUPEV4ClBBi8AAWE0oyvPEouE21bwCouJOcG6l_CjTQjTcOKhWl5vC9DnatmiTs5byHGCZRe4VgZdbIJ3usjt08vIzCM1_oPBoHuIwzdrXFSbHqPalh1DrPLkb.33dwLfU8VJfXD52QYU17zgiD3.Qg.sPJXG60WHg87ucdM_GSWu77tGzYhvE4gS4GlO_UCTw8f138U_sZbI8rznosXlsaBGfxlz7v1gl6V6Gzbm33iVJQLkA"
}
url = "https://pmos.ah.sgcc.com.cn:20080/"
params = {
    # "oOOl058jgLaI": "1756997053334"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)