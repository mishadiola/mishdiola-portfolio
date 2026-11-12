import './Dock.css'

function Dock({ activeFolder, openFolders = {}, onSelectFolder }) {
  // Exactly THREE main folders with refined pastel colors
  const folders = [
    {
      id: 'about',
      title: 'About Me',
      color: '#F6A4CB', // Pastel Pink
      darkColor: '#D87A9F',
      tabColor: '#F9B7D5',
      lightColor: '#FDF2F7',
    },
    {
      id: 'projects',
      title: 'Projects',
      color: '#8CCBFA', // Pastel Blue
      darkColor: '#5EA3DB',
      tabColor: '#A8D8FC',
      lightColor: '#F0F8FF',
    },
    {
      id: 'contacts',
      title: 'Contacts',
      color: '#FFD45E', // Pastel Yellow
      darkColor: '#DCAB27',
      tabColor: '#FFE084',
      lightColor: '#FFFDF5',
    },
  ]

  return (
    <nav className="dock-container" aria-label="Main navigation dock">
      <div className="dock-pill">
        {folders.map((folder) => {
          const isOpen = Boolean(openFolders[folder.id])
          const isActive = activeFolder === folder.id

          return (
            <button
              key={folder.id}
              type="button"
              className={`dock-item ${isActive ? 'is-active' : ''} ${isOpen ? 'is-open' : ''}`}
              onClick={() => onSelectFolder && onSelectFolder(folder.id)}
              aria-label={`${isOpen ? 'Focus or toggle' : 'Open'} ${folder.title} folder`}
              aria-expanded={isOpen}
            >
              {/* Dimensional Vector Folder Icon */}
              <div className="folder-icon-wrapper">
                <svg
                  className="folder-icon"
                  viewBox="0 0 54 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    {/* Gradient for the folder back & tab */}
                    <linearGradient id={`grad-tab-${folder.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={folder.tabColor} />
                      <stop offset="100%" stopColor={folder.color} />
                    </linearGradient>

                    {/* Gradient for the folder back body */}
                    <linearGradient id={`grad-back-${folder.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={folder.color} />
                      <stop offset="100%" stopColor={folder.darkColor} />
                    </linearGradient>

                    {/* Gradient for the front flap */}
                    <linearGradient id={`grad-front-${folder.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={folder.tabColor} />
                      <stop offset="40%" stopColor={folder.color} />
                      <stop offset="100%" stopColor={folder.darkColor} />
                    </linearGradient>

                    {/* Realistic soft drop shadow filter */}
                    <filter id={`shadow-${folder.id}`} x="-15%" y="-15%" width="130%" height="140%">
                      <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.12" />
                    </filter>
                  </defs>

                  {/* 1. Back Tab & Wall */}
                  <path
                    d="M 5 10 C 5 7.2 7.2 5 10 5 L 21 5 C 22.8 5 24.4 6 25.2 7.6 L 27.2 11.2 C 27.8 12.2 28.8 13 30 13 L 44 13 C 46.8 13 49 15.2 49 18 L 49 35 C 49 37.8 46.8 40 44 40 L 10 40 C 7.2 40 5 37.8 5 35 Z"
                    fill={`url(#grad-back-${folder.id})`}
                  />

                  {/* 2. Interior Documents Peeking Out */}
                  <rect
                    x="10"
                    y="9"
                    width="34"
                    height="20"
                    rx="3"
                    fill="#ffffff"
                    opacity="0.95"
                  />
                  {/* Subtle document line accents */}
                  <line x1="14" y1="13" x2="26" y2="13" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="14" y1="17" x2="38" y2="17" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />

                  {/* 3. Dimensional Front Flap */}
                  <path
                    d="M 4 17 C 4 14.2 6.2 12 9 12 L 45 12 C 47.8 12 50 14.2 50 17 L 50 36 C 50 38.8 47.8 41 45 41 L 9 41 C 6.2 41 4 38.8 4 36 Z"
                    fill={`url(#grad-front-${folder.id})`}
                    filter={`url(#shadow-${folder.id})`}
                  />

                  {/* 4. Glossy Highlight Strip on Front Flap Lip */}
                  <path
                    d="M 9 13 L 45 13 C 47.2 13 49 14.8 49 17 C 49 17.3 48.8 17.5 48.5 17.5 L 5.5 17.5 C 5.2 17.5 5 17.3 5 17 C 5 14.8 6.8 13 9 13 Z"
                    fill="#ffffff"
                    opacity="0.45"
                  />
                </svg>
              </div>

              {/* Folder Label */}
              <span className="folder-label">{folder.title}</span>

              {/* macOS Dock Indicator Dot */}
              <span className="dock-indicator" aria-hidden="true"></span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Dock
