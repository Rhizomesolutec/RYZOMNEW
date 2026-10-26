"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, BarChart, Layers, Settings, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  video?: string;
  color: string;
  challenge: string;
  process: string;
  solution: string;
  results: string;
  stats: { label: string; value: string }[];
}

const PROJECTS_DATA: Project[] = [
  {
    id: "product-platforms",
    title: "Product Platforms",
    category: "Development",
    image: "rgba(47, 128, 236, 0.2)",
    video: "/work/Work%201.mp4",
    color: "#2F80EC",
    challenge:
      "Engineer fast, scalable web and mobile products with clean architecture, thoughtful UX, and code built to last.",
    process:
      "We mapped product flows, chose the right stack, and shipped iterative releases — from MVP to production — with performance and payments in mind.",
    solution:
      "Custom web apps, mobile experiences, and backend systems that feel as polished as the brand behind them.",
    results:
      "Shorter time-to-market, stable releases, and products that convert attention into real usage.",
    stats: [
      { label: "Load Time", value: "-40%" },
      { label: "Ship Cycle", value: "2×" },
    ],
  },
  {
    id: "brand-systems",
    title: "Brand Systems",
    category: "Branding & Design",
    image: "rgba(235, 87, 87, 0.2)",
    video: "/work/work%202.mp4",
    color: "#EB5757",
    challenge:
      "Build a distinctive brand foundation — identity, UI language, and creative direction — that feels premium and scales across every touchpoint.",
    process:
      "We defined visual strategy, typography, and design systems, then translated them into interfaces and assets the product and marketing teams can grow from.",
    solution:
      "A cohesive brand system: logo architecture, color & type rules, UI kits, and creative templates that keep every surface unmistakably on-brand.",
    results:
      "Faster creative output, clearer brand recognition, and a visual language teams can ship with without reinventing the look each time.",
    stats: [
      { label: "Brand Consistency", value: "+92%" },
      { label: "Design Velocity", value: "3×" },
    ],
  },
  {
    id: "growth-campaigns",
    title: "Growth Campaigns",
    category: "Digital Marketing",
    image: "rgba(33, 150, 82, 0.2)",
    video: "/work/work%203.mp4",
    color: "#219652",
    challenge:
      "Turn brand presence into measurable growth with focused campaigns across SEO, social, and paid channels.",
    process:
      "We audited channels, built creative + copy systems, and ran always-on funnels that feed learning back into the next sprint.",
    solution:
      "Integrated campaign systems — content, ads, and landing paths — tuned for attention, engagement, and conversion.",
    results:
      "Higher qualified traffic, stronger engagement loops, and growth you can attribute — not guess.",
    stats: [
      { label: "Qualified Leads", value: "+180%" },
      { label: "ROAS", value: "4.2×" },
    ],
  },
  {
    id: "motion-stories",
    title: "Motion Stories",
    category: "Media Production",
    image: "rgba(242, 201, 77, 0.2)",
    video: "/work/work%204.mp4",
    color: "#F2C94D",
    challenge:
      "Express the brand in motion — photography, videography, and graphics that feel cinematic and clear.",
    process:
      "We directed shoots, edited narrative cuts, and built motion systems that plug into launches, social, and product storytelling.",
    solution:
      "A library of premium media: hero films, product motion, and social-ready cuts that carry the brand’s philosophy.",
    results:
      "Higher watch-through, sharper launch moments, and media assets that keep working long after day one.",
    stats: [
      { label: "Watch Time", value: "+65%" },
      { label: "Campaign Lift", value: "2.8×" },
    ],
  },
];

/** Home section — Manually Slidable Selected Work Cards Carousel */
export default function Work() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Drag-to-slide state
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasDragged = useRef(false);

  // Scroll navigation states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    // Calculate approximate active card index
    const card = el.querySelector<HTMLElement>(".work-card-home");
    if (card) {
      const cardWidth = card.offsetWidth + 24;
      const current = Math.round(el.scrollLeft / cardWidth);
      setActiveIdx(Math.min(Math.max(0, current), PROJECTS_DATA.length - 1));
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const slide = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".work-card-home");
    const delta = card ? card.offsetWidth + 24 : 450;

    el.scrollBy({
      left: direction === "right" ? delta : -delta,
      behavior: "smooth",
    });
  };

  const scrollToCard = (index: number) => {
    const card = document.getElementById(`work-card-${index}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isMouseDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftPos.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!isMouseDown.current || !el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    if (Math.abs(walk) > 6) {
      hasDragged.current = true;
    }
    el.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDown.current = false;
  };

  return (
    <>
      <section
        id="work"
        className="relative py-24 md:py-32 bg-black overflow-hidden select-none border-b border-white/[0.06]"
      >
        {/* Soft background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] opacity-10 blur-[150px] rounded-full"
            style={{
              background: "radial-gradient(circle, #2F80EC 0%, #9A51E0 50%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full">
          {/* Header Row with Slidable Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 site-shell-wide mb-8 md:mb-12 xl:mb-14">
            <div className="max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-[10px] sm:text-xs font-cascadia uppercase tracking-widest text-brand-blue">
                  Case Studies
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[4rem] font-bohuan uppercase tracking-wide md:tracking-wider text-white leading-tight">
                Selected Work
              </h2>
              <p className="text-xs sm:text-sm font-cascadia text-white/45 mt-2">
                Slide right to explore all disciplines & living case studies.
              </p>
            </div>

            {/* Manual Slidable Controls */}
            <div className="flex items-center gap-4 self-start md:self-auto">
              <span className="text-xs font-cascadia text-white/50 tracking-wider">
                0{activeIdx + 1} / 0{PROJECTS_DATA.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => slide("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous work slide"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 flex items-center justify-center text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => slide("right")}
                  disabled={!canScrollRight}
                  aria-label="Next work slide"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Manually Slidable Cards Track */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12 items-center overflow-x-auto scrollbar-none snap-x snap-mandatory py-6 pl-5 sm:pl-8 md:pl-16 lg:pl-24 xl:pl-20 2xl:pl-28 3xl:pl-32 pr-[15vw] cursor-grab active:cursor-grabbing will-change-scroll"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {PROJECTS_DATA.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onClick={() => {
                  if (!hasDragged.current) {
                    setSelectedProject(project);
                  }
                }}
              />
            ))}
          </div>

          {/* Bottom Progress & Slide Dots */}
          <div className="flex items-center justify-center gap-3 mt-8 px-5">
            {PROJECTS_DATA.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => scrollToCard(idx)}
                aria-label={`Jump to ${project.title}`}
                className="group p-1.5 cursor-pointer"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx
                      ? "w-8 bg-white"
                      : "w-2 bg-white/20 group-hover:bg-white/40"
                  }`}
                  style={{
                    backgroundColor: idx === activeIdx ? project.color : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!project.video) return;
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const play = video.play();
          if (play && typeof play.catch === "function") play.catch(() => {});
        } else {
          video.pause();
        }
      },
      { root: null, rootMargin: "80px 0px", threshold: 0.2 }
    );

    io.observe(video);
    return () => {
      io.disconnect();
      video.pause();
    };
  }, [project.video]);

  return (
    <div
      id={`work-card-${index}`}
      onClick={onClick}
      className="work-card-home glass-panel w-[78vw] max-w-[300px] sm:w-[340px] sm:max-w-none md:w-[420px] lg:w-[450px] xl:w-[500px] 2xl:w-[560px] 3xl:w-[600px] h-[340px] sm:h-[380px] md:h-[450px] lg:h-[480px] xl:h-[520px] 2xl:h-[580px] 3xl:h-[620px] rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 xl:p-9 2xl:p-10 flex flex-col justify-between relative overflow-hidden group cursor-pointer glow-border border border-white/5 hover:border-white/20 transition-all duration-300 shrink-0 snap-start select-none"
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
        {project.video ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-center scale-[1.2] origin-center"
              src={project.video}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25"
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `radial-gradient(circle at center, ${project.image} 0%, transparent 75%)`,
            }}
          />
        )}
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20 pointer-events-none rounded-[inherit] z-[1]" />

      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="text-[9px] sm:text-[10px] font-cascadia uppercase tracking-wider text-white/50 truncate">
          {project.category}
        </span>
        <span
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0"
          style={{
            backgroundColor: project.color,
            boxShadow: `0 0 10px ${project.color}`,
          }}
        />
      </div>

      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl md:text-4xl font-bohuan uppercase tracking-wide md:tracking-wider text-white mb-3 md:mb-4 leading-tight">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-cascadia text-white/40 group-hover:text-white transition-colors duration-300">
          <span>Read Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const modalCtaRef = useMagnetic(0.2);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const lenis = (window as any).lenis;
    if (lenis) lenis.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      const lenis2 = (window as any).lenis;
      if (lenis2) lenis2.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal background"
      />

      <div className="relative z-10 w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl max-h-[90vh] overflow-y-auto bg-black/90 border border-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 xl:p-14 text-white scrollbar-none shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="sticky top-0 float-right ml-auto mb-2 sm:absolute sm:top-5 sm:right-5 sm:float-none sm:mb-0 w-12 h-12 rounded-full border border-white/30 bg-black/90 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors z-30 cursor-pointer touch-manipulation shadow-[0_0_20px_rgba(0,0,0,0.6)]"
        >
          <X className="w-6 h-6" strokeWidth={2.5} />
        </button>

        <div className="mb-12">
          <span
            className="text-xs font-cascadia uppercase tracking-widest block mb-2"
            style={{ color: project.color }}
          >
            {project.category}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bohuan uppercase tracking-wider text-white mb-6">
            {project.title}
          </h2>

          <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6 my-6">
            {project.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-2xl sm:text-4xl font-bohuan mb-1"
                  style={{ color: project.color }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase font-cascadia text-white/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/80 font-semibold mb-1">
              <Settings className="w-5 h-5" style={{ color: project.color }} />
              <span className="text-xs uppercase font-cascadia tracking-wider">The Challenge</span>
            </div>
            <p className="text-xs sm:text-sm font-cascadia text-white/60 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/80 font-semibold mb-1">
              <Layers className="w-5 h-5" style={{ color: project.color }} />
              <span className="text-xs uppercase font-cascadia tracking-wider">The Process</span>
            </div>
            <p className="text-xs sm:text-sm font-cascadia text-white/60 leading-relaxed">
              {project.process}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/80 font-semibold mb-1">
              <Award className="w-5 h-5" style={{ color: project.color }} />
              <span className="text-xs uppercase font-cascadia tracking-wider">The Solution</span>
            </div>
            <p className="text-xs sm:text-sm font-cascadia text-white/60 leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/80 font-semibold mb-1">
              <BarChart className="w-5 h-5" style={{ color: project.color }} />
              <span className="text-xs uppercase font-cascadia tracking-wider">The Results</span>
            </div>
            <p className="text-xs sm:text-sm font-cascadia text-white/60 leading-relaxed">
              {project.results}
            </p>
          </div>
        </div>

        <div className="flex justify-center border-t border-white/10 pt-8">
          <div ref={modalCtaRef as any}>
            <button
              onClick={onClose}
              className="relative inline-flex items-center justify-center px-10 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-white text-black border border-white hover:bg-black hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
