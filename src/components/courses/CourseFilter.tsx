import React from 'react';
import { Language } from '../../data/curriculum';

interface CourseFilterProps {
  selectedLevel: string;
  selectedLanguage: string;
  searchQuery: string;
  onLevelChange: (level: string) => void;
  onLanguageChange: (language: string) => void;
  onSearchChange: (query: string) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({
  selectedLevel,
  selectedLanguage,
  searchQuery,
  onLevelChange,
  onLanguageChange,
  onSearchChange,
}) => {
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];
  const languages: Array<Language | 'all'> = ['all', 'javascript', 'python', 'java'];

  return (
    <div className="course-filters">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="level-filter">Level:</label>
        <select
          id="level-filter"
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          className="filter-select"
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="language-filter">Language:</label>
        <select
          id="language-filter"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="filter-select"
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CourseFilter; 