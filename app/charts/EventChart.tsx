import { time } from 'd3';
import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { all, solo as soloStyle } from './sizeSwitch';

interface EventChartProps {
  key: string;
  metric: string;
  timeList: any;
  valueList: any;
  sizing: string;
  colourGenerator: Function;
}

interface SoloStyles {
  height: number;
  width: number;
}

const EventChart: React.FC<EventChartProps> = React.memo(props => {
  const { metric, timeList, valueList, sizing, colourGenerator } = props;
// console.log('in event chart:');
// console.log('event chart metric:', metric);
 // console.log('event chart timelist',JSON.stringify(timeList))
//  console.log('event chart valuelist', JSON.stringify(valueList));

  const [solo, setSolo] = useState<SoloStyles | null>(null);

  setInterval(() => {
    if (solo !== soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
    const timeArr = timeList.map((el: any) => moment(el).format('kk:mm:ss'));
    const hashedColour = colourGenerator(metric);
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
      marker: { color: hashedColour },
    };
    const sizeSwitch = sizing === 'all' ? all : solo;

    return (
      <Plot
        data={[plotlyData]}
        config={{ displayModeBar: false }}
        layout={{
          title: metric,
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
