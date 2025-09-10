const CONFIG = {};

CONFIG.DEBUG = false;

CONFIG.proxy_obj = false;

// 为false时，不输出window下方法的gatter
CONFIG.DEBUG_INCLUDE_WINDOW = false;

// hook Error.prepareStackTrace
CONFIG.hook_prepareStackTrace = false;

// hook RegExp
CONFIG.hook_RegExp = true;

// hook Object.toString
CONFIG.hook_ObjectToString = true;

// hook Object.keys
CONFIG.hook_ObjectKeys = false;

module.exports = CONFIG;
