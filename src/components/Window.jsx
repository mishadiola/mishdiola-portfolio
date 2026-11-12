import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Maximize2, Minimize2 } from 'lucide-react'
import './Window.css'

function Window({
  id,
  title,
  isOpen,
  isActive,
  zIndex = 10,
  accentColor = '#F6A4CB',
  position,
  layoutMode = 'floating', // 'floating' | 'snapped-left' | 'snapped-right' | 'maximized'
  isMobile = false,
  onClose,
  onFocus,
  onPositionChange,
  onLayoutModeChange,
  onSnapPreviewChange,
  children,
  className = '',
}) {
  const windowRef = useRef(null)
  const isDraggingRef = useRef(false)
  const dragStartPosRef = useRef({ x: 0, y: 0 })
  const initialWinPosRef = useRef({ x: 0, y: 0 })
  const activeSnapTargetRef = useRef(null)

  const [isDragging, setIsDragging] = useState(false)

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

  // Toggle maximize / restore
  const handleToggleMaximize = useCallback(() => {
    if (isMobile) return
    onFocus && onFocus(id)
    if (layoutMode === 'maximized') {
      onLayoutModeChange && onLayoutModeChange(id, 'floating')
    } else {
      onLayoutModeChange && onLayoutModeChange(id, 'maximized')
    }
  }, [id, isMobile, layoutMode, onFocus, onLayoutModeChange])

  // Dragging logic via Pointer Events (desktop only)
  const handlePointerDown = (e) => {
    if (isMobile) return
    // Only primary mouse button / single pointer
    if (e.button !== 0) return

    // Don't start drag if clicked on button or interactive control
    if (e.target.closest('button, a, input, textarea, select, [role="button"]')) {
      return
    }

    onFocus && onFocus(id)

    // Capture pointer
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // In case pointer capture fails
    }

    isDraggingRef.current = true
    setIsDragging(true)
    dragStartPosRef.current = { x: e.clientX, y: e.clientY }

    const curPos = position || { x: 0, y: 0 }
    let startX = curPos.x
    let startY = curPos.y

    // If window is maximized or snapped, dragging restores it to floating centered around pointer
    if (layoutMode !== 'floating' && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      // Approximate restored width (clamp between 420 and 540)
      const approxWidth = Math.min(520, window.innerWidth * 0.7)
      // Center restored window header under cursor
      startX = Math.max(12, Math.min(window.innerWidth - approxWidth - 12, e.clientX - approxWidth / 2))
      startY = Math.max(48, Math.min(window.innerHeight - 180, e.clientY - 22))

      onPositionChange && onPositionChange(id, { x: startX, y: startY })
      onLayoutModeChange && onLayoutModeChange(id, 'floating')
    }

    initialWinPosRef.current = { x: startX, y: startY }
    activeSnapTargetRef.current = null
    onSnapPreviewChange && onSnapPreviewChange(null)

    // Prevent text selection during drag
    e.preventDefault()
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || isMobile) return

    const deltaX = e.clientX - dragStartPosRef.current.x
    const deltaY = e.clientY - dragStartPosRef.current.y

    let newX = initialWinPosRef.current.x + deltaX
    let newY = initialWinPosRef.current.y + deltaY

    // Workspace boundary limits
    const topLimit = 42
    const bottomLimit = window.innerHeight - 80
    const leftLimit = -150
    const rightLimit = window.innerWidth - 100

    newX = Math.max(leftLimit, Math.min(rightLimit, newX))
    newY = Math.max(topLimit, Math.min(bottomLimit, newY))

    onPositionChange && onPositionChange(id, { x: newX, y: newY })

    // Snap detection based on pointer position
    const snapMargin = 32
    let detectedSnap = null

    if (e.clientX <= snapMargin) {
      detectedSnap = 'left'
    } else if (e.clientX >= window.innerWidth - snapMargin) {
      detectedSnap = 'right'
    } else if (e.clientY <= snapMargin + 20) {
      detectedSnap = 'top'
    }

    if (activeSnapTargetRef.current !== detectedSnap) {
      activeSnapTargetRef.current = detectedSnap
      onSnapPreviewChange && onSnapPreviewChange(detectedSnap)
    }
  }

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
    } catch {
      // ignore
    }

    const targetSnap = activeSnapTargetRef.current
    activeSnapTargetRef.current = null
    onSnapPreviewChange && onSnapPreviewChange(null)

    if (targetSnap === 'left') {
      onLayoutModeChange && onLayoutModeChange(id, 'snapped-left')
    } else if (targetSnap === 'right') {
      onLayoutModeChange && onLayoutModeChange(id, 'snapped-right')
    } else if (targetSnap === 'top') {
      onLayoutModeChange && onLayoutModeChange(id, 'maximized')
    }
  }

  const handlePointerCancel = (e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)
    activeSnapTargetRef.current = null
    onSnapPreviewChange && onSnapPreviewChange(null)
  }

  if (!isOpen) return null

  const handleClose = (e) => {
    e.stopPropagation()
    onClose && onClose(id)
  }

  // Handle double-click on title bar (empty area) to maximize/restore
  const handleTitleBarDoubleClick = (e) => {
    if (isMobile) return
    if (e.target.closest('button, a, input, [role="button"]')) return
    handleToggleMaximize()
  }

  // Compute inline layout styling for desktop
  const windowStyle = {
    zIndex,
  }

  if (!isMobile) {
    if (layoutMode === 'floating' && position) {
      windowStyle.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
      windowStyle.position = 'fixed'
      windowStyle.top = 0
      windowStyle.left = 0
      windowStyle.margin = 0
    }
  }

  const isSnappedOrMaximized = !isMobile && (layoutMode === 'snapped-left' || layoutMode === 'snapped-right' || layoutMode === 'maximized')

  return (
    <section
      ref={windowRef}
      id={`window-${id}`}
      className={`macos-window ${isActive ? 'is-active' : 'is-inactive'} mode-${layoutMode} ${isDragging ? 'is-dragging' : ''} ${className}`}
      style={windowStyle}
      onMouseDown={() => onFocus && onFocus(id)}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      tabIndex="-1"
    >
      {/* Window Title Bar (Draggable Header) */}
      <div
        className="window-header"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onDoubleClick={handleTitleBarDoubleClick}
      >
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
          <button
            type="button"
            className="control-dot dot-maximize"
            onClick={handleToggleMaximize}
            title={layoutMode === 'maximized' ? 'Restore window size' : 'Maximize window'}
            aria-label={layoutMode === 'maximized' ? 'Restore window size' : 'Maximize window'}
          >
            {layoutMode === 'maximized' ? (
              <Minimize2 className="dot-icon" size={7} strokeWidth={2.8} aria-hidden="true" />
            ) : (
              <Maximize2 className="dot-icon" size={7} strokeWidth={2.8} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Centered Filename Title & Drag Handle Indicator */}
        <div className="window-title-tag">
          <span className="window-title-text">{title}</span>
        </div>

        {/* Right Header Area: Accent Detail + Maximize Toggle + Dedicated X Close Button */}
        <div className="window-header-actions">
          <span
            className="window-header-accent"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />

          {!isMobile && (
            <button
              type="button"
              className="window-action-button window-maximize-button"
              onClick={handleToggleMaximize}
              aria-label={layoutMode === 'maximized' ? 'Restore window size' : 'Maximize window'}
              title={layoutMode === 'maximized' ? 'Restore window size (Double click)' : 'Maximize window (Double click)'}
            >
              {layoutMode === 'maximized' ? (
                <Minimize2 size={14} strokeWidth={2.4} aria-hidden="true" />
              ) : (
                <Maximize2 size={14} strokeWidth={2.4} aria-hidden="true" />
              )}
            </button>
          )}

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
