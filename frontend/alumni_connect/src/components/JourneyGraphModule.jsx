import React from 'react';
import { Briefcase, GraduationCap, Globe, MapPin, Zap, TrendingUp, BookOpen, Plus } from 'lucide-react';

// --- Icon and Color Mapping ---
const MilestoneIconMap = {
    'Job': { icon: Briefcase, color: 'bg-emerald-600', cardColor: 'border-emerald-400', textColor: 'text-emerald-700' },
    'Internship': { icon: Briefcase, color: 'bg-indigo-600', cardColor: 'border-indigo-400', textColor: 'text-indigo-700' },
    'Higher Study': { icon: GraduationCap, color: 'bg-rose-600', cardColor: 'border-rose-400', textColor: 'text-rose-700' },
    'Education': { icon: GraduationCap, color: 'bg-rose-600', cardColor: 'border-rose-400', textColor: 'text-rose-700' },
    'Project': { icon: Zap, color: 'bg-amber-500', cardColor: 'border-amber-400', textColor: 'text-amber-700' },
    'Achievement': { icon: Zap, color: 'bg-purple-600', cardColor: 'border-purple-400', textColor: 'text-purple-700' },
    'Location': { icon: MapPin, color: 'bg-blue-600', cardColor: 'border-blue-400', textColor: 'text-blue-700' },
    'Default': { icon: Globe, color: 'bg-gray-600', cardColor: 'border-gray-400', textColor: 'text-gray-700' },
};

// --- Sample Data (Fallback) ---
const sampleAlumniMilestones = [
    { year: '2020', milestone: 'Started College', description: 'B.Tech in Computer Science.', skillsGained: 'C, Mathematics', type: 'Education' },
    { year: '2021', milestone: 'First Hackathon', description: 'Built a simple weather app using JS.', skillsGained: 'HTML, CSS, JS', type: 'Project' },
    { year: '2022', milestone: 'Summer Intern', description: 'Frontend intern at a local startup.', skillsGained: 'React, Git', type: 'Internship' },
    { year: '2023', milestone: 'Lead Developer', description: 'Led the college tech fest website team.', skillsGained: 'Teamwork, Node.js', type: 'Achievement' },
];

const JourneyGraphModule = ({ 
    milestones, 
    title = "My Career Journey", 
    onAddClick,
    showBackButton = false,
    onBackClick 
}) => {
    const dataToDisplay = milestones && milestones.length > 0 ? milestones : sampleAlumniMilestones;
    const numMilestones = dataToDisplay.length;

    // --- Layout Configuration ---
    const MILESTONE_SPACING = 280; // Increased spacing for better readability
    const SVG_PADDING_X = 50;      // Padding on left/right of the SVG
    const START_OFFSET = 100;      // Space before the first node starts
    
    // Dynamic Width Calculation
    const finalWidth = Math.max(
        START_OFFSET + (numMilestones - 1) * MILESTONE_SPACING + START_OFFSET + SVG_PADDING_X, 
        800
    );
    
    const svgHeight = 400;
    const centerlineY = svgHeight / 2;
    const amplitude = 60; // How much the wave goes up/down

    // --- 1. Calculate Points ---
    const milestonePoints = dataToDisplay.map((_, index) => {
        const x = START_OFFSET + index * MILESTONE_SPACING;
        // Oscillate: Even indices go DOWN (positive Y), Odd indices go UP (negative Y)
        // Note: In SVG, Y increases downwards.
        const yOffset = index % 2 === 0 ? amplitude : -amplitude; 
        const y = centerlineY + yOffset;
        return { x, y };
    });

    // --- 2. Construct Smooth Path (S-Curve Logic) ---
    let svgPathD = `M 0 ${centerlineY}`; // Start at far left center

    // Curve to the first point
    if (milestonePoints.length > 0) {
        const first = milestonePoints[0];
        svgPathD += ` C ${first.x * 0.5} ${centerlineY}, ${first.x * 0.5} ${first.y}, ${first.x} ${first.y}`;
    }

    // Curve between points
    for (let i = 0; i < milestonePoints.length - 1; i++) {
        const curr = milestonePoints[i];
        const next = milestonePoints[i + 1];
        
        // Calculate control points for a smooth S-curve
        // We place control points halfway between X positions, but at the same Y level as the start/end node
        const cp1X = curr.x + (next.x - curr.x) / 2;
        const cp1Y = curr.y;
        const cp2X = curr.x + (next.x - curr.x) / 2;
        const cp2Y = next.y;

        svgPathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${next.x} ${next.y}`;
    }

    // Curve to the end
    if (milestonePoints.length > 0) {
        const last = milestonePoints[milestonePoints.length - 1];
        svgPathD += ` C ${last.x + 100} ${last.y}, ${last.x + 100} ${centerlineY}, ${finalWidth} ${centerlineY}`;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 z-10 relative">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-indigo-600" /> {title}
                </h2>
                {onAddClick && (
                    <button 
                        onClick={onAddClick}
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-md"
                    >
                        <Plus className="w-4 h-4" /> Add Milestone
                    </button>
                )}
            </div>

            {/* Scrollable Graph Container */}
            <div className="relative flex-1 overflow-x-auto custom-scrollbar bg-slate-50/30">
                <div 
                    className="relative" 
                    style={{ width: `${finalWidth}px`, height: `${svgHeight}px` }}
                >
                    
                    {/* --- SVG Layer --- */}
                    <svg
                        className="absolute top-0 left-0 pointer-events-none"
                        width={finalWidth}
                        height={svgHeight}
                        viewBox={`0 0 ${finalWidth} ${svgHeight}`}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Shadow Line (Depth) */}
                        <path
                            d={svgPathD}
                            fill="none"
                            stroke="rgba(0,0,0,0.05)"
                            strokeWidth="48"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Main Road Surface */}
                        <path
                            d={svgPathD}
                            fill="none"
                            stroke="#334155" // Slate-700
                            strokeWidth="40"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Center Stripes */}
                        <path
                            d={svgPathD}
                            fill="none"
                            stroke="#ffffff" 
                            strokeWidth="2"
                            strokeDasharray="12 12" 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-80"
                        />
                    </svg>

                    {/* --- Elements Layer --- */}
                    {dataToDisplay.map((milestone, index) => {
                        const { x, y } = milestonePoints[index];
                        const { icon: Icon, color: iconColor, cardColor, textColor } = MilestoneIconMap[milestone.type] || MilestoneIconMap.Default;
                        
                        // Determine Card Position:
                        // If Y is > centerline (point is low), card goes ABOVE.
                        // If Y is < centerline (point is high), card goes BELOW.
                        const isPointLow = y > centerlineY;
                        const cardTop = isPointLow ? y - 200 : y + 50; // 200 is approx card height + offset

                        return (
                            <React.Fragment key={index}>
                                {/* Connection Dot (The anchor on the road) */}
                                <div 
                                    className="absolute w-4 h-4 bg-slate-800 rounded-full border-2 border-white shadow-sm z-10"
                                    style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                                />

                                {/* Pin Marker */}
                                <div
                                    className="absolute z-20 group cursor-pointer"
                                    style={{
                                        left: `${x}px`,
                                        top: `${y}px`,
                                        transform: 'translate(-50%, -100%)', // Anchors bottom of pin to x,y
                                        paddingBottom: '10px' // Slight visual offset so pin touches road
                                    }}
                                >
                                    {/* The Pin Shape */}
                                    <div className={`w-12 h-12 ${iconColor} rounded-full flex items-center justify-center border-4 border-white shadow-xl relative transition-transform duration-300 group-hover:scale-110`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    {/* Stick connector (optional, if you want a signpost look) */}
                                    <div className="w-1 h-3 bg-slate-800 mx-auto -mt-1 rounded-b-full opacity-50"></div>
                                </div>

                                {/* Info Card */}
                                <div
                                    className={`absolute w-[260px] p-4 bg-white rounded-xl shadow-lg hover:shadow-xl hover:z-30 transition-all duration-300 z-10 border-t-4 ${cardColor} group`}
                                    style={{
                                        left: `${x}px`,
                                        top: `${cardTop}px`,
                                        transform: 'translateX(-50%)',
                                    }}
                                >
                                    {/* Connecting Line from Card to Road (Optional Visual Aid) */}
                                    <div 
                                        className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-slate-200 -z-10
                                            ${isPointLow ? 'bottom-[-30px] h-[30px]' : 'top-[-30px] h-[30px]'}
                                        `}
                                    ></div>

                                    <div className="flex items-center mb-2 justify-between">
                                        <div className={`px-2.5 py-1 rounded-md text-white font-bold text-[11px] flex items-center justify-center ${iconColor}`}>
                                            {milestone.year}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-100 px-1.5 py-0.5 rounded">{milestone.type}</span>
                                    </div>
                                    
                                    <h3 className={`text-base font-bold ${textColor} mb-1 leading-tight`}>{milestone.milestone}</h3>
                                    <p className="text-slate-500 text-xs line-clamp-3 mb-3 leading-relaxed">{milestone.description}</p>
                                    
                                    {milestone.skillsGained && (
                                        <div className="mt-2 pt-2 border-t border-slate-100">
                                            <div className="flex flex-wrap gap-1.5">
                                                {milestone.skillsGained.split(',').map((skill, i) => (
                                                    <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-600 font-medium">
                                                        {skill.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            
            {/* Back Button */}
            {showBackButton && (
                <div className="p-4 border-t border-slate-100 flex justify-center bg-white z-10">
                    <button
                        type="button"
                        onClick={onBackClick}
                        className="flex items-center justify-center px-6 py-2.5 border border-slate-200 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 transition duration-150"
                    >
                        <BookOpen className="w-4 h-4 mr-2" /> Back to Dashboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default JourneyGraphModule;