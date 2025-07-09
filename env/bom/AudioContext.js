let _AnalyserNode = {};
_AnalyserNode.__proto__ = {};
Object.defineProperty(_AnalyserNode.__proto__, "fftSize", {
    get: function () {
        h_log("_AnalyserNode.__proto__ fftSize get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AnalyserNode.__proto__ fftSize set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__, "frequencyBinCount", {
    get: function () {
        h_log("_AnalyserNode.__proto__ frequencyBinCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__, "minDecibels", {
    get: function () {
        h_log("_AnalyserNode.__proto__ minDecibels get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AnalyserNode.__proto__ minDecibels set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__, "maxDecibels", {
    get: function () {
        h_log("_AnalyserNode.__proto__ maxDecibels get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AnalyserNode.__proto__ maxDecibels set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__, "smoothingTimeConstant", {
    get: function () {
        h_log("_AnalyserNode.__proto__ smoothingTimeConstant get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AnalyserNode.__proto__ smoothingTimeConstant set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__, "getByteFrequencyData", {
    get: function () {
        h_log("[v] _AnalyserNode.__proto__ getByteFrequencyData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AnalyserNode.__proto__ getByteFrequencyData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AnalyserNode.__proto__, "getByteTimeDomainData", {
    get: function () {
        h_log("[v] _AnalyserNode.__proto__ getByteTimeDomainData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AnalyserNode.__proto__ getByteTimeDomainData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AnalyserNode.__proto__, "getFloatFrequencyData", {
    get: function () {
        h_log("[v] _AnalyserNode.__proto__ getFloatFrequencyData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AnalyserNode.__proto__ getFloatFrequencyData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AnalyserNode.__proto__, "getFloatTimeDomainData", {
    get: function () {
        h_log("[v] _AnalyserNode.__proto__ getFloatTimeDomainData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AnalyserNode.__proto__ getFloatTimeDomainData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
AnalyserNode = function () {
    h_log("_AnalyserNode.__proto__ constructor value [call]", "arg:", arguments)
};
AnalyserNode.prototype = _AnalyserNode.__proto__;
Object.defineProperty(_AnalyserNode.__proto__, "constructor", {
    value: AnalyserNode,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__, Symbol.toStringTag, {
    value: "AnalyserNode",
    writable: false,
    enumerable: false,
    configurable: true,
});
_AnalyserNode.__proto__.__proto__ = {};
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "context", {
    get: function () {
        h_log("_AnalyserNode.__proto__.__proto__ context get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "numberOfInputs", {
    get: function () {
        h_log("_AnalyserNode.__proto__.__proto__ numberOfInputs get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "numberOfOutputs", {
    get: function () {
        h_log("_AnalyserNode.__proto__.__proto__ numberOfOutputs get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "channelCount", {
    get: function () {
        h_log("_AnalyserNode.__proto__.__proto__ channelCount get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AnalyserNode.__proto__.__proto__ channelCount set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "channelCountMode", {
    get: function () {
        h_log("_AnalyserNode.__proto__.__proto__ channelCountMode get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AnalyserNode.__proto__.__proto__ channelCountMode set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "channelInterpretation", {
    get: function () {
        h_log("_AnalyserNode.__proto__.__proto__ channelInterpretation get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AnalyserNode.__proto__.__proto__ channelInterpretation set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "connect", {
    get: function () {
        h_log("[v] _AnalyserNode.__proto__.__proto__ connect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AnalyserNode.__proto__.__proto__ connect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "disconnect", {
    get: function () {
        h_log("[v] _AnalyserNode.__proto__.__proto__ disconnect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AnalyserNode.__proto__.__proto__ disconnect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
AudioNode = function () {
    h_log("_AnalyserNode.__proto__.__proto__ constructor value [call]", "arg:", arguments)
};
AudioNode.prototype = _AnalyserNode.__proto__.__proto__;
Object.defineProperty(_AnalyserNode.__proto__.__proto__, "constructor", {
    value: AudioNode,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AnalyserNode.__proto__.__proto__, Symbol.toStringTag, {
    value: "AudioNode",
    writable: false,
    enumerable: false,
    configurable: true,
});
_AnalyserNode.__proto__.__proto__.__proto__ = eventTarget;


let _AudioDestinationNode = {};
_AudioDestinationNode.__proto__ = {};
Object.defineProperty(_AudioDestinationNode.__proto__, "maxChannelCount", {
    get: function () {
        h_log("_AudioDestinationNode.__proto__ maxChannelCount get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
AudioDestinationNode = function () {
    h_log("_AudioDestinationNode.__proto__ constructor value [call]", "arg:", arguments)
};
AudioDestinationNode.prototype = _AudioDestinationNode.__proto__;
Object.defineProperty(_AudioDestinationNode.__proto__, "constructor", {
    value: AudioDestinationNode,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AudioDestinationNode.__proto__, Symbol.toStringTag, {
    value: "AudioDestinationNode",
    writable: false,
    enumerable: false,
    configurable: true,
});
_AudioDestinationNode.__proto__.__proto__ = {};
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "context", {
    get: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ context get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "numberOfInputs", {
    get: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ numberOfInputs get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "numberOfOutputs", {
    get: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ numberOfOutputs get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "channelCount", {
    get: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ channelCount get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ channelCount set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "channelCountMode", {
    get: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ channelCountMode get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ channelCountMode set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "channelInterpretation", {
    get: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ channelInterpretation get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AudioDestinationNode.__proto__.__proto__ channelInterpretation set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "connect", {
    get: function () {
        h_log("[v] _AudioDestinationNode.__proto__.__proto__ connect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioDestinationNode.__proto__.__proto__ connect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "disconnect", {
    get: function () {
        h_log("[v] _AudioDestinationNode.__proto__.__proto__ disconnect value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioDestinationNode.__proto__.__proto__ disconnect value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
AudioNode = function () {
    h_log("_AudioDestinationNode.__proto__.__proto__ constructor value [call]", "arg:", arguments)
};
AudioNode.prototype = _AudioDestinationNode.__proto__.__proto__;
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, "constructor", {
    value: AudioNode,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AudioDestinationNode.__proto__.__proto__, Symbol.toStringTag, {
    value: "AudioNode",
    writable: false,
    enumerable: false,
    configurable: true,
});
_AudioDestinationNode.__proto__.__proto__.__proto__ = eventTarget;

let _AudioContext = function () {
};
let _AudioContext_value = {};
Object.defineProperty(_AudioContext_value, "baseLatency", {
    get: function () {
        h_log("_AudioContext_value baseLatency get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value, "outputLatency", {
    get: function () {
        h_log("_AudioContext_value outputLatency get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value, "close", {
    get: function () {
        h_log("[v] _AudioContext_value close value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value close value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value, "createMediaElementSource", {
    get: function () {
        h_log("[v] _AudioContext_value createMediaElementSource value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value createMediaElementSource value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value, "createMediaStreamDestination", {
    get: function () {
        h_log("[v] _AudioContext_value createMediaStreamDestination value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value createMediaStreamDestination value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value, "createMediaStreamSource", {
    get: function () {
        h_log("[v] _AudioContext_value createMediaStreamSource value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value createMediaStreamSource value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value, "getOutputTimestamp", {
    get: function () {
        h_log("[v] _AudioContext_value getOutputTimestamp value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value getOutputTimestamp value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value, "resume", {
    get: function () {
        h_log("[v] _AudioContext_value resume value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value resume value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value, "suspend", {
    get: function () {
        h_log("[v] _AudioContext_value suspend value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value suspend value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value, "onerror", {
    get: function () {
        h_log("_AudioContext_value onerror get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AudioContext_value onerror set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
AudioContext = function () {
    h_log("_AudioContext_value constructor value [call]", "arg:", arguments)
};
AudioContext.prototype = _AudioContext_value;
Object.defineProperty(_AudioContext_value, "constructor", {
    value: AudioContext,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AudioContext_value, "sinkId", {
    get: function () {
        h_log("_AudioContext_value sinkId get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value, "onsinkchange", {
    get: function () {
        h_log("_AudioContext_value onsinkchange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AudioContext_value onsinkchange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value, "setSinkId", {
    get: function () {
        h_log("[v] _AudioContext_value setSinkId value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value setSinkId value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value, Symbol.toStringTag, {
    value: "AudioContext",
    writable: false,
    enumerable: false,
    configurable: true,
});
_AudioContext_value.__proto__ = {};
Object.defineProperty(_AudioContext_value.__proto__, "destination", {
    get: function () {
        h_log("_AudioContext_value.__proto__ destination get [call]", "arg:", arguments)
        return new AudioDestinationNode
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value.__proto__, "sampleRate", {
    get: function () {
        h_log("_AudioContext_value.__proto__ sampleRate get [call]", "arg:", arguments)
        44100
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value.__proto__, "currentTime", {
    get: function () {
        h_log("_AudioContext_value.__proto__ currentTime get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value.__proto__, "listener", {
    get: function () {
        h_log("_AudioContext_value.__proto__ listener get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value.__proto__, "state", {
    get: function () {
        h_log("_AudioContext_value.__proto__ state get [call]", "arg:", arguments)
        return 'running'
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value.__proto__, "onstatechange", {
    get: function () {
        h_log("_AudioContext_value.__proto__ onstatechange get [call]", "arg:", arguments)
    }, set: function () {
        h_log("_AudioContext_value.__proto__ onstatechange set [call]", "arg:", arguments)
    }, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value.__proto__, "createAnalyser", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createAnalyser value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createAnalyser value [call]", "arg:", arguments)
            return new AnalyserNode
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createBiquadFilter", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createBiquadFilter value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createBiquadFilter value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createBuffer", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createBuffer value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createBuffer value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createBufferSource", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createBufferSource value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createBufferSource value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createChannelMerger", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createChannelMerger value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createChannelMerger value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createChannelSplitter", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createChannelSplitter value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createChannelSplitter value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createConstantSource", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createConstantSource value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createConstantSource value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createConvolver", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createConvolver value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createConvolver value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createDelay", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createDelay value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createDelay value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createDynamicsCompressor", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createDynamicsCompressor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createDynamicsCompressor value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createGain", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createGain value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createGain value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createIIRFilter", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createIIRFilter value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createIIRFilter value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createOscillator", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createOscillator value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createOscillator value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createPanner", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createPanner value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createPanner value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createPeriodicWave", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createPeriodicWave value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createPeriodicWave value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createScriptProcessor", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createScriptProcessor value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createScriptProcessor value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createStereoPanner", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createStereoPanner value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createStereoPanner value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "createWaveShaper", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ createWaveShaper value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ createWaveShaper value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
Object.defineProperty(_AudioContext_value.__proto__, "decodeAudioData", {
    get: function () {
        h_log("[v] _AudioContext_value.__proto__ decodeAudioData value [get]", "arg:", arguments);
        return function () {
            h_log("[v] _AudioContext_value.__proto__ decodeAudioData value [call]", "arg:", arguments)
        }
    }, enumerable: true, configurable: true
});
BaseAudioContext = function () {
    h_log("_AudioContext_value.__proto__ constructor value [call]", "arg:", arguments)
};
BaseAudioContext.prototype = _AudioContext_value.__proto__;
Object.defineProperty(_AudioContext_value.__proto__, "constructor", {
    value: BaseAudioContext,
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(_AudioContext_value.__proto__, "audioWorklet", {
    get: function () {
        h_log("_AudioContext_value.__proto__ audioWorklet get [call]", "arg:", arguments)
    }, set: undefined, enumerable: true, configurable: true,
});
Object.defineProperty(_AudioContext_value.__proto__, Symbol.toStringTag, {
    value: "BaseAudioContext",
    writable: false,
    enumerable: false,
    configurable: true,
});
_AudioContext_value.__proto__.__proto__ = eventTarget;
Object.defineProperty(_AudioContext, "prototype", {
    value: _AudioContext_value,
    writable: false,
    enumerable: false,
    configurable: false,
});
