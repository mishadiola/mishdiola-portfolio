import { useState, useEffect } from 'react'
import { Sparkle } from 'lucide-react'
import './StatusBar.css'

function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Keep digital clock updated live every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format date and time matching the homescreen style (e.g., "Thu 12 Nov 15:48")
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dayName = days[currentTime.getDay()]
  const dayNum = currentTime.getDate()
  const monthName = months[currentTime.getMonth()]
  const hours = String(currentTime.getHours()).padStart(2, '0')
  const minutes = String(currentTime.getMinutes()).padStart(2, '0')

  const fullDateTime = `${dayName} ${dayNum} ${monthName} ${hours}:${minutes}`
  const shortDateTime = `${dayNum} ${monthName} ${hours}:${minutes}`

  return (
    <header className="status-bar">
      {/* Left side: Profile identity & availability status */}
      <div className="status-bar-left">
        <div className="status-user">
          <Sparkle className="user-icon" size={14} strokeWidth={2.2} aria-hidden="true" />
          <span className="user-name">Mish Diola</span>
        </div>

        <div className="status-pill" title="4th Year BS in Information Systems">
          <span className="status-dot"></span>
          <span className="status-text-full">4th Year BS in Information Systems</span>
          <span className="status-text-mobile">BS IS • 4th Year</span>
        </div>
      </div>

      {/* Right side: Device indicators & live time */}
      <div className="status-bar-right">
        <span className="network-tag">5G</span>

        {/* Battery Icon */}
        <div className="battery-icon" title="Battery 100%">
          <div className="battery-body">
            <div className="battery-level"></div>
          </div>
          <div className="battery-cap"></div>
        </div>

        {/* Live Clock with Responsive Format */}
        <time className="status-clock" dateTime={currentTime.toISOString()}>
          <span className="clock-full">{fullDateTime}</span>
          <span className="clock-short">{shortDateTime}</span>
        </time>
      </div>
    </header>
  )
}

export default StatusBar
