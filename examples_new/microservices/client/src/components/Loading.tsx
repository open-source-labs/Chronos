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

  return <div>Loading</div>;
};

export default Loading;
