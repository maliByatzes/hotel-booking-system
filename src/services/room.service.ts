import { PrismaClient, Room } from "@prisma/client";

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

export const updateOneRoom = async (
  roomId: number,
  statusId: number
) => {
  return (await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      statusId: statusId,
    }
  })) as Room;
};
