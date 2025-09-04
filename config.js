const CONFIG = {};

CONFIG.DEBUG = false;

// 为false时，不输出window下方法的gatter
// CONFIG.DEBUG_INCLUDE_WINDOW = true;
CONFIG.DEBUG_INCLUDE_WINDOW = false;

CONFIG.hook_prepareStackTrace = false;
CONFIG.hook_RegExp = false;
CONFIG.hook_ObjectToString = false;
CONFIG.hook_ObjectKeys = false;

module.exports = CONFIG;
