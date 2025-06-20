import React from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const About: React.FC = () => {
  // Mock team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Emma Rodriguez',
      role: 'Founder & CEO',
      bio: 'Former software engineer at Google with a passion for making coding education accessible to everyone.',
      imageUrl: 'https://via.placeholder.com/300x300/4361ee/ffffff?text=ER'
    },
    {
      id: 2,
      name: 'James Wilson',
      role: 'CTO',
      bio: 'Full-stack developer with 15+ years of experience building educational platforms and tools.',
      imageUrl: 'https://via.placeholder.com/300x300/7209b7/ffffff?text=JW'
    },
    {
      id: 3,
      name: 'Sophia Chen',
      role: 'Head of Content',
      bio: 'Computer science professor with a knack for explaining complex concepts in simple terms.',
      imageUrl: 'https://via.placeholder.com/300x300/f72585/ffffff?text=SC'
    },
    {
      id: 4,
      name: 'Marcus Johnson',
      role: 'Lead Developer',
      bio: 'Passionate about creating intuitive interfaces and interactive learning experiences.',
      imageUrl: 'https://via.placeholder.com/300x300/4cc9f0/ffffff?text=MJ'
    },
    {
      id: 5,
      name: 'Olivia Kim',
      role: 'UX Designer',
      bio: 'Focused on creating beautiful, accessible, and user-friendly educational experiences.',
      imageUrl: 'https://via.placeholder.com/300x300/38b000/ffffff?text=OK'
    },
    {
      id: 6,
      name: 'David Patel',
      role: 'Community Manager',
      bio: 'Dedicated to fostering a supportive community where learners can grow together.',
      imageUrl: 'https://via.placeholder.com/300x300/ffbe0b/ffffff?text=DP'
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="page-header">
        <div className="container">
          <h1>About SyntaxSmith</h1>
          <p>Our mission is to make coding education accessible, engaging, and effective for everyone.</p>
        </div>
      </div>
      
      {/* Our Story Section */}
      <section className="about-section" style={{ padding: '4rem 0', backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Our Story</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              SyntaxSmith was founded in 2022 with a simple goal: to create a better way to learn programming. 
              We believe that coding education should be interactive, engaging, and tailored to how people actually learn.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Our team of educators, developers, and designers work together to create learning experiences that break down complex concepts into 
              bite-sized, hands-on lessons. We focus on practical skills that help you build real projects from day one.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              Today, thousands of learners use SyntaxSmith to master programming languages, build their portfolios, and advance their careers in tech.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="values-section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Values</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div className="value-card" style={{ 
              padding: '2rem', 
              backgroundColor: 'var(--color-surface)', 
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Accessibility</h3>
              <p>We believe quality coding education should be available to everyone, regardless of background or circumstances.</p>
            </div>
            
            <div className="value-card" style={{ 
              padding: '2rem', 
              backgroundColor: 'var(--color-surface)', 
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Practicality</h3>
              <p>We focus on practical skills and real-world applications, not just theory and abstract concepts.</p>
            </div>
            
            <div className="value-card" style={{ 
              padding: '2rem', 
              backgroundColor: 'var(--color-surface)', 
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Community</h3>
              <p>Learning is better together. We foster a supportive community where learners help each other grow.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="team-section" style={{ padding: '4rem 0', backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Meet Our Team</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {teamMembers.map(member => (
              <div key={member.id} className="team-card" style={{ 
                textAlign: 'center',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ 
                  height: '200px', 
                  backgroundImage: `url(${member.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{member.name}</h3>
                  <p style={{ 
                    color: 'var(--color-primary)',
                    fontWeight: 500,
                    marginBottom: '1rem'
                  }}>{member.role}</p>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="contact-cta" style={{ 
        padding: '4rem 0', 
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Get in Touch</h2>
          <p style={{ 
            fontSize: '1.1rem', 
            maxWidth: '600px', 
            margin: '0 auto 2rem',
            opacity: 0.9
          }}>
            Have questions or want to learn more about SyntaxSmith? We'd love to hear from you!
          </p>
          <a href="mailto:contact@syntaxsmith.com" className="btn btn-primary" style={{ 
            backgroundColor: 'white',
            color: 'var(--color-primary)',
            padding: '0.8rem 2rem'
          }}>Contact Us</a>
        </div>
      </section>
    </div>
  );
};

export default About; 