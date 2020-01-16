import React from 'react';
import { render } from 'react-dom';
import demoVideo from '../assets/ChronosDemo.mov'
import '../demo.css';

const Demo = () => {
    return (
        <div className="demoContainter">
            <div id="lightDemoWrapper">
            <div className="demoTitle1">
                <h2>Install</h2>
                    <p>
                        npm install chronos-microservice-debugger3 
                    </p>
            </div>
            <div className="demoTitle1">
                <h2>Insert</h2>
                <p>
                    insert chronos middleware within each server 
                </p>
            </div>
            <div className="demoTitle1">
                <h2>Link</h2>
                <p>
                    link your database to our middleware and the chronos application 
                </p>
            </div>
            <div className="demoTitle1">
                <h2>View</h2>
                <p>
                    monitor your microservices  
                </p>
            </div>
            </div>

            <div className="space"></div>
            <div className="demoTitle1">
                <h2>Video Demonstration</h2>
            <hr id="MainHr"/>
            <div className="videoDemo">
                <video src={demoVideo} controls={true}/>
            </div>
            </div>
        </div>
    )
};

export default Demo;