import { app } from './app';

const start = () => {
  app.listen(3005, () => {
    console.log('💥 App listening on port 3005');
  });
};

start();
