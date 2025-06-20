import React from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  lessonsCount: number;
  duration: string;
  rating: number;
  ratingCount: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
        </svg>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half" viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" />
          <path d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
        </svg>
      );
    }
    
    // Empty stars
    const emptyStarsCount = 5 - stars.length;
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(
        <svg key={`empty-${i}`} viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="course-card">
      <div className="course-image">
        <span className={`course-level-tag ${course.level}`}>
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </span>
      </div>
      <div className="course-content">
        <div className="course-tags">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="course-tag">{tag}</span>
          ))}
        </div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        <div className="course-meta">
          <span className="lessons-count">{course.lessonsCount} lessons</span>
          <span className="duration">{course.duration}</span>
        </div>
        <div className="course-footer">
          <div className="course-rating">
            <div className="rating-stars">
              {renderStars(course.rating)}
            </div>
            <span className="rating-count">({course.ratingCount})</span>
          </div>
          <Link to={`/lesson/${course.id}`} className="btn btn-primary">Start Learning</Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 