// app/page.tsx

import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/HeroSection';
import VehicleShowcase from '@/components/VehicleShowcase';
import HyperdriveSection from '@/components/HyperdriveSection'; // <-- NEW
import EngineeringSection from '@/components/EngineeringSection'; // <-- NEW
import CinematicSection from '@/components/CinematicSection';
import ParticleSection from '@/components/ParticleSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <VehicleShowcase />
      
      {/* ✨ NEW: Mind-bending warp speed transition */}
      <HyperdriveSection />
      
      {/* ✨ NEW: Holographic engineering core */}
      <EngineeringSection />
      
      <CinematicSection />
      <ParticleSection />
      <Footer />
    </main>
  );
}