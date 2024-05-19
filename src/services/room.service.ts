import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOneRoom = async (
  className: string,
  statusName: string
) => {
  // Hopefuly perform some JOIN magic here with prisma the get the desired room
  // Also perform a booking.bookingAmount >= room_class.base_price
};
