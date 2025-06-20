import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "SyntaxSmith transformed my learning experience. The interactive lessons and immediate feedback helped me grasp concepts faster than any other platform.",
      author: "Alex Johnson",
      role: "Front-end Developer"
    },
    {
      id: 2,
      content: "I went from complete beginner to landing my first junior developer role in 6 months thanks to SyntaxSmith's structured curriculum and project-based approach.",
      author: "Sarah Chen",
      role: "Full-stack Developer"
    },
    {
      id: 3,
      content: "The community support at SyntaxSmith is incredible. Whenever I got stuck, there was always someone ready to help me understand the concept.",
      author: "Michael Rodriguez",
      role: "Software Engineer"
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    let sliderInterval: ReturnType<typeof setInterval>;
    
    if (!isHovered) {
      sliderInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      clearInterval(sliderInterval);
    };
  }, [isHovered, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Students Say</h2>
        
        <div 
          className="testimonials-slider"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="testimonial-card"
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <div className="testimonial-content">
                <p>"{testimonial.content}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="slider-controls">
            <button className="prev-slide" onClick={handlePrev} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
            
            <div className="slide-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button className="next-slide" onClick={handleNext} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 