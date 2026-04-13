import React, { useState } from 'react';

const Header = ({ currentPage, onNavigate, onSearch }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'workshops', label: 'Workshops' },
        { id: 'statistics', label: 'Statistics' },
        { id: 'types', label: 'Types' },
        { id: 'profile', label: 'Profile' }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() && onSearch) {
            onSearch(searchQuery);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    const handleSearchFocus = () => {
        setShowSearch(true);
    };

    const handleMobileNavClick = (pageId) => {
        onNavigate(pageId);
        setShowMobileMenu(false);
    };

    return (
        <>
            <header className="fixed top-4 inset-x-4 mx-auto max-w-7xl z-50 glass-panel rounded-2xl transition-all">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Brand */}
                        <div 
                            className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105"
                            onClick={() => onNavigate('home')}
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#004a9f] to-[#04a9cf] text-white shadow-lg shadow-[#04a9cf]/30 border border-white/40">
                                <iconify-icon icon="solar:book-bookmark-linear" className="text-lg"></iconify-icon>
                            </div>
                            <span className="text-xl font-medium tracking-tight text-slate-900 drop-shadow-sm">FOSSEE</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1 glass-inner p-1 rounded-full">
                            {navItems.filter(item => item.id !== 'profile').map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`nav-btn px-5 py-2 rounded-full text-sm font-normal transition-all ${
                                        currentPage === item.id
                                            ? 'text-slate-900 bg-white/90 shadow-sm border border-white'
                                            : 'text-slate-600 font-light hover:text-slate-900 hover:bg-white/60'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        {/* User Actions */}
                        <div className="flex items-center gap-4">
                            {/* Search Bar */}
                            {showSearch ? (
                                <form onSubmit={handleSearch} className="hidden md:flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search workshops..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onBlur={() => {
                                            setTimeout(() => {
                                                if (!searchQuery.trim()) {
                                                    setShowSearch(false);
                                                }
                                            }, 100);
                                        }}
                                        autoFocus
                                        className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/60 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04a9cf] transition-all w-64"
                                    />
                                    <button
                                        type="submit"
                                        className="ml-2 flex items-center justify-center h-10 w-10 rounded-full glass-button text-slate-600 hover:text-slate-900 hover:bg-white/30 transition-all"
                                        title="Search"
                                    >
                                        <iconify-icon icon="solar:magnifer-linear" className="text-xl"></iconify-icon>
                                    </button>
                                </form>
                            ) : (
                                <button 
                                    onClick={handleSearchFocus}
                                    className="hidden md:flex items-center justify-center h-10 w-10 rounded-full glass-button text-slate-600 hover:text-slate-900 hover:bg-white/30 transition-all"
                                    title="Search workshops"
                                >
                                    <iconify-icon icon="solar:magnifer-linear" className="text-xl"></iconify-icon>
                                </button>
                            )}
                            <div className="hidden h-6 w-px bg-slate-300/60 md:block"></div>
                            <button 
                                onClick={() => onNavigate('profile')}
                                className="hidden md:flex items-center gap-2 rounded-full glass-button py-1.5 pl-1.5 pr-4 hover:bg-white/80 transition-all"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#004a9f] to-[#04a9cf] text-white shadow-sm">
                                    <span className="text-xs font-medium">JD</span>
                                </div>
                                <span className="text-sm font-light text-slate-700 hidden sm:block">Profile</span>
                                <iconify-icon icon="solar:alt-arrow-down-linear" className="text-slate-400 text-xs hidden sm:block"></iconify-icon>
                            </button>
                            
                            {/* Mobile Menu Toggle */}
                            <button 
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="md:hidden flex items-center justify-center h-10 w-10 text-slate-600 hover:text-slate-900 glass-button rounded-xl transition-all"
                                title="Toggle menu"
                            >
                                <iconify-icon 
                                    icon={showMobileMenu ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} 
                                    className="text-xl transition-transform"
                                ></iconify-icon>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {showMobileMenu && (
                        <div className="md:hidden border-t border-white/40 mt-4 pt-4 pb-4">
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleMobileNavClick(item.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                            currentPage === item.id
                                                ? 'bg-white/30 text-slate-900 font-medium'
                                                : 'text-slate-700 font-light hover:bg-white/20'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Menu Backdrop */}
            {showMobileMenu && (
                <div 
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={() => setShowMobileMenu(false)}
                ></div>
            )}
        </>
    );
};

export default Header;
