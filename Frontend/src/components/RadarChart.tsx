import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
interface SimpleRadarChartProps {
  data: { stat: string; A: number; fullMark: number}[];
}

// #endregion
const SimpleRadarChart = ( {data}: SimpleRadarChartProps ) => {
  return (
    <RadarChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px', aspectRatio: 1 }}
      responsive
      outerRadius="80%"
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="stat" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <RechartsDevtools />
    </RadarChart>

  );
};

export default SimpleRadarChart;