import React from 'react';
import { Link } from 'react-router-dom';

const CoursesPreview: React.FC = () => {
  return (
    <section className="courses-preview">
      <div className="container">
        <h2 className="section-title">Popular Learning Paths</h2>
        
        <div className="course-cards">
          <div className="course-card">
            <div className="course-banner" style={{ '--course-color': 'var(--color-blue)' } as React.CSSProperties}>
              <span className="course-level">Beginner</span>
            </div>
            <div className="course-content">
              <h3>Web Development Fundamentals</h3>
              <p>Learn HTML, CSS, and JavaScript to build responsive websites from scratch.</p>
              <div className="course-meta">
                <span className="lessons-count">42 lessons</span>
                <span className="duration">12 hours</span>
              </div>
              <Link to="/courses" className="btn btn-outline">Explore Course</Link>
            </div>
          </div>
          
          <div className="course-card">
            <div className="course-banner" style={{ '--course-color': 'var(--color-green)' } as React.CSSProperties}>
              <span className="course-level">Intermediate</span>
            </div>
            <div className="course-content">
              <h3>Python for Data Science</h3>
              <p>Master Python libraries for data analysis, visualization, and machine learning.</p>
              <div className="course-meta">
                <span className="lessons-count">38 lessons</span>
                <span className="duration">15 hours</span>
              </div>
              <Link to="/courses" className="btn btn-outline">Explore Course</Link>
            </div>
          </div>
          
          <div className="course-card">
            <div className="course-banner" style={{ '--course-color': 'var(--color-purple)' } as React.CSSProperties}>
              <span className="course-level">Advanced</span>
            </div>
            <div className="course-content">
              <h3>Full-Stack JavaScript</h3>
              <p>Build modern web applications with React, Node.js, Express, and MongoDB.</p>
              <div className="course-meta">
                <span className="lessons-count">56 lessons</span>
                <span className="duration">24 hours</span>
              </div>
              <Link to="/courses" className="btn btn-outline">Explore Course</Link>
            </div>
          </div>
        </div>
        
        <div className="courses-cta">
          <Link to="/courses" className="btn btn-primary">View All Courses</Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview; 