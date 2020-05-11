import React, { useState, useContext } from 'react';
import MonitorHeader from '../AComp/MonitorHeader.jsx';
import Modal from '../components/Modal.jsx';
import OverviewContext from '../context/OverviewContext';
import HealthInformationContext from '../context/DetailsContext';
import routeChart from '../assets/routeChart.png';

const MonitoringContainer = (props) => {
  const { detailsSelected } = props;

  // Contexts have data added to them following successful IPC return. Data is later used to create charts.
  const serviceComponents = useContext(OverviewContext);
  const healthdata = useContext(HealthInformationContext);

  // Hook used to toggle whether or not the Modal component renders
  const [modalDisplay, toggleModalDisplay] = useState(false);
  // Hook used to set the chart that the Modal displays.  The
  // modalDisplay state is drilled into the Modal component.
  const [modalChart, setModalChart] = useState();
  // Hook used to set the Modal Component title. The "alt" attribute
  // is grabbed from the onClick event via event.path[0].alt
  const [chartTitle, setChartTitle] = useState();

  // route button AND traffic button property
  const routeButtonProperty = {
    traffic: {
      id: 'Traffic',
      alt: 'Microservice Traffic',
      src: 'app/assets/chartModal.png',
    },
    routes: { id: 'routesImage', alt: 'Route Trace', src: routeChart },
  };

  // declare routes array to display routes when modal is toggled
  const routes = [];
  // declare traffic array to display traffic when modal is toggled
  const traffic = [];

  // push traffic component logic traffic
  traffic.push(
    <div className="healthChartContainer">
      <input
        onClick={() => {
          setChartTitle(event.path[0].alt);
          setModalChart(event.path[0].id);
          toggleModalDisplay(!modalDisplay);
        }}
        type="image"
        id={routeButtonProperty.traffic.id}
        src={routeButtonProperty.traffic.src}
        width="60px"
        alt={routeButtonProperty.traffic.alt}
      />
      <br />
      <div style={{ color: 'white', paddingLeft: '7px' }}>
        {routeButtonProperty.traffic.id}
      </div>
    </div>
  );

  // push routes component logic traffic
  routes.push(
    <div className="healthChartContainer">
      <input
        onClick={() => {
          setChartTitle(event.path[0].alt);
          setModalChart(event.path[0].id);
          toggleModalDisplay(!modalDisplay);
        }}
        type="image"
        id={routeButtonProperty.routes.id}
        src="app/assets/routeChart.png"
        width="60px"
        alt={routeButtonProperty.routes.alt}
      />
      <br />
      <div style={{ color: 'white', paddingLeft: '7px' }}>Routes</div>
    </div>
  );

  return (
    <div className="mainContainer">
      <MonitorHeader />
      {modalDisplay ? (
        <Modal
          chartTitle={chartTitle}
          modalChart={modalChart}
          service=""
          toggleModalDisplay={toggleModalDisplay}
          onClick={() => {
            toggleModalDisplay(!modalDisplay);
          }}
        />
      ) : null}
      <div id="routeAndTrafficDisplay">
        {routes}
        {traffic}
      </div>
      <br />{detailsSelected || null}
    </div>
  );
};

export default MonitoringContainer;
