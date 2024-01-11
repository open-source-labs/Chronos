import { nanoid } from 'nanoid';

const members = [
  'Elsa the Tech Talk Extraordinaire',
  'Kelly el Shuffler del Cards',
  'McKenzie aka ScrumLord',
  'TripleDDDaniel',
  'Seanica Patrick',
];

const About = () => {
  return (
    <div className="bg-blue-700 p-8 rounded-md flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">ChronosRx Team</h1>
      {members.map(member => {
        return (
          <h1 key={nanoid()} className="mt-2">
            👑 {member}
          </h1>
        );
      })}
    </div>
  );
};

export default About;
