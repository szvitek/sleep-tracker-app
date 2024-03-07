import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { ChartData } from '../types';
import type { ECharts } from 'echarts';

type SleepChartProps = {
  name: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

const SleepChart = ({ name }: SleepChartProps) => {
  console.log('render');
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | null = null;
    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current);
    }

    return () => {
      chart?.dispose();
      chart = null;
    };
  }, []);

  useEffect(() => {
    let chart: ECharts | undefined;

    if (chartRef.current !== null) {
      chart = echarts.getInstanceByDom(chartRef.current);
    }

    const fetchChartData = async () => {
      chart?.showLoading();
      const response = await fetch(`${apiUrl}/api/sleeps/${name}`);
      const chartData: ChartData[] = await response.json();

      const options = {
        title: {
          text: `Sleeping hours for ${name}`,
        },
        tooltip: {},
        legend: {
          data: ['duration'],
        },
        xAxis: {
          data: chartData.map((d) => (d.date ?? '').substring(0, 10)).reverse(),
        },
        yAxis: {},
        series: [
          {
            name: 'duration',
            type: 'bar',
            data: chartData.map((d) => d.duration),
          },
        ],
      };

      chart?.setOption(options);
      chart?.hideLoading();
    };

    fetchChartData();
  }, [name]);

  return (
    <div>
      <div ref={chartRef} id="main" style={{ width: 600, height: 400 }}></div>
    </div>
  );
};
export default SleepChart;
