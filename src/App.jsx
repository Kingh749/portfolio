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
              <a href="#services">Services</a>
              <a href="#skills">Timeline</a>
              <a href="#projects">Courses</a>
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

        {/* About / Education Section */}
        <section id="about">
          <FadeIn>
            <h2>Education & Journey</h2>
            <div className="education-timeline">
              <div className="timeline-item">
                <span className="timeline-date">July 2023 - August 2027</span>
                <h3 className="timeline-title">Charotar University of Science & Technology (CHARUSAT)</h3>
                <p className="timeline-subtitle">Information Technology</p>
              </div>
              <div className="timeline-item">
                <span className="timeline-date">July 2018 - May 2023</span>
                <h3 className="timeline-title">KNOWLEDGE HIGH SCHOOL</h3>
                <p className="timeline-subtitle">PCM</p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <FadeIn>
            <h2>Core Expertise</h2>
            <div className="skills-grid">
              <div className="skill-card">
                <h3><Shield size={24} color="#00ffcc" /> Cybersecurity</h3>
                <p>Deloitte Cybersecurity Virtual Internship. 1st position in GHOST HUNT EVENT | CYBERKAVACH. Google Cloud Cybersecurity Certification.</p>
              </div>
              <div className="skill-card">
                <h3><Code size={24} color="#00ffcc" /> Full Stack Dev</h3>
                <p>Next.js, React, Node.js. Experience building complex platforms with AI integrations.</p>
              </div>
              <div className="skill-card">
                <h3><Database size={24} color="#00ffcc" /> Data Engineering</h3>
                <p>Designing robust data pipelines, data analysis, and scalable architectures.</p>
              </div>
              <div className="skill-card">
                <h3><Brain size={24} color="#00ffcc" /> Machine Learning</h3>
                <p>IBM Machine Learning Professional Certificate (Coursera). Applied ML in practical projects.</p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <FadeIn>
            <h2>Recent Endeavors</h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-content">
                  <h3>PropWise (Next.js Group Project)</h3>
                  <p>A full-stack application with AI integration, showcasing hands-on experience with modern web development and AI-powered services.</p>
                  <div className="project-tags">
                    <span className="project-tag">Next.js</span>
                    <span className="project-tag">AI Integration</span>
                    <span className="project-tag">Full Stack</span>
                  </div>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-content">
                  <h3>Cybersecurity Analyst Simulator</h3>
                  <p>Practical tasks completed during the Deloitte Cybersecurity Virtual Simulation, focusing on real-world cyber threat analysis.</p>
                  <div className="project-tags">
                    <span className="project-tag">Cybersecurity</span>
                    <span className="project-tag">Threat Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <FadeIn>
            <h2>Let's Connect</h2>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
            <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '1rem' }}>
              divyanshah2005@gmail.com <br />
              +91 9664909373
            </p>
            <div className="social-links" style={{ justifyContent: 'center' }}>
              <a href="https://www.linkedin.com/in/divya-shah-312b09284" target="_blank" rel="noreferrer">
                <LinkedinIcon size={24} />
              </a>
              <a href="mailto:divyanshah2005@gmail.com">
                <Mail size={24} />
              </a>
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
}

export default App;
