// Enhanced Skills Section Component
import React, { useState, useEffect, useRef } from 'react';
import './SkillsSection.css';

function SkillsSection() {
  const [visibleBars, setVisibleBars] = useState(new Set());
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef();

  const skillsData = [
    {
      category: "Frontend",
      icon: "🎨",
      skills: [
        { 
          name: "JavaScript", 
          level: 90, 
          color: "#F7DF1E", 
          description: "ES6+, DOM Manipulation, Async/Await",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
        },
        { 
          name: "React", 
          level: 85, 
          color: "#61DAFB", 
          description: "Hooks, Context API, Custom Components",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        },
        { 
          name: "TypeScript", 
          level: 80, 
          color: "#3178C6", 
          description: "Type Safety, Interfaces, Generics",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
        },
        { 
          name: "CSS/SCSS", 
          level: 88, 
          color: "#1572B6", 
          description: "Flexbox, Grid, Animations, Responsive Design",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
        },
        { 
          name: "Next.js", 
          level: 82, 
          color: "#000000", 
          description: "SSR, SSG, App Router, API Routes",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
        }
      ]
    },
    {
      category: "Backend",
      icon: "⚙️",
      skills: [
        { 
          name: "Node.js", 
          level: 82, 
          color: "#339933", 
          description: "Express, RESTful APIs, Middleware",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
        },
        { 
          name: "Python", 
          level: 75, 
          color: "#3776AB", 
          description: "Django, Flask, Data Processing",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
        },
        { 
          name: "MongoDB", 
          level: 78, 
          color: "#47A248", 
          description: "Aggregation, Indexing, Schema Design",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
        },
        { 
          name: "PostgreSQL", 
          level: 70, 
          color: "#336791", 
          description: "Complex Queries, Relations, Optimization",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
        },
        { 
          name: "GraphQL", 
          level: 65, 
          color: "#E10098", 
          description: "Apollo Server, Resolvers, Schema Design",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
        }
      ]
    },
    {
      category: "Adobe Creative Suite",
      icon: "🎬",
      skills: [
        { 
          name: "After Effects", 
          level: 85, 
          color: "#9999FF", 
          description: "Motion Graphics, VFX, Compositing, Animation",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg"
        },
        { 
          name: "Premiere Pro", 
          level: 80, 
          color: "#9999FF", 
          description: "Video Editing, Color Grading, Audio Sync",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg"
        },
        {
            name: "Davinci Resolve", 
            level: 80, 
            color: "#9999FF", 
            description: "Video Editing, Color Grading, Audio Sync",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg"
        },
        { 
          name: "Photoshop", 
          level: 90, 
          color: "#31A8FF", 
          description: "Photo Editing, Digital Art, UI Design",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg"
        },
        { 
          name: "Illustrator", 
          level: 75, 
          color: "#FF9A00", 
          description: "Vector Graphics, Logo Design, Illustrations",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg"
        }
      ]
    },
    {
      category: "Tools & Others",
      icon: "🛠️",
      skills: [
        { 
          name: "Git", 
          level: 85, 
          color: "#F05032", 
          description: "Version Control, Branching, Collaboration",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
        },
        { 
          name: "Docker", 
          level: 65, 
          color: "#2496ED", 
          description: "Containerization, Docker Compose",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
        },
        { 
          name: "Figma", 
          level: 80, 
          color: "#F24E1E", 
          description: "UI/UX Design, Prototyping, Design Systems",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
        },
        { 
          name: "AWS", 
          level: 60, 
          color: "#232F3E", 
          description: "EC2, S3, Lambda, CloudFormation",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
        },
        { 
          name: "Tailwind CSS", 
          level: 88, 
          color: "#06B6D4", 
          description: "Utility-first, Custom Components, Responsive",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
        }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation for all skills when section comes into view
            const newVisibleBars = new Set();
            skillsData.forEach((category, categoryIndex) => {
              category.skills.forEach((_, skillIndex) => {
                newVisibleBars.add(`${categoryIndex}-${skillIndex}`);
              });
            });
            
            // Stagger the animations
            setTimeout(() => {
              setVisibleBars(newVisibleBars);
            }, 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [skillsData]); // Added skillsData as dependency

  return (
    <section ref={sectionRef} id="skills" className="section skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">Technical Skills</h2>
          <p className="skills-subtitle">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="skills-grid">
          {skillsData.map((category, categoryIndex) => (
            <div key={category.category} className="skill-category">
              <div className="skill-category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.category}</h3>
              </div>
              
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => {
                  const skillId = `${categoryIndex}-${skillIndex}`;
                  const isVisible = visibleBars.has(skillId);
                  const isHovered = hoveredSkill === skillId;
                  
                  return (
                    <div 
                      key={skill.name} 
                      className={`skill-item ${isHovered ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredSkill(skillId)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="skill-header">
                        <div className="skill-info">
                          <div className="skill-name-wrapper">
                            <img 
                              src={skill.logo} 
                              alt={`${skill.name} logo`}
                              className="skill-logo"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <span className="skill-name">{skill.name}</span>
                          </div>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                      </div>
                      
                      <div className="skill-bar-container">
                        <div className="skill-bar">
                          <div 
                            className="skill-progress"
                            style={{
                              width: isVisible ? `${skill.level}%` : '0%',
                              backgroundColor: skill.color,
                              boxShadow: `0 0 10px ${skill.color}40`,
                              transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              transitionDelay: `${skillIndex * 0.1}s`
                            }}
                          >
                            <div className="skill-progress-shine"></div>
                          </div>
                        </div>
                      </div>
                      
                      {isHovered && (
                        <div className="skill-tooltip">
                          <p className="skill-description">{skill.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary Stats */}
        <div className="skills-stats">
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;