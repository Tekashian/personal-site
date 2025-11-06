"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Code, User, Briefcase, ExternalLink, Play } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Offset for fixed navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // Handle contact form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
        form.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus('idle');
          setFormMessage('');
        }, 5000);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Oops! Something went wrong. Please try again or contact me directly at jakub.grzegorz.lacki@gmail.com');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setFormMessage('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out"
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex space-x-8"
          >
            {["About", "Projects", "Skills", "Contact"].map((item, index) => {
              const sectionId = item.toLowerCase().replace(" ", "-");
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className={`hover:text-blue-400 transition-colors duration-300 relative group cursor-pointer ${
                    isActive ? 'text-blue-400' : ''
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              );
            })}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Hi, I&apos;m a
              <span className="block text-blue-400 animate-glow">Developer</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
          >
            I create modern web applications with passion for innovation
            <br />
            and exceptional user experience
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              View My Projects
            </button>
            <button className="px-8 py-4 border-2 border-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              Download CV
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { icon: Github, href: "https://github.com/Tekashian" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/jakub-%C5%82%C4%85cki-9a059a397/" },
              { icon: Mail, href: "mailto:jakub.grzegorz.lacki@gmail.com" }
            ].map(({ icon: Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="animate-bounce cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown size={32} className="mx-auto text-blue-400 hover:text-blue-300 transition-colors duration-300" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  I&apos;m a <span className="text-blue-400 font-semibold">Blockchain Architect & Full-Stack Developer</span> with over <span className="text-purple-400 font-semibold">3 years of experience</span> building production-grade decentralized applications and high-performance trading systems.
                </p>
                <p>
                  My expertise spans from <span className="text-emerald-400 font-semibold">architecting modular smart contract systems</span> like PolyFund (a comprehensive DAO governance and crowdfunding platform) to developing <span className="text-orange-400 font-semibold">microsecond-latency trading bots</span> for Binance FIX API using Go.
                </p>
                <p>
                  I specialize in <span className="text-cyan-400 font-semibold">multi-chain development</span> (Ethereum & Solana), having built on-chain analytics tools that monitor wallet addresses and track transactions in real-time. My work includes DeFi platforms with sophisticated tokenomics, automated escrow systems, and transparent governance mechanisms secured by OpenZeppelin standards.
                </p>
                <p>
                  Beyond blockchain, I&apos;m proficient in modern web frameworks — from <span className="text-pink-400 font-semibold">React/Next.js</span> and <span className="text-green-400 font-semibold">Vue 3</span> to <span className="text-indigo-400 font-semibold">Gatsby</span>, crafting high-performance applications with advanced animations using Framer Motion, GSAP, and custom parallax implementations. I believe in writing clean, type-safe code with TypeScript and building systems that scale.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                {[
                  { number: "18+", label: "Projects" },
                  { number: "3+", label: "Years Experience" },
                  { number: "2", label: "Blockchains" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Avatar/Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Avatar Photo */}
              <div className="relative mx-auto lg:mx-0 w-64 h-64 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-white/10 group hover:border-blue-400/50 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full group-hover:animate-pulse" />
                <img 
                  src="/videos/selfie.jpg" 
                  alt="Jakub Łącki - Blockchain Developer" 
                  className="w-full h-full object-cover rounded-full relative z-10"
                />
                {/* Floating elements around avatar */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/30 rounded-full animate-float" />
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-500/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-500/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
              </div>

              {/* Quick Skills */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center lg:text-left">Core Skills</h3>
                <div className="space-y-3">
                  {[
                    { skill: "Blockchain Development", level: 95 },
                    { skill: "Smart Contracts (Solidity)", level: 90 },
                    { skill: "Full-Stack Development", level: 92 },
                    { skill: "Trading Systems & DeFi", level: 88 }
                  ].map((item, index) => (
                    <motion.div
                      key={item.skill}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.skill}</span>
                        <span className="text-blue-400">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Projects
            </h2>
            <p className="text-xl text-gray-300">
              Discover my portfolio of latest projects and implementations
            </p>
          </motion.div>

          {/* Featured Project - Polyfund */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm group hover:border-blue-400/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
              
              {/* Featured Badge */}
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-black/20 rounded-full animate-pulse" />
                  Featured Project
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Project Image */}
                <div className="relative">
                  <div className="aspect-video rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500 border border-white/10 mb-4">
                    <video 
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      <source src="/videos/demo2.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  {/* Logo */}
                  <div className="flex justify-center items-center py-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      className="relative"
                    >
                      <img 
                        src="/videos/logo2.png" 
                        alt="PolyFund Logo" 
                        className="h-64 w-auto object-contain filter drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 scale-150" />
                    </motion.div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/30 rounded-full animate-float" />
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
                </div>

                {/* Project Info */}
                <div className="space-y-6 flex flex-col justify-center">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                      PolyFund
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Decentralized crowdfunding platform operating on blockchain technology. 
                      PolyFund enables transparent financing of social and charitable projects 
                      with full on-chain transaction auditability and modular smart contract architecture.
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-emerald-400">Key Features:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        Transparent, on-chain fundraising with full auditability
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                        Modular smart contract architecture (governance, security, analytics)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        Advanced refund system and scheduled payouts
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        Lightweight Core with delegation to specialized modules
                      </li>
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-teal-400">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Solidity", "Next.js", "TypeScript", "Ethereum", "Web3.js", "Tailwind CSS", "Smart Contracts", "MongoDB", "OpenZeppelin"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 text-sm rounded-full border border-emerald-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 relative z-20">
                    <motion.a
                      href="https://github.com/Tekashian/PoliDao-frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 font-medium cursor-pointer relative z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://github.com/Tekashian/PoliDao-frontend", "_blank");
                      }}
                    >
                      <Github size={20} />
                      <span>GitHub</span>
                    </motion.a>
                    <motion.a
                      href="https://poly-fund.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl transition-all duration-300 font-medium cursor-pointer relative z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://poly-fund.vercel.app/", "_blank");
                      }}
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href="https://sepolia.etherscan.io/address/0x9362d1b929c8cC161830292b95Ad5E1187239a38"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl transition-all duration-300 font-medium text-sm cursor-pointer relative z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://sepolia.etherscan.io/address/0x9362d1b929c8cC161830292b95Ad5E1187239a38", "_blank");
                      }}
                    >
                      <Code size={20} />
                      Smart Contract
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Projects Grid */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-center text-gray-300">Other Projects</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Aromato Coffee Shop",
                description: "Professional coffee shop landing page featuring parallax scrolling, reveal animations, and lightbox gallery. Built with pure HTML5, CSS3, and Vanilla JavaScript showcasing advanced DOM manipulation and modern CSS techniques.",
                tech: ["HTML5", "CSS3", "Vanilla JS", "Parallax", "Responsive"],
                image: "/videos/Aromato.png",
                github: "https://github.com/Tekashian/Aromato",
                live: "https://aromato.vercel.app/",
                featured: true
              },
              {
                title: "PolyFund Marketing Page",
                description: "High-impact landing page for blockchain crowdfunding platform. Features animated hero with floating elements, scroll-triggered animations using Framer Motion, and performance-focused Next.js 14 implementation with TypeScript.",
                tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
                image: "/videos/PolyFund-landing.png",
                github: "https://github.com/Tekashian/PolyFund-LandingPage",
                live: "https://poly-fund-landing-page.vercel.app/",
                featured: false
              },
              {
                title: "Chronos Élite Watches",
                description: "Luxury watch landing page built with Gatsby 5 and React 18. Features 3D product visualization, sophisticated animations with Framer Motion 10, and elegant design system perfect for premium products.",
                tech: ["Gatsby 5", "React 18", "Framer Motion", "3D Effects"],
                image: "/videos/watch-ladning-page.png",
                github: "https://github.com/Tekashian/Watch-Landing-Page",
                live: "https://watch-landing-page-psi.vercel.app/",
                featured: false
              },
              {
                title: "Blockchain Camp",
                description: "Immersive landing page for Web3 programming course. Built with Vue 3 composition API, Vite, and GSAP for cinematic scroll experiences. Features custom Tailwind theme with glassmorphism UI and advanced scroll-triggered staging.",
                tech: ["Vue 3", "Vite", "GSAP", "Tailwind CSS", "ScrollTrigger"],
                image: "/videos/block-chain-camp.png",
                github: "https://github.com/Tekashian/Blockchain-camp-landingPage",
                live: "https://blockchain-camp-landing-page.vercel.app/",
                featured: false
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 h-full">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-lg mb-4 h-48 group-hover:scale-105 transition-transform duration-500">
                    {project.image.includes('placeholder') ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                          <Play size={48} className="text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-sm font-medium"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                      {project.live !== "#" && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 text-sm font-medium"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Get In Touch
            </button>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills
            </h2>
            <p className="text-xl text-gray-300">
              Modern technology stack for building applications of the future
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Solidity", "Ethereum", "TypeScript", "React",
              "Next.js", "Vue.js", "Go", "Web3.js"
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:animate-pulse">
                  <Code size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg">{tech}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300">
              Have a project in mind? Let&apos;s talk about it!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Email", info: "jakub.grzegorz.lacki@gmail.com", link: "mailto:jakub.grzegorz.lacki@gmail.com" },
                  { icon: Github, title: "GitHub", info: "@Tekashian", link: "https://github.com/Tekashian" },
                  { icon: Linkedin, title: "LinkedIn", info: "Jakub Łącki", link: "https://www.linkedin.com/in/jakub-%C5%82%C4%85cki-9a059a397/" }
                ].map(({ icon: Icon, title, info, link }, index) => (
                  <motion.a
                    key={title}
                    href={link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg group-hover:animate-pulse">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{title}</div>
                      <div className="text-gray-400 group-hover:text-blue-400 transition-colors">{info}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-400/20"
              >
                <h4 className="text-lg font-semibold mb-2 text-blue-400">Availability</h4>
                <p className="text-gray-300 text-sm">
                  Currently open to new freelance projects and collaborations. 
                  I usually respond within 24 hours.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Hidden Web3Forms Access Key - Register at https://web3forms.com for free */}
                <input type="hidden" name="access_key" value="8f3e0c1a-4b5d-4e2f-9a3b-1c8d7e6f5a4b" />
                <input type="hidden" name="redirect" value="false" />
                <input type="hidden" name="email" value="jakub.grzegorz.lacki@gmail.com" />
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-all duration-300 backdrop-blur-sm text-white"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      name="sender_email"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-all duration-300 backdrop-blur-sm text-white"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-all duration-300 backdrop-blur-sm text-white"
                    placeholder="Message subject"
                  />
                </motion.div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-300">Message</label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none text-white"
                    placeholder="Describe your project or ask a question..."
                  />
                </motion.div>
                
                {/* Status Message */}
                {formMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      formStatus === 'success' 
                        ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                        : 'bg-red-500/20 border border-red-500/50 text-red-300'
                    }`}
                  >
                    {formMessage}
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  whileHover={{ scale: formStatus === 'sending' ? 1 : 1.05 }}
                  whileTap={{ scale: formStatus === 'sending' ? 1 : 0.95 }}
                  className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:shadow-2xl ${
                    formStatus === 'sending'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Portfolio. Built with passion and cutting-edge technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}