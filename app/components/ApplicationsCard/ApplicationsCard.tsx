
import React, { useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Card,CardHeader,IconButton,CardContent,Typography } from "@material-ui/core";
import { DashboardContext } from "../../context/DashboardContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UpdateIcon from '@material-ui/icons/Update';
import './styles.scss'

type ClickEvent = React.MouseEvent<HTMLElement>;

const ApplicationsCard = (props) => {

  const { application, i, setModal, classes } = props
  const { deleteApp,user,applications } = useContext(DashboardContext)
  const { setAppIndex, setApp, setServicesData, app,example,connectToDB,setChart } = useContext(ApplicationContext)
  const [ cardName,dbType,dbURI,description,serviceType ] = applications[i]

  //dynamic refs
  const delRef = useRef<any>([]);

  const navigate = useNavigate();

  // Handle clicks on Application cards
  // v10 info: when card is clicked (not on the delete button) if the service is an AWS instance,
  // you are redirected to AWSGraphsContainer passing in the state object containing typeOfService
  const handleClick = (
    event: ClickEvent,
    selectedApp: string,
    selectedService: string,
    i: number
  ) => {
    const services = ['auth','client','event-bus','items','inventory','orders']
    //delRef refers to the delete button
    if (delRef.current[i] && !delRef.current[i].contains(event.target)) {
      if (
        selectedService === 'AWS' ||
        selectedService === 'AWS/EC2' ||
        selectedService === 'AWS/ECS' ||
        selectedService === 'AWS/EKS'
      ) {
        setAppIndex(i);
        setApp(selectedApp);
        navigate(`/aws/:${app}`, { state: { typeOfService: selectedService } });
      } 
      else if(example) {
        setAppIndex(i);
        setApp(selectedApp);
        setServicesData([]);
        setChart('communications')

        connectToDB(user, i, app, dbURI, dbType)
        navigate(`/applications/example/${services.join(' ')}`)
      }
      else {
        setAppIndex(i);
        setApp(selectedApp);
        setServicesData([]);
        //When we open the service modal a connection is made to the db in a useEffect inside of the service modal component
        setModal({isOpen:true,type:'serviceModal'})
      }
    }
  };

  // Asks user to confirm deletion
  const confirmDelete = (event: ClickEvent, application: string, i: number) => {
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    if (confirm(message)) deleteApp(i);
  };

  return (
    <div className="card" key={`card-${i}`} id={`card-${application[1]}`}>
      <Card
        key={`card-${i}`}
        className={classes.paper}
        variant="outlined"
        onClick={event => handleClick(event, application[0], application[3], i)}
      >
        <div className="databaseIconContainer">
          <div className="databaseIconHeader">
          </div>
        </div>

        <CardHeader
          avatar={
            <IconButton
              id="iconButton"
              ref={element => {
                delRef.current[i] = element;
              }}
              className={classes.iconbutton}
              aria-label="Delete"
              onClick={event => confirmDelete(event, application[0], i)}
            >
              <HighlightOffIcon
                className={classes.btnStyle}
                id="deleteIcon"
                ref={element => {
                  delRef.current[i] = element;
                }}
              />
            </IconButton>
          }
        />
        <CardContent>
          {/* <p id="databaseName">Name:</p> */}
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
  )
}

export default ApplicationsCard