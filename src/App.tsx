import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KineticScrollMarquee } from './components/KineticScrollMarquee';
import { AtmosphericShowcase } from './components/AtmosphericShowcase';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { CreativePlayground } from './components/CreativePlayground';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { UpButton } from './components/UpButton';
import { ScrollVelocityHUD } from './components/ScrollVelocityHUD';

export function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {/* 00: Opening Studio Preloader Sequence (Words & Quotes - NO Numbers!) */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Main Portfolio Container */}
      <div
        className={`min-h-screen bg-[#F4F3EF] text-[#121212] relative overflow-x-hidden transition-opacity duration-700 ${
          loadingComplete ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Studio Minimalist Custom Cursor */}
        <CustomCursor />

        {/* Top Navigation */}
        <Navbar />

        {/* Section 01: Moisez-Style Architectural Hero with Draggable Physical Stickers (Image 3) */}
        <Hero />

        {/* Section 02: Kinetic Dual-Direction Scroll Strips (Reacts dynamically to scroll down/up!) */}
        <KineticScrollMarquee />

        {/* Section 03: BlueSQX-Style Atmospheric Showcase & Interactive Spotlight Portal (Image 2) */}
        <AtmosphericShowcase />

        {/* Section 04: Fragment-Style Cascading 3D Metallic Cards & Hardware Inspector (Image 1) */}
        <Projects />

        {/* Section 05: Editorial Dossier & Bio with Confirmed Specifications */}
        <About />

        {/* Section 06: Academic Foundation & Timeline */}
        <Education />

        {/* Section 07: Professional Internship Experience */}
        <Experience />

        {/* Section 08: Moisez-Style Kinetic Letters ("DETAILS MATTER.") */}
        <CreativePlayground />

        {/* Section 09: Direct Contact & Verified Details */}
        <Contact />

        {/* Studio Footer */}
        <Footer />

        {/* Real-Time Scroll Direction & Velocity HUD */}
        <ScrollVelocityHUD />

        {/* Signature .up Floating Pill Button as seen in all 3 references */}
        <UpButton />
      </div>
    </>
  );
}

export default App;
