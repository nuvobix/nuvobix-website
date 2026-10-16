
"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  ShoppingBag,
  Palette,
  Menu,
  X,
  MessageCircle,
  Send,
  Mail,
  LayoutTemplate,
  Sparkles,
  Globe,
  Smartphone,
  Wrench,
} from "lucide-react";

const whatsapp = "https://wa.me/923260596245";
const email = "nuvobix@gmail.com";

const socials = [
  { name: "Instagram", url: "https://www.instagram.com/nuvobix/" },
  { name: "Facebook", url: "https://www.facebook.com/nuvobix" },
  { name: "TikTok", url: "https://www.tiktok.com/@nuvobix" },
];

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Web Development",
    description:
      "Modern, responsive websites designed to build trust, showcase your brand, and turn visitors into customers.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "E-commerce Solutions",
    description:
      "Online stores built to present products beautifully and deliver a smooth shopping experience.",
  },
  {
    number: "03",
    icon: LayoutTemplate,
    title: "WordPress Development",
    description:
      "Professional WordPress websites with clean layouts and easy-to-manage content.",
  },
  {
    number: "04",
    icon: Globe,
    title: "Shopify Development",
    description:
      "Shopify stores designed for easy product browsing and a smooth shopping experience.",
  },
  {
    number: "05",
    icon: Palette,
    title: "Graphic Design",
    description:
      "Consistent visual designs that help your brand stand out across digital platforms.",
  },
  {
    number: "06",
    icon: Smartphone,
    title: "UI/UX Design",
    description:
      "Clean, user-friendly interfaces designed for better navigation and usability.",
  },
  {
    number: "07",
    icon: Sparkles,
    title: "Website Redesign",
    description:
      "Refresh your existing website with a modern look and responsive design.",
  },
  {
    number: "08",
    icon: Wrench,
    title: "Website Maintenance",
    description:
      "Website updates, improvements, and ongoing support to keep your site running smoothly.",
  },
];

const projects = [
  {
    number: "01",
    title: "Get Up",
    category: "WORDPRESS E-COMMERCE",
    description:
      "A modern men's fashion store built with WordPress and WooCommerce, featuring product browsing and a smooth shopping experience.",
    tags: ["WordPress", "WooCommerce", "Responsive Design"],
    url: "https://getuponline.store/",
    image: "/getup.png",
  },
  {
    number: "02",
    title: "Kashees",
    category: "SHOPIFY E-COMMERCE",
    description:
      "An online beauty and cosmetics store showcasing the Kashee's brand with a focus on product presentation and shopping.",
    tags: ["Shopify", "E-commerce", "Web Design"],
    url: "https://kashees.com/",
    image: "/kashees.png",
  },
  {
    number: "03",
    title: "Buy Next",
    category: "CUSTOM DEVELOPMENT",
    description:
      "A custom-developed shopping website designed to deliver a modern interface and convenient product discovery.",
    tags: ["Next.js", "Custom Code", "UI/UX"],
    url: "https://buy-nextt.vercel.app/",
    image: "/buy-next.png",
  },
];

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

function SocialIcon({ name }: { name: string }) {
  const props = {
    width: 19,
    height: 19,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "Instagram") {
    return (
      <svg {...props}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (name === "Facebook") {
    return (
      <svg {...props}>
        <path
          d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5C17.3 1.3 16.3 1.2 15.1 1.2 11.8 1.2 10 3.2 10 6.7V9H7v4h3v8"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (name === "TikTok") {
    return (
      <svg {...props}>
        <path
          d="M14 3v11.1a4.2 4.2 0 1 1-3.5-4.1v3.2a1.1 1.1 0 1 0 .4.9V3h3.1c.3 2 1.5 3.4 3.8 3.8v3.1A8 8 0 0 1 14 8.2"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  return <Globe size={19} />;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.28em] text-blue-400">
      {children}
    </p>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatReply, setChatReply] = useState(
    "Hi! Welcome to Nuvobix. Are you looking for a website, an online store, or creative design?"
  );

  const [contactStatus, setContactStatus] = useState("");
  const [contactError, setContactError] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  async function handleContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (contactLoading) return;

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      service: String(form.get("service") || "").trim(),
      message: String(form.get("message") || "").trim(),
    };

    setContactLoading(true);
    setContactStatus("");
    setContactError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your message. Please try again."
        );
      }

      setContactStatus(
        "Thank you! Your message has been sent successfully. We'll get back to you soon."
      );
      formElement.reset();
    } catch (error) {
      setContactError(true);
      setContactStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setContactLoading(false);
    }
  }

  function sendChatMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message = chatMessage.toLowerCase().trim();
    if (!message) return;

    if (
      ["hi", "hello", "hey", "salam", "assalam", "aoa"].some(
        (word) => message === word || message.startsWith(word + " ")
      )
    ) {
      setChatReply(
        "Hello! 👋 Welcome to Nuvobix. We help businesses grow with professional websites, e-commerce stores, and creative design services. How can we help you today?"
      );
    } else if (
      [
        "price",
        "pricing",
        "cost",
        "charges",
        "budget",
        "rate",
        "quote",
        "how much",
        "fee",
        "payment",
      ].some((word) => message.includes(word))
    ) {
      setChatReply(
        "Thanks for your interest in Nuvobix! 😊 For pricing and a personalized quote, please contact our team directly on WhatsApp using the 'Talk to our team' link below. Share your project requirements with us, and we'll guide you further."
      );
    } else if (
      [
        "shopify",
        "woocommerce",
        "store",
        "ecommerce",
        "e-commerce",
        "online shop",
      ].some((word) => message.includes(word))
    ) {
      setChatReply(
        "🛍️ Nuvobix builds professional e-commerce stores using Shopify and WooCommerce. We can help you create a new store or improve an existing one. What products do you want to sell?"
      );
    } else if (
      [
        "wordpress",
        "website",
        "web development",
        "web developer",
        "business site",
      ].some((word) => message.includes(word))
    ) {
      setChatReply(
        "🌐 We build modern, responsive websites tailored to your business. Whether you need a business website, portfolio, or WordPress website, Nuvobix can help. Tell us a little about your project."
      );
    } else if (
      ["graphic", "design", "logo", "branding", "social media post"].some(
        (word) => message.includes(word)
      )
    ) {
      setChatReply(
        "🎨 Nuvobix offers graphic design, logo design, branding, and creative visuals for businesses. What type of design do you need?"
      );
    } else if (
      ["maintenance", "redesign", "update", "fix", "bug", "error"].some(
        (word) => message.includes(word)
      )
    ) {
      setChatReply(
        "🛠️ We can help with website redesigns, updates, maintenance, and troubleshooting. Tell us what issue you're facing or what you'd like to improve."
      );
    } else if (
      ["contact", "whatsapp", "talk", "team", "human", "person"].some(
        (word) => message.includes(word)
      )
    ) {
      setChatReply(
        "We'd be happy to help! 😊 Click the 'Talk to our team' WhatsApp link below to discuss your project directly with Nuvobix."
      );
    } else if (
      ["thank", "thanks", "thank you"].some((word) => message.includes(word))
    ) {
      setChatReply(
        "You're welcome! 😊 Thank you for considering Nuvobix. If you have a project in mind, send us a message anytime."
      );
    } else {
      setChatReply(
        "Thanks for reaching out to Nuvobix! 👋 We help businesses with website development, WordPress, Shopify, e-commerce, and graphic design. For pricing, please contact our team directly on WhatsApp using the link below."
      );
    }

    setChatMessage("");
  }

  const cardStyle =
    "rounded-2xl border border-slate-700/50 bg-[#0B1220]/65 shadow-[0_12px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/40 hover:shadow-[0_20px_55px_rgba(59,130,246,0.12)]";

  return (
    <main className="min-h-screen overflow-hidden bg-[#080D1A] text-[#F8FAFC] selection:bg-blue-400 selection:text-[#080D1A]">
      {/* NAVBAR */}
     
{/* NAVBAR */}
<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
  <div className="mx-auto max-w-7xl">
    <div className="relative flex h-[72px] items-center justify-between rounded-2xl border border-white/[0.09] bg-[#080D1A]/85 px-5 shadow-[0_12px_45px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:px-7">

      {/* LOGO */}
      <a
        href="#home"
        className="group relative z-10 flex shrink-0 items-center"
        aria-label="Nuvobix home"
      >
        <img
          src="/nuvobix-logo.png"
          alt="Nuvobix Logo"
          className="h-8 w-auto object-contain transition duration-300 group-hover:scale-[1.03]"
        />
      </a>

      {/* DESKTOP NAVIGATION */}
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.025] p-1.5 lg:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2.5 text-[13px] font-medium text-slate-400 transition-all duration-300 hover:bg-blue-500/10 hover:text-blue-300"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* DESKTOP CTA */}
      <a
        href="#contact"
        className="group hidden items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition-all duration-300 hover:border-blue-300/60 hover:bg-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.16)] md:flex"
      >
        Let's Talk
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-300 md:flex lg:hidden"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
    </div>

    {/* MOBILE NAVIGATION */}
    {menuOpen && (
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-2 rounded-2xl border border-white/[0.09] bg-[#0B1220]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:ml-auto md:max-w-sm lg:hidden"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-300"
          >
            {link.label}
            <ArrowUpRight size={15} className="text-blue-400/70" />
          </a>
        ))}

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_25px_rgba(59,130,246,0.18)] transition hover:brightness-110"
        >
          Let's Talk
          <ArrowUpRight size={16} />
        </a>
      </motion.nav>
    )}
  </div>
</header>


      {/* HERO */}
      <section
      
        id="home"
        className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 md:px-8"
        style={{
          background:
            "radial-gradient(ellipse at 78% 35%, rgba(59,130,246,0.22), transparent 38%), radial-gradient(ellipse at 15% 85%, rgba(34,211,238,0.09), transparent 38%), linear-gradient(135deg,#080D1A 0%,#0B1220 55%,#080D1A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,0.13) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.13) 1px,transparent 1px)",
            backgroundSize: "54px 54px",
            maskImage: "linear-gradient(to bottom,black,transparent 92%)",
          }}
        />

        <div className="pointer-events-none absolute -right-40 top-[12%] -z-10 h-[500px] w-[500px] rounded-full border border-blue-400/10 shadow-[0_0_0_65px_rgba(59,130,246,0.025),0_0_0_130px_rgba(59,130,246,0.018)]" />
        <div className="pointer-events-none absolute right-[15%] top-[22%] -z-10 h-64 w-64 rounded-full bg-blue-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-[10%] right-[35%] -z-10 h-52 w-52 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="pointer-events-none absolute right-[9%] top-[22%] -z-10 hidden h-52 w-52 rotate-[-25deg] opacity-50 md:block">
          <div className="absolute top-8 h-px w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_14px_rgba(59,130,246,0.6)]" />
          <div className="absolute top-20 right-5 h-px w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_14px_rgba(79,140,255,0.6)]" />
          <div className="absolute top-32 right-10 h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.5)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-[#0B1220]/70 px-4 py-2.5 text-xs tracking-[0.14em] text-slate-300 shadow-[0_8px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              </span>
              DIGITAL SOLUTIONS FOR MODERN BRANDS
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[88px]">
              We build digital
              <span className="block bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                experiences that
              </span>
              move your business
              <span className="block">
                forward
                <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.45)]">
                  .
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Nuvobix helps businesses grow with modern websites, powerful
              e-commerce solutions, and creative digital design built for
              lasting impact.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 text-sm font-bold text-white shadow-[0_10px_35px_rgba(59,130,246,0.23)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(59,130,246,0.38)]"
              >
                Start a Project
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-[#0B1220]/65 px-7 py-4 text-sm font-medium text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-blue-500/5 hover:shadow-[0_12px_35px_rgba(59,130,246,0.12)]"
              >
                Explore Our Portfolio
                <ArrowDownRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-4 text-xs tracking-[0.12em] text-slate-300">
              <span className="flex items-center gap-2">
                <Code2 size={15} className="text-blue-400" />
                WEB DEVELOPMENT
              </span>
              <span className="flex items-center gap-2">
                <ShoppingBag size={15} className="text-blue-400" />
                E-COMMERCE
              </span>
              <span className="flex items-center gap-2">
                <Palette size={15} className="text-blue-400" />
                CREATIVE DESIGN
              </span>
            </div>

            <div className="mt-16 flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-slate-700/50 py-5">
              <span className="text-xs tracking-[0.18em] text-slate-400">
                DESIGNING WHAT COMES NEXT
              </span>
              <span className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                AVAILABLE FOR NEW PROJECTS
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-slate-800/70 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <SectionLabel>SERVICES</SectionLabel>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                Digital solutions.
                <span className="block text-slate-500">Real possibilities.</span>
              </h2>
            </div>
            <p className="max-w-lg leading-8 text-slate-400 md:justify-self-end">
              From your first website to your next online store, we combine
              thoughtful design and practical development to help your business
              stand out.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.a
                  href="#contact"
                  key={service.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className={`${cardStyle} group p-6`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.08] text-blue-300 transition duration-300 group-hover:border-blue-300/50 group-hover:bg-blue-500/15 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]">
                      <Icon size={23} strokeWidth={1.6} />
                    </span>
                    <span className="text-xs text-slate-600">{service.number}</span>
                  </div>
                  <h3 className="mt-9 text-xl font-semibold transition-colors group-hover:text-blue-200">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {service.description}
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-slate-700/60 pt-5 text-sm text-slate-300">
                    Discuss service
                    <ArrowUpRight
                      size={17}
                      className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300"
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="border-t border-slate-800/70 bg-[#0B1220] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel>OUR PORTFOLIO</SectionLabel>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                Ideas into <span className="text-slate-500">experiences.</span>
              </h2>
            </div>
            <p className="max-w-md leading-7 text-slate-400">
              Explore our portfolio of digital projects, website experiences,
              and creative design concepts.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08 }}
                className={`${cardStyle} group overflow-hidden`}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title} website`}
                  className="relative block aspect-[4/3] overflow-hidden border-b border-slate-700/60 bg-gradient-to-br from-blue-950/70 via-[#0B1220] to-[#080D1A]"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} website preview`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs tracking-wider text-white backdrop-blur">
                    {project.category}
                  </span>
                  <span className="absolute right-5 top-5 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs text-white backdrop-blur">
                    {project.number}
                  </span>
                  <span className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/80 px-4 py-2 text-sm text-white backdrop-blur transition group-hover:border-cyan-300/60 group-hover:text-cyan-300">
                    Visit Website <ArrowUpRight size={16} />
                  </span>
                </a>

                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-700/70 bg-slate-950/50 px-3 py-1.5 text-xs text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition hover:text-cyan-300"
                  >
                    View Project <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-slate-800/70 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>ABOUT</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Good design.
              <span className="block text-slate-500">Thoughtful technology.</span>
              Better experiences.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-slate-400">
              Nuvobix is a digital agency focused on helping businesses
              establish and improve their online presence. We bring together
              modern design, practical development, and a clear understanding
              of what your business needs.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-400">
              Whether you need a business website, an e-commerce store, or
              creative digital content, our goal is to deliver a professional
              experience that fits your brand.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-3 border-b border-blue-400/30 pb-3 text-sm transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Tell us about your project <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-slate-800/70 bg-[#0B1220] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel>GET IN TOUCH</SectionLabel>
            <h2 className="mt-5 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Let's make <span className="block text-slate-500">it happen.</span>
            </h2>
            <p className="mt-7 max-w-md leading-8 text-slate-400">
              Have an idea, a business to grow, or a project in mind? Tell us
              what you need and let's start a conversation.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 text-slate-300 transition hover:text-white"
              >
                <span className="rounded-xl border border-slate-700 bg-[#080D1A] p-3 text-blue-300 transition group-hover:border-blue-400/50 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.10)]">
                  <MessageCircle size={20} />
                </span>
                <span>
                  <span className="block text-xs tracking-wider text-slate-500">
                    WHATSAPP
                  </span>
                  <span className="mt-1 block text-sm">+92 326 0596245</span>
                </span>
              </a>

              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 text-slate-300 transition hover:text-white"
              >
                <span className="rounded-xl border border-slate-700 bg-[#080D1A] p-3 text-blue-300 transition group-hover:border-blue-400/50 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.10)]">
                  <Mail size={20} />
                </span>
                <span>
                  <span className="block text-xs tracking-wider text-slate-500">
                    EMAIL
                  </span>
                  <span className="mt-1 block text-sm">{email}</span>
                </span>
              </a>
            </div>
          </div>

          <form onSubmit={handleContact} className={`${cardStyle} p-6 sm:p-8`}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm text-slate-300">
                Your Name
                <input
                  name="name"
                  required
                  maxLength={100}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-[#080D1A] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/10"
                />
              </label>

              <label className="text-sm text-slate-300">
                Email Address
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-[#080D1A] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/10"
                />
              </label>
            </div>

            <label className="mt-5 block text-sm text-slate-300">
              What do you need?
              <select
                name="service"
                required
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-slate-700 bg-[#080D1A] px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-400/70"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service.number} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Other Project">Other Project</option>
              </select>
            </label>

            <label className="mt-5 block text-sm text-slate-300">
              Project Details
              <textarea
                name="message"
                required
                maxLength={5000}
                rows={5}
                placeholder="Tell us about your project..."
                className="mt-2 w-full resize-y rounded-xl border border-slate-700 bg-[#080D1A] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/10"
              />
            </label>

            {contactStatus && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-5 rounded-xl border p-4 text-sm leading-6 ${
                  contactError
                    ? "border-red-400/30 bg-red-400/10 text-red-200"
                    : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                }`}
              >
                {contactError ? "Error: " : "✓ "}
                {contactStatus}
              </div>
            )}

            <button
              type="submit"
              disabled={contactLoading}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(59,130,246,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(59,130,246,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {contactLoading ? "Sending Message..." : "Send Message"}
              <Send size={16} />
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-slate-500">
              Your project details will be sent securely to our email.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/70 bg-[#070B14] px-5 pb-8 pt-14 md:px-8 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
            <div>
              <a href="#home" className="group flex items-center">
                <img
                  src="/nuvobix-logo.png"
                  alt="Nuvobix Logo"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
                Building digital experiences that help businesses look better,
                work smarter, and grow online.
              </p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-3 text-sm transition hover:border-blue-400/50 hover:bg-blue-500/5 hover:text-blue-200"
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Quick Links</h3>
              <div className="mt-5 space-y-4">
                {[
                  ["Home", "#home"],
                  ["Services", "#services"],
                  ["Portfolio", "#work"],
                  ["About", "#about"],
                  ["Contact Us", "#contact"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="block w-fit text-sm text-slate-400 transition hover:translate-x-1 hover:text-blue-300"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Our Services</h3>
              <div className="mt-5 space-y-4">
                {services.map((service) => (
                  <a
                    key={service.number}
                    href="#services"
                    className="block w-fit text-sm text-slate-400 transition hover:translate-x-1 hover:text-blue-300"
                  >
                    {service.title}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Contact Us</h3>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nuvobix@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-start gap-3 text-sm text-slate-400 transition hover:text-blue-300"
              >
                <Mail size={17} className="mt-0.5 shrink-0" />
                <span className="break-all">Email</span>
              </a>

              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center gap-3 text-sm text-slate-400 transition hover:text-blue-300"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>

              <div className="mt-7">
                <p className="text-xs tracking-wider text-slate-500">
                  FOLLOW NUVOBIX
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-cyan-300 hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)]"
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-slate-800/70 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Nuvobix. All rights reserved.</p>
            <a
              href="#home"
              className="inline-flex items-center gap-2 transition hover:text-cyan-300"
            >
              Back to top <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </footer>

      {/* CHAT ASSISTANT */}
      <div className="fixed bottom-5 right-5 z-50">
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-4 w-[min(340px,calc(100vw-40px))] overflow-hidden rounded-2xl border border-blue-400/20 bg-[#0B1220]/95 shadow-[0_20px_70px_rgba(0,0,0,0.5),0_0_35px_rgba(59,130,246,0.08)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-700/60 p-4">
              <div className="flex min-w-0 flex-col items-start">
                <img
                  src="/nuvobix-logo.png"
                  alt="Nuvobix Logo"
                  className="h-6 w-auto max-w-[150px] object-contain object-left"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Automated responses
                </p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="min-h-36 p-4">
              <p className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 text-sm leading-6 text-slate-300">
                {chatReply}
              </p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs text-slate-400 transition hover:text-cyan-300"
              >
                <MessageCircle size={15} />
                Talk to our team
              </a>
            </div>

            <form
              onSubmit={sendChatMessage}
              className="flex gap-2 border-t border-slate-700/60 p-3"
            >
              <input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about our services..."
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-[#080D1A] px-3 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 px-3 text-white transition hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              >
                <Send size={17} />
              </button>
            </form>
          </motion.div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          aria-label={chatOpen ? "Close assistant" : "Open assistant"}
          className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-blue-200/30 bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)] transition duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(59,130,246,0.45)]"
        >
          {chatOpen ? <X size={23} /> : <MessageCircle size={23} />}
        </button>
      </div>
    </main>
  );
}
