import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../services/apis/api';
import { useAPI } from '../../../services/hooks/hooks';
import { buildXYZData, useFormatXAxis } from '../../../services/stats';
import { DateId } from '../../../services/types';
import Scatter from '../../charts/Scatter';
import ChartCard from '../../ChartCard';
import LoadingImplementedChart from '../LoadingImplementedChart';
import { ImplementedChartProps } from '../types';
import { selectRawIntervalDetail } from '../../../services/redux/modules/user/selector';
import Tooltip from '../../Tooltip';
import { TitleFormatter } from '../../Tooltip/Tooltip';

interface SongPublicationDatePerProps extends ImplementedChartProps {}

export default function SongPublicationDatePer({
  className,
}: SongPublicationDatePerProps) {
  const { interval } = useSelector(selectRawIntervalDetail);
  const result = useAPI(
    api.publicationDatePer,
    interval.start,
    interval.end,
    interval.timesplit,
  );
  const data = buildXYZData(
    result?.map(r => ({
      x: r._id as DateId,
      y: r.pubYear,
      z: r.count,
    })) ?? [],
    interval.start,
    interval.end,
  );
  console.log(data);

  const formatX = useFormatXAxis(data);
  const formatY = useCallback((value: number) => `${value}`, []);
  const formatXAxisDateTooltip = useCallback<TitleFormatter<typeof data>>(
    (_, payload) =>
      `${payload.z} listened song(s) published in ${payload.y} at ${formatX(
        payload.x,
      )}`,
    [formatX],
  );

  if (!result) {
    return (
      <LoadingImplementedChart
        title="Song publication date distribution"
        className={className}
      />
    );
  }

  if (result.length > 0 && result[0]._id == null) {
    return null;
  }

  return (
    <ChartCard title="Song publication date distribution" className={className}>
      <Scatter
        data={data}
        xFormat={formatX}
        yFormat={formatY}
        customTooltip={
          <Tooltip title={formatXAxisDateTooltip} value={() => null} />
        }
      />
    </ChartCard>
  );
}
