import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Initialize theme based on user preference or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.classList.toggle('no-scroll');
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="logo-wrapper">
          <Link to="/" className="logo">
            <span className="logo-text">Syntax<span className="accent">Smith</span></span>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-list">
            <li><Link to="/courses" className="nav-link">Courses</Link></li>
            <li><Link to="/playground" className="nav-link">Playground</Link></li>
            <li><Link to="/blog" className="nav-link">Blog</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <button 
            className="theme-toggle" 
            aria-label="Toggle dark/light mode"
            onClick={toggleTheme}
          >
            <span className="sr-only">Toggle theme</span>
            <svg className="icon-moon" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" /></svg>
            <svg className="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          </button>
          <Link to="/login" className="btn btn-outline">Log in</Link>
          <Link to="/signup" className="btn btn-primary">Sign up free</Link>
        </div>
        
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`} 
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li><Link to="/courses" className="nav-link" onClick={closeMobileMenu}>Courses</Link></li>
          <li><Link to="/playground" className="nav-link" onClick={closeMobileMenu}>Playground</Link></li>
          <li><Link to="/blog" className="nav-link" onClick={closeMobileMenu}>Blog</Link></li>
          <li><Link to="/about" className="nav-link" onClick={closeMobileMenu}>About</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header; 