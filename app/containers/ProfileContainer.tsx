import React, { useContext } from 'react';
import UserModal from '../modals/UserModal/UserModal';
import SetAuth from '../modals/SetAuth/SetAuth';
import { DashboardContext } from '../context/DashboardContext';
import { TModalSetter } from '../components/Occupied/types/Occupied';

const ProfileContainer: React.FC<TModalSetter> = React.memo(({ setModal }) => {
  const { landingPage } = useContext(DashboardContext);

  if (landingPage === 'dashBoard') return <SetAuth  setModal={setModal} />;
  return <UserModal setModal={setModal} />;
});

export default ProfileContainer;
