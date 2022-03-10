import React, { useContext, useState, useEffect } from 'react';
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

const TemperatureChart: React.FC<GraphsContainerProps> = React.memo(
  ({ sizing, colourGenerator }) => {
    const { healthData } = useContext(HealthContext);
    const [data, setData] = useState<Array<Array<string | (string | number)[]>>>([]);

    useEffect(() => {
      if (healthData.length) {
        const tempArr: ((string | number)[] | string)[][] = [];
        healthData.forEach(
          (service: { time: string[]; cputemp: (string | number)[]; service: string[] }) => {
            let timeArr: string[] = [];
            if (service.time !== undefined) {
              timeArr = service.time.map((el: any) => moment(el).format('kk:mm:ss'));
            }

            const temp: [string[], (string | number)[], string] = [
              timeArr,
              service.cputemp,
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
        marker: {
          color: any;
          size: any;
        };
        mode: any;
        showlegend: any;
      }[] = [];

      plotlyData = data.map(dataArr => {
        const hashedColor = colourGenerator(dataArr[2]);

        return {
          name: dataArr[2],
          x: data[0][0],
          y: dataArr[1],
          marker: {
            color: hashedColor,
            size: 5,
          },
          type: 'scatter',
          mode: 'lines',
          showlegend: true,
        };
      });

      const sizeSwitch = sizing === 'all' ? all : solo;

      return (
        <Plot
          data={[...plotlyData]}
          config={{ responsive: true }}
          layout={{
            title: 'CPU Temperature',
            ...sizeSwitch,
            font: {
              color: '#444d56',
              size: 11.5,
              family: 'Roboto',
            },
            paper_bgcolor: 'white',
            plot_bgcolor: 'white',
            legend: {
              orientation: 'h',
              xanchor: 'center',
              x: 0.5,
              y: 5,
            },
            xaxis: {
              title: 'Time (EST)',
              tickmode: 'linear',
              tickformat: '%H %M %p',
              mirror: false,
              ticks: 'outside',
              showline: true,
            },
            yaxis: {
              title: `Temperature (\xB0C)`,
              rangemode: 'nonnegative',
              mirror: false,
              ticks: 'outside',
              showline: true,
            },
          }}
        />
      );
    };

    return (
      <div className="chart" data-testid="Temperature Chart">
        {createChart()}
      </div>
    );
  }
);

export default TemperatureChart;
