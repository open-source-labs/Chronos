
import React from "react";
import { Card,CardHeader,IconButton,CardContent,Typography } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateIcon from '@mui/icons-material/Update';
import './styles.scss';
import { getEventHandlers } from './EventHandlers';

interface ApplicationCardProps {
  application: any[];
  i: number;
  setModal: (modalState: { isOpen: boolean; type: string }) => void;
  classes: any;
}

import './styles.scss'

const ApplicationsCard:React.FC<ApplicationCardProps> = (props) => {

  const { application, i, setModal, classes } = props
  const { handleClick, confirmDelete } = getEventHandlers({ application, setModal });

  return (
    <div className="card" key={`card-${i}`} id={`card-${application[1]}`}>
      <Card
        key={`card-${i}`}
        className={classes.paper}
        variant="outlined"
        onClick={() => handleClick(application[0], application[3], i)}
      >
        <div className="databaseIconContainer">
          <div className="databaseIconHeader"></div>
        </div>

        <CardHeader
          avatar={
            <IconButton
              id="iconButton"
              className={classes.iconbutton}
              aria-label="Delete"
              onClick={event => confirmDelete(event, i)}
              size="large"
            >
              <HighlightOffIcon className={classes.btnStyle} id="deleteIcon" />
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
};

export default ApplicationsCard;
