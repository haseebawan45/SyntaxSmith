import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Start Your Coding Journey Today</h2>
          <p>Join thousands of students who are already learning to code with SyntaxSmith's interactive platform.</p>
          <Link to="/signup" className="btn btn-primary btn-lg">Sign Up Free</Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 