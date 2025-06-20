import React, { useState } from 'react';
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

interface LessonSidebarProps {
  modules: Module[];
  currentLessonId: number;
  progress: number;
  isOpen: boolean;
  onClose: () => void;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({
  modules,
  currentLessonId,
  progress,
  isOpen,
  onClose
}) => {
  const [openModules, setOpenModules] = useState<number[]>([1]);

  const toggleModule = (moduleId: number) => {
    setOpenModules(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  // Find which module contains the current lesson
  const findCurrentModule = () => {
    for (const module of modules) {
      if (module.lessons.some(lesson => lesson.id === currentLessonId)) {
        return module.id;
      }
    }
    return null;
  };

  // Ensure the module containing the current lesson is open
  React.useEffect(() => {
    const currentModuleId = findCurrentModule();
    if (currentModuleId && !openModules.includes(currentModuleId)) {
      setOpenModules(prev => [...prev, currentModuleId]);
    }
  }, [currentLessonId]);

  return (
    <aside className={`lesson-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="course-title-small">Web Development Fundamentals</h2>
        <button className="close-sidebar" onClick={onClose} aria-label="Close sidebar">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </div>
      
      <div className="lesson-progress">
        <div className="progress-text">
          <span>Course Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="lesson-modules">
        {modules.map(module => (
          <div key={module.id} className="module-item">
            <div 
              className="module-header"
              onClick={() => toggleModule(module.id)}
            >
              <span>{module.title}</span>
              <span className={`module-toggle ${openModules.includes(module.id) ? 'open' : ''}`}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </span>
            </div>
            
            <div className={`module-lessons ${openModules.includes(module.id) ? 'open' : ''}`}>
              {module.lessons.map(lesson => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className={`lesson-item ${lesson.id === currentLessonId ? 'active' : ''} ${lesson.isCompleted ? 'completed' : ''}`}
                >
                  {lesson.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LessonSidebar; 