import express from 'express';
import { getGuestHandler } from '../controllers/guest.controller';
import { deserializeGuest } from '../middleware/deserializeGuest';
import { requireGuest } from '../middleware/requireGuest';

const router = express.Router();

router.use(deserializeGuest, requireGuest);

router.get('/me', getGuestHandler);

export default router;
