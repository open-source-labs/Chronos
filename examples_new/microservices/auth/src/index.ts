import { app } from './app';

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined')
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET must be defined')
  if (!process.env.JWT_LIFETIME) throw new Error('JWT_LIFETIME must be defined')

  app.listen(PORT, () => {
    console.log(`💥 App listening on ${PORT}`);
  });
};

start()