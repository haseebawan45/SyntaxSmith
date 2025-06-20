import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Return to Home</Link>
    </div>
  );
};

export default NotFound; 