import React, { useContext, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
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

const MemoryChart: React.FC<GraphsContainerProps> = React.memo(({ sizing, colourGenerator }) => {
  const { healthData } = useContext(HealthContext);
  const createChart = () => {
    const [solo, setSolo] = useState<SoloStyles | null>(null);

    const [data, setData] = useState<Array<Array<string> | string>>([]);

    setInterval(() => {
      if (solo !== soloStyle) {
        setSolo(soloStyle);
      }
    }, 20);

    useEffect(() => {
      if (healthData.length) {
        healthData.forEach(
          (service: {
            service: any[];
            freememory: string;
            usedmemory: string;
            activememory: string;
          }) => {
            const temp: any[] = [
              service.service[0],
              service.freememory,
              service.usedmemory,
              service.activememory,
            ];
            setData(data.concat([temp]));
          }
        );
      }
    }, [healthData]);

    const sizeSwitch = sizing === 'all' ? all : solo;

    /** From Version 5.2 Team:
     * The below @interface DataObject is the proper typing.
     * The interface starting at Line 69-79 is in place because it works.
     */

    interface DataObject {
      type: any;
      mode: any;
      y: any;
      name: any;
      marker: {
        color: any;
        size: any;
        symbol: any;
      };
    }

    let plotlyData: DataObject[][] = [];

    const serviceMarker: string[] = [
      'square-dot',
      'hexagram-dot',
      'star-diamond',
      'bowtie-open',
      'hourglass',
      'line-ew',
    ];

    plotlyData = data.map((dataArr, index) => {
      const hashedColor = colourGenerator(dataArr[0]);
      const tempArr: DataObject[] = [];
      for (let i = 1; i < dataArr.length; i++) {
        if (i === 1) {
          const temp: DataObject = {
            type: 'scattergl',
            mode: 'lines+markers',
            y: dataArr[i],
            name: `${dataArr[0]} - Free Memory`,
            marker: {
              color: hashedColor,
              size: 5,
              symbol: serviceMarker[index],
            },
          };
          tempArr.push(temp);
        } else if (i === 2) {
          const temp: DataObject = {
            type: 'scatter',
            mode: 'lines+markers',
            y: dataArr[i],
            name: `${dataArr[0]} - Used Memory`,
            marker: {
              color: hashedColor,
              size: 5,
              symbol: serviceMarker[index],
            },
          };
          tempArr.push(temp);
        } else {
          const temp: DataObject = {
            type: 'scatter',
            mode: 'lines+markers',
            y: dataArr[i],
            name: `${dataArr[0]} - Active Memory`,
            marker: {
              color: hashedColor,
              size: 5,
              symbol: serviceMarker[index],
            },
          };
          tempArr.push(temp);
        }
      }

      return tempArr;
    });

    return (
      <Plot
        data={[...plotlyData.flat()]}
        layout={{
          title: 'Memory Traces',
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
            y: -1,
            font: {
              size: 9,
            },
          },
          xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 10,
            title: 'Time Elapsed (min)',
          },
          yaxis: {
            title: 'Gigabytes',
          },
        }}
      />
    );
  };

  return <div className="chart">{createChart()}</div>;
});

export default MemoryChart;
