import { useState, useEffect } from "react";

// ── Fonts & Global Styles ─────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const style = document.createElement("style");
style.innerHTML = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #f5f2ec;
    --ink: #0f0f0f;
    --ink2: #3d3d3d;
    --ink3: #888;
    --border: #ddd8ce;
    --dark: #111;
    --dark2: #1c1c1c;
    --green-bg: #dff3d0;
    --green-text: #2a6b10;
    --green-dot: #45b637;
    --white: #ffffff;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--cream);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--ink);
    font-size: 15px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .fr { font-family: 'Fraunces', serif; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 48px;
    background: rgba(245, 242, 236, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 400; color: var(--ink); letter-spacing: -0.02em; }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link {
    font-size: 13px; font-weight: 600; color: var(--ink2);
    text-decoration: none; padding: 7px 16px;
    border-radius: 100px; transition: all 0.18s;
    background: transparent; border: none; cursor: pointer;
  }
  .nav-link:hover { background: #e8e3d8; color: var(--ink); }
  .nav-cta {
    background: var(--ink); color: var(--cream);
    font-size: 13px; font-weight: 700;
    padding: 8px 20px; border-radius: 100px;
    text-decoration: none; transition: all 0.18s;
    border: none; cursor: pointer;
  }
  .nav-cta:hover { background: #2a2a2a; transform: translateY(-1px); }

  /* SECTIONS */
  .section { max-width: 1100px; margin: 0 auto; padding: 100px 48px 72px; }
  .section-sm { max-width: 1100px; margin: 0 auto; padding: 64px 48px; }
  hr.sep { border: none; border-top: 1px solid var(--border); max-width: 1100px; margin: 0 auto; }

  /* HERO */
  #hero { padding-top: 130px; padding-bottom: 80px; }
  .badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--green-bg); color: var(--green-text);
    font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
    padding: 6px 14px; border-radius: 100px; margin-bottom: 28px;
  }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-dot); animation: blink 2s infinite; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }

  .headline {
    font-family: 'Fraunces', serif;
    font-size: clamp(42px, 8vw, 64px);
    font-weight: 400;
    line-height: 1.04;
    letter-spacing: -0.025em;
    color: var(--ink);
    margin-bottom: 22px;
  }
  .headline em { font-style: italic; font-weight: 300; color: #555; }
  .hero-sub {
    font-size: 16px; color: var(--ink2); max-width: 440px;
    line-height: 1.72; margin-bottom: 36px; font-weight: 400;
  }
  .btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .btn-dark {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--ink); color: var(--cream);
    font-size: 14px; font-weight: 700;
    padding: 13px 26px; border-radius: 100px;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-dark:hover { background: #272727; transform: translateY(-1px); }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--ink);
    border: 1.5px solid var(--border);
    font-size: 14px; font-weight: 700;
    padding: 12px 26px; border-radius: 100px;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-outline:hover { border-color: #aaa; transform: translateY(-1px); }
  .arrow-badge {
    width: 26px; height: 26px; border-radius: 50%;
    background: #fff; display: flex; align-items: center;
    justify-content: center; font-size: 13px; color: var(--ink);
  }

  /* SECTION LABEL / TITLE */
  .label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--ink3); margin-bottom: 10px;
  }
  .title {
    font-family: 'Fraunces', serif;
    font-size: clamp(30px, 5vw, 44px);
    font-weight: 400; line-height: 1.08;
    letter-spacing: -0.025em; margin-bottom: 32px;
  }
  .title em { font-style: italic; font-weight: 300; color: #666; }

  /* WORK */
  .work-header { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 28px; }
  .work-header .title { margin-bottom: 0; }
  .projects { display: grid; gap: 14px; }
  .project-card {
    background: var(--dark); border-radius: 20px;
    padding: 26px; color: #fff; position: relative; overflow: hidden;
    transition: transform 0.2s;
  }
  .project-card:hover { transform: translateY(-2px); }
  .project-card::after {
    content: ''; position: absolute;
    top: -80px; right: -80px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(255,255,255,0.025); pointer-events: none;
  }
  .proj-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 12px; }
  .proj-title { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 400; color: #fff; line-height: 1.2; letter-spacing: -0.02em; flex: 1; }
  .proj-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .proj-action {
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; color: #777; font-size: 14px;
    transition: all 0.18s; border: 1px solid rgba(255,255,255,0.06);
  }
  .proj-action:hover { background: rgba(255,255,255,0.12); color: #fff; }
  .proj-title { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 400; color: #fff; margin-bottom: 10px; line-height: 1.2; letter-spacing: -0.02em; }
  .proj-desc { font-size: 13px; color: #777; line-height: 1.68; margin-bottom: 18px; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag {
    font-size: 11px; font-weight: 600;
    background: rgba(255,255,255,0.06);
    color: #999; padding: 4px 11px;
    border-radius: 100px; border: 1px solid rgba(255,255,255,0.07);
    letter-spacing: 0.02em;
  }

  /* ABOUT */
  .about-grid { display: grid; gap: 24px; }
  @media (min-width: 640px) { .about-grid { grid-template-columns: 1fr 1fr; } }
  .about-text p { color: var(--ink2); line-height: 1.8; margin-bottom: 18px; font-size: 15px; }
  .dark-card { background: var(--dark); border-radius: 20px; padding: 28px; color: #fff; }
  .dark-card-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 18px;
  }
  .dark-card h3 { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 400; color: #fff; margin-bottom: 10px; line-height: 1.25; }
  .dark-card p { font-size: 13px; color: #666; line-height: 1.72; margin-bottom: 24px; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .stat-n { font-family: 'Fraunces', serif; font-size: 36px; font-weight: 400; color: #fff; line-height: 1; }
  .stat-l { font-size: 12px; color: #555; margin-top: 5px; font-weight: 500; }

  /* SKILLS */
  .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--white); border: 1px solid var(--border);
    border-radius: 100px; padding: 9px 18px;
    font-size: 13px; font-weight: 600; color: var(--ink);
    transition: all 0.18s; cursor: default;
  }
  .skill:hover { border-color: #aaa; transform: translateY(-1px); box-shadow: 0 2px 10px rgba(0,0,0,0.07); }

  /* CONTACT */
  .contact-card {
    background: var(--dark); border-radius: 24px;
    padding: 64px 40px; text-align: center;
    color: #fff; position: relative; overflow: hidden;
  }
  .contact-card::before {
    content: ''; position: absolute;
    width: 350px; height: 350px; border-radius: 50%;
    background: rgba(255,255,255,0.02);
    top: -120px; left: -120px; pointer-events: none;
  }
  .contact-card::after {
    content: ''; position: absolute;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.02);
    bottom: -80px; right: -80px; pointer-events: none;
  }
  .contact-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #555; margin-bottom: 16px; }
  .contact-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(30px, 7vw, 52px);
    font-weight: 400; color: #fff;
    line-height: 1.08; letter-spacing: -0.025em; margin-bottom: 16px;
  }
  .contact-title em { font-style: italic; font-weight: 300; color: #777; }
  .contact-sub { font-size: 15px; color: #666; max-width: 400px; margin: 0 auto 36px; line-height: 1.7; }
  .contact-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; position: relative; z-index: 1; }
  .btn-white {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; color: var(--ink);
    font-size: 13px; font-weight: 700;
    padding: 12px 24px; border-radius: 100px;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-white:hover { background: #f0ede6; transform: translateY(-1px); }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: #fff;
    border: 1px solid rgba(255,255,255,0.18);
    font-size: 13px; font-weight: 600;
    padding: 12px 24px; border-radius: 100px;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.45); transform: translateY(-1px); }

  /* FOOTER */
  footer {
    max-width: 720px; margin: 0 auto;
    padding: 24px 24px 40px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px;
    border-top: 1px solid var(--border);
  }
  .footer-logo { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 400; color: var(--ink); flex-shrink: 0; }
  .footer-copy { font-size: 12px; color: var(--ink3); text-align: center; flex: 1; }
  .footer-icons { display: flex; gap: 8px; flex-shrink: 0; }
  .footer-icon {
    width: 34px; height: 34px; border-radius: 50%;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--ink3); text-decoration: none;
    transition: all 0.18s; background: transparent;
  }
  .footer-icon:hover { border-color: var(--ink); color: var(--ink); background: #eee9df; transform: translateY(-1px); }
  .footer-icon svg { display: block; }
  @media (max-width: 480px) {
    footer { flex-direction: column; align-items: center; text-align: center; gap: 14px; padding: 24px 16px 36px; }
    .footer-copy { flex: unset; }
  }

  /* ANIMATIONS */
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .fade-up.visible { opacity: 1; transform: none; }

  /* MOBILE */
  @media (max-width: 600px) {
    nav { padding: 12px 16px; }
    .nav-link { display: none; }
    .section, .section-sm { padding-left: 16px; padding-right: 16px; }
    #hero { padding-top: 100px; }
    .contact-card { padding: 44px 20px; }
    footer { padding: 16px 16px 32px; }
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
`;
document.head.appendChild(style);

// ── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: "01",
    title: "E-commerce",
    description:
      "A seamless shopping experience with product browsing, secure checkout, order tracking, and personalized recommendations.",
    tech: ["React", "Node.js", "Supabase", "Tailwind CSS"],
    live: "https://omoflexy.vercel.app/",
    github: "https://github.com/iamchisomdev/omoflexy",
  },
  {
    id: "02",
    title: "VTU Clone",
    description:
      "A fully responsive data subscription marketplace where users can buy and sell data and airtime with smooth, user-friendly transactions.",
    tech: ["HTML", "Bootstrap 5", "JavaScript"],
    live: "https://web-first-work.vercel.app/",
    github: "https://github.com/iamchisomdev/web",
  },
  {
    id: "03",
    title: "Waitlist",
    description:
      "A responsive product launch site with a full referral system, letting users refer one another and track their position ahead of launch.",
    tech: ["Nextjs", "Tailwindcss", "supabase"],
    live: "https://chisomdev.vercel.app/backend-waitlist.vercel.app",
    github: "https://github.com/iamchisomdev/backend-waitlist",
  },
];

const skills = [
  { name: "HTML5", },
  { name: "CSS3", },
  { name: "JavaScript", },
  { name: "React.js", },
  { name: "Next.js", },
  { name: "Node.js", },
  { name: "Express.js", },
  { name: "TypeScript", },
  { name: "PostgreSQL", },
  { name: "Tailwind CSS", },
  { name: "Docker", },
  { name: "Tanstack Query", },
  { name: "Supabase", },
];

const stats = [
  { n: "20+", l: "Projects Completed" },
  { n: "15+", l: "Happy Clients" },
  { n: "3+", l: "Years Experience" },
  { n: "100%", l: "Client Satisfaction" },
];

// ── GitHub SVG ────────────────────────────────────────────────────────────────

function GhIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 6.6c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav>
      <span className="nav-logo">Chisom</span>
      <div className="nav-links">
        <button className="nav-link" onClick={() => go("hero")}>Home</button>
        <button className="nav-link" onClick={() => go("work")}>Work</button>
        <button className="nav-link" onClick={() => go("about")}>About</button>
        <button className="nav-cta" onClick={() => window.open("/resume.pdf", "_blank")}>Resume</button>
      </div>
    </nav>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <Nav />

      {/* HERO */}
      <section className="section" id="hero">
        <div className="badge">
          <span className="dot" />
          Available for work
        </div>
        <h1 className="headline">
          I'm <em>Chisom,</em>
          <br />a Fullstack Developer
          <br />
          based in Nigeria
        </h1>
        <p className="hero-sub">
          I build modern web applications focused on clean, maintainable code
          that delivers fast, reliable, and user-friendly digital experiences.
        </p>
        <div className="btn-row">
          <a
            href="#contact"
            className="btn-dark"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Me
          </a>
          <a
            href="#work"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Work
          </a>
        </div>
      </section>

      <hr className="sep" />

      {/* WORK */}
      <section className="section fade-up" id="work">
        <p className="label">Selected Projects</p>
        <div className="work-header">
          <h2 className="title">My Recent Work</h2>
          <a href="#" className="btn-outline" style={{ fontSize: 13, padding: "9px 18px" }}>
            All Projects →
          </a>
        </div>
        <div className="projects">
          {projects.map((p) => (
            <div key={p.id} className="project-card">
              <div className="proj-header">
                <div className="proj-title">{p.title}</div>
                <div className="proj-actions">
                  <a href={p.github} className="proj-action" title="GitHub" target="_blank" rel="noreferrer">
                    <GhIcon />
                  </a>
                  <a href={p.live} className="proj-action" title="Live site" target="_blank" rel="noreferrer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="proj-desc">{p.description}</div>
              <div className="tags">
                {p.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="sep" />

      {/* ABOUT */}
      <section className="section fade-up" id="about">
        <p className="label">About Me</p>
        <h2 className="title">
          Building with purpose &amp; <em>precision</em>
        </h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a fullstack developer passionate about crafting web
              applications that are both performant and maintainable. I care
              deeply about code quality, developer experience, and shipping
              products that scale.
            </p>
            <p>
              Based in Nigeria, I work with teams globally to build products
              people genuinely love to use — from MVPs to production systems.
            </p>
            <a
              href="#contact"
              className="btn-dark"
              style={{ marginTop: 4 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let's Work Together
            </a>
          </div>
          <div className="dark-card">
            <div className="dark-card-icon">✦</div>
            <h3>3+ Years Crafting Digital Experiences</h3>
            <p>
              From early-stage startups to established brands, I've built
              products across fintech, e-commerce, and SaaS industries.
            </p>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="stat-n">{s.n}</div>
                  <div className="stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="sep" />

      {/* SKILLS */}
      <section className="section-sm fade-up">
        <p className="label">Toolkit</p>
        <h2 className="title" style={{ marginBottom: 24 }}>Skills &amp; Tools</h2>
        <div className="skills-wrap">
          {skills.map((s) => (
            <div key={s.name} className="skill">
              <span style={{ fontSize: 15 }}>{s.icon}</span>
              {s.name}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section fade-up" id="contact">
        <div className="contact-card">
          <div className="contact-label">Get In Touch</div>
          <div className="contact-title">
            Let's create something
            <br />
            <em>amazing</em> together
          </div>
          <div className="contact-sub">
            Have a project in mind? I'd love to hear about it. Let's talk and
            see how I can help bring your vision to life.
          </div>
          <div className="contact-btns">
            <a href="mailto:chisomchidike03@email.com" className="btn-white">
              Send an Email
            </a>
            <a
              href="https://github.com/iamchisomdev"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-logo">Chisom</span>
        <span className="footer-copy">© 2026 Chisom. All rights reserved.</span>
        <div className="footer-icons">
          {/* Twitter / X */}
          <a href="#" className="footer-icon" title="Twitter" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className="footer-icon" title="LinkedIn" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          {/* GitHub */}
          <a href="https://github.com/iamchisomdev" className="footer-icon" title="GitHub" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 6.6c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}