import { useState, useCallback, useEffect } from 'react'
import StatusBar from './components/StatusBar'
import Dock from './components/Dock'
import Window from './components/Window'
import AboutWindow from './components/windows/AboutWindow'
import ProjectsWindow from './components/windows/ProjectsWindow'
import ContactsWindow from './components/windows/ContactsWindow'
import './App.css'

function getDefaultPositions() {
  if (typeof window === 'undefined') {
    return {
      about: { x: 80, y: 70 },
      projects: { x: 540, y: 70 },
      contacts: { x: 280, y: 110 },
    }
  }

  const w = window.innerWidth
  const h = window.innerHeight

  if (w <= 768) {
    return {
      about: { x: 12, y: 48 },
      projects: { x: 12, y: 48 },
      contacts: { x: 12, y: 48 },
    }
  }

  // Calculated desktop balanced positions
  const aboutW = 440
  const projectsW = 530
  const totalW = aboutW + projectsW + 20
  let startX = Math.max(30, Math.floor((w - totalW) / 2))
  const startY = Math.max(56, Math.floor((h - 580) / 2))

  return {
    about: { x: startX, y: startY },
    projects: { x: startX + aboutW + 20, y: startY },
    contacts: { x: Math.max(30, Math.floor((w - 450) / 2)), y: startY + 25 },
  }
}

function App() {
  // Mobile viewport detection (<= 768px)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  // Initial load behavior: ALL windows are closed by default on desktop and mobile.
  // Only the centered welcome introduction card is displayed initially.
  const [openWindows, setOpenWindows] = useState({
    about: false,
    projects: false,
    contacts: false,
  })

  // Window layout modes: 'floating' | 'snapped-left' | 'snapped-right' | 'maximized'
  const [windowLayoutModes, setWindowLayoutModes] = useState({
    about: 'floating',
    projects: 'floating',
    contacts: 'floating',
  })

  // Window desktop coordinates { x, y }
  const [windowPositions, setWindowPositions] = useState(getDefaultPositions)

  // Active snap target preview: null | 'left' | 'right' | 'top'
  const [activeSnapPreview, setActiveSnapPreview] = useState(null)

  // Currently focused/active window (null initially since all are closed)
  const [activeWindow, setActiveWindow] = useState(null)

  // Dynamic window stacking (z-index)
  const [windowZIndices, setWindowZIndices] = useState({
    about: 10,
    projects: 11,
    contacts: 12,
  })

  const [zIndexCounter, setZIndexCounter] = useState(15)

  // Resize handler to update mobile state & safely clamp positions
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      if (!mobile) {
        // Clamp desktop floating positions within visible workspace
        setWindowPositions((prev) => {
          const w = window.innerWidth
          const h = window.innerHeight
          const updated = { ...prev }
          Object.keys(updated).forEach((id) => {
            const p = updated[id]
            if (p) {
              updated[id] = {
                x: Math.max(-100, Math.min(w - 120, p.x)),
                y: Math.max(44, Math.min(h - 100, p.y)),
              }
            }
          })
          return updated
        })
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Bring a window to the front
  const bringToFront = useCallback((windowId) => {
    setActiveWindow(windowId)
    setZIndexCounter((prevCounter) => {
      const nextCounter = prevCounter + 1
      setWindowZIndices((prevZ) => ({
        ...prevZ,
        [windowId]: nextCounter,
      }))
      return nextCounter
    })
  }, [])

  // Open a specific window and focus it
  const openWindow = useCallback((windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: true,
    }))
    bringToFront(windowId)
  }, [bringToFront])

  // Close a specific window without automatically reopening it
  const closeWindow = useCallback((windowId) => {
    setOpenWindows((prev) => {
      const updated = { ...prev, [windowId]: false }

      // If the closed window was active, activate the next remaining open window with highest zIndex
      if (activeWindow === windowId) {
        const remainingOpen = Object.keys(updated).filter((key) => updated[key])
        if (remainingOpen.length > 0) {
          const nextActive = remainingOpen.reduce((highest, current) =>
            (windowZIndices[current] || 0) > (windowZIndices[highest] || 0) ? current : highest
          )
          setActiveWindow(nextActive)
        } else {
          setActiveWindow(null)
        }
      }

      return updated
    })
  }, [activeWindow, windowZIndices])

  // Update window position during or after dragging
  const handlePositionChange = useCallback((windowId, newPos) => {
    setWindowPositions((prev) => ({
      ...prev,
      [windowId]: newPos,
    }))
  }, [])

  // Update window layout mode (e.g. snapped or maximized)
  const handleLayoutModeChange = useCallback((windowId, newMode) => {
    setWindowLayoutModes((prev) => ({
      ...prev,
      [windowId]: newMode,
    }))
  }, [])

  // Dock item selection handler
  const handleSelectFolder = useCallback((folderId) => {
    if (openWindows[folderId]) {
      // If active, toggle/close; if in background, bring to front
      if (activeWindow === folderId) {
        closeWindow(folderId)
      } else {
        bringToFront(folderId)
      }
    } else {
      openWindow(folderId)
    }
  }, [openWindows, activeWindow, closeWindow, bringToFront, openWindow])

  // Check if any window is open
  const hasAnyOpenWindow = Object.values(openWindows).some(Boolean)

  // Visibility logic: on mobile, show only active window; on desktop, show all open windows
  const isWindowVisible = (windowId) => {
    if (!openWindows[windowId]) return false
    if (isMobile) return activeWindow === windowId
    return true
  }

  return (
    <div className="homescreen">
      {/* 1. Top OS Status Bar */}
      <StatusBar />

      {/* 2. Graph Paper Grid & Ambient Pastel Glows */}
      <div className="background-grid" aria-hidden="true"></div>
      <div className="ambient-glow glow-peach" aria-hidden="true"></div>
      <div className="ambient-glow glow-purple" aria-hidden="true"></div>
      <div className="ambient-glow glow-pink" aria-hidden="true"></div>

      {/* 3. Decorative Corner Stickers (Artwork preserved) */}
      <div className="sticker-flower" title="Flower Sticker" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="petal-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb4c8" />
              <stop offset="80%" stopColor="#ff85a2" />
              <stop offset="100%" stopColor="#f43f5e" />
            </radialGradient>
            <radialGradient id="center-grad" cx="40%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <filter id="sticker-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#f43f5e" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#sticker-shadow)">
            <circle cx="50" cy="22" r="17" fill="url(#petal-grad)" />
            <circle cx="76" cy="41" r="17" fill="url(#petal-grad)" />
            <circle cx="66" cy="74" r="17" fill="url(#petal-grad)" />
            <circle cx="34" cy="74" r="17" fill="url(#petal-grad)" />
            <circle cx="24" cy="41" r="17" fill="url(#petal-grad)" />
            <circle cx="50" cy="50" r="16" fill="url(#center-grad)" />
          </g>
        </svg>
      </div>

      <div className="sticker-smiley" title="Smiley Sticker" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="smiley-grad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>
            <filter id="smiley-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#ca8a04" floodOpacity="0.3" />
            </filter>
          </defs>
          <g filter="url(#smiley-shadow)">
            <circle cx="50" cy="50" r="44" fill="url(#smiley-grad)" />
            <ellipse cx="36" cy="42" rx="4.5" ry="6.5" fill="#713f12" />
            <ellipse cx="64" cy="42" rx="4.5" ry="6.5" fill="#713f12" />
            <path
              d="M34 58 C 42 72, 58 72, 66 58"
              stroke="#713f12"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* Edge Snap Feedback Preview Overlay */}
      {!isMobile && activeSnapPreview && (
        <div
          className={`snap-preview-indicator snap-preview-${activeSnapPreview}`}
          aria-hidden="true"
        />
      )}

      {/* 4. Desktop Main Canvas & Interactive Windows Stage */}
      <main className="desktop-canvas">
        {/* If all windows are closed, show refined centered welcome introduction card */}
        {!hasAnyOpenWindow && (
          <div className="desktop-wallpaper-hero">
            <h1 className="hero-title">Miss Diola's Portfolio</h1>
            <p className="hero-subtitle">
              Hello and welcome to my portfolio — a curated space for my projects, background, and creative work.
            </p>
            <div className="hero-button-group">
              <button
                type="button"
                className="btn-primary btn-intro"
                onClick={() => openWindow('about')}
              >
                About Me
              </button>
              <button
                type="button"
                className="btn-secondary btn-intro"
                onClick={() => openWindow('projects')}
              >
                Projects
              </button>
            </div>
          </div>
        )}

        {/* Windows Stage */}
        <div className="windows-stage">
          {/* Window 1: About Me (mish.profile) - Pastel Pink #F6A4CB */}
          <Window
            id="about"
            title="mish.profile"
            accentColor="#F6A4CB"
            isOpen={isWindowVisible('about')}
            isActive={activeWindow === 'about'}
            zIndex={windowZIndices.about}
            position={windowPositions.about}
            layoutMode={windowLayoutModes.about}
            isMobile={isMobile}
            onPositionChange={handlePositionChange}
            onLayoutModeChange={handleLayoutModeChange}
            onSnapPreviewChange={setActiveSnapPreview}
            onClose={closeWindow}
            onFocus={bringToFront}
            className="window-about"
          >
            <AboutWindow
              onOpenProjects={() => openWindow('projects')}
              onOpenContacts={() => openWindow('contacts')}
            />
          </Window>

          {/* Window 2: Projects (mish.projects) - Pastel Blue #8CCBFA */}
          <Window
            id="projects"
            title="mish.projects"
            accentColor="#8CCBFA"
            isOpen={isWindowVisible('projects')}
            isActive={activeWindow === 'projects'}
            zIndex={windowZIndices.projects}
            position={windowPositions.projects}
            layoutMode={windowLayoutModes.projects}
            isMobile={isMobile}
            onPositionChange={handlePositionChange}
            onLayoutModeChange={handleLayoutModeChange}
            onSnapPreviewChange={setActiveSnapPreview}
            onClose={closeWindow}
            onFocus={bringToFront}
            className="window-projects"
          >
            <ProjectsWindow onOpenContacts={() => openWindow('contacts')} />
          </Window>

          {/* Window 3: Contacts (mish.contacts) - Pastel Yellow #FFD45E */}
          <Window
            id="contacts"
            title="mish.contacts"
            accentColor="#FFD45E"
            isOpen={isWindowVisible('contacts')}
            isActive={activeWindow === 'contacts'}
            zIndex={windowZIndices.contacts}
            position={windowPositions.contacts}
            layoutMode={windowLayoutModes.contacts}
            isMobile={isMobile}
            onPositionChange={handlePositionChange}
            onLayoutModeChange={handleLayoutModeChange}
            onSnapPreviewChange={setActiveSnapPreview}
            onClose={closeWindow}
            onFocus={bringToFront}
            className="window-contacts"
          >
            <ContactsWindow />
          </Window>
        </div>
      </main>

      {/* 5. Bottom Navigation Dock */}
      <Dock
        activeFolder={activeWindow}
        openFolders={openWindows}
        onSelectFolder={handleSelectFolder}
      />
    </div>
  )
}

export default App
