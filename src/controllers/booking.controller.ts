import { NextFunction, Request, Response } from "express";
import { getOnePaymentStatus } from "../services/payment-status.service";
import { createBooking, deleteOneBooking, getOneBooking, updateOneBooking } from "../services/booking.service";
import { Addon, Booking, BookingAddon, Guest, PaymentStatus } from "@prisma/client";
import { CreateBookingInput, DeleteBookingInput, GetBookingInput, UpdateBookingInput } from "../schemas/booking.schema";
import { findUniqueGuest } from "../services/guest.service";
import AppError from "../utils/appError";
import { getOneAddon } from "../services/addon.service";
import { createBookingAddon } from "../services/booking-addon.service";


export const createBookingHandler = async (
  req: Request<{}, {}, CreateBookingInput>,
  res: Response,
  next: NextFunction
) => {

  try {
    const guest: Guest = await findUniqueGuest(res.locals.guest.emailAddress);

    const paymentStatus: PaymentStatus = await getOnePaymentStatus('Pending');

    if (!paymentStatus) {
      console.error('Payment Status with status of Pending is not found');
      process.exit(1);
    }

    const booking: Booking = await createBooking({
      checkinDate: req.body.checkinDate,
      checkoutDate: req.body.checkoutDate,
      numAdults: req.body.numAdults,
      numChildren: req.body.numChildren,
      bookingAmount: req.body.bookingAmount,
      guest: {},
      paymentStatus: {},
    }, guest, paymentStatus);

    if (req.body.addonName !== 'None') {
      const addon: Addon = await getOneAddon(req.body.addonName);

      if (!addon) {
        return next(new AppError(404, `Addon ${req.body.addonName} is not found`));
      }

      await createBookingAddon(booking, addon);
    }

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

  // TODO: Allow user to add more Addons

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
