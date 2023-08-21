import React from 'react';
import { Button, Typography } from '@material-ui/core';
import '../stylesheets/EnvModal.scss';
import { CloudQueue, Computer } from '@material-ui/icons';

interface EnvModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAwsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnvModal: React.FC<EnvModalProps> = React.memo(
  ({ setOpen, setAddModalOpen, setAwsModalOpen }) => {
    return (
      <div className="add-container">
        <div className="card" id="card-env">
          <button
            className="env-button"
            onClick={() => {
              setOpen(false);
              setAwsModalOpen(true);
            }}
          >
            <Typography>
              <CloudQueue fontSize="large" />
            </Typography>
            <Typography>Cloud-Based</Typography>
          </button>
          <button
            className="env-button2"
            onClick={() => {
              setOpen(false);
              setAddModalOpen(true);
            }}
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
