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

const MemoryChart: React.FC<GraphsContainerProps> = React.memo(({ sizing }) => {
  const { healthData } = useContext(HealthContext);
  const createChart = () => {
    // const free: number[] = healthData.freememory;
    // const used: number[] = healthData.usedmemory;
    // const active: number[] = healthData.activememory;

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

    // interface DataObject {
    //   type: string;
    //   mode: string;
    //   y: string | [];
    //   name: string;
    //   marker: {
    //     color: string;
    //     size: number;
    //     symbol: string;
    //   }
    // }
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
      // eslint-disable-next-line no-bitwise
      const randomColor = `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
      const tempArr: DataObject[] = [];
      for (let i = 1; i < dataArr.length; i++) {
        if (i === 1) {
          const temp: DataObject = {
            type: 'scattergl',
            mode: 'lines+markers',
            y: dataArr[i],
            name: `${dataArr[0]} - Free Memory`,
            marker: {
              color: randomColor,
              size: 5,
              symbol: serviceMarker[index],
            },
            // legendgroup: `${dataArr[0]}`,
            // legendgrouptitle: {
            //   text: `${dataArr[0]}`,
            // },
          };
          tempArr.push(temp);
        } else if (i === 2) {
          const temp: DataObject = {
            type: 'scatter',
            mode: 'lines+markers',
            y: dataArr[i],
            name: `${dataArr[0]} - Used Memory`,
            marker: {
              color: randomColor,
              size: 5,
              symbol: serviceMarker[index],
            },
            // legendgroup: `${dataArr[0]}`,
            // legendgrouptitle: {
            //   text: `${dataArr[0]}`,
            // },
          };
          tempArr.push(temp);
        } else {
          const temp: DataObject = {
            type: 'scatter',
            mode: 'lines+markers',
            y: dataArr[i],
            name: `${dataArr[0]} - Active Memory`,
            marker: {
              color: randomColor,
              size: 5,
              symbol: serviceMarker[index],
            },
            // legendgroup: `${dataArr[0]}`,
            // legendgrouptitle: {
            //   text: `${dataArr[0]}`,
            // },
          };
          tempArr.push(temp);
        }
      }

      return tempArr;
    });

    return (
      <Plot
        data={[...plotlyData.flat()]}
        config={{ displayModeBar: false }}
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
            y: 0,
            font: {
              size: 9,
            },
          },
          xaxis: {
            tickmode: 'auto',
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

// {
//   type: 'scattergl',
//   fill: 'tonexty',
//   fillcolor: '#fc4039',
//   mode: 'none',
//   y: free,
//   name: 'Free Memory',
// },
// {
//   type: 'scatter',
//   fill: 'tonexty',
//   fillcolor: '#4b54ea',
//   mode: 'none',
//   y: used,
//   name: 'Used Memory',
// },
// {
//   type: 'scatter',
//   fill: 'tonexty',
//   fillcolor: randomColor,
//   mode: 'none',
//   y: active,
//   name: 'Active Memory',
// },
