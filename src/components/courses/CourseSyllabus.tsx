import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculum } from '../../data/curriculum';

const CourseSyllabus: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = Object.values(curriculum).find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Course not found</h2>
          <p>The requested course could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="syllabus-page">
      <div className="syllabus-header">
        <div className="container">
          <div className="course-info">
            <img src={course.icon} alt={`${course.title} icon`} className="course-icon" />
            <div>
              <h1>{course.title}</h1>
              <p>{course.description}</p>
            </div>
          </div>

          <div className="course-meta">
            <div className="meta-item">
              <i className="far fa-clock"></i>
              <span>{course.duration}</span>
            </div>
            <div className="meta-item">
              <i className="far fa-list-alt"></i>
              <span>{course.modules.length} modules</span>
            </div>
            <div className="meta-item">
              <i className="far fa-signal"></i>
              <span>{course.level}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="syllabus-content">
          <div className="prerequisites-section">
            <h2>Prerequisites</h2>
            <ul>
              {course.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>

          <div className="outcomes-section">
            <h2>Learning Outcomes</h2>
            <ul>
              {course.learningOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>

          <div className="modules-section">
            <h2>Course Modules</h2>
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id} className="module-card">
                <div className="module-header">
                  <h3>
                    <span className="module-number">Module {moduleIndex + 1}</span>
                    {module.title}
                  </h3>
                  <p>{module.description}</p>
                </div>

                <div className="lessons-list">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lesson.id}
                      to={`/courses/${course.id}/lessons/${lesson.id}`}
                      className="lesson-item"
                    >
                      <span className="lesson-number">{lessonIndex + 1}</span>
                      <div className="lesson-info">
                        <h4>{lesson.title}</h4>
                        <span className="lesson-duration">
                          <i className="far fa-clock"></i> {lesson.duration}
                        </span>
                      </div>
                      <i className="far fa-chevron-right"></i>
                    </Link>
                  ))}
                </div>

                {module.challenges.length > 0 && (
                  <div className="challenges-list">
                    <h4>Module Challenges</h4>
                    {module.challenges.map((challenge) => (
                      <div key={challenge.id} className="challenge-item">
                        <div className="challenge-info">
                          <h5>{challenge.title}</h5>
                          <p>{challenge.description}</p>
                        </div>
                        <Link
                          to={`/courses/${course.id}/lessons/${module.lessons[0].id}?tab=challenge`}
                          className="btn btn-outline"
                        >
                          Try Challenge
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSyllabus; 