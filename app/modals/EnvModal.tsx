import AddModal from '../modals/AddModal';
import AwsModal from '../modals/AwsModal';
import React, { useState, useContext, useCallback } from 'react';
import { Modal, Button, Typography } from '@material-ui/core';
import '../stylesheets/EnvModal.scss';
import { CloudQueue, Computer } from '@material-ui/icons';

interface EnvModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setAwsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EnvModal: React.FC<EnvModalProps> = React.memo(({ setOpen, setAddModalOpen, setAwsModalOpen }) => {

  return (
    <div className="add-container">
      <div className="card" id="card-env">
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(false);
            setAwsModalOpen(true);
          }}
        >
          <CloudQueue />
          <Typography>Cloud-Based</Typography>
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(false);
            setAddModalOpen(true);
          }}
        >
          <Computer />
          <Typography>Local Hosted</Typography>
        </Button>
      </div>

    </div>
  );
});

export default EnvModal;
