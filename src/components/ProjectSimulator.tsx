import React, { useState, useEffect } from 'react';
import {
  Activity,
  Radio,
  Wifi,
  Bluetooth,
  Gauge,
  RotateCcw,
  Zap,
  ShieldAlert,
} from 'lucide-react';
import { sound } from '../utils/sound';

export const ProjectSimulator: React.FC = () => {
  const [speed, setSpeed] = useState(65); // km/h
  const [distance, setDistance] = useState(85); // cm
  const [impactTriggered, setImpactTriggered] = useState(false);
  const [wifiPacketSent, setWifiPacketSent] = useState(false);
  const [autoThrottled, setAutoThrottled] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([
    '[INIT] Arduino Uno R3 Booted. Clock 16MHz.',
    '[SYSTEM] IR Sensor, Ultrasonic HC-SR04, Vibration SW-420 online.',
    '[TELEMETRY] ESP8266 Wi-Fi connected to Gateway SSID: IoT_AlertNet.',
    '[HC-05] Bluetooth SPP initialized. Baud: 9600.',
  ]);

  // Speed monitoring logic
  useEffect(() => {
    if (speed > 80 && !autoThrottled) {
      setAutoThrottled(true);
      sound.playPop();
      addLog(`[ALERT] Speed exceeded threshold (${speed} km/h > 80 km/h). PWM Throttle Active!`);
    } else if (speed <= 80 && autoThrottled) {
      setAutoThrottled(false);
      addLog(`[NORMAL] Speed normalized to ${speed} km/h. Throttle released.`);
    }
  }, [speed]);

  // Distance monitoring logic
  useEffect(() => {
    if (distance < 30) {
      sound.playPop();
      addLog(`[WARNING] Proximity breach: ${distance} cm! Obstacle detected by HC-SR04.`);
    }
  }, [distance]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogMessages((prev) => [`${time} ${msg}`, ...prev.slice(0, 6)]);
  };

  const triggerImpact = () => {
    sound.playPop();
    setImpactTriggered(true);
    setWifiPacketSent(false);
    addLog('[CRITICAL] Vibration Sensor triggered! G-Force threshold exceeded (Crash detected!).');

    // Simulate ESP8266 sending emergency cloud packet
    setTimeout(() => {
      setWifiPacketSent(true);
      sound.playSuccess();
      addLog('[EMERGENCY] ESP8266 dispatched Cloud SOS JSON packet with GPS coordinates & Timestamp.');
      addLog('[BLUETOOTH] HC-05 broadcast emergency broadcast to paired emergency responder node.');
    }, 700);
  };

  const resetSimulation = () => {
    sound.playClick();
    setSpeed(65);
    setDistance(85);
    setImpactTriggered(false);
    setWifiPacketSent(false);
    setAutoThrottled(false);
    addLog('[RESET] Simulation telemetry restored to nominal operating parameters.');
  };

  return (
    <div className="rounded-3xl bg-[#0B0B14]/90 border border-white/10 p-5 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      
      {/* Top Simulator Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping-subtle" />
          <span className="font-syne font-bold text-sm text-white">
            Interactive Hardware & Telemetry Simulator
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-electric-purple/20 text-electric-purple border border-electric-purple/30">
            Live Lab Mode
          </span>
        </div>

        <button
          onClick={resetSimulation}
          onMouseEnter={() => sound.playHover()}
          data-cursor="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-gray-300 hover:text-white transition-colors border border-white/10"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Bench</span>
        </button>
      </div>

      {/* Main Interactive Controls & Gauges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-6">
        
        {/* Module 1: Speed Control & IR Sensor */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-electric-blue" />
              IR Speed Monitor
            </span>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                autoThrottled
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {autoThrottled ? 'THROTTLED' : 'NORMAL'}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-syne text-3xl font-extrabold text-white">
              {speed}
            </span>
            <span className="text-xs font-mono text-gray-400">km/h</span>
          </div>

          {/* Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-gray-500">
              <span>0 km/h</span>
              <span className="text-electric-pink font-semibold">Limit: 80 km/h</span>
              <span>130 km/h</span>
            </div>
            <input
              type="range"
              min="0"
              max="130"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-electric-blue"
            />
          </div>

          <div className="flex gap-2">
            {[45, 75, 105].map((preset) => (
              <button
                key={preset}
                onClick={() => setSpeed(preset)}
                className="flex-1 py-1 text-[10px] font-mono rounded bg-white/[0.05] hover:bg-white/[0.1] text-gray-300"
              >
                {preset} km/h
              </button>
            ))}
          </div>
        </div>

        {/* Module 2: Ultrasonic Proximity HC-SR04 */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-electric-purple" />
              Ultrasonic Proximity
            </span>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                distance < 30
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-blue-500/20 text-blue-400'
              }`}
            >
              {distance < 30 ? 'WARN CLOSE' : 'SAFE'}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-syne text-3xl font-extrabold text-white">
              {distance}
            </span>
            <span className="text-xs font-mono text-gray-400">cm range</span>
          </div>

          {/* Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-gray-500">
              <span className="text-amber-400">10 cm</span>
              <span>Target Distance</span>
              <span>150 cm</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-electric-purple"
            />
          </div>

          <div className="flex gap-2">
            {[20, 60, 110].map((preset) => (
              <button
                key={preset}
                onClick={() => setDistance(preset)}
                className="flex-1 py-1 text-[10px] font-mono rounded bg-white/[0.05] hover:bg-white/[0.1] text-gray-300"
              >
                {preset} cm
              </button>
            ))}
          </div>
        </div>

        {/* Module 3: Vibration Sensor & Accident Trigger */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-electric-pink" />
              Vibration Impact
            </span>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                impactTriggered
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                  : 'bg-white/[0.05] text-gray-400'
              }`}
            >
              {impactTriggered ? 'IMPACT DETECTED' : 'ARMED'}
            </span>
          </div>

          <div>
            <button
              onClick={triggerImpact}
              onMouseEnter={() => sound.playHover()}
              data-cursor="button"
              className={`w-full py-2.5 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                impactTriggered
                  ? 'bg-rose-600 text-white shadow-[0_0_20px_#F43F5E]'
                  : 'bg-gradient-to-r from-electric-pink to-rose-600 text-white hover:scale-[1.02] shadow-glow-pink'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Simulate Crash / G-Force Spike</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
            <span className="flex items-center gap-1">
              <Wifi className={`w-3.5 h-3.5 ${wifiPacketSent ? 'text-emerald-400' : 'text-gray-500'}`} />
              ESP8266 SOS
            </span>
            <span className="flex items-center gap-1">
              <Bluetooth className={`w-3.5 h-3.5 ${wifiPacketSent ? 'text-blue-400' : 'text-gray-500'}`} />
              HC-05 Beacon
            </span>
          </div>
        </div>

      </div>

      {/* Real-time Hardware Console Log */}
      <div className="rounded-2xl bg-black/60 border border-white/[0.08] p-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-gray-400 text-[11px]">
          <span className="flex items-center gap-1.5 text-gray-300">
            <Zap className="w-3.5 h-3.5 text-electric-blue" />
            Serial Monitor (Baud 9600) — ESP8266 & Arduino Telemetry Stream
          </span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Streaming
          </span>
        </div>

        <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
          {logMessages.map((msg, index) => (
            <div
              key={index}
              className={`leading-relaxed text-[11px] ${
                msg.includes('[CRITICAL]') || msg.includes('[EMERGENCY]')
                  ? 'text-rose-400 font-semibold'
                  : msg.includes('[ALERT]')
                  ? 'text-amber-400'
                  : msg.includes('[NORMAL]') || msg.includes('[INIT]')
                  ? 'text-emerald-400'
                  : 'text-gray-300'
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
