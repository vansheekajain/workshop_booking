import React, { useState, useEffect } from 'react';
import { statisticsAPI, helpers } from '../../services/api';

const StatisticsPage = () => {
    const [timeRange, setTimeRange] = useState('6months');
    const [chartData, setChartData] = useState([
        { month: 'Jan', value: 120 },
        { month: 'Feb', value: 165 },
        { month: 'Mar', value: 135 },
        { month: 'Apr', value: 240 },
        { month: 'May', value: 195 },
        { month: 'Jun', value: 285 }
    ]);
    const [completionRate, setCompletionRate] = useState(94);
    const [partnerInstitutions, setPartnerInstitutions] = useState(86);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStatistics();
    }, [timeRange]);

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            
            // Fetch chart data
            const chartResult = await helpers.fetchWithErrorHandling(
                () => statisticsAPI.getPublicStats({ months: timeRange === '6months' ? 6 : 12 })
            );

            if (chartResult.success && chartResult.data) {
                // Format chart data - adjust based on actual API response
                const data = chartResult.data.monthly_data || [
                    { month: 'Jan', value: 120 },
                    { month: 'Feb', value: 165 },
                    { month: 'Mar', value: 135 },
                    { month: 'Apr', value: 240 },
                    { month: 'May', value: 195 },
                    { month: 'Jun', value: 285 }
                ];
                setChartData(data);
                setCompletionRate(chartResult.data.completion_rate || 94);
                setPartnerInstitutions(chartResult.data.partner_institutions || 86);
            } else {
                // Use default data
                setChartData([
                    { month: 'Jan', value: 120 },
                    { month: 'Feb', value: 165 },
                    { month: 'Mar', value: 135 },
                    { month: 'Apr', value: 240 },
                    { month: 'May', value: 195 },
                    { month: 'Jun', value: 285 }
                ]);
            }
        } catch (err) {
            console.error('Failed to fetch statistics:', err);
            setError(err.message);
            // Use default data
            setChartData([
                { month: 'Jan', value: 120 },
                { month: 'Feb', value: 165 },
                { month: 'Mar', value: 135 },
                { month: 'Apr', value: 240 },
                { month: 'May', value: 195 },
                { month: 'Jun', value: 285 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const maxValue = Math.max(...chartData.map(d => d.value));

    return (
        <div className="page-section w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
                <h2 className="text-4xl font-medium tracking-tight text-slate-900 drop-shadow-sm">Platform Statistics</h2>
                <p className="mt-3 text-base font-light text-slate-700">Detailed insights into workshop engagement and completion rates.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 glass-card rounded-3xl p-8 min-h-[450px] flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-medium text-slate-900 tracking-tight">Enrollments Overview</h3>
                        <select 
                            className="glass-button text-sm font-normal text-slate-800 px-4 py-2 rounded-xl outline-none appearance-none pr-10 relative bg-no-repeat bg-[right_0.75rem_center]"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="6months">Last 6 Months</option>
                            <option value="year">This Year</option>
                            <option value="alltime">All Time</option>
                        </select>
                    </div>
                    
                    {/* Chart */}
                    <div className="flex-1 flex items-end gap-3 sm:gap-8 pt-4 pb-2 relative h-[300px]">
                        {/* Y-axis lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none">
                            <div className="border-b border-white/60 w-full h-0"></div>
                            <div className="border-b border-white/60 w-full h-0"></div>
                            <div className="border-b border-white/60 w-full h-0"></div>
                            <div className="border-b border-white/60 w-full h-0"></div>
                            <div className="border-b border-slate-400/30 w-full h-0"></div>
                        </div>
                        
                        {/* Bars */}
                        {chartData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-3 z-10 group">
                                <div 
                                    className="w-full max-w-[3rem] bg-gradient-to-t from-[#004a9f]/80 to-[#04a9cf]/90 rounded-t-xl transition-all duration-500 group-hover:brightness-110 relative border border-white/30 border-b-0 shadow-[0_0_15px_rgba(4,169,207,0.2)]"
                                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-panel text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                        {data.value}
                                    </div>
                                </div>
                                <span className={`text-sm font-light text-slate-600 ${index === chartData.length - 1 ? 'font-medium text-slate-900' : ''}`}>
                                    {data.month}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Side Stats */}
                <div className="flex flex-col gap-8">
                    <div className="glass-card rounded-3xl p-8 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {/* Ambient glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-400/20 blur-[40px] pointer-events-none"></div>
                        
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-500/30 border border-white/40 z-10 relative">
                            <iconify-icon icon="solar:diploma-linear" className="text-4xl"></iconify-icon>
                        </div>
                        <h4 className="text-5xl font-medium tracking-tight text-slate-900 mb-2 z-10 relative drop-shadow-sm">{loading ? '-' : completionRate}%</h4>
                        <p className="text-base font-light text-slate-600 z-10 relative">Completion Rate</p>
                    </div>
                    
                    <div className="glass-card rounded-3xl p-8 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {/* Ambient glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/20 blur-[40px] pointer-events-none"></div>

                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-500/30 border border-white/40 z-10 relative">
                            <iconify-icon icon="solar:buildings-linear" className="text-4xl"></iconify-icon>
                        </div>
                        <h4 className="text-5xl font-medium tracking-tight text-slate-900 mb-2 z-10 relative drop-shadow-sm">{loading ? '-' : partnerInstitutions}</h4>
                        <p className="text-base font-light text-slate-600 z-10 relative">Partner Institutions</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
