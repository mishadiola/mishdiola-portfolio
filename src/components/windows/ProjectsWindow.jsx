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
        'A web-based maternal healthcare information system designed to support health tracking, resource management, and clinic workflows.',
      fullOverview:
        'A web-based maternal healthcare information system developed to improve healthcare monitoring and clinical record management.',
      contribution:
        'Primarily front-end and UI-focused development, translating requirements into user-friendly interfaces, and collaborating throughout system planning, development, and documentation.',
      technologies: null, // Resume does not specify tech stack for DASMOM+
      focusPills: ['Front-End Development', 'UI/UX Design', 'System Planning', 'Documentation'],
      gradient: 'linear-gradient(135deg, #FDE8F1 0%, #F9C0D9 50%, #E9D5FF 100%)',
      accentColor: '#db2777',
      Icon: HeartPulse,
      videoTitle: 'DASMOM+ Capstone Project Defense Presentation',
      videoUrl: 'https://drive.google.com/file/d/1bCj_EE7KoK_nmvoIuTgGQd1FPkjzGtYj/view?usp=sharing',
      videoEmbedUrl: 'https://drive.google.com/file/d/1bCj_EE7KoK_nmvoIuTgGQd1FPkjzGtYj/preview',
      screenshots: [
        '/images/projects/dasmom/preview.jpg',
        '/images/projects/dasmom/dashboard.jpg',
      ],
    },
    {
      id: 2,
      title: "POS System for Baig's Restaurant",
      fullName: "Point-of-Sale System for Baig's Restaurant",
      year: '2025',
      institution: 'Kolehiyo ng Lungsod ng Dasmariñas',
      category: 'Point-of-Sale System',
      shortDesc:
        'A web-based point-of-sale system supporting sales tracking, billing, and order management for restaurant operations.',
      fullOverview:
        'A web-based point-of-sale system supporting real-time sales tracking, table orders, and transactions management.',
      contribution:
        'System development and collaboration with stakeholders to understand operational requirements and translate them into functional system features.',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
      focusPills: ['POS Architecture', 'Order Management', 'Database Design'],
      gradient: 'linear-gradient(135deg, #FEF9C3 0%, #FFE184 50%, #FED7AA 100%)',
      accentColor: '#ca8a04',
      Icon: Receipt,
      videoTitle: "Baig's Restaurant POS System Presentation & Tour",
      videoUrl: 'https://drive.google.com/file/d/12qExcVbsegS4ye1VsSbEkSJL8uhRtQba/view?usp=sharing',
      videoEmbedUrl: 'https://drive.google.com/file/d/12qExcVbsegS4ye1VsSbEkSJL8uhRtQba/preview',
      screenshots: [
        '/images/projects/baigs-pos/pos-dashboard.jpg',
        '/images/projects/baigs-pos/order-screen.jpg',
      ],
    },
    {
      id: 3,
      title: 'FureverHome',
      fullName: 'FureverHome — Pet Adoption System',
      year: '2024',
      institution: 'Kolehiyo ng Lungsod ng Dasmariñas',
      category: 'Pet Adoption Web Application',
      shortDesc:
        'A web-based pet adoption platform featuring dual user and administrator portals for listing pets and processing applications.',
      fullOverview:
        'A web-based pet adoption system with dedicated interfaces for both prospective pet adopters and rescue shelter administrators.',
      contribution:
        'Developed a web-based pet adoption system with separate user and admin interfaces. Users can browse available pets and submit adoption applications, while administrators can manage pet records and adoption requests.',
      technologies: ['HTML', 'CSS', 'PHP', 'MySQL'],
      focusPills: ['User Portal', 'Admin Management', 'Application Workflow'],
      gradient: 'linear-gradient(135deg, #E0F2FE 0%, #A8D8FC 50%, #BBF7D0 100%)',
      accentColor: '#0284c7',
      Icon: Home,
      screenshots: [
        '/images/projects/fureverhome/adopt-portal.jpg',
        '/images/projects/fureverhome/admin-records.jpg',
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

          {/* Project Header Banner */}
          <div className="detail-header-card" style={{ background: activeProject.gradient }}>
            <span className="project-tag-pill">{activeProject.category}</span>
            <div className="detail-header-icon" aria-hidden="true">
              <activeProject.Icon size={32} strokeWidth={2} style={{ color: activeProject.accentColor }} />
            </div>
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

          {/* Screenshot Gallery Placeholder */}
          <div className="detail-content-block">
            <div className="detail-section-header">
              <ImageIcon size={15} strokeWidth={2.2} className="detail-section-icon" aria-hidden="true" />
              <h3>Interface Preview</h3>
            </div>
            <div className="gallery-placeholder-box">
              <activeProject.Icon size={24} strokeWidth={1.8} style={{ color: activeProject.accentColor }} aria-hidden="true" />
              <p className="gallery-note">
                Real screenshots can be placed in <code>public/images/projects/{activeProject.id === 1 ? 'dasmom' : activeProject.id === 2 ? 'baigs-pos' : 'fureverhome'}/</code>
              </p>
            </div>
          </div>

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
                  {/* Abstract Themed Visual Header */}
                  <div className="project-preview" style={{ background: project.gradient }}>
                    <span className="project-tag-pill">{project.category}</span>
                    <div className="project-preview-graphic" aria-hidden="true">
                      <div className="preview-graphic-glow">
                        <ProjectIcon size={24} strokeWidth={2} style={{ color: project.accentColor }} />
                      </div>
                    </div>
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
