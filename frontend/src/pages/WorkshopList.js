import React, { useState, useEffect } from 'react';
import { Calendar, User, MapPin, Clock, ArrowRight } from 'lucide-react';
import './WorkshopList.css';

export default function WorkshopList() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setWorkshops([
      {
        id: 1,
        title: 'Python Basics for Beginners',
        instructor: 'Dr. Ramesh Kumar',
        date: '2026-04-15',
        duration: 3,
        location: 'Online',
        status: 'upcoming',
        participants: 45,
        capacity: 50,
      },
      {
        id: 2,
        title: 'Web Development with Django',
        instructor: 'Prof. Aditya Sharma',
        date: '2026-04-20',
        duration: 5,
        location: 'IIT Bombay',
        status: 'upcoming',
        participants: 30,
        capacity: 35,
      },
      {
        id: 3,
        title: 'Data Science Fundamentals',
        instructor: 'Dr. Priya Das',
        date: '2026-03-10',
        duration: 4,
        location: 'Online',
        status: 'completed',
        participants: 52,
        capacity: 50,
      },
    ]);
    setLoading(false);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'badge-primary';
      case 'completed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };

  const filteredWorkshops = filter === 'all' 
    ? workshops 
    : workshops.filter(w => w.status === filter);

  return (
    <div className="workshop-list">
      <div className="container">
        {/* Header */}
        <div className="list-header">
          <div>
            <h1>Available Workshops</h1>
            <p>Discover and enroll in workshops tailored for your learning goals</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Workshops
          </button>
          <button 
            className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Workshop Cards */}
        {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
            <p>Loading workshops...</p>
          </div>
        ) : filteredWorkshops.length > 0 ? (
          <div className="workshops-grid">
            {filteredWorkshops.map((workshop) => (
              <div key={workshop.id} className="workshop-card">
                <div className="card-header-section">
                  <div className="card-title">
                    <h3>{workshop.title}</h3>
                    <span className={`badge ${getStatusColor(workshop.status)}`}>
                      {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="card-content">
                  <div className="info-row">
                    <User size={18} />
                    <span>{workshop.instructor}</span>
                  </div>
                  <div className="info-row">
                    <Calendar size={18} />
                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                  </div>
                  <div className="info-row">
                    <Clock size={18} />
                    <span>{workshop.duration} days</span>
                  </div>
                  <div className="info-row">
                    <MapPin size={18} />
                    <span>{workshop.location}</span>
                  </div>

                  {/* Capacity indicator */}
                  <div className="capacity-section">
                    <div className="capacity-stats">
                      <span className="participants">{workshop.participants} enrolled</span>
                      <span className="capacity">/ {workshop.capacity} seats</span>
                    </div>
                    <div className="capacity-bar">
                      <div 
                        className="capacity-fill"
                        style={{ width: `${(workshop.participants / workshop.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button className="btn btn-primary btn-small">
                    View Details
                    <ArrowRight size={16} />
                  </button>
                  {workshop.status === 'upcoming' && (
                    <button className="btn btn-secondary btn-small">
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No workshops found for this filter.</p>
            <a href="/workshops" className="btn btn-primary">
              View all workshops
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
