import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SignUp from "./components/SignUp.jsx";
import ServiceOverview from "./components/ServiceOverview.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    // const stateData = fs.readFileSync('../user/start.json', (err, data) => {
    //   if(err) console.log(err);
    //   return data.json();
    // });
    // this.state = stateData;
    this.state = {
      setupRequired: true,
      services: [],
      database: '',
    }
  }

  render() {
    const { setupRequired } = this.state;
    if(setupRequired) return <SignUp />;
    return <ServiceOverview />;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
