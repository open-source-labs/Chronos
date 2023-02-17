import AddModal from '../modals/AddModal';
// import AwsModal from '../modals/AwsModal'
import React, { useState, useContext, useCallback } from 'react';
import { Modal, Button, Typography } from '@material-ui/core';
import '../stylesheets/envModal.scss';
import { CloudQueue } from '@material-ui/icons';

interface EnvModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnvModal: React.FC<EnvModalProps> = React.memo(({ setOpen }) => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [awsModalOpen, setAwsModalOpen] = useState<boolean>(false);

  return (
    <div className="add-container">
      <div className="card" id="card-env">
        <Button
          onClick={() => {
            setAwsModalOpen(true);
            setOpen(false);
          }}
        >
          <h2>Cloud-Based</h2>
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setAddModalOpen(true);
            setOpen(false);
          }}
        >
          <CloudQueue />
          <Typography>Cloud-Based</Typography>
        </Button>
      </div>
      {/* 
      <Modal open={awsModalOpen} onClose={() => setAwsModalOpen(false)}>
        <AwsModal setOpen={setAwsModalOpen} />
      </Modal> */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <AddModal setOpen={setAddModalOpen} />
      </Modal>
    </div>
  );
});

export default EnvModal;
