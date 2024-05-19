import { Addon, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOneAddon = async (
  addonName: string
) => {
  return (await prisma.addon.findFirst({
    where: {
      addonName: addonName,
    }
  })) as Addon;
};
