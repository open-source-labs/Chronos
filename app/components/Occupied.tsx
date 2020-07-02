import React, { useState } from 'react';
import { Grid, Modal } from '@material-ui/core';
import '../stylesheets/Occupied.css'

import AddModal from '../modals/AddModal'
import Applications from './Applications';

const Occupied: React.FC = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className="application">
      <h1>Applications</h1>
      <button onClick={() => setOpen(true)}>Create</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddModal setOpen={setOpen}/>
      </Modal>
      {/* Grid Needs Aligning */}
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        spacing={10}
      >
        <Grid container item justify="center" xs={12}>
          <Applications />
        </Grid>
      </Grid>
    </div>
  );
};

export default Occupied;
