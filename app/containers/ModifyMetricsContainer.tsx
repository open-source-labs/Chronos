import React, { useEffect, useContext } from 'react';
import { JsxElement } from 'typescript';
import { ApplicationContext } from '../context/ApplicationContext';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from '../components/Styling';
import '../stylesheets/ModifyMetrics.scss'

const MetricsContainer:React.FC = React.memo(props => {
  
  const { savedMetrics } = useContext(ApplicationContext)
  const kubernetesMetrics: any[] = [];
  const kafkaMetrics: any[] = [];
  const healthMetrics: any[] = [];
  const { mode } = useContext(DashboardContext.DashboardContext);

  const currentMode = mode === 'light mode' ? lightAndDark.lightModeText : lightAndDark.darkModeText;

  const metricsToChange = {}

  savedMetrics.forEach(el => {
    let jsxEl = (
      <div key={el.metric} className="modifyMetric">
        <label style={currentMode}>
          <input type="checkbox" key={el._id} id={el._id} defaultChecked={el.selected}></input>
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
      {!!kubernetesMetrics.length && <div className='metricsSublist'><h3 style={currentMode}>Kubernetes Metrics:</h3>{kubernetesMetrics}</div>}
      {!!kafkaMetrics.length && <div className='metricsSublist'><h3 style={currentMode}>Kafka Metrics:</h3>{kafkaMetrics}</div>}
      {!!healthMetrics.length && <div className='metricsSublist'><h3 style={currentMode}>Health Metrics:</h3>{healthMetrics}</div>}
    </div>
  );
});

export default MetricsContainer;