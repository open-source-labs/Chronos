import React from "react";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <h1>Enter Microservices URL</h1>
        <input placeholder="Microservices URL"></input>
        <input placeholder="Label"></input>
        <input placeholder="Database URL"></input>
        <button>Submit</button>
      </div>
    );
  }
}

export default SignUp;
