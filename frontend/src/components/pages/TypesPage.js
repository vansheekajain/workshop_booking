import React from 'react';

const TypesPage = () => {
    const categories = [
        {
            id: 1,
            title: 'Programming',
            description: 'Python, C++, Java, and software development foundations.',
            icon: 'solar:code-linear',
            color: 'text-blue-600',
            bgColor: 'text-blue-500'
        },
        {
            id: 2,
            title: 'Hardware',
            description: 'Arduino, Raspberry Pi, and embedded systems design.',
            icon: 'solar:cpu-linear',
            color: 'text-emerald-600',
            bgColor: 'text-emerald-500'
        },
        {
            id: 3,
            title: 'Data Science',
            description: 'R, Scilab, data visualization, and machine learning.',
            icon: 'solar:chart-linear',
            color: 'text-purple-600',
            bgColor: 'text-purple-500'
        },
        {
            id: 4,
            title: 'Engineering',
            description: 'OpenFOAM, eSim, CAD, and advanced simulation tools.',
            icon: 'solar:ruler-pen-linear',
            color: 'text-orange-600',
            bgColor: 'text-orange-500'
        }
    ];

    return (
        <div className="page-section w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-medium tracking-tight text-slate-900 drop-shadow-sm">Workshop Categories</h2>
                <p className="mt-4 text-base font-light text-slate-700 max-w-2xl mx-auto">Explore different domains and find the right path for your learning journey.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category) => (
                    <div 
                        key={category.id}
                        className="glass-card rounded-3xl p-8 text-center group hover:-translate-y-2 cursor-pointer"
                    >
                        <div className={`mx-auto w-16 h-16 rounded-2xl glass-inner flex items-center justify-center ${category.color} mb-6 group-hover:scale-110 transition-all shadow-sm`}>
                            <iconify-icon icon={category.icon} className="text-3xl"></iconify-icon>
                        </div>
                        <h3 className="text-xl font-medium text-slate-900 mb-3">{category.title}</h3>
                        <p className="text-sm font-light text-slate-600 leading-relaxed">{category.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TypesPage;
