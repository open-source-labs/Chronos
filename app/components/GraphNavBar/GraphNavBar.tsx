import React , { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApplicationContext } from '../../context/ApplicationContext'
import { QueryContext } from '../../context/QueryContext'
import { CommsContext } from '../../context/CommsContext'
import { HealthContext } from '../../context/HealthContext'
import { Link } from 'react-router-dom';

const GraphNavBar = (props) => {

  const { chart,setChart,dockerData,inspect,setInspect } = props
  const [ prevRoute, setPrevRoute ] = useState<string>('');
  const  { servicesData } = useContext(ApplicationContext);
  const { selectedMetrics } = useContext(QueryContext);
  const { commsData } = useContext(CommsContext)
  const { services } = useContext(HealthContext)

  const navigate = useNavigate();

  const routing = (route: string) => {
    if (location.href.includes('communications')) {
      if (prevRoute === '') navigate(`${servicesData[0].microservice}`);
      else navigate(prevRoute);
    }
    setChart(route);
  };

  const getHealthAndEventComponents = () => {
    const buttonList: JSX.Element[] = [];
    if (selectedMetrics) {
      selectedMetrics.forEach((element, id) => {
        const categoryName = Object.keys(element)[0];
        let prefix;
        if (categoryName === 'Event') {
          prefix = 'event_';
        } else if (categoryName === 'books' || categoryName === 'customers' || categoryName === 'frontend' || categoryName === 'orders'){
          prefix = 'docker_';
        } else {
          prefix = 'health_';
        }
        buttonList.push(
          <button
            id={`${prefix}${categoryName}-button`}
            className={chart === `${prefix}${categoryName}` ? 'selected' : undefined}
            onClick={() => routing(`${prefix}${categoryName}`)}
            key={`1-${id}`}
          >
            {categoryName}
          </button>
        );
      });
    }

    return buttonList;
  };

  const HealthAndEventButtons: JSX.Element[] = getHealthAndEventComponents();

  return (
    <nav id="navigationBar">
      <button
        className={chart === 'all' ? 'selected' : undefined}
        id="all-button"
        onClick={() => routing('all')}
        key="0"
      >
        Metrics Query
      </button>
      {HealthAndEventButtons}
      {dockerData.containername && (
        <button
          id="docker-button"
          className={chart === 'docker' ? 'selected' : undefined}
          onClick={() => routing('docker')}
          key="2"
        >
          Docker
        </button>
      )}
      {commsData.length > 0 && (
        <button
          id="communication-button"
          className={chart === 'communications' ? 'selected' : undefined}
          onClick={() => {
            if (!location.href.includes('communications')) setPrevRoute(services.join(' '));
            setChart('communications');
          }}
          key="3"
        >
          Communication
        </button>
      )}
      <button
        id="modify-metrics-button"
        className={chart === 'modifyMetrics' ? 'selected' : undefined}
        onClick={() => {
          routing('modifyMetrics');
        }}
        key="4"
      >
        Modify Metrics
      </button>
      {/* <Link className="sidebar-link" to="/Inspect" id="Inspect" >
        <SettingsIcon
            style={{
              WebkitBoxSizing: 'content-box',
              boxShadow: 'none',
              width: '35px',
              height: '35px',
            }}
          />
        &emsp;Inspect
      </Link> */}
      {/* <button onClick={() => { setInspect(!inspect) }}>Inspect</button> 
        this button was commented out because it didn't work. It was supposed to have different data visualizers but gave an error anytime it was clicked.
      */}
    </nav>
  )
}

export default GraphNavBar