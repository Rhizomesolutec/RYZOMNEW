"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export interface ClientLogo {
  id: string;
  name: string;
  website: string;
  displayUrl: string;
  logo: string;
  color: string;
  glowColor: string;
  aspectClass?: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "kopiko",
    name: "Kopiko",
    website: "https://kopikowedd.in/",
    displayUrl: "kopikowedd.in",
    logo: "/client/kopiko%20logo.webp",
    color: "#E53935",
    glowColor: "rgba(229, 57, 53, 0.5)",
    aspectClass: "h-14 sm:h-18 md:h-22 lg:h-24 w-auto",
  },
  {
    id: "cultscribe",
    name: "Cultscribe",
    website: "https://www.cultscribe.com",
    displayUrl: "www.cultscribe.com",
    logo: "/client/cultscribe%20logo.png",
    color: "#EB5757",
    glowColor: "rgba(235, 87, 87, 0.5)",
    aspectClass: "h-12 sm:h-16 md:h-20 lg:h-22 w-auto",
  },
  {
    id: "devil-inside",
    name: "Devil Inside",
    website: "https://www.devilinsiderecords.in/",
    displayUrl: "devilinsiderecords.in",
    logo: "/client/devil%20inside%20logo.webp",
    color: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.4)",
    aspectClass: "h-16 sm:h-20 md:h-24 lg:h-28 w-auto",
  },
  {
    id: "boombap",
    name: "BOOMBAP",
    website: "https://boombap.vercel.app/",
    displayUrl: "boombap.vercel.app",
    logo: "/client/bmbp-green-logo.png",
    color: "#219652",
    glowColor: "rgba(33, 150, 82, 0.5)",
    aspectClass: "h-16 sm:h-20 md:h-24 lg:h-28 w-auto",
  },
  {
    id: "crwu",
    name: "CRWU",
    website: "https://crwu-web.vercel.app/",
    displayUrl: "crwu-web.vercel.app",
    logo: "/client/crwu-transparent.png",
    color: "#9A51E0",
    glowColor: "rgba(154, 81, 224, 0.5)",
    aspectClass: "h-14 sm:h-18 md:h-22 lg:h-24 w-auto",
  },
  {
    id: "fift4",
    name: "Fift4",
    website: "https://fift4.vercel.app/",
    displayUrl: "fift4.vercel.app",
    logo: "/client/fift4-transparent.png",
    color: "#2F80EC",
    glowColor: "rgba(47, 128, 236, 0.5)",
    aspectClass: "h-14 sm:h-18 md:h-22 lg:h-24 w-auto",
  },
];

interface ClientsProps {
  isWorkPage?: boolean;
  className?: string;
}

export default function Clients({ isWorkPage = false, className = "" }: ClientsProps) {
  return (
    <section
      id="clients"
      className={`relative bg-black text-white select-none overflow-hidden ${
        isWorkPage ? "pt-10 md:pt-14 pb-20 md:pb-24 border-b border-white/[0.06]" : "py-24 md:py-32 border-b border-white/[0.06]"
      } ${className}`}
    >
      {/* Ambient background aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] opacity-15 blur-[150px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(47, 128, 236, 0.5) 0%, rgba(154, 81, 224, 0.3) 50%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 site-shell">
        {/* Section Header */}
        <div className="text-center max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto mb-16 md:mb-24 xl:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="font-cascadia text-xs uppercase tracking-widest text-brand-blue">
              {isWorkPage ? "Client Partnerships" : "Our Clients"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5rem] font-normal font-bohuan tracking-tight uppercase leading-[1.08] text-white"
          >
            Trusted By Visionary Brands
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm md:text-base font-cascadia text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            Powering iconic global giants and cultural frontrunners scaling with RYZOM.
          </motion.p>
        </div>

        {/* Clean Logo Showcase — With Mentioned Websites Near Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 md:gap-12 items-start justify-items-center mb-12 md:mb-16">
          {CLIENT_LOGOS.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="group flex flex-col items-center justify-center p-2 transition-all duration-300 w-full text-center"
            >
              {/* Clickable Logo leading to the client website */}
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${client.name} website (${client.displayUrl})`}
                className="h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center w-full focus:outline-none cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  className={`${client.aspectClass} object-contain transition-all duration-500 opacity-85 group-hover:opacity-100 group-hover:drop-shadow-[0_0_24px_${client.glowColor}]`}
                />
              </a>

              {/* Minimal Brand Label */}
              <span className="mt-4 text-[10px] sm:text-xs font-cascadia uppercase tracking-widest text-white/40 group-hover:text-white transition-colors duration-300 font-semibold">
                {client.name}
              </span>

              {/* Mentioned Website Link Near Logo */}
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-cascadia text-white/35 hover:text-brand-blue group-hover:text-white/70 transition-colors duration-300 max-w-[140px] truncate"
                title={`Visit ${client.website}`}
              >
                <span className="truncate">{client.displayUrl}</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom subtle CTA link */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-cascadia text-white/45 hover:text-white transition-colors group cursor-pointer"
          >
            <span>Partner with RYZOM for your next digital evolution</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-brand-blue" />
          </Link>
        </div>
      </div>
    </section>
  );
}
