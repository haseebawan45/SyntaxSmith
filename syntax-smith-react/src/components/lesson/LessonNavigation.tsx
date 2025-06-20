import React from 'react';
import { Link } from 'react-router-dom';

interface LessonItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface Module {
  id: number;
  title: string;
  lessons: LessonItem[];
}

interface LessonNavigationProps {
  currentLessonId: number;
  modules: Module[];
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({ currentLessonId, modules }) => {
  // Find the previous and next lessons
  const findAdjacentLessons = () => {
    // Flatten all lessons into a single array
    const allLessons = modules.reduce((acc, module) => {
      return [...acc, ...module.lessons];
    }, [] as LessonItem[]);
    
    // Find the index of the current lesson
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
    
    // Get previous and next lessons
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
    
    return { prevLesson, nextLesson };
  };
  
  const { prevLesson, nextLesson } = findAdjacentLessons();

  return (
    <div className="lesson-navigation">
      {prevLesson && (
        <Link to={`/lesson/${prevLesson.id}`} className="nav-prev">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span>Previous: {prevLesson.title}</span>
        </Link>
      )}
      
      {nextLesson && (
        <Link to={`/lesson/${nextLesson.id}`} className="nav-next">
          <span>Next: {nextLesson.title}</span>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default LessonNavigation; 