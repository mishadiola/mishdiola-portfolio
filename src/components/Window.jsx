import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './Window.css'

function Window({
  id,
  title,
  isOpen,
  isActive,
  zIndex = 10,
  accentColor = '#F6A4CB',
  onClose,
  onFocus,
  children,
  className = '',
}) {
  const windowRef = useRef(null)

  // Listen for Escape key to close the active window
  useEffect(() => {
    if (!isOpen || !isActive) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose && onClose(id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isActive, id, onClose])

  if (!isOpen) return null

  const handleClose = (e) => {
    e.stopPropagation()
    onClose && onClose(id)
  }

  return (
    <section
      ref={windowRef}
      id={`window-${id}`}
      className={`macos-window ${isActive ? 'is-active' : 'is-inactive'} ${className}`}
      style={{ zIndex }}
      onMouseDown={() => onFocus && onFocus(id)}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      tabIndex="-1"
    >
      {/* Window Title Bar */}
      <div className="window-header" onDoubleClick={() => onFocus && onFocus(id)}>
        {/* macOS Traffic Lights Window Controls (Left) */}
        <div className="traffic-lights" aria-label="Window controls">
          <button
            type="button"
            className="control-dot dot-close"
            onClick={handleClose}
            title="Close window (Esc)"
            aria-label="Close window"
          >
            <X className="dot-icon" size={7.5} strokeWidth={3} aria-hidden="true" />
          </button>
          <span className="control-dot dot-minimize" aria-hidden="true" title="Minimize"></span>
          <span className="control-dot dot-maximize" aria-hidden="true" title="Zoom"></span>
        </div>

        {/* Centered Filename Title */}
        <div className="window-title-tag">
          <span className="window-title-text">{title}</span>
        </div>

        {/* Right Header Area: Accent Detail + Clearly Visible 44x44px X Close Button */}
        <div className="window-header-actions">
          <span
            className="window-header-accent"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />

          <button
            type="button"
            className="window-close-button"
            onClick={handleClose}
            aria-label="Close window"
            title="Close window (Esc)"
          >
            <X size={17} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Window Body Content (Scrolls independently when content overflows) */}
      <div className="window-content">
        {children}
      </div>
    </section>
  )
}

export default Window
