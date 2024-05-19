import { Addon, Booking, BookingAddon, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBookingAddon = async (
  booking: Booking,
  addon: Addon,
) => {
  return (await prisma.bookingAddon.create({
    data: {
      bookingId: booking.id,
      addonId: addon.id,
    }
  })) as BookingAddon;
};
