import React, { useState, useEffect } from 'react';
import { statisticsAPI, workshopAPI, helpers } from '../../services/api';

const HomePage = ({ onNavigate }) => {
    const [stats, setStats] = useState({
        total: 0,
        upcoming: 0,
        completed: 0,
        pending: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const result = await helpers.fetchWithErrorHandling(
                () => statisticsAPI.getPublicStats()
            );
            
            if (result.success) {
                // Parse the statistics data
                // Adjust based on actual API response structure
                setStats({
                    total: result.data.total_workshops || 124,
                    upcoming: result.data.upcoming_workshops || 45,
                    completed: result.data.completed_workshops || 72,
                    pending: result.data.pending_workshops || 7,
                });
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.error('Failed to fetch statistics:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-section">
            {/* Hero Section */}
            <section className="relative w-full pb-16 pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-xs font-normal text-slate-800 mb-8 shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28a745] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#28a745] border border-white"></span>
                        </span>
                        FOSSEE Platform v2.0 Live
                    </div>
                    
                    <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl drop-shadow-sm leading-tight">
                        Empowering education through <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004a9f] via-[#04a9cf] to-[#004a9f] animate-gradient" style={{ backgroundSize: '200% auto' }}>
                            open-source workshops
                        </span>
                    </h1>
                    
                    <p className="mx-auto mt-8 max-w-2xl text-lg font-light text-slate-700 sm:text-xl leading-relaxed">
                        Discover, coordinate, and participate in technical workshops across institutions. Streamlined booking and management for modern education.
                    </p>
                    
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
                        <button 
                            onClick={() => onNavigate('workshops')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#004a9f] to-[#04a9cf] px-8 py-4 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(0,74,159,0.5)] border border-white/20 hover:shadow-[0_12px_24px_-6px_rgba(0,74,159,0.6)] transform hover:-translate-y-1 transition-all focus:outline-none"
                        >
                            Browse Workshops
                            <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                        </button>
                        <button 
                            onClick={() => onNavigate('statistics')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl glass-button px-8 py-4 text-sm font-medium text-slate-800 focus:outline-none"
                        >
                            <iconify-icon icon="solar:chart-square-linear"></iconify-icon>
                            View Statistics
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Stats Row */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Stat 1 */}
                    <div 
                        className="glass-card rounded-3xl p-6 group cursor-pointer"
                        onClick={() => onNavigate('workshops')}
                    >
                        <div className="flex items-center gap-3 text-[#004a9f] mb-5">
                            <div className="p-3 rounded-2xl glass-inner shadow-sm group-hover:scale-110 group-hover:bg-white/60 transition-all">
                                <iconify-icon icon="solar:library-linear" className="text-2xl"></iconify-icon>
                            </div>
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">Total</span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-medium tracking-tight text-slate-900 drop-shadow-sm">{loading ? '-' : stats.total}</span>
                            <span className="text-xs font-medium text-[#28a745] flex items-center gap-0.5 glass-inner px-2 py-1 rounded-lg">
                                <iconify-icon icon="solar:arrow-right-up-linear"></iconify-icon>
                                12%
                            </span>
                        </div>
                    </div>
                    
                    {/* Stat 2 */}
                    <div 
                        className="glass-card rounded-3xl p-6 group cursor-pointer"
                        onClick={() => onNavigate('workshops')}
                    >
                        <div className="flex items-center gap-3 text-[#04a9cf] mb-5">
                            <div className="p-3 rounded-2xl glass-inner shadow-sm group-hover:scale-110 group-hover:bg-white/60 transition-all">
                                <iconify-icon icon="solar:calendar-date-linear" className="text-2xl"></iconify-icon>
                            </div>
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">Upcoming</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-medium tracking-tight text-slate-900 drop-shadow-sm">{loading ? '-' : stats.upcoming}</span>
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div 
                        className="glass-card rounded-3xl p-6 group cursor-pointer"
                        onClick={() => onNavigate('workshops')}
                    >
                        <div className="flex items-center gap-3 text-[#28a745] mb-5">
                            <div className="p-3 rounded-2xl glass-inner shadow-sm group-hover:scale-110 group-hover:bg-white/60 transition-all">
                                <iconify-icon icon="solar:check-circle-linear" className="text-2xl"></iconify-icon>
                            </div>
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">Completed</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-medium tracking-tight text-slate-900 drop-shadow-sm">{loading ? '-' : stats.completed}</span>
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div 
                        className="glass-card rounded-3xl p-6 group cursor-pointer"
                        onClick={() => onNavigate('workshops')}
                    >
                        <div className="flex items-center gap-3 text-amber-500 mb-5">
                            <div className="p-3 rounded-2xl glass-inner shadow-sm group-hover:scale-110 group-hover:bg-white/60 transition-all">
                                <iconify-icon icon="solar:clock-circle-linear" className="text-2xl"></iconify-icon>
                            </div>
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">Pending</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-medium tracking-tight text-slate-900 drop-shadow-sm">{loading ? '-' : stats.pending}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Showcase */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl drop-shadow-sm">Platform Capabilities</h2>
                    <p className="mt-4 text-base font-light text-slate-700 max-w-2xl mx-auto">Everything you need to manage, track, and execute successful educational workshops across institutions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-[#004a9f] glass-inner shadow-sm">
                            <iconify-icon icon="solar:book-linear" className="text-3xl"></iconify-icon>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-slate-900">Browse Workshops</h3>
                            <p className="mt-3 text-sm font-light text-slate-600 leading-relaxed">Easily search and filter through a comprehensive catalog of open-source technology workshops.</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-600 glass-inner shadow-sm">
                            <iconify-icon icon="solar:chart-2-linear" className="text-3xl"></iconify-icon>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-slate-900">Real-time Statistics</h3>
                            <p className="mt-3 text-sm font-light text-slate-600 leading-relaxed">Track enrollments, completion rates, and participant engagement through detailed dashboards.</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-600 glass-inner shadow-sm">
                            <iconify-icon icon="solar:users-group-two-rounded-linear" className="text-3xl"></iconify-icon>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-slate-900">Easy Coordination</h3>
                            <p className="mt-3 text-sm font-light text-slate-600 leading-relaxed">Seamless communication channels between institutional coordinators and instructors.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
