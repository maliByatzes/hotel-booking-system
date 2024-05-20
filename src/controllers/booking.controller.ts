import { NextFunction, Request, Response } from "express";
import { getOnePaymentStatus } from "../services/payment-status.service";
import { createBooking, deleteOneBooking, getOneBooking, updateOneBooking } from "../services/booking.service";
import { Addon, Booking, Guest, PaymentStatus } from "@prisma/client";
import { CreateBookingInput, DeleteBookingInput, GetBookingInput, UpdateBookingInput } from "../schemas/booking.schema";
import { findUniqueGuest } from "../services/guest.service";
import AppError from "../utils/appError";
import { getOneAddon } from "../services/addon.service";
import { createBookingAddon } from "../services/booking-addon.service";
import { getOneRoom, updateOneRoom } from "../services/room.service";
import { getOneRoomClass } from "../services/room-class.service";
import { createBookingRoom } from "../services/booking-room.service";
import { getPostgresTimestamp } from "../utils/getTimestamp";


export const createBookingHandler = async (
  req: Request<{}, {}, CreateBookingInput>,
  res: Response,
  next: NextFunction
) => {

  try {
    // Get the guest from db using locals
    const guest: Guest = await findUniqueGuest(res.locals.guest.emailAddress);

    // Query a specific payment status to verify its availability
    const paymentStatus: PaymentStatus = await getOnePaymentStatus('Pending');

    // Verify the existence and throw a server error when not found
    if (!paymentStatus) {
      console.error('Payment Status with status of Pending is not found');
      process.exit(1);
    }

    // Verify that the client qualifies for that room class
    const roomClass = await getOneRoomClass(req.body.roomClassName);

    if (roomClass.basePrice > req.body.bookingAmount) {
      return next(new AppError(400, `The booking amount must be at least equal or greater than ${roomClass.basePrice}`));
    }

    // Get the desired room by the guest
    const room = await getOneRoom(req.body.roomClassName, 'Available');

    if (room) {
      await updateOneRoom(room.id, 3); // BAD HARDCODED VALUE!!

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

      await createBookingRoom(booking, room);

      res.status(201).json({
        status: 'success',
        data: {
          booking,
        },
      });
    } else {
      return next(new AppError(404, `No suitable room found with your needs`));
    }
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

    const newBooking: Booking = {
      id: booking.id,
      guestId: booking.guestId,
      paymentStatusId: booking.paymentStatusId,
      checkinDate: new Date(req.body.checkinDate || booking.checkinDate),
      checkoutDate: new Date(req.body.checkoutDate || booking.checkoutDate),
      numAdults: req.body.numAdults || booking.numAdults,
      numChildren: req.body.numChildren || booking.numChildren,
      bookingAmount: req.body.bookingAmount || booking.bookingAmount,
      createdAt: booking.createdAt,
      updatedAt: new Date(getPostgresTimestamp()),
    };

    const updatedBooking = await updateOneBooking(Number(req.params.bookingId), newBooking);

    if (req.body.addonName) {
      const addon = await getOneAddon(req.body.addonName);

      if (addon) {
        await createBookingAddon(updatedBooking, addon);
      } else {
        return next(new AppError(404, `Addon with name: ${req.body.addonName} is not offered`));
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        updatedBooking,
      },
    });
  } catch (err: any) {
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

    // Delete entries in the two joining tables
    await deleteOneBooking(Number(req.params.bookingId));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
