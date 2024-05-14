
import React, { useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Card,CardHeader,IconButton,CardContent,Typography } from "@mui/material";
import { DashboardContext } from "../../context/DashboardContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateIcon from '@mui/icons-material/Update';
import './styles.scss'

type ClickEvent = React.MouseEvent<HTMLElement>;

const ApplicationsCard = (props) => {

  const { application, i, setModal, classes } = props
  const { deleteApp,user } = useContext(DashboardContext)
  const { setAppIndex, setApp, setServicesData, app,example,connectToDB,setChart } = useContext(ApplicationContext)
  const [ cardName,dbType,dbURI,description,serviceType ] = application

  const navigate = useNavigate();

  // Handle clicks on Application cards
  // v10 info: when card is clicked (not on the delete button) if the service is an AWS instance,
  // you are redirected to AWSGraphsContainer passing in the state object containing typeOfService
  const handleClick = (
    selectedApp: string,
    selectedService: string,
    i: number
  ) => {
    const services = ['auth','client','event-bus','items','inventory','orders']
    // if (delRef.current[i] && !delRef.current[i].contains(event.target)) {
      setAppIndex(i);
      setApp(selectedApp);
      if (
        selectedService === 'AWS' ||
        selectedService === 'AWS/EC2' ||
        selectedService === 'AWS/ECS' ||
        selectedService === 'AWS/EKS'
      ) {
        navigate(`/aws/:${app}`, { state: { typeOfService: selectedService } });
      } 
      else if(example) {
        setServicesData([]);
        setChart('all')

        connectToDB(user, i, app, dbURI, dbType)
        navigate(`/applications/example/${services.join(' ')}`)
      }
      else {
        setServicesData([]);
        //When we open the service modal a connection is made to the db in a useEffect inside of the service modal component
        setModal({isOpen:true,type:'serviceModal'})
      }
    // }
  };

  // Asks user to confirm deletion
  const confirmDelete = (event: ClickEvent, i: number) => {
    event.stopPropagation()
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    if (confirm(message)) deleteApp(i,"");
  };

  return (
    <div className="card" key={`card-${i}`} id={`card-${application[1]}`}>
      <Card
        key={`card-${i}`}
        className={classes.paper}
        variant="outlined"
        onClick={() => handleClick(application[0], application[3], i)}
      >
        <div className="databaseIconContainer">
          <div className="databaseIconHeader">
          </div>
        </div>

        <CardHeader
          avatar={
            <IconButton
              id="iconButton"
              className={classes.iconbutton}
              aria-label="Delete"
              onClick={event => confirmDelete(event, i)}
              size="large">
              <HighlightOffIcon
                className={classes.btnStyle}
                id="deleteIcon"
              />
            </IconButton>
          }
        />
        <CardContent>
          <Typography noWrap id="databaseName" className={classes.fontStyles}>
            {application[0]}
          </Typography>
          <p id="serviceName">Service:</p>
          <Typography className={classes.fontStyles}>{application[3]}</Typography>
        </CardContent>
        <hr className="cardLine" />

        <div className="cardFooter">
          <UpdateIcon className="cardFooterIcon" />
          <em>
            <p id="cardFooterText">{application[4]}</p>
          </em>
        </div>
      </Card>
    </div>
  );
}

export default ApplicationsCard