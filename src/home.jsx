import { useState, useEffect, useRef } from "react";

// Google Fonts
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f2f0eb; font-family: 'DM Sans', sans-serif; color: #0d0d0d; overflow-x: hidden; }
  .font-display { font-family: 'Fraunces', serif; }
  .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  @keyframes scrollLine {
    0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
    50% { opacity: 1; transform: scaleY(1); }
    100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
  }
  .pulse-dot { animation: pulse-dot 2s infinite; }
  .float-anim { animation: float 3s ease-in-out infinite; }
  .float-anim-delay { animation: float 3s ease-in-out 1s infinite; }
  .scroll-line { animation: scrollLine 2s ease-in-out infinite; }
  .slider-track { transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #f2f0eb; }
  ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
`;
document.head.appendChild(globalStyle);

// ── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  { id: 1, title: "AI Dashboard UI",    category: "Product Design", gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]", emoji: "🤖" },
  { id: 2, title: "Portfolio Website",  category: "Web Design",     gradient: "from-[#0d0d0d] via-[#1a1a1a] to-[#2d2d2d]", emoji: "💼" },
  { id: 3, title: "E-Commerce App",     category: "Mobile UI",      gradient: "from-[#1a1a1a] to-[#2a2a2a]",               emoji: "🛍️" },
  { id: 4, title: "SaaS Landing Page",  category: "Web Design",     gradient: "from-[#0a0a0a] to-[#1c1c1c]",               emoji: "🚀" },
  { id: 5, title: "Finance Tracker",    category: "Mobile UI",      gradient: "from-[#111827] to-[#1f2937]",               emoji: "💰" },
];

const skills = [
  { name: "React",            icon: "⚛️" },
  { name: "Next.js",          icon: "▲" },
  { name: "TypeScript",       icon: "🔷" },
  { name: "Node.js",          icon: "🟢" },
  { name: "PostgreSQL",       icon: "🐘" },
  { name: "Tailwind CSS",     icon: "🎨" },
  { name: "GraphQL",          icon: "◈" },
  { name: "Docker",           icon: "🐳" },
];

const stats = [
  { num: "20+", label: "Projects Completed" },
  { num: "15+", label: "Happy Clients" },
  { num: "3+",  label: "Years Experience" },
  { num: "5★",  label: "Average Rating" },
];

const socials = ["Twitter", "LinkedIn", "GitHub", "Dev.to"];

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav({ active, setActive }) {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-[#1a1a1a] rounded-full px-2 py-1.5 flex items-center gap-1 shadow-xl">
        {["Work", "About"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setActive(item)}
            className={`text-sm font-medium px-[18px] py-2 rounded-full transition-all duration-200 no-underline tracking-wide
              ${active === item ? "bg-[#333] text-[#f2f0eb]" : "text-[#aaa] hover:bg-[#2a2a2a] hover:text-[#f2f0eb]"}`}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          className="bg-[#f2f0eb] text-[#0d0d0d] font-semibold text-sm px-[22px] py-2 rounded-full transition-all duration-200 no-underline hover:bg-[#e0ddd6]"
        >
          Contact Me
        </a>
      </div>
    </nav>
  );
}

// ── Slider ────────────────────────────────────────────────────────────────────

function WorkSlider() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const visibleCount = 3;
  const maxIndex = projects.length - visibleCount;
  const cardWidth = 340;
  const translateX = -(current * cardWidth) + dragDelta;

  return (
    <div>
      <div className="overflow-hidden -mx-2">
        <div
          className="slider-track flex gap-5"
          style={{ transform: `translateX(${translateX}px)` }}
          onMouseDown={(e) => { setIsDragging(true); setStartX(e.clientX); }}
          onMouseMove={(e) => { if (isDragging) setDragDelta(e.clientX - startX); }}
          onMouseUp={() => {
            setIsDragging(false);
            if (dragDelta < -60) setCurrent((c) => Math.min(maxIndex, c + 1));
            else if (dragDelta > 60) setCurrent((c) => Math.max(0, c - 1));
            setDragDelta(0);
          }}
          onMouseLeave={() => { if (isDragging) { setIsDragging(false); setDragDelta(0); } }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className={`min-w-[320px] h-[220px] bg-gradient-to-br ${p.gradient} rounded-[20px] overflow-hidden relative cursor-pointer flex-shrink-0 group`}
            >
              <div className="flex items-center justify-center h-full text-[64px] opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                {p.emoji}
              </div>
              <span className="absolute bottom-3.5 left-3.5 bg-white/10 backdrop-blur-md text-white text-[13px] font-semibold px-3.5 py-1.5 rounded-full border border-white/20">
                {p.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-[#0d0d0d] w-6" : "bg-[#ccc] w-2"}`}
            />
          ))}
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="w-11 h-11 rounded-full border border-[#ccc] bg-transparent flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#aaa]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(maxIndex, c + 1))}
            disabled={current === maxIndex}
            className="w-11 h-11 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#333]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("Work");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f0eb]">
      <Nav active={activeNav} setActive={setActiveNav} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        id="home"
        className="max-w-[900px] mx-auto px-8 pt-40 pb-24 text-center relative"
      >
        {/* Floating badges */}
        <div className="float-anim absolute top-44 left-5 bg-white rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-[#0d0d0d] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <span className="text-xl"><i class="bi bi-typescript"></i></span> TypeScript
        </div>
        <div className="float-anim-delay absolute top-48 right-5 bg-white rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-[#0d0d0d] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <span className="text-xl"><i class="bi bi-javascript"></i></span> Javascript
        </div>

        {/* Available tag */}
        <div className="mb-7">
          <span className="inline-flex items-center gap-1.5 bg-[#d4f0c4] text-[#1a5c00] text-base font-semibold px-4 py-1.5 rounded-full tracking-wide">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#3ea840] inline-block" />
            Available For Work
          </span>
        </div>

        {/* Hero title */}
        <h1
          className="font-display text-[clamp(45px,5vw,85px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0d0d0d] mb-7"
        >
          I'm <em className="italic font-light">Chisom,</em>
          <br />
          a Fullstack Dev
          <br />
          based in Nigeria
        </h1>

        <p className="text-lg font-normal text-[#5a5a5a] max-w-[420px] mx-auto leading-[1.55] mb-11">
          I build modern web applications and focus on writing clean,
          maintainable code that delivers fast, reliable, and user-friendly
          digital experiences.
        </p>

        <div className="flex gap-3.5 justify-center flex-wrap">
          <a
            href="#contact"
            className="bg-[#1a1a1a] text-[#f2f0eb] text-[15px] font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 no-underline transition-all duration-200 hover:bg-[#333] hover:-translate-y-px"
          >
            Contact Me
            <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
              <i class="bi bi-arrow-up-right text-black font-bold text-sm"></i>
            </span>
          </a>
          <a
            href="#work"
            className="bg-transparent text-[#0d0d0d] border border-[#ccc] text-[15px] font-semibold px-7 py-3.5 rounded-full no-underline transition-all duration-200 hover:border-[#0d0d0d] hover:-translate-y-px"
          >
            View Works
          </a>
        </div>

        <div className="mt-[70px]">
          <div className="scroll-line w-px h-[50px] bg-gradient-to-b from-transparent to-[#aaa] mx-auto" />
        </div>
      </section>

      {/* ── WORK ─────────────────────────────────────────────── */}
      <section id="work" className="max-w-[1100px] mx-auto px-8 py-20">
        <div className="fade-up mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#5a5a5a] mb-3">
            Selected Projects
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em]">
              My Recent Work
            </h2>
            <a
              href="#"
              className="bg-transparent text-[#0d0d0d] border border-[#ccc] text-[13px] font-semibold px-5 py-2.5 rounded-full no-underline transition-all hover:border-[#0d0d0d]"
            >
              View All Projects →
            </a>
          </div>
        </div>
        <div className="fade-up">
          <WorkSlider />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="max-w-[1100px] mx-auto px-8 py-20">
        <div className="fade-up grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#5a5a5a] mb-4">
              About Me
            </p>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] mb-6">
              Building with purpose &{" "}
              <em className="font-display italic font-light">precision</em>
            </h2>
            <p className="text-base font-normal text-[#5a5a5a] leading-[1.8] mb-5">
              I'm a fullstack developer passionate about crafting web applications
              that are both performant and maintainable. I care deeply about code
              quality, developer experience, and shipping products that scale.
            </p>
            <p className="text-base font-normal text-[#5a5a5a] leading-[1.8] mb-9">
              Based in Nigeria, I work with teams globally to build products
              people genuinely love to use — from MVPs to production systems.
            </p>
            <a
              href="#contact"
              className="bg-[#1a1a1a] text-[#f2f0eb] text-[15px] font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 no-underline transition-all duration-200 hover:bg-[#333] hover:-translate-y-px"
            >
              Let's Work Together
            </a>
          </div>

          {/* Right — dark card */}
          <div className="bg-[#1a1a1a] rounded-3xl p-10 text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.08] flex items-center justify-center text-3xl mb-6">
              ✦
            </div>
            <h3 className="font-display text-[26px] font-semibold text-white leading-[1.2] mb-3">
              3+ Years of Crafting Digital Experiences
            </h3>
            <p className="text-[15px] text-[#888] leading-[1.7] mb-8">
              From early-stage startups to established brands, I've built
              products across fintech, e-commerce, and SaaS industries.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-[36px] font-bold text-white leading-none mb-1">
                    {stat.num}
                  </div>
                  <div className="text-[13px] text-[#666] font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-8 py-16">
        <div className="fade-up text-center mb-9">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#5a5a5a] mb-3">
            Toolkit
          </p>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em]">
            Skills & Tools
          </h2>
        </div>
        <div className="fade-up flex flex-wrap gap-3 justify-center">
          {skills.map((s) => (
            <div
              key={s.name}
              className="bg-white border border-[#e0ddd6] rounded-full px-5 py-2.5 text-sm font-medium text-[#0d0d0d] inline-flex items-center gap-2 transition-all duration-200 hover:border-[#aaa] hover:-translate-y-0.5 hover:shadow-md cursor-default"
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="max-w-[1100px] mx-auto px-8 pb-28 pt-4">
        <div className="fade-up bg-[#1a1a1a] rounded-[32px] px-15 py-20 text-white text-center relative overflow-hidden">
          {/* Glow */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-white/[0.04] -top-24 -left-24 pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/[0.03] -bottom-16 -right-16 pointer-events-none" />

          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#666] mb-4 relative z-10">
            Get In Touch
          </p>
          <h2 className="font-display text-[clamp(36px,6vw,64px)] font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-5 relative z-10">
            Let's create something
            <br />
            <em className="italic font-light">amazing</em> together
          </h2>
          <p className="text-base text-[#888] max-w-[500px] mx-auto leading-[1.7] mb-11 relative z-10">
            Have a project in mind? I'd love to hear about it. Let's talk and
            see how I can help bring your vision to life.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap relative z-10">
            <a
              href="mailto:chisom@email.com"
              className="bg-white text-[#0d0d0d] text-[15px] font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 no-underline transition-all duration-200 hover:bg-[#f0ede8] hover:-translate-y-px"
            >
              Send Me an Email ✉️
            </a>
            <a
              href="#"
              className="bg-transparent text-white border border-white/25 text-[15px] font-semibold px-8 py-3.5 rounded-full no-underline transition-all duration-200 hover:border-white/50 hover:-translate-y-px"
            >
              View GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="max-w-[1100px] mx-auto px-8 py-8 flex items-center justify-between flex-wrap gap-4 border-t border-[#ddd]">
        <div className="font-display text-xl font-semibold text-[#0d0d0d]">
          Chisom.
        </div>
        <p className="text-[13px] text-[#5a5a5a]">
          © 2026 Chisom. All rights reserved.
        </p>
        <div className="flex gap-5">
          {socials.map((s) => (
            <a
              key={s}
              href="#"
              className="text-[13px] font-medium text-[#5a5a5a] no-underline transition-colors duration-200 hover:text-[#0d0d0d]"
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}