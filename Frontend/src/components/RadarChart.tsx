import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
export const PlayerRating = [
  { subject: 'Pace', A: 85, fullMark: 100 },
  { subject: 'Shooting', A: 92, fullMark: 100 },
  { subject: 'Passing', A: 88, fullMark: 100 },
  { subject: 'Dribbling', A: 90, fullMark: 100 },
  { subject: 'Defense', A: 45, fullMark: 100 },
  { subject: 'Physical', A: 78, fullMark: 100 },
];

// #endregion
const SimpleRadarChart = () => {
  return (
    <RadarChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px', aspectRatio: 1 }}
      responsive
      outerRadius="80%"
      data={PlayerRating}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <RechartsDevtools />
    </RadarChart>

  );
};

export default SimpleRadarChart;