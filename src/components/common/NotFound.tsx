import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container" style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 0',
      textAlign: 'center',
      minHeight: '60vh'
    }}>
      <div className="container">
        <h1 style={{ 
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          marginBottom: '1rem',
          color: 'var(--color-primary)',
          fontWeight: 800
        }}>404</h1>
        
        <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
        
        <p style={{ 
          fontSize: '1.2rem', 
          maxWidth: '500px', 
          margin: '0 auto 3rem',
          color: 'var(--color-text-secondary)'
        }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
          <Link to="/courses" className="btn btn-outline">
            Browse Courses
          </Link>
        </div>
        
        <div style={{ marginTop: '4rem' }}>
          <p>
            <strong>Looking for something specific?</strong>
          </p>
          <p>
            Try searching or check out our <Link to="/sitemap" style={{ color: 'var(--color-primary)' }}>sitemap</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 