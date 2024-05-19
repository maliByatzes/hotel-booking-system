import { Booking, BookingRoom, PrismaClient, Room } from "@prisma/client";

const prisma = new PrismaClient();

export const createBookingRoom = async (
  booking: Booking,
  room: Room
) => {
  return (await prisma.bookingRoom.create({
    data: {
      bookingId: booking.id,
      roomId: room.id,
    }
  })) as BookingRoom;
};
