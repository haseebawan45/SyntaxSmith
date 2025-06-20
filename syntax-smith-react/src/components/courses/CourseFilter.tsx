import React from 'react';

interface CourseFilterProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="courses-filter">
      <div className="filter-group">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Levels
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'beginner' ? 'active' : ''}`}
          onClick={() => setActiveFilter('beginner')}
        >
          Beginner
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'intermediate' ? 'active' : ''}`}
          onClick={() => setActiveFilter('intermediate')}
        >
          Intermediate
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveFilter('advanced')}
        >
          Advanced
        </button>
      </div>
      
      <div className="search-bar">
        <svg viewBox="0 0 24 24">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <input 
          type="text" 
          placeholder="Search courses..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CourseFilter; 