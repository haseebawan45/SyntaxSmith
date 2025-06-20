import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
}

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Mock blog posts
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      excerpt: 'Learn how to use React Hooks to simplify your components and manage state effectively.',
      author: 'Alex Johnson',
      date: 'June 15, 2023',
      category: 'React',
      imageUrl: 'https://via.placeholder.com/800x400/4361ee/ffffff?text=React+Hooks'
    },
    {
      id: 2,
      title: 'CSS Grid vs Flexbox: When to Use Each',
      excerpt: 'A comprehensive guide to understanding the differences between CSS Grid and Flexbox layout systems.',
      author: 'Sarah Chen',
      date: 'May 22, 2023',
      category: 'CSS',
      imageUrl: 'https://via.placeholder.com/800x400/7209b7/ffffff?text=CSS+Layouts'
    },
    {
      id: 3,
      title: 'JavaScript Array Methods You Should Know',
      excerpt: 'Explore the most useful array methods in JavaScript that will make your code cleaner and more efficient.',
      author: 'Michael Rodriguez',
      date: 'April 10, 2023',
      category: 'JavaScript',
      imageUrl: 'https://via.placeholder.com/800x400/f72585/ffffff?text=JavaScript+Arrays'
    },
    {
      id: 4,
      title: 'Building RESTful APIs with Node.js and Express',
      excerpt: 'A step-by-step guide to creating robust and scalable APIs using Node.js and Express.',
      author: 'Emily Wilson',
      date: 'March 5, 2023',
      category: 'Backend',
      imageUrl: 'https://via.placeholder.com/800x400/4cc9f0/ffffff?text=Node.js+APIs'
    },
    {
      id: 5,
      title: 'Introduction to TypeScript for JavaScript Developers',
      excerpt: 'Learn how TypeScript can improve your JavaScript development workflow with static typing.',
      author: 'David Kim',
      date: 'February 18, 2023',
      category: 'TypeScript',
      imageUrl: 'https://via.placeholder.com/800x400/4361ee/ffffff?text=TypeScript'
    },
    {
      id: 6,
      title: 'Responsive Web Design Best Practices',
      excerpt: 'Essential techniques for creating websites that work beautifully across all device sizes.',
      author: 'Lisa Chen',
      date: 'January 30, 2023',
      category: 'CSS',
      imageUrl: 'https://via.placeholder.com/800x400/7209b7/ffffff?text=Responsive+Design'
    }
  ];

  // Filter posts by category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Get unique categories
  const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
  const categories = ['all', ...uniqueCategories];

  return (
    <div className="blog-container">
      <div className="page-header">
        <div className="container">
          <h1>Blog</h1>
          <p>Insights, tutorials, and news from the SyntaxSmith team.</p>
        </div>
      </div>
      
      <div className="container" style={{ padding: '2rem 0' }}>
        {/* Category Filter */}
        <div className="blog-filter" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map(category => (
            <button 
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <div className="blog-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {filteredPosts.map(post => (
            <div key={post.id} className="blog-card" style={{ 
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              backgroundColor: 'var(--color-background)',
              transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div className="blog-image" style={{ 
                height: '180px',
                backgroundImage: `url(${post.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div className="blog-content" style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="blog-meta" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-tertiary)'
                }}>
                  <span>{post.date}</span>
                  <span className="blog-category" style={{
                    padding: '0.15rem 0.5rem',
                    backgroundColor: 'var(--color-surface-variant)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem'
                  }}>{post.category}</span>
                </div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{post.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>{post.excerpt}</p>
                <div className="blog-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem' }}>By {post.author}</span>
                  <Link to={`/blog/${post.id}`} className="btn btn-outline">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 