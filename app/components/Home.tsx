import React, { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import Empty from './Empty';
import Occupied from './Occupied';
import '../stylesheets/Home.css';

const Home = () => {
  const { applications, getApplications } = useContext(DashboardContext);

  useEffect(() => {
    getApplications();
  }, []);

  return <div className="blank">{applications.length ? <Occupied /> : <Empty />}</div>;

  // return !applications.length ? (
  //   <div className="blank">

  //   </div>
  // ) : (
  //   <div style={ApplicationStyle}>
  //     <h1>Applications</h1>
  //     <hr/>
  //     <button onClick={toggleNewAppModal}>Create</button>
  //     <Modal open={newAppModal} onClose={toggleNewAppModal}>
  //       <AddModal />
  //     </Modal>
  //     {/* Grid Needs Aligning */}
  //     <Grid
  //       container
  //       direction="column"
  //       alignItems="center"
  //       justify="center"
  //       style={{ minHeight: '100vh' }}
  //       spacing={10}
  //     >
  //       <Grid container item justify="center" xs={12}>
  //         <Applications />
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
};

export default Home;
