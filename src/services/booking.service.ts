import { PrismaClient, Prisma, Guest, PaymentStatus, Booking } from "@prisma/client";

const prisma = new PrismaClient();

export const createBooking = async (
  booking: Prisma.BookingCreateInput,
  guest: Guest,
  paymentStatus: PaymentStatus
) => {
  return (await prisma.booking.create({
    data: {
      guestId: guest.id,
      paymentStatusId: paymentStatus.id,
      checkinDate: booking.checkinDate,
      checkoutDate: booking.checkoutDate,
      numAdults: booking.numAdults,
      numChildren: booking.numChildren,
      bookingAmount: booking.bookingAmount
    },
  })) as Booking;
};

export const getOneBooking = async (
  bookingId: number,
  select?: Prisma.BookingSelect
) => {
  return (await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    select,
  })) as Booking;
};

export const updateOneBooking = async (
  bookingId: number,
  booking: Prisma.BookingUpdateInput
) => {
  return (await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: booking,
  })) as Booking;
};

export const deleteOneBooking = async (
  bookingId: number
) => {
  return (await prisma.booking.delete({
    where: {
      id: bookingId,
    }
  })) as Booking;
};
