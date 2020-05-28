import React, {useState} from 'react';
import { render } from 'react-dom';
import Logo from './Logo.jsx'
import TeamMember from './TeamMember.jsx'
import bioBrianPic from '../assets/Bio_picture_Brian.jpg';
import bioBriannaPic from '../assets/Bio_picture_Brianna.png';
import bioAlanPic from '../assets/Bio_picture_Alan.png';
import bioAlonPic from '../assets/Bio_picture_Alon.jpg';
import '../index.css';



const Team2 = () => {
    //set state here
    const [bios, updateBio] = useState({
        bioBrianna : {
            bioParagraph : "Brianna Sookhoo is a full-stack software engineer who loves to code in her sleep.",
            picture: bioBriannaPic,
            contact: {
                gitHub : 'https://github.com/briannasookhoo',
                linkedIn : 'https://www.linkedin.com/in/brianna-sookhoo-b03502135/'
            }
        }, 
        bioBrian : {
            bioParagraph : 'Brian Bui is a passionate full-stack software engineer dedicated to the craft of bringing his imagination to life onto the code editor.',
            picture: bioBrianPic,
            contact: {
                gitHub : 'https://github.com/umius-brian/',
                linkedIn : 'https://www.linkedin.com/in/umius-brian/'
            }
        },
        bioAlon : {
            bioParagraph : 'Alon Ofengart is a full-stack software engineer who will one day develop Python4++.',
            picture: bioAlonPic,
            contact: {
                gitHub : 'https://github.com/alon25',
                linkedIn : 'https://www.linkedin.com/in/alon-ofengart'
            }
        },
        bioAlan : {
            bioParagraph : 'Alan Lee is a full-stack software engineer who loves dealing with Docker containers and microservices.',
            picture: bioAlanPic,
            contact: {
                gitHub : 'https://github.com/ajlee12',
                linkedIn : 'https://www.linkedin.com/in/alan-lee-1ba1aa93/'
            }
        },
    });

    return (
        <div id="teamPage">
            <div className="titleChronosAndMiniTitle">
                <div id="ChronosMainText">
                    <h2>LA Team</h2>
                </div>
                <hr id="MainHr"/>
            </div>
            <TeamMember bio={bios.bioBrianna.bioParagraph} picture={bioBriannaPic} contactLinks={bios.bioBrianna.contact}/>
            <TeamMember bio={bios.bioBrian.bioParagraph} picture={bioBrianPic} contactLinks={bios.bioBrian.contact}/>
            <TeamMember bio={bios.bioAlon.bioParagraph} picture={bioAlonPic} contactLinks={bios.bioAlon.contact}/> 
            <TeamMember bio={bios.bioAlan.bioParagraph} picture={bioAlanPic} contactLinks={bios.bioAlan.contact}/> 
        </div>
    )
};

export default Team2;