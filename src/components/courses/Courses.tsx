import React, { useState } from 'react';
import { curriculum, Course, Language } from '../../data/curriculum';
import CourseCard from './CourseCard';
import CourseFilter from './CourseFilter';

const Courses: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const courses = Object.values(curriculum);

  const filteredCourses = courses.filter((course) => {
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesLanguage && matchesSearch;
  });

  return (
    <div className="courses-page">
        <div className="container">
        <header className="courses-header">
          <h1>Programming Courses</h1>
          <p>Master modern programming languages with our comprehensive courses</p>
        </header>

          <CourseFilter 
          selectedLevel={selectedLevel}
          selectedLanguage={selectedLanguage}
            searchQuery={searchQuery}
          onLevelChange={setSelectedLevel}
          onLanguageChange={setSelectedLanguage}
          onSearchChange={setSearchQuery}
          />
          
            <div className="courses-grid">
          {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

        {filteredCourses.length === 0 && (
            <div className="no-courses">
            <h2>No courses found</h2>
            <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default Courses; 