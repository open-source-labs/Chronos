import React, { useState, useEffect, useContext } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
// import OverviewContext from '../context/OverviewContext';

const { ipcRenderer } = window.require('electron');

const ServiceOverview = (props) => {
  const [overviewState, setOverviewState] = useState([]);
  // const serviceComponents = useContext(OverviewContext);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest', props.index);

    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => setOverviewState(Object.values(JSON.parse(data))));
  }, []);

  const renderState = () => {
    const componentButtons = [];
    for (let i = 0; i < overviewState.length; i += 1) {
      const element = overviewState[i];
      // SQL
      if (element.currentmicroservice) {
        if (!componentButtons.includes(element.currentmicroservice)) {
          componentButtons.push(<button>{element.currentmicroservice}</button>);
        }
      }
      // Mongo
      if (element.currentMicroservice && !componentButtons.includes(element.currentMicroservice)) {
        componentButtons.push(<button>{element.currentMicroservice}</button>);
      }
    }
    return componentButtons;
  };

  // const newData = {
  //   data: {
  //     labels: ['Books.js', 'Customers.js', 'Orders.js'],
  //     datasets: [
  //       {
  //         label: 'Temperature (in Celcius)',
  //         backgroundColor: 'rgb(150, 220, 75',
  //         data: [39, 45, 50],
  //       },
  //     ],
  //   },
  // };

  // const setGradientColor = (canvas, color) => {
  //   const ctx = canvas.getContext('2d');
  //   const gradient = ctx.createLinearGradient(0, 0, 600, 550);
  //   gradient.addColorStop(0, color);
  //   gradient.addColorStop(0.95, 'rgba(133, 144, 0.5');
  //   return gradient;
  // };

  // const getChartData = (canvas) => {
  //   const { data } = newData;
  //   if (data.datasets) {
  //     const colors = ['rgb(255, 206, 9)', 'rgb(150, 220, 75'];
  //     data.datasets.forEach((set, i) => {
  //       set.backgroundColor = setGradientColor(canvas, colors[i]);
  //       set.borderColor = 'white';
  //       set.borderWidth = 2;
  //     });
  //   }
  //   return data;
  // };

  return (
    <div className="mainContainer">
      <div>
        <h1>Microservices Overview</h1>
      </div>
      <div />
      <div className="servicesList">{renderState()}</div>
      {/* <div style={{ position: 'relative', width: 700, height: 650 }}>
        <Bar
          options={{
            title: { display: true, text: 'CPU Performance', fontSize: 30 },
            responsive: true,
          }}
          data={getChartData}
        />
      </div> */}
      <div />
    </div>
  );
};

export default ServiceOverview;
