import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import Features from './Features';
import CoursesPreview from './CoursesPreview';
import Testimonials from './Testimonials';
import CtaSection from './CtaSection';

const Home: React.FC = () => {
  // Initialize scroll animations
  useEffect(() => {
    const animateElements = document.querySelectorAll('.reveal-on-scroll, .feature-card, .course-card');
    
    const animateElementsInView = () => {
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = window.innerHeight * 0.8;
        
        if (elementTop < elementVisible) {
          if (element.classList.contains('reveal-on-scroll')) {
            element.classList.add('revealed');
          } else {
            element.classList.add('in-view');
          }
        }
      });
    };
    
    // Debounce helper function
    const debounce = (func: Function, delay: number) => {
      let timeout: ReturnType<typeof setTimeout>;
      return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(), delay);
      };
    };
    
    // Initial check for elements in viewport
    animateElementsInView();
    
    // Check on scroll
    window.addEventListener('scroll', debounce(animateElementsInView, 20));
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', debounce(animateElementsInView, 20));
    };
  }, []);

  return (
    <main>
      <Hero />
      <Features />
      <CoursesPreview />
      <Testimonials />
      <CtaSection />
    </main>
  );
};

export default Home; 