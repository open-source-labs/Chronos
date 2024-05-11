import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../../context/DashboardContext';
import { ApplicationContext } from '../../context/ApplicationContext';

type ClickEvent = React.MouseEvent<HTMLElement>;

interface EventHandlersProps {
  application: any[];
  setModal: (modalState: { isOpen: boolean; type: string }) => void;
}

export const getEventHandlers = ({ application, setModal }: EventHandlersProps) => {
  const { deleteApp, user } = useContext(DashboardContext);
  const { setAppIndex, setApp, setServicesData, app, example, connectToDB, setChart } =
    useContext(ApplicationContext);
  const navigate = useNavigate();

  const handleClick = (selectedApp: string, selectedService: string, i: number) => {
    const services = ['auth', 'client', 'event-bus', 'items', 'inventory', 'orders'];
    setAppIndex(i);
    setApp(selectedApp);
    if (['AWS', 'AWS/EC2', 'AWS/ECS', 'AWS/EKS'].includes(selectedService)) {
      navigate(`/aws/:${app}`, { state: { typeOfService: selectedService } });
    } else if (example) {
      setServicesData([]);
      setChart('communications');
      connectToDB(user, i, app, application[2], application[1]);
      navigate(`/applications/example/${services.join(' ')}`);
    } else {
      setServicesData([]);
      setModal({ isOpen: true, type: 'serviceModal' });
    }
  };

  const confirmDelete = (event: ClickEvent, i: number) => {
    event.stopPropagation();
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    if (confirm(message)) deleteApp(i, '');
  };

  return { handleClick, confirmDelete };
};
