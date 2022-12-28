import React, { useEffect, useContext } from 'react';
import { JsxElement } from 'typescript';
import { ApplicationContext } from '../context/ApplicationContext';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from '../components/Styling';
import '../stylesheets/ModifyMetrics.scss';
const { ipcRenderer } = window.require('electron');

const MetricsContainer:React.FC = React.memo(props => {
  
  const { savedMetrics, setSavedMetrics } = useContext(ApplicationContext);
  const kubernetesMetrics: any[] = [];
  const kafkaMetrics: any[] = [];
  const healthMetrics: any[] = [];
  const { mode } = useContext(DashboardContext.DashboardContext);

  const currentMode = mode === 'light mode' ? lightAndDark.lightModeText : lightAndDark.darkModeText;

  const metricsToChange = {};

  const changeMetric = (event) => {
    const m = {...savedMetrics[event.target.id]};
    m['selected'] = event.target.checked;
    metricsToChange[event.target.id] = m;
  }

  const updateMetrics = () => {
    // Sets state for savedMetrics with metrics "selected" option updated based on checkbox selection
    const newMetrics = {...savedMetrics};
    for (let key in metricsToChange) {
      newMetrics[key] = metricsToChange[key];
    }
    setSavedMetrics(newMetrics);
    // Sends patch request to db to update which metrics get saved to db
    ipcRenderer.send('updateSavedMetrics', Object.values(metricsToChange));
    // ipcRenderer.on('updateResponse')
  }

  Object.values(savedMetrics).forEach((el: any) => {
    const jsxEl = (
      <div key={el.metric} className="modifyMetric">
        <label style={currentMode}>
          <input type="checkbox" key={el.metric} id={el.metric} defaultChecked={el.selected} onClick={changeMetric}></input>
          {el.metric}
        </label>
      </div>)
    if (el.mode === 'kubernetes') kubernetesMetrics.push(jsxEl);
    else if (el.mode === 'kafka') kafkaMetrics.push(jsxEl);
    else healthMetrics.push(jsxEl);
  }) 

  return (
    <div className="metricsSelector">
      <h2 style={currentMode}>Modify which metrics your Chronos app will track by selecting or deselecting from the list below.</h2>
      <p style={currentMode}>This can be helpful if you find that you and your team often only care to track a small handful of metrics, and don't want your database to be overwhelmed with thousands of datapoints that you don't necessarily need.</p>
      <button className="select" onClick={updateMetrics}>Change Database Settings</button>
      {!!kubernetesMetrics.length && <div className='metricsSublist'><h3 style={currentMode}>Kubernetes Metrics:</h3>{kubernetesMetrics}</div>}
      {!!kafkaMetrics.length && <div className='metricsSublist'><h3 style={currentMode}>Kafka Metrics:</h3>{kafkaMetrics}</div>}
      {!!healthMetrics.length && <div className='metricsSublist'><h3 style={currentMode}>Health Metrics:</h3>{healthMetrics}</div>}
    </div>
  );
});

export default MetricsContainer;