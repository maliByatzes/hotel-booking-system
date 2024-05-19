import { NextFunction, Request, Response } from "express";
import { getOnePaymentStatus } from "../services/payment-status.service";
import { createBooking, deleteOneBooking, getOneBooking, updateOneBooking } from "../services/booking.service";
import { Booking, Guest, PaymentStatus } from "@prisma/client";
import { CreateBookingInput, DeleteBookingInput, GetBookingInput, UpdateBookingInput } from "../schemas/booking.schema";
import { findUniqueGuest } from "../services/guest.service";
import AppError from "../utils/appError";


export const createBookingHandler = async (
  req: Request<{}, {}, CreateBookingInput>,
  res: Response,
  next: NextFunction
) => {

  try {
    const guest: Guest = await findUniqueGuest(res.locals.guest.emailAddress);

    const paymentStatus: PaymentStatus = await getOnePaymentStatus('Pending');
    // Check omitted for validity of paymentStatus here for some reason...

    // Check on the last two atrrs on the first object...
    const booking: Booking = await createBooking({
      checkinDate: req.body.checkinDate,
      checkoutDate: req.body.checkoutDate,
      numAdults: req.body.numAdults,
      numChildren: req.body.numChildren,
      bookingAmount: req.body.bookingAmount,
      guest: {},
      paymentStatus: {},
    }, guest, paymentStatus);

    res.status(201).json({
      status: 'success',
      data: {
        booking,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getOneBookingHandler = async (
  req: Request<GetBookingInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking: Booking = await getOneBooking(Number(req.params.bookingId));

    if (!booking) {
      return next(new AppError(404, `Post with ID: ${req.params.bookingId} not found.`));
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking,
      }
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateOneBookingHandler = async (
  req: Request<UpdateBookingInput['params'], {}, UpdateBookingInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const booking = await getOneBooking(Number(req.params.bookingId));

    if (!booking) {
      return next(new AppError(404, `Post with ID: ${req.params.bookingId} not found`));
    }

    const newBooking = Object.assign(booking, req.body);

    const updatedBooking = await updateOneBooking(Number(req.params.bookingId), newBooking);

    res.status(200).json({
      status: 'success',
      data: {
        updatedBooking,
      },
    });
  } catch(err: any) {
    next(err);
  }
};

export const deleteOneBookingHandler = async (
  req: Request<DeleteBookingInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const booking = await getOneBooking(Number(req.params.bookingId));

    if (!booking) {
      return next(new AppError(404, `Post with ID: ${req.params.bookingId} is not found`));
    }

    await deleteOneBooking(Number(req.params.bookingId));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch(err: any) {
    next(err);
  }
};
