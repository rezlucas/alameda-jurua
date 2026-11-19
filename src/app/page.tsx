import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Reels } from "@/components/Reels";
import { Diferenciais } from "@/components/Diferenciais";
import { Plantas } from "@/components/Plantas";
import { Localizacao } from "@/components/Localizacao";
import { Arquiteta } from "@/components/Arquiteta";
import { Agendar } from "@/components/Agendar";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/LeadModal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Page() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Reels />
        <Diferenciais />
        <Plantas />
        <Localizacao />
        <Arquiteta />
        <Agendar />
      </main>
      <Footer />
      <LeadModal />
      <WhatsAppFloat />
    </>
  );
}
