import express from 'express';
import {
  loginGuestHandler,
  logoutGuestHandler,
  refreshAccessTokenHandler,
  registerGuestHandler
} from '../controllers/auth.controller';
import { deserializeGuest } from '../middleware/deserializeGuest';
import { requireGuest } from '../middleware/requireGuest';
import { validate } from '../middleware/validate';
import { loginGuestSchema, createGuestSchema } from '../schemas/guest.schema';

const router = express.Router();

router.post('/register', validate(createGuestSchema), registerGuestHandler);

router.post('/login', validate(loginGuestSchema), loginGuestHandler);

router.get('/refresh', refreshAccessTokenHandler);

router.get('/logout', deserializeGuest, requireGuest, logoutGuestHandler);

export default router;
