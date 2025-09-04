## 补环境框架
### 项目结构
```plainText
ss_env/
├── env/                    # 浏览器环境模拟
│   ├── bom/               # 浏览器对象模型
│   ├── dom/               # 文档对象模型
│   ├── public/            # 公共功能
│   ├── utils/             # 工具函数
│   ├── html_init.js       # HTML初始化
│   └── init.js            # 环境初始化
├── tools/                 # 工具类
│   ├── env_loader.js      # 环境加载器
│   ├── func_tools.js      # 函数工具
│   └── get_browser_env.js # 浏览器环境获取
├── work/                  # 工作脚本
├── test/                  # 测试目录
├── get_data_demo/          # 数据获取示例
├── mainv2.js              # 第二版主入口文件
├── vm_runner.js           # VM运行器
├── config.js              # 配置文件
├── README.md              # 项目说明文档
```
### 项目功能
#### 原型链/Object toString/Function toString
大部分对象实现了完整的原型链和toString方法，Function toString 通过hook改写
#### document.all
1. 无法通过delete删除元素
2. typeof document.all === "undefined"
3. toString方法
4. body.appendChild(a) 和 body.removeChild(a) 动态添加和删除document.all元素
5. length 动态计算
#### 动态location.href功能
传入href自动生成其他参数
#### HTMLAnchorElement
set a.href = "https://www.xxx.com";会自动生成其他url元素
#### ...未完待续
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
- ...
#### boss
成功率  
---
### TODO:
1. getElementsByTagName、getElementById、parentNode、parentElement、innerText等方法还是根据js返回什么补什么而实现的，需要灵活
2. 浏览器指纹随机化