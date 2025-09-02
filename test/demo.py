import requests


headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
}
cookies = {
    "Hm_lvt_194df3105ad7148dcf2b98a91b5e727a": "1756795601",
    "HMACCOUNT": "AAEE923BC9383FF7",
    "__g": "-",
    "__c": "1756797048",
    "__l": "l=%2Fwww.zhipin.com%2Fgongsi%2Fjob%2Ff00391bc24b42ac41HF82d60FFY~.html%3Fka%3Dlook-all-position&s=3&friend_source=0&s=3&friend_source=0",
    "__a": "94042637.1756797048..1756797048.5.1.5.5",
    "Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a": "1756797762",
    "__zp_stoken__": "e8adfMTPDnMK%2Fwo3CskY3FwMCFQ5ELz4zKAFHMS8wMDsxM0YyOTEzPhA%2FIXDDhFHCr8KUZMOJRzAsM0ZHMDFFRjBFHDMyxL7CvzAyLSrCslDCrMKDZ8OPAsO5wrkDw67CvgDChMKwA8KowrwVUC0je8OHPz9GPFnCsj%2FDhAzDhD%2FDhQ7CsTnDhT8%2BPDk1MwkLFwEzPk9IUg1MW0lYZ0gOQFZWLDwyMTDCvcKmLDIWFxUAFhYXFQAWAwIAFAJ8fX96fAkICg8JKDHCpsK5xJzEnsWHxLbEk8Wtw5bCqcSfwqfEkMKvxKHCmsOKwpHEosOww4vCocStwqfErcOzw53Ct8Oqw73DlcKaw6zCjMO0wpTDtsK4xIXCkMOhwp%2FEhMKCwpRYw6HCpsKJwrnCjmXDosKfwpZVwqfCkcSHwrTDvcK2wrLCqcKfw4RPwrNMwq7Cj2LCrMK%2BVlHCoEnCpU1rf0DCv8KgUVVmwqNxSAxRb1dvZ2dmCGVFU2g9w4I%3D"
}
url = "https://www.zhipin.com/gongsi/job/f00391bc24b42ac41HF82d60FFY~.html"
params = {
    "ka": "look-all-position"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)