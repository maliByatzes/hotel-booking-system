import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOneRoom = async (
  className: string,
  statusName: string
) => {
  const room = await prisma.room.findFirst({
    where: {
      roomClass: {
        className: className,
      },
      status: {
        statusName: statusName,
      },
    }
  });

  return room;
};
