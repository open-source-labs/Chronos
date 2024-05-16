import React from 'react';
import { Button, Typography } from '@mui/material';
import './EnvModal.scss';
import { CloudQueue, Computer } from '@mui/icons-material';
import { TModalSetter } from '../../components/Occupied/types/Occupied';
import lightAndDark from '../../components/Styling';
import { useContext } from 'react';
import { DashboardContext } from '../../context/DashboardContext';

const EnvModal: React.FC<TModalSetter> = React.memo(
  ({ setModal}) => {
    const { mode } = useContext(DashboardContext);
    const currentStyle = mode === 'light' ? lightAndDark.lightModeData : lightAndDark.darkModeData;
  
    return (
      <div className="add-container" style={currentStyle}>

        <div className="card" id="card-env" >
          <Button
            className="env-button"
            onClick={() => setModal({isOpen:true,type:'awsModal'})}
            
          >
            <Typography>
              <CloudQueue fontSize="large" />
            </Typography>
            <Typography>&emsp;Cloud-Based</Typography>
          </Button>

          
          <Button
            className="env-button2"
            onClick={() => setModal({isOpen:true,type:'addModal'})}
          >
            <Typography>
              <Computer fontSize="large" />
            </Typography>
            <Typography>&emsp;Local Hosted</Typography>
          </Button>
        </div>
      </div>
    );
  }
);

export default EnvModal;
