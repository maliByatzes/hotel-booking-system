import express from 'express';
import { deserializeGuest } from '../middleware/deserializeGuest';
import { requireGuest } from '../middleware/requireGuest';
import { createBookingHandler } from '../controllers/booking.controller';
import { validate } from '../middleware/validate';
import { createBookingSchema } from '../schemas/booking.schema';

const router = express.Router();

router.use(deserializeGuest, requireGuest);

router.post('/new', validate(createBookingSchema), createBookingHandler);

export default router;
