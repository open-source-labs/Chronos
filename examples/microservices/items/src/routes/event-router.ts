import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { event } = req.body;
  console.log('Event received:', event);

  res.send({ message: 'Event received' });
});

export default router;
