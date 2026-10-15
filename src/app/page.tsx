import { CampusLifeSection } from '@/components/home/CampusLifeSection';
import { CtaBand } from '@/components/home/CtaBand';
import { FacultiesSection } from '@/components/home/FacultiesSection';
import { Hero } from '@/components/home/Hero';
import { NewsSection } from '@/components/home/NewsSection';
import { PortalsSection } from '@/components/home/PortalsSection';
import { WelcomeSection } from '@/components/home/WelcomeSection';
import { StatStrip } from '@/components/ui/StatStrip';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatStrip />
      <PortalsSection />
      <WelcomeSection />
      <FacultiesSection />
      <NewsSection />
      <CampusLifeSection />
      <CtaBand />
    </>
  );
}
