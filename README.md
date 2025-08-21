## 补环境框架

### 目前以过的环境
#### 抖音的a_bogus
```javascript
m = n.apply(d, e); // 这下面增加代码

// 插桩发现有堆栈检测，改了返回结果，未测试是否正在检测
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

### TODO:
1. getElementsByTagName、getElementById、parentNode、parentElement、innerText等方法还是根据js返回什么补什么而实现的，需要灵活