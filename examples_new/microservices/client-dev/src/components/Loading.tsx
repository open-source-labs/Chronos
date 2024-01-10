import { useEffect, useState } from 'react';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (dots.length > 2) {
        setDots('');
      } else {
        setDots(prev => prev + '.');
      }
    }, 250);
  }, [dots]);

  return (
    <div className="absolute bg-transparent w-full h-screen flex flex-col justify-center items-center">
      <div
        className="w-64 h-64 flex justify-center items-center bg-dark z-[1000]
        shadow-insetDbl rounded-[50%] animate-loadspin"
      >
        <h1 className="text-4xl font-semibold animate-antiloadspin text-light">Loading{dots}</h1>
      </div>
    </div>
  );
};

export default Loading;
