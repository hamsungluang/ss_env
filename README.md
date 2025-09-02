## 补环境框架

### 实现功能
#### document.all
1. 无法通过delete删除元素
2. typeof document.all === "undefined"
3. toString方法
4. body.appendChild(a) 和 body.removeChild(a) 动态添加和删除document.all元素
5. length 动态计算
#### 动态location.href功能
传入href自动生成其他参数
---
### 实现网站
#### 抖音的a_bogus
```javascript
m = n.apply(d, e); // 这下面增加代码

// 插桩发现有堆栈检测，改了返回结果，未测试是否真正检测
try {
    if (e[0].includes("Module._compile")) {
        debugger
        m = false
    }
} catch (error) {
}

// 此处是获取参数的
if (e.length == 2 && e[0] == "a_bogus") {
    window.a_bogus = e[1]
}
```
#### 瑞数
window.ActiveXObject = undefined;是个坑
- 深圳大学总医院
- 甘肃省发展和改革委员会
- 维普中文期刊服务平台
- 欧冶
- 天津税务局登录页面
#### boss
成功率大概50%  
---
### TODO:
1. getElementsByTagName、getElementById、parentNode、parentElement、innerText等方法还是根据js返回什么补什么而实现的，需要灵活
2. 浏览器指纹随机化