import React from 'react';
import { Button, Typography } from '@mui/material';
import './EnvModal.scss';
import { CloudQueue, Computer } from '@mui/icons-material';
import { TModalSetter } from '../../components/Occupied/types/Occupied';

const EnvModal: React.FC<TModalSetter> = React.memo(
  ({ setModal}) => {

    return (
      <div className="add-container">

        <div className="card" id="card-env">
          <button
            className="env-button"
            onClick={() => setModal({isOpen:true,type:'awsModal'})}
          >
            <Typography>
              <CloudQueue fontSize="large" />
            </Typography>
            <Typography>Cloud-Based</Typography>
          </button>

          
          <button
            className="env-button2"
            onClick={() => setModal({isOpen:true,type:'addModal'})}
          >
            <Typography>
              <Computer fontSize="large" />
            </Typography>
            <Typography>Local Hosted</Typography>
          </button>
        </div>
      </div>
    );
  }
);

export default EnvModal;
