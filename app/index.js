import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import setup from './components/LoadServices.jsx';
import SignUp from './components/SignUp.jsx';
import ServiceOverview from './components/ServiceOverview.jsx';

// const { ipcRenderer } = window.require('electron');

const App = () => {
  const context = useContext(setup);
  // const [setup] = useState(JSON.parse(ipcRenderer.sendSync('state')));
  return context ? <SignUp /> : <ServiceOverview />;
};

ReactDOM.render(<App />, document.getElementById('app'));
