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

      const last7days = [];

      for (let i = 7; i >= 0; i--) {
        const today = new Date();
        today.setDate(today.getDate() - i);
        last7days.push(today.toISOString().substring(0, 10));
      }

      const durationArray = last7days.map((day) => {
        const data = chartData.find(
          ({ date }) => day === date.substring(0, 10)
        );
        return data?.duration ?? 0;
      });

      const options = {
        title: {
          text: `Sleeping hours for ${name}`,
        },
        tooltip: {},
        legend: {
          data: ['duration'],
        },
        xAxis: {
          data: last7days,
        },
        yAxis: {},
        series: [
          {
            name: 'duration',
            type: 'bar',
            data: durationArray,
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
