import express from 'express';
import { signup, login, logout, getCurrentUser } from '../controllers/auth-controller';
import { currentUser } from '@chronosrx/common'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/current-user', currentUser, getCurrentUser);

export default router;
