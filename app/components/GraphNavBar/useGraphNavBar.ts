import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../context/ApplicationContext';
import { QueryContext } from '../../context/QueryContext';
import { CommsContext } from '../../context/CommsContext';
import { HealthContext } from '../../context/HealthContext';

export const useGraphNavBar = (setChart: (route: string) => void) => {
  const [prevRoute, setPrevRoute] = useState<string>('');
  const { servicesData } = useContext(ApplicationContext);
  const { selectedMetrics } = useContext(QueryContext);
  const { commsData } = useContext(CommsContext);
  const { services } = useContext(HealthContext);
  const navigate = useNavigate();

  const routing = (route: string) => {
    if (location.href.includes('communications')) {
      if (prevRoute === '') navigate(`${servicesData[0].microservice}`);
      else navigate(prevRoute);
    }
    setChart(route);
  };

  const getHealthAndEventComponents = (chart: string) => {
    const buttonList: JSX.Element[] = [];
    if (selectedMetrics) {
      selectedMetrics.forEach((element, id) => {
        const categoryName = Object.keys(element)[0];
        let prefix;
        if (categoryName === 'Event') {
          prefix = 'event_';
        } else if (['books', 'customers', 'frontend', 'orders'].includes(categoryName)) {
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

  return {
    services,
    servicesData,
    selectedMetrics,
    commsData,
    prevRoute,
    setPrevRoute,
    routing,
    getHealthAndEventComponents,
  };
};
