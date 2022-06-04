import React, { useContext, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { all, solo as soloStyle } from './sizeSwitch';

interface EventChartProps {
  key: string;
  eventDataObj:object;
  sizing: string;
  colourGenerator: Function;
}

interface SoloStyles {
  height: number;
  width: number;
}

const EventChart: React.FC<EventChartProps> = React.memo(props => {
  const createChart = () => {
    const [solo, setSolo] = useState<SoloStyles | null>(null);

    setInterval(() => {
      if (solo !== soloStyle) {
        setSolo(soloStyle);
      }
    }, 20);


    const sizeSwitch = props.sizing === 'all' ? all : solo;
    const hashedColor = props.colourGenerator(props.eventDataObj['metric']);
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

    const plotlyData: DataObject = {
      type: 'scattergl',
      mode: 'lines+markers',
      y: props.eventDataObj['metricValue'],
      name: `${props.eventDataObj['metric']}`,
      marker: {
        color: hashedColor,
        size: 5,
        symbol: 'square-dot',
      },
    };

    return (
      <Plot
        data={[plotlyData]}
        config={{ displayModeBar: false }}
        layout={{
          title: `${props.eventDataObj['metric']}`,
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
            title: `${props.eventDataObj['metric']}`,
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
