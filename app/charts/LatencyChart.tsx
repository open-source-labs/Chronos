import React, { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';
import { HealthContext } from '../context/HealthContext';
import { all, solo as soloStyle } from './sizeSwitch';

interface GraphsContainerProps {
  sizing: string;
  colourGenerator: Function;
}

interface SoloStyles {
  height: number;
  width: number;
}

const LatencyChart: React.FC<GraphsContainerProps> = React.memo(({ sizing, colourGenerator }) => {
  const { healthData } = useContext(HealthContext);
  const [data, setData] = useState<Array<Array<string | (string | number)[]>>>([]);

  useEffect(() => {
    if (healthData.length) {
      const tempArr: ((string | number)[] | string)[][] = [];

      healthData.forEach(
        (service: { time: string[]; latency: (string | number)[]; service: string[] }) => {
          let timeArr: string[] = [];

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

  const [solo, setSolo] = useState<SoloStyles | null>(null);

  setInterval(() => {
    if (solo !== soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
    let plotlyData: {
      name: any;
      x: any;
      y: any;
      type: any;
      mode: any;
      marker: { color: string };
    }[] = [];
    plotlyData = data.map(dataArr => {
      const hashedColour = colourGenerator(dataArr[2]);

      return {
        name: dataArr[2],
        x: data[0][0],
        y: dataArr[1],
        type: 'scattergl',
        mode: 'lines',
        marker: { color: hashedColour },
      };
    });
    const sizeSwitch = sizing === 'all' ? all : solo;

    return (
      <Plot
        data={[...plotlyData]}
        config={{ displayModeBar: false }}
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
            title: 'Milliseconds (ms)',
          },
        }}
      />
    );
  };

  return (
    <div className="chart" data-testid="Latency Chart">
      {createChart()}
    </div>
  );
});

export default LatencyChart;
