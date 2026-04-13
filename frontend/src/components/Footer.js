import React from 'react';

const Footer = ({ onNavigate }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto glass-panel rounded-t-[2.5rem] border-b-0 border-r-0 border-l-0 pt-16 pb-10 relative z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.02)]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
                    
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <a href="#" className="flex items-center gap-2 mb-6">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#004a9f] to-[#04a9cf] text-white shadow-md border border-white/40">
                                <iconify-icon icon="solar:book-bookmark-linear" className="text-sm"></iconify-icon>
                            </div>
                            <span className="text-xl font-medium tracking-tight text-slate-900">FOSSEE</span>
                        </a>
                        <p className="text-sm font-light text-slate-600 leading-relaxed mb-8">
                            Promoting the use of open-source software in educational institutions through interactive workshops.
                        </p>
                        <div className="flex items-center gap-4 text-slate-500">
                            <a href="#" className="hover:text-[#004a9f] hover:-translate-y-1 transition-all glass-button p-2.5 rounded-full">
                                <iconify-icon icon="solar:global-linear" className="text-xl flex"></iconify-icon>
                            </a>
                            <a href="#" className="hover:text-[#04a9cf] hover:-translate-y-1 transition-all glass-button p-2.5 rounded-full">
                                <iconify-icon icon="solar:letter-linear" className="text-xl flex"></iconify-icon>
                            </a>
                            <a href="#" className="hover:text-emerald-600 hover:-translate-y-1 transition-all glass-button p-2.5 rounded-full">
                                <iconify-icon icon="solar:users-group-rounded-linear" className="text-xl flex"></iconify-icon>
                            </a>
                        </div>
                    </div>

                    {/* Nav Column 1 */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-6 uppercase tracking-wider">Platform</h4>
                        <ul className="space-y-4">
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                                    className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('workshops'); }}
                                    className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Browse Workshops
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('statistics'); }}
                                    className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Statistics
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('types'); }}
                                    className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Workshop Types
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Nav Column 2 */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-6 uppercase tracking-wider">User</h4>
                        <ul className="space-y-4">
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('profile'); }}
                                    className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); onNavigate('workshops'); }}
                                    className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    My Enrollments
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors">Account Settings</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors">Certificates</a>
                            </li>
                        </ul>
                    </div>

                    {/* Nav Column 3 */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-6 uppercase tracking-wider">Resources</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors">Documentation</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors">Help Center / FAQ</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors">Contact Support</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors">Guidelines</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-slate-300/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-light text-slate-500">
                        © {currentYear} FOSSEE Workshops. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-sm font-light text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm font-light text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a>
                        <a href="#" className="text-sm font-light text-slate-500 hover:text-slate-900 transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
