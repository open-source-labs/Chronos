/** FOR THE NEXT TEAM
 * You should probably take a look and fix the legend for the graph.
 * Can compare services, but hard to tell which points of data belong to which server. 
*/

/* eslint-disable no-useless-concat */
import React, { useContext, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import { all, solo as soloStyle } from './sizeSwitch';

interface GraphsContainerProps {
  sizing: string;
}

interface SoloStyles {
  height: number;
  width: number;
}

const ProcessesChart: React.FC<GraphsContainerProps> = React.memo(({ sizing }) => {
  const { healthData } = useContext(HealthContext);
  const createChart = () => {
    // const runningProcesses: Array<number> = healthData.runningprocesses;
    // const blockedProcesses: Array<number> = healthData.blockedprocesses;
    // const sleepingProcesses: Array<number> = healthData.sleepingprocesses;

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

        // loop over each
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

    let plotlyData: DataObject[][] = [];

    plotlyData = data.map(dataArr => {
      // eslint-disable-next-line no-bitwise
      const newLocal = 1 << 24;
      const randomColor = '#' + `${(newLocal * Math.random() || 0).toString(16)}`;
      const tempArr: DataObject[] = [];
      for (let i = 1; i < dataArr.length; i++) {
        // console.log(dataArr[i], i);
        if (i === 1) {
          const temp: DataObject = {
            type: 'scattergl',
            y: dataArr[i],
            mode: 'markers',
            name: 'Running Processes',
            marker: {
              color: randomColor,
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
              color: randomColor,
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
              color: randomColor,
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
