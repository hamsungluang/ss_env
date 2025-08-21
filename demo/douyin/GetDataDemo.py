import requests
import subprocess
import os
from urllib.parse import quote
from loguru import logger

# 获取 main.js 的绝对路径
js_path = os.path.abspath("../../main.js")
js_dir = os.path.dirname(js_path)  # main.js 所在的目录

headers = {
    "referer": "https://www.douyin.com/video/7487819295116823808",
    "uifid": "1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}
cookies = {
    "hevc_supported": "true",
    "fpk1": "U2FsdGVkX1/GPpsgMvLJ5KgvDuHa0nrKjyE5tJhFI3gL8puDl+kswuwosEb4v5NUk4QBa4f+Gt3QzqbpB/tmnA==",
    "fpk2": "e8db1a910ee088b469ecfd2b6a9b9da5",
    "UIFID": "1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65",
    "xgplayer_user_id": "677507925069",
    "bd_ticket_guard_client_web_domain": "2",
    "d_ticket": "ef39007d5af780b72e82f913ff958f3d64d46",
    "passport_assist_user": "CkDSnwnwXMVK8G-0XDumTmUdBg-7bWLMtNkrkTZkTQOsiEfoqV2t2cYdfr91Du3i3FaXVI0-QFaRAuvjQlY5pJ9lGkoKPAAAAAAAAAAAAABO4kVchppTPXJtfnJw2eu0LiowKXM5QXfQP0TK-cOLWiJ1LsHc0OcUuYp6x3cNDODEWhDG7-4NGImv1lQgASIBA2SPb_o%3D",
    "n_mh": "l-Dd1N6QVnmq8vqdzEk67zdjgHNBZm9Jpzcnaeitzxg",
    "uid_tt": "644f5662a8f94d2065a10a4dac7d1c8b",
    "uid_tt_ss": "644f5662a8f94d2065a10a4dac7d1c8b",
    "sid_tt": "548b8428e29515b851c20e8abd797cc9",
    "sessionid": "548b8428e29515b851c20e8abd797cc9",
    "sessionid_ss": "548b8428e29515b851c20e8abd797cc9",
    "is_staff_user": "false",
    "login_time": "1744784343368",
    "SelfTabRedDotControl": "%5B%5D",
    "_bd_ticket_crypt_cookie": "e861aea8f0a7c125e6bdc739159104d3",
    "live_use_vvc": "%22false%22",
    "enter_pc_once": "1",
    "session_tlb_tag": "sttt%7C5%7CVIuEKOKVFbhRwg6KvXl8yf_________pH85siFomGNXe8Ut2V5IlWNHiWorZpFkZXsn1eoO0DwA%3D",
    "SEARCH_RESULT_LIST_TYPE": "%22single%22",
    "s_v_web_id": "verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ",
    "__security_mc_1_s_sdk_crypt_sdk": "b1cb8ee0-44ce-b712",
    "__security_mc_1_s_sdk_cert_key": "1426fdc6-441d-b190",
    "__security_mc_1_s_sdk_sign_data_key_web_protect": "0b7880d8-4ebf-94b7",
    "passport_csrf_token": "85fe29224e40ca1992f8c8893a3da04c",
    "passport_csrf_token_default": "85fe29224e40ca1992f8c8893a3da04c",
    "dy_swidth": "1536",
    "dy_sheight": "864",
    "is_dash_user": "1",
    "sid_guard": "548b8428e29515b851c20e8abd797cc9%7C1751850764%7C5184000%7CFri%2C+05-Sep-2025+01%3A12%3A44+GMT",
    "sid_ucp_v1": "1.0.0-KDg5MzVlNjY0NThlY2I0MDY5NzhlZWQ2ZGExOTc4YTJjMDIzOWE1MjQKIAjahMCl_81jEIy-rMMGGO8xIAwwy5b9vwY4B0D0B0gEGgJscSIgNTQ4Yjg0MjhlMjk1MTViODUxYzIwZThhYmQ3OTdjYzk",
    "ssid_ucp_v1": "1.0.0-KDg5MzVlNjY0NThlY2I0MDY5NzhlZWQ2ZGExOTc4YTJjMDIzOWE1MjQKIAjahMCl_81jEIy-rMMGGO8xIAwwy5b9vwY4B0D0B0gEGgJscSIgNTQ4Yjg0MjhlMjk1MTViODUxYzIwZThhYmQ3OTdjYzk",
    "douyin.com": "",
    "device_web_cpu_core": "8",
    "device_web_memory_size": "8",
    "architecture": "amd64",
    "publish_badge_show_info": "%220%2C0%2C0%2C1752119037060%22",
    "download_guide": "%223%2F20250710%2F0%22",
    "xg_device_score": "7.4996782433341505",
    "stream_player_status_params": "%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22",
    "volume_info": "%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Atrue%2C%22volume%22%3A0.379%7D",
    "WallpaperGuide": "%7B%22showTime%22%3A1752562777408%2C%22closeTime%22%3A0%2C%22showCount%22%3A1%2C%22cursor1%22%3A28%2C%22cursor2%22%3A8%2C%22hoverTime%22%3A1752565402633%7D",
    "strategyABtestKey": "%221752628383.172%22",
    "stream_recommend_feed_params": "%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1536%2C%5C%22screen_height%5C%22%3A864%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A8%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22",
    "__ac_nonce": "068771ec200e2983bd1cd",
    "__ac_signature": "_02B4Z6wo00f017j0.8QAAIDCZ68MikLbCRO41PtAAIZSe8",
    "ttwid": "1%7CPMPL2xrdQQEH6Y-XuH98ZAF8BnnN4185vBDcobEG--g%7C1752637135%7Cbff07764c701df2ec3fefcb4d9a4465e5b29c72c6e2f1e334c3ddddbea78f523",
    "odin_tt": "a563822f13c49e4c71249ddc96bbf581b5bcbe2827eaf9ff6473f60b4523fd12426732c9b022604cc2a02ce4e5994949746ea60119a3704d1afd2aa5f6a9fdae",
    "biz_trace_id": "8966f7f7",
    "gulu_source_res": "eyJwX2luIjoiYTlmMjU3NzAxMWQ2OTIyYjc5NWQ5Zjk3NjY1OWVkOTNkMGQ2NjBjMWZhMmNkYzdjMGI4NmI5YTU2YjlhYmU1OCJ9",
    "sdk_source_info": "7e276470716a68645a606960273f276364697660272927676c715a6d6069756077273f276364697660272927666d776a68605a607d71606b766c6a6b5a7666776c7571273f275e58272927666a6b766a69605a696c6061273f27636469766027292762696a6764695a7364776c6467696076273f275e582729277672715a646971273f2763646976602729277f6b5a666475273f2763646976602729276d6a6e5a6b6a716c273f2763646976602729276c6b6f5a7f6367273f27636469766027292771273f27363531353d3632363337303234272927676c715a75776a716a666a69273f2763646976602778",
    "bit_env": "oVx7UoLzOc1jSEWVw4oBap5_1HB6MF-OV6yDrrTv1agOnhWZjBtTv-lS_zKxyhu1xMkdPNTNAbezc-GT-kNjwZObSlwifS8ygX92Spb3sII2H4H_ltSe1-p7ZzsRiEbNtSH1KoMK-TVSxhmfCTXxq5Mp8f-yFYxMcsAEgsPQD84oxicmtupk0bnBW1wDnYMLwzde0Ry8yWWzsRKUhukgzYMyZQcce2Hwi-vlhA2ZSGWIX5UQeKmI33YUNUWW9aCynF432ZSGB4WNJWPC1sCFCEnCPszNzbi6wiYh3uMhpEghKFn6nOzmvO6S53eYPmt-aC8lBkqlv16Blhx-coihStx_YQi2KY4dNQYDdRz3BjxYR0ujFxKla782PtQH_Cvk2Vj541fYPnWzGkWFjbY1iHKfmW138kHTMlXQHNB5mWc6KWKj2-crosxArsZj3xzYh4XWGvZROuBGRXWnFK2uIj8caCu-Couprw-vgD52BBgTpEdbNxrcBTR4ZFkE_jzo",
    "passport_fe_beating_status": "false",
    "IsDouyinActive": "true",
    "home_can_add_dy_2_desktop": "%220%22",
    "bd_ticket_guard_client_data": "eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCTk90aHNTMUt1NmlENUNaNmQxbjZtbFVBSWRjbEp3bzdGcHZGRGJuT0tTMFhMSm50cSszSExlK3M5dWlqUVpROVZZeGkrYlQ2Ui9KWVlzWVJHRXZERHc9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D"
}


def get_ab(url):
    with open("../../main.js", "r", encoding="utf-8") as f:
        js_code = f.read().replace("_simon_url", url)
    result = subprocess.check_output(['node', '-e', js_code], cwd=js_dir)
    logger.info(f"a_bogus: {result}")
    return result


def get_data(url):
    response = requests.get(url, headers=headers, cookies=cookies)
    logger.info(response.text)


if __name__ == '__main__':
    # ab = quote(
    #     "m70VhFWjmq8caVFGmKJz9b2l7lLlNTWyFPTQRJNTSOurOwFGsWPthNGyGxuQ4ZRYAbBTiFVHPjUAYDncsUU0ZCnkLmkDuozybtQIVX6o21NhTPvZ9ZjLeYbxzi-b8S4P//VaEVEXX0lwZ2Ofqr9Bl2Ky9AeiB8m80qaypxWUSx2Bg-kYnnAmSyY=")
    ms_token = quote(
        "awJxSgYETZELnLx1C6pxqXUb5PBwInVr6bfgwmh5M5iTO-K25_Zao_0TniK8dFDhNudUV73yHJj1WY8fNTHex3ysmh9oxgi78PTu7mdck5p-IP1k5-SbXVUU-Jtmsfgp4Pm08Cw-I-d2R_X45OL223tZJfG-X3qIxhGV3hChubRa__3KpKNQTpE=")
    url = f"https://www.douyin.com/aweme/v1/web/aweme/detail/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=7487819295116823808&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=1&cpu_core_num=8&version_code=190500&version_name=19.5.0&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&browser_online=true&engine_name=Blink&engine_version=138.0.0.0&os_name=Windows&os_version=10&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7493790376601454116&uifid=1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65&verifyFp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&fp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&msToken={ms_token}"
    ab = get_ab(url)
    url = url + f"&a_bogus={ab}"
    # logger.info(url)
    # url = "https://www.douyin.com/aweme/v1/web/aweme/detail/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=7487819295116823808&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=1&cpu_core_num=8&version_code=190500&version_name=19.5.0&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&browser_online=true&engine_name=Blink&engine_version=138.0.0.0&os_name=Windows&os_version=10&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7493790376601454116&uifid=1ee16134db40129a5ff28e6a352dddaa8524f48fc5e4ea6d697d6a182d7836e4d877a37be48e2e96358ef2f4ae9d4096730f7cc1736d4d69b5f932a40e328db8466acb1a0847d688611f0c6db7eda93f2b5f7475490c0e9a2a9268a2a8e813482bad02506e535b66e93fa0dd7452574bf6e60be564b406f6b839213e59618b1aa2c34f63519a17b1046eac947d36d9deab36b2f7080fed47872bef3386962c65&msToken=awJxSgYETZELnLx1C6pxqXUb5PBwInVr6bfgwmh5M5iTO-K25_Zao_0TniK8dFDhNudUV73yHJj1WY8fNTHex3ysmh9oxgi78PTu7mdck5p-IP1k5-SbXVUU-Jtmsfgp4Pm08Cw-I-d2R_X45OL223tZJfG-X3qIxhGV3hChubRa__3KpKNQTpE%3D&a_bogus=D6U5gHtJO25RKdFtmOJT9bVlZA9MNB8yKMixSxdPSNKhOhtGuRPvkOGCbxL5shDECbBsiq37YjllbExcz0XiZHnkzmkDuQtjbGdAVX8o%2F1qXGTiZVZbmeEtxFi-GWS4POA5-E-w1A0U712QfZrCNl%2FF9CAej-8Y8zHaRpx4lHx25gakYV9%2FreaZ8&verifyFp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&fp=verify_mbyg1p37_ES3ouIxg_DprN_4ndq_BvKv_qtaGAOhpJrFJ&x-secsdk-web-expire=1752638319324&x-secsdk-web-signature=ff2dddfb7dbea7b064ffb2f61f3fb8ba"
    get_data(url)
