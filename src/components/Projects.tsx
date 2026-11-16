import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Cpu, Radio, Shield, Wifi, Zap, X, Code2, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { ProjectSimulator } from './ProjectSimulator';
import { MagneticButton } from './MagneticButton';
import { InteractiveText } from './InteractiveText';

interface TileData {
  id: number;
  title: string;
  sub: string;
  desc: string;
  icon: typeof Zap;
  voltage: string;
  pinout: string;
  baudOrFreq: string;
  codeSnippet: string;
}

export const Projects: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [inspectedTile, setInspectedTile] = useState<TileData | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked fan expansion for cascading cards!
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const smoothFan = useSpring(scrollYProgress, { damping: 20, stiffness: 120 });
  const fanMultiplier = useTransform(smoothFan, [0, 1], [0.2, 1]);

  const cascadingTiles: TileData[] = [
    {
      id: 1,
      title: 'IR Sensor',
      sub: 'Speed Regulation',
      desc: 'Infrared pulse counter tracking wheel rotations per minute to throttle speed autonomously.',
      icon: Zap,
      voltage: '3.3V - 5.0V DC',
      pinout: 'VCC, GND, OUT (Digital Pin 2 - Interrupt 0)',
      baudOrFreq: 'Sampling: 50Hz Interrupt Pulse',
      codeSnippet: `void IRAM_ATTR countPulse() {
  pulseCount++;
}
void loop() {
  float rpm = (pulseCount / 20.0) * 60.0;
  if (rpm > MAX_RPM_LIMIT) {
    analogWrite(MOTOR_PWM, 110); // Throttle
  }
}`,
    },
    {
      id: 2,
      title: 'Ultrasonic',
      sub: 'Proximity Warning',
      desc: 'HC-SR04 sensor measuring obstacle clearance and alerting proximity breaches.',
      icon: Radio,
      voltage: '5.0V DC Nominal',
      pinout: 'VCC, TRIG (Pin 9), ECHO (Pin 10), GND',
      baudOrFreq: 'Ultrasonic Pulse: 40 kHz',
      codeSnippet: `long getDistanceCM() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2;
}`,
    },
    {
      id: 3,
      title: 'Vibration SW-420',
      sub: 'Crash Trigger',
      desc: 'Digital shock sensor triggering immediate emergency flag on impact G-force spike.',
      icon: Shield,
      voltage: '3.3V - 5.0V DC',
      pinout: 'VCC, GND, DO (Digital Pin 3 - Interrupt 1)',
      baudOrFreq: 'Response Latency < 10ms',
      codeSnippet: `void checkImpactSensor() {
  int shockState = digitalRead(VIBRATION_PIN);
  if (shockState == HIGH && !crashFlag) {
    crashFlag = true;
    transmitCloudEmergencySOS();
    triggerBluetoothBeacon();
  }
}`,
    },
    {
      id: 4,
      title: 'ESP8266 Wi-Fi',
      sub: 'Cloud SOS',
      desc: 'Transmits JSON emergency telemetry packets with coordinates to cloud gateways.',
      icon: Wifi,
      voltage: '3.3V Dedicated LDO',
      pinout: 'TX -> Pin 0 (RX), RX -> Pin 1 (TX), CH_PD High',
      baudOrFreq: '802.11 b/g/n • 115200 Baud UART',
      codeSnippet: `void transmitCloudEmergencySOS() {
  WiFiClient client;
  if (client.connect(API_HOST, 80)) {
    String postData = "{\\"alert\\":\\"CRASH\\",\\"speed\\":" + String(speed) + "}";
    client.println("POST /api/v1/sos HTTP/1.1");
    client.println(postData);
  }
}`,
    },
    {
      id: 5,
      title: 'HC-05 Bluetooth',
      sub: 'Responder Link',
      desc: 'Direct serial broadcast to nearby emergency services and driver dashboard.',
      icon: Cpu,
      voltage: '3.6V - 6V (Level Shifted)',
      pinout: 'TXD -> Pin 10 (SoftwareSerial RX), RXD -> Pin 11',
      baudOrFreq: 'UART SPP • 9600 Baud Default',
      codeSnippet: `SoftwareSerial btSerial(10, 11);
void triggerBluetoothBeacon() {
  btSerial.println("[ALERT: EMERGENCY DISTRESS]");
  btSerial.print("VEHICLE_SPEED: ");
  btSerial.println(vehicleSpeed);
}`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-theme="dark"
      className="relative min-h-screen py-24 sm:py-36 bg-[#000000] text-white overflow-hidden select-none"
    >
      {/* Fragment Minimal Dark Grid */}
      <div className="architectural-grid architectural-grid-dark opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Fragment Hero Layout (Image 1 exact recreation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Column: Fragment Iconic Editorial Heading with Interactive Letters */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono tracking-widest text-gray-500 uppercase flex items-center gap-2">
              <span>[ 03 // FRAGMENT STUDIO AESTHETIC ]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
            </div>

            <h2 className="font-syne font-black text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.95] text-white">
              <span className="block">
                <InteractiveText text="One engineer." hoverColor="#FF4D26" />
              </span>
              <span className="block">
                <InteractiveText text="Clear direction." hoverColor="#38BDF8" />
              </span>
              <span className="block">
                <InteractiveText text="Complete execution." hoverColor="#E9D5FF" />
              </span>
            </h2>

            {/* Inspiring Engineering Quote */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 max-w-lg">
              <p className="font-mono text-xs text-gray-300 italic leading-relaxed">
                "Simplicity is the prerequisite for reliability. In embedded systems, every component must have purpose."
              </p>
            </div>

            <p className="text-base sm:text-lg text-gray-400 font-light max-w-lg font-sans">
              Consistent creative engineering across hardware prototyping, sensor interfacing, and wireless IoT architecture.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <MagneticButton dataCursorText="BENCH">
                <a
                  href="#simulator-bench"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('simulator-bench')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
                >
                  <span>TEST THE BENCH</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticButton>

              <span className="text-xs font-mono text-gray-400">
                [ Scroll fans cards • Click to inspect ]
              </span>
            </div>
          </div>

          {/* Right Column: Cascading 3D Metallic Cards Fan with SCROLL EXPANSION! */}
          <div className="lg:col-span-6 flex justify-center items-center py-8">
            <div className="relative w-full max-w-[480px] h-[340px] sm:h-[400px] flex items-center justify-center perspective-1200">
              
              {cascadingTiles.map((tile, idx) => {
                const total = cascadingTiles.length;
                const baseAngle = (idx - Math.floor(total / 2)) * 14;
                const baseOffsetX = (idx - Math.floor(total / 2)) * 52;
                const baseOffsetY = Math.abs(idx - Math.floor(total / 2)) * 18;
                const isHovered = activeCard === tile.id;

                return (
                  <motion.div
                    key={tile.id}
                    onClick={() => {
                      sound.playPop();
                      setInspectedTile(tile);
                    }}
                    onMouseEnter={() => {
                      sound.playHover();
                      setActiveCard(tile.id);
                    }}
                    onMouseLeave={() => setActiveCard(null)}
                    style={{
                      rotateZ: isHovered ? 0 : baseAngle,
                      rotateY: isHovered ? 0 : -20,
                    }}
                    animate={{
                      x: isHovered ? 0 : baseOffsetX,
                      y: isHovered ? -35 : baseOffsetY,
                      scale: isHovered ? 1.15 : 1,
                      zIndex: isHovered ? 30 : idx + 1,
                    }}
                    transition={{ type: 'spring', damping: 22, stiffness: 220 }}
                    data-cursor="card"
                    data-cursor-text="INSPECT"
                    className="absolute w-36 sm:w-44 h-56 sm:h-64 rounded-2xl p-4 bg-gradient-to-b from-[#222228] via-[#141418] to-[#0D0D10] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer flex flex-col justify-between group overflow-hidden select-none"
                  >
                    {/* Metallic Top Bevel Highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-500 font-bold">
                        0{tile.id}
                      </span>
                      <tile.icon className="w-4 h-4 text-gray-300 group-hover:text-accent-orange transition-colors" />
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        {tile.sub}
                      </div>
                      <div className="font-syne font-bold text-sm sm:text-base text-white group-hover:text-accent-orange transition-colors leading-tight">
                        {tile.title}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-tight pt-1 hidden sm:block">
                        {tile.desc}
                      </p>
                    </div>

                    <div className="text-[9px] font-mono text-gray-400 uppercase border-t border-white/10 pt-2 flex items-center justify-between">
                      <span>INSPECT</span>
                      <span className="text-accent-orange">↗</span>
                    </div>
                  </motion.div>
                );
              })}

            </div>
          </div>

        </div>

        {/* Live Interactive Testing Bench / Hardware Simulator */}
        <div id="simulator-bench" className="pt-12 border-t border-white/[0.08]">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-accent-orange">
                [ LIVE BENCH TELEMETRY ]
              </span>
              <h3 className="font-syne font-extrabold text-3xl sm:text-4xl text-white mt-1">
                IoT Speed Control & Accident Detection Simulator
              </h3>
            </div>
            <p className="text-xs font-mono text-gray-400 max-w-xs">
              Directly interact with simulated IR sensor rotation, ultrasonic proximity clearance, and crash G-force spikes.
            </p>
          </div>

          <ProjectSimulator />
        </div>

      </div>

      {/* Interactive Hardware Inspector Modal */}
      <AnimatePresence>
        {inspectedTile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setInspectedTile(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#121216] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent-orange">
                    <inspectedTile.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-xl text-white">
                      {inspectedTile.title}
                    </h4>
                    <span className="text-xs font-mono text-gray-400">
                      {inspectedTile.sub}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setInspectedTile(null);
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Hardware Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-500 uppercase text-[10px]">Operating Voltage</span>
                  <div className="text-white font-semibold mt-0.5">{inspectedTile.voltage}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-500 uppercase text-[10px]">Pinout Mapping</span>
                  <div className="text-white font-semibold mt-0.5">{inspectedTile.pinout}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-500 uppercase text-[10px]">Timing / Frequency</span>
                  <div className="text-emerald-400 font-semibold mt-0.5">{inspectedTile.baudOrFreq}</div>
                </div>
              </div>

              {/* Real Embedded C Firmware Snippet */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Code2 className="w-4 h-4 text-accent-orange" />
                    Embedded C Firmware Implementation
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Compilation
                  </span>
                </div>
                <pre className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed">
                  <code>{inspectedTile.codeSnippet}</code>
                </pre>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setInspectedTile(null)}
                  className="px-5 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-200"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
