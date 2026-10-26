"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useMagnetic } from "@/hooks/useMagnetic";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const logoRef = useMagnetic(0.2);
  const linkRefs = [
    useMagnetic(0.3),
    useMagnetic(0.3),
    useMagnetic(0.3),
    useMagnetic(0.3),
    useMagnetic(0.3),
  ];
  const ctaRef = useMagnetic(0.25);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll + Escape to close while mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { name: "Services", id: "services", path: "/services" },
    { name: "Work", id: "work", path: "/work" },
    { name: "About", id: "about", path: "/about" },
    { name: "Why RYZOM", id: "why-ryzom", path: "/why-ryzom" },
    { name: "Contact", id: "contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 py-4 ${
          scrolled
            ? "bg-black/70 backdrop-blur-md border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="site-shell flex items-center justify-between gap-3">
          <div ref={logoRef as any} className="cursor-pointer shrink-0 relative z-[71]">
            <Link href="/" onClick={closeMenu} aria-label="RYZOM home">
              <Logo
                className="w-28 md:w-32 xl:w-36 2xl:w-40 h-auto"
                animateOnLoad={true}
                interactive={true}
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 xl:gap-10 2xl:gap-12">
            {navItems.map((item, idx) => (
              <div key={item.id} ref={linkRefs[idx] as any} className="relative py-2">
                <Link
                  href={item.path}
                  className="text-white/60 hover:text-white text-xs xl:text-sm uppercase tracking-wider font-semibold transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-blue scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left" />
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden md:block">
            <div ref={ctaRef as any}>
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center px-6 py-2 rounded-full text-xs uppercase tracking-wider font-semibold bg-white text-black border border-white hover:bg-black hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(47,128,236,0.3)] glow-border"
              >
                Start a Project
              </Link>
            </div>
          </div>

          {/* Mobile menu toggle — always above the overlay */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden relative z-[71] flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-black/60 text-white hover:text-brand-blue hover:border-brand-blue/50 transition-colors touch-manipulation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-black/97 backdrop-blur-xl flex flex-col md:hidden"
          >
            {/* Top bar spacer matching header + dedicated close */}
            <div className="flex items-center justify-end site-shell pt-[max(1rem,env(safe-area-inset-top))] pb-2 min-h-[4.5rem]">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeMenu}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all touch-manipulation"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-6 pb-10 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={closeMenu}
                  className="w-full max-w-xs text-center py-3.5 text-white/85 hover:text-white text-lg uppercase tracking-[0.2em] font-semibold transition-colors duration-200 border-b border-white/5 touch-manipulation"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mt-8 w-full max-w-xs text-center px-8 py-3.5 rounded-full text-sm uppercase tracking-widest font-semibold bg-white text-black hover:bg-brand-blue hover:text-white transition-all duration-300 touch-manipulation"
              >
                Start a Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
