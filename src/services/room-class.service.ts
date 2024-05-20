import { PrismaClient, RoomClass } from "@prisma/client";

const prisma = new PrismaClient();

export const getOneRoomClass = async (
  className: string
) => {
  return (await prisma.roomClass.findFirst({
    where: {
      className: className,
    },
  })) as RoomClass;
};
