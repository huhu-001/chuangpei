import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: '首页', href: '/' },
    { name: '关于我们', href: '/about' },
    { name: '联系我们', href: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <div className="logo-icon">
                <span className="logo-text">R</span>
              </div>
              <span className="logo-title">React PC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
            >
              <span className="sr-only">打开主菜单</span>
              {isMenuOpen ? (
                <XMarkIcon className="menu-icon" />
              ) : (
                <Bars3Icon className="menu-icon" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`mobile-nav-link ${isActive(item.href) ? 'mobile-nav-link-active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
