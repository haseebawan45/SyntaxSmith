import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../data/curriculum';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-card-header">
        <img src={course.icon} alt={`${course.title} icon`} className="course-icon" />
        <div className="course-badges">
          <span className={`badge badge-level badge-${course.level.toLowerCase()}`}>
            {course.level}
          </span>
          <span className={`badge badge-language badge-${course.language}`}>
            {course.language}
          </span>
        </div>
      </div>

      <div className="course-card-content">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        
        <div className="course-meta">
          <div className="meta-item">
            <i className="far fa-clock"></i>
            <span>{course.duration}</span>
          </div>
          <div className="meta-item">
            <i className="far fa-list-alt"></i>
            <span>{course.modules.length} modules</span>
          </div>
        </div>

        <div className="course-info">
          <h4>Prerequisites</h4>
          <ul>
            {course.prerequisites.map((prereq, index) => (
              <li key={index}>{prereq}</li>
            ))}
          </ul>

          <h4>Learning Outcomes</h4>
          <ul>
            {course.learningOutcomes.map((outcome, index) => (
              <li key={index}>{outcome}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="course-card-footer">
        <Link to={`/courses/${course.id}`} className="btn btn-primary">
          Start Learning
        </Link>
        <Link to={`/courses/${course.id}/syllabus`} className="btn btn-outline">
          View Syllabus
        </Link>
      </div>
    </div>
  );
};

export default CourseCard; 