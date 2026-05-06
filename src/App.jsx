import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Shield, Database, Code, Brain } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import './index.css';

// Premium MNC 3D Background Component
function MNCBackground() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.07;
    // Gentle floating
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <torusKnotGeometry args={[5, 1.5, 200, 32]} />
      <meshBasicMaterial 
        color="#ffffff" 
        wireframe={true} 
        transparent={true} 
        opacity={0.04} 
      />
    </mesh>
  );
}

// Fade in component
const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  
  // Smooth out mouse movement for anti-gravity feel
  const springConfig = { damping: 25, stiffness: 120, mass: 1.5 };
  const mouseX = useSpring(mousePosition.x, springConfig);
  const mouseY = useSpring(mousePosition.y, springConfig);
  const rotateX = useSpring(mousePosition.rotateX, springConfig);
  const rotateY = useSpring(mousePosition.rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position between -15 and 15 for translation
      const x = ((e.clientX / innerWidth) - 0.5) * 30;
      const y = ((e.clientY / innerHeight) - 0.5) * 30;
      
      // Calculate rotation for 3D tilt (rotateX tilts up/down, rotateY tilts left/right)
      const rX = ((e.clientY / innerHeight) - 0.5) * -15; // Negative to invert tilt
      const rY = ((e.clientX / innerWidth) - 0.5) * 15;
      
      setMousePosition({ x, y, rotateX: rX, rotateY: rY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 2]}>
          <MNCBackground />
          <Preload all />
        </Canvas>
      </div>

      {/* HTML Content Overlay */}
      <div className="content-container">
        <nav className="nav-links glass-nav">
          <div className="nav-container">
            <a href="#" className="logo">Divya Shah.</a>
            <div className="links">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#certifications">Certifications</a>
              <a href="#contact">Contact</a>
            </div>
            <a href="#contact" className="work-with-me-btn">WORK WITH ME</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="hero-new">

          {/* LAYER 1: Full-screen dark background image */}
          <motion.div
            className="hero-bg-image"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <video
              src="https://res.cloudinary.com/dgxttqijt/video/upload/q_60,w_1280,vc_auto/v1778046338/final_ashinh.mp4"
              poster="https://res.cloudinary.com/dgxttqijt/image/upload/v1778044436/front-video_c7ko6d.webp"
              className="hero-fullscreen-img hero-img-dark"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </motion.div>

          {/* Gradient vignette */}
          <div className="hero-gradient-overlay" />
          <div className="cinematic-noise" />

          {/* LAYER 2: Centered name text — sits BEHIND the portrait */}
          <motion.div
            className="hero-name-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
          >
            <span className="hero-name-word">DIVYA</span>
            <span className="hero-name-word">SHAH</span>
          </motion.div>

          {/* LAYER 3: Portrait — same image, centered crop, sits IN FRONT of name */}
          <motion.div
            className="hero-portrait-top"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: mouseX, y: mouseY }}
          >
            <img
              src="https://res.cloudinary.com/dgxttqijt/image/upload/v1778044436/front-video_c7ko6d.webp"
              alt="Divya Shah"
              className="hero-portrait-img"
            />
          </motion.div>

          {/* LAYER 4: Bottom tagline */}
          <motion.div
            className="hero-bottom-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <p className="hero-tagline">Cybersecurity Enthusiast &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp; ML Engineer</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/divya-shah-312b09284" target="_blank" rel="noreferrer">
                <LinkedinIcon size={20} />
              </a>
              <a href="mailto:divyanshah2005@gmail.com">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* ── ABOUT / EDUCATION ── */}
        <section id="about" className="section-pad">
          <FadeIn>
            <p className="section-label">MY BACKGROUND</p>
            <h2 className="section-heading">Education &amp; Journey</h2>
          </FadeIn>
          <div className="education-timeline">
            <FadeIn delay={0.1}>
              <div className="timeline-item glass-card">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <span className="timeline-date">July 2023 – August 2027</span>
                  <h3 className="timeline-title">Charotar University of Science &amp; Technology</h3>
                  <p className="timeline-sub">B.Tech — Information Technology</p>
                  <p className="timeline-loc">📍 Gujarat, India</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="timeline-item glass-card">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <span className="timeline-date">2018 – 2023</span>
                  <h3 className="timeline-title">Knowledge High School</h3>
                  <p className="timeline-sub">PCM — Physics, Chemistry, Mathematics</p>
                  <p className="timeline-loc">📍 Gujarat, India</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="section-pad">
          <FadeIn>
            <p className="section-label">PROFESSIONAL</p>
            <h2 className="section-heading">Experience</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="exp-card glass-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">Jr. Data Engineer Intern</h3>
                  <p className="exp-company">Aureus Infotech Canada</p>
                </div>
                <div className="exp-meta">
                  <span className="exp-date">May 2025 – June 2025</span>
                  <span className="exp-badge">Remote</span>
                </div>
              </div>
              <ul className="exp-list">
                <li>Designed and developed ETL data pipelines for processing and transforming large-scale datasets, ensuring data quality and consistency across multiple data sources.</li>
                <li>Assisted in integrating heterogeneous data systems and optimized data workflows for improved performance and scalability, reducing processing time via efficient transformation logic.</li>
                <li>Collaborated with cross-functional data teams to build reliable data infrastructure supporting data-driven decision-making and analytics initiatives.</li>
                <li>Maintained data pipeline documentation and implemented monitoring solutions to ensure system reliability and data integrity.</li>
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="section-pad">
          <FadeIn>
            <p className="section-label">WHAT I KNOW</p>
            <h2 className="section-heading">Technical Skills</h2>
          </FadeIn>
          <div className="skills-categories">
            {[
              { icon: <Code size={20} color="#00ffcc" />, label: "Programming Languages", tags: ["Python", "C#", "JavaScript", "SQL", "C++"] },
              { icon: <Database size={20} color="#00ffcc" />, label: "Data Engineering", tags: ["ETL Pipelines", "Data Integration", "Data Transformation", "Data Quality Management"] },
              { icon: <Brain size={20} color="#00ffcc" />, label: "Machine Learning", tags: ["Supervised Learning", "Unsupervised Learning", "Model Deployment", "Feature Engineering"] },
              { icon: <Shield size={20} color="#00ffcc" />, label: "Cybersecurity", tags: ["Network Security", "Threat Analysis", "Security Assessment", "Vulnerability Management"] },
              { icon: <Code size={20} color="#00ffcc" />, label: "Web Development", tags: ["Full Stack", ".NET Core", "React", "Node.js", "RESTful APIs"] },
              { icon: <Database size={20} color="#00ffcc" />, label: "Cloud &amp; Tools", tags: ["Google Cloud Platform", "Docker", "Git", "Linux", "Database Management"] },
              { icon: <Brain size={20} color="#00ffcc" />, label: "Frameworks", tags: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", ".NET Core"] },
            ].map((cat, i) => (
              <FadeIn key={cat.label} delay={i * 0.08}>
                <div className="skill-category-card glass-card">
                  <div className="skill-cat-header">{cat.icon}<span>{cat.label}</span></div>
                  <div className="skill-tags">
                    {cat.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="section-pad">
          <FadeIn>
            <p className="section-label">WHAT I'VE BUILT</p>
            <h2 className="section-heading">Projects &amp; Achievements</h2>
          </FadeIn>
          <div className="projects-grid">
            {[
              {
                title: "GHOST Hackathon — 🥇 1st Place Winner",
                badge: "2025 · Team: The Anonymous Group",
                desc: "Led a team to secure first position in a competitive cybersecurity hackathon. Demonstrated advanced problem-solving in security challenges and collaborative technical development.",
                tags: ["Cybersecurity", "Hackathon", "Team Lead"],
                accent: "#00ffcc",
              },
              {
                title: "End-to-End ML Pipeline Development",
                badge: "Machine Learning",
                desc: "Built complete ML pipelines from data preprocessing through model deployment using Python and scikit-learn. Implemented feature engineering and model optimization for production-ready solutions.",
                tags: ["Python", "Scikit-learn", "Model Deployment", "Feature Engineering"],
                accent: "#a78bfa",
              },
              {
                title: "Full Stack App with .NET Core",
                badge: "Web Development",
                desc: "Developed scalable web applications using C# and .NET Core with RESTful API architecture. Integrated frontend and backend systems with secure authentication and database management.",
                tags: ["C#", ".NET Core", "RESTful API", "Full Stack"],
                accent: "#38bdf8",
              },
            ].map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.12}>
                <motion.div
                  className="project-card glass-card"
                  whileHover={{ y: -6, boxShadow: `0 20px 60px ${p.accent}22` }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="project-accent-bar" style={{ background: p.accent }} />
                  <span className="project-badge">{p.badge}</span>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section id="certifications" className="section-pad">
          <FadeIn>
            <p className="section-label">CREDENTIALS</p>
            <h2 className="section-heading">Certifications &amp; Training</h2>
          </FadeIn>
          <div className="certs-grid">
            {[
              { name: "IBM Machine Learning Professional Certificate", org: "Coursera", year: "2025" },
              { name: "Google Cloud Career Launchpad — Cybersecurity Track", org: "Google Cloud", year: "2025" },
              { name: "Deloitte Cybersecurity Virtual Internship", org: "Forage", year: "2025" },
              { name: "Google Introduction to Cybersecurity", org: "Coursera", year: "2025" },
              { name: "NLP for Generative AI Workshop", org: "CHARUSAT", year: "2025" },
              { name: "Building Applications with C# and .NET Core", org: "CHARUSAT DEPSTAR", year: "2025" },
              { name: "What Is Generative AI?", org: "LinkedIn Learning", year: "2025" },
            ].map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.07}>
                <motion.div
                  className="cert-card glass-card"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="cert-icon">🏅</div>
                  <div className="cert-body">
                    <p className="cert-name">{c.name}</p>
                    <p className="cert-org">{c.org} · {c.year}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section-pad contact-section">
          <FadeIn>
            <p className="section-label">GET IN TOUCH</p>
            <h2 className="section-heading">Let's Connect</h2>
            <p className="contact-sub">Open to internships, collaborations, and innovative projects.</p>
            <div className="contact-pills">
              <a href="mailto:divyanshah2005@gmail.com" className="contact-pill">
                <Mail size={18} /> divyanshah2005@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/divya-shah-312b09284" target="_blank" rel="noreferrer" className="contact-pill">
                <LinkedinIcon size={18} /> linkedin.com/in/divya-shah
              </a>
              <a href="https://github.com/Kingh749" target="_blank" rel="noreferrer" className="contact-pill">
                <GithubIcon size={18} /> github.com/Kingh749
              </a>
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
}

export default App;
