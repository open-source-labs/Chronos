import React, { useContext } from 'react';
import UserModal from '../modals/UserModal';
import SetAuth from '../modals/SetAuth';
import { DashboardContext } from '../context/DashboardContext';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileContainer: React.FC<Props> = React.memo(({ setOpen }) => {
  const { landingPage } = useContext(DashboardContext);

  if (landingPage === 'dashBoard') return <SetAuth setOpen={setOpen} />;
  return <UserModal setOpen={setOpen} />;
});

export default ProfileContainer;
