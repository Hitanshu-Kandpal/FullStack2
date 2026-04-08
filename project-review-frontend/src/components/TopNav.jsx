import { Link, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

function isActive(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`) || pathname.startsWith(to)
}

export default function TopNav() {
  const location = useLocation()
  const pathname = location.pathname
  const [flash, setFlash] = useState(null)

  useEffect(() => {
    const msg = sessionStorage.getItem('flash')
    if (msg) {
      setFlash(msg)
      sessionStorage.removeItem('flash')
    } else {
      setFlash(null)
    }
  }, [pathname])

  const navLinks = useMemo(
    () => [
      { to: '/', label: 'Submit' },
      { to: '/my', label: 'My Projects' },
      { to: '/all', label: 'All Projects' },
    ],
    [],
  )

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">Project Review</div>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={isActive(pathname, l.to) ? 'active' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      {flash ? (
        <div className="flash" role="status" aria-live="polite">
          {flash}
        </div>
      ) : null}
    </header>
  )
}

