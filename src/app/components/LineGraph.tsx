export default function LineGraph() {
  const data = [2, 4, 3, 8, 5, 12, 10, 15, 18, 24, 22, 28];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Convert data to SVG coordinates
  const getPoint = (value: number, i: number) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 80 - 10;
    return { x, y };
  };

  const points = data.map((value, i) => getPoint(value, i));

  // Generate smooth cubic Bézier path
  const generateSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return "";
    
    let d = `M ${pts[0].x},${pts[0].y}`;
    
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    
    return d;
  };

  const smoothPath = generateSmoothPath(points);

  // Area fill path (close the loop at bottom)
  const areaPath = `${smoothPath} L 100,100 L 0,100 Z`;

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

            {/* Area fill with gradient */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Smooth area fill */}
            <path d={areaPath} fill="url(#areaGradient)" />

            {/* Smooth curved line with glow */}
            <path
              d={smoothPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

            {/* Inner brighter line */}
            <path
              d={smoothPath}
              fill="none"
              stroke="#34d399"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {points.map((pt, i) => (
              <g key={i}>
                {/* Outer glow dot */}
                <circle cx={pt.x} cy={pt.y} r="2.5" fill="#10b981" opacity="0.3" />
                {/* Inner bright dot */}
                <circle cx={pt.x} cy={pt.y} r="1.2" fill="#34d399" />
              </g>
            ))}
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