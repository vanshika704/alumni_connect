import React from 'react';
import { Briefcase, GraduationCap, Globe, MapPin, Zap, TrendingUp, BookOpen, Clock } from 'lucide-react';

// --- Icon and Color Mapping ---
const MilestoneIconMap = {
    'Job': { icon: Briefcase, color: 'bg-green-600', cardColor: 'border-green-400', textColor: 'text-green-700' },
    'Higher Study': { icon: GraduationCap, color: 'bg-red-600', cardColor: 'border-red-400', textColor: 'text-red-700' },
    'Project': { icon: Zap, color: 'bg-yellow-600', cardColor: 'border-yellow-400', textColor: 'text-yellow-700' },
    'Location': { icon: MapPin, color: 'bg-blue-600', cardColor: 'border-blue-400', textColor: 'text-blue-700' },
    'Default': { icon: Globe, color: 'bg-gray-600', cardColor: 'border-gray-400', textColor: 'text-gray-700' },
};

// --- Sample Data (Fallback) ---
const sampleAlumniMilestones = [
    { year: '2010', milestone: 'Graduated College', description: 'Completed B.Tech in CS. Founded first open-source project.', skillsGained: 'Data Structures, C++', type: 'Higher Study' },
    { year: '2011', milestone: 'Junior Software Developer', description: 'Joined TechCorp, first commercial coding experience.', skillsGained: 'Java, Spring Boot', type: 'Job' },
    { year: '2015', milestone: 'MBA from IIM A', description: 'Pivoted career path into management and leadership.', skillsGained: 'Strategy, Finance, Leadership', type: 'Higher Study' },
    { year: '2017', milestone: 'Senior Product Manager', description: 'Managed key product features for a high-growth startup.', skillsGained: 'Product Strategy, Market Analysis', type: 'Job' },
    { year: '2022', milestone: 'VP of Product', description: 'Currently leading a global team of Product Managers at Nexus.', skillsGained: 'Executive Leadership, Scaling Operations', type: 'Job' },
];

/**
 * Renders a full-width, visually enhanced roadmap with alternating milestone card placement.
 */
const JourneyGraphModule = ({ milestones, setView }) => {
    const dataToDisplay = milestones && milestones.length > 0 ? milestones : sampleAlumniMilestones;
    const numMilestones = dataToDisplay.length;

    if (numMilestones === 0) {
        // ... (No milestones fallback - same as before)
         return (
             <div className="p-8 space-y-4 bg-gray-100 rounded-lg shadow-xl text-center">
                 <h3 className="text-xl font-bold text-red-500 flex items-center justify-center">
                     <Clock className="w-6 h-6 mr-2" /> No Milestones Entered!
                 </h3>
                 <p className="text-gray-600">Please enter at least one milestone in the registration form.</p>
                 <button
                     type="button"
                     onClick={() => setView('alumni-register')}
                     className="mt-4 px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700"
                 >
                     &larr; Back to Registration
                 </button>
             </div>
         );
    }
    
    // Calculate total SVG width based on the number of milestones
    const MILESTONE_SPACING = 250; // Horizontal space between milestones
    const SVG_PADDING = 100; // Padding on both ends
    const finalWidth = (numMilestones - 1) * MILESTONE_SPACING + SVG_PADDING * 2;
    const svgHeight = 400; // Fixed SVG height
    const centerlineY = svgHeight / 2; // Y-coordinate of the roadmap's center

    // Calculate dynamic X and Y positions for milestones and construct the SVG path
    const milestonePoints = dataToDisplay.map((_, index) => {
        const x = SVG_PADDING + index * MILESTONE_SPACING;
        // Y oscillation: A gentle wave pattern
        const yOffset = index % 2 === 0 ? 30 : -40;
        const y = centerlineY + yOffset;
        return { x, y };
    });

    // 1. Construct the SVG Path (Cubic Bezier for smoothness)
    let svgPathD = `M ${milestonePoints[0].x - SVG_PADDING} ${centerlineY}`;
    for (let i = 0; i < milestonePoints.length; i++) {
        const curr = milestonePoints[i];
        
        // Ensure a starting point for the first segment
        if (i === 0) {
            svgPathD += ` L ${curr.x} ${curr.y}`; // Start line to the first point
        } else {
            const prev = milestonePoints[i - 1];
            // Control points for a smooth transition
            const cpX1 = prev.x + MILESTONE_SPACING * 0.4;
            const cpY1 = prev.y + (curr.y - prev.y) * 0.2;
            const cpX2 = curr.x - MILESTONE_SPACING * 0.4;
            const cpY2 = curr.y - (curr.y - prev.y) * 0.2;

            svgPathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
        }
    }
    // Extend the line slightly past the last milestone
    svgPathD += ` L ${finalWidth} ${centerlineY}`;

    return (
        <div className="p-8 space-y-8 bg-gray-50 rounded-lg shadow-2xl w-full max-w-full mx-auto overflow-x-auto">
            <h2 className="text-3xl font-extrabold text-neutral-800 border-b pb-4 flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-neutral-600" /> Alumni Career Journey Map
            </h2>
            

            {/* --- Main Timeline Container with SVG Curve (The Road) --- */}
            <div className="relative pb-5">
                <div 
                    className="relative mx-auto" 
                    style={{ width: `${finalWidth}px`, height: `${svgHeight}px` }}
                >
                    
                    {/* 1. SVG Path (The Road) */}
                    <svg
                        className="absolute top-0 left-0"
                        width={finalWidth}
                        height={svgHeight}
                        viewBox={`0 0 ${finalWidth} ${svgHeight}`}
                    >
                        {/* Road Surface (Dark Background - Styled with a slight border/shadow effect) */}
                        <path
                            d={svgPathD}
                            fill="none"
                            stroke="#374151" // Gray-700 for the road surface
                            strokeWidth="45" // Wide stroke
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ filter: 'drop-shadow(3px 3px 5px rgba(0,0,0,0.3))' }} // CSS filter for better shadow
                        />
                        {/* Lane Markings (Dashed White Line) */}
                        <path
                            d={svgPathD}
                            fill="none"
                            stroke="#ffffff" // White for lane markings
                            strokeWidth="3"
                            strokeDasharray="15 15" // Dashed line
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* 2. Milestone Elements (Road Pins and Info Cards) */}
                    {dataToDisplay.map((milestone, index) => {
                        const { x: positionX, y: positionY } = milestonePoints[index];
                        const { icon: Icon, color: iconColor, cardColor, textColor } = MilestoneIconMap[milestone.type] || MilestoneIconMap.Default;
                        
                        const isCardAbove = index % 2 === 0; // Card alternates above/below
                        const cardOffset = 90; // Distance of card from the pin
                        
                        // Vertical position for the Card container
                        const cardTopPosition = isCardAbove 
                            ? positionY - cardOffset - 150 // Above the curve
                            : positionY + cardOffset;     // Below the curve

                        return (
                            <React.Fragment key={index}>
                                {/* Road Pin (The colored dot on the road) */}
                                <div
                                    className="absolute z-20"
                                    style={{
                                        left: `${positionX}px`,
                                        top: `${positionY}px`,
                                        transform: 'translate(-50%, -100%)', // Anchor to the tip of the pin
                                    }}
                                >
                                    {/* Pin Structure: Stick and Circle (Matches image style) */}
                                    <div className="h-10 w-2 bg-gray-700 mx-auto rounded-t-full shadow-md"></div>
                                    <div className={`w-10 h-10 ${iconColor} rounded-full flex items-center justify-center border-4 border-white shadow-xl -mt-2`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                {/* Milestone Content Card (Alternating Above/Below) */}
                                <div
                                    className={`absolute w-[250px] p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 z-10 border-t-4 ${cardColor}`}
                                    style={{
                                        left: `${positionX}px`,
                                        top: `${cardTopPosition}px`, 
                                        transform: 'translateX(-50%)',
                                    }}
                                >
                                    {/* Numbered Header (Mimics the image style) */}
                                    <div className="flex items-center mb-2">
                                        <div className={`w-6 h-6 rounded-full text-white font-bold text-sm flex items-center justify-center mr-2 ${iconColor}`}>
                                            {index + 1}
                                        </div>
                                        <h3 className={`text-lg font-bold ${textColor}`}>{milestone.milestone}</h3>
                                    </div>
                                    
                                    <p className="text-sm font-semibold text-neutral-800 mb-1">{milestone.year}</p>
                                    <p className="text-gray-600 text-xs line-clamp-2">{milestone.description}</p>
                                    <div className="mt-2 text-xs text-gray-500 font-medium italic pt-1">
                                        Skills: {milestone.skillsGained || 'N/A'}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            
            {/* Back Button */}
            <button
                type="button"
                onClick={() => setView('alumni-register')}
                className="mt-10 w-full flex items-center justify-center py-2 border border-gray-300 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
            >
                <BookOpen className="w-5 h-5 mr-2" /> Back to Alumni Registration
            </button>
        </div>
    );
};

export default JourneyGraphModule;