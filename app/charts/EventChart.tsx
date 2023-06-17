import moment from 'moment';
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { all, solo as soloStyle } from './sizeSwitch';

interface ChartData {
  value: string[];
  time: string[];
}

interface EventChartProps {
  key: string;
  metricName: string;
  chartData: ChartData
}

interface SoloStyles {
  height: number;
  width: number;
}

const EventChart: React.FC<EventChartProps> = React.memo(props => {
  const { metricName, chartData  } = props;
  const [solo, setSolo] = useState<SoloStyles | null>(null);

  setInterval(() => {
    if (solo !== soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
    const timeArr = timeList.map((el: any) => moment(el).format('kk:mm:ss'));
    const reverseTimeArr = timeArr.reverse()
    const hashedColour = colourGenerator(metric);
    const newMetricName =  metric.replace("kubernetes-cadvisor/docker-desktop/", ""); // this will get rid of the long path
    const re = /_/g;
    let plotlyData: {
      name: any;
      x: any;
      y: any;
      type: any;
      mode: any;
      marker: { color: string };
    };
    plotlyData = {
      name: metric,
      x: reverseTimeArr,
      y: valueList,
      type: 'scattergl',
      mode: 'lines',
      marker: { color: hashedColour },
    };
    const sizeSwitch = sizing === 'all' ? all : solo;

    return (
      <Plot
        data={[plotlyData]}
        config={{ displayModeBar: false }}
        layout={{
          title: newMetricName.replace(re," "), // this will reaplce all the underscores in the graph titlke,
          ...sizeSwitch,
          font: {
            color: '#444d56',
            size: 11.5,
            family: 'Roboto',
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          showlegend: true,
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
          },
          xaxis: {
            title: 'Time',
            tickmode: 'auto',
            tick0: 0,
            dtick: 10,
            rangemode: 'nonnegative',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
          yaxis: {
            rangemode: 'nonnegative',
            title: metric,
          },
        }}
      />
    );
  };

  return (
    <div className="chart" data-testid="Event Chart">
      {createChart()}
    </div>
  );
});

export default EventChart;
