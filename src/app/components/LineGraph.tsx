export default function LineGraph() {
  const data = [2, 4, 3, 8, 5, 12, 10, 15, 18, 24, 22, 28];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(" ");
  
  // Months for x-axis
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  
  return (
    <div className="h-full w-full flex flex-col">
      {/* Chart with Y-axis labels */}
      <div className="flex-1 flex min-h-0">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-[10px] text-zinc-500 pr-2 py-1">
          <span>50u</span>
          <span>40u</span>
          <span>30u</span>
          <span>20u</span>
          <span>10u</span>
          <span>0u</span>
        </div>
        
        {/* Chart area */}
        <div className="flex-1 relative min-h-0">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            {/* Grid lines */}
            {[0, 20, 40, 60, 80, 100].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#27272a" strokeWidth="0.5" />
            ))}
            
            {/* Area fill */}
            <polygon points={`0,100 ${points} 100,100`} fill="rgba(16, 185, 129, 0.1)" />
            
            {/* Line */}
            <polyline
              points={points}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* End point */}
            <circle 
              cx={100} 
              cy={100 - ((data[data.length - 1] - min) / range) * 80 - 10} 
              r="1.5" 
              fill="#10b981" 
            />
          </svg>
        </div>
      </div>
      
      {/* X-axis months */}
      <div className="flex justify-between text-[10px] text-zinc-500 mt-1 pl-8">
        {months.map((month, i) => (
          <span key={i}>{month}</span>
        ))}
      </div>
    </div>
  );
}