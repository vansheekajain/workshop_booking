import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/glassmorphism.css';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import Pages
import HomePage from './components/pages/HomePage';
import WorkshopsPage from './components/pages/WorkshopsPage';
import StatisticsPage from './components/pages/StatisticsPage';
import TypesPage from './components/pages/TypesPage';
import ProfilePage from './components/pages/ProfilePage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle navigation
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('workshops');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'workshops':
        return <WorkshopsPage searchQuery={searchQuery} />;
      case 'statistics':
        return <StatisticsPage />;
      case 'types':
        return <TypesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="text-slate-800 font-light selection:bg-[#004a9f]/20 selection:text-[#004a9f] relative min-h-screen flex flex-col bg-slate-50">
      {/* Enhanced Animated Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#04a9cf]/40 to-blue-300/40 mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-[#004a9f]/30 to-indigo-300/30 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-[#28a745]/20 to-emerald-200/20 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-6000"></div>
        
        {/* Light grid overlay */}
        <div className="absolute inset-0 opacity-60" style={{
          backgroundImage: 'url(\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=\')',
        }}></div>
      </div>

      {/* Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} onSearch={handleSearch} />

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-16 flex flex-col items-center w-full">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
