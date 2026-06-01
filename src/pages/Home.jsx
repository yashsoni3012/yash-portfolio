import { useState, useEffect, useRef } from "react";

// ── Floating particles background ──────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 6,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-cyan-400 opacity-20 animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Scroll-reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[idx];
    const speed = deleting ? 60 : 100;
    const timer = setTimeout(() => {
      if (!deleting) {
        setTxt(current.slice(0, txt.length + 1));
        if (txt.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        setTxt(current.slice(0, txt.length - 1));
        if (txt.length === 0) {
          setDeleting(false);
          setIdx((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [txt, deleting, idx, words]);
  return (
    <span className="text-cyan-400">
      {txt}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ── Skill badge ─────────────────────────────────────────────────────────────
function SkillBadge({ name, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative px-4 py-2 border border-cyan-500/30 rounded-lg bg-slate-800/50 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 cursor-default">
        <span className="text-sm font-mono text-slate-300 group-hover:text-cyan-300 transition-colors">
          {name}
        </span>
        <div className="absolute inset-0 rounded-lg bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Reveal>
  );
}

// ── Project card (with View Project button) ─────────────────────────────────
function ProjectCard({ title, tech, points, color, delay, link }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-default overflow-hidden h-full flex flex-col
          ${
            hovered
              ? "border-cyan-400 bg-slate-800/80 -translate-y-1 shadow-2xl shadow-cyan-500/20"
              : "border-slate-700/50 bg-slate-800/40"
          }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 ${color} ${hovered ? "opacity-20" : "opacity-0"}`}
        />
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-xs font-mono text-cyan-400 mb-4 tracking-wide">
          {tech}
        </p>
        <ul className="space-y-2 flex-1">
          {points.map((p, i) => (
            <li key={i} className="text-sm text-slate-400 flex gap-2">
              <span className="text-cyan-500 mt-0.5 shrink-0">▹</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {/* View Project Button */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-cyan-400/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium tracking-wide hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 group"
          >
            <span>View Project</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </Reveal>
  );
}

// ── Mobile Sidebar ───────────────────────────────────────────────────────────
function MobileSidebar({ open, onClose, active }) {
  const links = ["Home", "About", "Skills", "Projects", "Education", "Contact"];

  const scroll = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-slate-900 border-l border-slate-700/60 flex flex-col
          transition-transform duration-300 ease-in-out md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-800/60">
          <span className="font-mono text-cyan-400 font-bold text-lg tracking-widest">
            YASH RANPURA
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-8 flex flex-col gap-1">
          {links.map((l, i) => (
            <button
              key={l}
              onClick={() => scroll(l)}
              className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-left transition-all duration-200 group
                ${
                  active === l.toLowerCase()
                    ? "bg-cyan-400/10 border border-cyan-500/30 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white border border-transparent"
                }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                className={`text-xs font-mono w-5 ${active === l.toLowerCase() ? "text-cyan-400" : "text-slate-600 group-hover:text-slate-400"}`}
              >
                0{i + 1}
              </span>
              <span className="font-medium text-sm tracking-wide">{l}</span>
              {active === l.toLowerCase() && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-6 py-6 border-t border-slate-800/60">
          <p className="text-xs font-mono text-slate-600 text-center">
            yashranpura3@gmail.com
          </p>
          <div className="mt-3 flex justify-center gap-2">
           
          </div>
        </div>
      </div>
    </>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ active }) {
  const links = ["Home", "About", "Skills", "Projects", "Education", "Contact"];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scroll = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono text-cyan-400 font-bold text-lg tracking-widest">
            YASH RANPURA
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8">
            {links.map((l) => (
              <li key={l}>
                <button
                  onClick={() => scroll(l)}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-cyan-400
                    ${active === l.toLowerCase() ? "text-cyan-400" : "text-slate-400"}`}
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger — opens sidebar */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-slate-400 hover:text-cyan-400 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-current rounded-full" />
            <span className="block w-4 h-0.5 bg-current rounded-full" />
            <span className="block w-5 h-0.5 bg-current rounded-full" />
          </button>
        </div>
      </nav>

      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={active}
      />
    </>
  );
}

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`relative z-10 py-24 px-6 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ label, title }) {
  return (
    <Reveal>
      <div className="mb-16">
        <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
          {label}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-cyan-400 to-transparent" />
      </div>
    </Reveal>
  );
}

// ── MAIN PORTFOLIO ──────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "education",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const skills = [
    "HTML / CSS",
    "Tailwind CSS",
    "Bootstrap",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Redux",
    "JWT / OAuth",
    "RESTful APIs",
    "GitHub Actions",
    "Vercel / Netlify",
    "Framer Motion",
    "JavaScript (ES6+)",
  ];

  const projects = [
    {
      title: "APX – Token",
      tech: "React.js · Tailwind CSS · Framer Motion · JavaScript",
      color: "bg-violet-500",
      points: [
        "Designed a fully responsive, animated frontend for a crypto platform.",
        "Built a mobile-first interface with real-time token details.",
        "Smooth UI transitions and scroll-based interactions with Framer Motion & AOS.",
        "Focused on performance optimisation and lazy loading.",
      ],
      link: "https://apx-project.vercel.app/", // 🔁 Replace with actual URL
    },
    {
      title: "Kevelion",
      tech: "React.js · Tailwind CSS · REST API · JavaScript · Admin Panel",
      color: "bg-green-500",
      points: [
        "Developed a modern and responsive website for showcasing industrial hardware, safety equipment, metal tools, and construction-related products.",
        "Built a complete Admin Panel using React.js to manage products, categories, inquiries, and website content efficiently.",
        "Integrated REST APIs for dynamic product listings, inventory management, and real-time data updates.",
        "Implemented a mobile-first UI with Tailwind CSS, ensuring excellent performance, usability, and cross-device compatibility.",
      ],
      link: "https://kevelion.com/", // 🔁 Replace
    },
    {
      title: "CA Management System",
      tech: "React.js · JavaScript · REST API · Bootstrap / Tailwind · Git",
      color: "bg-cyan-500",
      points: [
        "Built comprehensive dashboards for Admin, Staff, and Clients.",
        "Implemented secure authentication and role-based access control.",
        "Integrated REST APIs for invoices, services, and real-time updates.",
      ],
      link: "https://ca-management-mu.vercel.app/", // 🔁 Replace
    },
    {
      title: "Gram Ekta Foundation",
      tech: "React.js · JavaScript · Tailwind CSS · HTML5 · CSS3",
      color: "bg-orange-500",
      points: [
        "Developed a responsive website for a rural community development non-profit.",
        "Designed sections for clean water, education, and farmer empowerment.",
        "Built mobile-friendly interface with optimised performance.",
      ],
      link: "https://gramektafoundation.org/", // 🔁 Replace
    },
  ];

  const education = [
    {
      degree: "iMSC-IT",
      institution: "GLS University, Ahmedabad",
      period: "Mar 2023 – Apr 2025",
    },
    {
      degree: "BSC-IT",
      institution: "GLS University, Ahmedabad",
      period: "Mar 2020 – Apr 2023",
    },
    {
      degree: "Higher Secondary (12th)",
      institution: "Sardar Patel & Swami Vivekanand High School",
      period: "Mar 2019 – Mar 2020",
    },
    {
      degree: "Secondary (10th)",
      institution: "Shree Durga Higher Secondary School",
      period: "Mar 2017 – Mar 2018",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        body { font-family: 'Syne', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #22d3ee; border-radius: 4px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      <Particles />
      <Nav active={activeSection} />

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center px-6"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-6xl mx-auto w-full pt-20">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8"
              style={{ animation: "fadeDown 0.8s ease both" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
             
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none mb-6 tracking-tight"
              style={{ animation: "fadeUp 0.8s ease 0.2s both" }}
            >
              Yash
              <br />
              <span className="text-slate-500">Ranpura</span>
            </h1>

            <div
              className="text-xl md:text-2xl text-slate-300 mb-8 font-light h-8"
              style={{ animation: "fadeUp 0.8s ease 0.4s both" }}
            >
              <Typewriter
                words={[
                  "MERN Stack Developer",
                  "React.js Specialist",
                  "Full-Stack Engineer",
                  "UI/UX Enthusiast",
                ]}
              />
            </div>

            <p
              className="text-slate-400 text-lg max-w-xl leading-relaxed mb-12"
              style={{ animation: "fadeUp 0.8s ease 0.6s both" }}
            >
              Building scalable, dynamic web applications with 1.5+ years of
              hands-on experience. Turning ideas into seamless digital
              experiences.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "fadeUp 0.8s ease 0.8s both" }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 rounded-xl bg-cyan-400 text-slate-900 font-bold text-sm tracking-wide hover:bg-cyan-300 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-0.5"
              >
                View My Work
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 rounded-xl border border-slate-600 text-slate-300 font-bold text-sm tracking-wide hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-mono text-slate-600 tracking-widest">
            SCROLL
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <Section id="about">
        <SectionTitle label="01 — About" title="Who I Am" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Reveal delay={100}>
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a{" "}
                <span className="text-cyan-400 font-semibold">
                  MERN Stack Developer
                </span>{" "}
                with 1.5+ years of experience crafting scalable, dynamic web
                applications. From building RESTful APIs to designing responsive
                React frontends — I bring ideas to life with clean, efficient
                code.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-slate-400 leading-relaxed">
                Currently working at{" "}
                <span className="text-white font-medium">
                  Nexgen Innovation
                </span>
                , I specialise in React.js, Node.js, MongoDB, and modern UI
                libraries. I love turning complex problems into intuitive,
                beautiful user experiences.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { label: "Years Exp.", value: "1.5+" },
                  { label: "Projects", value: "4+" },
                  { label: "Languages", value: "3" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-4 rounded-xl border border-slate-700/50 bg-slate-800/30"
                  >
                    <div className="text-3xl font-extrabold text-cyan-400">
                      {s.value}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills" className="bg-slate-800/20">
        <SectionTitle label="02 — Skills" title="Tech Stack" />
        <div className="flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <SkillBadge key={s} name={s} delay={i * 50} />
          ))}
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects">
        <SectionTitle label="03 — Projects" title="Featured Work" />
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 100} />
          ))}
        </div>
      </Section>

      {/* ── EDUCATION ── */}
      <Section id="education" className="bg-slate-800/20">
        <SectionTitle label="04 — Education" title="Academic Journey" />
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-slate-600 to-transparent" />
          <div className="space-y-8 pl-16">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 100}>
                <div className="relative">
                  <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-900 shadow-lg shadow-cyan-400/50" />
                  <div className="p-5 rounded-xl border border-slate-700/40 bg-slate-800/30 hover:border-cyan-500/30 transition-colors">
                    <h3 className="font-bold text-white text-lg">{e.degree}</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {e.institution}
                    </p>
                    <span className="inline-block mt-2 text-xs font-mono text-cyan-400/80 bg-cyan-400/10 px-2 py-1 rounded">
                      {e.period}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact">
        <SectionTitle label="05 — Contact" title="Let's Connect" />
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <div className="space-y-6">
              <p className="text-slate-400 text-lg leading-relaxed">
                I'm open to exciting opportunities, freelance projects, and
                collaborations. Drop me a message — let's build something great
                together!
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "✉",
                    label: "Email",
                    value: "yashranpura3@gmail.com",
                    href: "mailto:yashranpura3@gmail.com",
                  },
                  {
                    icon: "📞",
                    label: "Phone",
                    value: "+91 97371 26164",
                    href: "tel:+919737126164",
                  },
                  {
                    icon: "📍",
                    label: "Location",
                    value: "Ahmedabad, Gujarat",
                    href: null,
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-lg group-hover:border-cyan-500/40 transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-mono">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="text-slate-300 hover:text-cyan-400 transition-colors font-medium"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-slate-300 font-medium">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="pt-4">
                <p className="text-xs font-mono text-slate-500 mb-3 tracking-widest">
                  LANGUAGES
                </p>
                <div className="flex gap-3">
                  {["English", "Gujarati", "Hindi"].map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 text-sm border border-slate-700/50 rounded-full text-slate-400 font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* CTA card */}
          <Reveal delay={200}>
            <div className="p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-800/60 to-slate-900/60 flex flex-col justify-between min-h-64">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to collaborate?
                </h3>
                <p className="text-slate-400">
                  Available for full-time roles, freelance projects, and
                  open-source contributions.
                </p>
              </div>
              <a
                href="mailto:yashranpura3@gmail.com"
                className="mt-8 w-full block text-center px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold tracking-wide hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/30 hover:-translate-y-0.5"
              >
                Send Me a Message ↗
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-slate-800/50 py-8 px-6 text-center">
        <p className="text-slate-600 text-sm font-mono">
          Designed & Built by{" "}
          <span className="text-cyan-400">Yash Ranpura</span> ·{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
