import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SignUp from "./components/SignUp.jsx";

class App extends React.Component {
  render() {
    return (
      <div>
        <SignUp />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
