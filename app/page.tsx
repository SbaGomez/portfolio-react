import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import StackGrid from "@/components/home/StackGrid";
import ProyectosDestacados from "@/components/home/ProyectosDestacados";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <StatsBar />
      <StackGrid />
      <ProyectosDestacados />
      <CtaBand />
    </main>
  );
}
