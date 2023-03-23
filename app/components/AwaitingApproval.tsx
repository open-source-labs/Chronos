import React from 'react';
import { useNavigate } from 'react-router-dom';

//  THIS FILE IS NOT DOING ANYTHING RIGHT NOW
const AwaitingApproval: React.FC = () => {
  const navigate = useNavigate();
  const reroute = () => navigate('/');
  return (
    <div className="home">
      <p className="welcomeMessage" >
        Your account is awaiting approval. Please contact your administrator if you have any
        questions.
      </p>
      <br />
      <button className="link" onClick={reroute}>
        Return
      </button>
    </div>
  );
}

export default AwaitingApproval;
