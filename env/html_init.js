// 模拟html文档的初始化值
// 针对瑞数6

let html1 = new _HTMLHtmlElement("h_html")
let head1 = new _HTMLHeadElement("h_head")
let body1 = new _HTMLBodyElement("h_body")
let meta1 = new _HTMLMetaElement("h_meta")
let meta2 = new _HTMLMetaElement("h_meta")
meta2["r"] = "m"
meta2["_content"] = "_DdHSx_hGWXD_57bYC1SQZ2VLrgONetHHIBf9lF5DIxoHpD6JgcVvA"
let script1 = new _HTMLScriptElement("h_script")
let script2 = new _HTMLScriptElement("h_script")
script1["r"] = "m"
script2["r"] = "m"


// 构建DOM树
html1.appendChild(head1);
html1.appendChild(body1);
head1.appendChild(meta1);
head1.appendChild(meta2);
head1.appendChild(script1);
head1.appendChild(script2);




