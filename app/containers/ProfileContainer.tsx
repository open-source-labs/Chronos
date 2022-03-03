import React, { useContext } from 'react';
import AddsModal from '../modals/AddsModal';
import SetAuth from '../modals/SetAuth';
import { DashboardContext } from '../context/DashboardContext';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileContainer: React.FC<Props> = React.memo(({ setOpen }) => {
  const { landingPage } = useContext(DashboardContext);

  if (landingPage === 'dashBoard') return <SetAuth setOpen={setOpen} />;
  return <AddsModal setOpen={setOpen} />;
});

export default ProfileContainer;
