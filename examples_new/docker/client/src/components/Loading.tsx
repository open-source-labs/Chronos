import { useEffect, useState } from 'react';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (dots.length >= 4) {
        setDots('');
      } else {
        setDots(prev => prev + '.');
      }
    }, 500);
  }, [dots]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-light bg-dark">
      Loading{dots}
    </div>
  );
};

export default Loading;
