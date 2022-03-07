import React, { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';
import { HealthContext } from '../context/HealthContext';
import { all, solo as soloStyle } from './sizeSwitch';

interface GraphsContainerProps {
  sizing: string;
}

interface SoloStyles {
  height: number;
  width: number;
}

const LatencyChart: React.FC<GraphsContainerProps> = React.memo(({ sizing }) => {
  const { healthData } = useContext(HealthContext);
  const [data, setData] = useState<Array<Array<string | (string | number)[]>>>([]);

useEffect(() => {
    if (healthData.length) {
      const tempArr: ((string | number)[] | string)[][] = [];
      // loop over each
      healthData.forEach(
        (service: { 
          time: string[]; 
          latency: (string | number)[]; 
          service: string[] 
        }) => {
          let timeArr: string[] = [];
          // perform this when we 'setTime'
          if (service.time !== undefined) {
            timeArr = service.time.map((el: any) => moment(el).format('kk:mm:ss'));
          }

          const temp: [string[], (string | number)[], string] = [
            timeArr,
            service.latency,
            service.service[0],
          ];
          tempArr.push(temp);
        }
      );
      setData(tempArr);
    }
  }, [healthData]);

  // FOR CHECKING
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const [solo, setSolo] = useState<SoloStyles | null>(null);

  setInterval(() => {
    if (solo != soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
    const yAxis: Array<number> = healthData.latency;

    let plotlyData: {
      name: any;
      x: any;
      y: any;
      type: any;
      mode: any;
      marker: { color: string };
    }[] = [];
    
    plotlyData = data.map(dataArr => {
      // eslint-disable-next-line no-bitwise
      const randomColor = `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
      
      return {
        name: dataArr[2],
        x: data[0][0],
        y: dataArr[1],
        type: 'scattergl',
        mode: 'lines',
        marker: { color: randomColor }
      };
    });

    
    const sizeSwitch = sizing === 'all' ? all : solo;


    return (
      <Plot
        data={[...plotlyData]}
        layout={{
          title: 'Latency',
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
            tickmode: 'linear',
            tick0: 0,
            dtick: 10,
            rangemode: 'nonnegative',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
          yaxis: {
            rangemode: 'nonnegative',
            title: 'Milliseconds (ms)',
          },
        }}
      />
    );
  };

  return <div className="chart">{solo && createChart()}</div>;
});

export default LatencyChart;
