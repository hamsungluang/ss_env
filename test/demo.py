import requests


headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
}
cookies = {
    "__zp_stoken__": "91d9fw4TDiMKdVjkPB2B3V0zCvWHCuFdGVkPCuMKkcMKsUVtZwq1Fb8KBwrNewpfCq8KUwrzCrE7DgsKswpHCqsKlVcKFR8KOwq%2FCv8KlwpHCusKjwqjChsK5w7vCpcKvYMKJwr3CkMOBwp3ChMOWSMO7wqLDsMKewpFNw43ClMOLw7XDscKyw6HDucSlwp7EqMKtw5HDusSpwpTDhMKixKnCpsSTwpfElcKxw43FqMSbxKbFjcKnxKTCtcKYOS8DCAkJBw8MDQ0LBAcNDQsMDxISEAwPEhIQNTHDtMKdw5kzNz00JFFOSwZQYmBEYUQIWkNFNjYNXQQMNis0NDY6wrs0wrcGw4A1wrcEwrw6wrpUND46NcK6woEpJ8K4SwjCtsK9CQ0IDQbCuD8Iw4ZiwoPChwQ%2BLTc6wrTEtT84Fj43Mz45OT4zOCY5GsOKXcKGwocGFCg0GT8zOEI3NzM4QDk9Jzg8JSUzNSQ9BxAQEQ0oQMK5wpvCtMOhMzg%3D"
}
url = "https://www.zhipin.com/wapi/zpgeek/job/detail.json"
params = {
    "securityId": "oJ3suR_LBmtZw-p11SDfSMzXs4fnaen3i9KZaYBjorRNwEX4maX7ncd5B4m_0vUdIEcT3rNTgrF2b2B5ALjuZ478MqRN1BZT9wAAGTSreOcPnLBgqMRakN1pJNBegVlQPkOzfeD5zGHFxsgIK4ZugtpWnMKouQ~~",
    "lid": "aJ1xYF8FIXJ.search.2"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)