import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Plot from 'react-plotly.js';
import { all, solo as soloStyle } from './sizeSwitch';

interface HealthChartProps {
  key: string;
  renderService: string;
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

const HealthChart: React.FC<HealthChartProps> = React.memo(props => {
  const { service } = useParams<any>();
  const { renderService, metric, timeList, valueList, sizing, colourGenerator } = props;
  const [solo, setSolo] = useState<SoloStyles | null>(null);
  //console.log('in the HealthChart');
  //console.log('healthchart valuelist:', JSON.stringify(valueList));
  //console.log('healthchart timelist:', JSON.stringify(timeList));

  setInterval(() => {
    if (solo !== soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
   
    // if (service && renderService && service !== renderService ) {
    //   console.log("current service is:", service, "render service is:", renderService);
    //   return (<div><p>Loading...</p></div>)

    // }
    // else{
      
      const timeArr = timeList.map((el: any) => moment(el).format('kk:mm:ss'));
      const hashedColour = colourGenerator(renderService);
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

    // }
     
  };

  return (
    <div className="chart" data-testid="Health Chart">
      {
      createChart()
      }
    </div>
  );
});

export default HealthChart;
