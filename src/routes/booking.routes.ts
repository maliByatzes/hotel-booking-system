import express from 'express';
import { deserializeGuest } from '../middleware/deserializeGuest';
import { requireGuest } from '../middleware/requireGuest';
import { createBookingHandler, deleteOneBookingHandler, getOneBookingHandler, updateOneBookingHandler } from '../controllers/booking.controller';
import { validate } from '../middleware/validate';
import { createBookingSchema, deleteBookingSchema, getBookingSchema, updateBookingSchema } from '../schemas/booking.schema';

const router = express.Router();

router.use(deserializeGuest, requireGuest);

router.post('/new', validate(createBookingSchema), createBookingHandler);

router
  .route('/:bookingId')
  .get(validate(getBookingSchema), getOneBookingHandler)
  .patch(validate(updateBookingSchema), updateOneBookingHandler)
  .delete(validate(deleteBookingSchema), deleteOneBookingHandler);

export default router;
