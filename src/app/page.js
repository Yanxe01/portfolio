'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './homepage.css';
import './navbar.css';
import './globals.css';
import './journey-modal.css';
import TextType from './TextType';
import TrueFocus from './TrueFocus';
import AnimatedContent from './AnimatedContent'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Particles from './Particles';
import ContactSection from './ContactSection';
import SkillsSection from './SkillsSection'
import FloatingElements from './FloatingElements';
import Link from 'next/link';
import Image from 'next/image';

// Journey Modal Component
const JourneyModal = ({ isOpen, onClose }) => {
  const journeyData = [
    {
      year: "2024 - 2025  ",
      title: "Team Member - RECURSION 1.0",
      role: "Publication, Design, and Documentation",
      description: "Producing dynamic video content and managing digital materials for RECURSION 1.0, the national-scale technology competition and seminar by Teknik Informatika Universitas Hasanuddin. This includes utilizing advanced editing techniques for competition highlights and seminar sessions, while ensuring all digital content aligns with the event's theme, incorporates modern design elements, and maintains consistent branding across platforms.",
      achievements: ["Adobe Premiere Pro", "Adobe After Effects", "Digital Content Editing", "Project Management", "Storytelling and Narrative Structure", "Adobe Photoshop"  ]
    },
    {
      year: "2024",
      title: "Team Member - Nexus 2024",
      role: "Publication, Design, and Documentation",
      description: "Crafting compelling video content for NEXUS 2024, a tech seminar hosted by Coder FT-UH, using cutting-edge editing techniques and seamless transitions to deliver engaging and visually cohesive content.",
      achievements: ["Adobe Premiere Pro", "Adobe After Effects", "Digital Content Editing", "Project Management", "Adobe Photoshop" ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="journey-modal-overlay" onClick={onClose}>
      <div className="journey-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="journey-modal-header">
          <div>
            <h2 className="journey-modal-title">Journey & Experience</h2>
            <p className="journey-modal-subtitle">Perjalanan kepanitiaan dan organisasi</p>
          </div>
          <button className="journey-modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="journey-modal-body">
          <div className="journey-grid">
            {journeyData.map((item, index) => (
              <div key={index} className="journey-card">
                <div className="journey-card-accent"></div>
                
                <div className="journey-card-header">
                  <div className="journey-year">
                    <i className="far fa-calendar"></i>
                    <span>{item.year}</span>
                  </div>
                  <h3 className="journey-title">{item.title}</h3>
                  <div className="journey-role">
                    <i className="fas fa-users"></i>
                    <span>{item.role}</span>
                  </div>
                </div>
                
                <p className="journey-description">{item.description}</p>
                
                <div className="journey-achievements">
                  <div className="achievements-header">
                    <i className="fas fa-award"></i>
                    <span> Tools & Skills:</span>
                  </div>
                  <div className="achievements-tags">
                    {item.achievements.map((achievement, achIndex) => (
                      <span key={achIndex} className="achievement-tag">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Liquid Glass Navbar Component
function LiquidGlassNavbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`liquid-navbar ${isScrolled ? 'scrolled' : ''}`}
      onMouseMove={handleMouseMove}
      style={{
        background: `
          radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255,255,255,0.15), 
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.02)
          ),
          linear-gradient(135deg, 
            rgba(255,255,255,0.1) 0%, 
            rgba(255,255,255,0.05) 50%, 
            rgba(255,255,255,0.02) 100%
          )
        `
      }}
    >
      <div className="navbar-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            style={{
              background: activeSection === item.id
                ? `linear-gradient(135deg, 
                    rgba(255,255,255,0.25) 0%,
                    rgba(255,255,255,0.1) 50%,
                    rgba(255,255,255,0.05) 100%
                  )`
                : 'transparent'
            }}
          >
            <div className="ripple-effect"></div>
            <div className="nav-content">
              <span className="nav-label">{item.label}</span>
            </div>
            {activeSection === item.id && <div className="active-indicator" />}
            <div className="hover-background"></div>
          </button>
        ))}
      </div>
    </nav>
  );
}

// Performance optimized section observer
function useSectionObserver() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

// MAIN COMPONENT - Combined Home and HomePage functionality
function HomePage() {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);

  return (
    <div className="homepage">
      <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
        <Particles
          particleColors={["#2E8BC0", "#F28D35", "#F1C6C0"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <LiquidGlassNavbar />
      
      {/* Home Section */}
      <section id="home" className="section home-section">
        {/* Floating Elements Background */}
        <FloatingElements />
        <div className="hero-content">
          <div className="hero-text">
            <TrueFocus 
              sentence="WELCOME TO MY PORTFOLIO"
              manualMode={false}
              blurAmount={5}
              borderColor="Gold"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
            <AnimatedContent
              distance={150}
              direction="vertical"
              reverse={false}
              duration={1.0}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1.1}
              threshold={0.2}
              delay={0.3}
            >
              <TextType 
                text={["Here, your find my projects, skills, and creative", "work as I continue exploring the world of development and design", 
                  "Building seamless user experiences from front to back", "Crafting stories, one edit at a time", "Designing intuitive interfaces with style and function" 
                ]} 
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="•"
                style={{ fontSize: "20px", color: "#ffffff" }}
              />
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.0}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0}
        >
          <div className="about-container">
            <div className="about-text">
              <div className="about-intro">
                <p className="greeting">Hello, My Name!</p>
                <TextType 
                  text={["CHRISTIANTO TRISATRIA LAPU"]} 
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="•"
                  style={{ fontSize: "53px", color: "#ffffff", fontWeight: "bold" }}
                />
                <p className="role-description">
                  Full Stack Developer • UI Designer • Editor
                </p>
                <p style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  fontSize: '0.95rem',
                  marginTop: '1rem',
                  lineHeight: '1.6'
                }}>
                  I am currently studying at Universitas Hasanuddin in the Faculty of Engineering, Department of Informatics Engineering, and as a Full Stack Developer, 
                  I am passionate about building scalable web applications, combining front-end creativity with back-end efficiency to deliver seamless digital experiences.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="about-actions" style={{ marginBottom: '40px' }}>
                <button
                  onClick={() => setIsJourneyModalOpen(true)}
                  className="journey-button"
                >
                  <i className="fas fa-map-marked-alt"></i>
                  Journey & Experience
                  <i className="fas fa-chevron-right"></i>
                </button>
                <a
                  href="/documents/Christianto-Trisatria-Lapu-CV.pdf"
                  download="Christianto_Trisatria_Lapu_CV.pdf"
                  className="cv-download-button"
                >
                  <i className="fas fa-download"></i>
                  Download CV
                  <i className="fas fa-file-pdf"></i>
                </a>
              </div>

              <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
                {[ 
                  { icon: "fab fa-github", url: "https://github.com/Yanxe01" },
                  { icon: "fab fa-linkedin", url: "https://linkedin.com/in/christianto-trisatria-lapu-0915a137a" },
                  { icon: "fab fa-instagram", url: "https://instagram.com/ianlapu_" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      color: '#fff',
                      transition: '0.3s ease'
                    }}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
            {/* Photo section */}
            <div className="about-image-container">
              <Image 
                src="/image/avatar.jpg" 
                alt="Profile"
                className="profile-image" 
                width={400}
                height={600}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="section portfolio-section">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.0}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <div className="projects-container">
            <h2 className="projects-title">Projects</h2>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <TextType 
                text={["Here, you find my projects."]} 
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="•"
                style={{ fontSize: "20px", color: "#ffffff" }}
              />
            </div>
            <div className="projects-grid">
              {/* Project Card 1 */}
              <div className="project-card">
                <div className="project-image">
                  <Image 
                    src="/image/recursion.png" 
                    alt="Recursion Project" 
                    className="project-img" 
                    width={400}
                    height={300}
                  />
                  <div className="project-placeholder">
                    <i className="fas fa-video"></i>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-name">Recursion 1.0</h3>
                  <p className="project-description">Dynamic video content for RECURSION 1.0, the national-scale technology competition and seminar.</p>
                  <div className="project-tags">
                    <span className="tag">Adobe Premiere Pro</span>
                    <span className="tag">Adobe After Effects</span>
                    <span className="tag">Adobe Photoshop</span>
                    <span className="tag">DaVinci Resolve</span>
                  </div>
                  <div className="project-actions">
                    <Link
                      href="https://drive.google.com/drive/folders/11j-ljnGMSqpsU99WkZkB75i29iDqHwn0?usp=sharing"
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i>View Demo
                    </Link>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="project-card">
                <div className="project-image">
                  <Image 
                    src="/image/nexus.png" 
                    alt="Nexus Project" 
                    className="project-img" 
                    width={400}
                    height={300}
                  />
                  <div className="project-placeholder">
                    <i className="fas fa-video"></i>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-name">Nexus</h3>
                  <p className="project-description">Compelling video content for NEXUS 2024, a tech seminar hosted by Coder FT-UH.</p>
                  <div className="project-tags">
                    <span className="tag">Adobe Premiere Pro</span>
                    <span className="tag">Adobe After Effects</span>
                    <span className="tag">Adobe Photoshop</span>
                    <span className="tag">DaVinci Resolve</span>
                  </div>
                  <div className="project-actions">
                    <a href="https://drive.google.com/drive/folders/1w1rWaEu_wt2-sMbqRsbkKM-51NjbGkDF?usp=sharing" className="project-link" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i>
                      View Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="project-card">
                <div className="project-image">
                  <Image 
                    src="/image/uiux.png" 
                    alt="UI/UX Project" 
                    className="project-img" 
                    width={400}
                    height={300}
                  />
                  <div className="project-placeholder">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-name">Beverage UI/UX</h3>
                  <p className="project-description">Modern beverage ordering app with intuitive design and seamless user experience.</p>
                  <div className="project-tags">
                    <span className="tag">Figma</span>
                    <span className="tag">UI/UX</span>
                    <span className="tag">Desktop</span>
                    <span className="tag">Adobe Photoshop</span>
                  </div>
                  <div className="project-actions">
                    <a href="https://www.figma.com/proto/BheAIfHEe0Wk3vKw6gued3/Project-Design-Skilful?page-id=0%3A1&node-id=4-127&viewport=483%2C499%2C0.17&t=q80RGt1cqkpmRRFi-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4%3A127" className="project-link" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i>
                      View Design
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="project-card upcoming">
                <div className="project-image">
                  <div className="project-placeholder">
                    <i className="fas fa-code"></i>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-name">Coming Soon</h3>
                  <p className="project-description">Exciting new project in development. Stay tuned for updates on this innovative solution.</p>
                  <div className="project-tags">
                    {/* Tags will be added when project is ready */}
                  </div>
                  <div className="project-actions">
                    <div className="project-status">
                      <i className="fas fa-clock"></i>
                      In Development
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.0}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0}
        >
          <SkillsSection />
        </AnimatedContent>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.0}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0}
        >
          <ContactSection />
        </AnimatedContent>
      </section>

      {/* Liquid Glass Footer */}
      <footer className="liquid-glass-footer">
        <div className="footer-glass-container">
          <div className="footer-glass-content">
            <div className="footer-left">
              <span className="footer-text">
                © 2025 / <span className="footer-name">Christianto Trisatria Lapu</span> / Build your portfolio with creativity
              </span>
            </div>
            <div className="footer-right">
              <div className="footer-socials">
                <a href="https://github.com/Yanxe01" target="_blank" rel="noopener noreferrer" className="footer-glass-link" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/christianto-trisatria-lapu-0915a137a" target="_blank" rel="noopener noreferrer" className="footer-glass-link" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/ianlapu_/" target="_blank" rel="noopener noreferrer" className="footer-glass-link" title="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="mailto:ianlapu98@gmail.com" className="footer-glass-link" title="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.832L12 10.77l9.532-6.95h.832c.904 0 1.636.732 1.636 1.637z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Glass effect overlay */}
          <div className="footer-glass-overlay"></div>
          <div className="footer-liquid-gradient"></div>
        </div>
      </footer>

      {/* Journey Modal */}
      <JourneyModal 
        isOpen={isJourneyModalOpen} 
        onClose={() => setIsJourneyModalOpen(false)} 
      />
    </div>
  );
}

// ONLY ONE DEFAULT EXPORT
export default HomePage;
