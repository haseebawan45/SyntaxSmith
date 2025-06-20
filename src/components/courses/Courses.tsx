import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import CourseFilter from './CourseFilter';

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

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 9;

  // Mock data for courses
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: 1,
        title: 'Web Development Fundamentals',
        description: 'Learn HTML, CSS, and JavaScript to build responsive websites from scratch.',
        level: 'beginner',
        tags: ['HTML', 'CSS', 'JavaScript'],
        lessonsCount: 42,
        duration: '12 hours',
        rating: 4.8,
        ratingCount: 1245
      },
      {
        id: 2,
        title: 'Python for Data Science',
        description: 'Master Python libraries for data analysis, visualization, and machine learning.',
        level: 'intermediate',
        tags: ['Python', 'Data Science', 'Machine Learning'],
        lessonsCount: 38,
        duration: '15 hours',
        rating: 4.9,
        ratingCount: 982
      },
      {
        id: 3,
        title: 'Full-Stack JavaScript',
        description: 'Build modern web applications with React, Node.js, Express, and MongoDB.',
        level: 'advanced',
        tags: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        lessonsCount: 56,
        duration: '24 hours',
        rating: 4.7,
        ratingCount: 876
      },
      {
        id: 4,
        title: 'Java Programming Masterclass',
        description: 'Comprehensive guide to Java programming from basics to advanced concepts.',
        level: 'beginner',
        tags: ['Java', 'OOP', 'Data Structures'],
        lessonsCount: 48,
        duration: '20 hours',
        rating: 4.6,
        ratingCount: 723
      },
      {
        id: 5,
        title: 'Mobile App Development with Flutter',
        description: 'Create beautiful cross-platform mobile apps with Flutter and Dart.',
        level: 'intermediate',
        tags: ['Flutter', 'Dart', 'Mobile'],
        lessonsCount: 35,
        duration: '16 hours',
        rating: 4.8,
        ratingCount: 542
      },
      {
        id: 6,
        title: 'DevOps and Cloud Engineering',
        description: 'Learn to automate deployment pipelines and manage cloud infrastructure.',
        level: 'advanced',
        tags: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
        lessonsCount: 44,
        duration: '22 hours',
        rating: 4.9,
        ratingCount: 328
      },
      {
        id: 7,
        title: 'SQL and Database Design',
        description: 'Master SQL queries and learn how to design efficient database schemas.',
        level: 'beginner',
        tags: ['SQL', 'Database', 'PostgreSQL'],
        lessonsCount: 32,
        duration: '14 hours',
        rating: 4.7,
        ratingCount: 615
      },
      {
        id: 8,
        title: 'React Native for Mobile Development',
        description: 'Build native mobile apps for iOS and Android using React Native.',
        level: 'intermediate',
        tags: ['React Native', 'JavaScript', 'Mobile'],
        lessonsCount: 40,
        duration: '18 hours',
        rating: 4.6,
        ratingCount: 489
      },
      {
        id: 9,
        title: 'Machine Learning with Python',
        description: 'Implement machine learning algorithms and build intelligent applications.',
        level: 'advanced',
        tags: ['Python', 'Machine Learning', 'AI'],
        lessonsCount: 50,
        duration: '25 hours',
        rating: 4.8,
        ratingCount: 752
      },
      {
        id: 10,
        title: 'Cybersecurity Fundamentals',
        description: 'Learn essential security concepts and protect systems from common threats.',
        level: 'beginner',
        tags: ['Security', 'Networking', 'Cryptography'],
        lessonsCount: 36,
        duration: '16 hours',
        rating: 4.7,
        ratingCount: 423
      },
      {
        id: 11,
        title: 'Vue.js for Frontend Development',
        description: 'Create dynamic user interfaces with Vue.js and its ecosystem.',
        level: 'intermediate',
        tags: ['Vue.js', 'JavaScript', 'Frontend'],
        lessonsCount: 38,
        duration: '17 hours',
        rating: 4.8,
        ratingCount: 387
      },
      {
        id: 12,
        title: 'Blockchain Development',
        description: 'Build decentralized applications and smart contracts on blockchain platforms.',
        level: 'advanced',
        tags: ['Blockchain', 'Ethereum', 'Solidity'],
        lessonsCount: 45,
        duration: '23 hours',
        rating: 4.9,
        ratingCount: 296
      }
    ];

    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  // Filter courses based on level and search query
  useEffect(() => {
    let result = [...courses];
    
    // Filter by level
    if (activeFilter !== 'all') {
      result = result.filter(course => course.level === activeFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query) ||
          course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilter, searchQuery, courses]);

  // Get current courses for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Explore Our Courses</h1>
          <p>Master in-demand programming skills with our interactive courses.</p>
        </div>
      </div>
      
      <div className="courses-container">
        <div className="container">
          <CourseFilter 
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {currentCourses.length > 0 ? (
            <div className="courses-grid">
              {currentCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
          
          {/* Pagination */}
          {filteredCourses.length > coursesPerPage && (
            <div className="pagination">
              <button 
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                  onClick={() => paginate(number)}
                  aria-label={`Page ${number}`}
                >
                  {number}
                </button>
              ))}
              
              <button 
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"></path></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses; 