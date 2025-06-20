import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import Courses from './components/courses/Courses';
import Lesson from './components/lesson/Lesson';
import Playground from './components/playground/Playground';
import Blog from './components/blog/Blog';
import About from './components/about/About';
import NotFound from './components/common/NotFound';

// Import CSS
import './styles/main.css';
import './styles/animations.css';
import './styles/home.css';
import './styles/footer.css';
import './styles/courses.css';
import './styles/lesson.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
