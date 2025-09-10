const fs = require("fs");

/**
 * 环境代码加载器类
 * 用于加载和组合浏览器环境相关的JavaScript框架代码和工作脚本
 */
class EnvCodeLoader {

    /**
     * 构造函数
     * @param {string} frameworkCode - 额外的框架代码字符串
     * @param {Array} workScripts - 工作脚本文件路径数组
     * @param {string} workScriptCode - 额外的工作脚本代码字符串
     */
    constructor(frameworkCode="", workScripts=[], workScriptCode="") {
        this.code = ""; // 存储最终生成的代码
        this.frameworkCode = frameworkCode; // 额外的框架代码
        this.workScripts = workScripts; // 工作脚本文件路径数组
        this.workScriptCode = workScriptCode; // 额外的工作脚本代码
    }

    /**
     * 加载框架代码
     * 读取所有预定义的浏览器环境相关JavaScript文件并组合成单个代码字符串
     */
    loadFramework() {
        // 框架文件路径数组，包含所有浏览器环境相关的JavaScript文件
        const frameworkFiles = [
            "./env/utils/tools.js", // 工具函数
            "./env/init.js", // 初始化脚本
            "./env/public/eventTarget.js", // 事件目标实现
            "./env/bom/indexedDB.js", // IndexedDB API
            "./env/bom/XMLHttpRequest.js", // XMLHttpRequest API
            "./env/bom/Request.js", // Fetch API Request对象
            "./env/bom/performance.js", // Performance API
            "./env/bom/EventSource.js", // EventSource API
            "./env/bom/WebSocket.js", // WebSocket API
            "./env/bom/NetworkInformation.js", // 网络信息API
            "./env/bom/NavigatorUAData.js", // 用户代理数据API
            "./env/bom/StorageManager.js", // 存储管理API
            "./env/bom/BatteryManager.js", // 电池管理API
            "./env/bom/chrome.js", // chrome对象
            "./env/bom/history.js", // History API
            "./env/bom/screen.js", // Screen API
            "./env/bom/plugins.js", // 插件API
            "./env/bom/mimeTypes.js", // MIME类型API
            "./env/bom/navigator.js", // Navigator API
            "./env/bom/location.js", // Location API
            "./env/dom/dom.js", // 基础DOM API
            "./env/dom/DOMTokenList.js", // DOMTokenList API
            "./env/dom/DOMParser.js", // DOMParser API
            "./env/dom/Element/HTMLAnchorElement.js", // 锚元素
            "./env/dom/Element/HTMLFormElement.js", // 表单元素
            "./env/dom/Element/HTMLInputElement.js", // 输入元素
            "./env/dom/Element/HTMLAudioElement.js", // 音频元素
            "./env/dom/Element/HTMLBodyElement.js", // 主体元素
            "./env/dom/Element/HTMLDivElement.js", // div元素
            "./env/dom/Element/HTMLHeadElement.js", // head元素
            "./env/dom/Element/HTMLHtmlElement.js", // html元素
            "./env/dom/Element/HTMLMetaElement.js", // meta元素
            "./env/dom/Element/HTMLScriptElement.js", // script元素
            "./env/dom/Element/HTMLSpanElement.js", // span元素
            "./env/dom/Element/HTMLIFrameElement.js", // iframe元素
            "./env/dom/Element/canvas_2d.js", // Canvas 2D上下文
            "./env/dom/Element/HTMLCanvasElement.js", // canvas元素
            "./env/dom/Collection/HTMLAllCollection.js", // HTMLAllCollection
            "./env/dom/text.js", // 文本节点
            "./env/dom/document.js", // Document对象
            "./env/bom/window_top.js", // 顶层window对象
            "./env/bom/window.js", // window对象
            "./env/html_init.js" // HTML初始化
        ];

        // 遍历所有框架文件，读取内容并追加到代码字符串中
        frameworkFiles.forEach(file => {
            this.code += fs.readFileSync(file, "utf-8");
        });

        // 添加额外的框架代码
        this.code += this.frameworkCode;

        // 将代码包装在立即执行函数中，并添加调试标记
        this.code = `(function(){${this.code}})();` + "\n/* ------环境加载完成------ */\ndebugger;\n";
    }

    /**
     * 包装代码
     * 将代码包装在try-catch块中，捕获并记录异常
     */
    wrapCode() {
        this.code = `try{${this.code};}catch(e){h_log(e);debugger;};`;
    }

    /**
     * 加载工作脚本
     * 读取所有工作脚本文件并追加到代码字符串中
     */
    loadWorkScripts() {
        // 遍历工作脚本文件路径数组，读取内容并追加
        this.workScripts.forEach(file => {
            this.code += fs.readFileSync(file, "utf-8");
        });
        // 添加额外的工作脚本代码
        this.code += this.workScriptCode;
    }

    /**
     * 加载所有代码
     * 执行完整的代码加载流程并返回最终的代码字符串
     * @returns {string} 组合后的完整代码字符串
     */
    load() {
        this.loadFramework(); // 加载框架代码
        this.wrapCode(); // 包装代码
        this.loadWorkScripts(); // 加载工作脚本
        return this.code; // 返回最终的代码字符串
    }
   
}

// 导出EnvCodeLoader类
module.exports = EnvCodeLoader;