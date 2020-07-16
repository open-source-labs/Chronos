import React from 'react';
import bioOusmanPic from '../../assets/Bio_picture_ousman.jpg';
import bioBenPic from '../../assets/Bio_picture_ben.jpg';
import bioJenaePic from '../../assets/Bio_picture_jenae.jpg';
import bioTimPic from '../../assets/Bio_picture_Tim.jpg';
import bioChrisPic from '../../assets/Bio_picture_Chris.jpg';
import bioBrianPic from '../../assets/Bio_picture_Brian.jpg';
import bioBriannaPic from '../../assets/Bio_picture_Brianna.png';
import bioAlanPic from '../../assets/Bio_picture_Alan.png';
import bioAlonPic from '../../assets/Bio_picture_Alon.jpg';
import bioMichaelPic from '../../assets/Bio_picture_Michael.jpg';
import bioRonellePic from '../../assets/Bio_picture_Ronelle.jpg';
import bioToddPic from '../../assets/Bio_picture_Todd.jpg';
import bioGregoryPic from '../../assets/Bio_picture_Gregory.jpg';

// import '../../index.css';

const bios = [
  {
    name: 'Ousman Diallo',
    bioParagraph:
      "Ousman is a full-stack software engineer passionate about building performant, modular React applications giving special interest to mobile-driven web development and SPAs. Ousman's other interest lie in  microservices, architecting/optimizing communication between distributed systems, and all things written by Tim Ferris.",
    picture: bioOusmanPic,
    contact: {
      gitHub: 'https://github.com/Dialloousman',
      linkedIn: 'https://www.linkedin.com/in/ordiallo/',
    },
    location: 'New York',
  },
  {
    name: 'Ben Mizel',
    bioParagraph:
      'Ben Mizel is a full-stack software engineer passionate about building adaptable, scalable, and resilient applications. He enjoys talking about microservices and distributed computing as well as the modular brilliance of IKEA shelves and Hershey bars.',
    picture: bioBenPic,
    contact: {
      gitHub: 'https://github.com/ben-mizel/',
      linkedIn: 'https://www.linkedin.com/in/ben-mizel/',
    },
    location: 'New York',
  },
  {
    name: 'Chris Romano',
    bioParagraph:
      "With an eye for detail and ability across the stack, Chris is a powerful addition to the Chronos team.  While his visually creative front end solutions often headline, he's equipped to contribute in countless other ways.  From Webpack to data management to server side solutions in Node/Express, he can do it all.",
    picture: bioChrisPic,
    contact: {
      gitHub: 'https://github.com/robicano22',
      linkedIn: 'https://www.linkedin.com/in/chris-p-romano/',
    },
    location: 'New York',
  },
  {
    name: 'Jenae Pennie',
    bioParagraph:
      'Jenae Pennie is a full-stack JavaScript Engineer specializing in React and Express Node. She is deeply passionate about designing and implementing modular full-stack applications. She has experience with React-Redux, React (Context, Hooks, Effects),  Dockerizing Applications, and Creating Microservices.',
    picture: bioJenaePic,
    contact: {
      gitHub: 'https://github.com/jenaepen',
      linkedIn: 'https://www.linkedin.com/in/jenae-pennie',
    },
    location: 'New York',
  },
  {
    name: 'Tim Pagra',
    bioParagraph:
      'Tim is an experienced fullstack software engineer with niche focus on Node/Express servers and React frontends. He is passionate about composition and reusability in software development, giving special interest to decomposing monolithic applications into micro service applications.',
    picture: bioTimPic,
    contact: {
      gitHub: 'https://github.com/timpagra',
      linkedIn: 'https://www.linkedin.com/in/timpagra/',
    },
    location: 'New York',
  },
  {
    name: 'Brianna Sookhoo',
    bioParagraph:
      'Brianna Sookhoo is a full-stack software engineer who loves to code in her sleep.',
    picture: bioBriannaPic,
    contact: {
      gitHub: 'https://github.com/briannasookhoo',
      linkedIn: 'https://www.linkedin.com/in/brianna-sookhoo-b03502135/',
    },
    location: 'Los Angeles',
  },
  {
    name: 'Brian Bui',
    bioParagraph:
      'Brian Bui is a passionate full-stack software engineer dedicated to the craft of bringing his imagination to life onto the code editor.',
    picture: bioBrianPic,
    contact: {
      gitHub: 'https://github.com/umius-brian/',
      linkedIn: 'https://www.linkedin.com/in/umius-brian/',
    },
    location: 'Los Angeles',
  },
  {
    name: 'Alon Ofengart',
    bioParagraph:
      'Alon Ofengart is a full-stack software engineer who will one day develop Python4++.',
    picture: bioAlonPic,
    contact: {
      gitHub: 'https://github.com/alon25',
      linkedIn: 'https://www.linkedin.com/in/alon-ofengart',
    },
    location: 'Los Angeles',
  },
  {
    name: 'Alan Lee',
    bioParagraph:
      'Alan Lee is a full-stack software engineer who loves dealing with Docker containers and microservices.',
    picture: bioAlanPic,
    contact: {
      gitHub: 'https://github.com/ajlee12',
      linkedIn: 'https://www.linkedin.com/in/alan-lee-1ba1aa93/',
    },
    location: 'Los Angeles',
  },
  {
    name: 'Michael Wang',
    bioParagraph:
      'Michael is a passionate software engineer who is always deeply entrenched in new technologies while reinforcing his core knowledge. He is always looking to improve in all aspects of his craft, whether it be on an indiviual or team basis.',
    picture: bioMichaelPic,
    contact: {
      gitHub: 'https://github.com/wang3101',
      linkedIn: 'https://www.linkedin.com/in/michael--wang/',
    },
    location: 'Los Angeles',
  },
  {
    name: 'Ronelle Caguioa',
    bioParagraph:
      'Ronelle is a fullstack engineer who has a passion for building innovative products and the creative outlet that comes along with it. He has grown a liking to the community encompassing tech and hopes to make significant contributions with his talent.',
    picture: bioRonellePic,
    contact: {
      gitHub: 'https://github.com/ronellecaguioa',
      linkedIn: 'https://www.linkedin.com/in/ronellecaguioa/',
    },
    location: 'Los Angeles',
  },
  {
    name: 'Todd Buckner',
    bioParagraph:
      'Todd Buckner is a software engineer originally from Ohio, now living in Los Angeles. He enjoys the Los Angeles Philharmonic, hiking, science fiction, and live comedy.',
    picture: bioToddPic,
    contact: {
      gitHub: 'https://github.com/RToddBuckner',
      linkedIn: 'TBD',
    },
    location: 'Los Angeles',
  },
  {
    name: 'Gregory Palasciano',
    bioParagraph:
      'Gregory Palasciano is a full-stack software engineer committed to improving user experiences through responsive and scalable applications.',
    picture: bioGregoryPic,
    contact: {
      gitHub: 'https://github.com/gregpalace',
      linkedIn: 'https://www.linkedin.com/in/gregory-palasciano',
    },
    location: 'Los Angeles',
  },
];

const Team = () => (
  <div className="team-container" id="teamPage">
    {bios.map((obj) => (
      <div>
        <img src={obj.picture} alt="loading" />
        <p>{obj.name}</p>
        <p>{obj.bioParagraph}</p>
        <p>
          <a href={obj.contact.gitHub} target="__blank">
            Github
          </a>
          <span> | </span>
          <a href={obj.contact.linkedIn} target="__blank">
            LinkedIn
          </a>
        </p>
        <p>
          Location:
          {obj.location}
        </p>
      </div>
    ))}
  </div>
);

export default Team;
