import express from 'express';
import { Events } from '@chronosrx/common';

const router = express.Router();

router.post('/', async (req, res) => {
  const event: Events = req.body.event;
  console.log(event);
  return res.send({ message: 'Event received' });
});

export default router;
