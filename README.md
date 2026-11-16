# DEEPAKIRUTHIKA T — Studio Creative Portfolio

A high-performance personal portfolio website for **DEEPAKIRUTHIKA T**, built with **React 19**, **Vite 8**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Faithfully designed after the authentic craftsmanship of three award-winning creative studio reference websites:
- **Moisez.com** (Screenshot 3): Architectural 12-column grid, massive editorial typography, draggable physical stickers, hand-drawn marker highlight, and manifesto.
- **BlueSQX.com** (Screenshot 2): Cinematic framed portal window with interactive spotlight flashlight lens, spectrum mode toggle (Nominal vs Infrared Night), and monochrome technology ticker.
- **Fragment.im** (Screenshot 1): Minimalist Swiss typography ("One engineer. Clear direction. Complete execution."), 3D cascading metallic cards fan in perspective with clickable hardware firmware inspector, and live simulator bench.

---

## ⚡ New Features & Enhancements

1. **Typographic Word & Quote Preloader (`Preloader.tsx`)**:
   - **No Numbers**: Replaced all numeric counters with dynamic kinetic words and engineering manifesto quotes.
   - Morphing sequence: `CURIOSITY` -> `EXPLORATION` -> `CIRCUITS` -> `TELEMETRY` -> `PRECISION` -> `INNOVATION`.
   - Grand Quote: *"Every interesting idea is an opportunity to learn, experiment, and create something meaningful."*
   - Smooth curtain wipe transition revealing the portfolio.

2. **Kinetic Dual-Direction Scroll Strips (`KineticScrollMarquee.tsx`)**:
   - Two opposing giant architectural typography lines that react to scroll direction:
     - **Line 1**: Drifts **left** on scroll down, drifts **right** on scroll up.
     - **Line 2**: Drifts **right** on scroll down, drifts **left** on scroll up.
   - Incorporates engineering quotes: *"Curiosity is the engine of achievement — precision in every circuit, intention in every line of firmware."*

3. **Real-Time Scroll Velocity & Direction HUD (`ScrollVelocityHUD.tsx`)**:
   - Floating pill on the bottom left tracking:
     - Direction: `▼ SCROLL DOWN` / `▲ SCROLL UP` with bounce feedback.
     - Scroll percentage tracking across the page.

4. **Scroll-Driven Fan for Fragment Metallic Cards (`Projects.tsx`)**:
   - The 5 metallic cards now dynamically fan open from a stacked deck as you scroll into the section and close back when scrolling up!
   - Clicking any card opens the interactive firmware inspector with circuit pinouts, operational voltages, and verified Embedded C code snippets.

5. **Draggable Physical Stickers in Hero (`Hero.tsx`)**:
   - Deepakiruthika’s portrait sticker and the `[ OPEN SYSTEM ]` hardware sticker are **physically draggable** across the screen with spring inertia and sound feedback.
   - Live real-time IST clock second-counter for Tamil Nadu, India.

6. **Cinematic Portal Window with Spotlight Lens (`AtmosphericShowcase.tsx`)**:
   - Cursor-following volumetric flashlight lens inside the portal window.
   - Spectrum toggle: Switch between **Nominal Optical View** and **Infrared Night Telemetry View**.

7. **Signature `.up` Floating Button (`UpButton.tsx`)**:
   - The purple `.up` button featured across all three reference sites on the bottom right corner for smooth top scrolling.

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Production build
npm run build
```
