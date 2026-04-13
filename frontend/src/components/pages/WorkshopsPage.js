import React, { useState, useEffect } from 'react';
import { workshopAPI, helpers } from '../../services/api';

const WorkshopsPage = ({ searchQuery = '' }) => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState(searchQuery);
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setSearchTerm(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            setLoading(true);
            const result = await helpers.fetchWithErrorHandling(
                () => workshopAPI.getInstructorWorkshops()
            );
            
            if (result.success) {
                // Format workshops data
                const formattedWorkshops = Array.isArray(result.data)
                    ? result.data.map(ws => helpers.formatWorkshop(ws))
                    : [result.data];
                setWorkshops(formattedWorkshops);
            } else {
                setError(result.error);
                // Set mock data for demo
                setWorkshops([
                    {
                        id: 1,
                        title: 'Introduction to Python Programming',
                        instructor: 'Dr. Anil Kumar',
                        date: 'Oct 15, 2023',
                        duration: '3 Hours',
                        location: 'Virtual (Zoom)',
                        status: 'Upcoming',
                        capacity: { current: 45, total: 50 }
                    },
                    {
                        id: 2,
                        title: 'Advanced Scilab Computations',
                        instructor: 'Prof. S. Sharma',
                        date: 'Oct 22, 2023',
                        duration: '4 Hours',
                        location: 'IIT Bombay Lab',
                        status: 'Upcoming',
                        capacity: { current: 12, total: 30 }
                    },
                    {
                        id: 3,
                        title: 'OpenFOAM Basics',
                        instructor: 'Dr. R. Desai',
                        date: 'Sep 28, 2023',
                        duration: '2 Days',
                        location: 'Virtual (Webex)',
                        status: 'Completed',
                        capacity: { current: 100, total: 100 }
                    }
                ]);
            }
        } catch (err) {
            console.error('Failed to fetch workshops:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredWorkshops = workshops.filter(workshop => {
        const matchesFilter = filter === 'all' || workshop.status.toLowerCase() === filter;
        const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="page-section w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-4xl font-medium tracking-tight text-slate-900 drop-shadow-sm">Workshops</h2>
                    <p className="mt-3 text-base font-light text-slate-700">Discover and enroll in upcoming open-source sessions.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-72 glass-panel rounded-xl overflow-hidden flex items-center px-4 py-2.5">
                        <iconify-icon icon="solar:magnifer-linear" className="text-slate-500 text-lg"></iconify-icon>
                        <input 
                            type="text" 
                            placeholder="Search workshops..." 
                            className="w-full bg-transparent border-none text-sm font-light text-slate-800 ml-3 focus:outline-none placeholder-slate-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {/* Segmented Control */}
                    <div className="segmented-control flex p-1.5 rounded-xl w-full sm:w-auto overflow-x-auto shrink-0">
                        {['all', 'upcoming', 'completed'].map((opt) => (
                            <div key={opt} className="flex-1">
                                <input 
                                    type="radio" 
                                    name="filter" 
                                    id={`filter-${opt}`}
                                    className="sr-only" 
                                    checked={filter === opt}
                                    onChange={() => setFilter(opt)}
                                />
                                <label 
                                    htmlFor={`filter-${opt}`}
                                    className="cursor-pointer px-5 py-2 text-sm font-light text-slate-700 rounded-lg transition-all whitespace-nowrap text-center block"
                                >
                                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Workshop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredWorkshops.map((workshop) => (
                    <div key={workshop.id} className="flex flex-col glass-card rounded-3xl overflow-hidden group">
                        <div className="p-8 flex-1 flex flex-col relative">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-[#04a9cf]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            
                            <div className="flex justify-between items-start gap-4 mb-6 relative z-10">
                                <h3 className="text-xl font-medium text-slate-900 tracking-tight leading-snug group-hover:text-[#004a9f] transition-colors">{workshop.title}</h3>
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-medium border border-white/60 uppercase tracking-widest shrink-0 shadow-sm backdrop-blur-md ${
                                    workshop.status === 'Upcoming' 
                                        ? 'bg-blue-100/50 text-[#04a9cf]'
                                        : 'bg-emerald-100/50 text-emerald-700'
                                }`}>
                                    {workshop.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 mb-8 relative z-10">
                                <div className="flex items-center gap-3 text-sm font-light text-slate-700">
                                    <div className="w-8 h-8 rounded-full glass-inner flex items-center justify-center shrink-0">
                                        <iconify-icon icon="solar:user-linear" className="text-slate-600"></iconify-icon>
                                    </div>
                                    <span className="truncate">{workshop.instructor}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-light text-slate-700">
                                    <div className="w-8 h-8 rounded-full glass-inner flex items-center justify-center shrink-0">
                                        <iconify-icon icon="solar:calendar-linear" className="text-slate-600"></iconify-icon>
                                    </div>
                                    <span>{workshop.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-light text-slate-700">
                                    <div className="w-8 h-8 rounded-full glass-inner flex items-center justify-center shrink-0">
                                        <iconify-icon icon="solar:clock-circle-linear" className="text-slate-600"></iconify-icon>
                                    </div>
                                    <span>{workshop.duration}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-light text-slate-700">
                                    <div className="w-8 h-8 rounded-full glass-inner flex items-center justify-center shrink-0">
                                        <iconify-icon icon="solar:map-point-linear" className="text-slate-600"></iconify-icon>
                                    </div>
                                    <span className="truncate">{workshop.location}</span>
                                </div>
                            </div>

                            <div className="flex-1"></div>

                            <div className="mb-8 relative z-10">
                                <div className="flex justify-between text-xs font-light text-slate-600 mb-3">
                                    <span>{workshop.status === 'Completed' ? 'Attendance' : 'Capacity'}</span>
                                    <span className="font-medium text-slate-900">
                                        {workshop.status === 'Completed' ? '100%' : `${workshop.capacity.current} / ${workshop.capacity.total}`}
                                    </span>
                                </div>
                                <div className="h-2 w-full glass-inner rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${
                                            workshop.status === 'Completed' 
                                                ? 'bg-slate-400/80 w-full'
                                                : 'bg-gradient-to-r from-[#004a9f] to-[#04a9cf] shadow-[0_0_10px_rgba(4,169,207,0.5)] w-[90%]'
                                        }`}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex gap-4 relative z-10">
                                <button className="flex-1 inline-flex justify-center items-center py-3 px-4 text-sm font-normal text-slate-800 glass-button rounded-xl focus:outline-none">
                                    {workshop.status === 'Completed' ? 'View Summary' : 'Details'}
                                </button>
                                {workshop.status !== 'Completed' && (
                                    <button className="flex-1 inline-flex justify-center items-center py-3 px-4 text-sm font-medium text-white bg-gradient-to-r from-[#004a9f] to-[#04a9cf] rounded-xl shadow-lg shadow-[#04a9cf]/30 hover:shadow-xl hover:shadow-[#04a9cf]/40 transform hover:-translate-y-0.5 transition-all focus:outline-none border border-white/30">
                                        Enroll Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-14 text-center pb-8">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-[#004a9f] glass-button shadow-sm">
                    Load more workshops
                    <iconify-icon icon="solar:arrow-down-linear"></iconify-icon>
                </button>
            </div>
        </div>
    );
};

export default WorkshopsPage;
