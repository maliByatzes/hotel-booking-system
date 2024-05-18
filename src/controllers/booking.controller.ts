import { NextFunction, Request, Response } from "express";
import { getOnePaymentStatus } from "../services/payment-status.service";
import { createBooking } from "../services/booking.service";
import { Booking, Guest, PaymentStatus } from "@prisma/client";
import { CreateBookingInput, DeleteBookingInput, GetBookingInput, UpdateBookingInput } from "../schemas/booking.schema";


export const createBookingHandler = async (
  req: Request<{}, {}, CreateBookingInput>,
  res: Response,
  next: NextFunction
) => {

  try {
    const guest: Guest = res.locals.guest;

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
  req: Request<{}, {}, GetBookingInput>,
  res: Response,
  next: NextFunction
) => { };

export const updateOneBookingHandler = async (
  req: Request<{}, {}, UpdateBookingInput>,
  res: Response,
  next: NextFunction,
) => { };

export const deleteOneBookingHandler = async (
  req: Request<{}, {}, DeleteBookingInput>,
  res: Response,
  next: NextFunction,
) => { };
