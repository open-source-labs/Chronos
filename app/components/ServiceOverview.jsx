import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'

const { ipcRenderer } = window.require('electron');

const ServiceOverview = () => {
  // return 'HELLLLLLLLOOOOOOOOO?!?!?!?!?!?!?!?!?!';
  const [overviewState, setOverviewState] = useState([]);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest');

    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      // ! WIP: Parsing service and endpoint to create data that can be used for visualization.
      const dbData = Object.values(JSON.parse(data));
      const communications = {};
      for (let i = 0; i < dbData.length; i += 1) {
        const microservice = dbData[i].currentMicroservice;
        const endpoint = dbData[i].targetedEndpoint;
        if (communications[microservice] && !communications[microservice].includes(endpoint)) {
          communications[microservice].push(endpoint);
        } else {
          communications[microservice] = [endpoint];
        }
      }
      // Adds microservice data to state.
      setOverviewState([...Object.values(JSON.parse(data))]);
    });
  }, []);

  const stateRender = () => {
    const jsxAttributes = [];
    for (let i = 0; i < overviewState.length; i += 1) {
      const element = overviewState[i];
      jsxAttributes.push(
        <p>
          Microservice:
          {element.currentMicroservice}
           is sending a message to
          {element.targetedEndpoint}
        </p>,
      );
    }
    return jsxAttributes;
  };

  const newData = {
    data: {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          label: 'Customers.js',
          backgroundColor: 'rgb(150, 220, 75',
          data: [14, 51, 11, 40, 4, 22]
        }
      ]
    },
  }
  
  const setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 600, 550)
    gradient.addColorStop(0, color)
    gradient.addColorStop(0.95, "rgba(133, 144, 0.5");
    return gradient;
  }

  const getChartData = canvas => {
    const data = newData.data;
    if (data.datasets){
      let colors = ['rgb(255, 206, 9)', 'rgb(150, 220, 75'];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = setGradientColor(canvas, colors[i]);
        set.borderColor = "white";
        set.borderWidth = 2;
      })
    }
    return data;
  }

  return (
    <div className='mainContainer'>
      <div>
        <h1>Microservices Overview</h1>
      </div>
      <div></div>
      {/* <div className='servicesList'>{stateRender()}</div> */}
      <div style={{ position: "relative", width: 700, height: 650 }}>
        <Line options={{responsive: true}} data={getChartData}/>
      </div>
      <div>
      </div>
    </div>
  );
};

export default ServiceOverview;
