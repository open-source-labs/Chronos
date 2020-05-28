import React, {useState} from 'react';
import { render } from 'react-dom';
import Logo from './Logo.jsx'
import TeamMember from './TeamMember.jsx'
import bioOusmanPic from '../assets/Bio_picture_ousman.jpg';
import bioBenPic from '../assets/Bio_picture_ben.jpg';
import bioJenaePic from '../assets/Bio_picture_jenae.jpg';
import bioTimPic from '../assets/Bio_picture_tim.jpg';
import bioChrisPic from '../assets/Bio_picture_Chris.jpg';
import '../index.css';



const Team = () => {
    //set state here
    const [bios, updateBio] = useState({
        bioOusman : {
            bioParagraph : "Ousman is a full-stack software engineer passionate about building performant, modular React applications giving special interest to mobile-driven web development and SPAs. Ousman's other interest lie in  microservices, architecting/optimizing communication between distributed systems, and all things written by Tim Ferris.",
            picture: bioOusmanPic,
            contact: {
                gitHub : 'https://github.com/Dialloousman',
                linkedIn : 'https://www.linkedin.com/in/ordiallo/'
            }
        }, 
        bioBen : {
            bioParagraph : 'Ben Mizel is a full-stack software engineer passionate about building adaptable, scalable, and resilient applications. He enjoys talking about microservices and distributed computing as well as the modular brilliance of IKEA shelves and Hershey bars.',
            picture: bioBenPic,
            contact: {
                gitHub : 'https://github.com/ben-mizel/',
                linkedIn : 'https://www.linkedin.com/in/ben-mizel/'
            }
        },
        bioChris : {
            bioParagraph : "With an eye for detail and ability across the stack, Chris is a powerful addition to the Chronos team.  While his visually creative front end solutions often headline, he's equipped to contribute in countless other ways.  From Webpack to data management to server side solutions in Node/Express, he can do it all.",
            picture: 'bioChrisPic',
            contact: {
                gitHub : 'https://github.com/robicano22',
                linkedIn : 'https://www.linkedin.com/in/chris-p-romano/'
            }
        },
        bioJenae : {
            bioParagraph : 'Jenae Pennie is a full-stack JavaScript Engineer specializing in React and Express Node. She is deeply passionate about designing and implementing modular full-stack applications. She has experience with React-Redux, React (Context, Hooks, Effects),  Dockerizing Applications, and Creating Microservices.',
            picture: bioJenaePic,
            contact: {
                gitHub : 'https://github.com/jenaepen',
                linkedIn : 'https://www.linkedin.com/in/jenae-pennie'
            }
        },
        bioTim : {
            bioParagraph : 'Tim is an experienced fullstack software engineer with niche focus on Node/Express servers and React frontends. He is passionate about composition and reusability in software development, giving special interest to decomposing monolithic applications into micro service applications.',
            picture: bioTimPic,
            contact: {
                gitHub : 'https://github.com/timpagra',
                linkedIn : 'https://www.linkedin.com/in/timpagra/'
            }
        },
    });

    return (
        <div id="teamPage">
            <div className="titleChronosAndMiniTitle">
                <div id="ChronosMainText">
                    <h2>NY Team</h2>
                </div>
                <hr id="MainHr"/>
            </div>
            <TeamMember bio={bios.bioBen.bioParagraph} picture={bioBenPic} contactLinks={bios.bioBen.contact}/>
            <TeamMember bio={bios.bioTim.bioParagraph} picture={bioTimPic} contactLinks={bios.bioTim.contact}/>
            <TeamMember bio={bios.bioOusman.bioParagraph} picture={bioOusmanPic} contactLinks={bios.bioOusman.contact}/> 
            <TeamMember bio={bios.bioJenae.bioParagraph} picture={bioJenaePic} contactLinks={bios.bioJenae.contact}/> 
            <TeamMember bio={bios.bioChris.bioParagraph} picture={bioChrisPic} contactLinks={bios.bioChris.contact}/>
        </div>
    )
};

export default Team;