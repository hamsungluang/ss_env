let _audio_dom = {};
_audio_dom.__proto__ = {};
let _HTMLAudioElement = function () {
    h_log("_audio_dom.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLAudioElement.prototype = _audio_dom.__proto__;
Object.defineProperty(_audio_dom.__proto__, "constructor", {
    value: _HTMLAudioElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_audio_dom.__proto__, Symbol.toStringTag, {
    value: "HTMLAudioElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_audio_dom.__proto__.__proto__ = {};
Object.defineProperty(_audio_dom.__proto__.__proto__, "error", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ error get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "src", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ src get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ src set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "currentSrc", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ currentSrc get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "crossOrigin", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ crossOrigin get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ crossOrigin set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "networkState", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ networkState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "preload", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ preload get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ preload set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "buffered", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ buffered get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "readyState", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ readyState get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "seeking", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ seeking get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "currentTime", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ currentTime get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ currentTime set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "duration", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ duration get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "paused", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ paused get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "defaultPlaybackRate", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ defaultPlaybackRate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ defaultPlaybackRate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "playbackRate", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ playbackRate get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ playbackRate set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "played", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ played get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "seekable", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ seekable get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "ended", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ ended get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "autoplay", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ autoplay get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ autoplay set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "loop", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ loop get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ loop set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "preservesPitch", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ preservesPitch get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ preservesPitch set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "controls", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ controls get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ controls set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "controlsList", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ controlsList get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ controlsList set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "volume", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ volume get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ volume set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "muted", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ muted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ muted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "defaultMuted", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ defaultMuted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ defaultMuted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "textTracks", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ textTracks get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "webkitAudioDecodedByteCount", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ webkitAudioDecodedByteCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "webkitVideoDecodedByteCount", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ webkitVideoDecodedByteCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "onencrypted", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ onencrypted get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ onencrypted set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "onwaitingforkey", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ onwaitingforkey get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ onwaitingforkey set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "srcObject", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ srcObject get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ srcObject set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "NETWORK_EMPTY", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "NETWORK_IDLE", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "NETWORK_LOADING", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "NETWORK_NO_SOURCE", {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_NOTHING", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_METADATA", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_CURRENT_DATA", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_FUTURE_DATA", {
    value: 3,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "HAVE_ENOUGH_DATA", {
    value: 4,
    writable: false,
    enumerable: true,
    configurable: false,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "addTextTrack", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ addTextTrack value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ addTextTrack value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "canPlayType", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ canPlayType value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ canPlayType value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "captureStream", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ captureStream value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ captureStream value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "load", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ load value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ load value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "pause", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ pause value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ pause value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "play", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ play value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ play value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "sinkId", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ sinkId get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "remote", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ remote get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "disableRemotePlayback", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ disableRemotePlayback get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_audio_dom.__proto__.__proto__ disableRemotePlayback set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "setSinkId", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ setSinkId value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ setSinkId value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
let _HTMLMediaElement = function () {
    h_log("_audio_dom.__proto__.__proto__ constructor value [call]", "arg:", arguments)
};
_HTMLMediaElement.prototype = _audio_dom.__proto__.__proto__;
Object.defineProperty(_audio_dom.__proto__.__proto__, "constructor", {
    value: _HTMLMediaElement,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "mediaKeys", {
    get: function () {
        h_log("_audio_dom.__proto__.__proto__ mediaKeys get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_audio_dom.__proto__.__proto__, "setMediaKeys", {
    get: function () {
        h_log("[v] _audio_dom.__proto__.__proto__ setMediaKeys value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _audio_dom.__proto__.__proto__ setMediaKeys value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_audio_dom.__proto__.__proto__, Symbol.toStringTag, {
    value: "HTMLMediaElement",
    writable: false,
    enumerable: false,
    configurable: true,
});
_audio_dom.__proto__.__proto__.__proto__ = HTMLElement.prototype;

