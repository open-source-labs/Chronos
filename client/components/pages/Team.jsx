import React from 'react';
import Github from '../../assets/github.png';
import Linkedin from '../../assets/linkedin.png';

import bioDuanePic from '../../assets/Bio_picture_Duane.jpeg';
import bioMichellePic from '../../assets/Bio_picture_Michelle.jpeg';
import bioMohtasimPic from '../../assets/Bio_picture_Mohtasim.jpeg';
import bioNataliePic from '../../assets/Bio_picture_Natalie.jpeg';
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
import bioVincePic from '../../assets/Bio_picture_Vince.png';
import bioMattPic from '../../assets/Bio_picture_Matt.jpg';
import bioDerekPic from '../../assets/Bio_picture_Derek.jpg';
import bioKitPic from '../../assets/Bio_picture_Kit.jpg';
import bioDannyPic from '../../assets/Bio_picture_Danny.jpg';
import bioBrunoPic from '../../assets/Bio_picture_Bruno.png';
import bioTiffanyPic from '../../assets/Bio_picture_Tiffany.jpg';
import bioNachiketPic from '../../assets/Bio_picture_Nachiket.png';
import bioWilliamPic from '../../assets/Bio_picture_William.png';
import bioAlexHoldenPic from '../../assets/Bio_picture_AlexH.jpg';
import bioJustinPic from '../../assets/Bio_picture_Justin.jpg';
import bioJessicaPic from '../../assets/Bio_picture_Jessica.png';
import bioAlexKolbPic from '../../assets/Bio_picture_AlexK.jpg';
import bioGiovanniPic from '../../assets/Bio_picture_Giovanni.jpeg';
import bioHannahPic from '../../assets/Bio_picture_Hannah.jpg';
import bioJamesEdwardsPic from '../../assets/Bio_picture_James.png';
import bioYangPic from '../../assets/Bio_picture_Yang.jpeg';
import bioGahlPic from '../../assets/Bio_picture_Gahl.jpg';
import bioTroyPic from '../../assets/Bio_picture_Troy.png';
import bioElisaPic from '../../assets/Bio_picture_Elisa.png';
import bioJoshPic from '../../assets/Bio_picture_Josh.png';
import bioSnowPic from '../../assets/Bio_picture_Snow.jpg';
import bioTimLeePic from '../../assets/Bio_picture_Tim_Lee.jpg';
import bioRobertoPic from '../../assets/Bio_picture_Roberto.jpeg';
import bioTaylorPic from '../../assets/Bio_picture_Taylor.png';
import bioClairePic from '../../assets/Bio_picture_Claire.png';
import bioBrianLimPic from '../../assets/Bio_picture_Brian_Lim.jpg';
import bioVictorPic from '../../assets/Bio_picture_Victor.jpg';
import bioLennonPic from '../../assets/Bio_picture_Lennon.jpg';
import bioBrisaPic from '../../assets/Bio_picture_Brisa.png';
import bioLuciePic from '../../assets/Bio_picture_Lucie.jpg';
import bioJeffPic from '../../assets/Bio_picture_Jeff.jpg';
import bioJustinPPic from '../../assets/Bio_picture_JustinP.jpeg';
import bioKelsiPic from '../../assets/Bio_picture_Kelsi.jpg';


import '../../stylesheets/Team.scss';

const bios = [
  {
    name: 'Brisa Zhu',
    bioParagraph:
      'Brisa is a software engineer based in New York that enjoys creating applications with minimalist and user-friendly features. When she\'s not coding, she enjoys playing with her foster cats and taking care of her houseplants.',
    picture: bioBrisaPic,
    contact: {
      gitHub: 'https://github.com/beezoo10',
      linkedIn: 'https://www.linkedin.com/in/brisazhu',
    },
  },
  {
    name: 'Lucie Seidler',
    bioParagraph:
      'Lucie is a full-stack software engineer focused on problem resolution and  delivering innovative engineering solutions. She is also passionate about STEM outreach and animal advocacy. ',
    picture: bioLuciePic,
    contact: {
      gitHub: 'https://github.com/lucieseidler',
      linkedIn: 'https://www.linkedin.com/in/lucie-seidler/',
    },
  },
  {
    name: 'Justin Poirier',
    bioParagraph:
      'Justin is a software engineer living in Austin, Texas. He likes to spend his time sailing, honing his cooking skills, and being with his family and friends.',
    picture: bioJustinPPic,
    contact: {
      gitHub: 'https://github.com/jcpoirier20',
      linkedIn: 'https://www.linkedin.com/in/justincpoirier/',
    },
  },
  {
    name: 'Kelsi Webb',
    bioParagraph:
      'Kelsi is a software engineer who loves channeling her creativity into building beautiful and innovative products with the end user in mind.',
    picture: bioKelsiPic,
    contact: {
      gitHub: 'https://github.com/kelsicw',
      linkedIn: 'https://www.linkedin.com/in/kelsiwebb',
    },
  },
  {
    name: 'Jeffrey Na',
    bioParagraph:
      'Jeffrey is a software engineer based out of New York who is passionate about building efficient and reliable products to solve complex problems.',
    picture: bioJeffPic,
    contact: {
      gitHub: 'https://github.com/jeffreyNa',
      linkedIn: 'https://www.linkedin.com/in/jeffrey-na',
    },
  },
  {
    name: 'Claire Tischuk',
    bioParagraph:
      'Claire is a full stack engineer located in Tallahassee, Florida.  She is passionate about building useful products that make a difference in people\'s lives.',
    picture: bioClairePic,
    contact: {
      gitHub: 'https://github.com/BoopdiBop',
      linkedIn: 'https://www.linkedin.com/in/claire-tischuk-45160b1a7/',
    },
  },
  {
    name: 'Brian Lim',
    bioParagraph:
      'Brian is a full-stack software engineer based in Los Angeles. When he is not knee-deep in a codebase, you can find him shanking golf balls, hiking, or stress eating.',
    picture: bioBrianLimPic,
    contact: {
      gitHub: 'https://github.com/brianlim89',
      linkedIn: 'https://www.linkedin.com/in/brianlim-/',
    },
  },
  {
    name: 'Victor Ye',
    bioParagraph:
      'Victor is a full-stack engineer located in New York City. He enjoys olympic weightlifting, video games, sports, and customizing mechanical keyboards.',
    picture: bioVictorPic,
    contact: {
      gitHub: 'https://github.com/vctorye',
      linkedIn: 'https://www.linkedin.com/in/ye-victor/',
    },
  },
  {
    name: 'Lennon Stewart',
    bioParagraph:
      'Lennon is a full-stack engineer who loves playing games, films, and bouldering.',
    picture: bioLennonPic,
    contact: {
      gitHub: 'https://github.com/noahoo7',
      linkedIn: 'https://www.linkedin.com/in/lennon-stewart-45669524a/',
    },
  },
  {
    name: 'Snow X. Bai',
    bioParagraph:
      'Snow is a full-stack software developer with a passion for creating innovative solutions. In addition to her technical pursuits, she also has a passion for photography and specializes in capturing precious family moments.',
    picture: bioSnowPic,
    contact: {
      gitHub: 'https://github.com/xueapp',
      linkedIn: 'https://www.linkedin.com/in/xuebaiprofile/',
    },
  },
  {
    name: 'Tim Lee',
    bioParagraph:
      'Tim is a full-stack software engineer based out of Los Angeles. Tim loves fantasy football, crossword puzzles, board games, chess, and all things UCLA.',
    picture: bioTimLeePic,
    contact: {
      gitHub: 'https://github.com/timlee12',
      linkedIn: 'https://www.linkedin.com/in/timlee12/',
    },
  },
  {
    name: 'Roberto Meloni',
    bioParagraph:
      'Roberto is a full-stack engineer based in San Francisco. He has a passion for building servers and enjoys pairing them with a good wine for dinner.',
    picture: bioRobertoPic,
    contact: {
      gitHub: 'https://github.com/RobertoRueMeloni',
      linkedIn: 'https://www.linkedin.com/in/roberto-meloni/',
    },
  },
  {
    name: 'Taylor Zhang',
    bioParagraph:
      'Full-stack software engineer with expertise in open-source development and a passion for building scalable and user-friendly applications.',
    picture: bioTaylorPic,
    contact: {
      gitHub: 'https://github.com/taylrzhang',
      linkedIn: 'https://www.linkedin.com/in/taylor-zhang/',
    },
  },
  {
    name: 'Josh James',
    bioParagraph:
      'Josh is a software engineer with experience in building full-stack applications using React, Node.js/Express.js, SQL, and NoSQL databases with an emphasis on module design patterns.',
    picture: bioJoshPic,
    contact: {
      gitHub: 'https://github.com/joshjames289',
      linkedIn: 'https://www.linkedin.com/in/joshuakjames/',
    },
  },
  {
    name: 'Elisa Nie',
    bioParagraph:
      'Elisa is a full-stack engineer based in Seattle. Her passions include indie video games, language learning, and making simple illustrations.',
    picture: bioElisaPic,
    contact: {
      gitHub: 'https://github.com/elisanie',
      linkedIn: 'https://www.linkedin.com/in/elisa-nie/',
    },
  },
  {
    name: 'Gahl Peled',
    bioParagraph:'Gahl is a full-stack software engineer based out of Los Angeles. He enjoys rock climbing, riding his motorcycle, and writing short snippets about himself in the third person.',
    picture: bioGahlPic,
    contact: {
      gitHub: 'https://github.com/GP3-RS',
      linkedIn: 'https://www.linkedin.com/in/gahlpeled/',
    },
  },
  {
    name: 'Troy Prejusa',
    bioParagraph:
      'Troy is a full-stack software engineer based out of Los Angeles.',
    picture: bioTroyPic,
    contact: {
      gitHub: 'https://github.com/tprejusa',
      linkedIn: 'https://www.linkedin.com/in/troyprejusa/',
    },
  },
  {
    name: 'Yang Song',
    bioParagraph:
      'Yang is a full-stack engineer based out of Seattle where she resides with her cats, Lego & Arwin, and her dog, Winifred.',
    picture: bioYangPic,
    contact: {
      gitHub: 'https://github.com/curiousyang',
      linkedIn: 'https://www.linkedin.com/in/yangsong531/',
    },
  },
  {
    name: 'James Edwards',
    bioParagraph:
      'James is a full-stack engineer based out of the Bay Area. James has a passion for microservices and cookies.',
    picture: bioJamesEdwardsPic,
    contact: {
      gitHub: 'https://github.com/Fredwards',
      linkedIn: 'https://www.linkedin.com/in/james-edwards-547307242/',
    },
  },
  {
    name: 'Hannah Santoyo',
    bioParagraph:
      'Hannah is a full-stack software engineer based out of Los Angeles. Hannah loves tea, hiking, Apache Kafka, and her pet tortoise.',
    picture: bioHannahPic,
    contact: {
      gitHub: 'https://github.com/hann7',
      linkedIn: 'https://www.linkedin.com/in/hannah-santoyo/',
    },
  },
  {
    name: 'Giovanni Flores-Lovo',
    bioParagraph:
      'Gio is a full-stack software engineer based out of Los Angeles. Gio\'s passions include skateboarding and live music.',
    picture: bioGiovanniPic,
    contact: {
      gitHub: 'https://github.com/gfloresl',
      linkedIn: 'https://www.linkedin.com/in/giovanni-flores-lovo-11a288232/',
    },
  },
  {
    name: 'Alex Kolb',
    bioParagraph:
      'Alex is a full-stack software engineer based out of San Diego. Outside of coding, Alex enjoys spending time in nature, playing videogames, and making music.',
    picture: bioAlexKolbPic,
    contact: {
      gitHub: 'https://github.com/alexkolb1',
      linkedIn: 'https://www.linkedin.com/in/alexanderjkolb/',
    },
  },
  {
    name: 'Jessica Lee',
    bioParagraph:
      'Jess is a full-stack engineer located in Los Angeles who enjoys the challenge of building mature backend servers and getting rid of all linting errors. She wishes there were more hours in a day to read and play games while eating good food and drinks.',
    picture: bioJessicaPic,
    contact: {
      gitHub: 'https://github.com/jessllee',
      linkedIn: 'https://www.linkedin.com/in/jessllee/',
    },
  },
  {
    name: 'Justin Kirk',
    bioParagraph:
      'Justin is a full-stack engineer in Texas. He enjoys hiking and jogging.',
    picture: bioJustinPic,
    contact: {
      gitHub: 'https://github.com/Justinlkirk',
      linkedIn: 'https://www.linkedin.com/in/justinleekirk/',
    },
  },
  {
    name: 'Alexander Holden',
    bioParagraph:
      'Alexander is a full-stack engineer based in NYC. His passions include music composition, sports, video games and making custom mechanical keyboards.',
    picture: bioAlexHoldenPic,
    contact: {
      gitHub: 'https://github.com/astholden',
      linkedIn: 'https://www.linkedin.com/in/astholden/',
    },
  },
  {
    name: 'William Owen',
    bioParagraph:
      'William is a full-stack web developer building inspirational projects from the Puget Sound. When he\'s not coding, he\'s out kayaking.',
    picture: bioWilliamPic,
    contact: {
      gitHub: 'https://github.com/williamowen65',
      linkedIn: 'https://www.linkedin.com/in/williamowen65/',
    },
  },
  {
    name: 'Nachiket Pingle',
    bioParagraph:
      'Nachiket is a fullstack software engineer who seeks out singular challenges and brings forth his eclectic background to provide a sharp, well-thought-out and highly customized solution. He believes that good leaders are always good followers first.',
    picture: bioNachiketPic,
    contact: {
      gitHub: 'https://github.com/nachiket1',
      linkedIn: 'https://www.linkedin.com/in/nachiketpingle/',
    },
  },
  {
    name: 'Tiffany Graves',
    bioParagraph:
      'Tiffany is a software engineer who is passionate about effective modular design and enjoys using her creativity to explore techniques and tools to improve user experiences through innovation and latest trends.',
    picture: bioTiffanyPic,
    contact: {
      gitHub: 'https://github.com/tngraves',
      linkedIn: 'https://www.linkedin.com/in/tngraves/',
    },
  },
  {
    name: 'Bruno Portela',
    bioParagraph:
      'Bruno is a Software Engineer who takes pride on designing and building high quality products that makes people\'s life easier. He is a great team player and is always willing to coach new developers. He loves dogs, punk rock and video games.',
    picture: bioBrunoPic,
    contact: {
      gitHub: 'https://github.com/brunoportela',
      linkedIn: 'https://www.linkedin.com/in/bgp/',
    },
  },
  {
    name: 'Danny Martinez',
    bioParagraph:
      'Danny is a full-stack software engineer keen on ensuring effective, understandable and hardened code throughout the Chronos application.',
    picture: bioDannyPic,
    contact: {
      gitHub: 'https://github.com/j-dannymartinez',
      linkedIn: 'https://www.linkedin.com/in/jdanielmartinez/',
    },
  },
  {
    name: 'Vince Ho',
    bioParagraph:
      'Vince is a full-stack software engineer based in San Diego. Beyond software development, Vince\'s passion includes taking care of his plants and lifting heavy weight off the ground.',
    picture: bioVincePic,
    contact: {
      gitHub: 'https://github.com/hodesza',
      linkedIn: 'https://www.linkedin.com/in/vinceho022/',
    },
  },
  {
    name: 'Matt Jiang',
    bioParagraph:
      'Matt Jiang is a software engineer who loves building sleek and responsive UIs, constructing well-architected backends, and above all writing clean code. Outside of coding, you can find him playing ukulele at a park somewhere.',
    picture: bioMattPic,
    contact: {
      gitHub: 'https://github.com/mattljiang',
      linkedIn: 'https://www.linkedin.com/in/mattljiang/',
    },
  },
  {
    name: 'Derek Lam',
    bioParagraph:
      'Derek is a software engineer currently living in Los Angeles. Before COVID, he enjoyed going to trivia nights and backpacking in Central America, nowadays you can find him indoors waiting for a remake of Game of Thrones season 8.',
    picture: bioDerekPic,
    contact: {
      gitHub: 'https://github.com/DerekQuoc',
      linkedIn: 'https://www.linkedin.com/in/derekqlam/',
    },
  },
  {
    name: 'Kit Loong Yee',
    bioParagraph:
      'Kit is a full-stack software engineer who has a passion in building products to better peoples\' lives. He also enjoys classical music and spending time with his family.',
    picture: bioKitPic,
    contact: {
      gitHub: 'https://github.com/kitloong1',
      linkedIn: 'https://www.linkedin.com/in/kitloongyee/',
    },
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
  },
  {
    name: 'Ousman Diallo',
    bioParagraph:
      "Ousman is a full-stack software engineer passionate about building performant, modular React applications giving special interest to mobile-driven web development and SPAs. Ousman's other interest lie in  microservices, architecting/optimizing communication between distributed systems, and all things written by Tim Ferris.",
    picture: bioOusmanPic,
    contact: {
      gitHub: 'https://github.com/Dialloousman',
      linkedIn: 'https://www.linkedin.com/in/ordiallo/',
    },
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
  },
  {
    name: 'Duane McFarlane',
    bioParagraph:
      'Duane is a full-stack engineer based out of New York.',
    picture: bioDuanePic,
    contact: {
      gitHub: 'https://github.com/Duane11003',
      linkedIn: 'https://www.linkedin.com/in/duanemcfarlane/',
    },
  },
  {
    name: 'Michelle Herrera',
    bioParagraph:
      'Michelle is a full-stack engineer based out of New York.',
    picture: bioMichellePic,
    contact: {
      gitHub: 'https://github.com/mesherrera',
      linkedIn: 'https://www.linkedin.com/in/mherreradev/',
    },
  },
  {
    name: 'Mohtasim Chowdhury',
    bioParagraph:
      'Mohtasim is a full-stack engineer based out of New York.',
    picture: bioMohtasimPic,
    contact: {
      gitHub: 'https://github.com/mohtasim317',
      linkedIn: 'https://www.linkedin.com/in/mohtasimc/',
    },
  },
  {
    name: 'Natalie Umanzor',
    bioParagraph:
    'Natalie is a full-stack engineer based out of New York.',    
    picture: bioNataliePic,
    contact: {
      gitHub: 'https://github.com/nmczormick',
      linkedIn: 'https://www.linkedin.com/in/nmczormick/',
    },
  },

];

const Team = () => (
  <div className="team-container" id="teamPage">
    {bios.map((obj) => (
      <div className="bio-card">
        <img className="bio-pic" src={obj.picture} alt="loading" />
        <p className="name">{obj.name}</p>
        <p className="bio">{obj.bioParagraph}</p>
        <p className="member-contact">
          <a
            className="member-github"
            href={obj.contact.gitHub}
            target="__blank"
          >
            <ion-icon class="icon" name="logo-github"></ion-icon>
          </a>
          <a
            className="member-linkedin"
            href={obj.contact.linkedIn}
            target="__blank"
          >
            <ion-icon class ="icon" name="logo-linkedin"></ion-icon>
          </a>
        </p>
      </div>
    ))}
  </div>
);

export default Team;
