import React from 'react';
import { useHistory } from 'react-router-dom';

const AwaitingApproval = React.memo(() => {
  const history = useHistory();
  return (
    <div className="home">
      <p className="welcomeMessage">
        Your account is awaiting approval. Please contact your administrator if you have any
        questions.
      </p>
      <br />
      <button className="link" onClick={() => history.push('/')}>
        Return
      </button>
    </div>
  );
});

export default AwaitingApproval;
