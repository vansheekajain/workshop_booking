import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Users, TrendingUp } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [workshopStats, setWorkshopStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    // Simulate loading stats from API
    setWorkshopStats({
      total: 12,
      upcoming: 5,
      completed: 7,
      pending: 2,
    });
  }, []);

  const stats = [
    {
      title: 'Total Workshops',
      value: workshopStats.total,
      icon: BookOpen,
      color: 'primary',
    },
    {
      title: 'Upcoming',
      value: workshopStats.upcoming,
      icon: TrendingUp,
      color: 'secondary',
    },
    {
      title: 'Completed',
      value: workshopStats.completed,
      icon: Users,
      color: 'success',
    },
    {
      title: 'Pending',
      value: workshopStats.pending,
      icon: ArrowRight,
      color: 'warning',
    },
  ];

  return (
    <div className="dashboard">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to FOSSEE Workshops</h1>
            <p>
              Discover, explore, and book educational workshops. Connect with expert instructors
              and coordinate workshops for your institution.
            </p>
            <div className="hero-buttons">
              <a href="/workshops" className="btn btn-primary">
                Browse Workshops
                <ArrowRight size={18} />
              </a>
              <a href="/statistics" className="btn btn-outline">
                View Statistics
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <h2>Workshop Overview</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={`stat-card stat-card-${stat.color}`}>
                  <div className="stat-icon">
                    <Icon size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stat.title}</h3>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Browse Workshops</h3>
              <p>Explore a wide variety of educational workshops tailored for students and professionals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Statistics</h3>
              <p>Track workshop trends, instructor performance, and participant engagement with interactive charts.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Easy Coordination</h3>
              <p>Propose workshops and manage bookings with a seamless, intuitive interface.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Optimized</h3>
              <p>Full responsive design ensures a smooth experience on all devices and screen sizes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Access</h3>
              <p>Role-based access control with secure authentication for instructors and coordinators.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Optimized performance with minimal load times for quick browsing and easy access.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of students and instructors discovering the power of collaborative learning.</p>
            <a href="/register" className="btn btn-primary btn-large">
              Create Account
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
