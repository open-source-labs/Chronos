import moment from 'moment';
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { all, solo as soloStyle } from './sizeSwitch';

// interface AwsCpuChartProps {
//   key: string;
//   renderService: string;
//   metric: string;
//   timeList: any;
//   valueList: any;
//   sizing: string;
//   colourGenerator: Function;
// }

interface SoloStyles {
  height: number;
  width: number;
}

/** 
 * @params props - the props object containing relevant data.
 * @desc Handles AWS Charts. Memoized component to generate an AWS chart with formatted data.
 * @returns {JSX.Element} The JSX element with the AWS chart.
 */
const AwsChart: React.FC<any> = React.memo(props => {
  const { renderService, metric, timeList, valueList, colourGenerator, sizing } = props;
  const [solo, setSolo] = useState<SoloStyles | null>(null);
  setInterval(() => {
    if (solo !== soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
    const timeArr = timeList?.map((el: any) => moment(el).format('kk:mm:ss'));
    // const hashedColour = colourGenerator(renderService);
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
      x: timeArr,
      y: valueList,
      type: 'scattergl',
      mode: 'lines',
      marker: { color: colourGenerator() },
    };
    const sizeSwitch = sizing === 'all' ? all : solo;

    return (
      <Plot
        data={[plotlyData]}
        config={{ displayModeBar: false }}
        layout={{
          title: `${renderService} | ${metric}`,
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
    <div className="chart" data-testid="Health Chart">
      {createChart()}
    </div>
  );
});

export default AwsChart;
