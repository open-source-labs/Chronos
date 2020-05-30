import React from 'react';
import { render } from 'react-dom';
import Logo from './Logo.jsx'
import '../index.css';

const TeamMember = (props) => {
    return (
        <div className="aboutComponent ">
            <img src={props.picture} className="aboutPic" />
                <div id="aboutParagraphs" >
                    <p>{props.bio}</p>
                <div className="connectWithMe">
                    <a 
                    id="connectWithMeSocial" href={props.contactLinks.linkedIn} target="_blank">LinkedIn </a> 
                    | 
                    <a 
                    id="connectWithMeSocial"
                    href={props.contactLinks.gitHub} target="_blank"> GitHub</a>
                    </div>
                </div>
        </div>
    )
};

export default TeamMember;