import React from 'react';
import { render } from 'react-dom';
import logo from '../assets/icon.png';

class Logo extends React.Component {
    render () {
        return (
            <div >
                <img className="MainImage"  src={logo} />
            </div>
        )
    }
}

export default Logo;