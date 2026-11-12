import { useState, useEffect } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  HeartPulse,
  Receipt,
  Home,
  Calendar,
  Building2,
  Code2,
  UserCheck,
  FileText,
  ImageIcon,
  Video,
  ExternalLink
} from 'lucide-react'
import './Windows.css'

function ProjectsWindow({ onOpenContacts }) {
  // Active detail view state: null = show all project cards, number = project id
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  // Listen for Escape key to close the detail view first
  useEffect(() => {
    if (!selectedProjectId) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setSelectedProjectId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProjectId])

  // Real academic projects data structure
  const projects = [
    {
      id: 1,
      title: 'DASMOM+',
      fullName: 'Maternal Healthcare Monitoring & Resource Management System',
      year: 'Ongoing',
      institution: 'Kolehiyo ng Lungsod ng Dasmariñas',
      category: 'Healthcare Information System',
      shortDesc:
        'A web-based maternal healthcare information system developed as an academic project. My main contributions focused on front-end development, UI design, and collaboration during system planning and documentation.',
      fullOverview:
        'A web-based maternal healthcare information system developed as an academic project to support clinic workflows, health tracking, and resource management.',
      contribution:
        'My main contributions focused on front-end development, UI design, and collaboration during system planning and documentation.',
      technologies: null, // Sourced from resume; focus areas shown below
      focusPills: ['Front-End Development', 'UI/UX Design', 'System Planning', 'Documentation'],
      gradient: 'linear-gradient(135deg, #FDE8F1 0%, #F9C0D9 50%, #E9D5FF 100%)',
      accentColor: '#db2777',
      Icon: HeartPulse,
      coverImage: '/images/projects/dasmom-cover.png',
      coverAlt: 'DASMOM+ Maternal Healthcare Monitoring and Resource Management System Dashboard Cover',
      videoTitle: 'DASMOM+ Capstone Project Defense Presentation',
      videoUrl: 'https://drive.google.com/file/d/1bCj_EE7KoK_nmvoIuTgGQd1FPkjzGtYj/view?usp=sharing',
      videoEmbedUrl: 'https://drive.google.com/file/d/1bCj_EE7KoK_nmvoIuTgGQd1FPkjzGtYj/preview',
      screenshots: [], // Only rendered if real screenshots exist
    },
    {
      id: 2,
      title: "POS System for Baig's Restaurant",
      fullName: "Point-of-Sale System for Baig's Restaurant",
      year: '2025',
      institution: 'Kolehiyo ng Lungsod ng Dasmariñas',
      category: 'Point-of-Sale System',
      shortDesc:
        'A web-based point-of-sale system designed to support sales tracking and order management. Developed using PHP, MySQL, HTML, and CSS.',
      fullOverview:
        'A web-based point-of-sale system designed to support real-time sales tracking, table orders, and transactions management for restaurant operations.',
      contribution:
        'System development using PHP, MySQL, HTML, and CSS, collaborating with stakeholders to translate operational requirements into functional system features.',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
      focusPills: ['POS Architecture', 'Order Management', 'Database Design'],
      gradient: 'linear-gradient(135deg, #FEF9C3 0%, #FFE184 50%, #FED7AA 100%)',
      accentColor: '#ca8a04',
      Icon: Receipt,
      coverImage: '/images/projects/baigs-pos-cover.png',
      coverAlt: "Point-of-Sale System for Baig's Restaurant Header Artwork Cover",
      videoTitle: "Baig's Restaurant POS System Presentation & Tour",
      videoUrl: 'https://drive.google.com/file/d/12qExcVbsegS4ye1VsSbEkSJL8uhRtQba/view?usp=sharing',
      videoEmbedUrl: 'https://drive.google.com/file/d/12qExcVbsegS4ye1VsSbEkSJL8uhRtQba/preview',
      screenshots: [], // Only rendered if real screenshots exist
    },
    {
      id: 3,
      title: 'FureverHome',
      fullName: 'FureverHome — Pet Adoption System',
      year: '2024',
      institution: 'Kolehiyo ng Lungsod ng Dasmariñas',
      category: 'Pet Adoption Web Application',
      shortDesc:
        'A web-based pet adoption platform featuring separate user and administrator interfaces. Users can browse pets and submit adoption applications, while administrators can manage pet records and adoption requests.',
      fullOverview:
        'A web-based pet adoption system with dedicated interfaces for both prospective pet adopters and rescue shelter administrators.',
      contribution:
        'Developed a web-based pet adoption system with separate user and admin interfaces. Users can browse available pets and submit adoption applications, while administrators can manage pet records and adoption requests.',
      technologies: ['HTML', 'CSS', 'PHP', 'MySQL'],
      focusPills: ['User Portal', 'Admin Management', 'Application Workflow'],
      gradient: 'linear-gradient(135deg, #E0F2FE 0%, #A8D8FC 50%, #BBF7D0 100%)',
      accentColor: '#0284c7',
      Icon: Home,
      coverImage: '/images/projects/fureverhome-cover.png',
      coverAlt: 'FureverHome Pet Adoption Platform Artwork Cover',
      screenshots: [
        {
          src: '/images/projects/fureverhome/fureverhome_dashboard.png',
          alt: 'FureverHome Pet Adoption System Dashboard Preview',
        },
      ],
    },
  ]

  const activeProject = projects.find((p) => p.id === selectedProjectId)

  return (
    <div className="projects-window-body">
      {/* ========================================================
          A. PROJECT DETAIL VIEW (When a project is clicked)
          ======================================================== */}
      {activeProject ? (
        <div className="project-detail-view">
          {/* Back Navigation Bar */}
          <div className="detail-top-nav">
            <button
              type="button"
              className="btn-back-projects"
              onClick={() => setSelectedProjectId(null)}
              aria-label="Back to all projects"
            >
              <ArrowLeft size={15} strokeWidth={2.4} aria-hidden="true" />
              <span>Back to Projects</span>
            </button>

            <span className="detail-nav-counter">
              Project 0{activeProject.id} of 0{projects.length}
            </span>
          </div>

          {/* Project Header Banner (Custom Cover Artwork) */}
          <div className="detail-header-card" style={{ background: activeProject.gradient }}>
            {activeProject.coverImage ? (
              <img
                src={activeProject.coverImage}
                alt={activeProject.coverAlt}
                className="detail-header-cover-img"
                loading="eager"
              />
            ) : (
              <div className="detail-header-icon" aria-hidden="true">
                <activeProject.Icon size={32} strokeWidth={2} style={{ color: activeProject.accentColor }} />
              </div>
            )}
            <span className="project-tag-pill">{activeProject.category}</span>
          </div>

          {/* Title & Metadata */}
          <div className="detail-title-section">
            <div className="detail-meta-pills">
              <span className="project-year-badge">
                <Calendar size={11} strokeWidth={2.2} aria-hidden="true" />
                <span>{activeProject.year}</span>
              </span>
              <span className="project-institution-badge">
                <Building2 size={11} strokeWidth={2.2} aria-hidden="true" />
                <span>{activeProject.institution}</span>
              </span>
            </div>

            <h2 className="detail-project-title">{activeProject.title}</h2>
            {activeProject.fullName !== activeProject.title && (
              <p className="detail-project-fullname">{activeProject.fullName}</p>
            )}
          </div>

          {/* Overview Block */}
          <div className="detail-content-block">
            <div className="detail-section-header">
              <FileText size={15} strokeWidth={2.2} className="detail-section-icon" aria-hidden="true" />
              <h3>Project Overview</h3>
            </div>
            <p className="detail-body-text">{activeProject.fullOverview}</p>
          </div>

          {/* Contribution Block */}
          <div className="detail-content-block">
            <div className="detail-section-header">
              <UserCheck size={15} strokeWidth={2.2} className="detail-section-icon" aria-hidden="true" />
              <h3>My Contribution</h3>
            </div>
            <p className="detail-body-text">{activeProject.contribution}</p>
          </div>

          {/* Technologies Block (Only confirmed technologies displayed) */}
          <div className="detail-content-block">
            <div className="detail-section-header">
              <Code2 size={15} strokeWidth={2.2} className="detail-section-icon" aria-hidden="true" />
              <h3>{activeProject.technologies ? 'Technologies Used' : 'Focus Areas'}</h3>
            </div>
            {activeProject.technologies ? (
              <div className="detail-tech-chips">
                {activeProject.technologies.map((tech) => (
                  <span key={tech} className="tech-badge-pill">
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <div className="detail-tech-chips">
                {activeProject.focusPills.map((focus) => (
                  <span key={focus} className="tech-badge-pill pill-focus">
                    {focus}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Real Additional Screenshot Gallery (Conditionally rendered ONLY if screenshots exist) */}
          {Array.isArray(activeProject.screenshots) && activeProject.screenshots.length > 0 && (
            <div className="detail-content-block">
              <div className="detail-section-header">
                <ImageIcon size={15} strokeWidth={2.2} className="detail-section-icon" aria-hidden="true" />
                <h3>Interface Screenshots</h3>
              </div>
              <div className="detail-screenshots-grid">
                {activeProject.screenshots.map((item, index) => {
                  const src = typeof item === 'string' ? item : item.src
                  const alt = typeof item === 'string' ? `${activeProject.title} Screenshot ${index + 1}` : item.alt
                  return (
                    <div key={src || index} className="screenshot-item-box">
                      <img
                        src={src}
                        alt={alt}
                        className="screenshot-preview-img"
                        loading="lazy"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Project Defense Video Presentation Section (Only for DASMOM+ & Baig's POS) */}
          {activeProject.videoEmbedUrl && (
            <div className="detail-content-block project-video-block">
              <div className="detail-section-header project-video-header">
                <div className="video-header-title-row">
                  <Video size={16} strokeWidth={2.2} className="detail-section-icon video-icon-accent" aria-hidden="true" />
                  <h3>Project Video Presentation</h3>
                </div>
                <a
                  href={activeProject.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-drive-link"
                  title="Open video in Google Drive (new tab)"
                >
                  <span>Open in Google Drive</span>
                  <ExternalLink size={12} strokeWidth={2.2} aria-hidden="true" />
                </a>
              </div>

              <p className="project-video-subtitle">
                Watch the video presentation we prepared for our project defense.
              </p>

              {/* Responsive 16:9 Video Container */}
              <div className="project-video-player-container">
                <iframe
                  src={activeProject.videoEmbedUrl}
                  title={activeProject.videoTitle}
                  className="project-video-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <p className="project-video-footnote">
                Note: Video playback uses Google Drive. If playback does not start directly, click "Open in Google Drive" above to view with your authorized account.
              </p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="detail-actions-footer">
            <button
              type="button"
              className="btn-secondary btn-small"
              onClick={() => setSelectedProjectId(null)}
            >
              ← Back to Project List
            </button>

            <button
              type="button"
              className="btn-primary btn-small"
              onClick={onOpenContacts}
            >
              <span>Inquire About Project</span>
              <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================
           B. CONCISE PROJECT LIST (Interactive cards)
           ======================================================== */
        <>
          {/* Header Info */}
          <div className="projects-header">
            <div>
              <h2 className="projects-title">Academic Projects</h2>
              <p className="projects-subtitle">
                Web-based information systems developed at Kolehiyo ng Lungsod ng Dasmariñas.
              </p>
            </div>
            <div className="projects-count-chip">
              <span>3 Featured Works</span>
            </div>
          </div>

          {/* Grid of Concise Project Cards */}
          <div className="projects-list">
            {projects.map((project) => {
              const ProjectIcon = project.Icon

              return (
                <article key={project.id} className="project-card">
                  {/* Custom Themed Visual Header Image */}
                  <div className="project-preview" style={{ background: project.gradient }}>
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.coverAlt}
                        className="project-preview-cover-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="project-preview-graphic" aria-hidden="true">
                        <div className="preview-graphic-glow">
                          <ProjectIcon size={24} strokeWidth={2} style={{ color: project.accentColor }} />
                        </div>
                      </div>
                    )}
                    <span className="project-tag-pill">{project.category}</span>
                  </div>

                  {/* Project Details */}
                  <div className="project-details">
                    <div className="project-meta-row">
                      <div className="project-meta-left">
                        <span className="project-year-badge">
                          <Calendar size={11} strokeWidth={2.2} aria-hidden="true" />
                          <span>{project.year}</span>
                        </span>
                        <span className="project-institution-badge">
                          <Building2 size={11} strokeWidth={2.2} aria-hidden="true" />
                          <span>KLD</span>
                        </span>
                      </div>
                      <span className="project-number">0{project.id}</span>
                    </div>

                    <h3 className="project-name">{project.title}</h3>
                    {project.fullName !== project.title && (
                      <p className="project-fullname-sub">{project.fullName}</p>
                    )}

                    {/* Concise 1-2 sentence description */}
                    <p className="project-desc">{project.shortDesc}</p>

                    {/* Confirmed Tech Chips / Focus Pills */}
                    <div className="project-tags-block">
                      <div className="project-tags">
                        {(project.technologies || project.focusPills).slice(0, 4).map((item) => (
                          <span key={item} className="tag-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Clearly Labeled 'View Project' Action Button */}
                    <div className="project-card-footer">
                      <button
                        type="button"
                        className="btn-view-project"
                        onClick={() => setSelectedProjectId(project.id)}
                        aria-label={`View details for ${project.title}`}
                      >
                        <span>View Project</span>
                        <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Footer Note */}
          <div className="projects-footer">
            <p>Interested in learning more about these projects?</p>
            <button
              type="button"
              className="btn-secondary btn-small"
              onClick={onOpenContacts}
            >
              <span>Contact Mish</span>
              <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectsWindow
