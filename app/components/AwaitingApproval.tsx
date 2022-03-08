import React from 'react';
import { useHistory } from 'react-router-dom';

function AwaitingApproval() {
  const history = useHistory();
  const reroute = () => history.push('/');
  return (
    <div className="home">
      <p className="welcomeMessage" data-testid="awaitingApprovalMessage">
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
