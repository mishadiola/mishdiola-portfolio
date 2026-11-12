import { useState } from 'react'
import { Mail, Check, ArrowUpRight, MapPin, Copy, Pin } from 'lucide-react'
import './Windows.css'

// Consistent Lucide-style vector icon for LinkedIn
function LinkedInIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function ContactsWindow() {
  const [copied, setCopied] = useState(false)
  const realEmail = 'diolamish.s@gmail.com'
  const linkedInUrl = 'https://www.linkedin.com/in/mish-diola/'

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(realEmail).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="contacts-window-body">
      {/* Header Info */}
      <div className="contacts-header">
        <div className="contacts-header-badge">
          <span className="live-dot"></span>
          <span>Open for Opportunities</span>
        </div>
        <h2 className="contacts-title">Let's Connect</h2>
        <p className="contacts-subtitle">
          Have an inquiry, project collaboration, or internship opportunity in mind?
          Feel free to reach out via email or connect on LinkedIn.
        </p>
      </div>

      {/* Real Contact Action Cards */}
      <div className="contact-cards-grid">
        {/* 1. Email Card */}
        <div className="contact-card">
          <div className="contact-card-top">
            <div className="contact-icon-wrapper icon-pink">
              <Mail size={18} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="contact-info">
              <span className="contact-label">Email Address</span>
              <span className="contact-subtext">Direct inbox for all inquiries</span>
            </div>
          </div>

          <div className="contact-card-bottom">
            <span className="contact-handle-text">{realEmail}</span>
            <div className="contact-actions-cluster">
              <button
                type="button"
                className={`contact-action-btn ${copied ? 'is-copied' : ''}`}
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} strokeWidth={2} aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${realEmail}`}
                className="contact-action-btn btn-accent-link"
              >
                <span>Email Me</span>
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. LinkedIn Card */}
        <div className="contact-card">
          <div className="contact-card-top">
            <div className="contact-icon-wrapper icon-blue">
              <LinkedInIcon size={18} aria-hidden="true" />
            </div>
            <div className="contact-info">
              <span className="contact-label">LinkedIn</span>
              <span className="contact-subtext">Professional profile & academic journey</span>
            </div>
          </div>

          <div className="contact-card-bottom">
            <span className="contact-handle-text">linkedin.com/in/mish-diola</span>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn btn-accent-link"
            >
              <span>Connect</span>
              <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 3. Location Card */}
        <div className="contact-card location-card">
          <div className="contact-card-top">
            <div className="contact-icon-wrapper icon-amber">
              <MapPin size={18} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="contact-info">
              <span className="contact-label">Location</span>
              <span className="contact-subtext">Philippines</span>
            </div>
          </div>

          <div className="contact-card-bottom">
            <span className="contact-handle-text location-text">
              City of Dasmariñas, Cavite, Philippines
            </span>
          </div>
        </div>
      </div>

      {/* Note Card */}
      <div className="contacts-note-card">
        <div className="note-icon-wrapper" aria-hidden="true">
          <Pin size={16} strokeWidth={2.2} />
        </div>
        <p className="note-text">
          Fourth-year Information Systems student at Kolehiyo ng Lungsod ng Dasmariñas.
          Eager to contribute technical skills and creative problem-solving to practical digital projects.
        </p>
      </div>
    </div>
  )
}

export default ContactsWindow
