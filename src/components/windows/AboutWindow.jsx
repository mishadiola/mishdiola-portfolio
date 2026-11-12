import { useState } from 'react'
import {
  GraduationCap,
  Layers,
  Sparkles,
  MapPin,
  Code2,
  Database,
  Palette,
  Wrench,
  Cpu,
  Award,
  ArrowRight,
  Download
} from 'lucide-react'
import './Windows.css'

function AboutWindow({ onOpenProjects, onOpenContacts }) {
  // Support real profile photo with seamless fallback to MD monogram
  const [imgError, setImgError] = useState(false)
  const profilePhotoPath = '/images/mish-profile.jpg'

  // Structured, compact skills categories from resume
  const skillCategories = [
    {
      category: 'Web Development',
      Icon: Code2,
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap', 'React'],
      badgeClass: 'badge-pink',
    },
    {
      category: 'Databases',
      Icon: Database,
      skills: ['MySQL', 'phpMyAdmin', 'PostgreSQL'],
      badgeClass: 'badge-blue',
    },
    {
      category: 'Design & Creative',
      Icon: Palette,
      skills: ['Figma', 'Canva', 'Responsive Web Design', 'Content Design', 'Photo Editing', 'Video Editing'],
      badgeClass: 'badge-purple',
    },
    {
      category: 'Development Tools',
      Icon: Wrench,
      skills: ['Visual Studio Code', 'Git', 'GitHub'],
      badgeClass: 'badge-amber',
    },
    {
      category: 'Additional Knowledge',
      Icon: Cpu,
      skills: ['Computer Hardware', 'Networking Fundamentals'],
      badgeClass: 'badge-gray',
    },
  ]

  return (
    <div className="about-window-body">
      {/* 1. Profile Hero Section with Online Status Indicator */}
      <div className="profile-hero">
        <div className="avatar-wrapper">
          <div className="avatar-ring">
            <div className="avatar-placeholder">
              {!imgError ? (
                <img
                  src={profilePhotoPath}
                  alt="Mish Diola profile photo"
                  className="avatar-img"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="avatar-initials">MD</span>
              )}
            </div>
          </div>
          {/* Refined green online indicator */}
          <span
            className="avatar-online-dot"
            title="Online"
            aria-label="Online status"
          ></span>
        </div>

        <div className="profile-identity">
          <div className="profile-name-row">
            <h2 className="profile-name">Mish Diola</h2>
            <span className="profile-fullname">(Mish S. Diola)</span>
          </div>
          <span className="profile-handle">Information Systems Student</span>

          <div className="profile-meta-badges">
            <div className="profile-tag-pill">
              <span className="profile-tag-dot"></span>
              <span>4th Year BS in Information Systems</span>
            </div>
            <div className="profile-location-pill">
              <MapPin size={12} strokeWidth={2} aria-hidden="true" />
              <span>City of Dasmariñas, Cavite</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Micro Detail Cards (Education, Focus, Interests) */}
      <div className="profile-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-pink">
            <GraduationCap size={17} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="stat-value">BS Info Systems</div>
          <div className="stat-label">Education</div>
          <span className="stat-subdetail">KLD • 2023–Present</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-blue">
            <Layers size={17} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="stat-value">Web Dev & UI/UX</div>
          <div className="stat-label">Focus</div>
          <span className="stat-subdetail">Front-End & Systems</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-amber">
            <Sparkles size={17} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="stat-value">Tech & Business</div>
          <div className="stat-label">Interests</div>
          <span className="stat-subdetail">Creative Solutions</span>
        </div>
      </div>

      {/* 3. Concise Biography Section (Exact Short Version) */}
      <div className="profile-bio-card">
        <h3 className="section-mini-heading">About Mish</h3>
        <p className="profile-bio-text">
          I'm Mish, a fourth-year Information Systems student passionate about technology, creativity, and business.
        </p>
        <p className="profile-bio-text" style={{ marginTop: '8px' }}>
          I enjoy building web-based systems, exploring UI/UX design, and turning ideas into practical digital experiences. I'm always eager to learn, take initiative, and grow through new opportunities.
        </p>
      </div>

      {/* 4. Compact, Scannable Skills & Tools Section */}
      <div className="profile-skills-section">
        <div className="skills-section-header">
          <h3 className="section-mini-heading">Skills & Tools</h3>
          <span className="skills-count-hint">Verified Technical & Creative Toolkit</span>
        </div>

        <div className="skills-compact-grid">
          {skillCategories.map((group) => {
            const GroupIcon = group.Icon
            return (
              <div key={group.category} className="skill-compact-row">
                <div className="skill-row-title">
                  <GroupIcon size={13} strokeWidth={2.2} className="skill-row-icon" aria-hidden="true" />
                  <span>{group.category}</span>
                </div>
                <div className="skill-chips-row">
                  {group.skills.map((skill) => (
                    <span key={skill} className={`skill-chip-compact ${group.badgeClass}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 5. Training Highlight Card */}
      <div className="profile-training-card">
        <div className="training-icon-wrapper" aria-hidden="true">
          <Award size={18} strokeWidth={2} />
        </div>
        <div className="training-content">
          <div className="training-header">
            <h4 className="training-title">Uplift Code Camp</h4>
            <span className="training-year">2025</span>
          </div>
          <span className="training-role">Web Development Bootcamp</span>
          <p className="training-desc">
            Five-month front-end development training focused on HTML, CSS, JavaScript, UI design, and real-world projects.
          </p>
        </div>
      </div>

      {/* 6. Action Buttons with Working Download Résumé Button */}
      <div className="profile-actions-row">
        <button
          type="button"
          className="btn-primary"
          onClick={onOpenProjects}
        >
          <span>View Projects</span>
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </button>

        {/* Working Download Résumé Button */}
        <a
          href="/resume/Mish_Diola_Resume.pdf"
          download="Mish_Diola_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary btn-download-resume"
          title="Download Mish Diola's Résumé PDF"
        >
          <Download size={15} strokeWidth={2.2} aria-hidden="true" />
          <span>Download Résumé</span>
        </a>
      </div>
    </div>
  )
}

export default AboutWindow
