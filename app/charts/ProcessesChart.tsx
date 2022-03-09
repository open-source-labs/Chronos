/** Version 5.2
 * You should probably take a look and fix the legend for the graph.
 * Can compare services, but hard to tell which points of data belong to which server.
 */

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

const ProcessesChart: React.FC<GraphsContainerProps> = React.memo(({ sizing, colourGenerator }) => {
  const { healthData } = useContext(HealthContext);
  const createChart = () => {
    const [solo, setSolo] = useState<SoloStyles | null>(null);

    const [data, setData] = useState<Array<Array<string | Array<string>>>>([]);

    setInterval(() => {
      if (solo !== soloStyle) {
        setSolo(soloStyle);
      }
    }, 20);

    useEffect(() => {
      if (healthData.length) {
        const tempArr: [string, string[], string[], string[]][] = [];

        healthData.forEach(
          (service: {
            service: string[];
            runningprocesses: string[];
            blockedprocesses: string[];
            sleepingprocesses: string[];
          }) => {
            const temp: [string, string[], string[], string[]] = [
              service.service[0],
              service.runningprocesses,
              service.blockedprocesses,
              service.sleepingprocesses,
            ];
            tempArr.push(temp);
          }
        );

        setData(tempArr);
      }
    }, [healthData]);

    const sizeSwitch = sizing === 'all' ? all : solo;

    /** From Version 5.2 Team:
     * The below @interface DataObject is the proper typing.
     * The interface starting at Line 80-89 is in place because it works.
     */

    // interface DataObject {
    //   type: string;
    //   y: string | [];
    //   mode: string;
    //   name: string;
    //   marker: {
    //     color: string;
    //     size: number;
    //   };
    // }

    interface DataObject {
      type: any;
      y: any;
      mode: any;
      name: any;
      marker: {
        color: any;
        size: any;
      };
    }

    let plotlyData: DataObject[][] = [];

    plotlyData = data.map(dataArr => {
      const hashedColor = colourGenerator(dataArr[0]);
      const tempArr: DataObject[] = [];
      for (let i = 1; i < dataArr.length; i++) {
        if (i === 1) {
          const temp: DataObject = {
            type: 'scattergl',
            y: dataArr[i],
            mode: 'markers',
            name: 'Running Processes',
            marker: {
              color: hashedColor,
              size: 3,
            },
          };
          tempArr.push(temp);
        } else if (i === 2) {
          const temp: DataObject = {
            type: 'scatter',
            y: dataArr[i],
            mode: 'markers',
            name: 'Blocked Processes',
            marker: {
              color: hashedColor,
              size: 3,
            },
          };
          tempArr.push(temp);
        } else {
          const temp: DataObject = {
            type: 'scatter',
            y: dataArr[i],
            mode: 'markers',
            name: 'Sleeping Processes',
            marker: {
              color: hashedColor,
              size: 3,
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
          title: 'Process Overview',
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
            y: -1.0,
            font: {
              size: 9,
            },
          },
          xaxis: {
            dtick: 10,
            title: 'Time Elapsed (min)',
          },
          yaxis: {
            title: 'Number of Processes',
          },
        }}
      />
    );
  };

  return <div className="chart">{createChart()}</div>;
});

export default ProcessesChart;
