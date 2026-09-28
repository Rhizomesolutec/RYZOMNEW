"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function isTouchMobile() {
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Native scroll on phones — smoothest touch feel, no virtual-scroll overhead
    if (isTouchMobile()) {
      (window as any).lenis = null;
      document.documentElement.classList.remove("lenis");
      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => {
        window.clearTimeout(refreshTimer);
        window.removeEventListener("resize", onResize);
      };
    }

    document.documentElement.classList.add("lenis");

    const lenis = new Lenis({
      // Slightly longer ease = premium smooth glide without feeling sticky
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoResize: true,
    });

    (window as any).lenis = lenis;

    // Keep GSAP pin/scrub sections (Selected Work) in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      (window as any).lenis = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return <>{children}</>;
}
