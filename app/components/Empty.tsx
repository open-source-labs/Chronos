import React, { useState } from 'react';
import { Modal } from '@material-ui/core';

import AddModal from '../modals/AddModal';

const Empty: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img width="300" height="auto" src={'../assets/pangolin.png'} alt="Chronos logo" />
      <h1 id="welcome">Welcome to Chronos!</h1>
      {/* <p>Select your application to get started!</p> */}
      <button id="get-started" onClick={() => setOpen(true)}>
        Get Started
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddModal setOpen={setOpen} />
      </Modal>
    </>
  );
};

export default Empty;
