import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../services/apis/api';
import { useAPI } from '../../../services/hooks/hooks';
import Bar from '../../charts/Bar';
import { ImplementedChartProps } from '../types';
import ChartCard from '../../ChartCard';
import LoadingImplementedChart from '../LoadingImplementedChart';
import { selectRawIntervalDetail } from '../../../services/redux/modules/user/selector';
import Tooltip from '../../Tooltip';
import { TitleFormatter, ValueFormatter } from '../../Tooltip/Tooltip';

interface SongPublicationDateBarProps extends ImplementedChartProps {}

export default function SongPublicationDateBar({
  className,
}: SongPublicationDateBarProps) {
  const { interval } = useSelector(selectRawIntervalDetail);
  const result = useAPI(
    api.publicationDateDistribution,
    interval.start,
    interval.end,
  );

  const data = useMemo(
    () =>
      result?.map((r, k) => ({
        x: k,
        y: r.count,
      })) ?? [],
    [result],
  );

  const tooltipTitle = useCallback<TitleFormatter<typeof data>>(
    ({ x }) => `Year ${result?.[x].year}`,
    [result],
  );

  const tooltipValue = useCallback<ValueFormatter<typeof data>>(
    payload => {
      const dataValue = result?.[payload.x];
      if (!dataValue) {
        return '';
      }
      return `You listened to ${dataValue.count} songs published in this year`;
    },
    [result],
  );

  if (!result) {
    return (
      <LoadingImplementedChart
        title="Song publication date"
        className={className}
      />
    );
  }

  return (
    <ChartCard title="Song publication date" className={className}>
      <Bar
        data={data}
        xFormat={x => `${result[x].year}`}
        customTooltip={<Tooltip title={tooltipTitle} value={tooltipValue} />}
      />
    </ChartCard>
  );
}
