import {
  ScatterChart,
  XAxis,
  Scatter as RScatter,
  Tooltip,
  YAxis,
  ResponsiveContainer,
  ZAxis,
  CartesianGrid,
} from 'recharts';
import { ContentType } from 'recharts/types/component/Tooltip';

interface ScatterProps {
  data: {
    x: number | string;
    y: number | null;
    z: number;
  }[];
  xFormat?: React.ComponentProps<typeof XAxis>['tickFormatter'];
  yFormat?: React.ComponentProps<typeof YAxis>['tickFormatter'];
  customTooltip?: ContentType<any, any>;
}

export default function Scatter({
  data,
  xFormat,
  yFormat,
  customTooltip,
}: ScatterProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          tickFormatter={xFormat}
          style={{ fontWeight: 'bold' }}
        />
        <YAxis
          type="number"
          dataKey="y"
          tickFormatter={yFormat}
          width={40}
          domain={['dataMin - 2', 'dataMax']}
        />
        <ZAxis dataKey="z" range={[10, 100]} />
        <RScatter data={data} fill="var(--primary)" />
        <Tooltip
          wrapperStyle={{ zIndex: 10 }}
          contentStyle={{ backgroundColor: 'var(--background)' }}
          labelStyle={{ color: 'var(--text-on-light)' }}
          content={customTooltip}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
