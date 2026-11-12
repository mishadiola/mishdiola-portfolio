import { useState, useCallback, useEffect } from 'react'
import StatusBar from './components/StatusBar'
import Dock from './components/Dock'
import Window from './components/Window'
import AboutWindow from './components/windows/AboutWindow'
import ProjectsWindow from './components/windows/ProjectsWindow'
import ContactsWindow from './components/windows/ContactsWindow'
import './App.css'

function App() {
  // Mobile viewport detection (<= 768px)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Desktop: About Me & Projects open by default in balanced arrangement. Contacts closed by default.
  // Mobile: Clean homescreen initially (all windows closed); tapping a folder opens focused single panel.
  const [openWindows, setOpenWindows] = useState(() => {
    const isNarrow = typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    if (isNarrow) {
      return { about: false, projects: false, contacts: false }
    }
    return { about: true, projects: true, contacts: false }
  })

  // Currently focused/active window
  const [activeWindow, setActiveWindow] = useState(() => {
    const isNarrow = typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    return isNarrow ? null : 'about'
  })

  // Dynamic window stacking (z-index)
  const [windowZIndices, setWindowZIndices] = useState({
    about: 10,
    projects: 11,
    contacts: 12,
  })

  const [zIndexCounter, setZIndexCounter] = useState(15)

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

  // Dock item selection handler
  const handleSelectFolder = useCallback((folderId) => {
    if (openWindows[folderId]) {
      // On desktop: if active, toggle/close; if in background, bring to front
      // On mobile: if active, close back to homescreen
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

      {/* 4. Desktop Main Canvas & Interactive Windows Stage */}
      <main className="desktop-canvas">
        {/* If all windows are closed, show clean desktop welcome state */}
        {!hasAnyOpenWindow && (
          <div className="desktop-wallpaper-hero">
            <h1 className="hero-title">Mish's Portfolio</h1>
            <p className="hero-subtitle">
              Personal digital homescreen & interactive portfolio
            </p>
            <div className="hero-button-group">
              <button
                type="button"
                className="btn-primary btn-small"
                onClick={() => openWindow('about')}
              >
                Open About Me
              </button>
              <button
                type="button"
                className="btn-secondary btn-small"
                onClick={() => openWindow('projects')}
              >
                Open Projects
              </button>
            </div>
          </div>
        )}

        {/* Windows Stage (Balanced desktop arrangement) */}
        <div className="windows-stage">
          {/* Window 1: About Me (mish.profile) - Pastel Pink #F6A4CB */}
          <Window
            id="about"
            title="mish.profile"
            accentColor="#F6A4CB"
            isOpen={isWindowVisible('about')}
            isActive={activeWindow === 'about'}
            zIndex={windowZIndices.about}
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
