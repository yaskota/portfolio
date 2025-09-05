import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

/**
 * One‑page Portfolio (React + TailwindCSS)
 *
 * How to use:
 * 1) Ensure Tailwind is set up in your project (PostCSS + tailwind.config.js).
 * 2) Put your resume PDF into /public/resume.pdf (rename if needed) and update RESUME_PATH.
 * 3) Replace images/links in the DATA section with your own.
 * 4) Drop this component anywhere (eg. App.jsx) and render <PortfolioOnePage/>.
 */

const RESUME_PATH = "./assets/YaswanthKota_SDE_Resume.pdf"; // place YaswanthKota_SDE_Resume.pdf as public/resume.pdf
const PROFILE_IMG =
  "./assets/propic.png"

// ====== DATA ======
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SUMMARY = {
  name: "Yaswanth Kota",
  title: "Web Developer (MERN)",
  blurb:
    "Aspiring Software Engineer focused on MERN stack, real‑time apps, and scalable backends. 420+ LeetCode, strong DSA & System Design foundation.",
};

const SKILLS = [
  {
    name: "C",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-blue-600 rounded-full">
        C
      </div>
    ),
  },
  {
    name: "C++",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-blue-700 rounded-full">
        C++
      </div>
    ),
  },
  {
    name: "Java",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-red-600 rounded-full">
        Java
      </div>
    ),
  },
  {
    name: "Python",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-yellow-500 rounded-full">
        Py
      </div>
    ),
  },
  {
    name: "HTML5",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-orange-500 rounded-full">
        HTML5
      </div>
    ),
  },
  {
    name: "CSS3",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-blue-500 rounded-full">
        CSS3
      </div>
    ),
  },
  {
    name: "Postman",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-orange-400 rounded-full">
        PM
      </div>
    ),
  },
  {
    name: "VSCode",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-blue-800 rounded-full">
        VS
      </div>
    ),
  },
  {
    name: "Cloudinary",
    Icon: () => (
      <div className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-indigo-500 rounded-full">
        Cld
      </div>
    ),
  },

  // Original skills
  { name: "JavaScript", Icon: JSIcon },
  { name: "React", Icon: ReactIcon },
  { name: "Node.js", Icon: NodeIcon },
  { name: "Express", Icon: ExpressIcon },
  { name: "MongoDB", Icon: MongoIcon },
  { name: "SQL", Icon: SQLIcon },
  { name: "Tailwind", Icon: TailwindIcon },
  { name: "Git", Icon: GitIcon },
];

const PROJECTS = [
  {
    name: "Real‑Time Chat Application",
    desc: "MERN chat app with Socket.io for real‑time messaging, groups, media, JWT auth, and Cloudinary uploads.",
    image:"./assets/chatting.jpg",
    github: "https://github.com/yaskota/WhatsApp", // replace with exact repo
    live: "https://messenger-pi-red.vercel.app/",
  },
  {
    name: "RFID‑IoT Attendance System",
    desc: "ESP32 + RFID with MERN backend over WebSockets, role‑based JWT, and real‑time dashboard.",
    image:
      "./assets/collegeimage.jpg",
    github: "https://github.com/yaskota/attendence_system",
    live: "#",
  },
  {
    name: "FoodCart — Ordering Platform",
    desc: "Responsive food ordering with categories, cart, tracking, checkout, and fast navigation.",
    image:
      "./assets/hotel.png",
    github: "https://github.com/yaskota/hotelmenu",
    live: "https://hotelmenu-livid.vercel.app/",
  },
  {
    name: "AI Copilot UI Design",
    desc: "A smart, minimal UI offering suggestions, TTS, and grammar help in chat.",
    image:
      "./assets/copiolot.webp",
    github: "https://github.com/yaskota/chatBotTest",
    live: "https://chat-bot-test-gamma.vercel.app/",
  },
  {
    name: "Weather Application",
    desc: "A simple, responsive UI showing real-time weather updates and forecasts.",
    image:
      "./assets/weathr.webp",
    github: "https://github.com/yaskota/weather",
    live: "https://weather-chi-ivory.vercel.app/",
  },
  {
    name: "Calculator",
    desc: "A clean, minimal UI for quick and accurate calculations.",
    image:
      "./assets/calcultor.png",
    github: "https://github.com/yaskota/calculator",
    live: "https://calculator-beta-woad-27.vercel.app/",
  },
];

// ====== DATA ======
const CODING_PROFILES = [
  {
    name: "LeetCode",
    image:
      "./assets/leetprofile.png",
    link: "https://leetcode.com/u/yaswanthkota-_12/", // replace with your profile
  },
  {
    name: "GeeksforGeeks",
    image:
      "./assets/gfg.png",
    link: "https://www.geeksforgeeks.org/user/yaswantedap/", // replace with your profile
  },
  {
    name: "HackerRank",
    image:
      "./assets/hackerRank.png",
    link: "https://www.hackerrank.com/profile/yaswanthkota3", // replace with your profile
  },

];

const CERTS = [
  {
    name: "Full Stack Web Development (MERN)",
    image: "./assets/react.jpg", // move to /public if large
    link: "https://www.udemy.com/certificate/xxx", // certificate link
  },
  {
    name: "Problem Solving (Basic) — HackerRank",
    image: "./assets/problem_solving_basic certificate.pdf",
    link: "https://www.hackerrank.com/certificates/xxx",
  },
  {
    name: "Participation of Codequezt",
    image: "./assets/NaukriCampus_certificate_Participation.pdf",
    link: "#",
  },
  {
    name: "Code Clash",
    image: "./assets/codeclash.jpg",
    link: "#",
  },
  {
    name: "Adobe Hackathon",
    image: "./assets/adobe.pdf",
    link: "#",
  },
  
  
];

const CONTACT = {
  email: "yaswanthkota3@gmail.com",
  phone: "+91-9347650617",
  linkedin: "https://www.linkedin.com/in/yaswanth-kota-5a9a44274/",
  github:"https://github.com/yaskota"
};

// ====== COMPONENT ======
export default function Portfolio() {
  const [active, setActive] = useState("home");
  const sectionsRef = useRef({});

  // Observe sections to highlight nav item in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
      sectionsRef.current[id] = el;
    });

    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Carousel state
  const [index, setIndex] = useState(0);
  const mod = (n: number, m: number) => ((n % m) + m) % m;
  const prev = () => setIndex((i) => mod(i - 1, PROJECTS.length));
  const next = () => setIndex((i) => mod(i + 1, PROJECTS.length));

  const visibleProjects = useMemo(() => {
    // build a looped array [i-1, i, i+1] for center focus, but render all to maintain circular layout
    return PROJECTS.map((p, i) => ({ ...p, i }));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-bold tracking-tight text-lg">YK • Portfolio</div>
          <nav className="flex items-center gap-2 overflow-x-auto">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${
                  active === n.id
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shadow"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Home / Hero */}
      <section
        id="home"
        className="mx-auto max-w-6xl px-4 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Hi, I’m <span className="text-indigo-400">{SUMMARY.name}</span>
          </h1>
          <p className="mt-2 text-xl text-slate-300">{SUMMARY.title}</p>
          <p className="mt-4 text-slate-300/90 leading-relaxed">
            {SUMMARY.blurb}
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href={RESUME_PATH}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 px-4 py-2 font-medium shadow transition"
            >
              <DownloadIcon className="w-5 h-5" /> Download Resume
            </a>
          </div>
        </div>

        <div className="relative h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center">
  {/* Gradient background shape */}
  <svg
    className="absolute inset-0 -z-10"
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(300,300)">
      <path
        d="M129.4 -165.2C162.6 -142.3 183.4 -98.7 204.3 -50.4C225.3 -2.1 246.5 50.9 233.3 95.4C220 139.8 172.3 175.6 121.8 197.3C71.3 219.1 17.9 226.8 -33.4 224.2C-84.7 221.5 -133.8 208.6 -175.7 181.7C-217.6 154.8 -252.2 113.8 -263.4 67.1C-274.5 20.5 -262.1 -32 -239.2 -77.2C-216.2 -122.4 -182.6 -160.3 -140.7 -182.4C-98.9 -204.6 -49.4 -210.9 -1.8 -208.5C45.9 -206.1 91.8 -195 129.4 -165.2Z"
        fill="url(#grad)"
        opacity="0.35"
      />
    </g>
    <defs>
      <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#22D3EE" />
      </linearGradient>
    </defs>
  </svg>

  {/* Circular profile photo */}
  <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[22rem] md:h-[22rem] shadow-2xl overflow-hidden rounded-full">
    <img
      src={PROFILE_IMG}
      alt="Yaswanth Kota"
      className="w-full h-full object-cover object-top"
    />
  </div>
</div>



      </section>

      {/* About / Skills */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Technical Skills</h2>
        <div className="flex flex-wrap items-center gap-6">
          {SKILLS.map(({ name, Icon }) => (
            <div
              key={name}
              className="group flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/40 transition"
            >
              <Icon className="w-10 h-10" />
              <span className="text-sm text-slate-300 group-hover:text-white">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects — Grid Layout */}
<section id="projects" className="mx-auto max-w-6xl px-4 py-12">
  <div className="mb-8 text-center">
    <h2 className="text-2xl font-semibold">Projects</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {PROJECTS.map((p, i) => (
      <article
        key={i}
        className="w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <div className="h-60 w-full overflow-hidden">
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{p.name}</h3>
          <p className="mt-2 text-sm text-slate-300">{p.desc}</p>

          <div className="mt-4 flex gap-3">
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm"
            >
              <GitIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          </div>
        </div>
      </article>
    ))}
  </div>
</section>


     {/* Coding Profiles */}
<section id="coding-profiles" className="mx-auto max-w-6xl px-4 py-12">
  <h2 className="text-2xl font-semibold mb-6">Coding Profiles</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {CODING_PROFILES.map((p) => (
      <div
        key={p.name}
        tabIndex={0} // enables focus with keyboard
        className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex flex-col transform transition-transform duration-300 hover:scale-105 focus:scale-105"
      >
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-40 object-contain bg-white p-6"
        />
        <div className="p-4 flex flex-col gap-3">
          <p className="font-medium">{p.name}</p>
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 text-sm text-white text-center justify-center"
          >
            <ExternalLink className="w-4 h-4" /> View Profile
          </a>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Certifications */}
<section id="certifications" className="mx-auto max-w-6xl px-4 py-12">
  <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {CERTS.map((c) => (
      <div
        key={c.name}
        className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex flex-col transform transition-transform duration-300 hover:scale-105"
      >
        {c.image.endsWith(".pdf") ? (
          // PDF Preview
          <embed
            src={c.image}
            type="application/pdf"
            className="w-full h-48"
          />
        ) : (
          // Normal Image Preview
          <img
            src={c.image}
            alt={c.name}
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => window.open(c.image, "_blank")}
          />
        )}

        <div className="p-4 flex flex-col gap-3">
          <p className="font-medium">{c.name}</p>
          <a
            href={c.image}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 text-sm text-white text-center justify-center"
          >
            <ExternalLink className="w-4 h-4" /> View Certificate
          </a>
        </div>
      </div>
    ))}
  </div>
</section>



      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-4">Contact Me</h2>
        <p className="text-red-400 font-medium mb-2">Let's Work Together</p>
        <p className="text-slate-300 max-w-xl mb-6">
          I will help you in your next project. Contact me through details given
          below.
        </p>

        {/* Contact Details */}
        <div className="space-y-2 text-slate-300">
          <p className="font-medium">Local Address</p>
          <p>{CONTACT.email}</p>
          <p>{CONTACT.phone}</p>
        </div>

        {/* CTA Button */}
        <button className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md">
          Let’s Chat
        </button>

        <div className="flex gap-4 mt-6">
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white/5 rounded hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white/5 rounded hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white/5 rounded hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href={CONTACT.twitter}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white/5 rounded hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-10 py-6 text-xs text-slate-500 border-t border-white/10">
          © {new Date().getFullYear()} {SUMMARY.name}. All rights reserved.
        </footer>
      </section>
    </div>
  );
}

// ====== ICONS (pure SVG, no deps) ======
function DownloadIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function ChevronLeft({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ExternalLink({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function GitIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.28 0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
function LinkedInIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.67V24h-5v-7.6c0-1.81-.03-4.14-2.52-4.14-2.52 0-2.91 1.97-2.91 4v7.74H8z" />
    </svg>
  );
}
function MailIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function PhoneIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.16 9.81 19.79 19.79 0 0 1 .09 1.18 2 2 0 0 1 2.07 0h3a2 2 0 0 1 2 1.72c.12.93.34 1.84.66 2.72a2 2 0 0 1-.45 2.11L6.1 7.91a16 16 0 0 0 7 7l1.35-1.18a2 2 0 0 1 2.11-.45c.88.32 1.79.54 2.72.66A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function JSIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
      <path d="M116.347 96.736c-.917-5.73-4.646-10.54-15.7-15.06-3.83-1.77-8.1-3.02-9.373-5.9-.452-1.69-.512-2.65-.226-3.68.82-3.32 4.79-4.36 7.93-3.41 2.03.68 3.95 2.24 5.11 4.77 5.43-3.51 5.43-3.51 9.21-5.95-1.38-2.14-2.11-3.13-3.01-4.05-3.24-3.62-7.66-5.49-14.78-5.35-1.23.16-2.48.33-3.71.5-3.57.9-6.98 2.79-8.98 5.36-6.03 6.85-4.31 18.82 3 23.64 7.19 5.39 17.77 6.59 19.12 11.61 1.31 6.16-4.53 8.16-10.32 7.45-4.27-.88-6.64-3.01-9.18-6.9-4.72 2.72-4.72 2.72-9.59 5.52 1.15 2.52 2.37 3.67 4.31 5.88 9.16 9.3 32.06 8.86 36.2-5.25.16-.48 1.23-3.57.37-8.34zM69.74 57.293H57.04c0 16.52-.08 33.02-.08 49.56 0 10.55 6.91 13.72 15.1 13.72 4.82 0 8.63-.9 10.7-1.99v-8.64c-1.95.63-11.53 3.58-11.53-5.37V57.293z" />
    </svg>
  );
}
function TSIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#3178C6" d="M1.5 1.5h125v125h-125z" />
      <path
        fill="#fff"
        d="M27.6 55.7h72.8v10.7H66.6V112H54.2V66.4H27.6zM102.2 96c1.5 3 4.8 5.3 9.9 6.9l6.9 2.2c4.6 1.5 8 3.6 10.3 6.2 2.2 2.7 3.3 6 3.3 10 0 6.5-2.4 11.4-7.2 14.8-4.8 3.4-11.6 5.1-20.3 5.1-5.5 0-10.3-.8-14.3-2.3-4-1.5-8-4-12-7.5l6.9-8.3c3.1 2.7 6.2 4.6 9.2 5.8 3 1.3 6.3 1.9 10.1 1.9 4.3 0 7.7-.8 10.1-2.5 2.4-1.6 3.6-3.9 3.6-6.8 0-2.4-.8-4.2-2.5-5.7-1.7-1.5-4.8-3-9.4-4.4l-6.5-2c-7.7-2.1-13-5.1-16.2-9.1-3.2-3.9-4.8-8.8-4.8-14.5 0-6.7 2.3-11.9 6.8-15.6 4.5-3.7 10.9-5.5 19.2-5.5 4.7 0 9 .6 12.8 1.8 3.9 1.1 7.9 3 12.2 5.8l-6.4 8.5c-3-2.1-5.9-3.6-8.6-4.6-2.7-1-5.8-1.5-9.6-1.5-4.2 0-7.4.8-9.6 2.4-2.2 1.6-3.3 3.8-3.3 6.6 0 2.1.7 3.9 2 5.3 1.3 1.5 4.3 2.7 8.9 4.1z"
        transform="scale(.6) translate(30 18)"
      />
    </svg>
  );
}
function ReactIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 841.9 595.3" className={className}>
      <g fill="none" stroke="#61DAFB" strokeWidth="40">
        <ellipse cx="420.9" cy="296.5" rx="165" ry="165" />
        <ellipse
          cx="420.9"
          cy="296.5"
          rx="400"
          ry="165"
          transform="rotate(60 420.9 296.5)"
        />
        <ellipse
          cx="420.9"
          cy="296.5"
          rx="400"
          ry="165"
          transform="rotate(120 420.9 296.5)"
        />
      </g>
    </svg>
  );
}
function NodeIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 256 272" className={className}>
      <path fill="#83CD29" d="M128 0l128 74v124l-128 74L0 198V74z" />
      <path
        fill="#fff"
        d="M207 168c0 28-16 44-49 44-23 0-37-6-49-18l22-13c6 5 15 10 28 10 15 0 23-6 23-18v-79h25v74zM96 78h25v101H96z"
      />
    </svg>
  );
}
function ExpressIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 256 128" className={className}>
      <text x="10" y="70" fontSize="56" fill="#eee" fontFamily="monospace">
        express
      </text>
    </svg>
  );
}
function MongoIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 256 512" className={className}>
      <path
        fill="#4FAA41"
        d="M127 0s-14 95 25 140c36 41 35 98 17 145-14 37-38 68-42 116-29-35-54-84-58-131-7-80 21-136 58-170z"
      />
    </svg>
  );
}
function SQLIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 256 256" className={className}>
      <ellipse cx="128" cy="52" rx="100" ry="28" fill="#4FC3F7" />
      <rect x="28" y="52" width="200" height="140" fill="#0288D1" />
      <ellipse cx="128" cy="192" rx="100" ry="28" fill="#0277BD" />
    </svg>
  );
}
function TailwindIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path
        fill="#38BDF8"
        d="M24 12c-6 0-9.5 3-10.5 9 2-3 4.5-4.5 7.5-4.5 2.8 0 4.8 1.5 6.3 4.5 2-3 4.8-4.5 8.7-4.5 4 0 6.8 2 7.9 6-1.9-6-6.4-10.5-12.9-10.5-3.6 0-6.5 1.2-9 3.5C20.5 13.2 22 12 24 12Zm-6 12c-6 0-9.5 3-10.5 9 2-3 4.5-4.5 7.5-4.5 2.8 0 4.8 1.5 6.3 4.5 2-3 4.8-4.5 8.7-4.5 4 0 6.8 2 7.9 6-1.9-6-6.4-10.5-12.9-10.5-3.6 0-6.5 1.2-9 3.5-2.5-2.3-1-3.5 1-3.5Z"
      />
    </svg>
  );
}

function GitIcon2({ className = "w-8 h-8" }) {
  return <GitIcon className={className} />;
}
function GitIconSmall({ className = "w-5 h-5" }) {
  return <GitIcon className={className} />;
}
