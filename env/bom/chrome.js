let _chrome_app = {};
Object.defineProperty(_chrome_app, "isInstalled", {
  value: false,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "getDetails", {
  get: function () {
    h_log("[v] _chrome_app getDetails value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_app getDetails value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "getIsInstalled", {
  get: function () {
    h_log("[v] _chrome_app getIsInstalled value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_app getIsInstalled value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "installState", {
  get: function () {
    h_log("[v] _chrome_app installState value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_app installState value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "runningState", {
  get: function () {
    h_log("[v] _chrome_app runningState value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_app runningState value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "InstallState", {
  value: {
    DISABLED: "disabled",
    INSTALLED: "installed",
    NOT_INSTALLED: "not_installed",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_app, "RunningState", {
  value: {
    CANNOT_RUN: "cannot_run",
    READY_TO_RUN: "ready_to_run",
    RUNNING: "running",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});

let _chrome_runtime = {};
Object.defineProperty(_chrome_runtime, "dynamicId", {
  value: undefined,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "id", {
  value: undefined,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "connect", {
  get: function () {
    h_log("[v] _chrome_runtime connect value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_runtime connect value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "sendMessage", {
  get: function () {
    h_log("[v] _chrome_runtime sendMessage value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome_runtime sendMessage value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "ContextType", {
  value: {
    BACKGROUND: "BACKGROUND",
    DEVELOPER_TOOLS: "DEVELOPER_TOOLS",
    OFFSCREEN_DOCUMENT: "OFFSCREEN_DOCUMENT",
    POPUP: "POPUP",
    SIDE_PANEL: "SIDE_PANEL",
    TAB: "TAB",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "OnInstalledReason", {
  value: {
    CHROME_UPDATE: "chrome_update",
    INSTALL: "install",
    SHARED_MODULE_UPDATE: "shared_module_update",
    UPDATE: "update",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "OnRestartRequiredReason", {
  value: {
    APP_UPDATE: "app_update",
    OS_UPDATE: "os_update",
    PERIODIC: "periodic",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "PlatformArch", {
  value: {
    ARM: "arm",
    ARM64: "arm64",
    MIPS: "mips",
    MIPS64: "mips64",
    X86_32: "x86-32",
    X86_64: "x86-64",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "PlatformNaclArch", {
  value: {
    ARM: "arm",
    MIPS: "mips",
    MIPS64: "mips64",
    X86_32: "x86-32",
    X86_64: "x86-64",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "PlatformOs", {
  value: {
    ANDROID: "android",
    CROS: "cros",
    FUCHSIA: "fuchsia",
    LINUX: "linux",
    MAC: "mac",
    OPENBSD: "openbsd",
    WIN: "win",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome_runtime, "RequestUpdateCheckStatus", {
  value: {
    NO_UPDATE: "no_update",
    THROTTLED: "throttled",
    UPDATE_AVAILABLE: "update_available",
  },
  writable: true,
  enumerable: true,
  configurable: true,
});

let _chrome = {};
Object.defineProperty(_chrome, "loadTimes", {
  get: function () {
    h_log("[v] _chrome loadTimes value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome loadTimes value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome, "csi", {
  get: function () {
    h_log("[v] _chrome csi value [get]", "arg:", arguments);
    return function () {
      h_log("[v] _chrome csi value [call]", "arg:", arguments);
    };
  },
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome, "app", {
  value: _chrome_app,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(_chrome, "runtime", {
  value: _chrome_runtime,
  writable: true,
  enumerable: true,
  configurable: true,
});
