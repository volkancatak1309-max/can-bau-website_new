import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-white py-24 md:py-32">
      {/* Top divider */}
      <div className="w-full px-6 md:px-10">
        <div className="divider-line mb-20" />
      </div>

      <div className="w-full px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20">
          {/* Left: Big text */}
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#111] leading-[1.2] max-w-lg">
              Für uns ist <span className="italic">keine</span> Baustelle zu klein oder zu groß.
            </h3>
            <p className="font-body text-sm text-[#888] leading-relaxed mt-6 max-w-sm">
              CAN BAU GmbH — Hochbau, Tiefbau & Abbrucharbeiten in Vorarlberg. 
              Vertrauen, Qualität und Handwerk seit über 25 Jahren.
            </p>
          </div>

          {/* Right: Contact info */}
          <div>
            <div className="mb-8">
              <span className="section-label text-[#888] block mb-4">Adresse</span>
              <p className="font-body text-sm text-[#444]">
                Radetzkystraße 66<br />
                6845 Hohenems<br />
                Österreich
              </p>
            </div>

            <div className="mb-8">
              <span className="section-label text-[#888] block mb-4">Kontakt</span>
              <a 
                href="tel:+435576755450" 
                className="font-body text-sm text-[#444] block hover:text-[#111] transition-colors"
              >
                +43 (0) 5576 755 450
              </a>
              <a 
                href="mailto:info@canbau.at" 
                className="font-body text-sm text-[#444] block hover:text-[#111] transition-colors mt-1"
              >
                info@canbau.at
              </a>
            </div>

            <div>
              <a href="#" className="btn-outline text-[#111]">
                <span>Kontaktieren Sie uns</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-[#E5E0D8]">
          <p className="font-mono text-[0.625rem] text-[#aaa]">
            © {new Date().getFullYear()} CAN BAU GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-[0.625rem] text-[#aaa] hover:text-[#666] transition-colors">
              Impressum
            </a>
            <a href="#" className="font-mono text-[0.625rem] text-[#aaa] hover:text-[#666] transition-colors">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
