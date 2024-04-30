import React from 'react';
import { Typography } from '@material-ui/core';
import '../stylesheets/EnvModal.scss';
import { CloudQueue, Computer } from '@material-ui/icons';
import { TModalSetter } from '../components/Occupied/types/Occupied';

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
